# Design Document: GHL-Shopify Product Sync

## Overview

This document describes the technical design for a unidirectional product synchronization system between GoHighLevel (GHL) and Shopify. The system receives product events from GHL via webhooks and automatically creates, updates, or archives corresponding products in Shopify.

### Key Design Goals

- **Reliability**: Ensure all product changes are eventually synchronized with retry mechanisms
- **Performance**: Handle high volumes of product updates efficiently with queue-based processing
- **Traceability**: Maintain comprehensive logs and sync status for monitoring and debugging
- **Resilience**: Handle API failures, rate limits, and network issues gracefully

### System Boundaries

**In Scope:**
- Receiving webhook events from GHL
- Transforming GHL product data to Shopify format
- Creating, updating, and archiving products in Shopify
- Tracking synchronization status and errors
- Handling product images and variants
- Initial bulk synchronization

**Out of Scope:**
- Bidirectional synchronization (Shopify → GHL)
- Real-time inventory management beyond initial sync
- Order synchronization
- Customer data synchronization
- Manual product management UI

## Architecture

### High-Level Architecture

The system follows an event-driven architecture with the following layers:

```
┌─────────────┐
│     GHL     │
└──────┬──────┘
       │ Webhooks
       ▼
┌─────────────────────────────────────────┐
│         Webhook Handler Layer           │
│  - Receive events                       │
│  - Validate signatures                  │
│  - Enqueue for processing               │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│         Processing Layer                │
│  - Queue Consumer                       │
│  - Product Mapper                       │
│  - Sync Orchestrator                    │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│         Integration Layer               │
│  - Shopify API Client                   │
│  - Rate Limiter                         │
│  - Retry Handler                        │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────┐
│   Shopify   │
└─────────────┘

┌─────────────────────────────────────────┐
│         Persistence Layer               │
│  - Sync Status Tracker                  │
│  - Product ID Mapping Store             │
│  - Event Queue                          │
└─────────────────────────────────────────┘
```

### Technology Stack

- **Runtime**: Next.js API Routes (TypeScript)
- **Database**: PostgreSQL (via existing project infrastructure)
- **Queue**: Vercel KV (Redis) with Vercel Cron for processing OR external worker service
- **HTTP Client**: Axios with retry interceptors
- **Logging**: Winston or Pino for structured logging

### Deployment Architecture (Vercel)

**Vercel Limitations**:
- No long-running processes (10s timeout for Hobby, 60s for Pro)
- Workers must be triggered via cron or external service

**Recommended Architecture**:
1. **Webhook Handler**: Next.js API Route (instant response)
2. **Queue**: Vercel KV (Redis) for event storage
3. **Worker**: 
   - Option A: Vercel Cron (runs every minute, processes batch)
   - Option B: External worker service (Railway/Render) consuming from Vercel KV
4. **Database**: PostgreSQL (Vercel Postgres or external)

**Migration Path to VPS**: All components can be consolidated into single Node process with BullMQ when moving to VPS.

### Component Interaction Flow

1. **Webhook Reception**: GHL sends webhook → Webhook Handler validates → Event enqueued
2. **Event Processing**: Queue consumer picks event → Product Mapper transforms data → Sync Service calls Shopify API
3. **Status Tracking**: Sync Status Tracker records result → Logs persisted
4. **Error Handling**: Failed operations retry with exponential backoff → Final failures logged

## Components and Interfaces

### 1. Webhook Handler

**Responsibility**: Receive and validate incoming webhook events from GHL

**Interface**:
```typescript
interface WebhookHandler {
  /**
   * Handle incoming webhook POST request
   * @returns HTTP 200 on success, 400/401 on validation failure
   */
  handleWebhook(request: WebhookRequest): Promise<WebhookResponse>;
  
  /**
   * Validate webhook signature using GHL secret
   */
  validateSignature(payload: string, signature: string): boolean;
  
  /**
   * Check if event was already processed (idempotency)
   */
  isEventProcessed(eventId: string): Promise<boolean>;
  
  /**
   * Mark event as processed
   */
  markEventProcessed(eventId: string, ghlProductId: string, eventType: string): Promise<void>;
}

interface WebhookRequest {
  headers: Record<string, string>;
  body: GHLWebhookPayload;
}

interface GHLWebhookPayload {
  event_id: string; // CRITICAL: Unique event identifier for idempotency
  event_type: 'product.created' | 'product.updated' | 'product.deleted';
  product_id: string;
  timestamp: string;
  data: GHLProduct;
}

interface WebhookResponse {
  status: number;
  message: string;
}
```

**Key Behaviors**:
- Validates webhook signature using HMAC-SHA256
- **CRITICAL**: Checks `processed_events` table to prevent duplicate processing
- Returns 200 immediately after enqueuing (async processing)
- Returns 401 for invalid signatures
- Returns 400 for malformed payloads
- Returns 200 for already-processed events (idempotent)
- Logs all webhook receipts with correlation IDs

### 2. Product Mapper

**Responsibility**: Transform GHL product data into Shopify product format

**Interface**:
```typescript
interface ProductMapper {
  /**
   * Map GHL product to Shopify product format
   * @throws ValidationError if required fields are missing
   */
  mapToShopify(ghlProduct: GHLProduct): ShopifyProductInput;
  
  /**
   * Map GHL product variants to Shopify variants
   */
  mapVariants(ghlVariants: GHLVariant[]): ShopifyVariant[];
  
  /**
   * Validate and prepare image URLs for Shopify
   */
  mapImages(ghlImages: GHLImage[]): ShopifyImage[];
}

interface GHLProduct {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  images?: GHLImage[];
  variants?: GHLVariant[];
  inventory_quantity?: number;
  sku?: string;
  metadata?: Record<string, any>;
}

interface ShopifyProductInput {
  title: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  variants: ShopifyVariant[];
  images?: ShopifyImage[];
  tags?: string[];
  metafields?: ShopifyMetafield[];
}

interface ShopifyVariant {
  title: string;
  price: string;
  sku?: string;
  inventory_quantity?: number;
  option1?: string;
  option2?: string;
  option3?: string;
}
```

**Mapping Rules**:
- `ghlProduct.title` → `shopifyProduct.title`
- `ghlProduct.description` → `shopifyProduct.body_html`
- `ghlProduct.price` → `shopifyProduct.variants[0].price` (formatted as string)
- `ghlProduct.images` → `shopifyProduct.images` (validated URLs)
- Missing required fields → Use defaults or throw ValidationError
- Store GHL product ID in Shopify metafield for reference

### 3. Product Sync Service

**Responsibility**: Orchestrate product synchronization operations with Shopify

**Interface**:
```typescript
interface ProductSyncService {
  /**
   * Create a new product in Shopify
   * @returns Shopify product ID
   */
  createProduct(productData: ShopifyProductInput, ghlProductId: string): Promise<string>;
  
  /**
   * Update an existing product in Shopify
   */
  updateProduct(shopifyProductId: string, productData: Partial<ShopifyProductInput>): Promise<void>;
  
  /**
   * Archive (unpublish) a product in Shopify
   */
  archiveProduct(shopifyProductId: string): Promise<void>;
  
  /**
   * Perform bulk sync of all GHL products
   * @param checkRunningFlag - If true, checks bulk_sync_control table to prevent race conditions
   */
  bulkSync(progressCallback?: (progress: BulkSyncProgress) => void, checkRunningFlag?: boolean): Promise<BulkSyncResult>;
  
  /**
   * Sync product variants (CRITICAL - most complex operation)
   * Handles additions, updates, and deletions while preserving inventory_item_id
   */
  syncVariants(shopifyProductId: string, ghlVariants: GHLVariant[], existingVariants: ShopifyVariant[]): Promise<VariantSyncResult>;
}

interface VariantSyncResult {
  created: ShopifyVariant[];
  updated: ShopifyVariant[];
  deleted: string[]; // Shopify variant IDs
  errors: Array<{ variantId: string; error: string }>;
}

interface BulkSyncProgress {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
}

interface BulkSyncResult {
  totalProcessed: number;
  succeeded: number;
  failed: number;
  failures: Array<{ ghlProductId: string; error: string }>;
  durationMs: number;
}
```

**Key Behaviors**:
- Implements retry logic with exponential backoff (3 attempts)
- Respects Shopify API rate limits (handles 429 responses)
- Uses product ID mapping to find existing products
- Creates product if mapping doesn't exist during update
- Stores bidirectional mapping (GHL ID ↔ Shopify ID)
- **CRITICAL**: Stores variant mappings (GHL variant ID ↔ Shopify variant ID)
- Processes bulk sync in batches of 50 products
- **CRITICAL**: Checks `bulk_sync_control` flag to prevent race conditions with webhooks
- **CRITICAL**: Variant sync preserves `inventory_item_id` and handles deletions carefully

### 4. Sync Status Tracker

**Responsibility**: Maintain synchronization state and history

**Interface**:
```typescript
interface SyncStatusTracker {
  /**
   * Record a sync operation attempt
   */
  recordSyncAttempt(record: SyncRecord): Promise<void>;
  
  /**
   * Get sync status for a product
   */
  getSyncStatus(ghlProductId: string): Promise<SyncStatus | null>;
  
  /**
   * Get all failed syncs for retry
   */
  getFailedSyncs(limit?: number): Promise<SyncStatus[]>;
  
  /**
   * Update sync status
   */
  updateSyncStatus(ghlProductId: string, status: SyncStatusUpdate): Promise<void>;
}

interface SyncRecord {
  ghlProductId: string;
  shopifyProductId?: string;
  operation: 'create' | 'update' | 'archive';
  status: 'pending' | 'success' | 'failed';
  error?: string;
  attemptNumber: number;
  timestamp: Date;
}

interface SyncStatus {
  ghlProductId: string;
  shopifyProductId?: string;
  status: 'synced' | 'failed' | 'archived' | 'pending';
  lastSyncAt?: Date;
  lastError?: string;
  retryCount: number;
}

interface SyncStatusUpdate {
  status: SyncStatus['status'];
  shopifyProductId?: string;
  error?: string;
}
```

**Storage Schema**:
```sql
-- Product ID mappings
CREATE TABLE product_mappings (
  ghl_product_id VARCHAR(255) PRIMARY KEY,
  shopify_product_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Variant ID mappings (CRITICAL for variant sync)
CREATE TABLE variant_mappings (
  ghl_variant_id VARCHAR(255) PRIMARY KEY,
  shopify_variant_id VARCHAR(255) NOT NULL,
  ghl_product_id VARCHAR(255) NOT NULL,
  shopify_product_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (ghl_product_id) REFERENCES product_mappings(ghl_product_id)
);

-- Sync status tracking
CREATE TABLE sync_status (
  id SERIAL PRIMARY KEY,
  ghl_product_id VARCHAR(255) NOT NULL,
  shopify_product_id VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  last_sync_at TIMESTAMP,
  last_error TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (ghl_product_id) REFERENCES product_mappings(ghl_product_id)
);

-- Sync operation history
CREATE TABLE sync_history (
  id SERIAL PRIMARY KEY,
  ghl_product_id VARCHAR(255) NOT NULL,
  operation VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  error TEXT,
  attempt_number INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Processed events for idempotency (CRITICAL)
CREATE TABLE processed_events (
  event_id VARCHAR(255) PRIMARY KEY,
  ghl_product_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  processed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(ghl_product_id, event_type, processed_at)
);

-- Bulk sync control (prevents race conditions)
CREATE TABLE bulk_sync_control (
  id SERIAL PRIMARY KEY,
  is_running BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  total_products INTEGER,
  processed_count INTEGER DEFAULT 0
);

CREATE INDEX idx_sync_status_ghl_id ON sync_status(ghl_product_id);
CREATE INDEX idx_sync_status_status ON sync_status(status);
CREATE INDEX idx_sync_history_ghl_id ON sync_history(ghl_product_id);
CREATE INDEX idx_variant_mappings_ghl_product ON variant_mappings(ghl_product_id);
CREATE INDEX idx_processed_events_ghl_product ON processed_events(ghl_product_id);
```

### 5. Shopify API Client

**Responsibility**: Handle all communication with Shopify API

**Interface**:
```typescript
interface ShopifyAPIClient {
  /**
   * Create a product in Shopify
   */
  createProduct(product: ShopifyProductInput): Promise<ShopifyProduct>;
  
  /**
   * Update a product in Shopify
   */
  updateProduct(productId: string, updates: Partial<ShopifyProductInput>): Promise<ShopifyProduct>;
  
  /**
   * Get a product from Shopify
   */
  getProduct(productId: string): Promise<ShopifyProduct>;
  
  /**
   * Unpublish a product (archive)
   */
  unpublishProduct(productId: string): Promise<void>;
  
  /**
   * Upload an image to a product
   */
  uploadProductImage(productId: string, imageUrl: string, position: number): Promise<ShopifyImage>;
  
  /**
   * Get all products (for bulk sync)
   */
  getAllProducts(cursor?: string, limit?: number): Promise<PaginatedProducts>;
}

interface ShopifyProduct {
  id: string;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
}

interface PaginatedProducts {
  products: ShopifyProduct[];
  nextCursor?: string;
  hasMore: boolean;
}
```

**Implementation Details**:
- Uses Shopify Admin REST API or GraphQL API
- Implements token-based authentication (OAuth or API key)
- Includes rate limiting middleware (leaky bucket algorithm)
- Automatic retry with exponential backoff for 429 and 5xx errors
- Request/response logging for debugging

### 6. Event Queue

**Responsibility**: Manage asynchronous processing of sync events

**Interface**:
```typescript
interface EventQueue {
  /**
   * Add a sync event to the queue
   */
  enqueue(event: SyncEvent): Promise<void>;
  
  /**
   * Process events from the queue
   */
  process(handler: (event: SyncEvent) => Promise<void>): void;
  
  /**
   * Get queue metrics
   */
  getMetrics(): Promise<QueueMetrics>;
}

interface SyncEvent {
  id: string;
  type: 'product.created' | 'product.updated' | 'product.deleted';
  ghlProductId: string;
  productData: GHLProduct;
  timestamp: Date;
  retryCount: number;
}

interface QueueMetrics {
  pending: number;
  active: number;
  completed: number;
  failed: number;
}
```

**Implementation**:
- Uses BullMQ with Redis backend
- Configurable concurrency (default: 5 concurrent jobs)
- Automatic retry with exponential backoff
- Dead letter queue for permanently failed jobs
- Job deduplication based on GHL product ID

## Data Models

### GHL Product Model

```typescript
interface GHLProduct {
  id: string;                    // Unique GHL product identifier
  title: string;                 // Product name
  description?: string;          // Product description (HTML supported)
  price: number;                 // Base price in cents
  currency: string;              // Currency code (e.g., "USD")
  images?: GHLImage[];          // Product images
  variants?: GHLVariant[];      // Product variants
  inventory_quantity?: number;   // Stock quantity
  sku?: string;                 // Stock keeping unit
  status: 'active' | 'draft';   // Product status
  metadata?: Record<string, any>; // Additional custom fields
  created_at: string;           // ISO 8601 timestamp
  updated_at: string;           // ISO 8601 timestamp
}

interface GHLImage {
  url: string;                  // Image URL
  position: number;             // Display order
  alt_text?: string;           // Alternative text
}

interface GHLVariant {
  id: string;                   // Unique variant identifier
  title: string;                // Variant name
  price: number;                // Variant price in cents
  sku?: string;                // Variant SKU
  inventory_quantity?: number;  // Variant stock
  option1?: string;            // First option (e.g., "Small")
  option2?: string;            // Second option (e.g., "Red")
  option3?: string;            // Third option
}
```

### Shopify Product Model

```typescript
interface ShopifyProduct {
  id: string;                   // Shopify product ID
  title: string;                // Product name
  body_html: string;            // Product description (HTML)
  vendor: string;               // Product vendor/brand
  product_type: string;         // Product category
  created_at: string;           // ISO 8601 timestamp
  updated_at: string;           // ISO 8601 timestamp
  published_at: string | null;  // Publication timestamp (null = unpublished)
  tags: string[];              // Product tags
  variants: ShopifyVariant[];   // Product variants
  images: ShopifyImage[];       // Product images
  options: ShopifyOption[];     // Variant options
  metafields?: ShopifyMetafield[]; // Custom metadata
}

interface ShopifyVariant {
  id: string;                   // Shopify variant ID
  product_id: string;           // Parent product ID
  title: string;                // Variant title
  price: string;                // Price as decimal string
  sku: string;                  // Stock keeping unit
  position: number;             // Display order
  inventory_policy: string;     // "deny" or "continue"
  compare_at_price?: string;    // Original price for discounts
  fulfillment_service: string;  // "manual" or service name
  inventory_management: string; // "shopify" or null
  option1?: string;            // First option value
  option2?: string;            // Second option value
  option3?: string;            // Third option value
  created_at: string;          // ISO 8601 timestamp
  updated_at: string;          // ISO 8601 timestamp
  inventory_quantity: number;   // Stock quantity
}

interface ShopifyImage {
  id: string;                   // Shopify image ID
  product_id: string;           // Parent product ID
  position: number;             // Display order
  src: string;                  // Image URL
  alt?: string;                // Alternative text
  width: number;               // Image width
  height: number;              // Image height
}

interface ShopifyOption {
  id: string;                   // Option ID
  product_id: string;           // Parent product ID
  name: string;                 // Option name (e.g., "Size")
  position: number;             // Display order
  values: string[];            // Possible values
}

interface ShopifyMetafield {
  namespace: string;            // Metafield namespace
  key: string;                  // Metafield key
  value: string;                // Metafield value
  type: string;                 // Value type
}
```

### Product Mapping Model

```typescript
interface ProductMapping {
  ghlProductId: string;         // GHL product identifier
  shopifyProductId: string;     // Shopify product identifier
  createdAt: Date;             // Mapping creation timestamp
  updatedAt: Date;             // Last update timestamp
}
```

### Sync Status Model

```typescript
interface SyncStatus {
  id: number;                   // Database ID
  ghlProductId: string;         // GHL product identifier
  shopifyProductId?: string;    // Shopify product identifier (if synced)
  status: SyncStatusType;       // Current sync status
  lastSyncAt?: Date;           // Last successful sync timestamp
  lastError?: string;          // Last error message
  retryCount: number;          // Number of retry attempts
  createdAt: Date;             // Record creation timestamp
  updatedAt: Date;             // Last update timestamp
}

type SyncStatusType = 'synced' | 'failed' | 'archived' | 'pending';
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I identified several areas where properties can be consolidated:

**Consolidations:**
- Properties 2.2-2.7 (individual field mappings) can be consolidated into a single comprehensive mapping property
- Properties 1.2-1.4 (webhook validation for create/update/delete) can be consolidated into one property about valid webhook acceptance
- Properties 3.3 and 4.5 (retry behavior) are identical and can be consolidated
- Properties 3.4, 4.6, 5.3, 6.2 (status tracking) can be consolidated into comprehensive status tracking properties
- Properties 9.1-9.3 (logging requirements) can be consolidated into comprehensive logging properties

**Redundancies Eliminated:**
- Property 4.2 (mapping lookup) is subsumed by Property 3.2 (mapping storage) - if we store mappings correctly, lookup will work
- Property 6.1 (maintain records) is subsumed by more specific status tracking properties
- Property 11.2 and 11.3 (variant attribute/pricing mapping) are subsumed by Property 11.1 (variant creation)

This reflection reduces ~60 potential properties to ~25 unique, non-redundant properties that provide comprehensive coverage.

### Correctness Properties

### Property 1: Valid Webhook Acceptance

*For any* valid GHL webhook payload (create, update, or delete event) with a correct signature, the Webhook Handler should accept it and return HTTP 200.

**Validates: Requirements 1.2, 1.3, 1.4, 1.6**

### Property 2: Invalid Webhook Rejection

*For any* webhook payload with an invalid signature or malformed structure, the Webhook Handler should reject it and return an appropriate HTTP error code (401 for invalid signature, 400 for malformed payload).

**Validates: Requirements 1.5, 1.6**

### Property 3: Complete Product Mapping

*For any* valid GHL product, the Product Mapper should transform it into a valid Shopify product format with all fields correctly mapped (title, description, price, images, variants, inventory).

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7**

### Property 4: Missing Field Handling

*For any* GHL product with missing required fields, the Product Mapper should either use appropriate default values or throw a validation error.

**Validates: Requirements 2.8**

### Property 5: Product Creation and Mapping Storage

*For any* new GHL product, after successful creation in Shopify, the system should store a bidirectional mapping between the GHL product ID and Shopify product ID, and this mapping should be retrievable.

**Validates: Requirements 3.1, 3.2**

### Property 6: Retry with Exponential Backoff

*For any* sync operation (create or update) that fails, the system should retry up to 3 times with exponential backoff before marking as failed.

**Validates: Requirements 3.3, 4.5**

### Property 7: Successful Sync Status Recording

*For any* product that is successfully created or updated, the Sync Status Tracker should record the status as "synced" with the current timestamp.

**Validates: Requirements 3.4, 4.6, 6.2**

### Property 8: Rate Limit Throttling

*For any* sequence of rapid API requests to Shopify, the system should throttle requests to respect the rate limit (2 requests/second for REST API).

**Validates: Requirements 3.5**

### Property 9: Product Update Operation

*For any* existing GHL product with changes, the system should update only the changed fields in the corresponding Shopify product.

**Validates: Requirements 4.1, 4.3**

### Property 10: Update Fallback to Create

*For any* product update where the Shopify product mapping doesn't exist, the system should create a new product instead of failing.

**Validates: Requirements 4.4**

### Property 11: Product Archival (Not Deletion)

*For any* GHL product deletion event, the system should unpublish (archive) the corresponding Shopify product rather than permanently deleting it, and the product should still exist in Shopify after the operation.

**Validates: Requirements 5.1, 5.2**

### Property 12: Archived Status Recording

*For any* product that is archived, the Sync Status Tracker should record the status as "archived" and maintain the product ID mapping.

**Validates: Requirements 5.3, 5.4**

### Property 13: Sync Status Round Trip

*For any* product sync operation, after recording the sync status, querying by the GHL product ID should return the recorded status with all details (timestamp, error message if any, retry count).

**Validates: Requirements 6.3, 6.4**

### Property 14: Failed Status After Retry Exhaustion

*For any* sync operation that fails all retry attempts, the Sync Status Tracker should mark the product status as "failed" with the error details.

**Validates: Requirements 6.5**

### Property 15: Authentication Failure Handling

*For any* API operation where authentication fails, the system should log the error and halt sync operations without attempting further requests.

**Validates: Requirements 7.4**

### Property 16: Token Refresh Before Expiration

*For any* authentication token with an expiration time, the system should refresh the token before it expires.

**Validates: Requirements 7.5**

### Property 17: Event Processing Order

*For any* sequence of sync events for different products received simultaneously, the system should process them in the order they were received.

**Validates: Requirements 8.1**

### Property 18: Duplicate Event Deduplication

*For any* sync event that is received multiple times for the same product, the system should process it only once (idempotency).

**Validates: Requirements 8.2**

### Property 19: Comprehensive Operation Logging

*For any* sync operation (create, update, archive), the system should log the operation with timestamp, product ID, operation type, and result status.

**Validates: Requirements 9.1**

### Property 20: Error Logging Completeness

*For any* API error or webhook validation failure, the system should log the error with full details including error message, stack trace, and context.

**Validates: Requirements 9.2, 9.3**

### Property 21: Rate Limit Warning

*For any* situation where the API request rate approaches the rate limit threshold (e.g., >80% of limit), the system should log a warning.

**Validates: Requirements 9.5**

### Property 22: Image Order Preservation

*For any* GHL product with multiple images, after syncing to Shopify, the images should maintain the same order as defined in GHL.

**Validates: Requirements 10.1, 10.2**

### Property 23: Image Validation and Partial Success

*For any* product with images, the system should validate that image formats are supported by Shopify, and if some images fail to download/upload, the system should log the errors and continue with remaining images.

**Validates: Requirements 10.4, 10.5**

### Property 24: Variant Synchronization

*For any* GHL product with variants, the system should create corresponding Shopify variants with all attributes (size, color, options), pricing, and inventory correctly mapped, and maintain mappings between GHL variant IDs and Shopify variant IDs.

**Validates: Requirements 11.1, 11.2, 11.3, 11.4**

### Property 25: Variant Changes Synchronization

*For any* product where variants are added or removed in GHL, the system should update the Shopify product to reflect the same variant changes.

**Validates: Requirements 11.5**

### Property 26: Bulk Sync Batching

*For any* bulk sync operation, the system should process products in batches of 50 to respect API rate limits.

**Validates: Requirements 12.2**

### Property 27: Bulk Sync Progress Reporting

*For any* bulk sync operation, the system should provide progress updates showing total products, processed count, succeeded count, and failed count.

**Validates: Requirements 12.3**

### Property 28: Bulk Sync Partial Failure Handling

*For any* bulk sync operation where some products fail, the system should continue processing remaining products and report all failures at the end.

**Validates: Requirements 12.4**


## Error Handling

### Error Categories

The system handles four main categories of errors:

1. **Validation Errors**: Invalid webhook signatures, malformed payloads, missing required fields
2. **API Errors**: Shopify/GHL API failures, rate limiting, authentication failures
3. **Network Errors**: Timeouts, connection failures, DNS resolution issues
4. **Business Logic Errors**: Product not found, mapping conflicts, data inconsistencies

### Error Handling Strategies

#### 1. Webhook Validation Errors

**Strategy**: Fail fast and return appropriate HTTP status codes

```typescript
// Invalid signature
if (!validateSignature(payload, signature)) {
  logger.warn('Invalid webhook signature', { headers });
  return { status: 401, message: 'Unauthorized' };
}

// Malformed payload
if (!isValidWebhookPayload(payload)) {
  logger.error('Malformed webhook payload', { payload });
  return { status: 400, message: 'Bad Request' };
}
```

**Rationale**: Webhook validation errors are not transient and should not be retried. Return error immediately to inform GHL of the issue.

#### 2. API Errors with Retry

**Strategy**: Exponential backoff with jitter for transient errors

```typescript
const retryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  factor: 2,
  jitter: true
};

// Retry logic
for (let attempt = 1; attempt <= retryConfig.maxRetries; attempt++) {
  try {
    return await shopifyAPI.createProduct(product);
  } catch (error) {
    if (!isRetryableError(error) || attempt === retryConfig.maxRetries) {
      throw error;
    }
    
    const delay = calculateBackoff(attempt, retryConfig);
    await sleep(delay);
  }
}
```

**Retryable Errors**:
- HTTP 429 (Rate Limit) - Shopify uses leaky bucket (40 requests with 2/s refill)
- HTTP 500, 502, 503, 504 (Server Errors)
- Network timeouts
- Connection refused

**Non-Retryable Errors**:
- HTTP 400 (Bad Request)
- HTTP 401 (Unauthorized)
- HTTP 403 (Forbidden)
- HTTP 404 (Not Found)
- Validation errors

**Note on Shopify Rate Limiting**: Shopify uses a leaky bucket algorithm with 40 request capacity and 2 requests/second refill rate. This means you can burst up to 40 requests, then throttle to 2/s. Initial implementation should rely on 429 retry handling rather than proactive throttling for better performance.

#### 3. Rate Limiting

**Strategy**: Start with reactive 429 handling, add proactive throttling if needed

```typescript
// Initial approach: Handle 429 responses
async function callShopifyAPI<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error.status === 429) {
      const retryAfter = error.headers['retry-after'] || 2;
      await sleep(retryAfter * 1000);
      return await fn(); // Retry once after waiting
    }
    throw error;
  }
}

// Optional: Proactive rate limiter (if 429s become frequent)
class RateLimiter {
  private tokens: number = 40; // Shopify bucket capacity
  private lastRefill: number = Date.now();
  private readonly capacity = 40;
  private readonly refillRate = 2; // tokens per second

  async acquire(): Promise<void> {
    await this.refillTokens();
    
    if (this.tokens < 1) {
      const waitTime = (1 - this.tokens) / this.refillRate * 1000;
      await sleep(waitTime);
      await this.refillTokens();
    }
    
    this.tokens -= 1;
  }

  private async refillTokens(): Promise<void> {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + timePassed * this.refillRate
    );
    this.lastRefill = now;
  }
}
```

**Rationale**: Shopify's leaky bucket allows bursts of 40 requests. Starting with reactive 429 handling is simpler and more performant than proactive throttling. Add proactive rate limiting only if 429 errors become frequent.

#### 4. Partial Failures

**Strategy**: Continue processing and collect errors

```typescript
async function syncProductImages(
  productId: string,
  images: GHLImage[]
): Promise<ImageSyncResult> {
  const results: ImageSyncResult = {
    succeeded: [],
    failed: []
  };

  for (const image of images) {
    try {
      const shopifyImage = await shopifyAPI.uploadProductImage(
        productId,
        image.url,
        image.position
      );
      results.succeeded.push(shopifyImage);
    } catch (error) {
      logger.error('Image upload failed', { 
        productId, 
        imageUrl: image.url, 
        error 
      });
      results.failed.push({ image, error: error.message });
    }
  }

  return results;
}
```

**Rationale**: Partial failures (e.g., some images failing) should not prevent the entire product sync from succeeding.

#### 5. Dead Letter Queue

**Strategy**: Move permanently failed jobs to DLQ for manual review

```typescript
// BullMQ configuration
const queueConfig = {
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000
    }
  },
  settings: {
    maxStalledCount: 1
  }
};

// Failed job handler
queue.on('failed', async (job, error) => {
  if (job.attemptsMade >= job.opts.attempts) {
    await deadLetterQueue.add('failed-sync', {
      originalJob: job.data,
      error: error.message,
      attempts: job.attemptsMade,
      timestamp: new Date()
    });
    
    await syncStatusTracker.updateSyncStatus(job.data.ghlProductId, {
      status: 'failed',
      error: error.message
    });
  }
});
```

**Rationale**: Jobs that fail after all retries need manual investigation. DLQ preserves the job data for debugging.

#### 6. Circuit Breaker

**Strategy**: Prevent cascading failures when external APIs are down

```typescript
class CircuitBreaker {
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private failureCount = 0;
  private lastFailureTime?: number;
  private readonly threshold = 5;
  private readonly timeout = 60000; // 1 minute

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime! > this.timeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    this.state = 'closed';
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'open';
      logger.error('Circuit breaker opened', { 
        failureCount: this.failureCount 
      });
    }
  }
}
```

**Rationale**: When Shopify API is down, circuit breaker prevents wasting resources on requests that will fail.

### Error Logging

All errors are logged with structured data for debugging:

```typescript
interface ErrorLog {
  level: 'error' | 'warn';
  message: string;
  context: {
    operation: string;
    ghlProductId?: string;
    shopifyProductId?: string;
    attemptNumber?: number;
    errorCode?: string;
    errorMessage: string;
    stackTrace?: string;
    timestamp: string;
  };
}
```

### Monitoring and Alerts

**Metrics to Monitor**:
- Sync success rate (target: >99%)
- Average sync latency (target: <5 seconds)
- Queue depth (alert if >1000)
- API error rate (alert if >5%)
- Circuit breaker state changes
- Dead letter queue size

**Alert Conditions**:
- Sync success rate drops below 95%
- Queue depth exceeds 1000 for >5 minutes
- Circuit breaker opens
- Authentication failures occur
- Dead letter queue grows by >10 items in 1 hour

## Testing Strategy

### Overview

The testing strategy employs a dual approach combining unit tests for specific examples and edge cases with property-based tests for comprehensive coverage of universal behaviors.

### Property-Based Testing

**Library**: fast-check (TypeScript/JavaScript property-based testing library)

**Configuration**:
- Minimum 100 iterations per property test
- Seed-based reproducibility for failed tests
- Shrinking enabled to find minimal failing examples

**Test Structure**:
```typescript
import fc from 'fast-check';

describe('Product Mapper', () => {
  it('Property 3: Complete Product Mapping', () => {
    // Feature: ghl-shopify-product-sync, Property 3: Complete Product Mapping
    fc.assert(
      fc.property(
        ghlProductArbitrary(),
        (ghlProduct) => {
          const shopifyProduct = productMapper.mapToShopify(ghlProduct);
          
          // Verify all fields are correctly mapped
          expect(shopifyProduct.title).toBe(ghlProduct.title);
          expect(shopifyProduct.body_html).toBe(ghlProduct.description);
          expect(shopifyProduct.variants[0].price).toBe(
            (ghlProduct.price / 100).toFixed(2)
          );
          expect(shopifyProduct.images?.length).toBe(
            ghlProduct.images?.length || 0
          );
          expect(shopifyProduct.variants.length).toBe(
            ghlProduct.variants?.length || 1
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Generators (Arbitraries)**:

```typescript
// GHL Product generator
function ghlProductArbitrary(): fc.Arbitrary<GHLProduct> {
  return fc.record({
    id: fc.uuid(),
    title: fc.string({ minLength: 1, maxLength: 255 }),
    description: fc.option(fc.string({ maxLength: 5000 })),
    price: fc.integer({ min: 0, max: 1000000 }), // in cents
    currency: fc.constantFrom('USD', 'EUR', 'GBP'),
    images: fc.option(fc.array(ghlImageArbitrary(), { maxLength: 10 })),
    variants: fc.option(fc.array(ghlVariantArbitrary(), { maxLength: 100 })),
    inventory_quantity: fc.option(fc.integer({ min: 0, max: 10000 })),
    sku: fc.option(fc.string({ maxLength: 50 })),
    status: fc.constantFrom('active', 'draft'),
    metadata: fc.option(fc.dictionary(fc.string(), fc.anything())),
    created_at: fc.date().map(d => d.toISOString()),
    updated_at: fc.date().map(d => d.toISOString())
  });
}

// Webhook payload generator
function webhookPayloadArbitrary(): fc.Arbitrary<GHLWebhookPayload> {
  return fc.record({
    event_type: fc.constantFrom('product.created', 'product.updated', 'product.deleted'),
    product_id: fc.uuid(),
    timestamp: fc.date().map(d => d.toISOString()),
    data: ghlProductArbitrary()
  });
}

// Invalid webhook generator (for negative testing)
function invalidWebhookArbitrary(): fc.Arbitrary<any> {
  return fc.oneof(
    fc.constant(null),
    fc.constant(undefined),
    fc.constant({}),
    fc.record({
      event_type: fc.string(), // invalid event type
      product_id: fc.string()
    }),
    fc.record({
      event_type: fc.constantFrom('product.created', 'product.updated'),
      // missing required fields
    })
  );
}
```

**Property Test Coverage**:

Each of the 28 correctness properties will have a corresponding property-based test:

1. **Property 1-2**: Webhook validation (valid/invalid payloads)
2. **Property 3-4**: Product mapping (complete mapping, missing fields)
3. **Property 5**: Product creation and mapping storage
4. **Property 6**: Retry with exponential backoff
5. **Property 7**: Successful sync status recording
6. **Property 8**: Rate limit throttling
7. **Property 9-10**: Product updates (partial updates, fallback to create)
8. **Property 11-12**: Product archival (not deletion, status recording)
9. **Property 13-14**: Sync status tracking (round trip, failed status)
10. **Property 15-16**: Authentication handling (failure, token refresh)
11. **Property 17-18**: Concurrent operations (ordering, deduplication)
12. **Property 19-21**: Logging (operations, errors, warnings)
13. **Property 22-23**: Image handling (order preservation, partial success)
14. **Property 24-25**: Variant synchronization (creation, updates)
15. **Property 26-28**: Bulk sync (batching, progress, partial failures)

### Unit Testing

**Purpose**: Test specific examples, edge cases, and integration points

**Test Cases**:

```typescript
describe('Webhook Handler', () => {
  it('should reject webhook with missing signature header', async () => {
    const request = {
      headers: {},
      body: validWebhookPayload
    };
    
    const response = await webhookHandler.handleWebhook(request);
    
    expect(response.status).toBe(401);
    expect(response.message).toContain('signature');
  });

  it('should handle webhook with empty product data', async () => {
    const request = {
      headers: { 'x-ghl-signature': 'valid-signature' },
      body: { ...validWebhookPayload, data: {} }
    };
    
    const response = await webhookHandler.handleWebhook(request);
    
    expect(response.status).toBe(400);
  });
});

describe('Product Mapper', () => {
  it('should use default description when missing', () => {
    const ghlProduct = {
      id: '123',
      title: 'Test Product',
      price: 1000,
      currency: 'USD'
    };
    
    const shopifyProduct = productMapper.mapToShopify(ghlProduct);
    
    expect(shopifyProduct.body_html).toBe('');
  });

  it('should handle products with special characters in title', () => {
    const ghlProduct = {
      id: '123',
      title: 'Test & Product <with> "quotes"',
      price: 1000,
      currency: 'USD'
    };
    
    const shopifyProduct = productMapper.mapToShopify(ghlProduct);
    
    expect(shopifyProduct.title).toBe('Test & Product <with> "quotes"');
  });
});

describe('Product Sync Service', () => {
  it('should create product mapping after successful creation', async () => {
    const ghlProduct = createTestGHLProduct();
    const shopifyProductId = await productSyncService.createProduct(
      productMapper.mapToShopify(ghlProduct),
      ghlProduct.id
    );
    
    const mapping = await productMappingStore.getMapping(ghlProduct.id);
    
    expect(mapping).toBeDefined();
    expect(mapping.shopifyProductId).toBe(shopifyProductId);
  });

  it('should handle Shopify API rate limit error', async () => {
    shopifyAPIMock.createProduct.mockRejectedValueOnce(
      new Error('Rate limit exceeded')
    );
    
    const promise = productSyncService.createProduct(
      validShopifyProduct,
      'ghl-123'
    );
    
    // Should retry and eventually succeed
    await expect(promise).resolves.toBeDefined();
    expect(shopifyAPIMock.createProduct).toHaveBeenCalledTimes(2);
  });
});
```

**Edge Cases to Test**:
- Empty strings in required fields
- Very long strings (>255 characters)
- Special characters and Unicode
- Null vs undefined values
- Empty arrays vs missing arrays
- Maximum limits (10 images, 100 variants)
- Concurrent updates to same product
- Network timeouts
- Malformed API responses

### Integration Testing

**Purpose**: Test end-to-end flows with real external dependencies

**Test Scenarios**:

1. **Complete Product Sync Flow**:
   - Receive webhook → Validate → Enqueue → Process → Create in Shopify → Record status

2. **Bulk Sync Flow**:
   - Fetch all GHL products → Process in batches → Create in Shopify → Report progress

3. **Error Recovery Flow**:
   - Simulate API failure → Verify retry → Verify DLQ on final failure

4. **Rate Limiting Flow**:
   - Send rapid requests → Verify throttling → Verify no 429 errors

**Test Environment**:
- Use Shopify test store for integration tests
- Use GHL sandbox environment
- Mock external dependencies for unit/property tests
- Use test database (separate from production)

### Test Organization

```
tests/
├── unit/
│   ├── webhook-handler.test.ts
│   ├── product-mapper.test.ts
│   ├── product-sync-service.test.ts
│   ├── sync-status-tracker.test.ts
│   └── shopify-api-client.test.ts
├── property/
│   ├── webhook-validation.property.test.ts
│   ├── product-mapping.property.test.ts
│   ├── sync-operations.property.test.ts
│   ├── status-tracking.property.test.ts
│   ├── image-handling.property.test.ts
│   └── variant-handling.property.test.ts
├── integration/
│   ├── end-to-end-sync.test.ts
│   ├── bulk-sync.test.ts
│   └── error-recovery.test.ts
└── helpers/
    ├── arbitraries.ts
    ├── test-data.ts
    └── mocks.ts
```

### Test Coverage Goals

- **Unit Tests**: >90% code coverage
- **Property Tests**: 100% of correctness properties covered
- **Integration Tests**: All critical user flows covered
- **Overall**: >85% code coverage with focus on critical paths

### Continuous Testing

- Run unit tests on every commit
- Run property tests on every PR
- Run integration tests nightly
- Monitor test execution time (target: <5 minutes for unit+property tests)

