"use client";

import React from "react";
import { Button } from "@/presentation/components/atoms/ui/button";
import NextImage from "next/image";
import { CtaButton } from "@/presentation/components/molecules/common/CtaButton";

export default function IntroSection() {
  return (
    <section data-layer="section" className="py-10 sm:py-14 md:py-20 bg-white">
      <div className="section-container flex flex-col justify-center items-center gap-6 sm:gap-8">
        <div
          data-layer="div flex-col md:flex-row"
          className="self-stretch flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12"
        >
          {/* Image */}
          <div className="flex-1 w-full md:w-auto h-56 sm:h-64 md:h-80 relative rounded-[20px] overflow-hidden">
            <NextImage
              data-layer="cracked-pavers"
              className="object-cover"
              src="/images/sections-images/cracked-pavers.jpg"
              alt="Cracked pavers example"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Content */}
          <div
            data-layer="div"
            className="flex-1 inline-flex flex-col justify-start items-start gap-7"
          >
            <div
              data-layer="text"
              className="self-stretch flex flex-col justify-start items-start gap-8"
            >
              <h2
                data-layer="DO ANY OF THESE SOUND FAMILIAR?"
                className="justify-center text-gray-800 text-2xl sm:text-3xl font-extrabold font-hanken uppercase leading-tight tracking-wide"
              >
                DO ANY OF THESE SOUND FAMILIAR?
              </h2>
              <div
                data-layer="Fear the work will be uneven or sink within months..."
                className="self-stretch justify-center text-gray-600 text-base font-normal font-rubik leading-6"
              >
                <span>Fear the work will be </span>
                <span className="font-semibold">uneven or sink </span>
                <span>
                  within months.
                  <br />
                  Price that skyrockets mid-project or endless{" "}
                </span>
                <span className="font-semibold">"extra" charges</span>
                <span>
                  .<br />
                  Contractor who{" "}
                </span>
                <span className="font-semibold">
                  disappears, delays, or abandons
                </span>
                <span> the job halfway.</span>
              </div>
              <div
                data-layer="Let us transform your outdoor space..."
                className="self-stretch justify-center text-gray-600 text-base font-normal font-rubik leading-6"
              >
                Let us transform your outdoor space with quality paving. <br />
                Contact us now and take the first step.
              </div>
            </div>

            <div
              data-layer="Frame 2095585693"
              className="inline-flex flex-wrap justify-start items-start gap-4"
            >
              <CtaButton />

              <Button
                data-layer="PrimaryButton"
                data-color="gradient"
                data-icon="OFF"
                data-size="lg"
                data-type="secondary"
                variant="brick-outline"
                className="h-12 px-8 py-4 rounded-lg flex justify-center items-center gap-4 text-base font-medium font-rubik uppercase"
              >
                gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
