# Queue Infrastructure for GHL-Shopify Product Sync

## Overview

The queue infrastructure provides asynchronous processing of product sync events using Redis and Vercel Cron. This design is optimized for Vercel's serverless environment with its timeout limitations (10s for Hobby, 60s for Pro).

## Architecture

```
┌─────────────┐
│     GHL     │
└──────┬──────┘
       │ Webhook
       ▼
┌─────────────────────┐
│ Webhook Handler     │
│ (API Route)         │
│ - Validates         │
│ - Enqueues event    │
│ - Returns 200       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Redis Queue       │
│   (Vercel KV)       │
│ - Pending events    │
│ - Processing events │
│ - Failed events     │
│ - Completed events  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Vercel Cron        │
│  (Every minute)     │
│ - Processes batch   │
│ - Handles retries   │
│ - Updates status    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Queue Processor     │
│ - Maps products     │
│ - Calls Shopify API │
│ - Tracks status     │
└──────┬──────────────┘
       │
       ▼
┌─────────────┐
│   Shopify   │
└─────────────┘
```

## Components

### 1. EventQueue (`EventQueue.ts`)

Redis-based queue implementation with the following features:

- **Enqueue**: Add sync events to the queue with deduplication
- **Process Batch**: Process multiple events in one cron run
- **Retry Logic**: Automatic retry with exponential backoff
- **Metrics**: Monitor queue depth and processing stats
- **Failed Events**: Track permanently failed events for manual review

**Key Methods**:
- `enqueue(event)` - Add event to queue
- `processBatch(handler, batchSize)` - Process batch of events
- `getMetrics()` - Get queue statistics
- `getFailedEvents()` - Retrieve failed events
- `retryFailedEvent(eventId)` - Retry a failed event

### 2. Queue Processor (`queue-processor.ts`)

Orchestrates the processing of sync events:

- Maps GHL products to Shopify format
- Calls appropriate Shopify API methods
- Tracks sync status in database
- Handles errors and retries

**Event Handlers**:
- `handleProductCreated()` - Create new product in Shopify
- `handleProductUpdated()` - Update existing product
- `handleProductDeleted()` - Archive product (unpublish)

### 3. Cron Endpoint (`/api/cron/process-queue`)

Vercel Cron endpoint that runs every minute:

- Processes batch of events (default: 10)
- Respects Vercel timeout limits
- Protected by CRON_SECRET
- Returns processing metrics

### 4. Queue Configuration (`queue.ts`)

Centralizes queue configuration:

- Redis connection settings
- Retry configuration
- Batch size for processing
- Cron schedule

## Configuration

### Environment Variables

```bash
# Redis Configuration
REDIS_URL=redis://localhost:6379

# Queue Configuration
QUEUE_BATCH_SIZE=10                    # Events per cron run
QUEUE_CRON_SCHEDULE=* * * * *          # Every minute
CRON_SECRET=your_secret_here           # Cron authentication

# Sync Configuration
SYNC_MAX_RETRIES=3                     # Max retry attempts
SYNC_RETRY_BASE_DELAY_MS=1000          # Base retry delay
SYNC_WEBHOOK_TIMEOUT_MS=30000          # Processing timeout
```

### Vercel Configuration (`vercel.json`)

```json
{
  "crons": [
    {
      "path": "/api/cron/process-queue",
      "schedule": "* * * * *"
    }
  ]
}
```

## Usage

### Enqueuing Events

```typescript
import { getQueue } from '@/server/services/product-sync/queue-instance';
import type { SyncEvent } from '@/types/ghl-shopify-sync';

const queue = getQueue();
await queue.connect();

const event: SyncEvent = {
  id: 'evt_123',
  type: 'product.created',
  ghlProductId: 'ghl_prod_456',
  productData: ghlProduct,
  timestamp: new Date(),
  retryCount: 0,
};

await queue.enqueue(event);
```

### Processing Events (Automatic via Cron)

The Vercel Cron job automatically processes events every minute. No manual intervention required.

### Manual Processing (Testing)

```bash
# Trigger queue processing manually
curl -X POST http://localhost:3000/api/cron/process-queue \
  -H "Authorization: Bearer your_cron_secret"
```

### Monitoring Queue

```typescript
import { getQueue } from '@/server/services/product-sync/queue-instance';

const queue = getQueue();
await queue.connect();

const metrics = await queue.getMetrics();
console.log(metrics);
// {
//   pending: 5,
//   active: 2,
//   completed: 100,
//   failed: 3
// }
```

### Handling Failed Events

```typescript
import { getQueue } from '@/server/services/product-sync/queue-instance';

const queue = getQueue();
await queue.connect();

// Get failed events
const failedEvents = await queue.getFailedEvents(10);

// Retry a specific event
await queue.retryFailedEvent('evt_123');
```

## Retry Strategy

The queue implements exponential backoff for retries:

1. **First Retry**: 1 second delay
2. **Second Retry**: 2 seconds delay
3. **Third Retry**: 4 seconds delay
4. **After 3 Retries**: Move to failed queue

Failed events can be manually retried or investigated.

## Deduplication

Events are deduplicated based on event ID:

- Deduplication key stored in Redis for 24 hours
- Prevents duplicate processing if GHL sends same webhook multiple times
- Idempotent behavior ensures safe retries

## Performance Considerations

### Vercel Timeout Limits

- **Hobby Plan**: 10 seconds per request
- **Pro Plan**: 60 seconds per request

**Recommendations**:
- Keep `QUEUE_BATCH_SIZE` low (10-20 events)
- Each event should process in <5 seconds
- Monitor processing duration

### Redis Connection

- Single Redis connection per queue instance
- Connection reused across requests
- Automatic reconnection on failure

### Scaling

For high-volume scenarios, consider:

1. **Increase Cron Frequency**: Process every 30 seconds instead of 60
2. **Increase Batch Size**: Process more events per run (if within timeout)
3. **External Worker**: Use Railway/Render for dedicated worker process
4. **Migration to VPS**: Use BullMQ with dedicated worker processes

## Migration Path to VPS

When moving to a VPS, the queue can be upgraded to BullMQ:

```typescript
// Replace EventQueue with BullMQ
import { Queue, Worker } from 'bullmq';

const queue = new Queue('sync-queue', {
  connection: { host: 'localhost', port: 6379 }
});

const worker = new Worker('sync-queue', async (job) => {
  await processQueueEvent(job.data);
}, {
  connection: { host: 'localhost', port: 6379 }
});
```

Benefits:
- Better performance
- Advanced features (delayed jobs, priorities)
- Dedicated worker processes
- No timeout limitations

## Monitoring and Alerts

### Metrics to Monitor

- Queue depth (pending events)
- Processing rate (events/minute)
- Failure rate (failed/total)
- Processing duration

### Alert Conditions

- Queue depth > 1000 for > 5 minutes
- Failure rate > 10%
- Processing duration > 50 seconds (approaching timeout)

### Logging

All queue operations are logged:

```typescript
console.log('Event enqueued', { eventId, type, ghlProductId });
console.log('Event processed', { eventId, duration });
console.error('Event failed', { eventId, error, retryCount });
```

## Troubleshooting

### Queue Not Processing

1. Check Vercel Cron is configured correctly
2. Verify CRON_SECRET matches
3. Check Redis connection (REDIS_URL)
4. Review Vercel logs for errors

### Events Stuck in Processing

1. Check for timeout issues
2. Review processing duration
3. Manually move events back to pending queue

### High Failure Rate

1. Check Shopify API connectivity
2. Review error logs for patterns
3. Verify product data format
4. Check rate limiting

## Testing

### Unit Tests

```typescript
import { EventQueue } from './EventQueue';

describe('EventQueue', () => {
  it('should enqueue and process events', async () => {
    const queue = new EventQueue({ redisUrl: 'redis://localhost:6379' });
    await queue.connect();
    
    await queue.enqueue(testEvent);
    const metrics = await queue.getMetrics();
    
    expect(metrics.pending).toBe(1);
  });
});
```

### Integration Tests

Test the complete flow:
1. Enqueue event
2. Trigger cron endpoint
3. Verify product created in Shopify
4. Check sync status updated

## Security

### Cron Authentication

The cron endpoint is protected by `CRON_SECRET`:

```typescript
const authHeader = request.headers.get('authorization');
if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### Redis Security

- Use TLS for Redis connection in production
- Restrict Redis access to application servers only
- Rotate Redis credentials regularly

## Best Practices

1. **Keep Events Small**: Store only necessary data in events
2. **Monitor Queue Depth**: Alert if queue grows too large
3. **Handle Failures Gracefully**: Log errors, don't crash
4. **Test Retry Logic**: Ensure retries work correctly
5. **Clean Up Old Data**: Trim completed/failed queues regularly
6. **Use Structured Logging**: Include context in all logs
7. **Set Appropriate Timeouts**: Balance between processing time and timeout limits

## References

- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Vercel KV (Redis)](https://vercel.com/docs/storage/vercel-kv)
- [Redis Lists](https://redis.io/docs/data-types/lists/)
- [BullMQ](https://docs.bullmq.io/) (for VPS migration)
