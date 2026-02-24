import type { LocationData, LocationServiceBlock } from "@/types/location.type";

// ---------------------------------------------------------------------------
// Shared — reused across all locations
// ---------------------------------------------------------------------------

const SHARED_SERVICE_BLOCKS: LocationServiceBlock[] = [
  {
    heading: "Outdoor Living",
    description:
      "Outdoor living projects give homeowners a clearer, more usable backyard layout that supports how they relax, gather, and spend time outside. With planning that accounts for Central Florida's heat, rain, and daily use, your space stays organized and comfortable. Whether the focus is a patio, pool deck, walkway, or a combination of features, outdoor living improvements help your yard perform well and feel ready for everyday use.",
    image: "/images/sections-images/patio-pavers-1-after-1.webp",
    ctaLabel: "Explore Services",
    ctaHref: "/services/pavers-installation",
  },
  {
    heading: "Patio Spaces Planned for How You Live",
    description:
      "A patio gives you a defined place to relax, dine, or spend time outside without dealing with uneven surfaces or worn materials. With proper grading and a layout built for daily use, your patio becomes a steady part of your outdoor routine. Homeowners often choose a patio to improve comfort, support gatherings, and make their backyard easier to enjoy year-round.",
    image: "/images/sections-images/patio-pavers-2-after-1.webp",
    ctaLabel: "Explore Services",
    ctaHref: "/services/patio-pavers",
  },
  {
    heading: "Paver Driveways That Improve Your Home's Arrival",
    description:
      "A paver driveway provides a clean, dependable entrance that handles heat, rain, and frequent use. With the right base preparation and layout, your driveway stays level and consistent, giving your home a neater, more organized arrival point. Many homeowners choose a paver driveway when they want a surface that performs well and complements the overall look of their property.",
    image: "/images/sections-images/driveway-pavers-2-after.webp",
    ctaLabel: "Explore Services",
    ctaHref: "/services/driveway-pavers",
  },
  {
    heading: "Pool Deck Upgrades Built for Daily Comfort",
    description:
      "A pool deck should feel comfortable underfoot and ready for daily use. When the surface is worn or uneven, it takes away from the experience. With materials chosen for the climate and installation steps suited for heat and moisture, your pool deck stays cleaner, more consistent, and easier to enjoy. Many homeowners upgrade their pool deck to improve comfort, organization, and safety around the water.",
    image: "/images/sections-images/pool-deck-after.jpg",
    ctaLabel: "Explore Services",
    ctaHref: "/services/pool-deck-pavers",
  },
  {
    heading: "Firepit Areas Designed for Gathering",
    description:
      "A fire pit area creates the perfect gathering spot for family and friends. Using heat-rated materials that withstand high temperatures while maintaining beauty and structural integrity, we design fire pit installations that become the centerpiece of your outdoor living space, perfect for cool Florida evenings and year-round entertaining.",
    image: "/images/sections-images/firepit-pavers-1-after-1.webp",
    ctaLabel: "Explore Services",
    ctaHref: "/services/firepit-pavers",
  },
];

/** Helper to personalize shared blocks with the city name. */
function personalizeBlocks(
  cityName: string,
  blocks: LocationServiceBlock[] = SHARED_SERVICE_BLOCKS
): LocationServiceBlock[] {
  return blocks.map((block) => ({
    ...block,
    heading: `${block.heading} in ${cityName}`,
  }));
}

// ---------------------------------------------------------------------------
// Individual location content — SSOT
// ---------------------------------------------------------------------------

export const LOCATIONS_DATA: LocationData[] = [
  {
    slug: "winter-haven",
    title: "Winter Haven",
    breadcrumbLabel: "Winter Haven",
    heroHeading:
      "Paver Installation and Outdoor Living Services in Winter Haven, FL",
    heroSubtitle: "Central Florida's Trusted Paver Experts",
    heroImage: "/images/sections-images/patio-pavers-1-after-3.webp",
    serviceBlocks: personalizeBlocks("Winter Haven"),
    about: {
      heading: "About Winter Haven, FL",
      description:
        "Winter Haven, FL is known for its chain of lakes, family-friendly atmosphere, and growing communities. With a subtropical climate and year-round sunshine, outdoor living spaces are essential for homeowners looking to make the most of their property. From classic lakeside homes to newer developments, Winter Haven homeowners rely on quality paver installation to create beautiful, functional outdoor areas.",
      image: "/images/sections-images/local-expertise-section.webp",
    },
    faqs: [
      {
        question:
          "How long does a typical outdoor hardscape project take in Winter Haven?",
        answer:
          "Project timelines depend on the scope of work, materials, and permitting requirements. Smaller upgrades move quickly, while patios, pool decks, and driveways may take 3-10 days. You receive a detailed estimate and timeline upfront.",
      },
      {
        question:
          "Which materials work best for patios and pool decks in Winter Haven?",
        answer:
          "Winter Haven has heat, humidity, and frequent rain, so choosing materials suited for the climate is important. Brick, natural stone, and concrete pavers all perform well when installed with the right base and drainage considerations.",
      },
      {
        question:
          "Do outdoor spaces in Winter Haven require regular maintenance?",
        answer:
          "Yes. The sun, moisture, and sandy conditions naturally affect paver surfaces over time. Routine maintenance — such as paver cleaning, joint re-sanding, and sealing — helps protect against fading, weeds, and shifting. Most homeowners schedule care every 1-2 years.",
      },
    ],
    servedAreas: [
      {
        title: "Polk County Cities We Serve",
        cities: [
          "Winter Haven",
          "Lakeland",
          "Haines City",
          "Davenport",
          "Auburndale",
          "Bartow",
          "Eagle Lake",
          "Dundee",
          "Lake Wales",
          "Cypress Gardens",
        ],
      },
      {
        title: "Surrounding Areas",
        cities: [
          "Kissimmee",
          "Celebration",
          "Poinciana",
          "Clermont",
          "Four Corners",
          "Horizon West",
        ],
      },
    ],
    seo: {
      metaTitle:
        "Paver Installation & Outdoor Living in Winter Haven, FL | AllBrick Pavers",
      metaDescription:
        "Expert paver installation and outdoor living services in Winter Haven, FL. Patios, driveways, pool decks, and fire pits with 3-year workmanship warranty. Free consultation.",
    },
  },
  {
    slug: "lakeland",
    title: "Lakeland",
    breadcrumbLabel: "Lakeland",
    heroHeading:
      "Paver Installation and Outdoor Living Services in Lakeland, FL",
    heroSubtitle: "Central Florida's Trusted Paver Experts",
    heroImage: "/images/sections-images/patio-pavers-2-after-2.webp",
    serviceBlocks: personalizeBlocks("Lakeland"),
    about: {
      heading: "About Lakeland, FL",
      description:
        "Lakeland, FL sits between Tampa and Orlando, offering a blend of urban amenities and small-town charm. Known for its beautiful lakes, historic downtown, and vibrant arts scene, Lakeland homeowners take pride in their outdoor spaces. The warm climate makes it ideal for year-round outdoor living, and expertly installed pavers help create patios, driveways, and pool decks that enhance both comfort and property value.",
      image: "/images/sections-images/local-expertise-section.webp",
    },
    faqs: [
      {
        question:
          "How long does a typical outdoor hardscape project take in Lakeland?",
        answer:
          "Project timelines vary based on scope, materials, and permitting. Standard patios and driveways typically take 3-7 days. Larger or more complex outdoor living projects may take up to two weeks. We provide a clear timeline during your consultation.",
      },
      {
        question:
          "Which paver materials work best for Lakeland's climate?",
        answer:
          "Lakeland's heat, humidity, and frequent rain require durable, weather-resistant materials. We recommend brick, travertine, and concrete pavers installed on a properly prepared base with adequate drainage. Our team helps you choose the best option for your specific project.",
      },
      {
        question:
          "Do outdoor paver spaces require regular maintenance in Lakeland?",
        answer:
          "Yes. Central Florida's sun, moisture, and sandy soil naturally affect paver surfaces. Regular cleaning, re-sanding, and sealing every 1-2 years keeps your pavers protected, prevents weed growth, and maintains their appearance.",
      },
    ],
    servedAreas: [
      {
        title: "Polk County Cities We Serve",
        cities: [
          "Lakeland",
          "Winter Haven",
          "Bartow",
          "Auburndale",
          "Plant City",
          "Mulberry",
          "Highland City",
          "Kathleen",
          "Medulla",
        ],
      },
      {
        title: "Surrounding Areas",
        cities: [
          "Brandon",
          "Riverview",
          "Valrico",
          "Zephyrhills",
          "Dade City",
        ],
      },
    ],
    seo: {
      metaTitle:
        "Paver Installation & Outdoor Living in Lakeland, FL | AllBrick Pavers",
      metaDescription:
        "Expert paver installation and outdoor living services in Lakeland, FL. Patios, driveways, pool decks, and fire pits. 3-year workmanship warranty. Get a free consultation.",
    },
  },
  {
    slug: "haines-city",
    title: "Haines City",
    breadcrumbLabel: "Haines City",
    heroHeading:
      "Paver Installation and Outdoor Living Services in Haines City, FL",
    heroSubtitle: "Central Florida's Trusted Paver Experts",
    heroImage: "/images/sections-images/patio-pavers-3-after-1.webp",
    serviceBlocks: personalizeBlocks("Haines City"),
    about: {
      heading: "About Haines City, FL",
      description:
        "Haines City, FL is a growing community in Polk County known for its proximity to top Florida attractions and its welcoming neighborhoods. With sunny weather year-round and expanding residential areas, homeowners in Haines City are investing in outdoor improvements that increase comfort and property value. Professional paver installation transforms backyards, driveways, and pool areas into functional, stylish outdoor spaces.",
      image: "/images/sections-images/local-expertise-section.webp",
    },
    faqs: [
      {
        question:
          "How long does a paver installation project take in Haines City?",
        answer:
          "Timelines depend on the scope of work. A standard patio or driveway typically takes 3-5 days. Larger outdoor living projects with multiple features may take 1-2 weeks. We provide a clear timeline during consultation.",
      },
      {
        question:
          "What type of pavers work best in Haines City's climate?",
        answer:
          "Haines City's heat and humidity require materials that handle temperature fluctuations and moisture. We recommend concrete pavers, brick, and natural stone, all installed with proper base preparation and drainage.",
      },
      {
        question:
          "Is regular maintenance needed for pavers in Haines City?",
        answer:
          "Yes. Florida's sun, rain, and sandy soil affect paver surfaces over time. Routine cleaning, joint re-sanding, and sealing every 1-2 years keeps your pavers looking and performing their best.",
      },
    ],
    servedAreas: [
      {
        title: "Polk County Cities We Serve",
        cities: [
          "Haines City",
          "Davenport",
          "Winter Haven",
          "Dundee",
          "Lake Hamilton",
          "Eagle Lake",
          "Auburndale",
        ],
      },
      {
        title: "Surrounding Areas",
        cities: [
          "Champions Gate",
          "Four Corners",
          "Kissimmee",
          "Celebration",
          "Poinciana",
        ],
      },
    ],
    seo: {
      metaTitle:
        "Paver Installation & Outdoor Living in Haines City, FL | AllBrick Pavers",
      metaDescription:
        "Expert paver installation and outdoor living services in Haines City, FL. Patios, driveways, pool decks, and fire pits. 3-year workmanship warranty. Free consultation.",
    },
  },
  {
    slug: "davenport",
    title: "Davenport",
    breadcrumbLabel: "Davenport",
    heroHeading:
      "Paver Installation and Outdoor Living Services in Davenport, FL",
    heroSubtitle: "Central Florida's Trusted Paver Experts",
    heroImage: "/images/sections-images/patio-pavers-4.webp",
    serviceBlocks: personalizeBlocks("Davenport"),
    about: {
      heading: "About Davenport, FL",
      description:
        "Davenport, FL is one of the fastest-growing communities in Central Florida, strategically located between Tampa and Orlando. With modern subdivisions, vacation rental properties, and a family-oriented atmosphere, Davenport homeowners value outdoor living spaces that combine style with functionality. Properly installed pavers create beautiful patios, driveways, and pool decks that withstand daily use and Florida's demanding weather.",
      image: "/images/sections-images/local-expertise-section.webp",
    },
    faqs: [
      {
        question:
          "How long does a typical paver project take in Davenport?",
        answer:
          "Project timelines vary by scope and materials. Standard patios and driveways take 3-7 days. Larger projects with multiple features may take up to two weeks. We provide a detailed timeline during your initial consultation.",
      },
      {
        question:
          "Which materials are best for outdoor spaces in Davenport?",
        answer:
          "Davenport's climate calls for heat-resistant, durable materials. Concrete pavers, brick, and travertine all perform well when installed on a properly engineered base with adequate drainage.",
      },
      {
        question:
          "Do I need regular maintenance for pavers in Davenport?",
        answer:
          "Yes. Regular cleaning, re-sanding, and sealing every 1-2 years protects your investment against fading, weed growth, and sand loss caused by Florida's sun, rain, and humidity.",
      },
    ],
    servedAreas: [
      {
        title: "Polk County Cities We Serve",
        cities: [
          "Davenport",
          "Haines City",
          "Winter Haven",
          "Lakeland",
          "Champions Gate",
          "Four Corners",
        ],
      },
      {
        title: "Osceola County Areas",
        cities: [
          "Kissimmee",
          "Celebration",
          "Poinciana",
          "St. Cloud",
          "Reunion",
        ],
      },
    ],
    seo: {
      metaTitle:
        "Paver Installation & Outdoor Living in Davenport, FL | AllBrick Pavers",
      metaDescription:
        "Expert paver installation and outdoor living services in Davenport, FL. Patios, driveways, pool decks, and fire pits. 3-year workmanship warranty. Free consultation.",
    },
  },
  {
    slug: "auburndale",
    title: "Auburndale",
    breadcrumbLabel: "Auburndale",
    heroHeading:
      "Paver Installation and Outdoor Living Services in Auburndale, FL",
    heroSubtitle: "Central Florida's Trusted Paver Experts",
    heroImage: "/images/sections-images/patio-pavers-5.webp",
    serviceBlocks: personalizeBlocks("Auburndale"),
    about: {
      heading: "About Auburndale, FL",
      description:
        "Auburndale, FL is a charming lakeside community nestled between Lakeland and Winter Haven. Known for its beautiful lakes, parks, and friendly neighborhoods, Auburndale offers a relaxed lifestyle with easy access to Central Florida's amenities. Homeowners here appreciate quality outdoor spaces that complement the natural surroundings, from lakefront patios to elegant driveways and cozy fire pit areas.",
      image: "/images/sections-images/local-expertise-section.webp",
    },
    faqs: [
      {
        question:
          "How long does a paver installation take in Auburndale?",
        answer:
          "Timelines depend on project scope. A standard patio or driveway takes 3-5 days, while larger outdoor living projects with multiple features may take 1-2 weeks. We provide clear timelines during consultation.",
      },
      {
        question:
          "What paver materials do you recommend for Auburndale homes?",
        answer:
          "We recommend materials suited for Central Florida's climate — brick, concrete, and natural stone pavers. Each offers excellent durability and aesthetics when installed with proper base preparation and drainage.",
      },
      {
        question:
          "How often should I maintain my pavers in Auburndale?",
        answer:
          "Annual cleaning with sealing every 1-2 years keeps pavers protected against Florida's sun, rain, and humidity. Regular maintenance prevents weed growth, fading, and sand loss.",
      },
    ],
    servedAreas: [
      {
        title: "Polk County Cities We Serve",
        cities: [
          "Auburndale",
          "Lakeland",
          "Winter Haven",
          "Haines City",
          "Bartow",
          "Lake Alfred",
        ],
      },
      {
        title: "Surrounding Areas",
        cities: [
          "Plant City",
          "Mulberry",
          "Eagle Lake",
          "Dundee",
          "Lake Wales",
        ],
      },
    ],
    seo: {
      metaTitle:
        "Paver Installation & Outdoor Living in Auburndale, FL | AllBrick Pavers",
      metaDescription:
        "Expert paver installation and outdoor living services in Auburndale, FL. Patios, driveways, pool decks, and fire pits. 3-year workmanship warranty. Free consultation.",
    },
  },
  {
    slug: "horizon-west",
    title: "Horizon West",
    breadcrumbLabel: "Horizon West",
    heroHeading:
      "Paver Installation and Outdoor Living Services in Horizon West, FL",
    heroSubtitle: "Central Florida's Trusted Paver Experts",
    heroImage: "/images/sections-images/patio-pavers-7.webp",
    serviceBlocks: personalizeBlocks("Horizon West"),
    about: {
      heading: "About Horizon West, FL",
      description:
        "Horizon West, FL is one of the most sought-after master-planned communities in the greater Orlando area. With modern homes, top-rated schools, and a focus on community living, Horizon West attracts families who value quality and design in every aspect of their home. Professional paver installation helps homeowners create outdoor spaces that match the high standards of their community — from elegant driveways to resort-style pool decks.",
      image: "/images/sections-images/local-expertise-section.webp",
    },
    faqs: [
      {
        question:
          "How long does a typical hardscape project take in Horizon West?",
        answer:
          "Standard patios and driveways take 3-7 days, while comprehensive outdoor living projects may take 1-2 weeks. We coordinate with HOA requirements and provide detailed timelines during consultation.",
      },
      {
        question:
          "Do you work with HOA guidelines in Horizon West?",
        answer:
          "Absolutely. We're familiar with HOA requirements common in Horizon West communities and ensure all designs, materials, and installations comply with your community's guidelines.",
      },
      {
        question:
          "Which pavers are best for newer homes in Horizon West?",
        answer:
          "Modern concrete pavers, porcelain tiles, and natural stone all complement Horizon West's contemporary home designs. We help you choose materials that match your home's style while meeting Florida's climate demands.",
      },
    ],
    servedAreas: [
      {
        title: "Orange County Areas We Serve",
        cities: [
          "Horizon West",
          "Windermere",
          "Winter Garden",
          "Gotha",
          "Oakland",
          "Dr. Phillips",
          "Bay Hill",
        ],
      },
      {
        title: "Surrounding Areas",
        cities: [
          "Clermont",
          "Minneola",
          "Kissimmee",
          "Celebration",
          "Four Corners",
          "Davenport",
        ],
      },
    ],
    seo: {
      metaTitle:
        "Paver Installation & Outdoor Living in Horizon West, FL | AllBrick Pavers",
      metaDescription:
        "Expert paver installation and outdoor living services in Horizon West, FL. HOA-compliant designs, premium materials, and 3-year workmanship warranty. Free consultation.",
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Retrieves location data by slug. Returns undefined when the slug has no match.
 */
export function getLocationBySlug(slug: string): LocationData | undefined {
  return LOCATIONS_DATA.find((l) => l.slug === slug);
}

/**
 * Returns all location slugs — useful for `generateStaticParams`.
 */
export function getAllLocationSlugs(): string[] {
  return LOCATIONS_DATA.map((l) => l.slug);
}
