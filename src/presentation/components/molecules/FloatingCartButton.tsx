"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/presentation/components/providers/CartProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingCartButton() {
  const { itemCount } = useCart();
  const pathname = usePathname();

  // Só mostra na home e se tiver itens no carrinho
  const shouldShow = pathname === "/" && itemCount > 0;

  if (!shouldShow) return null;

  return (
    <>
      <style jsx>{`
        @keyframes continuousBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes continuousPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .bounce-continuous {
          animation: continuousBounce 2s ease-in-out infinite;
        }
        
        .pulse-continuous {
          animation: continuousPulse 2s ease-in-out infinite;
        }
      `}</style>
      
      <Link
        href="/bookstore/cart"
        className="fixed bottom-8 left-8 z-50 group"
        aria-label="View cart"
      >
        <div className="relative bounce-continuous">
          {/* Pulse animation rings - contínuos */}
          <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75" />
          <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
          
          {/* Main button */}
          <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 group-hover:scale-110">
            <ShoppingCart className="w-6 h-6" strokeWidth={2.5} />
            
            {/* Badge com animação contínua */}
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg pulse-continuous">
              {itemCount}
            </span>
          </div>
        </div>
        
        {/* Tooltip melhorado */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl">
          Complete sua compra
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900" />
        </div>
      </Link>
    </>
  );
}
