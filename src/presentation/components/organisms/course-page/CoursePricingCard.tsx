"use client";

import { CourseData } from "@/data/courses";

interface CoursePricingCardProps {
  course: CourseData;
}

export default function CoursePricingCard({ course }: CoursePricingCardProps) {
  return (
    <div className="w-full px-28 py-20 bg-gradient-to-br from-sky-500 to-blue-700/0 backdrop-blur-[2px] flex flex-col justify-center items-center gap-8 overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="px-4 py-1.5 bg-white/20 rounded-full outline outline-1 outline-offset-[-1px] outline-gray-700 backdrop-blur-sm flex flex-col justify-start items-start">
          <div className="text-white text-base font-medium font-['Rubik'] uppercase leading-8">
            You don&apos;t have to do this alone
          </div>
        </div>
        <div className="text-center text-white text-3xl font-bold font-['Red_Hat_Display'] uppercase leading-8">
          ENROLL NOW AND GET INSTANT ACCESS TO THE PROVEN METHOD
        </div>
        <div className="text-center text-white text-xl font-normal font-['Rubik'] leading-8">
          Join hundreds of successful students who started exactly where you are
        </div>
      </div>
      
      <div className="self-stretch flex justify-center items-start">
        <div className="max-w-md px-5 pb-8 bg-zinc-950/50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-white/20 inline-flex flex-col justify-center items-center gap-8 overflow-hidden">
          <div className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-bl-[20px] rounded-br-[20px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <div className="text-white text-2xl font-semibold font-['Rubik']">
              {course.badge.text}
            </div>
          </div>
          
          <div className="inline-flex justify-center items-center gap-2">
            <div className="flex justify-start items-start gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="size-4 relative overflow-hidden">
                  <div className="w-3.5 h-3 left-[1.33px] top-[1.33px] absolute bg-amber-400 outline outline-[1.33px] outline-offset-[-0.67px] outline-amber-400" />
                </div>
              ))}
            </div>
            <div className="flex justify-start items-center gap-1">
              <div className="text-center text-white text-sm font-medium font-['Rubik'] uppercase">
                {course.rating.score}
              </div>
              <div className="text-center text-gray-400 text-xs font-normal font-['Rubik']">
                on {course.rating.platform}
              </div>
            </div>
          </div>
          
          <div className="self-stretch flex flex-col justify-center items-center gap-6">
            <div className="self-stretch flex flex-col justify-center items-center gap-7">
              <div className="flex flex-col justify-end items-center gap-2.5">
                <div className="flex flex-col justify-start items-center">
                  <div className="inline-flex justify-start items-start">
                    <div className="text-center text-white text-base font-semibold font-['Rubik'] leading-5">
                      Total Value:
                    </div>
                    <div className="text-center">
                      <span className="text-red-600 text-base font-medium font-['Rubik'] leading-5"> </span>
                      <span className="text-red-600 text-base font-medium font-['Rubik'] line-through leading-5">
                        ${course.pricing.originalValue}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center">
                  <div className="text-center text-white text-sm font-normal font-['Rubik'] leading-4">
                    For only
                  </div>
                </div>
                <div className="inline-flex justify-center items-end gap-0.5">
                  <div className="text-center text-white text-2xl font-semibold font-['Rubik'] leading-6">
                    $
                  </div>
                  <div className="text-center text-white text-4xl font-semibold font-['Rubik'] leading-9">
                    {course.pricing.currentPrice}
                  </div>
                </div>
              </div>
              <button className="self-stretch h-12 px-5 py-3.5 bg-blue-950 rounded-[9.60px] inline-flex justify-center items-center gap-5">
                <div className="text-center text-white text-base font-medium font-['Rubik'] uppercase">
                  get THAT +90 GRADE now
                </div>
              </button>
            </div>
            
            <div className="self-stretch text-center text-stone-100 text-base font-semibold font-['Rubik'] leading-4">
              EVERYTHING YOU GET ACCESS NOW
            </div>
            
            <div className="self-stretch flex flex-col justify-center items-start gap-6">
              {course.features.map((feature, index) => (
                <div
                  key={index}
                  className="self-stretch inline-flex justify-start items-center gap-3"
                >
                  {feature.included ? (
                    <div className="size-4 bg-white" />
                  ) : (
                    <div className="w-4 p-[3px] bg-red-300 rounded-full flex justify-center items-center gap-[2.50px] overflow-hidden">
                      <div className="p-0.5 bg-red-500 rounded-[249.75px] flex justify-start items-center gap-[2.50px] overflow-hidden">
                        <div className="size-1.5 relative overflow-hidden">
                          <div className="size-[3px] left-[1.50px] top-[1.50px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="self-stretch inline-flex flex-col justify-start items-start">
                    <div className="text-white text-sm font-semibold font-['Rubik'] leading-6">
                      {feature.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="self-stretch h-12 px-5 py-3.5 bg-blue-950 rounded-[9.60px] inline-flex justify-center items-center gap-5">
            <div className="text-center text-white text-base font-medium font-['Rubik'] uppercase">
              get THAT +90 GRADE now
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
