import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type SourceReference = {
  file: string;
  label?: string;
  scope?: string;
  title?: string;
  url?: string;
};

type SourceCheck = {
  error?: string;
  finalUrl?: string;
  ok?: boolean;
  references: SourceReference[];
  status?: number;
  url: string;
};

type SourceHealth = {
  generatedAt: string;
  guardrails: {
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    note?: string;
    timeoutMs?: number;
  };
  summary: {
    broadFirstCoverageFiles: number;
    checkedUrls: number;
    currentReviewFiles: number;
    failedUrls: number;
    filesCovered: number;
    filesWithReachableSource: number;
    filesWithoutReachableSource: number;
    missingUrlTargets: number;
    nextSourcePackFiles: number;
    okUrls: number;
    publicGapDecisionFiles: number;
    redirectedUrls: number;
    sourceReferences: number;
    uniqueUrls: number;
  };
  failedChecks: SourceCheck[];
  redirectedChecks: SourceCheck[];
};

type RemediationKind = "failed-url" | "redirected-url";

type RemediationItem = {
  affectedFiles: string[];
  affectedScopes: string[];
  affectedTitles: string[];
  error?: string;
  finalUrl?: string;
  humanChecklist: string[];
  kind: RemediationKind;
  manualActions: string[];
  manualFixReady: boolean;
  referenceCount: number;
  references: SourceReference[];
  replacementPlan: string[];
  status?: number;
  stopBefore: string;
  unsafeReasons: string[];
  url: string;
};

type Payload = {
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
  sourceEvidence: {
    sourceHealthGeneratedAt: string;
    sourceHealthGuardrails: SourceHealth["guardrails"];
    sourceHealthSummary: SourceHealth["summary"];
  };
  summary: {
    failedUrlItems: number;
    failedUrls: number;
    humanGatedItems: number;
    items: number;
    itemsWithAffectedFiles: number;
    itemsWithHumanChecklist: number;
    itemsWithManualActions: number;
    itemsWithReferences: number;
    itemsWithReplacementPlan: number;
    manualFixReadyItems: number;
    redirectedUrlItems: number;
    redirectedUrls: number;
    sourceHealthCheckedUrls: number;
    sourceHealthFailedUrls: number;
    sourceHealthRedirectedUrls: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
  unsafeItems: RemediationItem[];
};

function main() {
  const sourceHealth = readJson<SourceHealth>("content/automation/source-target-health-audit.json");
  const failedItems = sourceHealth.failedChecks.map((check) => toRemediationItem("failed-url", check));
  const redirectedItems = sourceHealth.redirectedChecks.map((check) => toRemediationItem("redirected-url", check));
  const items = [...failedItems, ...redirectedItems].sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "failed-url" ? -1 : 1;
    return b.referenceCount - a.referenceCount || a.url.localeCompare(b.url);
  });
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);

  const payload: Payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only source target remediation pack. It converts failed and redirected source URL checks into human-review tasks without editing articles.",
      stopBefore: "Use this pack during human review only. Replace or approve source targets manually; mark:review and publish actions require explicit human approval.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      sourceHealthGeneratedAt: sourceHealth.generatedAt,
      sourceHealthGuardrails: sourceHealth.guardrails,
      sourceHealthSummary: sourceHealth.summary,
    },
    summary: {
      failedUrlItems: failedItems.length,
      failedUrls: sourceHealth.summary.failedUrls,
      humanGatedItems: items.filter((item) => item.stopBefore.toLowerCase().includes("human")).length,
      items: items.length,
      itemsWithAffectedFiles: items.filter((item) => item.affectedFiles.length > 0).length,
      itemsWithHumanChecklist: items.filter((item) => item.humanChecklist.length >= 5).length,
      itemsWithManualActions: items.filter((item) => item.manualActions.length >= 3).length,
      itemsWithReferences: items.filter((item) => item.referenceCount > 0).length,
      itemsWithReplacementPlan: items.filter((item) => item.replacementPlan.length > 0).length,
      manualFixReadyItems: items.filter((item) => item.manualFixReady).length,
      redirectedUrlItems: redirectedItems.length,
      redirectedUrls: sourceHealth.summary.redirectedUrls,
      sourceHealthCheckedUrls: sourceHealth.summary.checkedUrls,
      sourceHealthFailedUrls: sourceHealth.summary.failedUrls,
      sourceHealthRedirectedUrls: sourceHealth.summary.redirectedUrls,
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "source-target-remediation-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "source-target-remediation-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toRemediationItem(kind: RemediationKind, check: SourceCheck): RemediationItem {
  const references = dedupeReferences(check.references || []);
  const affectedFiles = dedupe(references.map((reference) => reference.file));
  const affectedScopes = dedupe(references.map((reference) => reference.scope || ""));
  const affectedTitles = dedupe(references.map((reference) => reference.title || ""));
  const stopBefore =
    kind === "failed-url"
      ? "Stop before human approval if this failed URL is the only evidence for any fast-changing claim."
      : "Stop before human approval until a reviewer confirms the final redirected URL is canonical and content-equivalent.";
  const manualActions =
    kind === "failed-url"
      ? [
          "Open the failed URL manually from a normal browser session and confirm whether the failure is transient or permanent.",
          "If the URL is still unavailable, replace it with a reachable official or source-backed URL during human review.",
          "Confirm every affected draft still has at least one reachable source for the claim family before mark:review.",
          "Do not approve a fast-changing AI, SDK, deployment, pricing, or model claim if it depends only on this failed URL.",
        ]
      : [
          "Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.",
          "If the final URL is the canonical destination, update the source target during human review.",
          "If the redirect lands on a generic, tracked, or unrelated page, replace it with a more specific official source.",
          "Confirm the affected draft still cites source material that matches its implementation-sensitive claims.",
        ];
  const replacementPlan =
    kind === "failed-url"
      ? [
          "Prefer another reachable official source already present for the same affected file when it covers the same claim.",
          "If no existing source covers the claim, manually find a current official source before approval.",
          "If no reliable source exists, rewrite or remove the dependent claim instead of substituting a weak source.",
        ]
      : [
          "Prefer the final URL when it is canonical, current, and content-equivalent.",
          "Keep the original URL only if the redirect is intentionally stable and the source target is still reviewer-friendly.",
          "Replace the source if the redirect weakens specificity or points to a general landing page.",
        ];
  const humanChecklist = dedupe([
    `Review URL: ${check.url}.`,
    check.finalUrl ? `Review final URL: ${check.finalUrl}.` : "",
    check.status ? `HTTP status observed by automation: ${check.status}.` : "",
    check.error ? `Automation error observed: ${check.error}.` : "",
    ...manualActions,
    ...replacementPlan,
    "Keep article status, noindex, and humanReviewRequired unchanged until explicit approval.",
    "Publishing remains separate and is not included in this remediation pack.",
  ]);
  const unsafeReasons = [
    references.length > 0 ? "" : "source check has no article references",
    affectedFiles.length > 0 ? "" : "source check has no affected files",
    manualActions.length >= 3 ? "" : "manual action list is too thin",
    replacementPlan.length > 0 ? "" : "replacement plan is missing",
    humanChecklist.length >= 5 ? "" : "human checklist is too thin",
    stopBefore.toLowerCase().includes("human") ? "" : "human-gated stop boundary is missing",
    kind === "redirected-url" && !check.finalUrl ? "redirected URL has no final URL" : "",
  ].filter(Boolean);

  return {
    affectedFiles,
    affectedScopes,
    affectedTitles,
    error: check.error,
    finalUrl: check.finalUrl,
    humanChecklist,
    kind,
    manualActions,
    manualFixReady: unsafeReasons.length === 0,
    referenceCount: references.length,
    references,
    replacementPlan,
    status: check.status,
    stopBefore,
    unsafeReasons,
    url: check.url,
  };
}

function toMarkdown(data: Payload) {
  const lines = [
    "# Source Target Remediation Pack",
    "",
    `Generated at: ${data.generatedAt}`,
    "",
    "This pack is read-only. It does not edit articles, mark review, publish, or claim traffic.",
    "",
    "## Summary",
    "",
    `- Items: ${data.summary.items}`,
    `- Failed URL items: ${data.summary.failedUrlItems}`,
    `- Redirected URL items: ${data.summary.redirectedUrlItems}`,
    `- Manual-fix-ready items: ${data.summary.manualFixReadyItems}`,
    `- Unsafe items: ${data.summary.unsafeItems}`,
    `- Source health checked URLs: ${data.summary.sourceHealthCheckedUrls}`,
    `- Source health failed URLs: ${data.summary.sourceHealthFailedUrls}`,
    `- Source health redirected URLs: ${data.summary.sourceHealthRedirectedUrls}`,
    "",
    "## Items",
    "",
    "| Ready | Kind | References | Files | URL | Final URL / Issue |",
    "| --- | --- | ---: | --- | --- | --- |",
    ...data.items.map(
      (item) =>
        `| ${item.manualFixReady} | ${item.kind} | ${item.referenceCount} | ${item.affectedFiles.join("<br>")} | ${item.url} | ${item.finalUrl || item.status || item.error || "review manually"} |`,
    ),
    "",
    "## Manual Actions",
    "",
    ...data.items.flatMap((item) => [
      `### ${item.kind}: ${item.url}`,
      "",
      `- Affected files: ${item.affectedFiles.join(", ") || "none"}`,
      `- Stop before: ${item.stopBefore}`,
      "",
      "Actions:",
      "",
      ...item.manualActions.map((action) => `- ${action}`),
      "",
      "Replacement plan:",
      "",
      ...item.replacementPlan.map((step) => `- ${step}`),
      "",
      "Human checklist:",
      "",
      ...item.humanChecklist.map((step) => `- ${step}`),
      "",
    ]),
  ];
  return `${lines.join("\n")}\n`;
}

function readJson<T>(relativePath: string): T {
  const target = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(target)) throw new Error(`Missing required report: ${relativePath}`);
  return JSON.parse(fs.readFileSync(target, "utf8").replace(/^\uFEFF/, "")) as T;
}

function dedupe(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function dedupeReferences(references: SourceReference[]) {
  const seen = new Set<string>();
  return references.filter((reference) => {
    const key = `${reference.file}|${reference.scope || ""}|${reference.url || ""}|${reference.label || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

main();
