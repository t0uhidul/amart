// components/ProductDetails.tsx

"use client";

import { Loader2 } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductDetailsProps {
  product: Product;
  category: string;
  quantity: number;
  loading: boolean;
  handleAddToCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
}

export default function ProductDetails({
  product,
  category,
  quantity,
  loading,
  handleAddToCart,
  incrementQuantity,
  decrementQuantity,
}: ProductDetailsProps) {
  return (
    <div className="p-2 sm:p-3 flex flex-col flex-grow">
      <div className="text-[10px] text-gray-500 mb-0.5">{category}</div>
      <h2 className="font-semibold text-xs sm:text-sm line-clamp-1">
        {product.name}
      </h2>
      <p className="text-[11px] text-gray-500 line-clamp-1 mb-1">
        {product.description}
      </p>

      <div className="mt-auto">
        <div className="flex items-center gap-1 text-[11px] mb-1 text-gray-600 py-2">
          <span>1 kg</span>
        </div>

        <div className="flex items-center gap-2 justify-between">
          <p className="text-sm font-bold text-gray-700">
            ৳{product.sellingPice}
          </p>
          {quantity < 1 ? (
            <button
              onClick={() => handleAddToCart(product)}
              className="flex h-7 sm:h-8 min-w-[64px] sm:min-w-[72px] text-xs items-center font-bold justify-center gap-1 bg-primary/10 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <span>ADD</span>
              )}
            </button>
          ) : (
            <div className="flex h-7 sm:h-8 min-w-[64px] sm:min-w-[72px] items-center font-bold justify-between rounded border border-primary bg-primary text-white text-xs sm:text-sm overflow-hidden">
              <button
                onClick={() => decrementQuantity(product)}
                className="w-1/3 h-full hover:bg-primary/90"
              >
                -
              </button>
              <span className="w-1/3 text-center">{quantity}</span>
              <button
                onClick={() => incrementQuantity(product)}
                className="w-1/3 h-full hover:bg-primary/90"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
