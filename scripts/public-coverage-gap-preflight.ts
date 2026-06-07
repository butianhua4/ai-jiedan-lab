import fs from "fs";
import path from "path";
import { chineseCount, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type GapPlanItem = {
  approvalWave: number;
  file: string;
  gapScore: number;
  missingSubtopics: string[];
  primaryKeyword: string;
  reviewFocus: string[];
  searchSeeds: string[];
  sourceTargets: string[];
  themeId: string;
  themeTitle: string;
  title: string;
};

type GapPlan = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  items: GapPlanItem[];
  summary: { items: number; plannedWaves: number; readyItems: number; unsafeItems: number; uniqueFiles: number };
};

type BroadFirstCoverageLaunchPack = {
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  items: Array<{
    cluster: string;
    file: string;
    gapScore: number;
    primaryKeyword: string;
    reviewFocus: string[];
    searchQueries: string[];
    sourceTargets: string[];
    title: string;
  }>;
  summary: { clustersSelected: number; unsafeItems: number; uniqueFiles: number; zeroPublicClusters: number };
};

type PublicArticle = {
  category: string;
  file: string;
  primaryKeyword: string;
  slug: string;
  tags: string[];
  title: string;
};

type PreflightItem = {
  approvalWave: number;
  blockingIssues: string[];
  descriptionLength: number;
  exactSeedMatches: number;
  file: string;
  gapScore: number;
  internalLinks: number;
  linksToPublicArticles: number;
  missingSubtopics: string[];
  noindex: boolean;
  primaryKeyword: string;
  publicLinkSuggestions: Array<{ reason: string; score: number; title: string; url: string }>;
  qualityIssues: string[];
  qualityScore: number;
  readyForManualReview: boolean;
  reviewFocus: string[];
  safeDraft: boolean;
  scope: Array<"broad-first-coverage" | "public-gap-plan">;
  searchSeeds: string[];
  seedFamilyMatches: number;
  slug: string;
  sourceTargets: string[];
  status: string;
  structuredDataReady: boolean;
  themeId: string;
  themeTitle: string;
  title: string;
  titleLength: number;
  warningIssues: string[];
  wordCountChinese: number;
};

const siteUrl = "https://ai-jiedan-lab.vercel.app";

async function main() {
  const plan = readJson<GapPlan>("content/automation/public-coverage-gap-plan.json");
  const launchPack = readJson<BroadFirstCoverageLaunchPack>("content/automation/broad-first-coverage-launch-pack.json");
  const publicArticles = await loadPublicArticles();
  const publicSlugs = new Set(publicArticles.map((article) => article.slug));
  const mergedItems = mergePlanItems(plan.items, launchPack.items);
  const items = mergedItems.map((item) => toPreflightItem(item, publicArticles, publicSlugs));
  const blockingItems = items.filter((item) => item.blockingIssues.length > 0);
  const warningItems = items.filter((item) => item.warningIssues.length > 0);
  const waveSummaries = toWaveSummaries(items);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only preflight for the public coverage gap plan. It does not edit metadata, links, status, noindex, review, or publishing state.",
      stopBefore: "Use findings during human review. Do not run mark:review --confirm-human or publish:articles --confirm without explicit human approval.",
    },
    sourceEvidence: {
      broadFirstCoverageGuardrails: launchPack.guardrails,
      broadFirstCoverageSummary: launchPack.summary,
      gapPlanGuardrails: plan.guardrails,
      note: "Search seeds are editorial review prompts, not measured keyword volume, rankings, clicks, impressions, or traffic.",
    },
    summary: {
      blockingItems: blockingItems.length,
      broadFirstCoverageItems: launchPack.summary.clustersSelected,
      broadFirstCoveragePreflightItems: items.filter((item) => item.scope.includes("broad-first-coverage")).length,
      items: items.length,
      planItems: plan.summary.items,
      planReadyItems: plan.summary.readyItems,
      planUnsafeItems: plan.summary.unsafeItems,
      planWaves: plan.summary.plannedWaves,
      readyItems: items.filter((item) => item.readyForManualReview).length,
      structuredDataReadyItems: items.filter((item) => item.structuredDataReady).length,
      uniqueFiles: new Set(items.map((item) => item.file)).size,
      warningItems: warningItems.length,
      withPublicLinkSuggestions: items.filter((item) => item.publicLinkSuggestions.length > 0).length,
      withSeedMatches: items.filter((item) => item.exactSeedMatches > 0 || item.seedFamilyMatches >= 2).length,
    },
    waveSummaries,
    blockingItems,
    warningItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "public-coverage-gap-preflight.json");
  const mdTarget = path.join(process.cwd(), "docs", "public-coverage-gap-preflight.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: blockingItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (blockingItems.length) process.exitCode = 1;
}

async function loadPublicArticles() {
  const { articleFiles } = await import("./content-utils");
  const files = await articleFiles();
  return files
    .map((file) => readArticle(file))
    .filter((article) => article.data.status === "published" && article.data.noindex === false && article.data.slug)
    .map((article): PublicArticle => ({
      category: stringValue(article.data.category),
      file: rel(article.file),
      primaryKeyword: stringValue(article.data.primaryKeyword),
      slug: stringValue(article.data.slug),
      tags: getStringArray(article.data.tags),
      title: stringValue(article.data.title),
    }));
}

function toPreflightItem(planItem: GapPlanItem, publicArticles: PublicArticle[], publicSlugs: Set<string>): PreflightItem {
  const article = readArticle(planItem.file);
  const data = article.data;
  const quality = checkFile(article.file);
  const file = rel(article.file);
  const title = stringValue(data.title);
  const description = stringValue(data.description);
  const slug = stringValue(data.slug);
  const status = stringValue(data.status);
  const noindex = data.noindex === true;
  const safeDraft = status === "draft" && noindex && data.humanReviewRequired === true;
  const links = extractInternalLinks(article.content);
  const linksToPublicArticles = links.filter((link) => {
    const match = link.match(/^\/blog\/([^/#?]+)/);
    return match ? publicSlugs.has(match[1]) : false;
  }).length;
  const publicLinkSuggestions = suggestPublicLinks(article, file, publicArticles);
  const exactSeedMatches = countExactSeedMatches(planItem.searchSeeds, `${title} ${description} ${article.content}`);
  const seedFamilyMatches = countSeedFamilyMatches(planItem.searchSeeds, `${title} ${description} ${article.content}`);
  const structuredDataReady = isStructuredDataReady(data, slug);
  const blockingIssues = [
    safeDraft ? "" : "candidate must remain draft, noindex, and humanReviewRequired",
    quality.failedItems.length === 0 ? "" : "quality check has failed items",
    title.length >= 8 ? "" : "title is too short",
    description.length >= 35 ? "" : "description is too short",
    isKebabSlug(slug) ? "" : "slug should be lowercase kebab-case ASCII",
    data.noindex === false ? "gap candidate must not be indexable before approval" : "",
    structuredDataReady ? "" : "metadata is not ready for Article JSON-LD preview",
    planItem.sourceTargets.length >= 2 ? "" : "at least two source targets are required",
    planItem.searchSeeds.length >= 4 ? "" : "at least four search seeds are required",
    publicLinkSuggestions.length > 0 ? "" : "at least one public internal link suggestion is required",
  ].filter(Boolean);
  const warningIssues = [
    description.length < 55 ? "description may be thin for search snippets" : "",
    title.length > 60 ? "title may truncate in search results" : "",
    planItem.primaryKeyword && !normalizeText(title).includes(normalizeText(planItem.primaryKeyword)) ? "primary keyword is not an exact title substring" : "",
    exactSeedMatches === 0 ? "no exact search-seed phrase appears in title, description, or body" : "",
    seedFamilyMatches < 2 ? "few search-seed token families appear in article text" : "",
    linksToPublicArticles === 0 ? "article currently has no links to published articles" : "",
    planItem.missingSubtopics.length > 0 ? `theme still has missing subtopics: ${planItem.missingSubtopics.join(", ")}` : "",
  ].filter(Boolean);

  return {
    approvalWave: planItem.approvalWave,
    blockingIssues,
    descriptionLength: description.length,
    exactSeedMatches,
    file,
    gapScore: planItem.gapScore,
    internalLinks: links.length,
    linksToPublicArticles,
    missingSubtopics: planItem.missingSubtopics,
    noindex,
    primaryKeyword: stringValue(data.primaryKeyword) || planItem.primaryKeyword,
    publicLinkSuggestions,
    qualityIssues: quality.failedItems,
    qualityScore: quality.qualityScore,
    readyForManualReview: blockingIssues.length === 0,
    reviewFocus: planItem.reviewFocus,
    safeDraft,
    scope: getItemScope(planItem),
    searchSeeds: planItem.searchSeeds,
    seedFamilyMatches,
    slug,
    sourceTargets: planItem.sourceTargets,
    status,
    structuredDataReady,
    themeId: planItem.themeId,
    themeTitle: planItem.themeTitle,
    title,
    titleLength: title.length,
    warningIssues,
    wordCountChinese: chineseCount(article.content),
  };
}

function mergePlanItems(planItems: GapPlanItem[], launchItems: BroadFirstCoverageLaunchPack["items"]) {
  const byFile = new Map<string, GapPlanItem>();
  for (const item of planItems) {
    byFile.set(normalizeFile(item.file), {
      ...item,
      themeId: markScope(item.themeId || slugify(item.themeTitle), "public-gap-plan"),
    });
  }

  for (const [index, launchItem] of launchItems.entries()) {
    const file = normalizeFile(launchItem.file);
    const existing = byFile.get(file);
    if (existing) {
      byFile.set(file, {
        ...existing,
        reviewFocus: dedupe([...existing.reviewFocus, ...launchItem.reviewFocus]),
        searchSeeds: dedupe([...existing.searchSeeds, ...launchItem.searchQueries]),
        sourceTargets: dedupe([...existing.sourceTargets, ...launchItem.sourceTargets]),
        themeId: markScope(existing.themeId, "broad-first-coverage"),
      });
      continue;
    }

    byFile.set(file, {
      approvalWave: Math.floor(index / 2) + 1,
      file: launchItem.file,
      gapScore: launchItem.gapScore,
      missingSubtopics: [],
      primaryKeyword: launchItem.primaryKeyword,
      reviewFocus: launchItem.reviewFocus,
      searchSeeds: launchItem.searchQueries,
      sourceTargets: launchItem.sourceTargets,
      themeId: markScope(slugify(launchItem.cluster), "broad-first-coverage"),
      themeTitle: launchItem.cluster,
      title: launchItem.title,
    });
  }

  return [...byFile.values()].sort((a, b) => b.gapScore - a.gapScore || a.file.localeCompare(b.file));
}

function getItemScope(item: GapPlanItem): PreflightItem["scope"] {
  return [
    item.themeId.includes("public-gap-plan") ? "public-gap-plan" : null,
    item.themeId.includes("broad-first-coverage") ? "broad-first-coverage" : null,
  ].filter(Boolean) as PreflightItem["scope"];
}

function markScope(value: string, scope: string) {
  return value.includes(scope) ? value : `${value}__${scope}`;
}

function dedupe(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function isStructuredDataReady(data: Record<string, unknown>, slug: string) {
  const canonical = stringValue(data.canonical);
  const expectedCanonical = `${siteUrl}/blog/${slug}`;
  return Boolean(
    stringValue(data.title) &&
      stringValue(data.description) &&
      isKebabSlug(slug) &&
      isIsoDate(stringValue(data.date)) &&
      isIsoDate(stringValue(data.updatedAt)) &&
      stringValue(data.author) &&
      stringValue(data.category) &&
      stringValue(data.contentType) &&
      stringValue(data.difficulty) &&
      getStringArray(data.tags).length > 0 &&
      canonical === expectedCanonical,
  );
}

function suggestPublicLinks(article: ReturnType<typeof readArticle>, relativeFile: string, publicArticles: PublicArticle[]) {
  const category = stringValue(article.data.category);
  const primaryKeyword = stringValue(article.data.primaryKeyword);
  const tags = getStringArray(article.data.tags);
  const title = stringValue(article.data.title);
  const existingLinks = new Set(extractInternalLinks(article.content));
  const candidateTerms = terms([title, category, primaryKeyword, ...tags, article.content.slice(0, 1200)].join(" "));

  return publicArticles
    .filter((publicArticle) => publicArticle.file !== relativeFile && !existingLinks.has(`/blog/${publicArticle.slug}`))
    .map((publicArticle) => {
      const publicTerms = terms([publicArticle.title, publicArticle.category, publicArticle.primaryKeyword, ...publicArticle.tags].join(" "));
      const overlap = [...candidateTerms].filter((term) => publicTerms.has(term));
      const sameCategory = category && publicArticle.category === category;
      const sharedTags = tags.filter((tag) => publicArticle.tags.includes(tag));
      const score = overlap.length * 4 + sharedTags.length * 8 + (sameCategory ? 30 : 0);
      return {
        reason: [
          sameCategory ? `same category: ${category}` : "",
          sharedTags.length ? `shared tags: ${sharedTags.join(", ")}` : "",
          overlap.length ? `keyword overlap: ${overlap.slice(0, 6).join(", ")}` : "fallback public crawl path",
        ].filter(Boolean).join("; "),
        score: score || 1,
        title: publicArticle.title,
        url: `/blog/${publicArticle.slug}`,
      };
    })
    .sort((a, b) => b.score - a.score || a.url.localeCompare(b.url))
    .slice(0, 5);
}

function toWaveSummaries(items: PreflightItem[]) {
  const waveNumbers = [...new Set(items.map((item) => item.approvalWave))].sort((a, b) => a - b);
  return waveNumbers.map((wave) => {
    const waveItems = items.filter((item) => item.approvalWave === wave);
    return {
      blockingItems: waveItems.filter((item) => item.blockingIssues.length > 0).length,
      files: waveItems.map((item) => item.file),
      readyItems: waveItems.filter((item) => item.readyForManualReview).length,
      themes: waveItems.map((item) => item.themeTitle),
      warningItems: waveItems.filter((item) => item.warningIssues.length > 0).length,
      wave,
    };
  });
}

function countExactSeedMatches(seeds: string[], text: string) {
  const haystack = normalizeText(text);
  return seeds.filter((seed) => haystack.includes(normalizeText(seed))).length;
}

function countSeedFamilyMatches(seeds: string[], text: string) {
  const haystackTerms = terms(text);
  return seeds.filter((seed) => [...terms(seed)].some((term) => haystackTerms.has(term))).length;
}

function extractInternalLinks(content: string) {
  const links = new Set<string>();
  const linkPattern = /\]\((\/[^)\s#?]+)(?:[?#][^)]*)?\)/g;
  for (const match of content.matchAll(linkPattern)) links.add(match[1]);
  return [...links];
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim()) : [];
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isKebabSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function terms(text: string) {
  const normalized = text.toLowerCase();
  const words = normalized.match(/[a-z0-9][a-z0-9-]{1,}|[\u4e00-\u9fa5]{2,}/g) || [];
  const output = new Set(words.filter((word) => !stopWords.has(word)));
  const chineseRuns = normalized.match(/[\u4e00-\u9fa5]{3,}/g) || [];
  for (const run of chineseRuns) {
    for (let index = 0; index < run.length - 1; index += 1) output.add(run.slice(index, index + 2));
  }
  return output;
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  blockingItems: PreflightItem[];
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: PreflightItem[];
  sourceEvidence: { broadFirstCoverageGuardrails?: unknown; broadFirstCoverageSummary?: unknown; gapPlanGuardrails: unknown; note: string };
  summary: Record<string, number>;
  warningItems: PreflightItem[];
  waveSummaries: Array<{ blockingItems: number; files: string[]; readyItems: number; themes: string[]; warningItems: number; wave: number }>;
}) {
  const lines = [
    "# Public Coverage Gap Preflight",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It checks the public coverage gap plan candidates before any human review or publishing action.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Source Evidence",
    "",
    `- Note: ${payload.sourceEvidence.note}`,
    `- Gap plan guardrails: ${JSON.stringify(payload.sourceEvidence.gapPlanGuardrails)}`,
    `- Broad first coverage guardrails: ${JSON.stringify(payload.sourceEvidence.broadFirstCoverageGuardrails)}`,
    `- Broad first coverage summary: ${JSON.stringify(payload.sourceEvidence.broadFirstCoverageSummary)}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Wave Summary",
    "",
    "| Wave | Ready | Blocking | Warning | Themes | Files |",
    "| --- | --- | --- | --- | --- | --- |",
    ...payload.waveSummaries.map((item) => `| ${item.wave} | ${item.readyItems}/${item.files.length} | ${item.blockingItems} | ${item.warningItems} | ${item.themes.join("<br>")} | ${item.files.join("<br>")} |`),
    "",
    "## Blocking Items",
    "",
    ...table(payload.blockingItems),
    "",
    "## Warning Items",
    "",
    ...table(payload.warningItems),
    "",
    "## All Items",
    "",
    ...table(payload.items),
    "",
  ];
  return lines.join("\n");
}

function table(items: PreflightItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Wave | Scope | Ready | Score | Quality | Snippet | Links | Seeds | Structured | Blocking | Warnings | Theme | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.approvalWave} | ${item.scope.join(", ")} | ${item.readyForManualReview} | ${item.gapScore} | ${item.qualityScore} | ${item.titleLength}/${item.descriptionLength} | ${item.linksToPublicArticles}/${item.internalLinks} + ${item.publicLinkSuggestions.length} suggestions | ${item.exactSeedMatches}/${item.seedFamilyMatches} | ${item.structuredDataReady} | ${item.blockingIssues.length ? item.blockingIssues.join("<br>") : "none"} | ${item.warningIssues.length ? item.warningIssues.join("<br>") : "none"} | ${item.themeTitle} | ${item.title} | ${item.file} |`,
    ),
  ];
}

const stopWords = new Set(["the", "and", "with", "for", "guide", "tutorial", "beginner", "article", "draft"]);

void main();
