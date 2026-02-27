"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
import type { INavItem } from "@/types/header";
import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import { useMaintenanceModal } from "@/hooks/use-maintenance-modal";

interface NavigationProps {
  className?: string;
  navItems?: INavItem[];
}

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    transition: { duration: 0.15 },
  },
} as const;

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
} as const;

/**
 * Animated underline that grows from right to left on hover.
 */
function NavUnderline({
  isActive,
  itemKey,
}: {
  isActive: boolean;
  itemKey: string;
}) {
  return (
    <motion.span
      className="absolute left-0 bottom-0 h-0.5 bg-primary rounded-full"
      initial={{ scaleX: 0, originX: 1 }}
      style={{ width: "100%", transformOrigin: "right" }}
      animate={{ scaleX: isActive ? 1 : 0, originX: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      key={`underline-${itemKey}`}
    />
  );
}

export default function Navigation({ className, navItems }: NavigationProps) {
  const items = navItems || NAV_ITEMS;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (
      href === "/learning-center" ||
      href === "/tools/design-visualizer" ||
      href === "/tools/cost-calculator"
    ) {
      e.preventDefault();
      openModal();
    }
  };

  return (
    <nav ref={navRef} className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const isActive = getIsActive(item);
        const isHovered = hoveredItem === item.title;
        const showUnderline = isActive || isHovered;

        return (
          <div key={item.title} className="relative">
            {item.hasDropdown && item.dropdownItems ? (
              <>
                {/* Dropdown Trigger */}
                <motion.button
                  onClick={() => handleToggle(item.title)}
                  onHoverStart={() => setHoveredItem(item.title)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium font-rubik transition-colors",
                    activeDropdown === item.title
                      ? "text-primary bg-primary/5"
                      : isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary hover:bg-gray-50",
                  )}
                  whileTap={{ scale: 0.97 }}
                >
                  {item.title}
                  <motion.span
                    animate={{
                      rotate: activeDropdown === item.title ? 180 : 0,
                    }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  >
                    <RiArrowDownSLine className="size-4" />
                  </motion.span>

                  {/* Animated underline: right to left */}
                  <NavUnderline isActive={showUnderline} itemKey={item.title} />
                </motion.button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === item.title && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 min-w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {item.dropdownItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <motion.div
                            key={subItem.title}
                            variants={dropdownItemVariants}
                          >
                            <Link
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
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              /* Regular Link */
              <motion.div
                onHoverStart={() => setHoveredItem(item.title)}
                onHoverEnd={() => setHoveredItem(null)}
              >
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

                  {/* Animated underline: right to left */}
                  <NavUnderline isActive={showUnderline} itemKey={item.title} />
                </Link>
              </motion.div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
