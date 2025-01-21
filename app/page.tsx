'use client';

// 1. Import the Google Font
import { Cormorant_Garamond } from 'next/font/google';

// 2. Configure the font (adjust weights, subsets as needed)
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'], // or ['300','400','500','600','700']
});

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/ddqtjwpob/image/upload/v1737488091/Collage_1_1_kljuw5.png')] bg-cover bg-center opacity-30" />

      {/* Luxury Animation */}
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
