"use client";

import React from "react";
import Image from "next/image";
import { CtaButton } from "@/presentation/components/molecules/common/CtaButton";

export default function AboutSection() {
  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white">
      <div className="section-container">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-rubik font-semibold text-gray-900 leading-tight">
            Meet ALLBRICK PAVERS
          </h2>
        </div>

        {/* Feature Block 1: Right Content, Left Image */}
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-24 mb-12 sm:mb-16 md:mb-24">
          {/* Left: Image with Angled Shape */}
          <div className="flex-1 w-full relative flex justify-center lg:justify-end">
            <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] lg:aspect-[6/3] drop-shadow-xl">
              {/* Red Accent Background/Border Layer */}
              <div
                className="absolute inset-0 bg-[#A52024] rounded-l-3xl"
                style={{
                  clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
                }}
              ></div>

              {/* Image Layer */}
              <div
                className="absolute inset-0 right-2 bg-gray-200 rounded-l-3xl overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
                }}
              >
                <Image
                  src="/images/sections-images/upgrade-pavers-section.webp"
                  alt="Paver Patio"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 w-full text-left">
            <h3 className="text-[22px] sm:text-[28px] md:text-[32px] font-rubik font-medium text-gray-900 mb-4 sm:mb-6 leading-tight">
              Upgrade Your Property With Central Florida's Trusted Paver Experts
            </h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 font-rubik">
              At ALLBRICK PAVERS, we're local specialists dedicated to
              revolutionizing outdoor spaces in Lakeland, Polk County, and
              Orlando's western suburbs. As a family-owned business, we blend
              artistry with precision engineering to deliver custom solutions
              designed for Florida's climate. From residential driveways to pool
              decks, we serve all of Central Florida with unmatched quality.
            </p>
          </div>
        </div>

        {/* Feature Block 2: Left Content, Right Image */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-10 lg:gap-24 mb-10 sm:mb-12 md:mb-16">
          {/* Left: Content */}
          <div className="flex-1 w-full text-left">
            <h3 className="text-[22px] sm:text-[28px] md:text-[32px] font-rubik font-medium text-gray-900 mb-4 sm:mb-6 leading-tight">
              Local Expertise, Guaranteed Quality
            </h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 font-rubik">
              With over a decade of experience and dozens of successful
              projects, we know how to create lasting curb appeal. We're a
              family-owned team with deep ties to the communities we serve. Our
              commitment to quality and customer satisfaction drives everything
              we do.
            </p>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-rubik">
              <span className="font-bold text-[#A52024]">
                Authorized QUIKRETE® Dealer & Contractor
              </span>{" "}
              – delivering durable results backed by one of America's most
              trusted brands.
            </p>
          </div>

          {/* Right: Image with Angled Shape */}
          <div className="flex-1 w-full relative flex justify-center lg:justify-start">
            <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] lg:aspect-[6/3] drop-shadow-xl">
              {/* Red Accent */}
              <div
                className="absolute inset-0 bg-[#A52024] rounded-r-3xl"
                style={{
                  clipPath:
                    "polygon(10% 0, 100% 0, 100% 100%, 10% 100%, 0% 50%)",
                }}
              ></div>

              {/* Image */}
              <div
                className="absolute inset-0 left-2 bg-gray-200 rounded-r-3xl overflow-hidden"
                style={{
                  clipPath:
                    "polygon(10% 0, 100% 0, 100% 100%, 10% 100%, 0% 50%)",
                }}
              >
                <Image
                  src="/images/sections-images/local-expertise-section.webp"
                  alt="Driveway Pavers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <CtaButton
            className="h-[52px] px-8 text-base font-bold tracking-wide"
          />
        </div>
      </div>
    </section>
  );
}
