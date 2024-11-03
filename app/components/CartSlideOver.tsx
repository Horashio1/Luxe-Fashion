"use client";

import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from './CartContext';
import Link from 'next/link';

export default function CartSlideOver() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();

  // Calculate the total price in real-time
  const total = items.reduce((sum, item) => {
    // Parse the price after removing "Rs." and commas
    const price = parseFloat(item.price.replace('Rs.', '').replace(',', ''));
    return sum + (price * item.quantity);
  }, 0);

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    if (items.length === 1) {
      setTimeout(() => setIsCartOpen(false), 300);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-[75%] md:w-96 bg-white z-50 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif">Shopping Cart</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                  {items.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-500 mt-8"
                    >
                      Your cart is empty
                    </motion.p>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <motion.div
                          key={`${item.id}-${item.variant}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex gap-4"
                        >
                          <div className="relative w-24 h-24">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-600">Rs. {parseFloat(item.price.replace('Rs.', '').replace(',', '')).toLocaleString()}</p>
                            {item.variant && (
                              <p className="text-sm text-gray-500">{item.variant}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              {item.quantity === 1 ? (
                                <button
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-red-500 hover:text-red-600 transition-colors"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <MinusIcon className="h-4 w-4" />
                                </button>
                              )}
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <PlusIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t pt-6 mt-6 space-y-4">
                <div className="flex justify-between mb-4">
                  <span>Total</span>
                  <span className="font-medium">Rs. {total.toLocaleString()}</span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-black text-white py-3 text-center hover:bg-gray-800 transition-colors"
                  onClick={() => setIsCartOpen(false)}
                >
                  Checkout
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full border border-black py-3 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
