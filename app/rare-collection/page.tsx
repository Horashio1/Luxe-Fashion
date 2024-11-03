import ProductGrid from '../components/ProductGrid';

const rareProducts = [
  {
    id: 13,
    name: 'Limited Edition Watch',
    price: '$75,000',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49'
  },
  {
    id: 14,
    name: 'Vintage Hermès Bag',
    price: '$45,000',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa'
  },
  {
    id: 15,
    name: 'Collector\'s Edition Coat',
    price: '$28,500',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a'
  },
  {
    id: 16,
    name: 'Artisan Crafted Jewelry',
    price: '$95,000',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338'
  },
  {
    id: 17,
    name: 'One-of-a-Kind Dress',
    price: '$65,000',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 18,
    name: 'Heritage Collection Suit',
    price: '$32,000',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf'
  }
];

export default function RareCollectionPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif mb-8">Rare Collection</h1>
        <p className="text-gray-600 mb-12">Discover our most exclusive and limited edition pieces, crafted for the most discerning collectors.</p>
        <ProductGrid products={rareProducts} />
      </div>
    </div>
  );
}