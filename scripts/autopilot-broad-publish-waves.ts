import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type TriageItem = {
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
  readyForHumanFreshnessReview: boolean;
  reviewFocus: string[];
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
};

type BroadFreshnessTriage = {
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
    readyItems: number;
    safeDraftItems: number;
    unsafeItems: number;
  };
};

type ProjectStatus = {
  articles: {
    publicPublished: number;
  };
};

type WaveItem = TriageItem & {
  reviewOrder: number;
};

type PublishWave = {
  commandBoundary: {
    markReviewCommandsAfterHumanApproval: string[];
    publishConfirm: "not-included";
    publishDryRunAfterReview: string[];
    stopBefore: string;
  };
  clusters: string[];
  files: string[];
  humanApprovalRequired: true;
  items: WaveItem[];
  projectedPublicPublishedAfterApproval: number;
  readyItems: number;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  theme: string;
  unsafeItems: number;
  wave: number;
};

const maxWaves = 8;
const maxItemsPerWave = 3;

function main() {
  const triage = readJson<BroadFreshnessTriage>("content/automation/autopilot-broad-freshness-triage.json");
  const projectStatus = readJson<ProjectStatus>("content/automation/project-status.json");
  const selected = prioritizeItems(triage.items).slice(0, maxWaves * maxItemsPerWave);
  const waves = buildWaves(selected, projectStatus.articles.publicPublished);
  const unsafeWaves = waves.filter((wave) => wave.unsafeItems > 0 || !hasSafeCommandBoundary(wave));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only broad publish wave planner. It turns high-demand freshness triage items into small human approval batches and never changes article status.",
      stopBefore: "Stop before mark:review and publish. Human approval is required per file and per wave.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      projectStatusPublicPublished: projectStatus.articles.publicPublished,
      triageGeneratedAt: triage.generatedAt,
      triageGuardrails: triage.guardrails,
      triageSummary: triage.summary,
    },
    summary: {
      clustersCovered: new Set(waves.flatMap((wave) => wave.clusters)).size,
      currentPublicPublished: projectStatus.articles.publicPublished,
      items: waves.reduce((sum, wave) => sum + wave.items.length, 0),
      itemsPerWaveMax: maxItemsPerWave,
      readyItems: waves.reduce((sum, wave) => sum + wave.readyItems, 0),
      safeDraftItems: waves.flatMap((wave) => wave.items).filter((item) => item.safeDraft).length,
      unsafeItems: waves.reduce((sum, wave) => sum + wave.unsafeItems, 0),
      unsafeWaves: unsafeWaves.length,
      uniqueFiles: new Set(waves.flatMap((wave) => wave.files)).size,
      waves: waves.length,
      wavesReadyForHumanApproval: waves.filter((wave) => wave.readyItems === wave.items.length && wave.unsafeItems === 0 && hasSafeCommandBoundary(wave)).length,
    },
    nextWave: waves[0] || null,
    unsafeWaves,
    waves,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-broad-publish-waves.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-broad-publish-waves.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeWaves.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeWaves.length) process.exitCode = 1;
}

function prioritizeItems(items: TriageItem[]) {
  const byCluster = new Map<string, TriageItem[]>();
  for (const item of items.filter((entry) => entry.readyForHumanFreshnessReview && entry.safeDraft)) {
    const clusterItems = byCluster.get(item.cluster) || [];
    clusterItems.push(item);
    byCluster.set(item.cluster, clusterItems);
  }

  for (const clusterItems of byCluster.values()) {
    clusterItems.sort(compareItems);
  }

  const clusters = [...byCluster.entries()].sort((a, b) => {
    const aMax = a[1][0]?.freshnessPriority || 0;
    const bMax = b[1][0]?.freshnessPriority || 0;
    return bMax - aMax || a[0].localeCompare(b[0]);
  });

  const ordered: TriageItem[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const [, clusterItems] of clusters) {
      const next = clusterItems.shift();
      if (next) {
        ordered.push(next);
        added = true;
      }
    }
  }

  return ordered;
}

function buildWaves(items: TriageItem[], currentPublicPublished: number) {
  const waves: PublishWave[] = [];
  for (let index = 0; index < items.length; index += maxItemsPerWave) {
    const waveItems = items.slice(index, index + maxItemsPerWave).map((item, itemIndex) => ({
      ...item,
      reviewOrder: itemIndex + 1,
    }));
    const waveNumber = waves.length + 1;
    const clusters = dedupe(waveItems.map((item) => item.cluster));
    const files = waveItems.map((item) => item.file);
    const searchQueries = dedupe(waveItems.flatMap((item) => item.searchQueries)).slice(0, 12);
    const sourceTargets = dedupe(waveItems.flatMap((item) => item.sourceTargets)).slice(0, 12);
    const reviewFocus = dedupe(waveItems.flatMap((item) => item.reviewFocus)).slice(0, 12);
    const unsafeItems = waveItems.filter((item) => !item.readyForHumanFreshnessReview || !item.safeDraft || !hasSafeItemCommands(item)).length;

    waves.push({
      commandBoundary: {
        markReviewCommandsAfterHumanApproval: waveItems.map((item) => item.commandBoundary.markReviewAfterHumanApproval),
        publishDryRunAfterReview: waveItems.map((item) => item.commandBoundary.publishDryRunAfterReview),
        publishConfirm: "not-included",
        stopBefore: "Run mark:review only after human fact-check approval. Run publish dry-run after review status. Do not run publish with --confirm here.",
      },
      clusters,
      files,
      humanApprovalRequired: true,
      items: waveItems,
      projectedPublicPublishedAfterApproval: currentPublicPublished + files.length,
      readyItems: waveItems.filter((item) => item.readyForHumanFreshnessReview).length,
      reviewFocus,
      searchQueries,
      sourceTargets,
      theme: clusters.join(" + "),
      unsafeItems,
      wave: waveNumber,
    });
  }

  return waves;
}

function compareItems(a: TriageItem, b: TriageItem) {
  return (
    b.freshnessPriority - a.freshnessPriority ||
    riskRank(b.freshnessRisk) - riskRank(a.freshnessRisk) ||
    a.cluster.localeCompare(b.cluster) ||
    a.file.localeCompare(b.file)
  );
}

function riskRank(risk: TriageItem["freshnessRisk"]) {
  if (risk === "high") return 3;
  if (risk === "medium") return 2;
  return 1;
}

function hasSafeItemCommands(item: TriageItem) {
  return (
    item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !item.commandBoundary.publishDryRunAfterReview.includes("--confirm") &&
    item.commandBoundary.publishConfirm === "not-included"
  );
}

function hasSafeCommandBoundary(wave: PublishWave) {
  return (
    wave.humanApprovalRequired === true &&
    wave.commandBoundary.publishConfirm === "not-included" &&
    wave.commandBoundary.markReviewCommandsAfterHumanApproval.length === wave.items.length &&
    wave.commandBoundary.markReviewCommandsAfterHumanApproval.every((command) => command.includes("--confirm-human")) &&
    wave.commandBoundary.publishDryRunAfterReview.length === wave.items.length &&
    wave.commandBoundary.publishDryRunAfterReview.every((command) => !command.includes("--confirm"))
  );
}

function dedupe(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  const absolutePath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { note: string; stopBefore: string; trafficClaim: string };
  summary: {
    clustersCovered: number;
    currentPublicPublished: number;
    items: number;
    readyItems: number;
    unsafeItems: number;
    unsafeWaves: number;
    uniqueFiles: number;
    waves: number;
    wavesReadyForHumanApproval: number;
  };
  waves: PublishWave[];
}) {
  const lines = [
    "# Autopilot Broad Publish Waves",
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
    `- Current public published: ${payload.summary.currentPublicPublished}`,
    `- Waves: ${payload.summary.waves}`,
    `- Waves ready for human approval: ${payload.summary.wavesReadyForHumanApproval}`,
    `- Items: ${payload.summary.items}`,
    `- Ready items: ${payload.summary.readyItems}`,
    `- Unique files: ${payload.summary.uniqueFiles}`,
    `- Clusters covered: ${payload.summary.clustersCovered}`,
    `- Unsafe items: ${payload.summary.unsafeItems}`,
    `- Unsafe waves: ${payload.summary.unsafeWaves}`,
    "",
    "## Waves",
    "",
    "| Wave | Ready | Projected public after approval | Theme | Files |",
    "| --- | --- | --- | --- | --- |",
    ...payload.waves.map(
      (wave) =>
        `| ${wave.wave} | ${wave.readyItems}/${wave.items.length} | ${wave.projectedPublicPublishedAfterApproval} | ${escapeCell(wave.theme)} | ${wave.files.join("<br>")} |`,
    ),
    "",
    "## Next Wave Detail",
    "",
  ];

  for (const wave of payload.waves.slice(0, 3)) {
    lines.push(`### Wave ${wave.wave}: ${wave.theme}`, "");
    lines.push("- Stop before publish with --confirm.");
    lines.push("- Mark review commands require human approval:");
    for (const command of wave.commandBoundary.markReviewCommandsAfterHumanApproval) lines.push(`  - ${command}`);
    lines.push("", "| Order | Risk | Checks | Sources | Queries | Title | File |", "| --- | --- | --- | --- | --- | --- | --- |");
    for (const item of wave.items) {
      lines.push(
        `| ${item.reviewOrder} | ${item.freshnessRisk} | ${item.humanFactCheckChecklist.length} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${escapeCell(item.title)} | ${item.file} |`,
      );
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function escapeCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

main();
