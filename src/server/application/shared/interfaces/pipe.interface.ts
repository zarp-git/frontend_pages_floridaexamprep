/**
 * Application Layer Interfaces
 * ==============================
 * Base interfaces following Interface Segregation Principle.
 * Each interface has a single, focused responsibility.
 */

import type { z } from 'zod'

// ============================================
// RESULT TYPES
// ============================================

/**
 * Validation/Transformation error
 */
export interface PipeError {
  field: string
  message: string
  code?: string
}

/**
 * Result type for operations that can fail
 */
export type Result<T> =
  | { success: true; data: T }
  | { success: false; errors: PipeError[] }

// ============================================
// VALIDATOR INTERFACE (Single Responsibility)
// ============================================

/**
 * Validator Interface
 * Responsibility: Validate input data against rules
 * @template TInput - The input type to validate
 * @template TValidated - The validated/parsed output type
 */
export interface IValidator<TInput, TValidated = TInput> {
  validate(input: TInput): Result<TValidated>
}

// ============================================
// TRANSFORMER INTERFACE (Single Responsibility)
// ============================================

/**
 * Transformer Interface
 * Responsibility: Transform data from one format to another
 * @template TInput - The input type
 * @template TOutput - The output type
 */
export interface ITransformer<TInput, TOutput> {
  transform(input: TInput): TOutput
}

// ============================================
// PIPE INTERFACE (Composition of Validator + Transformer)
// ============================================

/**
 * Pipe Interface
 * Combines validation and transformation in a single operation
 * @template TInput - Raw input type
 * @template TOutput - Transformed output type
 */
export interface IPipe<TInput, TOutput> {
  execute(input: TInput): Result<TOutput>
}

// ============================================
// ZOD VALIDATOR (Specific implementation interface)
// ============================================

/**
 * Zod-based validator interface
 */
export interface IZodValidator<TSchema extends z.ZodType> extends IValidator<unknown, z.infer<TSchema>> {
  readonly schema: TSchema
}
