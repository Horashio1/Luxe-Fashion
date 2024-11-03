"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { ShoppingBagIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const router = useRouter();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const cartItem = items.find(item => item.id === product.id);
        
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div 
              className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
              
              {cartItem ? (
                <div className="flex items-center gap-2">
                  {cartItem.quantity === 1 ? (
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{cartItem.quantity}</span>
                    </>
                  )}
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <ShoppingBagIcon className="h-4 w-4" />
                  Add
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}