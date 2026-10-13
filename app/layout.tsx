import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/component/Footer";
import { Header } from "@/component/header/Header";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import Providers from "@/component/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopvibe E-commerce",
  description: "This application using Next.js, TypeScript, Tailwind CSS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // আপনার সেশন বা অথ সিস্টেম থেকে ইউজারের ডাইনামিক আইডি নিন।
  // যেমন: const session = await auth(); 
  // const currentUserId = session?.user?.id || null;
  
  // উদাহরণস্বরূপ, লগইন করা থাকলে ইউজারের আইডি এবং লগআউট থাকলে null হবে:
  const currentUserId = null; // এখানে আপনার সেশনের ডাইনামিক ইউজার আইডি বসবে

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <CartProvider userId={currentUserId}>
            <main className="flex-1 flex flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </main>
            <Toaster position="bottom-right" reverseOrder={false} />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}