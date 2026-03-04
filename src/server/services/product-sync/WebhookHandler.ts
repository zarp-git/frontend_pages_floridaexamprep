/**
 * Webhook Handler for GHL-Shopify Product Sync
 * 
 * Receives and validates incoming webhook events from GHL.
 * Implements idempotency to prevent duplicate processing.
 * Checks bulk sync status to prevent race conditions.
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6
 */

import crypto from 'crypto';
import type {
  WebhookRequest,
  WebhookResponse,
  GHLWebhookPayload,
  SyncEvent,
} from '@/types/ghl-shopify-sync';
import { isEventProcessed, markEventProcessed, isBulkSyncRunning } from '@/server/database/utils';
import type { EventQueue } from './EventQueue';

export interface WebhookHandlerConfig {
  webhookSecret: string;
  eventQueue: EventQueue;
}

export class WebhookHandler {
  private webhookSecret: string;
  private eventQueue: EventQueue;

  constructor(config: WebhookHandlerConfig) {
    this.webhookSecret = config.webhookSecret;
    this.eventQueue = config.eventQueue;
  }

  /**
   * Handle incoming webhook POST request
   * 
   * Validates signature, checks for duplicate events, and enqueues valid events.
   * Returns 200 for already-processed events (idempotent behavior).
   * Checks bulk sync flag and queues events for later if bulk sync is running.
   * 
   * @returns HTTP 200 on success, 400/401 on validation failure
   */
  async handleWebhook(request: WebhookRequest): Promise<WebhookResponse> {
    try {
      // Extract signature from headers
      const signature = request.headers['x-ghl-signature'] || request.headers['X-GHL-Signature'];
      
      if (!signature) {
        console.warn('Missing webhook signature', { headers: request.headers });
        return {
          status: 401,
          message: 'Unauthorized: Missing signature',
        };
      }

      // Validate webhook signature
      const payload = JSON.stringify(request.body);
      const isValid = this.validateSignature(payload, signature as string);
      
      if (!isValid) {
        console.warn('Invalid webhook signature', { 
          signature,
          payloadLength: payload.length,
        });
        return {
          status: 401,
          message: 'Unauthorized: Invalid signature',
        };
      }

      // Validate payload structure
      if (!this.isValidPayload(request.body)) {
        console.error('Malformed webhook payload', { 
          body: request.body,
        });
        return {
          status: 400,
          message: 'Bad Request: Malformed payload',
        };
      }

      const webhookPayload = request.body;

      // CRITICAL: Check if event was already processed (idempotency)
      const alreadyProcessed = await this.isEventProcessed(webhookPayload.event_id);
      
      if (alreadyProcessed) {
        console.log(`Event ${webhookPayload.event_id} already processed, returning 200 (idempotent)`);
        return {
          status: 200,
          message: 'Event already processed',
        };
      }

      // CRITICAL: Check if bulk sync is running
      const bulkSyncRunning = await isBulkSyncRunning();
      
      if (bulkSyncRunning) {
        console.log(`Bulk sync running, queueing event ${webhookPayload.event_id} for later processing`);
        // Queue the event - it will be processed after bulk sync completes
        await this.enqueueEvent(webhookPayload);
        
        // Mark as processed to prevent duplicate queueing
        await this.markEventProcessed(
          webhookPayload.event_id,
          webhookPayload.product_id,
          webhookPayload.event_type
        );
        
        return {
          status: 200,
          message: 'Event queued (bulk sync in progress)',
        };
      }

      // Enqueue valid event for processing
      await this.enqueueEvent(webhookPayload);

      // Mark event as processed
      await this.markEventProcessed(
        webhookPayload.event_id,
        webhookPayload.product_id,
        webhookPayload.event_type
      );

      console.log(`Webhook event ${webhookPayload.event_id} accepted and queued`, {
        eventType: webhookPayload.event_type,
        productId: webhookPayload.product_id,
      });

      return {
        status: 200,
        message: 'Webhook received successfully',
      };
    } catch (error) {
      console.error('Error handling webhook:', error);
      return {
        status: 500,
        message: 'Internal server error',
      };
    }
  }

  /**
   * Validate webhook signature using HMAC-SHA256
   * 
   * Compares the provided signature with a computed HMAC hash
   * of the payload using the webhook secret.
   */
  validateSignature(payload: string, signature: string): boolean {
    try {
      const hmac = crypto.createHmac('sha256', this.webhookSecret);
      hmac.update(payload);
      const computedSignature = hmac.digest('hex');
      
      // Use timing-safe comparison to prevent timing attacks
      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(computedSignature)
      );
    } catch (error) {
      console.error('Error validating signature:', error);
      return false;
    }
  }

  /**
   * Check if event was already processed (idempotency)
   * 
   * Queries the processed_events table to determine if this event
   * has been processed before.
   */
  async isEventProcessed(eventId: string): Promise<boolean> {
    return await isEventProcessed(eventId);
  }

  /**
   * Mark event as processed
   * 
   * Stores the event ID in the processed_events table to prevent
   * duplicate processing.
   */
  async markEventProcessed(
    eventId: string,
    ghlProductId: string,
    eventType: string
  ): Promise<void> {
    await markEventProcessed({
      event_id: eventId,
      ghl_product_id: ghlProductId,
      event_type: eventType as 'product.created' | 'product.updated' | 'product.deleted',
    });
  }

  /**
   * Validate webhook payload structure
   * 
   * Ensures all required fields are present and have valid types.
   */
  private isValidPayload(payload: any): payload is GHLWebhookPayload {
    if (!payload || typeof payload !== 'object') {
      return false;
    }

    // Check required fields
    if (!payload.event_id || typeof payload.event_id !== 'string') {
      return false;
    }

    if (!payload.event_type || typeof payload.event_type !== 'string') {
      return false;
    }

    if (!payload.product_id || typeof payload.product_id !== 'string') {
      return false;
    }

    if (!payload.timestamp || typeof payload.timestamp !== 'string') {
      return false;
    }

    if (!payload.data || typeof payload.data !== 'object') {
      return false;
    }

    // Validate event type
    const validEventTypes = ['product.created', 'product.updated', 'product.deleted'];
    if (!validEventTypes.includes(payload.event_type)) {
      return false;
    }

    // Validate product data has required fields
    const productData = payload.data;
    if (!productData.id || typeof productData.id !== 'string') {
      return false;
    }

    if (!productData.title || typeof productData.title !== 'string') {
      return false;
    }

    return true;
  }

  /**
   * Enqueue event for asynchronous processing
   * 
   * Converts webhook payload to SyncEvent and adds to queue.
   */
  private async enqueueEvent(payload: GHLWebhookPayload): Promise<void> {
    const syncEvent: SyncEvent = {
      id: payload.event_id,
      type: payload.event_type,
      ghlProductId: payload.product_id,
      productData: payload.data,
      timestamp: new Date(payload.timestamp),
      retryCount: 0,
    };

    await this.eventQueue.enqueue(syncEvent);
  }
}
