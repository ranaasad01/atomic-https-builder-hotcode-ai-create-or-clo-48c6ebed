"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Check, ArrowRight, MessageCircle } from 'lucide-react';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { motion, type Variants } from "framer-motion";

const FAQ_ITEMS = [
  {
    q: "What are credits and how do they work?",
    a: "Credits are the currency used to generate websites on Builder. Each generation uses one credit. Credits never expire, so you can use them at your own pace. Free accounts receive 50 credits to get started with no credit card required.",
  },
  {
    q: "Can I export the generated code?",
    a: "Yes. Every plan includes full code export. You get clean, typed TypeScript built on Next.js 14 App Router. You can download the source, open it in any editor, and deploy it anywhere — Vercel, Netlify, your own server, or anywhere else.",
  },
  {
    q: "What tech stack does Builder use?",
    a: "Builder generates production-ready Next.js 14 App Router projects with TypeScript, Tailwind CSS, and lucide-react icons. Server components, API routes, and optimised images are included out of the box. The output is clean, idiomatic code you can extend freely.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The Free plan gives you 50 generation credits with no credit card required. You get live preview, full code export, and community support. It is a great way to explore Builder before committing to a paid pack.",
  },
  {
    q: "Do credits expire?",
    a: "No. Credits never expire. Whether you buy the Starter, Pro, or Studio pack, your credits stay in your account until you use them. There is no monthly reset or expiry date.",
  },
  {
    q: "Can I push generated code directly to GitHub?",
    a: "Yes, on the Starter plan and above you can push your generated project directly to a GitHub repository with one click. This makes it easy to continue development in your own workflow immediately after generation.",
  },
  {
    q: "How long does it take to generate a website?",
    a: "Most websites are generated in under 60 seconds. The AI builds a complete, responsive, multi-page site with real copy and production code in that time. Complex projects with many pages or custom features may take slightly longer.",
  },
  {
    q: "What kind of websites can I build?",
    a: "Builder can generate landing pages, SaaS dashboards, portfolio sites, e-commerce storefronts, marketing sites, documentation sites, and more. Describe your vision in plain English and the AI handles the rest — layout, copy, components, and styling.",
  },
  {
    q: "Can I edit the generated site after it is created?",
    a: "Absolutely. The generated code is yours to modify. You can open it in VS Code or any editor, change components, update copy, add new pages, or integrate third-party APIs. The code is clean and well-structured to make editing straightforward.",
  },
  {
    q: "What support options are available?",
    a: "Free users have access to community support via our Discord. Starter plan users get email support. Pro and Studio users get priority email support with faster response times. All plans have access to our documentation and changelog.",
  },
  {
    q: "Is the generated code production-ready?",
    a: "Yes. Builder outputs fully typed TypeScript with proper component structure, semantic HTML, accessible markup, responsive Tailwind CSS, and optimised images. The code follows Next.js best practices and is ready to deploy without modification.",
  },
  {
    q: "Can I use a custom domain?",
    a: "Pro and Studio plans include custom domain hints to help you configure your deployment. You can deploy to any hosting provider that supports Next.js and point your own domain to it. Builder does not host sites directly.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function AccordionItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: { q: string; a: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "border border-gray-200 rounded-xl overflow-hidden transition-all duration-200",
        open ? "bg-white shadow-[0_2px_12px_rgba(109,40,217,0.08)]" : "bg-white/70 hover:bg-white"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-xl"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
          {item.q}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-violet-500 flex-shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {item.a}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FaqPage() {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-12 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 bg-white text-violet-700 text-xs font-medium mb-6 shadow-sm">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            {t("faq.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight text-balance mb-4">
            {t("faq.heading")}
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed text-pretty">
            {t("faq.subtitle")}
          </p>
        </section>
      </Reveal>

      {/* Accordion */}
      <section className="px-4 pb-20 max-w-3xl mx-auto">
        <motion.div
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>
      </section>

      {/* Contact CTA Strip */}
      <Reveal>
        <section className="px-4 pb-24">
          <div className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 p-10 text-center shadow-[0_8px_40px_rgba(109,40,217,0.25)]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-xs font-medium mb-5">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {t("faq.cta.badge")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              {t("faq.cta.heading")}
            </h2>
            <p className="text-white/75 text-sm sm:text-base max-w-md mx-auto mb-7 leading-relaxed">
              {t("faq.cta.subtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-600"
            >
              {t("faq.cta.button")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}