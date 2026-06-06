import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";

type ArticleSummary = {
  category: string;
  file: string;
  primaryKeyword: string;
  searchIntent: string;
  slug: string;
  status: string;
  title: string;
  tokens: string[];
};

type ActionBoard = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  tasks: Array<{ file: string; kind: string; priority: number; ready: boolean; scope: string; title: string }>;
};

type ContentCannibalization = {
  generatedAt: string;
  summary: {
    articleCount: number;
    conflicts: number;
    keywordConflicts: number;
    reviewBatchConflicts: number;
    slugStemConflicts: number;
    titleStemConflicts: number;
  };
};

type SimilarArticle = {
  file: string;
  primaryKeyword: string;
  reason: string[];
  score: number;
  slug: string;
  status: string;
  title: string;
};

type BriefItem = {
  candidate: ArticleSummary;
  decision: "differentiate-before-approval" | "low-risk-approve-angle" | "monitor-only";
  highestPublishedScore: number;
  highestReviewScore: number;
  humanReviewChecklist: string[];
  publishedSimilar: SimilarArticle[];
  recommendation: string;
  reviewSimilar: SimilarArticle[];
  riskLevel: "high" | "low" | "medium";
};

async function main() {
  const board = readJson<ActionBoard>("content/automation/review-action-board.json");
  const cannibalization = readJson<ContentCannibalization>("content/automation/content-cannibalization.json");
  const articles = (await articleFiles()).map(toSummary);
  const byFile = new Map(articles.map((article) => [article.file, article]));
  const uniqueActionFiles = [...new Set(board.tasks.filter((task) => task.ready).map((task) => normalizeFile(task.file)))];
  const candidates = uniqueActionFiles.map((file) => byFile.get(file)).filter(Boolean) as ArticleSummary[];
  const candidateFiles = new Set(candidates.map((item) => item.file));
  const published = articles.filter((article) => article.status === "published");
  const otherReviewScope = articles.filter((article) => candidateFiles.has(article.file) || (article.status !== "published" && article.status !== "archived"));
  const items = candidates.map((candidate) => toBriefItem(candidate, published, otherReviewScope));
  const highRiskItems = items.filter((item) => item.riskLevel === "high");
  const mediumRiskItems = items.filter((item) => item.riskLevel === "medium");

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only cannibalization brief for current review candidates. It does not edit titles, slugs, keywords, status, noindex, or publishing state.",
      stopBefore: "Use recommendations during human review only. Publishing still requires separate explicit approval.",
    },
    sourceEvidence: {
      actionBoardGuardrails: board.guardrails,
      actionBoardReadyTasks: board.tasks.filter((task) => task.ready).length,
      contentCannibalizationGeneratedAt: cannibalization.generatedAt,
      contentCannibalizationSummary: cannibalization.summary,
      uniqueActionFiles: uniqueActionFiles.length,
    },
    summary: {
      candidateFiles: candidates.length,
      highRiskItems: highRiskItems.length,
      items: items.length,
      itemsWithPublishedComparison: items.filter((item) => item.publishedSimilar.length > 0).length,
      itemsWithReviewComparison: items.filter((item) => item.reviewSimilar.length > 0).length,
      mediumRiskItems: mediumRiskItems.length,
      unsafeCommands: 0,
    },
    highRiskItems,
    nextItems: items.filter((item) => item.riskLevel !== "low").slice(0, 8),
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "review-cannibalization-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "review-cannibalization-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: highRiskItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (highRiskItems.length) process.exitCode = 1;
}

function toSummary(file: string): ArticleSummary {
  const article = readArticle(file);
  const title = String(article.data.title || "");
  const primaryKeyword = String(article.data.primaryKeyword || "");
  const slug = String(article.data.slug || "");
  return {
    category: String(article.data.category || ""),
    file: rel(article.file),
    primaryKeyword,
    searchIntent: String(article.data.searchIntent || ""),
    slug,
    status: String(article.data.status || ""),
    title,
    tokens: tokensFor([title, primaryKeyword, slug, String(article.data.category || "")].join(" ")),
  };
}

function toBriefItem(candidate: ArticleSummary, published: ArticleSummary[], reviewScope: ArticleSummary[]): BriefItem {
  const publishedSimilar = published
    .filter((article) => article.file !== candidate.file)
    .map((article) => similarity(candidate, article))
    .filter((item) => item.score >= 24)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const reviewSimilar = reviewScope
    .filter((article) => article.file !== candidate.file)
    .map((article) => similarity(candidate, article))
    .filter((item) => item.score >= 34)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const highestPublishedScore = publishedSimilar[0]?.score || 0;
  const highestReviewScore = reviewSimilar[0]?.score || 0;
  const riskLevel = riskLevelFor(highestPublishedScore, highestReviewScore, publishedSimilar, reviewSimilar);
  const decision = decisionFor(riskLevel);
  return {
    candidate,
    decision,
    highestPublishedScore,
    highestReviewScore,
    humanReviewChecklist: checklistFor(candidate, publishedSimilar, reviewSimilar, riskLevel),
    publishedSimilar,
    recommendation: recommendationFor(candidate, publishedSimilar, reviewSimilar, riskLevel),
    reviewSimilar,
    riskLevel,
  };
}

function similarity(candidate: ArticleSummary, other: ArticleSummary): SimilarArticle {
  const reason: string[] = [];
  let score = 0;
  if (normalize(candidate.primaryKeyword) && normalize(candidate.primaryKeyword) === normalize(other.primaryKeyword)) {
    score += 70;
    reason.push("same primary keyword");
  }
  if (slugStem(candidate.slug) && slugStem(candidate.slug) === slugStem(other.slug)) {
    score += 42;
    reason.push("same slug stem");
  }
  if (titleStem(candidate.title) && titleStem(candidate.title) === titleStem(other.title)) {
    score += 34;
    reason.push("same title stem");
  }
  if (candidate.category && candidate.category === other.category) {
    score += 8;
    reason.push("same category");
  }
  if (candidate.searchIntent && candidate.searchIntent === other.searchIntent) {
    score += 6;
    reason.push("same search intent");
  }
  const overlap = tokenOverlap(candidate.tokens, other.tokens);
  if (overlap >= 0.5) {
    score += Math.round(overlap * 30);
    reason.push(`token overlap ${overlap.toFixed(2)}`);
  }
  return {
    file: other.file,
    primaryKeyword: other.primaryKeyword,
    reason,
    score,
    slug: other.slug,
    status: other.status,
    title: other.title,
  };
}

function riskLevelFor(
  highestPublishedScore: number,
  highestReviewScore: number,
  publishedSimilar: SimilarArticle[],
  reviewSimilar: SimilarArticle[],
): BriefItem["riskLevel"] {
  if (publishedSimilar.some((item) => item.reason.includes("same primary keyword")) || highestPublishedScore >= 70 || highestReviewScore >= 90) return "high";
  if (highestPublishedScore >= 45 || highestReviewScore >= 58 || reviewSimilar.some((item) => item.reason.includes("same primary keyword"))) return "medium";
  return "low";
}

function decisionFor(riskLevel: BriefItem["riskLevel"]): BriefItem["decision"] {
  if (riskLevel === "high") return "differentiate-before-approval";
  if (riskLevel === "medium") return "low-risk-approve-angle";
  return "monitor-only";
}

function recommendationFor(candidate: ArticleSummary, publishedSimilar: SimilarArticle[], reviewSimilar: SimilarArticle[], riskLevel: BriefItem["riskLevel"]) {
  if (riskLevel === "high") {
    const closest = publishedSimilar[0] || reviewSimilar[0];
    return `Before mark:review, rewrite or split the angle so "${candidate.title}" does not compete with "${closest?.title || "the closest similar article"}".`;
  }
  if (riskLevel === "medium") {
    return "Approve only after the human reviewer confirms a distinct audience, use case, and internal-link relationship.";
  }
  return "No strong cannibalization risk detected for current public coverage; keep the candidate as a distinct article.";
}

function checklistFor(candidate: ArticleSummary, publishedSimilar: SimilarArticle[], reviewSimilar: SimilarArticle[], riskLevel: BriefItem["riskLevel"]) {
  return [
    `Confirm the candidate owns a distinct search intent: ${candidate.primaryKeyword || candidate.title}.`,
    publishedSimilar[0]
      ? `Compare against published article: ${publishedSimilar[0].title} (${publishedSimilar[0].file}).`
      : "No close published article found; still confirm the title is not a duplicate promise.",
    reviewSimilar[0] ? `Compare against nearby draft/review candidate: ${reviewSimilar[0].title} (${reviewSimilar[0].file}).` : "No close draft/review candidate found.",
    riskLevel === "high" ? "Do not mark review until the angle, title, or consolidation decision is explicit." : "Document why this can remain a separate article.",
    "If both articles stay, add a clear internal-link relationship: pillar, comparison, implementation detail, or troubleshooting follow-up.",
  ];
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function titleStem(title: string) {
  return tokensFor(title).slice(0, 5).join(" ");
}

function slugStem(slug: string) {
  return slug
    .toLowerCase()
    .split(/[-_]+/)
    .filter((token) => token.length >= 3 && !stopWords.has(token))
    .slice(0, 5)
    .join("-");
}

function tokenOverlap(a: string[], b: string[]) {
  if (!a.length || !b.length) return 0;
  const setB = new Set(b);
  const shared = new Set(a.filter((token) => setB.has(token)));
  return shared.size / Math.min(new Set(a).size, new Set(b).size);
}

function tokensFor(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/[\s-]+/)
    .filter((token) => token.length >= 2 && !stopWords.has(token));
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  highRiskItems: BriefItem[];
  items: BriefItem[];
  nextItems: BriefItem[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
}) {
  const lines = [
    "# Review Cannibalization Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It checks current review candidates against published and nearby draft articles before human approval.",
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
    `- Content cannibalization generated at: ${payload.sourceEvidence.contentCannibalizationGeneratedAt}`,
    `- Global cannibalization summary: ${JSON.stringify(payload.sourceEvidence.contentCannibalizationSummary)}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## High Risk Items",
    "",
    ...briefTable(payload.highRiskItems),
    "",
    "## Next Items",
    "",
    ...briefTable(payload.nextItems),
    "",
    "## All Items",
    "",
    ...briefTable(payload.items),
    "",
    "## Per-Candidate Checklist",
    "",
    ...payload.items.flatMap((item) => itemSection(item)),
    "",
  ];

  return lines.join("\n");
}

function briefTable(items: BriefItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Risk | Decision | Published score | Review score | Recommendation | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.riskLevel} | ${item.decision} | ${item.highestPublishedScore} | ${item.highestReviewScore} | ${item.recommendation} | ${item.candidate.title} | ${item.candidate.file} |`,
    ),
  ];
}

function itemSection(item: BriefItem) {
  return [
    `### ${item.candidate.title}`,
    "",
    `- File: ${item.candidate.file}`,
    `- Primary keyword: ${item.candidate.primaryKeyword || "missing"}`,
    `- Risk: ${item.riskLevel}`,
    `- Decision: ${item.decision}`,
    `- Recommendation: ${item.recommendation}`,
    "",
    "Closest published articles:",
    "",
    ...(item.publishedSimilar.length ? item.publishedSimilar.map((entry) => `- ${entry.score}: ${entry.title} (${entry.file}) - ${entry.reason.join(", ")}`) : ["- none"]),
    "",
    "Closest draft/review articles:",
    "",
    ...(item.reviewSimilar.length ? item.reviewSimilar.map((entry) => `- ${entry.score}: ${entry.title} (${entry.file}) - ${entry.reason.join(", ")}`) : ["- none"]),
    "",
    "Human review checklist:",
    "",
    ...item.humanReviewChecklist.map((entry) => `- ${entry}`),
    "",
  ];
}

const stopWords = new Set([
  "the",
  "and",
  "for",
  "with",
  "guide",
  "checklist",
  "mistakes",
  "how",
  "what",
  "when",
  "why",
  "怎么",
  "什么",
  "如何",
  "教程",
  "清单",
  "指南",
]);

void main();
