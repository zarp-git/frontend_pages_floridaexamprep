"use client";

import React from "react";
import Header from "@/presentation/components/organisms/common/header/Header";
import Footer from "@/presentation/components/organisms/common/footer/Footer";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useLenisScroll } from "@/hooks/use-lenis-scroll";
import type { INavItem, FooterVariant } from "@/types/header";

export interface SiteLayoutProps {
  children: React.ReactNode;
  navItems?: INavItem[];
  footerNavLinks?: { label: string; href: string }[];
  className?: string;
  style?: React.CSSProperties;
  footerVariant?: FooterVariant;
}

export default function SiteLayout({
  children,
  navItems,
  footerNavLinks,
  className,
  style,
  footerVariant,
}: SiteLayoutProps) {
  // Scroll aesthetic com Lenis (inércia e easing suave)
  useLenisScroll({
    duration: 1.2,
    smoothness: 0.1,
    wheelMultiplier: 1,
  });

  // Scroll suave para anchor links com offset para header fixo
  useSmoothScroll({ offset: 80 });

  return (
    <div className="h-full">
      <Header navItems={navItems} />

      {/* Espaço superior para compensar header fixo */}
      <main className={cn("pt-0", className)} style={style}>
        {children}
      </main>

      <Footer navLinks={footerNavLinks} variant={footerVariant} />
    </div>
  );
}
