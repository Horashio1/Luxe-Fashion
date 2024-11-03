import ProductGrid from '../components/ProductGrid';

const menProducts = [
  {
    id: 7,
    name: 'Wool Suit',
    price: '$3,890',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 8,
    name: 'Leather Jacket',
    price: '$2,450',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 9,
    name: 'Designer Watch',
    price: '$12,890',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 10,
    name: 'Oxford Shoes',
    price: '$890',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 11,
    name: 'Cashmere Sweater',
    price: '$990',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 12,
    name: 'Silk Tie',
    price: '$290',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  }
];

export default function MenPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif mb-8">Men&apos;s Collection</h1>
        <ProductGrid products={menProducts} />
      </div>
    </div>
  );
}