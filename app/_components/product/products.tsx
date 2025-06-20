"use client";

import { useState } from "react";
import ProductItem from "./productItem";
import ProductModal from "./product-modal";

export default function Products({ productList }: { productList: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col pt-6 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Optional heading and controls can go here */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
        {Array.isArray(productList) && productList.length > 0 ? (
          productList.map((product, index) => (
            <ProductItem
              key={product.id || index}
              product={product}
              onQuickView={() => openModal(product)}
              isFeatured={true}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No products found.
          </div>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}
