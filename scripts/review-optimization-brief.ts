import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

type ActionTask = {
  actionItems: string[];
  file: string;
  kind: string;
  priority: number;
  ready: boolean;
  scope: string;
  title: string;
  warnings: string[];
};

type ReviewActionBoard = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  tasks: ActionTask[];
};

type PublicLinkSuggestion = {
  reason: string;
  score: number;
  title: string;
  url: string;
};

type InternalLinks = {
  candidateItems: Array<{
    file: string;
    linksToPublicArticles: number;
    suggestions: PublicLinkSuggestion[];
  }>;
};

type SearchQueryMatch = {
  items: Array<{
    descriptionHit: boolean;
    exactQueryMatches: number;
    file: string;
    matchedFamilies: number;
    primaryKeyword: string;
    queryCount: number;
    reviewSuggestions?: string[];
    titleHit: boolean;
    warningIssues: string[];
  }>;
};

type SnippetAudit = {
  warningItems: Array<{
    description: string;
    descriptionLength: number;
    file: string;
    primaryKeyword: string;
    title: string;
    titleLength: number;
    warnings: string[];
  }>;
};

type StructuredData = {
  warningItems: Array<{
    file: string;
    issues: string[];
    warnings: string[];
  }>;
};

type PublicGapDecisionPack = {
  items: Array<{
    file: string;
    publicLinkSuggestion: PublicLinkSuggestion | null;
    reviewPacket: { missingSubtopics: string[]; searchSeedEvidence: { searchSeeds: string[] }; warningIssues: string[] };
    suggestedOptimizations: string[];
    themeTitle: string;
  }>;
};

type OptimizationBrief = {
  file: string;
  internalLink: {
    currentPublicLinks: number;
    reason: string;
    title: string;
    url: string;
  } | null;
  kind: string;
  priority: number;
  proposedDescription: string;
  proposedOpeningAdditions: string[];
  proposedTitle: string;
  ready: boolean;
  searchEvidence: {
    descriptionHit: boolean | null;
    exactQueryMatches: number | null;
    matchedFamilies: number | null;
    queryCount: number | null;
    seedExamples: string[];
    titleHit: boolean | null;
  };
  scope: string;
  sourceWarnings: string[];
  title: string;
  warningRemediation: string[];
};

function main() {
  const board = readJson<ReviewActionBoard>("content/automation/review-action-board.json");
  const internalLinks = readJson<InternalLinks>("content/automation/internal-link-opportunity-audit.json");
  const queryMatch = readJson<SearchQueryMatch>("content/automation/search-query-match-audit.json");
  const snippets = readJson<SnippetAudit>("content/automation/search-snippet-readiness-audit.json");
  const structuredData = readJson<StructuredData>("content/automation/structured-data-readiness-audit.json");
  const publicGap = readJson<PublicGapDecisionPack>("content/automation/public-coverage-gap-decision-pack.json");

  const linksByFile = new Map(internalLinks.candidateItems.map((item) => [item.file, item]));
  const queryByFile = new Map(queryMatch.items.map((item) => [item.file, item]));
  const snippetByFile = new Map(snippets.warningItems.map((item) => [item.file, item]));
  const structuredByFile = new Map(structuredData.warningItems.map((item) => [item.file, item]));
  const publicGapByFile = new Map(publicGap.items.map((item) => [item.file, item]));

  const tasks = board.tasks.filter((task) => task.ready).sort((a, b) => b.priority - a.priority || a.file.localeCompare(b.file));
  const briefs = tasks.map((task) =>
    toBrief(task, linksByFile.get(task.file), queryByFile.get(task.file), snippetByFile.get(task.file), structuredByFile.get(task.file), publicGapByFile.get(task.file)),
  );
  const briefsWithAction = briefs.filter((item) => item.warningRemediation.length > 0 || item.internalLink || item.proposedOpeningAdditions.length > 0);
  const exactQueryWeakItems = briefs.filter((item) => item.searchEvidence.exactQueryMatches !== null && item.searchEvidence.exactQueryMatches < 1);
  const missingLinkItems = briefs.filter((item) => item.internalLink && item.internalLink.currentPublicLinks === 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only copydesk brief for review candidates. It proposes search snippet, query-match, and internal-link improvements without editing article files.",
      stopBefore: "Apply any proposed copy only during human review. Never mark review or publish automatically.",
    },
    sourceEvidence: {
      actionBoardItems: board.tasks.length,
      actionBoardGuardrails: board.guardrails,
      reportsUsed: [
        "review-action-board",
        "internal-link-opportunity-audit",
        "search-query-match-audit",
        "search-snippet-readiness-audit",
        "structured-data-readiness-audit",
        "public-coverage-gap-decision-pack",
      ],
    },
    summary: {
      briefs: briefs.length,
      briefsWithAction: briefsWithAction.length,
      exactQueryWeakItems: exactQueryWeakItems.length,
      missingPublicLinkItems: missingLinkItems.length,
      readyBriefs: briefs.filter((item) => item.ready).length,
      unsafeCommands: 0,
    },
    nextBriefs: briefsWithAction.slice(0, 8),
    briefs,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "review-optimization-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "review-optimization-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
}

function toBrief(
  task: ActionTask,
  linkItem: InternalLinks["candidateItems"][number] | undefined,
  queryItem: SearchQueryMatch["items"][number] | undefined,
  snippetItem: SnippetAudit["warningItems"][number] | undefined,
  structuredItem: StructuredData["warningItems"][number] | undefined,
  publicGapItem: PublicGapDecisionPack["items"][number] | undefined,
): OptimizationBrief {
  const article = readArticle(task.file);
  const title = String(article.data.title || task.title);
  const description = String(article.data.description || "");
  const primaryKeyword = queryItem?.primaryKeyword || snippetItem?.primaryKeyword || String(article.data.primaryKeyword || "");
  const seedExamples = publicGapItem?.reviewPacket.searchSeedEvidence.searchSeeds.slice(0, 4) || [];
  const firstSeed = seedExamples[0] || primaryKeyword;
  const linkSuggestion = publicGapItem?.publicLinkSuggestion || linkItem?.suggestions[0] || null;
  const sourceWarnings = [
    ...task.warnings,
    ...(queryItem?.warningIssues || []),
    ...(snippetItem?.warnings || []),
    ...(structuredItem?.warnings || []),
    ...(publicGapItem?.reviewPacket.warningIssues || []),
  ];
  const warningRemediation = dedupe([
    ...sourceWarnings.map((warning) => remediationFor(warning, firstSeed)),
    ...(publicGapItem?.suggestedOptimizations || []),
    ...(queryItem?.reviewSuggestions || []),
  ]).filter(Boolean);

  return {
    file: task.file,
    internalLink: linkSuggestion
      ? {
          currentPublicLinks: linkItem?.linksToPublicArticles || 0,
          reason: linkSuggestion.reason,
          title: linkSuggestion.title,
          url: linkSuggestion.url,
        }
      : null,
    kind: task.kind,
    priority: task.priority,
    proposedDescription: proposeDescription(description, title, primaryKeyword, firstSeed),
    proposedOpeningAdditions: proposeOpeningAdditions(firstSeed, publicGapItem?.reviewPacket.missingSubtopics || [], linkSuggestion),
    proposedTitle: proposeTitle(title, primaryKeyword, firstSeed),
    ready: task.ready,
    scope: task.scope,
    searchEvidence: {
      descriptionHit: queryItem?.descriptionHit ?? null,
      exactQueryMatches: queryItem?.exactQueryMatches ?? null,
      matchedFamilies: queryItem?.matchedFamilies ?? null,
      queryCount: queryItem?.queryCount ?? null,
      seedExamples,
      titleHit: queryItem?.titleHit ?? null,
    },
    sourceWarnings: dedupe(sourceWarnings),
    title,
    warningRemediation,
  };
}

function remediationFor(warning: string, seed: string) {
  if (warning.includes("description")) return `Rewrite the meta description to name the reader, outcome, and search phrase: ${seed}.`;
  if (warning.includes("primary keyword")) return "Check whether the primary keyword can appear naturally in the title without making the title stiff.";
  if (warning.includes("no exact search-seed phrase")) return `Add one natural exact search phrase near the opening or first H2: ${seed}.`;
  if (warning.includes("few exact query")) return `Add one FAQ or checklist line that uses a high-intent query variant such as: ${seed}.`;
  if (warning.includes("no links to published articles")) return "Add one contextual link to a published article before approval.";
  if (warning.includes("missing subtopics")) return "Decide whether missing subtopics should become a short section or a follow-up article.";
  if (warning.includes("title")) return "Review the title for clarity, length, and search intent fit.";
  if (!warning) return "";
  return `Resolve or explicitly accept during human review: ${warning}.`;
}

function proposeTitle(title: string, primaryKeyword: string, seed: string) {
  const keyword = primaryKeyword || seed;
  if (!keyword || normalize(title).includes(normalize(keyword))) return title;
  const suffix = keyword.length <= 18 ? keyword : seed;
  if (!suffix || normalize(title).includes(normalize(suffix))) return title;
  const candidate = `${suffix}：${title.replace(/^[^：:]{2,24}[：:]/, "")}`;
  return candidate.length <= 72 ? candidate : title;
}

function proposeDescription(description: string, title: string, primaryKeyword: string, seed: string) {
  const phrase = primaryKeyword || seed || title;
  const base =
    description.length >= 55 && normalize(description).includes(normalize(phrase))
      ? description
      : `面向准备落地 ${phrase} 的团队，梳理判断标准、实施步骤、风险边界、验收清单和发布前人工审核重点。`;
  return base.length > 180 ? `${base.slice(0, 176)}...` : base;
}

function proposeOpeningAdditions(seed: string, missingSubtopics: string[], linkSuggestion: PublicLinkSuggestion | null) {
  return [
    seed ? `在开头 200 字内自然回答一次“${seed}”这个搜索意图，先给结论再展开步骤。` : "",
    missingSubtopics.length ? `补一个小节或提示框覆盖缺口：${missingSubtopics.slice(0, 4).join("、")}。` : "",
    linkSuggestion ? `在相关段落加入公开内链：${linkSuggestion.title} (${linkSuggestion.url})。` : "",
  ].filter(Boolean);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function dedupe(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  briefs: OptimizationBrief[];
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  nextBriefs: OptimizationBrief[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
}) {
  const lines = [
    "# Review Optimization Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It converts review warnings into copydesk suggestions for human review.",
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
    `- Action board items: ${payload.sourceEvidence.actionBoardItems}`,
    `- Reports used: ${(payload.sourceEvidence.reportsUsed as string[]).join(", ")}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Next Briefs",
    "",
    ...briefTable(payload.nextBriefs),
    "",
    "## All Briefs",
    "",
    ...briefTable(payload.briefs),
    "",
    "## Per-Article Suggestions",
    "",
    ...payload.nextBriefs.flatMap((item) => briefSection(item)),
    "",
  ];

  return lines.join("\n");
}

function briefTable(items: OptimizationBrief[]) {
  if (!items.length) return ["- none"];
  return [
    "| Priority | Scope | Actions | Exact queries | Link | Proposed title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.priority} | ${item.scope} | ${item.warningRemediation.length + item.proposedOpeningAdditions.length} | ${item.searchEvidence.exactQueryMatches ?? "n/a"} | ${item.internalLink ? item.internalLink.url : "none"} | ${item.proposedTitle} | ${item.file} |`,
    ),
  ];
}

function briefSection(item: OptimizationBrief) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Scope: ${item.scope}`,
    `- Proposed title: ${item.proposedTitle}`,
    `- Proposed description: ${item.proposedDescription}`,
    `- Search evidence: exact=${item.searchEvidence.exactQueryMatches ?? "n/a"}, families=${item.searchEvidence.matchedFamilies ?? "n/a"}, titleHit=${item.searchEvidence.titleHit ?? "n/a"}, descriptionHit=${item.searchEvidence.descriptionHit ?? "n/a"}`,
    `- Internal link: ${item.internalLink ? `${item.internalLink.title} (${item.internalLink.url})` : "none"}`,
    "",
    "Opening additions:",
    "",
    ...(item.proposedOpeningAdditions.length ? item.proposedOpeningAdditions.map((entry) => `- ${entry}`) : ["- none"]),
    "",
    "Warning remediation:",
    "",
    ...(item.warningRemediation.length ? item.warningRemediation.map((entry) => `- ${entry}`) : ["- none"]),
    "",
  ];
}

main();
