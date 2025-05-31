"use client";

import { useCart } from "@/contexts/cart-context";
import { Product } from "@/lib/types";
import { Eye, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductDetails from "./productItem-details";

type ProductItemProps = {
  product: Product;
  onQuickView?: () => void;
  isFeatured?: boolean;
};

export default function ProductItem({
  product,
  onQuickView,
  isFeatured = false,
}: ProductItemProps) {
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
      className={` ${
        isFeatured ? "flex flex-col border rounded-md overflow-hidden bg-white  text-sm" : "flex items-center gap-4 p-4"
      } `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFeatured ? (
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
      ) : (
        <div className="w-16 h-16 border rounded-md overflow-hidden">
          <Image
            src={imgUrl}
            alt={product.name}
            width={64}
            height={64}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      )}

      <ProductDetails
        product={product}
        category={category}
        quantity={quantity}
        loading={loading}
        handleAddToCart={handleAddToCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
    </div>
  );
}
