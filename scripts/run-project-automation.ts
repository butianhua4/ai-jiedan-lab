import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

type Task = {
  args: string[];
  outputFile?: string;
  title: string;
};

const isWindows = process.platform === "win32";

const tasks: Task[] = [
  { title: "Check draft guardrail cleanup", args: ["run", "automation:sanitize-drafts", "--", "--dry-run"] },
  { title: "Generate review queue", args: ["run", "automation:review", "--", "--limit=25"] },
  { title: "Generate publish readiness pack", args: ["run", "automation:publish-pack", "--", "--limit=3"] },
  { title: "Run review candidate preflight", args: ["run", "automation:review-preflight"] },
  { title: "Generate project status", args: ["run", "--silent", "project:status"], outputFile: "content/automation/project-status.json" },
  { title: "Run traffic evidence audit", args: ["run", "traffic:evidence"] },
  { title: "Run traffic claim guard", args: ["run", "traffic:claim-guard"] },
  { title: "Run content integrity audit", args: ["run", "content:integrity"] },
  { title: "Run internal link opportunity audit", args: ["run", "content:internal-links"] },
  { title: "Run SEO safety check", args: ["run", "--silent", "seo:check"], outputFile: "content/automation/seo-check.json" },
  { title: "Run search snippet readiness audit", args: ["run", "seo:snippets"] },
  { title: "Run structured data readiness audit", args: ["run", "seo:schema"] },
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
  { title: "Generate broad search demand map", args: ["run", "automation:broad-search-demand"] },
  { title: "Generate public coverage gap plan", args: ["run", "automation:public-gap-plan"] },
  { title: "Run public coverage gap preflight", args: ["run", "automation:public-gap-preflight"] },
  { title: "Generate public coverage gap decision pack", args: ["run", "automation:public-gap-decision-pack"] },
  { title: "Run source target health audit", args: ["run", "content:source-health"] },
  { title: "Generate review action board", args: ["run", "automation:review-action-board"] },
  { title: "Generate review optimization brief", args: ["run", "automation:review-optimization-brief"] },
  { title: "Generate wave publish simulation", args: ["run", "automation:wave-publish-sim"] },
  { title: "Run content cannibalization check", args: ["run", "content:cannibalization"] },
  { title: "Generate review cannibalization brief", args: ["run", "automation:review-cannibalization-brief"] },
  { title: "Run content freshness check", args: ["run", "content:freshness"] },
  { title: "Generate review coverage report", args: ["run", "automation:review-coverage"] },
  { title: "Generate manual review workbench", args: ["run", "automation:workbench"] },
  { title: "Run searchability check", args: ["run", "--silent", "searchability:check"], outputFile: "content/automation/searchability-check.json" },
  { title: "Run automation gate", args: ["run", "automation:gate"] },
  { title: "Generate automation digest", args: ["run", "automation:digest"] },
];

const failures: string[] = [];

for (const task of tasks) {
  console.log(`\n== ${task.title} ==`);
  const command = isWindows ? "cmd.exe" : "npm";
  const args = isWindows ? ["/d", "/s", "/c", "npm", ...task.args] : task.args;
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    shell: false,
  });

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

const summary = {
  generatedAt: new Date().toISOString(),
  failures,
  ok: failures.length === 0,
  tasks: tasks.map((task) => task.title),
};

const summaryPath = path.join(process.cwd(), "content", "automation", "automation-run-summary.json");
fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(`\nAutomation summary written to content/automation/automation-run-summary.json`);

if (failures.length) {
  console.error(JSON.stringify(summary, null, 2));
  process.exitCode = 1;
}

function writeOutput(relativeFile: string, output: string) {
  const target = path.join(process.cwd(), relativeFile);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, output.endsWith("\n") ? output : `${output}\n`, "utf8");
  console.log(`wrote ${relativeFile}`);
}
