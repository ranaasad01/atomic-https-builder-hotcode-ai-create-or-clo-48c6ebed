"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--surface)]/95 backdrop-blur-md shadow-[0_1px_0_0_var(--border)] border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Builder by hotcode.ai — Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-[0_2px_8px_rgba(124,58,237,0.35)] group-hover:shadow-[0_4px_16px_rgba(124,58,237,0.45)] transition-shadow duration-300">
              <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-[var(--foreground)] text-sm tracking-tight hidden sm:block">
              Builder
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={getLinkHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-[var(--accent)]/15 text-[var(--primary)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/60"
                }`}
              >
                {navT[link.key] ?? link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language */}
            <button
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/60 transition-all duration-200 border border-[var(--border)]"
              aria-label="Switch language"
            >
              EN
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark((d) => !d)}
              className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/60 transition-all duration-200"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            {/* Sign In */}
            <Link
              href="/signin"
              className="px-3 py-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Sign In
            </Link>

            {/* Start Building CTA */}
            <Link
              href="/generate"
              className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold shadow-[0_2px_8px_rgba(124,58,237,0.35)] hover:bg-[var(--primary)]/90 hover:shadow-[0_4px_16px_rgba(124,58,237,0.45)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            >
              Start Building
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/60 transition-all duration-200"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[var(--surface)]/98 backdrop-blur-md border-b border-[var(--border)]"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-[var(--accent)]/15 text-[var(--primary)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/60"
                  }`}
                >
                  {navT[link.key] ?? link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-col gap-2">
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/60 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/generate"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold text-center shadow-[0_2px_8px_rgba(124,58,237,0.35)] hover:bg-[var(--primary)]/90 transition-all duration-200"
                >
                  Start Building
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}