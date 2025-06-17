import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TopCategoryList({ categoryList }: TopCategoriesProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categoryList.map((category, index) => {
        const imgUrl = category.icon?.[0]?.url
          ? category.icon[0].url.startsWith("http")
            ? category.icon[0].url
            : baseUrl + category.icon[0].url
          : "/placeholder.svg?height=300&width=300";

        return (
          <Link
            href={`/products-category/${category.slug}`}
            key={category.id}
            className="flex flex-col items-center group"
          >
            <div className="bg-gray-100 rounded-full p-4 mb-3 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image
                src={imgUrl}
                alt={category.name}
                width={120}
                height={120}
                className="object-cover rounded-full"
                loading={index < 3 ? "eager" : "lazy"} // preload only first 3
              />
            </div>
            <h3 className="text-center font-medium text-green-700 group-hover:text-green-800">
              {category.name}
            </h3>
          </Link>
        );
      })}
    </div>
  );
}
