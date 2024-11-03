import ProductGrid from '../components/ProductGrid';

const womenProducts = [
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
    name: 'Designer Handbag',
    price: '$1,890',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 4,
    name: 'Leather Boots',
    price: '$990',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 5,
    name: 'Wool Blazer',
    price: '$1,590',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 6,
    name: 'Silk Blouse',
    price: '$790',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  }
];

export default function WomenPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif mb-8">Women's Collection</h1>
        <ProductGrid products={womenProducts} />
      </div>
    </div>
  );
}