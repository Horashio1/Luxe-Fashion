"use client";

import { useEffect, useState } from 'react';
import { useCart } from '../../components/CartContext';
import { useRouter } from 'next/navigation';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import ProductImageCarousel from '../../components/ProductImageCarousel';
import { supabase } from '../../../supabaseClient';

interface Product {
  id: number;
  category_id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  details: string[];
}

interface ProductOption {
  id: number;
  option_name: string;
  option_type: string;
  option_value: string;
  option_order: number;
  required: boolean;
  inventory_status: string;
  price_adjustment: number;
  min_limit?: number;
  max_limit?: number;
  image_id?: number;
  additional_data?: { hex?: string };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [dynamicPrice, setDynamicPrice] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cartItem = items.find((item) => item.id === parseInt(params.id));

  useEffect(() => {
    async function fetchProductData() {
      setLoading(true);
      const productId = parseInt(params.id);

      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError || !productData) {
        console.error('Error fetching product:', productError);
        setLoading(false);
        return;
      }

      const { data: optionsData, error: optionsError } = await supabase
        .from('product_optionss')
        .select('*')
        .eq('product_id', productId)
        .order('option_order', { ascending: true });

      if (optionsError) {
        console.error('Error fetching product options:', optionsError);
      }

      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('url')
        .eq('product_id', productId)
        .order('sort_order', { ascending: true });

      if (imagesError) {
        console.error('Error fetching product images:', imagesError);
      }

      const images = imagesData?.map((image: { url: string }) => image.url) || [];
      const product: Product = {
        id: productData.id,
        category_id: productData.category_id,
        name: productData.name,
        price: productData.price,
        images,
        description: productData.description_main || '',
        details: productData.additional_info
          ? Object.values(productData.additional_info).map((info) => String(info))
          : [],
      };

      setProduct(product);
      setDynamicPrice(productData.price);
      setProductOptions(optionsData || []);
      setLoading(false);

      // Auto-select the first option for each required option group
      const initialSelections: { [key: string]: string } = {};
      optionsData?.forEach((option: ProductOption) => {
        if (option.required && !initialSelections[option.option_name]) {
          initialSelections[option.option_name] = option.option_value;
        }
      });
      setSelectedOptions(initialSelections);
    }

    fetchProductData();
  }, [params.id]);

  useEffect(() => {
    if (product) {
      let adjustedPrice = product.price;
      for (const optionKey in selectedOptions) {
        const option = productOptions.find((opt) => opt.option_value === selectedOptions[optionKey]);
        if (option?.price_adjustment) {
          adjustedPrice += option.price_adjustment;
        }
      }
      setDynamicPrice(adjustedPrice);
    }
  }, [selectedOptions, productOptions, product]);

  const handleOptionSelect = (optionName: string, optionValue: string, imageId?: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: optionValue,
    }));
    if (imageId !== undefined && product?.images[imageId]) {
      setCurrentImageIndex(imageId);
    }
  };

  const handleAddToCart = () => {
    if (product && dynamicPrice !== null) {
      addToCart({
        id: product.id,
        name: product.name,
        price: `Rs. ${dynamicPrice.toLocaleString()}`,
        image: product.images[0],
        variant: Object.values(selectedOptions).join(', '),
      });
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading...</div>;
  if (!product) return <div className="pt-24 text-center">Product not found</div>;

  const groupedOptions = productOptions.reduce((acc, option) => {
    if (!acc[option.option_name]) acc[option.option_name] = [];
    if (!acc[option.option_name].some((opt) => opt.option_value === option.option_value)) {
      acc[option.option_name].push(option);
    }
    return acc;
  }, {} as { [key: string]: ProductOption[] });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <button onClick={() => router.back()} className="mb-8 text-gray-600 hover:text-black">
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative aspect-square">
            <ProductImageCarousel images={product.images} currentIndex={currentImageIndex} setCurrentIndex={setCurrentImageIndex} />
          </motion.div>

          <div>
            <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-800 mb-6">Rs. {dynamicPrice?.toLocaleString()}</p>

            {Object.keys(groupedOptions).map((optionName) => (
              <div key={optionName} className="mb-4">
                <h3 className="text-sm font-medium mb-2">
                  {optionName} {selectedOptions[optionName] && optionName === 'Color' ? `: ${selectedOptions[optionName]}` : ''}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {groupedOptions[optionName].map((option) => (
                    <div key={option.id} className="mb-2">
                      {option.option_type === 'color' ? (
                        <button
                          onClick={() => handleOptionSelect(optionName, option.option_value, option.image_id)}
                          className={`w-8 h-8 rounded-full border-4 ${
                            selectedOptions[optionName] === option.option_value ? 'border-yellow-500' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: option.additional_data?.hex }}
                        />
                      ) : (
                        <button
                          onClick={() => handleOptionSelect(optionName, option.option_value)}
                          className={`px-4 py-2 rounded ${
                            selectedOptions[optionName] === option.option_value ? 'bg-black text-white' : 'bg-gray-200'
                          }`}
                        >
                          {option.option_value}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <p className="text-gray-600 mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mt-6">
              {cartItem ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => cartItem.quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, cartItem.quantity - 1)} className="text-red-500 hover:bg-gray-100 p-2 rounded-full">
                    {cartItem.quantity === 1 ? <TrashIcon className="h-5 w-5" /> : <MinusIcon className="h-5 w-5" />}
                  </button>
                  <span className="text-xl">{cartItem.quantity}</span>
                  <button onClick={() => updateQuantity(product.id, cartItem.quantity + 1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button onClick={handleAddToCart} className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
