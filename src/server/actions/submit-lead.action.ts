"use server"

/**
 * Submit Lead Server Action
 * ===========================
 * Server Action for submitting leads from public forms.
 * Validates input, captures request metadata, and sends to backend API.
 */

import { headers } from "next/headers"
import { leadApiService } from "@/server/services/lead/lead-api.service"
import type { SubmitPublicLeadDTO, PublicLeadApiResponse } from "@/types/lead.type"

export interface SubmitLeadInput {
  name: string
  email: string
  phone?: string
  message?: string
  source?: string
}

export async function submitLeadAction(
  input: SubmitLeadInput
): Promise<PublicLeadApiResponse> {
  try {
    // Capture request metadata
    const headersList = await headers()
    const userAgent = headersList.get("user-agent") || undefined
    const forwardedFor = headersList.get("x-forwarded-for")
    const ipAddress = forwardedFor?.split(",")[0].trim() || undefined

    // Validate required fields
    if (!input.name?.trim()) {
      return {
        success: false,
        error: "Name is required",
        status: 400,
      }
    }

    if (!input.email?.trim()) {
      return {
        success: false,
        error: "Email is required",
        status: 400,
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(input.email)) {
      return {
        success: false,
        error: "Invalid email format",
        status: 400,
      }
    }

    // Prepare DTO for API
    const dto: SubmitPublicLeadDTO = {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim(),
      message: input.message?.trim(),
      source: input.source || "landing-page",
      ipAddress,
      userAgent,
    }

    // Submit to backend API
    const result = await leadApiService.submitLead(dto)

    return result
  } catch (error) {
    console.error("[SUBMIT_LEAD_ACTION] Unexpected error:", error)

    return {
      success: false,
      error: "Failed to submit lead. Please try again.",
      status: 500,
    }
  }
}
