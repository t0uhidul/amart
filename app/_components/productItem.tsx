"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBagIcon, Eye, Star, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { addToCart, getCartItems } from "@/lib/actions";
import GlobalApi from "../_utils/GlobalApi";

export default function ProductItem({
  product,
  onQuickView,
  isFeatured = false,
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { showLoginModal, authState, authToken, authId } = useAuth();
  const { setCartCount, setCartItems } = useCart();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

  // Add safety checks for product data
  const imgUrl = product.image?.[0]?.url
    ? product.image[0].url.startsWith("http")
      ? product.image[0].url
      : baseUrl + product.image[0].url
    : "/placeholder.svg?height=300&width=300";

  const category = product.categories?.[0]?.name || "";

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const discount = Math.round(
    ((Number.parseFloat(product.mrp) - Number.parseFloat(product.sellingPice)) /
      Number.parseFloat(product.mrp)) *
      100
  );

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!authToken || authState !== "authenticated") {
      showLoginModal();
      return;
    }

    setLoading(true);

    try {
      await addToCart(
        {
          user: authId,
          product: product.id,
          quantity,
        },
        authToken
      );

      toast.success("Added to cart");
      const items = await GlobalApi.getToCart(authToken);
      // const items = await getCartItems(authToken);
      console.log("Cart items:", items);
      setCartCount(items?.length || 0);
    } catch (error: any) {
      const message = error?.response?.data?.detail || "Failed to add to cart";
      console.error("Add to cart error:", message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {isFeatured && (
          <Badge className="absolute top-2 left-2 z-10 bg-green-600 hover:bg-green-700">
            SALE
          </Badge>
        )}
        {discount >= 10 && !isFeatured && (
          <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">
            {discount}% OFF
          </Badge>
        )}
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </div>
        <div className="h-48 sm:h-56 overflow-hidden">
          <Image
            src={imgUrl || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1">{category}</div>
        <h2 className="font-semibold text-sm sm:text-base line-clamp-1">
          {product.name}
        </h2>
        <p className="text-xs text-gray-500 line-clamp-1 mb-2">
          {product.description}
        </p>

        {/* <div className="flex items-center mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${
                star <= 4
                  ? "fill-green-600 text-green-600"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.0)</span>
        </div> */}

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="line-through text-xs text-red-400">
              ৳{product.mrp}
            </span>
            <span className="text-base font-semibold text-green-600">
              ৳{product.sellingPice}
            </span>
            <span className="text-xs text-gray-600">
              /{product.ItemQuantityType || "Kg"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-2 py-1 text-sm">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex-1 h-8 text-xs flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <>
                  <ShoppingBagIcon size={14} />
                  ADD TO Bag
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
