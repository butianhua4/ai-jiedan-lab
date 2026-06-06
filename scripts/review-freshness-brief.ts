import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

type ActionBoard = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  tasks: Array<{ file: string; kind: string; priority: number; ready: boolean; scope: string; title: string }>;
};

type FreshnessItem = {
  category: string;
  file: string;
  primaryKeyword: string;
  riskLevel: "high" | "low" | "medium";
  riskReasons: string[];
  status: string;
  title: string;
  updatedAt: string;
};

type ContentFreshness = {
  generatedAt: string;
  guardrails: { autoPublish: boolean };
  currentReviewItems: FreshnessItem[];
  plannedReviewItems: FreshnessItem[];
  summary: { currentReviewItems: number; highRisk: number; plannedReviewItems: number };
};

type SourceHealth = {
  files: Array<{ file: string; reachableSources: number; sourceTargets: number; urls: string[] }>;
  summary: { filesWithoutReachableSource: number; missingUrlTargets: number };
};

type PublishReadinessPack = {
  items: Array<{
    factCheckQueries: string[];
    file: string;
    officialSourceTargets: string[];
    riskReviewChecklist: string[];
  }>;
};

type PublicGapDecisionPack = {
  items: Array<{
    file: string;
    reviewPacket: { reviewFocus: string[]; sourceTargets: string[]; warningIssues: string[] };
  }>;
};

type FreshnessBriefItem = {
  articleUpdatedAt: string;
  file: string;
  freshnessRisk: FreshnessItem["riskLevel"];
  humanReviewChecklist: string[];
  officialSourceTargets: string[];
  readyForFreshnessReview: boolean;
  reachableSources: number;
  reviewFocus: string[];
  riskReasons: string[];
  scope: string[];
  sourceTargets: number;
  staleSensitiveChecks: string[];
  title: string;
  warningIssues: string[];
};

function main() {
  const board = readJson<ActionBoard>("content/automation/review-action-board.json");
  const freshness = readJson<ContentFreshness>("content/automation/content-freshness.json");
  const sourceHealth = readJson<SourceHealth>("content/automation/source-target-health-audit.json");
  const publishPack = readJson<PublishReadinessPack>("content/automation/publish-readiness-pack.json");
  const publicGap = readJson<PublicGapDecisionPack>("content/automation/public-coverage-gap-decision-pack.json");

  const uniqueActionFiles = [...new Set(board.tasks.filter((task) => task.ready).map((task) => normalizeFile(task.file)))];
  const freshnessByFile = new Map([...freshness.currentReviewItems, ...freshness.plannedReviewItems].map((item) => [item.file, item]));
  const sourceByFile = new Map(sourceHealth.files.map((item) => [item.file, item]));
  const publishByFile = new Map(publishPack.items.map((item) => [item.file, item]));
  const publicGapByFile = new Map(publicGap.items.map((item) => [item.file, item]));

  const items = uniqueActionFiles.map((file) => toBriefItem(file, freshnessByFile.get(file), sourceByFile.get(file), publishByFile.get(file), publicGapByFile.get(file)));
  const blockedItems = items.filter((item) => !item.readyForFreshnessReview);
  const highRiskItems = items.filter((item) => item.freshnessRisk === "high");

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only freshness brief for current review candidates. It turns freshness risk into human fact-check tasks and does not verify or rewrite facts automatically.",
      stopBefore: "Do not mark review until a human confirms fast-changing claims against official sources. Publishing still requires separate explicit approval.",
    },
    sourceEvidence: {
      actionBoardGuardrails: board.guardrails,
      actionBoardReadyTasks: board.tasks.filter((task) => task.ready).length,
      contentFreshnessGeneratedAt: freshness.generatedAt,
      contentFreshnessGuardrails: freshness.guardrails,
      sourceHealthSummary: sourceHealth.summary,
      uniqueActionFiles: uniqueActionFiles.length,
    },
    summary: {
      blockedItems: blockedItems.length,
      highRiskItems: highRiskItems.length,
      items: items.length,
      itemsWithOfficialSources: items.filter((item) => item.officialSourceTargets.length > 0).length,
      itemsWithReachableSources: items.filter((item) => item.reachableSources > 0).length,
      readyItems: items.filter((item) => item.readyForFreshnessReview).length,
      unsafeCommands: 0,
    },
    blockedItems,
    highRiskItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "review-freshness-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "review-freshness-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: blockedItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (blockedItems.length) process.exitCode = 1;
}

function toBriefItem(
  file: string,
  freshnessItem: FreshnessItem | undefined,
  sourceItem: SourceHealth["files"][number] | undefined,
  publishItem: PublishReadinessPack["items"][number] | undefined,
  publicGapItem: PublicGapDecisionPack["items"][number] | undefined,
): FreshnessBriefItem {
  const article = readArticle(file);
  const title = String(article.data.title || publicGapItem?.file || file);
  const officialSourceTargets = dedupe([...(publishItem?.officialSourceTargets || []), ...(publicGapItem?.reviewPacket.sourceTargets || []), ...(sourceItem?.urls || [])]);
  const riskReasons = freshnessItem?.riskReasons || freshnessReasonsFromArticle(article.content, title);
  const staleSensitiveChecks = dedupe([
    ...(publishItem?.factCheckQueries || []),
    ...riskReasons.map((reason) => `Confirm current official guidance for ${reason.replace(/^.*: /, "")}.`),
    ...officialSourceTargets.slice(0, 4).map((target) => `Open and verify official source: ${target}.`),
  ]).slice(0, 12);
  const reviewFocus = dedupe([...(publicGapItem?.reviewPacket.reviewFocus || []), ...riskReasons.map((reason) => reason.replace(/^.*: /, ""))]).slice(0, 10);
  const reachableSources = sourceItem?.reachableSources || 0;
  const sourceTargets = sourceItem?.sourceTargets || officialSourceTargets.length;

  return {
    articleUpdatedAt: String(article.data.updatedAt || freshnessItem?.updatedAt || ""),
    file,
    freshnessRisk: freshnessItem?.riskLevel || (riskReasons.length ? "high" : "low"),
    humanReviewChecklist: [
      "Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.",
      "Open official source targets and verify current product names, APIs, limits, pricing-sensitive wording, and workflow boundaries.",
      "Rewrite or remove any unsupported claim before mark:review.",
      "Confirm no traffic, ranking, revenue, client acquisition, or guaranteed result claim was introduced.",
      "Only after human approval, run mark:review manually; publishing still requires separate explicit approval.",
    ],
    officialSourceTargets,
    readyForFreshnessReview: reachableSources > 0 && officialSourceTargets.length > 0 && staleSensitiveChecks.length > 0,
    reachableSources,
    reviewFocus,
    riskReasons,
    scope: sourceScopesFor(file, publishItem, publicGapItem),
    sourceTargets,
    staleSensitiveChecks,
    title,
    warningIssues: publicGapItem?.reviewPacket.warningIssues || [],
  };
}

function freshnessReasonsFromArticle(content: string, title: string) {
  const text = `${title} ${content}`.toLowerCase();
  return highRiskTerms.filter((term) => text.includes(term)).slice(0, 8).map((term) => `fast-changing technical term: ${term}`);
}

function sourceScopesFor(file: string, publishItem: unknown, publicGapItem: unknown) {
  return ["action-board", publishItem ? "current-review" : "", publicGapItem ? "public-gap" : ""].filter(Boolean);
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function dedupe(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  blockedItems: FreshnessBriefItem[];
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  highRiskItems: FreshnessBriefItem[];
  items: FreshnessBriefItem[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
}) {
  const lines = [
    "# Review Freshness Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It converts freshness risk into human fact-check tasks for current review candidates.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Source Evidence",
    "",
    `- Action board ready tasks: ${payload.sourceEvidence.actionBoardReadyTasks}`,
    `- Unique action files: ${payload.sourceEvidence.uniqueActionFiles}`,
    `- Content freshness generated at: ${payload.sourceEvidence.contentFreshnessGeneratedAt}`,
    `- Source health summary: ${JSON.stringify(payload.sourceEvidence.sourceHealthSummary)}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Blocked Items",
    "",
    ...briefTable(payload.blockedItems),
    "",
    "## High Risk Items",
    "",
    ...briefTable(payload.highRiskItems),
    "",
    "## All Items",
    "",
    ...briefTable(payload.items),
    "",
    "## Per-Candidate Freshness Checklist",
    "",
    ...payload.items.flatMap((item) => itemSection(item)),
    "",
  ];

  return lines.join("\n");
}

function briefTable(items: FreshnessBriefItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Risk | Updated | Sources | Checks | Scope | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForFreshnessReview} | ${item.freshnessRisk} | ${item.articleUpdatedAt} | ${item.reachableSources}/${item.sourceTargets} | ${item.staleSensitiveChecks.length} | ${item.scope.join(", ")} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: FreshnessBriefItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Freshness risk: ${item.freshnessRisk}`,
    `- Updated at: ${item.articleUpdatedAt}`,
    `- Reachable sources: ${item.reachableSources}/${item.sourceTargets}`,
    "",
    "Risk reasons:",
    "",
    ...(item.riskReasons.length ? item.riskReasons.map((entry) => `- ${entry}`) : ["- none"]),
    "",
    "Official source targets:",
    "",
    ...(item.officialSourceTargets.length ? item.officialSourceTargets.map((entry) => `- ${entry}`) : ["- none"]),
    "",
    "Freshness checks:",
    "",
    ...item.staleSensitiveChecks.map((entry) => `- ${entry}`),
    "",
    "Human review checklist:",
    "",
    ...item.humanReviewChecklist.map((entry) => `- ${entry}`),
    "",
  ];
}

const highRiskTerms = ["api", "agent", "dify", "gemini", "key", "model", "n8n", "openai", "rag", "rate limit", "vercel", "vllm", "webhook", "部署", "模型", "知识库"];

void main();
