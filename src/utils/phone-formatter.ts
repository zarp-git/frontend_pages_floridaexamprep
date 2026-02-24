/**
 * Phone number formatting utilities
 */

/**
 * Formats a phone number to US format: (XXX) XXX-XXXX
 * @param value - Raw phone number string
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (value: string): string => {
  const phoneNumber = value.replace(/\D/g, "");
  
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
};
