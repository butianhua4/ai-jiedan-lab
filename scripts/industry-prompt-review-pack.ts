import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type Candidate = {
  file: string;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  title: string;
};

type IndustryCoverage = {
  audience: string;
  candidates: Candidate[];
  gapScore: number;
  industry: string;
  publicMatches: number;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  workflowAngles: string[];
};

type PromptCoverage = {
  coverage: IndustryCoverage[];
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean };
  sourceEvidence: { officialPromptSources: string[] };
  summary: {
    industries: number;
    industriesWithoutPublicCoverage: number;
    promptPublicArticles: number;
    reviewReadyPromptDrafts: number;
    uniqueCandidateFiles: number;
    unsafeCandidateItems: number;
  };
};

type PromptReviewItem = {
  audience: string;
  commandBoundary: {
    markReviewAfterHumanApproval: string;
    publishConfirm: "not-included";
    publishDryRunAfterReview: string;
    stopBefore: string;
  };
  file: string;
  humanDecisionChecklist: string[];
  industry: string;
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
  workflowAngles: string[];
};

const maxItems = 12;

function main() {
  const coverage = readJson<PromptCoverage>("content/automation/industry-prompt-coverage.json");
  const selected = selectItems(coverage.coverage);
  const unsafeItems = selected.filter((item) => !item.safeDraft || !item.readyForHumanReview || item.commandBoundary.publishConfirm !== "not-included");
  const duplicateFiles = selected.length - new Set(selected.map((item) => item.file)).size;
  const itemsWithOfficialSources = selected.filter((item) => item.sourceTargets.length >= 4).length;
  const itemsWithSearchQueries = selected.filter((item) => item.searchQueries.length >= 3).length;
  const itemsWithChecklists = selected.filter((item) => item.humanDecisionChecklist.length >= 6 && item.riskChecks.length >= 4).length;

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only industry prompt review pack. It selects broad industry AI prompt drafts for human review and does not edit, mark review, or publish.",
      stopBefore: "Stop before mark:review and stop before publish. Human approval is required for every article.",
    },
    sourceEvidence: {
      coverageGeneratedAt: coverage.generatedAt,
      coverageGuardrails: coverage.guardrails,
      coverageSummary: coverage.summary,
      officialPromptSources: coverage.sourceEvidence.officialPromptSources,
      trafficNote: "Search queries are broad intent seeds, not measured traffic, rankings, clicks, impressions, or income.",
    },
    summary: {
      duplicateFiles,
      industriesCovered: new Set(selected.map((item) => item.industry)).size,
      industriesWithoutPublicCoverage: coverage.summary.industriesWithoutPublicCoverage,
      items: selected.length,
      itemsWithChecklists,
      itemsWithCommandBoundary: selected.filter(hasCommandBoundary).length,
      itemsWithOfficialSources,
      itemsWithSearchQueries,
      promptPublicArticles: coverage.summary.promptPublicArticles,
      reviewReadyPromptDrafts: coverage.summary.reviewReadyPromptDrafts,
      safeDraftItems: selected.filter((item) => item.safeDraft).length,
      unsafeItems: unsafeItems.length,
      uniqueFiles: new Set(selected.map((item) => item.file)).size,
    },
    unsafeItems,
    nextItems: selected.slice(0, 6),
    items: selected,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "industry-prompt-review-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "industry-prompt-review-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function selectItems(coverage: IndustryCoverage[]) {
  const used = new Set<string>();
  const selected: PromptReviewItem[] = [];

  for (const industry of coverage.sort((a, b) => b.gapScore - a.gapScore || a.industry.localeCompare(b.industry))) {
    if (selected.length >= maxItems) break;
    const candidate = industry.candidates.find((item) => !used.has(item.file));
    if (!candidate) continue;
    used.add(candidate.file);
    selected.push(toReviewItem(industry, candidate));
  }

  return selected.sort((a, b) => b.priorityScore - a.priorityScore || a.file.localeCompare(b.file));
}

function toReviewItem(industry: IndustryCoverage, candidate: Candidate): PromptReviewItem {
  const article = readArticle(candidate.file);
  const quality = checkFile(candidate.file);
  const safeDraft =
    article.data.status === "draft" &&
    article.data.noindex === true &&
    article.data.humanReviewRequired === true &&
    Boolean(article.data.sourceNotes) &&
    quality.qualityScore >= 100;

  return {
    audience: industry.audience,
    commandBoundary: {
      markReviewAfterHumanApproval: `npm run mark:review -- --file=${candidate.file} --confirm-human`,
      publishDryRunAfterReview: `npm run publish:articles -- --file=${candidate.file}`,
      publishConfirm: "not-included",
      stopBefore: "Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.",
    },
    file: candidate.file,
    humanDecisionChecklist: [
      "Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.",
      "Verify the prompt framework guidance against the official source targets.",
      "Check that prompt examples require user-provided facts instead of inventing business data.",
      "Confirm the article does not promise rankings, traffic, revenue, legal outcomes, medical outcomes, or guaranteed conversion.",
      "Make sure each prompt has input fields, output format, review criteria, and a human escalation boundary.",
      "Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.",
    ],
    industry: industry.industry,
    priorityScore: industry.gapScore + candidate.qualityScore + (industry.publicMatches === 0 ? 50 : 0),
    publicMatches: industry.publicMatches,
    qualityScore: quality.qualityScore,
    readyForHumanReview: safeDraft && industry.searchQueries.length >= 3 && industry.sourceTargets.length >= 4,
    reviewFocus: industry.reviewFocus,
    riskChecks: [
      "No fabricated metrics, rankings, traffic, income, or client results.",
      "No claim that prompts replace professional judgment in regulated or high-stakes workflows.",
      "No unsafe collection or exposure of private customer, employee, patient, or financial data.",
      "No instruction that bypasses platform rules, approval workflows, or human review.",
      "No unsupported model-specific behavior unless backed by a current official source.",
    ],
    safeDraft,
    searchQueries: industry.searchQueries,
    sourceTargets: industry.sourceTargets,
    title: candidate.title,
    workflowAngles: industry.workflowAngles,
  };
}

function hasCommandBoundary(item: PromptReviewItem) {
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
  items: PromptReviewItem[];
  nextItems: PromptReviewItem[];
  sourceEvidence: { officialPromptSources: string[]; trafficNote: string };
  summary: Record<string, number>;
  unsafeItems: PromptReviewItem[];
}) {
  const lines = [
    "# Industry Prompt Review Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns broad industry AI prompt coverage into a deduplicated human review queue.",
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
    ...payload.sourceEvidence.officialPromptSources.map((source) => `- ${source}`),
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

function itemTable(items: PromptReviewItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Safe | Score | Public | Sources | Queries | Industry | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.priorityScore} | ${item.publicMatches} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.industry} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: PromptReviewItem) {
  return [
    `### ${item.industry}: ${item.title}`,
    "",
    `- File: ${item.file}`,
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
