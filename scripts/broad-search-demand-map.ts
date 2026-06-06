import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type ArticleSummary = {
  category: string;
  file: string;
  humanReviewRequired: boolean;
  noindex: boolean;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  slug: string;
  sourceNotes: boolean;
  status: string;
  title: string;
};

type DemandTheme = {
  audience: string;
  id: string;
  priority: number;
  reviewFocus: string[];
  searchSeeds: string[];
  sourceTargets: string[];
  subtopics: string[];
  terms: string[];
  title: string;
};

type Candidate = {
  file: string;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  title: string;
};

type ThemeCoverage = DemandTheme & {
  candidateDrafts: Candidate[];
  draftMatches: number;
  gapScore: number;
  missingSubtopics: string[];
  plannedWaveMatches: number;
  publicMatches: number;
  readyDrafts: number;
  reviewPackMatches: number;
};

const officialSources = {
  anthropicPrompt: "Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
  dify: "Dify docs: https://docs.dify.ai",
  huggingFace: "Hugging Face docs: https://huggingface.co/docs",
  langChain: "LangChain docs: https://python.langchain.com/docs",
  llamaIndex: "LlamaIndex docs: https://docs.llamaindex.ai",
  n8n: "n8n docs: https://docs.n8n.io",
  ollama: "Ollama docs: https://docs.ollama.com",
  openaiAgents: "OpenAI Agents docs: https://platform.openai.com/docs/guides/agents",
  openaiApi: "OpenAI API docs: https://platform.openai.com/docs",
  openaiPrompt: "OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering",
  openaiRetrieval: "OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval",
  vercelAiSdk: "Vercel AI SDK docs: https://ai-sdk.dev/docs",
  vllm: "vLLM docs: https://docs.vllm.ai",
};

const themes: DemandTheme[] = [
  {
    audience: "Beginners and teams searching how to put AI apps, model APIs, and agent tools online.",
    id: "ai-app-and-api-deployment",
    priority: 100,
    reviewFocus: ["current official docs", "environment variables and API keys", "rate limits, logs, rollback, and smoke checks"],
    searchSeeds: ["AI app deployment tutorial", "OpenAI API deployment", "Vercel AI SDK deployment", "Claude API Next.js deployment"],
    sourceTargets: [officialSources.openaiApi, officialSources.vercelAiSdk, officialSources.anthropicPrompt],
    subtopics: ["nextjs", "vercel", "api key", "rate limit", "smoke check", "rollback"],
    terms: ["deployment", "deploy", "vercel", "openai api", "claude api", "gemini api", "api key"],
    title: "AI app and model API deployment",
  },
  {
    audience: "Developers moving from chatbot demos to production agents and workflow automation.",
    id: "agent-deployment-and-tools",
    priority: 98,
    reviewFocus: ["tool permissions", "multi-step state", "human approval", "observability and fallback paths"],
    searchSeeds: ["AI Agent deployment tutorial", "agent tool calling tutorial", "OpenAI Agents SDK beginner guide", "Vercel AI SDK agent"],
    sourceTargets: [officialSources.openaiAgents, officialSources.vercelAiSdk, officialSources.langChain],
    subtopics: ["tool calling", "human review", "permissions", "logs", "workflow", "handoff"],
    terms: ["agent", "agents sdk", "tool calling", "workflow", "human review", "mcp"],
    title: "Agent deployment, tool calling, and production workflows",
  },
  {
    audience: "Support, operations, and internal knowledge teams building document Q&A and memory features.",
    id: "rag-knowledge-memory",
    priority: 96,
    reviewFocus: ["RAG versus fine-tuning", "chunking and embeddings", "citations", "evaluation and privacy"],
    searchSeeds: ["RAG knowledge base tutorial", "AI agent memory", "vector database RAG", "enterprise knowledge base AI"],
    sourceTargets: [officialSources.openaiRetrieval, officialSources.langChain, officialSources.llamaIndex],
    subtopics: ["rag", "knowledge base", "embedding", "vector database", "citation", "evaluation", "memory"],
    terms: ["rag", "knowledge", "memory", "embedding", "vector", "pgvector", "retrieval"],
    title: "RAG, knowledge base, and agent memory",
  },
  {
    audience: "Builders evaluating local or open-source models for privacy, cost, and experimentation.",
    id: "local-and-open-models",
    priority: 92,
    reviewFocus: ["hardware sizing", "model size and quantization", "local API exposure", "privacy caveats"],
    searchSeeds: ["local LLM deployment", "Ollama local model tutorial", "Open WebUI deployment", "local AI model GPU memory"],
    sourceTargets: [officialSources.ollama, officialSources.huggingFace, officialSources.vllm],
    subtopics: ["ollama", "open webui", "gpu memory", "quantization", "local api", "model download"],
    terms: ["local", "ollama", "open webui", "lm studio", "gpu", "quantization"],
    title: "Local and open-source model deployment",
  },
  {
    audience: "Engineering teams serving open models on GPUs or managed serverless inference platforms.",
    id: "llm-serving-gpu",
    priority: 90,
    reviewFocus: ["serving framework versions", "cold starts and concurrency", "GPU cost", "autoscaling and monitoring"],
    searchSeeds: ["vLLM deployment tutorial", "Hugging Face TGI deployment", "RunPod serverless LLM", "serverless GPU LLM deployment"],
    sourceTargets: [officialSources.vllm, officialSources.huggingFace],
    subtopics: ["vllm", "tgi", "runpod", "serverless gpu", "concurrency", "autoscaling"],
    terms: ["vllm", "tgi", "runpod", "modal", "ray serve", "bentoml", "gpu"],
    title: "LLM serving, GPU, and managed inference",
  },
  {
    audience: "No-code builders and operators using Dify, n8n, Flowise, Coze, and webhooks.",
    id: "nocode-ai-automation",
    priority: 88,
    reviewFocus: ["self-hosted versus cloud boundaries", "webhook auth", "connector failures", "manual fallback"],
    searchSeeds: ["Dify deployment tutorial", "n8n AI agent self hosted", "Flowise local deployment", "Dify workflow error handling"],
    sourceTargets: [officialSources.dify, officialSources.n8n],
    subtopics: ["dify", "n8n", "flowise", "webhook", "self hosted", "connector"],
    terms: ["dify", "n8n", "flowise", "coze", "webhook", "workflow"],
    title: "Dify, n8n, Flowise, and no-code AI automation",
  },
  {
    audience: "Business teams searching reusable prompts for departments instead of one-off ChatGPT tricks.",
    id: "cross-industry-prompts",
    priority: 100,
    reviewFocus: ["input fields", "output formats", "quality checks", "risk disclaimers", "prompt versioning"],
    searchSeeds: ["ChatGPT prompts for business", "AI prompt template library", "industry AI prompts", "best AI prompts for work"],
    sourceTargets: [officialSources.openaiPrompt, officialSources.anthropicPrompt],
    subtopics: ["marketing", "sales", "customer service", "hr", "finance", "legal", "education", "software"],
    terms: ["prompt", "prompts", "template", "marketing", "sales", "customer", "hr", "finance", "legal", "education"],
    title: "Cross-industry AI prompt templates",
  },
  {
    audience: "Teams deciding where AI actually fits across sales, support, operations, HR, finance, and product.",
    id: "business-ai-workflows",
    priority: 86,
    reviewFocus: ["workflow owner", "handoff and approval", "measurable output", "risk boundary"],
    searchSeeds: ["AI workflow examples", "AI use cases for business", "AI automation workflow", "department AI SOP"],
    sourceTargets: [officialSources.openaiPrompt, officialSources.vercelAiSdk],
    subtopics: ["sales", "support", "operations", "sop", "product", "weekly report"],
    terms: ["workflow", "sop", "operations", "sales", "support", "product manager", "weekly review"],
    title: "Business AI workflows and SOP templates",
  },
  {
    audience: "Teams putting agents and RAG into production and needing evidence that outputs are reliable.",
    id: "evals-observability-security",
    priority: 84,
    reviewFocus: ["traces and logs", "evaluation datasets", "prompt injection", "cost and quality drift"],
    searchSeeds: ["LLM observability", "RAG evaluation", "AI agent logs", "prompt injection defense"],
    sourceTargets: [officialSources.openaiAgents, officialSources.openaiRetrieval, officialSources.langChain],
    subtopics: ["observability", "evaluation", "logs", "prompt injection", "security", "cost tracking"],
    terms: ["observability", "eval", "evaluation", "prompt injection", "security", "logs", "tracing"],
    title: "LLM evaluation, observability, and security",
  },
  {
    audience: "Freelancers and service sellers packaging AI deployment and automation work for clients.",
    id: "ai-service-pricing-scope",
    priority: 80,
    reviewFocus: ["scope boundaries", "acceptance criteria", "maintenance fee", "no income guarantees"],
    searchSeeds: ["AI automation project pricing", "AI agent project scope", "RAG project quote", "Dify n8n project pricing"],
    sourceTargets: [officialSources.openaiApi, officialSources.vercelAiSdk, officialSources.dify],
    subtopics: ["pricing", "scope", "acceptance", "maintenance", "handoff", "risk"],
    terms: ["pricing", "scope", "freelance", "proposal", "quote", "acceptance", "maintenance"],
    title: "AI service pricing, scope, and delivery",
  },
];

async function main() {
  const articles = (await articleFiles()).map(toArticleSummary);
  const reviewPackFiles = loadFileSet("content/automation/publish-readiness-pack.json", (payload) => asArray(payload.items));
  const plannedWaveFiles = loadFileSet("content/automation/search-intent-wave-planner.json", (payload) =>
    asArray(payload.waves).flatMap((wave) => (hasItems(wave) ? asArray(wave.items) : [])),
  );

  const coverage = themes.map((theme) => buildThemeCoverage(theme, articles, reviewPackFiles, plannedWaveFiles)).sort((a, b) => b.gapScore - a.gapScore);
  const allCandidates = coverage.flatMap((item) => item.candidateDrafts.map((candidate) => candidate.file));
  const publicGaps = coverage.filter((item) => item.publicMatches === 0);
  const readyThemes = coverage.filter((item) => item.readyDrafts > 0);
  const missingSubtopics = coverage.reduce((total, item) => total + item.missingSubtopics.length, 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only broad-demand map. It prioritizes likely user-search themes from the local content inventory and official source targets; it does not claim keyword volume, rankings, clicks, or traffic.",
    },
    sourceEvidence: {
      note: "Source targets are official documentation pages for manual fact review. Search seeds are editorial demand seeds, not measured keyword-volume data.",
      officialSources: [...new Set(Object.values(officialSources))],
    },
    summary: {
      themes: coverage.length,
      themesWithReadyDrafts: readyThemes.length,
      themesWithoutPublicCoverage: publicGaps.length,
      totalReadyDraftMatches: coverage.reduce((total, item) => total + item.readyDrafts, 0),
      uniqueCandidateFiles: new Set(allCandidates).size,
      reviewPackThemeMatches: coverage.reduce((total, item) => total + item.reviewPackMatches, 0),
      plannedWaveThemeMatches: coverage.reduce((total, item) => total + item.plannedWaveMatches, 0),
      missingSubtopics,
      maxGapScore: coverage[0]?.gapScore || 0,
    },
    topThemes: coverage.slice(0, 8),
    themes: coverage,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "broad-search-demand-map.json");
  const mdTarget = path.join(process.cwd(), "docs", "broad-search-demand-map.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: readyThemes.length === coverage.length, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (readyThemes.length !== coverage.length) process.exitCode = 1;
}

function toArticleSummary(file: string): ArticleSummary {
  const article = readArticle(file);
  const result = checkFile(file);
  return {
    category: String(article.data.category || ""),
    file: rel(article.file),
    humanReviewRequired: article.data.humanReviewRequired === true,
    noindex: article.data.noindex === true,
    primaryKeyword: String(article.data.primaryKeyword || ""),
    publishBatch: typeof article.data.publishBatch === "number" ? article.data.publishBatch : null,
    qualityScore: result.qualityScore,
    searchIntent: String(article.data.searchIntent || ""),
    slug: String(article.data.slug || ""),
    sourceNotes: Boolean(article.data.sourceNotes),
    status: String(article.data.status || ""),
    title: String(article.data.title || ""),
  };
}

function buildThemeCoverage(theme: DemandTheme, articles: ArticleSummary[], reviewPackFiles: Set<string>, plannedWaveFiles: Set<string>): ThemeCoverage {
  const matches = articles.filter((article) => matchesTheme(article, theme));
  const readyMatches = matches.filter(isReviewReady);
  const candidateDrafts = readyMatches.sort(compareCandidate).slice(0, 8).map(toCandidate);
  const publicMatches = matches.filter((article) => article.status === "published").length;
  const missingSubtopics = theme.subtopics.filter((subtopic) => !matches.some((article) => searchableText(article).includes(normalize(subtopic))));
  const reviewPackMatches = readyMatches.filter((article) => reviewPackFiles.has(article.file)).length;
  const plannedWaveMatches = readyMatches.filter((article) => plannedWaveFiles.has(article.file)).length;
  const gapScore =
    theme.priority * 2 +
    (publicMatches === 0 ? 80 : Math.max(0, 30 - publicMatches * 5)) +
    missingSubtopics.length * 8 +
    Math.min(readyMatches.length, 10) * 4 +
    reviewPackMatches * 10 +
    plannedWaveMatches * 6;

  return {
    ...theme,
    candidateDrafts,
    draftMatches: matches.filter((article) => article.status === "draft").length,
    gapScore,
    missingSubtopics,
    plannedWaveMatches,
    publicMatches,
    readyDrafts: readyMatches.length,
    reviewPackMatches,
  };
}

function matchesTheme(article: ArticleSummary, theme: DemandTheme) {
  const text = searchableText(article);
  return theme.terms.some((term) => text.includes(normalize(term)));
}

function isReviewReady(article: ArticleSummary) {
  return article.status === "draft" && article.noindex === true && article.humanReviewRequired === true && article.sourceNotes && article.qualityScore >= 100;
}

function compareCandidate(a: ArticleSummary, b: ArticleSummary) {
  if ((b.publishBatch || 0) !== (a.publishBatch || 0)) return (b.publishBatch || 0) - (a.publishBatch || 0);
  if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
  return a.slug.localeCompare(b.slug);
}

function toCandidate(article: ArticleSummary): Candidate {
  return {
    file: article.file,
    primaryKeyword: article.primaryKeyword,
    publishBatch: article.publishBatch,
    qualityScore: article.qualityScore,
    searchIntent: article.searchIntent,
    title: article.title,
  };
}

function searchableText(article: ArticleSummary) {
  return normalize(`${article.title} ${article.category} ${article.primaryKeyword} ${article.searchIntent} ${article.slug} ${article.file}`);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ");
}

function loadFileSet(relativePath: string, pickItems: (payload: Record<string, unknown>) => unknown[]) {
  const target = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(target)) return new Set<string>();
  const payload = JSON.parse(fs.readFileSync(target, "utf8").replace(/^\uFEFF/, "")) as Record<string, unknown>;
  return new Set(
    pickItems(payload)
      .map((item) => (hasFile(item) ? item.file : ""))
      .filter((file): file is string => Boolean(file)),
  );
}

function hasFile(value: unknown): value is { file: string } {
  return typeof value === "object" && value !== null && "file" in value && typeof (value as { file?: unknown }).file === "string";
}

function hasItems(value: unknown): value is { items?: unknown[] } {
  return typeof value === "object" && value !== null && "items" in value;
}

function asArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string };
  sourceEvidence: { note: string; officialSources: string[] };
  summary: Record<string, number>;
  themes: ThemeCoverage[];
  topThemes: ThemeCoverage[];
}) {
  const lines = [
    "# Broad Search Demand Map",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns broad user-search demand areas into a review and content-gap map. It does not publish, mark review, claim keyword volume, or claim traffic.",
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
    "## Top Themes",
    "",
    ...themeTable(payload.topThemes),
    "",
  ];

  for (const theme of payload.topThemes) {
    lines.push(
      `## ${theme.title}`,
      "",
      `- ID: ${theme.id}`,
      `- Audience: ${theme.audience}`,
      `- Gap score: ${theme.gapScore}`,
      `- Public matches: ${theme.publicMatches}`,
      `- Ready drafts: ${theme.readyDrafts}`,
      `- Review pack matches: ${theme.reviewPackMatches}`,
      `- Planned wave matches: ${theme.plannedWaveMatches}`,
      `- Missing subtopics: ${theme.missingSubtopics.length ? theme.missingSubtopics.join(", ") : "none"}`,
      "",
      "Search seeds:",
      "",
      ...theme.searchSeeds.map((seed) => `- ${seed}`),
      "",
      "Review focus:",
      "",
      ...theme.reviewFocus.map((focus) => `- ${focus}`),
      "",
      "Source targets:",
      "",
      ...theme.sourceTargets.map((source) => `- ${source}`),
      "",
      "Ready draft candidates:",
      "",
      ...candidateTable(theme.candidateDrafts),
      "",
    );
  }

  lines.push("## All Themes", "", ...themeTable(payload.themes), "");
  return lines.join("\n");
}

function themeTable(items: ThemeCoverage[]) {
  if (!items.length) return ["- none"];
  return [
    "| Score | Priority | Public | Drafts | Ready | Review pack | Planned wave | Missing subtopics | Theme |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.gapScore} | ${item.priority} | ${item.publicMatches} | ${item.draftMatches} | ${item.readyDrafts} | ${item.reviewPackMatches} | ${item.plannedWaveMatches} | ${item.missingSubtopics.join(", ") || "none"} | ${item.title} |`,
    ),
  ];
}

function candidateTable(items: Candidate[]) {
  if (!items.length) return ["- none"];
  return [
    "| Batch | Score | Intent | Keyword | Title | File |",
    "| --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => `| ${item.publishBatch ?? ""} | ${item.qualityScore} | ${item.searchIntent} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`),
  ];
}

void main();
