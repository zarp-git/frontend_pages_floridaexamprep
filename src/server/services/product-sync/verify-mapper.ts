/**
 * Manual verification script for ProductMapper
 * 
 * This script manually tests the ProductMapper implementation
 * Run with: pnpm exec tsx src/server/services/product-sync/verify-mapper.ts
 */

import { ProductMapper, ValidationError } from './ProductMapper';
import type { GHLProduct } from '@/types/ghl-shopify-sync';

const mapper = new ProductMapper();

console.log('=== ProductMapper Verification ===\n');

// Test 1: Basic product mapping
console.log('Test 1: Basic product mapping');
const basicProduct: GHLProduct = {
  id: 'ghl-123',
  title: 'Test Product',
  description: 'Test description',
  price: 1999, // $19.99
  currency: 'USD',
  status: 'active',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

try {
  const result1 = mapper.mapToShopify(basicProduct);
  console.log('✓ Basic mapping successful');
  console.log(`  Title: ${result1.title}`);
  console.log(`  Price: ${result1.variants[0].price}`);
  console.log(`  Variants: ${result1.variants.length}`);
  console.log(`  Metafields: ${result1.metafields?.length}`);
} catch (error) {
  console.log('✗ Basic mapping failed:', error);
}

// Test 2: Product with variants
console.log('\nTest 2: Product with variants');
const productWithVariants: GHLProduct = {
  id: 'ghl-456',
  title: 'T-Shirt',
  price: 2000,
  currency: 'USD',
  status: 'active',
  variants: [
    {
      id: 'var-1',
      title: 'Small',
      price: 2000,
      sku: 'TSHIRT-S',
      inventory_quantity: 10,
      option1: 'Small',
    },
    {
      id: 'var-2',
      title: 'Large',
      price: 2500,
      sku: 'TSHIRT-L',
      inventory_quantity: 5,
      option1: 'Large',
    },
  ],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

try {
  const result2 = mapper.mapToShopify(productWithVariants);
  console.log('✓ Variant mapping successful');
  console.log(`  Variants: ${result2.variants.length}`);
  console.log(`  Variant 1: ${result2.variants[0].title} - $${result2.variants[0].price}`);
  console.log(`  Variant 2: ${result2.variants[1].title} - $${result2.variants[1].price}`);
} catch (error) {
  console.log('✗ Variant mapping failed:', error);
}

// Test 3: Product with images
console.log('\nTest 3: Product with images');
const productWithImages: GHLProduct = {
  id: 'ghl-789',
  title: 'Product with Images',
  price: 3000,
  currency: 'USD',
  status: 'active',
  images: [
    { url: 'https://example.com/image1.jpg', position: 1 },
    { url: 'https://example.com/image2.jpg', position: 2, alt_text: 'Alt text' },
    { url: 'invalid-url', position: 3 }, // Should be filtered out
  ],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

try {
  const result3 = mapper.mapToShopify(productWithImages);
  console.log('✓ Image mapping successful');
  console.log(`  Images: ${result3.images?.length} (1 invalid filtered out)`);
  console.log(`  Image 1: ${result3.images?.[0].src}`);
  console.log(`  Image 2: ${result3.images?.[1].src} (alt: ${result3.images?.[1].alt})`);
} catch (error) {
  console.log('✗ Image mapping failed:', error);
}

// Test 4: Missing required fields
console.log('\nTest 4: Validation - missing title');
const invalidProduct: GHLProduct = {
  id: 'ghl-invalid',
  title: '',
  price: 1000,
  currency: 'USD',
  status: 'active',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

try {
  mapper.mapToShopify(invalidProduct);
  console.log('✗ Should have thrown ValidationError');
} catch (error: any) {
  if (error.name === 'ValidationError') {
    console.log('✓ Validation error caught correctly');
    console.log(`  Error: ${error.message}`);
  } else {
    console.log('✗ Wrong error type:', error);
  }
}

// Test 5: Negative price
console.log('\nTest 5: Validation - negative price');
const negativePrice: GHLProduct = {
  id: 'ghl-negative',
  title: 'Test',
  price: -100,
  currency: 'USD',
  status: 'active',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

try {
  mapper.mapToShopify(negativePrice);
  console.log('✗ Should have thrown ValidationError');
} catch (error: any) {
  if (error.name === 'ValidationError') {
    console.log('✓ Validation error caught correctly');
    console.log(`  Error: ${error.message}`);
  } else {
    console.log('✗ Wrong error type:', error);
  }
}

// Test 6: Missing description (should use default)
console.log('\nTest 6: Default values - missing description');
const noDescription: GHLProduct = {
  id: 'ghl-no-desc',
  title: 'Product without description',
  price: 1500,
  currency: 'USD',
  status: 'active',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

try {
  const result6 = mapper.mapToShopify(noDescription);
  console.log('✓ Default description applied');
  console.log(`  Description: "${result6.body_html}" (empty string)`);
} catch (error) {
  console.log('✗ Default value failed:', error);
}

console.log('\n=== All tests completed ===');
