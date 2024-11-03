"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ProductImageCarouselProps {
  images: string[];
  currentIndex?: number;
  setCurrentIndex?: (index: number) => void;
}

export default function ProductImageCarousel({ 
  images, 
  currentIndex: controlledIndex,
  setCurrentIndex: setControlledIndex 
}: ProductImageCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  
  const currentIndex = controlledIndex ?? internalIndex;
  const setCurrentIndex = setControlledIndex ?? setInternalIndex;

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

  return (
    <div className="relative w-full h-full group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt="Product image"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

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