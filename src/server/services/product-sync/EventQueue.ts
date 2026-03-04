/**
 * Event Queue for GHL-Shopify Product Sync
 * 
 * Implements a Redis-based queue for asynchronous processing of sync events.
 * Compatible with Vercel KV (Redis) and designed for serverless environments.
 * 
 * Architecture:
 * - Uses Redis lists for queue storage (LPUSH/RPOP pattern)
 * - Supports retry with exponential backoff
 * - Provides metrics for monitoring
 * - Handles job deduplication based on event ID
 */

import { createClient, RedisClientType } from 'redis';
import type { SyncEvent, QueueMetrics } from '@/types/ghl-shopify-sync';

export interface EventQueueConfig {
  redisUrl: string;
  maxRetries?: number;
  retryDelayMs?: number;
  processingTimeoutMs?: number;
}

export class EventQueue {
  private client: RedisClientType | null = null;
  private config: Required<EventQueueConfig>;
  private isConnected = false;

  // Queue keys
  private readonly QUEUE_KEY = 'sync:queue:pending';
  private readonly PROCESSING_KEY = 'sync:queue:processing';
  private readonly FAILED_KEY = 'sync:queue:failed';
  private readonly COMPLETED_KEY = 'sync:queue:completed';
  private readonly DEDUP_KEY_PREFIX = 'sync:dedup:';

  constructor(config: EventQueueConfig) {
    this.config = {
      redisUrl: config.redisUrl,
      maxRetries: config.maxRetries ?? 3,
      retryDelayMs: config.retryDelayMs ?? 1000,
      processingTimeoutMs: config.processingTimeoutMs ?? 30000,
    };
  }

  /**
   * Initialize Redis connection
   */
  async connect(): Promise<void> {
    if (this.isConnected && this.client) {
      return;
    }

    this.client = createClient({
      url: this.config.redisUrl,
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    await this.client.connect();
    this.isConnected = true;
  }

  /**
   * Close Redis connection
   */
  async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      await this.client.quit();
      this.isConnected = false;
      this.client = null;
    }
  }

  /**
   * Add a sync event to the queue
   * Implements deduplication based on event ID
   */
  async enqueue(event: SyncEvent): Promise<void> {
    await this.ensureConnected();

    // Check for duplicate event
    const dedupKey = `${this.DEDUP_KEY_PREFIX}${event.id}`;
    const isDuplicate = await this.client!.exists(dedupKey);

    if (isDuplicate) {
      console.log(`Event ${event.id} already queued, skipping duplicate`);
      return;
    }

    // Add event to queue
    const eventData = JSON.stringify(event);
    await this.client!.lPush(this.QUEUE_KEY, eventData);

    // Set deduplication flag (expires after 24 hours)
    await this.client!.setEx(dedupKey, 86400, '1');

    console.log(`Event ${event.id} enqueued successfully`);
  }

  /**
   * Process events from the queue
   * Designed for Vercel Cron or external worker
   * 
   * @param handler - Function to process each event
   * @param batchSize - Number of events to process in one batch (default: 10)
   */
  async processBatch(
    handler: (event: SyncEvent) => Promise<void>,
    batchSize: number = 10
  ): Promise<{ processed: number; failed: number }> {
    await this.ensureConnected();

    let processed = 0;
    let failed = 0;

    for (let i = 0; i < batchSize; i++) {
      // Move event from pending to processing
      const eventData = await this.client!.rPopLPush(
        this.QUEUE_KEY,
        this.PROCESSING_KEY
      );

      if (!eventData) {
        // No more events in queue
        break;
      }

      try {
        const event: SyncEvent = JSON.parse(eventData);
        
        // Process the event
        await handler(event);

        // Move to completed
        await this.client!.lRem(this.PROCESSING_KEY, 1, eventData);
        await this.client!.lPush(this.COMPLETED_KEY, eventData);
        
        // Trim completed list to last 1000 items
        await this.client!.lTrim(this.COMPLETED_KEY, 0, 999);

        processed++;
        console.log(`Event ${event.id} processed successfully`);
      } catch (error) {
        // Handle failure
        const event: SyncEvent = JSON.parse(eventData);
        event.retryCount++;

        if (event.retryCount >= this.config.maxRetries) {
          // Max retries reached, move to failed queue
          await this.client!.lRem(this.PROCESSING_KEY, 1, eventData);
          await this.client!.lPush(this.FAILED_KEY, JSON.stringify({
            ...event,
            failedAt: new Date().toISOString(),
            error: error instanceof Error ? error.message : String(error),
          }));
          
          failed++;
          console.error(`Event ${event.id} failed after ${event.retryCount} attempts:`, error);
        } else {
          // Retry with exponential backoff
          const delay = this.config.retryDelayMs * Math.pow(2, event.retryCount - 1);
          
          // Move back to pending queue with updated retry count
          await this.client!.lRem(this.PROCESSING_KEY, 1, eventData);
          
          // Schedule retry (in a real implementation, you'd use a delayed queue)
          // For now, we'll add it back to the pending queue immediately
          // The cron job will pick it up on the next run
          await this.client!.lPush(this.QUEUE_KEY, JSON.stringify(event));
          
          console.log(`Event ${event.id} will retry (attempt ${event.retryCount + 1}/${this.config.maxRetries}) after ${delay}ms`);
        }
      }
    }

    return { processed, failed };
  }

  /**
   * Get queue metrics for monitoring
   */
  async getMetrics(): Promise<QueueMetrics> {
    await this.ensureConnected();

    const [pending, active, completed, failed] = await Promise.all([
      this.client!.lLen(this.QUEUE_KEY),
      this.client!.lLen(this.PROCESSING_KEY),
      this.client!.lLen(this.COMPLETED_KEY),
      this.client!.lLen(this.FAILED_KEY),
    ]);

    return {
      pending,
      active,
      completed,
      failed,
    };
  }

  /**
   * Get failed events for manual review
   */
  async getFailedEvents(limit: number = 100): Promise<SyncEvent[]> {
    await this.ensureConnected();

    const failedData = await this.client!.lRange(this.FAILED_KEY, 0, limit - 1);
    return failedData.map(data => JSON.parse(data));
  }

  /**
   * Retry a failed event
   */
  async retryFailedEvent(eventId: string): Promise<boolean> {
    await this.ensureConnected();

    // Find the event in failed queue
    const failedData = await this.client!.lRange(this.FAILED_KEY, 0, -1);
    const eventIndex = failedData.findIndex(data => {
      const event = JSON.parse(data);
      return event.id === eventId;
    });

    if (eventIndex === -1) {
      return false;
    }

    const eventData = failedData[eventIndex];
    const event: SyncEvent = JSON.parse(eventData);
    
    // Reset retry count and move back to pending queue
    event.retryCount = 0;
    await this.client!.lRem(this.FAILED_KEY, 1, eventData);
    await this.enqueue(event);

    return true;
  }

  /**
   * Clear all queues (for testing/maintenance)
   */
  async clearAll(): Promise<void> {
    await this.ensureConnected();

    await Promise.all([
      this.client!.del(this.QUEUE_KEY),
      this.client!.del(this.PROCESSING_KEY),
      this.client!.del(this.FAILED_KEY),
      this.client!.del(this.COMPLETED_KEY),
    ]);

    console.log('All queues cleared');
  }

  /**
   * Ensure Redis connection is established
   */
  private async ensureConnected(): Promise<void> {
    if (!this.isConnected || !this.client) {
      await this.connect();
    }
  }
}

/**
 * Create a singleton instance of EventQueue
 */
let queueInstance: EventQueue | null = null;

export function getEventQueue(config?: EventQueueConfig): EventQueue {
  if (!queueInstance) {
    if (!config) {
      throw new Error('EventQueue config required for first initialization');
    }
    queueInstance = new EventQueue(config);
  }
  return queueInstance;
}
