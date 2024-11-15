// Luxe-Fashion/app/product/[id]/page.tsx

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
  images: { id: number; url: string }[];
  description: string;
  details: string[];
}

interface OptionValue {
  id: number;
  option_id: number;
  name: string;
  price_adjustment: number;
  availability_status: string;
  sort_order: number;
  image_id: number | null;
  hex_code: string | null;
}

interface ProductOption {
  id: number;
  product_id: number;
  name: string;
  type: string;
  is_required: boolean;
  sort_order: number;
  option_values: OptionValue[];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: OptionValue }>({});
  const [dynamicPrice, setDynamicPrice] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cartItem = items.find((item) => item.id === parseInt(params.id));

  useEffect(() => {
    async function fetchProductData() {
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

      // Fetch product options and their option values
      const { data: optionsData, error: optionsError } = await supabase
        .from('product_options')
        .select(
          `
          *,
          option_values (
            *
          )
        `
        )
        .eq('product_id', productId)
        .order('sort_order', { ascending: true });

      if (optionsError) {
        console.error('Error fetching product options:', optionsError);
      }

      // Fetch product images
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('id, url')
        .eq('product_id', productId)
        .order('sort_order', { ascending: true });

      if (imagesError) {
        console.error('Error fetching product images:', imagesError);
      }

      const images =
        imagesData?.map((image: { id: number; url: string }) => ({
          id: image.id,
          url: image.url,
        })) || [];

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

      // Map options and sort their values
      const mappedOptions: ProductOption[] =
        optionsData?.map((option: any) => ({
          id: option.id,
          product_id: option.product_id,
          name: option.name,
          type: option.type,
          is_required: option.is_required,
          sort_order: option.sort_order,
          option_values: option.option_values
            .map((ov: any) => ({
              id: ov.id,
              option_id: ov.option_id,
              name: ov.name,
              price_adjustment: parseFloat(ov.price_adjustment) || 0,
              availability_status: ov.availability_status,
              sort_order: ov.sort_order,
              image_id: ov.image_id,
              hex_code: ov.hex_code,
            }))
            .sort((a: OptionValue, b: OptionValue) => a.sort_order - b.sort_order),
        })) || [];

      setProduct(product);
      setDynamicPrice(product.price);
      setProductOptions(mappedOptions);
      setLoading(false);

      // Auto-select the first available option for each required option group
      const initialSelections: { [key: string]: OptionValue } = {};
      mappedOptions.forEach((option) => {
        const availableValues = option.option_values.filter(
          (ov) => ov.availability_status.toLowerCase().trim() !== 'sold out'
        );
        if (option.is_required && availableValues.length > 0) {
          initialSelections[option.name] = availableValues[0];
          // If the option value has an image_id, set the main image to it
          if (availableValues[0].image_id) {
            const imageIndex = images.findIndex((img: { id: number; url: string }) => img.id === availableValues[0].image_id);
            if (imageIndex !== -1) {
              setCurrentImageIndex(imageIndex);
            }
          }
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
        const optionValue = selectedOptions[optionKey];
        if (optionValue.price_adjustment) {
          adjustedPrice += optionValue.price_adjustment;
        }
      }
      setDynamicPrice(adjustedPrice);
    }
  }, [selectedOptions, productOptions, product]);

  const handleOptionSelect = (optionName: string, optionValue: OptionValue) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: optionValue,
    }));
    if (optionValue.image_id !== null) {
      const imageIndex = product?.images.findIndex((img) => img.id === optionValue.image_id);
      if (imageIndex !== undefined && imageIndex !== -1 && product?.images[imageIndex]) {
        setCurrentImageIndex(imageIndex);
      }
    }
  };

  const handleAddToCart = () => {
    if (product && dynamicPrice !== null) {
      addToCart({
        id: product.id,
        name: product.name,
        price: `Rs. ${dynamicPrice.toLocaleString()}`,
        image: product.images[currentImageIndex]?.url || product.images[0]?.url,
        variant: Object.values(selectedOptions)
          .map((ov) => ov.name)
          .join(', '),
      });
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading...</div>;
  if (!product) return <div className="pt-24 text-center">Product not found</div>;

  // Sort product options by sort_order
  const sortedProductOptions = [...productOptions].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <button onClick={() => router.back()} className="mb-8 text-gray-600 hover:text-black">
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Carousel Section */}
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
            {/* Ensuring the main image has a fixed height */}
            <div className="relative w-full h-[500px]">
              <ProductImageCarousel
                images={product.images.map((img) => img.url)}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
              />
            </div>
            {/* Mini Carousel (Thumbnails) */}
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 md:w-20 md:h-20 border ${
                    currentImageIndex === index ? 'border-black' : 'border-transparent'
                  } rounded-md`}
                >
                  <img
                    src={img.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details Section */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif mb-2">{product.name}</h1>

            <p className="text-2xl text-gray-800 mb-6">Rs. {dynamicPrice?.toLocaleString()}</p>

            {/* Product Options */}
            {sortedProductOptions.map((option) => (
              <div key={option.name} className="mb-6">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  {option.name}
                  {!option.is_required && <span className="text-gray-500 ml-1">(optional)</span>}
                  {option.name.toLowerCase() === 'color' && selectedOptions[option.name] && (
                    <span className="text-gray-500">: {selectedOptions[option.name].name}</span>
                  )}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {option.option_values.map((optionValue) => {
                    const isSelected = selectedOptions[option.name]?.id === optionValue.id;
                    const availabilityStatus = optionValue.availability_status.toLowerCase().trim();
                    const isSoldOut = availabilityStatus === 'sold out';
                    const isLimited = availabilityStatus === 'limited stock';

                    return (
                      <div key={`${option.name}-${optionValue.id}`} className="relative">
                        {option.type.toLowerCase() === 'color' ? (
                          <button
                            onClick={() => {
                              if (isSoldOut) return; // Prevent selection if sold out
                              handleOptionSelect(option.name, optionValue);
                            }}
                            className={`relative w-10 h-10 rounded-full ${
                              isSelected ? 'border-2 border-black p-0.5' : 'border-2 border-transparent'
                            } flex items-center justify-center ${
                              isSoldOut && !isSelected ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <span
                              className="w-full h-full rounded-full"
                              style={{
                                backgroundColor: optionValue.hex_code ? `#${optionValue.hex_code}` : '#ffffff',
                              }}
                            ></span>
                            {/* Diagonal Line for Sold Out */}
                            {isSoldOut && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-0.5 bg-red-600 transform rotate-45"></div>
                              </div>
                            )}
                            {/* Inventory Status Labels */}
                            {isLimited && (
                              <span className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 mt-1 text-xs text-white bg-red-500 px-1 rounded">
                                Limited
                              </span>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (isSoldOut) return;
                              handleOptionSelect(option.name, optionValue);
                            }}
                            className={`relative px-2 py-2 rounded ${
                              isSelected ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                            } ${
                              isSoldOut && !isSelected
                                ? 'opacity-50 cursor-not-allowed'
                                : 'transition-colors duration-200'
                            }`}

                          >
                            {optionValue.name}
                            {/* Diagonal Line for Sold Out (except color*/}
                            {isSoldOut && (
                              <div className="absolute inset-1 flex items-center justify-center">
                                <div className="absolute w-[1.5px] h-0.5 bg-red-500 transform rotate-45"
                                      style={{
                                        top: 0,
                                        left: '50%',
                                        width: '141.42%',
                                        transformOrigin: 'center',
                                      }}
                                ></div>
                              </div>
                            )}
                            {/* Inventory Status Labels */}
                            {isLimited && (
                              <span className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 mt-1 text-xs text-white bg-red-500 px-1 rounded">
                                Limited
                              </span>
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <p className="text-gray-600 mb-8">{product.description}</p>

            {/* Add to Cart Section */}
            <div className="flex items-center gap-4 mt-6">
              {cartItem ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      cartItem.quantity === 1
                        ? removeFromCart(product.id)
                        : updateQuantity(product.id, cartItem.quantity - 1)
                    }
                    className="text-red-500 hover:bg-gray-100 p-2 rounded-full"
                  >
                    {cartItem.quantity === 1 ? (
                      <TrashIcon className="h-5 w-5" />
                    ) : (
                      <MinusIcon className="h-5 w-5" />
                    )}
                  </button>
                  <span className="text-xl">{cartItem.quantity}</span>
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
                  className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
                >
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
