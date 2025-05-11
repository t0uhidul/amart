"use client";

import { useState } from "react";
import ProductItem from "./productItem";
import ProductModal from "./product-modal";
import { ShoppingBag } from "lucide-react";

interface Product {
  id?: string;
  attributes?: {
    name: string;
    description: string;
    mrp: string;
    sellingPice: string;
    ItemQuantityType: string;
    image: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    categories: {
      data: Array<{
        attributes: {
          name: string;
        };
      }>;
    };
  };
  name?: string;
  description?: string;
  mrp?: string;
  sellingPice?: string;
  ItemQuantityType?: string;
  image?: { url: string }[];
  categories?: { name: string }[];
}

interface ProductsProps {
  productList: Product[];
}

export default function Products({ productList }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Normalize product data structure
  const normalizedProducts = productList.map((product) => {
    if (product.attributes) {
      return {
        id: product.id,
        name: product.attributes.name || "Unnamed Product",
        description:
          product.attributes.description || "No description available",
        mrp: product.attributes.mrp || "0",
        sellingPice: product.attributes.sellingPice || "0",
        ItemQuantityType: product.attributes.ItemQuantityType || "Kg",
        image:
          product.attributes.image?.data?.map((img) => ({
            url: img.attributes.url,
          })) || [],
        categories:
          product.attributes.categories?.data?.map((cat) => ({
            name: cat.attributes.name,
          })) || [],
      };
    }
    return {
      id: product.id || String(Math.random()),
      name: product.name || "Unnamed Product",
      description: product.description || "No description available",
      mrp: product.mrp || "0",
      sellingPice: product.sellingPice || "0",
      ItemQuantityType: product.ItemQuantityType || "Kg",
      image: product.image || [],
      categories: product.categories || [],
    };
  });

  // Group products by category
  const productsByCategory: Record<string, Product[]> = {};
  normalizedProducts.forEach((product) => {
    const category = product.categories?.[0]?.name || "Uncategorized";
    if (!productsByCategory[category]) {
      productsByCategory[category] = [];
    }
    productsByCategory[category].push(product);
  });

  return (
    <div className="flex flex-col pt-6 px-4 md:px-10 max-w-7xl mx-auto">
      <h1 className="flex justify-center text-3xl md:text-5xl font-extrabold mb-8 text-green-600">
        All Groceries
      </h1>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Featured Products
          </h2>
          <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
            <ShoppingBag className="w-4 h-4 mr-1" />
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {normalizedProducts.slice(0, 4).map((product, index) => (
            <ProductItem
              key={product.id || index}
              product={product}
              onQuickView={() => openModal(product)}
              isFeatured={index === 1}
            />
          ))}
        </div>
      </div>

      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category} className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {category}
            </h2>
            <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
              <ShoppingBag className="w-4 h-4 mr-1" />
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <ProductItem
                key={product.id || index}
                product={product}
                onQuickView={() => openModal(product)}
                isFeatured={false}
              />
            ))}
          </div>
        </div>
      ))}

      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}
