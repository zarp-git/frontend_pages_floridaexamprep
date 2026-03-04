/**
 * Type definitions for GHL-Shopify Product Sync
 * 
 * Defines interfaces for GHL products, Shopify products, sync events,
 * and other data structures used throughout the sync system.
 */

// ============================================================================
// GHL Product Types
// ============================================================================

export interface GHLProduct {
  id: string;
  title: string;
  description?: string;
  price: number; // in cents
  currency: string;
  images?: GHLImage[];
  variants?: GHLVariant[];
  inventory_quantity?: number;
  sku?: string;
  status: 'active' | 'draft';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface GHLImage {
  url: string;
  position: number;
  alt_text?: string;
}

export interface GHLVariant {
  id: string;
  title: string;
  price: number; // in cents
  sku?: string;
  inventory_quantity?: number;
  option1?: string;
  option2?: string;
  option3?: string;
}

// ============================================================================
// Webhook Types
// ============================================================================

export type WebhookEventType = 'product.created' | 'product.updated' | 'product.deleted';

export interface GHLWebhookPayload {
  event_id: string; // CRITICAL: Unique event identifier for idempotency
  event_type: WebhookEventType;
  product_id: string;
  timestamp: string;
  data: GHLProduct;
}

export interface WebhookRequest {
  headers: Record<string, string>;
  body: GHLWebhookPayload;
}

export interface WebhookResponse {
  status: number;
  message: string;
}

// ============================================================================
// Shopify Product Types
// ============================================================================

export interface ShopifyProduct {
  id: string;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  tags: string[];
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  options: ShopifyOption[];
  metafields?: ShopifyMetafield[];
}

export interface ShopifyProductInput {
  title: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  variants: ShopifyVariant[];
  images?: ShopifyImage[];
  tags?: string[];
  metafields?: ShopifyMetafield[];
}

export interface ShopifyVariant {
  id?: string;
  product_id?: string;
  title: string;
  price: string;
  sku?: string;
  position?: number;
  inventory_policy?: string;
  compare_at_price?: string;
  fulfillment_service?: string;
  inventory_management?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  created_at?: string;
  updated_at?: string;
  inventory_quantity?: number;
}

export interface ShopifyImage {
  id?: string;
  product_id?: string;
  position: number;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ShopifyOption {
  id?: string;
  product_id?: string;
  name: string;
  position: number;
  values: string[];
}

export interface ShopifyMetafield {
  namespace: string;
  key: string;
  value: string;
  type: string;
}

// ============================================================================
// Sync Event Types
// ============================================================================

export interface SyncEvent {
  id: string;
  type: WebhookEventType;
  ghlProductId: string;
  productData: GHLProduct;
  timestamp: Date;
  retryCount: number;
}

// ============================================================================
// Queue Metrics Types
// ============================================================================

export interface QueueMetrics {
  pending: number;
  active: number;
  completed: number;
  failed: number;
}

// ============================================================================
// Bulk Sync Types
// ============================================================================

export interface BulkSyncProgress {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
}

export interface BulkSyncResult {
  totalProcessed: number;
  succeeded: number;
  failed: number;
  failures: Array<{ ghlProductId: string; error: string }>;
  durationMs: number;
}

// ============================================================================
// Variant Sync Types
// ============================================================================

export interface VariantSyncResult {
  created: ShopifyVariant[];
  updated: ShopifyVariant[];
  deleted: string[]; // Shopify variant IDs
  errors: Array<{ variantId: string; error: string }>;
}
export interface VariantMapping {
  ghlVariantId: string;
  shopifyVariantId: string;
  ghlProductId: string;
  shopifyProductId: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Queue Models
// ============================================================================

export interface QueueMetrics {
  pending: number;
  active: number;
  completed: number;
  failed: number;
}

// ============================================================================
// Bulk Sync Models
// ============================================================================

export interface BulkSyncProgress {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
}

export interface BulkSyncResult {
  totalProcessed: number;
  succeeded: number;
  failed: number;
  failures: Array<{ ghlProductId: string; error: string }>;
  durationMs: number;
}

// ============================================================================
// Variant Sync Models
// ============================================================================

export interface VariantSyncResult {
  created: ShopifyVariant[];
  updated: ShopifyVariant[];
  deleted: string[]; // Shopify variant IDs
  errors: Array<{ variantId: string; error: string }>;
}

// ============================================================================
// Image Sync Models
// ============================================================================

export interface ImageSyncResult {
  succeeded: ShopifyImage[];
  failed: Array<{ image: GHLImage; error: string }>;
}

// ============================================================================
// Error Models
// ============================================================================

export interface ErrorLog {
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
