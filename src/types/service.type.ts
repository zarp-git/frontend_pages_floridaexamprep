// ---------------------------------------------------------------------------
// Service Detail Page Types
// ---------------------------------------------------------------------------

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceFeature {
  title: string;
  subtitle: string;
  description: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceContentBlock {
  heading: string;
  paragraphs: string[];
}

export interface ServiceData {
  /** URL slug used in routing, e.g. "patio-pavers" */
  slug: string;

  /** Display title for the service */
  title: string;

  /** Breadcrumb label (short version) */
  breadcrumbLabel: string;

  /** Hero subtitle above the main title */
  heroSubtitle: string;

  /** Hero background image path */
  heroImage: string;

  /** Main content block with heading + paragraphs */
  content: ServiceContentBlock;

  /** Gallery images for the carousel */
  galleryImages: string[];

  /** FAQ items specific to this service */
  faqs: ServiceFaq[];

  /** Feature highlight cards */
  features: ServiceFeature[];

  /** Stats (e.g., 95% Affordable Cost) */
  stats: ServiceStat[];

  /** SEO metadata */
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}
