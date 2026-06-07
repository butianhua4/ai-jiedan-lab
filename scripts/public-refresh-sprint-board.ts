import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type RefreshPackItem = {
  actionCount: number;
  actions: string[];
  cannibalizationConflicts?: unknown[];
  category: string;
  commandBoundary?: {
    editAfterHumanApproval?: string;
    markReview?: string;
    publishConfirm?: string;
    stopBefore?: string;
  };
  descriptionLength: number;
  file: string;
  freshnessRisk?: { riskLevel?: string } | null;
  priorityScore: number;
  readyForHumanRefreshReview: boolean;
  seoWarning?: unknown | null;
  slug: string;
  tags: string[];
  title: string;
  trafficClaim?: string;
  unsafeReasons?: string[];
  updatedAt?: string;
};

type PublicSearchRefreshPack = {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  items?: RefreshPackItem[];
  summary: {
    actionItems: number;
    cannibalizationItems: number;
    highPriorityItems: number;
    items: number;
    itemsReadyForHumanRefreshReview: number;
    liveMissingFromSitemap: number | null;
    measuredTrafficSources: number;
    publicArticles: number;
    publishConfirmCommandsIncluded: number;
    publishedButNoindexed: number;
    seoWarningItems: number;
    shortDescriptionItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
  unsafeItems?: unknown[];
};

type SprintItem = {
  actionCount: number;
  category: string;
  descriptionLength: number;
  file: string;
  priorityScore: number;
  publishConfirm: "not-included";
  readyForPublicRefreshSprint: boolean;
  refreshActions: string[];
  refreshReasons: string[];
  slug: string;
  sprintWave: number;
  title: string;
  unsafeReasons: string[];
};

type SprintWave = {
  actionItems: number;
  files: string[];
  highPriorityItems: number;
  items: number;
  readyItems: number;
  refreshReasons: string[];
  unsafeItems: number;
  wave: number;
};

const ITEMS_PER_WAVE = 3;

function main() {
  const refreshPack = readJson<PublicSearchRefreshPack>("content/automation/public-search-refresh-pack.json");
  const sourceItems = refreshPack.items || [];
  const items = sourceItems
    .slice()
    .sort((a, b) => b.priorityScore - a.priorityScore || b.actionCount - a.actionCount || a.file.localeCompare(b.file))
    .map(toSprintItem);
  const waves = buildWaves(items);
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note:
        "Read-only public refresh sprint board. It groups public pages into manual SEO refresh waves without changing metadata, body, canonical, or publishing state.",
      stopBefore: "Stop before public-page edits, canonical changes, redirects, or publish:articles --confirm until a human approves the exact change.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      publicSearchRefreshGeneratedAt: refreshPack.generatedAt,
      publicSearchRefreshSummary: refreshPack.summary,
      trafficNote: "No measured traffic, ranking, impression, click, conversion, or revenue claim is made.",
    },
    summary: {
      actionItems: items.reduce((sum, item) => sum + item.actionCount, 0),
      cannibalizationItems: items.filter((item) => item.refreshReasons.includes("cannibalization")).length,
      highPriorityItems: items.filter((item) => item.priorityScore >= 140).length,
      items: items.length,
      itemsPerWave: ITEMS_PER_WAVE,
      itemsReadyForPublicRefreshSprint: items.filter((item) => item.readyForPublicRefreshSprint).length,
      liveMissingFromSitemap: refreshPack.summary.liveMissingFromSitemap,
      publicArticles: refreshPack.summary.publicArticles,
      publishConfirmCommandsIncluded: 0,
      publishedButNoindexed: refreshPack.summary.publishedButNoindexed,
      seoWarningItems: items.filter((item) => item.refreshReasons.includes("seo-warning")).length,
      shortDescriptionItems: items.filter((item) => item.refreshReasons.includes("short-description")).length,
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
      waves: waves.length,
    },
    unsafeItems,
    waves,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "public-refresh-sprint-board.json");
  const mdTarget = path.join(process.cwd(), "docs", "public-refresh-sprint-board.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toSprintItem(item: RefreshPackItem, index: number): SprintItem {
  const unsafeReasons = unsafeReasonsFor(item);
  const refreshReasons = refreshReasonsFor(item);
  const refreshActions = refreshActionsFor(item, refreshReasons);
  return {
    actionCount: refreshActions.length,
    category: item.category,
    descriptionLength: item.descriptionLength,
    file: item.file,
    priorityScore: item.priorityScore,
    publishConfirm: "not-included",
    readyForPublicRefreshSprint: unsafeReasons.length === 0 && item.readyForHumanRefreshReview === true,
    refreshActions,
    refreshReasons,
    slug: item.slug,
    sprintWave: Math.floor(index / ITEMS_PER_WAVE) + 1,
    title: item.title,
    unsafeReasons,
  };
}

function refreshReasonsFor(item: RefreshPackItem) {
  const reasons: string[] = [];
  if (item.seoWarning) reasons.push("seo-warning");
  if (item.descriptionLength < 90) reasons.push("short-description");
  if ((item.cannibalizationConflicts?.length || 0) > 0) reasons.push("cannibalization");
  if (item.freshnessRisk?.riskLevel === "high") reasons.push("freshness-high");
  if (item.priorityScore >= 140) reasons.push("high-priority");
  return dedupe(reasons);
}

function refreshActionsFor(item: RefreshPackItem, refreshReasons: string[]) {
  const actions = [
    "Confirm the public page still answers one clear search intent before editing.",
    "Do not claim traffic, rankings, impressions, clicks, conversions, or revenue.",
  ];
  for (const action of item.actions.slice(0, 6)) actions.push(action);
  if (refreshReasons.includes("short-description")) actions.push("Rewrite the meta description manually with a clearer user problem, concrete workflow term, and safe outcome.");
  if (refreshReasons.includes("cannibalization")) actions.push("Decide whether overlapping draft/review pages should be merged, redirected, archived, or kept as separate intent pages.");
  if (refreshReasons.includes("freshness-high")) actions.push("Re-check fast-changing tool, model, deployment, API, and policy claims against current official sources.");
  actions.push("Keep canonical and slug stable unless a human explicitly approves a redirect or migration.");
  actions.push("Apply edits manually only after approval; publish confirm remains excluded.");
  return dedupe(actions);
}

function unsafeReasonsFor(item: RefreshPackItem) {
  const reasons = [...(item.unsafeReasons || [])];
  if (item.readyForHumanRefreshReview !== true) reasons.push("public refresh item is not ready for human refresh review");
  if (item.commandBoundary?.editAfterHumanApproval !== "manual-only") reasons.push("public edit boundary must be manual-only");
  if (item.commandBoundary?.markReview !== "not-applicable-public-page") reasons.push("mark review should not apply to public page refresh");
  if (item.commandBoundary?.publishConfirm !== "not-included") reasons.push("publish confirm command is included");
  if (item.trafficClaim !== "not-included") reasons.push("traffic claim must be not-included");
  if (!item.slug) reasons.push("public page missing slug");
  if (!item.title) reasons.push("public page missing title");
  return dedupe(reasons);
}

function buildWaves(items: SprintItem[]) {
  const waves: SprintWave[] = [];
  for (let index = 0; index < items.length; index += ITEMS_PER_WAVE) {
    const waveItems = items.slice(index, index + ITEMS_PER_WAVE);
    waves.push({
      actionItems: waveItems.reduce((sum, item) => sum + item.actionCount, 0),
      files: waveItems.map((item) => item.file),
      highPriorityItems: waveItems.filter((item) => item.priorityScore >= 140).length,
      items: waveItems.length,
      readyItems: waveItems.filter((item) => item.readyForPublicRefreshSprint).length,
      refreshReasons: dedupe(waveItems.flatMap((item) => item.refreshReasons)),
      unsafeItems: waveItems.filter((item) => item.unsafeReasons.length > 0).length,
      wave: waves.length + 1,
    });
  }
  return waves;
}

function dedupe(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: SprintItem[];
  summary: Record<string, boolean | number | null>;
  unsafeItems: SprintItem[];
  waves: SprintWave[];
}) {
  const lines = [
    "# Public Refresh Sprint Board",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It groups public pages into manual SEO refresh waves without editing pages or claiming traffic.",
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
    "## Waves",
    "",
    "| Wave | Ready | High priority | Actions | Reasons | Files |",
    "| ---: | ---: | ---: | ---: | --- | --- |",
    ...payload.waves.map((wave) => `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.highPriorityItems} | ${wave.actionItems} | ${wave.refreshReasons.join(", ") || "none"} | ${wave.files.join("<br>")} |`),
    "",
    "## Sprint Items",
    "",
    "| Wave | Ready | Score | Actions | Desc | Reasons | Publish confirm | Title | File |",
    "| ---: | --- | ---: | ---: | ---: | --- | --- | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.sprintWave} | ${item.readyForPublicRefreshSprint} | ${item.priorityScore} | ${item.actionCount} | ${item.descriptionLength} | ${item.refreshReasons.join(", ") || "none"} | ${item.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Item Actions",
    "",
    ...payload.items.flatMap((item) => [
      `### ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Wave: ${item.sprintWave}`,
      `- Ready for public refresh sprint: ${item.readyForPublicRefreshSprint}`,
      `- Refresh reasons: ${item.refreshReasons.join(", ") || "none"}`,
      `- Publish confirm: ${item.publishConfirm}`,
      "",
      ...item.refreshActions.map((action) => `- ${action}`),
      "",
    ]),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

main();
