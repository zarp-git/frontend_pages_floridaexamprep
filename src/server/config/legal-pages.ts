import { LegalPageConfig } from "@/types/legal-metadata";

const LAST_UPDATED = "February 14, 2026";
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://allbrickpavers.com";
const COMMON_KEYWORDS = [
  "AllBrick Pavers",
  "paver installation",
  "Central Florida pavers",
];

const createMetadata = (
  title: string,
  description: string,
  keywords: string[],
  path: string,
) => ({
  title: `${title} | AllBrick Pavers`,
  description,
  keywords: [...COMMON_KEYWORDS, ...keywords],
  lastUpdated: LAST_UPDATED,
  canonical: `${BASE_URL}/${path}`,
});

export const legalPagesConfig: Record<string, LegalPageConfig> = {
  "terms-of-use": {
    title: "Terms of Use",
    description:
      "Terms and conditions governing the use of AllBrick Pavers website and services. Please read these terms carefully before using our site.",
    lastUpdated: LAST_UPDATED,
    icon: "FileText",
    metadata: createMetadata(
      "Terms of Use",
      "Terms and conditions governing the use of AllBrick Pavers website and services in Central Florida.",
      [
        "terms of use",
        "terms and conditions",
        "paver services",
        "website terms",
        "Central Florida",
      ],
      "terms-of-use",
    ),
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description:
      "This policy describes how AllBrick Pavers collects, uses, stores, and protects your personal information when you use our website and services.",
    lastUpdated: LAST_UPDATED,
    icon: "Shield",
    metadata: createMetadata(
      "Privacy Policy",
      "Privacy policy for AllBrick Pavers. Learn how we collect, use, and protect your personal data when you use our website and paver services.",
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
