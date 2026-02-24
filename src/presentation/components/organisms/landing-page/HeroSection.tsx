"use client";

import { ArrowUpRight, ChevronDown, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full px-4 md:px-28 py-20 bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col justify-start items-center gap-4">
        {/* Main Content - Centered */}
        <div className="flex flex-col justify-center items-center gap-6">
          {/* Heading Section */}
          <div className="flex flex-col justify-center items-center gap-6">
            {/* Title */}
            <div className="flex flex-col justify-start items-center gap-2">
              {/* First Line */}
              <div className="inline-flex justify-center items-center gap-3">
                <div className="text-center text-black text-3xl font-bold font-red-hat-display leading-8 tracking-wide">
                  You Pass
                </div>
                <div className="text-center text-secondary text-3xl font-black font-hanken-grotesk leading-8 tracking-wide uppercase">
                  BUSINESS & FINANCE
                </div>
              </div>

              {/* Second Line with highlight */}
              <div className="inline-flex justify-center items-start gap-3">
                <div className="relative flex justify-start items-center gap-2">
                  {/* Yellow highlight */}
                  <div className="w-40 h-11 absolute left-[194px] top-[-6px] outline outline-4 outline-offset-[-2px] outline-yellow-400 rounded-sm" />
                  <div className="text-center text-black text-3xl font-bold font-red-hat-display leading-8 tracking-wide">
                    Exam on the
                  </div>
                </div>
                <div className="text-center text-black text-3xl font-bold font-red-hat-display leading-8 tracking-wide">
                  First Try
                </div>
              </div>
            </div>

            {/* Subtitle with underline */}
            <div className="inline-flex justify-center items-start gap-1">
              <div className="text-black text-xl font-medium font-red-hat-display leading-5 tracking-tight">
                Or I&apos;ll Coach You Personally
              </div>
              <div className="relative flex justify-start items-center gap-2">
                {/* Yellow marker underline */}
                <div className="w-32 h-1.5 absolute left-0 top-[14px] mix-blend-multiply outline outline-[16px] outline-offset-[-8px] outline-yellow-400" />
                <div className="text-black text-xl font-medium font-red-hat-display leading-5 tracking-tight">
                  Until You Do
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="w-full max-w-[895px] relative flex flex-col justify-center items-start">
              <div className="relative w-full h-[504px] bg-gray-900 rounded-[30px] overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                >
                  <source src="/images/hero/hero-video-thumbnail.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Description */}
            <p className="w-96 text-center text-gray-600 text-base font-normal font-rubik leading-6">
              I help future contractors pass their Florida State Exams first try so you never have to worry about it again!
            </p>
          </div>

          {/* CTA Button */}
          <button className="h-12 px-6 py-4 bg-gradient-to-br from-blue-700 to-blue-950 rounded-lg inline-flex justify-start items-center gap-4 hover:opacity-90 transition-opacity">
            <span className="text-center text-white text-base font-medium font-rubik uppercase">
              get THAT +90 GRADE now
            </span>
            <ArrowUpRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* See More */}
        <div className="w-20 flex flex-col justify-end items-center gap-1">
          <span className="text-gray-500 text-base font-normal font-rubik">
            See more
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
