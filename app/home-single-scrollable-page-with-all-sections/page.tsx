"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Sparkles, ArrowRight, Check, ChevronLeft, ChevronRight, Zap, FileCode, Eye, Layout, Download, Star } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type features = any;
const features: any = [];
type pricingTiers = any;
const pricingTiers: any = [];
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const STATS = [
  { value: "10K+", label: "Websites Generated" },
  { value: "< 60s", label: "Average Build Time" },
  { value: "100%", label: "Production Ready" },
  { value: "Free", label: "To Get Started" },
];

const HOW_STEPS = [
  {
    num: "01",
    color: "bg-violet-600",
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

const EXAMPLES = [
  {
    id: 1,
    title: "Tesla Website",
    subtitle: "AI-generated Tesla website",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/71bdb78bcbad4f2aa35a8344f7d99624.jpg",
  },
  {
    id: 2,
    title: "Portfolio Website",
    subtitle: "AI-generated portfolio website",
    image: "https://s3-alpha.figma.com/hub/file/2219958310232930685/cacc76a6-e76b-4946-9b14-d5425e559779-cover.png",
  },
  {
    id: 3,
    title: "Apple Store Website",
    subtitle: "AI-generated Apple website",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c11fb8bd43a84c06b06de7d8b85995b0.jpg",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is Builder by hotcode.ai?",
    a: "Builder is an AI-powered website generator that turns plain-English descriptions into production-ready Next.js websites with clean TypeScript code.",
  },
  {
    q: "Do credits expire?",
    a: "No. Credits you purchase never expire. Free monthly credits reset each month.",
  },
  {
    q: "Can I export the source code?",
    a: "Yes. Every plan includes full code export. You own the code and can deploy it anywhere.",
  },
  {
    q: "What tech stack does it use?",
    a: "All sites are built on Next.js 14 App Router with TypeScript, Tailwind CSS, and framer-motion.",
  },
];

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  "ai-powered": <Sparkles className="h-5 w-5" />,
  "production-code": <FileCode className="h-5 w-5" />,
  "live-preview": <Eye className="h-5 w-5" />,
  "full-stack": <Layout className="h-5 w-5" />,
  "export-ready": <Download className="h-5 w-5" />,
  "lightning-fast": <Zap className="h-5 w-5" />,
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
        backgroundSize: "32px 32px",
      }}
    />
  );
}

// ─── Typewriter effect ───────────────────────────────────────────────────────

const TYPEWRITER_WORDS = ["seconds.", "minutes.", "one prompt."];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = TYPEWRITER_WORDS[index];
    if (!deleting && displayed.length < word.length) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        60
      );
    } else if (!deleting && displayed.length === word.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        40
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TYPEWRITER_WORDS.length);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, deleting, index]);

  return (
    <span className="text-violet-600">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ─── Carousel ────────────────────────────────────────────────────────────────

function ExamplesCarousel() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + EXAMPLES.length) % EXAMPLES.length);
  const next = () => setActive((i) => (i + 1) % EXAMPLES.length);

  const visible = [
    EXAMPLES[(active - 1 + EXAMPLES.length) % EXAMPLES.length],
    EXAMPLES[active],
    EXAMPLES[(active + 1) % EXAMPLES.length],
  ];

  return (
    <div className="relative flex items-center justify-center gap-4 py-4">
      {/* Prev */}
      <button
        onClick={prev}
        aria-label="Previous example"
        className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
      >
        <ChevronLeft className="h-4 w-4 text-gray-600" />
      </button>

      {/* Cards */}
      <div className="relative flex w-full max-w-3xl items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          {visible.map((ex, i) => {
            const isCenter = i === 1;
            return (
              <motion.div
                key={ex.id + "-" + i}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{
                  opacity: isCenter ? 1 : 0.5,
                  scale: isCenter ? 1 : 0.88,
                  zIndex: isCenter ? 10 : 1,
                }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`relative flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md ${
                  isCenter ? "w-full max-w-lg" : "hidden sm:block w-40"
                }`}
              >
                <img
                  src={ex.image}
                  alt={ex.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800">{ex.title}</p>
                  <p className="text-xs text-gray-500">{ex.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Next */}
      <button
        onClick={next}
        aria-label="Next example"
        className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
      >
        <ChevronRight className="h-4 w-4 text-gray-600" />
      </button>

      {/* Dots */}
      <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
        {EXAMPLES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to example ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-5 bg-violet-600" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
            aria-expanded={open === i}
          >
            {item.q}
            <span
              className={`ml-4 flex-shrink-0 transition-transform ${
                open === i ? "rotate-45" : ""
              }`}
            >
              <span className="text-lg leading-none text-gray-400">+</span>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 text-sm leading-relaxed text-gray-600">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--bg-base)] font-sans">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-purple-50/60 to-[#f3f4f8] pb-24 pt-28 text-center">
        <DotGrid />

        <div className="relative z-10 mx-auto max-w-3xl px-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-xs font-medium text-violet-700 shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Website Generator
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            className="mb-5 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl"
          >
            Build websites with AI in{" "}
            <br className="hidden sm:block" />
            <Typewriter />
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
            className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-600"
          >
            Describe your vision in plain English. Our AI generates
            production-ready websites with clean code, modern design, and full
            responsiveness.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.24 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-violet-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
            >
              Start Generating <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
            >
              Example Projects
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center"
              >
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES BENTO ───────────────────────────────────────────────── */}
      <section className="bg-[#f3f4f8] py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.slice(0, 6).map((f, i) => {
                const isWide = i === 0 || i === 3 || i === 4;
                return (
                  <motion.div
                    key={f.key}
                    whileHover={{ y: -3, boxShadow: "0 8px 32px -8px rgba(0,0,0,0.12)" }}
                    transition={{ duration: 0.2 }}
                    className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] ${
                      isWide ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.bgColor} ${f.iconColor}`}
                    >
                      {FEATURE_ICONS[f.key] ?? <Star className="h-5 w-5" />}
                    </div>

                    <h3 className="mb-1 text-base font-bold text-gray-900">
                      {f.title}
                    </h3>
                    <p className="mb-3 text-xs leading-relaxed text-gray-500">
                      {f.description.split(".")[0]}.
                    </p>

                    {/* Badge */}
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${f.bgColor} ${f.iconColor}`}
                    >
                      {f.badge}
                    </span>

                    {/* Decorative watermark */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute bottom-3 right-3 text-6xl font-black opacity-5 ${f.iconColor}`}
                    >
                      {f.subtitle}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-[#f3f4f8] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900">
              How it works
            </h2>
            <p className="mb-14 text-sm text-gray-500">
              From idea to live website in three steps
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {HOW_STEPS.map((step) => (
                <div key={step.num} className="flex flex-col items-center text-center">
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${step.color} text-sm font-bold text-white shadow-md`}
                  >
                    {step.num}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SEE WHAT'S POSSIBLE ──────────────────────────────────────────── */}
      <section className="bg-[#f3f4f8] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900">
              See what&apos;s possible
            </h2>
            <p className="mb-12 text-sm text-gray-500">
              Real websites generated by AI from simple prompts
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ExamplesCarousel />
          </Reveal>
        </div>
      </section>

      {/* ── TUTORIAL VIDEO ───────────────────────────────────────────────── */}
      <section className="bg-[#f3f4f8] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Learn how to use the builder
            </h2>
            <p className="mb-10 text-sm text-gray-500">
              Watch this quick tutorial to see how easy it is to create stunning
              websites with AI
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.12)]">
              <div className="relative aspect-video w-full bg-gray-900">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/5c24322f94eb48a8a838a23295fc9c54.jpg"
                  alt="Builder tutorial video preview"
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 translate-x-0.5 text-violet-600"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-400">
                <span>0:00</span>
                <div className="flex gap-3">
                  <span>🔇</span>
                  <span>⛶</span>
                  <span>⋮</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="bg-[#f3f4f8] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-700">
              <span>∞</span> No subscription needed
            </div>
            <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Pay only for what you build
            </h2>
            <p className="mb-12 text-sm text-gray-500">
              Start free with monthly credits. Top up whenever you need more —
              credits never expire.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pricingTiers.map((tier) => (
                <motion.div
                  key={tier.key}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`relative flex flex-col rounded-2xl border p-5 text-left shadow-sm ${tier.colorClass} ${
                    tier.isPopular ? "ring-2 ring-violet-500" : ""
                  }`}
                >
                  {tier.isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                      Most Popular
                    </span>
                  )}

                  <p className="mb-1 text-xs font-semibold text-gray-500">
                    {tier.credits} credits
                  </p>
                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-gray-900">
                      {tier.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      {tier.priceNote}
                    </span>
                  </div>

                  {tier.perCredit && (
                    <p className="mb-3 text-xs font-semibold text-violet-600">
                      {tier.credits} credits{" "}
                      <span className="font-normal text-gray-400">
                        · {tier.perCredit}
                      </span>
                    </p>
                  )}
                  {!tier.perCredit && (
                    <p className="mb-3 text-xs font-semibold text-emerald-600">
                      {tier.credits} credits / month
                    </p>
                  )}

                  <ul className="mb-5 flex-1 space-y-1.5">
                    {tier.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Check className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/pricing"
                    className={`block rounded-lg py-2 text-center text-sm font-semibold transition-all duration-200 ${
                      tier.isPopular
                        ? "bg-violet-600 text-white hover:bg-violet-700"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-6">
              <Link
                href="/pricing"
                className="text-sm font-medium text-violet-600 hover:underline"
              >
                View all plans →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ PREVIEW ──────────────────────────────────────────────────── */}
      <section className="bg-[#f3f4f8] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                    <Check className="h-3 w-3" /> Got questions?
                  </span>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
                    Frequently Asked Questions
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Everything you need to know about Builder
                  </p>
                </div>
                <Link
                  href="/faq"
                  className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                >
                  View all FAQs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <FaqAccordion />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 py-16 text-center shadow-xl">
              {/* Dot overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" /> Start for free
                </div>
                <h2 className="mb-3 text-4xl font-extrabold tracking-tight text-white">
                  Ready to build?
                </h2>
                <p className="mb-8 text-sm leading-relaxed text-white/80">
                  Start generating production-ready
                  <br />
                  websites in seconds with AI.
                </p>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                >
                  Start Building <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}