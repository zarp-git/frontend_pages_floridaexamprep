"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiMenu3Line, RiCloseLine } from "@remixicon/react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
  isMaintenance?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Courses",
    href: "/courses",
    hasDropdown: true,
    dropdownItems: [
      { label: "Business & Finance", href: "/courses/business-finance" },
      { label: "Contract Administration", href: "/courses/contract-administration" },
      { label: "Complete Exam Prep", href: "/courses/complete-exam-prep" },
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
  { label: "Win Board", href: "#", isMaintenance: true },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2 border-gray-200"
            : "bg-white/90 backdrop-blur-sm py-3 border-gray-100"
        )}
      >
        <div className="px-4 md:px-28 flex items-center justify-between h-[64px] md:h-[72px] max-w-[1440px] mx-auto">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex-shrink-0 transition-transform duration-200 hover:scale-105">
              <Image
                src="/images/logo/florida-logo-header.svg"
                alt="Florida Exam Prep Logo"
                width={140}
                height={56}
                priority
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation className="hidden lg:flex" navItems={NAV_ITEMS} />

          {/* Right: CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <PrimaryButton
              variant="blue-solid"
              size="sm"
              className="hidden md:flex shadow-sm hover:shadow-md transition-shadow"
            >
              {CTA_TEXT}
            </PrimaryButton>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <RiCloseLine className="size-7" />
              ) : (
                <RiMenu3Line className="size-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className="h-[82px] md:h-[90px]" />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
      />
    </>
  );
}
