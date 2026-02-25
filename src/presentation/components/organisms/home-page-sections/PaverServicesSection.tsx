"use client";

import React from "react";
import Image from "next/image";
import { CyclingText } from "@/presentation/components/molecules/common/CyclingText";
import { CtaButton } from "@/presentation/components/molecules/common/CtaButton";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const CITIES = [
  "Lakeland",
  "Winter Haven",
  "Haines City",
  "Davenport",
  "Auburndale",
  "Horizon West",
];

const SERVICES: ServiceItem[] = [
  {
    title: "Driveway Pavers",
    description:
      "Weather-resistant installations that combat Lakeland's summer storms and prevent erosion.",
    image: "/images/sections-images/driveway-pavers-2-after.webp",
  },
  {
    title: "Patio & Pool Deck Pavers",
    description:
      "Design entertainment spaces perfect for Winter Haven lakeside homes or Horizon West resorts.",
    image: "/images/sections-images/pool-deck-after.jpg",
  },
  {
    title: "Paver Repair",
    description:
      "Fix sunken/cracked pavers in Lakeland neighborhoods and Auburndale commercial properties.",
    image: "/images/sections-images/cracked-pavers.jpg",
  },
  {
    title: "Maintenance Plans",
    description:
      "Protect your investment against Central Florida sun, rain, and humidity year-round.",
    image: "/images/sections-images/patio-pavers-5.webp",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function PaverServicesSection() {
  return (
    <section id="paver-services" className="py-10 sm:py-14 lg:py-20 bg-gray-50">
      <div className="section-container flex flex-col justify-center items-center gap-6 sm:gap-8">
        {/* ── Heading ── */}
        <div className="flex flex-col justify-start items-center gap-2.5 text-center">
          <h2 className="text-gray-800 text-2xl md:text-3xl font-black font-red-hat uppercase leading-tight tracking-wide">
            Paver Services Designed for{" "}
            <CyclingText
              items={CITIES}
              className="text-primary"
              interval={2500}
              direction="up"
            />{" "}
            Homes &amp; Businesses
          </h2>
          <p className="text-gray-600 text-base font-normal font-rubik leading-6 max-w-xl">
            We create outdoor living spaces that thrive in Florida&apos;s unique
            conditions:
          </p>
        </div>

        {/* ── Service Cards Grid ── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* ── CTA Button ── */}
        <CtaButton />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ServiceCard
// ---------------------------------------------------------------------------
function ServiceCard({ title, description, image }: ServiceItem) {
  return (
    <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 pt-5 sm:pt-7 pb-3 sm:pb-4 bg-neutral-700/90 backdrop-blur-xs flex flex-col justify-start items-start gap-1.5 sm:gap-2.5">
        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-medium font-red-hat capitalize leading-6">
          {title}
        </h3>
        <p className="text-white text-sm md:text-base font-normal font-rubik leading-6">
          {description}
        </p>
      </div>
    </div>
  );
}
