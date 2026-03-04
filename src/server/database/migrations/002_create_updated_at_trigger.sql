-- Migration: 002_create_updated_at_trigger
-- Description: Create trigger function to automatically update updated_at timestamps
-- Date: 2024

-- ============================================================================
-- Trigger Function for updated_at
-- ============================================================================
-- This function automatically updates the updated_at column whenever a row is modified

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Apply Triggers to Tables
-- ============================================================================

-- Trigger for product_mappings
DROP TRIGGER IF EXISTS update_product_mappings_updated_at ON product_mappings;
CREATE TRIGGER update_product_mappings_updated_at
  BEFORE UPDATE ON product_mappings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for variant_mappings
DROP TRIGGER IF EXISTS update_variant_mappings_updated_at ON variant_mappings;
CREATE TRIGGER update_variant_mappings_updated_at
  BEFORE UPDATE ON variant_mappings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for sync_status
DROP TRIGGER IF EXISTS update_sync_status_updated_at ON sync_status;
CREATE TRIGGER update_sync_status_updated_at
  BEFORE UPDATE ON sync_status
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Comments
-- ============================================================================

COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically updates the updated_at timestamp on row modification';
