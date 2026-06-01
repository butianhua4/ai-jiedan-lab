import { articleFiles, parseArgs, readArticle } from "./content-utils";
import { checkFile } from "./quality-core";

async function main() {
  const args = parseArgs();
  let files = args.file ? [String(args.file)] : await articleFiles();
  if (args.batch) {
    files = files.filter((file) => readArticle(file).data.publishBatch === Number(args.batch));
  }
  const results = files.map(checkFile);
  for (const result of results) console.log(JSON.stringify(result, null, 2));
  if (results.some((result) => result.qualityScore < 80 || result.failedItems.length)) {
    process.exitCode = 1;
  }
}

void main();
