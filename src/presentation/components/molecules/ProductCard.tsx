"use client";

import { BookstoreProduct } from "@/types/bookstore";
import { useCart } from "@/presentation/components/providers/CartProvider";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: BookstoreProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {product.image && (
        <div className="w-full h-48 bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-bold font-red-hat text-gray-900 mb-2">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 font-rubik">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          
          <PrimaryButton
            variant="orange"
            size="sm"
            onClick={() => addItem(product)}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
