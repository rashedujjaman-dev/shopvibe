"use client";

import React from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Star, Check } from "lucide-react";
import { TbShoppingBagPlus } from "react-icons/tb";


interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { cart, addToCart } = useCart();

  // Check if this product is already in the cart
  const isAlreadyInCart = cart.some((item) => item.id === product.id);

  const displayPrice = product.discountPrice ?? product.price;

  const handleAddToCart = () => {
    if (isAlreadyInCart) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Product Image Section */}
        <div className="relative w-full h-87.5 md:h-120 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-[#fd5700] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details Information */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-[#fd5700]">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold text-gray-700 ml-1">
                {product.rating} / 5.0
              </span>
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#fd5700]">
              ${displayPrice.toFixed(2)}
            </span>
            {product.discountPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Add to Cart Section */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleAddToCart}
              disabled={isAlreadyInCart}
              className={`w-full md:w-auto px-8 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                isAlreadyInCart
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-[#fd5700] hover:bg-[#e04d00] text-white active:scale-[0.99] cursor-pointer"
              }`}
            >
              {isAlreadyInCart ? (
                <>
                  <Check className="w-5 h-5 text-gray-500" />
                  <span>Already Added</span>
                </>
              ) : (
                <>
                  <TbShoppingBagPlus className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}