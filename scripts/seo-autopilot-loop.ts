import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { site } from "../data/site";
import { rel } from "./content-utils";

type Task = {
  args: string[];
  critical?: boolean;
  title: string;
  timeoutMs?: number;
};

type TaskResult = {
  critical: boolean;
  durationMs: number;
  exitCode: number | null;
  ok: boolean;
  stderrTail: string;
  stdoutTail: string;
  title: string;
};

type JsonFile<T> = T | null;

const isWindows = process.platform === "win32";
const strict = process.argv.includes("--strict");
const baseUrl = readArg("url") || site.url;
const outputJson = path.join(process.cwd(), "content", "automation", "seo-autopilot-loop.json");
const outputMarkdown = path.join(process.cwd(), "docs", "seo-autopilot-loop.md");

const tasks: Task[] = [
  { title: "Refresh GSC indexing priority", args: ["run", "search-console:indexing-priority"], critical: true },
  { title: "Refresh SEO growth daily ops", args: ["run", "seo:growth-daily-ops"], critical: true },
  { title: "Refresh IndexNow readiness", args: ["run", "indexnow:readiness"] },
  { title: "Refresh GSC submission progress", args: ["run", "search-console:progress"], critical: true },
  { title: "Refresh SEO improvement priority", args: ["run", "seo:improvement-priority"], critical: true },
  { title: "Run traffic evidence audit", args: ["run", "traffic:evidence", "--", `--url=${baseUrl}`, "--fetch-retries=4", "--fetch-timeout-ms=15000"] },
  { title: "Check production deployment freshness", args: ["run", "deploy:freshness", "--", `--url=${baseUrl}`, "--fetch-retries=4", "--fetch-timeout-ms=15000"] },
  { title: "Run traffic claim guard", args: ["run", "traffic:claim-guard"], critical: true },
  { title: "Run searchability check", args: ["run", "searchability:check"], critical: true },
  { title: "Run SEO safety check", args: ["run", "seo:check"], critical: true },
  { title: "Run content integrity audit", args: ["run", "content:integrity"], critical: true },
  { title: "Run search snippet readiness audit", args: ["run", "seo:snippets"], critical: true },
  { title: "Run structured data readiness audit", args: ["run", "seo:schema"], critical: true },
  { title: "Run SEO growth heartbeat", args: ["run", "seo:heartbeat"], timeoutMs: 120000 },
];

async function main() {
  const startedAt = new Date().toISOString();
  const results = tasks.map(runTask);
  const endedAt = new Date().toISOString();
  const gscProgress = readJson<{
    queueHealth?: { firstRemainingUrls?: string[]; typeSummary?: Record<string, number>; clusterSummary?: Record<string, number> };
    summary?: {
      confirmedGscSubmitted?: number;
      gscRemaining?: number;
      growthReadinessScore?: number;
      growthStage?: string;
      internalLinkHealth?: number;
      nextUrl?: string | null;
      orphanPages?: number;
      topQueueUrls?: number;
      weakPages?: number;
    };
  }>("content/automation/gsc-submission-progress.json");
  const improvement = readJson<{
    priorityLanes?: Array<{ name: string; status: string; impact: string; evidence: string; action: string }>;
    summary?: Record<string, number | string | boolean>;
  }>("content/automation/seo-improvement-priority.json");
  const heartbeat = readJson<{
    status?: { severity?: string; healthScore?: number; growthStage?: string; canContinueScaling?: boolean };
    problems?: Array<{ severity: string; area: string; message: string }>;
    nextActions?: string[];
  }>("content/automation/seo-growth-heartbeat.json");
  const traffic = readJson<{
    summary?: { trafficDataAvailable?: boolean; measuredTrafficSources?: number; searchConsoleVerificationEvidence?: boolean };
  }>("content/automation/traffic-evidence-audit.json");

  const criticalFailures = results.filter((result) => result.critical && !result.ok);
  const advisoryFailures = results.filter((result) => !result.critical && !result.ok);
  const nextActions = buildNextActions(gscProgress, improvement, heartbeat, traffic, criticalFailures);
  const payload = {
    generatedAt: endedAt,
    startedAt,
    endedAt,
    guardrails: {
      autoPublish: false,
      autoGenerateMassContent: false,
      fakeTrafficClaims: false,
      failMode: strict ? "strict" : "report-only",
      note: "This loop refreshes SEO growth reports and next actions. It does not claim Google indexing, traffic, clicks, rankings, or revenue.",
    },
    status: {
      ok: criticalFailures.length === 0,
      severity: criticalFailures.length > 0 ? "red" : advisoryFailures.length > 0 || heartbeat?.status?.severity === "yellow" ? "yellow" : "green",
      criticalFailures: criticalFailures.length,
      advisoryFailures: advisoryFailures.length,
      healthScore: heartbeat?.status?.healthScore ?? null,
      growthStage: gscProgress?.summary?.growthStage ?? heartbeat?.status?.growthStage ?? "unknown",
      canContinueScaling: heartbeat?.status?.canContinueScaling ?? null,
    },
    gsc: {
      nextUrl: gscProgress?.summary?.nextUrl ?? null,
      confirmedSubmitted: gscProgress?.summary?.confirmedGscSubmitted ?? null,
      remaining: gscProgress?.summary?.gscRemaining ?? null,
      topQueueUrls: gscProgress?.summary?.topQueueUrls ?? null,
      firstRemainingUrls: gscProgress?.queueHealth?.firstRemainingUrls?.slice(0, 15) ?? [],
      queueMix: gscProgress?.queueHealth?.typeSummary ?? {},
      clusterMix: gscProgress?.queueHealth?.clusterSummary ?? {},
    },
    growth: {
      readinessScore: gscProgress?.summary?.growthReadinessScore ?? null,
      internalLinkHealth: gscProgress?.summary?.internalLinkHealth ?? null,
      orphanPages: gscProgress?.summary?.orphanPages ?? null,
      weakPages: gscProgress?.summary?.weakPages ?? null,
    },
    traffic: {
      dataAvailable: traffic?.summary?.trafficDataAvailable ?? false,
      measuredSources: traffic?.summary?.measuredTrafficSources ?? 0,
      searchConsoleVerificationEvidence: traffic?.summary?.searchConsoleVerificationEvidence ?? false,
    },
    problems: heartbeat?.problems ?? [],
    priorityLanes: improvement?.priorityLanes?.slice(0, 5) ?? [],
    nextActions,
    tasks: results,
  };

  fs.mkdirSync(path.dirname(outputJson), { recursive: true });
  fs.mkdirSync(path.dirname(outputMarkdown), { recursive: true });
  fs.writeFileSync(outputJson, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(outputMarkdown, toMarkdown(payload), "utf8");

  console.log(
    JSON.stringify(
      {
        ok: payload.status.ok,
        severity: payload.status.severity,
        growthStage: payload.status.growthStage,
        healthScore: payload.status.healthScore,
        nextUrl: payload.gsc.nextUrl,
        json: rel(outputJson),
        markdown: rel(outputMarkdown),
      },
      null,
      2,
    ),
  );

  if (strict && criticalFailures.length > 0) process.exitCode = 1;
}

function runTask(task: Task): TaskResult {
  const started = Date.now();
  const command = isWindows ? "cmd.exe" : "npm";
  const args = isWindows ? ["/d", "/s", "/c", "npm", ...task.args] : task.args;
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    shell: false,
    timeout: task.timeoutMs ?? 180000,
  });
  const stdout = result.stdout || "";
  const stderr = [result.stderr || "", result.error?.message || ""].filter(Boolean).join("\n");

  return {
    critical: task.critical === true,
    durationMs: Date.now() - started,
    exitCode: result.status,
    ok: result.status === 0,
    stderrTail: tail(stderr),
    stdoutTail: tail(stdout),
    title: task.title,
  };
}

function buildNextActions(
  gscProgress: JsonFile<{
    queueHealth?: { firstRemainingUrls?: string[] };
    summary?: { nextUrl?: string | null; orphanPages?: number; weakPages?: number };
  }>,
  improvement: JsonFile<{ priorityLanes?: Array<{ action: string; name: string; status: string }> }>,
  heartbeat: JsonFile<{ nextActions?: string[]; status?: { severity?: string } }>,
  traffic: JsonFile<{ summary?: { trafficDataAvailable?: boolean } }>,
  criticalFailures: TaskResult[],
) {
  const actions: string[] = [];
  if (criticalFailures.length > 0) {
    actions.push(`Fix critical automation failures first: ${criticalFailures.map((failure) => failure.title).join("; ")}.`);
  }
  if (gscProgress?.summary?.nextUrl) {
    actions.push(`Next manual GSC URL Inspection target: ${gscProgress.summary.nextUrl}.`);
  }
  actions.push("Keep GSC requests focused on /en, cluster pages, and high-intent q pages before broad blog pages.");
  if ((gscProgress?.summary?.orphanPages ?? 0) > 0 || (gscProgress?.summary?.weakPages ?? 0) > 0) {
    actions.push("Repair internal-link weak spots before requesting more URLs.");
  }
  if (traffic?.summary?.trafficDataAvailable !== true) {
    actions.push("Do not report traffic, clicks, rankings, or revenue until Analytics/GSC data is imported or manually evidenced.");
  }
  for (const lane of improvement?.priorityLanes ?? []) {
    if (lane.status === "ready") actions.push(`${lane.name}: ${lane.action}`);
  }
  for (const action of heartbeat?.nextActions ?? []) actions.push(action);
  actions.push("After GSC impressions appear, rewrite only the pages with evidence: title, meta description, first answer block, FAQ, and related q links.");
  return unique(actions).slice(0, 12);
}

function readJson<T>(relativeFile: string): JsonFile<T> {
  const target = path.join(process.cwd(), relativeFile);
  if (!fs.existsSync(target)) return null;
  return JSON.parse(fs.readFileSync(target, "utf8")) as T;
}

function readArg(name: string) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function tail(value: string, max = 1200) {
  const trimmed = value.trim();
  return trimmed.length > max ? trimmed.slice(-max) : trimmed;
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: Record<string, boolean | string>;
  status: Record<string, boolean | number | string | null>;
  gsc: {
    clusterMix: Record<string, number>;
    confirmedSubmitted: number | null;
    firstRemainingUrls: string[];
    nextUrl: string | null;
    queueMix: Record<string, number>;
    remaining: number | null;
    topQueueUrls: number | null;
  };
  growth: Record<string, number | null>;
  traffic: Record<string, boolean | number>;
  problems: Array<{ severity: string; area: string; message: string }>;
  priorityLanes: Array<{ name: string; status: string; impact: string; evidence: string; action: string }>;
  nextActions: string[];
  tasks: TaskResult[];
}) {
  return [
    "# SEO Autopilot Loop",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "## Status",
    "",
    ...Object.entries(payload.status).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Guardrails",
    "",
    ...Object.entries(payload.guardrails).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## GSC Queue",
    "",
    `- Next URL: ${payload.gsc.nextUrl ?? "none"}`,
    `- Confirmed submitted: ${payload.gsc.confirmedSubmitted ?? "unknown"}`,
    `- Remaining: ${payload.gsc.remaining ?? "unknown"}`,
    `- Top queue URLs: ${payload.gsc.topQueueUrls ?? "unknown"}`,
    `- Queue mix: ${JSON.stringify(payload.gsc.queueMix)}`,
    `- Cluster mix: ${JSON.stringify(payload.gsc.clusterMix)}`,
    "",
    "### First Remaining URLs",
    "",
    ...(payload.gsc.firstRemainingUrls.length ? payload.gsc.firstRemainingUrls.map((url, index) => `${index + 1}. ${url}`) : ["- none"]),
    "",
    "## Growth",
    "",
    ...Object.entries(payload.growth).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Traffic Evidence",
    "",
    ...Object.entries(payload.traffic).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Problems",
    "",
    ...(payload.problems.length ? payload.problems.map((problem) => `- [${problem.severity}] ${problem.area}: ${problem.message}`) : ["- None"]),
    "",
    "## Priority Lanes",
    "",
    ...(payload.priorityLanes.length
      ? payload.priorityLanes.map((lane) => `- [${lane.impact}/${lane.status}] ${lane.name}: ${lane.evidence}`)
      : ["- none"]),
    "",
    "## Next Actions",
    "",
    ...payload.nextActions.map((action, index) => `${index + 1}. ${action}`),
    "",
    "## Task Results",
    "",
    "| Task | Critical | Status | Exit | Duration |",
    "| --- | --- | --- | --- | --- |",
    ...payload.tasks.map((task) => `| ${task.title} | ${task.critical} | ${task.ok ? "PASS" : "FAIL"} | ${task.exitCode ?? "null"} | ${task.durationMs}ms |`),
    "",
  ].join("\n");
}

void main();
