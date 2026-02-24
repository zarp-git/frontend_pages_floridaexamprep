/**
 * Lead API Service
 * =================
 * Service for submitting leads to the backend API endpoint.
 * Uses Axios to POST lead data to the public lead submission endpoint.
 */

import axios, { type AxiosInstance } from "axios"
import type { SubmitPublicLeadDTO, PublicLeadApiResponse } from "@/types/lead.type"

export interface ILeadApiService {
  submitLead(data: SubmitPublicLeadDTO): Promise<PublicLeadApiResponse>
}

export class LeadApiService implements ILeadApiService {
  private readonly client: AxiosInstance
  private readonly tenantKey: string

  constructor() {
    const apiUrl = process.env.ZARP_API_ENDPOINT_URL
    const tenantKey = process.env.NEXT_PUBLIC_TENANT_KEY

    if (!apiUrl) {
      throw new Error("ZARP_API_ENDPOINT_URL is not configured")
    }

    if (!tenantKey) {
      throw new Error("NEXT_PUBLIC_TENANT_KEY is not configured")
    }

    this.tenantKey = tenantKey
    this.client = axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async submitLead(data: SubmitPublicLeadDTO): Promise<PublicLeadApiResponse> {
    try {
      const response = await this.client.post<{ leadId: number }>(
        "/api/public/leads/submit",
        data,
        {
          headers: {
            "X-Tenant-Key": this.tenantKey,
          },
        }
      )

      return {
        success: true,
        data: response.data,
        status: response.status,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message

        console.error("[LEAD_API_SERVICE] Error submitting lead:", {
          status,
          message,
          data: error.response?.data,
        })

        return {
          success: false,
          error: message,
          status,
        }
      }

      console.error("[LEAD_API_SERVICE] Unexpected error:", error)

      return {
        success: false,
        error: "An unexpected error occurred",
        status: 500,
      }
    }
  }
}

// Default service instance
export const leadApiService = new LeadApiService()
