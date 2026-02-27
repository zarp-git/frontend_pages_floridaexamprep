"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question:
      "Why should I invest in this course instead of studying on my own?",
    answer:
      "Our course provides structured, expert-guided content that covers exactly what you need to pass. We\u2019ve distilled years of experience into a clear path to success, saving you countless hours of confusion and uncertainty.",
  },
  {
    question: "What\u2019s included in the course?",
    answer:
      "Full breakdown of the Florida Contractor\u2019s Manual, Builder\u2019s Guide to Accounting essentials, AIA documents guidance, study plan, 20+ practice quizzes, exam simulator, simplified math explanations, and 24/7 access for 12 months.",
  },
  {
    question: "Will this course actually help me pass?",
    answer:
      "Yes! Over 150 students have passed using our methods. We offer a personal coaching guarantee - if you complete the full course and don\u2019t pass, we\u2019ll personally coach you until you do.",
  },
  {
    question: "Will I learn how to use the books during the test?",
    answer:
      "Absolutely. We teach you exactly how to navigate and use the reference materials efficiently during the exam, which is crucial for success.",
  },
  {
    question:
      "What platform is the course on, and how do the practice exams work?",
    answer:
      "The course is hosted on our dedicated learning platform with video lessons, interactive quizzes, and a timed exam simulator that mimics the real test environment.",
  },
  {
    question: "What language is the course available in?",
    answer:
      "Currently, the course is available in English, as the Florida State Exam is conducted in English.",
  },
  {
    question: "I already purchased another course\u2014can I switch to yours?",
    answer:
      "Yes! Contact us and we\u2019ll work with you to make the transition as smooth as possible. Many of our successful students came from other programs.",
  },
  {
    question: "How do I register for the actual exam?",
    answer:
      "We provide step-by-step guidance on the registration process, including all necessary documentation and scheduling information.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {FAQ_ITEMS.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full py-4 sm:py-5 flex justify-between items-center gap-4 text-left hover:text-blue-600 transition-colors cursor-pointer"
          >
            <span className="text-gray-800 text-sm sm:text-base font-medium font-rubik leading-relaxed">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180 text-blue-600" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-gray-600 text-sm sm:text-base font-normal font-rubik leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-28 py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Left Side - Guarantee Badge */}
        <div className="w-full md:w-80 lg:w-[554px] flex flex-col items-center md:items-start gap-6 sm:gap-8 md:shrink-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            <Image
              src="/images/svg/exclusive.svg"
              alt="Exclusive Guarantee"
              width={256}
              height={256}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 className="text-[#002770] text-xl sm:text-2xl md:text-3xl font-bold font-red-hat leading-tight font-extrabold ">
              I&apos;ll Coach You Personally Until
              <br className="hidden sm:block" /> You Get Approved
            </h3>
            <p className="text-gray-700 text-sm sm:text-base font-normal font-rubik leading-relaxed max-w-md">
              That&apos;s a commitment. Complete the full course — every video,
              every quiz, every guide — and if you still don&apos;t pass, our
              expert will personally schedule a free one-hour session with you
              to fix whatever&apos;s holding you back. We&apos;re invested in
              your success, and I won&apos;t let you fail twice.
            </p>
          </div>

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

        {/* Right Side - FAQ */}
        <div className="w-full md:flex-1 lg:max-w-xl flex flex-col gap-6">
          <h2 className="text-[#002770] text-[24px] sm:text-[28px] lg:text-3xl font-extrabold font-red-hat uppercase leading-tight sm:leading-10">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <FAQAccordion />
        </div>
      </div>
    </section>
  );
}
