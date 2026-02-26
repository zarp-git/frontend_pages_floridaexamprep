"use client";

import Header from "@/presentation/components/organisms/landing-page/Header";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";
import CheckoutHero from "@/presentation/components/organisms/checkout/CheckoutHero";
import CheckoutGuarantee from "@/presentation/components/organisms/checkout/CheckoutGuarantee";

export default function CheckoutPage() {
  return (
    <div className="w-full bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <CheckoutHero />

      {/* Guarantee + FAQ Section */}
      <CheckoutGuarantee />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
