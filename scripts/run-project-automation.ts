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
  { title: "Generate project status", args: ["run", "--silent", "project:status"], outputFile: "content/automation/project-status.json" },
  { title: "Run SEO safety check", args: ["run", "--silent", "seo:check"], outputFile: "content/automation/seo-check.json" },
  { title: "Generate SEO opportunity map", args: ["run", "seo:opportunities"] },
  { title: "Run searchability check", args: ["run", "--silent", "searchability:check"], outputFile: "content/automation/searchability-check.json" },
  { title: "Run automation gate", args: ["run", "automation:gate"] },
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
