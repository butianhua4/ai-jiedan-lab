import { articleFiles, parseArgs, readArticle, writeArticle } from "./content-utils";
import { checkFile } from "./quality-core";

async function main() {
  const args = parseArgs();
  let files = args.file ? [String(args.file)] : await articleFiles();
  if (args.batch) {
    files = files.filter((file) => readArticle(file).data.publishBatch === Number(args.batch));
  }
  files = files.slice(0, Number(args.limit || 5));
  for (const file of files) {
    const article = readArticle(file);
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
  }
}

void main();
