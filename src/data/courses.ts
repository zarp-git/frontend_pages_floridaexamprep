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

export const courseData: Record<string, CourseData> = {
  "business-finance": {
    slug: "business-finance",
    title: "BUSINESS & FINANCE",
    subtitle: "You Pass Business & Finance Exam on the First Try",
    badge: getDefaultBadge("business-finance"),
    pricing: getDefaultPricing("business-finance"),
    rating: COURSE_RATING,
    heroDescription:
      "I help future contractors pass their Florida State Exams first try so you never have to worry about it again!",
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
        text: "Complete Book Set For Business and Finance",
      },
      {
        included: false,
        text: "3 Hour Cram Course",
      },
      {
        included: false,
        text: "Book Tabs For All Business And Finance Books",
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
    heroDescription:
      "Master contract administration with our proven method and pass on your first attempt!",
    features: [
      {
        included: true,
        text: "Complete coverage of AIA contract documents",
      },
      {
        included: true,
        text: "Contract law essentials for Florida contractors",
      },
      {
        included: true,
        text: "Step-by-step guidance on contract administration",
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
        text: "Real-world contract scenarios",
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
        text: "Complete Book Set For Contract Administration",
      },
      {
        included: false,
        text: "3 Hour Cram Course",
      },
      {
        included: false,
        text: "Book Tabs For All Contract Administration Books",
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
    heroDescription:
      "Everything you need to pass all Florida contractor exams - complete preparation in one package!",
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
        included: true,
        text: "Complete Book Set For Business and Finance",
      },
      {
        included: true,
        text: "3 Hour Cram Course",
      },
      {
        included: true,
        text: "Book Tabs For All Business And Finance Books",
      },
    ],
  },
};
