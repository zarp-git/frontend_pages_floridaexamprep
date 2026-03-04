/**
 * Unit tests for ProductMapper
 * 
 * Tests specific examples and edge cases for product transformation logic
 */

import { describe, it, expect } from 'vitest';
import { ProductMapper, ValidationError } from './ProductMapper';
import type { GHLProduct, GHLVariant, GHLImage } from '@/types/ghl-shopify-sync';

describe('ProductMapper', () => {
  const mapper = new ProductMapper();

  describe('mapToShopify', () => {
    it('should map a basic GHL product to Shopify format', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        description: 'Test description',
        price: 1999, // $19.99
        currency: 'USD',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = mapper.mapToShopify(ghlProduct);

      expect(result.title).toBe('Test Product');
      expect(result.body_html).toBe('Test description');
      expect(result.vendor).toBe('GoHighLevel');
      expect(result.variants).toHaveLength(1);
      expect(result.variants[0].price).toBe('19.99');
      expect(result.tags).toContain('ghl-synced');
      expect(result.metafields).toHaveLength(1);
      expect(result.metafields![0].value).toBe('ghl-123');
    });

    it('should use empty string for missing description', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        price: 1000,
        currency: 'USD',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = mapper.mapToShopify(ghlProduct);

      expect(result.body_html).toBe('');
    });

    it('should throw ValidationError for missing title', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: '',
        price: 1000,
        currency: 'USD',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(() => mapper.mapToShopify(ghlProduct)).toThrow(ValidationError);
      expect(() => mapper.mapToShopify(ghlProduct)).toThrow('Product title is required');
    });

    it('should throw ValidationError for missing price', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        price: undefined as any,
        currency: 'USD',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(() => mapper.mapToShopify(ghlProduct)).toThrow(ValidationError);
      expect(() => mapper.mapToShopify(ghlProduct)).toThrow('Product price is required');
    });

    it('should throw ValidationError for negative price', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        price: -100,
        currency: 'USD',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(() => mapper.mapToShopify(ghlProduct)).toThrow(ValidationError);
      expect(() => mapper.mapToShopify(ghlProduct)).toThrow('Product price cannot be negative');
    });

    it('should handle special characters in title', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test & Product <with> "quotes"',
        price: 1000,
        currency: 'USD',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = mapper.mapToShopify(ghlProduct);

      expect(result.title).toBe('Test & Product <with> "quotes"');
    });

    it('should map product with images', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        price: 1000,
        currency: 'USD',
        status: 'active',
        images: [
          { url: 'https://example.com/image1.jpg', position: 1 },
          { url: 'https://example.com/image2.jpg', position: 2, alt_text: 'Alt text' },
        ],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = mapper.mapToShopify(ghlProduct);

      expect(result.images).toHaveLength(2);
      expect(result.images![0].src).toBe('https://example.com/image1.jpg');
      expect(result.images![0].position).toBe(1);
      expect(result.images![1].alt).toBe('Alt text');
    });

    it('should map product with variants', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        price: 1000,
        currency: 'USD',
        status: 'active',
        variants: [
          {
            id: 'var-1',
            title: 'Small',
            price: 1000,
            sku: 'TEST-S',
            inventory_quantity: 10,
            option1: 'Small',
          },
          {
            id: 'var-2',
            title: 'Large',
            price: 1500,
            sku: 'TEST-L',
            inventory_quantity: 5,
            option1: 'Large',
          },
        ],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = mapper.mapToShopify(ghlProduct);

      expect(result.variants).toHaveLength(2);
      expect(result.variants[0].title).toBe('Small');
      expect(result.variants[0].price).toBe('10.00');
      expect(result.variants[0].sku).toBe('TEST-S');
      expect(result.variants[1].title).toBe('Large');
      expect(result.variants[1].price).toBe('15.00');
    });
  });

  describe('mapVariants', () => {
    it('should create default variant when no variants exist', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        price: 2500,
        currency: 'USD',
        sku: 'TEST-SKU',
        inventory_quantity: 100,
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = mapper.mapVariants(ghlProduct);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Default');
      expect(result[0].price).toBe('25.00');
      expect(result[0].sku).toBe('TEST-SKU');
      expect(result[0].inventory_quantity).toBe(100);
      expect(result[0].option1).toBe('Default');
    });

    it('should map multiple variants with options', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        price: 1000,
        currency: 'USD',
        status: 'active',
        variants: [
          {
            id: 'var-1',
            title: 'Small / Red',
            price: 1000,
            option1: 'Small',
            option2: 'Red',
          },
          {
            id: 'var-2',
            title: 'Large / Blue',
            price: 1500,
            option1: 'Large',
            option2: 'Blue',
          },
        ],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = mapper.mapVariants(ghlProduct);

      expect(result).toHaveLength(2);
      expect(result[0].option1).toBe('Small');
      expect(result[0].option2).toBe('Red');
      expect(result[1].option1).toBe('Large');
      expect(result[1].option2).toBe('Blue');
    });

    it('should use empty string for missing SKU', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        price: 1000,
        currency: 'USD',
        status: 'active',
        variants: [
          {
            id: 'var-1',
            title: 'Variant 1',
            price: 1000,
          },
        ],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = mapper.mapVariants(ghlProduct);

      expect(result[0].sku).toBe('');
    });

    it('should default inventory to 0 when missing', () => {
      const ghlProduct: GHLProduct = {
        id: 'ghl-123',
        title: 'Test Product',
        price: 1000,
        currency: 'USD',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = mapper.mapVariants(ghlProduct);

      expect(result[0].inventory_quantity).toBe(0);
    });
  });

  describe('mapImages', () => {
    it('should map valid image URLs', () => {
      const ghlImages: GHLImage[] = [
        { url: 'https://example.com/image1.jpg', position: 1 },
        { url: 'https://example.com/image2.png', position: 2, alt_text: 'Product image' },
      ];

      const result = mapper.mapImages(ghlImages);

      expect(result).toHaveLength(2);
      expect(result[0].src).toBe('https://example.com/image1.jpg');
      expect(result[0].position).toBe(1);
      expect(result[1].src).toBe('https://example.com/image2.png');
      expect(result[1].alt).toBe('Product image');
    });

    it('should filter out invalid URLs', () => {
      const ghlImages: GHLImage[] = [
        { url: 'https://example.com/valid.jpg', position: 1 },
        { url: 'not-a-url', position: 2 },
        { url: 'ftp://example.com/invalid.jpg', position: 3 },
        { url: 'http://example.com/valid2.jpg', position: 4 },
      ];

      const result = mapper.mapImages(ghlImages);

      expect(result).toHaveLength(2);
      expect(result[0].src).toBe('https://example.com/valid.jpg');
      expect(result[1].src).toBe('http://example.com/valid2.jpg');
    });

    it('should preserve image order', () => {
      const ghlImages: GHLImage[] = [
        { url: 'https://example.com/image3.jpg', position: 3 },
        { url: 'https://example.com/image1.jpg', position: 1 },
        { url: 'https://example.com/image2.jpg', position: 2 },
      ];

      const result = mapper.mapImages(ghlImages);

      expect(result).toHaveLength(3);
      expect(result[0].position).toBe(3);
      expect(result[1].position).toBe(1);
      expect(result[2].position).toBe(2);
    });

    it('should handle empty image array', () => {
      const result = mapper.mapImages([]);

      expect(result).toHaveLength(0);
    });

    it('should handle images without alt text', () => {
      const ghlImages: GHLImage[] = [
        { url: 'https://example.com/image.jpg', position: 1 },
      ];

      const result = mapper.mapImages(ghlImages);

      expect(result[0].alt).toBeUndefined();
    });
  });

  describe('price formatting', () => {
    it('should format prices correctly', () => {
      const testCases = [
        { input: 0, expected: '0.00' },
        { input: 100, expected: '1.00' },
        { input: 1999, expected: '19.99' },
        { input: 10000, expected: '100.00' },
        { input: 12345, expected: '123.45' },
      ];

      testCases.forEach(({ input, expected }) => {
        const ghlProduct: GHLProduct = {
          id: 'ghl-123',
          title: 'Test',
          price: input,
          currency: 'USD',
          status: 'active',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        };

        const result = mapper.mapToShopify(ghlProduct);
        expect(result.variants[0].price).toBe(expected);
      });
    });
  });
});
