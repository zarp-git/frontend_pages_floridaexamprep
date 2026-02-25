"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { PandaVideoPlayer } from "@/presentation/components/molecules/PandaVideoPlayer";
import { CyclingText } from "@/presentation/components/molecules/common/CyclingText";
import Image from "next/image";

const EXAM_TYPES = [
  "BUSINESS & FINANCE",
  "CONTRACT ADMINISTRATION",
  "PROJECT MANAGEMENT",
];

export default function HeroSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-28 py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col justify-start items-center gap-4 sm:gap-6">
        {/* Main Content - Centered */}
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 w-full">
          {/* Heading Section */}
          <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 w-full">
            {/* Title */}
            <div className="flex flex-col justify-center items-center gap-3 sm:gap-4 w-full px-2">
              {/* First Line with Cycling Animation */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center">
                <span className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-red-hat-display leading-tight tracking-wide">
                  You Pass
                </span>
                <span className="text-[#FF6200] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-hanken-grotesk leading-tight tracking-wide uppercase">
                  <CyclingText items={EXAM_TYPES} interval={3000} direction="up" />
                </span>
              </div>

              {/* Second Line with circle marker */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center">
                <span className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-red-hat-display leading-tight tracking-wide">
                  Exam on the
                </span>
                <span className="relative inline-block text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-red-hat-display leading-tight tracking-wide px-2">
                  <span className="relative z-10">First Try</span>
                  {/* Circle marker PNG - positioned absolutely behind text */}
                  <span className="absolute inset-0 flex items-center justify-center -z-10">
                    <Image
                      src="/images/hero/circle-marker.png"
                      alt=""
                      width={200}
                      height={80}
                      className="w-auto h-full max-h-[120%] object-contain"
                      aria-hidden="true"
                      priority
                    />
                  </span>
                </span>
              </div>
            </div>

            {/* Subtitle with line marker */}
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-center px-2">
              <span className="text-black text-lg sm:text-xl md:text-2xl font-medium font-red-hat-display leading-tight tracking-tight">
                Or I&apos;ll Coach You Personally
              </span>
              <span className="relative inline-block text-black text-lg sm:text-xl md:text-2xl font-medium font-red-hat-display leading-tight tracking-tight px-1">
                <span className="relative z-10">Until You Do</span>
                {/* Line marker PNG - positioned at bottom */}
                <span className="absolute bottom-0 left-0 right-0 flex items-end justify-center -z-10 h-3 sm:h-4">
                  <Image
                    src="/images/hero/line-marker.png"
                    alt=""
                    width={160}
                    height={20}
                    className="w-full h-auto object-contain"
                    aria-hidden="true"
                    priority
                  />
                </span>
              </span>
            </div>

            {/* Video */}
            <div className="w-full max-w-5xl relative flex flex-col justify-center items-center px-2 mt-4 sm:mt-6">
              <PandaVideoPlayer
                src="/images/hero/hero-video-thumbnail.mp4"
                className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[504px] rounded-2xl sm:rounded-[24px] md:rounded-[30px]"
                controls
                muted
                autoPlay
                loop
              />
            </div>

            {/* Description */}
            <p className="w-full max-w-md sm:max-w-lg text-center text-gray-600 text-sm sm:text-base font-normal font-rubik leading-6 px-4">
              I help future contractors pass their Florida State Exams first try so you never have to worry about it again!
            </p>
          </div>

          {/* CTA Button */}
          <PrimaryButton 
            variant="blue" 
            size="lg"
            icon={<ArrowUpRight className="w-5 h-5" />}
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            get THAT +90 GRADE now
          </PrimaryButton>
        </div>

        {/* See More */}
        <div className="w-20 flex flex-col justify-end items-center gap-1 mt-4">
          <span className="text-gray-500 text-sm sm:text-base font-normal font-rubik">
            See more
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
