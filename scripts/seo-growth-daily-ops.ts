import fs from "fs";
import path from "path";
import { site } from "../data/site";
import { rel } from "./content-utils";

type PriorityItem = {
  cluster: string;
  path: string;
  reason: string;
  score: number;
  title: string;
  type: "cluster" | "q" | "blog" | "static";
  url: string;
};

type PriorityPayload = {
  allItems: PriorityItem[];
  firstManualBatch: PriorityItem[];
  generatedAt: string;
  recommendedManualBatchSize: {
    dailyAfterFirstDay: number;
    firstDay: number;
    note: string;
  };
  summary: {
    blogPages: number;
    clusterPages: number;
    growthReadinessScore: number;
    growthStage: string;
    internalLinkHealth: number;
    orphanPages: number;
    qPages: number;
    totalPages: number;
    weakPages: number;
  };
};

type ProblemLane = {
  examples: PriorityItem[];
  keywords: string[];
  lane: string;
  publishingRule: string;
  reason: string;
};

type ManualProgress = {
  confirmedSubmittedCount: number;
  lastSubmittedAt: string | null;
  lastSubmittedUrl: string | null;
  notes: string[];
};

const priorityJson = path.join(process.cwd(), "content", "automation", "gsc-indexing-priority.json");
const manualProgressJson = path.join(process.cwd(), "content", "automation", "gsc-manual-progress.json");
const outputJson = path.join(process.cwd(), "content", "automation", "seo-growth-daily-ops.json");
const outputMarkdown = path.join(process.cwd(), "docs", "seo-growth-daily-ops.md");
const outputText = path.join(process.cwd(), "docs", "gsc-url-inspection-today.txt");
const outputTop100Text = path.join(process.cwd(), "docs", "gsc-url-inspection-top-100.txt");
const outputTop500Text = path.join(process.cwd(), "docs", "gsc-url-inspection-top-500.txt");
const dailyBatchSize = 50;
const topQueueTarget = 500;
const launchDate = "2026-06-18";
const pinnedInspectionItems: PriorityItem[] = [
  {
    cluster: "us-entry",
    path: "/en",
    reason: "US search entry page with English metadata and links into q, cluster, blog, and tool pages.",
    score: 120,
    title: "AI Tools Guide for Deployment, Agents, RAG, and Automation",
    type: "static",
    url: `${site.url}/en`,
  },
];

const laneSeeds = [
  {
    keywords: ["codex", "npm", "install", "rollback", "windows"],
    lane: "Codex errors and setup",
    publishingRule: "Write exact error, cause, fix steps, rollback, and a safe verification checklist.",
    reason: "Codex setup and error searches are concrete, urgent, and easier to rank than broad AI tool posts.",
  },
  {
    keywords: ["vercel", "deploy", "build", "env", "404"],
    lane: "Vercel deployment failures",
    publishingRule: "Start from the failure message, then cover logs, env vars, routing, build command, and rollback.",
    reason: "Deployment errors create high-intent searches and naturally connect to tools and services.",
  },
  {
    keywords: ["github", "actions", "push", "authentication", "package-lock"],
    lane: "GitHub Actions and Git failures",
    publishingRule: "Use a problem-first title, include commands, expected output, and when to avoid destructive fixes.",
    reason: "CI and Git failures are searched by exact phrase and support frequent q-page expansion.",
  },
  {
    keywords: ["agent", "tool", "permission", "deployment", "observability"],
    lane: "Agent deployment and tool permissions",
    publishingRule: "Cover permission boundaries, logs, human approval, tool allowlists, and production checks.",
    reason: "Agent deployment is growing but needs practical, safety-aware pages instead of generic agent theory.",
  },
  {
    keywords: ["rag", "memory", "vector", "pgvector", "retrieval"],
    lane: "RAG memory and retrieval issues",
    publishingRule: "Separate RAG, user memory, vector search, citations, deletion, and evaluation.",
    reason: "Searchers confuse RAG and memory; clear troubleshooting pages can become strong evergreen entries.",
  },
  {
    keywords: ["api", "key", "rate", "limit", "claude", "openai"],
    lane: "API keys, rate limits, and model routing",
    publishingRule: "Explain the error, server-side key handling, backoff, queues, cost caps, and log redaction.",
    reason: "API failures are high-frequency and commercial because users need working integrations.",
  },
];

function main() {
  const priority = readPriority();
  const manualProgress = readManualProgress();
  const queue = getInspectionQueue(priority.allItems);
  const batchPlan = getTodayBatchPlan(queue, priority.recommendedManualBatchSize.firstDay, manualProgress.confirmedSubmittedCount);
  const topQueue = queue.slice(0, Math.min(topQueueTarget, queue.length));
  const top100Queue = queue.slice(0, Math.min(100, queue.length));
  const problemLanes = buildProblemLanes(priority.allItems);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      fakeTrafficClaims: false,
      manualGscOnly: true,
      note: "This workflow does not claim indexing, ranking, impressions, clicks, or income. It uses local SEO structure and Search Console operating rules.",
    },
    gscDailyActions: {
      sitemapIndex: `${site.url}/sitemap.xml`,
      submitSitemapFirst: true,
      manualUrlInspectionLimit: dailyBatchSize,
      topQueueTarget,
      launchDate,
      confirmedSubmittedCount: manualProgress.confirmedSubmittedCount,
      dayIndex: batchPlan.dayIndex,
      queueSize: queue.length,
      batchStart: batchPlan.start + 1,
      batchEnd: Math.min(queue.length, batchPlan.start + batchPlan.todayBatch.length),
      wrapsQueue: batchPlan.wrapsQueue,
      todayBatch: batchPlan.todayBatch,
      topQueue,
      operatingRule: "Submit sitemap.xml first in GSC. Then use URL Inspection from todayBatch until the top 500 queue is processed or GSC rate-limits requests.",
    },
    contentDailyActions: {
      targetFormat: "problem-entry page",
      avoidFormat: "generic AI tool introduction",
      rule: "Prioritize concrete searched problems: exact error, quick fix, detailed steps, command/code, risks, related q pages, and one deep blog link.",
      problemLanes,
    },
    summary: priority.summary,
  };

  fs.mkdirSync(path.dirname(outputJson), { recursive: true });
  fs.mkdirSync(path.dirname(outputMarkdown), { recursive: true });
  fs.writeFileSync(outputJson, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(outputMarkdown, toMarkdown(payload), "utf8");
  fs.writeFileSync(outputText, toTextBatch(batchPlan.todayBatch), "utf8");
  fs.writeFileSync(outputTop100Text, toTextBatch(top100Queue), "utf8");
  fs.writeFileSync(outputTop500Text, toTextBatch(topQueue), "utf8");

  console.log(
    JSON.stringify(
      {
        ok: true,
        json: rel(outputJson),
        markdown: rel(outputMarkdown),
        text: rel(outputText),
        top100Text: rel(outputTop100Text),
        top500Text: rel(outputTop500Text),
        todayBatch: batchPlan.todayBatch.length,
        batchStart: batchPlan.start + 1,
        batchEnd: Math.min(queue.length, batchPlan.start + batchPlan.todayBatch.length),
        wrapsQueue: batchPlan.wrapsQueue,
        dayIndex: batchPlan.dayIndex,
        problemLanes: problemLanes.length,
        growthStage: priority.summary.growthStage,
      },
      null,
      2,
    ),
  );
}

function readPriority(): PriorityPayload {
  if (!fs.existsSync(priorityJson)) {
    throw new Error(`Missing ${rel(priorityJson)}. Run npm run search-console:indexing-priority first.`);
  }

  return JSON.parse(fs.readFileSync(priorityJson, "utf8")) as PriorityPayload;
}

function readManualProgress(): ManualProgress {
  if (!fs.existsSync(manualProgressJson)) {
    return {
      confirmedSubmittedCount: 0,
      lastSubmittedAt: null,
      lastSubmittedUrl: null,
      notes: [],
    };
  }

  const parsed = JSON.parse(fs.readFileSync(manualProgressJson, "utf8")) as ManualProgress;
  return {
    confirmedSubmittedCount: Number.isFinite(parsed.confirmedSubmittedCount) ? parsed.confirmedSubmittedCount : 0,
    lastSubmittedAt: parsed.lastSubmittedAt ?? null,
    lastSubmittedUrl: parsed.lastSubmittedUrl ?? null,
    notes: Array.isArray(parsed.notes) ? parsed.notes : [],
  };
}

function getInspectionQueue(items: PriorityItem[]) {
  const eligible = items.filter((item) => item.type === "cluster" || item.type === "q" || item.type === "blog");
  const seen = new Set<string>();
  return [...pinnedInspectionItems, ...eligible].filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function getTodayBatchPlan(queue: PriorityItem[], firstDaySize: number, confirmedSubmittedCount: number) {
  if (queue.length <= dailyBatchSize) {
    return { dayIndex: 0, start: 0, todayBatch: queue, wrapsQueue: false };
  }

  const dayIndex = Math.max(0, daysSinceLaunch());
  const start = Math.min(Math.max(0, confirmedSubmittedCount), queue.length);
  const targetEnd = Math.min(topQueueTarget, queue.length);
  if (start < targetEnd) {
    const end = dayIndex === 0 ? Math.min(firstDaySize, targetEnd) : targetEnd;
    return { dayIndex, start, todayBatch: queue.slice(start, Math.max(start, end)), wrapsQueue: false };
  }

  const laterStart = topQueueTarget + (dayIndex - 1) * dailyBatchSize;
  const wrappedStart = laterStart % queue.length;
  const todayBatch = queue.slice(wrappedStart, wrappedStart + dailyBatchSize);
  if (todayBatch.length === dailyBatchSize) {
    return { dayIndex, start: wrappedStart, todayBatch, wrapsQueue: false };
  }

  return {
    dayIndex,
    start: wrappedStart,
    todayBatch: [...todayBatch, ...queue.slice(0, dailyBatchSize - todayBatch.length)],
    wrapsQueue: true,
  };
}

function daysSinceLaunch() {
  const today = shanghaiDateKey(new Date());
  return Math.floor((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${launchDate}T00:00:00Z`)) / 86_400_000);
}

function shanghaiDateKey(date: Date) {
  const shanghai = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  return shanghai.toISOString().slice(0, 10);
}

function toTextBatch(items: PriorityItem[]) {
  return `${items.map((item) => item.url).join("\n")}\n`;
}

function buildProblemLanes(items: PriorityItem[]): ProblemLane[] {
  return laneSeeds.map((lane) => ({
    ...lane,
    examples: items
      .filter((item) => item.type === "q")
      .filter((item) => lane.keywords.some((keyword) => searchableText(item).includes(keyword)))
      .slice(0, 5),
  }));
}

function searchableText(item: PriorityItem) {
  return `${item.cluster} ${item.path} ${item.title}`.toLowerCase();
}

function toMarkdown(payload: {
  contentDailyActions: {
    avoidFormat: string;
    problemLanes: ProblemLane[];
    rule: string;
    targetFormat: string;
  };
  generatedAt: string;
  gscDailyActions: {
    batchEnd: number;
    batchStart: number;
    dayIndex: number;
    launchDate: string;
    manualUrlInspectionLimit: number;
    operatingRule: string;
    queueSize: number;
    sitemapIndex: string;
    submitSitemapFirst: boolean;
    todayBatch: PriorityItem[];
    topQueue: PriorityItem[];
    topQueueTarget: number;
    wrapsQueue: boolean;
  };
  guardrails: {
    fakeTrafficClaims: boolean;
    manualGscOnly: boolean;
    note: string;
  };
  summary: PriorityPayload["summary"];
}) {
  return [
    "# SEO Growth Daily Ops",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "## Guardrails",
    "",
    `- Fake traffic claims: ${payload.guardrails.fakeTrafficClaims}`,
    `- Manual GSC only: ${payload.guardrails.manualGscOnly}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Current Growth State",
    "",
    `- Growth stage: ${payload.summary.growthStage}`,
    `- Total pages: ${payload.summary.totalPages}`,
    `- Q pages: ${payload.summary.qPages}`,
    `- Cluster pages: ${payload.summary.clusterPages}`,
    `- Blog pages: ${payload.summary.blogPages}`,
    `- Orphan pages: ${payload.summary.orphanPages}`,
    `- Weak pages: ${payload.summary.weakPages}`,
    `- Internal link health: ${payload.summary.internalLinkHealth}`,
    `- Growth readiness score: ${payload.summary.growthReadinessScore}`,
    "",
    "## Daily GSC Actions",
    "",
    `1. Submit sitemap index: ${payload.gscDailyActions.sitemapIndex}`,
    `2. Top queue target: ${payload.gscDailyActions.topQueueTarget}`,
    `3. Queue window: day ${payload.gscDailyActions.dayIndex + 1} since ${payload.gscDailyActions.launchDate}, URLs ${payload.gscDailyActions.batchStart}-${payload.gscDailyActions.batchEnd} of ${payload.gscDailyActions.queueSize}${payload.gscDailyActions.wrapsQueue ? " plus queue restart" : ""}`,
    `4. Rule: ${payload.gscDailyActions.operatingRule}`,
    "",
    "### Today URL Inspection Batch",
    "",
    ...payload.gscDailyActions.todayBatch.map((item, index) => `${index + 1}. ${item.url} (${item.type}, ${item.cluster}, score ${item.score})`),
    "",
    `### Top ${payload.gscDailyActions.topQueueTarget} Queue`,
    "",
    ...payload.gscDailyActions.topQueue.map((item, index) => `${index + 1}. ${item.url} (${item.type}, ${item.cluster}, score ${item.score})`),
    "",
    "## Daily Content Actions",
    "",
    `- Target format: ${payload.contentDailyActions.targetFormat}`,
    `- Avoid format: ${payload.contentDailyActions.avoidFormat}`,
    `- Rule: ${payload.contentDailyActions.rule}`,
    "",
    ...payload.contentDailyActions.problemLanes.flatMap((lane) => [
      `### ${lane.lane}`,
      "",
      `- Reason: ${lane.reason}`,
      `- Publishing rule: ${lane.publishingRule}`,
      `- Keywords: ${lane.keywords.join(", ")}`,
      "- Current q examples:",
      ...(lane.examples.length > 0 ? lane.examples.map((item) => `  - ${item.url}`) : ["  - No current priority q example; use this lane for the next problem-entry brief."]),
      "",
    ]),
  ].join("\n");
}

main();
