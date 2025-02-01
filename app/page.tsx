'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
});

const mobileImages = [
  'https://res.cloudinary.com/ddqtjwpob/image/upload/v1738390135/Mobile_2_dga4xo.png',
  'https://res.cloudinary.com/ddqtjwpob/image/upload/v1738390136/Mobile_4_g54rno.png',
  'https://res.cloudinary.com/ddqtjwpob/image/upload/v1738390143/Mobile_3_yzicjc.png',
  'https://res.cloudinary.com/ddqtjwpob/image/upload/v1738390145/Mobile_1_ad1fry.png',
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Increase this duration if you want the slide to stay longer, e.g. 5000 (5 seconds)
  const slideInterval = 6000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mobileImages.length);
    }, slideInterval);
    return () => clearInterval(interval);
  }, [slideInterval]);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Desktop background (hidden on mobile) */}
      <div className="hidden md:block absolute inset-0 bg-[url('https://res.cloudinary.com/ddqtjwpob/image/upload/v1737488091/Collage_1_1_kljuw5.png')] bg-cover bg-center opacity-30" />

      {/* Mobile carousel (hidden on desktop) */}
      <div className="block md:hidden absolute inset-0 w-full h-full">
        {mobileImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentIndex === index ? 'opacity-40' : 'opacity-0'
            }`}
          >
            {/* Using Next.js Image component for optimization */}
            <Image
              src={src}
              alt={`Slide ${index}`}
              fill  // This makes the image cover parent div dimensions
              style={{ objectFit: 'cover' }}
              priority={index === 0} 
              // ^ optional: 'priority' on first image to preload it 
            />
          </div>
        ))}
      </div>

      {/* Main content (text + button) */}
      <div className="z-10 text-center px-4 max-w-3xl mx-auto">
        <h1
          className={`text-5xl md:text-7xl font-light mb-6 tracking-wider ${cormorantGaramond.className}`}
        >
          SOS GOG
        </h1>
        <p className="text-xl md:text-2xl font-light mb-12 tracking-wide">
          The future of luxury fashion is arriving soon
        </p>
        <a
          href="/join"
          className="inline-block px-8 py-3 border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
        >
          Join as a Designer
        </a>
      </div>
    </div>
  );
}
