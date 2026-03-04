/**
 * Queue Instance Singleton
 * 
 * Provides a singleton instance of the EventQueue for use across the application.
 * Ensures only one Redis connection is maintained.
 */

import { EventQueue } from './EventQueue';
import { getQueueConfig } from '@/server/config/queue';

let queueInstance: EventQueue | null = null;

/**
 * Get or create the EventQueue singleton instance
 */
export function getQueue(): EventQueue {
  if (!queueInstance) {
    const config = getQueueConfig();
    queueInstance = new EventQueue(config);
  }
  return queueInstance;
}

/**
 * Reset the queue instance (useful for testing)
 */
export function resetQueue(): void {
  if (queueInstance) {
    queueInstance.disconnect().catch(console.error);
    queueInstance = null;
  }
}
