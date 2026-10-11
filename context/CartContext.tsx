"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state directly from localStorage to prevent empty flash on refresh
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("shopvibe_cart");
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

  // Save cart to LocalStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shopvibe_cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => String(item.id) === String(product.id)
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += product.quantity || 1;
        return updated;
      }
      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
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

  const clearCart = () => setCart([]);

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