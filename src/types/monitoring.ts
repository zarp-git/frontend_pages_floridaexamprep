/**
 * Event data for iframe load tracking
 */
export interface IframeLoadEvent {
  courseSlug: string;
  timestamp: number;
  loadTime: number; // milliseconds
  success: boolean;
  errorMessage?: string;
}

/**
 * Health status for iframe accessibility checks
 */
export interface IframeHealthStatus {
  courseSlug: string;
  isAccessible: boolean;
  lastChecked: number;
  responseTime: number;
}
