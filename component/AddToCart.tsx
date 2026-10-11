"use client";

import React from "react";
import { X, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

interface AddToCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddToCart({ isOpen, onClose }: AddToCartProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    router.push("/checkout"); 
  };

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal / Drawer Box */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FiShoppingCart className="w-5 h-5 text-[#fd5700]" />
            <h2 className="text-lg font-bold text-gray-900">Your Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <FiShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-base font-medium">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1">Add items to get started shopping.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                  <Image
                    src={item.image || "/images/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs font-bold text-[#fd5700] mt-0.5">
                    ${item.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 rounded-md text-xs font-bold hover:bg-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 rounded-md text-xs font-bold hover:bg-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Subtotal:</span>
              <span className="text-lg font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#fd5700] hover:bg-[#e04d00] text-white font-medium py-3 rounded-xl text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}