import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type PublicItem = {
  category: string;
  descriptionLength: number;
  file: string;
  slug: string;
  tags: string[];
  title: string;
  updatedAt?: string;
};

type PublicSurfaceInventory = {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  publicItems: PublicItem[];
  summary: {
    liveMissingFromSitemap: number;
    projectPublicPublished: number;
    publicArticles: number;
    publishedButNoindexed: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type SeoWarning = {
  file: string;
  manualActions?: string[];
  manualFixReady?: boolean;
  schemaWarnings?: string[];
  snippetWarnings?: string[];
  status?: string;
  unsafeReasons?: string[];
};

type SeoWarningPack = {
  generatedAt: string;
  items?: SeoWarning[];
  summary: { blockingItems: number; publicItems: number; trafficDataAvailable: boolean; unsafeItems: number };
};

type FreshnessItem = {
  file: string;
  primaryKeyword?: string;
  riskLevel?: string;
  riskReasons?: string[];
  status?: string;
  title: string;
  updatedAt?: string;
};

type FreshnessReport = {
  generatedAt: string;
  items?: FreshnessItem[];
  summary: { articlesChecked: number; highRisk: number; mediumRisk: number };
};

type CannibalizationConflict = {
  files: string[];
  groupKey: string;
  publishedCount: number;
  reason: string;
  statuses: Record<string, number>;
  titles: string[];
};

type CannibalizationReport = {
  generatedAt: string;
  conflicts?: CannibalizationConflict[];
  summary: { conflicts: number; reviewBatchConflicts: number };
};

type TrafficEvidence = {
  generatedAt: string;
  summary: {
    canClaimTraffic: boolean;
    claimableMetrics: number;
    failedChecks: number;
    measuredTrafficSources: number;
    trafficDataAvailable: boolean;
  };
};

type RefreshItem = {
  actionCount: number;
  actions: string[];
  cannibalizationConflicts: CannibalizationConflict[];
  category: string;
  commandBoundary: {
    editAfterHumanApproval: "manual-only";
    markReview: "not-applicable-public-page";
    publishConfirm: "not-included";
    stopBefore: string;
  };
  descriptionLength: number;
  file: string;
  freshnessRisk: FreshnessItem | null;
  priorityScore: number;
  readyForHumanRefreshReview: boolean;
  seoWarning: SeoWarning | null;
  slug: string;
  tags: string[];
  title: string;
  trafficClaim: "not-included";
  unsafeReasons: string[];
  updatedAt?: string;
};

function main() {
  const publicSurface = readJson<PublicSurfaceInventory>("content/automation/public-surface-inventory.json");
  const seoWarnings = readJson<SeoWarningPack>("content/automation/seo-warning-remediation-pack.json");
  const freshness = readJson<FreshnessReport>("content/automation/content-freshness.json");
  const cannibalization = readJson<CannibalizationReport>("content/automation/content-cannibalization.json");
  const trafficEvidence = readJson<TrafficEvidence>("content/automation/traffic-evidence-audit.json");

  const publicFiles = new Set(publicSurface.publicItems.map((item) => item.file));
  const seoByFile = new Map((seoWarnings.items || []).filter((item) => publicFiles.has(item.file)).map((item) => [item.file, item]));
  const freshnessByFile = new Map((freshness.items || []).filter((item) => publicFiles.has(item.file)).map((item) => [item.file, item]));
  const conflictsByFile = groupConflictsByPublicFile(cannibalization.conflicts || [], publicFiles);

  const items = publicSurface.publicItems
    .map((item) => toRefreshItem(item, seoByFile.get(item.file) || null, freshnessByFile.get(item.file) || null, conflictsByFile.get(item.file) || []))
    .sort((a, b) => b.priorityScore - a.priorityScore || a.file.localeCompare(b.file));
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only public search refresh pack. It prioritizes public-page SEO refresh work without editing pages or claiming traffic.",
      stopBefore: "Stop before public-page metadata, body, canonical, source, or link edits until a human approves the exact change.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      cannibalizationGeneratedAt: cannibalization.generatedAt,
      cannibalizationSummary: cannibalization.summary,
      freshnessGeneratedAt: freshness.generatedAt,
      freshnessSummary: freshness.summary,
      publicSurfaceGeneratedAt: publicSurface.generatedAt,
      publicSurfaceSummary: publicSurface.summary,
      seoWarningsGeneratedAt: seoWarnings.generatedAt,
      seoWarningsSummary: seoWarnings.summary,
      trafficEvidenceGeneratedAt: trafficEvidence.generatedAt,
      trafficEvidenceSummary: trafficEvidence.summary,
      trafficNote: "No measured traffic, ranking, impression, click, conversion, or revenue claim is made.",
    },
    summary: {
      actionItems: items.reduce((sum, item) => sum + item.actionCount, 0),
      cannibalizationItems: items.filter((item) => item.cannibalizationConflicts.length > 0).length,
      highPriorityItems: items.filter((item) => item.priorityScore >= 140).length,
      items: items.length,
      itemsReadyForHumanRefreshReview: items.filter((item) => item.readyForHumanRefreshReview).length,
      liveMissingFromSitemap: publicSurface.summary.liveMissingFromSitemap,
      measuredTrafficSources: trafficEvidence.summary.measuredTrafficSources,
      publicArticles: publicSurface.summary.publicArticles,
      publishConfirmCommandsIncluded: 0,
      publishedButNoindexed: publicSurface.summary.publishedButNoindexed,
      seoWarningItems: items.filter((item) => item.seoWarning).length,
      shortDescriptionItems: items.filter((item) => item.descriptionLength < 90).length,
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    topItems: items.slice(0, 15),
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "public-search-refresh-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "public-search-refresh-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toRefreshItem(publicItem: PublicItem, seoWarning: SeoWarning | null, freshnessRisk: FreshnessItem | null, cannibalizationConflicts: CannibalizationConflict[]): RefreshItem {
  const actions = actionsFor(publicItem, seoWarning, freshnessRisk, cannibalizationConflicts);
  const unsafeReasons = unsafeReasonsFor(publicItem, seoWarning);
  const priorityScore =
    100 +
    (seoWarning ? 30 : 0) +
    (freshnessRisk?.riskLevel === "high" ? 20 : 0) +
    cannibalizationConflicts.length * 15 +
    (publicItem.descriptionLength < 90 ? 10 : 0);
  return {
    actionCount: actions.length,
    actions,
    cannibalizationConflicts,
    category: publicItem.category,
    commandBoundary: {
      editAfterHumanApproval: "manual-only",
      markReview: "not-applicable-public-page",
      publishConfirm: "not-included",
      stopBefore: "Public page refresh requires explicit human approval for exact metadata, body, source, canonical, or link edits.",
    },
    descriptionLength: publicItem.descriptionLength,
    file: publicItem.file,
    freshnessRisk,
    priorityScore,
    readyForHumanRefreshReview: unsafeReasons.length === 0,
    seoWarning,
    slug: publicItem.slug,
    tags: publicItem.tags,
    title: publicItem.title,
    trafficClaim: "not-included",
    unsafeReasons,
    updatedAt: publicItem.updatedAt,
  };
}

function actionsFor(publicItem: PublicItem, seoWarning: SeoWarning | null, freshnessRisk: FreshnessItem | null, cannibalizationConflicts: CannibalizationConflict[]) {
  const actions = [
    "Confirm the public page still answers one clear search intent before editing.",
    "Do not claim traffic, rankings, conversions, clicks, impressions, or revenue.",
  ];
  if (publicItem.descriptionLength < 90) actions.push("Review the meta description for a clearer user problem, outcome, and concrete workflow term.");
  if (seoWarning) {
    for (const action of (seoWarning.manualActions || []).slice(0, 3)) actions.push(`SEO warning: ${action}`);
  }
  if (freshnessRisk?.riskLevel === "high") {
    actions.push("Freshness check: verify fast-changing product, model, pricing, deployment, API, and policy claims against current official sources.");
  }
  for (const conflict of cannibalizationConflicts.slice(0, 2)) {
    actions.push(`Cannibalization check: review ${conflict.reason} conflict "${conflict.groupKey}" before expanding this page or approving related drafts.`);
  }
  actions.push("Keep canonical URL stable unless a human explicitly approves a redirect or slug migration.");
  actions.push("Apply public-page edits manually only after approval; publish confirm remains excluded.");
  return dedupe(actions);
}

function unsafeReasonsFor(publicItem: PublicItem, seoWarning: SeoWarning | null) {
  const reasons: string[] = [];
  if (!publicItem.slug) reasons.push("public page is missing slug");
  if (!publicItem.title) reasons.push("public page is missing title");
  if ((seoWarning?.unsafeReasons?.length || 0) > 0) reasons.push("SEO warning remediation contains unsafe reasons");
  return reasons;
}

function groupConflictsByPublicFile(conflicts: CannibalizationConflict[], publicFiles: Set<string>) {
  const grouped = new Map<string, CannibalizationConflict[]>();
  for (const conflict of conflicts) {
    for (const file of conflict.files.filter((candidate) => publicFiles.has(candidate))) {
      grouped.set(file, [...(grouped.get(file) || []), conflict]);
    }
  }
  return grouped;
}

function dedupe(items: string[]) {
  return Array.from(new Set(items));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: RefreshItem[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, boolean | number>;
  topItems: RefreshItem[];
  unsafeItems: RefreshItem[];
}) {
  const lines = [
    "# Public Search Refresh Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It prioritizes public-page refresh work for search visibility without editing pages or claiming traffic.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.file}: ${item.unsafeReasons.join("; ")}`) : ["- none"]),
    "",
    "## Top Refresh Items",
    "",
    "| Ready | Score | Actions | SEO | Freshness | Conflicts | Desc | Category | Title | File |",
    "| --- | ---: | ---: | --- | --- | ---: | ---: | --- | --- | --- |",
    ...payload.topItems.map(
      (item) =>
        `| ${item.readyForHumanRefreshReview} | ${item.priorityScore} | ${item.actionCount} | ${Boolean(item.seoWarning)} | ${item.freshnessRisk?.riskLevel || "none"} | ${item.cannibalizationConflicts.length} | ${item.descriptionLength} | ${item.category} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Item Actions",
    "",
    ...payload.topItems.flatMap((item) => [
      `### ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Score: ${item.priorityScore}`,
      `- SEO warning: ${Boolean(item.seoWarning)}`,
      `- Freshness risk: ${item.freshnessRisk?.riskLevel || "none"}`,
      `- Cannibalization conflicts: ${item.cannibalizationConflicts.length}`,
      `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
      "",
      ...item.actions.map((action) => `- ${action}`),
      "",
    ]),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

main();
