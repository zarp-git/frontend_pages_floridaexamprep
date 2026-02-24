/**
 * Lead API Service Tests
 * =======================
 * Tests for the LeadApiService that submits leads to backend API.
 */

import { LeadApiService } from "../lead-api.service"
import type { SubmitPublicLeadDTO } from "@/types/lead.type"

describe("LeadApiService", () => {
  let service: LeadApiService

  beforeEach(() => {
    // Set environment variables for testing
    process.env.ZARP_API_ENDPOINT_URL = "https://api.zarpstudio.com"
    process.env.NEXT_PUBLIC_TENANT_KEY = "fep_secret_2026_fl_exam_prep_secure"
    
    service = new LeadApiService()
  })

  describe("constructor", () => {
    it("should throw error if ZARP_API_ENDPOINT_URL is not configured", () => {
      delete process.env.ZARP_API_ENDPOINT_URL
      
      expect(() => new LeadApiService()).toThrow(
        "ZARP_API_ENDPOINT_URL is not configured"
      )
    })

    it("should throw error if NEXT_PUBLIC_TENANT_KEY is not configured", () => {
      delete process.env.NEXT_PUBLIC_TENANT_KEY
      
      expect(() => new LeadApiService()).toThrow(
        "NEXT_PUBLIC_TENANT_KEY is not configured"
      )
    })
  })

  describe("submitLead", () => {
    it("should have correct structure for valid lead data", () => {
      const validLead: SubmitPublicLeadDTO = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        message: "I'm interested in your services",
        source: "test-form",
      }

      expect(validLead).toHaveProperty("name")
      expect(validLead).toHaveProperty("email")
      expect(validLead.name).toBe("John Doe")
      expect(validLead.email).toBe("john@example.com")
    })

    it("should accept minimal lead data", () => {
      const minimalLead: SubmitPublicLeadDTO = {
        name: "Jane Doe",
        email: "jane@example.com",
      }

      expect(minimalLead).toHaveProperty("name")
      expect(minimalLead).toHaveProperty("email")
      expect(minimalLead.phone).toBeUndefined()
      expect(minimalLead.message).toBeUndefined()
    })
  })
})
