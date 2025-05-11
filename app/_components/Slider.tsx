// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// interface SliderItem {
//   id: number;
//   name: string;
//   image: {
//     url: string;
//   }[];
// }

// interface SliderProps {
//   sliderList: SliderItem[];
// }

// export default function Slider({ sliderList }: SliderProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [imageVisible, setImageVisible] = useState(true); // State to handle image visibility
//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setImageVisible(false); // Start hiding the image
//       setTimeout(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
//         );
//         setImageVisible(true); // Show the new image after a short delay
//       }, 800); // Delay before changing the image (same as fade-out duration)
//     }, 8000); // Change every 5 seconds

//     return () => clearInterval(interval);
//   }, [sliderList.length]);

//   const handleDotClick = (index: number) => setCurrentIndex(index);

//   return (
//     <div className="relative w-screen h-[calc(100vh-100px)] overflow-hidden">
//       <AnimatePresence>
//         {sliderList.map((slider, index) => {
//           const imagePath = slider.image?.[0]?.url;
//           const imageUrl =
//             backendUrl && imagePath ? backendUrl + imagePath : null;

//           return (
//             index === currentIndex && (
//               <motion.div
//                 key={slider.id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 1.5, ease: "easeInOut" }}
//                 className="absolute inset-0 w-full h-full"
//               >
//                 {/* Background Image with state handling visibility */}
//                 <motion.div
//                   initial={{ opacity: 1 }}
//                   animate={{ opacity: imageVisible ? 1 : 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 1, ease: "easeInOut" }}
//                   className="w-full h-full"
//                 >
//                   {imageUrl ? (
//                     <Image
//                       src={imageUrl}
//                       alt={slider.name}
//                       fill
//                       className="object-cover"
//                       priority
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <p>No image available</p>
//                     </div>
//                   )}
//                 </motion.div>

//                 {/* 📝 Overlay Text Content */}
//                 <motion.div
//                   initial={{ x: -100, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: 100, opacity: 0 }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 30,
//                     damping: 40,
//                     duration: 1.5,
//                     ease: "easeOut",
//                   }}
//                   className="absolute top-1/4 left-16 max-w-[500px] text-black z-20"
//                 >
//                   <h2 className="text-4xl font-bold mb-4">
//                     Premium Organic Produce, Fresh to Your Door.
//                   </h2>
//                   <p className="mb-6 text-lg leading-relaxed">
//                     Handpicked from the farm for superior quality. Enjoy fresh,
//                     nutritious fruits and vegetables delivered right to your
//                     doorstep. Explore our collection today!
//                   </p>

//                   <a
//                     href="/collections"
//                     className="bg-primary hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold"
//                   >
//                     Shop Now
//                   </a>
//                 </motion.div>
//               </motion.div>
//             )
//           );
//         })}
//       </AnimatePresence>

//       {/* Dots */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
//         {sliderList.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === currentIndex ? "bg-primary scale-125" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
// import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function HeroSlider({ sliderList }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [textVisible, setTextVisible] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  // Reset autoplay timer when index changes
  useEffect(() => {
    if (isAutoPlaying) {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }

      autoPlayRef.current = setTimeout(() => {
        // First hide the text
        setTextVisible(false);

        // After text is hidden, change the image
        setTimeout(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
          );

          // After image has changed, show the text again
          setTimeout(() => {
            setTextVisible(true);
          }, 800);
        }, 600);
      }, 6000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying, sliderList.length]);

  // const goToNext = () => {
  //   // Hide text first
  //   setTextVisible(false);

  //   // Change slide after text is hidden
  //   setTimeout(() => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
  //     );

  //     // Show text after slide has changed
  //     setTimeout(() => {
  //       setTextVisible(true);
  //     }, 800);
  //   }, 600);
  // };

  // const goToPrev = () => {
  //   // Hide text first
  //   setTextVisible(false);

  //   // Change slide after text is hidden
  //   setTimeout(() => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === 0 ? sliderList.length - 1 : prevIndex - 1
  //     );

  //     // Show text after slide has changed
  //     setTimeout(() => {
  //       setTextVisible(true);
  //     }, 800);
  //   }, 600);
  // };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;

    // Hide text first
    setTextVisible(false);

    // Change slide after text is hidden
    setTimeout(() => {
      setCurrentIndex(index);

      // Show text after slide has changed
      setTimeout(() => {
        setTextVisible(true);
      }, 800);
    }, 600);

    // Pause autoplay briefly when user interacts
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Pause autoplay when user hovers
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className="relative w-full h-[calc(100vh-80px)] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider Navigation Arrows
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button> */}

      {/* Slides */}
      <AnimatePresence mode="wait">
        {sliderList.map((slider, index) => {
          const imagePath = slider.image?.[0]?.url;
          const imageUrl =
            backendUrl && imagePath
              ? backendUrl + imagePath
              : "/placeholder.svg?height=1080&width=1920";

          return (
            index === currentIndex && (
              <motion.div
                key={slider.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image with Gradient Overlay */}
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={slider.name || "Slider image"}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 container mx-auto px-4 flex items-center">
                  <div className="max-w-xl">
                    {/* Animated Text Content - No Background */}
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
                          className="text-white"
                        >
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full mb-4"
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
                            className="text-2xl text-black md:text-3xl lg:text-4xl font-bold mb-4 leading-tight drop-shadow-lg"
                          >
                            Premium Organic Produce, Fresh to Your Door.
                          </motion.h2>

                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mb-6 text-black  leading-relaxed text-sm drop-shadow-md"
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
          );
        })}
      </AnimatePresence>

      {/* Progress Indicators */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {sliderList.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`w-12 h-2 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-primary w-16"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          </button>
        ))}
      </div> */}

      {/* Progress Bar */}
      {/* {isAutoPlaying && (
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 6,
            ease: "linear",
            repeat: 0,
          }}
          key={currentIndex}
          className="absolute bottom-0 left-0 h-1 bg-primary z-10"
        />
      )} */}

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
