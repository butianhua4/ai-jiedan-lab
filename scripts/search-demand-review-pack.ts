import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type IntakeCandidate = {
  category: string;
  file: string;
  humanReviewRequired: boolean;
  noindex: boolean;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  sourceNotes: boolean;
  status: string;
  title: string;
};

type IntakeLane = {
  contentFormats: string[];
  intakeScore: number;
  lane: string;
  manualReviewFocus: string[];
  officialSourceTargets: string[];
  publicMatches: number;
  readyCandidates: IntakeCandidate[];
  reviewQueueMatches: number;
  searchQueries: string[];
  userProblem: string;
};

type SearchDemandIntake = {
  generatedAt: string;
  guardrails: {
    autoCreateArticles: boolean;
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    trafficClaim: string;
  };
  lanes: IntakeLane[];
  summary: {
    lanes: number;
    lanesWithReadyCandidates: number;
    readyCandidateFiles: number;
    unsafeLanes: number;
  };
};

type SourceHealth = {
  byFile?: Record<string, { reachableUrls?: string[]; sourceReferences?: Array<{ label?: string; url?: string }> }>;
  filesWithoutReachableSource?: string[];
  summary: { filesWithoutReachableSource: number };
};

type InternalLinks = {
  candidateItems?: Array<{
    file: string;
    suggestions?: Array<{ reason?: string; title: string; url: string }>;
  }>;
};

type ReviewPackItem = {
  commandBoundary: CommandBoundary;
  contentFormats: string[];
  factCheckQueries: string[];
  file: string;
  humanReviewChecklist: string[];
  lane: string;
  manualReviewFocus: string[];
  officialSourceTargets: string[];
  priorityScore: number;
  publicInternalLinkSuggestion: { reason?: string; title: string; url: string } | null;
  publicMatches: number;
  readyForHumanReview: boolean;
  reviewQueueMatched: boolean;
  safeDraft: boolean;
  searchQueries: string[];
  sourceHealth: {
    hasReachableSource: boolean;
    reachableUrls: string[];
  };
  stopBefore: string;
  title: string;
  userProblem: string;
  warningIssues: string[];
};

function main() {
  const intake = readJson<SearchDemandIntake>("content/automation/search-demand-intake.json");
  const sourceHealth = readOptional<SourceHealth>("content/automation/source-target-health-audit.json");
  const internalLinks = readOptional<InternalLinks>("content/automation/internal-link-opportunity-audit.json");
  const sourceMissingFiles = new Set(sourceHealth?.filesWithoutReachableSource || []);
  const sourceByFile = sourceHealth?.byFile || {};
  const linkByFile = new Map((internalLinks?.candidateItems || []).map((item) => [item.file, item]));

  const items = selectItems(intake.lanes).map(({ candidate, lane, reviewQueueMatched }) => {
    const reachableUrls = sourceByFile[candidate.file]?.reachableUrls || [];
    const publicInternalLinkSuggestion = linkByFile.get(candidate.file)?.suggestions?.[0] || null;
    const warningIssues = warningIssuesFor(candidate, lane, reachableUrls, sourceMissingFiles, publicInternalLinkSuggestion);
    const item: ReviewPackItem = {
      commandBoundary: {
        markReviewAfterHumanApproval: `npm run mark:review -- --file=${candidate.file} --confirm-human`,
        publishDryRunAfterReview: `npm run publish:articles -- --file=${candidate.file}`,
        publishConfirm: "not-included",
        stopBefore: "Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.",
      },
      contentFormats: lane.contentFormats,
      factCheckQueries: factCheckQueriesFor(lane, candidate),
      file: candidate.file,
      humanReviewChecklist: checklistFor(lane, candidate, publicInternalLinkSuggestion),
      lane: lane.lane,
      manualReviewFocus: lane.manualReviewFocus,
      officialSourceTargets: lane.officialSourceTargets,
      priorityScore: priorityScoreFor(lane, candidate, reviewQueueMatched),
      publicInternalLinkSuggestion,
      publicMatches: lane.publicMatches,
      readyForHumanReview: isReadyCandidate(candidate) && warningIssues.every((issue) => !issue.startsWith("blocking:")),
      reviewQueueMatched,
      safeDraft: isSafeDraft(candidate),
      searchQueries: lane.searchQueries,
      sourceHealth: {
        hasReachableSource: reachableUrls.length > 0 || !sourceMissingFiles.has(candidate.file),
        reachableUrls,
      },
      stopBefore: "Stop before mark:review and stop before publish. Both require explicit human approval.",
      title: candidate.title,
      userProblem: lane.userProblem,
      warningIssues,
    };
    return item;
  });

  const unsafeItems = items.filter((item) => !isSafeReviewPackItem(item));
  const laneSummaries = intake.lanes.map((lane) => {
    const laneItems = items.filter((item) => item.lane === lane.lane);
    return {
      lane: lane.lane,
      items: laneItems.length,
      publicMatches: lane.publicMatches,
      readyCandidates: lane.readyCandidates.length,
      reviewQueueMatches: lane.reviewQueueMatches,
      unsafeItems: laneItems.filter((item) => !isSafeReviewPackItem(item)).length,
    };
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      trafficClaim: "not-included",
      note: "Read-only review pack for high-search-demand lanes. It packages manual review work but never edits article files, marks review, or publishes.",
      stopBefore: "All commands are manual-only and require explicit human approval.",
    },
    sourceEvidence: {
      intakeGeneratedAt: intake.generatedAt,
      intakeGuardrails: intake.guardrails,
      intakeSummary: intake.summary,
      sourceHealthFilesWithoutReachableSource: sourceHealth?.summary.filesWithoutReachableSource ?? null,
      trafficNote: "Search queries are editorial demand seeds, not measured keyword volume, ranking, impressions, clicks, traffic, or revenue.",
    },
    summary: {
      factCheckQueries: new Set(items.flatMap((item) => item.factCheckQueries)).size,
      items: items.length,
      itemsPerLaneMax: Math.max(...laneSummaries.map((lane) => lane.items), 0),
      itemsWithCommandBoundary: items.filter((item) => hasCommandBoundary(item.commandBoundary)).length,
      itemsWithHumanChecklist: items.filter((item) => item.humanReviewChecklist.length >= 6).length,
      itemsWithInternalLinkSuggestion: items.filter((item) => item.publicInternalLinkSuggestion).length,
      itemsWithManualReviewFocus: items.filter((item) => item.manualReviewFocus.length >= 4).length,
      itemsWithOfficialSources: items.filter((item) => item.officialSourceTargets.length >= 3).length,
      itemsWithSearchQueries: items.filter((item) => item.searchQueries.length >= 8).length,
      lanes: laneSummaries.length,
      readyItems: items.filter((item) => item.readyForHumanReview).length,
      reviewQueueMatchedItems: items.filter((item) => item.reviewQueueMatched).length,
      safeDraftItems: items.filter((item) => item.safeDraft).length,
      unsafeItems: unsafeItems.length,
      zeroPublicLaneItems: items.filter((item) => item.publicMatches === 0).length,
    },
    laneSummaries,
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "search-demand-review-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "search-demand-review-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function selectItems(lanes: IntakeLane[]) {
  const selected: Array<{ candidate: IntakeCandidate; lane: IntakeLane; reviewQueueMatched: boolean }> = [];
  const seenFiles = new Set<string>();
  for (const lane of lanes) {
    const laneCandidates = lane.readyCandidates
      .map((candidate) => ({
        candidate,
        lane,
        reviewQueueMatched: candidateIsReviewQueueMatch(candidate.file, lane),
      }))
      .sort((a, b) => priorityScoreFor(b.lane, b.candidate, b.reviewQueueMatched) - priorityScoreFor(a.lane, a.candidate, a.reviewQueueMatched));
    let laneCount = 0;
    for (const item of laneCandidates) {
      if (seenFiles.has(item.candidate.file)) continue;
      selected.push(item);
      seenFiles.add(item.candidate.file);
      laneCount += 1;
      if (laneCount >= 2) break;
    }
  }
  return selected.sort((a, b) => priorityScoreFor(b.lane, b.candidate, b.reviewQueueMatched) - priorityScoreFor(a.lane, a.candidate, a.reviewQueueMatched));
}

function candidateIsReviewQueueMatch(file: string, lane: IntakeLane) {
  return lane.readyCandidates.slice(0, Math.max(lane.reviewQueueMatches, 0)).some((candidate) => candidate.file === file);
}

function priorityScoreFor(lane: IntakeLane, candidate: IntakeCandidate, reviewQueueMatched: boolean) {
  return lane.intakeScore + (lane.publicMatches === 0 ? 80 : 0) + (candidate.publishBatch || 0) + candidate.qualityScore + (reviewQueueMatched ? 25 : 0);
}

function factCheckQueriesFor(lane: IntakeLane, candidate: IntakeCandidate) {
  return dedupe([
    `${candidate.primaryKeyword || candidate.title} official docs latest`,
    `${candidate.primaryKeyword || candidate.title} current limitations`,
    ...lane.searchQueries.slice(0, 6).map((query) => `${query} official docs latest`),
  ]).slice(0, 10);
}

function checklistFor(lane: IntakeLane, candidate: IntakeCandidate, link: ReviewPackItem["publicInternalLinkSuggestion"]) {
  return [
    "Confirm the article is still draft, noindex=true, and humanReviewRequired=true.",
    `Verify source targets for lane: ${lane.lane}.`,
    `Check the article directly answers the primary search phrase: ${lane.searchQueries[0]}.`,
    "Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.",
    "Confirm all commands, credentials, API keys, and customer data examples are safe.",
    link ? `Approve or replace internal link suggestion: ${link.title} (${link.url}).` : "Add one relevant public internal link or document why no link is appropriate.",
    `Only after explicit human approval, run: npm run mark:review -- --file=${candidate.file} --confirm-human`,
    "Publishing remains separate and requires explicit approval.",
  ];
}

function warningIssuesFor(
  candidate: IntakeCandidate,
  lane: IntakeLane,
  reachableUrls: string[],
  sourceMissingFiles: Set<string>,
  link: ReviewPackItem["publicInternalLinkSuggestion"],
) {
  const issues: string[] = [];
  if (!isSafeDraft(candidate)) issues.push("blocking: candidate is not a safe draft/noindex/human-review item");
  if (lane.searchQueries.length < 8) issues.push("blocking: lane has too few search-query seeds");
  if (lane.officialSourceTargets.length < 3) issues.push("blocking: lane has too few official source targets");
  if (sourceMissingFiles.has(candidate.file)) issues.push("blocking: source health reports no reachable source for this file");
  if (reachableUrls.length === 0) issues.push("warning: source health has no per-file reachable URL list; verify official source targets manually");
  if (!link) issues.push("warning: no public internal-link suggestion found; add or explicitly reject one during human review");
  if (candidate.qualityScore < 100) issues.push("blocking: quality score below review threshold");
  return issues;
}

function isSafeDraft(candidate: IntakeCandidate) {
  return candidate.status === "draft" && candidate.noindex === true && candidate.humanReviewRequired === true;
}

function isReadyCandidate(candidate: IntakeCandidate) {
  return isSafeDraft(candidate) && candidate.sourceNotes === true && candidate.qualityScore >= 100;
}

function isSafeReviewPackItem(item: ReviewPackItem) {
  return (
    item.readyForHumanReview &&
    item.safeDraft &&
    item.searchQueries.length >= 8 &&
    item.officialSourceTargets.length >= 3 &&
    item.factCheckQueries.length > 0 &&
    item.humanReviewChecklist.length >= 6 &&
    hasCommandBoundary(item.commandBoundary)
  );
}

function hasCommandBoundary(command: CommandBoundary) {
  return command.markReviewAfterHumanApproval.includes("--confirm-human") && !command.publishDryRunAfterReview.includes("--confirm") && command.publishConfirm === "not-included";
}

function dedupe(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
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
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: ReviewPackItem[];
  laneSummaries: Array<{ items: number; lane: string; publicMatches: number; readyCandidates: number; reviewQueueMatches: number; unsafeItems: number }>;
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
  unsafeItems: ReviewPackItem[];
}) {
  const lines = [
    "# Search Demand Review Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It converts high-search-demand lanes into manual review packets and stops before status changes or publishing.",
    "",
    "## Guardrails",
    "",
    `- Auto create articles: ${payload.guardrails.autoCreateArticles}`,
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
    "## Lane Summaries",
    "",
    "| Lane | Items | Public | Ready candidates | Queue matches | Unsafe |",
    "| --- | --- | --- | --- | --- | --- |",
    ...payload.laneSummaries.map((lane) => `| ${lane.lane} | ${lane.items} | ${lane.publicMatches} | ${lane.readyCandidates} | ${lane.reviewQueueMatches} | ${lane.unsafeItems} |`),
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Review Pack Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Manual Review Checklists",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: ReviewPackItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Score | Ready | Lane | Public | Queue | Sources | Queries | Link | Warnings | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.priorityScore} | ${item.readyForHumanReview} | ${item.lane} | ${item.publicMatches} | ${item.reviewQueueMatched} | ${item.officialSourceTargets.length} | ${item.searchQueries.length} | ${Boolean(item.publicInternalLinkSuggestion)} | ${item.warningIssues.length} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: ReviewPackItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Lane: ${item.lane}`,
    `- Stop before: ${item.stopBefore}`,
    `- Manual mark-review command: \`${item.commandBoundary.markReviewAfterHumanApproval}\``,
    `- Publish dry-run command after review: \`${item.commandBoundary.publishDryRunAfterReview}\``,
    `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
    "",
    "Search queries:",
    "",
    ...item.searchQueries.slice(0, 8).map((query) => `- ${query}`),
    "",
    "Official source targets:",
    "",
    ...item.officialSourceTargets.map((source) => `- ${source}`),
    "",
    "Human review checklist:",
    "",
    ...item.humanReviewChecklist.map((entry) => `- ${entry}`),
    "",
    "Warnings:",
    "",
    ...(item.warningIssues.length ? item.warningIssues.map((warning) => `- ${warning}`) : ["- none"]),
    "",
  ];
}

main();
