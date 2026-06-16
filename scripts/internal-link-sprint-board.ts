import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CandidateScope = "broad-first-coverage" | "expansion" | "recommended" | "wave-1";

type LinkSuggestion = {
  file: string;
  reason: string;
  score: number;
  slug: string;
  title: string;
  url: string;
};

type InternalLinkCandidate = {
  currentInternalLinks: number;
  file: string;
  linksToPublicArticles: number;
  missingPublicLinkSuggestion: boolean;
  scopes: CandidateScope[];
  status: string;
  suggestions: LinkSuggestion[];
  title: string;
};

type InternalLinkAudit = {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  candidateItems: InternalLinkCandidate[];
  summary: {
    broadFirstCoverageItems: number;
    broadFirstCoverageItemsMissingPublicLinkSuggestion: number;
    candidateItems: number;
    candidateItemsMissingPublicLinkSuggestion: number;
    candidateItemsWithPublicSuggestions: number;
    expansionItems: number;
    publicArticles: number;
    recommendedItems: number;
    waveItems: number;
    waveItemsMissingPublicLinkSuggestion: number;
  };
};

type SprintItem = {
  anchorPrompt: string;
  currentInternalLinks: number;
  file: string;
  linkActions: string[];
  linksToPublicArticles: number;
  priorityScore: number;
  publishConfirm: "not-included";
  readyForInternalLinkSprint: boolean;
  scopes: CandidateScope[];
  sprintWave: number;
  status: string;
  suggestedLinks: LinkSuggestion[];
  title: string;
  unsafeReasons: string[];
};

type SprintWave = {
  actionItems: number;
  files: string[];
  items: number;
  readyItems: number;
  scopes: CandidateScope[];
  suggestedPublicLinks: number;
  unsafeItems: number;
  wave: number;
};

const ITEMS_PER_WAVE = 4;

function main() {
  const audit = readJson<InternalLinkAudit>("content/automation/internal-link-opportunity-audit.json");
  const items = audit.candidateItems
    .map(toSprintItem)
    .sort((a, b) => b.priorityScore - a.priorityScore || a.file.localeCompare(b.file))
    .map((item, index) => ({ ...item, sprintWave: Math.floor(index / ITEMS_PER_WAVE) + 1 }));
  const waves = buildWaves(items);
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note:
        "Read-only internal link sprint board. It groups manual public-link insertion tasks for review candidates without editing article bodies.",
      stopBefore: "Stop before article body edits, mark:review, publish dry-run, or publish confirm until a human approves exact anchors and target URLs.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      internalLinkAuditGeneratedAt: audit.generatedAt,
      internalLinkAuditSummary: audit.summary,
      trafficNote: "Internal-link suggestions are crawl-path and editorial signals only; no traffic, ranking, impression, click, conversion, or revenue claim is made.",
    },
    summary: {
      actionItems: items.reduce((sum, item) => sum + item.linkActions.length, 0),
      broadFirstCoverageItems: audit.summary.broadFirstCoverageItems,
      candidateItems: audit.summary.candidateItems,
      candidateItemsMissingPublicLinkSuggestion: audit.summary.candidateItemsMissingPublicLinkSuggestion,
      candidateItemsWithPublicSuggestions: audit.summary.candidateItemsWithPublicSuggestions,
      candidatesWithoutCurrentPublicLinks: items.filter((item) => item.linksToPublicArticles === 0).length,
      expansionItems: audit.summary.expansionItems,
      items: items.length,
      itemsPerWave: ITEMS_PER_WAVE,
      publicArticles: audit.summary.publicArticles,
      publishConfirmCommandsIncluded: 0,
      readyForInternalLinkSprint: items.filter((item) => item.readyForInternalLinkSprint).length,
      recommendedItems: audit.summary.recommendedItems,
      suggestedPublicLinks: items.reduce((sum, item) => sum + item.suggestedLinks.length, 0),
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
      waveItems: audit.summary.waveItems,
      waves: waves.length,
    },
    unsafeItems,
    waves,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "internal-link-sprint-board.json");
  const mdTarget = path.join(process.cwd(), "docs", "internal-link-sprint-board.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toSprintItem(candidate: InternalLinkCandidate): SprintItem {
  const suggestedLinks = candidate.suggestions.slice(0, 3);
  const unsafeReasons = unsafeReasonsFor(candidate, suggestedLinks);
  const linkActions = linkActionsFor(candidate, suggestedLinks);

  return {
    anchorPrompt: anchorPromptFor(candidate, suggestedLinks[0]),
    currentInternalLinks: candidate.currentInternalLinks,
    file: candidate.file,
    linkActions,
    linksToPublicArticles: candidate.linksToPublicArticles,
    priorityScore: priorityScoreFor(candidate),
    publishConfirm: "not-included",
    readyForInternalLinkSprint: unsafeReasons.length === 0,
    scopes: candidate.scopes,
    sprintWave: 0,
    status: candidate.status,
    suggestedLinks,
    title: candidate.title,
    unsafeReasons,
  };
}

function unsafeReasonsFor(candidate: InternalLinkCandidate, suggestedLinks: LinkSuggestion[]) {
  const reasons: string[] = [];
  if (!["draft", "published"].includes(candidate.status)) reasons.push(`candidate status is ${candidate.status}, expected draft or published`);
  if (candidate.missingPublicLinkSuggestion) reasons.push("candidate is missing public link suggestions");
  if (suggestedLinks.length < 1) reasons.push("candidate has no suggested public link");
  if (candidate.scopes.length < 1) reasons.push("candidate has no review scope");
  return reasons;
}

function linkActionsFor(candidate: InternalLinkCandidate, suggestedLinks: LinkSuggestion[]) {
  return [
    "Keep this as a manual article-body edit; do not auto-insert links.",
    "Add at most one contextual public link during the first human review pass unless the reviewer approves more.",
    "Use natural anchor text that matches the surrounding paragraph instead of exact-match stuffing.",
    "Prefer links that help the reader move from a draft tutorial to an already public beginner page.",
    "Do not change status, noindex, canonical, slug, review state, or publish state while adding the link.",
    "After the edit, rerun content integrity, internal link audit, and automation gate before any approval action.",
    `Primary suggested target: ${suggestedLinks[0]?.url || "none"}.`,
    `Candidate currently links to ${candidate.linksToPublicArticles} public article(s).`,
  ];
}

function priorityScoreFor(candidate: InternalLinkCandidate) {
  return (
    (candidate.scopes.includes("wave-1") ? 80 : 0) +
    (candidate.scopes.includes("recommended") ? 60 : 0) +
    (candidate.scopes.includes("broad-first-coverage") ? 45 : 0) +
    (candidate.scopes.includes("expansion") ? 25 : 0) +
    (candidate.linksToPublicArticles === 0 ? 40 : 0) +
    Math.min(candidate.suggestions.length, 5) * 8 +
    Math.min(candidate.currentInternalLinks, 8)
  );
}

function anchorPromptFor(candidate: InternalLinkCandidate, suggestion?: LinkSuggestion) {
  if (!suggestion) return "Choose a contextual anchor after human review; no automatic anchor is generated.";
  return `When a paragraph mentions the related workflow, add one natural link to ${suggestion.url} using reader-first anchor text, not keyword stuffing.`;
}

function buildWaves(items: SprintItem[]) {
  const waves: SprintWave[] = [];
  for (let index = 0; index < items.length; index += ITEMS_PER_WAVE) {
    const waveItems = items.slice(index, index + ITEMS_PER_WAVE);
    waves.push({
      actionItems: waveItems.reduce((sum, item) => sum + item.linkActions.length, 0),
      files: waveItems.map((item) => item.file),
      items: waveItems.length,
      readyItems: waveItems.filter((item) => item.readyForInternalLinkSprint).length,
      scopes: dedupe(waveItems.flatMap((item) => item.scopes)),
      suggestedPublicLinks: waveItems.reduce((sum, item) => sum + item.suggestedLinks.length, 0),
      unsafeItems: waveItems.filter((item) => item.unsafeReasons.length > 0).length,
      wave: waves.length + 1,
    });
  }
  return waves;
}

function dedupe<T>(items: T[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: SprintItem[];
  summary: Record<string, boolean | number>;
  unsafeItems: SprintItem[];
  waves: SprintWave[];
}) {
  const lines = [
    "# Internal Link Sprint Board",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns public-link suggestions into manual internal-link review waves without editing article bodies.",
    "",
    "## Guardrails",
    "",
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
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.file}: ${item.unsafeReasons.join("; ")}`) : ["- none"]),
    "",
    "## Waves",
    "",
    "| Wave | Ready | Actions | Suggested links | Scopes | Files |",
    "| ---: | ---: | ---: | ---: | --- | --- |",
    ...payload.waves.map(
      (wave) => `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.actionItems} | ${wave.suggestedPublicLinks} | ${wave.scopes.join(", ")} | ${wave.files.join("<br>")} |`,
    ),
    "",
    "## Sprint Items",
    "",
    "| Wave | Ready | Score | Public links | Suggestions | Scopes | Top target | Title | File |",
    "| ---: | --- | ---: | ---: | ---: | --- | --- | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.sprintWave} | ${item.readyForInternalLinkSprint} | ${item.priorityScore} | ${item.linksToPublicArticles} | ${item.suggestedLinks.length} | ${item.scopes.join(", ")} | ${item.suggestedLinks[0]?.url || "none"} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Item Actions",
    "",
  ];

  for (const item of payload.items) {
    lines.push(`### ${item.title}`);
    lines.push("");
    lines.push(`- File: ${item.file}`);
    lines.push(`- Wave: ${item.sprintWave}`);
    lines.push(`- Ready for internal link sprint: ${item.readyForInternalLinkSprint}`);
    lines.push(`- Publish confirm: ${item.publishConfirm}`);
    lines.push(`- Anchor prompt: ${item.anchorPrompt}`);
    lines.push("");
    lines.push("Link actions:");
    lines.push(...item.linkActions.map((action) => `- ${action}`));
    lines.push("");
    lines.push("Suggested public links:");
    lines.push(...item.suggestedLinks.map((link) => `- ${link.url} - ${link.title} (${link.reason})`));
    lines.push("");
  }

  while (lines[lines.length - 1] === "") lines.pop();
  return `${lines.join("\n")}\n`;
}

main();
