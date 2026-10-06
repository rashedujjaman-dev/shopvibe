"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 bg-[#fd5700] text-white rounded-xl text-sm font-medium hover:bg-[#e04d00] transition-colors"
      >
        Login
      </Link>
    );
  }

  const userImage = session.user.image;
  const userName = session.user.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {/* ইউজার ছবি বা ইনিশিয়াল আভাটার */}
      <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shadow-sm flex-shrink-0 bg-gray-100 flex items-center justify-center">
        {userImage ? (
          <img
            src={userImage}
            alt={userName}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-sm font-bold text-[#fd5700]">
            {userInitial}
          </span>
        )}
      </div>

      {/* ইউজারের নাম (বড় স্ক্রিনে দেখাবে) */}
      <div className="hidden sm:flex flex-col">
        <span className="text-sm font-semibold text-gray-800 leading-none">
          {userName}
        </span>
        <span className="text-xs text-gray-500 truncate max-w-[120px]">
          {session.user.email}
        </span>
      </div>

      {/* সাইন আউট বাটন */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}