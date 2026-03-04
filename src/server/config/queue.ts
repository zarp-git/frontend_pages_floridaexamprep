/**
 * Queue Configuration for GHL-Shopify Product Sync
 * 
 * Centralizes queue-related configuration for the sync system.
 * Compatible with Vercel KV (Redis) and serverless environments.
 */

import type { EventQueueConfig } from '@/server/services/product-sync/EventQueue';

/**
 * Get queue configuration from environment variables
 */
export function getQueueConfig(): EventQueueConfig {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error('REDIS_URL environment variable is required');
  }

  return {
    redisUrl,
    maxRetries: parseInt(process.env.SYNC_MAX_RETRIES || '3', 10),
    retryDelayMs: parseInt(process.env.SYNC_RETRY_BASE_DELAY_MS || '1000', 10),
    processingTimeoutMs: parseInt(process.env.SYNC_WEBHOOK_TIMEOUT_MS || '30000', 10),
  };
}

/**
 * Queue processing configuration for Vercel Cron
 */
export const QUEUE_PROCESSING_CONFIG = {
  // Number of events to process per cron run
  // Keep this low to respect Vercel's 10s (Hobby) or 60s (Pro) timeout
  batchSize: parseInt(process.env.QUEUE_BATCH_SIZE || '10', 10),
  
  // Cron schedule (runs every minute by default)
  cronSchedule: process.env.QUEUE_CRON_SCHEDULE || '* * * * *',
} as const;
