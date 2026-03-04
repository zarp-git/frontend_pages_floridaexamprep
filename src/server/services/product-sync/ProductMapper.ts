/**
 * ProductMapper - Transforms GHL product data into Shopify product format
 * 
 * This class handles the transformation of product data between GoHighLevel
 * and Shopify formats, including field mapping, validation, and default values.
 * 
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8
 */

import type {
  GHLProduct,
  GHLVariant,
  GHLImage,
  ShopifyProductInput,
  ShopifyVariant,
  ShopifyImage,
  ShopifyMetafield,
} from '@/types/ghl-shopify-sync';

/**
 * Validation Error for missing required fields
 */
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * ProductMapper class for transforming GHL products to Shopify format
 */
export class ProductMapper {
  /**
   * Map GHL product to Shopify product format
   * 
   * Mapping Rules:
   * - ghlProduct.title → shopifyProduct.title
   * - ghlProduct.description → shopifyProduct.body_html
   * - ghlProduct.price → shopifyProduct.variants[0].price (formatted as string)
   * - ghlProduct.images → shopifyProduct.images (validated URLs)
   * - Missing required fields → Use defaults or throw ValidationError
   * - Store GHL product ID in Shopify metafield for reference
   * 
   * @param ghlProduct - The GHL product to transform
   * @returns Shopify product input ready for API submission
   * @throws ValidationError if required fields are missing
   */
  mapToShopify(ghlProduct: GHLProduct): ShopifyProductInput {
    // Validate required fields
    if (!ghlProduct.title || ghlProduct.title.trim() === '') {
      throw new ValidationError('Product title is required', 'title');
    }

    if (ghlProduct.price === undefined || ghlProduct.price === null) {
      throw new ValidationError('Product price is required', 'price');
    }

    if (ghlProduct.price < 0) {
      throw new ValidationError('Product price cannot be negative', 'price');
    }

    // Map variants (or create default variant if none exist)
    const variants = this.mapVariants(ghlProduct);

    // Map images if present
    const images = ghlProduct.images ? this.mapImages(ghlProduct.images) : undefined;

    // Create metafield to store GHL product ID for reference
    const metafields: ShopifyMetafield[] = [
      {
        namespace: 'ghl_sync',
        key: 'ghl_product_id',
        value: ghlProduct.id,
        type: 'single_line_text_field',
      },
    ];

    // Build Shopify product input
    const shopifyProduct: ShopifyProductInput = {
      title: ghlProduct.title,
      body_html: ghlProduct.description || '',
      vendor: 'GoHighLevel',
      product_type: 'Synced Product',
      variants,
      images,
      tags: ['ghl-synced'],
      metafields,
    };

    return shopifyProduct;
  }

  /**
   * Map GHL product variants to Shopify variants
   * 
   * If the GHL product has no variants, creates a default variant with the base product data.
   * If variants exist, maps each variant with its specific attributes.
   * 
   * Mapping Rules:
   * - ghlVariant.title → shopifyVariant.title
   * - ghlVariant.price → shopifyVariant.price (formatted as decimal string)
   * - ghlVariant.sku → shopifyVariant.sku
   * - ghlVariant.inventory_quantity → shopifyVariant.inventory_quantity
   * - ghlVariant.option1/2/3 → shopifyVariant.option1/2/3
   * 
   * @param ghlProduct - The GHL product containing variant data
   * @returns Array of Shopify variants
   */
  mapVariants(ghlProduct: GHLProduct): ShopifyVariant[] {
    // If no variants, create a default variant with base product data
    if (!ghlProduct.variants || ghlProduct.variants.length === 0) {
      return [
        {
          id: '', // Will be assigned by Shopify
          product_id: '', // Will be assigned by Shopify
          title: 'Default',
          price: this.formatPrice(ghlProduct.price),
          sku: ghlProduct.sku || '',
          position: 1,
          inventory_policy: 'deny',
          fulfillment_service: 'manual',
          inventory_management: 'shopify',
          inventory_quantity: ghlProduct.inventory_quantity || 0,
          option1: 'Default',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
    }

    // Map each GHL variant to Shopify format
    return ghlProduct.variants.map((ghlVariant, index) => ({
      id: '', // Will be assigned by Shopify
      product_id: '', // Will be assigned by Shopify
      title: ghlVariant.title,
      price: this.formatPrice(ghlVariant.price),
      sku: ghlVariant.sku || '',
      position: index + 1,
      inventory_policy: 'deny',
      fulfillment_service: 'manual',
      inventory_management: 'shopify',
      inventory_quantity: ghlVariant.inventory_quantity || 0,
      option1: ghlVariant.option1,
      option2: ghlVariant.option2,
      option3: ghlVariant.option3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  }

  /**
   * Validate and prepare image URLs for Shopify
   * 
   * Validates that image URLs are properly formatted and filters out invalid URLs.
   * Maintains the order of images as defined in GHL.
   * 
   * Validation Rules:
   * - URL must be a valid HTTP/HTTPS URL
   * - URL must be accessible (basic format check)
   * - Invalid images are filtered out (logged but don't fail the entire operation)
   * 
   * @param ghlImages - Array of GHL images
   * @returns Array of Shopify images with validated URLs
   */
  mapImages(ghlImages: GHLImage[]): ShopifyImage[] {
    const validImages: ShopifyImage[] = [];

    for (const ghlImage of ghlImages) {
      // Validate image URL
      if (!this.isValidImageUrl(ghlImage.url)) {
        console.warn(`Invalid image URL skipped: ${ghlImage.url}`);
        continue;
      }

      validImages.push({
        id: '', // Will be assigned by Shopify
        product_id: '', // Will be assigned by Shopify
        position: ghlImage.position,
        src: ghlImage.url,
        alt: ghlImage.alt_text,
        width: 0, // Will be determined by Shopify
        height: 0, // Will be determined by Shopify
      });
    }

    return validImages;
  }

  /**
   * Format price from cents to decimal string
   * 
   * Shopify expects prices as decimal strings (e.g., "19.99")
   * GHL stores prices as integers in cents (e.g., 1999)
   * 
   * @param priceInCents - Price in cents
   * @returns Price formatted as decimal string
   */
  private formatPrice(priceInCents: number): string {
    return (priceInCents / 100).toFixed(2);
  }

  /**
   * Validate image URL format
   * 
   * Checks if the URL is a valid HTTP/HTTPS URL.
   * This is a basic validation - actual image accessibility is checked during upload.
   * 
   * @param url - Image URL to validate
   * @returns true if URL is valid, false otherwise
   */
  private isValidImageUrl(url: string): boolean {
    if (!url || typeof url !== 'string') {
      return false;
    }

    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  }
}
