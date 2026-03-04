# Implementation Plan: GHL-Shopify Product Sync

## Overview

This implementation plan breaks down the GHL-Shopify product synchronization system into discrete coding tasks. The system will receive product events from GoHighLevel via webhooks and automatically sync them to Shopify using a queue-based architecture with PostgreSQL for persistence and BullMQ with Redis for event processing.

## Tasks

- [x] 1. Set up database schema and migrations
  - Create PostgreSQL migration files for product_mappings, variant_mappings, sync_status, sync_history, processed_events, and bulk_sync_control tables
  - Add indexes for performance optimization
  - Create database connection utilities if not already present
  - **CRITICAL**: processed_events table ensures idempotency
  - **CRITICAL**: variant_mappings table required for complex variant sync
  - **CRITICAL**: bulk_sync_control prevents race conditions
  - _Requirements: 3.2, 6.1, 6.2, 6.3_

- [x] 2. Implement core data models and types
  - [x] 2.1 Create TypeScript interfaces for GHL and Shopify data models
    - Define GHLProduct, GHLVariant, GHLImage interfaces
    - Define ShopifyProduct, ShopifyVariant, ShopifyImage interfaces
    - Define SyncEvent, SyncStatus, ProductMapping interfaces
    - _Requirements: 2.1, 3.2, 6.1_

  - [x]* 2.2 Write property test for data model validation
    - **Property 3: Complete Product Mapping**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7**

- [x] 3. Implement Product Mapper component
  - [x] 3.1 Create ProductMapper class with transformation logic
    - Implement mapToShopify() method for complete product transformation
    - Implement mapVariants() method for variant mapping
    - Implement mapImages() method for image URL validation and mapping
    - Handle missing fields with defaults or validation errors
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [x]* 3.2 Write property test for missing field handling
    - **Property 4: Missing Field Handling**
    - **Validates: Requirements 2.8**

  - [x]* 3.3 Write unit tests for ProductMapper edge cases
    - Test special characters in product titles
    - Test empty descriptions and default values
    - Test maximum limits (10 images, 100 variants)
    - _Requirements: 2.1, 2.8_

- [x] 4. Implement Shopify API Client
  - [x] 4.1 Create ShopifyAPIClient class with authentication
    - Implement OAuth or API key authentication
    - Configure base URL and headers
    - Store credentials securely using environment variables
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 4.2 Implement reactive rate limiting (handle 429 responses)
    - Add retry logic for 429 responses with Retry-After header
    - Log rate limit hits for monitoring
    - **Note**: Shopify uses leaky bucket (40 requests, 2/s refill) - start with reactive approach
    - _Requirements: 3.5, 9.5_

  - [x]* 4.3 (Optional) Implement proactive rate limiter if 429s become frequent
    - Create RateLimiter class with leaky bucket logic (40 capacity, 2/s refill)
    - Add rate limit warning logging at 80% threshold
    - _Requirements: 3.5, 9.5_

  - [x]* 4.4 Write property test for rate limit throttling (if proactive limiter implemented)
    - **Property 8: Rate Limit Throttling**
    - **Validates: Requirements 3.5**

  - [x] 4.5 Implement Shopify API methods
    - Implement createProduct() method
    - Implement updateProduct() method
    - Implement getProduct() method
    - Implement unpublishProduct() method for archival
    - Implement uploadProductImage() method
    - Implement getAllProducts() method with pagination for bulk sync
    - **CRITICAL**: Implement getProductVariants() and updateVariant() for variant sync
    - _Requirements: 3.1, 4.1, 5.1, 10.1, 11.1, 12.1_

  - [x] 4.6 Add retry logic with exponential backoff
    - Implement retry wrapper with configurable attempts (default: 3)
    - Add exponential backoff with jitter (base: 1s, max: 10s)
    - Distinguish retryable errors (429, 5xx, timeouts) from non-retryable (4xx)
    - _Requirements: 3.3, 4.5_

  - [x]* 4.7 Write property test for retry behavior
    - **Property 6: Retry with Exponential Backoff**
    - **Validates: Requirements 3.3, 4.5**

  - [x] 4.8 Implement circuit breaker pattern
    - Create CircuitBreaker class with open/closed/half-open states
    - Configure threshold (5 failures) and timeout (60 seconds)
    - Add circuit breaker state change logging
    - _Requirements: 7.4_

  - [x]* 4.9 Write unit tests for API client error handling
    - Test authentication failure handling
    - Test circuit breaker state transitions
    - Test retry exhaustion scenarios
    - _Requirements: 7.4, 3.3_

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement Sync Status Tracker
  - [x] 6.1 Create SyncStatusTracker class with database operations
    - Implement recordSyncAttempt() method to log sync operations
    - Implement getSyncStatus() method to query by GHL product ID
    - Implement getFailedSyncs() method for retry queue
    - Implement updateSyncStatus() method to update status and timestamps
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x]* 6.2 Write property test for sync status round trip
    - **Property 13: Sync Status Round Trip**
    - **Validates: Requirements 6.3, 6.4**

  - [x]* 6.3 Write property test for failed status after retry exhaustion
    - **Property 14: Failed Status After Retry Exhaustion**
    - **Validates: Requirements 6.5**

  - [x] 6.4 Create ProductMappingStore for ID mappings
    - Implement storeMapping() method to save GHL ↔ Shopify ID pairs
    - Implement getMapping() method to retrieve by GHL product ID
    - Implement getShopifyId() helper method
    - **CRITICAL**: Implement storeVariantMapping() and getVariantMapping() for variant IDs
    - _Requirements: 3.2, 4.2, 5.4, 11.4_

  - [x]* 6.5 Write property test for product creation and mapping storage
    - **Property 5: Product Creation and Mapping Storage**
    - **Validates: Requirements 3.1, 3.2**

- [x] 7. Implement Event Queue (Vercel-compatible)
  - [x] 7.1 Set up queue infrastructure for Vercel
    - Option A: Use Vercel KV (Redis) with Vercel Cron for processing
    - Option B: Use external worker service (Railway/Render) with Vercel KV
    - Configure queue with retry settings
    - **Note**: Vercel has 10s timeout (Hobby) or 60s (Pro) - no long-running workers
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 7.2 Implement EventQueue class
    - Implement enqueue() method to add sync events to Redis/KV
    - Implement process() method to consume events (via cron or external worker)
    - Implement getMetrics() method for queue monitoring
    - Add job deduplication based on GHL product ID + timestamp
    - _Requirements: 8.1, 8.2, 8.3_

  - [x]* 7.3 Write property test for event processing order
    - **Property 17: Event Processing Order**
    - **Validates: Requirements 8.1**

  - [x]* 7.4 Write property test for duplicate event deduplication
    - **Property 18: Duplicate Event Deduplication**
    - **Validates: Requirements 8.2**

  - [x] 7.5 Implement failed event handling
    - Add failed job storage in database after retry exhaustion
    - Update sync status to "failed" when job fails permanently
    - Add failed job monitoring endpoint
    - _Requirements: 6.5, 9.1_

- [x] 8. Implement Product Sync Service
  - [x] 8.1 Create ProductSyncService class
    - Inject dependencies (ShopifyAPIClient, SyncStatusTracker, ProductMappingStore)
    - Implement createProduct() method with mapping storage
    - Implement updateProduct() method with fallback to create
    - Implement archiveProduct() method (unpublish, not delete)
    - _Requirements: 3.1, 3.2, 4.1, 4.3, 4.4, 5.1, 5.2_

  - [x]* 8.2 Write property test for successful sync status recording
    - **Property 7: Successful Sync Status Recording**
    - **Validates: Requirements 3.4, 4.6, 6.2**

  - [x]* 8.3 Write property test for product update operation
    - **Property 9: Product Update Operation**
    - **Validates: Requirements 4.1, 4.3**

  - [x]* 8.4 Write property test for update fallback to create
    - **Property 10: Update Fallback to Create**
    - **Validates: Requirements 4.4**

  - [x]* 8.5 Write property test for product archival
    - **Property 11: Product Archival (Not Deletion)**
    - **Validates: Requirements 5.1, 5.2**

  - [x]* 8.6 Write property test for archived status recording
    - **Property 12: Archived Status Recording**
    - **Validates: Requirements 5.3, 5.4**

  - [x] 8.7 Implement image synchronization logic
    - Add downloadAndUploadImages() helper method
    - Handle partial image failures (continue with remaining images)
    - Preserve image order from GHL
    - Validate image formats before upload
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [x]* 8.8 Write property test for image order preservation
    - **Property 22: Image Order Preservation**
    - **Validates: Requirements 10.1, 10.2**

  - [x]* 8.9 Write property test for image validation and partial success
    - **Property 23: Image Validation and Partial Success**
    - **Validates: Requirements 10.4, 10.5**

  - [x] 8.10 Implement variant synchronization logic (CRITICAL - MOST COMPLEX)
    - Add syncVariants() helper method
    - **CRITICAL**: Fetch existing Shopify variants to compare
    - **CRITICAL**: Map variant attributes, pricing, and inventory
    - **CRITICAL**: Store variant ID mappings (GHL variant ID ↔ Shopify variant ID)
    - **CRITICAL**: Handle variant additions (create new variants)
    - **CRITICAL**: Handle variant updates (update existing variants by ID)
    - **CRITICAL**: Handle variant deletions (delete removed variants carefully)
    - **CRITICAL**: Preserve inventory_item_id when updating variants
    - **CRITICAL**: Handle SKU changes without breaking pricing
    - **WARNING**: This is the most complex part of the system - test thoroughly
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [x]* 8.11 Write property test for variant synchronization
    - **Property 24: Variant Synchronization**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4**

  - [x]* 8.12 Write property test for variant changes synchronization
    - **Property 25: Variant Changes Synchronization**
    - **Validates: Requirements 11.5**

  - [x] 8.13 Implement bulk sync operation
    - Implement bulkSync() method with progress callback
    - **CRITICAL**: Check bulk_sync_control table and set is_running flag
    - **CRITICAL**: Prevent concurrent bulk syncs
    - Fetch all GHL products using pagination
    - Process in batches of 50 products
    - Continue on individual failures and collect errors
    - Return comprehensive BulkSyncResult with metrics
    - **CRITICAL**: Clear is_running flag when complete (even on error)
    - **CRITICAL**: During bulk sync, webhooks should check flag and skip or queue for later
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [x]* 8.14 Write property test for bulk sync batching
    - **Property 26: Bulk Sync Batching**
    - **Validates: Requirements 12.2**

  - [x]* 8.15 Write property test for bulk sync progress reporting
    - **Property 27: Bulk Sync Progress Reporting**
    - **Validates: Requirements 12.3**

  - [x]* 8.16 Write property test for bulk sync partial failure handling
    - **Property 28: Bulk Sync Partial Failure Handling**
    - **Validates: Requirements 12.4**

- [x] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implement Webhook Handler
  - [x] 10.1 Create WebhookHandler class with idempotency
    - Implement handleWebhook() method to receive POST requests
    - Implement validateSignature() method using HMAC-SHA256
    - **CRITICAL**: Implement isEventProcessed() to check processed_events table
    - **CRITICAL**: Implement markEventProcessed() to store event_id
    - **CRITICAL**: Return 200 for already-processed events (idempotent behavior)
    - Validate webhook payload structure
    - Enqueue valid events to EventQueue
    - Return appropriate HTTP status codes (200, 400, 401)
    - **CRITICAL**: Check bulk_sync_control flag - if bulk sync running, queue event for later
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [x]* 10.2 Write property test for valid webhook acceptance
    - **Property 1: Valid Webhook Acceptance**
    - **Validates: Requirements 1.2, 1.3, 1.4, 1.6**

  - [x]* 10.3 Write property test for invalid webhook rejection
    - **Property 2: Invalid Webhook Rejection**
    - **Validates: Requirements 1.5, 1.6**

  - [x] 10.4 Write unit tests for webhook edge cases
    - Test missing signature header
    - Test empty payload
    - Test malformed JSON
    - **CRITICAL**: Test duplicate event_id (should return 200 without processing)
    - **CRITICAL**: Test webhook during bulk sync (should queue for later)
    - _Requirements: 1.5_

- [x] 11. Create Next.js API route for webhook endpoint
  - [x] 11.1 Create API route at /api/webhooks/ghl
    - Wire WebhookHandler to Next.js API route
    - Handle POST requests only
    - Add request logging with correlation IDs
    - Return JSON responses with appropriate status codes
    - _Requirements: 1.1, 9.1_

  - [x] 11.2 Configure webhook URL in environment variables
    - Add WEBHOOK_SECRET for signature validation
    - Add GHL_API_KEY and SHOPIFY_API_KEY
    - Add SHOPIFY_STORE_URL
    - Document all required environment variables in .env.example
    - _Requirements: 7.3_

- [x] 12. Implement queue consumer worker (Vercel-compatible)
  - [x] 12.1 Create queue processor function
    - Implement job handler that processes SyncEvent
    - Call ProductMapper to transform data
    - Call ProductSyncService based on event type (create/update/delete)
    - Record sync attempts in SyncStatusTracker
    - Handle errors and implement retry mechanism
    - _Requirements: 8.1, 8.3, 9.1_

  - [x] 12.2 Set up worker process for Vercel
    - **Option A**: Create Vercel Cron job at /api/cron/process-queue (runs every minute)
    - **Option B**: Set up external worker service (Railway/Render) that polls Vercel KV
    - Configure worker to process queue in batches (respect 10s/60s timeout)
    - Add graceful shutdown handling
    - **Note**: Document migration path to VPS with BullMQ for future scaling
    - _Requirements: 8.3, 8.4_

- [x] 13. Implement comprehensive logging
  - [x] 13.1 Set up structured logging with Winston or Pino
    - Configure log levels (error, warn, info, debug)
    - Add log formatting for JSON output
    - Configure log rotation and retention
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 13.2 Add logging throughout the application
    - Log all webhook receipts with correlation IDs
    - Log all sync operations with timestamps and product IDs
    - Log all API errors with full error details and stack traces
    - Log webhook validation failures
    - Log rate limit warnings when approaching threshold
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [x]* 13.3 Write property test for comprehensive operation logging
    - **Property 19: Comprehensive Operation Logging**
    - **Validates: Requirements 9.1**

  - [x]* 13.4 Write property test for error logging completeness
    - **Property 20: Error Logging Completeness**
    - **Validates: Requirements 9.2, 9.3**

  - [x]* 13.5 Write property test for rate limit warning
    - **Property 21: Rate Limit Warning**
    - **Validates: Requirements 9.5**

- [x] 14. Implement authentication and token management
  - [x] 14.1 Create authentication utilities
    - Implement GHL API authentication
    - Implement Shopify API authentication
    - Add token refresh logic before expiration
    - Handle authentication failures gracefully
    - _Requirements: 7.1, 7.2, 7.4, 7.5_

  - [x]* 14.2 Write property test for authentication failure handling
    - **Property 15: Authentication Failure Handling**
    - **Validates: Requirements 7.4**

  - [x]* 14.3 Write property test for token refresh before expiration
    - **Property 16: Token Refresh Before Expiration**
    - **Validates: Requirements 7.5**

- [x] 15. Create monitoring and metrics endpoints
  - [x] 15.1 Create API route for queue metrics
    - Expose queue depth, active jobs, completed jobs, failed jobs
    - Add endpoint at /api/admin/metrics/queue
    - _Requirements: 8.5, 9.4_

  - [x] 15.2 Create API route for sync status dashboard
    - Expose sync success rate, average sync time, failed syncs
    - Add endpoint at /api/admin/sync-status
    - _Requirements: 6.4, 9.4_

  - [x] 15.3 Add health check endpoint
    - Check database connectivity
    - Check Redis connectivity
    - Check Shopify API connectivity
    - Add endpoint at /api/health
    - _Requirements: 7.4_

- [x] 16. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 17. Create integration tests
  - [x]* 17.1 Write end-to-end sync flow test
    - Test complete flow: webhook → validate → enqueue → process → create in Shopify → record status
    - Use test Shopify store and GHL sandbox
    - _Requirements: All_

  - [x]* 17.2 Write bulk sync flow test
    - Test bulk sync with multiple products
    - Verify batching and progress reporting
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [x]* 17.3 Write error recovery flow test
    - Simulate API failures and verify retry behavior
    - Verify DLQ handling on final failure
    - _Requirements: 3.3, 6.5_

- [x] 18. Create test data generators and arbitraries
  - [x] 18.1 Create fast-check arbitraries for property tests
    - Implement ghlProductArbitrary() generator
    - Implement webhookPayloadArbitrary() generator
    - Implement invalidWebhookArbitrary() generator
    - Implement ghlImageArbitrary() and ghlVariantArbitrary() generators
    - _Requirements: All property tests_

  - [x] 18.2 Create test data factories for unit tests
    - Create factory functions for test GHL products
    - Create factory functions for test Shopify products
    - Create mock API response builders
    - _Requirements: All unit tests_

- [x] 19. Documentation and configuration
  - [x] 19.1 Update .env.example with all required variables
    - Add DATABASE_URL
    - Add REDIS_URL
    - Add GHL_API_KEY and GHL_WEBHOOK_SECRET
    - Add SHOPIFY_API_KEY and SHOPIFY_STORE_URL
    - Add LOG_LEVEL
    - _Requirements: 7.3_

  - [x] 19.2 Create README documentation
    - Document setup instructions
    - Document environment variables
    - Document webhook registration with GHL
    - Document how to run bulk sync
    - Document monitoring endpoints
    - _Requirements: All_

  - [x] 19.3 Add inline code documentation
    - Add JSDoc comments to all public methods
    - Document complex algorithms (rate limiting, circuit breaker)
    - Add usage examples in comments
    - _Requirements: All_

- [x] 20. Final checkpoint - Ensure all tests pass
  - Run all unit tests, property tests, and integration tests
  - Verify test coverage meets goals (>85% overall, >90% for critical paths)
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- **CRITICAL tasks** are marked and require extra attention - these are the most complex parts
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows
- The implementation uses TypeScript with Next.js, PostgreSQL, and Vercel KV as specified in the design
- **Vercel Deployment**: Initial implementation uses Vercel Cron or external worker due to serverless limitations
- **Migration Path**: All components can be consolidated into single Node process with BullMQ when moving to VPS
- All 28 correctness properties from the design document are covered by property-based tests
- Checkpoints ensure incremental validation and provide opportunities to address issues early

## Critical Implementation Notes

1. **Idempotency**: The `processed_events` table is CRITICAL to prevent duplicate processing when GHL sends duplicate webhooks
2. **Variant Sync**: Most complex part of the system - requires careful handling of additions, updates, deletions, and inventory_item_id preservation
3. **Race Conditions**: The `bulk_sync_control` flag prevents webhooks from conflicting with bulk sync operations
4. **Rate Limiting**: Start with reactive 429 handling (simpler), add proactive throttling only if needed
5. **Vercel Limitations**: No long-running workers - use Vercel Cron (every minute) or external worker service
6. **Property Testing**: Focus on transformations (Mapper, Rate Limiter, Retry Logic) - use unit tests for simpler validation/logging
