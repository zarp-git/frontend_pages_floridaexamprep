/**
 * Database Module Entry Point
 * 
 * Exports all database utilities, types, and functions for the GHL-Shopify sync system.
 */

// Connection utilities
export {
  getPool,
  closePool,
  testConnection,
} from '../config/database';

// Migration utilities
export {
  runMigrations,
  rollbackMigrations,
} from './migrate';

// Database types
export type {
  ProductMapping,
  ProductMappingInsert,
  VariantMapping,
  VariantMappingInsert,
  SyncStatus,
  SyncStatusInsert,
  SyncStatusUpdate,
  SyncStatusType,
  SyncHistory,
  SyncHistoryInsert,
  SyncOperation,
  SyncHistoryStatus,
  ProcessedEvent,
  ProcessedEventInsert,
  EventType,
  BulkSyncControl,
  BulkSyncControlInsert,
  BulkSyncControlUpdate,
} from './types';

// Database utility functions
export {
  createProductMapping,
  getProductMapping,
  updateProductMapping,
  createVariantMapping,
  getVariantMappingsByProduct,
  upsertSyncStatus,
  getSyncStatus,
  updateSyncStatus,
  isEventProcessed,
  markEventProcessed,
  isBulkSyncRunning,
  startBulkSync,
  completeBulkSync,
  updateBulkSyncProgress,
} from './utils';
