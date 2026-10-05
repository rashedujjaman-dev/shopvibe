"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  FiCheckCircle,
  FiArrowRight,
  FiBox,
  FiClock,
  FiShield,
} from "react-icons/fi";
import { TbShoppingBagPlus } from "react-icons/tb";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  // The cart will automatically empty once the page loads.
  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
    }
  }, [clearCart, cleared]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Success Card */}
      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 sm:p-10 shadow-xl shadow-emerald-500/5 text-center">
        {/* Animated Success Badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 animate-bounce">
          <FiCheckCircle className="h-12 w-12" />
        </div>

        <span className="inline-block rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-700">
          Payment Successful
        </span>

        <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Thank You for Your Order!
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          We have received your payment and your order is currently being processed. A confirmation email with details has been sent to you.
        </p>

        {/* Order Reference Badge */}
        {sessionId && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-50 border border-gray-100 px-4 py-2 text-xs font-medium text-gray-500">
            <span>Order ID:</span>
            <span className="font-mono font-bold text-gray-800 truncate max-w-[200px]">
              {sessionId}
            </span>
          </div>
        )}

        {/* Highlights */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left">
          <div className="flex items-start gap-3 rounded-2xl bg-gray-50/80 p-4 border border-gray-100">
            <div className="rounded-lg bg-orange-100 p-2 text-[#fd5700]">
              <FiBox className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Order Placed</p>
              <p className="text-[11px] text-gray-500">Items preparing for shipment</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-gray-50/80 p-4 border border-gray-100">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <FiClock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Fast Delivery</p>
              <p className="text-[11px] text-gray-500">Estimated within 2-4 days</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-gray-50/80 p-4 border border-gray-100">
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">100% Protected</p>
              <p className="text-[11px] text-gray-500">Verified Stripe Transaction</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#fd5700] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#fd5700]/25 hover:bg-orange-600 transition-all cursor-pointer active:scale-95"
          >
            <TbShoppingBagPlus className="h-4 w-4" /> Continue Shopping
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
          >
            Go to Homepage <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#fd5700] border-t-transparent"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}