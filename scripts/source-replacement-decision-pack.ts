import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type ReplacementCandidate = {
  appliesTo?: string[];
  reason: string;
  sourceType: "official-doc" | "market-signal" | "prompt-library";
  title: string;
  url: string;
};

type SourceReference = {
  file: string;
  label?: string;
  scope?: string;
  title?: string;
  url?: string;
};

type RemediationItem = {
  affectedFiles: string[];
  affectedScopes: string[];
  affectedTitles: string[];
  error?: string;
  finalUrl?: string;
  humanChecklist: string[];
  kind: "failed-url" | "redirected-url";
  manualActions: string[];
  manualFixReady: boolean;
  referenceCount: number;
  references: SourceReference[];
  replacementCandidates: ReplacementCandidate[];
  replacementPlan: string[];
  status?: number;
  stopBefore: string;
  unsafeReasons: string[];
  url: string;
};

type RemediationPack = {
  generatedAt: string;
  guardrails: {
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    note: string;
    stopBefore: string;
    trafficClaim: string;
  };
  items: RemediationItem[];
  summary: {
    failedUrlItems: number;
    humanGatedItems: number;
    items: number;
    redirectedUrlItems: number;
    replacementCandidateOptions: number;
    unsafeItems: number;
  };
};

type DecisionItem = {
  alternatives: ReplacementCandidate[];
  decisionOptions: string[];
  file: string;
  finalUrl?: string;
  kind: RemediationItem["kind"];
  manualChecklist: string[];
  originalUrl: string;
  recommendedCandidate: ReplacementCandidate | null;
  referenceLabels: string[];
  scopes: string[];
  stopBefore: string;
  title: string;
  unsafeReasons: string[];
};

function main() {
  const remediation = readJson<RemediationPack>("content/automation/source-target-remediation-pack.json");
  const items = remediation.items.flatMap(toDecisionItems).sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "failed-url" ? -1 : 1;
    return a.file.localeCompare(b.file) || a.originalUrl.localeCompare(b.originalUrl);
  });
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);
  const failedItems = items.filter((item) => item.kind === "failed-url");
  const redirectedItems = items.filter((item) => item.kind === "redirected-url");

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only source replacement decision pack. It turns URL remediation into per-file human decisions without editing article files.",
      stopBefore: "Stop before source replacement, mark:review, or publish until a human reviewer approves the exact file-level decision.",
      trafficClaim: "No measured traffic, rankings, clicks, impressions, or revenue are claimed.",
    },
    sourceEvidence: {
      remediationGeneratedAt: remediation.generatedAt,
      remediationGuardrails: remediation.guardrails,
      remediationSummary: remediation.summary,
    },
    summary: {
      affectedFiles: new Set(items.map((item) => item.file)).size,
      failedDecisionItems: failedItems.length,
      humanGatedItems: items.filter((item) => item.stopBefore.toLowerCase().includes("human")).length,
      items: items.length,
      itemsWithDecisionOptions: items.filter((item) => item.decisionOptions.length >= 3).length,
      itemsWithManualChecklist: items.filter((item) => item.manualChecklist.length >= 5).length,
      itemsWithRecommendedCandidate: items.filter((item) => item.recommendedCandidate).length,
      officialRecommendedCandidates: items.filter((item) => item.recommendedCandidate?.sourceType === "official-doc").length,
      redirectedDecisionItems: redirectedItems.length,
      replacementCandidateOptions: items.reduce((sum, item) => sum + item.alternatives.length + (item.recommendedCandidate ? 1 : 0), 0),
      sourceRemediationItems: remediation.summary.items,
      sourceRemediationUnsafeItems: remediation.summary.unsafeItems,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    topItems: items.slice(0, 12),
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "source-replacement-decision-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "source-replacement-decision-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toDecisionItems(item: RemediationItem): DecisionItem[] {
  return item.affectedFiles.map((file) => {
    const references = item.references.filter((reference) => reference.file === file);
    const candidates = item.replacementCandidates.filter((candidate) => !candidate.appliesTo?.length || candidate.appliesTo.includes(file));
    const recommendedCandidate = selectRecommendedCandidate(item.kind, candidates);
    const alternatives = candidates.filter((candidate) => candidate.url !== recommendedCandidate?.url);
    const title = references.find((reference) => reference.title)?.title || item.affectedTitles[0] || file;
    const scopes = dedupe(references.map((reference) => reference.scope || "").filter(Boolean));
    const unsafeReasons = [
      ...item.unsafeReasons,
      ...(!file ? ["Missing affected file."] : []),
      ...(item.kind === "failed-url" && !recommendedCandidate ? ["Failed URL needs a recommended replacement candidate."] : []),
      ...(item.kind === "redirected-url" && !item.finalUrl ? ["Redirected URL item is missing finalUrl."] : []),
    ];

    return {
      alternatives,
      decisionOptions:
        item.kind === "failed-url"
          ? [
              "Replace the failed URL with the recommended official source if it covers the same claim.",
              "Use one market-signal alternative only for category-demand evidence, not for technical or policy authority.",
              "Remove or rewrite the dependent claim if no source candidate covers it.",
              "Keep the article draft/noindex/humanReviewRequired until approval.",
            ]
          : [
              "Approve the redirected final URL as canonical if it is content-equivalent.",
              "Replace the original URL with the final URL during human review if the redirect is stable.",
              "Find a more specific official source if the redirect lands on a generic page.",
              "Keep the article draft/noindex/humanReviewRequired until approval.",
            ],
      file,
      finalUrl: item.finalUrl,
      kind: item.kind,
      manualChecklist: [
        `Original URL: ${item.url}`,
        ...(item.finalUrl ? [`Final URL: ${item.finalUrl}`] : []),
        `Scopes: ${scopes.join(", ") || "unknown"}`,
        "Confirm the replacement source covers the exact claim family.",
        "Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.",
        "Use prompt-library sources only as market/category evidence.",
        "Do not run mark:review or publish commands from this decision pack.",
      ],
      originalUrl: item.url,
      recommendedCandidate,
      referenceLabels: dedupe(references.map((reference) => reference.label || reference.url || item.url)),
      scopes,
      stopBefore: "Stop before human approval; this pack is a file-level decision aid only.",
      title,
      unsafeReasons,
    };
  });
}

function selectRecommendedCandidate(kind: RemediationItem["kind"], candidates: ReplacementCandidate[]) {
  if (kind === "redirected-url") return null;
  return candidates.find((candidate) => candidate.sourceType === "official-doc") || candidates[0] || null;
}

function dedupe(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: DecisionItem[];
  sourceEvidence: { remediationSummary: RemediationPack["summary"] };
  summary: Record<string, number>;
  topItems: DecisionItem[];
  unsafeItems: DecisionItem[];
}) {
  const lines = [
    "# Source Replacement Decision Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns source URL remediation into per-file human replacement decisions.",
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
    "## Source Evidence",
    "",
    `- Source remediation items: ${payload.sourceEvidence.remediationSummary.items}`,
    `- Failed URL items: ${payload.sourceEvidence.remediationSummary.failedUrlItems}`,
    `- Redirected URL items: ${payload.sourceEvidence.remediationSummary.redirectedUrlItems}`,
    `- Source remediation unsafe items: ${payload.sourceEvidence.remediationSummary.unsafeItems}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Top Decisions",
    "",
    ...itemTable(payload.topItems),
    "",
    "## Per-File Decisions",
    "",
    ...payload.items.slice(0, 16).flatMap(decisionSection),
    "",
  ];

  return lines.join("\n");
}

function itemTable(items: DecisionItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Kind | Candidate | Alternatives | Scopes | Title | File | URL |",
    "| --- | --- | ---: | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.kind} | ${item.recommendedCandidate ? `${item.recommendedCandidate.title} (${item.recommendedCandidate.sourceType})` : "review redirect"} | ${item.alternatives.length} | ${item.scopes.join(", ") || "unknown"} | ${item.title} | ${item.file} | ${item.originalUrl} |`,
    ),
  ];
}

function decisionSection(item: DecisionItem) {
  return [
    `### ${item.file}`,
    "",
    `- Kind: ${item.kind}`,
    `- Title: ${item.title}`,
    `- Original URL: ${item.originalUrl}`,
    ...(item.finalUrl ? [`- Final URL: ${item.finalUrl}`] : []),
    `- Recommended candidate: ${item.recommendedCandidate ? `${item.recommendedCandidate.title} - ${item.recommendedCandidate.url}` : "review redirected final URL"}`,
    `- Stop before: ${item.stopBefore}`,
    "",
    "Decision options:",
    "",
    ...item.decisionOptions.map((option) => `- ${option}`),
    "",
    "Manual checklist:",
    "",
    ...item.manualChecklist.map((check) => `- ${check}`),
    "",
  ];
}

main();
