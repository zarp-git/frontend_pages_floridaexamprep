/**
 * Course slug type for GHL iframe integration
 * Represents the 3 pricing tiers available for checkout
 */
export type CourseSlug = 
  | "primary-course" 
  | "primary-books" 
  | "premium-books";

/**
 * Mapping interface for course slugs to iframe URLs
 */
export interface CourseIframeMapping {
  slug: CourseSlug;
  iframeUrl: string;
  displayName: string;
}
