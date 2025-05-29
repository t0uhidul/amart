import FeaturesSection from "./_components/feature-section";
import Products from "./_components/product/products";
import Slider from "./_components/Slider";
import TopCategories from "./_components/categorry/top-category";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const productList = await GlobalApi.getProducts();
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <Slider />
      <TopCategories categoryList={categoryList} />
      <Products productList={productList} />
      <FeaturesSection />
    </div>
  );
}
