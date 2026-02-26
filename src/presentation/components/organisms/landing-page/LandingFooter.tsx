"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT, SOCIAL_LINKS, CONTACT } from "@/constants";
import { useMaintenanceModal } from "@/hooks/use-maintenance-modal";

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Learning Area", href: "/learning" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

const COURSE_LINKS = [
  { label: "Win Board", href: "#", isMaintenance: true },
  { label: "Business And Finance", href: "/courses/business-finance" },
  { label: "Contract Adminstration", href: "/courses/contract-admin" },
  { label: "Project Management", href: "/courses/project-management" },
  { label: "Complete Exam Prep", href: "/courses/complete-prep" },
];

const BOOK_LINKS = [
  { label: "AIA Documents 201, 401, 701", href: "/books/aia-documents" },
  { label: "Builder's Guide to Accounting", href: "/books/builders-guide" },
  { label: "FL Contractor's Manual 2025", href: "/books/contractors-manual" },
  { label: "All Books Bundle", href: "/books/bundle" },
  { label: "Quizzes 1,000+ questions", href: "/books/quizzes" },
  { label: "All Books + Quizzes Bundle", href: "/books/complete-bundle" },
  { label: "Permanent Tabs For All Books", href: "/books/tabs" },
];

function FooterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-gray-800 text-lg font-medium font-rubik uppercase leading-7">
        {children}
      </h3>
      <div className="w-10 h-0.5 bg-orange-600 rounded-lg" />
    </div>
  );
}

export default function LandingFooter() {
  const { openModal } = useMaintenanceModal();

  return (
    <footer className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 flex flex-col gap-10 sm:gap-12">
        {/* Main Content */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Top Section with Border */}
          <div className="rounded-xl border border-sky-900 overflow-hidden flex flex-col lg:flex-row">
            {/* Left Column - Business Info */}
            <div className="px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 border-b lg:border-b-0 lg:border-r border-sky-900 flex justify-center lg:max-w-sm xl:max-w-md">
              <div className="w-full flex flex-col gap-5">
                {/* Logo */}
                <Image
                  src="/images/logo/logofooter.svg"
                  alt="Florida Exam Prep"
                  width={192}
                  height={80}
                  className="h-16 sm:h-20 w-auto"
                />

                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-base font-normal font-rubik leading-relaxed">
                  I help future contractors pass their Florida State Exams first
                  try so you never have to worry about it again!
                </p>

                {/* Address */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-orange-600 shrink-0" />
                    <p className="text-gray-700 text-sm font-medium font-rubik">
                      ORLANDO OFFICE
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm font-normal font-rubik leading-5">
                    6996 Piazza Grande Ave STE 309, Orlando, FL 32835
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Courses and Contact */}
            <div className="flex-1 px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 flex flex-col gap-6 sm:gap-8">
              {/* Courses and Contact Row */}
              <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-8">
                {/* Some of Our Courses */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-800 text-lg font-medium font-rubik uppercase leading-7">
                      some of our courses
                    </h3>
                    <div className="w-10 h-0.5 bg-[#FF6200] rounded-lg" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <Link
                      href="/courses/business-finance"
                      className="text-gray-500 text-sm sm:text-base font-medium font-rubik underline leading-8 hover:text-[#0866FF] transition-colors"
                    >
                      Business And Finance
                    </Link>
                    <Link
                      href="/courses/contract-admin"
                      className="text-gray-500 text-sm sm:text-base font-medium font-rubik underline leading-8 hover:text-[#0866FF] transition-colors"
                    >
                      Contract Adminstration
                    </Link>
                    <Link
                      href="/courses/complete-prep"
                      className="text-gray-500 text-sm sm:text-base font-medium font-rubik underline leading-8 hover:text-[#0866FF] transition-colors"
                    >
                      Complete Exam Prep
                    </Link>
                  </div>
                </div>

                {/* Contact Us */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-800 text-lg font-medium font-rubik leading-7">
                      CONTACT US NOW
                    </h3>
                    <div className="w-10 h-0.5 bg-[#FF6200] rounded-lg" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-5 h-5 text-[#FF6200] shrink-0" />
                      <p className="text-gray-700 text-xs font-rubik">
                        <span className="font-medium">FROM MON TO SAT </span>
                        <span className="font-bold">: </span>
                        <span className="font-normal">9AM - 5PM</span>
                      </p>
                    </div>
                    <Link
                      href={CONTACT.phoneHref}
                      className="text-neutral-800 text-xl sm:text-2xl font-semibold font-rubik leading-5 hover:text-[#0866FF] transition-colors"
                    >
                      {CONTACT.phoneDisplay}
                    </Link>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
                <PrimaryButton
                  variant="blue-solid"
                  size="lg"
                  icon={<ArrowUpRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  {CTA_TEXT}
                </PrimaryButton>
                <PrimaryButton
                  variant="outline"
                  size="lg"
                  className="uppercase"
                >
                  already enrolled in other course?
                </PrimaryButton>
              </div>
            </div>
          </div>

          {/* Bottom Links Section */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
            {/* Company */}
            <div className="flex flex-col gap-3">
              <FooterSectionTitle>COMPANY</FooterSectionTitle>
              <div className="flex flex-col gap-2">
                {COMPANY_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 text-sm sm:text-base font-normal font-rubik hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div className="flex flex-col gap-3">
              <FooterSectionTitle>COURSES</FooterSectionTitle>
              <div className="flex flex-col gap-2">
                {COURSE_LINKS.map((link) =>
                  link.isMaintenance ? (
                    <button
                      key={link.label}
                      onClick={(e) => {
                        e.preventDefault();
                        openModal();
                      }}
                      className="text-gray-700 text-sm sm:text-base font-normal font-rubik hover:text-gray-900 text-left transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 text-sm sm:text-base font-normal font-rubik hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </div>

            {/* Books */}
            <div className="flex flex-col gap-3">
              <FooterSectionTitle>BOOKS</FooterSectionTitle>
              <div className="flex flex-col gap-2">
                {BOOK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 text-sm sm:text-base font-normal font-rubik hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col gap-3">
              <FooterSectionTitle>FOLLOW US</FooterSectionTitle>
              <div className="flex items-center gap-4 sm:gap-5">
                <Link
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/brands/instagram-icon.svg"
                    alt="Instagram"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                </Link>
                <Link
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/brands/facebook-icon.svg"
                    alt="Facebook"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                </Link>
                <Link
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/svg/youtubeicon.svg"
                    alt="YouTube"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                </Link>
                <Link
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/svg/whatsapp-icon.svg"
                    alt="WhatsApp"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-6 sm:py-8 bg-black border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
        <p className="text-gray-400 text-sm sm:text-base font-normal font-rubik leading-5 text-center sm:text-left">
          FLORIDA EXAM PREP &copy; Copyright 2026 - All Rights Reserved.
        </p>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="https://www.zarpstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 text-sm sm:text-base font-normal font-rubik underline leading-5 hover:text-gray-300 transition-colors"
          >
            Developed and Maintained by
          </Link>
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-xl sm:text-2xl font-semibold font-familjen-grotesk">
              Zarp
            </span>
            <span className="text-gray-400 text-xs">&trade;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
