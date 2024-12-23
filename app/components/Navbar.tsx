"use client";

import Link from 'next/link';
import { ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCart } from './CartContext';
import MobileNav from './MobileNav';
import SearchModal from './SearchModal';
import { useState } from 'react';

export default function Navbar() {
  const { items, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-40 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Link href="/" className="text-2xl font-serif">SOSGOG</Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/women" className="hover:text-gray-600">Women</Link>
            <Link href="/men" className="hover:text-gray-600">Men</Link>
            <Link href="/rare-collection" className="hover:text-gray-600">Rare Collection</Link>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="hover:text-gray-600"
              onClick={() => setIsSearchOpen(true)}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button 
              className="relative hover:text-gray-600"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}