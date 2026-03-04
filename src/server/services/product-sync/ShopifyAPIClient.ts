/**
 * ShopifyAPIClient - Handles all communication with Shopify Admin API
 * 
 * Responsibilities:
 * - Authenticate with Shopify using access token
 * - Provide methods for product CRUD operations
 * - Handle rate limiting and retries
 * - Manage API versioning
 * 
 * Requirements: 7.1, 7.2, 7.3
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { CircuitBreaker } from './CircuitBreaker';

/**
 * Configuration for ShopifyAPIClient
 */
export interface ShopifyAPIConfig {
  /** Shopify shop domain (e.g., "your-shop.myshopify.com") */
  shopDomain: string;
  /** Shopify Admin API access token */
  accessToken: string;
  /** API version (e.g., "2024-01") */
  apiVersion: string;
}

/**
 * Shopify product input for creation/update
 */
export interface ShopifyProductInput {
  title: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  variants: ShopifyVariant[];
  images?: ShopifyImage[];
  tags?: string[];
  metafields?: ShopifyMetafield[];
}

/**
 * Shopify product variant
 */
export interface ShopifyVariant {
  title: string;
  price: string;
  sku?: string;
  inventory_quantity?: number;
  option1?: string;
  option2?: string;
  option3?: string;
}

/**
 * Shopify product image
 */
export interface ShopifyImage {
  src: string;
  alt?: string;
  position?: number;
}

/**
 * Shopify metafield for custom data
 */
export interface ShopifyMetafield {
  namespace: string;
  key: string;
  value: string;
  type: string;
}

/**
 * Complete Shopify product response
 */
export interface ShopifyProduct {
  id: string;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  variants: ShopifyVariantFull[];
  images: ShopifyImageFull[];
}

/**
 * Full Shopify variant with all fields
 */
export interface ShopifyVariantFull extends ShopifyVariant {
  id: string;
  product_id: string;
  position: number;
  inventory_policy: string;
  compare_at_price?: string;
  fulfillment_service: string;
  inventory_management: string;
  created_at: string;
  updated_at: string;
}

/**
 * Full Shopify image with all fields
 */
export interface ShopifyImageFull extends ShopifyImage {
  id: string;
  product_id: string;
  width: number;
  height: number;
}

/**
 * Paginated products response
 */
export interface PaginatedProducts {
  products: ShopifyProduct[];
  nextCursor?: string;
  hasMore: boolean;
}

/**
 * ShopifyAPIClient - Main client for Shopify Admin API
 */
export class ShopifyAPIClient {
  private readonly client: AxiosInstance;
  private readonly shopDomain: string;
  private readonly apiVersion: string;
  private readonly circuitBreaker: CircuitBreaker;

  /**
   * Configuration for retry behavior
   */
  private readonly retryConfig = {
    maxAttempts: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    factor: 2,
  };

  /**
   * Create a new ShopifyAPIClient
   * @param config - Configuration with shop domain, access token, and API version
   */
  constructor(config: ShopifyAPIConfig) {
    this.shopDomain = config.shopDomain;
    this.apiVersion = config.apiVersion;

    // Initialize circuit breaker with default settings (5 failures, 60s timeout)
    this.circuitBreaker = new CircuitBreaker({
      threshold: 5,
      timeout: 60000, // 60 seconds
    });

    // Create axios instance with base configuration
    this.client = axios.create({
      baseURL: `https://${config.shopDomain}/admin/api/${config.apiVersion}`,
      headers: {
        'X-Shopify-Access-Token': config.accessToken,
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 second timeout
    });

    // Add response interceptor for error handling and rate limiting
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        // Handle 429 rate limit errors with retry
        if (error.response?.status === 429) {
          const retryAfter = this.getRetryAfterDelay(error.response.headers);
          
          // Log rate limit hit for monitoring
          console.warn(
            `[ShopifyAPIClient] Rate limit hit (429). Retrying after ${retryAfter}ms`,
            {
              url: error.config?.url,
              method: error.config?.method,
              retryAfter,
            }
          );

          // Wait for the retry-after period
          await this.sleep(retryAfter);

          // Retry the request
          return this.client.request(error.config!);
        }

        // Enhance error with more context for other errors
        if (error.response) {
          const shopifyError = new Error(
            `Shopify API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
          );
          (shopifyError as any).status = error.response.status;
          (shopifyError as any).data = error.response.data;
          (shopifyError as any).headers = error.response.headers;
          throw shopifyError;
        }
        throw error;
      }
    );
  }

  /**
   * Create a product in Shopify
   * @param product - Product data to create
   * @returns Created Shopify product
   */
  async createProduct(product: ShopifyProductInput): Promise<ShopifyProduct> {
    return this.withRetry(async () => {
      const response = await this.client.post('/products.json', {
        product,
      });
      return response.data.product;
    }, 'createProduct');
  }

  /**
   * Update a product in Shopify
   * @param productId - Shopify product ID
   * @param updates - Partial product data to update
   * @returns Updated Shopify product
   */
  async updateProduct(
    productId: string,
    updates: Partial<ShopifyProductInput>
  ): Promise<ShopifyProduct> {
    return this.withRetry(async () => {
      const response = await this.client.put(`/products/${productId}.json`, {
        product: updates,
      });
      return response.data.product;
    }, 'updateProduct');
  }

  /**
   * Get a product from Shopify
   * @param productId - Shopify product ID
   * @returns Shopify product
   */
  async getProduct(productId: string): Promise<ShopifyProduct> {
    return this.withRetry(async () => {
      const response = await this.client.get(`/products/${productId}.json`);
      return response.data.product;
    }, 'getProduct');
  }

  /**
   * Unpublish a product (archive) - does not delete
   * @param productId - Shopify product ID
   */
  async unpublishProduct(productId: string): Promise<void> {
    return this.withRetry(async () => {
      await this.client.put(`/products/${productId}.json`, {
        product: {
          published: false,
        },
      });
    }, 'unpublishProduct');
  }

  /**
   * Upload an image to a product
   * @param productId - Shopify product ID
   * @param imageUrl - URL of the image to upload
   * @param position - Display position of the image
   * @returns Created Shopify image
   */
  async uploadProductImage(
    productId: string,
    imageUrl: string,
    position: number
  ): Promise<ShopifyImageFull> {
    return this.withRetry(async () => {
      const response = await this.client.post(
        `/products/${productId}/images.json`,
        {
          image: {
            src: imageUrl,
            position,
          },
        }
      );
      return response.data.image;
    }, 'uploadProductImage');
  }

  /**
   * Get all products with pagination
   * @param cursor - Pagination cursor (optional)
   * @param limit - Number of products per page (default: 50, max: 250)
   * @returns Paginated products
   */
  async getAllProducts(
    cursor?: string,
    limit: number = 50
  ): Promise<PaginatedProducts> {
    return this.withRetry(async () => {
      const params: any = { limit };
      if (cursor) {
        params.page_info = cursor;
      }

      const response = await this.client.get('/products.json', { params });

      // Extract pagination info from Link header
      const linkHeader = response.headers.link;
      let nextCursor: string | undefined;
      let hasMore = false;

      if (linkHeader) {
        const nextMatch = linkHeader.match(/<[^>]*page_info=([^>&]+)[^>]*>;\s*rel="next"/);
        if (nextMatch) {
          nextCursor = nextMatch[1];
          hasMore = true;
        }
      }

      return {
        products: response.data.products,
        nextCursor,
        hasMore,
      };
    }, 'getAllProducts');
  }

  /**
   * Get product variants
   * @param productId - Shopify product ID
   * @returns Array of product variants
   */
  async getProductVariants(productId: string): Promise<ShopifyVariantFull[]> {
    return this.withRetry(async () => {
      const response = await this.client.get(`/products/${productId}/variants.json`);
      return response.data.variants;
    }, 'getProductVariants');
  }

  /**
   * Update a product variant
   * @param variantId - Shopify variant ID
   * @param updates - Partial variant data to update
   * @returns Updated variant
   */
  async updateVariant(
    variantId: string,
    updates: Partial<ShopifyVariant>
  ): Promise<ShopifyVariantFull> {
    return this.withRetry(async () => {
      const response = await this.client.put(`/variants/${variantId}.json`, {
        variant: updates,
      });
      return response.data.variant;
    }, 'updateVariant');
  }

  /**
   * Delete a variant from Shopify
   * 
   * CRITICAL: Use with caution - this permanently deletes the variant.
   * Shopify requires at least one variant per product.
   * 
   * @param productId - The Shopify product ID
   * @param variantId - The Shopify variant ID to delete
   * @returns Promise that resolves when the variant is deleted
   */
  async deleteVariant(productId: string, variantId: string): Promise<void> {
    return this.withRetry(async () => {
      await this.client.delete(`/products/${productId}/variants/${variantId}.json`);
    }, 'deleteVariant');
  }

  /**
   * Determine if an error is retryable
   * @param error - The error to check
   * @returns True if the error should be retried
   * @private
   */
  private isRetryableError(error: any): boolean {
    // Check for enhanced error status (from interceptor)
    const status = error.status || error.response?.status;

    // Network errors (no response and no status)
    if (!status && !error.response) {
      return true;
    }

    // 429 Rate Limit (handled by interceptor, but included for completeness)
    if (status === 429) {
      return true;
    }

    // 5xx Server Errors
    if (status >= 500 && status < 600) {
      return true;
    }

    // Timeout errors
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return true;
    }

    // 4xx Client Errors are NOT retryable (except 429)
    if (status >= 400 && status < 500) {
      return false;
    }

    return false;
  }

  /**
   * Calculate exponential backoff delay with jitter
   * @param attempt - Current attempt number (1-indexed)
   * @returns Delay in milliseconds
   * @private
   */
  private calculateBackoffDelay(attempt: number): number {
    // Exponential backoff: baseDelay * (factor ^ (attempt - 1))
    const exponentialDelay = this.retryConfig.baseDelay * Math.pow(this.retryConfig.factor, attempt - 1);
    
    // Cap at maxDelay
    const cappedDelay = Math.min(exponentialDelay, this.retryConfig.maxDelay);
    
    // Add jitter: random value between 0 and cappedDelay
    const jitter = Math.random() * cappedDelay;
    
    return Math.floor(jitter);
  }

  /**
   * Execute a function with retry logic and exponential backoff
   * @param fn - Function to execute
   * @param operationName - Name of the operation for logging
   * @returns Result of the function
   * @private
   */
  private async withRetry<T>(fn: () => Promise<T>, operationName: string): Promise<T> {
    // Wrap the entire retry logic with circuit breaker
    return this.circuitBreaker.execute(async () => {
      let lastError: any;

      for (let attempt = 1; attempt <= this.retryConfig.maxAttempts; attempt++) {
        try {
          return await fn();
        } catch (error: any) {
          lastError = error;

          // Check if error is retryable
          if (!this.isRetryableError(error)) {
            // Non-retryable error, throw immediately
            throw error;
          }

          // If this was the last attempt, throw the error
          if (attempt === this.retryConfig.maxAttempts) {
            console.error(
              `[ShopifyAPIClient] ${operationName} failed after ${attempt} attempts`,
              {
                error: error.message,
                status: error.response?.status,
              }
            );
            throw error;
          }

          // Calculate backoff delay
          const delay = this.calculateBackoffDelay(attempt);

          console.warn(
            `[ShopifyAPIClient] ${operationName} failed (attempt ${attempt}/${this.retryConfig.maxAttempts}). Retrying after ${delay}ms`,
            {
              error: error.message,
              status: error.response?.status,
              attempt,
              delay,
            }
          );

          // Wait before retrying
          await this.sleep(delay);
        }
      }

      // This should never be reached, but TypeScript needs it
      throw lastError;
    });
  }

  /**
   * Extract retry-after delay from response headers
   * @param headers - Response headers
   * @returns Delay in milliseconds
   * @private
   */
  private getRetryAfterDelay(headers: any): number {
    // Check for Retry-After header (can be in seconds or HTTP date)
    const retryAfter = headers['retry-after'] || headers['Retry-After'];
    
    if (!retryAfter) {
      // Default to 2 seconds if no Retry-After header
      return 2000;
    }

    // If it's a number, it's in seconds
    const seconds = parseInt(retryAfter, 10);
    if (!isNaN(seconds)) {
      return seconds * 1000;
    }

    // If it's a date string, calculate the difference
    const retryDate = new Date(retryAfter);
    if (!isNaN(retryDate.getTime())) {
      const now = new Date();
      const delay = retryDate.getTime() - now.getTime();
      return Math.max(delay, 0);
    }

    // Fallback to 2 seconds
    return 2000;
  }

  /**
   * Sleep for a specified duration
   * @param ms - Duration in milliseconds
   * @private
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get the current circuit breaker state
   * Useful for monitoring and testing
   * @returns Current circuit breaker state
   */
  getCircuitBreakerState(): string {
    return this.circuitBreaker.getState();
  }

  /**
   * Reset the circuit breaker to closed state
   * Useful for testing or manual intervention
   */
  resetCircuitBreaker(): void {
    this.circuitBreaker.reset();
  }
}

/**
 * Create ShopifyAPIClient from environment variables
 * @returns Configured ShopifyAPIClient instance
 * @throws Error if required environment variables are missing
 */
export function createShopifyClientFromEnv(): ShopifyAPIClient {
  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-01';

  if (!shopDomain) {
    throw new Error('SHOPIFY_SHOP_DOMAIN environment variable is required');
  }

  if (!accessToken) {
    throw new Error('SHOPIFY_ACCESS_TOKEN environment variable is required');
  }

  return new ShopifyAPIClient({
    shopDomain,
    accessToken,
    apiVersion,
  });
}
