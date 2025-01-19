import type { Metadata } from 'next'
import './globals.css'

import { CartProvider } from './components/CartContext'
import CartSlideOver from './components/CartSlideOver'
import { Analytics } from '@vercel/analytics/react';


export const metadata: Metadata = {
  title: 'SOS GOG - Luxury Fashion',
  description: 'The future of luxury fashion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body>
      <CartProvider>
        {children}
        <Analytics />
        <CartSlideOver />
        </CartProvider>
        </body>
      
    </html>
  )
}