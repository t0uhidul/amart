import FeaturesSection from "./_components/feature-section";
import Products from "./_components/products";
// import Slider from "./_components/Slider";
import TopCategories from "./_components/top-category";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  // const sliderList = await GlobalApi.getSliders();
  const productList = await GlobalApi.getProducts();
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      {/* <Slider sliderList={sliderList} /> */}
      <TopCategories categoryList={categoryList} />
      <Products productList={productList} />
      <FeaturesSection />
    </div>
  );
}
