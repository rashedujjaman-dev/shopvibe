"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";
import Image from "next/image";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-xs text-gray-400">Loading...</div>;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#fd5700] hover:bg-[#e04d00] text-white text-sm font-medium rounded-xl transition-all shadow-sm"
      >
        <User className="w-4 h-4" />
        <span>Sign In</span>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* User Profile Image or Initial Avatar */}
      {session.user?.image ? (
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 shadow-sm shrink-0">
          <Image
            src={session.user.image}
            alt={session.user?.name || "User"}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-9 h-9 rounded-full bg-[#fd5700] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
          {session.user?.name ? session.user.name[0].toUpperCase() : "U"}
        </div>
      )}

      {/* Username and Logout stacked vertically */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800 leading-tight">
          {session.user?.name}
        </span>
        
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-all mt-0.5 cursor-pointer text-left"
          title="Logout"
        >
          <LogOut className="w-3 h-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}