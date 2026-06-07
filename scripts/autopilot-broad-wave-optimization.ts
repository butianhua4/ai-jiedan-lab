import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

type PublicLinkSuggestion = {
  reason: string;
  score: number;
  title: string;
  url: string;
};

type InternalLinks = {
  candidateItems: Array<{
    file: string;
    linksToPublicArticles: number;
    suggestions: PublicLinkSuggestion[];
  }>;
};

type WaveItem = {
  cluster: string;
  commandBoundary: {
    markReviewAfterHumanApproval: string;
    publishConfirm: "not-included";
    publishDryRunAfterReview: string;
  };
  file: string;
  freshnessRisk: "high" | "low" | "medium";
  humanFactCheckChecklist: string[];
  readyForHumanFreshnessReview: boolean;
  reviewFocus: string[];
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
};

type PublishWave = {
  files: string[];
  items: WaveItem[];
  theme: string;
  wave: number;
};

type BroadPublishWaves = {
  generatedAt: string;
  guardrails: {
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    trafficClaim: string;
  };
  summary: {
    items: number;
    unsafeItems: number;
    waves: number;
  };
  waves: PublishWave[];
};

type OptimizationItem = {
  actionChecklist: string[];
  articleSignals: {
    descriptionLength: number;
    h2Count: number;
    titleLength: number;
  };
  cluster: string;
  commandBoundary: WaveItem["commandBoundary"];
  file: string;
  publicLinkSuggestion: PublicLinkSuggestion | null;
  readyForHumanOptimizationReview: boolean;
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
  unsafeReasons: string[];
  warningRemediation: string[];
  wave: number;
};

function main() {
  const waves = readJson<BroadPublishWaves>("content/automation/autopilot-broad-publish-waves.json");
  const internalLinks = readJson<InternalLinks>("content/automation/internal-link-opportunity-audit.json");
  const linkByFile = new Map(internalLinks.candidateItems.map((item) => [normalizeFile(item.file), item]));
  const items = waves.waves.flatMap((wave) => wave.items.map((item) => toOptimizationItem(wave, item, linkByFile.get(normalizeFile(item.file)))));
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);
  const waveSummaries = waves.waves.map((wave) => {
    const waveItems = items.filter((item) => item.wave === wave.wave);
    return {
      files: wave.files,
      items: waveItems.length,
      readyItems: waveItems.filter((item) => item.readyForHumanOptimizationReview).length,
      theme: wave.theme,
      unsafeItems: waveItems.filter((item) => item.unsafeReasons.length > 0).length,
      wave: wave.wave,
    };
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only optimization brief for broad publish waves. It proposes SEO, snippet, opening, internal-link, and risk-language checks without editing article files.",
      stopBefore: "Apply any copy or link changes only during human review. Do not mark review or publish automatically.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      broadPublishWavesGeneratedAt: waves.generatedAt,
      broadPublishWavesGuardrails: waves.guardrails,
      broadPublishWavesSummary: waves.summary,
      reportsUsed: ["autopilot-broad-publish-waves", "internal-link-opportunity-audit", "article front matter and headings"],
    },
    summary: {
      items: items.length,
      itemsWithActionChecklist: items.filter((item) => item.actionChecklist.length >= 8).length,
      itemsWithPublicLinkSuggestion: items.filter((item) => item.publicLinkSuggestion).length,
      itemsWithSearchQueries: items.filter((item) => item.searchQueries.length >= 4).length,
      itemsWithSourceTargets: items.filter((item) => item.sourceTargets.length > 0).length,
      readyItems: items.filter((item) => item.readyForHumanOptimizationReview).length,
      safeDraftItems: items.filter((item) => item.safeDraft).length,
      unsafeItems: unsafeItems.length,
      waveItems: waves.summary.items,
      waves: waveSummaries.length,
      wavesReady: waveSummaries.filter((wave) => wave.readyItems === wave.items && wave.unsafeItems === 0).length,
    },
    nextItems: items.slice(0, 8),
    unsafeItems,
    waveSummaries,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-broad-wave-optimization.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-broad-wave-optimization.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toOptimizationItem(wave: PublishWave, item: WaveItem, linkItem: InternalLinks["candidateItems"][number] | undefined): OptimizationItem {
  const article = readArticle(item.file);
  const description = String(article.data.description || "");
  const h2Count = (article.content.match(/^##\s+/gm) || []).length;
  const publicLinkSuggestion = linkItem?.suggestions[0] || null;
  const firstQuery = item.searchQueries[0] || String(article.data.primaryKeyword || item.cluster);
  const actionChecklist = dedupe([
    `Make the title and first paragraph answer this search intent explicitly: ${firstQuery}.`,
    "Keep the meta description focused on audience, workflow, risk boundary, and review outcome.",
    "Add one exact or near-exact search query naturally in the opening or first H2.",
    "Make the first practical checklist visible before deep implementation detail.",
    "Confirm every fast-changing model, SDK, API, deployment, pricing, and version claim against current official sources.",
    "Remove unsupported traffic, ranking, revenue, benchmark, or guaranteed-outcome language.",
    "Keep human review, rollback, logging, cost, privacy, and failure-handling boundaries explicit.",
    publicLinkSuggestion
      ? `Add one contextual link to the published article "${publicLinkSuggestion.title}" at ${publicLinkSuggestion.url}.`
      : "Add one contextual link to a relevant published article before approval.",
    ...item.reviewFocus.slice(0, 4).map((focus) => `Apply review focus: ${focus}.`),
    ...item.searchQueries.slice(0, 4).map((query) => `Check search phrasing coverage: ${query}.`),
  ]);
  const warningRemediation = dedupe([
    ...(description.length < 80 ? ["Meta description is short; rewrite it before approval."] : []),
    ...(description.length > 180 ? ["Meta description is long; trim it before approval."] : []),
    ...(h2Count < 3 ? ["Article has fewer than 3 H2 sections; confirm structure is scannable enough for a tutorial."] : []),
    ...(linkItem && linkItem.linksToPublicArticles === 0 ? ["No current link to published articles; add one approved contextual public link."] : []),
    ...(item.freshnessRisk === "high" ? ["Freshness risk is high; all implementation-sensitive claims need current source checks."] : []),
  ]);
  const unsafeReasons = [
    ...(!item.safeDraft ? ["item is not a safe draft"] : []),
    ...(!item.readyForHumanFreshnessReview ? ["item is not ready for freshness review"] : []),
    ...(item.searchQueries.length < 4 ? ["missing enough search queries"] : []),
    ...(item.sourceTargets.length < 1 ? ["missing source targets"] : []),
    ...(actionChecklist.length < 8 ? ["missing action checklist"] : []),
    ...(!item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human") ? ["mark review command is not human gated"] : []),
    ...(item.commandBoundary.publishDryRunAfterReview.includes("--confirm") ? ["publish dry-run includes confirm"] : []),
    ...(item.commandBoundary.publishConfirm !== "not-included" ? ["publish confirm is included"] : []),
  ];

  return {
    actionChecklist,
    articleSignals: {
      descriptionLength: description.length,
      h2Count,
      titleLength: String(article.data.title || item.title).length,
    },
    cluster: item.cluster,
    commandBoundary: item.commandBoundary,
    file: normalizeFile(item.file),
    publicLinkSuggestion,
    readyForHumanOptimizationReview: unsafeReasons.length === 0,
    safeDraft: item.safeDraft,
    searchQueries: item.searchQueries,
    sourceTargets: item.sourceTargets,
    title: String(article.data.title || item.title),
    unsafeReasons,
    warningRemediation,
    wave: wave.wave,
  };
}

function readJson<T>(relativePath: string): T {
  const absolutePath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "")) as T;
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function dedupe(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { note: string; stopBefore: string; trafficClaim: string };
  summary: {
    items: number;
    itemsWithActionChecklist: number;
    itemsWithPublicLinkSuggestion: number;
    readyItems: number;
    unsafeItems: number;
    waves: number;
    wavesReady: number;
  };
  nextItems: OptimizationItem[];
  unsafeItems: OptimizationItem[];
  waveSummaries: Array<{ files: string[]; items: number; readyItems: number; theme: string; unsafeItems: number; wave: number }>;
}) {
  const lines = [
    "# Autopilot Broad Wave Optimization",
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
    `- Waves: ${payload.summary.waves}`,
    `- Waves ready: ${payload.summary.wavesReady}`,
    `- Items: ${payload.summary.items}`,
    `- Ready items: ${payload.summary.readyItems}`,
    `- Items with action checklist: ${payload.summary.itemsWithActionChecklist}`,
    `- Items with public link suggestion: ${payload.summary.itemsWithPublicLinkSuggestion}`,
    `- Unsafe items: ${payload.summary.unsafeItems}`,
    "",
    "## Wave Readiness",
    "",
    "| Wave | Ready | Unsafe | Theme | Files |",
    "| --- | --- | --- | --- | --- |",
    ...payload.waveSummaries.map((wave) => `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.unsafeItems} | ${escapeCell(wave.theme)} | ${wave.files.join("<br>")} |`),
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.file}: ${item.unsafeReasons.join("; ")}`) : ["- none"]),
    "",
    "## Next Optimization Items",
    "",
    "| Wave | Ready | Link | H2 | Description | Actions | Warnings | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.nextItems.map(
      (item) =>
        `| ${item.wave} | ${item.readyForHumanOptimizationReview} | ${item.publicLinkSuggestion ? item.publicLinkSuggestion.url : "missing"} | ${item.articleSignals.h2Count} | ${item.articleSignals.descriptionLength} | ${item.actionChecklist.length} | ${item.warningRemediation.length} | ${escapeCell(item.title)} | ${item.file} |`,
    ),
    "",
  ];

  return `${lines.join("\n")}\n`;
}

function escapeCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

main();
