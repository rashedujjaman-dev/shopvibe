"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("shopvibe_cookie_consent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("shopvibe_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("shopvibe_cookie_consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-gray-100 text-gray-800 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-[#fd5700]">
            <Cookie className="w-5 h-5 shrink-0" />
            <h3 className="text-base font-bold text-gray-900">
              We Value Your Privacy
            </h3>
          </div>
          <button
            onClick={handleDecline}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 leading-relaxed">
          We use cookies to enhance your browsing experience, serve personalized
          contents, and analyze our traffic. By clicking &quot;Accept All&quot;,
          you consent to our use of cookies. Read our{" "}
          <Link
            href="/privacy"
            className="text-[#fd5700] underline font-medium hover:opacity-80"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 bg-[#fd5700] hover:bg-[#e04d00] text-white font-medium py-2 px-4 rounded-xl text-xs transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl text-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};
