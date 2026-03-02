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
    title: "Courses",
    href: "/courses",
    hasDropdown: true,
    dropdownItems: [
      { title: "Business & Finance", href: "/courses/business-finance" },
      { title: "Contract Administration", href: "/courses/contract-administration" },
      { title: "Complete Exam Prep", href: "/courses/complete-exam-prep" },
    ],
  },
  {
    title: "Books",
    href: "/books",
    hasDropdown: true,
    dropdownItems: [
      { title: "AIA Documents", href: "/books/aia-documents" },
      { title: "Builder's Guide", href: "/books/builders-guide" },
      { title: "FL Contractor's Manual", href: "/books/contractors-manual" },
    ],
  },
  { title: "Quizzes", href: "/quizzes" },
  { title: "Win Board", href: "#", isMaintenance: true },
  { title: "Blog", href: "/blog" },
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
  { label: "Win Board", href: "#", isMaintenance: true },
  { label: "Business And Finance", href: "/courses/business-finance" },
  { label: "Contract Administration", href: "/courses/contract-admin" },
  { label: "Project Management", href: "/courses/project-management" },
  { label: "Complete Exam Prep", href: "/courses/complete-prep" },
] as const;

export const FOOTER_BOOK_LINKS: NavLink[] = [
  { label: "AIA Documents 201, 401, 701", href: "/books/aia-documents" },
  { label: "Builder's Guide to Accounting", href: "/books/builders-guide" },
  { label: "FL Contractor's Manual 2025", href: "/books/contractors-manual" },
  { label: "All Books Bundle", href: "/books/bundle" },
  { label: "Quizzes 1,000+ questions", href: "/books/quizzes" },
  { label: "All Books + Quizzes Bundle", href: "/books/complete-bundle" },
  { label: "Permanent Tabs For All Books", href: "/books/tabs" },
] as const;

// ============================================================================
// FEATURED FOOTER COURSES (for quick access section)
// ============================================================================

export const FOOTER_FEATURED_COURSES: NavLink[] = [
  { label: "Business And Finance", href: "/courses/business-finance" },
  { label: "Contract Administration", href: "/courses/contract-admin" },
  { label: "Complete Exam Prep", href: "/courses/complete-prep" },
] as const;
