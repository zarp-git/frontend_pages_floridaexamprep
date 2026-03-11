"use client";

import { use } from "react";
import { BOOKSTORE_PRODUCTS, BOOKSTORE_CATEGORIES } from "@/constants/bookstore";
import { BookstoreCategory } from "@/types/bookstore";
import ProductCard from "@/presentation/components/molecules/ProductCard";
import Header from "@/presentation/components/organisms/landing-page/Header";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params);
  
  const categoryKey = category as BookstoreCategory;
  const categoryName = BOOKSTORE_CATEGORIES[categoryKey];
  
  if (!categoryName) {
    return (
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold font-red-hat mb-4">Category Not Found</h1>
            <Link href="/bookstore" className="text-blue-600 hover:underline">
              Back to Book Store
            </Link>
          </div>
        </main>
        <LandingFooter />
      </div>
    );
  }

  const products = BOOKSTORE_PRODUCTS.filter((p) => p.category === categoryKey);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <Link href="/bookstore" className="text-blue-600 hover:underline mb-4 inline-block">
              ← Back to All Products
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold font-red-hat mb-4">
              {categoryName}
            </h1>
            <p className="text-lg text-gray-600 font-rubik">
              Browse our selection of {categoryName.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products available in this category yet</p>
            </div>
          )}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
