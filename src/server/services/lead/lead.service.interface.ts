/**
 * Lead Service Interface
 * ========================
 * Defines the business logic contract for lead operations.
 */

import type {
  CreateLeadData,
  CreateLeadResult,
  LeadRecord,
  LeadSubmissionRecord,
  LeadSubmissionData,
} from "@/types/lead.type"

export interface ILeadService {
  /**
   * Create a new lead from form data
   * Handles finding/creating lead and recording submission
   */
  createLead(data: CreateLeadData): Promise<CreateLeadResult>

  /**
   * Find an existing lead by email
   */
  findByEmail(email: string): Promise<LeadRecord | null>

  /**
   * Create a submission for an existing lead
   */
  createSubmission(submission: LeadSubmissionData): Promise<LeadSubmissionRecord>
}
