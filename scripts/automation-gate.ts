import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";

type GateCheck = {
  detail?: string;
  name: string;
  ok: boolean;
};

async function main() {
  const reviewQueue = readJson<{ guardrails: { autoPublish: boolean }; recommendedToday: Array<{ cluster: string; file: string }> }>(
    "content/automation/review-candidates.json",
  );
  const publishPack = readJson<{ guardrails: { autoPublish: boolean }; items: Array<{ file: string }> }>(
    "content/automation/publish-readiness-pack.json",
  );
  const seo = readJson<{ ok: boolean; leakedDraftOrReview: string[]; nonPublishedWithNoindexFalse: string[]; publishedButNoindexed: string[] }>(
    "content/automation/seo-check.json",
  );
  const searchability = readJson<{ failedItems: unknown[]; score: number }>("content/automation/searchability-check.json");
  const sanitize = readJson<{ changedFiles: number; totalReplacements: number }>("content/automation/draft-guardrail-sanitize.json");
  const opportunityMap = readJson<{ totals: { reviewReadyDrafts: number } }>("content/automation/seo-opportunity-map.json");
  const projectStatus = readJson<{ articles: { publicPublished: number; publishableNow: unknown[] } }>("content/automation/project-status.json");
  const articles = (await articleFiles()).map(readArticle);

  const reviewFiles = reviewQueue.recommendedToday.map((item) => item.file);
  const packFiles = publishPack.items.map((item) => item.file);
  const clusters = reviewQueue.recommendedToday.map((item) => item.cluster);
  const repeatedClusters = clusters.filter((cluster, index) => clusters.indexOf(cluster) !== index);
  const nonPublishedIndexed = articles
    .filter((article) => article.data.status !== "published" && article.data.noindex === false)
    .map((article) => rel(article.file));
  const publishedNoindexed = articles
    .filter((article) => article.data.status === "published" && article.data.noindex !== false)
    .map((article) => rel(article.file));

  const checks: GateCheck[] = [
    {
      name: "review automation never auto-publishes",
      ok: reviewQueue.guardrails.autoPublish === false && publishPack.guardrails.autoPublish === false,
    },
    {
      name: "publish pack matches recommended review files",
      ok: sameList(packFiles, reviewFiles),
      detail: `review=${reviewFiles.join(", ")} pack=${packFiles.join(", ")}`,
    },
    {
      name: "recommended review clusters are diverse",
      ok: repeatedClusters.length === 0,
      detail: repeatedClusters.length ? repeatedClusters.join(", ") : clusters.join(", "),
    },
    {
      name: "SEO safety check passed",
      ok: seo.ok === true,
      detail: JSON.stringify({
        leakedDraftOrReview: seo.leakedDraftOrReview,
        nonPublishedWithNoindexFalse: seo.nonPublishedWithNoindexFalse,
        publishedButNoindexed: seo.publishedButNoindexed,
      }),
    },
    {
      name: "searchability check passed",
      ok: searchability.failedItems.length === 0 && searchability.score >= 100,
      detail: `score=${searchability.score}, failed=${searchability.failedItems.length}`,
    },
    {
      name: "draft guardrail sanitizer is clean",
      ok: sanitize.changedFiles === 0 && sanitize.totalReplacements === 0,
      detail: `changedFiles=${sanitize.changedFiles}, totalReplacements=${sanitize.totalReplacements}`,
    },
    {
      name: "no non-published article is indexable",
      ok: nonPublishedIndexed.length === 0,
      detail: nonPublishedIndexed.join(", "),
    },
    {
      name: "all published articles are indexable",
      ok: publishedNoindexed.length === 0,
      detail: publishedNoindexed.join(", "),
    },
    {
      name: "project status still stops before publishing",
      ok: projectStatus.articles.publishableNow.length === 0,
      detail: `publicPublished=${projectStatus.articles.publicPublished}, publishableNow=${projectStatus.articles.publishableNow.length}`,
    },
    {
      name: "SEO opportunity map has review-ready drafts",
      ok: opportunityMap.totals.reviewReadyDrafts > 0,
      detail: `reviewReadyDrafts=${opportunityMap.totals.reviewReadyDrafts}`,
    },
  ];

  const failed = checks.filter((check) => !check.ok);
  const payload = {
    generatedAt: new Date().toISOString(),
    ok: failed.length === 0,
    summary: {
      checks: checks.length,
      failed: failed.length,
      passed: checks.length - failed.length,
    },
    failed,
    checks,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "automation-gate.json");
  const mdTarget = path.join(process.cwd(), "docs", "automation-gate.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: payload.ok, failed: failed.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
  if (failed.length) process.exitCode = 1;
}

function readJson<T>(relativePath: string): T {
  const absolutePath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "")) as T;
}

function sameList(a: string[], b: string[]) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

function toMarkdown(payload: { generatedAt: string; ok: boolean; summary: { checks: number; failed: number; passed: number }; checks: GateCheck[] }) {
  const lines = [
    "# Automation Gate",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    `Overall: ${payload.ok ? "PASS" : "FAIL"}`,
    "",
    "## Summary",
    "",
    `- Checks: ${payload.summary.checks}`,
    `- Passed: ${payload.summary.passed}`,
    `- Failed: ${payload.summary.failed}`,
    "",
    "## Checks",
    "",
    "| Check | Status | Detail |",
    "| --- | --- | --- |",
    ...payload.checks.map((check) => `| ${check.name} | ${check.ok ? "PASS" : "FAIL"} | ${check.detail || ""} |`),
    "",
  ];

  return lines.join("\n");
}

void main();
