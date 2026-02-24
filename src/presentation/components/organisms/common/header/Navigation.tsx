"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine } from "@remixicon/react";
import type { INavItem } from "@/types/header";
import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import { useMaintenanceModal } from "@/hooks/use-maintenance-modal";

interface NavigationProps {
  className?: string;
  navItems?: INavItem[];
}

export default function Navigation({ className, navItems }: NavigationProps) {
  const items = navItems || NAV_ITEMS;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { openModal } = useMaintenanceModal();

  // Detect active section via IntersectionObserver (for anchor links on home page)
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = items
      .map((item) => {
        if (item.href.startsWith("/#")) return item.href.substring(2);
        if (item.href.startsWith("#")) return item.href.substring(1);
        return null;
      })
      .filter(Boolean) as string[];

    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items, pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!activeDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeDropdown]);

  const handleToggle = (title: string) => {
    setActiveDropdown((prev) => (prev === title ? null : title));
  };

  const getIsActive = (item: INavItem): boolean => {
    const isAnchorLink =
      item.href.startsWith("/#") || item.href.startsWith("#");

    if (isAnchorLink) {
      const hash = item.href.startsWith("/#")
        ? item.href.substring(1)
        : item.href;
      return activeSection === hash;
    }

    if (item.hasDropdown) {
      return pathname.startsWith(item.href) && item.href !== "/";
    }

    return pathname === item.href;
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/learning-center" || href === "/tools/design-visualizer" || href === "/tools/cost-calculator") {
      e.preventDefault();
      openModal();
    }
  };

  return (
    <nav ref={navRef} className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const isActive = getIsActive(item);

        return (
          <div key={item.title} className="relative">
            {item.hasDropdown && item.dropdownItems ? (
              <>
                {/* Dropdown Trigger */}
                <button
                  onClick={() => handleToggle(item.title)}
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium font-rubik transition-colors",
                    activeDropdown === item.title
                      ? "text-primary bg-primary/5"
                      : isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary hover:bg-gray-50",
                  )}
                >
                  {item.title}
                  <RiArrowDownSLine
                    className={cn(
                      "size-4 transition-transform duration-200",
                      activeDropdown === item.title && "rotate-180",
                    )}
                  />

                  {/* Active indicator bar */}
                  <span
                    className={cn(
                      "absolute left-0 bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </button>

                {/* Dropdown Panel */}
                {activeDropdown === item.title && (
                  <div className="absolute top-full left-0 mt-2 min-w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.dropdownItems.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          onClick={(e) => {
                            setActiveDropdown(null);
                            handleLinkClick(e, subItem.href);
                          }}
                          className={cn(
                            "flex items-center px-4 py-2.5 text-sm font-rubik transition-colors",
                            isSubActive
                              ? "text-primary bg-primary/5 font-medium"
                              : "text-gray-700 hover:text-primary hover:bg-primary/5",
                          )}
                        >
                          {subItem.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              /* Regular Link */
              <Link
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={cn(
                  "relative flex items-center px-3 py-2 rounded-lg text-sm font-medium font-rubik transition-colors group",
                  isActive
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-gray-50",
                )}
              >
                {item.title}

                {/* Active indicator bar */}
                <span
                  className={cn(
                    "absolute left-0 bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out",
                    isActive ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
