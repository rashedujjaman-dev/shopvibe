import Link from "next/link";
import { 
  TbShieldCheck, 
  TbLock, 
  TbCookie, 
  TbUserCheck, 
  TbRefresh, 
  TbMail 
} from "react-icons/tb";

export default function PrivacyPage() {
  const lastUpdated = "October 2026";

  const sections = [
    {
      id: "information-collection",
      icon: TbUserCheck,
      title: "1. Information We Collect",
      content:
        "We collect personal details that you voluntarily provide to us when registering on ShopVibe, placing an order, or reaching out to customer support. This includes your name, phone number, email address, shipping address, and payment information.",
    },
    {
      id: "information-use",
      icon: TbShieldCheck,
      title: "2. How We Use Your Information",
      content:
        "Your data allows us to fulfill orders, process payments, deliver items to your address, provide customer support, and notify you about order updates or promotional deals. We never sell or rent your personal information to third parties.",
    },
    {
      id: "cookies-tracking",
      icon: TbCookie,
      title: "3. Cookies & Tracking Technologies",
      content:
        "ShopVibe uses cookies and similar session tracking technologies to enhance your shopping experience, remember items in your cart, and analyze web traffic. You can adjust your browser settings to decline cookies at any time.",
    },
    {
      id: "data-security",
      icon: TbLock,
      title: "4. Data Security",
      content:
        "We implement robust administrative, technical, and physical security measures to safeguard your personal data. All online transactions are processed through encrypted, secure payment gateways (bKash, Nagad, Cards).",
    },
    {
      id: "policy-updates",
      icon: TbRefresh,
      title: "5. Policy Updates",
      content:
        "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. Any updates will be posted on this page with a revised 'Last Updated' date.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center sm:mb-16">
          <span className="inline-block rounded-full bg-[#fd5700]/10 px-4 py-1.5 text-xs font-bold text-[#fd5700]">
            Legal & Trust
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xs text-slate-600 sm:text-base">
            At ShopVibe, we take your privacy seriously. Learn how we handle and protect your personal information.
          </p>
          <p className="mt-3 text-[11px] font-semibold text-slate-400">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                id={sec.id}
                className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 sm:p-8 transition hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fd5700]/10 text-[#fd5700]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 sm:text-xl">
                    {sec.title}
                  </h2>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {sec.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Note / Help Footer */}
        <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-center text-white shadow-xl sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd5700]/20 text-[#fd5700]">
            <TbMail className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-xl font-bold">Have Questions About Our Policy?</h3>
          <p className="mx-auto mt-2 max-w-lg text-xs text-slate-300 sm:text-sm">
            If you have any questions or concerns regarding how your personal information is managed, please feel free to reach out to us.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#fd5700] px-6 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-[#e04d00] sm:text-sm"
            >
              Contact Support
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}