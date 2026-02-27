"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/presentation/components/organisms/landing-page/Header";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";
import CheckoutHero from "@/presentation/components/organisms/checkout/CheckoutHero";
import CheckoutGuarantee from "@/presentation/components/organisms/checkout/CheckoutGuarantee";
import CheckoutContent from "@/presentation/components/organisms/checkout/CheckoutContent";
import type { CourseSlug } from "@/types/courses";

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const tier = searchParams.get("tier") as CourseSlug | null;
  
  // Default to "primary-course" if no tier param or invalid tier
  const courseSlug: CourseSlug = tier && ["primary-course", "primary-books", "premium-books"].includes(tier)
    ? tier
    : "primary-course";

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <CheckoutHero />

      {/* Checkout Content with Social Proof */}
      <CheckoutContent courseSlug={courseSlug} />

      {/* Guarantee + FAQ Section */}
      <CheckoutGuarantee />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
