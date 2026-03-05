import type {
  GalleryItem,
  GalleryCategoryTab,
} from "@/types/gallery.type";

// ---------------------------------------------------------------------------
// Category filter tabs
// ---------------------------------------------------------------------------

export const GALLERY_CATEGORIES: GalleryCategoryTab[] = [
  { label: "All Projects", value: "all" },
  { label: "Patios", value: "patios" },
  { label: "Driveways", value: "driveways" },
  { label: "Pool Decks", value: "pool-decks" },
  { label: "Fire Pits", value: "fire-pits" },
  { label: "Walkways", value: "walkways" },
];

// ---------------------------------------------------------------------------
// Gallery items — SSOT
// ---------------------------------------------------------------------------

export const GALLERY_ITEMS: GalleryItem[] = [
  // ── Patios ──────────────────────────────────────────────────────────────
  {
    id: "patio-01",
    title: "Elegant Patio Transformation",
    src: "/images/sections-images/patio-pavers-1-after-1.webp",
    category: "patios",
    location: "Winter Haven, FL",
    featured: true,
  },
  {
    id: "patio-02",
    title: "Contemporary Patio Design",
    src: "/images/sections-images/patio-pavers-1-after-2.webp",
    category: "patios",
    location: "Lakeland, FL",
  },
  {
    id: "patio-03",
    title: "Modern Outdoor Living Space",
    src: "/images/sections-images/patio-pavers-1-after-3.webp",
    category: "patios",
    location: "Auburndale, FL",
  },
  {
    id: "patio-04",
    title: "Classic Brick Patio Installation",
    src: "/images/sections-images/patio-pavers-1-after-4.webp",
    category: "patios",
    location: "Haines City, FL",
  },
  {
    id: "patio-05",
    title: "Premium Patio with Custom Layout",
    src: "/images/sections-images/patio-pavers-2-after-1.webp",
    category: "patios",
    location: "Davenport, FL",
    featured: true,
  },
  {
    id: "patio-06",
    title: "Spacious Backyard Patio",
    src: "/images/sections-images/patio-pavers-2-after-2.webp",
    category: "patios",
    location: "Horizon West, FL",
  },
  {
    id: "patio-07",
    title: "Multi-Level Patio Design",
    src: "/images/sections-images/patio-pavers-3-after-1.webp",
    category: "patios",
    location: "Winter Haven, FL",
  },
  {
    id: "patio-08",
    title: "Herringbone Pattern Patio",
    src: "/images/sections-images/patio-pavers-4.webp",
    category: "patios",
    location: "Lakeland, FL",
    featured: true,
  },
  {
    id: "patio-09",
    title: "Intimate Patio Space",
    src: "/images/sections-images/patio-pavers-5.webp",
    category: "patios",
    location: "Auburndale, FL",
  },
  {
    id: "patio-10",
    title: "Curved Patio Edge Detail",
    src: "/images/sections-images/patiop-pavers-6.webp",
    category: "patios",
    location: "Haines City, FL",
  },
  {
    id: "patio-11",
    title: "Outdoor Entertaining Patio",
    src: "/images/sections-images/patio-pavers-7.webp",
    category: "patios",
    location: "Davenport, FL",
  },
  {
    id: "patio-12",
    title: "Full Patio Renovation",
    src: "/images/sections-images/patio-pavers-2.webp",
    category: "patios",
    location: "Horizon West, FL",
  },

  // ── Driveways ───────────────────────────────────────────────────────────
  {
    id: "driveway-01",
    title: "Wide Paver Driveway",
    src: "/images/sections-images/driveway-pavers-1-after.webp",
    category: "driveways",
    location: "Lakeland, FL",
    featured: true,
  },
  {
    id: "driveway-02",
    title: "Modern Driveway Installation",
    src: "/images/sections-images/driveway-pavers-2-after.webp",
    category: "driveways",
    location: "Davenport, FL",
  },

  // ── Pool Decks ──────────────────────────────────────────────────────────
  {
    id: "pool-deck-01",
    title: "Pool Deck Renovation",
    src: "/images/sections-images/pool-deck-after.jpg",
    category: "pool-decks",
    location: "Winter Haven, FL",
    featured: true,
  },

  // ── Fire Pits ──────────────────────────────────────────────────────────
  {
    id: "firepit-01",
    title: "Custom Fire Pit Area",
    src: "/images/sections-images/firepit-pavers-1-after-1.webp",
    category: "fire-pits",
    location: "Horizon West, FL",
    featured: true,
  },
  {
    id: "firepit-02",
    title: "Round Fire Pit with Seating",
    src: "/images/sections-images/firepit-pavers-1-after-2.webp",
    category: "fire-pits",
    location: "Auburndale, FL",
  },

  // ── Walkways ────────────────────────────────────────────────────────────
  {
    id: "walkway-01",
    title: "Garden Walkway Installation",
    src: "/images/sections-images/walkway-pavers.webp",
    category: "walkways",
    location: "Lakeland, FL",
    featured: true,
  },
];

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const GALLERY_SEO = {
  metaTitle: "Project Gallery | AllBrick Pavers — Central Florida Paver Work",
  metaDescription:
    "Browse our gallery of completed paver projects across Central Floridas. Patios, driveways, pool decks, fire pits, and walkways — see the AllBrick Paver difference.",
} as const;
