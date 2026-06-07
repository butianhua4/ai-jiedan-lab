import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

type Candidate = {
  file: string;
  noindex?: boolean;
  primaryKeyword?: string;
  publishBatch?: number | null;
  qualityScore?: number;
  sourceNotes?: boolean;
  status?: string;
  title: string;
};

type DemandCluster = {
  cluster: string;
  gapScore: number;
  publicMatches: number;
  readyCandidates: Candidate[];
  reviewFocus: string[];
  searchQueries: string[];
  sourceSignals: Array<{ note: string; title: string; type: string; url: string }>;
};

type BroadDemandBrief = {
  clusters: DemandCluster[];
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  summary: { clusters: number; readyCandidateFiles: number; unsafeClusters: number };
};

type FreshnessItem = {
  file: string;
  riskLevel: "high" | "low" | "medium";
  riskReasons: string[];
  updatedAt: string;
};

type ContentFreshness = {
  generatedAt: string;
  guardrails: { autoPublish: boolean };
  items: FreshnessItem[];
  currentReviewItems: FreshnessItem[];
  plannedReviewItems: FreshnessItem[];
  summary: { highRisk: number; mediumRisk: number; items: number };
};

type SourceHealth = {
  files: Array<{ file: string; reachableSources: number; sourceTargets: number; urls: string[] }>;
  summary: { filesWithoutReachableSource: number; missingUrlTargets: number };
};

type TriageItem = {
  articleUpdatedAt: string;
  cluster: string;
  commandBoundary: {
    markReviewAfterHumanApproval: string;
    publishConfirm: "not-included";
    publishDryRunAfterReview: string;
  };
  file: string;
  freshnessPriority: number;
  freshnessRisk: "high" | "low" | "medium";
  humanFactCheckChecklist: string[];
  publicMatches: number;
  readyForHumanFreshnessReview: boolean;
  reviewFocus: string[];
  riskReasons: string[];
  safeDraft: boolean;
  searchQueries: string[];
  sourceSignals: DemandCluster["sourceSignals"];
  sourceTargets: string[];
  title: string;
};

const maxItems = 24;

function main() {
  const broadDemand = readJson<BroadDemandBrief>("content/automation/autopilot-broad-ai-demand-brief.json");
  const freshness = readJson<ContentFreshness>("content/automation/content-freshness.json");
  const sourceHealth = readJson<SourceHealth>("content/automation/source-target-health-audit.json");

  const freshnessByFile = new Map(
    [...freshness.currentReviewItems, ...freshness.plannedReviewItems, ...freshness.items].map((item) => [normalizeFile(item.file), item]),
  );
  const sourceByFile = new Map(sourceHealth.files.map((item) => [normalizeFile(item.file), item]));
  const seen = new Set<string>();
  const items: TriageItem[] = [];

  for (const cluster of broadDemand.clusters.sort((a, b) => b.gapScore - a.gapScore || a.cluster.localeCompare(b.cluster))) {
    for (const candidate of cluster.readyCandidates) {
      const file = normalizeFile(candidate.file);
      if (seen.has(file)) continue;
      seen.add(file);
      items.push(toTriageItem(cluster, candidate, freshnessByFile.get(file), sourceByFile.get(file)));
    }
  }

  const selectedItems = items.sort(compareItems).slice(0, maxItems);
  const unsafeItems = selectedItems.filter(
    (item) =>
      !item.safeDraft ||
      !item.readyForHumanFreshnessReview ||
      !item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human") ||
      item.commandBoundary.publishDryRunAfterReview.includes("--confirm") ||
      item.commandBoundary.publishConfirm !== "not-included",
  );

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only broad freshness triage. It prioritizes high-demand AI draft candidates for human fact-checking and does not edit, mark review, publish, or claim traffic.",
      stopBefore: "Stop before mark:review and publish. Human approval is required for every file.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      broadDemandGeneratedAt: broadDemand.generatedAt,
      broadDemandGuardrails: broadDemand.guardrails,
      broadDemandSummary: broadDemand.summary,
      contentFreshnessGeneratedAt: freshness.generatedAt,
      contentFreshnessGuardrails: freshness.guardrails,
      contentFreshnessSummary: freshness.summary,
      sourceHealthSummary: sourceHealth.summary,
      triageSource: "autopilot-broad-ai-demand readyCandidates joined with content-freshness risk and source health URLs",
    },
    summary: {
      clustersCovered: new Set(selectedItems.map((item) => item.cluster)).size,
      highRiskItems: selectedItems.filter((item) => item.freshnessRisk === "high").length,
      items: selectedItems.length,
      itemsWithCommandBoundary: selectedItems.filter(hasCommandBoundary).length,
      itemsWithExternalSignals: selectedItems.filter((item) => item.sourceSignals.length > 0).length,
      itemsWithHumanFactChecks: selectedItems.filter((item) => item.humanFactCheckChecklist.length >= 6).length,
      itemsWithSearchQueries: selectedItems.filter((item) => item.searchQueries.length >= 4).length,
      itemsWithSourceTargets: selectedItems.filter((item) => item.sourceTargets.length > 0).length,
      readyItems: selectedItems.filter((item) => item.readyForHumanFreshnessReview).length,
      safeDraftItems: selectedItems.filter((item) => item.safeDraft).length,
      sourceClusters: broadDemand.summary.clusters,
      sourceReadyCandidateFiles: broadDemand.summary.readyCandidateFiles,
      unsafeItems: unsafeItems.length,
      uniqueFiles: new Set(selectedItems.map((item) => item.file)).size,
    },
    unsafeItems,
    nextItems: selectedItems.slice(0, 8),
    items: selectedItems,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-broad-freshness-triage.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-broad-freshness-triage.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toTriageItem(
  cluster: DemandCluster,
  candidate: Candidate,
  freshnessItem: FreshnessItem | undefined,
  sourceItem: SourceHealth["files"][number] | undefined,
): TriageItem {
  const article = readArticle(candidate.file);
  const safeDraft =
    article.data.status === "draft" &&
    article.data.noindex === true &&
    article.data.humanReviewRequired === true &&
    Boolean(article.data.sourceNotes) &&
    typeof candidate.qualityScore === "number" &&
    candidate.qualityScore >= 100;
  const sourceTargets = dedupe([...(sourceItem?.urls || []), ...cluster.sourceSignals.map((signal) => signal.url)]);
  const riskReasons = freshnessItem?.riskReasons || deriveRiskReasons(candidate, cluster);
  const freshnessRisk = freshnessItem?.riskLevel || (riskReasons.length ? "high" : "low");
  const factChecks = buildFactChecks(cluster, sourceTargets, riskReasons);

  return {
    articleUpdatedAt: String(article.data.updatedAt || freshnessItem?.updatedAt || ""),
    cluster: cluster.cluster,
    commandBoundary: {
      markReviewAfterHumanApproval: `npm run mark:review -- --file=${candidate.file} --confirm-human`,
      publishDryRunAfterReview: `npm run publish:articles -- --file=${candidate.file}`,
      publishConfirm: "not-included",
    },
    file: normalizeFile(candidate.file),
    freshnessPriority: cluster.gapScore + (freshnessRisk === "high" ? 80 : freshnessRisk === "medium" ? 35 : 0) + (cluster.publicMatches === 0 ? 30 : 0),
    freshnessRisk,
    humanFactCheckChecklist: factChecks,
    publicMatches: cluster.publicMatches,
    readyForHumanFreshnessReview: safeDraft && sourceTargets.length > 0 && factChecks.length >= 6,
    reviewFocus: cluster.reviewFocus,
    riskReasons,
    safeDraft,
    searchQueries: cluster.searchQueries,
    sourceSignals: cluster.sourceSignals,
    sourceTargets,
    title: String(article.data.title || candidate.title),
  };
}

function buildFactChecks(cluster: DemandCluster, sourceTargets: string[], riskReasons: string[]) {
  return dedupe([
    "Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.",
    "Verify current official docs for product names, APIs, model names, SDK behavior, deployment commands, and version-sensitive details.",
    "Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence.",
    "Confirm every Agent, tool-calling, memory, RAG, automation, or prompt workflow keeps a human review boundary.",
    "Rewrite or remove any unsupported fast-changing claim before running mark:review.",
    ...riskReasons.slice(0, 6).map((reason) => `Verify freshness risk: ${reason}.`),
    ...cluster.reviewFocus.slice(0, 4).map((focus) => `Apply review focus: ${focus}.`),
    ...sourceTargets.slice(0, 5).map((source) => `Open source target and verify current guidance: ${source}.`),
  ]).slice(0, 16);
}

function deriveRiskReasons(candidate: Candidate, cluster: DemandCluster) {
  const text = `${candidate.title} ${candidate.primaryKeyword || ""} ${cluster.cluster}`.toLowerCase();
  return ["api", "agent", "model", "rag", "vllm", "ollama", "dify", "n8n", "prompt", "memory"]
    .filter((term) => text.includes(term))
    .map((term) => `fast-changing broad-demand term: ${term}`);
}

function compareItems(a: TriageItem, b: TriageItem) {
  if (b.freshnessPriority !== a.freshnessPriority) return b.freshnessPriority - a.freshnessPriority;
  if (b.articleUpdatedAt !== a.articleUpdatedAt) return a.articleUpdatedAt.localeCompare(b.articleUpdatedAt);
  return a.file.localeCompare(b.file);
}

function hasCommandBoundary(item: TriageItem) {
  return (
    item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !item.commandBoundary.publishDryRunAfterReview.includes("--confirm") &&
    item.commandBoundary.publishConfirm === "not-included"
  );
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function dedupe(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: TriageItem[];
  nextItems: TriageItem[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
  unsafeItems: TriageItem[];
}) {
  const lines = [
    "# Autopilot Broad Freshness Triage",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It prioritizes high-demand AI draft candidates for human freshness review before any approval or publish action.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Source Evidence",
    "",
    `- Broad demand generated at: ${payload.sourceEvidence.broadDemandGeneratedAt}`,
    `- Content freshness generated at: ${payload.sourceEvidence.contentFreshnessGeneratedAt}`,
    `- Source health summary: ${JSON.stringify(payload.sourceEvidence.sourceHealthSummary)}`,
    `- Triage source: ${payload.sourceEvidence.triageSource}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Next Items",
    "",
    ...itemTable(payload.nextItems),
    "",
    "## All Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Per-Item Freshness Packets",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];

  return lines.join("\n");
}

function itemTable(items: TriageItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Safe | Priority | Risk | Public | Queries | Sources | Checks | Cluster | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForHumanFreshnessReview} | ${item.safeDraft} | ${item.freshnessPriority} | ${item.freshnessRisk} | ${item.publicMatches} | ${item.searchQueries.length} | ${item.sourceTargets.length} | ${item.humanFactCheckChecklist.length} | ${item.cluster} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: TriageItem) {
  return [
    `### ${item.cluster}: ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Freshness risk: ${item.freshnessRisk}`,
    `- Freshness priority: ${item.freshnessPriority}`,
    `- Article updated at: ${item.articleUpdatedAt}`,
    `- Ready for human freshness review: ${item.readyForHumanFreshnessReview}`,
    "",
    "Search queries:",
    "",
    ...item.searchQueries.map((query) => `- ${query}`),
    "",
    "Risk reasons:",
    "",
    ...item.riskReasons.map((reason) => `- ${reason}`),
    "",
    "Source targets:",
    "",
    ...item.sourceTargets.map((source) => `- ${source}`),
    "",
    "Human fact-check checklist:",
    "",
    ...item.humanFactCheckChecklist.map((check) => `- ${check}`),
    "",
    "Command boundary:",
    "",
    `- Mark review after human approval: \`${item.commandBoundary.markReviewAfterHumanApproval}\``,
    `- Publish dry-run after review: \`${item.commandBoundary.publishDryRunAfterReview}\``,
    `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
    "",
  ];
}

void main();
