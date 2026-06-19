import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import {
  decideAutonomousNextStep,
  getAutonomousGuardrails,
  getAutonomousLoopStatus,
  writeAutonomousLoopStatus,
  type AutonomousMode,
  type AutonomousRunStatus,
} from "../lib/autonomous-next-step";

type VerificationResult = {
  command: string;
  ok: boolean;
  output: string;
};

type ExecutionResult = {
  status: AutonomousRunStatus;
  changedFiles: string[];
  notes: string[];
  verification: VerificationResult[];
  commit: {
    attempted: boolean;
    ok: boolean;
    hash: string | null;
    message: string | null;
    reason?: string;
  };
};

const mode = parseMode();
const decision = decideAutonomousNextStep();
const reportDir = path.join(process.cwd(), "reports", "autonomous-loop");
const artifactDir = path.join(reportDir, "artifacts");
const timestamp = new Date();
const reportPath = path.join(reportDir, `${formatTimestamp(timestamp)}.md`);

main();

function main() {
  fs.mkdirSync(reportDir, { recursive: true });
  fs.mkdirSync(artifactDir, { recursive: true });

  const execution = runMode();
  const report = renderReport(execution);
  fs.writeFileSync(reportPath, report, "utf8");

  const previous = getAutonomousLoopStatus(mode);
  const blockedReasons = getBlockedReasonsForRun(execution);
  writeAutonomousLoopStatus({
    ...previous,
    mode,
    currentStage: decision.currentStage,
    lastRunAt: timestamp.toISOString(),
    lastTask: decision.recommendedTask.title,
    lastStatus: execution.status,
    lastReport: path.relative(process.cwd(), reportPath).replace(/\\/g, "/"),
    nextRecommendedTask: decision.nextThreeCandidates[0]?.title || decision.recommendedTask.title,
    autoExecuteAllowed: decision.recommendedTask.allowedToAutoExecute && decision.recommendedTask.riskLevel === "low" && blockedReasons.length === 0,
    blockedReasons,
    guardrails: getAutonomousGuardrails(),
  });

  console.log(
    JSON.stringify(
      {
        ok: execution.status !== "failed",
        mode,
        currentStage: decision.currentStage,
        task: decision.recommendedTask.id,
        status: execution.status,
        report: path.relative(process.cwd(), reportPath).replace(/\\/g, "/"),
        changedFiles: execution.changedFiles,
        commit: execution.commit,
      },
      null,
      2,
    ),
  );

  if (execution.status === "failed") process.exitCode = 1;
}

function runMode(): ExecutionResult {
  if (mode === "report-only") {
    return {
      status: "report-only",
      changedFiles: [],
      notes: ["Report-only mode recorded the current autonomous decision without executing development work."],
      verification: [],
      commit: { attempted: false, ok: false, hash: null, message: null, reason: "report-only mode" },
    };
  }

  if (mode === "plan-only") {
    return {
      status: "skipped",
      changedFiles: [],
      notes: ["Plan-only mode selected the next task and intentionally skipped development execution."],
      verification: [],
      commit: { attempted: false, ok: false, hash: null, message: null, reason: "plan-only mode" },
    };
  }

  const task = decision.recommendedTask;
  if (task.riskLevel !== "low" || !task.allowedToAutoExecute) {
    return {
      status: "skipped",
      changedFiles: [],
      notes: [`Task was not executed because risk=${task.riskLevel} and allowed=${task.allowedToAutoExecute}.`],
      verification: [],
      commit: { attempted: false, ok: false, hash: null, message: null, reason: "guardrail blocked execution" },
    };
  }

  const notes: string[] = [];
  const before = gitChangedFiles();
  const changedFiles = executeTask(task.id, notes);
  const allChangedFiles = Array.from(new Set([...changedFiles, ...gitChangedFiles().filter((file: string) => !before.includes(file))]));
  const guardrailError = checkFileGuardrails(allChangedFiles);

  if (guardrailError) {
    return {
      status: "failed",
      changedFiles: allChangedFiles,
      notes: [...notes, guardrailError],
      verification: [],
      commit: { attempted: false, ok: false, hash: null, message: null, reason: guardrailError },
    };
  }

  const verification = runVerification();
  const failed = verification.filter((item) => !item.ok);
  if (failed.length) {
    return {
      status: "failed",
      changedFiles: allChangedFiles,
      notes: [...notes, `Verification failed: ${failed.map((item) => item.command).join(", ")}`],
      verification,
      commit: { attempted: false, ok: false, hash: null, message: null, reason: "verification failed" },
    };
  }

  return {
    status: "success",
    changedFiles: allChangedFiles,
    notes,
    verification,
    commit: {
      attempted: false,
      ok: false,
      hash: null,
      message: `auto: advance seo growth loop - ${timestamp.toISOString().slice(0, 10)} - ${decision.recommendedTask.id}`,
      reason: "Commit is handled by the caller or GitHub Action after report files are written.",
    },
  };
}

function executeTask(taskId: string, notes: string[]) {
  if (taskId === "conversion-services-page") {
    return createServicesPage(notes);
  }
  if (taskId === "conversion-hire-me-page") {
    return createHireMePage(notes);
  }

  const artifactPath = path.join(artifactDir, `${taskId}-${formatTimestamp(timestamp)}.json`);
  fs.writeFileSync(
    artifactPath,
    `${JSON.stringify(
      {
        generatedAt: timestamp.toISOString(),
        taskId,
        decision,
        note: "This task does not have a safe source-change executor yet, so the autonomous loop created an auditable planning artifact instead of pretending the task was completed.",
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  notes.push("No safe source-change executor exists for this task yet; wrote a planning artifact only.");
  return [path.relative(process.cwd(), artifactPath).replace(/\\/g, "/")];
}

function createServicesPage(notes: string[]) {
  const dir = path.join(process.cwd(), "app", "services");
  const file = path.join(dir, "page.tsx");
  if (fs.existsSync(file)) {
    notes.push("/services already exists; no source file was changed.");
    return [];
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    file,
    `import Link from "next/link";

const services = [
  {
    title: "AI deployment troubleshooting",
    description: "Debug Vercel, GitHub Actions, environment variables, API keys, and production launch blockers.",
    href: "/cluster/vercel",
  },
  {
    title: "Agent and RAG implementation review",
    description: "Review agent tool-calling, memory design, retrieval flows, logs, and safety checkpoints.",
    href: "/cluster/ai-tools",
  },
  {
    title: "SEO tool site buildout",
    description: "Plan and build q pages, topic clusters, sitemap structure, monitoring, and conversion entry points.",
    href: "/admin/seo-growth",
  },
];

export const metadata = {
  title: "AI Implementation Services | AI Tools Guide",
  description: "Practical AI deployment, agent, RAG, and SEO tool site services for teams that need real implementation help.",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Services</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-ink">AI deployment and SEO growth help for real projects</h1>
        <p className="max-w-3xl text-lg text-gray-600">
          Use the free guides and tools first. When a production issue, agent workflow, or SEO growth system needs hands-on implementation, these are the focused service lanes.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white" href="/contact">
            Contact us
          </Link>
          <Link className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-ink" href="/tools">
            Use free tools
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm" key={service.title}>
            <h2 className="text-xl font-semibold text-ink">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{service.description}</p>
            <Link className="mt-5 inline-block text-sm font-semibold text-brand" href={service.href}>
              View related guides
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-2xl font-semibold text-ink">Before paid work starts</h2>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          We avoid income guarantees and platform-risk shortcuts. A useful engagement starts with the current error, deployment target, repo state, desired outcome, and what has already been tried.
        </p>
      </section>
    </main>
  );
}
`,
    "utf8",
  );
  notes.push("Created /services as a low-risk conversion entry page linked to existing guides and contact flow.");
  return ["app/services/page.tsx"];
}

function createHireMePage(notes: string[]) {
  const dir = path.join(process.cwd(), "app", "hire-me");
  const file = path.join(dir, "page.tsx");
  if (fs.existsSync(file)) {
    notes.push("/hire-me already exists; no source file was changed.");
    return [];
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    file,
    `import Link from "next/link";

export const metadata = {
  title: "Hire AI Implementation Help | AI Tools Guide",
  description: "Request focused help with AI deployment, agents, RAG memory, GitHub Actions, Vercel, and SEO growth systems.",
};

export default function HireMePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Hire help</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-ink">Bring a stuck AI project to a clear next step</h1>
        <p className="max-w-3xl text-lg text-gray-600">
          Share the current error, repo or deployment context, target outcome, and what you already tried. The first goal is diagnosis and a safe implementation path, not vague promises.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          "Deployment or build failure",
          "Agent or RAG workflow review",
          "SEO growth system implementation",
        ].map((item) => (
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm" key={item}>
            <h2 className="text-lg font-semibold text-ink">{item}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Best fit when there is a concrete project, error, workflow, or growth target that can be inspected and verified.
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-2xl font-semibold text-ink">What to include</h2>
        <ul className="mt-4 grid gap-2 text-sm text-gray-700">
          <li>Project URL or repository context when available.</li>
          <li>The exact error, failing command, or deployment log.</li>
          <li>The desired result and deadline.</li>
          <li>Any platform limits, API costs, or security constraints.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white" href="/contact">
            Send project details
          </Link>
          <Link className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-ink" href="/services">
            View services
          </Link>
        </div>
      </section>
    </main>
  );
}
`,
    "utf8",
  );
  notes.push("Created /hire-me as a low-risk direct lead entry page with clear intake expectations.");
  return ["app/hire-me/page.tsx"];
}

function runVerification() {
  return ["lint", "seo:check", "build"].map((script) => runNpm(`npm run ${script}`, ["run", script]));
}

function runNpm(label: string, args: string[]): VerificationResult {
  const command = ["npm", ...args].join(" ");
  try {
    const output = execSync(command, { cwd: process.cwd(), encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { command: label, ok: true, output: tail(output) };
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message?: string };
    return { command: label, ok: false, output: tail([err.stdout, err.stderr, err.message].filter(Boolean).join("\n")) };
  }
}

function renderReport(execution: ExecutionResult) {
  const reportPathRelative = path.relative(process.cwd(), reportPath).replace(/\\/g, "/");
  return `# Autonomous Product Loop Report

Generated at: ${timestamp.toISOString()}
Mode: ${mode}
Report: ${reportPathRelative}

## Stage

- Current stage: ${decision.currentStage}
- Main bottleneck: ${decision.mainBottleneck}

## Selected Task

- ID: ${decision.recommendedTask.id}
- Type: ${decision.recommendedTask.type}
- Priority: ${decision.recommendedTask.priority}
- Title: ${decision.recommendedTask.title}
- Reason: ${decision.recommendedTask.reason}
- Expected impact: ${decision.recommendedTask.expectedImpact}
- Risk level: ${decision.recommendedTask.riskLevel}
- Allowed to auto execute: ${decision.recommendedTask.allowedToAutoExecute}

## Why This Task

The autonomous loop selected one task from the task pool after reading the real system status, SEO graph, growth report, sitemap stats, content counts, tool counts, conversion entry presence, latest reports, and latest commit.

## Files Changed

${execution.changedFiles.length ? execution.changedFiles.map((file) => `- ${file}`).join("\n") : "- none"}

## Verification

${renderVerification(execution.verification)}

## Execution Notes

${execution.notes.length ? execution.notes.map((note) => `- ${note}`).join("\n") : "- none"}

## Commit

- Attempted: ${execution.commit.attempted}
- OK: ${execution.commit.ok}
- Hash: ${execution.commit.hash || "n/a"}
- Message: ${execution.commit.message || "n/a"}
- Reason: ${execution.commit.reason || "n/a"}

## Risk Notes

- No DNS, domain, payment, ads, or Search Console permissions were changed.
- No URL migration was performed.
- No bulk content publishing was performed.
- If a task had no safe executor, the loop wrote a planning artifact instead of claiming completion.

## Next Recommended Tasks

${decision.nextThreeCandidates.map((task) => `- ${task.priority} ${task.id}: ${task.title}`).join("\n")}

## Observed State

\`\`\`json
${JSON.stringify(decision.observed, null, 2)}
\`\`\`
`;
}

function renderVerification(verification: VerificationResult[]) {
  if (!verification.length) return "- not run in this mode";
  return verification
    .map((item) => {
      const output = item.output.trim() || "no output";
      return `### ${item.command}: ${item.ok ? "PASS" : "FAIL"}\n\n\`\`\`text\n${output}\n\`\`\``;
    })
    .join("\n\n");
}

function checkFileGuardrails(files: string[]) {
  const added = files.filter((file) => !file.startsWith("reports/") && file !== "content/automation/autonomous-loop-status.json");
  if (added.length > 20) return `Guardrail failed: changed ${added.length} files, max is 20.`;
  if (files.some((file) => /(^|\/)(\.env|vercel\.json)$/.test(file))) return "Guardrail failed: sensitive config change detected.";
  return "";
}

function getBlockedReasonsForRun(execution: ExecutionResult) {
  const reasons: string[] = [];
  if (decision.recommendedTask.riskLevel !== "low") reasons.push("Recommended task is not low risk.");
  if (!decision.recommendedTask.allowedToAutoExecute) reasons.push("Recommended task is not allowed for auto execution.");
  if (execution.status === "failed") reasons.push("Latest run failed verification or guardrails.");
  return reasons;
}

function gitChangedFiles() {
  try {
    return execSync("git status --short", { cwd: process.cwd(), encoding: "utf8" })
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line: string) => line.slice(3).trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function parseMode(): AutonomousMode {
  const arg = process.argv.find((item) => item.startsWith("--mode="));
  const raw = (arg?.split("=")[1] || process.env.AUTONOMOUS_MODE || "plan-only") as AutonomousMode;
  if (raw === "report-only" || raw === "plan-only" || raw === "execute-low-risk") return raw;
  throw new Error(`Unknown autonomous mode: ${raw}`);
}

function formatTimestamp(date: Date) {
  return date.toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

function tail(value: string) {
  const lines = value.split(/\r?\n/).filter(Boolean);
  return lines.slice(-80).join("\n");
}
