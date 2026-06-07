import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

type DecisionMatrix = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  publishingBoundary: { currentPublicPublished: number; currentPublishableNow: number; publishConfirmCommandsIncluded: number; trafficDataAvailable: boolean };
  rows: Array<{
    approveAfterHumanReviewCommand: string;
    autopilotScore: number;
    deferIf: string[];
    file: string;
    lane: string;
    nextDecision: "approve-after-review" | "repair-before-review" | "defer";
    primaryQuery: string;
    publishConfirm: "not-included";
    repairBeforeApproval: string[];
    title: string;
  }>;
  summary: { approvalItems: number; decisionRows: number; repairBeforeReviewItems: number; unsafeItems: number };
};

type ApprovalRemediationPack = {
  items: Array<{
    file: string;
    humanChecklist: string[];
    internalLinkFixes: string[];
    manualFixReady: boolean;
    remediationReasons: string[];
    searchFixes: string[];
    sourceChecks: string[];
    sourceUrlFixes: string[];
    title: string;
    unsafeReasons: string[];
  }>;
  summary: { unsafeItems: number };
};

type MojibakeRemediationBrief = {
  items: Array<{
    bodyHit?: { field: string; markers: string[]; sample: string } | null;
    file: string;
    manualActions?: string[];
    metadataHits?: Array<{ field: string; markers: string[]; sample: string }>;
    preserveStatus: boolean;
    priorityScore: number;
    publishConfirm: string;
    status: string;
  }>;
  summary: { affectedFiles: number; publishConfirmCommandsIncluded: number; trafficDataAvailable: boolean; unsafeItems: number };
};

type RepairTask = {
  action: string;
  autoEditable: false;
  category: "encoding-integrity" | "search-intent" | "internal-link" | "source-url" | "source-review" | "copydesk" | "approval-boundary";
  commandBoundary: string;
  evidence: string;
  file: string;
  humanGate: true;
  lane: string;
  nextDecision: DecisionMatrix["rows"][number]["nextDecision"];
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
  nextDecision: DecisionMatrix["rows"][number]["nextDecision"];
  publishConfirm: "not-included";
  taskCount: number;
  tasks: Array<Pick<RepairTask, "action" | "category" | "priority" | "proofRequired" | "severity" | "taskId">>;
  title: string;
};

function main() {
  const matrix = readJson<DecisionMatrix>("content/automation/human-approval-decision-matrix.json");
  const remediation = readJson<ApprovalRemediationPack>("content/automation/autopilot-approval-remediation-pack.json");
  const mojibake = readJson<MojibakeRemediationBrief>("content/automation/mojibake-remediation-brief.json");

  const remediationByFile = byFile(remediation.items);
  const mojibakeByFile = byFile(mojibake.items);
  const tasks = matrix.rows.flatMap((row) => buildTasks(row, remediationByFile.get(row.file), mojibakeByFile.get(row.file)));
  const minimumRepairPaths = buildMinimumRepairPaths(tasks);
  const unsafeTasks = tasks.filter((task) => task.autoEditable !== false || task.humanGate !== true || task.publishConfirm !== "not-included");
  const filesWithTasks = new Set(tasks.map((task) => task.file));
  const blockerFiles = new Set(tasks.filter((task) => task.severity === "blocker").map((task) => task.file));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only repair queue for human approval candidates. It turns repair-before-review decisions into task-level work without editing drafts.",
      stopBefore: "Do not run mark:review or publish from this queue. Use it to repair drafts, rerun automation, then ask for explicit human approval per file.",
      trafficClaim: "not-included",
    },
    publishingBoundary: matrix.publishingBoundary,
    sourceEvidence: {
      approvalItems: matrix.summary.approvalItems,
      decisionRows: matrix.summary.decisionRows,
      matrixUnsafeItems: matrix.summary.unsafeItems,
      mojibakeAffectedFiles: mojibake.summary.affectedFiles,
      mojibakeUnsafeItems: mojibake.summary.unsafeItems,
      remediationUnsafeItems: remediation.summary.unsafeItems,
    },
    summary: {
      approvalItems: matrix.summary.approvalItems,
      blockerFiles: blockerFiles.size,
      blockerTasks: tasks.filter((task) => task.severity === "blocker").length,
      filesWithTasks: filesWithTasks.size,
      humanGatedTasks: tasks.filter((task) => task.humanGate === true).length,
      minimumPathFiles: minimumRepairPaths.length,
      minimumPathTasks: minimumRepairPaths.reduce((sum, path) => sum + path.taskCount, 0),
      publishConfirmCommandsIncluded: 0,
      repairBeforeReviewItems: matrix.summary.repairBeforeReviewItems,
      tasks: tasks.length,
      tasksByCategory: countBy(tasks, (task) => task.category),
      tasksBySeverity: countBy(tasks, (task) => task.severity),
      trafficDataAvailable: matrix.publishingBoundary.trafficDataAvailable,
      unsafeItems: unsafeTasks.length,
    },
    minimumRepairPaths,
    unsafeTasks,
    tasks,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "human-approval-repair-queue.json");
  const mdTarget = path.join(process.cwd(), "docs", "human-approval-repair-queue.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeTasks.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeTasks.length) process.exitCode = 1;
}

function buildTasks(row: DecisionMatrix["rows"][number], remediation: ApprovalRemediationPack["items"][number] | undefined, mojibake: MojibakeRemediationBrief["items"][number] | undefined) {
  const title = articleLabel(row.file, row.title);
  const tasks: Omit<RepairTask, "taskId">[] = [];
  const hasEncodingEvidence = Boolean(mojibake || containsMojibake(row.title));

  if (hasEncodingEvidence) {
    tasks.push({
      action: "Repair garbled title, description, headings, and affected body copy before any search or source review.",
      autoEditable: false,
      category: "encoding-integrity",
      commandBoundary: row.approveAfterHumanReviewCommand,
      evidence: mojibake
        ? `mojibake brief priority=${mojibake.priorityScore}, metadataHits=${mojibake.metadataHits?.length || 0}, bodyHit=${Boolean(mojibake.bodyHit)}`
        : "decision matrix title contains mojibake markers",
      file: row.file,
      humanGate: true,
      lane: row.lane,
      nextDecision: row.nextDecision,
      priority: row.autopilotScore + 600,
      proofRequired: "Readable Chinese metadata and body excerpt verified; status/noindex/humanReviewRequired unchanged; integrity audit rerun.",
      publishConfirm: row.publishConfirm,
      severity: "blocker",
      title,
    });
  }

  for (const action of dedupe([...(row.repairBeforeApproval || []), ...(remediation?.humanChecklist || [])])) {
    const category = categorize(action);
    tasks.push({
      action,
      autoEditable: false,
      category,
      commandBoundary: row.approveAfterHumanReviewCommand,
      evidence: evidenceFor(category, remediation, row),
      file: row.file,
      humanGate: true,
      lane: row.lane,
      nextDecision: row.nextDecision,
      priority: row.autopilotScore + categoryBoost(category),
      proofRequired: proofFor(category),
      publishConfirm: row.publishConfirm,
      severity: category === "source-url" || category === "source-review" ? "high" : "medium",
      title,
    });
  }

  return tasks
    .sort((a, b) => b.priority - a.priority)
    .map((task, index) => ({ ...task, taskId: `${task.file.replace(/^content\/blog\//, "").replace(/\.[^.]+$/, "").toUpperCase()}-${String(index + 1).padStart(2, "0")}` }));
}

function articleLabel(file: string, matrixTitle: string) {
  if (matrixTitle && !containsMojibake(matrixTitle)) return matrixTitle.trim();
  try {
    const article = readArticle(file);
    const title = String(article.data.title || "").trim();
    if (title && !containsMojibake(title)) return title;
  } catch {
    // Fall through to slug-based label.
  }
  return path.basename(file).replace(/\.[^.]+$/, "").replace(/-/g, " ");
}

function categorize(action: string): RepairTask["category"] {
  const text = action.toLowerCase();
  if (text.includes("source url") || text.includes("redirect") || text.includes("failed source") || text.includes("replacement")) return "source-url";
  if (text.includes("source") || text.includes("fact-check") || text.includes("traffic") || text.includes("ranking") || text.includes("revenue")) return "source-review";
  if (text.includes("link") || text.includes("/blog/") || text.includes("public article")) return "internal-link";
  if (text.includes("search") || text.includes("query") || text.includes("title") || text.includes("description") || text.includes("opening")) return "search-intent";
  if (text.includes("copydesk") || text.includes("warning")) return "copydesk";
  return "approval-boundary";
}

function categoryBoost(category: RepairTask["category"]) {
  const boosts: Record<RepairTask["category"], number> = {
    "encoding-integrity": 600,
    "source-url": 420,
    "source-review": 360,
    "search-intent": 260,
    "internal-link": 220,
    copydesk: 180,
    "approval-boundary": 120,
  };
  return boosts[category];
}

function evidenceFor(category: RepairTask["category"], remediation: ApprovalRemediationPack["items"][number] | undefined, row: DecisionMatrix["rows"][number]) {
  if (category === "source-url") return `${remediation?.sourceUrlFixes.length || 0} source URL fixes in remediation pack`;
  if (category === "source-review") return `${remediation?.sourceChecks.length || 0} source checks in remediation pack`;
  if (category === "internal-link") return `${remediation?.internalLinkFixes.length || 0} internal-link fixes in remediation pack`;
  if (category === "search-intent") return `${remediation?.searchFixes.length || row.repairBeforeApproval.length} search/copy fixes in remediation evidence`;
  return `${remediation?.remediationReasons.length || 0} remediation reasons in approval pack`;
}

function proofFor(category: RepairTask["category"]) {
  const proofs: Record<RepairTask["category"], string> = {
    "encoding-integrity": "Integrity audit no longer flags this file for mojibake; human reviewer confirms readable Chinese.",
    "source-url": "Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent.",
    "source-review": "Reviewer records source/fact-check confirmation and removes unsupported claims.",
    "search-intent": "Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body.",
    "internal-link": "Draft contains at least one contextual link to a currently published relevant article.",
    copydesk: "Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails.",
    "approval-boundary": "Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval.",
  };
  return proofs[category];
}

function buildMinimumRepairPaths(tasks: RepairTask[]): MinimumRepairPath[] {
  const grouped = new Map<string, RepairTask[]>();
  for (const task of tasks) grouped.set(task.file, [...(grouped.get(task.file) || []), task]);

  return [...grouped.entries()].map(([file, fileTasks]) => {
    const selected = selectRepresentativeTasks(fileTasks);
    return {
      categories: selected.map((task) => task.category),
      file,
      markReviewAfterExplicitApproval: fileTasks[0]?.commandBoundary || "missing",
      nextDecision: fileTasks[0]?.nextDecision || "defer",
      publishConfirm: "not-included",
      taskCount: selected.length,
      tasks: selected.map((task) => ({
        action: task.action,
        category: task.category,
        priority: task.priority,
        proofRequired: task.proofRequired,
        severity: task.severity,
        taskId: task.taskId,
      })),
      title: fileTasks[0]?.title || file,
    };
  });
}

function selectRepresentativeTasks(tasks: RepairTask[]) {
  const orderedCategories: RepairTask["category"][] = ["encoding-integrity", "source-url", "source-review", "search-intent", "internal-link", "copydesk", "approval-boundary"];
  return orderedCategories
    .map((category) => tasks.filter((task) => task.category === category).sort((a, b) => b.priority - a.priority || a.action.length - b.action.length)[0])
    .filter(Boolean) as RepairTask[];
}

function containsMojibake(text: string) {
  const markers = ["閮", "鎬", "庝", "箞", "鍋", "氾", "細", "鐢", "嗚", "銆", "妫€", "锟", "�", "€"];
  const markerHits = markers.filter((marker) => text.includes(marker)).length;
  if (markerHits >= 0) return markerHits >= 2 || /[A-Za-z0-9]?\?/.test(text);
  const suspiciousHits = text.match(/[�€鈥銆鎬鐨鍙鍏瀹琛屽簱閮ョ讲璇嗗垪锛]/g) || [];
  return suspiciousHits.length >= 2 || /[A-Za-z0-9]?\?/.test(text);
}

function countBy<T>(items: T[], getKey: (item: T) => string) {
  return items.reduce<Record<string, number>>((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function byFile<T extends { file: string }>(items: T[]) {
  return new Map(items.map((item) => [item.file, item]));
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
  publishingBoundary: DecisionMatrix["publishingBoundary"];
  sourceEvidence: Record<string, number>;
  summary: {
    approvalItems: number;
    blockerFiles: number;
    blockerTasks: number;
    filesWithTasks: number;
    humanGatedTasks: number;
    minimumPathFiles: number;
    minimumPathTasks: number;
    publishConfirmCommandsIncluded: number;
    repairBeforeReviewItems: number;
    tasks: number;
    tasksByCategory: Record<string, number>;
    tasksBySeverity: Record<string, number>;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
  minimumRepairPaths: MinimumRepairPath[];
  tasks: RepairTask[];
  unsafeTasks: RepairTask[];
}) {
  return [
    "# Human Approval Repair Queue",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It breaks repair-before-review candidates into task-level work and stops before any status change.",
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
    `- Approval items: ${payload.summary.approvalItems}`,
    `- Repair-before-review items: ${payload.summary.repairBeforeReviewItems}`,
    `- Files with tasks: ${payload.summary.filesWithTasks}`,
    `- Tasks: ${payload.summary.tasks}`,
    `- Minimum path files/tasks: ${payload.summary.minimumPathFiles}/${payload.summary.minimumPathTasks}`,
    `- Blocker files/tasks: ${payload.summary.blockerFiles}/${payload.summary.blockerTasks}`,
    `- Human-gated tasks: ${payload.summary.humanGatedTasks}`,
    `- Unsafe items: ${payload.summary.unsafeItems}`,
    `- Traffic data available: ${payload.summary.trafficDataAvailable}`,
    `- Tasks by category: ${JSON.stringify(payload.summary.tasksByCategory)}`,
    `- Tasks by severity: ${JSON.stringify(payload.summary.tasksBySeverity)}`,
    "",
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Tasks",
    "",
    ...taskTable(payload.unsafeTasks),
    "",
    "## Minimum Repair Paths",
    "",
    ...minimumPathSections(payload.minimumRepairPaths),
    "",
    "## Top Repair Tasks",
    "",
    ...taskTable(payload.tasks.slice(0, 30)),
    "",
    "## Tasks By File",
    "",
    ...byFileSections(payload.tasks),
    "",
  ].join("\n");
}

function taskTable(tasks: RepairTask[]) {
  if (!tasks.length) return ["- none"];
  return [
    "| Priority | Severity | Category | Action | Proof required | Title | File |",
    "| ---: | --- | --- | --- | --- | --- | --- |",
    ...tasks.map((task) => `| ${task.priority} | ${task.severity} | ${task.category} | ${escapeMd(task.action)} | ${escapeMd(task.proofRequired)} | ${escapeMd(task.title)} | ${task.file} |`),
  ];
}

function minimumPathSections(paths: MinimumRepairPath[]) {
  if (!paths.length) return ["- none"];
  return paths.flatMap((path) => [
    `### ${escapeMd(path.title)}`,
    "",
    `- File: ${path.file}`,
    `- Minimum tasks: ${path.taskCount}`,
    `- Categories: ${path.categories.join(", ")}`,
    `- Next decision: ${path.nextDecision}`,
    `- Mark review command after explicit approval: \`${path.markReviewAfterExplicitApproval}\``,
    `- Publish confirm: ${path.publishConfirm}`,
    "",
    "| Priority | Severity | Category | Action | Proof required |",
    "| ---: | --- | --- | --- | --- |",
    ...path.tasks.map((task) => `| ${task.priority} | ${task.severity} | ${task.category} | ${escapeMd(task.action)} | ${escapeMd(task.proofRequired)} |`),
    "",
  ]);
}

function byFileSections(tasks: RepairTask[]) {
  const grouped = new Map<string, RepairTask[]>();
  for (const task of tasks) grouped.set(task.file, [...(grouped.get(task.file) || []), task]);
  return [...grouped.entries()].flatMap(([file, fileTasks]) => [
    `### ${escapeMd(fileTasks[0]?.title || file)}`,
    "",
    `- File: ${file}`,
    `- Next decision: ${fileTasks[0]?.nextDecision || "unknown"}`,
    `- Mark review command after explicit approval: \`${fileTasks[0]?.commandBoundary || "missing"}\``,
    `- Publish confirm: ${fileTasks[0]?.publishConfirm || "not-included"}`,
    "",
    ...fileTasks.map((task) => `- [${task.severity}] ${task.category}: ${task.action}`),
    "",
  ]);
}

function escapeMd(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

main();
