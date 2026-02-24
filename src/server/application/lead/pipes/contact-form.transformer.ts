/**
 * Contact Form Transformer
 * ==========================
 * Single Responsibility: Transform validated form data to CreateLeadData.
 * Handles data mapping and formatting.
 */

import type { ITransformer } from "@/server/application/shared/interfaces/pipe.interface"
import { phoneFormatter } from "@/server/application/shared/formatters/phone.formatter"
import type { ContactFormSchemaType } from "@/server/application/lead/pipes/contact-form.schema"
import type { RequestMetadataDto } from "@/server/application/lead/dtos/contact-form.dto"
import type { CreateLeadData, LeadSubmissionType } from "@/types/lead.type"

/**
 * Transformer input - validated form data + metadata
 */
export interface TransformerInput {
  validated: ContactFormSchemaType
  metadata: RequestMetadataDto
}

/**
 * Contact Form Transformer
 * Responsibility: Only transform data format
 */
export class ContactFormTransformer implements ITransformer<TransformerInput, CreateLeadData> {
  transform(input: TransformerInput): CreateLeadData {
    const { validated, metadata } = input

    const phoneNumber = validated.phone
      ? phoneFormatter.ensureCountryCode(validated.phone)
      : undefined

    const submissionType = this.determineSubmissionType(validated)
    const origin = this.determineOrigin(submissionType)

    return {
      name: validated.fullName,
      email: validated.email,
      phoneNumber,
      type: submissionType,
      message: validated.message,
      ipAddress: metadata.ipAddress,
      route: metadata.route,
      userAgent: metadata.userAgent,
      origin,
    }
  }

  private determineSubmissionType(data: ContactFormSchemaType): LeadSubmissionType {
    if (data.type) return data.type as LeadSubmissionType
    return "CONTACT_FORM"
  }

  private determineOrigin(type: LeadSubmissionType): string {
    const originMap: Record<LeadSubmissionType, string> = {
      CONTACT_FORM: "homepage-cta",
      PHONE_INQUIRY: "phone-inquiry",
      FREE_CONSULTATION: "free-consultation",
    }
    return originMap[type] || "unknown"
  }
}

/**
 * Default transformer instance
 */
export const contactFormTransformer = new ContactFormTransformer()
