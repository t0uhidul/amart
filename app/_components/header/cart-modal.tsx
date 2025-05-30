"use client";

import { useCart } from "@/contexts/cart-context";
import { X, Plus, Minus, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, cartCount, totalAmount, updateQuantity, removeFromCart } =
    useCart();

  const deliveryCharge = 25;
  const handlingCharge = 2;
  const grandTotal = totalAmount + deliveryCharge + handlingCharge;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity "
        onClick={onClose}
      />

      {/* Cart Modal */}
      <div className="fixed right-0 top-0 h-full overflow-y-auto w-full max-w-md bg-white z-50 shadow-2xl rounded-l-2xl flex flex-col transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            My Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={22} className="text-gray-600" />
          </button>
        </div>

        {/* Delivery Info */}
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border-2 border-green-600 flex items-center justify-center bg-white">
              <Clock size={14} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                Delivery in 16 minutes
              </p>
              <p className="text-xs text-gray-500">
                Shipment of {cartCount} item{cartCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1  p-4 space-y-4">
          {Object.keys(cartItems).length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Your cart is empty</p>
            </div>
          ) : (
            Object.values(cartItems).map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm"
              >
                {/* Product Image */}
                <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                  <Image
                    src={item.image || "/placeholder.svg?height=64&width=64"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.size || "500 ml"}
                  </p>
                  <p className="font-bold text-green-700 mt-1">
                    ৳{item.sellingPice || item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-0 bg-green-600 rounded-lg shadow">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(0, item.quantity - 1))
                    }
                    className="p-2 text-white hover:bg-green-700 rounded-l-lg transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 py-2 text-white font-semibold min-w-[40px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-white hover:bg-green-700 rounded-r-lg transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bill Details */}
        {Object.keys(cartItems).length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50 rounded-b-2xl">
            <h3 className="font-semibold text-gray-900 text-base">
              Bill Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Items total</span>
                <span className="font-semibold">৳{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery charge</span>
                <span className="font-semibold">৳{deliveryCharge}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Handling charge</span>
                <span className="font-semibold">৳{handlingCharge}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center font-bold text-lg">
                <span>Grand total</span>
                <span>৳{grandTotal}</span>
              </div>
            </div>
            {/* Cancellation Policy */}
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Cancellation Policy
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Orders cannot be cancelled once packed for delivery. In case of
                unexpected delays, a refund will be provided, if applicable.
              </p>
            </div>
            {/* Proceed Button */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-base shadow">
              <div className="flex items-center justify-between w-full">
                <span>৳{grandTotal}</span>
                <span>Login to Proceed →</span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
