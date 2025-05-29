"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getCartItems } from "@/lib/actions";
import { useAuth } from "@/contexts/auth-context";
import GlobalApi from "../../_utils/GlobalApi";

type CartItem = {
  id: string | number;
  name: string;
  sellingPice: string | number;
  ItemQuantityType?: string;
  // add other properties as neededp
};

export default function CartItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const items = await getCartItems(authToken);
        const items = await GlobalApi.getToCart(authToken);
        if (items) {
          setCartItems(items);
        }
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };

    fetchItems();
  }, [authToken]);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.amount || 0),
      0
    );
  };

  console.log("cart Items", cartItems);

  return (
    <div>
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems &&
            cartItems.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 mr-4">
                    <div className="absolute top-0 left-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                      1
                    </div>
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt={item?.product_name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item?.product_name}</p>
                    <p className="text-sm text-gray-500">
                      {item?.amount / item?.quantity} x{item?.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">${item.amount}</p>
              </div>
            ))}

          <Separator className="my-4" />

          {/* Subtotal */}
          <div className="flex justify-between">
            <p>Subtotal - {cartItems.length} items</p>
            <p className="font-medium">${getTotalPrice().toFixed(2)}</p>
          </div>

          {/* Shipping */}
          <div className="flex justify-between">
            <p>Shipping</p>
            <p className="text-gray-500">Enter shipping address</p>
          </div>

          <Separator className="my-4" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Total</p>
              <p className="text-sm text-gray-500">USD</p>
            </div>
            <p className="text-xl font-bold">${getTotalPrice().toFixed(2)}</p>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            Complete order
          </Button>
        </div>
      </Card>
    </div>
  );
}
