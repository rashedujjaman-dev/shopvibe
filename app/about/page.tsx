import Image from "next/image";
import Link from "next/link";
import {
  TbTruckDelivery,
  TbShieldCheck,
  TbHeadset,
  TbAward,
  TbArrowRight,
  TbShoppingBagPlus,
} from "react-icons/tb";

export default function AboutPage() {
  const features = [
    {
      icon: TbTruckDelivery,
      title: "Fast & Free Shipping",
      description: "Quick delivery across the country with secure packaging.",
    },
    {
      icon: TbShieldCheck,
      title: "100% Secure Payment",
      description:
        "Multiple payment options including American Express, Paypal, Visa and Mastercard.",
    },
    {
      icon: TbAward,
      title: "Official Warranty",
      description:
        "Get original products with reliable brand warranty support.",
    },
    {
      icon: TbHeadset,
      title: "24/7 Dedicated Support",
      description:
        "Our support team is always ready to assist you with any query.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "500+", label: "Original Products" },
    { value: "99%", label: "Positive Ratings" },
    { value: "24/7", label: "Customer Support" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* 1. Hero / Header Section */}
        <section className="mb-12 text-center sm:mb-20">
          <span className="inline-block rounded-full bg-[#fd5700]/10 px-4 py-1.5 text-xs font-bold text-[#fd5700]">
            About ShopVibe
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Redefining Your Tech Shopping Experience
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xs text-slate-600 sm:text-base">
            We deliver top-quality tech accessories, gadgets, smartwatches, and
            audio gear to empower your everyday digital lifestyle.
          </p>
        </section>

        {/* 2. Story / Mission Section */}
        <section className="mb-16 grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          <div className="relative  w-full overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
            <Image
              src="/images/AboutPic.png"
              alt="Shop Banner"
              width={1200}
              height={800}
              priority
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Who We Are & What Drives Us
            </h2>
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
              At <span className="font-bold text-slate-900">ShopVibe</span>, we
              believe that authentic technology should be accessible to
              everyone. Starting with a mission to eliminate fake products from
              the market, we curated a line-up of trusted brands and
              high-quality accessories.
            </p>
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
              Whether you are looking for crystal-clear earbuds, durable power
              banks, or feature-packed smartwatches, we test every product to
              ensure it meets our strict quality standards before it reaches
              your hands.
            </p>

            {/* Quick Button */}
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-[#fd5700] px-6 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-[#e04d00] sm:text-sm"
              >
                <TbShoppingBagPlus className=" h-5 w-5" />
                <span>Explore Our Shop</span>
                <TbArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Stats Section */}
        <section className="mb-16 rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-xl sm:px-12 sm:py-14">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <h4 className="text-3xl font-black text-[#fd5700] sm:text-4xl">
                  {stat.value}
                </h4>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Why Choose Us / Features Grid */}
        <section className="mb-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why Shop With ShopVibe?
            </h2>
            <p className="mt-2 text-xs text-slate-600 sm:text-sm">
              We prioritize customer satisfaction above everything else.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fd5700]/10 text-[#fd5700] transition group-hover:bg-[#fd5700] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
