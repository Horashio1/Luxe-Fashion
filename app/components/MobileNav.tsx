"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/men', label: 'Men' },
    { href: '/women', label: 'Women' },
    { href: '/rare-collection', label: 'Rare Collection' },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-md"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-md z-50 shadow-xl flex flex-col"
            >
              <div className="p-4 border-b bg-white">
                <div className="flex justify-between items-center">
                  <Link href="/" className="text-2xl font-serif" onClick={() => setIsOpen(false)}>
                    LUXE
                  </Link>
                  <button onClick={() => setIsOpen(false)}>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <nav className="p-4 bg-white flex-1">
                <ul className="space-y-4">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-lg hover:text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 bg-white border-t">
                <p className="text-sm text-gray-500">© 2024 LUXE. All rights reserved.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}