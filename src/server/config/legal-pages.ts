import { LegalPageConfig } from "@/types/legal-metadata";

const LAST_UPDATED = "February 14, 2026";
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://floridaexamprep.com";
const COMMON_KEYWORDS = [
  "Florida Exam Prep",
  "exam preparation",
  "Florida exams",
];

const createMetadata = (
  title: string,
  description: string,
  keywords: string[],
  path: string,
) => ({
  title: `${title} | Florida Exam Prep`,
  description,
  keywords: [...COMMON_KEYWORDS, ...keywords],
  lastUpdated: LAST_UPDATED,
  canonical: `${BASE_URL}/${path}`,
});

export const legalPagesConfig: Record<string, LegalPageConfig> = {
  "terms-of-use": {
    title: "Terms of Use",
    description:
      "Terms and conditions governing the use of Florida Exam Prep website and services. Please read these terms carefully before using our site.",
    lastUpdated: LAST_UPDATED,
    icon: "FileText",
    metadata: createMetadata(
      "Terms of Use",
      "Terms and conditions governing the use of Florida Exam Prep website and services in Florida.",
      [
        "terms of use",
        "terms and conditions",
        "exam prep services",
        "website terms",
        "Florida",
      ],
      "terms-of-use",
    ),
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description:
      "This policy describes how Florida Exam Prep collects, uses, stores, and protects your personal information when you use our website and services.",
    lastUpdated: LAST_UPDATED,
    icon: "Shield",
    metadata: createMetadata(
      "Privacy Policy",
      "Privacy policy for Florida Exam Prep. Learn how we collect, use, and protect your personal data when you use our website and exam prep services.",
      [
        "privacy policy",
        "data protection",
        "personal data",
        "cookies",
        "Florida privacy",
        "FDBR",
        "privacy",
      ],
      "privacy-policy",
    ),
  },
};
