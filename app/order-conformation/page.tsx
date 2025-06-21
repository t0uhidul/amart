"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Clock } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "#452671";

  const [orderData, setOrderData] = useState({
    orderId: orderId,
    orderDate: "21-06-2025, 15:49",
    status: "confirmed",
    estimatedDelivery: "16 minutes",
    totalAmount: 1100.0,
    paymentMethod: "COD",
    items: [
      {
        id: 1,
        name: "RFL Polypropylene Royal Rok Chair - Black",
        code: "EX82481",
        price: 1100.0,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Your order has been received</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Congratulations! Your order has been successfully placed.{" "}
            <Link
              href={`/order-details?id=${orderId}`}
              className="text-blue-600 hover:underline"
            >
              Order details
            </Link>
          </p>
        </div>

        {/* Order Summary Card */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  Order {orderData.orderId}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {orderData.orderDate}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {orderData.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Delivery Info */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Estimated Delivery
                  </h3>
                  <p className="text-sm text-gray-600">
                    {orderData.estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Payment Method
                  </h3>
                  <p className="text-sm text-gray-600">
                    {orderData.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">৳</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Total Amount</h3>
                  <p className="text-sm text-gray-600">
                    ৳{orderData.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Code: {item.code}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ৳{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push(`/order-details?id=${orderId}`)}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8"
          >
            Order Details
          </Button>
          <Button
            onClick={() => router.push("/orders")}
            variant="outline"
            className="px-8"
          >
            View Orders
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="px-8"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
