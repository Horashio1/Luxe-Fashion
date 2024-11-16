// app/components/ProductImageCarousel.tsx

"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ProductImageCarouselProps {
  images: string[];
  currentIndex?: number;
  setCurrentIndex?: (index: number) => void;
}

export default function ProductImageCarousel({
  images,
  currentIndex: controlledIndex,
  setCurrentIndex: setControlledIndex,
}: ProductImageCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = controlledIndex ?? internalIndex;
  const setCurrentIndex = setControlledIndex ?? setInternalIndex;

  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  // Update carousel width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (controlledIndex === undefined) {
      const timer = setInterval(() => {
        setInternalIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [images.length, controlledIndex]);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50 && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <motion.div
        ref={carouselRef}
        className="flex h-full"
        animate={{ x: -currentIndex * carouselWidth }}
        drag="x"
        dragConstraints={{ left: -((images.length - 1) * carouselWidth), right: 0 }}
        dragElastic={0.05}
        // dragTransition={{ bounceStiffness: 6000, bounceDamping: 200 }}
        // transition={{ duration: 0.2, ease: 'easeInOut' }}
        transition={{ duration: 0.2}}

        onDragEnd={handleDragEnd}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={src}
              alt="Product image"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </motion.div>

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? 'bg-black' : 'bg-black/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
