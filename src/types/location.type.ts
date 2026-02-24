// ---------------------------------------------------------------------------
// Location Detail Page Types
// ---------------------------------------------------------------------------

export interface LocationFaq {
  question: string;
  answer: string;
}

/** A content block representing one service highlight for the location. */
export interface LocationServiceBlock {
  /** Section heading, e.g. "Patio Spaces Planned for How You Live in Winter Haven" */
  heading: string;
  /** Descriptive paragraph */
  description: string;
  /** Image path */
  image: string;
  /** CTA link text, e.g. "Explore Services" */
  ctaLabel: string;
  /** CTA href, e.g. "/services/patio-pavers" */
  ctaHref: string;
}

/** About section describing the city itself. */
export interface LocationAbout {
  heading: string;
  description: string;
  image: string;
}

/** A group of nearby cities/areas served. */
export interface LocationServedArea {
  title: string;
  cities: string[];
}

export interface LocationData {
  /** URL slug used in routing, e.g. "winter-haven" */
  slug: string;

  /** Display title for the location, e.g. "Winter Haven" */
  title: string;

  /** Breadcrumb label */
  breadcrumbLabel: string;

  /** Hero headline */
  heroHeading: string;

  /** Hero subtitle above the heading */
  heroSubtitle: string;

  /** Hero background image path */
  heroImage: string;

  /** Alternating service content blocks */
  serviceBlocks: LocationServiceBlock[];

  /** About the city section */
  about: LocationAbout;

  /** FAQ items specific to this location */
  faqs: LocationFaq[];

  /** Regions / areas served from this location */
  servedAreas: LocationServedArea[];

  /** SEO metadata */
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}
