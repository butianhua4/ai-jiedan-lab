import fs from "fs";
import path from "path";
import { articleFiles, parseArgs, readArticle, writeArticle } from "./content-utils";
import { checkFile } from "./quality-core";

async function main() {
  const args = parseArgs();
  const confirm = Boolean(args.confirm);
  const quiet = Boolean(args.quiet);
  const statusFilter = args.status ? String(args.status) : "";
  let files = args.file ? [String(args.file)] : await articleFiles();
  if (args.batch) {
    files = files.filter((file) => readArticle(file).data.publishBatch === Number(args.batch));
  }
  if (statusFilter) {
    files = files.filter((file) => readArticle(file).data.status === statusFilter);
  }
  const limit = Math.min(Number(args.limit || 1), 5);
  const logPath = path.join(process.cwd(), "content", "publish-log.json");
  const log = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, "utf8")) : [];
  let candidates = 0;
  let published = 0;
  let scanned = 0;
  let skipped = 0;
  const firstSkips: Array<{ file: string; score: number; status: string; reasons: string[] }> = [];

  for (const file of files) {
    if (candidates >= limit) break;
    scanned += 1;

    const article = readArticle(file);
    const result = checkFile(file);
    const articleStatus = String(article.data.status || "");
    const reasons: string[] = [];

    if (articleStatus !== "review") reasons.push(`status is ${articleStatus || "missing"}, expected review`);
    if (result.qualityScore < 80) reasons.push(`qualityScore ${result.qualityScore} below 80`);
    if (result.failedItems.length) reasons.push(`failedItems: ${result.failedItems.join("; ")}`);
    if (article.data.noindex !== true) reasons.push("review candidate must still be noindex=true before publishing");

    const ok = reasons.length === 0;

    if (!ok) {
      skipped += 1;
      if (firstSkips.length < 10) {
        firstSkips.push({ file: result.file, score: result.qualityScore, status: articleStatus, reasons });
      }
      if (!quiet) {
        console.log(JSON.stringify({ file: result.file, candidate: false, score: result.qualityScore, status: articleStatus, reasons }, null, 2));
      }
      continue;
    }

    candidates += 1;
    if (!quiet) {
      console.log(JSON.stringify({ file: result.file, candidate: true, dryRun: !confirm, ok, score: result.qualityScore, status: articleStatus }, null, 2));
    }

    if (!confirm) continue;

    article.data.status = "published";
    article.data.noindex = false;
    article.data.qualityScore = result.qualityScore;
    article.data.updatedAt = todayInShanghai();
    writeArticle(article.file, article.data, article.content);
    log.push({ time: new Date().toISOString(), action: "publish", slug: article.data.slug, score: result.qualityScore });
    published += 1;
  }
  fs.writeFileSync(logPath, `${JSON.stringify(log, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ dryRun: !confirm, scanned, skipped, candidates, published, statusFilter: statusFilter || "all", firstSkips }, null, 2));
}

void main();

function todayInShanghai() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}
