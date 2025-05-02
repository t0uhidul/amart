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
  const [imageVisible, setImageVisible] = useState(true); // State to handle image visibility
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      setImageVisible(false); // Start hiding the image
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
        );
        setImageVisible(true); // Show the new image after a short delay
      }, 800); // Delay before changing the image (same as fade-out duration)
    }, 8000); // Change every 5 seconds

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
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image with state handling visibility */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: imageVisible ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="w-full h-full"
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

                {/* 📝 Overlay Text Content */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 30,
                    damping: 40,
                    duration: 1.5,
                    ease: "easeOut",
                  }}
                  className="absolute top-1/4 left-16 max-w-[500px] text-black z-20"
                >
                  <h2 className="text-4xl font-bold mb-4">
                    Premium Organic Produce, Fresh to Your Door.
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed">
                    Handpicked from the farm for superior quality. Enjoy fresh,
                    nutritious fruits and vegetables delivered right to your
                    doorstep. Explore our collection today!
                  </p>

                  <a
                    href="/collections"
                    className="bg-primary hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Shop Now
                  </a>
                </motion.div>
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
              index === currentIndex ? "bg-primary scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
