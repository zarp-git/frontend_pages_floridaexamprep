"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";
import { PandaVideoPlayer } from "@/presentation/components/molecules/PandaVideoPlayer";
import { CourseData } from "@/data/courses";
import Image from "next/image";

interface CourseHeroSectionProps {
  course: CourseData;
}

export default function CourseHeroSection({ course }: CourseHeroSectionProps) {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-28 py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col justify-start items-center gap-4 sm:gap-6">
        {/* Main Content - Centered */}
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 w-full">
          {/* Heading Section */}
          <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 w-full">
            {/* Title */}
            <div className="flex flex-col justify-center items-center gap-3 sm:gap-4 w-full px-2">
              {/* Line 1: You Pass BUSINESS & FINANCE */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center">
                <span className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-red-hat leading-tight tracking-wide">
                  You Pass
                </span>
                <span className="text-[#FF6200] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-hanken leading-tight tracking-wide uppercase">
                  {course.title}
                </span>
              </div>

              {/* Line 2: Exam on the First Try (with circle marker) */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center">
                <span className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-red-hat leading-tight tracking-wide">
                  Exam on the
                </span>
                <span className="relative inline-flex items-center justify-center text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-red-hat leading-tight tracking-wide">
                  <span className="relative z-10 px-4">First Try</span>
                  {/* Circle marker PNG - positioned absolutely behind text */}
                  <Image
                    src="/images/hero/circle-marker.png"
                    alt=""
                    width={240}
                    height={100}
                    className="absolute inset-0 w-full h-auto object-contain z-0"
                    aria-hidden="true"
                    priority
                  />
                </span>
              </div>
            </div>

            {/* Line 3: Or I'll Coach You Personally Until You Do (with line marker) */}
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-center px-2">
              <span className="text-black text-lg sm:text-xl md:text-2xl font-medium font-red-hat leading-tight tracking-tight">
                Or I&apos;ll Coach You Personally
              </span>
              <span className="relative inline-flex items-center justify-center text-black text-lg sm:text-xl md:text-2xl font-medium font-red-hat leading-tight tracking-tight">
                <span className="relative z-10 px-2">Until You Do</span>
                {/* Line marker PNG - positioned at bottom */}
                <Image
                  src="/images/hero/line-marker.png"
                  alt=""
                  width={180}
                  height={24}
                  className="absolute bottom-[-12px] left-0 right-0 w-full h-auto object-contain z-0"
                  aria-hidden="true"
                  priority
                />
              </span>
            </div>

            {/* Video */}
            <div className="w-full max-w-5xl relative flex flex-col justify-center items-center px-2 mt-4 sm:mt-6">
              <PandaVideoPlayer
                src={course.videoThumbnail || "/images/hero/hero-video-thumbnail.mp4"}
                className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[504px] rounded-2xl sm:rounded-[24px] md:rounded-[30px]"
                controls
                muted
                autoPlay={false}
                loop={false}
              />
            </div>

            {/* Description */}
            <p className="w-full max-w-md sm:max-w-lg text-center text-gray-600 text-sm sm:text-base font-normal font-rubik leading-6 px-4">
              {course.heroDescription}
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
            {CTA_TEXT}
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
