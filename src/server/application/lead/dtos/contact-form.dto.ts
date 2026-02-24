/**
 * Contact Form DTOs
 * ==================
 * Data Transfer Objects for contact form submissions.
 * Defines the contract between presentation and application layers.
 */

import type { LeadSubmissionType } from "@/types/lead.type"

/**
 * Input DTO - Raw data from the client form
 */
export interface ContactFormInputDto {
  fullName: string
  email: string
  phone?: string
  message?: string
  type?: LeadSubmissionType
}

/**
 * Output DTO - Transformed data ready for the service layer
 */
export interface ContactFormOutputDto {
  name: string
  email: string
  phoneNumber?: string
  type: LeadSubmissionType
  message?: string
  origin: string
}

/**
 * Request metadata from headers
 */
export interface RequestMetadataDto {
  ipAddress?: string
  route?: string
  userAgent?: string
}
