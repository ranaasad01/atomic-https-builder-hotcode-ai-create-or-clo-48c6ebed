"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { APP_NAME } from "@/lib/data";

const productLinks = [
  { label: "Generate", href: "/generate", key: "generate" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "Settings", href: "/settings", key: "settings" },
];

const resourceLinks = [
  { label: "Documentation", href: "/docs", key: "docs" },
  { label: "API Reference", href: "/docs/api", key: "api" },
  { label: "Changelog", href: "/changelog", key: "changelog" },
  { label: "FAQ", href: "/faq", key: "faq-resource" },
];

const companyLinks = [
  { label: "Contact", href: "/contact", key: "contact-company" },
];

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const footerT = t.raw("footer") as Record<string, string>;

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <Link
              href="/"
              className="flex items-center gap-2 group mb-4"
              aria-label="Builder by hotcode.ai — Home"
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-[0_2px_8px_rgba(124,58,237,0.25)] group-hover:shadow-[0_4px_16px_rgba(124,58,237,0.35)] transition-shadow duration-300">
                <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-[var(--foreground)] text-sm tracking-tight">
                Builder
              </span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-[220px]">
              {footerT["tagline"] ?? "Generate production-ready websites with AI in seconds."}
            </p>
          </motion.div>

          {/* Product links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 tracking-tight">
              {footerT["product-heading"] ?? "Product"}
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getLinkHref(link.href)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {footerT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 tracking-tight">
              {footerT["resources-heading"] ?? "Resources"}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getLinkHref(link.href)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {footerT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 tracking-tight">
              {footerT["company-heading"] ?? "Company"}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getLinkHref(link.href)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {footerT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            {footerT["copyright"] ?? "© 2024 hotcode.ai. All rights reserved."}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {APP_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}