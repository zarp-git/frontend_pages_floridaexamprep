"use client";

import React from "react";
import Image from "next/image";
import { CtaButton } from "@/presentation/components/molecules/common/CtaButton";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function CtaSection() {
  return (
    <section id="cta" className="py-10 sm:py-14 md:py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="section-container">
        {/* ── Card wrapper (relative for the absolute image) ── */}
        <div className="relative">
          {/* ── Dark card with texture ── */}
          <div
            className="relative rounded-3xl px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-16 lg:py-20 flex flex-col justify-center items-center sm:items-start gap-6 sm:gap-8 overflow-hidden border border-zinc-500/20"
            style={{
              boxShadow:
                "0px 4px 9px 0px rgba(0,0,0,0.05), 0px 17px 17px 0px rgba(0,0,0,0.04), 0px 37px 22px 0px rgba(0,0,0,0.03), 0px 67px 27px 0px rgba(0,0,0,0.01)",
            }}
          >
            {/* Background texture layer */}
            <Image
              src="/images/pavers-pattern-texture.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover pointer-events-none"
              aria-hidden="true"
              priority={false}
            />

            {/* ── Text content ── */}
            <div className="relative z-10 max-w-full sm:max-w-xl md:max-w-sm lg:max-w-2xl text-center sm:text-left">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold font-rubik leading-snug md:leading-10">
                Your neighbors already upgraded.
                <br />
                <span className="font-normal">
                  Get a free, no-pressure quote
                  <br className="hidden md:block" />
                  and see what&apos;s possible for your home.
                </span>
              </h2>
            </div>

            {/* ── Mobile image (inside the card) ── */}
            <div className="relative z-10 w-full h-48 sm:h-56 rounded-2xl overflow-hidden md:hidden">
              <Image
                src="/images/sections-images/cta-section-placing-a-paver.jpg"
                alt="Placing a paver brick during installation"
                fill
                sizes="(max-width: 768px) 100vw, 0px"
                className="object-cover"
              />
            </div>

            {/* ── CTA Button ── */}
            <CtaButton
              label="BOOK A FREE CONSULTATION"
              variant="brick-outline"
              className="relative z-10 h-12 px-6 sm:px-8 py-4 rounded-lg border-2 border-white bg-transparent text-white hover:bg-white/10 w-full sm:w-auto"
            />
          </div>

          {/* ── Desktop absolute image (right side) ── */}
          <div className="hidden md:block absolute right-4 lg:right-6 xl:right-12 -top-8 bottom-0 w-56 lg:w-80 xl:w-96">
            <div className="relative h-full w-full">
              <Image
                src="/images/sections-images/cta-section-placing-a-paver.jpg"
                alt="Placing a paver brick during installation"
                fill
                sizes="(max-width: 768px) 0px, (max-width: 1024px) 224px, 384px"
                className="object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
