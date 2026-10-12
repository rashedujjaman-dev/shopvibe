"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  addToCart: (item: CartItem | Product) => void; // Product বা CartItem যেকোনো কিছু গ্রহণ করতে পারবে
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
  const STORAGE_KEY = userId ? `shopvibe_cart_${userId}` : null;

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined" && userId) {
      const savedCart = localStorage.getItem(`shopvibe_cart_${userId}`);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (userId) {
        const savedCart = localStorage.getItem(`shopvibe_cart_${userId}`);
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch (e) {
            console.error("Failed to parse cart from localStorage", e);
            setCart([]);
          }
        } else {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    }
  }, [userId]);

  useEffect(() => {
    if (typeof window !== "undefined" && STORAGE_KEY && userId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, STORAGE_KEY, userId]);

  const addToCart = (product: CartItem | Product) => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    // Product-এ price বা discountPrice থাকতে পারে, তা হ্যান্ডেল করার জন্য
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
    if (!userId) return;
    setCart((prevCart) => prevCart.filter((item) => String(item.id) !== String(id)));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (!userId) return;
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