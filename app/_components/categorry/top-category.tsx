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
  categoryList?: Category[];
};

export default function TopCategories({ categoryList }: TopCategoriesProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
  const categories = categoryList;
  console.log("Top Categories:", categories);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
          Top Categories
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-2 md:gap-3">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => {
              const imgUrl =
                category.image && category.image.startsWith("http")
                  ? category.image
                  : category.image
                  ? `${baseUrl}${category.image}`
                  : "/placeholder.svg?height=120&width=120";

              return (
                <Link
                  href={`/products-category/${category.slug}`}
                  key={category.id}
                  className="group"
                >
                  <div className="bg-gray-100/50 rounded-lg p-2 md:p-3 transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1">
                    {/* Image Container with fixed aspect ratio */}
                    <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-md bg-white">
                      <Image
                        src={imgUrl || "/placeholder.svg?height=120&width=120"}
                        alt={category.image_alt || category.name}
                        fill
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 10vw, 10vw"
                        unoptimized
                      />
                    </div>

                    {/* Category Name */}
                    <h3 className="text-sm font-semibold text-gray-700 text-center leading-tight group-hover:text-gray-900 transition-colors duration-200 line-clamp-2">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full flex justify-center items-center py-12">
              <p className="text-gray-500 text-lg">No categories found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
