"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMaintenanceModal } from "@/hooks/use-maintenance-modal";

interface NavItem {
  title: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { title: string; href: string }[];
  isMaintenance?: boolean;
}

interface NavigationProps {
  navItems: NavItem[];
  className?: string;
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
 * Uses layoutId for smooth active-state transitions.
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
      className="absolute left-0 bottom-0 h-0.5 bg-blue-600 rounded-full"
      initial={{ scaleX: 0, originX: 1 }}
      style={{ width: "100%", transformOrigin: "right" }}
      animate={{ scaleX: isActive ? 1 : 0, originX: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      key={`underline-${itemKey}`}
    />
  );
}

export default function Navigation({ navItems, className }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { openModal } = useMaintenanceModal();

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
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
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

  const handleToggle = (title: string) => {
    setActiveDropdown((prev) => (prev === title ? null : title));
  };

  const getIsActive = (item: NavItem): boolean => {
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

  return (
    <nav ref={navRef} className={cn("flex items-center gap-1", className)}>
      {navItems.map((item) => {
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
                    "relative flex items-center gap-1 px-3 py-2 rounded-lg text-base font-medium font-rubik transition-colors group",
                    activeDropdown === item.title
                      ? "text-blue-600 bg-blue-50"
                      : isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
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
                    <ChevronDown className="size-4" />
                  </motion.span>
                  {/* Animated underline: right to left */}
                  <NavUnderline isActive={showUnderline} itemKey={item.title} />
                </motion.button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === item.title && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 min-w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {item.dropdownItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        const isBookItem = item.title === "Books";
                        
                        return (
                          <motion.div
                            key={subItem.title}
                            variants={dropdownItemVariants}
                          >
                            {isBookItem ? (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveDropdown(null);
                                  openModal();
                                }}
                                className={cn(
                                  "flex items-center px-4 py-2.5 text-sm font-rubik transition-colors relative w-full text-left",
                                  "text-gray-700 hover:text-blue-600 hover:bg-blue-50",
                                )}
                              >
                                {subItem.title}
                              </button>
                            ) : (
                              <Link
                                href={subItem.href}
                                onClick={() => setActiveDropdown(null)}
                                className={cn(
                                  "flex items-center px-4 py-2.5 text-sm font-rubik transition-colors relative",
                                  isSubActive
                                    ? "text-blue-600 bg-blue-50 font-medium"
                                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50",
                                )}
                              >
                                {subItem.title}
                                {/* Left border indicator for active item */}
                                {isSubActive && (
                                  <motion.span
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r"
                                    layoutId="dropdown-active-indicator"
                                  />
                                )}
                              </Link>
                            )}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : /* Regular Link */
            item.isMaintenance ? (
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
                onHoverStart={() => setHoveredItem(item.title)}
                onHoverEnd={() => setHoveredItem(null)}
                className={cn(
                  "relative flex items-center px-3 py-2 rounded-lg text-base font-medium font-rubik transition-colors group",
                  "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                )}
                whileTap={{ scale: 0.97 }}
              >
                {item.title}
                <NavUnderline isActive={isHovered} itemKey={item.title} />
              </motion.button>
            ) : (
              <motion.div
                onHoverStart={() => setHoveredItem(item.title)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center px-3 py-2 rounded-lg text-base font-medium font-rubik transition-colors group",
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
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
