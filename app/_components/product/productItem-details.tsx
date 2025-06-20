// productItem-details.tsx
"use client";
import CartActionButton from "../cart-action-button";

export default function ProductDetails({
  product,

  quantity,
  loading,
  handleAddToCart,
  incrementQuantity,
  decrementQuantity,
}: ProductDetailsProps) {
  return (
    <div className="p-2 sm:p-3 flex flex-col flex-grow w-full">
      <h2 className="font-semibold text-xs sm:text-sm line-clamp-1">
        {product.name}
      </h2>
      <p className="text-[11px] text-gray-500 line-clamp-1 mb-1">
        {product.description}
      </p>

      <div className="mt-auto">
        <div className="flex items-center gap-1 text-[11px] mb-1 text-gray-600 py-2">
          <span>1 kg</span>
        </div>

        <div className="flex items-center gap-2 justify-between">
          <p className="text-sm font-bold text-gray-700">
            ৳{product.sellingPice}
          </p>

          <CartActionButton
            product={product}
            quantity={quantity}
            loading={loading}
            size="sm"
            handleAddToCart={handleAddToCart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        </div>
      </div>
    </div>
  );
}
