"use client";

import CheckoutComponent from "./checkout-component";
import CartItems from "./cart-items";
import { ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-3 py-3 flex flex-col  justify-center items-center">
          <div className="flex items-center gap-2">
            {/* <ShoppingBag className="w-5 h-5 text-primary" /> */}
            {/* <h1 className="text-lg font-bold text-gray-900">Checkout</h1> */}
          </div>

          {/* Progress Indicator */}
          <div className="mt-3 flex items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                1
              </div>
              <span className="text-xs font-medium text-primary">Cart</span>
            </div>
            <div className="w-6 h-0.5 bg-primary"></div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                2
              </div>
              <span className="text-xs font-medium text-primary">Checkout</span>
            </div>
            <div className="w-6 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-xs font-medium">
                3
              </div>
              <span className="text-xs text-gray-500">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* Left Column - Checkout Details */}
          <div className="lg:col-span-2 space-y-4">
            <CheckoutComponent />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <CartItems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
