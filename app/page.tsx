"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Sparkles, ArrowRight, Check, ChevronLeft, ChevronRight, Code2, Eye, Layers, Download, Zap, Star } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type pricingTiers = any;
const pricingTiers: any = [];
import { cn } from "@/lib/utils";

// ─── Inline data ────────────────────────────────────────────────────────────

const STATS = [
  { value: "10K+", label: "Websites Generated" },
  { value: "< 60s", label: "Average Build Time" },
  { value: "100%", label: "Production Ready" },
  { value: "Free", label: "To Get Started" },
];

const FEATURES = [
  {
    key: "ai-powered",
    icon: Sparkles,
    title: "AI-Powered",
    desc: "Describe what you want and our AI builds it instantly",
    badge: "GPT-4o",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    badgeBg: "bg-violet-100 text-violet-700",
    decorColor: "text-violet-200",
    wide: true,
  },
  {
    key: "production-code",
    icon: Code2,
    title: "Production Code",
    desc: "Clean, typed, production-ready code output",
    badge: "TypeScript",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-100 text-blue-700",
    decorColor: "text-blue-200",
    wide: false,
  },
  {
    key: "live-preview",
    icon: Eye,
    title: "Live Preview",
    desc: "See your website come to life in real time",
    badge: "Instant",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-100 text-emerald-700",
    decorColor: "text-emerald-200",
    wide: false,
  },
  {
    key: "full-stack",
    icon: Layers,
    title: "Full Stack",
    desc: "Complete frontend with components and styling",
    badge: "Next.JS",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    badgeBg: "bg-orange-100 text-orange-700",
    decorColor: "text-orange-200",
    wide: false,
  },
  {
    key: "export-ready",
    icon: Download,
    title: "Export Ready",
    desc: "Download and deploy anywhere you want",
    badge: "One click",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    badgeBg: "bg-red-100 text-red-700",
    decorColor: "text-red-200",
    wide: true,
  },
  {
    key: "lightning-fast",
    icon: Zap,
    title: "Lightning Fast",
    desc: "Generate full websites in under a minute",
    badge: "< 60s",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    badgeBg: "bg-yellow-100 text-yellow-700",
    decorColor: "text-yellow-200",
    wide: false,
  },
];

const HOW_STEPS = [
  {
    num: "01",
    color: "bg-violet-500",
    title: "Describe your vision",
    desc: "Type what you want in plain English — brand, style, content, anything.",
  },
  {
    num: "02",
    color: "bg-blue-500",
    title: "AI generates your site",
    desc: "Our AI builds a complete, responsive website with real code in under a minute.",
  },
  {
    num: "03",
    color: "bg-emerald-500",
    title: "Export & deploy",
    desc: "Preview, edit, download the full source code, and deploy it anywhere.",
  },
];

const EXAMPLE_SLIDES = [
  {
    key: "slide1",
    images: [
      { src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/71bdb78bcbad4f2aa35a8344f7d99624.jpg", label: "Tesla Website", sub: "AI-generated Tesla website" },
      { src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/71bdb78bcbad4f2aa35a8344f7d99624.jpg", label: "Portfolio Website", sub: "AI-generated portfolio website" },
    ],
  },
  {
    key: "slide2",
    images: [
      { src: "https://s3-alpha.figma.com/hub/file/2219958310232930685/cacc76a6-e76b-4946-9b14-d5425e559779-cover.png", label: "E-Commerce Store", sub: "AI-generated shop website" },
      { src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c11fb8bd43a84c06b06de7d8b85995b0.jpg", label: "SaaS Landing Page", sub: "AI-generated SaaS site" },
    ],
  },
  {
    key: "slide3",
    images: [
      { src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/56efccbfb0ea422a94ff9d66e0bbb1e8.jpg", label: "Restaurant Website", sub: "AI-generated restaurant site" },
      { src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/9d35910c39af486ea01631dea8cb4f62.png", label: "Agency Website", sub: "AI-generated agency site" },
    ],
  },
];

const FAQS_HOME = [
  {
    q: "How does Builder work?",
    a: "Describe your website in plain English. Our AI reads your prompt, picks the right layout, writes clean TypeScript code, and renders a live preview — all in under 60 seconds.",
  },
  {
    q: "What kind of websites can I build?",
    a: "Landing pages, portfolios, SaaS sites, e-commerce stores, blogs, dashboards — if you can describe it, Builder can generate it.",
  },
  {
    q: "Do credits expire?",
    a: "No. Credits you purchase never expire. Free monthly credits reset each month, but paid credits stay in your account until you use them.",
  },
  {
    q: "Can I edit the generated code?",
    a: "Yes. Every site is exported as a standard Next.js project you can open in any editor, extend freely, and push to GitHub.",
  },
];

// ─── Animation variants ──────────────────────────────────────────────────────

const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Dot background ──────────────────────────────────────────────────────────

function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(139,92,246,0.18) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />
  );
}

// ─── Animated typewriter words ───────────────────────────────────────────────

const WORDS = ["seconds.", "minutes.", "one prompt."];

function TypewriterWord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="text-[var(--brand-violet)] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {WORDS[idx]}
    </span>
  );
}

// ─── Feature card ────────────────────────────────────────────────────────────

function FeatureCard({
  feature,
}: {
  feature: (typeof FEATURES)[number];
}) {
  const Icon = feature.icon;
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 8px 32px -8px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", feature.iconBg)}>
        <Icon className={cn("h-5 w-5", feature.iconColor)} aria-hidden="true" />
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
        <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <span className="text-gray-400 text-[11px]">
          {feature.key === "ai-powered" ? "Powered by" :
           feature.key === "production-code" ? "Always typed" :
           feature.key === "live-preview" ? "Rendering" :
           feature.key === "full-stack" ? "Built with" :
           feature.key === "export-ready" ? "Export" :
           "Build time"}
        </span>
        <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", feature.badgeBg)}>
          {feature.badge}
        </span>
      </div>
      {/* decorative icon */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-2 right-2 opacity-10",
          feature.decorColor,
        )}
      >
        <Icon className="h-20 w-20" />
      </div>
    </motion.div>
  );
}

// ─── Pricing card ────────────────────────────────────────────────────────────

function HomePricingCard({ tier }: { tier: (typeof pricingTiers)[number] }) {
  const isPopular = tier.isPopular;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]",
        isPopular
          ? "border-violet-400 bg-violet-50"
          : "border-black/[0.07] bg-white",
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-violet-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Most Popular
          </span>
        </div>
      )}
      <p className="text-xs text-gray-500 font-medium">{tier.credits} credits</p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
        <span className="text-xs text-gray-400">{tier.priceNote}</span>
      </div>
      {tier.perCredit ? (
        <div className="mt-1 flex items-center gap-2">
          <span className={cn("text-xs font-semibold", isPopular ? "text-violet-600" : "text-gray-700")}>
            {tier.credits} credits
          </span>
          <span className="text-[11px] text-gray-400">{tier.perCredit}</span>
        </div>
      ) : (
        <div className="mt-1">
          <span className="text-xs font-semibold text-emerald-600">50 credits / month</span>
        </div>
      )}
      <ul className="mt-4 space-y-1.5">
        {(tier.key === "free"
          ? ["No credit card required", "Live preview", "Renews every month"]
          : ["Full code export", "Live preview", "Credits never expire"]
        ).map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
            <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/pricing"
        className={cn(
          "mt-5 block rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200",
          isPopular
            ? "bg-violet-600 text-white hover:bg-violet-700"
            : "border border-black/10 bg-white text-gray-800 hover:bg-gray-50",
        )}
      >
        {tier.key === "free"
          ? "Get started free"
          : `Get ${tier.credits} credits`}
      </Link>
    </motion.div>
  );
}

// ─── FAQ accordion ───────────────────────────────────────────────────────────

function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-black/[0.06] rounded-2xl border border-black/[0.07] bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]">
      {FAQS_HOME.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <ChevronRight
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0",
                open === i && "rotate-90",
              )}
              aria-hidden="true"
            />
          </button>
          {open === i && (
            <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Example carousel ────────────────────────────────────────────────────────

function ExampleCarousel() {
  const [current, setCurrent] = useState(0);
  const total = EXAMPLE_SLIDES.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const slide = EXAMPLE_SLIDES[current];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_-8px_rgba(0,0,0,0.12)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {slide.images.map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={img.src}
                alt={img.label}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3E" +
                    img.label +
                    "%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm font-semibold text-white">{img.label}</p>
                <p className="text-xs text-white/70">{img.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white shadow-md hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 text-gray-600" aria-hidden="true" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white shadow-md hover:bg-gray-50 transition-colors"
      >
        <ChevronRight className="h-4 w-4 text-gray-600" aria-hidden="true" />
      </button>

      {/* Dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {EXAMPLE_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-200",
              i === current ? "w-6 bg-violet-600" : "w-2 bg-gray-300",
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="flex flex-col">
      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-[var(--hero-bg)] px-4 pb-16 pt-28 text-center"
      >
        <DotGrid />
        {/* radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[520px] w-[520px] rounded-full bg-violet-300/20 blur-[120px]" />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* badge */}
          <motion.div variants={heroChild}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/80 px-3.5 py-1 text-xs font-medium text-violet-700 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={heroChild}
            className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl leading-[1.08] text-balance"
          >
            {t("hero.headline")} <br />
            {t("hero.headlineIn")} <TypewriterWord />
          </motion.h1>

          {/* subhead */}
          <motion.p
            variants={heroChild}
            className="max-w-xl text-base text-gray-600 leading-relaxed text-pretty"
          >
            {t("hero.subhead")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={heroChild} className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(124,58,237,0.35)] transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_4px_16px_rgba(124,58,237,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              {t("hero.cta1")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-800 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              {t("hero.cta2")}
            </Link>
          </motion.div>

          {/* stats */}
          <motion.div
            variants={heroChild}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xl font-bold text-gray-900">{s.value}</span>
                <span className="text-[11px] text-gray-500 mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-[var(--section-bg)] px-4 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-balance">
                {t("features.heading")}
              </h2>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
                {t("features.subheading")}
              </p>
            </div>
          </Reveal>

          {/* Bento grid: row 1 = wide + narrow, row 2 = narrow + narrow, row 3 = wide + narrow */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Row 1: AI-Powered (wide = col-span-2) + Production Code */}
            <Reveal delay={0} className="lg:col-span-2">
              <FeatureCard feature={FEATURES[0]} />
            </Reveal>
            <Reveal delay={0.08}>
              <FeatureCard feature={FEATURES[1]} />
            </Reveal>

            {/* Row 2: Live Preview + Full Stack (wide = col-span-2) */}
            <Reveal delay={0.04}>
              <FeatureCard feature={FEATURES[2]} />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-2">
              <FeatureCard feature={FEATURES[3]} />
            </Reveal>

            {/* Row 3: Export Ready (wide = col-span-2) + Lightning Fast */}
            <Reveal delay={0} className="lg:col-span-2">
              <FeatureCard feature={FEATURES[4]} />
            </Reveal>
            <Reveal delay={0.08}>
              <FeatureCard feature={FEATURES[5]} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("how.heading")}
              </h2>
              <p className="mt-2 text-sm text-gray-500">{t("how.subheading")}</p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {HOW_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full text-white text-sm font-bold shadow-md",
                      step.color,
                    )}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{step.title}</h3>
                    <p className="mt-1.5 text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Examples carousel ── */}
      <section id="examples" className="bg-[var(--section-bg)] px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("examples.heading")}
              </h2>
              <p className="mt-2 text-sm text-gray-500">{t("examples.subheading")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ExampleCarousel />
          </Reveal>
        </div>
      </section>

      {/* ── Tutorial video ── */}
      <section className="bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("tutorial.heading")}
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto text-pretty">
                {t("tutorial.subheading")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-gray-50 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_-8px_rgba(0,0,0,0.12)]">
              <div className="h-3 bg-gray-100 flex items-center gap-1.5 px-3 border-b border-black/[0.06]">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="h-2 w-2 rounded-full bg-green-400" />
              </div>
              <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/5c24322f94eb48a8a838a23295fc9c54.jpg"
                  alt="Builder tutorial video preview"
                  className="h-full w-full object-cover opacity-80"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[18px] border-y-transparent border-l-violet-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gray-900/90 px-4 py-2">
                  <span className="text-xs text-white/60">0:00</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/60">🔊</span>
                    <span className="text-xs text-white/60">⛶</span>
                    <span className="text-xs text-white/60">⋮</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="bg-[var(--section-bg)] px-4 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3.5 py-1 text-xs font-medium text-violet-700 shadow-sm mb-4">
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                {t("pricing.badge")}
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("pricing.heading")}
              </h2>
              <p className="mt-3 text-sm text-gray-500 max-w-sm mx-auto text-pretty">
                {t("pricing.subheading")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.key} delay={i * 0.08}>
                <HomePricingCard tier={tier} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 text-center">
              <Link
                href="/pricing"
                className="text-sm text-violet-600 hover:text-violet-700 underline underline-offset-2 transition-colors"
              >
                {t("pricing.viewAll")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ teaser ── */}
      <section id="faq" className="bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="rounded-2xl border border-black/[0.07] bg-[var(--section-bg)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-3">
                    <Check className="h-3 w-3" aria-hidden="true" />
                    {t("faq.badge")}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    {t("faq.heading")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{t("faq.subheading")}</p>
                </div>
                <Link
                  href="/faq"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  {t("faq.viewAll")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <HomeFaq />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="px-4 py-6 md:py-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-violet-600 px-8 py-16 text-center shadow-[0_4px_32px_rgba(124,58,237,0.35)]">
              {/* dot overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative z-10 flex flex-col items-center gap-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("cta.badge")}
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {t("cta.heading")}
                </h2>
                <p className="max-w-sm text-sm text-white/80 leading-relaxed text-pretty">
                  {t("cta.subheading")}
                </p>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}