"use client";

import { useCart } from '../../components/CartContext';
import { useRouter } from 'next/navigation';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import ProductImageCarousel from '../../components/ProductImageCarousel';
import { useState } from 'react';

const allProducts = [
  {
    id: 7,
    name: 'Wool Suit',
    price: '$3,890',
    colors: [
      { name: 'Charcoal', value: '#2A2A2A', imageIndex: 0 },
      { name: 'Navy', value: '#1B2A4A', imageIndex: 1 },
      { name: 'Grey', value: '#4A4A4A', imageIndex: 2 }
    ],
    sizes: ['46R', '48R', '50R', '52R'],
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0',
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e'
    ],
    description: 'Expertly tailored wool suit crafted from the finest Italian fabrics. Features a modern cut with classic details.',
    details: ['100% Italian wool', 'Half-canvas construction', 'Pick-stitched lapels', 'Working button cuffs']
  },
  // ... other products with similar structure
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const product = allProducts.find(p => p.id === parseInt(params.id));
  const cartItem = items.find(item => item.id === parseInt(params.id));
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <div className="pt-24 text-center">Product not found</div>;
  }

  const handleColorChange = (color: typeof product.colors[0]) => {
    setSelectedColor(color);
    setCurrentImageIndex(color.imageIndex);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      variant: `${selectedColor.name} - ${selectedSize}`
    });
    router.back();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      <div className="container mx-auto px-4">
        <button 
          onClick={() => router.back()} 
          className="mb-8 text-gray-600 hover:text-black"
        >
          ← Back
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square"
          >
            <ProductImageCarousel 
              images={product.images} 
              currentIndex={currentImageIndex}
              setCurrentIndex={setCurrentImageIndex}
            />
          </motion.div>
          <div>
            <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-800 mb-6">{product.price}</p>
            
            {/* Color Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color: {selectedColor?.name}</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor?.name === color.name 
                        ? 'border-black' 
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {cartItem ? (
              <div className="flex items-center gap-4 mb-8">
                {cartItem.quantity === 1 ? (
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                    Remove from Cart
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <span className="text-xl">{cartItem.quantity}</span>
                    <button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                        variant: `${selectedColor?.name} - ${selectedSize}`
                      })}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition mb-8"
              >
                Add to Cart
              </button>
            )}
            
            <p className="text-gray-600 mb-8">{product.description}</p>
            <div className="mb-8">
              <h2 className="font-medium mb-4">Product Details</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}