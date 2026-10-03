"use client";

import { NAV_ITEMS } from "@/constants/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-200 bg-white/95 px-4 pt-2 pb-6 space-y-3 shadow-md backdrop-blur-sm animate-in slide-in-from-top-2">
      {/* Navigation Links */}
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-[#fd5700] transition-colors"
        >
          {item.title}
        </Link>
      ))}

      {/* Cart & Login Section */}
      <div className="pt-3 border-t border-gray-100 space-y-2">
        <Link
          href="/cart"
          onClick={onClose}
          className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-[#fd5700] transition-colors"
        >
          <div className="flex items-center space-x-2">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
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
        </Link>

        {/* Login Link */}
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-[#fd5700] transition-colors"
        >
          <User className="w-5 h-5" />
          <span>Login</span>
        </Link>
      </div>
    </div>
  );
};