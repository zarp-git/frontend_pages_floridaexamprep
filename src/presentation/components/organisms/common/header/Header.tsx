"use client";

import { useState, useEffect } from "react";
import { RiMenu3Line, RiCloseLine, RiPhoneLine } from "@remixicon/react";
import { Button } from "@/presentation/components/atoms/ui/button";
import CompanyLogo from "@/presentation/components/atoms/CompanyLogo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";
import type { INavItem } from "@/types/header";
import { NAV_ITEMS } from "@/constants";
import { useLeadModal } from "@/hooks/use-lead-modal";
import { useContactModal } from "@/hooks/use-contact-modal";

interface HeaderProps {
  navItems?: INavItem[];
}

export default function Header({ navItems }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useLeadModal();
  const { openModal: openContactModal } = useContactModal();

  const items = navItems || NAV_ITEMS;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
            : "bg-white/80 backdrop-blur-sm py-3",
        )}
      >
        <div className="section-container flex items-center justify-between h-[60px] md:h-[70px]">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <CompanyLogo size="md" />
          </div>

          {/* Center: Desktop Navigation */}
          <Navigation className="hidden lg:flex" navItems={items} />

          {/* Right: CTA Buttons + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <div className="hidden xl:flex items-center gap-3">
              <Button
                variant="brick-outline"
                className="px-5 h-10 font-rubik text-sm font-bold uppercase tracking-wide border-2"
                onClick={openModal}
              >
                Free Consultation
              </Button>
              <Button
                variant="brick"
                className="px-5 h-10 font-rubik text-sm font-bold uppercase tracking-wide flex items-center gap-2"
                onClick={openContactModal}
              >
                Contact Us <RiPhoneLine className="size-4" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-gray-100 rounded-lg transition-colors"
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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={items}
      />
    </>
  );
}
