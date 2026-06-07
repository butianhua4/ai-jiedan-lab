import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type QueueItem = {
  assignmentLane: string;
  autopilotScore: number;
  blockers: string[];
  commandBoundary: CommandBoundary;
  file: string;
  humanActionPlan: string[];
  readyForAssignment: boolean;
  reviewFocus: string[];
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  sourceTypes: string[];
  title: string;
};

type AutopilotQueue = {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  nextAssignments: QueueItem[];
  summary: { nextAssignments: number; unsafeItems: number };
};

type Playbook = {
  items: Array<{
    file: string;
    internalLinkActions: string[];
    readyForHumanReview: boolean;
    searchActions: string[];
    sourceActions: string[];
  }>;
  summary: { unsafeItems: number };
};

type SprintItem = {
  autopilotScore: number;
  commandBoundary: CommandBoundary;
  file: string;
  lane: string;
  playbookStage: "queued-for-playbook" | "ready-with-playbook";
  readyForSprint: boolean;
  reviewChecklist: string[];
  safeDraft: boolean;
  searchQueries: number;
  sourceTargets: number;
  sourceTypes: string[];
  sprintOrder: number;
  title: string;
};

function main() {
  const queue = readJson<AutopilotQueue>("content/automation/autopilot-review-queue.json");
  const playbook = readJson<Playbook>("content/automation/autopilot-human-review-playbook.json");
  const playbookByFile = new Map(playbook.items.map((item) => [item.file, item]));
  const items = queue.nextAssignments.map((item, index) => toSprintItem(item, index, playbookByFile.get(item.file)));
  const unsafeItems = items.filter((item) => !isSafeItem(item));
  const readyWithPlaybook = items.filter((item) => item.playbookStage === "ready-with-playbook");
  const queuedForPlaybook = items.filter((item) => item.playbookStage === "queued-for-playbook");
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only sprint board for the next autopilot review assignments. It groups top-3 playbook-ready items and follow-up queue items without changing status.",
      stopBefore: "Use this board for planning only. mark:review requires explicit human approval per file; publish --confirm is not included.",
    },
    boundaries: queue.boundaries,
    sourceEvidence: {
      autopilotQueueUnsafeItems: queue.summary.unsafeItems,
      humanReviewPlaybookUnsafeItems: playbook.summary.unsafeItems,
      queueNextAssignments: queue.summary.nextAssignments,
    },
    summary: {
      items: items.length,
      itemsNeedingSearchQuery: items.filter((item) => item.searchQueries === 0).length,
      itemsWithCommandBoundary: items.filter((item) => hasCommandBoundary(item.commandBoundary)).length,
      queuedForPlaybook: queuedForPlaybook.length,
      readyForSprint: items.filter((item) => item.readyForSprint).length,
      readyWithPlaybook: readyWithPlaybook.length,
      safeDraftItems: items.filter((item) => item.safeDraft).length,
      unsafeItems: unsafeItems.length,
      withSearchQueries: items.filter((item) => item.searchQueries > 0).length,
      withSourceTargets: items.filter((item) => item.sourceTargets > 0).length,
    },
    unsafeItems,
    readyWithPlaybook,
    queuedForPlaybook,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-review-sprint-board.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-review-sprint-board.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0 && items.length === queue.nextAssignments.length, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length || items.length !== queue.nextAssignments.length) process.exitCode = 1;
}

function toSprintItem(item: QueueItem, index: number, playbookItem: Playbook["items"][number] | undefined): SprintItem {
  const hasPlaybook = playbookItem?.readyForHumanReview === true;
  return {
    autopilotScore: item.autopilotScore,
    commandBoundary: item.commandBoundary,
    file: item.file,
    lane: item.assignmentLane,
    playbookStage: hasPlaybook ? "ready-with-playbook" : "queued-for-playbook",
    readyForSprint: item.readyForAssignment && item.safeDraft && hasCommandBoundary(item.commandBoundary) && item.sourceTargets.length > 0,
    reviewChecklist: dedupe([
      hasPlaybook
        ? `Use merged playbook actions: ${playbookItem.searchActions.length} search, ${playbookItem.sourceActions.length} source, ${playbookItem.internalLinkActions.length} link.`
        : "Generate or review a merged playbook before mark:review.",
      ...item.humanActionPlan,
      ...item.reviewFocus,
      "Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.",
      "Do not run publish:articles --confirm from this sprint board.",
    ]),
    safeDraft: item.safeDraft,
    searchQueries: item.searchQueries.length,
    sourceTargets: item.sourceTargets.length,
    sourceTypes: item.sourceTypes,
    sprintOrder: index + 1,
    title: item.title,
  };
}

function isSafeItem(item: SprintItem) {
  return (
    item.readyForSprint &&
    item.safeDraft &&
    item.reviewChecklist.length > 0 &&
    item.sourceTargets > 0 &&
    hasCommandBoundary(item.commandBoundary)
  );
}

function hasCommandBoundary(command: CommandBoundary) {
  return (
    command.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !command.publishDryRunAfterReview.includes("--confirm") &&
    command.publishConfirm === "not-included" &&
    command.stopBefore.includes("explicit")
  );
}

function dedupe(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: SprintItem[];
  queuedForPlaybook: SprintItem[];
  readyWithPlaybook: SprintItem[];
  sourceEvidence: Record<string, number>;
  summary: Record<string, number>;
  unsafeItems: SprintItem[];
}) {
  const lines = [
    "# Autopilot Review Sprint Board",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It plans the next 10 manual review assignments and keeps all status changes human-gated.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Boundaries",
    "",
    `- Public published: ${payload.boundaries.publicPublished}`,
    `- Publishable now: ${payload.boundaries.publishableNow}`,
    `- Traffic data available: ${payload.boundaries.trafficDataAvailable}`,
    `- Can claim traffic: ${payload.boundaries.canClaimTraffic}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Ready With Playbook",
    "",
    ...itemTable(payload.readyWithPlaybook),
    "",
    "## Queued For Playbook",
    "",
    ...itemTable(payload.queuedForPlaybook),
    "",
    "## Sprint Checklist",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: SprintItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Order | Ready | Stage | Lane | Score | Sources | Queries | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.sprintOrder} | ${item.readyForSprint} | ${item.playbookStage} | ${item.lane} | ${item.autopilotScore} | ${item.sourceTargets} | ${item.searchQueries} | ${item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: SprintItem) {
  return [
    `### ${item.sprintOrder}. ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Stage: ${item.playbookStage}`,
    `- Lane: ${item.lane}`,
    `- Manual mark-review command after approval: ${item.commandBoundary.markReviewAfterHumanApproval}`,
    `- Publish dry-run only after review: ${item.commandBoundary.publishDryRunAfterReview}`,
    `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
    "",
    "Checklist:",
    "",
    ...item.reviewChecklist.slice(0, 14).map((step) => `- ${step}`),
    "",
  ];
}

main();
