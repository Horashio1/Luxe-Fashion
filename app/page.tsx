'use client';

import { GemIcon } from 'lucide-react';
import { LuxuryAnimation } from './components/LuxuryAnimation';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20" />
      
      <LuxuryAnimation />
      
      <div className="z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <GemIcon size={48} className="text-gold" />
        </div>
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wider">SOS GOG</h1>
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