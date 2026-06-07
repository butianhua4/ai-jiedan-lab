import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore?: string;
};

type SprintBoard = {
  items: Array<{
    commandBoundary: CommandBoundary;
    file: string;
    lane: string;
    readyForSprint: boolean;
    safeDraft: boolean;
    searchQueries: number;
    sourceTargets: number;
    sprintOrder: number;
    title: string;
  }>;
  summary: { itemsNeedingSearchQuery: number; unsafeItems: number };
};

type QueryCoverage = {
  items: Array<{
    file: string;
    laneTitle: string;
    primaryKeyword: string;
    queryFamilies: Record<string, string[]>;
    readyForManualReview: boolean;
    queryCount: number;
  }>;
  summary: { items: number; unsafeItems: number };
};

type SourcePack = {
  items: Array<{
    factCheckQueries: string[];
    file: string;
    officialSourceTargets: string[];
    primaryKeyword?: string;
  }>;
  summary: { items: number; unsafeItems: number };
};

type WaveApprovalPacket = {
  items: Array<{
    factCheckQueries: string[];
    file: string;
    officialSourceTargets: string[];
  }>;
  summary: { items: number; unsafeItems: number };
};

type GapItem = {
  commandBoundary: CommandBoundary;
  coverageLane: string;
  coverageQueryCount: number;
  factCheckQueries: string[];
  file: string;
  officialSourceTargets: string[];
  primaryKeyword: string;
  queryFamiliesUsed: string[];
  readyForManualSearchQueryReview: boolean;
  recommendedSearchQueries: string[];
  reviewChecklist: string[];
  safeDraft: boolean;
  sourceEvidence: string[];
  sprintLane: string;
  sprintOrder: number;
  title: string;
};

function main() {
  const sprintBoard = readJson<SprintBoard>("content/automation/autopilot-review-sprint-board.json");
  const queryCoverage = readJson<QueryCoverage>("content/automation/search-query-coverage.json");
  const sourcePack = readJson<SourcePack>("content/automation/next-review-source-pack.json");
  const wavePacket = readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json");

  const coverageByFile = new Map(queryCoverage.items.map((item) => [item.file, item]));
  const sourcePackByFile = new Map(sourcePack.items.map((item) => [item.file, item]));
  const waveByFile = new Map(wavePacket.items.map((item) => [item.file, item]));
  const gapItems = sprintBoard.items.filter((item) => item.searchQueries === 0);
  const items = gapItems.map((item) => {
    const coverage = coverageByFile.get(item.file);
    const source = sourcePackByFile.get(item.file);
    const wave = waveByFile.get(item.file);
    const recommendedSearchQueries = selectRecommendedQueries(coverage);
    const factCheckQueries = dedupe([...(source?.factCheckQueries || []), ...(wave?.factCheckQueries || [])]).slice(0, 8);
    const officialSourceTargets = dedupe([...(source?.officialSourceTargets || []), ...(wave?.officialSourceTargets || [])]).slice(0, 10);
    const queryFamiliesUsed = coverage
      ? Object.entries(coverage.queryFamilies)
          .filter(([, queries]) => queries.some((query) => recommendedSearchQueries.includes(query)))
          .map(([family]) => family)
      : [];
    const sourceEvidence = [
      coverage ? "search-query-coverage" : "",
      source ? "next-review-source-pack" : "",
      wave ? "wave-approval-packet" : "",
    ].filter(Boolean);

    return {
      commandBoundary: item.commandBoundary,
      coverageLane: coverage?.laneTitle || "missing",
      coverageQueryCount: coverage?.queryCount || 0,
      factCheckQueries,
      file: item.file,
      officialSourceTargets,
      primaryKeyword: coverage?.primaryKeyword || source?.primaryKeyword || "",
      queryFamiliesUsed,
      readyForManualSearchQueryReview:
        item.readyForSprint &&
        item.safeDraft &&
        hasCommandBoundary(item.commandBoundary) &&
        Boolean(coverage?.readyForManualReview) &&
        recommendedSearchQueries.length >= 6 &&
        factCheckQueries.length > 0 &&
        officialSourceTargets.length > 0,
      recommendedSearchQueries,
      reviewChecklist: [
        "Confirm the article is still draft, noindex, and humanReviewRequired before changing article metadata.",
        "Use these queries as manual review evidence only; do not auto-edit article frontmatter from this report.",
        "Prefer queries that match the article's actual title, description, and reader job-to-be-done.",
        "Discard any query that would push the article toward unsupported traffic, ranking, revenue, or benchmark claims.",
        "After human approval, add chosen search queries in the article review workflow before mark:review.",
        "Do not run mark:review or publish commands from this gap brief.",
      ],
      safeDraft: item.safeDraft,
      sourceEvidence,
      sprintLane: item.lane,
      sprintOrder: item.sprintOrder,
      title: item.title,
    } satisfies GapItem;
  });

  const unsafeItems = items.filter((item) => !item.readyForManualSearchQueryReview);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only gap brief for next-10 sprint items that lack search queries in the autopilot queue.",
      stopBefore: "Use recommended queries during manual review only. Do not change article status or publish without explicit approval.",
    },
    sourceEvidence: {
      nextReviewSourcePackItems: sourcePack.summary.items,
      searchQueryCoverageItems: queryCoverage.summary.items,
      sprintBoardItemsNeedingSearchQuery: sprintBoard.summary.itemsNeedingSearchQuery,
      sprintBoardUnsafeItems: sprintBoard.summary.unsafeItems,
      waveApprovalPacketItems: wavePacket.summary.items,
    },
    summary: {
      items: items.length,
      itemsWithCommandBoundary: items.filter((item) => hasCommandBoundary(item.commandBoundary)).length,
      itemsWithCoverageEvidence: items.filter((item) => item.sourceEvidence.includes("search-query-coverage")).length,
      itemsWithFactCheckQueries: items.filter((item) => item.factCheckQueries.length > 0).length,
      itemsWithOfficialSources: items.filter((item) => item.officialSourceTargets.length > 0).length,
      itemsWithRecommendedQueries: items.filter((item) => item.recommendedSearchQueries.length >= 6).length,
      readyItems: items.filter((item) => item.readyForManualSearchQueryReview).length,
      safeDraftItems: items.filter((item) => item.safeDraft).length,
      totalRecommendedQueries: items.reduce((sum, item) => sum + item.recommendedSearchQueries.length, 0),
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-search-query-gap-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-search-query-gap-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function selectRecommendedQueries(coverage: QueryCoverage["items"][number] | undefined) {
  if (!coverage) return [];
  const keyword = coverage.primaryKeyword;
  const preferredFamilies = ["howTo", "comparison", "template", "risk", "costOps", "deployment"];
  const queries = preferredFamilies.flatMap((family) => coverage.queryFamilies[family] || []);
  return dedupe([keyword, ...queries.filter((query) => query.includes(keyword))]).slice(0, 10);
}

function hasCommandBoundary(command: CommandBoundary) {
  return (
    command.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !command.publishDryRunAfterReview.includes("--confirm") &&
    command.publishConfirm === "not-included"
  );
}

function dedupe(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: GapItem[];
  sourceEvidence: Record<string, number>;
  summary: Record<string, number>;
  unsafeItems: GapItem[];
}) {
  const lines = [
    "# Autopilot Search Query Gap Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns existing search-query evidence into a manual checklist for next-10 sprint items that currently have zero autopilot queue search queries.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
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
    "## Gap Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Manual Query Review",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: GapItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Order | Ready | Sources | Recommended queries | Primary keyword | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.sprintOrder} | ${item.readyForManualSearchQueryReview} | ${item.officialSourceTargets.length} | ${item.recommendedSearchQueries.length} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: GapItem) {
  return [
    `### ${item.sprintOrder}. ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Sprint lane: ${item.sprintLane}`,
    `- Coverage lane: ${item.coverageLane}`,
    `- Primary keyword: ${item.primaryKeyword}`,
    `- Query families used: ${item.queryFamiliesUsed.join(", ") || "none"}`,
    `- Source evidence: ${item.sourceEvidence.join(", ") || "missing"}`,
    `- Mark-review after human approval: ${item.commandBoundary.markReviewAfterHumanApproval}`,
    `- Publish dry-run only: ${item.commandBoundary.publishDryRunAfterReview}`,
    `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
    "",
    "Recommended search queries:",
    "",
    ...item.recommendedSearchQueries.map((query) => `- ${query}`),
    "",
    "Fact-check queries:",
    "",
    ...item.factCheckQueries.slice(0, 6).map((query) => `- ${query}`),
    "",
    "Checklist:",
    "",
    ...item.reviewChecklist.map((step) => `- ${step}`),
    "",
  ];
}

main();
