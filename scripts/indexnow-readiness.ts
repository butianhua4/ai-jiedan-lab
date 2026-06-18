import fs from "fs";
import path from "path";
import { site } from "../data/site";
import { rel } from "./content-utils";

type DailyOps = {
  gscDailyActions: {
    todayBatch: Array<{
      url: string;
      type: string;
      cluster: string;
      score: number;
    }>;
  };
  summary: {
    growthStage: string;
    qPages: number;
    clusterPages: number;
    orphanPages: number;
    internalLinkHealth: number;
  };
};

const key = "4d7b5e9c9f2a4c7c8e7d2a6b3c1f0a9e";
const keyFile = `indexnow-${key}.txt`;
const base = site.url.replace(/\/+$/, "");
const dailyOpsJson = path.join(process.cwd(), "content", "automation", "seo-growth-daily-ops.json");
const outputJson = path.join(process.cwd(), "content", "automation", "indexnow-readiness.json");
const outputMarkdown = path.join(process.cwd(), "docs", "indexnow-readiness.md");

async function main() {
  const shouldSubmit = process.argv.includes("--submit") || process.env.INDEXNOW_SUBMIT === "true";
  const dailyOps = readDailyOps();
  const urlList = uniqueUrls(dailyOps.gscDailyActions.todayBatch.map((item) => item.url)).slice(0, 10);
  const keyLocation = `${base}/${keyFile}`;
  const liveKey = await checkLiveKey(keyLocation);
  const payload = {
    host: new URL(base).host,
    key,
    keyLocation,
    urlList,
  };
  const submission = shouldSubmit && liveKey.ok ? await submitIndexNow(payload) : null;
  const report = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      submitByDefault: false,
      note: "IndexNow is for Bing and other participating search engines. Google does not use IndexNow for normal q/blog pages.",
    },
    ready: liveKey.ok,
    liveKey,
    payload,
    submission,
    summary: dailyOps.summary,
    nextActions: buildNextActions(liveKey.ok, shouldSubmit),
  };

  fs.mkdirSync(path.dirname(outputJson), { recursive: true });
  fs.mkdirSync(path.dirname(outputMarkdown), { recursive: true });
  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(outputMarkdown, toMarkdown(report), "utf8");

  console.log(
    JSON.stringify(
      {
        ok: true,
        ready: report.ready,
        submitted: Boolean(report.submission?.ok),
        json: rel(outputJson),
        markdown: rel(outputMarkdown),
        urlCount: urlList.length,
      },
      null,
      2,
    ),
  );
}

function readDailyOps(): DailyOps {
  if (!fs.existsSync(dailyOpsJson)) {
    throw new Error(`Missing ${rel(dailyOpsJson)}. Run npm run seo:growth-daily-ops first.`);
  }

  return JSON.parse(fs.readFileSync(dailyOpsJson, "utf8")) as DailyOps;
}

async function checkLiveKey(url: string) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    const text = (await response.text()).trim();
    return {
      ok: response.ok && text === key,
      status: response.status,
      url,
      valueMatches: text === key,
    };
  } catch (error) {
    return {
      ok: false,
      status: "fetch-error",
      url,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function submitIndexNow(payload: { host: string; key: string; keyLocation: string; urlList: string[] }) {
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
    });

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      ok: false,
      status: "fetch-error",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function uniqueUrls(urls: string[]) {
  return [...new Set(urls.filter((url) => url.startsWith(`${base}/`)))];
}

function buildNextActions(liveKeyOk: boolean, shouldSubmit: boolean) {
  if (!liveKeyOk) {
    return [
      `Deploy the site and verify ${base}/${keyFile} returns the IndexNow key.`,
      "Register or import the site in Bing Webmaster Tools.",
      "After the key is live, run npm run indexnow:readiness -- --submit only for a small priority batch.",
    ];
  }

  if (!shouldSubmit) {
    return [
      "Key file is live. Keep report generation automated.",
      "Use --submit only after Bing Webmaster Tools is registered and the daily URL batch is reviewed.",
    ];
  }

  return ["Submission attempted. Check the submission status field and Bing Webmaster Tools after processing delay."];
}

function toMarkdown(report: {
  generatedAt: string;
  guardrails: { note: string; submitByDefault: boolean };
  liveKey: { ok: boolean; status: number | string; url: string; valueMatches?: boolean; error?: string };
  nextActions: string[];
  payload: { host: string; key: string; keyLocation: string; urlList: string[] };
  ready: boolean;
  submission: null | { ok: boolean; status: number | string; statusText?: string; error?: string };
  summary: DailyOps["summary"];
}) {
  return [
    "# IndexNow Readiness",
    "",
    `Generated at: ${report.generatedAt}`,
    "",
    "## Guardrails",
    "",
    `- Submit by default: ${report.guardrails.submitByDefault}`,
    `- Note: ${report.guardrails.note}`,
    "",
    "## Status",
    "",
    `- Ready: ${report.ready}`,
    `- Key URL: ${report.liveKey.url}`,
    `- Key HTTP status: ${report.liveKey.status}`,
    `- Key matches: ${report.liveKey.valueMatches ?? false}`,
    `- Submission attempted: ${report.submission !== null}`,
    `- Submission ok: ${report.submission?.ok ?? false}`,
    "",
    "## SEO State",
    "",
    `- Growth stage: ${report.summary.growthStage}`,
    `- Q pages: ${report.summary.qPages}`,
    `- Cluster pages: ${report.summary.clusterPages}`,
    `- Orphan pages: ${report.summary.orphanPages}`,
    `- Internal link health: ${report.summary.internalLinkHealth}`,
    "",
    "## Payload",
    "",
    `- Host: ${report.payload.host}`,
    `- Key location: ${report.payload.keyLocation}`,
    `- URLs: ${report.payload.urlList.length}`,
    "",
    ...report.payload.urlList.map((url, index) => `${index + 1}. ${url}`),
    "",
    "## Next Actions",
    "",
    ...report.nextActions.map((action) => `- ${action}`),
    "",
  ].join("\n");
}

main();
