/**
 * GHL Webhook API Route
 * 
 * Receives product webhook events from GoHighLevel and processes them
 * through the WebhookHandler for validation and queueing.
 * 
 * Endpoint: POST /api/webhooks/ghl
 * 
 * Security:
 * - Validates webhook signature using HMAC-SHA256
 * - Implements idempotency to prevent duplicate processing
 * - Checks bulk sync status to prevent race conditions
 * 
 * Requirements: 1.1, 9.1
 */

import { NextRequest, NextResponse } from 'next/server';
import { WebhookHandler } from '@/server/services/product-sync/WebhookHandler';
import { getQueue } from '@/server/services/product-sync/queue-instance';
import type { WebhookRequest, GHLWebhookPayload } from '@/types/ghl-shopify-sync';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

/**
 * POST handler for GHL webhook events
 * 
 * Receives product events (create, update, delete) from GHL and
 * validates, deduplicates, and queues them for processing.
 */
export async function POST(request: NextRequest) {
  // Generate correlation ID for request tracing
  const correlationId = randomUUID();
  
  const startTime = Date.now();
  
  console.log('[WEBHOOK] Received GHL webhook request', {
    correlationId,
    timestamp: new Date().toISOString(),
    url: request.url,
  });

  try {
    // Parse request body
    let body: GHLWebhookPayload;
    try {
      body = await request.json();
    } catch (error) {
      console.error('[WEBHOOK] Failed to parse request body', {
        correlationId,
        error: error instanceof Error ? error.message : String(error),
      });
      
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Extract headers
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Create webhook request object
    const webhookRequest: WebhookRequest = {
      headers,
      body,
    };

    // Get webhook secret from environment
    const webhookSecret = process.env.GHL_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[WEBHOOK] GHL_WEBHOOK_SECRET not configured', {
        correlationId,
      });
      
      return NextResponse.json(
        { error: 'Webhook handler not configured' },
        { status: 500 }
      );
    }

    // Initialize webhook handler
    const eventQueue = getQueue();
    const webhookHandler = new WebhookHandler({
      webhookSecret,
      eventQueue,
    });

    // Process webhook
    const response = await webhookHandler.handleWebhook(webhookRequest);

    const duration = Date.now() - startTime;

    // Log response
    console.log('[WEBHOOK] Webhook processing completed', {
      correlationId,
      status: response.status,
      message: response.message,
      duration,
      eventId: body.event_id,
      eventType: body.event_type,
      productId: body.product_id,
    });

    // Return response
    return NextResponse.json(
      { message: response.message },
      { status: response.status }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    
    console.error('[WEBHOOK] Unexpected error processing webhook', {
      correlationId,
      duration,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET handler - returns method not allowed
 * Only POST requests are accepted for webhooks
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send webhook events.' },
    { status: 405 }
  );
}
