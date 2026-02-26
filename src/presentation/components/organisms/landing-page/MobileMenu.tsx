"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseLine,
} from "@remixicon/react";
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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const { openModal: openMaintenanceModal } = useMaintenanceModal();

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.isMaintenance) {
      e.preventDefault();
      onClose();
      openMaintenanceModal();
    } else {
      onClose();
    }
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "#") return false;
    return pathname.startsWith(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <Link href="/" onClick={onClose}>
            <Image
              src="/images/logo/florida-logo-header.svg"
              alt="Florida Exam Prep Logo"
              width={120}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <RiCloseLine className="size-6" />
          </button>
        </div>

        {/* Scrollable Nav Content */}
        <nav className="flex-1 overflow-y-auto py-4 px-5">
          <div className="space-y-1">
            {navItems.map((item) => {
              const itemIsActive = isActive(item.href);

              return (
                <div key={item.label}>
                  {item.hasDropdown && item.dropdownItems ? (
                    /* Accordion Section */
                    <div>
                      <button
                        onClick={() => toggleSection(item.label)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-3 rounded-lg text-left font-rubik font-medium text-base transition-colors",
                          openSections[item.label]
                            ? "text-blue-600 bg-blue-50"
                            : itemIsActive
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-900 hover:bg-gray-50"
                        )}
                        aria-expanded={openSections[item.label]}
                      >
                        <span>{item.label}</span>
                        {openSections[item.label] ? (
                          <RiArrowUpSLine className="size-5 text-blue-600" />
                        ) : (
                          <RiArrowDownSLine className="size-5 text-gray-400" />
                        )}
                      </button>

                      {/* Dropdown Content */}
                      {openSections[item.label] && (
                        <div className="ml-3 mt-1 mb-2 pl-3 border-l-2 border-blue-600/20 space-y-0.5">
                          {item.dropdownItems.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={(e) => handleLinkClick(e, { ...subItem, isMaintenance: false })}
                              className={cn(
                                "block px-3 py-2.5 text-sm font-rubik rounded-lg transition-colors",
                                isActive(subItem.href)
                                  ? "text-blue-600 bg-blue-50 font-medium"
                                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                              )}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : item.isMaintenance ? (
                    /* Maintenance Link */
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        openMaintenanceModal();
                      }}
                      className="flex items-center w-full px-3 py-3 rounded-lg text-base font-rubik font-medium transition-colors text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                    >
                      {item.label}
                    </button>
                  ) : (
                    /* Simple Link */
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={cn(
                        "flex items-center px-3 py-3 rounded-lg text-base font-rubik font-medium transition-colors",
                        itemIsActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer CTA */}
        <div className="p-5 border-t border-gray-100">
          <PrimaryButton
            variant="blue-solid"
            size="lg"
            className="w-full text-sm font-bold uppercase tracking-wide shadow-sm hover:shadow-md transition-shadow"
            onClick={onClose}
          >
            {CTA_TEXT}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
