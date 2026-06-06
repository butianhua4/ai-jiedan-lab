import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";

type CandidateScope = "expansion" | "recommended" | "wave-1";

type LinkSuggestion = {
  file: string;
  reason: string;
  score: number;
  slug: string;
  title: string;
  url: string;
};

type CandidateItem = {
  currentInternalLinks: number;
  file: string;
  linksToPublicArticles: number;
  missingPublicLinkSuggestion: boolean;
  scopes: CandidateScope[];
  status: string;
  suggestions: LinkSuggestion[];
  title: string;
};

type PublicArticle = {
  category: string;
  content: string;
  file: string;
  primaryKeyword: string;
  slug: string;
  tags: string[];
  title: string;
};

type PublicExpansionQueue = {
  items: Array<{ file: string }>;
};

type ReviewCandidates = {
  recommendedToday: Array<{ file: string }>;
};

type WaveApprovalPacket = {
  files: string[];
};

async function main() {
  const publicExpansion = readJson<PublicExpansionQueue>("content/automation/public-expansion-queue.json");
  const reviewCandidates = readJson<ReviewCandidates>("content/automation/review-candidates.json");
  const waveApprovalPacket = readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json");
  const expansionFiles = new Set(publicExpansion.items.map((item) => normalizeFile(item.file)));
  const recommendedFiles = new Set(reviewCandidates.recommendedToday.map((item) => normalizeFile(item.file)));
  const waveFiles = new Set(waveApprovalPacket.files.map(normalizeFile));
  const candidateFiles = [...new Set([...expansionFiles, ...recommendedFiles, ...waveFiles])].sort();
  const articles = (await articleFiles()).map((file) => readArticle(file));
  const publicArticles = articles
    .filter((article) => article.data.status === "published" && article.data.noindex === false && article.data.slug)
    .map((article) => ({
      category: String(article.data.category || ""),
      content: article.content,
      file: rel(article.file),
      primaryKeyword: String(article.data.primaryKeyword || ""),
      slug: String(article.data.slug || ""),
      tags: getStringArray(article.data.tags),
      title: String(article.data.title || ""),
    }));
  const publicSlugs = new Set(publicArticles.map((article) => article.slug));
  const candidateItems = candidateFiles.map((file) => toCandidateItem(file, publicArticles, publicSlugs, expansionFiles, recommendedFiles, waveFiles));
  const waveItems = candidateItems.filter((item) => item.scopes.includes("wave-1"));
  const recommendedItems = candidateItems.filter((item) => item.scopes.includes("recommended"));
  const missingSuggestions = candidateItems.filter((item) => item.missingPublicLinkSuggestion);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only internal-link opportunity audit. It does not edit article body links or publish content.",
    },
    summary: {
      candidateItems: candidateItems.length,
      candidateItemsMissingPublicLinkSuggestion: missingSuggestions.length,
      candidateItemsWithPublicSuggestions: candidateItems.length - missingSuggestions.length,
      expansionItems: expansionFiles.size,
      publicArticles: publicArticles.length,
      recommendedItems: recommendedItems.length,
      waveItems: waveItems.length,
      waveItemsMissingPublicLinkSuggestion: waveItems.filter((item) => item.missingPublicLinkSuggestion).length,
    },
    candidateItems,
    missingSuggestions,
    recommendedItems,
    waveItems,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "internal-link-opportunity-audit.json");
  const mdTarget = path.join(process.cwd(), "docs", "internal-link-opportunity-audit.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: missingSuggestions.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
}

function toCandidateItem(
  file: string,
  publicArticles: PublicArticle[],
  publicSlugs: Set<string>,
  expansionFiles: Set<string>,
  recommendedFiles: Set<string>,
  waveFiles: Set<string>,
): CandidateItem {
  const article = readArticle(file);
  const relativeFile = rel(article.file);
  const outboundLinks = extractInternalLinks(article.content);
  const linksToPublicArticles = outboundLinks.filter((link) => {
    const match = link.match(/^\/blog\/([^/#?]+)/);
    return match ? publicSlugs.has(match[1]) : false;
  }).length;
  const suggestions = suggestPublicLinks(article, relativeFile, publicArticles);

  return {
    currentInternalLinks: outboundLinks.length,
    file: relativeFile,
    linksToPublicArticles,
    missingPublicLinkSuggestion: suggestions.length === 0,
    scopes: [
      expansionFiles.has(relativeFile) ? "expansion" : null,
      recommendedFiles.has(relativeFile) ? "recommended" : null,
      waveFiles.has(relativeFile) ? "wave-1" : null,
    ].filter(Boolean) as CandidateScope[],
    status: String(article.data.status || ""),
    suggestions,
    title: String(article.data.title || ""),
  };
}

function suggestPublicLinks(article: ReturnType<typeof readArticle>, relativeFile: string, publicArticles: PublicArticle[]) {
  const category = String(article.data.category || "");
  const primaryKeyword = String(article.data.primaryKeyword || "");
  const tags = getStringArray(article.data.tags);
  const title = String(article.data.title || "");
  const content = article.content;
  const existingLinks = new Set(extractInternalLinks(content));
  const candidateTerms = terms([title, category, primaryKeyword, ...tags, content.slice(0, 1200)].join(" "));

  return publicArticles
    .filter((publicArticle) => publicArticle.file !== relativeFile && !existingLinks.has(`/blog/${publicArticle.slug}`))
    .map((publicArticle) => {
      const publicTerms = terms([publicArticle.title, publicArticle.category, publicArticle.primaryKeyword, ...publicArticle.tags].join(" "));
      const overlap = [...candidateTerms].filter((term) => publicTerms.has(term));
      const sameCategory = category && publicArticle.category === category;
      const sharedTags = tags.filter((tag) => publicArticle.tags.includes(tag));
      const score = overlap.length * 4 + sharedTags.length * 8 + (sameCategory ? 30 : 0) + (publicArticle.title.includes("Codex") ? 3 : 0);
      const fallbackScore = score || (publicArticle.title.includes("Vercel") && title.includes("Vercel") ? 18 : 0) || (publicArticle.title.includes("Codex") ? 6 : 1);

      return {
        file: publicArticle.file,
        reason: [
          sameCategory ? `same category: ${category}` : "",
          sharedTags.length ? `shared tags: ${sharedTags.join(", ")}` : "",
          overlap.length ? `keyword overlap: ${overlap.slice(0, 6).join(", ")}` : "fallback public article for crawl path",
        ].filter(Boolean).join("; "),
        score: fallbackScore,
        slug: publicArticle.slug,
        title: publicArticle.title,
        url: `/blog/${publicArticle.slug}`,
      };
    })
    .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug))
    .slice(0, 5);
}

function extractInternalLinks(content: string) {
  const links = new Set<string>();
  const linkPattern = /\]\((\/[^)\s#?]+)(?:[?#][^)]*)?\)/g;
  for (const match of content.matchAll(linkPattern)) {
    links.add(match[1]);
  }
  return [...links];
}

function getStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function terms(text: string) {
  const normalized = text.toLowerCase();
  const words = normalized.match(/[a-z0-9][a-z0-9-]{1,}|[\u4e00-\u9fa5]{2,}/g) || [];
  const output = new Set(words.filter((word) => !stopWords.has(word)));
  const chineseRuns = normalized.match(/[\u4e00-\u9fa5]{3,}/g) || [];
  for (const run of chineseRuns) {
    for (let index = 0; index < run.length - 1; index += 1) {
      output.add(run.slice(index, index + 2));
    }
  }
  return output;
}

const stopWords = new Set(["the", "and", "with", "for", "怎么", "什么", "指南", "教程", "新手"]);

function toMarkdown(payload: {
  candidateItems: CandidateItem[];
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string };
  missingSuggestions: CandidateItem[];
  recommendedItems: CandidateItem[];
  summary: Record<string, number>;
  waveItems: CandidateItem[];
}) {
  const lines = [
    "# Internal Link Opportunity Audit",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It suggests public internal links for review candidates before any publishing action.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Wave 1 Items",
    "",
    ...table(payload.waveItems),
    "",
    "## Recommended Items",
    "",
    ...table(payload.recommendedItems),
    "",
    "## Missing Suggestions",
    "",
    ...table(payload.missingSuggestions),
    "",
    "## All Candidate Items",
    "",
    ...table(payload.candidateItems),
    "",
  ];

  return lines.join("\n");
}

function table(items: CandidateItem[]) {
  if (!items.length) return ["- none"];

  return [
    "| Scopes | Public links now | Suggestions | Top suggestion | Title | File |",
    "| --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => {
      const top = item.suggestions[0];
      return `| ${item.scopes.join(", ")} | ${item.linksToPublicArticles}/${item.currentInternalLinks} | ${item.suggestions.length} | ${top ? `${top.title} (${top.url})` : "none"} | ${item.title} | ${item.file} |`;
    }),
  ];
}

void main();
