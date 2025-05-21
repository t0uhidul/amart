"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon, Eye, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";

export default function ProductItem({
  product,
  onQuickView,
  isFeatured = false,
}) {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState<any>(null); // State to store user data
  // const {  handleCartItemCountChange } = useAuth();
  console.log("user", user);
  const jwt = user?.jwt; // Extract JWT from user data

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const data = {
      data: {
        quantity: quantity,
        amount: quantity * product.sellingPice,
        product: product.id,
        users_permissions_user: user.id,
      },
    };
    console.log("Adding to cart", data);
    console.log("JWT", jwt);
    GlobalApi.addToCart(data, jwt)
      .then((res) => {
        console.log("Added to cart", res);
        toast.success("Added to cart");
      })
      .catch((err) => {
        console.error("Error adding to cart", err);
        toast.error("Error adding to cart");
      });
  };

  // Safely access sessionStorage on the client side
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
              className="flex-1 h-8 text-xs flex items-center gap-1 bg-green-600 hover:bg-green-700"
            >
              <ShoppingBagIcon size={14} />
              ADD TO Bag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
