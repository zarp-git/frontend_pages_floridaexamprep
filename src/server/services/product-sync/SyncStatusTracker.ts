import { getPool } from '../../config/database';
import type {
  SyncStatus,
  SyncStatusInsert,
  SyncStatusUpdate,
  SyncHistory,
  SyncHistoryInsert,
} from '../../database/types';

/**
 * SyncStatusTracker
 * 
 * Maintains synchronization state and history for product sync operations.
 * Provides methods to record sync attempts, query sync status, and manage retry queues.
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */
export class SyncStatusTracker {
  /**
   * Record a sync operation attempt
   * 
   * Logs the sync operation to the sync_history table for audit trail.
   * 
   * @param record - The sync record to log
   * @returns Promise that resolves when the record is saved
   */
  async recordSyncAttempt(record: SyncRecord): Promise<void> {
    const pool = getPool();
    
    const historyInsert: SyncHistoryInsert = {
      ghl_product_id: record.ghlProductId,
      operation: record.operation,
      status: record.status,
      error: record.error,
      attempt_number: record.attemptNumber,
    };
    
    await pool.query<SyncHistory>(
      `INSERT INTO sync_history 
       (ghl_product_id, operation, status, error, attempt_number)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        historyInsert.ghl_product_id,
        historyInsert.operation,
        historyInsert.status,
        historyInsert.error || null,
        historyInsert.attempt_number,
      ]
    );
    
    // Also update or create the sync_status record
    if (record.shopifyProductId || record.status === 'success') {
      await this.upsertSyncStatus({
        ghl_product_id: record.ghlProductId,
        shopify_product_id: record.shopifyProductId,
        status: this.mapHistoryStatusToSyncStatus(record.status),
        last_sync_at: record.status === 'success' ? new Date() : undefined,
        last_error: record.error,
        retry_count: record.attemptNumber - 1, // attemptNumber is 1-based
      });
    }
  }
  
  /**
   * Get sync status for a product by GHL product ID
   * 
   * @param ghlProductId - The GHL product ID to query
   * @returns Promise that resolves to the sync status or null if not found
   */
  async getSyncStatus(ghlProductId: string): Promise<SyncStatus | null> {
    const pool = getPool();
    
    const result = await pool.query<SyncStatus>(
      'SELECT * FROM sync_status WHERE ghl_product_id = $1',
      [ghlProductId]
    );
    
    return result.rows[0] || null;
  }
  
  /**
   * Get all failed syncs for retry queue
   * 
   * Returns products that have failed sync operations and may need retry.
   * 
   * @param limit - Maximum number of failed syncs to return (default: 100)
   * @returns Promise that resolves to array of failed sync statuses
   */
  async getFailedSyncs(limit: number = 100): Promise<SyncStatus[]> {
    const pool = getPool();
    
    const result = await pool.query<SyncStatus>(
      `SELECT * FROM sync_status 
       WHERE status = 'failed'
       ORDER BY updated_at ASC
       LIMIT $1`,
      [limit]
    );
    
    return result.rows;
  }
  
  /**
   * Update sync status for a product
   * 
   * Updates the sync_status record with new status information.
   * 
   * @param ghlProductId - The GHL product ID to update
   * @param status - The status update to apply
   * @returns Promise that resolves when the update is complete
   */
  async updateSyncStatus(
    ghlProductId: string,
    status: SyncStatusUpdate
  ): Promise<void> {
    const pool = getPool();
    
    const setClauses: string[] = ['updated_at = NOW()'];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (status.shopify_product_id !== undefined) {
      setClauses.push(`shopify_product_id = $${paramIndex++}`);
      values.push(status.shopify_product_id);
    }
    
    if (status.status !== undefined) {
      setClauses.push(`status = $${paramIndex++}`);
      values.push(status.status);
    }
    
    if (status.last_sync_at !== undefined) {
      setClauses.push(`last_sync_at = $${paramIndex++}`);
      values.push(status.last_sync_at);
    }
    
    if (status.last_error !== undefined) {
      setClauses.push(`last_error = $${paramIndex++}`);
      values.push(status.last_error);
    }
    
    if (status.retry_count !== undefined) {
      setClauses.push(`retry_count = $${paramIndex++}`);
      values.push(status.retry_count);
    }
    
    values.push(ghlProductId);
    
    await pool.query(
      `UPDATE sync_status 
       SET ${setClauses.join(', ')}
       WHERE ghl_product_id = $${paramIndex}`,
      values
    );
  }
  
  /**
   * Helper method to upsert sync status
   * 
   * Creates or updates a sync_status record.
   * 
   * @param status - The sync status to insert or update
   * @returns Promise that resolves to the created/updated sync status
   */
  private async upsertSyncStatus(status: SyncStatusInsert): Promise<SyncStatus> {
    const pool = getPool();
    
    const result = await pool.query<SyncStatus>(
      `INSERT INTO sync_status 
       (ghl_product_id, shopify_product_id, status, last_sync_at, last_error, retry_count)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (ghl_product_id) 
       DO UPDATE SET
         shopify_product_id = COALESCE(EXCLUDED.shopify_product_id, sync_status.shopify_product_id),
         status = EXCLUDED.status,
         last_sync_at = COALESCE(EXCLUDED.last_sync_at, sync_status.last_sync_at),
         last_error = EXCLUDED.last_error,
         retry_count = EXCLUDED.retry_count,
         updated_at = NOW()
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
   * Map sync history status to sync status type
   * 
   * Converts the history status (pending/success/failed) to the appropriate
   * sync status type (pending/synced/failed).
   * 
   * @param historyStatus - The history status to map
   * @returns The corresponding sync status type
   */
  private mapHistoryStatusToSyncStatus(
    historyStatus: 'pending' | 'success' | 'failed'
  ): 'pending' | 'synced' | 'failed' {
    switch (historyStatus) {
      case 'pending':
        return 'pending';
      case 'success':
        return 'synced';
      case 'failed':
        return 'failed';
    }
  }
}

/**
 * SyncRecord interface
 * 
 * Represents a sync operation attempt to be recorded.
 */
export interface SyncRecord {
  ghlProductId: string;
  shopifyProductId?: string;
  operation: 'create' | 'update' | 'archive';
  status: 'pending' | 'success' | 'failed';
  error?: string;
  attemptNumber: number;
}
