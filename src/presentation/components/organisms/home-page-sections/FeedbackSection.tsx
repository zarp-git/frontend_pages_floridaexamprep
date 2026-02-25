"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {
  RiPhoneLine,
  RiArrowRightUpLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";

import { Button } from "@/presentation/components/atoms/ui/button";
import StarRating from "@/presentation/components/atoms/ui/StarRating";
import { SOCIAL_LINKS, CONTACT } from "@/constants";

// ---------------------------------------------------------------------------
// Review data
// ---------------------------------------------------------------------------
interface Review {
  id: number;
  name: string;
  daysAgo: string;
  rating: number;
  serviceTag: string;
  image: string;
  text: string;
}

const DEFAULT_AVATAR = "/images/avatars/default-avatar-profile-picture.svg";

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Liz Pratt",
    daysAgo: "20 days ago",
    rating: 5,
    serviceTag: "Patio Pavers",
    image: "/images/sections-images/patio-pavers-1-after-1.webp",
    text: "We shopped around for months for the best paver company to redo our patio in Providence, Davenport, FL. Through our search we found many scammers and large companies that don't give you the time of day and don't care about your money or the quality. We chose Allbrick Pavers specifically because of all the extra time they spent with us free of charge to help us feel comfortable, understand all of our options thoroughly and worked with our budget without pressure to pick our forever patio.",
  },
  {
    id: 2,
    name: "Doug Wilson",
    daysAgo: "13 days ago",
    rating: 5,
    serviceTag: "Pool Deck",
    image: "/images/sections-images/pool-deck-after.jpg",
    text: "I'm extremely happy with the work Allbrick Pavers did at my home. They re-leveled the travertine pavers around my pool and added a brand-new walkway, and everything turned out absolutely beautiful. The crew was professional, skilled, and clearly knew exactly what they were doing. The job was completed in a timely manner and the craftsmanship was excellent from start to finish. I highly recommend Allbrick Pavers to anyone looking for expert paver work and quality results!",
  },
  {
    id: 3,
    name: "57iglesias",
    daysAgo: "13 days ago",
    rating: 5,
    serviceTag: "Fire Pit",
    image: "/images/sections-images/firepit-pavers-1-after-1.webp",
    text: "I reached out to Allbrick for an expansion of my pavers. They were very professional from the first call throughout the entire process. They were on time, work in a clean and orderly manner. The team works extremely well together. Once completed, they left my front lawn neat and clean. I live in Winter Haven and they provided all the necessary documentation for the HOA approval. Highly recommend this company, they were a pleasure to work with them.",
  },
  {
    id: 4,
    name: "Audania Taylor",
    daysAgo: "15 days ago",
    rating: 5,
    serviceTag: "Patio Pavers",
    image: "/images/sections-images/patio-pavers-2-after-1.webp",
    text: "Look at this! LOOK AT THIS!!! Is this not gorgeous! Rael and his Davenport team meticulously planned, communicated, and completed my back lanai in excellent time. He worked with other contractors for a seamless installation so there were no pauses in the work. ALLBRICK's prices were reasonable and Rael even offered to throw in a fire pit for free (which was appreciated but eventually declined). My husband and I are so happy with the work ALLBRICK did. Highly, HIGHLY recommend!!",
  },
  {
    id: 5,
    name: "Liz Pratt",
    daysAgo: "20 days ago",
    rating: 5,
    serviceTag: "Patio Pavers",
    image: "/images/sections-images/patio-pavers-3-after-1.webp",
    text: "We shopped around for months for the best paver company to redo our patio in Providence, Davenport, FL. Through our search we found many scammers and large companies that don't give you the time of day and don't care about your money or the quality. We chose Allbrick Pavers specifically because of all the extra time they spent with us free of charge to help us feel comfortable, understand all of our options thoroughly and worked with our budget without pressure to pick our forever patio.",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function FeedbackSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="testimonials"
      className="relative py-10 sm:py-14 lg:py-20 bg-white overflow-hidden"
    >
      {/* ── Heading ── */}
      <div className="section-container text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-gray-800 text-2xl md:text-3xl font-black font-red-hat uppercase leading-tight tracking-wide">
          What Customers Are Talking About Our Service
        </h2>
      </div>

      {/* ── Carousel ── */}
      <div className="section-container relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.15}
          loop
          speed={600}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1.8, spaceBetween: 24 },
            768: { slidesPerView: 2.3, spaceBetween: 28 },
            1024: { slidesPerView: 3.2, spaceBetween: 32 },
            1280: { slidesPerView: 3.8, spaceBetween: 32 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="overflow-visible!"
        >
          {REVIEWS.map((review) => (
            <SwiperSlide key={review.id} className="h-auto!">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── Navigation Arrows ── */}
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all -ml-4 lg:-ml-6 hidden sm:flex"
        >
          <RiArrowLeftLine className="size-6 text-gray-700" />
        </button>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all -mr-4 lg:-mr-6 hidden sm:flex"
        >
          <RiArrowRightLine className="size-6 text-gray-700" />
        </button>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="section-container mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Button
          asChild
          variant="brick"
          size="lg"
          className="h-12 px-8 text-base font-medium rounded-lg"
        >
          <Link href={`${CONTACT.phoneHref}`}>
            Contact Us Now
            <RiPhoneLine className="size-5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="brick-outline"
          size="lg"
          className="h-12 px-8 text-base font-medium rounded-lg"
        >
          <Link
            href={SOCIAL_LINKS.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read All Reviews
            <RiArrowRightUpLine className="size-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ReviewCard sub-component
// ---------------------------------------------------------------------------
function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="w-full p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col justify-start items-start gap-3 sm:gap-4 h-full">
      {/* ── Project Image with Service Chip ── */}
      <div className="relative self-stretch h-32 sm:h-40 rounded-md border border-gray-200 overflow-hidden">
        <Image
          src={review.image}
          alt={`${review.serviceTag} project by AllBrick Pavers`}
          fill
          sizes="320px"
          className="object-cover"
        />
        <span className="absolute top-3 left-3 px-3 py-1.5 bg-stone-50/90 backdrop-blur-sm rounded-full border border-gray-200 text-gray-700 text-xs font-medium font-rubik">
          {review.serviceTag}
        </span>
      </div>

      {/* ── Reviewer Info ── */}
      <div className="self-stretch flex flex-col gap-3.5">
        <div className="self-stretch relative flex items-center gap-4">
          {/* Avatar with Google badge */}
          <div className="relative shrink-0">
            <Image
              src={DEFAULT_AVATAR}
              alt={review.name}
              width={48}
              height={48}
              className="size-12 rounded-full object-cover bg-gray-200"
            />
            <div className="absolute -bottom-0.5 -right-0.5 size-6 p-[5px] bg-white rounded-full border border-neutral-100 flex items-center justify-center">
              <Image
                src="/images/svg/google-icon.svg"
                alt="Google"
                width={16}
                height={17}
                className="size-4"
              />
            </div>
          </div>

          {/* Name & date */}
          <div className="flex-1 flex flex-col gap-[5px]">
            <span className="text-black text-base font-normal font-rubik capitalize leading-4">
              {review.name}
            </span>
            <span className="text-gray-400 text-sm font-normal font-rubik capitalize leading-4">
              {review.daysAgo}
            </span>
          </div>
        </div>

        {/* Stars */}
        <StarRating rating={review.rating} size={20} />
      </div>

      {/* ── Review Text ── */}
      <p className="self-stretch text-neutral-600 text-base font-normal font-rubik leading-6">
        {review.text}
      </p>
    </article>
  );
}
