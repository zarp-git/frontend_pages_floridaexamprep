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
  | "premium-highlighted-books"
  | "capm-course"
  | "capm-books"
  | "capm-package"
  | "capm-highlighted-books"
  | "complete-course"
  | "complete-books"
  | "complete-package"
  | "complete-highlighted-books"
  | "trade-course"
  | "trade-books"
  | "trade-highlighted-books"
  | "complete-contractor-course"
  | "complete-contractor-books"
  | "complete-contractor-package"
  | "complete-contractor-highlighted-books"
  | "quizzes";

// ---------------------------------------------------------------------------
// Course Page Slugs
// ---------------------------------------------------------------------------
export type CoursePageSlug =
  | "business-finance"
  | "contract-administration"
  | "complete-exam-prep"
  | "general-contractor"
  | "building-contractor"
  | "residential-contractor";

// ---------------------------------------------------------------------------
// CTA Texts & URLs (SSOT)
// ---------------------------------------------------------------------------
export const TIER_CTA_URL: Record<PricingTierSlug, string> = {
  // Business & Finance
  "primary-course": "/checkout?tier=primary-course",
  "primary-books": "/checkout?tier=primary-books",
  "premium-books": "/checkout?tier=premium-books",
  "premium-highlighted-books": "/checkout?tier=premium-highlighted-books",
  // CA/PM
  "capm-course": "/checkout?tier=capm-course",
  "capm-books": "/checkout?tier=capm-books",
  "capm-package": "/checkout?tier=capm-package",
  "capm-highlighted-books": "/checkout?tier=capm-highlighted-books",
  // Complete Exam Prep
  "complete-course": "/checkout?tier=complete-course",
  "complete-books": "/checkout?tier=complete-books",
  "complete-package": "/checkout?tier=complete-package",
  "complete-highlighted-books": "/checkout?tier=complete-highlighted-books",
  // Trade Programs (General, Building, Residential)
  "trade-course": "/checkout?tier=trade-course",
  "trade-books": "/checkout?tier=trade-books",
  "trade-highlighted-books": "/checkout?tier=trade-highlighted-books",
  // Complete Contractor Package (for specific contractors)
  "complete-contractor-course": "/checkout?tier=complete-contractor-course",
  "complete-contractor-books": "/checkout?tier=complete-contractor-books",
  "complete-contractor-package": "/checkout?tier=complete-contractor-package",
  "complete-contractor-highlighted-books": "/checkout?tier=complete-contractor-highlighted-books",
  // Quizzes
  "quizzes": "/checkout?tier=quizzes",
} as const;

// ---------------------------------------------------------------------------
// GHL Checkout URLs - Maps tier slugs to external payment URLs
// ---------------------------------------------------------------------------
export const GHL_CHECKOUT_URLS: Record<PricingTierSlug, string> = {
  // Business & Finance
  "primary-course": "https://pay.floridaexamprep.com/buy/primary-course",
  "primary-books": "https://pay.floridaexamprep.com/buy/primary-books",
  "premium-books": "https://pay.floridaexamprep.com/buy/course-and-books",
  "premium-highlighted-books": "https://pay.floridaexamprep.com/buy/premium-highlighted-books",
  // CA/PM
  "capm-course": "https://pay.floridaexamprep.com/buy/capm-course",
  "capm-books": "https://pay.floridaexamprep.com/buy/capm-books",
  "capm-package": "https://pay.floridaexamprep.com/buy/capm-package",
  "capm-highlighted-books": "https://pay.floridaexamprep.com/buy/capm-highlighted-books",
  // Complete Exam Prep
  "complete-course": "https://pay.floridaexamprep.com/buy/complete-course",
  "complete-books": "https://pay.floridaexamprep.com/buy/complete-books",
  "complete-package": "https://pay.floridaexamprep.com/buy/complete-package",
  "complete-highlighted-books": "https://pay.floridaexamprep.com/buy/complete-highlighted-books",
  // Trade Programs (General, Building, Residential)
  "trade-course": "https://pay.floridaexamprep.com/buy/capm-course",
  "trade-books": "https://pay.floridaexamprep.com/buy/capm-package",
  "trade-highlighted-books": "https://pay.floridaexamprep.com/buy/capm-highlighted-books",
  // Complete Contractor Package (for specific contractors)
  "complete-contractor-course": "https://pay.floridaexamprep.com/buy/complete-course",
  "complete-contractor-books": "https://pay.floridaexamprep.com/buy/complete-books",
  "complete-contractor-package": "https://pay.floridaexamprep.com/buy/complete-package",
  "complete-contractor-highlighted-books": "https://pay.floridaexamprep.com/buy/complete-highlighted-books",
  // Quizzes
  "quizzes": "https://pay.floridaexamprep.com/buy/quizzes",
} as const;

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
    currentPrice: 349,
  },
  "primary-books": {
    originalValue: 700,
    currentPrice: 349,
  },
  "premium-books": {
    originalValue: 1150,
    currentPrice: 749,
  },
  "premium-highlighted-books": {
    originalValue: 1150,
    currentPrice: 849,
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
  "capm-highlighted-books": {
    originalValue: 2500,
    currentPrice: 1949,
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
  "complete-highlighted-books": {
    originalValue: 3000,
    currentPrice: 2699,
  },
  // Trade Programs (General, Building, Residential Contractors)
  "trade-course": {
    originalValue: 699,
    currentPrice: 599,
  },
  "trade-books": {
    originalValue: 1099,
    currentPrice: 999,
  },
  "trade-highlighted-books": {
    originalValue: 2500,
    currentPrice: 1949,
  },
  // Complete Contractor Package (Business & Finance + Trade for specific contractors)
  "complete-contractor-course": {
    originalValue: 899,
    currentPrice: 799,
  },
  "complete-contractor-books": {
    originalValue: 1499,
    currentPrice: 1299,
  },
  "complete-contractor-package": {
    originalValue: 2499,
    currentPrice: 2199,
  },
  "complete-contractor-highlighted-books": {
    originalValue: 3000,
    currentPrice: 2699,
  },
  // Quizzes
  "quizzes": {
    originalValue: 199,
    currentPrice: 149,
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
  { slug: "primary-course", label: "Course", badgeColor: "bg-emerald-600" },
  { slug: "premium-books", label: "Course + Books", badgeColor: "bg-blue-600" },
  { slug: "premium-highlighted-books", label: "Course + Pre-Highlighted Tabs + Books Included", badgeColor: "bg-orange-600" },
  // CA/PM
  { slug: "capm-course", label: "Course", badgeColor: "bg-emerald-600" },
  { slug: "capm-books", label: "Books", badgeColor: "bg-violet-600" },
  { slug: "capm-package", label: "Course + Books", badgeColor: "bg-blue-600" },
  { slug: "capm-highlighted-books", label: "Course + Pre Highlighted and Tabbed Books", badgeColor: "bg-orange-600" },
  // Complete Exam Prep
  { slug: "complete-course", label: "Course", badgeColor: "bg-emerald-600" },
  { slug: "complete-books", label: "Books", badgeColor: "bg-violet-600" },
  { slug: "complete-package", label: "Course + Tabs + Books Included", badgeColor: "bg-blue-600" },
  { slug: "complete-highlighted-books", label: "Course + Pre Highlighted and Tabbed Books", badgeColor: "bg-orange-600" },
  // Trade Programs
  { slug: "trade-course", label: "Course", badgeColor: "bg-emerald-600" },
  { slug: "trade-books", label: "Course + Books", badgeColor: "bg-blue-600" },
  { slug: "trade-highlighted-books", label: "Course + Pre Highlighted and Tabbed Books", badgeColor: "bg-orange-600" },
  // Complete Contractor Package
  { slug: "complete-contractor-course", label: "Course", badgeColor: "bg-emerald-600" },
  { slug: "complete-contractor-books", label: "Books", badgeColor: "bg-violet-600" },
  { slug: "complete-contractor-package", label: "Course + Books", badgeColor: "bg-blue-600" },
  { slug: "complete-contractor-highlighted-books", label: "Course + Pre Highlighted and Tabbed Books", badgeColor: "bg-orange-600" },
  // Quizzes
  { slug: "quizzes", label: "Quizzes", badgeColor: "bg-purple-600" },
] as const;

// ---------------------------------------------------------------------------
// Course to Tiers Mapping
// Maps each course to its available pricing tiers
// ---------------------------------------------------------------------------
export const COURSE_TIERS_MAP: Record<CoursePageSlug, PricingTierSlug[]> = {
  "business-finance": ["primary-course", "premium-books", "premium-highlighted-books"],
  "contract-administration": ["capm-course", "capm-package", "capm-highlighted-books"],
  "complete-exam-prep": ["complete-course", "complete-package", "complete-highlighted-books"],
  "general-contractor": ["trade-course", "trade-books", "trade-highlighted-books"],
  "building-contractor": ["trade-course", "trade-books", "trade-highlighted-books"],
  "residential-contractor": ["trade-course", "trade-books", "trade-highlighted-books"],
} as const;

// ---------------------------------------------------------------------------
// Default course-level pricing (shown on course cards / hero)
// Maps each course page to its "default" tier for display purposes
// ---------------------------------------------------------------------------
export const COURSE_DEFAULT_TIER: Record<CoursePageSlug, PricingTierSlug> = {
  "business-finance": "primary-course",
  "contract-administration": "capm-course",
  "complete-exam-prep": "complete-package",
  "general-contractor": "trade-course",
  "building-contractor": "trade-course",
  "residential-contractor": "trade-course",
} as const;

// ---------------------------------------------------------------------------
// Rating (shared across all tiers)
// ---------------------------------------------------------------------------
export const COURSE_RATING = {
  score: 4.9,
  platform: "Skool",
} as const;
