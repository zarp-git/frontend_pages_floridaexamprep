/**
 * Lead Types
 * ===========
 * Type definitions for Lead domain entities.
 * These types are used across the server layer for type safety.
 */

/**
 * Submission type enum values
 */
export type LeadSubmissionType = "CONTACT_FORM" | "PHONE_INQUIRY" | "FREE_CONSULTATION"

/**
 * JSON input value type for Prisma
 */
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

/**
 * Data required to create a new lead with submission
 */
export interface CreateLeadData {
  // Lead info
  name: string
  email: string
  phoneNumber?: string
  country?: string
  // Submission info
  type: LeadSubmissionType
  message?: string
  // Tracking info
  ipAddress?: string
  route?: string
  userAgent?: string
  origin?: string
}

/**
 * Data for creating a submission linked to an existing lead
 */
export interface LeadSubmissionData {
  leadId: number
  type: LeadSubmissionType
  success: boolean
  data?: JsonValue
  metadata?: JsonValue
  ipAddress?: string
  route?: string
  userAgent?: string
  origin?: string
}

/**
 * Lead record returned from database
 */
export interface LeadRecord {
  id: number
  name: string
  email: string
  phoneNumber: string | null
  country: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Submission record returned from database
 */
export interface LeadSubmissionRecord {
  id: number
  leadId: number
  type: LeadSubmissionType
  success: boolean
  createdAt: Date
}

/**
 * Result of lead creation operation
 */
export type CreateLeadResult =
  | { success: true; leadId: number; submissionId: number }
  | { success: false; error: string }

/**
 * DTO for submitting lead to public API endpoint
 */
export interface SubmitPublicLeadDTO {
  name: string
  email: string
  phone?: string
  message?: string
  source?: string
  ipAddress?: string
  userAgent?: string
}

/**
 * Response from public lead API endpoint
 */
export type PublicLeadApiResponse =
  | {
      success: true
      data: { leadId: number }
      status: number
    }
  | {
      success: false
      error: string
      status: number
    }
