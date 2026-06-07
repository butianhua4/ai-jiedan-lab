import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

type Candidate = {
  category?: string;
  file: string;
  humanReviewRequired?: boolean;
  noindex?: boolean;
  primaryKeyword?: string;
  publishBatch?: number;
  qualityScore?: number;
  searchIntent?: string;
  slug?: string;
  sourceNotes?: boolean;
  status?: string;
  title: string;
};

type DemandCluster = {
  audience?: string;
  cluster: string;
  contentAngles?: string[];
  gapScore: number;
  publicMatches: number;
  readyCandidates: Candidate[];
  reviewFocus?: string[];
  searchQueries?: string[];
  sourceSignals?: Array<{ note?: string; title?: string; type?: string; url?: string }>;
  why?: string;
};

type BroadDemandBrief = {
  generatedAt: string;
  guardrails: {
    autoCreateArticles: boolean;
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    trafficClaim: string;
  };
  clusters: DemandCluster[];
  summary: {
    clusters: number;
    clustersWithoutPublicCoverage: number;
    readyCandidateFiles: number;
    unsafeClusters: number;
  };
};

type PublicSurfaceInventory = {
  generatedAt: string;
  guardrails: {
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    trafficClaim: string;
  };
  summary: {
    broadClustersWithoutPublicCoverage: number;
    publicArticles: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
  uncoveredBroadClusters: Array<{
    cluster: string;
    gapScore: number;
    publicMatches: number;
    readyCandidates: number;
    searchQueries: string[];
    suggestedFiles: string[];
  }>;
};

type TriageItem = {
  cluster: string;
  commandBoundary?: {
    markReviewAfterHumanApproval?: string;
    publishConfirm?: string;
    publishDryRunAfterReview?: string;
  };
  file: string;
  freshnessPriority?: number;
  freshnessRisk?: "high" | "low" | "medium";
  humanFactCheckChecklist?: string[];
  readyForHumanFreshnessReview?: boolean;
  reviewFocus?: string[];
  safeDraft?: boolean;
  searchQueries?: string[];
  sourceTargets?: string[];
  title: string;
};

type FreshnessTriage = {
  generatedAt: string;
  guardrails: {
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    trafficClaim: string;
  };
  items: TriageItem[];
  summary: {
    items: number;
    unsafeItems: number;
  };
};

type LaunchItem = {
  articleSignals: {
    h2Count: number;
    wordCountApprox: number;
  };
  category: string;
  cluster: string;
  commandBoundary: {
    markReviewAfterHumanApproval: string;
    publishConfirm: "not-included";
    publishDryRunAfterReview: string;
    stopBefore: string;
  };
  contentAngles: string[];
  file: string;
  gapScore: number;
  humanFactCheckChecklist: string[];
  humanReviewRequired: boolean;
  launchReason: string;
  noindex: boolean;
  primaryKeyword: string;
  qualityScore: number;
  readyForFirstCoverageReview: boolean;
  reviewFocus: string[];
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  status: string;
  title: string;
  triageFreshnessPriority: number | null;
  triageFreshnessRisk: string | null;
  unsafeReasons: string[];
};

function main() {
  const demand = readJson<BroadDemandBrief>("content/automation/autopilot-broad-ai-demand-brief.json");
  const publicSurface = readJson<PublicSurfaceInventory>("content/automation/public-surface-inventory.json");
  const triage = readJson<FreshnessTriage>("content/automation/autopilot-broad-freshness-triage.json");
  const triageByClusterFile = new Map(triage.items.map((item) => [`${item.cluster}::${item.file}`, item]));

  const zeroPublicClusterNames = new Set(publicSurface.uncoveredBroadClusters.map((cluster) => cluster.cluster));
  const sourceClusters = demand.clusters
    .filter((cluster) => cluster.publicMatches === 0 || zeroPublicClusterNames.has(cluster.cluster))
    .sort((a, b) => b.gapScore - a.gapScore || a.cluster.localeCompare(b.cluster));

  const selectedFiles = new Set<string>();
  const items: LaunchItem[] = [];

  for (const cluster of sourceClusters) {
    const selected = selectCandidate(cluster, selectedFiles, triageByClusterFile);
    if (!selected) continue;
    selectedFiles.add(selected.file);
    items.push(toLaunchItem(cluster, selected, triageByClusterFile.get(`${cluster.cluster}::${selected.file}`) || null));
  }

  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note:
        "Read-only first coverage launch pack. It selects one unique human-review candidate for each broad AI cluster with zero public coverage and never edits articles or changes review/publish state.",
      stopBefore: "Stop before mark:review and publish. Human approval is required for every selected file.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      demandBriefGeneratedAt: demand.generatedAt,
      demandBriefGuardrails: demand.guardrails,
      demandBriefSummary: demand.summary,
      freshnessTriageGeneratedAt: triage.generatedAt,
      freshnessTriageGuardrails: triage.guardrails,
      freshnessTriageSummary: triage.summary,
      publicSurfaceGeneratedAt: publicSurface.generatedAt,
      publicSurfaceGuardrails: publicSurface.guardrails,
      publicSurfaceSummary: publicSurface.summary,
      trafficNote: "Search queries and cluster gap scores are editorial planning signals, not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.",
    },
    summary: {
      clustersSelected: items.length,
      commandBoundaries: items.filter(hasSafeCommandBoundary).length,
      firstCoverageTarget: publicSurface.summary.broadClustersWithoutPublicCoverage,
      humanReviewRequiredItems: items.filter((item) => item.humanReviewRequired).length,
      itemsWithContentAngles: items.filter((item) => item.contentAngles.length >= 3).length,
      itemsWithFactCheckChecklist: items.filter((item) => item.humanFactCheckChecklist.length >= 6).length,
      itemsWithReviewFocus: items.filter((item) => item.reviewFocus.length >= 3).length,
      itemsWithSearchQueries: items.filter((item) => item.searchQueries.length >= 4).length,
      itemsWithSourceTargets: items.filter((item) => item.sourceTargets.length > 0).length,
      publicArticlesBeforeLaunch: publicSurface.summary.publicArticles,
      safeDraftItems: items.filter((item) => item.safeDraft).length,
      trafficDataAvailable: publicSurface.summary.trafficDataAvailable,
      uniqueFiles: selectedFiles.size,
      unsafeItems: unsafeItems.length,
      zeroPublicClusters: sourceClusters.length,
    },
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "broad-first-coverage-launch-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "broad-first-coverage-launch-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function selectCandidate(cluster: DemandCluster, selectedFiles: Set<string>, triageByClusterFile: Map<string, TriageItem>) {
  return [...(cluster.readyCandidates || [])].sort((a, b) => candidateScore(cluster, b, triageByClusterFile) - candidateScore(cluster, a, triageByClusterFile)).find((candidate) => !selectedFiles.has(candidate.file));
}

function candidateScore(cluster: DemandCluster, candidate: Candidate, triageByClusterFile: Map<string, TriageItem>) {
  const triage = triageByClusterFile.get(`${cluster.cluster}::${candidate.file}`);
  return (
    (triage ? 10000 : 0) +
    (triage?.readyForHumanFreshnessReview ? 1000 : 0) +
    (triage?.safeDraft ? 1000 : 0) +
    (candidate.sourceNotes ? 400 : 0) +
    (candidate.qualityScore || 0) * 5 +
    (candidate.publishBatch || 0) * 3 +
    (triage?.freshnessPriority || 0) +
    cluster.gapScore
  );
}

function toLaunchItem(cluster: DemandCluster, candidate: Candidate, triage: TriageItem | null): LaunchItem {
  const article = readArticle(candidate.file);
  const data = article.data;
  const h2Count = (article.content.match(/^##\s+/gm) || []).length;
  const wordCountApprox = article.content.replace(/\s+/g, "").length;
  const sourceTargets = dedupe([...(triage?.sourceTargets || []), ...(cluster.sourceSignals || []).map((source) => source.url || "").filter(Boolean)]);
  const searchQueries = dedupe([...(triage?.searchQueries || []), ...(cluster.searchQueries || [])]).slice(0, 8);
  const reviewFocus = dedupe([...(triage?.reviewFocus || []), ...(cluster.reviewFocus || [])]).slice(0, 8);
  const contentAngles = cluster.contentAngles || [];
  const status = String(data.status || candidate.status || "");
  const noindex = Boolean(data.noindex ?? candidate.noindex);
  const humanReviewRequired = Boolean(data.humanReviewRequired ?? candidate.humanReviewRequired);
  const safeDraft = status === "draft" && noindex === true && humanReviewRequired === true;
  const commandBoundary = {
    markReviewAfterHumanApproval: triage?.commandBoundary?.markReviewAfterHumanApproval || `npm run mark:review -- --file=${candidate.file} --confirm-human`,
    publishDryRunAfterReview: triage?.commandBoundary?.publishDryRunAfterReview || `npm run publish:articles -- --file=${candidate.file}`,
    publishConfirm: "not-included" as const,
    stopBefore: "Run mark:review only after human source/fact approval. Run publish dry-run after review status. Do not run publish with --confirm here.",
  };
  const unsafeReasons = unsafeReasonsFor({
    commandBoundary,
    contentAngles,
    humanReviewRequired,
    noindex,
    reviewFocus,
    safeDraft,
    searchQueries,
    sourceTargets,
    status,
  });

  return {
    articleSignals: {
      h2Count,
      wordCountApprox,
    },
    category: String(data.category || candidate.category || ""),
    cluster: cluster.cluster,
    commandBoundary,
    contentAngles,
    file: candidate.file,
    gapScore: cluster.gapScore,
    humanFactCheckChecklist: buildChecklist(cluster, candidate, triage, sourceTargets, reviewFocus),
    humanReviewRequired,
    launchReason: cluster.why || "Zero-public broad AI cluster with a ready draft candidate.",
    noindex,
    primaryKeyword: String(data.primaryKeyword || candidate.primaryKeyword || ""),
    qualityScore: Number(data.qualityScore || candidate.qualityScore || 0),
    readyForFirstCoverageReview: unsafeReasons.length === 0,
    reviewFocus,
    safeDraft,
    searchQueries,
    sourceTargets,
    status,
    title: String(data.title || candidate.title),
    triageFreshnessPriority: triage?.freshnessPriority ?? null,
    triageFreshnessRisk: triage?.freshnessRisk ?? null,
    unsafeReasons,
  };
}

function unsafeReasonsFor(item: {
  commandBoundary: LaunchItem["commandBoundary"];
  contentAngles: string[];
  humanReviewRequired: boolean;
  noindex: boolean;
  reviewFocus: string[];
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  status: string;
}) {
  const reasons: string[] = [];
  if (!item.safeDraft) reasons.push(`candidate is not a safe draft: status=${item.status}, noindex=${item.noindex}, humanReviewRequired=${item.humanReviewRequired}`);
  if (item.searchQueries.length < 4) reasons.push("missing broad search query evidence");
  if (item.sourceTargets.length === 0) reasons.push("missing source targets for human fact-check");
  if (item.reviewFocus.length < 3) reasons.push("missing focused human review checklist");
  if (item.contentAngles.length < 3) reasons.push("missing content-angle context");
  if (!hasSafeCommandBoundary(item)) reasons.push("unsafe or incomplete command boundary");
  return reasons;
}

function hasSafeCommandBoundary(item: { commandBoundary: LaunchItem["commandBoundary"] }) {
  return (
    item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !item.commandBoundary.publishDryRunAfterReview.includes("--confirm") &&
    item.commandBoundary.publishConfirm === "not-included"
  );
}

function buildChecklist(cluster: DemandCluster, candidate: Candidate, triage: TriageItem | null, sourceTargets: string[], reviewFocus: string[]) {
  const checklist = new Set<string>([
    "Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.",
    "Verify current official docs for product names, APIs, model names, deployment commands, limits, and version-sensitive details.",
    "Remove unsupported claims about measured traffic, rankings, impressions, clicks, revenue, cost savings, latency, or reliability.",
    "Confirm the article answers the cluster's first public entry search intent without keyword stuffing.",
    "Confirm internal links are relevant and do not imply published coverage that does not exist yet.",
    "Only after human approval, run the mark:review command manually; publishing still needs separate explicit approval.",
  ]);

  for (const item of triage?.humanFactCheckChecklist || []) checklist.add(item);
  for (const item of reviewFocus) checklist.add(`Apply review focus: ${item}.`);
  for (const target of sourceTargets.slice(0, 6)) checklist.add(`Open source target and verify current guidance: ${target}.`);
  checklist.add(`Confirm this first-coverage candidate fits cluster: ${cluster.cluster}.`);
  checklist.add(`Confirm target primary keyword is appropriate: ${candidate.primaryKeyword || "missing"}.`);

  return [...checklist];
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { note: string; stopBefore: string; trafficClaim: string };
  summary: Record<string, number | boolean>;
  unsafeItems: LaunchItem[];
  items: LaunchItem[];
}) {
  return [
    "# Broad First Coverage Launch Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "## Guardrails",
    "",
    `- ${payload.guardrails.note}`,
    `- ${payload.guardrails.stopBefore}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.file}: ${item.unsafeReasons.join("; ")}`) : ["- none"]),
    "",
    "## First Coverage Candidates",
    "",
    "| Ready | Gap | Queries | Sources | Checks | Cluster | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.readyForFirstCoverageReview} | ${item.gapScore} | ${item.searchQueries.length} | ${item.sourceTargets.length} | ${item.humanFactCheckChecklist.length} | ${item.cluster} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Command Boundaries",
    "",
    "| Cluster | Mark review after human approval | Publish dry-run after review | Publish confirm |",
    "| --- | --- | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.cluster} | \`${item.commandBoundary.markReviewAfterHumanApproval}\` | \`${item.commandBoundary.publishDryRunAfterReview}\` | ${item.commandBoundary.publishConfirm} |`,
    ),
    "",
    "## Review Packets",
    "",
    ...payload.items.flatMap((item) => [
      `### ${item.cluster}`,
      "",
      `- File: ${item.file}`,
      `- Title: ${item.title}`,
      `- Primary keyword: ${item.primaryKeyword}`,
      `- Launch reason: ${item.launchReason}`,
      `- Status boundary: status=${item.status}, noindex=${item.noindex}, humanReviewRequired=${item.humanReviewRequired}`,
      `- Freshness risk: ${item.triageFreshnessRisk || "not-triaged"}`,
      "",
      "Search queries:",
      "",
      ...item.searchQueries.map((query) => `- ${query}`),
      "",
      "Source targets:",
      "",
      ...item.sourceTargets.map((target) => `- ${target}`),
      "",
      "Human fact-check checklist:",
      "",
      ...item.humanFactCheckChecklist.map((entry) => `- ${entry}`),
      "",
    ]),
  ].join("\n");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function dedupe(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

main();
