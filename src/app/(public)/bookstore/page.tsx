"use client";

import { useState } from "react";
import { BOOKSTORE_PRODUCTS, BOOKSTORE_CATEGORIES } from "@/constants/bookstore";
import { BookstoreCategory } from "@/types/bookstore";
import ProductCard from "@/presentation/components/molecules/ProductCard";
import Header from "@/presentation/components/organisms/landing-page/Header";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";

export default function BookstorePage() {
  const [selectedCategory, setSelectedCategory] = useState<BookstoreCategory | "all">("all");

  const filteredProducts = selectedCategory === "all"
    ? BOOKSTORE_PRODUCTS
    : BOOKSTORE_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-red-hat text-center mb-4">
              Book Store
            </h1>
            <p className="text-lg text-gray-600 font-rubik text-center">
              Everything you need to pass your Florida Contractor Exam
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Products
            </button>
            {Object.entries(BOOKSTORE_CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as BookstoreCategory)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === key
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found in this category</p>
            </div>
          )}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
