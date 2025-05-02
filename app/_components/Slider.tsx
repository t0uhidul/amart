"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, [sliderList.length]);

  const handleDotClick = (index: number) => setCurrentIndex(index);

  return (
    <div className="relative w-screen h-[calc(100vh-100px)] overflow-hidden">
      <AnimatePresence>
        {sliderList.map((slider, index) => {
          const imagePath = slider.image?.[0]?.url;
          const imageUrl =
            backendUrl && imagePath ? backendUrl + imagePath : null;

          return (
            index === currentIndex && (
              <motion.div
                key={slider.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={slider.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p>No image available</p>
                  </div>
                )}
              </motion.div>
            )
          );
        })}
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {sliderList.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
