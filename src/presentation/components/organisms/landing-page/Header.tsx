"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiMenu3Line, RiCloseLine } from "@remixicon/react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT, HEADER_NAV_ITEMS } from "@/constants";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import CartButton from "@/presentation/components/molecules/CartButton";
import { cn } from "@/lib/utils";

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
          <Navigation className="hidden lg:flex" navItems={HEADER_NAV_ITEMS} />

          {/* Right: Cart + CTA + Mobile Toggle */}
          <div className="flex items-center gap-10">
            {/* Cart Button */}
            <CartButton />

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
        navItems={HEADER_NAV_ITEMS}
      />
    </>
  );
}
