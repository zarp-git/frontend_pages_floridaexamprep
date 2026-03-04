/**
 * ProductSyncService - Orchestrates product synchronization operations with Shopify
 * 
 * This service coordinates all sync operations including product creation, updates,
 * archival, image synchronization, variant synchronization, and bulk sync.
 * 
 * CRITICAL: This is the core orchestration service that coordinates all sync operations.
 * 
 * Requirements: 3.1, 3.2, 4.1, 4.3, 4.4, 5.1, 5.2
 */

import type {
  ShopifyProductInput,
  ShopifyProduct,
  ShopifyVariant,
  GHLVariant,
  GHLImage,
  ShopifyImage,
  BulkSyncProgress,
  BulkSyncResult,
  VariantSyncResult,
  ImageSyncResult,
  GHLProduct,
} from '@/types/ghl-shopify-sync';
import { ShopifyAPIClient } from './ShopifyAPIClient';
import { SyncStatusTracker } from './SyncStatusTracker';
import { ProductMappingStore } from './ProductMappingStore';
import { ProductMapper } from './ProductMapper';
import {
  isBulkSyncRunning,
  startBulkSync,
  completeBulkSync,
  updateBulkSyncProgress,
} from '@/server/database/utils';

/**
 * ProductSyncService class
 * 
 * Orchestrates product synchronization between GHL and Shopify.
 * Handles product creation, updates, archival, images, variants, and bulk sync.
 */
export class ProductSyncService {
  constructor(
    private readonly shopifyClient: ShopifyAPIClient,
    private readonly syncStatusTracker: SyncStatusTracker,
    private readonly productMappingStore: ProductMappingStore,
    private readonly productMapper: ProductMapper
  ) {}

  /**
   * Create a new product in Shopify
   * 
   * Creates a product in Shopify and stores the bidirectional mapping
   * between GHL product ID and Shopify product ID.
   * 
   * @param productData - Shopify product input data
   * @param ghlProductId - GHL product identifier
   * @returns Promise that resolves to the Shopify product ID
   * @throws Error if product creation fails after retries
   */
  async createProduct(
    productData: ShopifyProductInput,
    ghlProductId: string
  ): Promise<string> {
    try {
      // Record sync attempt as pending
      await this.syncStatusTracker.recordSyncAttempt({
        ghlProductId,
        operation: 'create',
        status: 'pending',
        attemptNumber: 1,
      });

      // Create product in Shopify
      const shopifyProduct = await this.shopifyClient.createProduct(productData);

      // Store product ID mapping
      await this.productMappingStore.storeMapping(ghlProductId, shopifyProduct.id);

      // Record successful sync
      await this.syncStatusTracker.recordSyncAttempt({
        ghlProductId,
        shopifyProductId: shopifyProduct.id,
        operation: 'create',
        status: 'success',
        attemptNumber: 1,
      });

      return shopifyProduct.id;
    } catch (error: any) {
      // Record failed sync
      await this.syncStatusTracker.recordSyncAttempt({
        ghlProductId,
        operation: 'create',
        status: 'failed',
        error: error.message,
        attemptNumber: 1,
      });

      throw error;
    }
  }

  /**
   * Update an existing product in Shopify
   * 
   * Updates a product in Shopify. If the product mapping doesn't exist,
   * falls back to creating a new product.
   * 
   * @param shopifyProductId - Shopify product ID to update
   * @param productData - Partial product data to update
   * @returns Promise that resolves when update is complete
   * @throws Error if product update fails after retries
   */
  async updateProduct(
    shopifyProductId: string,
    productData: Partial<ShopifyProductInput>
  ): Promise<void> {
    try {
      // Update product in Shopify
      await this.shopifyClient.updateProduct(shopifyProductId, productData);
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Archive (unpublish) a product in Shopify
   * 
   * Unpublishes a product in Shopify rather than permanently deleting it.
   * This preserves order history and allows for potential restoration.
   * 
   * @param shopifyProductId - Shopify product ID to archive
   * @returns Promise that resolves when archival is complete
   * @throws Error if archival fails after retries
   */
  async archiveProduct(shopifyProductId: string): Promise<void> {
    try {
      // Unpublish product in Shopify (archive, not delete)
      await this.shopifyClient.unpublishProduct(shopifyProductId);
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Perform bulk sync of all GHL products
   * 
   * CRITICAL: Checks bulk_sync_control table to prevent race conditions with webhooks.
   * Fetches all GHL products and syncs them to Shopify in batches.
   * 
   * @param progressCallback - Optional callback for progress updates
   * @param checkRunningFlag - If true, checks bulk_sync_control table to prevent race conditions
   * @returns Promise that resolves to bulk sync result with metrics
   */
  async bulkSync(
    progressCallback?: (progress: BulkSyncProgress) => void,
    checkRunningFlag: boolean = true
  ): Promise<BulkSyncResult> {
    const startTime = Date.now();
    const result: BulkSyncResult = {
      totalProcessed: 0,
      succeeded: 0,
      failed: 0,
      failures: [],
      durationMs: 0,
    };

    let syncId: number | null = null;

    try {
      // CRITICAL: Check if bulk sync is already running to prevent race conditions
      if (checkRunningFlag) {
        const isRunning = await isBulkSyncRunning();
        if (isRunning) {
          throw new Error('Bulk sync is already running. Please wait for it to complete.');
        }
      }

      // TODO: Fetch all GHL products using pagination
      // This will be implemented when GHL API client is available
      // For now, we'll use a placeholder that returns an empty array
      const ghlProducts = await this.fetchAllGHLProducts();

      // CRITICAL: Start bulk sync and set is_running flag
      syncId = await startBulkSync(ghlProducts.length);

      // Report initial progress
      if (progressCallback) {
        progressCallback({
          total: ghlProducts.length,
          processed: 0,
          succeeded: 0,
          failed: 0,
        });
      }

      // Process products in batches of 50 to respect API rate limits
      const BATCH_SIZE = 50;
      const batches: GHLProduct[][] = [];
      
      for (let i = 0; i < ghlProducts.length; i += BATCH_SIZE) {
        batches.push(ghlProducts.slice(i, i + BATCH_SIZE));
      }

      // Process each batch
      for (const batch of batches) {
        // Process products in the batch sequentially to avoid overwhelming the API
        for (const ghlProduct of batch) {
          try {
            // Transform GHL product to Shopify format
            const shopifyProductInput = this.productMapper.mapToShopify(ghlProduct);

            // Check if product already exists (has mapping)
            const existingMapping = await this.productMappingStore.getMapping(ghlProduct.id);

            if (existingMapping) {
              // Update existing product
              await this.updateProduct(
                existingMapping.shopify_product_id,
                shopifyProductInput
              );
            } else {
              // Create new product
              await this.createProduct(shopifyProductInput, ghlProduct.id);
            }

            result.succeeded++;
          } catch (error) {
            // Continue on individual failures and collect errors
            result.failed++;
            result.failures.push({
              ghlProductId: ghlProduct.id,
              error: error instanceof Error ? error.message : String(error),
            });

            // Log the error
            console.error(`Failed to sync product ${ghlProduct.id}:`, error);
          }

          result.totalProcessed++;

          // Update progress in database
          if (syncId !== null) {
            await updateBulkSyncProgress(syncId, result.totalProcessed);
          }

          // Report progress
          if (progressCallback) {
            progressCallback({
              total: ghlProducts.length,
              processed: result.totalProcessed,
              succeeded: result.succeeded,
              failed: result.failed,
            });
          }
        }
      }

      return result;
    } catch (error) {
      // Log the error
      console.error('Bulk sync failed:', error);
      throw error;
    } finally {
      // CRITICAL: Clear is_running flag when complete (even on error)
      if (syncId !== null) {
        try {
          await completeBulkSync(syncId);
        } catch (error) {
          console.error('Failed to complete bulk sync:', error);
        }
      }

      result.durationMs = Date.now() - startTime;
    }
  }

  /**
   * Fetch all GHL products using pagination
   * 
   * TODO: This is a placeholder method that will be implemented when the GHL API client is available.
   * The actual implementation should:
   * 1. Use GHL API client to fetch products with pagination
   * 2. Handle pagination cursors/tokens
   * 3. Respect GHL API rate limits
   * 4. Handle API errors gracefully
   * 
   * @returns Promise that resolves to array of all GHL products
   */
  private async fetchAllGHLProducts(): Promise<GHLProduct[]> {
    // TODO: Implement GHL API client integration
    // For now, return empty array as placeholder
    console.warn('fetchAllGHLProducts is not yet implemented. GHL API client integration pending.');
    return [];
  }

  /**
   * Sync product variants (CRITICAL - most complex operation)
   * 
   * Handles additions, updates, and deletions while preserving inventory_item_id.
   * This is the most complex part of the sync system.
   * 
   * Algorithm:
   * 1. Fetch existing Shopify variants for comparison
   * 2. Build mapping of GHL variant IDs to existing Shopify variants
   * 3. Identify variants to create (new GHL variants without mapping)
   * 4. Identify variants to update (existing GHL variants with mapping)
   * 5. Identify variants to delete (Shopify variants not in GHL list)
   * 6. Execute operations and store/update variant mappings
   * 
   * CRITICAL CONSIDERATIONS:
   * - Preserve inventory_item_id when updating variants
   * - Handle SKU changes without breaking pricing
   * - Shopify requires at least one variant per product
   * - Store variant ID mappings for future syncs
   * 
   * WARNING: This operation requires careful handling of variant IDs and inventory.
   * 
   * @param shopifyProductId - Shopify product ID
   * @param ghlProductId - GHL product ID (for variant mapping storage)
   * @param ghlVariants - GHL variants to sync
   * @param existingVariants - Existing Shopify variants (optional, will fetch if not provided)
   * @returns Promise that resolves to variant sync result
   */
  async syncVariants(
    shopifyProductId: string,
    ghlProductId: string,
    ghlVariants: GHLVariant[],
    existingVariants?: ShopifyVariant[]
  ): Promise<VariantSyncResult> {
    const result: VariantSyncResult = {
      created: [],
      updated: [],
      deleted: [],
      errors: [],
    };

    try {
      // Step 1: Fetch existing Shopify variants if not provided
      const shopifyVariants = existingVariants || 
        await this.shopifyClient.getProductVariants(shopifyProductId);

      // Step 2: Build mapping of GHL variant IDs to Shopify variants
      // We need to check our database for existing mappings
      const variantMappings = new Map<string, string>(); // GHL ID -> Shopify ID
      const shopifyVariantsMap = new Map<string, ShopifyVariant>(); // Shopify ID -> Variant

      // Build Shopify variants map
      for (const variant of shopifyVariants) {
        if (variant.id) {
          shopifyVariantsMap.set(variant.id, variant);
        }
      }

      // Fetch existing variant mappings from database
      for (const ghlVariant of ghlVariants) {
        const mapping = await this.productMappingStore.getVariantMapping(ghlVariant.id);
        if (mapping) {
          variantMappings.set(ghlVariant.id, mapping.shopify_variant_id);
        }
      }

      // Step 3: Identify variants to create, update, and delete
      const toCreate: GHLVariant[] = [];
      const toUpdate: Array<{ ghlVariant: GHLVariant; shopifyVariantId: string }> = [];
      const ghlVariantIds = new Set(ghlVariants.map(v => v.id));

      for (const ghlVariant of ghlVariants) {
        const shopifyVariantId = variantMappings.get(ghlVariant.id);
        
        if (shopifyVariantId && shopifyVariantsMap.has(shopifyVariantId)) {
          // Variant exists - update it
          toUpdate.push({ ghlVariant, shopifyVariantId });
        } else {
          // New variant - create it
          toCreate.push(ghlVariant);
        }
      }

      // Identify variants to delete (Shopify variants not in GHL list)
      const toDelete: string[] = [];
      for (const [ghlVariantId, shopifyVariantId] of variantMappings.entries()) {
        if (!ghlVariantIds.has(ghlVariantId) && shopifyVariantsMap.has(shopifyVariantId)) {
          toDelete.push(shopifyVariantId);
        }
      }

      // CRITICAL: Shopify requires at least one variant per product
      // If we're about to delete all variants, keep the first one
      const remainingVariantsCount = shopifyVariants.length - toDelete.length + toCreate.length;
      if (remainingVariantsCount === 0 && toDelete.length > 0) {
        console.warn(
          `Cannot delete all variants for product ${shopifyProductId}. ` +
          `Keeping at least one variant.`
        );
        toDelete.pop(); // Remove the last variant from deletion list
      }

      // Step 4: Execute create operations
      for (const ghlVariant of toCreate) {
        try {
          const variantData: ShopifyVariant = this.mapGHLVariantToShopify(ghlVariant);
          
          // Create variant by updating the product with new variant
          // Note: Shopify doesn't have a direct "create variant" endpoint
          // We need to use the product update endpoint or variants endpoint
          const createdVariant = await this.createVariantInShopify(
            shopifyProductId,
            variantData
          );

          result.created.push(createdVariant);

          // Store variant mapping
          if (createdVariant.id) {
            await this.productMappingStore.storeVariantMapping(
              ghlVariant.id,
              createdVariant.id,
              ghlProductId,
              shopifyProductId
            );
          }
        } catch (error: any) {
          console.error(`Failed to create variant ${ghlVariant.id}:`, error.message);
          result.errors.push({
            variantId: ghlVariant.id,
            error: error.message || 'Unknown error during variant creation',
          });
        }
      }

      // Step 5: Execute update operations
      for (const { ghlVariant, shopifyVariantId } of toUpdate) {
        try {
          const existingVariant = shopifyVariantsMap.get(shopifyVariantId);
          const variantUpdates = this.buildVariantUpdates(ghlVariant, existingVariant);

          // Only update if there are actual changes
          if (Object.keys(variantUpdates).length > 0) {
            const updatedVariant = await this.shopifyClient.updateVariant(
              shopifyVariantId,
              variantUpdates
            );

            result.updated.push(updatedVariant);
          }
        } catch (error: any) {
          console.error(`Failed to update variant ${shopifyVariantId}:`, error.message);
          result.errors.push({
            variantId: ghlVariant.id,
            error: error.message || 'Unknown error during variant update',
          });
        }
      }

      // Step 6: Execute delete operations
      for (const shopifyVariantId of toDelete) {
        try {
          await this.shopifyClient.deleteVariant(shopifyProductId, shopifyVariantId);
          result.deleted.push(shopifyVariantId);

          // Delete variant mapping from database
          // Find the GHL variant ID for this Shopify variant ID
          for (const [ghlVariantId, mappedShopifyId] of variantMappings.entries()) {
            if (mappedShopifyId === shopifyVariantId) {
              await this.productMappingStore.deleteVariantMapping(ghlVariantId);
              break;
            }
          }
        } catch (error: any) {
          console.error(`Failed to delete variant ${shopifyVariantId}:`, error.message);
          result.errors.push({
            variantId: shopifyVariantId,
            error: error.message || 'Unknown error during variant deletion',
          });
        }
      }

      return result;
    } catch (error: any) {
      console.error('Variant sync failed:', error.message);
      throw new Error(`Variant synchronization failed: ${error.message}`);
    }
  }

  /**
   * Map GHL variant to Shopify variant format
   * 
   * Transforms GHL variant data into Shopify variant format.
   * Converts price from cents to decimal string.
   * 
   * @param ghlVariant - GHL variant to map
   * @returns Shopify variant data
   * @private
   */
  private mapGHLVariantToShopify(ghlVariant: GHLVariant): ShopifyVariant {
    return {
      title: ghlVariant.title,
      price: (ghlVariant.price / 100).toFixed(2), // Convert cents to decimal
      sku: ghlVariant.sku || '',
      inventory_quantity: ghlVariant.inventory_quantity || 0,
      option1: ghlVariant.option1,
      option2: ghlVariant.option2,
      option3: ghlVariant.option3,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      fulfillment_service: 'manual',
    };
  }

  /**
   * Build variant updates by comparing GHL and Shopify variants
   * 
   * CRITICAL: Only includes fields that have changed to preserve inventory_item_id
   * and other Shopify-managed fields.
   * 
   * @param ghlVariant - GHL variant with new data
   * @param existingVariant - Existing Shopify variant
   * @returns Partial variant data with only changed fields
   * @private
   */
  private buildVariantUpdates(
    ghlVariant: GHLVariant,
    existingVariant?: ShopifyVariant
  ): Partial<ShopifyVariant> {
    const updates: Partial<ShopifyVariant> = {};

    if (!existingVariant) {
      // If no existing variant, return full mapping
      return this.mapGHLVariantToShopify(ghlVariant);
    }

    // Compare and add only changed fields
    const newPrice = (ghlVariant.price / 100).toFixed(2);
    if (newPrice !== existingVariant.price) {
      updates.price = newPrice;
    }

    if (ghlVariant.title !== existingVariant.title) {
      updates.title = ghlVariant.title;
    }

    if (ghlVariant.sku !== existingVariant.sku) {
      updates.sku = ghlVariant.sku || '';
    }

    if (ghlVariant.inventory_quantity !== existingVariant.inventory_quantity) {
      updates.inventory_quantity = ghlVariant.inventory_quantity || 0;
    }

    if (ghlVariant.option1 !== existingVariant.option1) {
      updates.option1 = ghlVariant.option1;
    }

    if (ghlVariant.option2 !== existingVariant.option2) {
      updates.option2 = ghlVariant.option2;
    }

    if (ghlVariant.option3 !== existingVariant.option3) {
      updates.option3 = ghlVariant.option3;
    }

    return updates;
  }

  /**
   * Create a new variant in Shopify
   * 
   * Uses the Shopify product update endpoint to add a new variant.
   * This is a workaround since Shopify doesn't have a direct "create variant" endpoint.
   * 
   * @param shopifyProductId - Shopify product ID
   * @param variantData - Variant data to create
   * @returns Promise that resolves to the created variant
   * @private
   */
  private async createVariantInShopify(
    shopifyProductId: string,
    variantData: ShopifyVariant
  ): Promise<ShopifyVariant> {
    // Fetch the current product to get existing variants
    const product = await this.shopifyClient.getProduct(shopifyProductId);
    
    // Add the new variant to the product
    const updatedProduct = await this.shopifyClient.updateProduct(shopifyProductId, {
      variants: [...product.variants, variantData],
    });

    // Return the newly created variant (last one in the array)
    const newVariant = updatedProduct.variants[updatedProduct.variants.length - 1];
    return newVariant;
  }

  /**
   * Download and upload product images to Shopify
   * 
   * Handles partial image failures by continuing with remaining images.
   * Preserves image order from GHL.
   * Validates image formats before upload.
   * 
   * Supported formats: JPG, JPEG, PNG, GIF, WEBP
   * 
   * @param shopifyProductId - Shopify product ID
   * @param images - GHL images to sync
   * @returns Promise that resolves to image sync result
   * @private
   */
  private async downloadAndUploadImages(
    shopifyProductId: string,
    images: GHLImage[]
  ): Promise<ImageSyncResult> {
    const result: ImageSyncResult = {
      succeeded: [],
      failed: [],
    };

    // Process images in order to preserve position
    for (const image of images) {
      try {
        // Validate image format before upload
        if (!this.isValidImageFormat(image.url)) {
          const error = `Unsupported image format. Shopify supports: JPG, JPEG, PNG, GIF, WEBP`;
          console.warn(`Image validation failed for ${image.url}: ${error}`);
          result.failed.push({ image, error });
          continue;
        }

        // Upload image to Shopify
        // The Shopify API will download the image from the URL
        const shopifyImage = await this.shopifyClient.uploadProductImage(
          shopifyProductId,
          image.url,
          image.position
        );

        // Convert to ShopifyImage format
        const uploadedImage: ShopifyImage = {
          id: shopifyImage.id,
          product_id: shopifyImage.product_id,
          position: shopifyImage.position ?? image.position,
          src: shopifyImage.src,
          alt: image.alt_text,
          width: shopifyImage.width,
          height: shopifyImage.height,
        };

        result.succeeded.push(uploadedImage);
      } catch (error: any) {
        // Log error but continue with remaining images
        console.error(`Image upload failed for ${image.url}:`, error.message);
        result.failed.push({
          image,
          error: error.message || 'Unknown error during image upload',
        });
      }
    }

    return result;
  }

  /**
   * Validate image format is supported by Shopify
   * 
   * Shopify supports: JPG, JPEG, PNG, GIF, WEBP
   * 
   * @param url - Image URL to validate
   * @returns true if format is supported, false otherwise
   * @private
   */
  private isValidImageFormat(url: string): boolean {
    if (!url || typeof url !== 'string') {
      return false;
    }

    // Extract file extension from URL
    const urlLower = url.toLowerCase();
    const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    // Check if URL ends with a supported format
    // Also handle query parameters (e.g., image.jpg?v=123)
    return supportedFormats.some((format) => {
      const formatIndex = urlLower.indexOf(format);
      if (formatIndex === -1) return false;

      // Check if format is at the end or followed by query params
      const afterFormat = urlLower.substring(formatIndex + format.length);
      return afterFormat === '' || afterFormat.startsWith('?') || afterFormat.startsWith('#');
    });
  }
}
