"use client";

import { CourseData } from "@/data/courses";
import Image from "next/image";

interface CourseHeroSectionProps {
  course: CourseData;
}

export default function CourseHeroSection({ course }: CourseHeroSectionProps) {
  return (
    <div className="w-full px-28 py-20 flex flex-col justify-start items-center gap-4 overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col justify-start items-center gap-3">
            <div className="flex flex-col justify-start items-center">
              <div className="inline-flex justify-center items-center gap-3">
                <div className="text-center text-black text-3xl font-bold font-['Red_Hat_Display'] leading-8 tracking-wide">
                  You Pass
                </div>
                <div className="text-center text-secondary text-3xl font-black font-['Hanken_Grotesk'] leading-8 tracking-wide">
                  {course.title}
                </div>
              </div>
              <div className="inline-flex justify-center items-center gap-3">
                <div className="text-center text-black text-3xl font-bold font-['Red_Hat_Display'] leading-8 tracking-wide">
                  Exam on the
                </div>
                <div className="text-center text-black text-3xl font-bold font-['Red_Hat_Display'] leading-8 tracking-wide">
                  First Try
                </div>
                <div className="w-40 h-11 outline outline-4 outline-offset-[-2px] outline-yellow-400" />
              </div>
            </div>
            <div className="inline-flex justify-center items-start gap-1">
              <div className="text-black text-xl font-medium font-['Red_Hat_Display'] leading-5 tracking-tight">
                Or I&apos;ll Coach You Personally
              </div>
              <div className="relative flex justify-start items-center gap-2">
                <div className="w-32 h-1.5 absolute left-0 top-[14px] mix-blend-multiply outline outline-[16px] outline-offset-[-8px] outline-yellow-400" />
                <div className="text-black text-xl font-medium font-['Red_Hat_Display'] leading-5 tracking-tight">
                  Until You Do
                </div>
              </div>
            </div>
          </div>
          <div className="w-[895.22px] relative flex flex-col justify-center items-start">
            <div className="self-stretch h-[503.56px] bg-gradient-to-br from-neutral-500 via-zinc-600 to-zinc-800 rounded-[30.30px]" />
            <div className="w-12 h-14 left-[421.61px] top-[222.67px] absolute opacity-50 bg-white rounded-sm" />
          </div>
          <div className="w-96 text-center text-gray-600 text-base font-normal font-['Rubik'] leading-6">
            {course.heroDescription}
          </div>
        </div>
        <button className="h-12 px-6 py-4 bg-gradient-to-br from-blue-700 to-blue-950 rounded-lg inline-flex justify-start items-center gap-4">
          <div className="text-center text-white text-base font-medium font-['Rubik'] uppercase">
            get that approval right way
          </div>
          <div className="size-5 relative overflow-hidden">
            <div className="size-2 left-[5.83px] top-[5.83px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
          </div>
        </button>
      </div>
      <div className="w-20 flex flex-col justify-end items-center gap-1">
        <div className="text-gray-500 text-base font-normal font-['Rubik']">See more</div>
        <div className="size-4 relative">
          <div className="w-3 h-[5.03px] left-[2.89px] top-[6.34px] absolute outline outline-2 outline-offset-[-1.08px] outline-gray-500" />
        </div>
      </div>
    </div>
  );
}
