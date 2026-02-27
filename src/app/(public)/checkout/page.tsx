"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/presentation/components/organisms/landing-page/Header";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";
import CheckoutHero from "@/presentation/components/organisms/checkout/CheckoutHero";
import CheckoutGuarantee from "@/presentation/components/organisms/checkout/CheckoutGuarantee";
import CheckoutContent from "@/presentation/components/organisms/checkout/CheckoutContent";
import type { CourseSlug } from "@/types/courses";

export const dynamic = 'force-dynamic';

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const tier = searchParams.get("tier") as CourseSlug | null;
  const [isReady, setIsReady] = useState(false);
  
  // Default to "primary-course" if no tier param or invalid tier
  const courseSlug: CourseSlug = tier && ["primary-course", "primary-books", "premium-books"].includes(tier)
    ? tier
    : "primary-course";

  // Scroll to top and set ready state after a short delay
  useEffect(() => {
    // Immediately scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Small delay to ensure page is rendered before showing content
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <CheckoutHero />

      {/* Checkout Content with Social Proof */}
      <CheckoutContent courseSlug={courseSlug} />

      {/* Guarantee + FAQ Section */}
      <CheckoutGuarantee />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <div className="w-full bg-white flex flex-col">
      {/* Header */}
      <Header />

      <Suspense fallback={
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <CheckoutPageContent />
      </Suspense>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
