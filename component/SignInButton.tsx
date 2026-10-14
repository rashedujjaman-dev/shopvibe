"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { LiaUser } from "react-icons/lia";

const SingINButton = () => {
  const { data: session, status } = useSession();
  const [imageError, setImageError] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
        <div className="space-y-1">
          <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const userImage = session?.user?.image;
  const userName = session?.user?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <>
      {session?.user ? (
        <div
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2.5 text-sm cursor-pointer group select-none"
        >
          {/* profile image container*/}
          <div className="relative border border-gray-300 rounded-full w-10 h-10 overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center shadow-sm">
            {userImage && !imageError ? (
              <Image
                src={userImage}
                alt={userName}
                fill
                sizes="40px"
                className="object-cover rounded-full"
                onError={() => setImageError(true)}
                unoptimized 
              />
            ) : (
              <span className="text-sm font-bold text-[#fd5700]">
                {userInitial}
              </span>
            )}
          </div>

          {/* user info */}
          <div className="flex flex-col">
            <p className="text-xs text-gray-600 truncate max-w-[100px] sm:max-w-[140px] font-medium leading-tight">
              {userName}
            </p>
            <p className="font-semibold text-xs text-red-500 group-hover:underline leading-tight mt-0.5">
              Signout
            </p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="flex items-center gap-2 text-sm cursor-pointer group select-none"
        >
          <div className="border border-gray-300 p-1.5 rounded-full text-xl group-hover:border-[#fd5700] group-hover:text-[#fd5700] transition-colors">
            <LiaUser />
          </div>
          <div>
            <p className="text-xs text-gray-500">Hello, Guest</p>
            <p className="font-medium text-xs text-gray-800 group-hover:text-[#fd5700] transition-colors">
              Signin / Register
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SingINButton;