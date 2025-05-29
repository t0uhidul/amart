import Products from "@/app/_components/product/products";
import TopCategories from "@/app/_components/categorry/top-category";
import GlobalApi from "@/app/_utils/GlobalApi";

export default async function ProductsByCategory({
  params,
}: {
  params: { CategoryName: string };
}) {
  // Safely access params.CategoryName
  const categoryName = params.CategoryName;

  // Fetch data using the category name
  const productList = await GlobalApi.getProductByCategory(categoryName);
  const categoryList = await GlobalApi.getCategoryList();
  console.log("categoryList", categoryList);

  // Log the productList for debugging
  // console.log("productList", productList);

  // Handle empty productList
  if (!productList || productList.length === 0) {
    return <div>No products found for {categoryName}.</div>;
  }

  return (
    <div>
      <h1>{categoryName}</h1>
      <TopCategories categoryList={categoryList} />
      <Products productList={productList} />
    </div>
  );
}
