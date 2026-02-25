"use client";

import React from "react";
import Image from "next/image";
import { ComparisonSlider } from "@/presentation/components/atoms/ui/comparison-slider";
import { CtaButton } from "@/presentation/components/molecules/common/CtaButton";

export const PaversVsConcreteSection = () => {
  return (
    <section id="pavers-vs-concrete" className="py-10 sm:py-14 md:py-20 bg-white">
      <div className="section-container flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
        <h2 className="text-foreground text-2xl sm:text-3xl font-black font-red-hat uppercase leading-tight tracking-wide text-center">
          PAVERS VS CONCRETE
        </h2>

        <div className="w-full flex flex-col lg:flex-row justify-start items-center gap-8 md:gap-12 lg:gap-16 xl:gap-24">
          {/* Text Content */}
          <div className="w-full lg:w-105 xl:w-125 flex flex-col justify-center items-start gap-8">
            <div className="flex flex-col justify-start items-start gap-4">
              <h3 className="text-foreground text-xl font-bold font-red-hat uppercase leading-tight tracking-tight">
                Why Choose Pavers Over Concrete?
              </h3>
              <div className="text-muted-foreground text-base font-normal font-rubik leading-6">
                <p>
                  Enhance your outdoor living space with the superior durability
                  and aesthetic appeal of pavers. Unlike concrete, which can
                  crack and stain over time, pavers offer a long-lasting
                  solution that withstands the elements.
                </p>
                <br />
                <p>
                  With a variety of styles and colors, you can create a custom
                  look that complements your home perfectly.
                </p>
              </div>
              <div>
                <span className="text-primary text-base font-bold font-rubik leading-6">
                  Authorized QUIKRETE&reg; Dealer &amp; Contractor
                </span>
                <span className="text-muted-foreground text-base font-normal font-rubik leading-6">
                  {" "}
                  &ndash; delivering durable results backed by one of
                  America&apos;s most trusted brands.
                </span>
              </div>
            </div>

            <CtaButton />
          </div>

          {/* Comparison Slider with Detail Images */}
          <div className="flex-1 w-full relative">
            {/* Comparison Slider */}
            <ComparisonSlider
              beforeImage="/images/sections-images/patio-pavers-1-before-1.png"
              afterImage="/images/sections-images/patio-pavers-1-after-1.webp"
              beforeLabel="Concrete"
              afterLabel="Pavers"
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[420px] rounded-xl"
            />

            {/* Concrete floor — left side, vertically centered */}
            <div className="absolute left-0 top-1/2 -translate-y-1/3 -translate-x-1/2 z-10 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 overflow-hidden hidden md:block">
              <Image
                src="/images/sections-images/difference-section-concrete-floor.png"
                alt="Concrete floor texture"
                fill
                sizes="(max-width: 768px) 224px, 288px"
                quality={90}
                className="object-cover grayscale"
              />
            </div>

            {/* Pavers floor — right side, vertically centered */}
            <div className="absolute right-0 top-1/2 -translate-y-1/3 translate-x-1/2 z-10 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 overflow-hidden hidden md:block">
              <Image
                src="/images/sections-images/difference-section-pavers-floor.png"
                alt="Paver floor texture"
                fill
                sizes="(max-width: 768px) 224px, 288px"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
