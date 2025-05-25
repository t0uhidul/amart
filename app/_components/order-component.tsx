
'use client';
import CartItems from "./cart-items";
import PaymentMethod from "./payment-method";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row gap-8 justify-between">
      <PaymentMethod />
      <CartItems />
    </div>
  );
}
