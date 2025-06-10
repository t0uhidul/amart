import Products from "@/app/_components/product/products";
// import TopCategories from "@/app/_components/categorry/top-category";
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

  if (!productList || productList.length === 0) {
    return (
      <div className="col-span-full flex flex-col justify-center items-center min-h-[40vh]">
        <svg
          className="w-12 h-12 mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-500 text-lg font-semibold">
          No product found for {categoryName} !
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* <TopCategories categoryList={categoryList} /> */}
      <Products productList={productList} />
    </div>
  );
}
