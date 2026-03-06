// Navigation Constants - Single Source of Truth for all header/footer links

// Base interface for simple navigation links (footer, breadcrumbs, etc.)
export interface NavLink {
  label: string;
  href: string;
  isMaintenance?: boolean;
}

// Extended interface for header navigation with dropdowns
export interface NavItemWithDropdown {
  title: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavItemWithDropdown[];
  isMaintenance?: boolean;
}

// Type alias for components that use the navigation items
export type NavItem = NavItemWithDropdown;

// ============================================================================
// HEADER NAVIGATION
// ============================================================================

export const HEADER_NAV_ITEMS: NavItemWithDropdown[] = [
  { title: "Home", href: "/" },
  {
    title: "Programs",
    href: "/programs",
    hasDropdown: true,
    dropdownItems: [
      { title: "Business And Finance", href: "/courses/business-finance" },
      { title: "General Contractor", href: "/programs/general-contractor", isMaintenance: true },
      { title: "Building Contractor", href: "/programs/building-contractor", isMaintenance: true },
      { title: "Residential Contractor", href: "/programs/residential-contractor", isMaintenance: true },
      { title: "Contract Administration/Project Management", href: "/courses/contract-administration" },
    ],
  },
  {
    title: "BookStore",
    href: "/bookstore",
    hasDropdown: true,
    dropdownItems: [
      { title: "Book Packages", href: "/bookstore/packages", isMaintenance: true },
      { title: "Books", href: "/bookstore/books", isMaintenance: true },
      { title: "Tabs", href: "/bookstore/tabs", isMaintenance: true },
      { title: "Calculators", href: "/bookstore/calculators", isMaintenance: true },
    ],
  },
  {
    title: "Quizzes",
    href: "/quizzes",
    hasDropdown: true,
    dropdownItems: [
      { title: "Business and Finance", href: "/quizzes/business-finance", isMaintenance: true },
      { title: "Contract Administration", href: "/quizzes/contract-administration", isMaintenance: true },
      { title: "Project Management", href: "/quizzes/project-management", isMaintenance: true },
      { title: "Bundle", href: "/quizzes/bundle", isMaintenance: true },
    ],
  },
  { title: "Pass Board", href: "/florida-contractor-exam-pass-board" },
  {
    title: "Freebies",
    href: "/freebies",
    hasDropdown: true,
    dropdownItems: [
      { title: "Business and Finance Quiz", href: "/freebies/business-finance-quiz", isMaintenance: true },
      { title: "Contract Administration Quiz", href: "/freebies/contract-administration-quiz", isMaintenance: true },
      { title: "Project Management Quiz", href: "/freebies/project-management-quiz", isMaintenance: true },
      { title: "Business and Finance WhatsApp Group", href: "/freebies/business-finance-whatsapp", isMaintenance: true },
      { title: "CA/PM WhatsApp Group", href: "/freebies/capm-whatsapp", isMaintenance: true },
    ],
  },
  { title: "FAQ", href: "/faq" },
] as const;

// ============================================================================
// FOOTER NAVIGATION
// ============================================================================

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { label: "About us", href: "/about" },
  { label: "Learning Area", href: "/learning" },
  { label: "Blog", href: "/blog" },
] as const;

export const FOOTER_COURSE_LINKS: NavLink[] = [
  { label: "Pass Board", href: "/florida-contractor-exam-pass-board" },
  { label: "Business And Finance", href: "/courses/business-finance" },
  { label: "General Contractor", href: "/programs/general-contractor", isMaintenance: true },
  { label: "Building Contractor", href: "/programs/building-contractor", isMaintenance: true },
  { label: "Residential Contractor", href: "/programs/residential-contractor", isMaintenance: true },
  { label: "Contract Administration/Project Management", href: "/courses/contract-administration" },
] as const;

export const FOOTER_BOOK_LINKS: NavLink[] = [
  { label: "Book Packages", href: "/bookstore/packages", isMaintenance: true },
  { label: "Books", href: "/bookstore/books", isMaintenance: true },
  { label: "Tabs", href: "/bookstore/tabs", isMaintenance: true },
  { label: "Calculators", href: "/bookstore/calculators", isMaintenance: true },
] as const;

// ============================================================================
// FEATURED FOOTER COURSES (for quick access section)
// ============================================================================

export const FOOTER_FEATURED_COURSES: NavLink[] = [
  { label: "Business And Finance", href: "/courses/business-finance" },
  { label: "Contract Administration", href: "/courses/contract-admin" },
  { label: "Complete Exam Prep", href: "/courses/complete-prep" },
] as const;
