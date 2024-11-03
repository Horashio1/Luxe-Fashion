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

export default function MenPage() {
  const [menProducts, setMenProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch men’s products from Supabase
    async function fetchMenProducts() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id, 
          name, 
          price, 
          product_images(image_url)
        `)
        .eq('category_id', 2)
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
          image: product.product_images?.[0]?.image_url || '', // Use the main image
        }));

        console.log('Transformed products:', products); // Log the transformed products
        setMenProducts(products);
      }
    }

    fetchMenProducts();
  }, []);


  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif mb-8">Men&apos;s Collection</h1>
        <ProductGrid products={menProducts as Product[]} />
      </div>
    </div>
  );
}
