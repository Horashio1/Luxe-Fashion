'use client';

import React, { useState, useEffect } from 'react';
import { Cormorant_Garamond } from 'next/font/google';

// 1. Configure the Google Font (adjust weights, subsets as needed)
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'], // or ['300','400','500','600','700']
});

// 2. The four mobile images you want to cycle through
const mobileImages = [
  'https://res.cloudinary.com/ddqtjwpob/image/upload/v1738390135/Mobile_2_dga4xo.png',
  'https://res.cloudinary.com/ddqtjwpob/image/upload/v1738390136/Mobile_4_g54rno.png',
  'https://res.cloudinary.com/ddqtjwpob/image/upload/v1738390143/Mobile_3_yzicjc.png',
  'https://res.cloudinary.com/ddqtjwpob/image/upload/v1738390145/Mobile_1_ad1fry.png',
];

export default function Home() {
  // State to track which mobile image is currently active
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle through images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mobileImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* 
        Desktop background image (hidden on mobile).
        Only shown at md (768px) and above.
      */}
      <div className="hidden md:block absolute inset-0 bg-[url('https://res.cloudinary.com/ddqtjwpob/image/upload/v1737488091/Collage_1_1_kljuw5.png')] bg-cover bg-center opacity-30" />

      {/*
        Mobile carousel (hidden on desktop).
        Only shown below md (768px).
      */}
      <div className="block md:hidden absolute inset-0 w-full h-full overflow-hidden">
        {mobileImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Mobile Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-8000 ${
              currentIndex === index ? 'opacity-40' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Main content (text + button) above the background / carousel */}
      <div className="z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Heading using Cormorant Garamond */}
        <h1
          className={`text-5xl md:text-7xl font-light mb-6 tracking-wider ${cormorantGaramond.className}`}
        >
          SOS GOG
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl font-light mb-12 tracking-wide">
          The future of luxury fashion is arriving soon
        </p>

        {/* Call to Action */}
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
