'use client';
import CartItems from "./cart-items";
import PaymentMethod from "./payment-method";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-10 px-2 md:px-6 flex flex-col md:flex-row gap-8 justify-center items-start min-h-[80vh]">
      {/* Payment Section */}
      <div className="w-full md:w-2/5 bg-white rounded-xl shadow-lg p-6 mb-8 md:mb-0 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>
        <PaymentMethod />
      </div>
      {/* Cart Section */}
      <div className="w-full md:w-3/5 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Cart</h2>
        <CartItems />
      </div>
    </div>
  );
}