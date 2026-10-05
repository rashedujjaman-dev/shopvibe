"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  category?: string;
  color?: string;
  size?: string;
}

// To take input from Product to CartItem
export type AddToCartInput = Omit<CartItem, "quantity"> & { quantity?: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: AddToCartInput) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, type: "increase" | "decrease") => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on initial mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shop_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync cart to localStorage on changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("shop_cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to localStorage", error);
      }
    }
  }, [cart, isInitialized]);

  const addToCart = (product: AddToCartInput) => {
    const qtyToAdd = product.quantity && product.quantity > 0 ? product.quantity : 1;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      return [...prevCart, { ...product, quantity: qtyToAdd } as CartItem];
    });

    // Success Notification
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: "12px",
        background: "#0f172a",
        color: "#fff",
      },
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
    });
  };

  const removeFromCart = (id: string | number) => {
    const itemToRemove = cart.find((item) => item.id === id);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    if (itemToRemove) {
      toast.error(`${itemToRemove.name} removed from cart.`, {
        style: {
          borderRadius: "12px",
          background: "#0f172a",
          color: "#fff",
        },
      });
    }
  };

  const updateQuantity = (id: string | number, type: "increase" | "decrease") => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = type === "increase" ? item.quantity + 1 : item.quantity - 1;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    toast("Cart cleared", { icon: "🧹" });
  };

  // Subtotal 
  const subtotal = cart.reduce((acc, item) => {
    const currentPrice = item.discountPrice ?? item.price;
    return acc + currentPrice * item.quantity;
  }, 0);

  // Total items 
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}