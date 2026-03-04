/**
 * Unit tests for CircuitBreaker
 * 
 * Tests circuit breaker state transitions and failure handling
 * Requirements: 7.4
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CircuitBreaker, CircuitBreakerState } from './CircuitBreaker';

describe('CircuitBreaker', () => {
  let circuitBreaker: CircuitBreaker;

  beforeEach(() => {
    circuitBreaker = new CircuitBreaker({
      threshold: 5,
      timeout: 60000, // 1 minute
    });
  });

  describe('initial state', () => {
    it('should start in CLOSED state', () => {
      expect(circuitBreaker.getState()).toBe(CircuitBreakerState.CLOSED);
    });

    it('should have zero failure count', () => {
      expect(circuitBreaker.getFailureCount()).toBe(0);
    });
  });

  describe('successful execution', () => {
    it('should execute function and return result when CLOSED', async () => {
      const mockFn = vi.fn().mockResolvedValue('success');
      
      const result = await circuitBreaker.execute(mockFn);
      
      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(circuitBreaker.getState()).toBe(CircuitBreakerState.CLOSED);
    });

    it('should reset failure count on success', async () => {
      const mockFn = vi.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success');

      // First two calls fail
      await expect(circuitBreaker.execute(mockFn)).rejects.toThrow('fail');
      await expect(circuitBreaker.execute(mockFn)).rejects.toThrow('fail');
      expect(circuitBreaker.getFailureCount()).toBe(2);

      // Third call succeeds
      await circuitBreaker.execute(mockFn);
      expect(circuitBreaker.getFailureCount()).toBe(0);
    });
  });

  describe('failure handling', () => {
    it('should increment failure count on error', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));

      await expect(circuitBreaker.execute(mockFn)).rejects.toThrow('fail');
      expect(circuitBreaker.getFailureCount()).toBe(1);

      await expect(circuitBreaker.execute(mockFn)).rejects.toThrow('fail');
      expect(circuitBreaker.getFailureCount()).toBe(2);
    });

    it('should transition to OPEN after threshold failures', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));

      // Fail 5 times (threshold)
      for (let i = 0; i < 5; i++) {
        await expect(circuitBreaker.execute(mockFn)).rejects.toThrow('fail');
      }

      expect(circuitBreaker.getState()).toBe(CircuitBreakerState.OPEN);
      expect(circuitBreaker.getFailureCount()).toBe(5);
    });

    it('should reject immediately when OPEN without calling function', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));

      // Fail 5 times to open circuit
      for (let i = 0; i < 5; i++) {
        await expect(circuitBreaker.execute(mockFn)).rejects.toThrow('fail');
      }

      expect(circuitBreaker.getState()).toBe(CircuitBreakerState.OPEN);
      mockFn.mockClear();

      // Next call should fail immediately without calling function
      await expect(circuitBreaker.execute(mockFn)).rejects.toThrow(
        'Circuit breaker is open - service unavailable'
      );
      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('HALF_OPEN state', () => {
    it('should transition to HALF_OPEN after timeout', async () => {
      // Use shorter timeout for testing
      const cb = new CircuitBreaker({
        threshold: 3,
        timeout: 100, // 100ms
      });

      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));

      // Fail 3 times to open circuit
      for (let i = 0; i < 3; i++) {
        await expect(cb.execute(mockFn)).rejects.toThrow('fail');
      }

      expect(cb.getState()).toBe(CircuitBreakerState.OPEN);

      // Wait for timeout
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Next call should transition to HALF_OPEN
      mockFn.mockResolvedValue('success');
      await cb.execute(mockFn);

      expect(cb.getState()).toBe(CircuitBreakerState.CLOSED);
    });

    it('should transition to CLOSED on success in HALF_OPEN', async () => {
      const cb = new CircuitBreaker({
        threshold: 3,
        timeout: 100,
      });

      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));

      // Open the circuit
      for (let i = 0; i < 3; i++) {
        await expect(cb.execute(mockFn)).rejects.toThrow('fail');
      }

      // Wait for timeout
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Success should close the circuit
      mockFn.mockResolvedValue('success');
      await cb.execute(mockFn);

      expect(cb.getState()).toBe(CircuitBreakerState.CLOSED);
      expect(cb.getFailureCount()).toBe(0);
    });

    it('should transition back to OPEN on failure in HALF_OPEN', async () => {
      const cb = new CircuitBreaker({
        threshold: 2,
        timeout: 100,
      });

      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));

      // Open the circuit
      for (let i = 0; i < 2; i++) {
        await expect(cb.execute(mockFn)).rejects.toThrow('fail');
      }

      expect(cb.getState()).toBe(CircuitBreakerState.OPEN);

      // Wait for timeout
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Failure in HALF_OPEN should reopen the circuit
      await expect(cb.execute(mockFn)).rejects.toThrow('fail');

      expect(cb.getState()).toBe(CircuitBreakerState.OPEN);
    });
  });

  describe('reset', () => {
    it('should reset to CLOSED state with zero failures', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));

      // Fail multiple times
      for (let i = 0; i < 5; i++) {
        await expect(circuitBreaker.execute(mockFn)).rejects.toThrow('fail');
      }

      expect(circuitBreaker.getState()).toBe(CircuitBreakerState.OPEN);
      expect(circuitBreaker.getFailureCount()).toBe(5);

      // Reset
      circuitBreaker.reset();

      expect(circuitBreaker.getState()).toBe(CircuitBreakerState.CLOSED);
      expect(circuitBreaker.getFailureCount()).toBe(0);
    });
  });

  describe('custom configuration', () => {
    it('should use custom threshold', async () => {
      const cb = new CircuitBreaker({ threshold: 3 });
      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));

      // Should open after 3 failures
      for (let i = 0; i < 3; i++) {
        await expect(cb.execute(mockFn)).rejects.toThrow('fail');
      }

      expect(cb.getState()).toBe(CircuitBreakerState.OPEN);
    });

    it('should use default values when not provided', () => {
      const cb = new CircuitBreaker();
      
      expect(cb.getState()).toBe(CircuitBreakerState.CLOSED);
      expect(cb.getFailureCount()).toBe(0);
    });
  });

  describe('state change logging', () => {
    it('should log state transitions', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));

      // Fail 5 times to trigger state change
      for (let i = 0; i < 5; i++) {
        await expect(circuitBreaker.execute(mockFn)).rejects.toThrow('fail');
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[CircuitBreaker] State transition'),
        expect.objectContaining({
          failureCount: 5,
          threshold: 5,
        })
      );

      consoleSpy.mockRestore();
    });
  });
});
