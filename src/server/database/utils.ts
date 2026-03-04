import { getPool } from '../config/database';
import type {
  ProductMapping,
  ProductMappingInsert,
  VariantMapping,
  VariantMappingInsert,
  SyncStatus,
  SyncStatusInsert,
  SyncStatusUpdate,
  ProcessedEventInsert,
} from './types';

/**
 * Database Utility Functions
 * 
 * Helper functions for common database operations related to product sync.
 * These functions provide a simple interface to the database layer.
 */

// ============================================================================
// Product Mapping Operations
// ============================================================================

/**
 * Create a new product mapping
 */
export async function createProductMapping(
  mapping: ProductMappingInsert
): Promise<ProductMapping> {
  const pool = getPool();
  
  const result = await pool.query<ProductMapping>(
    `INSERT INTO product_mappings (ghl_product_id, shopify_product_id)
     VALUES ($1, $2)
     RETURNING *`,
    [mapping.ghl_product_id, mapping.shopify_product_id]
  );
  
  return result.rows[0];
}

/**
 * Get product mapping by GHL product ID
 */
export async function getProductMapping(
  ghlProductId: string
): Promise<ProductMapping | null> {
  const pool = getPool();
  
  const result = await pool.query<ProductMapping>(
    'SELECT * FROM product_mappings WHERE ghl_product_id = $1',
    [ghlProductId]
  );
  
  return result.rows[0] || null;
}

/**
 * Update product mapping
 */
export async function updateProductMapping(
  ghlProductId: string,
  shopifyProductId: string
): Promise<ProductMapping> {
  const pool = getPool();
  
  const result = await pool.query<ProductMapping>(
    `UPDATE product_mappings 
     SET shopify_product_id = $2
     WHERE ghl_product_id = $1
     RETURNING *`,
    [ghlProductId, shopifyProductId]
  );
  
  return result.rows[0];
}

// ============================================================================
// Variant Mapping Operations
// ============================================================================

/**
 * Create a new variant mapping
 */
export async function createVariantMapping(
  mapping: VariantMappingInsert
): Promise<VariantMapping> {
  const pool = getPool();
  
  const result = await pool.query<VariantMapping>(
    `INSERT INTO variant_mappings 
     (ghl_variant_id, shopify_variant_id, ghl_product_id, shopify_product_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [
      mapping.ghl_variant_id,
      mapping.shopify_variant_id,
      mapping.ghl_product_id,
      mapping.shopify_product_id,
    ]
  );
  
  return result.rows[0];
}

/**
 * Get variant mappings by GHL product ID
 */
export async function getVariantMappingsByProduct(
  ghlProductId: string
): Promise<VariantMapping[]> {
  const pool = getPool();
  
  const result = await pool.query<VariantMapping>(
    'SELECT * FROM variant_mappings WHERE ghl_product_id = $1',
    [ghlProductId]
  );
  
  return result.rows;
}

// ============================================================================
// Sync Status Operations
// ============================================================================

/**
 * Create or update sync status
 */
export async function upsertSyncStatus(
  status: SyncStatusInsert
): Promise<SyncStatus> {
  const pool = getPool();
  
  const result = await pool.query<SyncStatus>(
    `INSERT INTO sync_status 
     (ghl_product_id, shopify_product_id, status, last_sync_at, last_error, retry_count)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (ghl_product_id) 
     DO UPDATE SET
       shopify_product_id = EXCLUDED.shopify_product_id,
       status = EXCLUDED.status,
       last_sync_at = EXCLUDED.last_sync_at,
       last_error = EXCLUDED.last_error,
       retry_count = EXCLUDED.retry_count
     RETURNING *`,
    [
      status.ghl_product_id,
      status.shopify_product_id || null,
      status.status,
      status.last_sync_at || null,
      status.last_error || null,
      status.retry_count || 0,
    ]
  );
  
  return result.rows[0];
}

/**
 * Get sync status by GHL product ID
 */
export async function getSyncStatus(
  ghlProductId: string
): Promise<SyncStatus | null> {
  const pool = getPool();
  
  const result = await pool.query<SyncStatus>(
    'SELECT * FROM sync_status WHERE ghl_product_id = $1',
    [ghlProductId]
  );
  
  return result.rows[0] || null;
}

/**
 * Update sync status
 */
export async function updateSyncStatus(
  ghlProductId: string,
  updates: SyncStatusUpdate
): Promise<SyncStatus> {
  const pool = getPool();
  
  const setClauses: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;
  
  if (updates.shopify_product_id !== undefined) {
    setClauses.push(`shopify_product_id = $${paramIndex++}`);
    values.push(updates.shopify_product_id);
  }
  
  if (updates.status !== undefined) {
    setClauses.push(`status = $${paramIndex++}`);
    values.push(updates.status);
  }
  
  if (updates.last_sync_at !== undefined) {
    setClauses.push(`last_sync_at = $${paramIndex++}`);
    values.push(updates.last_sync_at);
  }
  
  if (updates.last_error !== undefined) {
    setClauses.push(`last_error = $${paramIndex++}`);
    values.push(updates.last_error);
  }
  
  if (updates.retry_count !== undefined) {
    setClauses.push(`retry_count = $${paramIndex++}`);
    values.push(updates.retry_count);
  }
  
  values.push(ghlProductId);
  
  const result = await pool.query<SyncStatus>(
    `UPDATE sync_status 
     SET ${setClauses.join(', ')}
     WHERE ghl_product_id = $${paramIndex}
     RETURNING *`,
    values
  );
  
  return result.rows[0];
}

// ============================================================================
// Processed Events Operations (Idempotency)
// ============================================================================

/**
 * Check if an event has been processed
 */
export async function isEventProcessed(eventId: string): Promise<boolean> {
  const pool = getPool();
  
  const result = await pool.query(
    'SELECT 1 FROM processed_events WHERE event_id = $1',
    [eventId]
  );
  
  return result.rows.length > 0;
}

/**
 * Mark an event as processed
 */
export async function markEventProcessed(
  event: ProcessedEventInsert
): Promise<void> {
  const pool = getPool();
  
  await pool.query(
    `INSERT INTO processed_events (event_id, ghl_product_id, event_type)
     VALUES ($1, $2, $3)
     ON CONFLICT (event_id) DO NOTHING`,
    [event.event_id, event.ghl_product_id, event.event_type]
  );
}

// ============================================================================
// Bulk Sync Control Operations
// ============================================================================

/**
 * Check if bulk sync is currently running
 */
export async function isBulkSyncRunning(): Promise<boolean> {
  const pool = getPool();
  
  const result = await pool.query(
    'SELECT is_running FROM bulk_sync_control ORDER BY id DESC LIMIT 1'
  );
  
  return result.rows[0]?.is_running || false;
}

/**
 * Start bulk sync operation
 */
export async function startBulkSync(totalProducts: number): Promise<number> {
  const pool = getPool();
  
  const result = await pool.query<{ id: number }>(
    `INSERT INTO bulk_sync_control (is_running, started_at, total_products, processed_count)
     VALUES (true, NOW(), $1, 0)
     RETURNING id`,
    [totalProducts]
  );
  
  return result.rows[0].id;
}

/**
 * Complete bulk sync operation
 */
export async function completeBulkSync(syncId: number): Promise<void> {
  const pool = getPool();
  
  await pool.query(
    `UPDATE bulk_sync_control 
     SET is_running = false, completed_at = NOW()
     WHERE id = $1`,
    [syncId]
  );
}

/**
 * Update bulk sync progress
 */
export async function updateBulkSyncProgress(
  syncId: number,
  processedCount: number
): Promise<void> {
  const pool = getPool();
  
  await pool.query(
    'UPDATE bulk_sync_control SET processed_count = $2 WHERE id = $1',
    [syncId, processedCount]
  );
}
