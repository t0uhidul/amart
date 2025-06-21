"use client";

import CheckoutComponent from "./checkout-component";
import CartItems from "./cart-items";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </div>
            <p className="text-gray-600">Complete your order details</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="text-sm font-medium text-green-600">Cart</span>
            </div>
            <div className="w-12 h-0.5 bg-primary"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-primary">Checkout</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-gray-500">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Checkout Details */}
          <div className="lg:col-span-2">
            <CheckoutComponent />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartItems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
