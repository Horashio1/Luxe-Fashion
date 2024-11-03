"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const products = [
  {
    id: 1,
    name: 'Silk Evening Dress',
    price: '$2,890',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 2,
    name: 'Cashmere Coat',
    price: '$3,450',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 3,
    name: 'Leather Handbag',
    price: '$1,890',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 4,
    name: 'Designer Watch',
    price: '$12,500',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  }
];

export default function FeaturedProducts() {
  const router = useRouter();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif mb-12 text-center">Featured Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group cursor-pointer"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <div className="relative aspect-square mb-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}