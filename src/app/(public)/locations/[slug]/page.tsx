import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocationBySlug, getAllLocationSlugs } from "@/constants/locations";
import { LocationDetailView } from "@/presentation/pages/(public)/locations/location-detail.view";

// ---------------------------------------------------------------------------
// Static params — generates pages at build time for every known location slug
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata — SEO per location
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return { title: "Location Not Found | AllBrick Pavers" };
  }

  return {
    title: location.seo.metaTitle,
    description: location.seo.metaDescription,
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return <LocationDetailView location={location} />;
}
