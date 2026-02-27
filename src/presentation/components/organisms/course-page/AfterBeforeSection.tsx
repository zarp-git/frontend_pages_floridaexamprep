"use client";

import Image from "next/image";

export default function AfterBeforeSection() {
  const beforeFeatures = [
    "You open the books on a Sunday night after a full week on the job site.",
    "Not knowing what to expect on exam day",
    "During the exam you're flipping 1,000 pages in a panic. The clock is running. You can't find it.",
    "Every month without your license is another job you could be taking — but can't.",
    "You study everything because you don't know what to ignore — and by exam week, you're burned out.",
    "You already paid for another course. Watched the videos. Showed up. And still didn't pass.",
  ];

  const afterFeatures = [
    "You learn to navigate the books fast. While others are still searching, you've already moved on.",
    "Quick answers from people in Community who've already been through it",
    "Full access 24/7 — study on your lunch break, after the kids sleep, whenever life allows.",
    "Complete exam breakdown, so you know what to expect on test day",
    "Precise guidance on exactly what to study",
    "Complete materials, and curated book, quizzes and mock exams",
  ];

  return (
    <section className="w-full px-2 sm:px-4 md:px-8 lg:px-28 py-8 sm:py-12 bg-white flex flex-col justify-start items-center gap-6 sm:gap-8 overflow-hidden">
      {/* Header */}
      <div className="self-stretch flex flex-col justify-center items-center ">
        {/* Logo */}
        <div className="flex justify-center items-center w-full max-w-[180px] sm:max-w-[220px] mx-auto">
          <Image
            src="/images/logo/logofooter.svg"
            alt="Florida Exam Prep"
            width={220}
            height={60}
            className="h-20 w-auto max-w-full"
            priority
          />
        </div>
        
        {/* Title */}
        <h2 className="text-center">
          <span className="text-gray-800 text-2xl sm:text-3xl font-black font-hanken uppercase leading-7 tracking-wide">
            AFTER AND BEFORE YOU{" "}
          </span>
          <span className="text-[#FF6200] text-2xl sm:text-3xl font- font-hanken uppercase leading-7 tracking-wide">
            JOIN IN
          </span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-center text-gray-600 text-base font-normal font-rubik leading-6 max-w-2xl">
          Most contractors who fail aren&apos;t bad at their job. They just had no guidance for the Exam.
        </p>
      </div>
      
      {/* Two Columns */}
      <div className="self-stretch grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Left Column - Before */}
        <div className="flex-1 px-0 sm:px-1 rounded-[10px] flex flex-col justify-start items-start overflow-hidden">
          <div className="self-stretch h-full p-4 sm:p-6 bg-zinc-100 rounded-lg flex flex-col justify-start items-center gap-6 sm:gap-8">
            {/* Image with blocked icon */}
            <div className="w-full max-w-[320px] sm:max-w-sm h-48 sm:h-64 relative overflow-hidden mx-auto">
              <Image
                src="/images/courses/frustated-attempt-image.png"
                alt="Frustrated attempt"
                fill
                className="object-contain"
              />
            </div>
            
            {/* Title */}
            <h3 className="text-accent-1 text-lg sm:text-xl font-bold font-arial leading-7 tracking-wide text-center">
              YOU PAY FOR EACH FRUSTRATED ATTEMPT
            </h3>
            
            {/* Features - 2 columns grid */}
            <div className="self-stretch grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {beforeFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-start items-center gap-3"
                >
                  {/* Icon */}
                  <div className="size-10 sm:size-12 bg-red-50 rounded-full flex justify-center items-center flex-shrink-0">
                    <Image
                      src="/images/svg/IconRed.svg"
                      alt="Not included"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Text */}
                  <p className="text-center text-gray-900 text-sm sm:text-base md:text-lg font-medium font-hanken leading-snug tracking-tight">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - After */}
        <div className="flex-1 rounded-[10px] flex flex-col justify-start items-center overflow-hidden">
          <div className="self-stretch h-full p-4 sm:p-6 relative bg-zinc-100 rounded-lg flex flex-col justify-start items-center gap-6 sm:gap-8">
            {/* Image with confirm icon */}
            <div className="w-full max-w-[320px] sm:max-w-sm h-48 sm:h-64 relative overflow-hidden mx-auto" >
              <Image
                src="/images/courses/platform-banner.png"
                alt="Pass first try"
                fill
                className="object-contain"
              />
              {/* Confirm icon overlay */}
              <div className="absolute top-4 right-4 sm:top-10 sm:right-12">
                <Image
                  src="/images/svg/confirm.svg"
                  alt="Confirmed"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Title with marker */}
            <div className="relative inline-block">
              <h3 className="text-blue-950 text-lg sm:text-xl font-bold font-arial leading-7 tracking-wide text-center">
                YOU PASS THE{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">FIRST TRY</span>
                  {/* Yellow line marker under "FIRST TRY" */}
                  <Image
                    src="/images/hero/line-marker.png"
                    alt=""
                    width={90}
                    height={10}
                    className="absolute left-0 -bottom-[-2px] w-full h-auto pointer-events-none z-0 top-2 sm:top-3"
                  />
                </span>
              </h3>
            </div>
            
            {/* Features - 2 columns grid */}
            <div className="self-stretch grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {afterFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-start items-center gap-3"
                >
                  {/* Icon */}
                  <div className="size-10 sm:size-12 bg-green-50 rounded-full flex justify-center items-center flex-shrink-0">
                    <Image
                      src="/images/svg/IconCheck.svg"
                      alt="Included"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Text */}
                  <p className="text-center text-gray-900 text-sm sm:text-base md:text-lg font-medium font-hanken leading-snug tracking-tight">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
