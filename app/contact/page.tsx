"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t("contact.form.nameRequired");
    if (!formData.email.trim()) newErrors.email = t("contact.form.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t("contact.form.emailInvalid");
    if (!formData.subject.trim()) newErrors.subject = t("contact.form.subjectRequired");
    if (!formData.message.trim()) newErrors.message = t("contact.form.messageRequired");
    else if (formData.message.trim().length < 20)
      newErrors.message = t("contact.form.messageTooShort");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("submitting");
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("success");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const socialLinks = t.raw("contact.social") as { label: string; href: string; icon: string }[];

  const iconMap: Record<string, React.ReactNode> = {
    github: <Github className="h-5 w-5" aria-hidden="true" />,
    twitter: <Twitter className="h-5 w-5" aria-hidden="true" />,
    linkedin: <Linkedin className="h-5 w-5" aria-hidden="true" />,
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden pt-24 pb-16 text-center">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)",
            }}
          />
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {t("contact.hero.badge")}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
            className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            {t("contact.hero.title")}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.16 }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500"
          >
            {t("contact.hero.subtitle")}
          </motion.p>
        </section>
      </Reveal>

      {/* Two-column layout */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
                {formState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle className="h-8 w-8 text-emerald-600" aria-hidden="true" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      {t("contact.form.successTitle")}
                    </h2>
                    <p className="mb-8 max-w-sm text-gray-500">
                      {t("contact.form.successBody")}
                    </p>
                    <button
                      onClick={() => {
                        setFormState("idle");
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                    >
                      {t("contact.form.sendAnother")}
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="mb-1 text-xl font-bold text-gray-900">
                      {t("contact.form.heading")}
                    </h2>
                    <p className="mb-6 text-sm text-gray-500">{t("contact.form.subheading")}</p>

                    {formState === "error" && (
                      <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {t("contact.form.errorBanner")}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {/* Name + Email row */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                          >
                            {t("contact.form.nameLabel")}
                            <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("contact.form.namePlaceholder")}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/40 ${
                              errors.name
                                ? "border-red-300 bg-red-50 focus:border-red-400"
                                : "border-gray-200 bg-gray-50 focus:border-violet-400 focus:bg-white"
                            }`}
                          />
                          {errors.name && (
                            <p id="name-error" className="mt-1 text-xs text-red-600">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                          >
                            {t("contact.form.emailLabel")}
                            <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t("contact.form.emailPlaceholder")}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/40 ${
                              errors.email
                                ? "border-red-300 bg-red-50 focus:border-red-400"
                                : "border-gray-200 bg-gray-50 focus:border-violet-400 focus:bg-white"
                            }`}
                          />
                          {errors.email && (
                            <p id="email-error" className="mt-1 text-xs text-red-600">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                          {t("contact.form.subjectLabel")}
                          <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          aria-invalid={!!errors.subject}
                          aria-describedby={errors.subject ? "subject-error" : undefined}
                          className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/40 ${
                            errors.subject
                              ? "border-red-300 bg-red-50 focus:border-red-400"
                              : "border-gray-200 bg-gray-50 focus:border-violet-400 focus:bg-white"
                          }`}
                        >
                          <option value="">{t("contact.form.subjectPlaceholder")}</option>
                          <option value="general">{t("contact.form.subjectGeneral")}</option>
                          <option value="billing">{t("contact.form.subjectBilling")}</option>
                          <option value="technical">{t("contact.form.subjectTechnical")}</option>
                          <option value="feature">{t("contact.form.subjectFeature")}</option>
                          <option value="partnership">{t("contact.form.subjectPartnership")}</option>
                        </select>
                        {errors.subject && (
                          <p id="subject-error" className="mt-1 text-xs text-red-600">
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                          {t("contact.form.messageLabel")}
                          <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t("contact.form.messagePlaceholder")}
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          className={`w-full resize-none rounded-xl border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/40 ${
                            errors.message
                              ? "border-red-300 bg-red-50 focus:border-red-400"
                              : "border-gray-200 bg-gray-50 focus:border-violet-400 focus:bg-white"
                          }`}
                        />
                        {errors.message && (
                          <p id="message-error" className="mt-1 text-xs text-red-600">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        disabled={formState === "submitting"}
                        whileHover={{ scale: formState === "submitting" ? 1 : 1.02 }}
                        whileTap={{ scale: formState === "submitting" ? 1 : 0.98 }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {formState === "submitting" ? (
                          <>
                            <svg
                              className="h-4 w-4 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden="true"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            {t("contact.form.submitting")}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" aria-hidden="true" />
                            {t("contact.form.submit")}
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info sidebar */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Email card */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <Mail className="h-5 w-5 text-violet-600" aria-hidden="true" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900">
                  {t("contact.info.emailTitle")}
                </h3>
                <p className="mb-2 text-xs text-gray-500">{t("contact.info.emailDesc")}</p>
                <a
                  href="mailto:hello@hotcode.ai"
                  className="text-sm font-medium text-violet-600 transition-colors hover:text-violet-800"
                >
                  hello@hotcode.ai
                </a>
              </motion.div>

              {/* Response time card */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.08 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <Clock className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900">
                  {t("contact.info.responseTitle")}
                </h3>
                <p className="mb-2 text-xs text-gray-500">{t("contact.info.responseDesc")}</p>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {t("contact.info.responseBadge")}
                </span>
              </motion.div>

              {/* Social links card */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.16 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
              >
                <h3 className="mb-1 text-sm font-semibold text-gray-900">
                  {t("contact.info.socialTitle")}
                </h3>
                <p className="mb-4 text-xs text-gray-500">{t("contact.info.socialDesc")}</p>
                <div className="flex flex-col gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                    >
                      {iconMap[s.icon] ?? null}
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* FAQ nudge */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.24 }}
                className="rounded-2xl border border-violet-100 bg-violet-50 p-6"
              >
                <p className="mb-3 text-sm text-violet-800">
                  {t("contact.info.faqNudge")}
                </p>
                <a
                  href="/faq"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 transition-colors hover:text-violet-900"
                >
                  {t("contact.info.faqLink")}
                  <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}