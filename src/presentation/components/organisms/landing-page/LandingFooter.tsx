import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Learning Area", href: "/learning" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

const COURSE_LINKS = [
  { label: "Exclusive tutoring call", href: "/tutoring" },
  { label: "Business And Finance", href: "/courses/business-finance" },
  { label: "Contract Administration", href: "/courses/contract-admin" },
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

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/floridaexamprep/",
    icon: "/images/social/instagram-icon.svg",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/floridaexamprep/",
    icon: "/images/social/facebook-icon.svg",
  },
];

export default function LandingFooter() {
  return (
    <footer className="w-full bg-white">
      <div className="px-4 md:px-28 pt-16 flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          {/* Top Section */}
          <div className="rounded-[10px] border border-sky-900 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Business Info */}
              <div className="px-8 md:px-14 py-16 border-b lg:border-b-0 lg:border-r border-sky-900 flex justify-center">
                <div className="w-full max-w-96 flex flex-col gap-6">
                  <Image
                    src="/images/logo/logo-main.svg"
                    alt="Florida Exam Prep"
                    width={192}
                    height={80}
                  />
                  <p className="text-gray-700 text-base font-normal font-rubik leading-6">
                    I help future contractors pass their Florida State Exams first
                    try so you never have to worry about it again!
                  </p>
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

              {/* Courses and Contact */}
              <div className="flex-1 px-8 md:px-14 py-16 border-sky-900 flex flex-col gap-8">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  {/* Courses */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-800 text-xl font-medium font-rubik uppercase leading-7">
                        Some Of Our Courses
                      </p>
                      <div className="w-10 h-0.5 bg-orange-600 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/courses/business-finance"
                        className="text-gray-600 text-base font-medium font-poppins underline leading-8 hover:text-gray-900"
                      >
                        Business And Finance
                      </Link>
                      <Link
                        href="/courses/contract-admin"
                        className="text-gray-600 text-base font-medium font-poppins underline leading-8 hover:text-gray-900"
                      >
                        Contract Administration
                      </Link>
                      <Link
                        href="/courses/complete-prep"
                        className="text-gray-600 text-base font-medium font-poppins underline leading-8 hover:text-gray-900"
                      >
                        Complete Exam Prep
                      </Link>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-800 text-xl font-medium font-rubik leading-7">
                        CONTACT US NOW
                      </p>
                      <div className="w-10 h-0.5 bg-orange-600 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <p className="text-gray-700 text-xs font-rubik">
                          <span className="font-medium">FROM MON TO SAT : </span>
                          <span className="font-normal">9AM - 5PM</span>
                        </p>
                      </div>
                      <Link
                        href="tel:+14436956218"
                        className="text-neutral-600 text-2xl font-semibold font-poppins leading-5 hover:text-blue-600"
                      >
                        + 1 443 695-6218
                      </Link>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-4 py-3 bg-blue-600 rounded-lg flex items-center gap-4 hover:bg-blue-700 transition-colors">
                    <span className="text-white text-base font-medium font-rubik uppercase">
                      Get That Approval Now
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </button>
                  <button className="px-4 py-3 bg-white rounded-lg border-2 border-blue-950 flex items-center gap-4 hover:bg-blue-50 transition-colors">
                    <span className="text-blue-700 text-sm font-medium font-rubik uppercase">
                      Already Enrolled In Other Course?
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="px-8 md:px-14 flex flex-col lg:flex-row justify-between gap-8">
            {/* Company */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-gray-800 text-xl font-medium font-rubik leading-7">
                  COMPANY
                </p>
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
                <p className="text-gray-800 text-xl font-medium font-rubik leading-7">
                  COURSES
                </p>
                <div className="w-10 h-0.5 bg-orange-600 rounded-lg" />
              </div>
              {COURSE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 text-base font-normal font-rubik hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Books */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-gray-800 text-xl font-medium font-rubik leading-7">
                  BOOKS
                </p>
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

            {/* Social */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-gray-800 text-xl font-medium font-rubik leading-7">
                  FOLLOW US
                </p>
                <div className="w-10 h-0.5 bg-orange-600 rounded-lg" />
              </div>
              <div className="flex items-center gap-6">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={40}
                      height={40}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full px-4 md:px-28 py-8 bg-black border-t border-gray-900">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
            <span className="text-gray-400 text-2xl font-semibold font-familjen-grotesk">
              Zarp™
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
