/**
 * CircuitBreaker - Prevents cascading failures when external APIs are down
 * 
 * Implements the circuit breaker pattern with three states:
 * - CLOSED: Normal operation, requests pass through
 * - OPEN: Too many failures, requests fail immediately
 * - HALF_OPEN: Testing if service has recovered
 * 
 * Requirements: 7.4
 */

/**
 * Circuit breaker states
 */
export enum CircuitBreakerState {
  CLOSED = 'closed',
  OPEN = 'open',
  HALF_OPEN = 'half-open',
}

/**
 * Configuration for CircuitBreaker
 */
export interface CircuitBreakerConfig {
  /** Number of failures before opening the circuit (default: 5) */
  threshold?: number;
  /** Time in milliseconds before attempting to close the circuit (default: 60000 = 1 minute) */
  timeout?: number;
}

/**
 * CircuitBreaker - Protects against cascading failures
 */
export class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.CLOSED;
  private failureCount: number = 0;
  private lastFailureTime?: number;
  private readonly threshold: number;
  private readonly timeout: number;

  /**
   * Create a new CircuitBreaker
   * @param config - Configuration with threshold and timeout
   */
  constructor(config: CircuitBreakerConfig = {}) {
    this.threshold = config.threshold ?? 5;
    this.timeout = config.timeout ?? 60000; // 1 minute default
  }

  /**
   * Execute a function with circuit breaker protection
   * @param fn - Function to execute
   * @returns Result of the function
   * @throws Error if circuit is open or function fails
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Check if circuit should transition from OPEN to HALF_OPEN
    if (this.state === CircuitBreakerState.OPEN) {
      if (this.shouldAttemptReset()) {
        this.transitionTo(CircuitBreakerState.HALF_OPEN);
      } else {
        throw new Error('Circuit breaker is open - service unavailable');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  /**
   * Get current circuit breaker state
   * @returns Current state
   */
  getState(): CircuitBreakerState {
    return this.state;
  }

  /**
   * Get current failure count
   * @returns Number of consecutive failures
   */
  getFailureCount(): number {
    return this.failureCount;
  }

  /**
   * Reset the circuit breaker to CLOSED state
   * Useful for testing or manual intervention
   */
  reset(): void {
    this.failureCount = 0;
    this.lastFailureTime = undefined;
    this.transitionTo(CircuitBreakerState.CLOSED);
  }

  /**
   * Check if enough time has passed to attempt reset
   * @returns True if timeout has elapsed since last failure
   * @private
   */
  private shouldAttemptReset(): boolean {
    if (!this.lastFailureTime) {
      return true;
    }
    return Date.now() - this.lastFailureTime > this.timeout;
  }

  /**
   * Handle successful execution
   * @private
   */
  private onSuccess(): void {
    this.failureCount = 0;
    if (this.state === CircuitBreakerState.HALF_OPEN) {
      this.transitionTo(CircuitBreakerState.CLOSED);
    }
  }

  /**
   * Handle failed execution
   * @private
   */
  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.threshold) {
      this.transitionTo(CircuitBreakerState.OPEN);
    }
  }

  /**
   * Transition to a new state with logging
   * @param newState - State to transition to
   * @private
   */
  private transitionTo(newState: CircuitBreakerState): void {
    const oldState = this.state;
    this.state = newState;

    // Log state changes for monitoring
    console.log(
      `[CircuitBreaker] State transition: ${oldState} -> ${newState}`,
      {
        failureCount: this.failureCount,
        threshold: this.threshold,
        lastFailureTime: this.lastFailureTime,
      }
    );
  }
}
