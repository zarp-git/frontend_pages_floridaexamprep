"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GHL_CHECKOUT_URLS, type PricingTierSlug } from "@/constants/pricing";

export const dynamic = 'force-dynamic';

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const tier = searchParams.get("tier") as PricingTierSlug | null;
  const course = searchParams.get("course");

  useEffect(() => {
    // Se não tem tier ou tier inválido, não faz nada (pode adicionar redirect para home se quiser)
    if (!tier || !GHL_CHECKOUT_URLS[tier]) {
      console.error("Invalid tier:", tier);
      return;
    }

    // Redireciona automaticamente para a URL do GHL correspondente ao tier
    const ghlUrl = GHL_CHECKOUT_URLS[tier];
    window.location.href = ghlUrl;
  }, [tier, course]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-rubik text-lg mb-2">Redirecting to checkout...</p>
        {tier && (
          <p className="text-gray-500 font-rubik text-sm">
            Processing {tier}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-rubik">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
}
