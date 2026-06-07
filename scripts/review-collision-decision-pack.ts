import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type ArticleRef = {
  file: string;
  primaryKeyword: string;
  reason?: string[];
  score?: number;
  slug: string;
  status: string;
  title: string;
};

type CannibalizationBrief = {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  highRiskItems: Array<{
    candidate: ArticleRef;
    decision: string;
    highestPublishedScore: number;
    highestReviewScore: number;
    humanReviewChecklist: string[];
    publishedSimilar: ArticleRef[];
    recommendation: string;
    reviewSimilar: ArticleRef[];
    riskLevel: string;
  }>;
  summary: {
    highRiskItems: number;
    highRiskPublishedItems: number;
    highRiskReviewOnlyItems: number;
    items: number;
  };
};

type AutopilotReviewQueue = {
  blockedItems?: Array<QueueItem>;
  items?: Array<QueueItem>;
  nextAssignments?: Array<QueueItem>;
};

type QueueItem = {
  blockers?: string[];
  commandBoundary?: CommandBoundary;
  file: string;
  humanActionPlan?: string[];
  readyForAssignment?: boolean;
  reviewFocus?: string[];
  searchQueries?: string[];
  sourceTargets?: string[];
};

type OptimizationBrief = {
  briefs?: Array<{ file: string; internalLink?: unknown; proposedOpeningAdditions?: string[]; warningRemediation?: string[] }>;
  nextBriefs?: Array<{ file: string; internalLink?: unknown; proposedOpeningAdditions?: string[]; warningRemediation?: string[] }>;
};

type DecisionItem = {
  blockingIssues: string[];
  candidate: ArticleRef & { headings: string[]; role: string };
  closest: Array<ArticleRef & { headings: string[]; role: string }>;
  collisionType: "published-collision" | "review-only-collision";
  commandBoundary: CommandBoundary;
  decisionOptions: string[];
  humanDecisionReady: boolean;
  manualNextActions: string[];
  queueBlockers: string[];
  requiredDecision: string;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  warningIssues: string[];
};

function main() {
  const cannibalization = readJson<CannibalizationBrief>("content/automation/review-cannibalization-brief.json");
  const queue = readJson<AutopilotReviewQueue>("content/automation/autopilot-review-queue.json");
  const optimization = readOptional<OptimizationBrief>("content/automation/review-optimization-brief.json");
  const queueByFile = new Map(allQueueItems(queue).map((item) => [item.file, item]));
  const optimizationByFile = new Map([...(optimization?.briefs || []), ...(optimization?.nextBriefs || [])].map((item) => [item.file, item]));

  const items = cannibalization.highRiskItems.map((item) => toDecisionItem(item, queueByFile.get(item.candidate.file), optimizationByFile.get(item.candidate.file)));
  const blockingItems = items.filter((item) => item.blockingIssues.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      trafficClaim: "not-included",
      note: "Read-only collision decision pack. It turns high cannibalization risk into human review decisions without editing drafts, marking review, or publishing.",
      stopBefore: "Stop before mark:review. If a reviewer keeps both articles, the angle and internal-link relationship must be explicit first.",
    },
    sourceEvidence: {
      cannibalizationGeneratedAt: cannibalization.generatedAt,
      cannibalizationGuardrails: cannibalization.guardrails,
      cannibalizationSummary: cannibalization.summary,
      queueBlockedItems: (queue.blockedItems || []).length,
    },
    summary: {
      blockedQueueMatchedItems: items.filter((item) => item.queueBlockers.length > 0).length,
      blockingItems: blockingItems.length,
      decisionItems: items.length,
      highRiskItems: cannibalization.summary.highRiskItems,
      humanDecisionReadyItems: items.filter((item) => item.humanDecisionReady).length,
      itemsWithCommandBoundary: items.filter((item) => hasCommandBoundary(item.commandBoundary)).length,
      publishedCollisionItems: items.filter((item) => item.collisionType === "published-collision").length,
      reviewOnlyCollisionItems: items.filter((item) => item.collisionType === "review-only-collision").length,
      unsafeItems: 0,
      warningItems: items.filter((item) => item.warningIssues.length > 0).length,
    },
    blockingItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "review-collision-decision-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "review-collision-decision-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: blockingItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (blockingItems.length) process.exitCode = 1;
}

function toDecisionItem(
  source: CannibalizationBrief["highRiskItems"][number],
  queueItem: QueueItem | undefined,
  optimization: { internalLink?: unknown; proposedOpeningAdditions?: string[]; warningRemediation?: string[] } | undefined,
): DecisionItem {
  const candidate = enrichArticle(source.candidate);
  const closest = [...source.publishedSimilar, ...source.reviewSimilar].slice(0, 3).map(enrichArticle);
  const collisionType: DecisionItem["collisionType"] = source.publishedSimilar.length > 0 ? "published-collision" : "review-only-collision";
  const commandBoundary = queueItem?.commandBoundary || commandBoundaryFor(candidate.file);
  const warningIssues = [
    ...source.humanReviewChecklist,
    ...(queueItem?.blockers || []),
    ...(optimization?.warningRemediation || []).slice(0, 5),
    optimization?.internalLink ? "" : "No optimization internal-link object was found for this collision item.",
  ].filter(Boolean);
  const blockingIssues = [
    collisionType === "published-collision" ? "Candidate collides with an already published article and needs consolidation or a stronger public angle first." : "",
    hasCommandBoundary(commandBoundary) ? "" : "Manual command boundary is missing or unsafe.",
    closest.length ? "" : "No comparison article is attached.",
  ].filter(Boolean);

  return {
    blockingIssues,
    candidate,
    closest,
    collisionType,
    commandBoundary,
    decisionOptions: decisionOptionsFor(candidate, closest[0], collisionType),
    humanDecisionReady: blockingIssues.length === 0,
    manualNextActions: manualNextActionsFor(candidate, closest[0], commandBoundary, collisionType, optimization),
    queueBlockers: queueItem?.blockers || [],
    requiredDecision:
      collisionType === "published-collision"
        ? "Consolidate, redirect, or rewrite before any review approval."
        : "Choose keep-both, merge, or delay before mark:review.",
    reviewFocus: queueItem?.reviewFocus || source.humanReviewChecklist,
    searchQueries: queueItem?.searchQueries || [],
    sourceTargets: queueItem?.sourceTargets || [],
    warningIssues: [...new Set(warningIssues)],
  };
}

function enrichArticle(article: ArticleRef): ArticleRef & { headings: string[]; role: string } {
  const parsed = readArticle(article.file);
  const headings = [...parsed.content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => match[1].trim()).slice(0, 8);
  return {
    ...article,
    headings,
    role: roleFor(article, headings),
  };
}

function roleFor(article: ArticleRef, headings: string[]) {
  const haystack = `${article.slug} ${article.title} ${headings.join(" ")}`.toLowerCase();
  if (haystack.includes("hugging") || haystack.includes("inference") || haystack.includes("endpoint")) {
    return "provider-specific deployment option: own Hugging Face endpoints, hosted inference, engine choice, cost checks, and production acceptance.";
  }
  if (haystack.includes("beginner") || haystack.includes("api") || haystack.includes("local")) {
    return "pillar explainer: own beginner route selection across API, local deployment, and private deployment.";
  }
  return "distinct follow-up: own a narrower use case, comparison, troubleshooting path, or implementation detail.";
}

function decisionOptionsFor(candidate: ArticleRef & { role: string }, closest: (ArticleRef & { role: string }) | undefined, collisionType: DecisionItem["collisionType"]) {
  return [
    `Keep both: ${candidate.file} should own ${candidate.role}`,
    closest ? `Keep both: ${closest.file} should own ${closest.role}` : "Attach a comparison article before approval.",
    "Merge: fold the provider-specific material into the broader article and leave this draft unpublished.",
    "Delay: keep this draft in noindex draft until the broader article is reviewed and an internal-link path is clear.",
    collisionType === "published-collision" ? "Rewrite: change title, primary keyword, and opening before review because public cannibalization is present." : "Differentiate: update title/opening during human review so the two drafts do not promise the same answer.",
  ];
}

function manualNextActionsFor(
  candidate: ArticleRef & { role: string },
  closest: (ArticleRef & { role: string }) | undefined,
  commandBoundary: CommandBoundary,
  collisionType: DecisionItem["collisionType"],
  optimization: { proposedOpeningAdditions?: string[] } | undefined,
) {
  return [
    "Pick one decision option before changing status.",
    `Candidate role to preserve: ${candidate.role}`,
    closest ? `Closest article role to preserve: ${closest.role}` : "Attach one closest comparison article before approval.",
    ...(optimization?.proposedOpeningAdditions || []).slice(0, 3).map((item) => `Consider copydesk addition during human review: ${item}`),
    collisionType === "review-only-collision" ? "If keeping both drafts, add a clear cross-link relationship during human review." : "If a published article is involved, consolidate or rewrite before approval.",
    `Only after explicit human approval, run: ${commandBoundary.markReviewAfterHumanApproval}`,
    "Publishing remains a separate explicit approval step.",
  ];
}

function commandBoundaryFor(file: string): CommandBoundary {
  return {
    markReviewAfterHumanApproval: `npm run mark:review -- --file=${file} --confirm-human`,
    publishDryRunAfterReview: `npm run publish:articles -- --file=${file}`,
    publishConfirm: "not-included",
    stopBefore: "Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.",
  };
}

function hasCommandBoundary(command: CommandBoundary) {
  return (
    command.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !command.publishDryRunAfterReview.includes("--confirm") &&
    command.publishConfirm === "not-included" &&
    command.stopBefore.includes("explicit")
  );
}

function allQueueItems(queue: AutopilotReviewQueue) {
  return [...(queue.blockedItems || []), ...(queue.nextAssignments || []), ...(queue.items || [])];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function readOptional<T>(relativePath: string): T | null {
  const target = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(target)) return null;
  return readJson<T>(relativePath);
}

function toMarkdown(payload: {
  blockingItems: DecisionItem[];
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: DecisionItem[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
}) {
  const lines = [
    "# Review Collision Decision Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns high cannibalization risk into a manual decision pack and stops before mark:review or publish.",
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
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${JSON.stringify(value)}`),
    "",
    "## Blocking Items",
    "",
    ...itemTable(payload.blockingItems),
    "",
    "## Decision Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Manual Decisions",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: DecisionItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Type | Blockers | Warnings | Candidate | Closest | Command gated |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.humanDecisionReady} | ${item.collisionType} | ${item.blockingIssues.length} | ${item.warningIssues.length} | ${item.candidate.title} (${item.candidate.file}) | ${item.closest.map((entry) => `${entry.title} (${entry.file})`).join("<br>")} | ${hasCommandBoundary(item.commandBoundary)} |`,
    ),
  ];
}

function itemSection(item: DecisionItem) {
  return [
    `### ${item.candidate.title}`,
    "",
    `- File: ${item.candidate.file}`,
    `- Collision type: ${item.collisionType}`,
    `- Required decision: ${item.requiredDecision}`,
    `- Candidate role: ${item.candidate.role}`,
    "",
    "Closest articles:",
    "",
    ...item.closest.map((entry) => `- ${entry.title} (${entry.file}) - ${entry.role}`),
    "",
    "Decision options:",
    "",
    ...item.decisionOptions.map((option) => `- ${option}`),
    "",
    "Manual next actions:",
    "",
    ...item.manualNextActions.map((action) => `- ${action}`),
    "",
  ];
}

main();
