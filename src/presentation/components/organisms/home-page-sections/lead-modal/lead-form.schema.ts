/**
 * Lead Form Schema (Client-side)
 * ================================
 * Zod validation schema for the lead collection form UI.
 */

import { z } from "zod"

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),

  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .max(500, "Message is too long")
    .optional()
    .or(z.literal("")),
})

export type LeadFormData = z.infer<typeof leadFormSchema>
