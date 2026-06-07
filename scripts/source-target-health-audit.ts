import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type PublishPack = {
  items: Array<{ file: string; officialSourceTargets?: string[]; title: string }>;
};

type PublicGapDecisionPack = {
  items: Array<{ file: string; reviewPacket: { sourceTargets: string[] }; title: string }>;
};

type BroadFirstCoverageLaunchPack = {
  items: Array<{ cluster: string; file: string; sourceTargets: string[]; title: string }>;
};

type NextReviewSourcePack = {
  items: Array<{ file: string; officialSourceTargets: string[]; title: string }>;
};

type SourceReference = {
  file: string;
  label: string;
  scope: "broad-first-coverage" | "current-review" | "next-source-pack" | "public-gap-decision";
  title: string;
  url: string;
};

type UrlHealth = {
  error?: string;
  finalUrl?: string;
  ok: boolean;
  references: SourceReference[];
  status?: number;
  url: string;
};

const timeoutMs = Number(process.env.SOURCE_TARGET_HEALTH_TIMEOUT_MS || 8000);
const concurrency = Number(process.env.SOURCE_TARGET_HEALTH_CONCURRENCY || 8);

async function main() {
  const publishPack = readJson<PublishPack>("content/automation/publish-readiness-pack.json");
  const publicGapDecisionPack = readJson<PublicGapDecisionPack>("content/automation/public-coverage-gap-decision-pack.json");
  const nextReviewSourcePack = readJson<NextReviewSourcePack>("content/automation/next-review-source-pack.json");
  const broadFirstCoverageLaunchPack = readJson<BroadFirstCoverageLaunchPack>("content/automation/broad-first-coverage-launch-pack.json");

  const references = [
    ...publishPack.items.flatMap((item) => toReferences(item.file, item.title, item.officialSourceTargets || [], "current-review")),
    ...publicGapDecisionPack.items.flatMap((item) => toReferences(item.file, item.title, item.reviewPacket.sourceTargets || [], "public-gap-decision")),
    ...nextReviewSourcePack.items.flatMap((item) => toReferences(item.file, item.title, item.officialSourceTargets || [], "next-source-pack")),
    ...broadFirstCoverageLaunchPack.items.flatMap((item) => toReferences(item.file, item.title, item.sourceTargets || [], "broad-first-coverage")),
  ];
  const missingUrlTargets = references.filter((reference) => !reference.url);
  const referencesWithUrls = references.filter((reference) => reference.url);
  const byUrl = groupByUrl(referencesWithUrls);
  const urls = [...byUrl.keys()].sort();
  const checks = await mapWithConcurrency(urls, concurrency, async (url) => checkUrl(url, byUrl.get(url) || []));
  const reachableUrls = new Set(checks.filter((check) => check.ok).map((check) => check.url));
  const scopedFiles = [...new Set(referencesWithUrls.map((reference) => reference.file))].sort();
  const files = scopedFiles.map((file) => {
    const fileReferences = referencesWithUrls.filter((reference) => reference.file === file);
    const reachableSources = fileReferences.filter((reference) => reachableUrls.has(reference.url));
    return {
      file,
      reachableSources: reachableSources.length,
      scopes: [...new Set(fileReferences.map((reference) => reference.scope))].sort(),
      sourceTargets: fileReferences.length,
      title: fileReferences[0]?.title || "",
      urls: fileReferences.map((reference) => reference.url),
    };
  });
  const filesWithoutReachableSource = files.filter((file) => file.reachableSources === 0);
  const failedChecks = checks.filter((check) => !check.ok);
  const redirectedChecks = checks.filter((check) => check.ok && check.finalUrl && normalizeUrl(check.finalUrl) !== normalizeUrl(check.url));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only source target health audit. It checks source URLs for human fact review and does not edit articles, status, noindex, review, or publishing state.",
      timeoutMs,
    },
    summary: {
      checkedUrls: checks.length,
      broadFirstCoverageFiles: new Set(referencesWithUrls.filter((reference) => reference.scope === "broad-first-coverage").map((reference) => reference.file)).size,
      currentReviewFiles: new Set(referencesWithUrls.filter((reference) => reference.scope === "current-review").map((reference) => reference.file)).size,
      failedUrls: failedChecks.length,
      filesCovered: files.length,
      filesWithReachableSource: files.filter((file) => file.reachableSources > 0).length,
      filesWithoutReachableSource: filesWithoutReachableSource.length,
      missingUrlTargets: missingUrlTargets.length,
      nextSourcePackFiles: new Set(referencesWithUrls.filter((reference) => reference.scope === "next-source-pack").map((reference) => reference.file)).size,
      okUrls: checks.filter((check) => check.ok).length,
      publicGapDecisionFiles: new Set(referencesWithUrls.filter((reference) => reference.scope === "public-gap-decision").map((reference) => reference.file)).size,
      redirectedUrls: redirectedChecks.length,
      sourceReferences: referencesWithUrls.length,
      uniqueUrls: urls.length,
    },
    missingUrlTargets,
    filesWithoutReachableSource,
    failedChecks,
    redirectedChecks,
    files,
    checks,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "source-target-health-audit.json");
  const mdTarget = path.join(process.cwd(), "docs", "source-target-health-audit.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: filesWithoutReachableSource.length === 0 && missingUrlTargets.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
}

function toReferences(file: string, title: string, targets: string[], scope: SourceReference["scope"]) {
  return targets.map((target) => ({
    file,
    label: target,
    scope,
    title,
    url: extractUrl(target),
  }));
}

function extractUrl(value: string) {
  const match = value.match(/https?:\/\/[^\s)>,]+/);
  return match ? match[0].replace(/[.,;:]+$/, "") : "";
}

function groupByUrl(references: SourceReference[]) {
  const byUrl = new Map<string, SourceReference[]>();
  for (const reference of references) {
    const items = byUrl.get(reference.url) || [];
    items.push(reference);
    byUrl.set(reference.url, items);
  }
  return byUrl;
}

async function checkUrl(url: string, references: SourceReference[]): Promise<UrlHealth> {
  const result = await fetchWithTimeout(url);
  if (result.ok) return { finalUrl: result.finalUrl, ok: true, references, status: result.status, url };

  const retry = await fetchWithTimeout(url);
  return {
    error: retry.error || result.error,
    finalUrl: retry.finalUrl || result.finalUrl,
    ok: retry.ok,
    references,
    status: retry.status || result.status,
    url,
  };
}

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "ai-jiedan-lab-source-target-health-audit" },
      redirect: "follow",
      signal: controller.signal,
    });
    return {
      finalUrl: response.url,
      ok: response.status >= 200 && response.status < 500,
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.name : String(error),
      ok: false,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, mapper: (item: T) => Promise<R>) {
  const results: R[] = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function normalizeUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  checks: UrlHealth[];
  failedChecks: UrlHealth[];
  files: Array<{ file: string; reachableSources: number; scopes: string[]; sourceTargets: number; title: string; urls: string[] }>;
  filesWithoutReachableSource: Array<{ file: string; reachableSources: number; scopes: string[]; sourceTargets: number; title: string; urls: string[] }>;
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; timeoutMs: number };
  missingUrlTargets: SourceReference[];
  redirectedChecks: UrlHealth[];
  summary: Record<string, number>;
}) {
  const lines = [
    "# Source Target Health Audit",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It verifies official source URLs used by review and public-gap candidates before any human approval step.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Timeout ms: ${payload.guardrails.timeoutMs}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Files Without Reachable Source",
    "",
    ...fileTable(payload.filesWithoutReachableSource),
    "",
    "## Failed URL Checks",
    "",
    ...urlTable(payload.failedChecks),
    "",
    "## Redirected URLs",
    "",
    ...urlTable(payload.redirectedChecks),
    "",
    "## File Coverage",
    "",
    ...fileTable(payload.files),
    "",
    "## All URL Checks",
    "",
    ...urlTable(payload.checks),
    "",
  ];
  return lines.join("\n");
}

function fileTable(items: Array<{ file: string; reachableSources: number; scopes: string[]; sourceTargets: number; title: string; urls: string[] }>) {
  if (!items.length) return ["- none"];
  return [
    "| Reachable | Sources | Scopes | Title | File | URLs |",
    "| --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => `| ${item.reachableSources} | ${item.sourceTargets} | ${item.scopes.join(", ")} | ${item.title} | ${item.file} | ${item.urls.join("<br>")} |`),
  ];
}

function urlTable(items: UrlHealth[]) {
  if (!items.length) return ["- none"];
  return [
    "| OK | Status | URL | Final URL | References | Error |",
    "| --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.ok} | ${item.status || ""} | ${item.url} | ${item.finalUrl || ""} | ${item.references.length} | ${item.error || ""} |`,
    ),
  ];
}

void main();
