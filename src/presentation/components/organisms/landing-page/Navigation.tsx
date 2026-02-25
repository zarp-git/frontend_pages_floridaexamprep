"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

interface NavigationProps {
  navItems: NavItem[];
  className?: string;
}

export default function Navigation({ navItems, className }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Detect active section via IntersectionObserver (for anchor links on home page)
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = navItems
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
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navItems, pathname]);

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

  const handleToggle = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const getIsActive = (item: NavItem): boolean => {
    const isAnchorLink = item.href.startsWith("/#") || item.href.startsWith("#");

    if (isAnchorLink) {
      const hash = item.href.startsWith("/#") ? item.href.substring(1) : item.href;
      return activeSection === hash;
    }

    if (item.hasDropdown) {
      return pathname.startsWith(item.href) && item.href !== "/";
    }

    return pathname === item.href;
  };

  return (
    <nav ref={navRef} className={cn("flex items-center gap-1", className)}>
      {navItems.map((item) => {
        const isActive = getIsActive(item);

        return (
          <div key={item.label} className="relative">
            {item.hasDropdown && item.dropdownItems ? (
              <>
                {/* Dropdown Trigger */}
                <button
                  onClick={() => handleToggle(item.label)}
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 rounded-lg text-base font-medium font-rubik transition-colors group",
                    activeDropdown === item.label
                      ? "text-blue-600 bg-blue-50"
                      : isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      activeDropdown === item.label && "rotate-180"
                    )}
                  />
                  {/* Active indicator bar */}
                  <span
                    className={cn(
                      "absolute left-0 bottom-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-out",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </button>

                {/* Dropdown Panel */}
                {activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 min-w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.dropdownItems.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setActiveDropdown(null)}
                          className={cn(
                            "flex items-center px-4 py-2.5 text-sm font-rubik transition-colors relative",
                            isSubActive
                              ? "text-blue-600 bg-blue-50 font-medium"
                              : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                          )}
                        >
                          {subItem.label}
                          {/* Left border indicator for active item */}
                          {isSubActive && (
                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
                          )}
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
                className={cn(
                  "relative flex items-center px-3 py-2 rounded-lg text-base font-medium font-rubik transition-colors group",
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                )}
              >
                {item.label}
                {/* Active indicator bar */}
                <span
                  className={cn(
                    "absolute left-0 bottom-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-out",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
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
