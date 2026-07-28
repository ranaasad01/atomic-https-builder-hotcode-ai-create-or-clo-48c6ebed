"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, Plus, Eye, Download, Code2 as Github, Clock, CheckCircle, AlertCircle, Sparkles, Globe, FileCode, Star, Filter, ArrowRight, Trash2, Edit, MoreVertical, Activity } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const PROJECTS = [
  {
    id: "proj-001",
    name: "Tesla Landing Page",
    description: "A sleek, dark-themed landing page inspired by Tesla's minimalist design language.",
    prompt: "Create a Tesla-style landing page with dark theme, hero video section, and model showcase.",
    status: "completed",
    category: "Landing Page",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-10",
    credits: 3,
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/bcc28df7d7804e2183b72a2c78fb858c.webp",
    tags: ["dark", "automotive", "hero"],
    starred: true,
  },
  {
    id: "proj-002",
    name: "Alex Chen Portfolio",
    description: "A developer portfolio with animated hero, project showcase, and contact form.",
    prompt: "Build a modern developer portfolio for Alex Chen with dark gradient hero and project cards.",
    status: "completed",
    category: "Portfolio",
    createdAt: "2024-12-09",
    updatedAt: "2024-12-09",
    credits: 4,
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d0ad55b9161343d99193fe5a088a32e8.jpg",
    tags: ["portfolio", "developer", "animated"],
    starred: true,
  },
  {
    id: "proj-003",
    name: "SaaS Dashboard",
    description: "A full analytics dashboard with charts, stat cards, and data tables.",
    prompt: "Generate a SaaS analytics dashboard with revenue charts, user stats, and activity feed.",
    status: "completed",
    category: "Dashboard",
    createdAt: "2024-12-08",
    updatedAt: "2024-12-08",
    credits: 5,
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d6da37f7ba114e48981a6e1c30fa91c4.jpg",
    tags: ["dashboard", "analytics", "charts"],
    starred: false,
  },
  {
    id: "proj-004",
    name: "Coffee Shop Website",
    description: "A warm, inviting website for a specialty coffee shop with menu and booking.",
    prompt: "Create a cozy coffee shop website with warm tones, menu section, and reservation form.",
    status: "completed",
    category: "Business",
    createdAt: "2024-12-07",
    updatedAt: "2024-12-07",
    credits: 3,
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/56efccbfb0ea422a94ff9d66e0bbb1e8.jpg",
    tags: ["food", "warm", "booking"],
    starred: false,
  },
  {
    id: "proj-005",
    name: "E-commerce Store",
    description: "A modern online store with product grid, cart, and checkout flow.",
    prompt: "Build a clean e-commerce store for handmade jewelry with product listings and cart.",
    status: "generating",
    category: "E-commerce",
    createdAt: "2024-12-11",
    updatedAt: "2024-12-11",
    credits: 6,
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/86f90911b4b447318aa615bc17a7df23.png",
    tags: ["shop", "products", "cart"],
    starred: false,
  },
  {
    id: "proj-006",
    name: "Startup Landing",
    description: "A high-converting SaaS landing page with pricing, features, and testimonials.",
    prompt: "Create a startup landing page for a project management tool with pricing and social proof.",
    status: "completed",
    category: "Landing Page",
    createdAt: "2024-12-06",
    updatedAt: "2024-12-06",
    credits: 4,
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/93691f5e378f41758fb507f044c99b08.png",
    tags: ["startup", "saas", "pricing"],
    starred: false,
  },
  {
    id: "proj-007",
    name: "Restaurant Menu",
    description: "An elegant restaurant website with full menu, gallery, and reservations.",
    prompt: "Design an upscale Italian restaurant website with menu, photo gallery, and booking.",
    status: "failed",
    category: "Business",
    createdAt: "2024-12-05",
    updatedAt: "2024-12-05",
    credits: 0,
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/503c9b108ecc41698759c0f6e0edfa1b.jpg",
    tags: ["restaurant", "food", "gallery"],
    starred: false,
  },
  {
    id: "proj-008",
    name: "Crypto Dashboard",
    description: "A real-time crypto tracking dashboard with portfolio overview and charts.",
    prompt: "Build a crypto portfolio dashboard with live prices, charts, and transaction history.",
    status: "completed",
    category: "Dashboard",
    createdAt: "2024-12-04",
    updatedAt: "2024-12-04",
    credits: 5,
    thumbnail: "https://s3-alpha.figma.com/hub/file/2284606587471579597/ac16528c-ac0b-4582-b5db-e6ef086749d9-cover.png",
    tags: ["crypto", "finance", "dark"],
    starred: true,
  },
];

const PROJECT_CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))] as const;

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  completed: {
    label: "Completed",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    icon: <CheckCircle className="h-3 w-3" />,
  },
  generating: {
    label: "Generating",
    color: "text-violet-600 bg-violet-50 border-violet-200",
    icon: <Activity className="h-3 w-3 animate-pulse" />,
  },
  failed: {
    label: "Failed",
    color: "text-red-600 bg-red-50 border-red-200",
    icon: <AlertCircle className="h-3 w-3" />,
  },
};

const STATS = [
  { label: "Total Projects", value: "8", icon: <FileCode className="h-5 w-5" />, color: "text-violet-600 bg-violet-100" },
  { label: "Completed", value: "6", icon: <CheckCircle className="h-5 w-5" />, color: "text-emerald-600 bg-emerald-100" },
  { label: "Credits Used", value: "30", icon: <Sparkles className="h-5 w-5" />, color: "text-orange-600 bg-orange-100" },
  { label: "Starred", value: "3", icon: <Star className="h-5 w-5" />, color: "text-yellow-600 bg-yellow-100" },
];

export default function ProjectsPage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("all");
  const [starredOnly, setStarredOnly] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [starredIds, setStarredIds] = useState<Set<string>>(
    new Set(PROJECTS.filter((p) => p.starred).map((p) => p.id))
  );

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchStatus = activeStatus === "all" || p.status === activeStatus;
      const matchStarred = !starredOnly || starredIds.has(p.id);
      return matchSearch && matchCategory && matchStatus && matchStarred;
    });
  }, [search, activeCategory, activeStatus, starredOnly, starredIds]);

  function toggleStar(id: string) {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {t("projects.heading")}
              </h1>
              <p className="mt-1 text-gray-500 text-sm">
                {t("projects.subheading")}
              </p>
            </div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all duration-200 shadow-[0_2px_8px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.35)] self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              {t("projects.newProject")}
            </Link>
          </div>
        </Reveal>

        {/* Stats Row */}
        <Reveal delay={0.05}>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] p-4 flex items-center gap-3"
              >
                <div className={`p-2 rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* Filters Bar */}
        <Reveal delay={0.1}>
          <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("projects.searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex items-center gap-1 flex-wrap">
                {PROJECT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                      activeCategory === cat
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400 shrink-0" />
                <select
                  value={activeStatus}
                  onChange={(e) => setActiveStatus(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="generating">Generating</option>
                  <option value="failed">Failed</option>
                </select>

                <button
                  onClick={() => setStarredOnly((v) => !v)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 ${
                    starredOnly
                      ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Star className={`h-3.5 w-3.5 ${starredOnly ? "fill-yellow-500 text-yellow-500" : ""}`} />
                  Starred
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Results Count */}
        <Reveal delay={0.12}>
          <p className="text-sm text-gray-500 mb-4">
            {t("projects.resultsCount", { count: filtered.length })}
          </p>
        </Reveal>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="p-4 bg-gray-100 rounded-2xl mb-4">
                <FileCode className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">{t("projects.emptyTitle")}</h3>
              <p className="text-sm text-gray-400 mb-6 max-w-xs">{t("projects.emptyBody")}</p>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                {t("projects.generateFirst")}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((project) => {
                const status = STATUS_CONFIG[project.status];
                const isStarred = starredIds.has(project.id);
                const menuOpen = openMenuId === project.id;

                return (
                  <motion.div
                    key={project.id}
                    variants={fadeInUp}
                    layout
                    className="group bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.16)] transition-all duration-300 flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-40 bg-gradient-to-br from-violet-50 to-purple-100 overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {/* Overlay actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <Link
                          href={`/generate?project=${project.id}`}
                          className="p-2 bg-white rounded-xl shadow-md hover:bg-violet-50 transition-colors"
                          aria-label="Preview project"
                        >
                          <Eye className="h-4 w-4 text-gray-700" />
                        </Link>
                        <button
                          className="p-2 bg-white rounded-xl shadow-md hover:bg-violet-50 transition-colors"
                          aria-label="Download project"
                        >
                          <Download className="h-4 w-4 text-gray-700" />
                        </button>
                        <button
                          className="p-2 bg-white rounded-xl shadow-md hover:bg-violet-50 transition-colors"
                          aria-label="Push to GitHub"
                        >
                          <Github className="h-4 w-4 text-gray-700" />
                        </button>
                      </div>
                      {/* Status badge */}
                      <div className="absolute top-2 left-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                      </div>
                      {/* Star button */}
                      <button
                        onClick={() => toggleStar(project.id)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                        aria-label={isStarred ? "Unstar project" : "Star project"}
                      >
                        <Star
                          className={`h-3.5 w-3.5 transition-colors ${
                            isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-1">
                          {project.name}
                        </h3>
                        {/* Menu */}
                        <div className="relative shrink-0">
                          <button
                            onClick={() => setOpenMenuId(menuOpen ? null : project.id)}
                            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Project options"
                          >
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                          </button>
                          <AnimatePresence>
                            {menuOpen && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: -4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-8 z-20 bg-white border border-black/5 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] py-1 w-36"
                              >
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                                  <Edit className="h-3.5 w-3.5" /> Rename
                                </button>
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                                  <Globe className="h-3.5 w-3.5" /> View Live
                                </button>
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                                  <Download className="h-3.5 w-3.5" /> Export
                                </button>
                                <div className="border-t border-gray-100 my-1" />
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors">
                                  <Trash2 className="h-3.5 w-3.5" /> Delete
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="px-2 py-0.5 bg-violet-50 text-violet-600 text-xs rounded-full border border-violet-100 font-medium">
                          {project.category}
                        </span>
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-100">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          {project.createdAt}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Sparkles className="h-3 w-3 text-violet-400" />
                          {project.credits} credits
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Banner */}
        <Reveal delay={0.15}>
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 80%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-4 border border-white/20">
                <Sparkles className="h-3 w-3" />
                {t("projects.ctaBadge")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                {t("projects.ctaHeading")}
              </h2>
              <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
                {t("projects.ctaBody")}
              </p>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-700 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
              >
                {t("projects.ctaButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}