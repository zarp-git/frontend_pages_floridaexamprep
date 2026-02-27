// ---------------------------------------------------------------------------
// CTA Texts & URLs (SSOT)
// ---------------------------------------------------------------------------
export const CTA_TEXT = "Get that approval right away";

export const TIER_CTA_URL: Record<PricingTierSlug, string> = {
  // Business & Finance
  "primary-course": "/checkout?tier=primary-course",
  "primary-books": "/checkout?tier=primary-books",
  "premium-books": "/checkout?tier=premium-books",
  // CA/PM
  "capm-course": "/checkout?tier=capm-course",
  "capm-books": "/checkout?tier=capm-books",
  "capm-package": "/checkout?tier=capm-package",
  // Complete Exam Prep
  "complete-course": "/checkout?tier=complete-course",
  "complete-books": "/checkout?tier=complete-books",
  "complete-package": "/checkout?tier=complete-package",
};
/**
 * Pricing Constants — Single Source of Truth (SSOT)
 * ==================================================
 * All prices displayed across the site must reference these constants.
 * When prices change, update ONLY this file.
 */

// ---------------------------------------------------------------------------
// Pricing Tier Slugs
// ---------------------------------------------------------------------------
export type PricingTierSlug =
  | "primary-course"
  | "primary-books"
  | "premium-books"
  | "capm-course"
  | "capm-books"
  | "capm-package"
  | "complete-course"
  | "complete-books"
  | "complete-package";

// ---------------------------------------------------------------------------
// Course Page Slugs
// ---------------------------------------------------------------------------
export type CoursePageSlug =
  | "business-finance"
  | "contract-administration"
  | "complete-exam-prep";

// ---------------------------------------------------------------------------
// Per-tier pricing
// ---------------------------------------------------------------------------
export interface TierPricing {
  originalValue: number;
  currentPrice: number;
}

export const PRICING_TIERS: Record<PricingTierSlug, TierPricing> = {
  // Business & Finance
  "primary-course": {
    originalValue: 350,
    currentPrice: 299,
  },
  "primary-books": {
    originalValue: 700,
    currentPrice: 649,
  },
  "premium-books": {
    originalValue: 1150,
    currentPrice: 715,
  },
  // Contract Administration / Project Management (CA/PM)
  "capm-course": {
    originalValue: 699,
    currentPrice: 599,
  },
  "capm-books": {
    originalValue: 1099,
    currentPrice: 999,
  },
  "capm-package": {
    originalValue: 1799,
    currentPrice: 1599,
  },
  // Complete Exam Prep
  "complete-course": {
    originalValue: 899,
    currentPrice: 799,
  },
  "complete-books": {
    originalValue: 1499,
    currentPrice: 1299,
  },
  "complete-package": {
    originalValue: 2499,
    currentPrice: 2199,
  },
} as const;

// ---------------------------------------------------------------------------
// Tier display metadata
// ---------------------------------------------------------------------------
export interface TierDisplayInfo {
  slug: PricingTierSlug;
  label: string;
  badgeColor: string;
}

export const TIER_DISPLAY: TierDisplayInfo[] = [
  // Business & Finance
  { slug: "primary-course", label: "Primary Course", badgeColor: "bg-emerald-600" },
  { slug: "primary-books", label: "Primary + Books", badgeColor: "bg-violet-600" },
  { slug: "premium-books", label: "Premium + Books", badgeColor: "bg-blue-600" },
  // CA/PM
  { slug: "capm-course", label: "CA/PM Course", badgeColor: "bg-emerald-600" },
  { slug: "capm-books", label: "CA/PM Books Only", badgeColor: "bg-violet-600" },
  { slug: "capm-package", label: "CA/PM Package", badgeColor: "bg-blue-600" },
  // Complete Exam Prep
  { slug: "complete-course", label: "Course Bundle", badgeColor: "bg-emerald-600" },
  { slug: "complete-books", label: "Books Bundle", badgeColor: "bg-violet-600" },
  { slug: "complete-package", label: "Complete Package", badgeColor: "bg-blue-600" },
] as const;

// ---------------------------------------------------------------------------
// Default course-level pricing (shown on course cards / hero)
// Maps each course page to its "default" tier for display purposes
// ---------------------------------------------------------------------------
export const COURSE_DEFAULT_TIER: Record<CoursePageSlug, PricingTierSlug> = {
  "business-finance": "primary-course",
  "contract-administration": "capm-course",
  "complete-exam-prep": "complete-package",
} as const;

// ---------------------------------------------------------------------------
// Rating (shared across all tiers)
// ---------------------------------------------------------------------------
export const COURSE_RATING = {
  score: 4.9,
  platform: "Skool",
} as const;
