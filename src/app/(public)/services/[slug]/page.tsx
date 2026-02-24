import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, getAllServiceSlugs } from "@/constants/services";
import { ServiceDetailView } from "@/presentation/pages/(public)/services/service-detail.view";

// ---------------------------------------------------------------------------
// Static params — generates pages at build time for every known service slug
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata — SEO per service
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | AllBrick Pavers" };
  }

  return {
    title: service.seo.metaTitle,
    description: service.seo.metaDescription,
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}
