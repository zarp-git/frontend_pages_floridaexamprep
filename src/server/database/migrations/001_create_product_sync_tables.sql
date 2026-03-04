-- Migration: 001_create_product_sync_tables
-- Description: Create tables for GHL-Shopify product synchronization
-- Requirements: 3.2, 6.1, 6.2, 6.3
-- Date: 2024

-- ============================================================================
-- Product ID Mappings
-- ============================================================================
-- Stores bidirectional mapping between GHL and Shopify product IDs
CREATE TABLE IF NOT EXISTS product_mappings (
  ghl_product_id VARCHAR(255) PRIMARY KEY,
  shopify_product_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Variant ID Mappings (CRITICAL for variant sync)
-- ============================================================================
-- Stores mapping between GHL and Shopify variant IDs
-- Required for complex variant synchronization operations
CREATE TABLE IF NOT EXISTS variant_mappings (
  ghl_variant_id VARCHAR(255) PRIMARY KEY,
  shopify_variant_id VARCHAR(255) NOT NULL,
  ghl_product_id VARCHAR(255) NOT NULL,
  shopify_product_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (ghl_product_id) REFERENCES product_mappings(ghl_product_id) ON DELETE CASCADE
);

-- ============================================================================
-- Sync Status Tracking
-- ============================================================================
-- Tracks the current synchronization status of each product
CREATE TABLE IF NOT EXISTS sync_status (
  id SERIAL PRIMARY KEY,
  ghl_product_id VARCHAR(255) NOT NULL UNIQUE,
  shopify_product_id VARCHAR(255),
  status VARCHAR(50) NOT NULL CHECK (status IN ('synced', 'failed', 'archived', 'pending')),
  last_sync_at TIMESTAMP,
  last_error TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (ghl_product_id) REFERENCES product_mappings(ghl_product_id) ON DELETE CASCADE
);

-- ============================================================================
-- Sync Operation History
-- ============================================================================
-- Maintains a complete audit trail of all sync operations
CREATE TABLE IF NOT EXISTS sync_history (
  id SERIAL PRIMARY KEY,
  ghl_product_id VARCHAR(255) NOT NULL,
  operation VARCHAR(50) NOT NULL CHECK (operation IN ('create', 'update', 'archive')),
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'success', 'failed')),
  error TEXT,
  attempt_number INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Processed Events (CRITICAL for idempotency)
-- ============================================================================
-- Ensures webhook events are processed exactly once
-- Prevents duplicate processing of the same event
CREATE TABLE IF NOT EXISTS processed_events (
  event_id VARCHAR(255) PRIMARY KEY,
  ghl_product_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('product.created', 'product.updated', 'product.deleted')),
  processed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(ghl_product_id, event_type, processed_at)
);

-- ============================================================================
-- Bulk Sync Control (prevents race conditions)
-- ============================================================================
-- Manages bulk synchronization operations
-- Prevents concurrent bulk syncs and race conditions with webhooks
CREATE TABLE IF NOT EXISTS bulk_sync_control (
  id SERIAL PRIMARY KEY,
  is_running BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  total_products INTEGER,
  processed_count INTEGER DEFAULT 0
);

-- ============================================================================
-- Performance Indexes
-- ============================================================================

-- Index for sync status lookups by GHL product ID
CREATE INDEX IF NOT EXISTS idx_sync_status_ghl_id ON sync_status(ghl_product_id);

-- Index for filtering sync status by status type
CREATE INDEX IF NOT EXISTS idx_sync_status_status ON sync_status(status);

-- Index for sync history lookups by GHL product ID
CREATE INDEX IF NOT EXISTS idx_sync_history_ghl_id ON sync_history(ghl_product_id);

-- Index for variant mappings by GHL product ID (for bulk operations)
CREATE INDEX IF NOT EXISTS idx_variant_mappings_ghl_product ON variant_mappings(ghl_product_id);

-- Index for processed events by GHL product ID (for idempotency checks)
CREATE INDEX IF NOT EXISTS idx_processed_events_ghl_product ON processed_events(ghl_product_id);

-- Index for processed events by event type (for analytics)
CREATE INDEX IF NOT EXISTS idx_processed_events_type ON processed_events(event_type);

-- ============================================================================
-- Comments for Documentation
-- ============================================================================

COMMENT ON TABLE product_mappings IS 'Bidirectional mapping between GHL and Shopify product IDs';
COMMENT ON TABLE variant_mappings IS 'Mapping between GHL and Shopify variant IDs - critical for variant sync';
COMMENT ON TABLE sync_status IS 'Current synchronization status of each product';
COMMENT ON TABLE sync_history IS 'Complete audit trail of all sync operations';
COMMENT ON TABLE processed_events IS 'Ensures idempotency by tracking processed webhook events';
COMMENT ON TABLE bulk_sync_control IS 'Manages bulk sync operations and prevents race conditions';
