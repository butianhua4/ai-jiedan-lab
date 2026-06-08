import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

type Task = {
  args: string[];
  env?: Record<string, string>;
  outputFile?: string;
  timeoutMs?: number;
  title: string;
};

const isWindows = process.platform === "win32";

const tasks: Task[] = [
  { title: "Check draft guardrail cleanup", args: ["run", "automation:sanitize-drafts", "--", "--dry-run"] },
  { title: "Generate review queue", args: ["run", "automation:review", "--", "--limit=25"] },
  { title: "Generate publish readiness pack", args: ["run", "automation:publish-pack", "--", "--limit=3"] },
  { title: "Run review candidate preflight", args: ["run", "automation:review-preflight"] },
  { title: "Audit project automation workflow", args: ["run", "automation:workflow-audit"] },
  { title: "Generate project status", args: ["run", "--silent", "project:status"], outputFile: "content/automation/project-status.json" },
  { title: "Run traffic evidence audit", args: ["run", "traffic:evidence", "--", "--url=https://ai-jiedan-lab.vercel.app", "--fetch-retries=5", "--fetch-timeout-ms=15000"] },
  { title: "Run traffic claim guard", args: ["run", "traffic:claim-guard"] },
  { title: "Generate public surface inventory", args: ["run", "automation:public-surface-inventory"] },
  { title: "Run content integrity audit", args: ["run", "content:integrity"] },
  { title: "Run internal link opportunity audit", args: ["run", "content:internal-links"] },
  { title: "Generate internal link sprint board", args: ["run", "automation:internal-link-sprint"] },
  { title: "Run SEO safety check", args: ["run", "--silent", "seo:check"], outputFile: "content/automation/seo-check.json" },
  { title: "Run search snippet readiness audit", args: ["run", "seo:snippets"] },
  { title: "Run structured data readiness audit", args: ["run", "seo:schema"] },
  { title: "Generate SEO warning remediation pack", args: ["run", "automation:seo-warning-remediation"] },
  { title: "Generate SEO opportunity map", args: ["run", "seo:opportunities"] },
  { title: "Generate content opportunity backlog", args: ["run", "content:opportunities"] },
  { title: "Generate AI deployment coverage", args: ["run", "content:deployment-coverage"] },
  { title: "Generate industry prompt coverage", args: ["run", "content:prompt-coverage"] },
  { title: "Generate search intent lane map", args: ["run", "content:search-intent-lanes"] },
  { title: "Generate review batch plan", args: ["run", "automation:review-plan"] },
  { title: "Generate review priority roadmap", args: ["run", "automation:review-roadmap"] },
  { title: "Generate next review source pack", args: ["run", "automation:next-review-source-pack"] },
  { title: "Generate public expansion queue", args: ["run", "automation:public-expansion"] },
  { title: "Generate wave approval packet", args: ["run", "automation:wave-approval-packet"] },
  { title: "Generate search intent approval packet", args: ["run", "automation:search-intent-approval"] },
  { title: "Generate search intent wave planner", args: ["run", "automation:search-intent-waves"] },
  { title: "Generate search query coverage", args: ["run", "automation:search-query-coverage"] },
  { title: "Run search query match audit", args: ["run", "automation:search-query-match"] },
  { title: "Generate search demand intake", args: ["run", "automation:search-demand-intake"] },
  { title: "Generate search demand review pack", args: ["run", "automation:search-demand-review-pack"] },
  { title: "Generate search demand publication bridge", args: ["run", "automation:search-demand-publication-bridge"] },
  { title: "Generate broad search demand map", args: ["run", "automation:broad-search-demand"] },
  { title: "Generate mass AI search action matrix", args: ["run", "automation:mass-ai-search-matrix"] },
  { title: "Generate AI deployment review pack", args: ["run", "automation:ai-deployment-review-pack"] },
  { title: "Generate AI deployment sprint board", args: ["run", "automation:ai-deployment-sprint"] },
  { title: "Generate memory RAG sprint board", args: ["run", "automation:memory-rag-sprint"] },
  { title: "Generate industry prompt review pack", args: ["run", "automation:industry-prompt-review-pack"] },
  { title: "Generate industry prompt opportunity board", args: ["run", "automation:industry-prompt-opportunity-board"] },
  { title: "Generate industry prompt module pack", args: ["run", "automation:industry-prompt-module-pack"] },
  { title: "Generate popular AI prompt playbook", args: ["run", "automation:popular-ai-prompt-playbook"] },
  { title: "Generate popular prompt approval bridge", args: ["run", "automation:popular-prompt-approval-bridge"] },
  { title: "Generate popular prompt sprint board", args: ["run", "automation:popular-prompt-sprint"] },
  { title: "Generate public coverage gap plan", args: ["run", "automation:public-gap-plan"] },
  { title: "Run public coverage gap preflight", args: ["run", "automation:public-gap-preflight"] },
  { title: "Generate public coverage gap decision pack", args: ["run", "automation:public-gap-decision-pack"] },
  {
    title: "Run source target health audit",
    args: ["run", "content:source-health"],
    env: { SOURCE_TARGET_HEALTH_CONCURRENCY: "10", SOURCE_TARGET_HEALTH_TIMEOUT_MS: "6000" },
    timeoutMs: 180000,
  },
  { title: "Generate source target remediation pack", args: ["run", "automation:source-remediation"] },
  { title: "Generate source replacement decision pack", args: ["run", "automation:source-replacement-decisions"] },
  { title: "Generate review action board", args: ["run", "automation:review-action-board"] },
  { title: "Generate review portfolio board", args: ["run", "automation:review-portfolio-board"] },
  { title: "Generate review optimization brief", args: ["run", "automation:review-optimization-brief"] },
  { title: "Generate wave publish simulation", args: ["run", "automation:wave-publish-sim"] },
  { title: "Run content cannibalization check", args: ["run", "content:cannibalization"] },
  { title: "Generate review cannibalization brief", args: ["run", "automation:review-cannibalization-brief"] },
  { title: "Generate review collision decision pack", args: ["run", "automation:review-collision-decision-pack"] },
  { title: "Run content freshness check", args: ["run", "content:freshness"] },
  { title: "Generate review freshness brief", args: ["run", "automation:review-freshness-brief"] },
  { title: "Generate public search refresh pack", args: ["run", "automation:public-search-refresh"] },
  { title: "Generate public refresh sprint board", args: ["run", "automation:public-refresh-sprint"] },
  { title: "Generate public search refresh session pack", args: ["run", "automation:public-search-refresh-session-pack"] },
  { title: "Generate tool market opportunity map", args: ["run", "automation:tool-market-opportunity"] },
  { title: "Generate autopilot review queue", args: ["run", "automation:autopilot-review-queue"] },
  { title: "Generate autopilot approval packet", args: ["run", "automation:autopilot-approval-packet"] },
  { title: "Generate autopilot search intent brief", args: ["run", "automation:autopilot-search-intent"] },
  { title: "Generate autopilot internal link brief", args: ["run", "automation:autopilot-internal-links"] },
  { title: "Generate autopilot source verification brief", args: ["run", "automation:autopilot-source-verification"] },
  { title: "Generate autopilot human review playbook", args: ["run", "automation:autopilot-human-review"] },
  { title: "Generate autopilot approval remediation pack", args: ["run", "automation:autopilot-approval-remediation"] },
  { title: "Generate human approval decision matrix", args: ["run", "automation:human-approval-decision-matrix"] },
  { title: "Generate human approval repair queue", args: ["run", "automation:human-approval-repair-queue"] },
  { title: "Generate human approval repair route", args: ["run", "automation:human-approval-repair-route"] },
  { title: "Generate human approval repair progress", args: ["run", "automation:human-approval-repair-progress"] },
  { title: "Generate human approval repair session pack", args: ["run", "automation:human-approval-repair-session-pack"] },
  { title: "Generate autopilot review sprint board", args: ["run", "automation:autopilot-review-sprint"] },
  { title: "Generate autopilot search query gap brief", args: ["run", "automation:autopilot-search-query-gap"] },
  { title: "Generate autopilot queued playbook brief", args: ["run", "automation:autopilot-queued-playbook"] },
  { title: "Generate autopilot queued remediation pack", args: ["run", "automation:autopilot-queued-remediation"] },
  { title: "Generate autopilot broad AI demand brief", args: ["run", "automation:autopilot-broad-ai-demand"] },
  { title: "Generate autopilot broad freshness triage", args: ["run", "automation:autopilot-broad-freshness"] },
  { title: "Generate autopilot broad publish waves", args: ["run", "automation:autopilot-broad-waves"] },
  { title: "Generate autopilot broad wave optimization", args: ["run", "automation:autopilot-broad-wave-optimization"] },
  { title: "Generate autopilot broad wave remediation pack", args: ["run", "automation:autopilot-broad-wave-remediation"] },
  { title: "Generate broad first coverage launch pack", args: ["run", "automation:broad-first-coverage-launch"] },
  { title: "Generate broad first coverage readiness matrix", args: ["run", "automation:broad-first-coverage-readiness"] },
  { title: "Generate human approval execution queue", args: ["run", "automation:human-approval-queue"] },
  { title: "Generate human approval clearance pack", args: ["run", "automation:human-approval-clearance"] },
  { title: "Generate review coverage report", args: ["run", "automation:review-coverage"] },
  { title: "Generate manual review workbench", args: ["run", "automation:workbench"] },
  { title: "Generate next batch approval route", args: ["run", "automation:next-batch-approval-route"] },
  { title: "Generate next batch route remediation pack", args: ["run", "automation:next-batch-route-remediation"] },
  { title: "Generate autopilot executive brief", args: ["run", "automation:autopilot-executive-brief"] },
  { title: "Generate publication bottleneck report", args: ["run", "automation:publication-bottleneck"] },
  { title: "Generate mojibake remediation brief", args: ["run", "automation:mojibake-remediation"] },
  { title: "Run searchability check", args: ["run", "--silent", "searchability:check"], outputFile: "content/automation/searchability-check.json" },
  { title: "Run automation gate", args: ["run", "automation:gate"] },
];

const failures: string[] = [];
const digestTask: Task = { title: "Generate automation digest", args: ["run", "automation:digest"] };

for (const task of tasks) {
  runTask(task);
}

const summaryPath = path.join(process.cwd(), "content", "automation", "automation-run-summary.json");
writeSummary();
console.log(`\nAutomation summary written to content/automation/automation-run-summary.json`);

runTask(digestTask);
writeSummary();

if (failures.length) {
  console.error(JSON.stringify(toSummary(), null, 2));
  process.exitCode = 1;
}

function runTask(task: Task) {
  console.log(`\n== ${task.title} ==`);
  const command = isWindows ? "cmd.exe" : "npm";
  const args = isWindows ? ["/d", "/s", "/c", "npm", ...task.args] : task.args;
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { ...process.env, ...(task.env || {}) },
    shell: false,
    timeout: task.timeoutMs,
  });
  if (result.error && isWindows && result.pid) cleanupProcessTree(result.pid);

  if (task.outputFile) {
    writeOutput(task.outputFile, result.stdout || "");
    if (result.stderr) process.stderr.write(result.stderr);
  } else {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
  }

  if (result.status !== 0) {
    failures.push(`${task.title} exited ${result.status}${result.error ? `: ${result.error.message}` : ""}`);
  }
}

function cleanupProcessTree(pid: number) {
  spawnSync("taskkill.exe", ["/PID", String(pid), "/T", "/F"], {
    encoding: "utf8",
    shell: false,
  });
}

function writeOutput(relativeFile: string, output: string) {
  const target = path.join(process.cwd(), relativeFile);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, output.endsWith("\n") ? output : `${output}\n`, "utf8");
  console.log(`wrote ${relativeFile}`);
}

function writeSummary() {
  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(summaryPath, `${JSON.stringify(toSummary(), null, 2)}\n`, "utf8");
}

function toSummary() {
  return {
    generatedAt: new Date().toISOString(),
    failures,
    ok: failures.length === 0,
    tasks: [...tasks.map((task) => task.title), digestTask.title],
  };
}
