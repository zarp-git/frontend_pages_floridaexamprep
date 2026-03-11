import { BookstoreProduct } from "@/types/bookstore";

// Exemplo de produtos - você vai preencher com os dados reais
export const BOOKSTORE_PRODUCTS: BookstoreProduct[] = [
  // Book Packages
  {
    id: "pkg-001",
    name: "Business & Finance Book Package",
    category: "packages",
    price: 349,
    description: "Complete book set for Business & Finance exam",
  },
  {
    id: "pkg-002",
    name: "Contract Administration Book Package",
    category: "packages",
    price: 599,
    description: "Complete book set for CA/PM exam",
  },
  
  // Individual Books
  {
    id: "book-001",
    name: "Florida Contractor's Manual",
    category: "books",
    price: 75,
  },
  {
    id: "book-002",
    name: "Builder's Guide to Accounting",
    category: "books",
    price: 45,
  },
  
  // Tabs
  {
    id: "tab-001",
    name: "Book Tabs Set - Business & Finance",
    category: "tabs",
    price: 25,
  },
  
  // Calculators
  {
    id: "calc-001",
    name: "Construction Master Pro Calculator",
    category: "calculators",
    price: 89,
  },
];

export const BOOKSTORE_CATEGORIES = {
  packages: "Book Packages",
  books: "Books",
  tabs: "Tabs",
  calculators: "Calculators",
} as const;
