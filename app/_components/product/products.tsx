"use client";

import { useState } from "react";
import ProductItem from "./productItem";
import ProductModal from "./product-modal";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";

export default function Products({ productList }: { productList: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  console.log("productList-----------------", productList);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col pt-6 px-4 md:px-10 max-w-7xl mx-auto">
      <h1 className="flex justify-center text-3xl md:text-5xl font-extrabold mb-8 text-green-600">
        Products
      </h1>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Showing {productList?.length} Products
        </h2>
        <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
          <ShoppingBag className="w-4 h-4 mr-1" />
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 md:gap-6">
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
