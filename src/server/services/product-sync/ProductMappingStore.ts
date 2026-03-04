import { getPool } from '../../config/database';
import type {
  ProductMapping,
  ProductMappingInsert,
  VariantMapping,
  VariantMappingInsert,
} from '../../database/types';

/**
 * ProductMappingStore
 * 
 * Manages bidirectional mappings between GHL and Shopify product/variant IDs.
 * Provides methods to store and retrieve ID mappings for products and variants.
 * 
 * CRITICAL: Variant mappings are essential for complex variant sync operations.
 * 
 * Requirements: 3.2, 4.2, 5.4, 11.4
 */
export class ProductMappingStore {
  /**
   * Store a product ID mapping (GHL ↔ Shopify)
   * 
   * Creates or updates the mapping between a GHL product ID and Shopify product ID.
   * Uses upsert to handle cases where mapping already exists.
   * 
   * @param ghlProductId - The GHL product identifier
   * @param shopifyProductId - The Shopify product identifier
   * @returns Promise that resolves to the created/updated mapping
   */
  async storeMapping(
    ghlProductId: string,
    shopifyProductId: string
  ): Promise<ProductMapping> {
    const pool = getPool();
    
    const result = await pool.query<ProductMapping>(
      `INSERT INTO product_mappings (ghl_product_id, shopify_product_id)
       VALUES ($1, $2)
       ON CONFLICT (ghl_product_id) 
       DO UPDATE SET
         shopify_product_id = EXCLUDED.shopify_product_id,
         updated_at = NOW()
       RETURNING *`,
      [ghlProductId, shopifyProductId]
    );
    
    return result.rows[0];
  }
  
  /**
   * Get product mapping by GHL product ID
   * 
   * Retrieves the complete mapping record including timestamps.
   * 
   * @param ghlProductId - The GHL product ID to look up
   * @returns Promise that resolves to the mapping or null if not found
   */
  async getMapping(ghlProductId: string): Promise<ProductMapping | null> {
    const pool = getPool();
    
    const result = await pool.query<ProductMapping>(
      'SELECT * FROM product_mappings WHERE ghl_product_id = $1',
      [ghlProductId]
    );
    
    return result.rows[0] || null;
  }
  
  /**
   * Get Shopify product ID by GHL product ID (helper method)
   * 
   * Convenience method that returns just the Shopify ID without full mapping record.
   * 
   * @param ghlProductId - The GHL product ID to look up
   * @returns Promise that resolves to the Shopify product ID or null if not found
   */
  async getShopifyId(ghlProductId: string): Promise<string | null> {
    const mapping = await this.getMapping(ghlProductId);
    return mapping?.shopify_product_id || null;
  }
  
  /**
   * Store a variant ID mapping (GHL variant ↔ Shopify variant)
   * 
   * CRITICAL: This method is essential for variant synchronization.
   * Creates or updates the mapping between GHL and Shopify variant IDs.
   * Also stores the parent product IDs for reference.
   * 
   * @param ghlVariantId - The GHL variant identifier
   * @param shopifyVariantId - The Shopify variant identifier
   * @param ghlProductId - The parent GHL product identifier
   * @param shopifyProductId - The parent Shopify product identifier
   * @returns Promise that resolves to the created/updated variant mapping
   */
  async storeVariantMapping(
    ghlVariantId: string,
    shopifyVariantId: string,
    ghlProductId: string,
    shopifyProductId: string
  ): Promise<VariantMapping> {
    const pool = getPool();
    
    const result = await pool.query<VariantMapping>(
      `INSERT INTO variant_mappings 
       (ghl_variant_id, shopify_variant_id, ghl_product_id, shopify_product_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (ghl_variant_id) 
       DO UPDATE SET
         shopify_variant_id = EXCLUDED.shopify_variant_id,
         ghl_product_id = EXCLUDED.ghl_product_id,
         shopify_product_id = EXCLUDED.shopify_product_id,
         updated_at = NOW()
       RETURNING *`,
      [ghlVariantId, shopifyVariantId, ghlProductId, shopifyProductId]
    );
    
    return result.rows[0];
  }
  
  /**
   * Get variant mapping by GHL variant ID
   * 
   * Retrieves the complete variant mapping record including parent product IDs.
   * 
   * @param ghlVariantId - The GHL variant ID to look up
   * @returns Promise that resolves to the variant mapping or null if not found
   */
  async getVariantMapping(ghlVariantId: string): Promise<VariantMapping | null> {
    const pool = getPool();
    
    const result = await pool.query<VariantMapping>(
      'SELECT * FROM variant_mappings WHERE ghl_variant_id = $1',
      [ghlVariantId]
    );
    
    return result.rows[0] || null;
  }
  
  /**
   * Get all variant mappings for a product
   * 
   * Retrieves all variant mappings associated with a GHL product.
   * Useful for bulk variant operations and synchronization.
   * 
   * @param ghlProductId - The GHL product ID to look up variants for
   * @returns Promise that resolves to array of variant mappings
   */
  async getVariantMappingsByProduct(
    ghlProductId: string
  ): Promise<VariantMapping[]> {
    const pool = getPool();
    
    const result = await pool.query<VariantMapping>(
      'SELECT * FROM variant_mappings WHERE ghl_product_id = $1 ORDER BY created_at ASC',
      [ghlProductId]
    );
    
    return result.rows;
  }
  
  /**
   * Get Shopify variant ID by GHL variant ID (helper method)
   * 
   * Convenience method that returns just the Shopify variant ID.
   * 
   * @param ghlVariantId - The GHL variant ID to look up
   * @returns Promise that resolves to the Shopify variant ID or null if not found
   */
  async getShopifyVariantId(ghlVariantId: string): Promise<string | null> {
    const mapping = await this.getVariantMapping(ghlVariantId);
    return mapping?.shopify_variant_id || null;
  }
  
  /**
   * Delete variant mapping
   * 
   * Removes a variant mapping when a variant is deleted.
   * Used during variant synchronization when variants are removed from GHL.
   * 
   * @param ghlVariantId - The GHL variant ID to delete mapping for
   * @returns Promise that resolves when the mapping is deleted
   */
  async deleteVariantMapping(ghlVariantId: string): Promise<void> {
    const pool = getPool();
    
    await pool.query(
      'DELETE FROM variant_mappings WHERE ghl_variant_id = $1',
      [ghlVariantId]
    );
  }
  
  /**
   * Delete all variant mappings for a product
   * 
   * Removes all variant mappings associated with a product.
   * Used when a product is deleted or all variants need to be re-synced.
   * 
   * @param ghlProductId - The GHL product ID to delete variant mappings for
   * @returns Promise that resolves when all mappings are deleted
   */
  async deleteVariantMappingsByProduct(ghlProductId: string): Promise<void> {
    const pool = getPool();
    
    await pool.query(
      'DELETE FROM variant_mappings WHERE ghl_product_id = $1',
      [ghlProductId]
    );
  }
}
