/**
 * Queue Processing Cron Job
 * 
 * This endpoint is designed to be called by Vercel Cron (or external scheduler)
 * to process pending sync events from the queue.
 * 
 * Vercel Cron Configuration (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/process-queue",
 *     "schedule": "* * * * *"
 *   }]
 * }
 * 
 * Security: This endpoint should be protected by Vercel Cron secret or API key
 */

import { NextRequest, NextResponse } from 'next/server';
import { getQueue } from '@/server/services/product-sync/queue-instance';
import { QUEUE_PROCESSING_CONFIG } from '@/server/config/queue';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Maximum duration for Vercel Pro (60s)

/**
 * Process queue batch
 * Called by Vercel Cron every minute
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const queue = getQueue();
    await queue.connect();

    // Process a batch of events
    const startTime = Date.now();
    const result = await queue.processBatch(
      async (event) => {
        // Import handler dynamically to avoid circular dependencies
        const { processQueueEvent } = await import('@/server/services/product-sync/queue-processor');
        await processQueueEvent(event);
      },
      QUEUE_PROCESSING_CONFIG.batchSize
    );

    const duration = Date.now() - startTime;

    // Get queue metrics
    const metrics = await queue.getMetrics();

    console.log('Queue processing completed', {
      processed: result.processed,
      failed: result.failed,
      duration,
      metrics,
    });

    return NextResponse.json({
      success: true,
      processed: result.processed,
      failed: result.failed,
      duration,
      metrics,
    });
  } catch (error) {
    console.error('Queue processing error:', error);
    
    return NextResponse.json(
      {
        error: 'Queue processing failed',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * Manual trigger endpoint (for testing)
 * POST /api/cron/process-queue
 */
export async function POST(request: NextRequest) {
  // Same logic as GET, but can be called manually
  return GET(request);
}
