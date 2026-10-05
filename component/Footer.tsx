import Image from "next/image";
import Link from "next/link";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { GrGithub } from "react-icons/gr";
import { SiX } from "react-icons/si";
import { 
  TbShoppingBag, 
  TbMail, 
  TbPhone, 
  TbMapPin, 
  TbBrandFacebook, 
  TbBrandInstagram, 
  TbBrandTwitter, 
  TbBrandGithub 
} from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Top Banner / Newsletter Section */}
      <div className="border-b border-slate-800 bg-slate-950/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                Join Our Newsletter
              </h3>
              <p className="text-xs text-slate-400 sm:text-sm">
                Get the latest updates, deals, and exclusive offers straight to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl bg-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none ring-1 ring-slate-700 transition focus:ring-2 focus:ring-[#fd5700] sm:text-sm"
              />
              <button className="shrink-0 rounded-xl bg-[#fd5700] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#e04d00] sm:text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className=" flex shrink-0 items-center">
            <Link href="/" className=" flex items-center justify-center">
              <Image
                src="/images/ShopvibeSmartShopping.png"
                alt="Shopvibe"
                width={160}
                height={50}
                priority
              />
            </Link>
          </div>
            <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
              Your ultimate destination for premium gadgets, smartwatches, earbuds, and accessories at the best prices.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Twitter"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Twitter"
              >
                <GrGithub className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="transition hover:text-[#fd5700]">Home</Link>
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-[#fd5700]">Shop Products</Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-[#fd5700]">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-[#fd5700]">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-[#fd5700]">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/shop" className="transition hover:text-[#fd5700]">Wireless Earbuds</Link>
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-[#fd5700]">Smart Watches</Link>
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-[#fd5700]">Headphones</Link>
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-[#fd5700]">Power Banks</Link>
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-[#fd5700]">Wireless Speakers</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <TbMapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5700]" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <TbPhone className="h-5 w-5 shrink-0 text-[#fd5700]" />
                <span>+090-000000</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <TbMail className="h-5 w-5 shrink-0 text-[#fd5700]" />
                <span>support@shopvibe.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Payments */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-slate-500 sm:px-6 md:flex-row md:text-left lg:px-10">
          <p>© {new Date().getFullYear()} ShopVibe. All rights reserved.</p>

           {/* Developer Credit / Link */}
          <p className="text-gray-400">
             Developed by{' '}
            <a
              href="https://rashedujjaman.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 font-semibold hover:text-amber-700 transition-colors"
            >
              Rashedujjaman
            </a>
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Secure Payments</span>
            <div className="flex gap-2 text-xs font-bold text-slate-300">
              <span className="rounded bg-slate-800 px-2 py-1">American Express</span>
              <span className="rounded bg-slate-800 px-2 py-1">Paypal</span>
              <span className="rounded bg-slate-800 px-2 py-1">Visa</span>
              <span className="rounded bg-slate-800 px-2 py-1">Mastercard</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}