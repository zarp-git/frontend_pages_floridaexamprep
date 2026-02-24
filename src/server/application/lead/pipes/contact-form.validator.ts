/**
 * Contact Form Validator
 * ========================
 * Single Responsibility: Validate contact form input data.
 * Uses Zod schema for validation.
 */

import type { IValidator, Result, PipeError } from "@/server/application/shared/interfaces/pipe.interface"
import { contactFormSchema, type ContactFormSchemaType } from "@/server/application/lead/pipes/contact-form.schema"
import type { ContactFormInputDto } from "@/server/application/lead/dtos/contact-form.dto"
import { ZodError } from "zod"

/**
 * Contact Form Validator
 * Responsibility: Only validate input data
 */
export class ContactFormValidator implements IValidator<ContactFormInputDto, ContactFormSchemaType> {
  constructor(private readonly schema = contactFormSchema) {}

  validate(input: ContactFormInputDto): Result<ContactFormSchemaType> {
    const result = this.schema.safeParse(input)

    if (!result.success) {
      return {
        success: false,
        errors: this.mapErrors(result.error),
      }
    }

    return {
      success: true,
      data: result.data,
    }
  }

  private mapErrors(error: ZodError<unknown>): PipeError[] {
    return error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
      code: err.code,
    }))
  }
}

/**
 * Default validator instance
 */
export const contactFormValidator = new ContactFormValidator()
