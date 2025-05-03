import Products from "./_components/products";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const productList = await GlobalApi.getProducts();
  return (
    <div>
      <Slider sliderList={sliderList} />
      <Products productList={productList} />
    </div>
  );
}
