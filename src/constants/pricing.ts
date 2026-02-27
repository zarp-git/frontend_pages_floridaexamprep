/**
 * Pricing Constants — Single Source of Truth (SSOT)
 * ==================================================
 * All prices displayed across the site must reference these constants.
 * When prices change, update ONLY this file.
 */

// ---------------------------------------------------------------------------
// Pricing Tier Slugs
// ---------------------------------------------------------------------------
export type PricingTierSlug = "primary-course" | "primary-books" | "premium-books";

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
  { slug: "primary-course", label: "Primary Course", badgeColor: "bg-emerald-600" },
  { slug: "primary-books", label: "Primary + Books", badgeColor: "bg-violet-600" },
  { slug: "premium-books", label: "Premium + Books", badgeColor: "bg-blue-600" },
] as const;

// ---------------------------------------------------------------------------
// Default course-level pricing (shown on course cards / hero)
// Maps each course page to its "default" tier for display purposes
// ---------------------------------------------------------------------------
export const COURSE_DEFAULT_TIER: Record<CoursePageSlug, PricingTierSlug> = {
  "business-finance": "primary-course",
  "contract-administration": "primary-course",
  "complete-exam-prep": "premium-books",
} as const;

// ---------------------------------------------------------------------------
// Rating (shared across all tiers)
// ---------------------------------------------------------------------------
export const COURSE_RATING = {
  score: 4.9,
  platform: "Skool",
} as const;
