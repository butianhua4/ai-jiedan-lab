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
  files = files.slice(0, Math.min(Number(args.limit || 1), 5));
  const logPath = path.join(process.cwd(), "content", "publish-log.json");
  const log = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, "utf8")) : [];
  for (const file of files) {
    const article = readArticle(file);
    const result = checkFile(file);
    const ok = result.qualityScore >= 80 && article.data.status === "review";
    console.log(JSON.stringify({ file: result.file, dryRun: !confirm, ok, score: result.qualityScore, status: article.data.status }, null, 2));
    if (!ok || !confirm) continue;
    article.data.status = "published";
    article.data.noindex = false;
    article.data.qualityScore = result.qualityScore;
    article.data.updatedAt = new Date().toISOString().slice(0, 10);
    writeArticle(article.file, article.data, article.content);
    log.push({ time: new Date().toISOString(), action: "publish", slug: article.data.slug, score: result.qualityScore });
  }
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2), "utf8");
}

void main();
