import ProductItem from "./productItem";

interface Product {
  name: string;
  description: string;
  mrp: string;
  sellingPice: string;
  ItemQuantityType: string;
  image?: { url: string }[];
  categories?: { name: string }[];
}

interface ProductsProps {
  productList: Product[];
}

export default function Products({ productList }: ProductsProps) {
  return (
    <div className="flex flex-col pt-6 px-10">
      <h1 className="flex justify-center text-6xl font-extrabold mb-4 text-primary">
        All Groceries
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {productList.map((product, indx) => (
          <ProductItem key={indx} product={product} />
        ))}
      </div>
    </div>
  );
}
