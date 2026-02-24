/**
 * Lead Repository Interface
 * ==========================
 * Defines the contract for lead data access operations.
 * This abstraction allows for dependency injection and testing.
 */

import type {
  LeadRecord,
  LeadSubmissionRecord,
  LeadSubmissionData,
} from "@/types/lead.type"

export interface ILeadRepository {
  /**
   * Find a lead by email address
   */
  findByEmail(email: string): Promise<LeadRecord | null>

  /**
   * Create a new lead
   */
  create(data: {
    name: string
    email: string
    phoneNumber?: string
    country?: string
  }): Promise<LeadRecord>

  /**
   * Create a submission linked to a lead
   */
  createSubmission(submission: LeadSubmissionData): Promise<LeadSubmissionRecord>
}
