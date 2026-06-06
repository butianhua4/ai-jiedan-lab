import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type WaveApprovalPacket = {
  files: string[];
  items: Array<{
    factCheckQueries?: string[];
    file: string;
    officialSourceTargets?: string[];
    readyForHumanReview: boolean;
    riskReviewChecklist?: string[];
    title: string;
  }>;
  summary: {
    items: number;
    readyForHumanReview: number;
    unsafeItems: number;
    wave: number;
  };
};

type ProjectStatus = {
  articles: {
    publicPublished: number;
    publishableNow: unknown[];
    statusCounts: Record<string, number>;
  };
};

type SimulationItem = {
  blockers: string[];
  commands: {
    markReviewDryRun: string;
    markReviewAfterHumanApproval: string;
    publishConfirmAfterReviewApproval: string;
    publishDryRunAfterReviewApproval: string;
  };
  currentStatus: string;
  file: string;
  humanReviewRequired: boolean;
  noindex: boolean;
  officialSourceTargets: number;
  projectedPublishableAfterHumanApproval: boolean;
  qualityIssues: string[];
  qualityScore: number;
  readyForHumanApproval: boolean;
  riskReviewChecklist: number;
  title: string;
};

function main() {
  const packet = readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json");
  const projectStatus = readJson<ProjectStatus>("content/automation/project-status.json");
  const items = packet.items.map(toSimulationItem);
  const unsafeItems = items.filter((item) => item.blockers.length > 0);
  const readyForHumanApproval = items.filter((item) => item.readyForHumanApproval).length;
  const projectedPublishableAfterHumanApproval = items.filter((item) => item.projectedPublishableAfterHumanApproval).length;

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only simulation. It does not run mark:review, publish:articles, or change any article status/noindex value.",
      stopBeforeHumanApproval: true,
    },
    summary: {
      currentlyPublishable: projectStatus.articles.publishableNow.length,
      items: items.length,
      projectedPublicPublishedAfterWave: projectStatus.articles.publicPublished + projectedPublishableAfterHumanApproval,
      projectedPublishableAfterHumanApproval,
      publicPublishedBeforeWave: projectStatus.articles.publicPublished,
      readyForHumanApproval,
      unsafeItems: unsafeItems.length,
      wave: packet.summary.wave,
    },
    publishingBoundary: {
      currentStatusCounts: projectStatus.articles.statusCounts,
      currentPublicPublished: projectStatus.articles.publicPublished,
      currentPublishableNow: projectStatus.articles.publishableNow.length,
      projectedPublicPublishedAfterWave: projectStatus.articles.publicPublished + projectedPublishableAfterHumanApproval,
    },
    executionPlan: {
      beforeApproval: "Read docs/wave-approval-packet.md and this simulation. Do not run confirm commands until a human approves each file.",
      afterHumanApprovalStep1: "Run the mark:review dry-run command for the approved file.",
      afterHumanApprovalStep2: "If dry-run output is clean, run the listed mark:review command with --confirm-human for that approved file only.",
      afterReviewStep3: "Run the publish dry-run command after the file is status=review.",
      afterReviewStep4: "Run publish:articles --confirm only after final human approval and a clean dry-run.",
    },
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "wave-publish-simulation.json");
  const mdTarget = path.join(process.cwd(), "docs", "wave-publish-simulation.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
}

function toSimulationItem(packetItem: WaveApprovalPacket["items"][number]): SimulationItem {
  const article = readArticle(packetItem.file);
  const quality = checkFile(article.file);
  const file = rel(article.file);
  const currentStatus = String(article.data.status || "");
  const noindex = article.data.noindex === true;
  const humanReviewRequired = article.data.humanReviewRequired === true;
  const blockers = [
    currentStatus === "draft" ? "" : `status is ${currentStatus || "missing"}, expected draft before mark:review`,
    noindex ? "" : "noindex must remain true before human approval",
    humanReviewRequired ? "" : "humanReviewRequired must remain true before human approval",
    packetItem.readyForHumanReview ? "" : "wave approval packet does not mark this item ready",
    quality.qualityScore >= 80 ? "" : `qualityScore ${quality.qualityScore} below 80`,
    quality.failedItems.length ? `quality issues: ${quality.failedItems.join("; ")}` : "",
    (packetItem.officialSourceTargets?.length || 0) > 0 ? "" : "missing official source targets",
    (packetItem.factCheckQueries?.length || 0) > 0 ? "" : "missing fact-check queries",
    (packetItem.riskReviewChecklist?.length || 0) > 0 ? "" : "missing risk review checklist",
  ].filter(Boolean);
  const readyForHumanApproval = blockers.length === 0;

  return {
    blockers,
    commands: {
      markReviewDryRun: `npm run mark:review -- --file=${file}`,
      markReviewAfterHumanApproval: `npm run mark:review -- --file=${file} --confirm-human`,
      publishDryRunAfterReviewApproval: `npm run publish:articles -- --file=${file}`,
      publishConfirmAfterReviewApproval: `npm run publish:articles -- --file=${file} --confirm`,
    },
    currentStatus,
    file,
    humanReviewRequired,
    noindex,
    officialSourceTargets: packetItem.officialSourceTargets?.length || 0,
    projectedPublishableAfterHumanApproval: readyForHumanApproval,
    qualityIssues: quality.failedItems,
    qualityScore: quality.qualityScore,
    readyForHumanApproval,
    riskReviewChecklist: packetItem.riskReviewChecklist?.length || 0,
    title: String(article.data.title || packetItem.title || ""),
  };
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  executionPlan: Record<string, string>;
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string; stopBeforeHumanApproval: boolean };
  items: SimulationItem[];
  publishingBoundary: {
    currentPublicPublished: number;
    currentPublishableNow: number;
    currentStatusCounts: Record<string, number>;
    projectedPublicPublishedAfterWave: number;
  };
  summary: {
    currentlyPublishable: number;
    items: number;
    projectedPublicPublishedAfterWave: number;
    projectedPublishableAfterHumanApproval: number;
    publicPublishedBeforeWave: number;
    readyForHumanApproval: number;
    unsafeItems: number;
    wave: number;
  };
}) {
  const lines = [
    "# Wave Publish Simulation",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This simulation is read-only. It lists the post-approval path but does not change article status, noindex, or publishing state.",
    "",
    "## Guardrails",
    "",
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before human approval: ${payload.guardrails.stopBeforeHumanApproval}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    `- Wave: ${payload.summary.wave}`,
    `- Items: ${payload.summary.items}`,
    `- Ready for human approval: ${payload.summary.readyForHumanApproval}`,
    `- Unsafe items: ${payload.summary.unsafeItems}`,
    `- Currently publishable: ${payload.summary.currentlyPublishable}`,
    `- Public published before wave: ${payload.summary.publicPublishedBeforeWave}`,
    `- Projected publishable after human approval: ${payload.summary.projectedPublishableAfterHumanApproval}`,
    `- Projected public published after wave: ${payload.summary.projectedPublicPublishedAfterWave}`,
    "",
    "## Publishing Boundary",
    "",
    `- Current public published: ${payload.publishingBoundary.currentPublicPublished}`,
    `- Current publishable now: ${payload.publishingBoundary.currentPublishableNow}`,
    `- Projected public published after wave: ${payload.publishingBoundary.projectedPublicPublishedAfterWave}`,
    `- Current status counts: ${JSON.stringify(payload.publishingBoundary.currentStatusCounts)}`,
    "",
    "## Execution Plan",
    "",
    ...Object.entries(payload.executionPlan).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Decision Table",
    "",
    "| Ready | Status | Noindex | Human review flag | Score | Sources | Risk checks | Blockers | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.items.map((item) => (
      `| ${item.readyForHumanApproval} | ${item.currentStatus} | ${item.noindex} | ${item.humanReviewRequired} | ${item.qualityScore} | ${item.officialSourceTargets} | ${item.riskReviewChecklist} | ${item.blockers.length ? item.blockers.join("<br>") : "none"} | ${item.title} | ${item.file} |`
    )),
    "",
  ];

  for (const [index, item] of payload.items.entries()) {
    lines.push(
      `## ${index + 1}. ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Ready for human approval: ${item.readyForHumanApproval}`,
      `- Current status: ${item.currentStatus}`,
      `- Noindex: ${item.noindex}`,
      `- Human review required: ${item.humanReviewRequired}`,
      `- Quality score: ${item.qualityScore}`,
      `- Official source targets: ${item.officialSourceTargets}`,
      `- Risk review checks: ${item.riskReviewChecklist}`,
      "",
      "Blockers:",
      "",
      ...(item.blockers.length ? item.blockers.map((blocker) => `- ${blocker}`) : ["- none"]),
      "",
      "Commands to run only after explicit human approval:",
      "",
      "```bash",
      item.commands.markReviewDryRun,
      item.commands.markReviewAfterHumanApproval,
      item.commands.publishDryRunAfterReviewApproval,
      item.commands.publishConfirmAfterReviewApproval,
      "```",
      "",
    );
  }

  return lines.join("\n");
}

main();
