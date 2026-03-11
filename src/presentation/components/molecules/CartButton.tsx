"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/presentation/components/providers/CartProvider";
import Link from "next/link";

export default function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/bookstore/cart"
      className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <ShoppingCart className="w-6 h-6 text-gray-700" strokeWidth={2} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
