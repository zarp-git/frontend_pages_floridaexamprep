// ---------------------------------------------------------------------------
// Gallery Page Types
// ---------------------------------------------------------------------------

/** The project categories available for filtering. */
export type GalleryCategory =
  | "all"
  | "patios"
  | "driveways"
  | "pool-decks"
  | "fire-pits"
  | "walkways";

/** A single gallery image item. */
export interface GalleryItem {
  /** Unique identifier */
  id: string;
  /** Display title, e.g. "Modern Patio in Winter Haven" */
  title: string;
  /** Image path */
  src: string;
  /** Category tag */
  category: Exclude<GalleryCategory, "all">;
  /** Location name, e.g. "Winter Haven, FL" */
  location?: string;
  /** Featured images render larger in the masonry layout. */
  featured?: boolean;
}

/** Label/value pair used for filter tabs. */
export interface GalleryCategoryTab {
  label: string;
  value: GalleryCategory;
}
