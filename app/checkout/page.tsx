"use client";

import { useState } from 'react';
import { useCart } from '../components/CartContext';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { items } = useCart();
  const [step, setStep] = useState(1);

  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '').replace(',', ''));
    return sum + price * item.quantity;
  }, 0);

  const shipping = 50;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-serif mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-serif mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">First Name</label>
                    <input type="text" className="w-full border rounded-md p-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                    <input type="text" className="w-full border rounded-md p-2" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Address</label>
                    <input type="text" className="w-full border rounded-md p-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">City</label>
                    <input type="text" className="w-full border rounded-md p-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Postal Code</label>
                    <input type="text" className="w-full border rounded-md p-2" />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-serif mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                    <input type="text" className="w-full border rounded-md p-2" placeholder="**** **** **** ****" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Expiry Month</label>
                      <input type="text" className="w-full border rounded-md p-2" placeholder="MM" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Expiry Year</label>
                      <input type="text" className="w-full border rounded-md p-2" placeholder="YY" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">CVV</label>
                      <input type="text" className="w-full border rounded-md p-2" placeholder="***" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-xl font-serif mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${finalTotal.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-black text-white py-3 rounded mt-6 hover:bg-gray-800 transition-colors">
                Place Order
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}