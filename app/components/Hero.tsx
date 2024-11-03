import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <Image
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
        alt="Luxury Fashion"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif mb-4">Autumn Collection</h1>
          <p className="text-xl mb-8">Discover timeless elegance</p>
          <button className="bg-white text-black px-8 py-3 hover:bg-black hover:text-white transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}