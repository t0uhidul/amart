import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";
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
    <div className="flex flex-col border rounded-4xl border-primary  p-4 max-w-xs justify-center items-center gap-2">
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
        <p className="mt-1 text-lg font-semibold text-green-600">
          ৳{product.sellingPice}{" "}
          <span className="text-sm font-bold text-gray-600">/Kg</span>
        </p>
      </p>
      {/* <p className="text-sm text-gray-600 mt-1">
        পরিমাণ: {product.ItemQuantityType}
      </p> */}
      {/* <p className="text-sm text-blue-600 mt-1">
        ক্যাটেগরি: {product.categories?.[0]?.name}
      </p> */}
      <Button className="flex items-center gap-2">
        <ShoppingBagIcon size={18} />
        ADD TO BAG
      </Button>
    </div>
  );
}
