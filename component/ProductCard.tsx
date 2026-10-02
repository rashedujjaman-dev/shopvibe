"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { TbShoppingBagPlus } from "react-icons/tb";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, category, image, price, discountPrice, badge } = product;

  // Calculate discount percentage
  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`Added product ${id} to cart`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
     {/* Product Image */}
      <Link href={`/product/${id}`} className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover bg-gray-50 object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discounts and Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPrice && (
            <span className="rounded-md bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
              -{discountPercentage}%
            </span>
          )}
          {badge && (
            <span className="rounded-md bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
              {badge}
            </span>
          )}
        </div>
      </Link>

      {/* Product Information*/}
      <div className="flex flex-1 flex-col p-4">
        {/* category*/}
        <span className="text-xs font-medium text-[#fd5700] uppercase tracking-wider mb-1">
          {category}
        </span>

        {/* name */}
        <Link href={`/product/${id}`} className="group-hover:text-[#fd5700] transition-colors">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 leading-snug min-h-10">
            {name}
          </h3>
        </Link>

        {/* price and button */}
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            {discountPrice ? (
              <div className="flex items-baseline space-x-1.5">
                <span className="text-lg font-bold text-gray-900">
                  $ {discountPrice.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-gray-400 line-through">
                  $ {price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                $ {price.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="flex items-center justify-center rounded-lg bg-[#fd5700] p-2.5 text-white transition-colors hover:bg-amber-500 active:scale-95 shadow-sm cursor-pointer"
          >
            <TbShoppingBagPlus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}












// "use client"


// import { Product } from '@/types/product'
// import Link from 'next/link';
// import React from 'react'

// interface ProductCardProps {
//   product: Product;
// }

// export const ProductCard = ({product}: ProductCardProps) => {
//   const {id, name, category, image, price, discountPrice, badge} = product;

//   // Calculate discount percentage
//   const discountPercentage = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

//   const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     // console.log(`Added product ${id} to cart`);
//   };

//   return (
//     <div>
//       {/* product image */}
//       <Link href={`/product/${id}`}>

//       </Link>
//     </div>
//   )
// }






