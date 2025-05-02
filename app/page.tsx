import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  return (
    <div>
      <Slider sliderList={sliderList} />
    </div>
  );
}
