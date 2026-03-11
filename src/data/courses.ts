import {
  PRICING_TIERS,
  COURSE_DEFAULT_TIER,
  COURSE_RATING,
  TIER_DISPLAY,
  type CoursePageSlug,
} from "@/constants/pricing";

export interface CourseFeature {
  included: boolean;
  text: string;
}

export interface PricingSection {
  title: string;
  subtitle?: string;
  tiers: string[];
  features: CourseFeature[];
}

export interface CourseData {
  slug: string;
  title: string;
  subtitle: string;
  badge: {
    text: string;
    color: string;
  };
  pricing: {
    originalValue: number;
    currentPrice: number;
  };
  rating: {
    score: number;
    platform: string;
  };
  features: CourseFeature[];
  videoThumbnail?: string;
  heroDescription: string;
  pricingSections?: PricingSection[];
}

function getDefaultPricing(slug: CoursePageSlug) {
  const tierSlug = COURSE_DEFAULT_TIER[slug];
  return PRICING_TIERS[tierSlug];
}

function getDefaultBadge(slug: CoursePageSlug) {
  const tierSlug = COURSE_DEFAULT_TIER[slug];
  const tier = TIER_DISPLAY.find((t) => t.slug === tierSlug)!;
  return { text: tier.label, color: tier.badgeColor };
}

const TRADE_FEATURES: CourseFeature[] = [
  {
    included: true,
    text: "Full breakdown of all 14 books allowed in the exams",
  },
  {
    included: true,
    text: "Highlighting Guide of all 14 books allowed in the exams",
  },
  {
    included: true,
    text: "Tab Guide of all 14 books allowed in the exams",
  },
  {
    included: true,
    text: "Important Info of books not allowed in the exams",
  },
  {
    included: true,
    text: "Full Course On Plan Reading",
  },
  {
    included: true,
    text: "Math you need to know, explained simply",
  },
  {
    included: true,
    text: "Guidance on how to navigate the books during the exam",
  },
  {
    included: true,
    text: "A clear study plan",
  },
  {
    included: true,
    text: "24/7 Access for 12 Months",
  },
  {
    included: true,
    text: "14+ practice quizzes and a timed exam simulators",
  },
  {
    included: true,
    text: "Multilingual access – English, Spanish, and Portuguese",
  },
  {
    included: false,
    text: "Complete Book Set of Trade books allowed into the exam Brand New",
  },
  {
    included: true,
    text: "Book Tabs For All Books",
  },
  {
    included: false,
    text: "Pre Highlighted and Tabbed Books",
  },
];

const COMPLETE_CONTRACTOR_FEATURES: CourseFeature[] = [
  {
    included: true,
    text: "Full Course for the Business and Finance Exam",
  },
  {
    included: true,
    text: "Full Course for the Trade Exams",
  },
  {
    included: true,
    text: "Full Course on Plan Reading",
  },
  {
    included: true,
    text: "Clear study plan for all exams",
  },
  {
    included: true,
    text: "34+ practice quizzes and timed exam simulators",
  },
  {
    included: true,
    text: "Math you need to know, explained simply",
  },
  {
    included: true,
    text: "Guidance on how to navigate books during the exam",
  },
  {
    included: true,
    text: "Multilingual access – English, Spanish, and Portuguese",
  },
  {
    included: true,
    text: "24/7 Access for 12 Months",
  },
  {
    included: false,
    text: "3 Hour Cram Course for Business And Finance Exam",
  },
  {
    included: false,
    text: "Complete Book Set of Trade books allowed into the exam Brand New",
  },
  {
    included: false,
    text: "Complete Book Set for Business and Finance Exam Brand New",
  },
  {
    included: false,
    text: "Book Tabs for All Exams",
  },
  {
    included: false,
    text: "Pre Highlighted and Tabbed Books",
  },
];

export const courseData: Record<string, CourseData> = {
  "business-finance": {
    slug: "business-finance",
    title: "BUSINESS & FINANCE",
    subtitle: "You Pass Business & Finance Exam on the First Try",
    badge: getDefaultBadge("business-finance"),
    pricing: getDefaultPricing("business-finance"),
    rating: COURSE_RATING,
    heroDescription: "",
    features: [
      {
        included: true,
        text: "Full breakdown of every chapter in the Florida Contractor's Manual",
      },
      {
        included: true,
        text: "The most important content in the Builder's Guide to Accounting",
      },
      {
        included: true,
        text: "Step-by-step guidance on the AIA documents",
      },
      {
        included: true,
        text: "A clear study plan",
      },
      {
        included: true,
        text: "20+ practice quizzes and a timed exam simulator",
      },
      {
        included: true,
        text: "Math you need to know, explained simply",
      },
      {
        included: true,
        text: "Guidance on how to navigate the books during the exam",
      },
      {
        included: true,
        text: "Multilingual access – English, Spanish and Portuguese",
      },
      {
        included: true,
        text: "24/7 Access for 12 Months",
      },
      {
        included: false,
        text: "Complete Book Set For Business and Finance Exam Brand New",
      },
      {
        included: false,
        text: "Book Tabs For All Books",
      },
      {
        included: false,
        text: "3 Hour Cram Course",
      },
      {
        included: false,
        text: "Pre Highlighted and Tabbed Books",
      },
    ],
  },
  "contract-administration": {
    slug: "contract-administration",
    title: "CONTRACT ADMINISTRATION & PROJECT MANAGEMENT",
    subtitle:
      "You Pass Contract Administration & Project Management Exam on the First Try",
    badge: getDefaultBadge("contract-administration"),
    pricing: getDefaultPricing("contract-administration"),
    rating: COURSE_RATING,
    heroDescription: "",
    features: [
      {
        included: true,
        text: "Full Breakdown of 14 Books Allowed into the Exam for Contract Administration and Project Management",
      },
      {
        included: true,
        text: "Highlighting Guide of all 14 books allowed in the exams Contract Administration and Project Management",
      },
      {
        included: true,
        text: "Tab Guide of all 14 books allowed in the exams",
      },
      {
        included: true,
        text: "Important info of books not allowed in the exams",
      },
      {
        included: true,
        text: "Full Course On Plan Reading",
      },
      {
        included: true,
        text: "Math you need to know, explained simply",
      },
      {
        included: true,
        text: "Guidance on how to navigate the books during the exam",
      },
      {
        included: true,
        text: "A clear study plan",
      },
      {
        included: true,
        text: "14+ practice quizzes and a timed exam simulators",
      },
      {
        included: true,
        text: "Multilingual access – English, Spanish, and Portuguese",
      },
      {
        included: true,
        text: "24/7 Access for 12 Months",
      },
      {
        included: false,
        text: "Complete Book Set of Trade books allowed into the exam Brand New",
      },
      {
        included: false,
        text: "Book Tabs For All Books",
      },
      {
        included: false,
        text: "Pre Highlighted and Tabbed Books",
      },
    ],
  },
  "complete-exam-prep": {
    slug: "complete-exam-prep",
    title: "COMPLETE EXAM PREP",
    subtitle: "You Pass All Florida Contractor Exams on the First Try",
    badge: getDefaultBadge("complete-exam-prep"),
    pricing: getDefaultPricing("complete-exam-prep"),
    rating: COURSE_RATING,
    heroDescription: "",
    features: [
      {
        included: true,
        text: "Full Course for the Business and Finance Exam",
      },
      {
        included: true,
        text: "Full Course for the Trade Exams Contract Administration, and Project Management",
      },
      {
        included: true,
        text: "Full Course on Plan Reading",
      },
      {
        included: true,
        text: "Clear study plan for all exams",
      },
      {
        included: true,
        text: "34+ practice quizzes and timed exam simulators",
      },
      {
        included: true,
        text: "Math you need to know, explained simply",
      },
      {
        included: true,
        text: "Guidance on how to navigate books during the exam",
      },
      {
        included: true,
        text: "Multilingual access – English, Spanish, and Portuguese",
      },
      {
        included: true,
        text: "24/7 Access for 12 Months",
      },
      {
        included: true,
        text: "3 Hour Cram Course for Business And Finance Exam",
      },
      {
        included: false,
        text: "Complete Book Set of Trade books allowed into the exam Brand New",
      },
      {
        included: false,
        text: "Complete Book Set for Business and Finance Exam Brand New",
      },
      {
        included: false,
        text: "Book Tabs for All Exams",
      },
      {
        included: false,
        text: "Pre Highlighted and Tabbed Books",
      },
    ],
  },
  "general-contractor": {
    slug: "general-contractor",
    title: "GENERAL CONTRACTOR",
    subtitle: "You Pass General Contractor Exam on the First Try",
    badge: getDefaultBadge("general-contractor"),
    pricing: getDefaultPricing("general-contractor"),
    rating: COURSE_RATING,
    heroDescription: "",
    features: TRADE_FEATURES,
    pricingSections: [
      {
        title: "Trade Option for General Contractors",
        tiers: ["trade-course", "trade-books", "trade-highlighted-books"],
        features: TRADE_FEATURES,
      },
      {
        title: "Complete Exam Prep Package for General Contractors",
        tiers: ["complete-contractor-course", "complete-contractor-package", "complete-contractor-highlighted-books"],
        features: COMPLETE_CONTRACTOR_FEATURES,
      },
    ],
  },
  "building-contractor": {
    slug: "building-contractor",
    title: "BUILDING CONTRACTOR",
    subtitle: "You Pass Building Contractor Exam on the First Try",
    badge: getDefaultBadge("building-contractor"),
    pricing: getDefaultPricing("building-contractor"),
    rating: COURSE_RATING,
    heroDescription: "",
    features: TRADE_FEATURES,
    pricingSections: [
      {
        title: "Trade Option for Building Contractors",
        tiers: ["trade-course", "trade-books", "trade-highlighted-books"],
        features: TRADE_FEATURES,
      },
      {
        title: "Complete Exam Prep Package for Building Contractors",
        tiers: ["complete-contractor-course", "complete-contractor-package", "complete-contractor-highlighted-books"],
        features: COMPLETE_CONTRACTOR_FEATURES,
      },
    ],
  },
  "residential-contractor": {
    slug: "residential-contractor",
    title: "RESIDENTIAL CONTRACTOR",
    subtitle: "You Pass Residential Contractor Exam on the First Try",
    badge: getDefaultBadge("residential-contractor"),
    pricing: getDefaultPricing("residential-contractor"),
    rating: COURSE_RATING,
    heroDescription: "",
    features: TRADE_FEATURES,
    pricingSections: [
      {
        title: "Trade Option for Residential Contractors",
        tiers: ["trade-course", "trade-books", "trade-highlighted-books"],
        features: TRADE_FEATURES,
      },
      {
        title: "Complete Exam Prep Package for Residential Contractors",
        tiers: ["complete-contractor-course", "complete-contractor-package", "complete-contractor-highlighted-books"],
        features: COMPLETE_CONTRACTOR_FEATURES,
      },
    ],
  },
};
