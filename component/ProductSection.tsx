
"use client"

import { sampleProducts } from '@/data/products';
import React, { useState } from 'react'
import ProductCard from './ProductCard';



const categories = [
  "All",
  "Earbuds",
  "Smart Watch",
  "Headphones",
  "Power Bank",
  "Wireless Speaker",
] as const;


export const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter products by category

  const filteredProducts = selectedCategory === "All" ? sampleProducts : sampleProducts.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Products
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Explore our high-quality gadgets and accessories at the best prices.
          </p>
        </div>

        {/* Category filter buttons */}
        <div className="md:flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {
            categories.map((cat) => (
              <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap  transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#fd5700] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              >
                {cat}
              </button>
            ))}
        </div>

        {/* Responsive Grid (Mobile: 1, Desktop: 4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
