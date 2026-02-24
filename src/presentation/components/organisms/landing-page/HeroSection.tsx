"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { PandaVideoPlayer } from "@/presentation/components/molecules/PandaVideoPlayer";

export default function HeroSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-28 py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col justify-start items-center gap-4 sm:gap-6">
        {/* Main Content - Centered */}
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 w-full">
          {/* Heading Section */}
          <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 w-full">
            {/* Title */}
            <div className="flex flex-col justify-start items-center gap-2 w-full px-2">
              {/* First Line */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center">
                <div className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-red-hat-display leading-tight tracking-wide">
                  You Pass
                </div>
                <div className="text-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-hanken-grotesk leading-tight tracking-wide uppercase">
                  BUSINESS & FINANCE
                </div>
              </div>

              {/* Second Line with highlight */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center relative">
                <div className="relative flex justify-center items-center gap-2">
                  {/* Yellow highlight - hidden on mobile, visible on larger screens */}
                  <div className="hidden md:block w-32 lg:w-40 h-9 lg:h-11 absolute left-[140px] lg:left-[194px] top-[-6px] outline outline-4 outline-offset-[-2px] outline-yellow-400 rounded-sm" />
                  <div className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-red-hat-display leading-tight tracking-wide">
                    Exam on the
                  </div>
                </div>
                <div className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-red-hat-display leading-tight tracking-wide">
                  First Try
                </div>
              </div>
            </div>

            {/* Subtitle with underline */}
            <div className="flex flex-wrap justify-center items-center gap-1 text-center px-2">
              <div className="text-black text-base sm:text-lg md:text-xl font-medium font-red-hat-display leading-tight tracking-tight">
                Or I&apos;ll Coach You Personally
              </div>
              <div className="relative flex justify-center items-center gap-2">
                {/* Yellow marker underline - adjusted for mobile */}
                <div className="w-24 sm:w-28 md:w-32 h-1.5 absolute left-0 top-[12px] sm:top-[14px] mix-blend-multiply outline outline-[12px] sm:outline-[16px] outline-offset-[-6px] sm:outline-offset-[-8px] outline-yellow-400" />
                <div className="text-black text-base sm:text-lg md:text-xl font-medium font-red-hat-display leading-tight tracking-tight">
                  Until You Do
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="w-full max-w-5xl relative flex flex-col justify-center items-center px-2">
              <PandaVideoPlayer
                src="/images/hero/hero-video-thumbnail.mp4"
                className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[504px] rounded-2xl sm:rounded-[24px] md:rounded-[30px]"
                controls
                muted
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
