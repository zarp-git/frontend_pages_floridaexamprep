"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full px-4 md:px-28 py-16 md:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-16">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
            {/* Text Content */}
            <div className="flex-1 flex flex-col justify-center items-start gap-6 max-w-[484px]">
              <div className="flex flex-col gap-8">
                {/* Heading */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold font-red-hat-display leading-8 tracking-wide text-black">
                      We get you through
                    </h1>
                    <h2 className="text-3xl font-black font-hanken-grotesk leading-8 tracking-wide text-secondary uppercase">
                      Business & Finance
                    </h2>
                    <div className="relative inline-flex items-center gap-2">
                      {/* Yellow highlight underline */}
                      <svg
                        className="absolute left-48 -top-1.5 w-40 h-11 pointer-events-none"
                        viewBox="0 0 160 44"
                        fill="none"
                      >
                        <path
                          d="M2 22C2 22 40 2 80 22C120 42 158 22 158 22"
                          stroke="#FBBF24"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      </svg>
                      <h1 className="text-3xl font-bold font-red-hat-display leading-8 tracking-wide text-black relative z-10">
                        Exam on the First Try
                      </h1>
                    </div>
                  </div>

                  {/* Subheading with underline */}
                  <div className="relative inline-flex items-center gap-2">
                    <p className="text-xl font-medium font-red-hat-display leading-5 tracking-tight text-black">
                      Or I&apos;ll Coach You Personally Until You Do
                    </p>
                    <svg
                      className="absolute left-[262px] top-3 w-32 h-1.5"
                      viewBox="0 0 128 6"
                      fill="none"
                    >
                      <rect width="128" height="6" fill="#FBBF24" opacity="0.6" />
                    </svg>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base font-normal font-rubik leading-6 text-gray-600 max-w-96">
                  I help future contractors pass their Florida State Exams first
                  try so you never have to worry about it again!
                </p>
              </div>

              {/* CTA Button */}
              <button className="h-12 px-6 py-4 bg-gradient-to-br from-blue-700 to-blue-950 rounded-lg flex items-center gap-4 hover:opacity-90 transition-opacity">
                <span className="text-white text-base font-medium font-rubik uppercase">
                  Get That Approval Now
                </span>
                <ArrowUpRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Video/Image */}
            <div className="relative w-full lg:w-[591px] flex flex-col items-start">
              <div className="relative w-full lg:w-[576px] h-80 bg-gray-900 rounded-[20px] overflow-hidden">
                <Image
                  src="/images/hero/hero-video-thumbnail.jpg"
                  alt="Florida Exam Prep Course Preview"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Play Button Overlay */}
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group">
                  <Play className="w-8 h-8 text-blue-950 ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* See More */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-base font-normal font-rubik text-gray-500">
              See more
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
