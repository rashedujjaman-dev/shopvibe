"use client";

import { Search, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      router.push("/products");
      return;
    }

    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearch("");
  };

  return (
    <>
      {/* ================= DESKTOP / TABLET SEARCH ================= */}
      <form
        onSubmit={handleSubmit}
        className="
          hidden
          w-full
          max-w-[240px]
          md:block
          lg:max-w-[270px]
          xl:max-w-[300px]
        "
      >
        <div className="relative w-full">
          {!search && (
            <Search
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                z-10
                h-5
                w-5
                -translate-y-1/2
                text-gray-400
              "
            />
          )}

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className={`
              block
              h-11
              w-full
              appearance-none
              rounded-full
              border
              border-gray-200
              bg-white
              text-sm
              text-gray-700
              shadow-sm
              outline-none
              transition-all

              placeholder:text-gray-400

              hover:border-gray-300

              focus:border-[#fd5700]
              focus:ring-2
              focus:ring-[#fd5700]/10

              [&::-webkit-search-cancel-button]:appearance-none
              [&::-webkit-search-decoration]:appearance-none
              [&::-ms-clear]:hidden

              ${
                search
                  ? "pl-4 pr-10"
                  : "pl-11 pr-4"
              }
            `}
          />

          {search.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="
                absolute
                right-1.5
                top-1/2
                z-20
                flex
                h-8
                w-8
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                text-gray-400
                transition

                hover:bg-gray-100
                hover:text-gray-700

                active:scale-90
              "
            >
              <X className="h-[18px] w-[18px]" />
            </button>
          )}
        </div>
      </form>

      {/* ================= MOBILE SEARCH ICON ================= */}
      <button
        type="button"
        onClick={() => setIsMobileSearchOpen(true)}
        aria-label="Open search"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          text-gray-700
          transition

          hover:bg-gray-100
          active:scale-90

          md:hidden
        "
      >
        <Search className="h-5 w-5" />
      </button>

      {/* ================= MOBILE SEARCH BOX ================= */}
      {isMobileSearchOpen && (
        <div
          className="
            fixed
            left-0
            right-0
            top-[64px]
            z-40
            border-t
            border-gray-100
            bg-white
            px-4
            py-3
            shadow-md

            md:hidden
          "
        >
          <form onSubmit={handleSubmit}>
            <div className="relative w-full">

              {/* Search Icon */}
              <Search
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  z-10
                  h-5
                  w-5
                  -translate-y-1/2
                  text-gray-400
                "
              />

              {/* Search Input */}
              <input
                type="search"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="
                  block
                  h-11
                  w-full
                  appearance-none
                  rounded-full
                  border
                  border-gray-200
                  bg-gray-50
                  pl-10
                  pr-12
                  text-sm
                  text-gray-700
                  outline-none
                  transition

                  placeholder:text-gray-400

                  focus:border-[#fd5700]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#fd5700]/10

                  [&::-webkit-search-cancel-button]:appearance-none
                  [&::-webkit-search-decoration]:appearance-none
                  [&::-ms-clear]:hidden
                "
              />

              {/* CLOSE BUTTON */}
              <button
                type="button"
                onClick={closeMobileSearch}
                aria-label="Close search"
                className="
                  absolute
                  right-2
                  top-1/2
                  z-20
                  flex
                  h-8
                  w-8
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition

                  hover:bg-gray-200
                  hover:text-gray-700

                  active:scale-90
                "
              >
                <X className="h-[18px] w-[18px]" />
              </button>

            </div>
          </form>
        </div>
      )}
    </>
  );
};