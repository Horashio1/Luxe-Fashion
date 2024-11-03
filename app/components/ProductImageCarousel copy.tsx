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

  // Swipe states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

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

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setDragging(false);
    setDragOffset(0);
  };

  // Handle touch move with drag effect
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart !== null) {
      const currentTouch = e.targetTouches[0].clientX;
      const offset = currentTouch - touchStart;
      setDragging(true);
      setDragOffset(offset);
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (dragging && dragOffset !== 0) {
      const swipeThreshold = 50; // Minimum swipe distance in pixels to be considered a swipe
      if (dragOffset > swipeThreshold) {
        handlePrevious(); // Swipe right
      } else if (dragOffset < -swipeThreshold) {
        handleNext(); // Swipe left
      }
    }
    // Reset states
    setTouchStart(null);
    setDragging(false);
    setDragOffset(0);
  };

  return (
    <div
      className="relative w-full h-full group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          style={{ x: dragging ? dragOffset : 0 }}
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
