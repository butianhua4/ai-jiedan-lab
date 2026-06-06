import fs from "fs";
import path from "path";
import { site } from "../data/site";
import { rel } from "./content-utils";

type Check = {
  detail?: string;
  name: string;
  ok: boolean;
};

const base = normalizeBase(readArg("url") || readArg("base") || site.url);

async function main() {
  const packageJson = readJson<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>("package.json");
  const dependencies = { ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) };
  const sourceFiles = [
    "app/layout.tsx",
    "app/privacy/page.tsx",
    "data/site.ts",
    "README.md",
    "docs/search-console-setup.md",
    "docs/seo-searchability-audit.md",
  ].filter((file) => fs.existsSync(path.join(process.cwd(), file)));
  const sourceText = sourceFiles.map((file) => fs.readFileSync(path.join(process.cwd(), file), "utf8")).join("\n");
  const live = await fetchLiveEvidence();
  const envEvidence = {
    googleAnalyticsId: Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID),
    googleSiteVerification: Boolean(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
    vercelAnalyticsId: Boolean(process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID),
  };
  const codeEvidence = {
    googleAnalyticsDependency: Boolean(dependencies["@next/third-parties"] || dependencies["gtag.js"]),
    googleAnalyticsSnippet: /googletagmanager\.com\/gtag|gtag\(|G-[A-Z0-9]+/.test(sourceText),
    googleSiteVerificationMeta: sourceText.includes("google-site-verification") || sourceText.includes("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"),
    vercelAnalyticsDependency: Boolean(dependencies["@vercel/analytics"]),
    vercelAnalyticsSnippet: /@vercel\/analytics|Vercel Analytics|_vercel\/insights/.test(sourceText),
  };
  const liveEvidence = {
    fetched: live.fetched,
    googleAnalyticsSnippet: /googletagmanager\.com\/gtag|google-analytics\.com|gtag\(|G-[A-Z0-9]+/.test(live.html),
    googleSiteVerificationMeta: live.html.includes("google-site-verification"),
    status: live.status,
    vercelAnalyticsSnippet: /_vercel\/insights|va\.vercel-scripts\.com|vercel-insights/.test(live.html),
  };
  const measuredTrafficSources = [
    envEvidence.googleAnalyticsId || codeEvidence.googleAnalyticsSnippet || liveEvidence.googleAnalyticsSnippet ? "google-analytics" : "",
    codeEvidence.vercelAnalyticsDependency || codeEvidence.vercelAnalyticsSnippet || liveEvidence.vercelAnalyticsSnippet ? "vercel-analytics" : "",
  ].filter(Boolean);
  const searchConsoleVerificationEvidence = envEvidence.googleSiteVerification || liveEvidence.googleSiteVerificationMeta;
  const claimableMetrics = 0;
  const canClaimTraffic = measuredTrafficSources.length > 0 && claimableMetrics > 0;
  const checks: Check[] = [
    {
      name: "live homepage fetched",
      ok: live.fetched && live.status === 200,
      detail: live.fetched ? `${live.status}` : live.error || "not fetched",
    },
    {
      name: "traffic data is not claimed without measured source",
      ok: !canClaimTraffic && claimableMetrics === 0,
      detail: `measuredTrafficSources=${measuredTrafficSources.length}, claimableMetrics=${claimableMetrics}`,
    },
    {
      name: "search console status is evidence-based",
      ok: true,
      detail: searchConsoleVerificationEvidence
        ? "verification evidence exists, but this audit still has no Search Console clicks/impressions API data"
        : "no verification evidence detected in env or live HTML",
    },
    {
      name: "privacy page mentions analytics possibility",
      ok: sourceText.includes("Google Analytics") || sourceText.includes("Analytics"),
      detail: "privacy notice should be reviewed before adding tracking scripts",
    },
  ];
  const failed = checks.filter((check) => !check.ok);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoPublish: false,
      note: "This audit checks evidence for traffic measurement. It does not claim visits, clicks, impressions, rankings, or Search Console performance data.",
    },
    base,
    summary: {
      canClaimTraffic,
      claimableMetrics,
      failedChecks: failed.length,
      measuredTrafficSources: measuredTrafficSources.length,
      searchConsoleVerificationEvidence,
      trafficDataAvailable: canClaimTraffic,
    },
    measuredTrafficSources,
    envEvidence,
    codeEvidence,
    liveEvidence,
    checks,
    nextActions: buildNextActions(measuredTrafficSources.length, searchConsoleVerificationEvidence),
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "traffic-evidence-audit.json");
  const mdTarget = path.join(process.cwd(), "docs", "traffic-evidence-audit.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: failed.length === 0, trafficDataAvailable: canClaimTraffic, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
  if (failed.length) process.exitCode = 1;
}

async function fetchLiveEvidence() {
  try {
    const response = await fetch(base);
    return {
      error: "",
      fetched: true,
      html: await response.text(),
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
      fetched: false,
      html: "",
      status: 0,
    };
  }
}

function buildNextActions(measuredTrafficSourceCount: number, searchConsoleVerificationEvidence: boolean) {
  if (measuredTrafficSourceCount > 0) {
    return [
      "Connect an authenticated export/API before reporting visits, clicks, impressions, or conversion metrics.",
      "Keep public reports separate from measured traffic until metrics are imported into content/automation.",
    ];
  }

  return [
    "Do not claim real traffic yet; current automation only proves the site is reachable and index surfaces are clean.",
    searchConsoleVerificationEvidence
      ? "If Search Console is verified, export clicks/impressions manually or add an authenticated API workflow before reporting traffic."
      : "Add Search Console verification evidence before treating search performance as measurable.",
    "Add Analytics or Vercel Web Analytics only after privacy notice and tracking purpose are confirmed.",
  ];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function normalizeBase(value: string) {
  return value.replace(/\/+$/, "");
}

function readArg(name: string) {
  const prefix = `--${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match?.slice(prefix.length);
}

function toMarkdown(payload: {
  base: string;
  checks: Check[];
  codeEvidence: Record<string, boolean>;
  envEvidence: Record<string, boolean>;
  generatedAt: string;
  guardrails: { autoPublish: boolean; note: string };
  liveEvidence: Record<string, boolean | number>;
  measuredTrafficSources: string[];
  nextActions: string[];
  summary: Record<string, boolean | number>;
}) {
  const lines = [
    "# Traffic Evidence Audit",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report separates live-site health from measured traffic. It does not claim visits, clicks, impressions, rankings, or revenue.",
    "",
    "## Guardrails",
    "",
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    `- Base: ${payload.base}`,
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    `- Measured traffic sources: ${payload.measuredTrafficSources.length ? payload.measuredTrafficSources.join(", ") : "none"}`,
    "",
    "## Evidence",
    "",
    "Environment:",
    "",
    ...Object.entries(payload.envEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "Code:",
    "",
    ...Object.entries(payload.codeEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "Live HTML:",
    "",
    ...Object.entries(payload.liveEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Checks",
    "",
    "| Check | Status | Detail |",
    "| --- | --- | --- |",
    ...payload.checks.map((check) => `| ${check.name} | ${check.ok ? "PASS" : "FAIL"} | ${check.detail || ""} |`),
    "",
    "## Next Actions",
    "",
    ...payload.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

void main();
