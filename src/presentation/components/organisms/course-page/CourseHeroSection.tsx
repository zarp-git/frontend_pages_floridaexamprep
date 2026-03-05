"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";
import { HERO_VIDEOS, VIDEO_POSTERS } from "@/constants/media";
import { FloatingVideo } from "@/presentation/components/molecules/FloatingVideo";
import { CourseData } from "@/data/courses";

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
                <span className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-red-hat leading-tight tracking-wide">
                  You Pass
                </span>
                <span className="text-[#FF6200] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-red-hat leading-tight tracking-wide uppercase">
                  {course.title}
                </span>
              </div>

              {/* Line 2: Exam on the First Try (with circle marker) */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center">
                <span className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-red-hat leading-tight tracking-wide">
                  Exam on the
                </span>
                <span className="relative inline-flex items-center justify-center text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-red-hat leading-tight tracking-wide">
                  <span className="relative z-10 px-4">First Try</span>
                  {/* Circle marker SVG - scribble draw-in */}
                  <motion.svg
                    className="absolute inset-0 w-full h-full z-0"
                    viewBox="0 0 160 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M104.59 0.207C102.376 0.177 100.16 0.146 97.937 0.116C90.522 0.011 83.106 -0.04 75.686 0.037C73.089 0.064 70.492 0.106 67.894 0.168C56.928 0.444 45.967 0.99 35.028 2.055C28.053 2.721 20.49 5.041 15.664 10.48C13.606 12.167 12.384 15.347 12.912 18.011C13.321 20.68 14.355 22.968 15.29 25.238C17.902 32.235 25.463 35.497 31.564 37.496C37.268 39.453 42.937 39.591 48.548 40.151C62.21 41.244 75.937 41.731 89.696 40.983C102.056 40.265 114.331 38.308 126.323 35.264C131.965 33.808 137.619 32.188 143.046 29.642C146.284 28.179 149.663 25.524 151.144 21.884C152.051 20.039 151.177 17.808 150.386 16.773C145.763 11.675 140.6 10.718 135.63 8.611C130.731 6.835 125.798 5.932 120.907 5.044C118.375 4.59 115.791 4.241 113.217 4.021C108.944 3.654 104.718 3.552 100.49 3.496C88.268 3.387 76.087 3.605 63.888 4.045C57.147 4.315 50.272 4.665 43.526 5.946C38.198 6.921 32.951 8.095 27.716 9.49C22.313 10.906 16.992 13.14 12.207 15.954C8.076 18.338 4.302 21.348 1.285 25.178C-0.114 26.847 -0.2 29.351 0.227 31.022C2.022 37.273 7.356 39.989 11.913 42.442C17.348 44.959 22.897 45.084 28.298 45.463C38.805 46.007 49.249 44.984 59.525 43.286C73.947 40.822 88.096 37.258 102.122 33.321C111.289 30.718 120.398 27.873 129.265 24.361C130.85 23.735 132.429 23.088 133.997 22.416C137.337 20.982 140.634 19.436 143.818 17.676C147.784 15.289 151.603 12.671 155.705 10.578C156.984 10.048 158.321 9.655 159.654 9.26"
                      stroke="#F7DA00"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        pathLength: {
                          duration: 1.2,
                          ease: "easeInOut",
                          delay: 0.5,
                        },
                        opacity: { duration: 0.2, delay: 0.5 },
                      }}
                    />
                  </motion.svg>
                </span>
              </div>
            </div>

            {/* Line 3: Or I'll Coach You Personally Until You Do (with line marker) */}
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-center px-2">
              <span className="text-black text-base sm:text-lg md:text-xl font-medium font-red-hat leading-tight tracking-tight">
                Or I&apos;ll Coach You Personally
              </span>
              <span className="relative inline-flex items-center justify-center text-black text-base sm:text-lg md:text-xl font-medium font-red-hat leading-tight tracking-tight">
                <span className="relative z-10 px-2">Until You Do</span>
                {/* Line marker SVG - scribble draw-in */}
                <motion.svg
                  className="absolute bottom-[-4px] sm:bottom-[-8px] left-1/2 -translate-x-1/2 z-0 w-[120%] sm:w-[130%] h-auto overflow-visible"
                  viewBox="0 0 126 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M3.192 22.378C3.92 22.426 4.762 22.006 5.368 21.557C5.558 21.417 5.359 21.027 5.486 20.912C5.736 20.687 6.046 20.831 6.285 20.577C6.364 20.491 6.102 19.861 6.188 19.785C6.663 19.376 7.204 19.433 7.718 19.175C10.242 17.907 12.812 17.131 15.468 16.346C16.348 16.086 17.328 15.3 18.308 15.411C18.42 15.425 18.451 16.017 18.479 16.062C18.917 16.744 18.621 15.586 18.806 15.396C19.549 14.645 20.483 14.447 21.319 14.555C21.678 14.602 21.501 15.811 21.754 15.11C21.772 15.063 21.594 14.456 21.68 14.376C21.877 14.196 22.296 14.249 22.455 14.177C22.762 14.034 22.816 14.033 23.121 13.984C23.537 13.911 23.982 13.538 24.453 13.62C24.554 13.639 24.509 14.292 24.677 14.38C24.844 14.469 25.232 14.364 25.349 14.197C25.466 14.029 25.345 13.536 25.355 13.418C25.431 12.425 26.071 13.708 26.133 13.734C27.285 14.167 28.134 13.295 29.17 13.184C29.945 13.103 30.814 13.269 31.552 13.161C32.444 13.029 33.154 12.613 34.027 12.595C34.118 12.592 34.079 13.354 34.19 13.352C35.378 13.335 36.545 13.156 37.682 12.558C37.796 12.498 37.594 11.849 37.705 11.749C38.389 11.15 39.452 9.763 40.083 12.611C40.572 12.465 41.154 12.309 41.556 11.701C41.816 11.309 41.494 10.607 41.864 10.892C41.947 10.955 41.884 11.592 42.006 11.64C42.196 11.713 42.388 11.728 42.582 11.731C42.906 11.737 43.235 11.711 43.558 11.899C43.662 11.961 43.667 12.528 43.702 12.628C43.986 13.439 44.307 12.053 44.389 11.949C45.005 11.174 45.496 11.439 46.114 11.389C46.258 11.377 46.127 12.145 46.266 12.161C46.986 12.233 47.704 12.133 48.394 11.764C48.547 11.679 48.373 11.039 48.445 10.965C48.76 10.65 48.883 11.87 49.183 11.592C49.246 11.535 49.185 10.982 49.194 10.921C49.34 9.957 49.563 11.304 49.613 11.332C50.242 11.714 50.587 10.284 51.181 10.461C51.252 10.484 51.121 11.191 51.32 11.212C52.658 11.353 54.049 11.112 55.354 10.511C55.555 10.418 55.394 9.896 55.404 9.83C55.583 8.809 55.76 10.165 55.828 10.214C56.363 10.567 56.828 9.413 57.233 11.024C59.44 10.402 61.687 11.266 63.876 9.782C63.904 9.765 63.844 9.096 63.9 9.064C64.579 8.678 64.457 9.722 64.92 10.99C65.036 11.308 65.359 9.766 65.388 9.653C65.494 9.236 65.368 8.24 65.404 8.159C65.704 7.524 65.691 10.822 66.106 10.819"
                    stroke="#FFE100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      pathLength: {
                        duration: 0.8,
                        ease: "easeInOut",
                        delay: 1.0,
                      },
                      opacity: { duration: 0.2, delay: 1.0 },
                    }}
                  />
                </motion.svg>
              </span>
            </div>

            {/* Video */}
            <FloatingVideo
              src={course.videoThumbnail || HERO_VIDEOS.THUMBNAIL}
              poster={VIDEO_POSTERS.DEFAULT}
              className="w-full max-w-5xl relative flex flex-col justify-center items-center px-2 mt-4 sm:mt-6"
              autoPlay={true}
              controls={false}
              loop={true}
              muted={false}
              disableInteraction={true}
              priority={true}
            />

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
