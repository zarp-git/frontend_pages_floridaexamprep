"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine, RiCloseLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
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
  const { openModal: openMaintenanceModal } = useMaintenanceModal();

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
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
              <Link href="/" onClick={onClose}>
                <Image
                  src="/images/logo/florida-logo-header.svg"
                  alt="Florida Exam Prep Logo"
                  width={120}
                  height={48}
                  className="h-12 w-auto"
                />
              </Link>
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
                  const itemIsActive = isActive(item.href);

                  return (
                    <motion.div
                      key={item.label}
                      variants={navItemVariants}
                      custom={index}
                    >
                      {item.hasDropdown && item.dropdownItems ? (
                        /* Accordion Section */
                        <div>
                          <motion.button
                            onClick={() => toggleSection(item.label)}
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-3 rounded-lg text-left font-rubik font-medium text-base transition-colors",
                              openSections[item.label]
                                ? "text-blue-600 bg-blue-50"
                                : itemIsActive
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-900 hover:bg-gray-50",
                            )}
                            aria-expanded={openSections[item.label]}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>{item.label}</span>
                            <motion.span
                              animate={{
                                rotate: openSections[item.label] ? 180 : 0,
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
                            {openSections[item.label] && (
                              <motion.div
                                className="ml-3 mt-1 mb-2 pl-3 border-l-2 border-blue-600/20 space-y-0.5 overflow-hidden"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                {item.dropdownItems.map((subItem, subIndex) => {
                                  const isBookItem = item.label === "Books";
                                  
                                  return (
                                    <motion.div
                                      key={subItem.label}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{
                                        opacity: 1,
                                        x: 0,
                                        transition: { delay: subIndex * 0.05 },
                                      }}
                                    >
                                      {isBookItem ? (
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            onClose();
                                            openMaintenanceModal();
                                          }}
                                          className={cn(
                                            "block px-3 py-2.5 text-sm font-rubik rounded-lg transition-colors w-full text-left",
                                            "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
                                          )}
                                        >
                                          {subItem.label}
                                        </button>
                                      ) : (
                                        <Link
                                          href={subItem.href}
                                          onClick={(e) =>
                                            handleLinkClick(e, {
                                              ...subItem,
                                              isMaintenance: false,
                                            })
                                          }
                                          className={cn(
                                            "block px-3 py-2.5 text-sm font-rubik rounded-lg transition-colors",
                                            isActive(subItem.href)
                                              ? "text-blue-600 bg-blue-50 font-medium"
                                              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
                                          )}
                                        >
                                          {subItem.label}
                                        </Link>
                                      )}
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : item.isMaintenance ? (
                        /* Maintenance Link */
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            openMaintenanceModal();
                          }}
                          className="flex items-center w-full px-3 py-3 rounded-lg text-base font-rubik font-medium transition-colors text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.label}
                        </motion.button>
                      ) : (
                        /* Simple Link */
                        <Link
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item)}
                          className={cn(
                            "flex items-center px-3 py-3 rounded-lg text-base font-rubik font-medium transition-colors",
                            itemIsActive
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-900 hover:text-blue-600 hover:bg-gray-50",
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Footer CTA */}
            <motion.div
              className="p-5 border-t border-gray-100"
              variants={footerVariants}
            >
              <PrimaryButton
                variant="blue-solid"
                size="lg"
                className="w-full text-sm font-bold uppercase tracking-wide shadow-sm hover:shadow-md transition-shadow"
                onClick={onClose}
              >
                {CTA_TEXT}
              </PrimaryButton>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
