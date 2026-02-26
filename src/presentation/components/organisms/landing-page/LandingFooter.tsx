"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";
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
  { label: "All Books Bundle", href: "/books/bundle-2" },
  { label: "All Books + Quizzes Bundle", href: "/books/complete-bundle" },
  { label: "Permanent Tabs For All Books", href: "/books/tabs" },
];

export default function LandingFooter() {
  const { openModal } = useMaintenanceModal();

  return (
    <footer className="w-full bg-white">
      <div className="px-4 md:px-28 pt-16 flex flex-col gap-12">
        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Top Section with Border */}
          <div className="rounded-[10px] border border-sky-900 overflow-hidden flex flex-col lg:flex-row">
            {/* Left Column - Business Info */}
            <div className="px-8 md:px-14 py-16 border-b lg:border-b-0 lg:border-r border-sky-900 flex justify-center">
              <div className="w-full max-w-96 flex flex-col gap-6">
                {/* Logo */}
                <Image
                  src="/images/logo/logofooter.svg"
                  alt="Florida Exam Prep"
                  width={192}
                  height={80}
                  className="h-20 w-auto"
                />

                {/* Description */}
                <p className="text-gray-700 text-base font-normal font-rubik leading-6">
                  I help future contractors pass their Florida State Exams first
                  try so you never have to worry about it again!
                </p>

                {/* Address */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <p className="text-gray-700 text-base font-medium font-rubik">
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
            <div className="flex-1 px-8 md:px-14 py-16 flex flex-col gap-8">
              {/* Courses and Contact Row */}
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                {/* Some of Our Courses */}
                <div className="flex flex-col gap-6 max-w-[550px]">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-800 text-xl font-medium font-rubik uppercase leading-7">
                      some of our couses
                    </h3>
                    <div className="w-10 h-0.5 bg-[#FF6200] rounded-lg" />
                  </div>
                  <div className="flex gap-8">
                    <div className="flex flex-col gap-0">
                      <Link
                        href="/courses/business-finance"
                        className="text-gray-500 text-base font-medium font-poppins underline leading-8 hover:text-[#0866FF] transition-colors"
                      >
                        Business And Finance
                      </Link>
                      <Link
                        href="/courses/contract-admin"
                        className="text-gray-500 text-base font-medium font-poppins underline leading-8 hover:text-[#0866FF] transition-colors"
                      >
                        Contract Adminstration
                      </Link>
                      <Link
                        href="/courses/complete-prep"
                        className="text-gray-500 text-base font-medium font-poppins underline leading-8 hover:text-[#0866FF] transition-colors"
                      >
                        Complete Exam Prep
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Contact Us */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-12">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                          CONTACT US NOW
                        </h3>
                        <div className="w-10 h-0.5 bg-[#FF6200] rounded-lg" />
                      </div>
                    </div>
                    <div className="w-56 flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-5 h-5 text-[#FF6200]" />
                        <p className="text-gray-700 text-xs font-rubik">
                          <span className="font-medium">FROM MON TO SAT </span>
                          <span className="font-bold">: </span>
                          <span className="font-normal">9AM - 5PM</span>
                        </p>
                      </div>
                      <div className="pb-[0.80px]">
                        <Link
                          href="tel:+14436956218"
                          className="text-neutral-800 text-2xl font-semibold font-poppins leading-5 hover:text-[#0866FF] transition-colors"
                        >
                          + 1 443 695-6218
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <PrimaryButton
                  variant="blue-solid"
                  size="lg"
                  icon={<ArrowUpRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  {CTA_TEXT}
                </PrimaryButton>
                <PrimaryButton variant="outline" size="lg">
                  already enrolled in other course?
                </PrimaryButton>
              </div>
            </div>
          </div>

          {/* Bottom Links Section */}
          <div className="px-8 md:px-14 flex flex-col lg:flex-row justify-between gap-16">
            {/* Company */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                  COMPANY
                </h3>
                <div className="w-10 h-0.5 bg-orange-600 rounded-lg" />
              </div>
              {COMPANY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 text-base font-normal font-rubik hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Courses */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                  COURSES
                </h3>
                <div className="w-10 h-0.5 bg-orange-600 rounded-lg" />
              </div>
              {COURSE_LINKS.map((link) => 
                link.isMaintenance ? (
                  <button
                    key={link.label}
                    onClick={(e) => {
                      e.preventDefault();
                      openModal();
                    }}
                    className="text-gray-700 text-base font-normal font-rubik hover:text-gray-900 text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 text-base font-normal font-rubik hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Books */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                  BOOKS
                </h3>
                <div className="w-10 h-0.5 bg-orange-600 rounded-lg" />
              </div>
              {BOOK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 text-base font-normal font-rubik hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Follow Us */}
            <div className="w-60 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                  FOLLOW US
                </h3>
                <div className="w-10 h-0.5 bg-orange-600 rounded-lg" />
              </div>
              <div className="flex items-center gap-6">
                {/* Instagram */}
                <Link
                  href="https://www.instagram.com/floridaexamprep/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/brands/instagram-icon.svg"
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </Link>

                {/* Facebook */}
                <Link
                  href="https://www.facebook.com/floridaexamprep/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/brands/facebook-icon.svg"
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </Link>

                {/* YouTube */}
                <Link
                  href="https://www.youtube.com/@floridaexamprep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/brands/youtubeicon.png"
                    alt="YouTube"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full px-4 md:px-28 py-8 bg-black border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <p className="text-gray-400 text-base font-normal font-rubik leading-5">
          FLORIDA EXAM PREP © Copyright 2026 - All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.zarpstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 text-base font-normal font-rubik underline leading-5 hover:text-gray-300"
          >
            Developed and Maintained by
          </Link>
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-2xl font-semibold font-familjen-grotesk">
              Zarp
            </span>
            <span className="text-gray-400 text-xs">™</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
