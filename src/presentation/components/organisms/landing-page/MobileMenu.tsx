"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";
import { useMaintenanceModal } from "@/hooks/use-maintenance-modal";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
  isMaintenance?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const { openModal } = useMaintenanceModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Detect active section via pathname
  useEffect(() => {
    const currentItem = navItems.find((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href);
    });

    if (currentItem) {
      setActiveSection(currentItem.label);
    }
  }, [pathname, navItems]);

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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold font-rubik text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const itemActive = getIsActive(item);

                return (
                  <li key={item.label}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-rubik transition-all duration-200",
                            openDropdown === item.label
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : itemActive
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 transition-transform duration-300",
                              openDropdown === item.label && "rotate-180"
                            )}
                          />
                        </button>

                        {/* Accordion Dropdown */}
                        {openDropdown === item.label && (
                          <ul className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <li key={dropdownItem.label}>
                                <Link
                                  href={dropdownItem.href}
                                  onClick={onClose}
                                  className={cn(
                                    "block px-4 py-2.5 rounded-lg text-sm font-rubik transition-all duration-150 relative",
                                    isActive(dropdownItem.href)
                                      ? "bg-blue-50 text-blue-600 font-medium"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                  )}
                                >
                                  {dropdownItem.label}
                                  {/* Left border indicator for active item */}
                                  {isActive(dropdownItem.href) && (
                                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : item.isMaintenance ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          openModal();
                          onClose();
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg text-base font-rubik transition-all duration-200",
                          "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-base font-rubik transition-all duration-200 relative",
                          itemActive
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {item.label}
                        {/* Left border indicator for active item */}
                        {itemActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="p-6 border-t border-gray-200">
            <PrimaryButton
              variant="blue-solid"
              size="lg"
              className="w-full shadow-sm hover:shadow-md transition-shadow"
              onClick={onClose}
            >
              {CTA_TEXT}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
