"use client";

import { useState } from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { GrGithub } from "react-icons/gr";
import { SiX } from "react-icons/si";
import { TbMail, TbPhone, TbMapPin, TbClock, TbSend } from "react-icons/tb";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactCards = [
    {
      icon: TbPhone,
      title: "Call Us",
      details: "+090-000000",
      subDetails: "24/7",
    },
    {
      icon: TbMail,
      title: "Email Us",
      details: "support@shopvibe.com",
      subDetails: "Online support 24/7",
    },
    {
      icon: TbMapPin,
      title: "Visit Us",
      details: "Dhaka, Bangladesh",
      subDetails: "Main Outlet & HQ",
    },
    {
      icon: TbClock,
      title: "Working Hours",
      details: "Mon - Sat: 9:00 AM - 9:00 PM",
      subDetails: "Sunday: Closed",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header Section */}
        <div className="mb-12 text-center sm:mb-16">
          <span className="inline-block rounded-full bg-[#fd5700]/10 px-4 py-1.5 text-xs font-bold text-[#fd5700]">
            Get In Touch
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            We’d Love to Hear From You
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xs text-slate-600 sm:text-base">
            Have questions about a product, order status, or need help? Send us
            a message and our support team will respond quickly.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fd5700]/10 text-[#fd5700]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-700 sm:text-sm">
                    {card.details}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {card.subDetails}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form & Side Info Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left / Top: Contact Form */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 sm:p-10 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Send Us a Message
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Fill out the form below and we will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 sm:text-sm">
                    Your Name <span className="text-[#fd5700]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-900 outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-[#fd5700] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 sm:text-sm">
                    Email Address <span className="text-[#fd5700]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-900 outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-[#fd5700] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700 sm:text-sm">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Order Inquiry / Product Question"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-900 outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-[#fd5700] sm:text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700 sm:text-sm">
                  Your Message <span className="text-[#fd5700]">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-900 outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-[#fd5700] sm:text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd5700] py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#e04d00] sm:w-auto sm:px-8 sm:text-sm"
              >
                <TbSend className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Right / Bottom: Additional Details & Socials */}
          <div className="flex flex-col justify-between rounded-3xl bg-slate-900 p-6 text-white shadow-xl sm:p-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#fd5700]">
                Customer Support
              </span>
              <h3 className="mt-2 text-2xl font-bold">
                Need Instant Assistance?
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                Our support representatives are active every day. Feel free to
                chat with us directly via WhatsApp or follow our social channels
                for sales updates.
              </p>

              {/* Quick Contact Badge */}
              <div className="mt-8 rounded-2xl bg-slate-800/80 p-4 border border-slate-700/50">
                <p className="text-xs text-slate-400">Direct Hotline</p>
                <p className="mt-1 text-lg font-black text-gray-300">
                   +090-000000
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
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
          </div>
        </div>
      </div>
    </main>
  );
}
