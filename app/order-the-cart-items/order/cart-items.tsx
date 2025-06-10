"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export default function CartItems() {
  const { cartItems, totalAmount } = useCart();
  const items = Object.values(cartItems);

  const deliveryCharge = 40;
  const grandTotal = totalAmount + deliveryCharge;

  const handleConfirm = () => {
    console.log("Order confirmed");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 py-2 px-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShoppingCart className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm">Order Summary</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs h-5">
            {items.length} item{items.length > 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-3">
        <div className="space-y-3">
          {/* Cart Items */}
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-white border">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge
                    variant="secondary"
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-white"
                  >
                    {item.quantity}
                  </Badge>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    ৳{item.sellingPice} × {item.quantity}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-900">
                    ৳{item.sellingPice * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-2" />

          {/* Pricing Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">৳{totalAmount}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Delivery charge</span>
              <span className="font-medium">৳{deliveryCharge}</span>
            </div>

            <Separator className="my-1.5" />

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-gray-900">
                  Grand Total
                </p>
                <p className="text-[10px] text-gray-500">Including all taxes</p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-primary">
                  ৳{grandTotal}
                </p>
                <p className="text-[10px] text-gray-500">BDT</p>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-1 text-xs h-9 mt-2"
          >
            Confirm Order
          </Button>

          {/* Security Badge */}
          <div className="mt-2 p-1.5 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-green-700">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <p className="text-[10px] font-medium">
                Secure checkout guaranteed
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
