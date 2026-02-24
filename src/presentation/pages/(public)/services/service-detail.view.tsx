"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/presentation/components/atoms/ui/button";
import AccordionItem from "@/presentation/components/atoms/ui/accordion-item";
import {
  RiPhoneLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightLine,
  RiMapPinLine,
  RiTeamLine,
  RiShieldCheckLine,
  RiStarLine,
  RiToolsLine,
  RiPaletteLine,
} from "@remixicon/react";
import { SERVICES_DATA, SERVICE_SIDEBAR_INFO } from "@/constants/services";
import { FOOTER_COMPANY_INFO } from "@/constants/footer";
import { useLeadModal } from "@/hooks/use-lead-modal";
import type {
  ServiceData,
  ServiceFeature,
  ServiceStat,
} from "@/types/service.type";

// ---------------------------------------------------------------------------
// Feature icons mapping
// ---------------------------------------------------------------------------
const FEATURE_ICONS: Record<string, React.ElementType> = {
  "Make It Simple": RiToolsLine,
  "Affordable Plans": RiShieldCheckLine,
  "Unique Work": RiPaletteLine,
  "Expert Design": RiStarLine,
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface ServiceDetailViewProps {
  service: ServiceData;
}

// ===========================================================================
// Root view
// ===========================================================================
export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <main>
      <ServiceHero service={service} />
      <ServiceContentSection service={service} />
      <ServiceFeaturesSection features={service.features} />
      <ServiceFaqSection service={service} />
      <ServiceCta serviceTitle={service.title} />
    </main>
  );
}

// ===========================================================================
// 1 -- Hero Banner
// ===========================================================================
function ServiceHero({ service }: { service: ServiceData }) {
  const { openModal } = useLeadModal();

  return (
    <section
      id="service-hero"
      className="relative min-h-[480px] lg:min-h-[560px] flex flex-col justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={service.heroImage}
        alt={service.title}
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
          {service.heroSubtitle}
        </p>

        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold font-hanken uppercase leading-tight max-w-4xl">
          {service.title}
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
          <span className="text-neutral-400 font-rubik">Services</span>
          <RiArrowRightLine className="size-4 text-secondary" />
          <span className="text-white font-rubik">
            {service.breadcrumbLabel}
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
// 2 -- Content Section (two-column: gallery + text | sidebar)
// ===========================================================================
function ServiceContentSection({ service }: { service: ServiceData }) {
  return (
    <section id="service-content" className="py-14 lg:py-20 bg-gray-50">
      <div className="section-container flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* -- Left column: Gallery + Text -- */}
        <div className="flex-1 min-w-0 flex flex-col gap-10">
          <ServiceGallery
            images={service.galleryImages}
            title={service.title}
          />
          <ServiceTextContent service={service} />

          {/* Stats inline */}
          {service.stats.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {service.stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          )}
        </div>

        {/* -- Right column: Sidebar -- */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-8">
          <ServiceNavSidebar currentSlug={service.slug} />
          <WhoWeAreCard />
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// 2a -- Image Gallery (carousel)
// ===========================================================================
function ServiceGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)),
    [images.length],
  );

  const next = useCallback(
    () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)),
    [images.length],
  );

  if (images.length === 0) return null;

  return (
    <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden group shadow-lg">
      {/* Current image */}
      <Image
        src={images[current]}
        alt={`${title} gallery image ${current + 1}`}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover transition-transform duration-700"
      />

      {/* Bottom gradient for dot visibility */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
          >
            <RiArrowLeftSLine className="size-6 text-gray-700" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
          >
            <RiArrowRightSLine className="size-6 text-gray-700" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300 cursor-pointer",
                  idx === current
                    ? "w-6 h-2.5 bg-white shadow-sm"
                    : "size-2.5 bg-white/50 hover:bg-white/75",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ===========================================================================
// 2b -- Text content
// ===========================================================================
function ServiceTextContent({ service }: { service: ServiceData }) {
  return (
    <article className="flex flex-col gap-5">
      <h2 className="text-gray-800 text-xl md:text-2xl lg:text-3xl font-bold font-hanken leading-tight uppercase">
        {service.content.heading}
      </h2>
      {service.content.paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-gray-700 text-base font-normal font-rubik leading-7"
        >
          {p}
        </p>
      ))}
    </article>
  );
}

// ===========================================================================
// 2c -- Stat cards (inline, under text)
// ===========================================================================
function StatCard({ stat }: { stat: ServiceStat }) {
  const percentage = parseInt(stat.value, 10);

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex-1 min-w-56">
      {/* Circular progress */}
      <div className="relative size-16 shrink-0">
        <svg className="size-16 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-gray-800 text-sm font-bold font-rubik">
          {stat.value}
        </span>
      </div>
      <span className="text-gray-900 text-sm font-bold font-hanken uppercase leading-tight">
        {stat.label}
      </span>
    </div>
  );
}

// ===========================================================================
// 2d -- Service Navigation Sidebar
// ===========================================================================
function ServiceNavSidebar({ currentSlug }: { currentSlug: string }) {
  const { openModal } = useLeadModal();

  return (
    <nav className="flex flex-col gap-2" aria-label="Services navigation">
      <p className="text-sm font-rubik text-gray-500 uppercase tracking-[2px] mb-1">
        Our Services
      </p>
      {SERVICES_DATA.map((s) => {
        const isActive = s.slug === currentSlug;
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className={cn(
              "w-full px-4 py-3 rounded-lg text-sm font-semibold font-rubik uppercase tracking-wider transition-all duration-200",
              isActive
                ? "bg-primary text-white shadow-md"
                : "bg-transparent border border-gray-200 text-secondary hover:bg-secondary/5 hover:border-secondary/30",
            )}
          >
            {s.title}
          </Link>
        );
      })}

      {/* Contact US button */}
      <button
        onClick={openModal}
        className="w-full mt-1 px-4 py-3 bg-secondary rounded-lg text-center text-white text-sm font-semibold font-rubik uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors cursor-pointer"
      >
        <RiPhoneLine className="size-4" />
        Contact Us
      </button>
    </nav>
  );
}

// ===========================================================================
// 2e -- Who We Are card
// ===========================================================================
function WhoWeAreCard() {
  return (
    <div className="p-6 bg-primary rounded-xl flex flex-col items-center gap-4 text-center shadow-md">
      <div className="size-14 rounded-full bg-white/10 flex items-center justify-center">
        <RiTeamLine className="size-7 text-white" />
      </div>

      <h3 className="text-white text-lg font-semibold font-hanken uppercase">
        {SERVICE_SIDEBAR_INFO.title}
      </h3>

      <p className="text-neutral-100 text-sm font-normal font-rubik leading-6">
        {SERVICE_SIDEBAR_INFO.description}
      </p>
    </div>
  );
}

// ===========================================================================
// 3 -- Features Section (styled cards with icons)
// ===========================================================================
function ServiceFeaturesSection({ features }: { features: ServiceFeature[] }) {
  return (
    <section id="service-features" className="py-14 lg:py-20 bg-white">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold font-hanken text-gray-800 uppercase mb-3">
            Why Choose AllBrick Pavers
          </h2>
          <p className="text-gray-600 text-base font-rubik leading-7 max-w-2xl mx-auto">
            We combine expert craftsmanship with premium materials to deliver
            outdoor spaces that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: ServiceFeature }) {
  const Icon = FEATURE_ICONS[feature.title] ?? RiStarLine;

  return (
    <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center gap-4 border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5">
      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="size-6 text-primary" />
      </div>

      <h3 className="text-gray-900 text-base font-bold font-hanken uppercase leading-5">
        {feature.title}
      </h3>
      <div className="flex flex-col gap-1">
        <span className="text-secondary text-sm font-semibold font-rubik">
          {feature.subtitle}
        </span>
        <p className="text-gray-600 text-sm font-rubik leading-5">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

// ===========================================================================
// 4 -- FAQ Section (two-column layout)
// ===========================================================================
function ServiceFaqSection({ service }: { service: ServiceData }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { openModal } = useLeadModal();

  const handleToggle = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="service-faqs" className="py-14 lg:py-20 bg-gray-50">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left: heading + image */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-secondary">
                <RiMapPinLine className="size-5" />
                <span className="text-sm font-rubik uppercase tracking-[2px] font-medium">
                  {service.title}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold font-hanken text-gray-800 uppercase">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-base font-rubik leading-7">
                Get answers to the most common questions about our{" "}
                {service.title.toLowerCase()} services.
              </p>
            </div>

            {/* Feature image */}
            <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-md">
              <Image
                src={service.galleryImages[0] || service.heroImage}
                alt={`${service.title} showcase`}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: FAQ accordion */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <div className="flex flex-col">
              {service.faqs.map((faq, index) => (
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
// 5 -- CTA Close
// ===========================================================================
function ServiceCta({ serviceTitle }: { serviceTitle: string }) {
  const { openModal } = useLeadModal();

  return (
    <section id="service-cta" className="py-14 lg:py-20 bg-gray-50">
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

          {/* Absolute image (right side) */}
          <div className="hidden lg:block absolute right-6 xl:right-12 -top-8 bottom-0 w-72 xl:w-80 z-10">
            <div className="relative h-full w-full">
              <Image
                src="/images/sections-images/cta-section-placing-a-paver.jpg"
                alt="Placing a paver brick during installation"
                fill
                sizes="(max-width: 1024px) 0px, 320px"
                className="object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 flex flex-col items-start gap-6">
            <h2 className="text-white text-2xl md:text-3xl font-semibold font-rubik leading-tight md:leading-10 max-w-lg">
              Ready to Start Your {serviceTitle} Project?{" "}
              <span className="font-normal">
                Contact us for a free consultation
              </span>
            </h2>

            <Button
              variant="brick-outline"
              size="lg"
              className="h-12 px-8 py-4 rounded-lg border-2 border-white bg-transparent text-white hover:bg-white/10 flex items-center gap-4"
              onClick={openModal}
            >
              <span className="uppercase text-base font-medium">
                book a free consultation
              </span>
              <RiPhoneLine className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
