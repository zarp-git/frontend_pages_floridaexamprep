"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/presentation/components/atoms/ui/button";
import AccordionItem from "@/presentation/components/atoms/ui/accordion-item";
import {
  RiPhoneLine,
  RiArrowRightLine,
  RiMapPinLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import { LOCATIONS_DATA } from "@/constants/locations";
import { FOOTER_COMPANY_INFO } from "@/constants/footer";
import { useLeadModal } from "@/hooks/use-lead-modal";
import type {
  LocationData,
  LocationServiceBlock,
  LocationServedArea,
} from "@/types/location.type";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface LocationDetailViewProps {
  location: LocationData;
}

// ===========================================================================
// Root view
// ===========================================================================
export function LocationDetailView({ location }: LocationDetailViewProps) {
  return (
    <main>
      <LocationHero location={location} />
      <LocationServiceBlocks
        blocks={location.serviceBlocks}
        cityName={location.title}
      />
      <LocationAboutSection location={location} />
      <LocationFaqSection location={location} />
      <LocationServedAreasSection
        areas={location.servedAreas}
        cityName={location.title}
      />
      <LocationCta cityName={location.title} />
    </main>
  );
}

// ===========================================================================
// 1 — Hero Banner
// ===========================================================================
function LocationHero({ location }: { location: LocationData }) {
  const { openModal } = useLeadModal();

  return (
    <section
      id="location-hero"
      className="relative min-h-[480px] lg:min-h-[560px] flex flex-col justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={location.heroImage}
        alt={`Paver services in ${location.title}, FL`}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-radial-[at_50%_40%] from-black/20 to-black/80" />

      {/* Content */}
      <div className="relative z-10 section-container py-20 lg:py-28 flex flex-col items-center text-center gap-6">
        <p className="text-gray-300 text-sm md:text-base font-rubik uppercase tracking-[3px]">
          {location.heroSubtitle}
        </p>

        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold font-red-hat uppercase leading-tight max-w-4xl">
          {location.heroHeading}
        </h1>

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm"
        >
          <Link
            href="/"
            className="text-neutral-400 hover:text-white transition-colors font-rubik"
          >
            AllBrick Pavers
          </Link>
          <RiArrowRightLine className="size-4 text-secondary" />
          <span className="text-neutral-400 font-rubik">Locations</span>
          <RiArrowRightLine className="size-4 text-secondary" />
          <span className="text-white font-rubik">
            {location.breadcrumbLabel}
          </span>
        </nav>

        {/* CTA */}
        <Button
          variant="brick"
          size="lg"
          className="mt-2 h-12 px-8 py-4 rounded-lg flex items-center gap-4"
          onClick={openModal}
        >
          <span className="uppercase text-base font-medium">
            get a free consultation
          </span>
          <RiPhoneLine className="size-5" />
        </Button>
      </div>
    </section>
  );
}

// ===========================================================================
// 2 — Alternating Service Blocks (Perfect Pavers inspired)
// ===========================================================================
function LocationServiceBlocks({
  blocks,
  cityName,
}: {
  blocks: LocationServiceBlock[];
  cityName: string;
}) {
  return (
    <section id="location-services" className="py-14 lg:py-20 bg-gray-50">
      <div className="section-container flex flex-col gap-16 lg:gap-24">
        {blocks.map((block, index) => (
          <ServiceBlock
            key={block.heading}
            block={block}
            reversed={index % 2 !== 0}
            cityName={cityName}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceBlock({
  block,
  reversed,
  cityName,
}: {
  block: LocationServiceBlock;
  reversed: boolean;
  cityName: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 items-center",
        reversed ? "lg:flex-row-reverse" : "lg:flex-row",
      )}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 relative aspect-4/3 rounded-xl overflow-hidden">
        <Image
          src={block.image}
          alt={`${block.heading}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Text */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-6">
        <h2 className="text-gray-800 text-xl md:text-2xl lg:text-3xl font-bold font-red-hat leading-tight uppercase">
          {block.heading}
        </h2>

        <p className="text-gray-700 text-base font-normal font-rubik leading-7">
          {block.description}
        </p>

        <div>
          <Button
            variant="brick"
            size="default"
            className="h-11 px-6 rounded-lg flex items-center gap-3"
            asChild
          >
            <Link href={block.ctaHref}>
              <span className="uppercase text-sm font-medium">
                {block.ctaLabel}
              </span>
              <RiArrowRightSLine className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// 3 — About the City
// ===========================================================================
function LocationAboutSection({ location }: { location: LocationData }) {
  return (
    <section id="location-about" className="py-14 lg:py-20 bg-white">
      <div className="section-container flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        {/* Image */}
        <div className="w-full lg:w-5/12 relative aspect-4/3 rounded-xl overflow-hidden">
          <Image
            src={location.about.image}
            alt={location.about.heading}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full lg:w-7/12 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-secondary">
            <RiMapPinLine className="size-5" />
            <span className="text-sm font-rubik uppercase tracking-[2px] font-medium">
              Local Presence
            </span>
          </div>

          <h2 className="text-gray-800 text-xl md:text-2xl lg:text-3xl font-bold font-red-hat uppercase leading-tight">
            {location.about.heading}
          </h2>

          <p className="text-gray-700 text-base font-normal font-rubik leading-7">
            {location.about.description}
          </p>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// 4 — FAQ Section
// ===========================================================================
function LocationFaqSection({ location }: { location: LocationData }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { openModal } = useLeadModal();

  const handleToggle = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="location-faqs" className="py-14 lg:py-20 bg-gray-50">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left: heading + locations navigation */}
          <div className="w-full lg:w-5/12 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl lg:text-3xl font-bold font-red-hat text-gray-800 uppercase">
                Common Questions From {location.title} Homeowners
              </h2>
              <p className="text-gray-600 text-base font-rubik leading-7">
                Get answers to the most frequent questions about our services in{" "}
                {location.title}, FL.
              </p>
            </div>

            {/* Locations navigation */}
            <nav
              className="flex flex-col gap-2"
              aria-label="Locations navigation"
            >
              <p className="text-sm font-rubik text-gray-500 uppercase tracking-[2px] mb-1">
                Other Locations
              </p>
              {LOCATIONS_DATA.filter((l) => l.slug !== location.slug).map(
                (l) => (
                  <Link
                    key={l.slug}
                    href={`/locations/${l.slug}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-secondary text-sm font-semibold font-rubik uppercase tracking-wider hover:bg-secondary/5 hover:border-secondary/30 transition-all duration-200"
                  >
                    <RiMapPinLine className="size-4 shrink-0" />
                    {l.title}, FL
                  </Link>
                ),
              )}
            </nav>
          </div>

          {/* Right: FAQ accordion */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <div className="flex flex-col">
              {location.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button
                variant="brick"
                size="lg"
                className="h-12 px-8 py-4 rounded-lg flex items-center gap-4"
                onClick={openModal}
              >
                <span className="uppercase text-base font-medium">
                  get a free quote
                </span>
                <RiPhoneLine className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// 5 — Served Areas
// ===========================================================================
function LocationServedAreasSection({
  areas,
  cityName,
}: {
  areas: LocationServedArea[];
  cityName: string;
}) {
  return (
    <section id="location-served-areas" className="py-14 lg:py-20 bg-white">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold font-red-hat text-gray-800 uppercase mb-3">
            Proudly Serving {cityName} & Surrounding Areas
          </h2>
          <p className="text-gray-600 text-base font-rubik leading-7 max-w-2xl mx-auto">
            We bring expert paver installation and outdoor living design to
            neighborhoods across Central Florida. Wherever you call home,
            AllBrick Pavers is here to help.
          </p>
        </div>

        {/* Area cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area) => (
            <ServedAreaCard key={area.title} area={area} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServedAreaCard({ area }: { area: LocationServedArea }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <h3 className="text-gray-900 text-lg font-semibold font-red-hat uppercase mb-4">
        {area.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {area.cities.map((city) => (
          <span
            key={city}
            className="px-3 py-1.5 bg-white rounded-lg text-sm font-rubik text-gray-700 border border-gray-200"
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}

// ===========================================================================
// 6 — CTA Close
// ===========================================================================
function LocationCta({ cityName }: { cityName: string }) {
  const { openModal } = useLeadModal();

  return (
    <section id="location-cta" className="py-14 lg:py-20 bg-gray-50">
      <div className="section-container">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background texture */}
          <Image
            src="/images/pavers-pattern-texture.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover pointer-events-none"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 flex flex-col items-center text-center gap-6">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold font-red-hat uppercase leading-tight max-w-3xl">
              Let&apos;s Start Your Project in {cityName}
            </h2>

            <p className="text-neutral-300 text-base md:text-lg font-rubik leading-7 max-w-xl">
              AllBrick Pavers creates welcoming outdoor living spaces through
              expert design, skilled installation, and attentive service. Your
              outdoor retreat is just a conversation away.
            </p>

            <Button
              variant="brick-outline"
              size="lg"
              className="h-12 px-8 py-4 rounded-lg flex items-center gap-4 mt-2 border-white text-white hover:bg-white/10"
              onClick={openModal}
            >
              <span className="uppercase text-base font-medium">
                get a free consultation
              </span>
              <RiPhoneLine className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
