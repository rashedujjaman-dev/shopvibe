"use client";

import { Search, X } from "lucide-react";
import { FormEvent, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sampleProducts } from "@/data/products";

export const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [openDropdown, setOpenDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const mobileWrapperRef = useRef<HTMLDivElement>(null);

  // Filter products locally as user types
  useEffect(() => {
    if (search.trim().length > 0) {
      const filtered = sampleProducts.filter(
        (item) =>
          item?.name.toLowerCase().includes(search.toLowerCase()) ||
          item?.category.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
      setOpenDropdown(true);
    } else {
      setFilteredProducts([]);
      setOpenDropdown(false);
    }
  }, [search]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        mobileWrapperRef.current &&
        !mobileWrapperRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = search.trim();
    setOpenDropdown(false);
    setIsMobileSearchOpen(false);

    if (!query) {
      router.push("/products");
      return;
    }
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredProducts([]);
    setOpenDropdown(false);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    clearSearch();
  };

  return (
    <>
      {/* ================= DESKTOP / TABLET SEARCH ================= */}
      <div ref={wrapperRef} className="hidden md:block relative w-full max-w-[240px] lg:max-w-[270px] xl:max-w-[300px]">
        <form onSubmit={handleSubmit} className="w-full relative">
          {!search && (
            <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
          )}

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className={`block h-11 w-full appearance-none rounded-full border border-gray-200 bg-white text-sm text-gray-700 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-[#fd5700] focus:ring-2 focus:ring-[#fd5700]/10 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-ms-clear]:hidden ${
              search ? "pl-4 pr-10" : "pl-11 pr-4"
            }`}
          />

          {search.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 active:scale-90 cursor-pointer"
            >
              <X className="h-[18px] w-[18px]" />
            </button>
          )}
        </form>

        {/* Desktop Live Dropdown */}
        {openDropdown && filteredProducts.length > 0 && (
          <div className="absolute left-0 top-14 w-full bg-white rounded-2xl overflow-y-auto max-h-96 shadow-xl border border-gray-100 z-50 p-2 space-y-1">
            {filteredProducts.map((item) => {
              const displayPrice = item.discountPrice ?? item.price;
              return (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`} 
                  onClick={() => {
                    setOpenDropdown(false);
                    setSearch("");
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded-lg border border-gray-100 shrink-0 bg-gray-50"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-semibold text-gray-800 truncate">{item.name}</span>
                    <span className="text-xs font-bold text-[#fd5700]">${displayPrice.toFixed(2)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= MOBILE SEARCH ICON ================= */}
      <button
        type="button"
        onClick={() => setIsMobileSearchOpen(true)}
        aria-label="Open search"
        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 active:scale-90 md:hidden cursor-pointer"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* ================= MOBILE SEARCH BOX ================= */}
      {isMobileSearchOpen && (
        <div ref={mobileWrapperRef} className="fixed left-0 right-0 top-[64px] z-40 border-t border-gray-100 bg-white px-4 py-3 shadow-md md:hidden">
          <form onSubmit={handleSubmit}>
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="block h-11 w-full appearance-none rounded-full border border-gray-200 bg-gray-50 pl-10 pr-12 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#fd5700] focus:bg-white focus:ring-2 focus:ring-[#fd5700]/10"
              />

              <button
                type="button"
                onClick={closeMobileSearch}
                aria-label="Close search"
                className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 active:scale-90 cursor-pointer"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </div>
          </form>

          {/* Mobile Live Dropdown */}
          {openDropdown && filteredProducts.length > 0 && (
            <div className="mt-2 w-full bg-white rounded-xl overflow-y-auto max-h-80 shadow-lg border border-gray-100 p-2 space-y-1">
              {filteredProducts.map((item) => {
                const displayPrice = item.discountPrice ?? item.price;
                return (
                  <Link
                    key={item.id}
                    href={`/product/${item.id}`}
                    onClick={() => {
                      setOpenDropdown(false);
                      setIsMobileSearchOpen(false);
                      setSearch("");
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-9 h-9 object-cover rounded-md border border-gray-100 shrink-0 bg-gray-50"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gray-800 truncate">{item.name}</span>
                      <span className="text-xs font-bold text-[#fd5700]">${displayPrice.toFixed(2)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};