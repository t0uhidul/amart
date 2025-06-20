"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import CartActionButton from "../cart-action-button";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { cartItems, updateCart } = useCart();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
  const imgUrl = product.image
    ? baseUrl + product.image
    : "/placeholder.svg?height=300&width=300";

  // const category = product.categories?.[0]?.name || "Uncategorized";

  console.log("ProductModal product:", product);

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
    setLoading(true);
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
    setLoading(false);
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
    const clean = cleanProduct(product);
    const existing = cartItems[clean.id];

    if (!existing || existing.quantity <= 1) {
      const updated = { ...cartItems };
      delete updated[clean.id];
      updateCart(updated);
      setQuantity(0);
    } else {
      const updated = {
        ...cartItems,
        [clean.id]: {
          ...clean,
          quantity: existing.quantity - 1,
        },
      };
      updateCart(updated);
      setQuantity(existing.quantity - 1);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] md:max-w-5xl w-full max-h-[95vh] overflow-y-auto rounded-lg p-0 m-0">
        {/* Accessible Dialog Title */}
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogClose className="absolute right-2 top-2 z-50 text-gray-700 hover:text-black bg-white/80 rounded-full p-1 shadow-sm">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 bg-white">
          {/* Left: Image */}
          <div className="relative flex items-center justify-center bg-gray-100 rounded-md p-2">
            <Image
              src={imgUrl}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain max-h-[400px] w-full"
              unoptimized
            />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {product.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-800">
                ৳{product.sellingPice}
              </span>
              {product.mrp && (
                <span className="text-sm line-through text-gray-400">
                  ৳{product.mrp}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-700 leading-relaxed">
              {product.description || "No detailed description available."}
            </div>

            <CartActionButton
              product={product}
              quantity={quantity}
              loading={loading}
              size="modal"
              handleAddToCart={handleAddToCart}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />

            {/* Optional icons */}
            <div className="grid grid-cols-2 gap-2 mt-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <Truck size={16} /> <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} /> <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={16} /> <span>Easy Return</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} /> <span>Top Quality</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
