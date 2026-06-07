import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type DecisionMatrix = {
  rows: Array<{
    autopilotScore: number;
    file: string;
    lane: string;
    nextDecision: string;
    primaryQuery: string;
    title: string;
  }>;
  summary: { approvalItems: number; decisionRows: number; repairBeforeReviewItems: number; unsafeItems: number };
};

type RepairTask = {
  action: string;
  autoEditable: false;
  category: string;
  commandBoundary: string;
  file: string;
  humanGate: true;
  priority: number;
  proofRequired: string;
  publishConfirm: "not-included";
  severity: "blocker" | "high" | "medium";
  taskId: string;
  title: string;
};

type MinimumRepairPath = {
  categories: string[];
  file: string;
  markReviewAfterExplicitApproval: string;
  nextDecision: string;
  publishConfirm: "not-included";
  taskCount: number;
  tasks: Array<Pick<RepairTask, "action" | "category" | "priority" | "proofRequired" | "severity" | "taskId">>;
  title: string;
};

type RepairQueue = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  minimumRepairPaths: MinimumRepairPath[];
  publishingBoundary: {
    currentPublicPublished: number;
    currentPublishableNow: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
  };
  summary: {
    approvalItems: number;
    minimumPathFiles: number;
    minimumPathTasks: number;
    publishConfirmCommandsIncluded: number;
    repairBeforeReviewItems: number;
    tasks: number;
    unsafeItems: number;
  };
  tasks: RepairTask[];
};

type RouteItem = {
  file: string;
  fullTaskCount: number;
  highRiskTasks: number;
  lane: string;
  manualOnlyCommands: {
    markReviewAfterExplicitApproval: string;
    rerunAfterRepair: string[];
  };
  minimumPathCategories: string[];
  minimumPathTasks: MinimumRepairPath["tasks"];
  nextDecision: string;
  primaryQuery: string;
  publishConfirm: "not-included";
  repairSessions: Array<{
    categories: string[];
    name: string;
    proofRequired: string[];
    tasks: MinimumRepairPath["tasks"];
  }>;
  routeRank: number;
  title: string;
  unsafeReasons: string[];
};

function main() {
  const queue = readJson<RepairQueue>("content/automation/human-approval-repair-queue.json");
  const matrix = readJson<DecisionMatrix>("content/automation/human-approval-decision-matrix.json");
  const matrixByFile = new Map(matrix.rows.map((item) => [item.file, item]));
  const tasksByFile = groupByFile(queue.tasks);

  const routeItems = queue.minimumRepairPaths
    .map((path) => toRouteItem(path, matrixByFile.get(path.file), tasksByFile.get(path.file) || []))
    .sort((a, b) => b.routeRank - a.routeRank || b.highRiskTasks - a.highRiskTasks || a.minimumPathTasks.length - b.minimumPathTasks.length);
  const unsafeItems = routeItems.filter((item) => item.unsafeReasons.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only approval repair route. It chooses the next human repair order from the repair queue and stops before article edits, mark:review, or publish.",
      stopBefore: "Use this route to assign manual repair sessions only. Run mark:review only after explicit human approval per file.",
      trafficClaim: "not-included",
    },
    publishingBoundary: queue.publishingBoundary,
    sourceEvidence: {
      decisionMatrixItems: matrix.summary.decisionRows,
      decisionMatrixRepairItems: matrix.summary.repairBeforeReviewItems,
      decisionMatrixUnsafeItems: matrix.summary.unsafeItems,
      repairQueueFullTasks: queue.summary.tasks,
      repairQueueMinimumPathFiles: queue.summary.minimumPathFiles,
      repairQueueMinimumPathTasks: queue.summary.minimumPathTasks,
      repairQueueUnsafeItems: queue.summary.unsafeItems,
    },
    summary: {
      filesRouted: routeItems.length,
      highRiskTasks: routeItems.reduce((sum, item) => sum + item.highRiskTasks, 0),
      minimumPathTasks: routeItems.reduce((sum, item) => sum + item.minimumPathTasks.length, 0),
      nextRepairFile: routeItems[0]?.file || null,
      nextRepairTitle: routeItems[0]?.title || null,
      publishConfirmCommandsIncluded: 0,
      repairBeforeReviewItems: matrix.summary.repairBeforeReviewItems,
      routeSessions: routeItems.reduce((sum, item) => sum + item.repairSessions.length, 0),
      trafficDataAvailable: queue.publishingBoundary.trafficDataAvailable,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    routeItems,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "human-approval-repair-route.json");
  const mdTarget = path.join(process.cwd(), "docs", "human-approval-repair-route.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toRouteItem(pathItem: MinimumRepairPath, matrixItem: DecisionMatrix["rows"][number] | undefined, fullTasks: RepairTask[]): RouteItem {
  const highRiskTasks = pathItem.tasks.filter((task) => task.severity === "high" || task.severity === "blocker").length;
  const unsafeReasons = [
    pathItem.publishConfirm === "not-included" ? "" : "minimum repair path includes publish confirmation",
    pathItem.markReviewAfterExplicitApproval.includes("--confirm-human") ? "" : "mark-review command is missing explicit human confirmation",
    pathItem.nextDecision === "repair-before-review" ? "" : `route item is not marked repair-before-review: ${pathItem.nextDecision}`,
    pathItem.taskCount === pathItem.tasks.length && pathItem.taskCount > 0 ? "" : "minimum repair path task count does not match tasks",
    fullTasks.every((task) => task.autoEditable === false && task.humanGate === true && task.publishConfirm === "not-included") ? "" : "full repair tasks are not all human-gated",
  ].filter(Boolean);

  return {
    file: pathItem.file,
    fullTaskCount: fullTasks.length,
    highRiskTasks,
    lane: matrixItem?.lane || "unknown",
    manualOnlyCommands: {
      markReviewAfterExplicitApproval: pathItem.markReviewAfterExplicitApproval,
      rerunAfterRepair: ["npm run automation:human-approval-repair-queue", "npm run automation:human-approval-repair-route", "npm run automation:gate", "npm run automation:digest"],
    },
    minimumPathCategories: pathItem.categories,
    minimumPathTasks: pathItem.tasks,
    nextDecision: pathItem.nextDecision,
    primaryQuery: matrixItem?.primaryQuery || "",
    publishConfirm: pathItem.publishConfirm,
    repairSessions: buildRepairSessions(pathItem.tasks),
    routeRank: (matrixItem?.autopilotScore || 0) + highRiskTasks * 100 + fullTasks.length,
    title: matrixItem?.title || pathItem.title,
    unsafeReasons,
  };
}

function buildRepairSessions(tasks: MinimumRepairPath["tasks"]) {
  const sessions = [
    { categories: ["source-url", "source-review"], name: "source verification first" },
    { categories: ["search-intent"], name: "search intent alignment" },
    { categories: ["internal-link"], name: "public internal link insertion" },
    { categories: ["copydesk", "approval-boundary"], name: "copydesk and approval boundary" },
  ];

  return sessions
    .map((session) => {
      const sessionTasks = tasks.filter((task) => session.categories.includes(task.category));
      return {
        ...session,
        proofRequired: [...new Set(sessionTasks.map((task) => task.proofRequired))],
        tasks: sessionTasks,
      };
    })
    .filter((session) => session.tasks.length > 0);
}

function groupByFile<T extends { file: string }>(items: T[]) {
  const grouped = new Map<string, T[]>();
  for (const item of items) grouped.set(item.file, [...(grouped.get(item.file) || []), item]);
  return grouped;
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  publishingBoundary: RepairQueue["publishingBoundary"];
  routeItems: RouteItem[];
  sourceEvidence: Record<string, number>;
  summary: {
    filesRouted: number;
    highRiskTasks: number;
    minimumPathTasks: number;
    nextRepairFile: string | null;
    nextRepairTitle: string | null;
    publishConfirmCommandsIncluded: number;
    repairBeforeReviewItems: number;
    routeSessions: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
  unsafeItems: RouteItem[];
}) {
  return [
    "# Human Approval Repair Route",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It converts the repair queue into a manual repair order and stops before article edits or status changes.",
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
    "## Publishing Boundary",
    "",
    `- Current public published: ${payload.publishingBoundary.currentPublicPublished}`,
    `- Current publishable now: ${payload.publishingBoundary.currentPublishableNow}`,
    `- Publish confirm commands included: ${payload.publishingBoundary.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${payload.publishingBoundary.trafficDataAvailable}`,
    "",
    "## Summary",
    "",
    `- Files routed: ${payload.summary.filesRouted}`,
    `- Repair-before-review items: ${payload.summary.repairBeforeReviewItems}`,
    `- Minimum path tasks: ${payload.summary.minimumPathTasks}`,
    `- Route sessions: ${payload.summary.routeSessions}`,
    `- High-risk tasks: ${payload.summary.highRiskTasks}`,
    `- Next repair title: ${payload.summary.nextRepairTitle || "none"}`,
    `- Next repair file: ${payload.summary.nextRepairFile || "none"}`,
    `- Publish confirm commands included: ${payload.summary.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${payload.summary.trafficDataAvailable}`,
    `- Unsafe items: ${payload.summary.unsafeItems}`,
    "",
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...routeTable(payload.unsafeItems),
    "",
    "## Route Order",
    "",
    ...routeTable(payload.routeItems),
    "",
    "## Repair Sessions",
    "",
    ...payload.routeItems.flatMap(routeSessionSection),
    "",
  ].join("\n");
}

function routeTable(items: RouteItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Rank | High risk | Min tasks | Sessions | Lane | Primary query | Title | File |",
    "| ---: | ---: | ---: | ---: | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.routeRank} | ${item.highRiskTasks} | ${item.minimumPathTasks.length} | ${item.repairSessions.length} | ${item.lane} | ${escapeMd(item.primaryQuery)} | ${escapeMd(item.title)} | ${item.file} |`,
    ),
  ];
}

function routeSessionSection(item: RouteItem) {
  return [
    `### ${escapeMd(item.title)}`,
    "",
    `- File: ${item.file}`,
    `- Manual mark-review command after explicit approval: \`${item.manualOnlyCommands.markReviewAfterExplicitApproval}\``,
    `- Rerun after repair: ${item.manualOnlyCommands.rerunAfterRepair.map((command) => `\`${command}\``).join(", ")}`,
    `- Publish confirm: ${item.publishConfirm}`,
    "",
    ...item.repairSessions.flatMap((session) => [
      `#### ${session.name}`,
      "",
      ...session.tasks.map((task) => `- [${task.severity}] ${task.category}: ${task.action}`),
      "",
      "Proof:",
      "",
      ...session.proofRequired.map((proof) => `- ${proof}`),
      "",
    ]),
  ];
}

function escapeMd(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

main();
