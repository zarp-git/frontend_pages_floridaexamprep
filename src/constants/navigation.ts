import type { INavItem } from "@/types/header";

/**
 * Navigation Items - Single Source of Truth (SSOT)
 *
 * This constant defines all navigation items used across the application.
 * Used by both desktop Navigation and MobileMenu components.
 */
export const NAV_ITEMS: INavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "Locations",
    href: "/locations",
    hasDropdown: true,
    dropdownItems: [
      { title: "Winter Haven", href: "/locations/winter-haven" },
      { title: "Lakeland", href: "/locations/lakeland" },
      { title: "Haines City", href: "/locations/haines-city" },
      { title: "Davenport", href: "/locations/davenport" },
      { title: "Auburndale", href: "/locations/auburndale" },
      { title: "Horizon West", href: "/locations/horizon-west" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      { title: "Pavers Installation", href: "/services/pavers-installation" },
      { title: "Pavers Repair", href: "/services/pavers-repair" },
      { title: "Maintenance Plans", href: "/services/maintenance-plans" },
      { title: "Patio Pavers", href: "/services/patio-pavers" },
      { title: "Pool Deck Pavers", href: "/services/pool-deck-pavers" },
      { title: "Driveway Pavers", href: "/services/driveway-pavers" },
      { title: "Firepit Pavers", href: "/services/firepit-pavers" },
    ],
  },
  { title: "Gallery", href: "/gallery" },
  { title: "Learning Center", href: "/learning-center" },
  {
    title: "Tools",
    href: "/tools",
    hasDropdown: true,
    dropdownItems: [
      { title: "Cost Calculator", href: "/tools/cost-calculator" },
      { title: "Design Visualizer", href: "/tools/design-visualizer" },
    ],
  },
];
