import { articleFiles, parseArgs, readArticle, writeArticle } from "./content-utils";
import { checkFile } from "./quality-core";

async function main() {
  const args = parseArgs();
  let files = args.file ? [String(args.file)] : await articleFiles();
  if (args.batch) {
    files = files.filter((file) => readArticle(file).data.publishBatch === Number(args.batch));
  }
  const limit = Math.min(Number(args.limit || 5), 5);
  let marked = 0;

  for (const file of files) {
    if (marked >= limit) break;

    const article = readArticle(file);
    if (article.data.status !== "draft") {
      console.log("skip non-draft " + article.data.slug + " status " + article.data.status);
      continue;
    }

    const result = checkFile(file);
    if (result.qualityScore < 80 || result.failedItems.length) {
      console.log("skip " + result.file + " score " + result.qualityScore);
      continue;
    }
    if (!article.data.sourceNotes) console.log("warning: sourceNotes empty " + result.file);
    article.data.status = "review";
    article.data.qualityScore = result.qualityScore;
    article.data.noindex = true;
    writeArticle(article.file, article.data, article.content);
    console.log("marked review " + result.file);
    marked += 1;
  }
}

void main();
