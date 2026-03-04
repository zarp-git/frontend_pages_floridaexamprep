/**
 * Database Types for GHL-Shopify Product Sync
 * 
 * TypeScript interfaces matching the database schema
 */

// ============================================================================
// Product Mapping Types
// ============================================================================

export interface ProductMapping {
  ghl_product_id: string;
  shopify_product_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductMappingInsert {
  ghl_product_id: string;
  shopify_product_id: string;
}

// ============================================================================
// Variant Mapping Types
// ============================================================================

export interface VariantMapping {
  ghl_variant_id: string;
  shopify_variant_id: string;
  ghl_product_id: string;
  shopify_product_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface VariantMappingInsert {
  ghl_variant_id: string;
  shopify_variant_id: string;
  ghl_product_id: string;
  shopify_product_id: string;
}

// ============================================================================
// Sync Status Types
// ============================================================================

export type SyncStatusType = 'synced' | 'failed' | 'archived' | 'pending';

export interface SyncStatus {
  id: number;
  ghl_product_id: string;
  shopify_product_id: string | null;
  status: SyncStatusType;
  last_sync_at: Date | null;
  last_error: string | null;
  retry_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface SyncStatusInsert {
  ghl_product_id: string;
  shopify_product_id?: string;
  status: SyncStatusType;
  last_sync_at?: Date;
  last_error?: string;
  retry_count?: number;
}

export interface SyncStatusUpdate {
  shopify_product_id?: string;
  status?: SyncStatusType;
  last_sync_at?: Date;
  last_error?: string;
  retry_count?: number;
}

// ============================================================================
// Sync History Types
// ============================================================================

export type SyncOperation = 'create' | 'update' | 'archive';
export type SyncHistoryStatus = 'pending' | 'success' | 'failed';

export interface SyncHistory {
  id: number;
  ghl_product_id: string;
  operation: SyncOperation;
  status: SyncHistoryStatus;
  error: string | null;
  attempt_number: number;
  created_at: Date;
}

export interface SyncHistoryInsert {
  ghl_product_id: string;
  operation: SyncOperation;
  status: SyncHistoryStatus;
  error?: string;
  attempt_number: number;
}

// ============================================================================
// Processed Events Types
// ============================================================================

export type EventType = 'product.created' | 'product.updated' | 'product.deleted';

export interface ProcessedEvent {
  event_id: string;
  ghl_product_id: string;
  event_type: EventType;
  processed_at: Date;
}

export interface ProcessedEventInsert {
  event_id: string;
  ghl_product_id: string;
  event_type: EventType;
}

// ============================================================================
// Bulk Sync Control Types
// ============================================================================

export interface BulkSyncControl {
  id: number;
  is_running: boolean;
  started_at: Date | null;
  completed_at: Date | null;
  total_products: number | null;
  processed_count: number;
}

export interface BulkSyncControlInsert {
  is_running: boolean;
  started_at?: Date;
  total_products?: number;
}

export interface BulkSyncControlUpdate {
  is_running?: boolean;
  completed_at?: Date;
  processed_count?: number;
}
