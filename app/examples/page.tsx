"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Sparkles, Star } from 'lucide-react';

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

interface ExampleProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  featured: boolean;
  accentColor: string;
}

const EXAMPLE_PROJECTS: ExampleProject[] = [
  {
    id: "apple-store",
    title: "Apple Store Website",
    description: "A sleek product showcase with animated hero, product grid, and smooth scroll interactions.",
    category: "E-commerce",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c11fb8bd43a84c06b06de7d8b85995b0.jpg",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    featured: true,
    accentColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "tesla",
    title: "Tesla Website",
    description: "Full-bleed video hero, model configurator layout, and bold typography inspired by Tesla.",
    category: "Automotive",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/71bdb78bcbad4f2aa35a8344f7d99624.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    featured: true,
    accentColor: "bg-red-100 text-red-700",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "A developer portfolio with dark hero, project grid, skills section, and contact form.",
    category: "Portfolio",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c11fb8bd43a84c06b06de7d8b85995b0.jpg",
    tags: ["Next.js", "Framer Motion", "TypeScript"],
    featured: true,
    accentColor: "bg-violet-100 text-violet-700",
  },
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    description: "Analytics dashboard with sidebar nav, stat cards, charts, and a data table.",
    category: "Dashboard",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d0ad55b9161343d99193fe5a088a32e8.jpg",
    tags: ["Next.js", "Recharts", "TypeScript"],
    featured: false,
    accentColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "ecommerce",
    title: "E-commerce Store",
    description: "Product listing, cart drawer, checkout flow, and order confirmation — fully responsive.",
    category: "E-commerce",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/56efccbfb0ea422a94ff9d66e0bbb1e8.jpg",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    featured: false,
    accentColor: "bg-orange-100 text-orange-700",
  },
  {
    id: "blog",
    title: "Blog Platform",
    description: "Clean editorial blog with MDX support, tag filtering, and a newsletter signup.",
    category: "Blog",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/164989a6cdd64c94ad5cdeb22509c4b8.webp",
    tags: ["Next.js", "MDX", "Tailwind"],
    featured: false,
    accentColor: "bg-pink-100 text-pink-700",
  },
  {
    id: "restaurant",
    title: "Restaurant Website",
    description: "Warm, image-led restaurant site with menu, reservations, and location sections.",
    category: "Hospitality",
    image: "https://s3-figma-hubfile-images-production-cdn-cgi.figma.com/cdn-cgi/image/format=auto,quality=85/hub/file/carousel/img/2252e16a5fb90aac7ff9e197215d7352fd1a69a4",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    featured: false,
    accentColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "agency",
    title: "Creative Agency",
    description: "Bold agency landing page with case studies, team section, and animated hero.",
    category: "Agency",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8a398dc43ec640dda33be0dfb92ee2d7.jpg",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    featured: false,
    accentColor: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "startup",
    title: "Startup Landing Page",
    description: "Conversion-focused SaaS landing with features, pricing, testimonials, and CTA.",
    category: "SaaS",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/93691f5e378f41758fb507f044c99b08.png",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    featured: false,
    accentColor: "bg-cyan-100 text-cyan-700",
  },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(EXAMPLE_PROJECTS.map((p) => p.category)))] as const;

const FEATURED = EXAMPLE_PROJECTS.filter((p) => p.featured);

export default function ExamplesPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("All");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filtered =
    activeCategory === "All"
      ? EXAMPLE_PROJECTS
      : EXAMPLE_PROJECTS.filter((p) => p.category === activeCategory);

  const prevSlide = () =>
    setCarouselIndex((i) => (i - 1 + FEATURED.length) % FEATURED.length);
  const nextSlide = () =>
    setCarouselIndex((i) => (i + 1) % FEATURED.length);

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#ede9fe] via-[#f0eeff] to-[#f5f5fa] pt-24 pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 60% 20%, rgba(139,92,246,0.12) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-violet-700 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t("examples.hero.badge")}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              {t("examples.hero.heading")}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              {t("examples.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-violet-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                {t("examples.hero.cta_primary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-violet-300 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                {t("examples.hero.cta_secondary")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carousel — Featured Projects */}
      <Reveal className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {t("examples.carousel.heading")}
          </h2>
          <p className="mt-3 text-base text-gray-500">
            {t("examples.carousel.subtitle")}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_48px_-12px_rgba(0,0,0,0.12)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col md:flex-row"
              >
                <div className="relative h-64 w-full overflow-hidden md:h-80 md:w-2/3">
                  <img
                    src={FEATURED[carouselIndex].image}
                    alt={FEATURED[carouselIndex].title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
                      {FEATURED[carouselIndex].category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 md:w-1/3">
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                      {t("examples.carousel.featured_label")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {FEATURED[carouselIndex].title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    {FEATURED[carouselIndex].description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {FEATURED[carouselIndex].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/generate"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-800"
                  >
                    {t("examples.carousel.build_similar")}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <button
            onClick={prevSlide}
            aria-label={t("examples.carousel.prev_label")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all hover:border-violet-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>
          <button
            onClick={nextSlide}
            aria-label={t("examples.carousel.next_label")}
            className="absolute -right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all hover:border-violet-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {FEATURED.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                aria-label={`${t("examples.carousel.dot_label")} ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === carouselIndex
                    ? "w-6 bg-violet-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {t("examples.gallery.heading")}
            </h2>
            <p className="mt-3 text-base text-gray-500">
              {t("examples.gallery.subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Category filter */}
        <Reveal delay={0.05}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600 ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                variants={cardVariant}
                layout
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_16px_40px_-12px_rgba(0,0,0,0.14)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute right-3 top-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${project.accentColor}`}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href="/generate"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-800"
                    >
                      {t("examples.gallery.build_this")}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Featured Split Section */}
      <Reveal>
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {t("examples.featured.heading")}
              </h2>
              <p className="mt-3 text-base text-gray-500">
                {t("examples.featured.subtitle")}
              </p>
            </div>

            <div className="space-y-16">
              {/* Split 1 — image left */}
              <div className="flex flex-col items-center gap-10 md:flex-row">
                <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_48px_-12px_rgba(0,0,0,0.1)] md:w-1/2">
                  <img
                    src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c11fb8bd43a84c06b06de7d8b85995b0.jpg"
                    alt="Apple Store Website"
                    className="h-64 w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    E-commerce
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-gray-900">
                    {t("examples.featured.apple.title")}
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-500">
                    {t("examples.featured.apple.description")}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {(t.raw("examples.featured.apple.highlights") as string[]).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-blue-100 text-center text-xs font-bold leading-4 text-blue-700">
                          ✓
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/generate"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-700"
                  >
                    {t("examples.featured.build_cta")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Split 2 — image right */}
              <div className="flex flex-col items-center gap-10 md:flex-row-reverse">
                <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_48px_-12px_rgba(0,0,0,0.1)] md:w-1/2">
                  <img
                    src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c11fb8bd43a84c06b06de7d8b85995b0.jpg"
                    alt="Portfolio Website"
                    className="h-64 w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                    Portfolio
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-gray-900">
                    {t("examples.featured.portfolio.title")}
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-500">
                    {t("examples.featured.portfolio.description")}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {(t.raw("examples.featured.portfolio.highlights") as string[]).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-violet-100 text-center text-xs font-bold leading-4 text-violet-700">
                          ✓
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/generate"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-700"
                  >
                    {t("examples.featured.build_cta")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA Banner */}
      <Reveal>
        <section className="mx-6 my-16 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700 px-8 py-16 text-center shadow-[0_8px_32px_rgba(109,40,217,0.3)]">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)",
            }}
          />
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t("examples.cta.badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("examples.cta.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
            {t("examples.cta.subtitle")}
          </p>
          <Link
            href="/generate"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t("examples.cta.button")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </Reveal>
    </main>
  );
}