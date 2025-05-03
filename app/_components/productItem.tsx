import Image from "next/image";

export default function ProductItem({ product }) {
  const imgUrl =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.image?.[0]?.url;

  return (
    <div className="border rounded p-4 max-w-xs">
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
