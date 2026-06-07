import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type PopularPromptLane = {
  audience: string;
  candidateFiles: string[];
  demandReason: string;
  laneId: string;
  promptTemplates: unknown[];
  readyForHumanReviewPrep: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
  trafficClaim: string;
  unsafeReasons: string[];
};

type PopularPromptPlaybook = {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  items: PopularPromptLane[];
  summary: {
    items: number;
    itemsReadyForHumanReviewPrep: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type HumanApprovalQueue = {
  generatedAt: string;
  items: Array<{
    file: string;
    readyForHumanApproval: boolean;
  }>;
  summary: {
    items: number;
    itemsReadyForHumanApproval: number;
    publishConfirmCommandsIncluded: number;
    unsafeItems: number;
  };
};

type ReviewCandidates = {
  generatedAt: string;
  candidates: Array<{
    file: string;
    opportunityScore?: number;
    publishBatch?: number;
    qualityScore?: number;
    reason?: string;
    title: string;
  }>;
  counts: {
    candidates: number;
    returned: number;
  };
};

type BridgeItem = {
  articleState: {
    humanReviewRequired: boolean;
    noindex: boolean;
    qualityScore: number;
    sourceNotes: boolean;
    status: string;
  };
  commandBoundary: CommandBoundary;
  file: string;
  laneId: string;
  laneTitle: string;
  opportunityScore: number;
  promptTemplates: number;
  readyForHumanReviewPrep: boolean;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
  unsafeReasons: string[];
};

type LaneBridge = {
  alreadyInApprovalQueue: string[];
  audience: string;
  candidatesConsidered: number;
  demandReason: string;
  laneId: string;
  laneTitle: string;
  nextCandidates: BridgeItem[];
  readyNextCandidates: number;
  searchQueries: string[];
};

function main() {
  const playbook = readJson<PopularPromptPlaybook>("content/automation/popular-ai-prompt-playbook.json");
  const approvalQueue = readJson<HumanApprovalQueue>("content/automation/human-approval-execution-queue.json");
  const reviewCandidates = readJson<ReviewCandidates>("content/automation/review-candidates.json");

  const approvalFiles = new Set(approvalQueue.items.map((item) => item.file));
  const reviewCandidateByFile = new Map(reviewCandidates.candidates.map((item) => [item.file, item]));
  const lanes = playbook.items.map((lane) => toLaneBridge(lane, approvalFiles, reviewCandidateByFile));
  const nextCandidates = lanes.flatMap((lane) => lane.nextCandidates);
  const unsafeItems = nextCandidates.filter((item) => item.unsafeReasons.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note:
        "Read-only popular prompt approval bridge. It finds safe candidate drafts for popular AI prompt lanes that are not already in the human approval execution queue.",
      stopBefore: "Stop before mark:review and publish. Human approval is required for every candidate.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      approvalQueueGeneratedAt: approvalQueue.generatedAt,
      approvalQueueSummary: approvalQueue.summary,
      playbookGeneratedAt: playbook.generatedAt,
      playbookSummary: playbook.summary,
      reviewCandidatesGeneratedAt: reviewCandidates.generatedAt,
      reviewCandidatesCounts: reviewCandidates.counts,
      trafficNote: "No traffic, ranking, impression, click, conversion, or revenue claim is made.",
    },
    summary: {
      approvalQueueItems: approvalQueue.summary.items,
      approvalQueueReadyItems: approvalQueue.summary.itemsReadyForHumanApproval,
      bridgeItems: nextCandidates.length,
      bridgeItemsReadyForHumanReviewPrep: nextCandidates.filter((item) => item.readyForHumanReviewPrep).length,
      commandBoundaries: nextCandidates.filter((item) => hasSafeCommandBoundary(item.commandBoundary)).length,
      lanes: lanes.length,
      lanesAlreadyInApprovalQueue: lanes.filter((lane) => lane.alreadyInApprovalQueue.length > 0).length,
      lanesWithNextCandidates: lanes.filter((lane) => lane.nextCandidates.length > 0).length,
      lanesWithReadyNextCandidates: lanes.filter((lane) => lane.readyNextCandidates > 0).length,
      playbookItems: playbook.summary.items,
      playbookReadyItems: playbook.summary.itemsReadyForHumanReviewPrep,
      promptTemplatesReferenced: nextCandidates.reduce((sum, item) => sum + item.promptTemplates, 0),
      publishConfirmCommandsIncluded: 0,
      reviewCandidatePool: reviewCandidates.counts.candidates,
      searchQueriesReferenced: new Set(nextCandidates.flatMap((item) => item.searchQueries)).size,
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
      uniqueFiles: new Set(nextCandidates.map((item) => item.file)).size,
    },
    unsafeItems,
    topItems: nextCandidates.slice(0, 12),
    lanes,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "popular-prompt-approval-bridge.json");
  const mdTarget = path.join(process.cwd(), "docs", "popular-prompt-approval-bridge.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toLaneBridge(
  lane: PopularPromptLane,
  approvalFiles: Set<string>,
  reviewCandidateByFile: Map<string, ReviewCandidates["candidates"][number]>,
): LaneBridge {
  const alreadyInApprovalQueue = lane.candidateFiles.filter((file) => approvalFiles.has(file));
  const nextCandidates = lane.candidateFiles
    .filter((file) => !approvalFiles.has(file))
    .map((file) => toBridgeItem(file, lane, reviewCandidateByFile.get(file)))
    .filter((item): item is BridgeItem => Boolean(item))
    .sort((a, b) => b.opportunityScore - a.opportunityScore || a.file.localeCompare(b.file))
    .slice(0, 3);

  return {
    alreadyInApprovalQueue,
    audience: lane.audience,
    candidatesConsidered: lane.candidateFiles.length,
    demandReason: lane.demandReason,
    laneId: lane.laneId,
    laneTitle: lane.title,
    nextCandidates,
    readyNextCandidates: nextCandidates.filter((item) => item.readyForHumanReviewPrep).length,
    searchQueries: lane.searchQueries.slice(0, 10),
  };
}

function toBridgeItem(file: string, lane: PopularPromptLane, reviewCandidate?: ReviewCandidates["candidates"][number]): BridgeItem | null {
  const absoluteFile = path.join(process.cwd(), file);
  if (!fs.existsSync(absoluteFile)) return null;

  const article = readArticle(file);
  const quality = checkFile(file);
  const articleState = {
    humanReviewRequired: article.data.humanReviewRequired === true,
    noindex: article.data.noindex === true,
    qualityScore: quality.qualityScore,
    sourceNotes: Boolean(article.data.sourceNotes),
    status: String(article.data.status || ""),
  };
  const commandBoundary: CommandBoundary = {
    markReviewAfterHumanApproval: `npm run mark:review -- --file=${file} --confirm-human`,
    publishConfirm: "not-included",
    publishDryRunAfterReview: `npm run publish:articles -- --file=${file}`,
    stopBefore: "Run mark:review only after explicit human approval. Publish dry-run only after review. Publish confirm is not included.",
  };
  const unsafeReasons = unsafeReasonsFor(articleState, commandBoundary, lane, quality.failedItems);

  return {
    articleState,
    commandBoundary,
    file,
    laneId: lane.laneId,
    laneTitle: lane.title,
    opportunityScore: reviewCandidate?.opportunityScore || scoreFallback(articleState, lane),
    promptTemplates: lane.promptTemplates.length,
    readyForHumanReviewPrep: unsafeReasons.length === 0,
    reviewFocus: [
      "Confirm the article answers this popular prompt lane instead of drifting into a narrow tool-only query.",
      "Verify official sources before any status change.",
      "Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.",
      "Do not claim traffic, rankings, revenue, conversion, or guaranteed outcomes.",
      "Use the lane search queries as title, intro, and FAQ review prompts only after human review.",
    ],
    searchQueries: lane.searchQueries.slice(0, 10),
    sourceTargets: lane.sourceTargets.slice(0, 8),
    title: reviewCandidate?.title || String(article.data.title || file),
    unsafeReasons,
  };
}

function unsafeReasonsFor(
  articleState: BridgeItem["articleState"],
  commandBoundary: CommandBoundary,
  lane: PopularPromptLane,
  failedItems: string[],
) {
  const reasons: string[] = [];
  if (!lane.readyForHumanReviewPrep) reasons.push("popular prompt lane is not ready for human review prep");
  if (lane.trafficClaim !== "not-included") reasons.push("popular prompt lane includes a traffic claim");
  if (lane.unsafeReasons.length > 0) reasons.push("popular prompt lane has unsafe reasons");
  if (articleState.status !== "draft") reasons.push(`article status is ${articleState.status}, expected draft`);
  if (articleState.noindex !== true) reasons.push("article must remain noindex=true before review");
  if (articleState.humanReviewRequired !== true) reasons.push("article must keep humanReviewRequired=true before review");
  if (!articleState.sourceNotes) reasons.push("article is missing sourceNotes");
  if (articleState.qualityScore < 100) reasons.push(`qualityScore ${articleState.qualityScore} below 100`);
  if (failedItems.length > 0) reasons.push(`quality failed items present: ${failedItems.join("; ")}`);
  if (!hasSafeCommandBoundary(commandBoundary)) reasons.push("unsafe command boundary");
  return reasons;
}

function scoreFallback(articleState: BridgeItem["articleState"], lane: PopularPromptLane) {
  return articleState.qualityScore + lane.searchQueries.length + lane.promptTemplates.length;
}

function hasSafeCommandBoundary(command: CommandBoundary) {
  return (
    command.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !command.publishDryRunAfterReview.includes("--confirm") &&
    command.publishConfirm === "not-included"
  );
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  lanes: LaneBridge[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, boolean | number>;
  topItems: BridgeItem[];
  unsafeItems: BridgeItem[];
}) {
  const lines = [
    "# Popular Prompt Approval Bridge",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns popular AI prompt lanes into safe next human-review candidates without editing, marking review, or publishing.",
    "",
    "## Guardrails",
    "",
    `- Auto create articles: ${payload.guardrails.autoCreateArticles}`,
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
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${JSON.stringify(value)}`),
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.file}: ${item.unsafeReasons.join("; ")}`) : ["- none"]),
    "",
    "## Top Next Candidates",
    "",
    "| Ready | Score | Templates | Queries | Lane | Title | File |",
    "| --- | ---: | ---: | ---: | --- | --- | --- |",
    ...payload.topItems.map(
      (item) =>
        `| ${item.readyForHumanReviewPrep} | ${item.opportunityScore} | ${item.promptTemplates} | ${item.searchQueries.length} | ${item.laneTitle} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Lane Bridges",
    "",
    ...payload.lanes.flatMap((lane) => [
      `### ${lane.laneTitle}`,
      "",
      `- Lane ID: ${lane.laneId}`,
      `- Audience: ${lane.audience}`,
      `- Demand reason: ${lane.demandReason}`,
      `- Already in approval queue: ${lane.alreadyInApprovalQueue.length ? lane.alreadyInApprovalQueue.join("; ") : "none"}`,
      `- Ready next candidates: ${lane.readyNextCandidates}/${lane.nextCandidates.length}`,
      `- Search queries: ${lane.searchQueries.join("; ")}`,
      "",
      "| Ready | Score | Templates | Sources | Title | File |",
      "| --- | ---: | ---: | ---: | --- | --- |",
      ...lane.nextCandidates.map(
        (item) => `| ${item.readyForHumanReviewPrep} | ${item.opportunityScore} | ${item.promptTemplates} | ${item.sourceTargets.length} | ${item.title} | ${item.file} |`,
      ),
      "",
    ]),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

main();
