"use client";

import { NAV_ITEMS } from "@/constants/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import UserProfile from "../UserProfile";
import { FiShoppingCart } from "react-icons/fi";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { cart } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);

  // Calculating the total number of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Close when clicking outside the menu content
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-2 px-4 md:hidden">
      <div
        ref={menuRef}
        className="w-full max-w-sm mx-auto bg-white rounded-2xl border border-gray-100 p-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2"
      >
        {/* Navigation Links */}
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-[#fd5700] transition-colors"
          >
            {item.title}
          </Link>
        ))}

        {/* Cart & User Section */}
        <div className="pt-3 border-t border-gray-100 space-y-2">
          <button
            onClick={() => {
              onClose();
              // হেডার কম্পোনেন্টে ড্রয়ার ওপেন করার জন্য উইন্ডো ইভেন্ট ডিসপ্যাচ করা হলো
              window.dispatchEvent(new CustomEvent("open-cart-drawer"));
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-[#fd5700] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <FiShoppingCart className="w-5 h-5 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#fd5700] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </div>

            {totalItems > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-[#fd5700]">
                {totalItems} {totalItems === 1 ? "Item" : "Items"}
              </span>
            )}
          </button>

          {/* User Profile / Login Link */}
          <div className="px-3 py-2">
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
};