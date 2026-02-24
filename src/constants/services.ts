import type { ServiceData, ServiceFeature } from "@/types/service.type";

// ---------------------------------------------------------------------------
// Shared — reused across all services
// ---------------------------------------------------------------------------

export const SERVICE_FEATURES: ServiceFeature[] = [
  {
    title: "Make It Simple",
    subtitle: "Effortless Process",
    description: "We make transforming your outdoor space easy.",
  },
  {
    title: "Affordable Plans",
    subtitle: "Competitive Pricing",
    description: "Quality services that fit your budget.",
  },
  {
    title: "Unique Work",
    subtitle: "Custom Designs",
    description: "Tailored solutions for your unique needs.",
  },
  {
    title: "Expert Design",
    subtitle: "Innovative Ideas",
    description: "Creative designs that enhance your space.",
  },
];

export const SERVICE_SIDEBAR_INFO = {
  title: "Who we are?",
  description:
    "We are a family-owned business in Central Florida, committed to creating stunning, durable outdoor spaces. Our expertise lies in paver installation and repair, delivering quality craftsmanship that stands the test of time.",
} as const;

// ---------------------------------------------------------------------------
// Individual service content — SSOT
// ---------------------------------------------------------------------------

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "pavers-installation",
    title: "Pavers Installation",
    breadcrumbLabel: "Pavers Installation",
    heroSubtitle: "Best Construction Services",
    heroImage: "/images/sections-images/patio-pavers-2-after-1.webp",
    content: {
      heading: "Transform Your Outdoor Space with Professional Paver Installation",
      paragraphs: [
        "Our paver installation services are designed to enhance the beauty and functionality of your outdoor living space. Whether you envision a serene retreat or a lively gathering area, our team at AllBrick Pavers ensures that your project is built to last, using high-quality materials and meticulous craftsmanship.",
        "We specialize in a variety of paver styles, including brick, stone, and cement pavers, tailored to match your home's aesthetic. Our process begins with a thorough consultation to understand your vision, followed by expert design and installation to bring that vision to life.",
        "From small, intimate patios to expansive outdoor entertainment areas, we handle projects of all sizes with the same level of dedication and attention to detail. Trust us to create an outdoor space that not only meets but exceeds your expectations.",
        "Contact us today to start planning your perfect outdoor project!",
      ],
    },
    galleryImages: [
      "/images/sections-images/patio-pavers-1-after-1.webp",
      "/images/sections-images/patio-pavers-1-after-2.webp",
      "/images/sections-images/patio-pavers-1-after-3.webp",
      "/images/sections-images/patio-pavers-1-after-4.webp",
    ],
    faqs: [
      {
        question: "How long does paver installation take?",
        answer:
          "Project duration varies by size and complexity. A standard patio or driveway typically takes 3-5 days from demolition to completion. Larger projects may take up to two weeks.",
      },
      {
        question: "What materials do you use for installation?",
        answer:
          "We use high-quality brick, stone, and cement pavers from top manufacturers. All materials are selected for durability, weather resistance, and aesthetic appeal.",
      },
      {
        question: "Do you provide a warranty on installation?",
        answer:
          "Yes! We offer a comprehensive 3-Year Workmanship Warranty covering defects directly related to our installation, giving you complete peace of mind.",
      },
      {
        question: "How do I prepare my yard for installation?",
        answer:
          "Our team handles all preparation including excavation, grading, and base material installation. We just ask that the area be accessible and free of personal belongings.",
      },
      {
        question: "Can pavers be installed over existing concrete?",
        answer:
          "In some cases, yes. Pavers can be installed as an overlay on existing concrete if the surface is in good condition. We'll assess your specific situation during the consultation.",
      },
    ],
    features: SERVICE_FEATURES,
    stats: [
      { value: "100%", label: "Customer Satisfaction" },
      { value: "100%", label: "Quality of Work" },
    ],
    seo: {
      metaTitle: "Professional Pavers Installation | AllBrick Pavers",
      metaDescription:
        "Expert paver installation services in Central Florida. High-quality materials, meticulous craftsmanship, and a 3-year workmanship warranty. Get a free consultation today.",
    },
  },
  {
    slug: "pavers-repair",
    title: "Pavers Repair",
    breadcrumbLabel: "Pavers Repair",
    heroSubtitle: "Best Construction Services",
    heroImage: "/images/sections-images/cracked-pavers.jpg",
    content: {
      heading: "Restore Your Pavers to Their Original Beauty",
      paragraphs: [
        "Over time, even the highest quality pavers can shift, crack, or become uneven due to Florida's weather conditions and natural ground movement. Our paver repair services are designed to restore your outdoor surfaces to their original beauty and functionality.",
        "We handle all types of paver repairs, from fixing sunken and cracked pavers to re-leveling entire sections and replacing damaged units. Our experienced team carefully assesses each situation to determine the most effective repair approach.",
        "Using color-matched pavers and professional techniques, we ensure seamless repairs that blend naturally with your existing installation. We also address underlying issues like drainage problems and base erosion to prevent future damage.",
        "Don't let damaged pavers diminish your outdoor space. Contact us for a free assessment and get your pavers looking like new again!",
      ],
    },
    galleryImages: [
      "/images/sections-images/cracked-pavers.jpg",
      "/images/sections-images/patio-pavers-2-after-1.webp",
      "/images/sections-images/driveway-pavers-1-after.webp",
    ],
    faqs: [
      {
        question: "Can individual pavers be replaced?",
        answer:
          "Yes! One of the biggest advantages of pavers is that individual units can be lifted and replaced without disturbing the surrounding area.",
      },
      {
        question: "Why are my pavers sinking?",
        answer:
          "Pavers typically sink due to base erosion, inadequate compaction during original installation, or drainage issues. We address both the symptom and the root cause.",
      },
      {
        question: "How do you match existing paver colors?",
        answer:
          "We work with a wide network of suppliers and keep samples of common paver styles. In most cases, we can find an exact or very close match to your existing pavers.",
      },
      {
        question: "Is it better to repair or replace pavers?",
        answer:
          "This depends on the extent of damage. Minor settling and cracks can usually be repaired, while extensive damage or outdated installations may benefit from full replacement.",
      },
      {
        question: "Do you offer maintenance after repair?",
        answer:
          "Absolutely! We offer maintenance plans that include regular inspections, cleaning, and sealing to keep your pavers in top condition year-round.",
      },
    ],
    features: SERVICE_FEATURES,
    stats: [
      { value: "100%", label: "Repair Success Rate" },
      { value: "100%", label: "Quality of Work" },
    ],
    seo: {
      metaTitle: "Pavers Repair Services | AllBrick Pavers",
      metaDescription:
        "Professional paver repair in Central Florida. Fix sunken, cracked, or uneven pavers. Color-matched replacements and a 3-year workmanship warranty.",
    },
  },
  {
    slug: "maintenance-plans",
    title: "Maintenance Plans",
    breadcrumbLabel: "Maintenance Plans",
    heroSubtitle: "Best Construction Services",
    heroImage: "/images/sections-images/patio-pavers-5.webp",
    content: {
      heading: "Protect Your Investment with Professional Paver Maintenance",
      paragraphs: [
        "Central Florida's intense sun, heavy rain, and humidity can take a toll on your outdoor pavers. Our maintenance plans are designed to protect your investment and keep your pavers looking pristine year after year.",
        "Our comprehensive plans include regular cleaning, joint sand replenishment, sealing treatments, and thorough inspections to catch small issues before they become costly repairs. We tailor each plan to your specific installation and usage needs.",
        "Regular maintenance not only preserves the appearance of your pavers but also extends their lifespan significantly. Sealed pavers resist staining, weed growth, and color fading far better than untreated surfaces.",
        "Join our satisfied clients who enjoy worry-free, beautiful outdoor spaces. Contact us to learn about our flexible maintenance plan options!",
      ],
    },
    galleryImages: [
      "/images/sections-images/patio-pavers-5.webp",
      "/images/sections-images/patio-pavers-4.webp",
      "/images/sections-images/patio-pavers-7.webp",
    ],
    faqs: [
      {
        question: "How often should pavers be sealed?",
        answer:
          "We recommend sealing pavers every 2-3 years, depending on exposure and traffic. Our maintenance plans include scheduled sealing to keep your pavers protected.",
      },
      {
        question: "What does a maintenance plan typically include?",
        answer:
          "Our plans include pressure washing, re-sanding joints, weed and moss removal, sealant application, and a full condition assessment at each visit.",
      },
      {
        question: "Can maintenance prevent weed growth between pavers?",
        answer:
          "Yes! Regular cleaning and proper polymeric sand application significantly reduce weed growth. Sealing provides an additional barrier against weeds.",
      },
      {
        question: "Do you offer seasonal maintenance programs?",
        answer:
          "We offer quarterly, semi-annual, and annual maintenance plans. Each is designed to address Central Florida's seasonal weather patterns.",
      },
      {
        question: "Is maintenance necessary for new installations?",
        answer:
          "While new pavers look great initially, starting maintenance early helps preserve their condition and prevents issues from developing over time.",
      },
    ],
    features: SERVICE_FEATURES,
    stats: [
      { value: "100%", label: "Client Retention" },
      { value: "100%", label: "Satisfaction Rate" },
    ],
    seo: {
      metaTitle: "Paver Maintenance Plans | AllBrick Pavers",
      metaDescription:
        "Professional paver maintenance in Central Florida. Regular cleaning, sealing, and inspections to protect your investment year-round.",
    },
  },
  {
    slug: "patio-pavers",
    title: "Patio Pavers",
    breadcrumbLabel: "Patio Pavers",
    heroSubtitle: "Best Construction Services",
    heroImage: "/images/sections-images/patio-pavers-1-after-1.webp",
    content: {
      heading: "Transform Your Outdoor Space with Expert Patio Installation",
      paragraphs: [
        "Our patio installation services are designed to enhance the beauty and functionality of your outdoor living space. Whether you envision a serene retreat or a lively gathering area, our team at AllBrick Pavers ensures that your patio is built to last, using high-quality materials and meticulous craftsmanship.",
        "We specialize in a variety of patio styles, including brick, stone, and cement pavers, tailored to match your home's aesthetic. Our process begins with a thorough consultation to understand your vision, followed by expert design and installation to bring that vision to life.",
        "From small, intimate patios to expansive outdoor entertainment areas, we handle projects of all sizes with the same level of dedication and attention to detail. Trust us to create a patio that not only meets but exceeds your expectations.",
        "Contact us today to start planning your perfect patio!",
      ],
    },
    galleryImages: [
      "/images/sections-images/patio-pavers-1-after-1.webp",
      "/images/sections-images/patio-pavers-1-after-2.webp",
      "/images/sections-images/patio-pavers-1-after-3.webp",
      "/images/sections-images/patio-pavers-1-after-4.webp",
      "/images/sections-images/patio-pavers-2-after-1.webp",
      "/images/sections-images/patio-pavers-2-after-2.webp",
    ],
    faqs: [
      {
        question: "What patio shapes and sizes can you create?",
        answer:
          "We can create patios in virtually any shape or size, from intimate 100 sq ft spaces to large 1000+ sq ft entertainment areas. Custom curves, angles, and multi-level designs are all possible.",
      },
      {
        question: "How do I choose the right paver style for my patio?",
        answer:
          "We offer a free design consultation where we bring samples to your home and help you visualize different styles. We consider your home's architecture, landscape, and personal preferences.",
      },
      {
        question: "Can a patio increase my home's value?",
        answer:
          "Absolutely! A well-designed paver patio typically returns 60-80% of its cost in home value and significantly enhances curb appeal and outdoor living quality.",
      },
      {
        question: "Are paver patios slip-resistant?",
        answer:
          "Most paver surfaces provide excellent traction, especially textured finishes. We can recommend specific paver options with enhanced slip resistance for pool-adjacent areas.",
      },
      {
        question: "What is the best base for a patio?",
        answer:
          "A proper base includes compacted subgrade, 4-6 inches of compacted crushed stone, and 1 inch of leveling sand. This ensures long-lasting stability and drainage.",
      },
    ],
    features: SERVICE_FEATURES,
    stats: [
      { value: "100%", label: "Affordable Cost" },
      { value: "100%", label: "Quality of Work" },
    ],
    seo: {
      metaTitle: "Patio Pavers Installation | AllBrick Pavers",
      metaDescription:
        "Expert patio paver installation in Central Florida. Custom designs, premium materials, and a 3-year workmanship warranty. Transform your outdoor space today.",
    },
  },
  {
    slug: "pool-deck-pavers",
    title: "Pool Deck Pavers",
    breadcrumbLabel: "Pool Deck Pavers",
    heroSubtitle: "Best Construction Services",
    heroImage: "/images/sections-images/pool-deck-after.jpg",
    content: {
      heading: "Create a Safe and Stylish Pool Deck with Expert Installation",
      paragraphs: [
        "A well-crafted pool deck is essential for both safety and style, transforming your pool area into a welcoming oasis. At AllBrick Pavers, we specialize in designing and installing pool decks that are as functional as they are beautiful, providing a perfect space for relaxation and entertainment.",
        "We offer a wide selection of materials, including slip-resistant stone, brick, and cement pavers, ensuring that your pool deck is not only durable but also safe for your family and guests. Our team works closely with you to design a deck that complements your pool and landscape, creating a seamless transition between indoor and outdoor living spaces.",
        "From concept to completion, we handle every aspect of the installation process with meticulous attention to detail, ensuring that your pool deck meets the highest standards of quality and craftsmanship. Whether you're renovating an existing pool area or building a new one, we deliver results that enhance your home's value and appeal.",
        "Ready to transform your pool area into a stunning outdoor retreat? Contact us today to start planning your custom pool deck!",
      ],
    },
    galleryImages: [
      "/images/sections-images/pool-deck-after.jpg",
      "/images/sections-images/patio-pavers-3-after-1.webp",
      "/images/sections-images/patio-pavers-7.webp",
    ],
    faqs: [
      {
        question: "Are pavers safe around pools?",
        answer:
          "Yes! We use slip-resistant pavers specifically designed for pool areas. They stay cooler than concrete in the sun and provide excellent traction when wet.",
      },
      {
        question: "How do pool deck pavers handle chlorine and pool chemicals?",
        answer:
          "Quality pavers are highly resistant to pool chemicals. We recommend sealed pavers around pools, which adds an extra layer of protection against chemical exposure.",
      },
      {
        question: "Can you match my pool coping with the deck pavers?",
        answer:
          "Absolutely! We offer coordinated coping and deck paver options to create a unified, polished look around your entire pool area.",
      },
      {
        question: "How do pool deck pavers handle Florida heat?",
        answer:
          "Light-colored pavers reflect heat better than dark surfaces. We recommend specific cool-touch paver options that stay comfortable underfoot even on the hottest days.",
      },
      {
        question: "Do pool deck pavers require special maintenance?",
        answer:
          "Pool deck pavers benefit from occasional cleaning and resealing every 2-3 years. We offer specialized pool deck maintenance plans tailored to your needs.",
      },
    ],
    features: SERVICE_FEATURES,
    stats: [
      { value: "100%", label: "Safety Rating" },
      { value: "100%", label: "Quality of Work" },
    ],
    seo: {
      metaTitle: "Pool Deck Pavers Installation | AllBrick Pavers",
      metaDescription:
        "Safe, beautiful pool deck pavers in Central Florida. Slip-resistant, heat-reflective materials with expert installation and 3-year workmanship warranty.",
    },
  },
  {
    slug: "driveway-pavers",
    title: "Driveway Pavers",
    breadcrumbLabel: "Driveway Pavers",
    heroSubtitle: "Best Construction Services",
    heroImage: "/images/sections-images/driveway-pavers-2-after.webp",
    content: {
      heading: "Elevate Your Curb Appeal with a Custom Driveway Installation",
      paragraphs: [
        "Your driveway is one of the first things visitors notice about your home. Our custom driveway paver installations are designed to make a lasting impression, combining beauty with the durability needed to withstand daily vehicle traffic and Florida's demanding weather conditions.",
        "We offer a wide range of paver styles, colors, and patterns to create a driveway that perfectly complements your home's architecture. From classic herringbone patterns to modern geometric designs, the possibilities are virtually unlimited.",
        "Our driveways are built on properly engineered bases that distribute weight evenly and resist settling. Unlike poured concrete, paver driveways flex with ground movement instead of cracking, and individual pavers can be replaced if ever damaged.",
        "Ready to upgrade your home's entrance? Contact us for a free driveway consultation and estimate!",
      ],
    },
    galleryImages: [
      "/images/sections-images/driveway-pavers-2-after.webp",
      "/images/sections-images/driveway-pavers-1-after.webp",
      "/images/sections-images/patio-pavers-2.webp",
    ],
    faqs: [
      {
        question: "Can pavers handle heavy vehicles?",
        answer:
          "Absolutely! Quality pavers exceed 8,000 PSI in compressive strength, making them suitable for cars, trucks, and even RVs when installed on a proper base.",
      },
      {
        question: "How long do driveway pavers last?",
        answer:
          "Properly installed driveway pavers can last 25-50+ years. Their interlocking design distributes weight and prevents the cracking common in poured concrete driveways.",
      },
      {
        question: "Are paver driveways more expensive than concrete?",
        answer:
          "While the initial cost may be slightly higher, paver driveways offer superior longevity and lower maintenance costs. Individual pavers can be replaced, eliminating costly full-surface repairs.",
      },
      {
        question: "How do paver driveways handle stormwater?",
        answer:
          "We offer permeable paver options that allow water to infiltrate through the joints, reducing runoff and meeting many stormwater management requirements.",
      },
      {
        question: "Can you install pavers on a sloped driveway?",
        answer:
          "Yes! We have extensive experience with sloped installations. Proper base preparation and drainage solutions ensure stability on any grade.",
      },
    ],
    features: SERVICE_FEATURES,
    stats: [
      { value: "100%", label: "Affordable Cost" },
      { value: "100%", label: "Quality of Work" },
    ],
    seo: {
      metaTitle: "Driveway Pavers Installation | AllBrick Pavers",
      metaDescription:
        "Custom driveway paver installation in Central Florida. Durable, beautiful, and built to last. Free consultation with 3-year workmanship warranty.",
    },
  },
  {
    slug: "firepit-pavers",
    title: "Firepit Pavers",
    breadcrumbLabel: "Firepit Pavers",
    heroSubtitle: "Best Construction Services",
    heroImage: "/images/sections-images/firepit-pavers-1-after-1.webp",
    content: {
      heading: "Create the Perfect Gathering Spot with a Custom Fire Pit",
      paragraphs: [
        "Nothing brings family and friends together quite like a beautifully crafted fire pit area. At AllBrick Pavers, we design and build custom fire pit installations that become the centerpiece of your outdoor living space, perfect for cool Florida evenings and year-round entertaining.",
        "Our fire pit designs range from rustic stone circles to modern gas-powered installations, each surrounded by durable paver seating areas. We use heat-rated materials that withstand high temperatures while maintaining their beauty and structural integrity.",
        "We handle the complete installation, including gas line coordination (for gas fire pits), proper ventilation, safety clearances, and surrounding paver work. Every project meets local building codes and safety standards.",
        "Imagine gathering around your own custom fire pit on a cool evening. Contact us today to make that vision a reality!",
      ],
    },
    galleryImages: [
      "/images/sections-images/firepit-pavers-1-after-1.webp",
      "/images/sections-images/firepit-pavers-1-after-2.webp",
      "/images/sections-images/patio-pavers-4.webp",
    ],
    faqs: [
      {
        question: "What type of fire pit is best for Florida?",
        answer:
          "Both wood-burning and gas fire pits work well in Florida. Gas fire pits offer more convenience and cleaner operation, while wood-burning pits provide a traditional ambiance.",
      },
      {
        question: "Do I need a permit for a fire pit?",
        answer:
          "Permit requirements vary by county. We handle the permitting process for you and ensure your fire pit meets all local regulations and safety codes.",
      },
      {
        question: "How far should a fire pit be from my house?",
        answer:
          "Most codes require at least 10-20 feet of clearance from structures. We design all fire pit installations with proper safety clearances built in.",
      },
      {
        question: "What pavers work best around a fire pit?",
        answer:
          "We use heat-resistant pavers rated for fire pit applications. Materials like natural stone and concrete pavers with proper heat ratings are ideal choices.",
      },
      {
        question: "Can you add seating walls around the fire pit?",
        answer:
          "Absolutely! Built-in seating walls are one of our most popular additions. They provide permanent, comfortable seating and define the gathering area beautifully.",
      },
    ],
    features: SERVICE_FEATURES,
    stats: [
      { value: "100%", label: "Design Satisfaction" },
      { value: "100%", label: "Quality of Work" },
    ],
    seo: {
      metaTitle: "Firepit Pavers Installation | AllBrick Pavers",
      metaDescription:
        "Custom fire pit and paver installations in Central Florida. Heat-rated materials, beautiful designs, and a 3-year workmanship warranty.",
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Retrieves service data by slug. Returns undefined when the slug has no match.
 */
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

/**
 * Returns all service slugs — useful for `generateStaticParams`.
 */
export function getAllServiceSlugs(): string[] {
  return SERVICES_DATA.map((s) => s.slug);
}
