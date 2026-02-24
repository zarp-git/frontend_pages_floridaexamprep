import type { Metadata } from "next";
import { GALLERY_SEO } from "@/constants/gallery";
import { GalleryPageView } from "@/presentation/pages/(public)/gallery/gallery.view";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: GALLERY_SEO.metaTitle,
  description: GALLERY_SEO.metaDescription,
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function GalleryPage() {
  return <GalleryPageView />;
}
