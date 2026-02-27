"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";

const TESTIMONIAL_IMAGES = [
  "/images/social/imagewhatsone.png",
  "/images/social/imagewhatstwo.png",
  "/images/social/imagewhatsthree.png",
  "/images/social/imagewhatsfour.png",
  "/images/social/imageswhatsfive.png",
];

const desktopStyles = [
  { width: 200, height: 340, rotation: -8, scale: 0.85, zIndex: 1 },
  { width: 220, height: 380, rotation: -4, scale: 0.92, zIndex: 2 },
  { width: 240, height: 420, rotation: 0, scale: 1, zIndex: 3 },
  { width: 220, height: 380, rotation: 4, scale: 0.92, zIndex: 2 },
  { width: 200, height: 340, rotation: 8, scale: 0.85, zIndex: 1 },
];

const mobileStyles = [
  { width: 180, height: 300, rotation: -6, scale: 0.85, zIndex: 1 },
  { width: 220, height: 360, rotation: 0, scale: 1, zIndex: 3 },
  { width: 180, height: 300, rotation: 6, scale: 0.85, zIndex: 1 },
];

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

const chipVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

const imageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    scale: 0.9,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
} as const;

export default function ScreenshotsTestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevious = () => {
    setDirection(-1);
    setStartIndex((prev) =>
      prev === 0 ? TESTIMONIAL_IMAGES.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setDirection(1);
    setStartIndex((prev) =>
      prev === TESTIMONIAL_IMAGES.length - 1 ? 0 : prev + 1,
    );
  };

  const getVisibleImages = () => {
    const images = [];
    for (let i = 0; i < 5; i++) {
      const index = (startIndex + i) % TESTIMONIAL_IMAGES.length;
      images.push(TESTIMONIAL_IMAGES[index]);
    }
    return images;
  };

  const visibleImages = getVisibleImages();

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-zinc-100 flex flex-col justify-center items-center gap-6 sm:gap-8 overflow-hidden">
      <div className="px-4 md:px-28 max-w-[1440px] mx-auto w-full flex flex-col justify-center items-center gap-6 sm:gap-8">
        {/* Chip */}
        <motion.div
          variants={chipVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-gray-700 backdrop-blur-sm"
        >
          <span className="text-gray-600 text-sm sm:text-base font-medium font-rubik uppercase leading-relaxed">
            They Passed, You Can Too
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col justify-start items-center gap-2 sm:gap-3 px-4"
        >
          <h2 className="w-full max-w-4xl text-center text-[#002770] text-xl sm:text-2xl md:text-3xl font-extrabold font-red-hat uppercase leading-tight">
            TESTIMONIALS FROM LICENSED PROFESSIONALS
          </h2>
          <p className="text-center text-gray-600 text-base sm:text-lg md:text-xl font-normal font-rubik leading-relaxed">
            These and over 150 other students have already passed the exam
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] flex items-center justify-center px-4">
          {/* Navigation Buttons */}
          <motion.button
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/80 rounded-full flex justify-center items-center hover:bg-gray-800 transition-colors z-30 shadow-lg cursor-pointer"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.button>

          {/* Images Row */}
          <div className="relative flex justify-center items-center gap-2 sm:gap-3 md:gap-4">
            {/* Mobile: show 3 images */}
            <AnimatePresence mode="popLayout" custom={direction}>
              <div
                key={`mobile-group-${startIndex}`}
                className="flex md:hidden justify-center items-center gap-2"
              >
                {visibleImages.slice(1, 4).map((image, index) => {
                  const style = mobileStyles[index];
                  return (
                    <motion.div
                      key={`${image}-mobile-${startIndex}-${index}`}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="relative shrink-0"
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
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>

            {/* Desktop: show all 5 images */}
            <AnimatePresence mode="popLayout" custom={direction}>
              <div
                key={`desktop-group-${startIndex}`}
                className="hidden md:flex justify-center items-center gap-4"
              >
                {visibleImages.map((image, index) => {
                  const style = desktopStyles[index];
                  return (
                    <motion.div
                      key={`${image}-desktop-${startIndex}-${index}`}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="relative shrink-0"
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
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
          </div>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/80 rounded-full flex justify-center items-center hover:bg-gray-800 transition-colors z-30 shadow-lg cursor-pointer"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.button>

          {/* Left Gradient Overlay */}
          <div className="absolute left-0 top-0 w-32 sm:w-48 md:w-80 h-full bg-gradient-to-r from-zinc-100 via-zinc-100/50 to-transparent pointer-events-none z-10" />

          {/* Right Gradient Overlay */}
          <div className="absolute right-0 top-0 w-32 sm:w-48 md:w-80 h-full bg-gradient-to-l from-zinc-100 via-zinc-100/50 to-transparent pointer-events-none z-10" />
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PrimaryButton
            variant="blue"
            size="lg"
            icon={<ArrowUpRight className="w-5 h-5" />}
            iconPosition="right"
            className="w-full sm:w-auto mx-4"
          >
            {CTA_TEXT}
          </PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
}
