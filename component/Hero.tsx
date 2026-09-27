"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Wireless Earbuds",
    price: "$ 175",
    oldPrice: "$ 180",
    discount: "25%",
    image: "/products/earbuds.png",
  },
  {
    name: "Smart Watch",
    price: "$ 299",
    oldPrice: "$ 270",
    discount: "34%",
    image: "/products/wwwcccc.png",
  },
  {
    name: "JBL Headphones",
    price: "$ 180",
    oldPrice: "$ 190",
    discount: "38%",
    image: "/products/hhhhhppp.png",
  },
  {
    name: "Power Bank",
    price: "$ 320",
    oldPrice: "$ 390",
    discount: "35%",
    image: "/products/pppewbbb.jpg",
  },
];

export default function Hero() {
  return (
    <section className="w-full overflow-hidden bg-white">

      {/* ================= HERO ================= */}
      <div className="relative w-full bg-gradient-to-r from-[#fffef5] via-[#f4fbf8] to-[#e8f7f5]">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-green-100/50 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

          <div className="grid items-center gap-6 lg:grid-cols-[38%_62%] xl:grid-cols-[36%_64%]">

            {/* ================= LEFT CONTENT ================= */}
            <div className="relative z-20">

              {/* Offer */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#fd5700] px-3 py-1.5 text-[11px] font-bold text-white shadow-md sm:px-4 sm:py-2 sm:text-sm">
                <span className="text-sm sm:text-base">🔥</span>
                <span>Today's special offer</span>
              </div>

              {/* Brand */}
              <div className="mb-1 text-[16px] font-bold text-slate-800 sm:text-lg">
                Shop<span className="text-[#fd5700]">vibe</span>
              </div>

              {/* Heading */}
              <h1 className="max-w-[400px] text-[30px] font-black leading-[1.05] tracking-tight text-slate-900 sm:text-[40px] md:text-[46px] lg:text-[43px] xl:text-[52px]">
                Top Picks for a
                <span className="mt-1 block font-serif italic text-[#fd5700]">
                  Better You
                </span>
              </h1>

              {/* Description */}
              <p className="mt-3 max-w-[390px] text-[11px] font-medium leading-5 text-slate-700 sm:mt-4 sm:text-sm sm:leading-6">
                Make your daily life easier, smarter, and more stylish
with some of our best products!
              </p>

              {/* Benefits */}
              <div className="mt-4 grid max-w-[430px] grid-cols-3 gap-2 sm:mt-5 sm:gap-3">

                {/* Free Delivery */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f8d6c6] sm:h-9 sm:w-9">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-[#fd5700] sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 6h11v10H3z" />
                      <path d="M14 10h4l3 3v3h-7z" />
                      <circle cx="7" cy="18" r="2" />
                      <circle cx="18" cy="18" r="2" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[8px] font-bold text-slate-800 sm:text-[10px]">
                      Free Delivery
                    </p>
                    <p className="text-[7px] text-slate-500 sm:text-[8px]">
                      Across the country
                    </p>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f8d6c6] sm:h-9 sm:w-9">
                    <span className="text-xs font-black text-[#fd5700] sm:text-sm">
                      $
                    </span>
                  </div>

                  <div>
                    <p className="text-[8px] font-bold text-slate-800 sm:text-[10px]">
                      Cash on Delivery
                    </p>
                    <p className="text-[7px] text-slate-500 sm:text-[8px]">
                      Secure Payment
                    </p>
                  </div>
                </div>

                {/* Replacement */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#fd5700] sm:h-9 sm:w-9">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-[#fd5700] sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[8px] font-bold text-slate-800 sm:text-[10px]">
                      7 Days
                    </p>
                    <p className="text-[7px] text-slate-500 sm:text-[8px]">
                      Replacement
                    </p>
                  </div>
                </div>

              </div>

              {/* CTA */}
              <Link
                href="/products"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#fd5700] px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#fd5500] sm:mt-6 sm:px-7 sm:py-3 sm:text-sm"
              >
                <span>🛒</span>
                <span>Buy now</span>
                <span>→</span>
              </Link>
            </div>

            {/* ================= PRODUCTS ================= */}
            <div className="relative min-h-[280px] sm:min-h-[390px] md:min-h-[430px] lg:min-h-[440px]">

              {/* Product 1 - Earbuds */}
              <ProductCard
                product={products[0]}
                className="left-0 top-[12%] w-[43%] sm:left-[2%] sm:w-[42%] lg:left-0 lg:w-[40%]"
                imageClass="h-[145px] sm:h-[200px] md:h-[220px] lg:h-[235px]"
              />

              {/* Product 2 - Watch */}
              <ProductCard
                product={products[1]}
                className="right-[3%] top-0 w-[39%] sm:right-[4%] sm:w-[37%] lg:right-[5%] lg:w-[36%]"
                imageClass="h-[155px] sm:h-[215px] md:h-[235px] lg:h-[250px]"
              />

              {/* Product 3 - Headphones */}
              <ProductCard
                product={products[2]}
                className="bottom-0 left-[8%] w-[43%] sm:left-[10%] sm:w-[41%] lg:left-[9%] lg:w-[40%]"
                imageClass="h-[140px] sm:h-[195px] md:h-[215px] lg:h-[230px]"
              />

              {/* Product 4 - Power Bank */}
              <ProductCard
                product={products[3]}
                className="bottom-[3%] right-0 w-[37%] sm:right-[1%] sm:w-[35%] lg:right-[2%] lg:w-[34%]"
                imageClass="h-[125px] sm:h-[175px] md:h-[195px] lg:h-[210px]"
              />

            </div>

          </div>
        </div>
      </div>

      {/* ================= TRUST BAR ================= */}
      <div className="w-full bg-[#062b3a] text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-3">

          {/* Genuine */}
          <TrustItem
            type="shield"
            title="100% Genuine Products"
            subtitle="Authentic & Trusted"
          />

          {/* Support */}
          <TrustItem
            type="support"
            title="Dedicated Customer Support"
            subtitle="We're Always Here"
          />

          {/* Confidence */}
          <TrustItem
            type="heart"
            title="Shop with Confidence"
            subtitle="Easy Returns & Refunds"
          />

        </div>
      </div>

    </section>
  );
}


/* =====================================================
   PRODUCT CARD
===================================================== */

function ProductCard({
  product,
  className,
  imageClass,
}: {
  product: {
    name: string;
    price: string;
    oldPrice: string;
    discount: string;
    image: string;
  };
  className?: string;
  imageClass?: string;
}) {
  return (
    <Link
      href="/products"
      className={`absolute z-10 overflow-visible ${className}`}
    >
      {/* Discount Circle */}
      <div className="absolute -right-2 top-0 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#fd5700] text-center text-[8px] font-black leading-tight text-white shadow-md sm:-right-3 sm:h-12 sm:w-12 sm:text-[9px]">
        {product.discount}
        <span className="ml-[1px]">OFF</span>
      </div>

      {/* Product Area */}
      <div className="rounded-[18px] bg-white/80 p-1.5 shadow-lg backdrop-blur-sm sm:rounded-[22px] sm:p-2">

        {/* Product Image */}
        <div
          className={`relative flex items-center justify-center overflow-hidden rounded-[14px] bg-gradient-to-br from-white to-slate-100 ${imageClass}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 30vw, 400px"
            className="object-contain p-3 sm:p-5"
          />
        </div>

        {/* Product Details */}
        <div className="px-1 pb-1 pt-1.5 sm:px-2 sm:pb-2 sm:pt-2">

          <p className="truncate text-[8px] font-bold text-slate-800 sm:text-[10px] md:text-xs">
            {product.name}
          </p>

          <div className="mt-0.5 flex items-center gap-1 sm:mt-1 sm:gap-2">
            <span className="text-[10px] font-black text-[#fd5700] sm:text-xs md:text-sm">
              {product.price}
            </span>

            <span className="text-[7px] text-slate-400 line-through sm:text-[9px]">
              {product.oldPrice}
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}



  //  TRUST ITEM


function TrustItem({
  type,
  title,
  subtitle,
}: {
  type: "shield" | "support" | "heart";
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex min-w-0 items-center justify-center gap-1.5 border-r border-white/10 px-1.5 py-3 last:border-r-0 sm:gap-3 sm:px-4 sm:py-4">

      {/* Icon */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center sm:h-9 sm:w-9">

        {type === "shield" && (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-green-400 sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        )}

        {type === "support" && (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-green-400 sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
            <path d="M4 13h3v5H5a1 1 0 0 1-1-1z" />
            <path d="M20 13h-3v5h2a1 1 0 0 1 1-1z" />
            <path d="M17 18c-1 2-3 3-5 3" />
          </svg>
        )}

        {type === "heart" && (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-green-400 sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M20.8 8.7c0 5-8.8 10.3-8.8 10.3S3.2 13.7 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3z" />
          </svg>
        )}

      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="truncate text-[7px] font-bold sm:text-[10px] md:text-xs">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[6px] text-white/60 sm:text-[8px] md:text-[9px]">
          {subtitle}
        </p>
      </div>

    </div>
  );
}