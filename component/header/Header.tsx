"use client";

import { NAV_ITEMS } from "@/constants/navigation";
import {
  Menu,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasket,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className=" sticky top-0 w-full z-50 bg-white/90 shadow-sm ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6  md:px-8">
        <div className=" flex items-center justify-between py-2">
          {/* logo */}
          <div className=" flex shrink-0 items-center">
            <Link href="/" className=" flex items-center justify-center">
              <Image
                src="/images/LogoShopvibe.png"
                alt="Shopvibe"
                width={160}
                height={50}
                priority
              />
            </Link>
          </div>
          {/*  links  */}
          <nav className=" hidden md:flex items-center justify-center space-x-8 text-base font-medium text-gray-700">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#fd5700] transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          {/* icons */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Login */}
            <Link
              href="/login"
              className="flex items-center space-x-1.5 text-base font-medium text-gray-700 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hover:text-[#fd5700] ">Login</span>
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-[#fd5700] transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {/* Cart Count Badge */}
              <span className="absolute -top-1 right-0 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-white bg-[#fd5700] rounded-full">
                0
              </span>
            </Link>
          </div>

          {/* Mobile button */}
          <div className="flex md:hidden items-center space-x-3">
            <Link href="/cart" className=" relative p-1.5 text-gray-700" aria-label="Shopping Cart">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-[#fd5700] rounded-full">
                0
              </span>
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}/>
    </header>
  );
};
