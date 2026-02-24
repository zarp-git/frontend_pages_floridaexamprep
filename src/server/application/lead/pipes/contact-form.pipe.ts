/**
 * Contact Form Pipe
 * ===================
 * Composes Validator + Transformer following Open/Closed Principle.
 * This pipe orchestrates validation and transformation as a single operation.
 */

import type { IPipe, IValidator, ITransformer, Result } from "@/server/application/shared/interfaces/pipe.interface"
import type { ContactFormInputDto, RequestMetadataDto } from "@/server/application/lead/dtos/contact-form.dto"
import type { ContactFormSchemaType } from "@/server/application/lead/pipes/contact-form.schema"
import type { CreateLeadData } from "@/types/lead.type"
import { contactFormValidator } from "@/server/application/lead/pipes/contact-form.validator"
import { contactFormTransformer, type TransformerInput } from "@/server/application/lead/pipes/contact-form.transformer"

/**
 * Pipe input - form data + request metadata
 */
export interface ContactFormPipeInput {
  formData: ContactFormInputDto
  metadata: RequestMetadataDto
}

/**
 * Contact Form Pipe
 * Composition of Validator + Transformer
 * Follows:
 * - SRP: Only orchestrates, doesn't validate or transform directly
 * - OCP: Can be extended by injecting different validator/transformer
 * - DIP: Depends on abstractions (interfaces), not concretions
 */
export class ContactFormPipe implements IPipe<ContactFormPipeInput, CreateLeadData> {
  constructor(
    private readonly validator: IValidator<ContactFormInputDto, ContactFormSchemaType> = contactFormValidator,
    private readonly transformer: ITransformer<TransformerInput, CreateLeadData> = contactFormTransformer
  ) {}

  execute(input: ContactFormPipeInput): Result<CreateLeadData> {
    const { formData, metadata } = input

    // Step 1: Validate
    const validationResult = this.validator.validate(formData)

    if (!validationResult.success) {
      return validationResult
    }

    // Step 2: Transform
    const transformed = this.transformer.transform({
      validated: validationResult.data,
      metadata,
    })

    return {
      success: true,
      data: transformed,
    }
  }
}

/**
 * Default pipe instance
 */
export const contactFormPipe = new ContactFormPipe()
