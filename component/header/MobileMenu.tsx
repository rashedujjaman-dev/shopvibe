

// component/header/MobileMenu

import { NAV_ITEMS } from '@/constants/navigation';
import { User } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({isOpen, onClose}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className=' md:hidden border-t border-gray-200 bg-white/90 px-4 pt-2 pb-6 space-y-3 shadow-md'>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-[#fd5700] transition-colors"
        >
          {item.title}
        </Link>
      ))}

      <div className="pt-2 border-t border-gray-100">
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-[#fd5700] transition-colors"
        >
          <User className=' w-5 h-5'/>
          <span className='hover:text-[#fd5700]'>Login</span>
        </Link>
      </div>
    </div>
  );
}
