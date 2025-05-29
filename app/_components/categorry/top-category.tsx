import Image from "next/image";
import Link from "next/link";

type Category = {
  id: number;
  documentId: string;
  name: string;
  colore: string | null;
  slug: string;
  image: string;
  image_alt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type TopCategoriesProps = {
  categoryList: Category[];
};

export default function TopCategories({ categoryList }: TopCategoriesProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center mb-10">Top Category</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.isArray(categoryList) && categoryList.length > 0 ? (
          categoryList.map((category) => {
            const imgUrl = category.image?.startsWith("http")
              ? category.image
              : `${baseUrl}${category.image}`;

            console.log("Category Image URL:", imgUrl);

            return (
              <Link
                href={`/products-category/${category.slug}`}
                key={category.id}
                className="flex flex-col items-center group"
              >
                <div className="bg-gray-100 rounded-full p-4 mb-3 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <div className="relative w-36 h-36 md:w-40 md:h-40">
                    <Image
                      src={imgUrl}
                      alt={category.image_alt || category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                      className="object-cover rounded-full"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
                <h3 className="text-center font-medium text-green-700 group-hover:text-green-800">
                  {category.name}
                </h3>
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500">No categories found.</p>
        )}
      </div>
    </div>
  );
}
