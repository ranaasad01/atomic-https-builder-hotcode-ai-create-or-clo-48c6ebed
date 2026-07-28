"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Bell, Eye, EyeOff, Check, AlertCircle, Code2 as Github, Trash2, Save, Settings, Shield, CreditCard, Globe } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "account", label: "Account & Security", icon: Shield },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "integrations", label: "Integrations", icon: Globe },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function ProfileSection() {
  const [name, setName] = useState("Alex Chen");
  const [email, setEmail] = useState("alex@example.com");
  const [bio, setBio] = useState("Building the future with AI-powered tools.");
  const [website, setWebsite] = useState("https://alexchen.dev");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Profile</h2>
        <p className="text-sm text-gray-500">Manage your public profile information.</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-2xl font-bold select-none">
          AC
        </div>
        <div>
          <button className="text-sm font-medium text-violet-600 hover:text-violet-700 border border-violet-200 rounded-lg px-4 py-2 transition-colors">
            Change avatar
          </button>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email-profile">
            Email address
          </label>
          <input
            id="email-profile"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition resize-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="website">
            Website
          </label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
            saved
              ? "bg-emerald-500 text-white"
              : "bg-violet-600 hover:bg-violet-700 text-white"
          )}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

function AccountSection() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  const handlePasswordSave = () => {
    if (newPw.length < 8) {
      setPwError("Password must be at least 8 characters.");
      return;
    }
    if (newPw !== confirmPw) {
      setPwError("Passwords do not match.");
      return;
    }
    setPwError("");
    setPwSaved(true);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => setPwSaved(false), 2500);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Account & Security</h2>
        <p className="text-sm text-gray-500">Manage your password and account security settings.</p>
      </div>

      <div className="border border-gray-100 rounded-2xl p-6 space-y-5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <Lock className="w-4 h-4 text-violet-500" /> Change password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="current-pw">
              Current password
            </label>
            <div className="relative">
              <input
                id="current-pw"
                type={showCurrent ? "text" : "password"}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle current password visibility"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="new-pw">
              New password
            </label>
            <div className="relative">
              <input
                id="new-pw"
                type={showNew ? "text" : "password"}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition pr-10"
                placeholder="Min. 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle new password visibility"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="confirm-pw">
              Confirm new password
            </label>
            <input
              id="confirm-pw"
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>
          {pwError && (
            <p className="flex items-center gap-1.5 text-sm text-red-500">
              <AlertCircle className="w-4 h-4" /> {pwError}
            </p>
          )}
          <button
            onClick={handlePasswordSave}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
              pwSaved
                ? "bg-emerald-500 text-white"
                : "bg-violet-600 hover:bg-violet-700 text-white"
            )}
          >
            {pwSaved ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            {pwSaved ? "Password updated!" : "Update password"}
          </button>
        </div>
      </div>

      <div className="border border-red-100 rounded-2xl p-6 space-y-4 bg-red-50">
        <h3 className="text-base font-semibold text-red-700 flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Danger zone
        </h3>
        <p className="text-sm text-red-600">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="px-5 py-2.5 rounded-xl text-sm font-medium border border-red-300 text-red-600 hover:bg-red-100 transition-colors">
          Delete my account
        </button>
      </div>
    </div>
  );
}

const NOTIFICATION_SETTINGS = [
  {
    group: "Product updates",
    items: [
      { key: "new_features", label: "New features", description: "Get notified when we ship new features." },
      { key: "changelog", label: "Changelog", description: "Weekly digest of what changed in Builder." },
    ],
  },
  {
    group: "Account activity",
    items: [
      { key: "credits_low", label: "Credits running low", description: "Alert when you have fewer than 10 credits." },
      { key: "generation_done", label: "Generation complete", description: "Notify when your site finishes building." },
      { key: "export_ready", label: "Export ready", description: "Notify when a code export is ready to download." },
    ],
  },
  {
    group: "Marketing",
    items: [
      { key: "tips", label: "Tips & tutorials", description: "Occasional tips on getting the most from Builder." },
      { key: "promotions", label: "Promotions", description: "Special offers and credit top-up deals." },
    ],
  },
];

function NotificationsSection() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    new_features: true,
    changelog: false,
    credits_low: true,
    generation_done: true,
    export_ready: true,
    tips: false,
    promotions: false,
  });

  const toggle = (key: string) => setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Notifications</h2>
        <p className="text-sm text-gray-500">Choose which emails and alerts you receive.</p>
      </div>

      {NOTIFICATION_SETTINGS.map((group) => (
        <div key={group.group} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700">{group.group}</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={enabled[item.key]}
                  onClick={() => toggle(item.key)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                    enabled[item.key] ? "bg-violet-600" : "bg-gray-200"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
                      enabled[item.key] ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const CREDIT_HISTORY = [
  { date: "Jun 12, 2025", description: "Pro pack purchase", amount: "+250", type: "credit" },
  { date: "Jun 11, 2025", description: "Site generation", amount: "-1", type: "debit" },
  { date: "Jun 10, 2025", description: "Site generation", amount: "-1", type: "debit" },
  { date: "Jun 8, 2025", description: "Starter pack purchase", amount: "+100", type: "credit" },
  { date: "Jun 1, 2025", description: "Free credits (monthly)", amount: "+50", type: "credit" },
];

function BillingSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Billing</h2>
        <p className="text-sm text-gray-500">Your current credits and purchase history.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Available credits", value: "398", color: "text-violet-600" },
          { label: "Credits used", value: "52", color: "text-gray-700" },
          { label: "Total purchased", value: "450", color: "text-gray-700" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-gray-100 rounded-2xl p-5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
          >
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className={cn("text-3xl font-bold", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Credit history</h3>
          <a href="/pricing" className="text-xs text-violet-600 hover:underline font-medium">
            Buy more credits
          </a>
        </div>
        <div className="divide-y divide-gray-100">
          {CREDIT_HISTORY.map((row, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3.5">
              <div>
                <p className="text-sm font-medium text-gray-800">{row.description}</p>
                <p className="text-xs text-gray-400">{row.date}</p>
              </div>
              <span
                className={cn(
                  "text-sm font-semibold",
                  row.type === "credit" ? "text-emerald-600" : "text-red-500"
                )}
              >
                {row.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const INTEGRATIONS = [
  {
    key: "github",
    name: "GitHub",
    description: "Push generated code directly to a GitHub repository.",
    icon: Github,
    connected: true,
    connectedAs: "alexchen-dev",
    color: "bg-gray-900",
  },
  {
    key: "vercel",
    name: "Vercel",
    description: "Deploy your generated sites to Vercel with one click.",
    icon: Globe,
    connected: false,
    connectedAs: "",
    color: "bg-black",
  },
  {
    key: "netlify",
    name: "Netlify",
    description: "Deploy and host your sites on Netlify instantly.",
    icon: Globe,
    connected: false,
    connectedAs: "",
    color: "bg-teal-600",
  },
];

function IntegrationsSection() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);

  const toggle = (key: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.key === key ? { ...i, connected: !i.connected, connectedAs: !i.connected ? "demo-user" : "" } : i
      )
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Integrations</h2>
        <p className="text-sm text-gray-500">Connect external services to enhance your workflow.</p>
      </div>

      <div className="space-y-4">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div
              key={integration.key}
              className="border border-gray-100 rounded-2xl p-5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] flex items-center gap-4"
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", integration.color)}>
                <Icon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{integration.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{integration.description}</p>
                {integration.connected && integration.connectedAs && (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Connected as @{integration.connectedAs}
                  </p>
                )}
              </div>
              <button
                onClick={() => toggle(integration.key)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap",
                  integration.connected
                    ? "border-gray-200 text-gray-600 hover:bg-gray-50"
                    : "border-violet-200 text-violet-600 hover:bg-violet-50"
                )}
              >
                {integration.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "account":
        return <AccountSection />;
      case "notifications":
        return <NotificationsSection />;
      case "billing":
        return <BillingSection />;
      case "integrations":
        return <IntegrationsSection />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7fb] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Settings className="w-5 h-5 text-violet-500" aria-hidden="true" />
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            </div>
            <p className="text-sm text-gray-500">Manage your account, preferences, and integrations.</p>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <Reveal className="md:w-56 shrink-0">
            <nav className="bg-white border border-gray-100 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left",
                      isActive
                        ? "bg-violet-50 text-violet-700 border-r-2 border-violet-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </Reveal>

          {/* Content */}
          <Reveal className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
            >
              {renderContent()}
            </motion.div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}