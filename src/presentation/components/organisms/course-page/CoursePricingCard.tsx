"use client";

import { CourseData, CourseFeature } from "@/data/courses";
import { PRICING_TIERS, TIER_DISPLAY, TIER_CTA_URL, PricingTierSlug } from "@/constants/pricing";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CoursePricingCardProps {
  course: CourseData;
  sectionTitle?: string;
  sectionSubtitle?: string;
  customTiers?: string[];
  hideDefaultText?: boolean;
}

interface PricingTier {
  badge: {
    text: string;
    color: string;
    highlight?: string;
  };
  pricing: {
    originalValue: number;
    currentPrice: number;
  };
  features: CourseFeature[];
  tierSlug: PricingTierSlug;
}

export default function CoursePricingCard({ course, sectionTitle, sectionSubtitle, customTiers, hideDefaultText }: CoursePricingCardProps) {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const toggleExpanded = (idx: number) => {
    setExpandedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Define os tiers válidos para cada curso
  const courseTiersMap: Record<string, string[]> = {
    "business-finance": ["primary-course", "premium-books", "premium-highlighted-books"],
    "contract-administration": ["capm-course", "capm-package", "capm-highlighted-books"],
    "complete-exam-prep": ["complete-course", "complete-package", "complete-highlighted-books"],
    "general-contractor": ["trade-course", "trade-books", "trade-highlighted-books"],
    "building-contractor": ["trade-course", "trade-books", "trade-highlighted-books"],
    "residential-contractor": ["trade-course", "trade-books", "trade-highlighted-books"],
  };

  const validTiers = customTiers || courseTiersMap[course.slug] || [];
  const pricingTiers: PricingTier[] = TIER_DISPLAY.filter((tier) => validTiers.includes(tier.slug)).map((tier, idx) => {
    const pricing = PRICING_TIERS[tier.slug];
    let features: CourseFeature[];
    let highlight: string | undefined;
    
    // Para Complete Exam Prep, lógica específica (3 colunas)
    if (course.slug === "complete-exam-prep") {
      if (idx === 0) {
        // Coluna 1 (Course): primeiras 9 features (exclui "3 Hour Cram Course")
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 9,
        }));
      } else if (idx === 1) {
        // Coluna 2 (Course + Books): primeiras 9 + features 10, 11, 12
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 9 || (i >= 10 && i <= 12),
        }));
        highlight = "Most Popular";
      } else {
        // Coluna 3 (Course + Pre Highlighted): todas as features
        features = course.features.map((f) => ({ ...f, included: true }));
        highlight = "Best Value";
      }
    } else if (course.slug === "contract-administration") {
      // Para Contract Administration (3 colunas)
      if (idx === 0) {
        // Coluna 1 (Course): primeiras 11 features
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 11,
        }));
      } else if (idx === 1) {
        // Coluna 2 (Course + Books): primeiras 11 + features 11, 12
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 11 || (i >= 11 && i <= 12),
        }));
        highlight = "Most Popular";
      } else {
        // Coluna 3 (Course + Pre Highlighted): todas as features
        features = course.features.map((f) => ({ ...f, included: true }));
        highlight = "Best Value";
      }
    } else if (course.slug === "business-finance") {
      // Para Business Finance (3 colunas)
      if (idx === 0) {
        // Coluna 1 (Course): primeiras 9 features + feature 11 (3 Hour Cram Course)
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 9 || i === 11,
        }));
      } else if (idx === 1) {
        // Coluna 2 (Course + Tabs + Books): primeiras 9 + features 9, 10, 11
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 9 || (i >= 9 && i <= 11),
        }));
        highlight = "Most Popular";
      } else {
        // Coluna 3 (Course + Pre Highlighted): todas as features
        features = course.features.map((f) => ({ ...f, included: true }));
        highlight = "Best Value";
      }
    } else if (course.slug === "general-contractor" || course.slug === "building-contractor" || course.slug === "residential-contractor") {
      // Para Trade Programs (3 colunas) - mesma lógica do contract-administration
      if (idx === 0) {
        // Coluna 1 (Course): primeiras 11 features
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 11,
        }));
      } else if (idx === 1) {
        // Coluna 2 (Course + Books): primeiras 11 + features 11, 12
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 11 || (i >= 11 && i <= 12),
        }));
        highlight = "Most Popular";
      } else {
        // Coluna 3 (Course + Pre Highlighted): todas as features
        features = course.features.map((f) => ({ ...f, included: true }));
        highlight = "Best Value";
      }
    } else if (customTiers && customTiers.includes("complete-contractor-course")) {
      // Para Complete Contractor Package (3 colunas)
      if (idx === 0) {
        // Coluna 1 (Course): todas as features EXCETO índices 9, 10, 11, 12
        features = course.features.map((f, i) => ({
          ...f,
          included: f.included && i < 9,
        }));
      } else if (idx === 1) {
        // Coluna 2 (Course + Books): todas as features EXCETO a última (índice 12 - Pre Highlighted)
        features = course.features.map((f, i) => ({
          ...f,
          included: i !== 12,
        }));
        highlight = "Most Popular";
      } else {
        // Coluna 3 (Course + Pre Highlighted): todas as features
        features = course.features.map((f) => ({ ...f, included: true }));
        highlight = "Best Value";
      }
    } else {
      // Fallback genérico
      if (idx === 0) {
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 9,
        }));
      } else if (idx === 1) {
        features = course.features.map((f, i) => ({
          ...f,
          included: i < 10,
        }));
      } else if (idx === 2) {
        features = course.features.map((f, i) => ({
          ...f,
          included: i < course.features.length - 1,
        }));
        highlight = "Most Popular";
      } else {
        features = course.features.map((f) => ({ ...f, included: true }));
        highlight = "Best Value";
      }
    }
    
    return {
      badge: { text: tier.label, color: tier.badgeColor, highlight },
      pricing,
      features,
      tierSlug: tier.slug,
    };
  });

  // Obter todas as features únicas
  const allFeatures = course.features;

  return (
    <div
      className="bg-black overflow-x-hidden"
      style={{
        background:
          "radial-gradient(122.59% 134.96% at 149.27% -34.05%, #0BF 0%, rgba(0, 60, 255, 0.00) 89.06%), radial-gradient(47.75% 46.47% at -26.25% 94.45%, #0BF 0%, rgba(0, 60, 255, 0.00) 100%), #000A1C",
      }}
    >
      <section className="w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-28 py-10 sm:py-14 md:py-20 overflow-x-hidden">
        <div className="w-full mx-auto flex flex-col justify-center items-center gap-6 sm:gap-8">
          {/* Heading */}
          <div className="flex flex-col justify-center items-center gap-3 sm:gap-5 px-2">
            {/* Section Title and Subtitle (if provided) */}
            {sectionTitle && (
              <div className="w-full max-w-4xl text-center">
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold font-red-hat uppercase leading-tight mb-2">
                  {sectionTitle}
                </h2>
                {sectionSubtitle && (
                  <p className="text-white/80 text-base sm:text-lg md:text-xl font-normal font-rubik leading-relaxed">
                    {sectionSubtitle}
                  </p>
                )}
              </div>
            )}
            
            {!hideDefaultText && (
              <>
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm">
                  <span className="text-white text-sm sm:text-base font-medium font-rubik leading-relaxed uppercase">
                    DON&apos;T STUDY ALONE
                  </span>
                </div>
                <h2 className="text-center text-white text-xl sm:text-2xl md:text-3xl font-bold font-red-hat uppercase leading-tight">
                  FOLLOW THE PROVEN SYSTEM CONTRACTORS USE TO GET LICENSED
                </h2>
                <p className="text-center text-white text-base sm:text-lg md:text-xl font-normal font-rubik leading-relaxed">
                  Step-by-step lessons, practice exams, and a clear study plan designed to help you pass with confidence.
                </p>
              </>
            )}

            {/* FYI Notice for Contract Administration and Complete Exam Prep - AFTER default text */}
            {course.slug === "contract-administration" && (
              <div className="w-full max-w-3xl px-4 py-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg mt-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm">
                      FYI
                    </span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="text-blue-900 text-sm sm:text-base font-medium font-rubik leading-relaxed">
                      The Contract Administration and Project Management course is sold as a combined course, not separately. Both exams use many of the same reference books, so a large portion of the material overlaps.
                    </p>
                    <p className="text-blue-900 text-sm sm:text-base font-medium font-rubik leading-relaxed">
                      Inside the course, I&apos;ll guide you on which sections of each book apply to Contract Administration and which apply to Project Management, so you know exactly what to focus on for each exam.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comparison Table - Desktop */}
          <div className="hidden md:block w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Header Row */}
            <div className={cn(
              "grid border-b border-gray-200",
              pricingTiers.length === 4 ? "grid-cols-5" : "grid-cols-4"
            )}>
              {/* Left Column - Features Label */}
              <div className="col-span-1 p-4 sm:p-6 bg-gray-50 flex items-end pb-4">
                <h3 className="text-gray-900 text-sm sm:text-base font-bold font-rubik">
                  What&apos;s Included:
                </h3>
              </div>

              {/* Tier Headers */}
              {pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "col-span-1 p-4 sm:p-6 flex flex-col items-center gap-3",
                    idx === 2 && pricingTiers.length === 4 && "bg-blue-50",
                    idx === 1 && pricingTiers.length === 3 && "bg-blue-50"
                  )}
                >
                  {/* Highlight Badge - ou espaço vazio para manter alinhamento */}
                  <div className="h-6">
                    {tier.badge.highlight ? (
                      <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold text-white",
                        idx === 2 && pricingTiers.length === 4 ? "bg-green-600" : 
                        idx === 3 && pricingTiers.length === 4 ? "bg-orange-600" :
                        idx === 1 && pricingTiers.length === 3 ? "bg-green-600" : "bg-blue-600"
                      )}>
                        {tier.badge.highlight}
                      </div>
                    ) : (
                      <div className="h-6" />
                    )}
                  </div>

                  {/* Tier Name */}
                  <h3 className="text-gray-900 text-sm sm:text-base font-bold font-rubik text-center">
                    {tier.badge.text}
                  </h3>

                  {/* Pricing */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-gray-400 text-xs line-through">
                        ${tier.pricing.originalValue}
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-blue-600 text-2xl sm:text-3xl font-bold">
                        ${tier.pricing.currentPrice}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={TIER_CTA_URL[tier.tierSlug]} className="w-full">
                    <PrimaryButton
                      variant="orange"
                      size="sm"
                      className="w-full text-xs sm:text-sm"
                    >
                      Buy Now
                    </PrimaryButton>
                  </Link>

                  {/* No Books Included notice for Course-only tier */}
                  {idx === 0 && (
                    <p className="text-gray-500 text-xs font-medium text-center">
                      No Books Included
                    </p>
                  )}

                  {/* Additional Info - ou espaço vazio para manter alinhamento */}
                  <div className="h-8 text-center">
                    {idx === 2 && pricingTiers.length === 4 && (
                      <>
                        <p className="text-blue-600 text-xs font-medium">
                          Basic Course + Required
                        </p>
                        <p className="text-blue-600 text-xs font-medium">
                          Books
                        </p>
                      </>
                    )}
                    {idx === 3 && pricingTiers.length === 4 && (
                      <>
                        <p className="text-orange-600 text-xs font-medium">
                          (Course+Tabs+Books Included)
                        </p>
                      </>
                    )}
                    {idx === 1 && pricingTiers.length === 3 && (
                      <>
                        <p className="text-blue-600 text-xs font-medium">
                          (Course+Tabs+Books Included)
                        </p>
                      </>
                    )}
                    {idx === 2 && pricingTiers.length === 3 && (
                      <>
                        <p className="text-gray-600 text-xs font-medium">
                          Basic Course + Required
                        </p>
                        <p className="text-gray-600 text-xs font-medium">
                          Books
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            {allFeatures.map((feature, featureIdx) => (
              <div
                key={featureIdx}
                className={cn(
                  "grid border-b border-gray-100",
                  pricingTiers.length === 4 ? "grid-cols-5" : "grid-cols-4",
                  featureIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                )}
              >
                {/* Feature Name */}
                <div className="col-span-1 p-3 sm:p-4 flex items-center">
                  <p className="text-gray-700 text-xs sm:text-sm font-rubik">
                    {feature.text}
                  </p>
                </div>

                {/* Checkmarks for each tier */}
                {pricingTiers.map((tier, tierIdx) => {
                  const isIncluded = tier.features[featureIdx]?.included;
                  return (
                    <div
                      key={tierIdx}
                      className={cn(
                        "col-span-1 p-3 sm:p-4 flex items-center justify-center",
                        tierIdx === 2 && pricingTiers.length === 4 && "bg-blue-50/50",
                        tierIdx === 1 && pricingTiers.length === 3 && "bg-blue-50/50"
                      )}
                    >
                      {isIncluded ? (
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Bottom CTA Row */}
            <div className={cn(
              "grid bg-gray-50 p-4 sm:p-6",
              pricingTiers.length === 4 ? "grid-cols-5" : "grid-cols-4"
            )}>
              <div className="col-span-1" />
              {pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "col-span-1 flex items-center justify-center",
                    idx === 2 && pricingTiers.length === 4 && "bg-blue-50",
                    idx === 1 && pricingTiers.length === 3 && "bg-blue-50"
                  )}
                >
                  <Link href={TIER_CTA_URL[tier.tierSlug]} className="w-full px-2">
                    <PrimaryButton
                      variant="orange"
                      size="sm"
                      className="w-full text-xs sm:text-sm"
                    >
                      Buy Now
                    </PrimaryButton>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden w-full flex flex-col gap-6">
            {pricingTiers.map((tier, idx) => {
              const isExpanded = expandedCards[idx];
              // Filtrar apenas features incluídas
              const includedFeatures = tier.features.filter(f => f.included);
              const visibleFeatures = isExpanded ? includedFeatures : includedFeatures.slice(0, 4);
              const hasMoreFeatures = includedFeatures.length > 4;

              return (
                <div
                  key={idx}
                  className="w-full bg-white rounded-2xl overflow-hidden shadow-xl"
                >
                  {/* Card Header */}
                  <div className="p-6 flex flex-col items-center gap-3 border-b border-gray-200">
                    {/* Highlight Badge */}
                    {tier.badge.highlight && (
                      <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold text-white",
                        idx === 1 ? "bg-green-600" : "bg-blue-600"
                      )}>
                        {tier.badge.highlight}
                      </div>
                    )}

                    {/* Tier Name */}
                    <h3 className="text-gray-900 text-xl font-bold font-rubik text-center">
                      {tier.badge.text}
                    </h3>

                    {/* Additional Info */}
                    {idx === 1 && (
                      <div className="text-center">
                        <p className="text-blue-600 text-sm font-medium">
                          Highlighted Books ($2,199 value!)
                        </p>
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-400 text-lg line-through">
                          ${tier.pricing.originalValue}
                        </span>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-blue-600 text-4xl font-bold">
                          ${tier.pricing.currentPrice}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={TIER_CTA_URL[tier.tierSlug]} className="w-full">
                      <PrimaryButton
                        variant="orange"
                        size="lg"
                        className="w-full"
                      >
                        Buy Now
                      </PrimaryButton>
                    </Link>
                  </div>

                  {/* Features List */}
                  <div className="p-6">
                    <div className="flex flex-col gap-4">
                      {visibleFeatures.map((feature, featureIdx) => (
                        <div
                          key={featureIdx}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-gray-700 text-sm font-rubik flex-1">
                            {feature.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Show All Button */}
                    {hasMoreFeatures && (
                      <button
                        onClick={() => toggleExpanded(idx)}
                        className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                      >
                        <span>
                          {isExpanded 
                            ? "Show less" 
                            : `+ Show all ${includedFeatures.length} features`
                          }
                        </span>
                        <ChevronDown 
                          className={cn(
                            "w-4 h-4 transition-transform",
                            isExpanded && "rotate-180"
                          )} 
                        />
                      </button>
                    )}
                  </div>

                  {/* Bottom CTA */}
                  <div className="p-6 pt-0">
                    <Link href={TIER_CTA_URL[tier.tierSlug]} className="w-full">
                      <PrimaryButton
                        variant="orange"
                        size="lg"
                        className="w-full"
                      >
                        Buy Now
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
