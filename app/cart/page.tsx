"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from "react-icons/fi";

export default function AddToCartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  const shipping = 0.0;
  const total = subtotal + shipping;


// Logic for calculating subtotals and quantities by category
  const categorySummary = cart.reduce((acc, item) => {
    const currentPrice = item.discountPrice ?? item.price;
    const itemTotal = currentPrice * item.quantity;
    const category = item.category || "Uncategorized";

    if (!acc[category]) {
      acc[category] = { amount: 0, quantity: 0 };
    }
    acc[category].amount += itemTotal;
    acc[category].quantity += item.quantity;
    return acc;
  }, {} as Record<string, { amount: number; quantity: number }>);

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-[#fd5700]">
          <FiShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
        <p className="mt-2 text-sm text-gray-500">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#fd5700] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-500 active:scale-95 cursor-pointer"
        >
          <FiArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/*LEFT: Cart Items (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-100 bg-white shadow-sm">
            {cart.map((item) => {
              const currentPrice = item.discountPrice ?? item.price;
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  {/* Image & Information */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/product/${item.id}`}
                        className="font-semibold text-gray-900 transition-colors hover:text-[#fd5700]"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">
                        Category: <span className="font-medium text-gray-700">{item.category}</span>
                      </p>
                      <div className="mt-1 text-sm font-bold text-[#fd5700] sm:hidden">
                        $ {currentPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Controls & Delete */}
                  <div className="flex items-center justify-between sm:gap-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.id, "decrease")}
                        className="p-2 text-gray-600 transition-colors hover:text-[#fd5700] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, "increase")}
                        className="p-2 text-gray-600 transition-colors hover:text-[#fd5700] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Total Price Per Item */}
                    <div className="hidden text-right sm:block">
                      <span className="text-base font-bold text-gray-900">
                        $ {(currentPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-500 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#fd5700] transition-colors hover:underline"
            >
              <FiArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/*RIGHT: Order Summary (4 Cols)*/}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
              Order Summary
            </h2>

            {/*  Category-wise Quantity & Subtotal*/}
            <div className="space-y-2 border-b border-gray-200 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Category Subtotals
              </span>
              {Object.entries(categorySummary).map(([category, { amount, quantity }]) => (
                <div key={category} className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-1.5 capitalize">
                    <span>{category}</span>
                    <span className="text-xs font-medium text-gray-500 bg-gray-200/60 px-2 py-0.5 rounded-full">
                      x{quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-800">$ {amount.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/*Overall Subtotal, Shipping & Final Total */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Overall Subtotal</span>
                <span className="font-semibold text-gray-900">$ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600 items-center">
                <span>Estimated Shipping</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs tracking-wide uppercase">
                  Free
                </span>
              </div>


              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total Amount</span>
                <span className="text-xl font-extrabold text-[#fd5700]">
                  $ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="mt-4 w-full rounded-xl bg-[#fd5700] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-500 active:scale-95 cursor-pointer">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}