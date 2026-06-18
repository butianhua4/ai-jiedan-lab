import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type DailyOps = {
  generatedAt: string;
  gscDailyActions: {
    batchEnd: number;
    batchStart: number;
    dayIndex: number;
    queueSize: number;
    todayBatch: Array<{ url: string; type: string; cluster: string; score: number }>;
    topQueue: Array<{ url: string; type: string; cluster: string; score: number }>;
    topQueueTarget: number;
  };
  summary: {
    growthReadinessScore: number;
    growthStage: string;
    internalLinkHealth: number;
    orphanPages: number;
    qPages: number;
    totalPages: number;
    weakPages: number;
  };
};

type IndexNowReport = {
  generatedAt: string;
  payload: { urlList: string[] };
  ready: boolean;
  submission: null | { ok: boolean; status: number | string; statusText?: string };
};

type ManualProgress = {
  confirmedSubmittedCount: number;
  lastSubmittedAt: string | null;
  lastSubmittedUrl: string | null;
  notes: string[];
};

const dailyOpsJson = path.join(process.cwd(), "content", "automation", "seo-growth-daily-ops.json");
const indexNowJson = path.join(process.cwd(), "content", "automation", "indexnow-readiness.json");
const manualProgressJson = path.join(process.cwd(), "content", "automation", "gsc-manual-progress.json");
const outputJson = path.join(process.cwd(), "content", "automation", "gsc-submission-progress.json");
const outputMarkdown = path.join(process.cwd(), "docs", "gsc-submission-progress.md");
const top500Text = path.join(process.cwd(), "docs", "gsc-url-inspection-top-500.txt");
const todayText = path.join(process.cwd(), "docs", "gsc-url-inspection-today.txt");

function main() {
  const dailyOps = readJson<DailyOps>(dailyOpsJson);
  const indexNow = readJson<IndexNowReport>(indexNowJson);
  const manual = readManualProgress();
  const topQueue = readUrlText(top500Text);
  const todayQueue = readUrlText(todayText);
  const confirmedSubmittedCount = clamp(manual.confirmedSubmittedCount, 0, topQueue.length);
  const nextUrl = topQueue[confirmedSubmittedCount] ?? null;
  const remainingUrls = topQueue.slice(confirmedSubmittedCount);
  const duplicateUrls = findDuplicates(topQueue);
  const typeSummary = summarizeTypes(dailyOps.gscDailyActions.topQueue);
  const clusterSummary = summarizeClusters(dailyOps.gscDailyActions.topQueue);

  const report = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      gscManualOnly: true,
      noFakeIndexingClaims: true,
      note: "This report tracks prepared and confirmed manual progress. It does not claim Google indexing, ranking, clicks, or impressions.",
    },
    summary: {
      growthStage: dailyOps.summary.growthStage,
      growthReadinessScore: dailyOps.summary.growthReadinessScore,
      internalLinkHealth: dailyOps.summary.internalLinkHealth,
      orphanPages: dailyOps.summary.orphanPages,
      weakPages: dailyOps.summary.weakPages,
      topQueueTarget: dailyOps.gscDailyActions.topQueueTarget,
      topQueueUrls: topQueue.length,
      todayQueueUrls: todayQueue.length,
      confirmedGscSubmitted: confirmedSubmittedCount,
      gscRemaining: remainingUrls.length,
      nextUrl,
      indexNowReady: indexNow.ready,
      indexNowSubmitted: Boolean(indexNow.submission?.ok),
      indexNowUrls: indexNow.payload.urlList.length,
      duplicateUrls: duplicateUrls.length,
    },
    manualProgress: manual,
    queueHealth: {
      duplicateUrls,
      typeSummary,
      clusterSummary,
      firstRemainingUrls: remainingUrls.slice(0, 20),
    },
    improvementActions: buildImprovementActions({
      confirmedSubmittedCount,
      duplicateCount: duplicateUrls.length,
      indexNow,
      orphanPages: dailyOps.summary.orphanPages,
      topQueueLength: topQueue.length,
      weakPages: dailyOps.summary.weakPages,
    }),
  };

  fs.mkdirSync(path.dirname(outputJson), { recursive: true });
  fs.mkdirSync(path.dirname(outputMarkdown), { recursive: true });
  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(outputMarkdown, toMarkdown(report), "utf8");

  console.log(
    JSON.stringify(
      {
        ok: true,
        json: rel(outputJson),
        markdown: rel(outputMarkdown),
        topQueueUrls: topQueue.length,
        confirmedGscSubmitted: confirmedSubmittedCount,
        gscRemaining: remainingUrls.length,
        indexNowUrls: indexNow.payload.urlList.length,
        nextUrl,
      },
      null,
      2,
    ),
  );
}

function readJson<T>(file: string): T {
  if (!fs.existsSync(file)) throw new Error(`Missing ${rel(file)}.`);
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function readManualProgress(): ManualProgress {
  if (!fs.existsSync(manualProgressJson)) {
    const initial: ManualProgress = {
      confirmedSubmittedCount: 0,
      lastSubmittedAt: null,
      lastSubmittedUrl: null,
      notes: ["Update confirmedSubmittedCount after manual URL Inspection requests in GSC."],
    };
    fs.mkdirSync(path.dirname(manualProgressJson), { recursive: true });
    fs.writeFileSync(manualProgressJson, `${JSON.stringify(initial, null, 2)}\n`, "utf8");
    return initial;
  }

  const manual = readJson<ManualProgress>(manualProgressJson);
  return {
    confirmedSubmittedCount: Number.isFinite(manual.confirmedSubmittedCount) ? manual.confirmedSubmittedCount : 0,
    lastSubmittedAt: manual.lastSubmittedAt ?? null,
    lastSubmittedUrl: manual.lastSubmittedUrl ?? null,
    notes: Array.isArray(manual.notes) ? manual.notes : [],
  };
}

function readUrlText(file: string) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${rel(file)}.`);
  return fs
    .readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function findDuplicates(urls: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const url of urls) {
    if (seen.has(url)) duplicates.add(url);
    seen.add(url);
  }
  return [...duplicates];
}

function summarizeTypes(items: DailyOps["gscDailyActions"]["topQueue"]) {
  return items.reduce<Record<string, number>>((summary, item) => {
    summary[item.type] = (summary[item.type] ?? 0) + 1;
    return summary;
  }, {});
}

function summarizeClusters(items: DailyOps["gscDailyActions"]["topQueue"]) {
  return items.reduce<Record<string, number>>((summary, item) => {
    summary[item.cluster] = (summary[item.cluster] ?? 0) + 1;
    return summary;
  }, {});
}

function buildImprovementActions(input: {
  confirmedSubmittedCount: number;
  duplicateCount: number;
  indexNow: IndexNowReport;
  orphanPages: number;
  topQueueLength: number;
  weakPages: number;
}) {
  const actions = [
    "Keep requesting GSC URL Inspection from docs/gsc-url-inspection-today.txt until rate-limited, then update content/automation/gsc-manual-progress.json.",
    "After a manual GSC batch, run npm run search-console:mark-submitted -- --add=<submitted count>, then rerun npm run search-console:progress.",
    "After 24-72 hours, compare GSC Page Indexing statuses for the top 500 queue and prioritize pages that move from discovered to crawled.",
    "When impressions appear, optimize only pages with evidence: tighten title, first answer block, FAQ, and related q links.",
  ];

  if (input.confirmedSubmittedCount === 0) {
    actions.unshift("No confirmed manual GSC submissions are recorded yet; set confirmedSubmittedCount after using the GSC UI.");
  }
  if (!input.indexNow.submission?.ok) actions.push("Retry IndexNow submission after verifying the key route still returns 200.");
  if (input.duplicateCount > 0) actions.push("Remove duplicate URLs from the top queue before further expansion.");
  if (input.orphanPages > 0 || input.weakPages > 0) actions.push("Repair orphan or weak pages before generating more URLs.");
  if (input.topQueueLength >= 500) actions.push("Do not expand beyond 500 until GSC shows crawl/indexing movement for this queue.");

  return actions;
}

function toMarkdown(report: {
  generatedAt: string;
  guardrails: { gscManualOnly: boolean; noFakeIndexingClaims: boolean; note: string };
  improvementActions: string[];
  manualProgress: ManualProgress;
  queueHealth: {
    clusterSummary: Record<string, number>;
    duplicateUrls: string[];
    firstRemainingUrls: string[];
    typeSummary: Record<string, number>;
  };
  summary: {
    confirmedGscSubmitted: number;
    duplicateUrls: number;
    growthReadinessScore: number;
    growthStage: string;
    gscRemaining: number;
    indexNowReady: boolean;
    indexNowSubmitted: boolean;
    indexNowUrls: number;
    internalLinkHealth: number;
    nextUrl: string | null;
    orphanPages: number;
    todayQueueUrls: number;
    topQueueTarget: number;
    topQueueUrls: number;
    weakPages: number;
  };
}) {
  return [
    "# GSC Submission Progress",
    "",
    `Generated at: ${report.generatedAt}`,
    "",
    "## Guardrails",
    "",
    `- GSC manual only: ${report.guardrails.gscManualOnly}`,
    `- No fake indexing claims: ${report.guardrails.noFakeIndexingClaims}`,
    `- Note: ${report.guardrails.note}`,
    "",
    "## Status",
    "",
    `- Growth stage: ${report.summary.growthStage}`,
    `- Growth readiness score: ${report.summary.growthReadinessScore}`,
    `- Internal link health: ${report.summary.internalLinkHealth}`,
    `- Orphan pages: ${report.summary.orphanPages}`,
    `- Weak pages: ${report.summary.weakPages}`,
    `- Top queue target: ${report.summary.topQueueTarget}`,
    `- Top queue URLs: ${report.summary.topQueueUrls}`,
    `- Today queue URLs: ${report.summary.todayQueueUrls}`,
    `- Confirmed GSC submitted: ${report.summary.confirmedGscSubmitted}`,
    `- GSC remaining: ${report.summary.gscRemaining}`,
    `- Next URL: ${report.summary.nextUrl ?? "none"}`,
    `- IndexNow ready: ${report.summary.indexNowReady}`,
    `- IndexNow submitted: ${report.summary.indexNowSubmitted}`,
    `- IndexNow URLs: ${report.summary.indexNowUrls}`,
    `- Duplicate URLs: ${report.summary.duplicateUrls}`,
    "",
    "## Queue Mix",
    "",
    `- Types: ${JSON.stringify(report.queueHealth.typeSummary)}`,
    `- Clusters: ${JSON.stringify(report.queueHealth.clusterSummary)}`,
    "",
    "## First Remaining URLs",
    "",
    ...report.queueHealth.firstRemainingUrls.map((url, index) => `${index + 1}. ${url}`),
    "",
    "## Improvement Actions",
    "",
    ...report.improvementActions.map((action) => `- ${action}`),
    "",
  ].join("\n");
}

main();
