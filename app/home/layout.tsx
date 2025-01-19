import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '../components/CartContext'
import Navbar from '../components/Navbar'
import CartSlideOver from '../components/CartSlideOver'

import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SOS GOG - Luxury Fashion',
  description: 'Premium fashion and accessories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
          <Analytics />
          <CartSlideOver />
        </CartProvider>
      </body>
    </html>
  )
}