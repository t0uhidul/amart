"use client";

import { useCart } from "@/contexts/cart-context";
import { Product } from "@/lib/types";
import { Eye, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductItem({
  product,
  onQuickView,
  isFeatured = false,
}) {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { cartItems, updateCart } = useCart();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

  // Add safety checks for product data
  const imgUrl = product.image
    ? baseUrl + product.image
    : "/placeholder.svg?height=300&width=300";

  console.log("product======", product);

  const category = product.categories?.[0]?.name || "";

  const cleanProduct = (product: Product) => ({
    id: product.id,
    name: product.name,
    sellingPice: product.sellingPice,
    quantity: 1,
  });

  useEffect(() => {
    const existing = cartItems[product.id];
    setQuantity(existing?.quantity || 0);
  }, [cartItems, product.id]);

  const handleAddToCart = (product: Product) => {
    const clean = cleanProduct(product);

    const existing = cartItems[clean.id] || { ...clean, quantity: 0 };

    const updated = {
      ...cartItems,
      [clean.id]: {
        ...clean,
        quantity: existing.quantity + 1,
      },
    };

    updateCart(updated);
    setQuantity(existing.quantity + 1);
  };

  const incrementQuantity = (product: Product) => {
    const clean = cleanProduct(product);
    const existing = cartItems[clean.id] || { ...clean, quantity: 0 };

    const updated = {
      ...cartItems,
      [clean.id]: {
        ...clean,
        quantity: existing.quantity + 1,
      },
    };

    updateCart(updated);
    setQuantity(existing.quantity + 1);
  };

  const decrementQuantity = (product: Product) => {
    const existing = cartItems[product.id];
    if (!existing) return;

    const updated = { ...cartItems };
    if (existing.quantity <= 1) {
      delete updated[product.id];
      setQuantity(0);
    } else {
      updated[product.id].quantity -= 1;
      setQuantity(updated[product.id].quantity);
    }

    updateCart(updated);
  };

  // setTimeout(() => {
  //   setLoading(true);
  // }, 100);
  // setLoading(false);

  // try {
  //   const newQty = 1;
  //   setQuantity(newQty); // Update UI immediately

  //   await addToCart(
  //     {
  //       user: authId,
  //       product: product.id,
  //       quantity: newQty,
  //     },
  //     authToken
  //   );

  //   toast.success("Added to cart");
  //   const items = await GlobalApi.getToCart(authToken);
  //   setCartCount(items?.length || 0);
  // } catch (error: any) {
  //   setQuantity(0); // rollback on error
  //   const message = error?.response?.data?.detail || "Failed to add to cart";
  //   console.error("Add to cart error:", message);
  //   toast.error(message);
  // } finally {
  //   setLoading(false);
  // }

  return (
    <div
      className="flex flex-col border rounded-md overflow-hidden bg-white  text-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="absolute top-1 right-1 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="bg-white p-1 rounded-full shadow hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </div>
        <div className="h-36 sm:h-40 md:h-48 overflow-hidden">
          <Image
            src={imgUrl || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            unoptimized
          />
        </div>
      </div>

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
    </div>
  );
}
