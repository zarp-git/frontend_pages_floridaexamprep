"use client";

import { CourseData, CourseFeature } from "@/data/courses";
import { Star } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import Image from "next/image";
import Link from "next/link";

interface CoursePricingCardProps {
  course: CourseData;
}

interface PricingTier {
  badge: {
    text: string;
    color: string;
  };
  pricing: {
    originalValue: number;
    currentPrice: number;
  };
  rating: {
    score: number;
    platform: string;
  };
  features: CourseFeature[];
  tierSlug: "primary-course" | "primary-books" | "premium-books";
}

export default function CoursePricingCard({ course }: CoursePricingCardProps) {
  // Define the 3 pricing tiers based on the current course
  const pricingTiers: PricingTier[] = [
    {
      badge: {
        text: "Primary Course",
        color: "bg-emerald-600",
      },
      pricing: {
        originalValue: 350,
        currentPrice: 299,
      },
      rating: {
        score: 4.9,
        platform: "Skool",
      },
      features: course.features, // All features with correct included flags
      tierSlug: "primary-course",
    },
    {
      badge: {
        text: "Primary + Books",
        color: "bg-violet-600",
      },
      pricing: {
        originalValue: 700,
        currentPrice: 649,
      },
      rating: {
        score: 4.9,
        platform: "Skool",
      },
      features: course.features.map((f, idx) => ({
        ...f,
        // Include first 10 features (0-9), exclude last 2
        included: idx < 10,
      })),
      tierSlug: "primary-books",
    },
    {
      badge: {
        text: "Premium + Books",
        color: "bg-blue-600",
      },
      pricing: {
        originalValue: 1150,
        currentPrice: 715,
      },
      rating: {
        score: 4.9,
        platform: "Skool",
      },
      features: course.features.map((f) => ({ ...f, included: true })), // All features included
      tierSlug: "premium-books",
    },
  ];

  return (
    <div
      className="bg-black"
      style={{
        background:
          "radial-gradient(122.59% 134.96% at 149.27% -34.05%, #0BF 0%, rgba(0, 60, 255, 0.00) 89.06%), radial-gradient(47.75% 46.47% at -26.25% 94.45%, #0BF 0%, rgba(0, 60, 255, 0.00) 100%), #000A1C",
      }}
    >
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-28 py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-6 sm:gap-8">
          {/* Heading */}
          <div className="flex flex-col justify-center items-center gap-3 sm:gap-5 px-2">
            <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm">
              <span className="text-white text-sm sm:text-base font-medium font-rubik leading-relaxed uppercase">
                You don&apos;t have to do this alone
              </span>
            </div>
            <h2 className="text-center text-white text-xl sm:text-2xl md:text-3xl font-bold font-red-hat uppercase leading-tight">
              ENROLL NOW AND GET INSTANT ACCESS TO THE PROVEN METHOD
            </h2>
            <p className="text-center text-white text-base sm:text-lg md:text-xl font-normal font-rubik leading-relaxed">
              Join hundreds of successful students who started exactly where you
              are
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className="w-full bg-zinc-950/50 rounded-2xl border border-white/20 flex flex-col overflow-hidden"
              >
                {/* Badge - Centered with rounded bottom corners */}
                <div className="w-full flex justify-center pt-0">
                  <div
                    className={`px-8 sm:px-12 py-3 sm:py-4 ${tier.badge.color} rounded-bl-[20px] rounded-br-[20px] inline-flex justify-center items-center`}
                  >
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold font-rubik text-center">
                      {tier.badge.text}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-5 pb-8 pt-6 flex flex-col justify-start items-center gap-6 sm:gap-8">
                  {/* Rating */}
                  <div className="inline-flex justify-center items-center gap-2 flex-wrap">
                    <div className="flex justify-start items-start gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <div className="flex justify-start items-center gap-1">
                      <span className="text-white text-sm font-medium font-rubik uppercase">
                        {tier.rating.score}
                      </span>
                      <span className="text-gray-400 text-xs font-normal font-rubik">
                        on {tier.rating.platform}
                      </span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="self-stretch flex flex-col justify-center items-center gap-6">
                    <div className="self-stretch flex flex-col justify-center items-center gap-6 sm:gap-7">
                      <div className="flex flex-col justify-end items-center gap-2.5">
                        <div className="flex flex-col justify-start items-center">
                          <div className="inline-flex justify-start items-start gap-1">
                            <span className="text-white text-base font-semibold font-rubik leading-5">
                              Total Value:
                            </span>
                            <span className="text-red-600 text-base font-medium font-rubik line-through leading-5">
                              ${tier.pricing.originalValue}
                            </span>
                          </div>
                        </div>
                        <div className="text-white text-sm font-normal font-rubik leading-4">
                          For only
                        </div>
                        <div className="inline-flex justify-center items-end gap-0.5">
                          <span className="text-white text-2xl font-semibold font-rubik leading-6">
                            $
                          </span>
                          <span className="text-white text-3xl sm:text-4xl font-semibold font-rubik leading-9">
                            {tier.pricing.currentPrice}
                          </span>
                        </div>
                      </div>

                      <Link href={`/checkout?tier=${tier.tierSlug}`}>
                        <PrimaryButton
                          variant="blue-solid"
                          size="lg"
                          className="w-full"
                        >
                          GET THAT +90 GRADE NOW
                        </PrimaryButton>
                      </Link>
                    </div>

                    {/* Features Title */}
                    <h4 className="self-stretch text-center text-stone-100 text-base font-semibold font-rubik leading-4">
                      EVERYTHING YOU GET ACCESS NOW
                    </h4>

                    {/* Features List */}
                    <div className="self-stretch flex flex-col justify-center items-start gap-4 sm:gap-6">
                      {tier.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="self-stretch inline-flex justify-start items-start gap-3"
                        >
                          {feature.included ? (
                            <div className="w-5 h-5 flex-shrink-0 mt-0.5 relative">
                              <Image
                                src="/images/svg/green-check.svg"
                                alt="Included"
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-5 h-5 flex-shrink-0 mt-0.5 relative">
                              <Image
                                src="/images/svg/red-x-uncheck.svg"
                                alt="Not included"
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-white text-sm font-semibold font-rubik leading-6">
                              {feature.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <Link href={`/checkout?tier=${tier.tierSlug}`}>
                    <PrimaryButton
                      variant="blue-solid"
                      size="lg"
                      className="w-full"
                    >
                      GET THAT +90 GRADE NOW
                    </PrimaryButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
