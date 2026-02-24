"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";

const TESTIMONIAL_IMAGES = [
  "/images/social/imagewhatsone.png",
  "/images/social/imagewhatstwo.png",
  "/images/social/imagewhatsthree.png",
  "/images/social/imagewhatsfour.png",
  "/images/social/imageswhatsfive.png",
];

export default function ScreenshotsTestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? TESTIMONIAL_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === TESTIMONIAL_IMAGES.length - 1 ? 0 : prev + 1));
  };

  // Get 5 images starting from startIndex (with wrapping)
  const getVisibleImages = () => {
    const images = [];
    for (let i = 0; i < 5; i++) {
      const index = (startIndex + i) % TESTIMONIAL_IMAGES.length;
      images.push(TESTIMONIAL_IMAGES[index]);
    }
    return images;
  };

  const visibleImages = getVisibleImages();

  // Different styles for each position
  const getImageStyle = (position: number) => {
    const styles = [
      { width: 240, height: 400, rotation: -8, scale: 0.85, zIndex: 1 },
      { width: 260, height: 440, rotation: -4, scale: 0.92, zIndex: 2 },
      { width: 280, height: 480, rotation: 0, scale: 1, zIndex: 3 }, // Center
      { width: 260, height: 440, rotation: 4, scale: 0.92, zIndex: 2 },
      { width: 240, height: 400, rotation: 8, scale: 0.85, zIndex: 1 },
    ];
    return styles[position];
  };

  return (
    <section className="w-full py-20 bg-zinc-100 flex flex-col justify-center items-center gap-8 overflow-hidden">
      {/* Chip */}
      <div className="px-4 py-1.5 rounded-full border border-gray-700 backdrop-blur-sm">
        <span className="text-gray-600 text-base font-medium font-rubik uppercase leading-8">
          They Passed, You Can Too
        </span>
      </div>

      {/* Heading */}
      <div className="flex flex-col justify-start items-center gap-3 px-4">
        <h2 className="w-full max-w-[792px] text-center text-gray-800 text-3xl font-bold font-red-hat-display uppercase leading-[63px]">
          TESTIMONIALS FROM LICENSED PROFESSIONALS
        </h2>
        <p className="text-center text-gray-800 text-xl font-normal font-rubik leading-8">
          These and over 150 other students have already passed the exam
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full h-[520px] flex items-center justify-center">
        {/* Navigation Buttons - Outside */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 rounded-full flex justify-center items-center hover:bg-gray-800 hover:scale-110 transition-all z-30 shadow-lg"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        {/* Images Row */}
        <div className="relative flex justify-center items-center gap-4">
          {visibleImages.map((image, index) => {
            const style = getImageStyle(index);
            return (
              <div
                key={`${image}-${index}`}
                className="relative flex-shrink-0 transition-all duration-700 ease-out"
                style={{
                  width: `${style.width}px`,
                  height: `${style.height}px`,
                  transform: `rotate(${style.rotation}deg) scale(${style.scale})`,
                  zIndex: style.zIndex,
                }}
              >
                <Image
                  src={image}
                  alt={`Testimonial ${index + 1}`}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 rounded-full flex justify-center items-center hover:bg-gray-800 hover:scale-110 transition-all z-30 shadow-lg"
          aria-label="Next slide"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>

        {/* Left Gradient Overlay */}
        <div className="absolute left-0 top-0 w-80 h-full bg-gradient-to-r from-zinc-100 via-zinc-100/50 to-transparent pointer-events-none z-10" />
        
        {/* Right Gradient Overlay */}
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-zinc-100 via-zinc-100/50 to-transparent pointer-events-none z-10" />
      </div>

      {/* CTA Button */}
      <PrimaryButton 
        variant="blue" 
        size="lg"
        icon={<ArrowUpRight className="w-5 h-5" />}
        iconPosition="right"
      >
        get THAT +90 GRADE now
      </PrimaryButton>
    </section>
  );
}
