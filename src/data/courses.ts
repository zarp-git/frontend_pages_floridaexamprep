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

export const courseData: Record<string, CourseData> = {
  "business-finance": {
    slug: "business-finance",
    title: "BUSINESS & FINANCE",
    subtitle: "You Pass Business & Finance Exam on the First Try",
    badge: {
      text: "Primary Course",
      color: "bg-emerald-600",
    },
    pricing: {
      originalValue: 350,
      currentPrice: 299,
    },
    rating: {
      score: 4.9,
      platform: "Skool",
    },
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
    title: "CONTRACT ADMINISTRATION",
    subtitle: "You Pass Contract Administration Exam on the First Try",
    badge: {
      text: "Primary Course",
      color: "bg-emerald-600",
    },
    pricing: {
      originalValue: 350,
      currentPrice: 299,
    },
    rating: {
      score: 4.9,
      platform: "Skool",
    },
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
    badge: {
      text: "Premium + Books",
      color: "bg-blue-600",
    },
    pricing: {
      originalValue: 1150,
      currentPrice: 715,
    },
    rating: {
      score: 4.9,
      platform: "Skool",
    },
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
