"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { sliderList } from "@/lib/variables";

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [textVisible, setTextVisible] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);

      autoPlayRef.current = setTimeout(() => {
        setTextVisible(false);

        setTimeout(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
          );
          setTimeout(() => {
            setTextVisible(true);
          }, 800);
        }, 600);
      }, 6000);
    }
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [currentIndex, isAutoPlaying, sliderList.length]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setTextVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setTextVisible(true), 800);
    }, 600);

    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className="relative w-full h-[calc(100vh-80px)] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        {sliderList.map(
          (slider, index) =>
            index === currentIndex && (
              <motion.div
                key={slider.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image with Lighter Overlay */}
                <div className="relative w-full h-full">
                  <Image
                    src={slider.image[0]?.url || "/placeholder.svg"}
                    alt={slider.name || "Slider image"}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Lighter gradient overlay: more white */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-white/20" />
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 container mx-auto px-4 flex items-center">
                  <div className="max-w-xl">
                    <AnimatePresence mode="wait">
                      {textVisible && (
                        <motion.div
                          key={`text-${currentIndex}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="text-black"
                        >
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-block px-3 py-1 bg-primary text-white text-xs sm:text-sm font-medium rounded-full mb-4"
                            style={{
                              // Scale text smaller gradually on smaller screens
                              transformOrigin: "left center",
                            }}
                          >
                            100% Organic
                          </motion.span>

                          <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.4,
                              type: "spring",
                              stiffness: 100,
                            }}
                            className="font-bold mb-4 leading-tight drop-shadow-lg"
                            style={{
                              fontSize: "clamp(1.5rem, 4vw, 2.5rem)", // smaller on small screens, bigger on large
                            }}
                          >
                            Premium Organic Produce, Fresh to Your Door.
                          </motion.h2>

                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mb-6 leading-relaxed drop-shadow-md"
                            style={{
                              fontSize: "clamp(0.8rem, 2.5vw, 1rem)", // responsive text size
                            }}
                          >
                            Handpicked from the farm for superior quality. Enjoy
                            fresh, nutritious fruits and vegetables delivered
                            right to your doorstep. Explore our collection
                            today!
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.6,
                              delay: 0.8,
                              type: "spring",
                            }}
                          >
                            <Link
                              href="/collections"
                              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                              style={{
                                fontSize: "clamp(0.9rem, 2.5vw, 1rem)", // smaller on small screens
                              }}
                            >
                              Shop Now
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
        )}
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
