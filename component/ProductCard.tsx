"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { TbShoppingBagPlus } from "react-icons/tb";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div>
        {/* Product Image */}
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="mt-4">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            {product.category}
          </p>
          <Link href={`/product/${product.id}`}>
            <h3 className="mt-1 text-sm font-semibold text-gray-800 line-clamp-1 hover:text-[#fd5700] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Price & Add to Cart Button */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">
            ${product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
          </span>
          {product.discountPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fd5700] text-white transition-all hover:bg-amber-500 active:scale-95 cursor-pointer"
          title="Add to Cart"
        >
          <TbShoppingBagPlus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}