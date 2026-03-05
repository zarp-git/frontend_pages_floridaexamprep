"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";
import { TESTIMONIAL_VIDEOS } from "@/constants/media";
import { PandaVideoPlayer } from "@/presentation/components/molecules/PandaVideoPlayer";

interface Testimonial {
  id: string;
  type: "video" | "written";
  studentName: string;
  examType: string;
  avatar: string;
  image?: string;
  video?: string;
  rating: number;
  text?: string;
}

const TESTIMONIALS: Testimonial[][] = [
  [
    {
      id: "video-1",
      type: "video",
      studentName: "Student Video",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      video: TESTIMONIAL_VIDEOS.VIDEO_0,
      rating: 5,
    },
    {
      id: "2",
      type: "written",
      studentName: "Fred Ludena",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      image:
        "/images/testimonials/screenshots/floridaexamprep_testimonial_danielpryor.jpg",
      rating: 5,
      text: "Today I passed my business and finance exam. Best wishes to everyone else! I watched all the videos, took practice exams multiple times until I was consistently scoring 100%. The course helped me get familiar with navigating each book.",
    },
    {
      id: "video-2",
      type: "video",
      studentName: "Student Video",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      video: TESTIMONIAL_VIDEOS.VIDEO_1,
      rating: 5,
    },
  ],
  [
    {
      id: "4",
      type: "written",
      studentName: "Oryan Grey",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      image:
        "/images/testimonials/screenshots/floridaexamprep_testimonial_oryangrey.jpg",
      rating: 5,
      text: "Passed Business & Finance Exam! I can't thank Cruz enough for his guidance and this amazing course he created! Ended the year right! Happy New Year to you all!",
    },
    {
      id: "video-3",
      type: "video",
      studentName: "Student Video",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      video: TESTIMONIAL_VIDEOS.VIDEO_2,
      rating: 5,
    },
    {
      id: "5",
      type: "written",
      studentName: "Tyler Cook",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      image:
        "/images/testimonials/screenshots/floridaexamprep_testimonial_tylercook.jpg",
      rating: 5,
      text: "Winnnnn! Thanks to Cruz and thanks to this community I have accomplished something I really wanted to leave in 2025 and I did it thanks to everyone! You guys got this!",
    },
  ],
  [
    {
      id: "6",
      type: "written",
      studentName: "Camila Lujan",
      examType: "General Contractor License",
      avatar: "/images/logo/skool-logo.png",
      image:
        "/images/testimonials/screenshots/floridaexamprep_testimonial_camilalujan1.jpg",
      rating: 5,
      text: "Passed all 3! Just finished all 3 of my exams for the GC license. Seriously couldn't have done it without Cruz's course & the community behind it. Would recommend his course to everyone!",
    },
    {
      id: "7",
      type: "written",
      studentName: "Javier Rodriguez",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      image:
        "/images/testimonials/screenshots/floridaexamprep_testimonial_javierrodriguez.jpg",
      rating: 5,
      text: "Passed!! If you're struggling with studying or feel like quitting... don't. I stepped away for almost two months because of personal issues. Came back, finished the remaining chapters, and passed. Grateful for Cruz's help and his CRAM course!",
    },
    {
      id: "video-4",
      type: "video",
      studentName: "Student Video",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      video: TESTIMONIAL_VIDEOS.VIDEO_3,
      rating: 5,
    },
  ],
  [
    {
      id: "video-5",
      type: "video",
      studentName: "Student Video",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      video: TESTIMONIAL_VIDEOS.VIDEO_4,
      rating: 5,
    },
    {
      id: "1",
      type: "written",
      studentName: "Kevin Lopez",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      image:
        "/images/testimonials/screenshots/floridaexamprep_testimonial_kevinlopez.jpg",
      rating: 5,
      text: "PASSED THE BUSINESS AND FINANCE EXAM! Thank you Cruz for this course because it has helped me tremendously!",
    },
    {
      id: "video-6",
      type: "video",
      studentName: "Student Video",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      video: TESTIMONIAL_VIDEOS.VIDEO_5,
      rating: 5,
    },
  ],
  [
    {
      id: "8",
      type: "written",
      studentName: "Joel Kennedy",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      image:
        "/images/testimonials/screenshots/floridaexamprep_testimonial_joelkennedy.jpg",
      rating: 5,
      text: "Passed my Business & Finance exam! The course material was comprehensive and Cruz's teaching style made complex topics easy to understand.",
    },
    {
      id: "video-7",
      type: "video",
      studentName: "Student Video",
      examType: "Business & Finance Exam",
      avatar: "/images/logo/skool-logo.png",
      video: TESTIMONIAL_VIDEOS.VIDEO_6,
      rating: 5,
    },
  ],
];

const ALL_TESTIMONIALS = TESTIMONIALS.flat();

const SLIDE_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const mobileSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: SLIDE_EASE },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: SLIDE_EASE },
  }),
};

/* ── Shared helpers (unchanged) ── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className="w-4 h-4"
          viewBox="0 0 16 16"
          fill={index < rating ? "#EAB308" : "#D1D5DB"}
        >
          <path d="M8 0L10.3511 5.52786L16 6.32295L12 10.2721L12.9443 16L8 13.5279L3.05573 16L4 10.2721L0 6.32295L5.64886 5.52786L8 0Z" />
        </svg>
      ))}
    </div>
  );
}

function BlueCheckmark() {
  return (
    <Image
      src="/images/svg/blue-check.svg"
      alt="Verified"
      width={20}
      height={20}
      className="w-5 h-5"
    />
  );
}

/* ── Desktop card (unchanged) ── */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.type === "video") {
    return (
      <div className="flex-1 min-w-full lg:min-w-0 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col min-h-[220px] sm:min-h-[320px] lg:min-h-[500px]">
        <div className="relative flex-1">
          <PandaVideoPlayer
            src={testimonial.video!}
            className="w-full h-full"
            controls
            muted
            preload="metadata"
            autoPlay={false}
            loop={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-full lg:min-w-0 px-3 pt-3 pb-4 sm:pb-6 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col gap-3 sm:gap-4">
      {testimonial.image && (
        <div className="relative h-64 sm:h-80 md:h-[350px] w-full rounded-lg border border-gray-200 overflow-hidden">
          <Image
            src={testimonial.image}
            alt={`Testimonial from ${testimonial.studentName}`}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 sm:gap-3.5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <Image
              src={testimonial.avatar}
              alt={testimonial.studentName}
              width={48}
              height={48}
              className="rounded-full w-12 h-12 sm:w-16 sm:h-16"
            />
            <div className="absolute -bottom-0.5 -right-0.5">
              <BlueCheckmark />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-0.5 sm:gap-1">
            <p className="text-black text-sm sm:text-base font-normal font-rubik capitalize">
              {testimonial.studentName}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm font-normal font-rubik capitalize">
              {testimonial.examType}
            </p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
      {testimonial.text && (
        <p className="text-neutral-600 text-sm sm:text-base font-normal font-rubik capitalize leading-relaxed">
          {testimonial.text}
        </p>
      )}
    </div>
  );
}

/* ── Mobile carousel slide ── */

function MobileSlide({
  testimonial,
  onVideoPlay,
  onVideoPause,
  onVideoEnd,
}: {
  testimonial: Testimonial;
  onVideoPlay: () => void;
  onVideoPause: () => void;
  onVideoEnd: () => void;
}) {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  if (testimonial.type === "video") {
    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
        <PandaVideoPlayer
          src={testimonial.video!}
          className="w-full h-full"
          controls
          muted
          preload="metadata"
          autoPlay={false}
          loop={false}
          onPlay={onVideoPlay}
          onPause={onVideoPause}
          onEnded={onVideoEnd}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden flex flex-col p-3">
      {testimonial.image && (
        <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden">
          {!mediaLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg z-10" />
          )}
          <Image
            src={testimonial.image}
            alt={`Testimonial from ${testimonial.studentName}`}
            fill
            className="object-cover"
            loading="lazy"
            onLoad={() => setMediaLoaded(true)}
          />
        </div>
      )}
      <div className="shrink-0 pt-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="relative shrink-0">
            <Image
              src={testimonial.avatar}
              alt={testimonial.studentName}
              width={32}
              height={32}
              className="rounded-full w-8 h-8"
            />
            <div className="absolute -bottom-0.5 -right-0.5 scale-75">
              <BlueCheckmark />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-black text-sm font-normal font-rubik capitalize truncate">
              {testimonial.studentName}
            </p>
            <p className="text-gray-400 text-xs font-normal font-rubik capitalize truncate">
              {testimonial.examType}
            </p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
        {testimonial.text && (
          <p className="text-neutral-600 text-xs font-normal font-rubik capitalize leading-relaxed line-clamp-3">
            {testimonial.text}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Mobile carousel controller ── */

function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const totalSlides = ALL_TESTIMONIALS.length;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
  }, [totalSlides, clearTimer]);

  useEffect(() => {
    if (isVideoPlaying) {
      clearTimer();
    } else {
      startTimer();
    }
    return clearTimer;
  }, [isVideoPlaying, startTimer, clearTimer]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsVideoPlaying(false);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setIsVideoPlaying(false);
  }, [totalSlides]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  }, [goNext, goPrev]);

  return (
    <div className="flex-1 min-h-0 relative">
      {/* Arrow buttons */}
      <motion.button
        onClick={goPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-800/80 rounded-full flex justify-center items-center hover:bg-gray-800 transition-colors z-30 shadow-lg cursor-pointer"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-4 h-4 text-white" />
      </motion.button>

      <motion.button
        onClick={goNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-800/80 rounded-full flex justify-center items-center hover:bg-gray-800 transition-colors z-30 shadow-lg cursor-pointer"
        aria-label="Next slide"
      >
        <ArrowRight className="w-4 h-4 text-white" />
      </motion.button>

      {/* Carousel viewport */}
      <div
        className="w-full h-full overflow-hidden flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={mobileSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="h-full aspect-4/5 max-w-full mx-auto"
          >
            <MobileSlide
              testimonial={ALL_TESTIMONIALS[currentIndex]}
              onVideoPlay={() => setIsVideoPlaying(true)}
              onVideoPause={() => setIsVideoPlaying(false)}
              onVideoEnd={() => setIsVideoPlaying(false)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Main component ── */

export default function WrittenTestimonials() {
  const [showAll, setShowAll] = useState(false);
  const visibleRows = showAll ? TESTIMONIALS : TESTIMONIALS.slice(0, 3);

  return (
    <>
      {/* ───── MOBILE: Auto-advancing carousel (< lg) ───── */}
      <section className="lg:hidden w-full max-h-svh h-svh flex flex-col px-4 py-6 bg-white">
        {/* Compact heading */}
        <div className="flex flex-col items-center gap-1 shrink-0 mb-3">
          <h2 className="text-[#002770] text-lg font-extrabold font-red-hat uppercase leading-tight text-center">
            What Our Students Are Talking About Us
          </h2>
          <p className="text-center text-gray-500 text-sm font-normal font-rubik leading-relaxed">
            Real Student Feedback From Our Community
          </p>
        </div>

        {/* Carousel */}
        <MobileCarousel />

        {/* CTA */}
        <div className="shrink-0 mt-3">
          <PrimaryButton
            variant="blue-solid"
            size="lg"
            icon={<ArrowUpRight className="w-5 h-5" />}
            iconPosition="right"
            className="w-full"
          >
            {CTA_TEXT}
          </PrimaryButton>
        </div>
      </section>

      {/* ───── DESKTOP: Original grid layout (>= lg, unchanged) ───── */}
      <section className="hidden lg:block w-full py-12 sm:py-16 md:py-20 bg-white">
        <div className="px-4 md:px-28 max-w-[1440px] mx-auto flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex flex-col items-center gap-2 sm:gap-3 px-2">
            <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
              <span className="text-white text-base sm:text-lg md:text-xl font-medium font-rubik leading-relaxed">
                DON&apos;T TRY IT ALONE
              </span>
            </div>
            <h2 className="text-[#002770] text-xl sm:text-2xl md:text-3xl font-extrabold font-red-hat uppercase leading-tight text-center">
              What Our Students Are Talking About Us
            </h2>
            <p className="text-center text-gray-500 text-base sm:text-lg md:text-xl font-normal font-rubik leading-relaxed">
              Real Student Feedback From Our Community
            </p>
          </div>

          <div className="w-full flex flex-col gap-4 sm:gap-6">
            {visibleRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8"
              >
                {row.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <PrimaryButton
              variant="blue-solid"
              size="lg"
              icon={<ArrowUpRight className="w-5 h-5" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              {CTA_TEXT}
            </PrimaryButton>
            {!showAll && (
              <PrimaryButton
                variant="outline"
                size="lg"
                icon={<MoreHorizontal className="w-5 h-5" />}
                iconPosition="right"
                className="w-full sm:w-auto"
                onClick={() => setShowAll(true)}
              >
                Load More
              </PrimaryButton>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
