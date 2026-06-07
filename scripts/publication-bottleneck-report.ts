import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type ProjectStatus = {
  articles: {
    publicPublished: number;
    publishableNow: unknown[];
    statusCounts: Record<string, number>;
  };
};

type ExecutiveBrief = {
  summary: {
    approvalBacklogItems: number;
    currentPublishableNow: number;
    immediateApprovalItems: number;
    immediateApprovalReadyItems: number;
    publicArticles: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
  topApprovalActions?: Array<{
    action: string;
    file?: string;
    humanGate: string;
    priority: number;
    reason: string;
    title: string;
  }>;
};

type ReviewPreflight = {
  summary: {
    checked: number;
    failed: number;
    mojibakeWarningItems: number;
    passed: number;
    warningItems: number;
  };
};

type HumanApprovalQueue = {
  immediateItems?: Array<{
    file: string;
    priorityScore: number;
    title: string;
    unsafeReasons?: string[];
  }>;
  summary: {
    backlogItems: number;
    immediateApprovalItems: number;
    immediateApprovalReadyItems: number;
    items: number;
    itemsReadyForHumanApproval: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type NextBatchRouteRemediation = {
  warningItems?: Array<{
    actionCount: number;
    file: string;
    priorityScore: number;
    routeWarnings: string[];
    title: string;
  }>;
  summary: {
    actionItems: number;
    batchItems: number;
    freshnessWarningItems: number;
    itemsReadyForRemediationReview: number;
    publishConfirmCommandsIncluded: number;
    queryWarningItems: number;
    routeWarnings: number;
    seoWarningItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    warningItems: number;
  };
};

type PublicRefreshSprint = {
  items?: Array<{
    actionCount: number;
    file: string;
    priorityScore: number;
    refreshReasons: string[];
    title: string;
  }>;
  summary: {
    actionItems: number;
    itemsReadyForPublicRefreshSprint: number;
    mojibakePublicItems: number;
    publicArticles: number;
    publishConfirmCommandsIncluded: number;
    seoWarningItems: number;
    shortDescriptionItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type ContentIntegrity = {
  summary: {
    blockingItems: number;
    filesScanned: number;
    mojibakeWarningItems: number;
    publicMojibakeWarningItems: number;
    warningItems: number;
  };
};

type TrafficEvidence = {
  summary: {
    canClaimTraffic: boolean;
    measuredTrafficSources: number;
    trafficDataAvailable: boolean;
  };
};

async function main() {
  const project = readJson<ProjectStatus>("content/automation/project-status.json");
  const executive = readJson<ExecutiveBrief>("content/automation/autopilot-executive-brief.json");
  const preflight = readJson<ReviewPreflight>("content/automation/review-preflight.json");
  const approvalQueue = readJson<HumanApprovalQueue>("content/automation/human-approval-execution-queue.json");
  const routeRemediation = readJson<NextBatchRouteRemediation>("content/automation/next-batch-route-remediation-pack.json");
  const publicRefresh = readJson<PublicRefreshSprint>("content/automation/public-refresh-sprint-board.json");
  const integrity = readJson<ContentIntegrity>("content/automation/content-integrity-audit.json");
  const traffic = readJson<TrafficEvidence>("content/automation/traffic-evidence-audit.json");

  const bottlenecks = [
    project.articles.publishableNow.length === 0 ? "No article is publishable without explicit human approval." : "",
    approvalQueue.summary.immediateApprovalReadyItems > 0
      ? `${approvalQueue.summary.immediateApprovalReadyItems} draft article(s) are ready for human approval before mark:review.`
      : "",
    routeRemediation.summary.warningItems > 0
      ? `${routeRemediation.summary.warningItems} next-batch route item(s) still need SEO/query/freshness remediation review.`
      : "",
    publicRefresh.summary.mojibakePublicItems > 0
      ? `${publicRefresh.summary.mojibakePublicItems} public article(s) need garbled-copy refresh before traffic work is credible.`
      : "",
    traffic.summary.trafficDataAvailable === false ? "Traffic data is unavailable, so traffic claims remain blocked." : "",
  ].filter(Boolean);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only publication bottleneck report. It explains why public article growth is gated and what humans should review next.",
      publishConfirmCommandsIncluded: 0,
      trafficClaim: "not-included",
    },
    summary: {
      approvalBacklogItems: executive.summary.approvalBacklogItems,
      contentIntegrityBlockingItems: integrity.summary.blockingItems,
      contentIntegrityWarningItems: integrity.summary.warningItems,
      currentPublishableNow: project.articles.publishableNow.length,
      immediateApprovalItems: executive.summary.immediateApprovalItems,
      immediateApprovalReadyItems: executive.summary.immediateApprovalReadyItems,
      nextBatchActionItems: routeRemediation.summary.actionItems,
      nextBatchWarningItems: routeRemediation.summary.warningItems,
      publicArticles: project.articles.publicPublished,
      publicMojibakeWarningItems: integrity.summary.publicMojibakeWarningItems,
      publicRefreshActionItems: publicRefresh.summary.actionItems,
      publishConfirmCommandsIncluded:
        executive.summary.publishConfirmCommandsIncluded +
        approvalQueue.summary.publishConfirmCommandsIncluded +
        routeRemediation.summary.publishConfirmCommandsIncluded +
        publicRefresh.summary.publishConfirmCommandsIncluded,
      reviewPreflightFailed: preflight.summary.failed,
      reviewPreflightMojibakeWarningItems: preflight.summary.mojibakeWarningItems,
      reviewPreflightPassed: preflight.summary.passed,
      reviewPreflightWarningItems: preflight.summary.warningItems,
      statusCounts: project.articles.statusCounts,
      trafficDataAvailable: traffic.summary.trafficDataAvailable,
      unsafeItems:
        executive.summary.unsafeItems +
        approvalQueue.summary.unsafeItems +
        routeRemediation.summary.unsafeItems +
        publicRefresh.summary.unsafeItems,
    },
    bottlenecks,
    nextHumanApproval: (executive.topApprovalActions || []).slice(0, 5),
    immediateApprovalQueue: (approvalQueue.immediateItems || []).slice(0, 5),
    nextBatchWarnings: (routeRemediation.warningItems || []).slice(0, 5),
    publicRefreshWarnings: (publicRefresh.items || []).filter((item) => item.refreshReasons.length > 0).slice(0, 5),
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "publication-bottleneck-report.json");
  const mdTarget = path.join(process.cwd(), "docs", "publication-bottleneck-report.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: payload.summary.unsafeItems === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (payload.summary.unsafeItems > 0) process.exitCode = 1;
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  bottlenecks: string[];
  generatedAt: string;
  guardrails: {
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    note: string;
    publishConfirmCommandsIncluded: number;
    trafficClaim: string;
  };
  immediateApprovalQueue: Array<{ file: string; priorityScore: number; title: string; unsafeReasons?: string[] }>;
  nextBatchWarnings: Array<{ actionCount: number; file: string; priorityScore: number; routeWarnings: string[]; title: string }>;
  nextHumanApproval: Array<{ file?: string; humanGate: string; priority: number; reason: string; title: string }>;
  publicRefreshWarnings: Array<{ actionCount: number; file: string; priorityScore: number; refreshReasons: string[]; title: string }>;
  summary: Record<string, unknown>;
}) {
  const lines = [
    "# Publication Bottleneck Report",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It explains why public article growth is gated and what to review next.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Publish confirm commands included: ${payload.guardrails.publishConfirmCommandsIncluded}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${formatValue(value)}`),
    "",
    "## Bottlenecks",
    "",
    ...(payload.bottlenecks.length ? payload.bottlenecks.map((item) => `- ${item}`) : ["- none"]),
    "",
    "## Next Human Approval",
    "",
    "| Priority | Gate | Reason | Title | File |",
    "| ---: | --- | --- | --- | --- |",
    ...payload.nextHumanApproval.map((item) => `| ${item.priority} | ${item.humanGate} | ${item.reason} | ${item.title} | ${item.file || "n/a"} |`),
    "",
    "## Immediate Approval Queue",
    "",
    "| Priority | Unsafe reasons | Title | File |",
    "| ---: | --- | --- | --- |",
    ...payload.immediateApprovalQueue.map(
      (item) => `| ${item.priorityScore} | ${item.unsafeReasons?.join("<br>") || "none"} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Next Batch Warnings",
    "",
    "| Priority | Actions | Warnings | Title | File |",
    "| ---: | ---: | --- | --- | --- |",
    ...payload.nextBatchWarnings.map(
      (item) => `| ${item.priorityScore} | ${item.actionCount} | ${item.routeWarnings.join("<br>") || "none"} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Public Refresh Warnings",
    "",
    "| Priority | Actions | Reasons | Title | File |",
    "| ---: | ---: | --- | --- | --- |",
    ...payload.publicRefreshWarnings.map(
      (item) => `| ${item.priorityScore} | ${item.actionCount} | ${item.refreshReasons.join("<br>") || "none"} | ${item.title} | ${item.file} |`,
    ),
    "",
  ];

  return lines.join("\n");
}

function formatValue(value: unknown) {
  if (value && typeof value === "object") return JSON.stringify(value);
  return String(value);
}

void main();
