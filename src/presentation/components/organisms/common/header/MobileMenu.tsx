"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine, RiPhoneLine, RiCloseLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
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

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
} as const;

const navItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 25, stiffness: 250 },
  },
  exit: { opacity: 0, x: 30, transition: { duration: 0.15 } },
} as const;

const dropdownVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { type: "spring", damping: 25, stiffness: 300 },
      opacity: { duration: 0.2, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.1 },
    },
  },
} as const;

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, type: "spring", damping: 25 },
  },
} as const;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <CompanyLogo size="sm" />
              <motion.button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
                whileTap={{ scale: 0.9, rotate: 90 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <RiCloseLine className="size-6" />
              </motion.button>
            </div>

            {/* Scrollable Nav Content */}
            <nav className="flex-1 overflow-y-auto py-4 px-5">
              <div className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = item.hasDropdown
                    ? pathname.startsWith(item.href) && item.href !== "/"
                    : pathname === item.href;

                  return (
                    <motion.div
                      key={item.title}
                      variants={navItemVariants}
                      custom={index}
                    >
                      {item.hasDropdown && item.dropdownItems ? (
                        /* Accordion Section */
                        <div>
                          <motion.button
                            onClick={() => toggleSection(item.title)}
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-3 rounded-lg text-left font-rubik font-medium text-base transition-colors",
                              openSections[item.title]
                                ? "text-primary bg-primary/5"
                                : "text-gray-900 hover:bg-gray-50",
                            )}
                            aria-expanded={openSections[item.title]}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>{item.title}</span>
                            <motion.span
                              animate={{
                                rotate: openSections[item.title] ? 180 : 0,
                              }}
                              transition={{
                                type: "spring",
                                damping: 15,
                                stiffness: 200,
                              }}
                            >
                              <RiArrowDownSLine className="size-5 text-gray-400" />
                            </motion.span>
                          </motion.button>

                          {/* Dropdown Content */}
                          <AnimatePresence>
                            {openSections[item.title] && (
                              <motion.div
                                className="ml-3 mt-1 mb-2 pl-3 border-l-2 border-primary/20 space-y-0.5 overflow-hidden"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                {item.dropdownItems.map((subItem, subIndex) => (
                                  <motion.div
                                    key={subItem.title}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                      transition: { delay: subIndex * 0.05 },
                                    }}
                                  >
                                    <Link
                                      href={subItem.href}
                                      onClick={(e) =>
                                        handleLinkClick(e, subItem.href)
                                      }
                                      className="block px-3 py-2.5 text-sm font-rubik text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
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
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Footer CTA */}
            <motion.div
              className="p-5 border-t border-gray-100 space-y-3"
              variants={footerVariants}
            >
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
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
