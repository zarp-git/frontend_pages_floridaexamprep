"use client";

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
    <div className="w-full px-28 py-16 bg-white flex flex-col justify-start items-center gap-8 overflow-hidden">
      <div className="self-stretch flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="w-20 h-5 bg-orange-600 outline outline-[0.49px] outline-orange-600" />
          <div className="size-5 origin-top-left rotate-[-9.81deg] bg-orange-600 outline outline-[0.49px] outline-orange-600" />
          <div className="w-48 h-5 bg-blue-950" />
          <div className="w-32 h-3.5 bg-blue-950" />
          <div className="w-14 h-3.5 bg-blue-950" />
          <div className="w-6 h-3.5 origin-top-left rotate-[-8.29deg] bg-stone-50 outline outline-[1.25px] outline-offset-[-0.63px] outline-orange-600" />
        </div>
        <div className="text-center">
          <span className="text-gray-800 text-3xl font-black font-['Hanken_Grotesk'] uppercase leading-7 tracking-wide">
            AFTER AND BEFORE YOU{" "}
          </span>
          <span className="text-secondary text-3xl font-black font-['Hanken_Grotesk'] uppercase leading-7 tracking-wide">
            JOIN IN
          </span>
        </div>
        <div className="text-center text-gray-600 text-base font-normal font-['Rubik'] leading-6">
          Most contractors who fail aren&apos;t bad at their job. They just had no guidance for the Exam.
        </div>
      </div>
      
      <div className="self-stretch inline-flex justify-start items-start gap-5">
        <div className="flex-1 px-1 rounded-[10px] inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
          <div className="self-stretch flex-1 p-6 bg-zinc-100 flex flex-col justify-center items-center gap-8">
            <div className="w-80 h-64 relative overflow-hidden">
              <div className="left-[247.19px] top-[41.25px] absolute text-white text-5xl font-bold">
                🚫
              </div>
            </div>
            <div className="text-accent-1 text-xl font-bold font-['Arial'] leading-7 tracking-wide">
              YOU PAY FOR EACH FRUSTADED ATTEMPT
            </div>
            <div className="self-stretch inline-flex flex-col justify-start items-start">
              {beforeFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="self-stretch inline-flex flex-col justify-center items-center gap-3"
                >
                  <div className="size-12 bg-red-50 rounded-full inline-flex justify-center items-center">
                    <div className="size-7 relative overflow-hidden">
                      <div className="size-3.5 left-[7px] top-[7px] absolute outline outline-4 outline-offset-[-1.75px] outline-red-500" />
                      <div className="size-3.5 left-[7px] top-[7px] absolute outline outline-4 outline-offset-[-1.75px] outline-red-500" />
                    </div>
                  </div>
                  <div className="self-stretch text-center text-gray-900 text-lg font-medium font-['Hanken_Grotesk'] leading-4 tracking-tight">
                    {feature}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white/0 rounded-[10px] inline-flex flex-col justify-end items-center gap-8 overflow-hidden">
          <div className="self-stretch p-6 relative bg-zinc-100 flex flex-col justify-end items-center gap-8">
            <div className="w-80 h-64 relative overflow-hidden">
              <div className="left-[247.19px] top-[41.25px] absolute text-white text-5xl font-bold">
                ✅
              </div>
            </div>
            <div className="text-blue-950 text-xl font-bold font-['Arial'] leading-7 tracking-wide">
              YOU PASS THE FIRST TRY
            </div>
            <div className="self-stretch inline-flex flex-col justify-start items-start">
              {afterFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="self-stretch inline-flex flex-col justify-center items-center gap-3"
                >
                  <div className="size-12 bg-green-50 rounded-full inline-flex justify-center items-center">
                    <div className="size-7 relative overflow-hidden">
                      <div className="w-5 h-3 left-[4.67px] top-[7px] absolute outline outline-4 outline-offset-[-1.75px] outline-green-600" />
                    </div>
                  </div>
                  <div className="self-stretch text-center text-gray-900 text-lg font-medium font-['Hanken_Grotesk'] leading-4 tracking-tight">
                    {feature}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-32 h-1.5 left-[327px] top-[329.65px] absolute mix-blend-multiply outline outline-[16px] outline-offset-[-8px] outline-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
