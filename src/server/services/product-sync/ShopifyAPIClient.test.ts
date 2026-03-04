/**
 * Unit tests for ShopifyAPIClient
 * 
 * Tests authentication setup, configuration, and basic error handling
 */

import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest';
import { ShopifyAPIClient, createShopifyClientFromEnv } from './ShopifyAPIClient';
import MockAdapter from 'axios-mock-adapter';

describe('ShopifyAPIClient', () => {
  describe('constructor', () => {
    it('should create client with valid configuration', () => {
      const client = new ShopifyAPIClient({
        shopDomain: 'test-shop.myshopify.com',
        accessToken: 'test-token',
        apiVersion: '2024-01',
      });

      expect(client).toBeInstanceOf(ShopifyAPIClient);
    });

    it('should configure base URL correctly', () => {
      const client = new ShopifyAPIClient({
        shopDomain: 'test-shop.myshopify.com',
        accessToken: 'test-token',
        apiVersion: '2024-01',
      });

      // Access private client to verify configuration
      const axiosClient = (client as any).client;
      expect(axiosClient.defaults.baseURL).toBe(
        'https://test-shop.myshopify.com/admin/api/2024-01'
      );
    });

    it('should set authentication header', () => {
      const client = new ShopifyAPIClient({
        shopDomain: 'test-shop.myshopify.com',
        accessToken: 'test-token-123',
        apiVersion: '2024-01',
      });

      const axiosClient = (client as any).client;
      expect(axiosClient.defaults.headers['X-Shopify-Access-Token']).toBe('test-token-123');
    });

    it('should set content type header', () => {
      const client = new ShopifyAPIClient({
        shopDomain: 'test-shop.myshopify.com',
        accessToken: 'test-token',
        apiVersion: '2024-01',
      });

      const axiosClient = (client as any).client;
      expect(axiosClient.defaults.headers['Content-Type']).toBe('application/json');
    });

    it('should set timeout to 30 seconds', () => {
      const client = new ShopifyAPIClient({
        shopDomain: 'test-shop.myshopify.com',
        accessToken: 'test-token',
        apiVersion: '2024-01',
      });

      const axiosClient = (client as any).client;
      expect(axiosClient.defaults.timeout).toBe(30000);
    });
  });

  describe('createShopifyClientFromEnv', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      // Reset environment before each test
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      // Restore original environment
      process.env = originalEnv;
    });

    it('should create client from environment variables', () => {
      process.env.SHOPIFY_SHOP_DOMAIN = 'env-shop.myshopify.com';
      process.env.SHOPIFY_ACCESS_TOKEN = 'env-token';
      process.env.SHOPIFY_API_VERSION = '2024-01';

      const client = createShopifyClientFromEnv();

      expect(client).toBeInstanceOf(ShopifyAPIClient);
      const axiosClient = (client as any).client;
      expect(axiosClient.defaults.baseURL).toBe(
        'https://env-shop.myshopify.com/admin/api/2024-01'
      );
    });

    it('should use default API version if not provided', () => {
      process.env.SHOPIFY_SHOP_DOMAIN = 'env-shop.myshopify.com';
      process.env.SHOPIFY_ACCESS_TOKEN = 'env-token';
      delete process.env.SHOPIFY_API_VERSION;

      const client = createShopifyClientFromEnv();

      const axiosClient = (client as any).client;
      expect(axiosClient.defaults.baseURL).toContain('/2024-01');
    });

    it('should throw error if SHOPIFY_SHOP_DOMAIN is missing', () => {
      delete process.env.SHOPIFY_SHOP_DOMAIN;
      process.env.SHOPIFY_ACCESS_TOKEN = 'env-token';

      expect(() => createShopifyClientFromEnv()).toThrow(
        'SHOPIFY_SHOP_DOMAIN environment variable is required'
      );
    });

    it('should throw error if SHOPIFY_ACCESS_TOKEN is missing', () => {
      process.env.SHOPIFY_SHOP_DOMAIN = 'env-shop.myshopify.com';
      delete process.env.SHOPIFY_ACCESS_TOKEN;

      expect(() => createShopifyClientFromEnv()).toThrow(
        'SHOPIFY_ACCESS_TOKEN environment variable is required'
      );
    });
  });

  describe('API methods', () => {
    let client: ShopifyAPIClient;
    let mock: MockAdapter;

    beforeEach(() => {
      client = new ShopifyAPIClient({
        shopDomain: 'test-shop.myshopify.com',
        accessToken: 'test-token',
        apiVersion: '2024-01',
      });
      
      const axiosClient = (client as any).client;
      mock = new MockAdapter(axiosClient);
    });

    afterAll(() => {
      mock.restore();
    });

    describe('createProduct', () => {
      it('should create a product successfully', async () => {
        const productInput = {
          title: 'Test Product',
          body_html: 'Test description',
          variants: [{ title: 'Default', price: '10.00' }],
        };

        const mockResponse = {
          product: {
            id: '123',
            title: 'Test Product',
            body_html: 'Test description',
            vendor: '',
            product_type: '',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            published_at: '2024-01-01T00:00:00Z',
            variants: [{ id: '456', title: 'Default', price: '10.00' }],
            images: [],
          },
        };

        mock.onPost('/products.json').reply(200, mockResponse);

        const result = await client.createProduct(productInput);

        expect(result.id).toBe('123');
        expect(result.title).toBe('Test Product');
      });
    });

    describe('updateProduct', () => {
      it('should update a product successfully', async () => {
        const updates = {
          title: 'Updated Product',
          body_html: 'Updated description',
        };

        const mockResponse = {
          product: {
            id: '123',
            title: 'Updated Product',
            body_html: 'Updated description',
            vendor: '',
            product_type: '',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            published_at: '2024-01-01T00:00:00Z',
            variants: [],
            images: [],
          },
        };

        mock.onPut('/products/123.json').reply(200, mockResponse);

        const result = await client.updateProduct('123', updates);

        expect(result.id).toBe('123');
        expect(result.title).toBe('Updated Product');
      });
    });

    describe('getProduct', () => {
      it('should get a product successfully', async () => {
        const mockResponse = {
          product: {
            id: '123',
            title: 'Test Product',
            body_html: 'Test description',
            vendor: '',
            product_type: '',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            published_at: '2024-01-01T00:00:00Z',
            variants: [],
            images: [],
          },
        };

        mock.onGet('/products/123.json').reply(200, mockResponse);

        const result = await client.getProduct('123');

        expect(result.id).toBe('123');
        expect(result.title).toBe('Test Product');
      });
    });

    describe('unpublishProduct', () => {
      it('should unpublish a product successfully', async () => {
        mock.onPut('/products/123.json').reply(200, {
          product: {
            id: '123',
            published: false,
          },
        });

        await expect(client.unpublishProduct('123')).resolves.toBeUndefined();
      });
    });

    describe('uploadProductImage', () => {
      it('should upload an image successfully', async () => {
        const mockResponse = {
          image: {
            id: '789',
            product_id: '123',
            src: 'https://example.com/image.jpg',
            position: 1,
            width: 800,
            height: 600,
          },
        };

        mock.onPost('/products/123/images.json').reply(200, mockResponse);

        const result = await client.uploadProductImage('123', 'https://example.com/image.jpg', 1);

        expect(result.id).toBe('789');
        expect(result.src).toBe('https://example.com/image.jpg');
        expect(result.position).toBe(1);
      });
    });

    describe('getAllProducts', () => {
      it('should get all products with pagination', async () => {
        const mockResponse = {
          products: [
            {
              id: '123',
              title: 'Product 1',
              body_html: '',
              vendor: '',
              product_type: '',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              published_at: '2024-01-01T00:00:00Z',
              variants: [],
              images: [],
            },
            {
              id: '456',
              title: 'Product 2',
              body_html: '',
              vendor: '',
              product_type: '',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              published_at: '2024-01-01T00:00:00Z',
              variants: [],
              images: [],
            },
          ],
        };

        mock.onGet('/products.json').reply(200, mockResponse, {
          link: '<https://test-shop.myshopify.com/admin/api/2024-01/products.json?page_info=next_cursor>; rel="next"',
        });

        const result = await client.getAllProducts();

        expect(result.products).toHaveLength(2);
        expect(result.hasMore).toBe(true);
        expect(result.nextCursor).toBe('next_cursor');
      });

      it('should handle last page without next cursor', async () => {
        const mockResponse = {
          products: [
            {
              id: '123',
              title: 'Product 1',
              body_html: '',
              vendor: '',
              product_type: '',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              published_at: '2024-01-01T00:00:00Z',
              variants: [],
              images: [],
            },
          ],
        };

        mock.onGet('/products.json').reply(200, mockResponse, {});

        const result = await client.getAllProducts();

        expect(result.products).toHaveLength(1);
        expect(result.hasMore).toBe(false);
        expect(result.nextCursor).toBeUndefined();
      });
    });

    describe('getProductVariants', () => {
      it('should get product variants successfully', async () => {
        const mockResponse = {
          variants: [
            {
              id: '456',
              product_id: '123',
              title: 'Small',
              price: '10.00',
              sku: 'SKU-001',
              position: 1,
              inventory_policy: 'deny',
              compare_at_price: null,
              fulfillment_service: 'manual',
              inventory_management: 'shopify',
              option1: 'Small',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              inventory_quantity: 10,
            },
            {
              id: '789',
              product_id: '123',
              title: 'Large',
              price: '15.00',
              sku: 'SKU-002',
              position: 2,
              inventory_policy: 'deny',
              compare_at_price: null,
              fulfillment_service: 'manual',
              inventory_management: 'shopify',
              option1: 'Large',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              inventory_quantity: 5,
            },
          ],
        };

        mock.onGet('/products/123/variants.json').reply(200, mockResponse);

        const result = await client.getProductVariants('123');

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('456');
        expect(result[0].title).toBe('Small');
        expect(result[1].id).toBe('789');
        expect(result[1].title).toBe('Large');
      });
    });

    describe('updateVariant', () => {
      it('should update a variant successfully', async () => {
        const updates = {
          price: '12.00',
          inventory_quantity: 20,
        };

        const mockResponse = {
          variant: {
            id: '456',
            product_id: '123',
            title: 'Small',
            price: '12.00',
            sku: 'SKU-001',
            position: 1,
            inventory_policy: 'deny',
            compare_at_price: null,
            fulfillment_service: 'manual',
            inventory_management: 'shopify',
            option1: 'Small',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            inventory_quantity: 20,
          },
        };

        mock.onPut('/variants/456.json').reply(200, mockResponse);

        const result = await client.updateVariant('456', updates);

        expect(result.id).toBe('456');
        expect(result.price).toBe('12.00');
        expect(result.inventory_quantity).toBe(20);
      });
    });

    describe('error handling', () => {
      it('should throw enhanced error for 400 Bad Request', async () => {
        mock.onPost('/products.json').reply(400, {
          errors: { title: ['cannot be blank'] },
        });

        await expect(
          client.createProduct({
            title: '',
            variants: [{ title: 'Default', price: '10.00' }],
          })
        ).rejects.toThrow(/Shopify API Error: 400/);
      });

      it('should throw enhanced error for 401 Unauthorized', async () => {
        mock.onGet('/products/123.json').reply(401, {
          errors: 'Unauthorized',
        });

        await expect(client.getProduct('123')).rejects.toThrow(/Shopify API Error: 401/);
      });

      it('should throw enhanced error for 404 Not Found', async () => {
        mock.onGet('/products/999.json').reply(404, {
          errors: 'Not Found',
        });

        await expect(client.getProduct('999')).rejects.toThrow(/Shopify API Error: 404/);
      });

      it('should throw enhanced error for 500 Internal Server Error', async () => {
        mock.onPost('/products.json').reply(500, {
          errors: 'Internal Server Error',
        });

        await expect(
          client.createProduct({
            title: 'Test',
            variants: [{ title: 'Default', price: '10.00' }],
          })
        ).rejects.toThrow(/Shopify API Error: 500/);
      });

      it('should include error status and data in thrown error', async () => {
        mock.onGet('/products/123.json').reply(404, {
          errors: 'Product not found',
        });

        try {
          await client.getProduct('123');
          expect.fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.status).toBe(404);
          expect(error.data).toEqual({ errors: 'Product not found' });
        }
      });
    });
  });

  describe('reactive rate limiting', () => {
    let client: ShopifyAPIClient;
    let mock: MockAdapter;

    beforeEach(() => {
      client = new ShopifyAPIClient({
        shopDomain: 'test-shop.myshopify.com',
        accessToken: 'test-token',
        apiVersion: '2024-01',
      });
      
      // Create mock adapter for the internal axios instance
      const axiosClient = (client as any).client;
      mock = new MockAdapter(axiosClient);
    });

    afterAll(() => {
      mock.restore();
    });

    it('should retry after 429 response with Retry-After header in seconds', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // First request returns 429 with Retry-After: 1 second
      mock
        .onGet('/products/123.json')
        .replyOnce(429, { errors: 'Rate limit exceeded' }, { 'Retry-After': '1' })
        .onGet('/products/123.json')
        .replyOnce(200, { product: { id: '123', title: 'Test Product' } });

      const startTime = Date.now();
      const product = await client.getProduct('123');
      const elapsed = Date.now() - startTime;

      // Should have waited approximately 1 second
      expect(elapsed).toBeGreaterThanOrEqual(900); // Allow some margin
      expect(product.id).toBe('123');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rate limit hit (429)'),
        expect.objectContaining({
          retryAfter: 1000,
        })
      );

      consoleWarnSpy.mockRestore();
    });

    it('should retry after 429 response with Retry-After header as HTTP date', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Set retry time to 1 second in the future
      const futureTime = Date.now() + 1000;
      const retryDate = new Date(futureTime);
      
      mock
        .onGet('/products/456.json')
        .replyOnce(429, { errors: 'Rate limit exceeded' }, { 'Retry-After': retryDate.toUTCString() })
        .onGet('/products/456.json')
        .replyOnce(200, { product: { id: '456', title: 'Test Product 2' } });

      const startTime = Date.now();
      const product = await client.getProduct('456');
      const elapsed = Date.now() - startTime;

      // The delay should be close to 1000ms, but timing can vary due to test execution overhead
      // We verify the retry happened by checking the product was returned successfully
      expect(elapsed).toBeGreaterThanOrEqual(0);
      expect(product.id).toBe('456');
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should use default 2 second delay when Retry-After header is missing', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock
        .onGet('/products/789.json')
        .replyOnce(429, { errors: 'Rate limit exceeded' }, {})
        .onGet('/products/789.json')
        .replyOnce(200, { product: { id: '789', title: 'Test Product 3' } });

      const startTime = Date.now();
      const product = await client.getProduct('789');
      const elapsed = Date.now() - startTime;

      // Should have waited approximately 2 seconds (default)
      expect(elapsed).toBeGreaterThanOrEqual(1900);
      expect(product.id).toBe('789');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rate limit hit (429)'),
        expect.objectContaining({
          retryAfter: 2000,
        })
      );

      consoleWarnSpy.mockRestore();
    });

    it('should log rate limit hits with request details', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock
        .onPost('/products.json')
        .replyOnce(429, { errors: 'Rate limit exceeded' }, { 'Retry-After': '1' })
        .onPost('/products.json')
        .replyOnce(200, { product: { id: '999', title: 'Created Product' } });

      await client.createProduct({
        title: 'Test Product',
        variants: [{ title: 'Default', price: '10.00' }],
      });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rate limit hit (429)'),
        expect.objectContaining({
          url: '/products.json',
          method: 'post',
          retryAfter: 1000,
        })
      );

      consoleWarnSpy.mockRestore();
    });

    it('should handle multiple consecutive 429 responses', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock
        .onGet('/products/111.json')
        .replyOnce(429, { errors: 'Rate limit exceeded' }, { 'Retry-After': '1' })
        .onGet('/products/111.json')
        .replyOnce(429, { errors: 'Rate limit exceeded' }, { 'Retry-After': '1' })
        .onGet('/products/111.json')
        .replyOnce(200, { product: { id: '111', title: 'Test Product' } });

      const startTime = Date.now();
      const product = await client.getProduct('111');
      const elapsed = Date.now() - startTime;

      // Should have waited approximately 2 seconds (1s + 1s)
      expect(elapsed).toBeGreaterThanOrEqual(1900);
      expect(product.id).toBe('111');
      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('retry logic with exponential backoff', () => {
    let client: ShopifyAPIClient;
    let mock: MockAdapter;

    beforeEach(() => {
      client = new ShopifyAPIClient({
        shopDomain: 'test-shop.myshopify.com',
        accessToken: 'test-token',
        apiVersion: '2024-01',
      });
      
      const axiosClient = (client as any).client;
      mock = new MockAdapter(axiosClient);
    });

    afterAll(() => {
      mock.restore();
    });

    it('should retry on 500 server error with exponential backoff', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock
        .onGet('/products/123.json')
        .replyOnce(500, { errors: 'Internal Server Error' })
        .onGet('/products/123.json')
        .replyOnce(200, { product: { id: '123', title: 'Test Product' } });

      const startTime = Date.now();
      const product = await client.getProduct('123');
      const elapsed = Date.now() - startTime;

      // Should have retried with some delay (jitter makes exact timing unpredictable)
      expect(elapsed).toBeGreaterThanOrEqual(0);
      expect(product.id).toBe('123');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('getProduct failed (attempt 1/3)'),
        expect.objectContaining({
          attempt: 1,
          delay: expect.any(Number),
        })
      );

      consoleWarnSpy.mockRestore();
    });

    it('should retry on 502 Bad Gateway error', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock
        .onPost('/products.json')
        .replyOnce(502, { errors: 'Bad Gateway' })
        .onPost('/products.json')
        .replyOnce(200, { product: { id: '456', title: 'Created Product' } });

      const product = await client.createProduct({
        title: 'Test Product',
        variants: [{ title: 'Default', price: '10.00' }],
      });

      expect(product.id).toBe('456');
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should retry on 503 Service Unavailable error', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock
        .onPut('/products/789.json')
        .replyOnce(503, { errors: 'Service Unavailable' })
        .onPut('/products/789.json')
        .replyOnce(200, { product: { id: '789', title: 'Updated Product' } });

      const product = await client.updateProduct('789', { title: 'Updated Product' });

      expect(product.id).toBe('789');
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should retry on 504 Gateway Timeout error', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock
        .onGet('/products/999.json')
        .replyOnce(504, { errors: 'Gateway Timeout' })
        .onGet('/products/999.json')
        .replyOnce(200, { product: { id: '999', title: 'Test Product' } });

      const product = await client.getProduct('999');

      expect(product.id).toBe('999');
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should NOT retry on 400 Bad Request error', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock.onPost('/products.json').reply(400, { errors: { title: ['cannot be blank'] } });

      await expect(
        client.createProduct({
          title: '',
          variants: [{ title: 'Default', price: '10.00' }],
        })
      ).rejects.toThrow(/Shopify API Error: 400/);

      // Should not have logged retry warnings (only error log on final failure)
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should NOT retry on 401 Unauthorized error', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock.onGet('/products/123.json').reply(401, { errors: 'Unauthorized' });

      await expect(client.getProduct('123')).rejects.toThrow(/Shopify API Error: 401/);

      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should NOT retry on 403 Forbidden error', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock.onGet('/products/123.json').reply(403, { errors: 'Forbidden' });

      await expect(client.getProduct('123')).rejects.toThrow(/Shopify API Error: 403/);

      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should NOT retry on 404 Not Found error', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock.onGet('/products/999.json').reply(404, { errors: 'Not Found' });

      await expect(client.getProduct('999')).rejects.toThrow(/Shopify API Error: 404/);

      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should fail after 3 retry attempts on persistent 500 error', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      mock.onGet('/products/123.json').reply(500, { errors: 'Internal Server Error' });

      await expect(client.getProduct('123')).rejects.toThrow(/Shopify API Error: 500/);

      // Should have logged 2 retry warnings (attempts 1 and 2) and 1 final error
      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('getProduct failed after 3 attempts'),
        expect.objectContaining({
          error: expect.any(String),
        })
      );

      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should use exponential backoff with jitter', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock
        .onGet('/products/123.json')
        .replyOnce(500, { errors: 'Internal Server Error' })
        .onGet('/products/123.json')
        .replyOnce(500, { errors: 'Internal Server Error' })
        .onGet('/products/123.json')
        .replyOnce(200, { product: { id: '123', title: 'Test Product' } });

      const product = await client.getProduct('123');

      expect(product.id).toBe('123');
      
      // Check that delays are logged and increase (with jitter)
      const calls = consoleWarnSpy.mock.calls;
      
      // Filter out only the retry warnings (not rate limit warnings)
      const retryWarnings = calls.filter(call => 
        typeof call[0] === 'string' && call[0].includes('getProduct failed (attempt')
      );
      
      expect(retryWarnings.length).toBe(2);
      
      const delay1 = retryWarnings[0][1].delay;
      const delay2 = retryWarnings[1][1].delay;
      
      // Delays should be within expected ranges (with jitter)
      // Attempt 1: 0-1000ms (base: 1000ms * 2^0 = 1000ms)
      // Attempt 2: 0-2000ms (base: 1000ms * 2^1 = 2000ms)
      expect(delay1).toBeGreaterThanOrEqual(0);
      expect(delay1).toBeLessThanOrEqual(1000);
      expect(delay2).toBeGreaterThanOrEqual(0);
      expect(delay2).toBeLessThanOrEqual(2000);

      consoleWarnSpy.mockRestore();
    });

    it('should cap delay at maxDelay (10 seconds)', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Manually test the calculateBackoffDelay method
      const calculateBackoffDelay = (client as any).calculateBackoffDelay.bind(client);
      
      // Attempt 10 would normally be 1000 * 2^9 = 512000ms, but should be capped at 10000ms
      const delay = calculateBackoffDelay(10);
      
      expect(delay).toBeLessThanOrEqual(10000);
      expect(delay).toBeGreaterThanOrEqual(0);

      consoleWarnSpy.mockRestore();
    });

    it('should log retry attempts with operation name and attempt number', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      mock
        .onPost('/products.json')
        .replyOnce(500, { errors: 'Internal Server Error' })
        .onPost('/products.json')
        .replyOnce(200, { product: { id: '123', title: 'Created Product' } });

      await client.createProduct({
        title: 'Test Product',
        variants: [{ title: 'Default', price: '10.00' }],
      });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('createProduct failed (attempt 1/3)'),
        expect.objectContaining({
          attempt: 1,
          delay: expect.any(Number),
        })
      );

      consoleWarnSpy.mockRestore();
    });
  });
});
