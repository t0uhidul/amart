"use client";

import { useCart } from "@/contexts/cart-context";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartModal from "./cart-modal";

export default function CartButton() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount, totalAmount } = useCart();

  return (
    <>
      <button
        onClick={() => setCartOpen(!cartOpen)}
        className={`
          relative flex items-center gap-2 px-3 py-2 rounded-lg
          text-sm font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          sm:px-4 sm:py-2.5
          ${
            cartCount > 0
              ? "bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-300"
          }
        `}
      >
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
        </div>

        <div className="hidden sm:flex flex-col items-start">
          <span className="text-xs opacity-90">
            {cartCount > 0
              ? `${cartCount} item${cartCount > 1 ? "s" : ""}`
              : "Cart"}
          </span>
          {cartCount > 0 && (
            <span className="text-sm font-semibold">
              ৳{totalAmount.toLocaleString()}
            </span>
          )}
        </div>
      </button>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
