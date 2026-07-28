"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Sparkles, ArrowRight, X, ChevronDown, Zap, Code2, Eye, Download, Star, Clock, Check, AlertCircle, Loader2, RotateCcw, Copy, Code2 as Github, ExternalLink } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const EXAMPLE_PROMPTS = [
  "A modern SaaS landing page for a project management tool with pricing and testimonials",
  "A personal portfolio for a UX designer with case studies and contact form",
  "An e-commerce storefront for handmade jewelry with product grid and cart",
  "A restaurant website with menu, reservations, and location map",
  "A startup landing page for an AI writing assistant with feature highlights",
  "A photography portfolio with full-bleed gallery and booking form",
];

const RECENT_GENERATIONS = [
  {
    id: "gen-1",
    title: "Tesla Clone Website",
    prompt: "A Tesla-inspired landing page with hero video, model showcase, and order CTA",
    status: "complete",
    createdAt: "2 hours ago",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e962f89ce437467ea99385e90cf3be02.gif",
    credits: 3,
  },
  {
    id: "gen-2",
    title: "Alex Chen Portfolio",
    prompt: "A developer portfolio with dark theme, project showcase, and contact section",
    status: "complete",
    createdAt: "5 hours ago",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/bcc28df7d7804e2183b72a2c78fb858c.webp",
    credits: 2,
  },
  {
    id: "gen-3",
    title: "SaaS Dashboard UI",
    prompt: "A SaaS analytics dashboard with sidebar, charts, and data tables",
    status: "complete",
    createdAt: "1 day ago",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/aa03e0f9a2cb4facaf6b1972b814818d.png",
    credits: 4,
  },
  {
    id: "gen-4",
    title: "Bakery Shop",
    prompt: "A cozy bakery website with product gallery, daily specials, and online ordering",
    status: "complete",
    createdAt: "2 days ago",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/2e6e8da66ff040fd8a110e4a71dbdf98.jpg",
    credits: 2,
  },
];

const TIPS = [
  "Be specific about your brand colors and style (e.g. 'dark navy and gold, luxury feel')",
  "Mention the sections you need (hero, pricing, testimonials, FAQ, contact)",
  "Describe your target audience to get better copy and tone",
  "Include your industry for more relevant imagery and content",
  "Specify if you need forms, animations, or interactive elements",
];

const STATS = [
  { value: "10K+", label: "Sites Generated" },
  { value: "< 60s", label: "Avg Build Time" },
  { value: "50", label: "Free Credits" },
  { value: "GPT-4o", label: "Powered By" },
];

const pulseVariants: Variants = {
  idle: { scale: 1, opacity: 1 },
  pulse: {
    scale: [1, 1.04, 1],
    opacity: [1, 0.85, 1],
    transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
  },
};

const shimmerVariants: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: "100%",
    transition: { duration: 1.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

type GenerationStatus = "idle" | "generating" | "complete" | "error";

export default function GeneratePage() {
  const t = useTranslations();
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [tipIndex, setTipIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const PROGRESS_STEPS = [
    { pct: 10, label: "Parsing your prompt..." },
    { pct: 25, label: "Designing layout structure..." },
    { pct: 42, label: "Generating components..." },
    { pct: 58, label: "Writing TypeScript code..." },
    { pct: 74, label: "Applying styles and animations..." },
    { pct: 88, label: "Optimising for production..." },
    { pct: 96, label: "Finalising your site..." },
    { pct: 100, label: "Done!" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  function handleGenerate() {
    if (!prompt.trim() || status === "generating") return;
    setStatus("generating");
    setProgress(0);
    setProgressLabel(PROGRESS_STEPS[0].label);

    let stepIdx = 0;
    progressRef.current = setInterval(() => {
      stepIdx++;
      if (stepIdx >= PROGRESS_STEPS.length) {
        if (progressRef.current) clearInterval(progressRef.current);
        setProgress(100);
        setProgressLabel("Done!");
        setTimeout(() => setStatus("complete"), 600);
        return;
      }
      setProgress(PROGRESS_STEPS[stepIdx].pct);
      setProgressLabel(PROGRESS_STEPS[stepIdx].label);
    }, 900);
  }

  function handleReset() {
    if (progressRef.current) clearInterval(progressRef.current);
    setStatus("idle");
    setProgress(0);
    setProgressLabel("");
    setPrompt("");
  }

  function handleCopyPrompt() {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleExampleClick(ex: string) {
    setPrompt(ex);
    setShowExamples(false);
    textareaRef.current?.focus();
  }

  const charCount = prompt.length;
  const maxChars = 1000;
  const isOverLimit = charCount > maxChars;

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-8 pb-24">
      {/* Hero / Prompt Section */}
      <Reveal>
        <section className="relative overflow-hidden">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.13) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-3xl px-4 py-12 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-1.5 text-sm font-medium text-violet-700 shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-violet-500" aria-hidden="true" />
              {t("generate.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              {t("generate.heading")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="mb-10 text-base leading-relaxed text-gray-500 sm:text-lg"
            >
              {t("generate.subheading")}
            </motion.p>

            {/* Prompt Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.22 }}
              className="relative rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_48px_-12px_rgba(139,92,246,0.12)]"
            >
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("generate.placeholder")}
                rows={5}
                disabled={status === "generating"}
                className="w-full resize-none rounded-t-2xl border-0 bg-transparent px-5 pt-5 pb-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 disabled:opacity-60"
                aria-label={t("generate.promptLabel")}
              />

              {/* Toolbar */}
              <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* Example prompts toggle */}
                  <button
                    type="button"
                    onClick={() => setShowExamples((v) => !v)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    aria-expanded={showExamples}
                  >
                    <Star className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("generate.examplesBtn")}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${showExamples ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {prompt && (
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                      aria-label={t("generate.copyPrompt")}
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {copied ? t("generate.copied") : t("generate.copy")}
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs tabular-nums ${isOverLimit ? "text-red-500" : "text-gray-400"}`}
                    aria-live="polite"
                  >
                    {charCount}/{maxChars}
                  </span>

                  {status === "idle" || status === "complete" || status === "error" ? (
                    <motion.button
                      type="button"
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isOverLimit}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      {t("generate.generateBtn")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </motion.button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                      {t("generate.cancelBtn")}
                    </button>
                  )}
                </div>
              </div>

              {/* Example prompts dropdown */}
              <AnimatePresence>
                {showExamples && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg"
                  >
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {t("generate.examplesTitle")}
                      </p>
                      {EXAMPLE_PROMPTS.map((ex, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleExampleClick(ex)}
                          className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Tip rotator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 flex items-start gap-2 text-left"
            >
              <span className="mt-0.5 shrink-0 text-xs font-semibold text-violet-500">
                {t("generate.tipLabel")}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={tipIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-gray-500"
                >
                  {TIPS[tipIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Generation Progress */}
      <AnimatePresence>
        {status === "generating" && (
          <Reveal>
            <section className="mx-auto max-w-3xl px-4 pb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-[0_4px_24px_-8px_rgba(139,92,246,0.18)]"
              >
                {/* Shimmer bar */}
                <div className="relative h-1.5 w-full overflow-hidden bg-violet-100">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400 via-violet-600 to-violet-400"
                    style={{ width: `${progress}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    variants={shimmerVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </div>

                <div className="px-6 py-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        variants={pulseVariants}
                        initial="idle"
                        animate="pulse"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100"
                      >
                        <Loader2 className="h-5 w-5 animate-spin text-violet-600" aria-hidden="true" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{t("generate.buildingLabel")}</p>
                        <p className="text-xs text-gray-500">{progressLabel}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold tabular-nums text-violet-600">{progress}%</span>
                  </div>

                  {/* Step indicators */}
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                    {PROGRESS_STEPS.map((step, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div
                          className={`h-1.5 w-full rounded-full transition-colors duration-500 ${
                            progress >= step.pct ? "bg-violet-500" : "bg-gray-100"
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-center text-xs text-gray-400">{t("generate.buildingNote")}</p>
                </div>
              </motion.div>
            </section>
          </Reveal>
        )}
      </AnimatePresence>

      {/* Generation Complete */}
      <AnimatePresence>
        {status === "complete" && (
          <Reveal>
            <section className="mx-auto max-w-3xl px-4 pb-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm"
              >
                <div className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <Check className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-800">{t("generate.completeTitle")}</p>
                      <p className="mt-0.5 text-sm text-emerald-700">{t("generate.completeDesc")}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      {t("generate.previewBtn")}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {t("generate.downloadBtn")}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      {t("generate.pushGithubBtn")}
                    </motion.button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      {t("generate.generateAnotherBtn")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </section>
          </Reveal>
        )}
      </AnimatePresence>

      {/* Stats Bar */}
      <Reveal>
        <section className="mx-auto max-w-3xl px-4 pb-14">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-xl border border-gray-100 bg-white px-4 py-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-0.5 text-xs text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* How it works */}
      <Reveal>
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {t("generate.howTitle")}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{t("generate.howSubtitle")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {(
              [
                {
                  step: "01",
                  icon: <Sparkles className="h-5 w-5" aria-hidden="true" />,
                  color: "bg-violet-100 text-violet-600",
                  border: "border-violet-200",
                  titleKey: "generate.step1Title",
                  descKey: "generate.step1Desc",
                },
                {
                  step: "02",
                  icon: <Zap className="h-5 w-5" aria-hidden="true" />,
                  color: "bg-blue-100 text-blue-600",
                  border: "border-blue-200",
                  titleKey: "generate.step2Title",
                  descKey: "generate.step2Desc",
                },
                {
                  step: "03",
                  icon: <Download className="h-5 w-5" aria-hidden="true" />,
                  color: "bg-emerald-100 text-emerald-600",
                  border: "border-emerald-200",
                  titleKey: "generate.step3Title",
                  descKey: "generate.step3Desc",
                },
              ] as const
            ).map((item, i) => (
              <motion.div
                key={item.step}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`rounded-2xl border bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.05)] ${item.border}`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${item.color}`}
                  >
                    {item.step}
                  </div>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.color}`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{t(item.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{t(item.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Recent Generations */}
      <Reveal>
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                {t("generate.recentTitle")}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{t("generate.recentSubtitle")}</p>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-1.5 text-sm font-medium text-violet-600 transition-colors hover:text-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 rounded-lg px-2 py-1"
            >
              {t("generate.viewAllProjects")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECENT_GENERATIONS.map((gen, i) => (
              <motion.div
                key={gen.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_20px_-4px_rgba(139,92,246,0.18)]"
              >
                {/* Thumbnail */}
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-violet-50 to-purple-100">
                  <img
                    src={gen.thumbnail}
                    alt={gen.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label={`Preview ${gen.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition-colors hover:bg-white"
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Open ${gen.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition-colors hover:bg-white"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">{gen.title}</h3>
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      {gen.status}
                    </span>
                  </div>
                  <p className="mb-3 line-clamp-2 text-xs text-gray-500 leading-relaxed">{gen.prompt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {gen.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-violet-400" aria-hidden="true" />
                      {gen.credits} {t("generate.creditsUsed")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Features quick-ref */}
      <Reveal>
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-gray-900">{t("generate.whyTitle")}</h2>
              <p className="mt-1 text-sm text-gray-500">{t("generate.whySubtitle")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  {
                    icon: <Code2 className="h-5 w-5" aria-hidden="true" />,
                    color: "bg-blue-100 text-blue-600",
                    titleKey: "generate.feat1Title",
                    descKey: "generate.feat1Desc",
                  },
                  {
                    icon: <Eye className="h-5 w-5" aria-hidden="true" />,
                    color: "bg-emerald-100 text-emerald-600",
                    titleKey: "generate.feat2Title",
                    descKey: "generate.feat2Desc",
                  },
                  {
                    icon: <Download className="h-5 w-5" aria-hidden="true" />,
                    color: "bg-orange-100 text-orange-600",
                    titleKey: "generate.feat3Title",
                    descKey: "generate.feat3Desc",
                  },
                  {
                    icon: <Github className="h-5 w-5" aria-hidden="true" />,
                    color: "bg-gray-100 text-gray-700",
                    titleKey: "generate.feat4Title",
                    descKey: "generate.feat4Desc",
                  },
                  {
                    icon: <Zap className="h-5 w-5" aria-hidden="true" />,
                    color: "bg-yellow-100 text-yellow-600",
                    titleKey: "generate.feat5Title",
                    descKey: "generate.feat5Desc",
                  },
                  {
                    icon: <Star className="h-5 w-5" aria-hidden="true" />,
                    color: "bg-violet-100 text-violet-600",
                    titleKey: "generate.feat6Title",
                    descKey: "generate.feat6Desc",
                  },
                ] as const
              ).map((feat, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${feat.color}`}
                  >
                    {feat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t(feat.titleKey)}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{t(feat.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Credits info */}
      <Reveal>
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 px-8 py-10 text-center shadow-sm sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
              <AlertCircle className="h-7 w-7 text-violet-600" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{t("generate.creditsInfoTitle")}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{t("generate.creditsInfoDesc")}</p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
            >
              {t("generate.viewPricingBtn")}
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}