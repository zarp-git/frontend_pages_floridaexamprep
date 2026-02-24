/**
 * Contact Form Schema
 * ====================
 * Zod validation schema for contact form submissions.
 * Single Responsibility: Define validation rules only.
 */

import { z } from "zod"

/**
 * Submission type enum values matching Prisma schema
 */
const submissionTypes = ["CONTACT_FORM", "PHONE_INQUIRY", "FREE_CONSULTATION"] as const

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .transform((val) => val.trim()),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .transform((val) => val.toLowerCase().trim()),

  phone: z
    .string()
    .max(30, "Phone number is too long")
    .optional()
    .transform((val) => val?.trim() || undefined),

  message: z
    .string()
    .max(2000, "Message must be less than 2000 characters")
    .optional()
    .transform((val) => val?.trim() || undefined),

  type: z
    .enum(submissionTypes)
    .optional(),
})

/**
 * Inferred type from schema
 */
export type ContactFormSchemaType = z.infer<typeof contactFormSchema>
