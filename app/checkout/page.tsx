"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import {
  FiCheckCircle,
  FiArrowRight,
  FiBox,
  FiClock,
  FiTruck,
} from "react-icons/fi";
import { TbShoppingBagPlus } from "react-icons/tb";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cod",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Safe subtotal calculation
  const subtotal =
    cart?.reduce(
      (total, item) =>
        total + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0,
    ) || 0;

  const shipping = 0.0;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // If Online Payment (Stripe) is selected
    if (formData.paymentMethod === "online") {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart,
            customerDetails: {
              firstName: formData.fullName,
              lastName: "",
              email: formData.email,
              phone: formData.phone,
              address: `${formData.address}, ${formData.city}`,
            },
          }),
        });

        const data = await response.json();
        setLoading(false);

        if (data.url) {
          window.location.href = data.url;
        } else {
          alert(data.error || "Something went wrong with Stripe checkout.");
        }
      } catch (error) {
        setLoading(false);
        console.error("Checkout error:", error);
        alert("Failed to connect to payment gateway.");
      }
      return;
    }

    // Cash on Delivery flow
    setLoading(false);
    // Unique order id
    const generatedId = `SV-COD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
    clearCart();
  };

  if (!isMounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#fd5700] border-t-transparent"></div>
      </div>
    );
  }

  // Cash on Delivery Success View
  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 sm:p-10 shadow-xl shadow-emerald-500/5 text-center">
          {/* Animated Success Badge */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 animate-bounce">
            <FiCheckCircle className="h-12 w-12" />
          </div>

          <span className="inline-block rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-700">
            Order Placed Successfully (COD)
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Thank You for Your Order!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            We have received your order. You can pay with Cash on Delivery when
            your package arrives. A confirmation details has been sent to your
            phone/email.
          </p>

          {/* Order Reference Badge */}
          {orderId && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-50 border border-gray-100 px-4 py-2 text-xs font-medium text-gray-500">
              <span>Order ID:</span>
              <span className="font-mono font-bold text-gray-800 truncate max-w-50">
                {orderId}
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
                <p className="text-xs font-semibold text-gray-900">
                  Order Placed
                </p>
                <p className="text-[11px] text-gray-500">
                  Items preparing for shipment
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-gray-50/80 p-4 border border-gray-100">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <FiClock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">
                  Fast Delivery
                </p>
                <p className="text-[11px] text-gray-500">
                  Estimated within 2-4 days
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-gray-50/80 p-4 border border-gray-100">
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                <FiTruck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">
                  Cash on Delivery
                </p>
                <p className="text-[11px] text-gray-500">
                  Pay when you receive
                </p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#fd5700] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Shipping & Payment Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fd5700] focus:bg-white text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fd5700] focus:bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fd5700] focus:bg-white text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no, Road no, Area"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fd5700] focus:bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fd5700] focus:bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fd5700] focus:bg-white text-gray-900 cursor-pointer"
                >
                  <option value="cod">Cash on Delivery (COD)</option>
                  <option value="online">Online Payment (Stripe)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#fd5700] hover:bg-[#e04d00] text-white font-medium py-3 rounded-xl text-sm transition-all shadow-md active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              <div className="max-h-60 overflow-y-auto space-y-3">
                {cart.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Your cart is empty
                  </p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <Image
                          src={item.image || "/images/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-800 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span className="text-[#fd5700]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-gray-100/60 p-5 rounded-2xl flex items-center gap-4 text-gray-600 text-xs">
              <ShieldCheck className="w-8 h-8 text-[#fd5700] shrink-0" />
              <span>100% Secure Checkout and guaranteed quality products.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
