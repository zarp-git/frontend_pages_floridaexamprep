/**
 * Queue Event Processor
 * 
 * Handles the processing of sync events from the queue.
 * This is the main orchestration logic that coordinates:
 * - Product mapping
 * - Shopify API calls
 * - Status tracking
 */

import type { SyncEvent } from '@/types/ghl-shopify-sync';
import { ProductMapper } from './ProductMapper';
import { createShopifyClientFromEnv } from './ShopifyAPIClient';
import { SyncStatusTracker } from './SyncStatusTracker';
import { ProductMappingStore } from './ProductMappingStore';

/**
 * Process a single sync event from the queue
 * 
 * @param event - The sync event to process
 * @throws Error if processing fails (will trigger retry)
 */
export async function processQueueEvent(event: SyncEvent): Promise<void> {
  console.log(`Processing event ${event.id}`, {
    type: event.type,
    ghlProductId: event.ghlProductId,
    retryCount: event.retryCount,
  });

  // Initialize services
  const mapper = new ProductMapper();
  const shopifyClient = createShopifyClientFromEnv();
  const statusTracker = new SyncStatusTracker();
  const mappingStore = new ProductMappingStore();

  try {
    // Record sync attempt
    await statusTracker.recordSyncAttempt({
      ghlProductId: event.ghlProductId,
      operation: getOperationType(event.type),
      status: 'pending',
      attemptNumber: event.retryCount + 1,
    });

    // Process based on event type
    switch (event.type) {
      case 'product.created':
        await handleProductCreated(event, mapper, shopifyClient, statusTracker, mappingStore);
        break;

      case 'product.updated':
        await handleProductUpdated(event, mapper, shopifyClient, statusTracker, mappingStore);
        break;

      case 'product.deleted':
        await handleProductDeleted(event, shopifyClient, statusTracker, mappingStore);
        break;

      default:
        throw new Error(`Unknown event type: ${event.type}`);
    }

    console.log(`Event ${event.id} processed successfully`);
  } catch (error) {
    console.error(`Event ${event.id} processing failed:`, error);

    // Record failure
    await statusTracker.recordSyncAttempt({
      ghlProductId: event.ghlProductId,
      operation: getOperationType(event.type),
      status: 'failed',
      error: error instanceof Error ? error.message : String(error),
      attemptNumber: event.retryCount + 1,
    });

    // Re-throw to trigger retry
    throw error;
  }
}

/**
 * Handle product creation event
 */
async function handleProductCreated(
  event: SyncEvent,
  mapper: ProductMapper,
  shopifyClient: ReturnType<typeof createShopifyClientFromEnv>,
  statusTracker: SyncStatusTracker,
  mappingStore: ProductMappingStore
): Promise<void> {
  // Check if product already exists (idempotency)
  const existingMapping = await mappingStore.getMapping(event.ghlProductId);
  
  if (existingMapping) {
    console.log(`Product ${event.ghlProductId} already exists, treating as update`);
    return handleProductUpdated(event, mapper, shopifyClient, statusTracker, mappingStore);
  }

  // Map GHL product to Shopify format
  const shopifyProductInput = mapper.mapToShopify(event.productData);

  // Create product in Shopify
  const shopifyProduct = await shopifyClient.createProduct(shopifyProductInput);

  // Store mapping
  await mappingStore.storeMapping(event.ghlProductId, shopifyProduct.id);

  // Update status
  await statusTracker.updateSyncStatus(event.ghlProductId, {
    status: 'synced',
    shopify_product_id: shopifyProduct.id,
  });

  // Record success
  await statusTracker.recordSyncAttempt({
    ghlProductId: event.ghlProductId,
    shopifyProductId: shopifyProduct.id,
    operation: 'create',
    status: 'success',
    attemptNumber: event.retryCount + 1,
  });
}

/**
 * Handle product update event
 */
async function handleProductUpdated(
  event: SyncEvent,
  mapper: ProductMapper,
  shopifyClient: ReturnType<typeof createShopifyClientFromEnv>,
  statusTracker: SyncStatusTracker,
  mappingStore: ProductMappingStore
): Promise<void> {
  // Get existing mapping
  const mapping = await mappingStore.getMapping(event.ghlProductId);

  if (!mapping) {
    // Product doesn't exist, create it instead
    console.log(`Product ${event.ghlProductId} not found, creating new product`);
    return handleProductCreated(event, mapper, shopifyClient, statusTracker, mappingStore);
  }

  // Map GHL product to Shopify format
  const shopifyProductInput = mapper.mapToShopify(event.productData);

  // Update product in Shopify
  await shopifyClient.updateProduct(mapping.shopify_product_id, shopifyProductInput);

  // Update status
  await statusTracker.updateSyncStatus(event.ghlProductId, {
    status: 'synced',
    shopify_product_id: mapping.shopify_product_id,
  });

  // Record success
  await statusTracker.recordSyncAttempt({
    ghlProductId: event.ghlProductId,
    shopifyProductId: mapping.shopify_product_id,
    operation: 'update',
    status: 'success',
    attemptNumber: event.retryCount + 1,
  });
}

/**
 * Handle product deletion event
 */
async function handleProductDeleted(
  event: SyncEvent,
  shopifyClient: ReturnType<typeof createShopifyClientFromEnv>,
  statusTracker: SyncStatusTracker,
  mappingStore: ProductMappingStore
): Promise<void> {
  // Get existing mapping
  const mapping = await mappingStore.getMapping(event.ghlProductId);

  if (!mapping) {
    console.log(`Product ${event.ghlProductId} not found, skipping deletion`);
    return;
  }

  // Archive (unpublish) product in Shopify
  await shopifyClient.unpublishProduct(mapping.shopify_product_id);

  // Update status
  await statusTracker.updateSyncStatus(event.ghlProductId, {
    status: 'archived',
    shopify_product_id: mapping.shopify_product_id,
  });

  // Record success
  await statusTracker.recordSyncAttempt({
    ghlProductId: event.ghlProductId,
    shopifyProductId: mapping.shopify_product_id,
    operation: 'archive',
    status: 'success',
    attemptNumber: event.retryCount + 1,
  });
}

/**
 * Convert event type to operation type
 */
function getOperationType(eventType: SyncEvent['type']): 'create' | 'update' | 'archive' {
  switch (eventType) {
    case 'product.created':
      return 'create';
    case 'product.updated':
      return 'update';
    case 'product.deleted':
      return 'archive';
  }
}
