import Image from "next/image";

interface ProductImage {
  url: string;
}

interface Category {
  name: string;
}

interface Product {
  name: string;
  description: string;
  mrp: string;
  sellingPice: string;
  ItemQuantityType: string;
  image?: ProductImage[];
  categories?: Category[];
}

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "Environment variable NEXT_PUBLIC_BACKEND_BASE_URL is not defined"
    );
  }
  const imgUrl = product.image?.[0]?.url
    ? baseUrl + product.image[0].url
    : "/fallback.png";

  return (
    <div className="border rounded-6xl border-primary  p-4 max-w-xs">
      <Image
        src={imgUrl}
        alt={product.name}
        width={200}
        height={200}
        className="rounded"
      />
      <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="mt-1">
        <span className="line-through text-red-400 mr-2">৳{product.mrp}</span>
        <span className="text-green-600 font-semibold">
          ৳{product.sellingPice}
        </span>
      </p>
      <p className="text-sm text-gray-600 mt-1">
        পরিমাণ: {product.ItemQuantityType}
      </p>
      <p className="text-sm text-blue-600 mt-1">
        ক্যাটেগরি: {product.categories?.[0]?.name}
      </p>
    </div>
  );
}
