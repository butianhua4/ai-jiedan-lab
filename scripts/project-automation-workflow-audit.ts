import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type Check = {
  detail: string;
  name: string;
  ok: boolean;
};

const automationWorkflowPath = ".github/workflows/review-automation.yml";
const contentCheckWorkflowPath = ".github/workflows/content-check.yml";

function main() {
  const automationWorkflow = readText(automationWorkflowPath);
  const contentCheckWorkflow = readText(contentCheckWorkflowPath);
  const allWorkflowText = [automationWorkflow, contentCheckWorkflow].join("\n---\n");
  const scheduleCount = countMatches(automationWorkflow, /cron:/g);
  const forbiddenCommands = forbiddenCommandMatches(allWorkflowText);
  const checks: Check[] = [
    {
      name: "project automation workflow exists",
      ok: automationWorkflow.length > 0,
      detail: automationWorkflowPath,
    },
    {
      name: "project automation runs on main push",
      ok: /push:\s*\n\s*branches:\s*\n\s*-\s*main/m.test(automationWorkflow),
      detail: "push branches include main",
    },
    {
      name: "project automation supports manual dispatch",
      ok: /\bworkflow_dispatch:/m.test(automationWorkflow),
      detail: "workflow_dispatch is present",
    },
    {
      name: "project automation has frequent scheduled runs",
      ok: scheduleCount >= 4,
      detail: `scheduleCount=${scheduleCount}`,
    },
    {
      name: "project automation runs the full read-only automation chain",
      ok: automationWorkflow.includes("npm run automation:all"),
      detail: "npm run automation:all is present",
    },
    {
      name: "project automation refreshes live search and digest surfaces",
      ok:
        automationWorkflow.includes("npm run live:check") &&
        automationWorkflow.includes("npm run automation:gate") &&
        automationWorkflow.includes("npm run automation:digest"),
      detail: "live:check, automation:gate, and automation:digest are present",
    },
    {
      name: "project automation exposes reports as job summary and artifact",
      ok: automationWorkflow.includes("GITHUB_STEP_SUMMARY") && automationWorkflow.includes("actions/upload-artifact"),
      detail: "job summary and upload-artifact are present",
    },
    {
      name: "scheduled report commits are limited to schedule or manual dispatch",
      ok: automationWorkflow.includes("if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'"),
      detail: "report commit step is event-gated",
    },
    {
      name: "workflow does not run review or publish commands",
      ok: forbiddenCommands.length === 0,
      detail: forbiddenCommands.length ? forbiddenCommands.join("; ") : "no mark:review or publish:articles commands found in workflows",
    },
    {
      name: "content check still builds the public site",
      ok: contentCheckWorkflow.includes("npm run content:check") && contentCheckWorkflow.includes("npm run build"),
      detail: "content:check and build are present",
    },
  ];
  const failed = checks.filter((check) => !check.ok);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only workflow audit. It verifies that scheduled project automation runs reports and gates, but does not review or publish articles.",
      stopBefore: "Stop before mark:review, publish dry-run, or publish confirm. Human approval is required for every status or publishing change.",
      trafficClaim: "not-included",
    },
    summary: {
      automationWorkflowPresent: automationWorkflow.length > 0,
      checks: checks.length,
      contentCheckWorkflowPresent: contentCheckWorkflow.length > 0,
      failed: failed.length,
      forbiddenWorkflowCommands: forbiddenCommands.length,
      manualDispatchEnabled: /\bworkflow_dispatch:/m.test(automationWorkflow),
      passed: checks.length - failed.length,
      pushMainEnabled: /push:\s*\n\s*branches:\s*\n\s*-\s*main/m.test(automationWorkflow),
      reportArtifactEnabled: automationWorkflow.includes("actions/upload-artifact"),
      scheduledReportCommitGated: automationWorkflow.includes("if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'"),
      scheduleCount,
      trafficDataAvailable: false,
    },
    failed,
    checks,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "project-automation-workflow-audit.json");
  const mdTarget = path.join(process.cwd(), "docs", "project-automation-workflow-audit.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: failed.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (failed.length) process.exitCode = 1;
}

function readText(relativePath: string) {
  const target = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(target)) return "";
  return fs.readFileSync(target, "utf8").replace(/^\uFEFF/, "");
}

function countMatches(value: string, pattern: RegExp) {
  return value.match(pattern)?.length || 0;
}

function forbiddenCommandMatches(workflowText: string) {
  return workflowText
    .split(/\r?\n/)
    .map((line, index) => ({ index: index + 1, line: line.trim() }))
    .filter(({ line }) => /\bmark:review\b|\bpublish:articles\b/.test(line))
    .map(({ index, line }) => `line ${index}: ${line}`);
}

function toMarkdown(payload: { checks: Check[]; failed: Check[]; generatedAt: string; guardrails: Record<string, boolean | string>; summary: Record<string, boolean | number> }) {
  const lines = [
    "# Project Automation Workflow Audit",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It verifies that scheduled project automation runs reports and gates, but does not review or publish articles.",
    "",
    "## Guardrails",
    "",
    ...Object.entries(payload.guardrails).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Failed Checks",
    "",
    ...(payload.failed.length ? payload.failed.map((check) => `- ${check.name}: ${check.detail}`) : ["- none"]),
    "",
    "## Checks",
    "",
    "| Check | Result | Detail |",
    "| --- | --- | --- |",
    ...payload.checks.map((check) => `| ${check.name} | ${check.ok ? "PASS" : "FAIL"} | ${check.detail} |`),
    "",
  ];
  return lines.join("\n");
}

main();
