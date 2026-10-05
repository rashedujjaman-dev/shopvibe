"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiArrowLeft, FiCreditCard, FiLock } from "react-icons/fi";


export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          customerDetails: formData,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Payment initialization failed!");
      }
    } catch (err: any) {
      console.error("Payment submission error:", err);
      alert(err.message || "Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
        <p className="mt-2 text-sm text-gray-500">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#fd5700] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition-all cursor-pointer"
        >
          <FiArrowLeft className="h-4 w-4" /> Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#fd5700] transition-colors"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Checkout</h1>
      </div>

      <form onSubmit={handleStripePayment} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Shipping Form */}
        <div className="lg:col-span-7 space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
            Shipping Details
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700">First Name *</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#fd5700] focus:outline-none focus:ring-1 focus:ring-[#fd5700]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Last Name *</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#fd5700] focus:outline-none focus:ring-1 focus:ring-[#fd5700]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700">Address *</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street address, apartment, suite, etc."
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#fd5700] focus:outline-none focus:ring-1 focus:ring-[#fd5700]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700">Phone *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 234 567 890"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#fd5700] focus:outline-none focus:ring-1 focus:ring-[#fd5700]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#fd5700] focus:outline-none focus:ring-1 focus:ring-[#fd5700]"
              />
            </div>
          </div>
        </div>

        {/* Order Summary & Stripe Pay Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
              Order Summary
            </h2>

            {/* Cart Items List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 rounded-lg border border-gray-200 overflow-hidden bg-white">
                    <Image
                      src={item.image || "/images/placeholder.png"}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-900">
                    ${((item.discountPrice ?? item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="text-xl text-[#fd5700]">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#fd5700] py-3.5 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              <FiCreditCard className="h-4 w-4" />
              {loading ? "Redirecting to Stripe..." : "Pay"}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <FiLock className="h-3.5 w-3.5" />
              <span>Encrypted & 100% Secure Checkout with Stripe</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}