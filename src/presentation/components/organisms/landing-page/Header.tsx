"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    href: "/programs",
    hasDropdown: true,
    dropdownItems: [
      { label: "Business & Finance", href: "/programs/business-finance" },
      { label: "Contract Administration", href: "/programs/contract-admin" },
      { label: "Complete Exam Prep", href: "/programs/complete-prep" },
    ],
  },
  {
    label: "Books",
    href: "/books",
    hasDropdown: true,
    dropdownItems: [
      { label: "AIA Documents", href: "/books/aia-documents" },
      { label: "Builder's Guide", href: "/books/builders-guide" },
      { label: "FL Contractor's Manual", href: "/books/contractors-manual" },
    ],
  },
  { label: "Quizzes", href: "/quizzes" },
  { label: "Tutoring Call", href: "/tutoring" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="h-20 px-4 md:px-28 py-4 bg-stone-50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="h-full flex justify-between items-center max-w-[1440px] mx-auto">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo/logo-white.svg"
              alt="Florida Exam Prep Logo"
              width={120}
              height={48}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-base font-rubik transition-colors ${
                    item.label === "Home"
                      ? "font-semibold text-gray-900"
                      : "font-normal text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="w-3 h-3 text-gray-800" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm font-rubik text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* CTA Button */}
        <button className="hidden md:flex h-10 px-4 py-3 bg-gradient-to-br from-blue-700 to-blue-950 rounded-lg items-center gap-4 hover:opacity-90 transition-opacity">
          <span className="text-white text-sm font-medium font-rubik uppercase">
            Get That Approval Now
          </span>
        </button>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
