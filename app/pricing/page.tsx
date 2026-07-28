"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, ArrowRight, Sparkles, CreditCard, Zap } from 'lucide-react';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
type pricingTiers = any;
const pricingTiers: any = [];
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const COMPARISON_FEATURES = [
  { label: "Generation credits", free: "50 / month", starter: "100", pro: "250", studio: "500" },
  { label: "Live preview", free: true, starter: true, pro: true, studio: true },
  { label: "Code export", free: true, starter: true, pro: true, studio: true },
  { label: "GitHub push", free: false, starter: true, pro: true, studio: true },
  { label: "Email support", free: false, starter: true, pro: true, studio: true },
  { label: "Priority support", free: false, starter: false, pro: true, studio: true },
  { label: "Custom domain hints", free: false, starter: false, pro: true, studio: true },
  { label: "Early feature access", free: false, starter: false, pro: false, studio: true },
  { label: "Credits never expire", free: false, starter: true, pro: true, studio: true },
];

const PRICING_FAQS = [
  {
    q: "Do credits expire?",
    a: "Paid credits never expire. Free plan credits reset monthly so you always have a fresh allocation to experiment with.",
  },
  {
    q: "What counts as one credit?",
    a: "Each AI generation request uses one credit. Editing, previewing, and downloading your project are always free and never consume credits.",
  },
  {
    q: "Can I buy more credits after I run out?",
    a: "Yes. You can top up with any credit pack at any time. Packs stack, so your remaining credits carry over when you add more.",
  },
  {
    q: "Is there a subscription or recurring charge?",
    a: "No. Every paid pack is a one-time purchase. You pay once, get your credits, and use them at your own pace. No surprises on your card.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept all major credit and debit cards via Stripe. Apple Pay and Google Pay are also supported where available.",
  },
  {
    q: "Can I get a refund?",
    a: "If you have not used any credits from a pack, contact us within 7 days of purchase and we will issue a full refund.",
  },
];

const TIER_ICONS: Record<string, React.ReactNode> = {
  free: <Sparkles className="h-5 w-5 text-emerald-600" />,
  starter: <CreditCard className="h-5 w-5 text-violet-600" />,
  pro: <Zap className="h-5 w-5 text-purple-600" />,
  studio: <Zap className="h-5 w-5 text-orange-600" />,
};

const TIER_ICON_BG: Record<string, string> = {
  free: "bg-emerald-100",
  starter: "bg-violet-100",
  pro: "bg-purple-100",
  studio: "bg-orange-100",
};

const TIER_ACCENT: Record<string, string> = {
  free: "text-emerald-600",
  starter: "text-violet-600",
  pro: "text-purple-600",
  studio: "text-orange-600",
};

const TIER_CREDIT_BG: Record<string, string> = {
  free: "bg-emerald-100 text-emerald-700",
  starter: "bg-violet-100 text-violet-700",
  pro: "bg-purple-100 text-purple-700",
  studio: "bg-orange-100 text-orange-700",
};

const TIER_BTN: Record<string, string> = {
  free: "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50",
  starter: "bg-violet-600 text-white hover:bg-violet-700",
  pro: "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50",
  studio: "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50",
};

function CheckCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-gray-700 font-medium">{value}</span>;
  }
  if (value) {
    return <Check className="h-4 w-4 text-violet-600 mx-auto" />;
  }
  return <span className="text-gray-300 text-lg leading-none">—</span>;
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      {PRICING_FAQS.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900 text-sm">{item.q}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4",
                open === i && "rotate-180"
              )}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-12 text-center px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-1.5 text-xs text-violet-700 font-medium mb-6 shadow-sm">
            <CreditCard className="h-3.5 w-3.5" />
            {t("pricing.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-balance mb-4">
            {t("pricing.hero.title")}
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            {t("pricing.hero.subtitle")}
          </p>
        </section>
      </Reveal>

      {/* Pricing Cards */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 pb-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.key}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={cn(
                  "relative rounded-2xl border-2 p-5 flex flex-col bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.08)]",
                  tier.isPopular
                    ? "border-violet-400 ring-2 ring-violet-200"
                    : "border-gray-200"
                )}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-violet-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", TIER_ICON_BG[tier.key])}>
                  {TIER_ICONS[tier.key]}
                </div>

                {/* Credits label */}
                <p className="text-sm font-semibold text-gray-700 mb-1">{tier.credits} credits</p>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-sm text-gray-400">{tier.priceNote}</span>
                </div>

                {/* Credit pill */}
                <div className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold mb-4 self-start", TIER_CREDIT_BG[tier.key])}>
                  <span>{tier.credits} credits</span>
                  {tier.perCredit && (
                    <>
                      <span className="opacity-50">·</span>
                      <span className="font-normal opacity-80">{tier.perCredit}</span>
                    </>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className={cn("h-3.5 w-3.5 mt-0.5 flex-shrink-0", TIER_ACCENT[tier.key])} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/generate"
                  className={cn(
                    "block w-full text-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200",
                    TIER_BTN[tier.key]
                  )}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-6">
            <Link
              href="/pricing"
              className="text-sm text-violet-600 hover:text-violet-800 underline underline-offset-2 transition-colors"
            >
              {t("pricing.viewAll")}
            </Link>
          </div>
        </section>
      </Reveal>

      {/* Feature Comparison Table */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              {t("pricing.comparison.title")}
            </h2>
            <p className="text-gray-500 text-sm">{t("pricing.comparison.subtitle")}</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-gray-500 font-medium w-1/3">{t("pricing.comparison.feature")}</th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.key} className="px-4 py-4 text-center">
                      <span className={cn("font-bold text-sm", TIER_ACCENT[tier.key])}>{tier.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn("border-b border-gray-50 last:border-0", i % 2 === 0 ? "bg-white" : "bg-gray-50/50")}
                  >
                    <td className="px-6 py-3.5 text-gray-700 font-medium">{row.label}</td>
                    <td className="px-4 py-3.5 text-center"><CheckCell value={row.free} /></td>
                    <td className="px-4 py-3.5 text-center"><CheckCell value={row.starter} /></td>
                    <td className="px-4 py-3.5 text-center"><CheckCell value={row.pro} /></td>
                    <td className="px-4 py-3.5 text-center"><CheckCell value={row.studio} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* FAQ Section */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 font-medium mb-3">
                  <Check className="h-3 w-3" />
                  {t("pricing.faq.badge")}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                  {t("pricing.faq.title")}
                </h2>
                <p className="text-sm text-gray-500">{t("pricing.faq.subtitle")}</p>
              </div>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors flex-shrink-0"
              >
                {t("pricing.faq.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <FaqAccordion />
          </div>
        </section>
      </Reveal>

      {/* CTA Banner */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 px-8 py-16 text-center">
            {/* Decorative dots */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              {[
                { top: "10%", left: "5%", size: 4 },
                { top: "20%", left: "15%", size: 3 },
                { top: "70%", left: "8%", size: 5 },
                { top: "85%", left: "20%", size: 3 },
                { top: "15%", right: "10%", size: 4 },
                { top: "40%", right: "5%", size: 3 },
                { top: "75%", right: "12%", size: 5 },
                { top: "90%", right: "25%", size: 3 },
              ].map((dot, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    top: dot.top,
                    left: "left" in dot ? dot.left : undefined,
                    right: "right" in dot ? dot.right : undefined,
                    width: dot.size,
                    height: dot.size,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white/90 font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                {t("pricing.cta.badge")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 text-balance">
                {t("pricing.cta.title")}
              </h2>
              <p className="text-white/70 text-base max-w-md mx-auto mb-8 text-pretty leading-relaxed">
                {t("pricing.cta.subtitle")}
              </p>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors shadow-lg"
              >
                {t("pricing.cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}