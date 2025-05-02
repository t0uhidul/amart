"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface SliderItem {
  id: number;
  name: string;
  image: {
    url: string;
  }[];
}

interface SliderProps {
  sliderList: SliderItem[];
}

export default function Slider({ sliderList }: SliderProps) {
  console.log("slide-------", sliderList);
  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider, indx) => {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
          const imagePath = slider.image?.[0]?.url;
          const imageUrl =
            backendUrl && imagePath ? backendUrl + imagePath : null;

          console.log("Image URL:", imageUrl);

          return (
            <CarouselItem key={indx}>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={slider.name}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                  <p>No image available</p>
                </div>
              )}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
