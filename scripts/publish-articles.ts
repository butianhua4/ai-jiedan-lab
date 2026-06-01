import fs from "fs";
import path from "path";
import { articleFiles, parseArgs, readArticle, writeArticle } from "./content-utils";
import { checkFile } from "./quality-core";

async function main() {
  const args = parseArgs();
  const confirm = Boolean(args.confirm);
  let files = args.file ? [String(args.file)] : await articleFiles();
  if (args.batch) {
    files = files.filter((file) => readArticle(file).data.publishBatch === Number(args.batch));
  }
  const limit = Math.min(Number(args.limit || 1), 5);
  const logPath = path.join(process.cwd(), "content", "publish-log.json");
  const log = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, "utf8")) : [];
  let candidates = 0;
  let published = 0;

  for (const file of files) {
    if (candidates >= limit) break;

    const article = readArticle(file);
    const result = checkFile(file);
    const reasons: string[] = [];

    if (article.data.status !== "review") reasons.push(`status is ${article.data.status}, expected review`);
    if (result.qualityScore < 80) reasons.push(`qualityScore ${result.qualityScore} below 80`);
    if (result.failedItems.length) reasons.push(`failedItems: ${result.failedItems.join("; ")}`);
    if (article.data.noindex !== true) reasons.push("review candidate must still be noindex=true before publishing");

    const ok = reasons.length === 0;

    if (!ok) {
      console.log(JSON.stringify({ file: result.file, candidate: false, score: result.qualityScore, status: article.data.status, reasons }, null, 2));
      continue;
    }

    candidates += 1;
    console.log(JSON.stringify({ file: result.file, candidate: true, dryRun: !confirm, ok, score: result.qualityScore, status: article.data.status }, null, 2));

    if (!confirm) continue;

    article.data.status = "published";
    article.data.noindex = false;
    article.data.qualityScore = result.qualityScore;
    article.data.updatedAt = new Date().toISOString().slice(0, 10);
    writeArticle(article.file, article.data, article.content);
    log.push({ time: new Date().toISOString(), action: "publish", slug: article.data.slug, score: result.qualityScore });
    published += 1;
  }
  fs.writeFileSync(logPath, `${JSON.stringify(log, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ dryRun: !confirm, candidates, published }, null, 2));
}

void main();
