/**
 * Phone Formatter
 * =================
 * Utility for formatting and normalizing phone numbers.
 */

export interface PhoneFormatterOptions {
  defaultCountryCode?: string
  stripFormatting?: boolean
}

export class PhoneFormatter {
  private readonly defaultCountryCode: string
  private readonly stripFormatting: boolean

  constructor(options: PhoneFormatterOptions = {}) {
    this.defaultCountryCode = options.defaultCountryCode || '+1'
    this.stripFormatting = options.stripFormatting ?? true
  }

  /**
   * Normalize phone number by removing formatting characters
   */
  normalize(phone: string): string {
    if (!phone) return ''
    
    // Remove all non-digit characters except leading +
    const normalized = phone.replace(/[^\d+]/g, '')
    
    // Ensure only one + at the start
    if (normalized.startsWith('+')) {
      return '+' + normalized.slice(1).replace(/\+/g, '')
    }
    
    return normalized
  }

  /**
   * Format phone number for display
   */
  format(phone: string): string {
    const normalized = this.normalize(phone)
    
    if (!normalized) return ''
    
    // US format: +1 (XXX) XXX-XXXX
    if (normalized.startsWith('+1') && normalized.length === 12) {
      const area = normalized.slice(2, 5)
      const first = normalized.slice(5, 8)
      const last = normalized.slice(8)
      return `+1 (${area}) ${first}-${last}`
    }
    
    // Return as-is for other formats
    return normalized
  }

  /**
   * Validate phone number format
   */
  isValid(phone: string): boolean {
    const normalized = this.normalize(phone)
    
    // Minimum 10 digits (US format without country code)
    // Maximum 15 digits (ITU-T E.164)
    const digitsOnly = normalized.replace(/\D/g, '')
    return digitsOnly.length >= 10 && digitsOnly.length <= 15
  }

  /**
   * Add country code if missing
   */
  ensureCountryCode(phone: string): string {
    const normalized = this.normalize(phone)
    
    if (!normalized) return ''
    
    if (normalized.startsWith('+')) {
      return normalized
    }
    
    return this.defaultCountryCode + normalized
  }
}

// Default instance with US defaults
export const phoneFormatter = new PhoneFormatter({ defaultCountryCode: '+1' })
