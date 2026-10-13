"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product } from "@/types/product";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem | Product) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
  userId?: string | null;
}

export const CartProvider = ({ children, userId = null }: CartProviderProps) => {
  // প্রতিটি ইউজারের জন্য আলাদা এবং গেস্টের জন্য আলাদা লোকাল স্টোরেজ কি (Key)
  const STORAGE_KEY = userId ? `shopvibe_cart_${userId}` : "shopvibe_guest_cart";
  const prevUserIdRef = useRef(userId);

  // ১. ইনিশিয়ালাইজেশনের সময় বর্তমান ইউজার বা গেস্টের নিজস্ব কার্ট লোড করা
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
    return [];
  });

  // ২. ইউজার পরিবর্তন বা সুইচ হলে আগের ইউজারের কার্ট লুকিয়ে নতুন ইউজারের কার্ট লোড করা
  useEffect(() => {
    if (typeof window !== "undefined") {
      // যদি ইউজার আইডি বদলায় (যেমন লগইন করা, লগআউট করা বা ইউজার পরিবর্তন)
      if (prevUserIdRef.current !== userId) {
        prevUserIdRef.current = userId;
      }

      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
          setCart([]);
        }
      } else {
        setCart([]); // অন্য ইউজারের কার্ট না থাকলে স্টেট সম্পূর্ণ খালি করে দেওয়া
      }
    }
  }, [userId, STORAGE_KEY]);

  // ৩. কার্ট পরিবর্তন হলে তা কেবল বর্তমান ইউজারের নির্দিষ্ট স্টোরেজে সেভ করা
  useEffect(() => {
    if (typeof window !== "undefined" && STORAGE_KEY) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, STORAGE_KEY]);

  const addToCart = (product: CartItem | Product) => {
    const itemPrice = "discountPrice" in product && product.discountPrice ? product.discountPrice : product.price;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => String(item.id) === String(product.id)
      );
      const qty = "quantity" in product && product.quantity ? product.quantity : 1;

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: itemPrice,
          image: product.image,
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => String(item.id) !== String(id)));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (String(item.id) === String(id)) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    if (STORAGE_KEY && typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};