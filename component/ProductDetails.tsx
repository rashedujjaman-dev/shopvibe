"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import Rating from "./Rating";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { name, category, image, price, discountPrice, description, rating } = product;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
        <Link href="/" className="flex items-center hover:text-[#fd5700] transition-colors">
          <FiHome className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>

        <FiChevronRight className="h-4 w-4 text-gray-400" />

        <Link href="/shop" className="hover:text-[#fd5700] transition-colors">
          Shop
        </Link>

        <FiChevronRight className="h-4 w-4 text-gray-400" />

        <span className="font-medium text-gray-900 truncate max-w-50 sm:max-w-xs">
          {name}
        </span>
      </nav>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        {/* Product Details Content */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#fd5700]">
              $ {discountPrice ? discountPrice.toFixed(2) : price.toFixed(2)}
            </span>
            {discountPrice && (
              <span className="text-sm text-gray-400 line-through">
                Old Price: $ {price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="pt-1">
            <Rating value={rating || 0} />
          </div>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            {description ||
              "The smooth touch of the best fabrics, modern design and comfortable fitting—this garment will give you a stylish look and all-day comfort, enhancing your confidence and beauty in every moment."}
          </p>

          <p className="text-sm italic text-gray-500">
            Category:{" "}
            <Link
              href={`/shop?category=${encodeURIComponent(category.toLowerCase())}`}
              className="font-medium text-gray-700 hover:text-[#fd5700] hover:underline transition-colors not-italic"
            >
              {category}
            </Link>
          </p>

          <div className="pt-4">
            <button
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd5700] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-500 active:scale-95 sm:w-auto cursor-pointer"
            >
              <TbShoppingBagPlus className="h-5 w-5" />
              Add To Cart
            </button>
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:underline"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}