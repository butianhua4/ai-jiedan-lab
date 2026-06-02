import { getAllPosts } from "../lib/blog";
import { articleFiles, readArticle } from "./content-utils";

async function main() {
  const files = await articleFiles();
  const all = files.map((file) => readArticle(file).data);
  const publicPosts = getAllPosts(false);
  const publicSlugSet = new Set(publicPosts.map((post) => post.slug));
  const leaked = all.filter((article) => article.status !== "published" && article.slug && publicSlugSet.has(article.slug));
  const wronglyIndexed = all.filter((article) => article.status !== "published" && article.noindex === false);
  const publishedNoindexed = all.filter((article) => article.status === "published" && article.noindex !== false);

  const result = {
    publicPosts: publicPosts.length,
    leakedDraftOrReview: leaked.map((article) => article.slug),
    nonPublishedWithNoindexFalse: wronglyIndexed.map((article) => article.slug),
    publishedButNoindexed: publishedNoindexed.map((article) => article.slug),
    ok: leaked.length === 0 && wronglyIndexed.length === 0 && publishedNoindexed.length === 0,
  };

  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exitCode = 1;
}

void main();
