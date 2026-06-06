import fs from "fs";
import path from "path";
import fg from "fast-glob";
import { rel } from "./content-utils";

type ClaimHit = {
  file: string;
  line: number;
  reason: string;
  text: string;
};

type TrafficEvidence = {
  summary: {
    canClaimTraffic: boolean;
    claimableMetrics: number;
    trafficDataAvailable: boolean;
  };
};

const scannedGlobs = ["README.md", "docs/*.md", "content/automation/*.json", "app/llms.txt/route.ts"];
const excludedFiles = new Set(["docs/traffic-claim-guard.md"]);
const unsafePatterns: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /\btrafficDataAvailable\b\s*[:=]\s*true/i, reason: "trafficDataAvailable is true" },
  { pattern: /\bcanClaimTraffic\b\s*[:=]\s*true/i, reason: "canClaimTraffic is true" },
  { pattern: /"trafficDataAvailable"\s*:\s*true/i, reason: "trafficDataAvailable JSON is true" },
  { pattern: /"canClaimTraffic"\s*:\s*true/i, reason: "canClaimTraffic JSON is true" },
  { pattern: /已有(?:真实)?流量|已经有(?:真实)?流量|当前(?:已经)?有(?:真实)?流量/, reason: "claims current traffic" },
  { pattern: /已(?:经)?有.*(?:点击|曝光|访问)/, reason: "claims current clicks, impressions, or visits" },
  { pattern: /\b(?:we have|has|already has)\s+(?:real\s+)?(?:traffic|visits|clicks|impressions)\b/i, reason: "claims current traffic metrics" },
];
const watchPatterns = [
  /流量|点击|曝光|访问|traffic|visits|clicks|impressions|Search Console|Analytics|trafficDataAvailable|canClaimTraffic/i,
];
const safeContextPatterns = [
  /没有|不能|不要|未接入|待接入|待确认|等.*后|如果|观察|准备|后期|不会|不构成|not claim|does not claim|without|before reporting|future|available: false|false/i,
];

async function main() {
  const evidence = readJson<TrafficEvidence>("content/automation/traffic-evidence-audit.json");
  const files = (await fg(scannedGlobs, { cwd: process.cwd(), dot: false, onlyFiles: true }))
    .map((file) => file.replace(/\\/g, "/"))
    .filter((file) => !excludedFiles.has(file));
  const unsafeClaims: ClaimHit[] = [];
  const watchMentions: ClaimHit[] = [];

  for (const file of files) {
    const lines = fs.readFileSync(path.join(process.cwd(), file), "utf8").split(/\r?\n/);
    lines.forEach((lineText, index) => {
      const text = lineText.trim();
      if (!text) return;

      for (const item of unsafePatterns) {
        if (!item.pattern.test(text)) continue;
        if (safeContextPatterns.some((pattern) => pattern.test(text))) continue;
        unsafeClaims.push({ file, line: index + 1, reason: item.reason, text });
      }

      if (watchPatterns.some((pattern) => pattern.test(text))) {
        watchMentions.push({ file, line: index + 1, reason: "traffic-related mention", text });
      }
    });
  }

  const measuredTrafficUnavailable =
    evidence.summary.trafficDataAvailable === false && evidence.summary.canClaimTraffic === false && evidence.summary.claimableMetrics === 0;
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoPublish: false,
      note: "This guard scans operational docs and automation reports for unsupported traffic claims. It does not scan draft article teaching examples.",
    },
    summary: {
      filesScanned: files.length,
      measuredTrafficUnavailable,
      unsafeClaims: unsafeClaims.length,
      watchMentions: watchMentions.length,
    },
    unsafeClaims,
    watchMentions: watchMentions.slice(0, 80),
    nextActions: buildNextActions(unsafeClaims.length, measuredTrafficUnavailable),
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "traffic-claim-guard.json");
  const mdTarget = path.join(process.cwd(), "docs", "traffic-claim-guard.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeClaims.length === 0, unsafeClaims: unsafeClaims.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
  if (unsafeClaims.length) process.exitCode = 1;
}

function buildNextActions(unsafeClaimCount: number, measuredTrafficUnavailable: boolean) {
  if (unsafeClaimCount > 0) return ["Remove or qualify unsupported traffic claims before publishing reports or status updates."];
  if (measuredTrafficUnavailable) {
    return [
      "Keep saying that live/search surfaces are healthy, not that traffic exists.",
      "Only report traffic after an audited source provides clicks, impressions, visits, or pageviews.",
    ];
  }
  return ["Measured traffic may exist, but report only imported audited metrics and cite the source report."];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoPublish: boolean; note: string };
  nextActions: string[];
  summary: Record<string, boolean | number>;
  unsafeClaims: ClaimHit[];
  watchMentions: ClaimHit[];
}) {
  const lines = [
    "# Traffic Claim Guard",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This guard scans operational reports and docs for unsupported claims that real traffic, clicks, impressions, or visits already exist.",
    "",
    "## Guardrails",
    "",
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Claims",
    "",
    payload.unsafeClaims.length ? "| File | Line | Reason | Text |" : "None.",
    payload.unsafeClaims.length ? "| --- | --- | --- | --- |" : "",
    ...payload.unsafeClaims.map((item) => `| ${item.file} | ${item.line} | ${item.reason} | ${item.text.replace(/\|/g, "\\|")} |`),
    "",
    "## Watch Mentions",
    "",
    "| File | Line | Text |",
    "| --- | --- | --- |",
    ...payload.watchMentions.map((item) => `| ${item.file} | ${item.line} | ${item.text.replace(/\|/g, "\\|")} |`),
    "",
    "## Next Actions",
    "",
    ...payload.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.filter((line) => line !== "").join("\n");
}

void main();
