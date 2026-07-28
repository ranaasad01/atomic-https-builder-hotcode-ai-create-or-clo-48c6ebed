"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Copy, Check, ChevronDown, ChevronRight, Terminal, FileCode, Sparkles, Lock, ArrowRight, AlertCircle, Activity, Clock, Star } from 'lucide-react';
import Link from "next/link";

// ─── Inline mock data ────────────────────────────────────────────────────────

const API_BASE = "https://api.hotcode.ai/v1";

interface Endpoint {
  method: "GET" | "POST" | "DELETE" | "PATCH";
  path: string;
  summary: string;
  description: string;
  auth: boolean;
  requestBody?: { lang: string; code: string };
  response: { lang: string; code: string };
  params?: { name: string; type: string; required: boolean; description: string }[];
}

const ENDPOINT_GROUPS: { group: string; icon: React.ReactNode; endpoints: Endpoint[] }[] = [
  {
    group: "Generation",
    icon: <Sparkles className="h-4 w-4" />,
    endpoints: [
      {
        method: "POST",
        path: "/generate",
        summary: "Generate a website",
        description:
          "Submit a natural-language prompt and receive a fully generated Next.js 14 website. The response streams build events and returns the final project bundle URL.",
        auth: true,
        requestBody: {
          lang: "json",
          code: `{
  "prompt": "A SaaS landing page for a project management tool called Taskly",
  "style": "minimal-editorial",
  "pages": ["home", "pricing", "contact"],
  "motion_intensity": 5,
  "design_variance": 6
}`,
        },
        response: {
          lang: "json",
          code: `{
  "id": "gen_01HXYZ9ABC",
  "status": "complete",
  "pages_generated": 3,
  "build_time_ms": 47200,
  "preview_url": "https://preview.hotcode.ai/gen_01HXYZ9ABC",
  "download_url": "https://cdn.hotcode.ai/gen_01HXYZ9ABC/source.zip",
  "credits_used": 3
}`,
        },
        params: [
          { name: "prompt", type: "string", required: true, description: "Plain-English description of the website you want to build." },
          { name: "style", type: "string", required: false, description: "Aesthetic preset: minimal-editorial | premium-soft | luxury-dark | glass-futuristic | bold-brutalist | playful-vibrant | corporate-clean." },
          { name: "pages", type: "string[]", required: false, description: "List of page slugs to generate. Defaults to [\"home\"]." },
          { name: "motion_intensity", type: "number (1–10)", required: false, description: "Controls animation richness. 1 = subtle, 10 = choreographed." },
          { name: "design_variance", type: "number (1–10)", required: false, description: "Controls layout risk. 1 = conventional, 10 = editorial/asymmetric." },
        ],
      },
      {
        method: "GET",
        path: "/generate/{id}",
        summary: "Get generation status",
        description: "Poll the status of an in-progress or completed generation job.",
        auth: true,
        params: [
          { name: "id", type: "string", required: true, description: "The generation ID returned from POST /generate." },
        ],
        response: {
          lang: "json",
          code: `{
  "id": "gen_01HXYZ9ABC",
  "status": "building",
  "progress": 62,
  "current_step": "Generating /pricing page",
  "pages_generated": 1,
  "build_time_ms": 29100
}`,
        },
      },
    ],
  },
  {
    group: "Projects",
    icon: <FileCode className="h-4 w-4" />,
    endpoints: [
      {
        method: "GET",
        path: "/projects",
        summary: "List projects",
        description: "Returns a paginated list of all projects belonging to the authenticated user.",
        auth: true,
        params: [
          { name: "limit", type: "number", required: false, description: "Number of results per page. Default 20, max 100." },
          { name: "offset", type: "number", required: false, description: "Pagination offset. Default 0." },
        ],
        response: {
          lang: "json",
          code: `{
  "data": [
    {
      "id": "proj_01HABC123",
      "name": "Taskly Landing",
      "status": "complete",
      "preview_url": "https://preview.hotcode.ai/proj_01HABC123",
      "created_at": "2024-11-14T10:22:00Z",
      "credits_used": 3
    }
  ],
  "total": 42,
  "limit": 20,
  "offset": 0
}`,
        },
      },
      {
        method: "DELETE",
        path: "/projects/{id}",
        summary: "Delete a project",
        description: "Permanently deletes a project and all associated assets. This action cannot be undone.",
        auth: true,
        params: [
          { name: "id", type: "string", required: true, description: "The project ID to delete." },
        ],
        response: {
          lang: "json",
          code: `{
  "deleted": true,
  "id": "proj_01HABC123"
}`,
        },
      },
    ],
  },
  {
    group: "Credits",
    icon: <Star className="h-4 w-4" />,
    endpoints: [
      {
        method: "GET",
        path: "/credits",
        summary: "Get credit balance",
        description: "Returns the current credit balance and usage history for the authenticated account.",
        auth: true,
        response: {
          lang: "json",
          code: `{
  "balance": 247,
  "used_this_month": 53,
  "plan": "pro",
  "next_reset": null
}`,
        },
      },
    ],
  },
];

const ERROR_CODES = [
  { code: 400, name: "Bad Request", description: "The request body is malformed or missing required fields." },
  { code: 401, name: "Unauthorized", description: "No API key provided or the key is invalid." },
  { code: 402, name: "Insufficient Credits", description: "Your account does not have enough credits to complete this generation." },
  { code: 404, name: "Not Found", description: "The requested resource does not exist." },
  { code: 429, name: "Rate Limited", description: "You have exceeded the rate limit. Retry after the period indicated in the Retry-After header." },
  { code: 500, name: "Server Error", description: "An unexpected error occurred on our side. Please try again or contact support." },
];

const SDK_EXAMPLES = [
  {
    lang: "TypeScript",
    icon: "TS",
    color: "bg-blue-600",
    code: `import { HotcodeClient } from "@hotcode/sdk";

const client = new HotcodeClient({ apiKey: process.env.HOTCODE_API_KEY });

const result = await client.generate({
  prompt: "A SaaS landing page for Taskly",
  style: "minimal-editorial",
  pages: ["home", "pricing"],
});

console.log(result.preview_url);`,
  },
  {
    lang: "Python",
    icon: "PY",
    color: "bg-yellow-500",
    code: `import hotcode

client = hotcode.Client(api_key=os.environ["HOTCODE_API_KEY"])

result = client.generate(
    prompt="A SaaS landing page for Taskly",
    style="minimal-editorial",
    pages=["home", "pricing"],
)

print(result.preview_url)`,
  },
  {
    lang: "cURL",
    icon: "$_",
    color: "bg-gray-700",
    code: `curl -X POST https://api.hotcode.ai/v1/generate \\
  -H "Authorization: Bearer $HOTCODE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A SaaS landing page for Taskly",
    "style": "minimal-editorial",
    "pages": ["home", "pricing"]
  }'`,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function methodBadge(method: string) {
  const map: Record<string, string> = {
    GET: "bg-emerald-100 text-emerald-700 border-emerald-200",
    POST: "bg-violet-100 text-violet-700 border-violet-200",
    DELETE: "bg-red-100 text-red-700 border-red-200",
    PATCH: "bg-orange-100 text-orange-700 border-orange-200",
  };
  return map[method] ?? "bg-gray-100 text-gray-700 border-gray-200";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <div className="relative rounded-xl bg-gray-950 border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-gray-200 font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors duration-200"
        aria-expanded={open}
      >
        <span
          className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-bold font-mono tracking-wide ${methodBadge(endpoint.method)}`}
        >
          {endpoint.method}
        </span>
        <span className="font-mono text-sm text-gray-800 flex-1">{endpoint.path}</span>
        <span className="text-sm text-gray-500 hidden sm:block">{endpoint.summary}</span>
        {endpoint.auth && (
          <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
            <Lock className="h-3 w-3" /> Auth
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 py-5 space-y-5 bg-gray-50/50">
          <p className="text-sm text-gray-600 leading-relaxed">{endpoint.description}</p>

          {endpoint.params && endpoint.params.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Parameters</h4>
              <div className="rounded-lg border border-gray-200 overflow-hidden bg-white divide-y divide-gray-100">
                {endpoint.params.map((p) => (
                  <div key={p.name} className="flex flex-wrap items-start gap-2 px-4 py-3">
                    <code className="text-sm font-mono text-violet-700 font-semibold">{p.name}</code>
                    <span className="text-xs bg-gray-100 text-gray-500 rounded px-1.5 py-0.5 font-mono">{p.type}</span>
                    {p.required && (
                      <span className="text-xs bg-red-50 text-red-600 border border-red-200 rounded px-1.5 py-0.5">required</span>
                    )}
                    <span className="text-sm text-gray-500 flex-1 min-w-[200px]">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {endpoint.requestBody && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Request Body</h4>
              <CodeBlock code={endpoint.requestBody.code} lang={endpoint.requestBody.lang} />
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Response</h4>
            <CodeBlock code={endpoint.response.code} lang={endpoint.response.lang} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocsApiPage() {
  const [activeSdk, setActiveSdk] = useState(0);

  return (
    <main className="min-h-screen bg-[#f7f7fb] pb-24">
      {/* Hero */}
      <Reveal>
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                <Terminal className="h-3.5 w-3.5" />
                REST API
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <Activity className="h-3.5 w-3.5" />
                v1 — Stable
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-balance mb-4">
              API Reference
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mb-8">
              Integrate Builder directly into your workflow. Generate production-ready websites programmatically, manage projects, and track credits with a simple REST API.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors duration-200"
              >
                Try the Builder <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#authentication"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Authentication <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="max-w-5xl mx-auto px-6 space-y-16 pt-14">

        {/* Base URL */}
        <Reveal>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Base URL</h2>
            <div className="rounded-xl bg-gray-950 border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">endpoint</span>
                <CopyButton text={API_BASE} />
              </div>
              <pre className="px-4 py-4 font-mono text-sm text-violet-300">{API_BASE}</pre>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              All requests must be made over HTTPS. HTTP requests will be rejected.
            </p>
          </section>
        </Reveal>

        {/* Authentication */}
        <Reveal>
          <section id="authentication">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              All API endpoints require a Bearer token. Pass your API key in the{" "}
              <code className="bg-gray-100 text-violet-700 rounded px-1.5 py-0.5 text-xs font-mono">Authorization</code>{" "}
              header with every request. You can find your key in{" "}
              <Link href="/settings" className="text-violet-600 hover:underline">
                Settings
              </Link>
              .
            </p>
            <CodeBlock
              lang="http"
              code={`Authorization: Bearer hc_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}
            />
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800">
                Keep your API key secret. Never expose it in client-side code or public repositories. Rotate it immediately from Settings if it is compromised.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Rate Limits */}
        <Reveal>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Rate Limits</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Requests are rate-limited per API key. Limits vary by plan. When exceeded, the API returns a{" "}
              <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 text-xs font-mono">429</code> status with a{" "}
              <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 text-xs font-mono">Retry-After</code> header.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { plan: "Free", limit: "10 req / min", icon: <Clock className="h-4 w-4 text-emerald-600" />, bg: "bg-emerald-50 border-emerald-200" },
                { plan: "Starter / Pro", limit: "60 req / min", icon: <Clock className="h-4 w-4 text-violet-600" />, bg: "bg-violet-50 border-violet-200" },
                { plan: "Studio", limit: "200 req / min", icon: <Clock className="h-4 w-4 text-orange-600" />, bg: "bg-orange-50 border-orange-200" },
              ].map((r) => (
                <div key={r.plan} className={`rounded-xl border px-5 py-4 ${r.bg}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {r.icon}
                    <span className="text-sm font-semibold text-gray-800">{r.plan}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 font-mono">{r.limit}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* SDK Quick-start */}
        <Reveal>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Quick Start</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Official SDKs are available for TypeScript and Python. You can also call the API directly with any HTTP client.
            </p>
            <div className="flex gap-2 mb-4 flex-wrap">
              {SDK_EXAMPLES.map((s, i) => (
                <button
                  key={s.lang}
                  onClick={() => setActiveSdk(i)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border transition-all duration-200 ${
                    activeSdk === i
                      ? "bg-violet-600 text-white border-violet-600"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className={`inline-flex items-center justify-center rounded text-white text-[10px] font-bold px-1.5 py-0.5 ${s.color}`}>
                    {s.icon}
                  </span>
                  {s.lang}
                </button>
              ))}
            </div>
            <CodeBlock code={SDK_EXAMPLES[activeSdk].code} lang={SDK_EXAMPLES[activeSdk].lang} />
          </section>
        </Reveal>

        {/* Endpoints */}
        <Reveal>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Endpoints</h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-10"
            >
              {ENDPOINT_GROUPS.map((group) => (
                <motion.div key={group.group} variants={fadeInUp}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center h-7 w-7 rounded-lg bg-violet-100 text-violet-600">
                      {group.icon}
                    </span>
                    <h3 className="text-base font-bold text-gray-800">{group.group}</h3>
                  </div>
                  <div className="space-y-3">
                    {group.endpoints.map((ep) => (
                      <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </Reveal>

        {/* Error Codes */}
        <Reveal>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Error Codes</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              The API uses standard HTTP status codes. Error responses include a JSON body with a{" "}
              <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 text-xs font-mono">message</code> field.
            </p>
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] divide-y divide-gray-100">
              {ERROR_CODES.map((e) => (
                <div key={e.code} className="flex flex-wrap items-start gap-4 px-5 py-4">
                  <span
                    className={`font-mono text-sm font-bold w-10 shrink-0 ${
                      e.code >= 500
                        ? "text-red-600"
                        : e.code >= 400
                        ? "text-orange-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {e.code}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 w-40 shrink-0">{e.name}</span>
                  <span className="text-sm text-gray-500 flex-1">{e.description}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <CodeBlock
                lang="json"
                code={`{
  "error": {
    "code": 402,
    "message": "Insufficient credits. Your balance is 0. Top up at https://builder.hotcode.ai/pricing."
  }
}`}
              />
            </div>
          </section>
        </Reveal>

        {/* Pagination */}
        <Reveal>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pagination</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              List endpoints support cursor-free offset pagination via{" "}
              <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 text-xs font-mono">limit</code> and{" "}
              <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 text-xs font-mono">offset</code> query parameters.
              Responses include <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 text-xs font-mono">total</code>,{" "}
              <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 text-xs font-mono">limit</code>, and{" "}
              <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 text-xs font-mono">offset</code> so you can build your own pagination UI.
            </p>
            <CodeBlock
              lang="http"
              code={`GET /v1/projects?limit=20&offset=40`}
            />
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <section className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 px-8 py-12 text-center text-white shadow-[0_8px_32px_-8px_rgba(124,58,237,0.5)]">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              Start for free
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Ready to build with the API?</h2>
            <p className="text-white/70 text-base mb-8 max-w-md mx-auto leading-relaxed">
              Get your API key from Settings and start generating production-ready websites in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors duration-200"
              >
                Get API Key <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-200"
              >
                View Pricing
              </Link>
            </div>
          </section>
        </Reveal>

      </div>
    </main>
  );
}