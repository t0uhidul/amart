import ProductItem from "./productItem";

export default function Products({ productList }) {
  return (
    <div>
      <h1>All groceries</h1>
      {productList.map((product, indx) => {
        <ProductItem product={product} />;
      })}
    </div>
  );
}
