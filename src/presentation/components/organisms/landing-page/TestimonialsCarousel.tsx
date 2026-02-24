"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";

const TESTIMONIAL_SCREENSHOTS = [
  "/images/testimonials/screenshots/screenshot-1.jpg",
  "/images/testimonials/screenshots/screenshot-2.jpg",
  "/images/testimonials/screenshots/screenshot-3.jpg",
  "/images/testimonials/screenshots/screenshot-4.jpg",
  "/images/testimonials/screenshots/screenshot-5.jpg",
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIAL_SCREENSHOTS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === TESTIMONIAL_SCREENSHOTS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full max-w-[1440px] py-20 bg-zinc-100">
      <div className="flex flex-col items-center gap-8 px-4 md:px-28">
        {/* Chip */}
        <div className="px-4 py-1.5 bg-gray-400 rounded-full backdrop-blur-sm">
          <span className="text-white text-xl font-medium font-rubik leading-8">
            WE HAVE ALL THE EXPERTISE YOU NEED
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-gray-800 text-3xl font-bold font-rubik uppercase leading-[63px]">
            Testimonials From Licensed Professionals
          </h2>
          <p className="text-center text-gray-800 text-xl font-normal font-rubik leading-8">
            These and over 150 other students have already passed the exam
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-72 h-full bg-gradient-to-r from-zinc-100 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-72 h-full bg-gradient-to-l from-zinc-100 to-transparent z-10 pointer-events-none" />

          {/* Images Container */}
          <div className="flex items-center justify-center gap-8 py-4">
            {TESTIMONIAL_SCREENSHOTS.map((src, index) => {
              const offset = index - currentIndex;
              const isCenter = offset === 0;
              const scale = isCenter ? 1.1 : 0.9;
              const opacity = Math.abs(offset) > 2 ? 0.3 : 1;

              return (
                <div
                  key={index}
                  className="relative flex-shrink-0 transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${offset * -280}px) scale(${scale})`,
                    opacity,
                    zIndex: isCenter ? 20 : 10,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Student testimonial ${index + 1}`}
                    width={isCenter ? 263 : 241}
                    height={isCenter ? 484 : 422}
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] flex justify-between items-center px-4 z-30">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-gray-800/70 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-gray-800/70 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <PrimaryButton 
          variant="blue" 
          size="lg"
          icon={<ArrowUpRight className="w-5 h-5" />}
          iconPosition="right"
        >
          Get That +90 Grade Now
        </PrimaryButton>
      </div>
    </section>
  );
}
