"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";
import { CyclingText } from "@/presentation/components/molecules/common/CyclingText";
import { CtaButton } from "@/presentation/components/molecules/common/CtaButton";

const CITIES = [
  "WINTER HAVEN",
  "LAKELAND",
  "HAINES CITY",
  "DAVENPORT",
  "AUBURNDALE",
  "HORIZON WEST",
];

const SERVICES = [
  "PAVERS INSTALLATION",
  "PAVERS REPAIR",
  "PAVERS MAINTENANCE",
  "PATIO PAVERS",
  "POOL DECKS PAVERS",
  "DRIVEWAY PAVERS",
  "FIREPIT PAVERS",
];

const CAROUSEL_IMAGES = [
  {
    src: "/images/sections-images/pool-deck-after.jpg",
    label: "Pool Deck",
    id: 1,
  },
  {
    src: "/images/sections-images/driveway-pavers-1-after.webp",
    label: "Driveway Pavers",
    id: 2,
  },
  {
    src: "/images/sections-images/difference-section-driveway-paver-ours.webp",
    label: "Patio Pavers",
    id: 3,
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const handleNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % CAROUSEL_IMAGES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isAutoPlay, handleNext]);

  // Pause autoplay on interaction
  const pauseAutoPlay = () => setIsAutoPlay(false);
  const resumeAutoPlay = () => setIsAutoPlay(true);

  // Helper to get visual position relative to active index (-1, 0, 1)
  const getSlideStyles = (index: number) => {
    const total = CAROUSEL_IMAGES.length;
    // Calculate distance accounting for wrap-around
    let offset = (index - activeIndex + total) % total;
    if (offset > total / 2) offset -= total;

    // We only really care about -1 (Left), 0 (Center), and 1 (Right)
    const isCenter = offset === 0;
    const isLeft = offset === -1 || offset === total - 1;

    if (isCenter) {
      return {
        zIndex: 20,
        opacity: 1,
        width: "100%",
        height: "100%",
        transform: "translateX(0)",
        filter: "blur(0px)",
        pointerEvents: "auto" as const,
      };
    } else if (isLeft) {
      return {
        zIndex: 10,
        opacity: 0.6,
        width: "295px",
        maxWidth: "40vw",
        height: "228px",
        maxHeight: "35vw",
        top: "50%",
        left: "50%",
        transform: "translate(-135%, -50%)",
        filter: "blur(1px)",
        pointerEvents: "none" as const,
      };
    } else {
      // Right
      return {
        zIndex: 10,
        opacity: 0.6,
        width: "295px",
        maxWidth: "40vw",
        height: "228px",
        maxHeight: "35vw",
        top: "50%",
        left: "50%",
        transform: "translate(35%, -50%)",
        filter: "blur(1px)",
        pointerEvents: "none" as const,
      };
    }
  };

  return (
    <section
      className="relative w-full min-h-svh flex flex-col justify-center overflow-hidden pt-20 pb-12 sm:pt-0 sm:pb-16 md:pb-20"
      style={{
        background:
          "radial-gradient(277.91% 109.76% at 63.33% 38.87%, #FFF 0%, #D9D9D9 100%)",
      }}
    >
      <div className="section-container relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-0">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start gap-4 md:gap-6 relative z-30">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
            <span className="bg-[#dcfce7] text-[#064e3b] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              News
            </span>
            <span className="text-gray-600 text-xs font-medium pr-2">
              OUR WEBSITE WITH A FRESH NEW LOOK
            </span>
          </div>

          {/* Heading */}
          <h1 className="h1 text-gray-900 text-center lg:text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            The Best Specialists for{" "}
            <span className="text-primary block">
              <CyclingText items={SERVICES} interval={3000} direction="up" />
            </span>
            in{" "}
            <CyclingText
              items={CITIES}
              className="text-gray-900"
              interval={2500}
              direction="up"
            />
          </h1>

          {/* Description */}
          <p className="text-gray-600 font-rubik text-sm md:text-base lg:text-lg leading-relaxed max-w-md text-center lg:text-left">
            Transforming ordinary outdoor spaces into stunning landscapes that
            last a lifetime. Serving Central Florida homeowners since 2018.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <CtaButton
              className="h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-bold tracking-wide shadow-lg hover:shadow-xl transition-all"
            />
          </div>
        </div>

        {/* Carousel Area */}
        <div
          className="flex-1 w-full max-w-3xl h-[240px] sm:h-[340px] md:h-[400px] lg:h-[450px] relative flex items-center justify-center perspective-1000"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 md:hover:-translate-x-1 active:scale-95 transition-all cursor-pointer text-foreground border border-gray-100"
            aria-label="Previous slide"
          >
            <RiArrowLeftLine className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 md:hover:translate-x-1 active:scale-95 transition-all cursor-pointer text-foreground border border-gray-100"
            aria-label="Next slide"
          >
            <RiArrowRightLine className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Images */}
          <div className="relative w-full max-w-lg h-[200px] sm:h-[300px] md:h-[360px] lg:h-[400px] flex items-center justify-center">
            {CAROUSEL_IMAGES.map((image, index) => {
              const style = getSlideStyles(index);
              const isActive = index === activeIndex;

              return (
                <div
                  key={image.id}
                  className="absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out origin-center"
                  style={style}
                >
                  <div
                    className={cn(
                      "relative w-full h-full rounded-[16px] md:rounded-[24px] overflow-hidden shadow-2xl bg-white transition-all duration-500",
                      isActive
                        ? "border-4 md:border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                        : "border-0 opacity-50 contrast-75 brightness-90 grayscale-[0.3]",
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 534px"
                      className="object-cover"
                      priority={index === 0}
                    />

                    {/* Floating Label - Only on active */}
                    <div
                      className={cn(
                        "absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-500",
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4",
                      )}
                    >
                      <div className="bg-white/90 backdrop-blur text-gray-900 text-[10px] md:text-xs font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-full shadow-lg uppercase tracking-wider border border-white/50">
                        {image.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2 animate-bounce">
        <span className="text-gray-400 font-rubik text-xs md:text-sm">
          Scroll over
        </span>
        <RiArrowDownSLine className="text-gray-400 size-4 md:size-5" />
      </div>
    </section>
  );
}
