"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/presentation/components/atoms/ui/button";
import { RiPhoneLine } from "@remixicon/react";
import AccordionItem from "@/presentation/components/atoms/ui/accordion-item";
import { FOOTER_COMPANY_INFO } from "@/constants/footer";

const FAQS = [
  {
    question: "What payment options do you accept?",
    answer:
      "We accept all major credit cards, checks, and offer financing options to help make your project affordable.",
  },
  {
    question: "How long does a typical paver installation take?",
    answer:
      "Project duration varies by size and complexity. A standard driveway or patio typically takes 3-5 days from demolition to completion.",
  },
  {
    question: "Do you offer a warranty on your work?",
    answer:
      "Yes! We offer a comprehensive 3-Year Workmanship Warranty covering defects directly related to our installation. Most true workmanship issues, if they exist, reveal themselves within the first 12–24 months. Extended warranty timelines in hardscaping are largely marketing — proper base preparation and compaction are what actually determine long-term performance. We build it right the first time.",
  },
  {
    question: "How long do pavers last?",
    answer:
      "High-quality brick pavers can last 25-50 years or more with proper maintenance, making them a durable long-term investment.",
  },
  {
    question: "What's the difference between pavers and concrete?",
    answer:
      "Pavers are stronger, more flexible (resistant to cracking), and easier to repair than poured concrete. They also offer more design versatility.",
  },
  {
    question: "Is the installation process messy?",
    answer:
      "We strive to keep our job sites clean. While excavation creates some dust and debris, we clean up daily and ensure your property remains tidy.",
  },
  {
    question: "Do I need to live in Central Florida to hire you?",
    answer:
      "We primarily serve Central Florida, including Haines City, Davenport, Winter Haven, and surrounding areas. Contact us to check your specific location.",
  },
  {
    question: "What if I'm not sure what style I want?",
    answer:
      "Our design team can provide consultation, samples, and 3D renderings to help you visualize different styles and choose the perfect look for your home.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-gray-50 py-10 sm:py-14 lg:py-20">
      <div className="section-container flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Left Column - Warranty Badge + CTA */}
        <div className="w-full md:w-80 lg:w-138.5 flex flex-col items-center md:items-start gap-6 sm:gap-8 md:shrink-0">
          {/* Warranty Badge */}
          <div className="w-48 h-48 md:w-52 md:h-52 lg:w-64 lg:h-64 relative shrink-0">
            <Image
              src="/images/3-years-warranty-badge.svg"
              alt="3 Years Workmanship Warranty Badge"
              width={256}
              height={256}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-[28px] lg:text-4xl font-semibold font-hanken text-primary">
              YOUR PAVERS SECURED
            </h2>
            <p className="text-gray-600 text-base font-normal font-rubik leading-6 max-w-md">
              When you choose AllBrick Pavers, you&apos;re protected. Our
              comprehensive 3-Year Workmanship Warranty covers defects directly
              related to our installation, giving you complete peace of mind. We stand behind every
              square foot we install because we do it right the first time.
            </p>
          </div>

          {/* CTA Button */}
          <Button
            variant="brick"
            size="lg"
            className="h-12 px-8 py-4 rounded-lg flex items-center gap-4"
            asChild
          >
            <Link href={`tel:${FOOTER_COMPANY_INFO.contact.phone}`}>
              <span className="uppercase">CONTACT US NOW</span>
              <RiPhoneLine className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Right Column - FAQ Accordion */}
        <div className="w-full md:flex-1 lg:max-w-xl flex flex-col gap-6">
          <h2 className="text-[24px] sm:text-[28px] lg:text-4xl font-semibold font-hanken text-gray-800 uppercase leading-tight sm:leading-10">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="flex flex-col">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
