"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";

interface AddToCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddToCart({ isOpen, onClose }: AddToCartProps) {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  // Esc key Press 
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Outside Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between pointer-events-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <FiShoppingBag className="h-5 w-5 text-[#fd5700]" />
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-200/60 hover:text-gray-800 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto px-6 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <FiShoppingBag className="h-8 w-8" />
                </div>
                <p className="mt-4 text-base font-semibold text-gray-700">Your cart is empty</p>
                <p className="mt-1 text-sm text-gray-400">Add items to get started</p>
              </div>
            ) : (
              cart.map((item) => {
                const currentPrice = item.discountPrice ?? item.price;
                // Use safe default image if no image is present
                const imageUrl = item.image && item.image.trim() !== "" 
                  ? item.image 
                  : "https://via.placeholder.com/150";

                return (
                  <div key={item.id} className="py-5 flex gap-4 items-start">
                    {/* Item Image */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                      <Image
                        src={imageUrl}
                        alt={item.name || "Product image"}
                        fill
                        sizes="80px"
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Item Info & Controls */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 truncate">
                        {item.name}
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-500">
                        {item.color && `Color: ${item.color}`}
                        {item.color && item.size && "  |  "}
                        {item.size && `Size: ${item.size}`}
                        {!item.color && !item.size && item.category && `Category: ${item.category}`}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 text-gray-700">
                          <button
                            onClick={() => updateQuantity(item.id, "decrease")}
                            className="text-gray-500 hover:text-gray-900 transition-colors p-1 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-sm font-semibold min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, "increase")}
                            className="text-gray-500 hover:text-gray-900 transition-colors p-1 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold text-gray-900">
                            $ {(currentPrice * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-rose-500 hover:text-rose-600 transition-colors cursor-pointer p-1"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-white space-y-4">
              <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-2xl text-[#fd5700]">$ {subtotal.toFixed(2)}</span>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full flex items-center justify-center rounded-xl bg-[#0f172a] py-4 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={clearCart}
                  className="w-full flex items-center justify-center rounded-xl border border-gray-300 bg-white py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}