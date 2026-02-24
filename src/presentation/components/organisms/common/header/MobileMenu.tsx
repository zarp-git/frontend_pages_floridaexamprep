"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiPhoneLine,
  RiCloseLine,
} from "@remixicon/react";
import { Button } from "@/presentation/components/atoms/ui/button";
import CompanyLogo from "@/presentation/components/atoms/CompanyLogo";
import type { INavItem } from "@/types/header";
import { cn } from "@/lib/utils";
import { useLeadModal } from "@/hooks/use-lead-modal";
import { useContactModal } from "@/hooks/use-contact-modal";
import { useMaintenanceModal } from "@/hooks/use-maintenance-modal";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: INavItem[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
}: MobileMenuProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const { openModal } = useLeadModal();
  const { openModal: openContactModal } = useContactModal();
  const { openModal: openMaintenanceModal } = useMaintenanceModal();

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/learning-center" || href === "/tools/design-visualizer" || href === "/tools/cost-calculator") {
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
          <CompanyLogo size="sm" />
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
              const isActive = item.hasDropdown
                ? pathname.startsWith(item.href) && item.href !== "/"
                : pathname === item.href;

              return (
              <div key={item.title}>
                {item.hasDropdown && item.dropdownItems ? (
                  /* Accordion Section */
                  <div>
                    <button
                      onClick={() => toggleSection(item.title)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-3 rounded-lg text-left font-rubik font-medium text-base transition-colors",
                        openSections[item.title]
                          ? "text-primary bg-primary/5"
                          : "text-gray-900 hover:bg-gray-50",
                      )}
                      aria-expanded={openSections[item.title]}
                    >
                      <span>{item.title}</span>
                      {openSections[item.title] ? (
                        <RiArrowUpSLine className="size-5 text-primary" />
                      ) : (
                        <RiArrowDownSLine className="size-5 text-gray-400" />
                      )}
                    </button>

                    {/* Dropdown Content */}
                    {openSections[item.title] && (
                      <div className="ml-3 mt-1 mb-2 pl-3 border-l-2 border-primary/20 space-y-0.5">
                        {item.dropdownItems.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={(e) => handleLinkClick(e, subItem.href)}
                            className="block px-3 py-2.5 text-sm font-rubik text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Simple Link */
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={cn(
                      "flex items-center px-3 py-3 rounded-lg text-base font-rubik font-medium transition-colors",
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-gray-900 hover:text-primary hover:bg-gray-50",
                    )}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
              );
            })}
          </div>
        </nav>

        {/* Footer CTA */}
        <div className="p-5 border-t border-gray-100 space-y-3">
          <Button
            variant="brick-outline"
            size="lg"
            className="w-full text-sm font-bold uppercase tracking-wide"
            onClick={() => {
              onClose();
              openModal();
            }}
          >
            Book a Free Consultation
          </Button>
          <Button
            variant="brick"
            size="lg"
            className="w-full text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2"
            onClick={() => {
              onClose();
              openContactModal();
            }}
          >
            Contact Us <RiPhoneLine className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
