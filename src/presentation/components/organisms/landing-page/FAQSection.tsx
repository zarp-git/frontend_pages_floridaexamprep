"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowUpRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Why should I invest in this course instead of studying on my own?",
    answer:
      "Our course provides structured, expert-guided content that covers exactly what you need to pass. We've distilled years of experience into a clear path to success, saving you countless hours of confusion and uncertainty.",
  },
  {
    question: "What's included in the course?",
    answer:
      "Full breakdown of the Florida Contractor's Manual, Builder's Guide to Accounting essentials, AIA documents guidance, study plan, 20+ practice quizzes, exam simulator, simplified math explanations, and 24/7 access for 12 months.",
  },
  {
    question: "Will this course actually help me pass?",
    answer:
      "Yes! Over 150 students have passed using our methods. We offer a personal coaching guarantee - if you complete the full course and don't pass, we'll personally coach you until you do.",
  },
  {
    question: "Will I learn how to use the books during the test?",
    answer:
      "Absolutely. We teach you exactly how to navigate and use the reference materials efficiently during the exam, which is crucial for success.",
  },
  {
    question: "What platform is the course on, and how do the practice exams work?",
    answer:
      "The course is hosted on our dedicated learning platform with video lessons, interactive quizzes, and a timed exam simulator that mimics the real test environment.",
  },
  {
    question: "What language is the course available in?",
    answer:
      "Currently, the course is available in English, as the Florida State Exam is conducted in English.",
  },
  {
    question: "I already purchased another course—can I switch to yours?",
    answer:
      "Yes! Contact us and we'll work with you to make the transition as smooth as possible. Many of our successful students came from other programs.",
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
    <div className="flex flex-col gap-3">
      {FAQ_ITEMS.map((item, index) => (
        <div key={index} className="flex flex-col">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="py-2.5 flex justify-between items-center gap-4 text-left hover:opacity-80 transition-opacity"
          >
            <span className="text-gray-800 text-base font-normal font-rubik leading-6">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="pb-4 pt-2">
              <p className="text-gray-600 text-sm font-normal font-rubik leading-6">
                {item.answer}
              </p>
            </div>
          )}
          <div className="h-px bg-gray-400" />
        </div>
      ))}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="w-full px-4 md:px-28 py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side - Guarantee Badge */}
          <div className="w-full lg:w-[554px] flex flex-col gap-8">
            <div className="relative w-64 h-64">
              <Image
                src="/images/svg/exclusive.svg"
                alt="Exclusive Guarantee"
                width={256}
                height={256}
                className="w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-blue-600 text-3xl font-semibold font-clash-display">
                I'll Coach You Personally Until
                <br />
                You Get Approved
              </h3>
              <p className="text-gray-800 text-base font-normal font-rubik leading-6 max-w-[480px]">
                That's a commitment. Complete the full course — every video, every
                quiz, every guide — and if you still don't pass, our expert will
                personally schedule a free one-hour session with you to fix whatever's
                holding you back.
                <br />
                <br />
                No fine print. No loopholes. Just a guarantee backed by someone who's
                done this hundreds of times and refuses to let you fail twice. Enroll
                today. Stop gambling with your license.
              </p>
            </div>

            <button className="w-100 h-12 px-4 py-3 bg-gradient-to-br from-blue-700 to-blue-950 rounded-lg inline-flex justify-center items-center gap-4 hover:opacity-90 transition-opacity">
              <span className="text-white text-base font-medium font-rubik uppercase whitespace-nowrap">
                Get Prepared For The Exam Now
              </span>
              <ArrowUpRight className="w-5 h-5 text-white flex-shrink-0" />
            </button>
          </div>

          {/* Right Side - FAQ */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-gray-800 text-xl font-medium font-rubik uppercase leading-7">
                Still Got Questions?
              </p>
              <h2 className="text-gray-800 text-4xl font-semibold font-clash-display uppercase leading-10">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
