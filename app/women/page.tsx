'use client'

import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { supabase } from '../../supabaseClient';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function WomenPage() {
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch women’s products from Supabase
    async function fetchWomenProducts() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id, 
          name, 
          price, 
          product_images(url)
        `)
        .eq('category_id', 1)
        .eq('product_images.is_main', true); // Filter for main images

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        console.log('Fetched products:', data);
        // Transform data to match ProductGrid structure
        const products = data.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: `Rs. ${product.price.toLocaleString()}`,
          // image: product.product_images?.[0]?.image_url || '', // Use the main image
          image: product.product_images?.[0]?.url || '', // Use the main image

        }));

        console.log('Transformed products:', products); // Log the transformed products
        setWomenProducts(products);
      }
    }

    fetchWomenProducts();
  }, []);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif mb-8">Women&apos;s Collection</h1>
        <ProductGrid products={womenProducts as Product[]} />
      </div>
    </div>
  );
}