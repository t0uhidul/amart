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
      <div className="flex items-center py-4 sm:px-4">
        <button
          className={`relative flex items-center gap-2 px-2 py-2 sm:px-2 sm:py-3 rounded-md transition-colors min-h-[40px] sm:min-h-[48px] ${
            cartCount > 0
              ? "bg-primary text-white"
              : "bg-gray-200 text-white hover:bg-gray-300 hover:text-white"
          }`}
          onClick={() => setCartOpen(!cartOpen)}
        >
          <ShoppingCart className="text-white" size={20} />

          {/* Consistent font size, prevent layout shift */}
          <p className="hidden sm:inline-flex font-semibold text-sm sm:text-base whitespace-nowrap min-w-[100px] justify-center">
            {cartCount > 0 ? `${cartCount} Items ৳${totalAmount}` : "My Cart"}
          </p>
        </button>
      </div>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
