import fs from "fs";
import path from "path";
import { parseArgs, rel } from "./content-utils";

type ManualProgress = {
  confirmedSubmittedCount: number;
  lastSubmittedAt: string | null;
  lastSubmittedUrl: string | null;
  notes: string[];
};

const manualProgressJson = path.join(process.cwd(), "content", "automation", "gsc-manual-progress.json");
const top500Text = path.join(process.cwd(), "docs", "gsc-url-inspection-top-500.txt");

function main() {
  const args = parseArgs();
  const topQueue = readUrlText(top500Text);
  const previous = readManualProgress();
  const countArg = toNumber(args.count);
  const addArg = toNumber(args.add);
  const dryRun = args["dry-run"] === true;
  const confirmedSubmittedCount = clamp(
    countArg ?? previous.confirmedSubmittedCount + (addArg ?? 0),
    0,
    topQueue.length,
  );

  if (countArg === null && addArg === null) {
    throw new Error("Pass --count=<total submitted> or --add=<new submitted count>.");
  }

  const lastSubmittedUrl = confirmedSubmittedCount > 0 ? topQueue[confirmedSubmittedCount - 1] : null;
  const nextUrl = topQueue[confirmedSubmittedCount] ?? null;
  const progress: ManualProgress = {
    confirmedSubmittedCount,
    lastSubmittedAt: new Date().toISOString(),
    lastSubmittedUrl,
    notes: [
      `Marked ${confirmedSubmittedCount} GSC URL Inspection request(s) as manually submitted.`,
      "This records manual submission attempts only; it does not claim indexing, ranking, impressions, clicks, or revenue.",
    ],
  };

  if (!dryRun) {
    fs.mkdirSync(path.dirname(manualProgressJson), { recursive: true });
    fs.writeFileSync(manualProgressJson, `${JSON.stringify(progress, null, 2)}\n`, "utf8");
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        dryRun,
        json: rel(manualProgressJson),
        confirmedSubmittedCount,
        remaining: topQueue.length - confirmedSubmittedCount,
        lastSubmittedUrl,
        nextUrl,
      },
      null,
      2,
    ),
  );
}

function readManualProgress(): ManualProgress {
  if (!fs.existsSync(manualProgressJson)) {
    return {
      confirmedSubmittedCount: 0,
      lastSubmittedAt: null,
      lastSubmittedUrl: null,
      notes: [],
    };
  }

  const parsed = JSON.parse(fs.readFileSync(manualProgressJson, "utf8")) as ManualProgress;
  return {
    confirmedSubmittedCount: Number.isFinite(parsed.confirmedSubmittedCount) ? parsed.confirmedSubmittedCount : 0,
    lastSubmittedAt: parsed.lastSubmittedAt ?? null,
    lastSubmittedUrl: parsed.lastSubmittedUrl ?? null,
    notes: Array.isArray(parsed.notes) ? parsed.notes : [],
  };
}

function readUrlText(file: string) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${rel(file)}. Run npm run search-console:indexing-priority first.`);
  return fs
    .readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function toNumber(value: string | boolean | undefined) {
  if (value === undefined || value === false || value === true) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.floor(parsed) : null;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

main();
