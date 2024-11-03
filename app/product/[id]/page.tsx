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
  name: string;
  price: string;
  colors?: { name: string; value: string; imageIndex: number }[];
  sizes?: string[];
  images: string[];
  description: string;
  details: string[];
}

interface OptionData {
  option_name: string;
  option_value: string;
  additional_data?: { hex?: string };
}

interface ImageData {
  image_url: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string; imageIndex: number } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cartItem = items.find(item => item.id === parseInt(params.id));

  useEffect(() => {
    // Fetch product data from Supabase
    async function fetchProduct() {
      setLoading(true);
      const productId = parseInt(params.id);

      // Fetch product details
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

      // Fetch product options (e.g., colors, sizes)
      const { data: optionsData, error: optionsError } = await supabase
        .from('product_options')
        .select('option_name, option_value, additional_data')
        .eq('product_id', productId);

      if (optionsError) {
        console.error('Error fetching product options:', optionsError);
      }

      // Fetch product images
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', productId)
        .order('sort_order', { ascending: true });

      if (imagesError) {
        console.error('Error fetching product images:', imagesError);
      }

      const colors = optionsData
        ?.filter((option: OptionData) => option.option_name === 'Color')
        .map((option: OptionData, index: number) => ({
          name: option.option_value,
          value: option.additional_data?.hex || '#000000',
          imageIndex: index,
        }));

      const sizes = optionsData
        ?.filter((option: OptionData) => option.option_name === 'Size')
        .map((option: OptionData) => option.option_value);

      const images = imagesData?.map((image: ImageData) => image.image_url) || [];

      const product = {
        id: productData.id,
        name: productData.name,
        price: `Rs. ${productData.price.toLocaleString()}`,
        colors: colors?.length ? colors : undefined,
        sizes: sizes?.length ? sizes : undefined,
        images,
        description: productData.description_main || '',
        details: productData.additional_info ? (Object.values(productData.additional_info) as string[]) : [],
      };

      setProduct(product);
      setSelectedColor(colors && colors[0] ? colors[0] : null);
      setSelectedSize(sizes && sizes[0] ? sizes[0] : null);
      setLoading(false);
    }

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="pt-24 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="pt-24 text-center">Product not found</div>;
  }

  const handleColorChange = (color: { name: string; value: string; imageIndex: number }) => {
    setSelectedColor(color);
    setCurrentImageIndex(color.imageIndex);
  };

  const handleAddToCart = () => {
    const variant = selectedColor && selectedSize
      ? `${selectedColor.name} - ${selectedSize}`
      : selectedColor
        ? selectedColor.name
        : selectedSize
          ? selectedSize
          : 'Standard';

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      variant,
    });
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

            {product.colors && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Color: {selectedColor?.name}</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor?.name === color.name
                        ? 'border-black'
                        : 'border-transparent'
                        }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md ${selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-black'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
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

            {cartItem ? (
              <div className="flex items-center gap-4 mb-8">
                {/* Conditional for showing Trash or Minus Icon */}
                {cartItem.quantity === 1 ? (
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-red-500 hover:text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <MinusIcon className="h-5 w-5" />
                  </button>
                )}

                {/* Quantity display - Centered */}
                <span className="text-xl text-center min-w-[20px]">{cartItem.quantity}</span>

                {/* Plus Icon */}
                <button
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
