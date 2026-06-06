import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type Candidate = {
  category: string;
  file: string;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  title: string;
};

type TopicCoverage = {
  audience: string;
  candidates: Candidate[];
  gapScore: number;
  publicMatches: number;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  topic: string;
  workflowAngles: string[];
};

type DeploymentCoverage = {
  coverage: TopicCoverage[];
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean };
  sourceEvidence: { officialSources: string[] };
  summary: {
    deploymentPublicArticles: number;
    reviewReadyDeploymentDrafts: number;
    topics: number;
    topicsWithoutPublicCoverage: number;
    uniqueCandidateFiles: number;
    unsafeCandidateItems: number;
  };
};

type DeploymentReviewItem = {
  audience: string;
  category: string;
  commandBoundary: {
    markReviewAfterHumanApproval: string;
    publishConfirm: "not-included";
    publishDryRunAfterReview: string;
    stopBefore: string;
  };
  file: string;
  humanDecisionChecklist: string[];
  primaryKeyword: string;
  priorityScore: number;
  publicMatches: number;
  qualityScore: number;
  readyForHumanReview: boolean;
  reviewFocus: string[];
  riskChecks: string[];
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
  topic: string;
  workflowAngles: string[];
};

const maxItems = 12;

function main() {
  const coverage = readJson<DeploymentCoverage>("content/automation/ai-deployment-coverage.json");
  const selected = selectItems(coverage.coverage);
  const unsafeItems = selected.filter((item) => !item.safeDraft || !item.readyForHumanReview || item.commandBoundary.publishConfirm !== "not-included");
  const duplicateFiles = selected.length - new Set(selected.map((item) => item.file)).size;
  const itemsWithOfficialSources = selected.filter((item) => item.sourceTargets.length >= 2).length;
  const itemsWithSearchQueries = selected.filter((item) => item.searchQueries.length >= 3).length;
  const itemsWithChecklists = selected.filter((item) => item.humanDecisionChecklist.length >= 7 && item.riskChecks.length >= 6).length;

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only AI deployment review pack. It selects model deployment, Agent, RAG, memory, API, and infrastructure drafts for human review and does not edit, mark review, or publish.",
      stopBefore: "Stop before mark:review and stop before publish. Human approval is required for every article.",
    },
    sourceEvidence: {
      coverageGeneratedAt: coverage.generatedAt,
      coverageGuardrails: coverage.guardrails,
      coverageSummary: coverage.summary,
      officialSources: coverage.sourceEvidence.officialSources,
      trafficNote: "Search queries are broad intent seeds, not measured traffic, rankings, clicks, impressions, or income.",
    },
    summary: {
      deploymentPublicArticles: coverage.summary.deploymentPublicArticles,
      duplicateFiles,
      items: selected.length,
      itemsWithChecklists,
      itemsWithCommandBoundary: selected.filter(hasCommandBoundary).length,
      itemsWithOfficialSources,
      itemsWithSearchQueries,
      reviewReadyDeploymentDrafts: coverage.summary.reviewReadyDeploymentDrafts,
      safeDraftItems: selected.filter((item) => item.safeDraft).length,
      topicsCovered: new Set(selected.map((item) => item.topic)).size,
      topicsWithoutPublicCoverage: coverage.summary.topicsWithoutPublicCoverage,
      unsafeItems: unsafeItems.length,
      uniqueFiles: new Set(selected.map((item) => item.file)).size,
    },
    unsafeItems,
    nextItems: selected.slice(0, 6),
    items: selected,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "ai-deployment-review-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "ai-deployment-review-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function selectItems(coverage: TopicCoverage[]) {
  const used = new Set<string>();
  const selected: DeploymentReviewItem[] = [];

  for (const topic of coverage.sort((a, b) => b.gapScore - a.gapScore || a.topic.localeCompare(b.topic))) {
    if (selected.length >= maxItems) break;
    for (const candidate of topic.candidates) {
      if (selected.length >= maxItems) break;
      if (used.has(candidate.file)) continue;
      used.add(candidate.file);
      selected.push(toReviewItem(topic, candidate));
      break;
    }
  }

  return selected.sort((a, b) => b.priorityScore - a.priorityScore || a.file.localeCompare(b.file));
}

function toReviewItem(topic: TopicCoverage, candidate: Candidate): DeploymentReviewItem {
  const article = readArticle(candidate.file);
  const quality = checkFile(candidate.file);
  const safeDraft =
    article.data.status === "draft" &&
    article.data.noindex === true &&
    article.data.humanReviewRequired === true &&
    Boolean(article.data.sourceNotes) &&
    quality.qualityScore >= 100;

  return {
    audience: topic.audience,
    category: candidate.category,
    commandBoundary: {
      markReviewAfterHumanApproval: `npm run mark:review -- --file=${candidate.file} --confirm-human`,
      publishDryRunAfterReview: `npm run publish:articles -- --file=${candidate.file}`,
      publishConfirm: "not-included",
      stopBefore: "Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.",
    },
    file: candidate.file,
    humanDecisionChecklist: [
      "Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.",
      "Verify official docs for deployment commands, SDK names, model names, API endpoints, environment variables, and version-sensitive details.",
      "Check that API keys, secrets, tokens, and credentials are never exposed in client-side code or screenshots.",
      "Confirm the article includes a smoke check, rollback boundary, logging plan, and a failure triage path.",
      "For Agent or tool-calling topics, confirm tool permissions, human approval steps, and audit logs are explicit.",
      "For RAG or memory topics, confirm citation, privacy, chunking, retrieval, and hallucination review boundaries are explicit.",
      "Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.",
    ],
    primaryKeyword: candidate.primaryKeyword,
    priorityScore: topic.gapScore + candidate.qualityScore + (topic.publicMatches === 0 ? 50 : 0),
    publicMatches: topic.publicMatches,
    qualityScore: quality.qualityScore,
    readyForHumanReview: safeDraft && topic.searchQueries.length >= 3 && topic.sourceTargets.length >= 2,
    reviewFocus: topic.reviewFocus,
    riskChecks: [
      "No one-click stability promise for deployment, serving, Agent execution, or RAG quality.",
      "No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.",
      "No unsafe secret handling, public API key exposure, or client-side privileged token use.",
      "No unbounded autonomous Agent action without permissions, allowlists, human approval, and logs.",
      "No RAG or memory claim that removes the need for citation, privacy review, or hallucination checks.",
      "No outdated model, package, endpoint, pricing, or platform behavior unless marked for human fact-checking.",
    ],
    safeDraft,
    searchQueries: topic.searchQueries,
    sourceTargets: topic.sourceTargets,
    title: candidate.title,
    topic: topic.topic,
    workflowAngles: topic.workflowAngles,
  };
}

function hasCommandBoundary(item: DeploymentReviewItem) {
  return (
    item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !item.commandBoundary.publishDryRunAfterReview.includes("--confirm") &&
    item.commandBoundary.publishConfirm === "not-included" &&
    item.commandBoundary.stopBefore.includes("explicit human approval")
  );
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: DeploymentReviewItem[];
  nextItems: DeploymentReviewItem[];
  sourceEvidence: { officialSources: string[]; trafficNote: string };
  summary: Record<string, number>;
  unsafeItems: DeploymentReviewItem[];
}) {
  const lines = [
    "# AI Deployment Review Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns AI deployment, Agent, RAG, memory, API, and infrastructure coverage into a deduplicated human review queue.",
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
    `- Traffic note: ${payload.sourceEvidence.trafficNote}`,
    "",
    ...payload.sourceEvidence.officialSources.map((source) => `- ${source}`),
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Next Items",
    "",
    ...itemTable(payload.nextItems),
    "",
    "## All Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Per-Item Review Packets",
    "",
    ...payload.items.flatMap((item) => itemSection(item)),
    "",
  ];

  return lines.join("\n");
}

function itemTable(items: DeploymentReviewItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Safe | Score | Public | Sources | Queries | Topic | Category | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.priorityScore} | ${item.publicMatches} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.topic} | ${item.category} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: DeploymentReviewItem) {
  return [
    `### ${item.topic}: ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Category: ${item.category}`,
    `- Primary keyword: ${item.primaryKeyword}`,
    `- Ready for human review: ${item.readyForHumanReview}`,
    `- Safe draft: ${item.safeDraft}`,
    `- Public matches: ${item.publicMatches}`,
    "",
    "Search queries:",
    "",
    ...item.searchQueries.map((query) => `- ${query}`),
    "",
    "Workflow angles:",
    "",
    ...item.workflowAngles.map((angle) => `- ${angle}`),
    "",
    "Review focus:",
    "",
    ...item.reviewFocus.map((focus) => `- ${focus}`),
    "",
    "Risk checks:",
    "",
    ...item.riskChecks.map((check) => `- ${check}`),
    "",
    "Human decision checklist:",
    "",
    ...item.humanDecisionChecklist.map((check) => `- ${check}`),
    "",
    "Command boundary:",
    "",
    `- Mark review after human approval: \`${item.commandBoundary.markReviewAfterHumanApproval}\``,
    `- Publish dry-run after review: \`${item.commandBoundary.publishDryRunAfterReview}\``,
    `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
    `- Stop before: ${item.commandBoundary.stopBefore}`,
    "",
  ];
}

main();
