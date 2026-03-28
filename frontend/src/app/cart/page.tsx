"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { cart, removeItem, updateQuantity, clearCart, getTotal, itemCount } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-20">
            <Image
              src="/images/empty-cart.svg"
              alt="Empty cart"
              width={150}
              height={150}
              className="mx-auto mb-8 opacity-50"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Add some delicious items to get started!
            </p>
            <Link
              href="/menu"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Shopping Cart
                </h1>
                <p className="text-gray-600">{itemCount} items in your cart</p>
              </div>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-medium text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="p-8">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 py-6 border-b border-gray-100 last:border-b-0"
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    ₹{item.price.toFixed(0)} each
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-lg p-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-lg mx-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-600">
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-200">
            <div className="flex justify-between items-center text-2xl font-bold text-gray-800 mb-6">
              <span>Total:</span>
              <span>₹{getTotal().toFixed(0)}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg">
              Proceed to Checkout
            </button>
            <div className="mt-4 text-center">
              <Link
                href="/menu"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
