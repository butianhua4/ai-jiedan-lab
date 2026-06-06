import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type WaveItem = {
  file: string;
  intentSeeds: string[];
  laneId: string;
  lanePriorityScore: number;
  laneTitle: string;
  primaryKeyword: string;
  readyForHumanReview: boolean;
  reviewFocus: string[];
  safeDraft: boolean;
  sourceTargets: string[];
  title: string;
  workflowAngles: string[];
};

type Wave = {
  focus: string;
  items: WaveItem[];
  wave: number;
};

type SearchIntentWavePlanner = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  summary: { plannedItems: number; plannedWaves: number; uniqueLanes: number; unsafeItems: number };
  waves: Wave[];
};

type QueryItem = {
  file: string;
  gaps: string[];
  laneId: string;
  laneTitle: string;
  primaryKeyword: string;
  queryCount: number;
  queryFamilies: Record<string, string[]>;
  readyForManualReview: boolean;
  title: string;
  wave: number;
};

const minQueriesPerItem = 10;
const minFamiliesPerItem = 5;

function main() {
  const planner = readJson<SearchIntentWavePlanner>("content/automation/search-intent-wave-planner.json");
  const items = planner.waves.flatMap((wave) => wave.items.map((item) => toQueryItem(item, wave.wave)));
  const unsafeItems = items.filter((item) => !item.readyForManualReview);
  const uniqueQueries = new Set(items.flatMap((item) => Object.values(item.queryFamilies).flat()).map(normalizeQuery));
  const uniqueFiles = new Set(items.map((item) => normalizeFile(item.file)));
  const uniqueLanes = new Set(items.map((item) => item.laneId));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only search-query coverage planner. Query variants are editorial review prompts, not measured search volume, ranking, click, or traffic claims.",
      stopBefore: "Use the query list to guide human review and content expansion. Do not publish or mark review without explicit human approval.",
    },
    summary: {
      items: items.length,
      minFamiliesPerItem,
      minQueriesPerItem,
      plannerItems: planner.summary.plannedItems,
      plannerWaves: planner.summary.plannedWaves,
      readyItems: items.filter((item) => item.readyForManualReview).length,
      unsafeItems: unsafeItems.length,
      uniqueFiles: uniqueFiles.size,
      uniqueLanes: uniqueLanes.size,
      uniqueQueries: uniqueQueries.size,
    },
    sourceEvidence: {
      plannerGuardrails: planner.guardrails,
      note: "Queries are derived from approved search-intent waves, primary keywords, lane intent seeds, review focus, and common how-to/template/comparison/troubleshooting modifiers.",
    },
    items,
    waves: planner.waves.map((wave) => ({
      focus: wave.focus,
      items: items.filter((item) => item.wave === wave.wave),
      queryCount: items
        .filter((item) => item.wave === wave.wave)
        .reduce((total, item) => total + item.queryCount, 0),
      wave: wave.wave,
    })),
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "search-query-coverage.json");
  const mdTarget = path.join(process.cwd(), "docs", "search-query-coverage.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0 && items.length === planner.summary.plannedItems, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length || items.length !== planner.summary.plannedItems) process.exitCode = 1;
}

function toQueryItem(item: WaveItem, wave: number): QueryItem {
  const base = clean(item.primaryKeyword) || clean(item.title);
  const familyBuilders: Array<[string, string[]]> = [
    ["howTo", unique([`${base}怎么做`, `${base}教程`, `${base}新手教程`, `${base}落地步骤`])],
    ["deployment", deploymentQueries(item, base)],
    ["template", unique([`${base}模板`, `${base}清单`, `${base}SOP`, `${base}方案`])],
    ["comparison", comparisonQueries(item, base)],
    ["risk", unique([`${base}避坑`, `${base}风险`, `${base}安全`, `${base}人工审核`])],
    ["costOps", unique([`${base}成本`, `${base}报价`, `${base}维护`, `${base}上线检查`])],
    ["intentSeeds", unique(item.intentSeeds.map(clean).filter(Boolean).slice(0, 6))],
  ];
  const queryFamilies = Object.fromEntries(familyBuilders.map(([family, queries]) => [family, queries.filter(Boolean)]));
  const queryCount = Object.values(queryFamilies).flat().length;
  const familyCount = Object.values(queryFamilies).filter((queries) => queries.length > 0).length;
  const gaps = [
    item.safeDraft ? "" : "source item is not a safe draft",
    item.readyForHumanReview ? "" : "source item is not ready for human review",
    queryCount >= minQueriesPerItem ? "" : `query count below ${minQueriesPerItem}`,
    familyCount >= minFamiliesPerItem ? "" : `query family count below ${minFamiliesPerItem}`,
    item.sourceTargets.length >= 2 ? "" : "missing source targets",
    item.reviewFocus.length >= 3 ? "" : "missing review focus",
  ].filter(Boolean);

  return {
    file: item.file,
    gaps,
    laneId: item.laneId,
    laneTitle: item.laneTitle,
    primaryKeyword: item.primaryKeyword,
    queryCount,
    queryFamilies,
    readyForManualReview: gaps.length === 0,
    title: item.title,
    wave,
  };
}

function deploymentQueries(item: WaveItem, base: string) {
  const laneTerms: Record<string, string[]> = {
    "agent-deployment-tools": ["AI Agent 部署", "Agent 工具调用", "Agent 上线检查"],
    "rag-knowledge-memory": ["RAG 知识库搭建", "Agent 记忆设计", "向量数据库检索"],
    "llm-deployment-serving": ["大模型部署", "LLM serving", "GPU 部署"],
    "local-open-models": ["本地大模型部署", "Ollama 部署", "Open WebUI 部署"],
    "nocode-ai-automation": ["Dify 工作流", "n8n AI Agent", "Webhook 自动化"],
    "industry-prompt-library": ["AI 提示词库", "ChatGPT 提示词模板", "行业提示词"],
    "business-ai-workflows": ["企业 AI 工作流", "部门 AI SOP", "业务 AI 自动化"],
  };

  return unique([`${base}部署`, `${base}工作流`, `${base}生产环境`, ...(laneTerms[item.laneId] || []), ...item.workflowAngles.map((angle) => `${base} ${angle}`)]);
}

function comparisonQueries(item: WaveItem, base: string) {
  const comparisons: Record<string, string[]> = {
    "agent-deployment-tools": ["AI Agent 和 Chatbot 区别", "Vercel AI SDK Agent vs OpenAI Agents SDK"],
    "rag-knowledge-memory": ["RAG 和微调区别", "知识库和长期记忆区别"],
    "llm-deployment-serving": ["vLLM 和 TGI 区别", "RunPod 和 Modal 部署对比"],
    "local-open-models": ["Ollama 和 LM Studio 区别", "本地部署和云 API 对比"],
    "nocode-ai-automation": ["Dify 和 n8n 区别", "Dify 和 Flowise 对比"],
    "industry-prompt-library": ["提示词模板和工作流区别", "行业提示词和通用提示词区别"],
    "business-ai-workflows": ["销售 AI 和客服 AI 工作流区别", "AI 工作流和自动化脚本区别"],
  };

  return unique([`${base}对比`, `${base}怎么选`, ...(comparisons[item.laneId] || [])]);
}

function clean(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function normalizeQuery(query: string) {
  return query.toLowerCase().replace(/\s+/g, "");
}

function unique(values: string[]) {
  return [...new Set(values.map(clean).filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
  waves: Array<{ focus: string; items: QueryItem[]; queryCount: number; wave: number }>;
}) {
  const lines = [
    "# Search Query Coverage",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It expands each planned review-wave article into user-search query variants for human review and SEO planning. It does not claim measured search volume.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Source Evidence",
    "",
    `- Note: ${payload.sourceEvidence.note}`,
    `- Planner guardrails: ${JSON.stringify(payload.sourceEvidence.plannerGuardrails)}`,
    "",
  ];

  for (const wave of payload.waves) {
    lines.push(
      `## Wave ${wave.wave}: ${wave.focus}`,
      "",
      `- Items: ${wave.items.length}`,
      `- Query variants: ${wave.queryCount}`,
      "",
      "| Ready | Queries | Lane | Primary keyword | Gaps | Title | File |",
      "| --- | --- | --- | --- | --- | --- | --- |",
      ...wave.items.map((item) => (
        `| ${item.readyForManualReview} | ${item.queryCount} | ${item.laneTitle} | ${item.primaryKeyword} | ${item.gaps.length ? item.gaps.join("<br>") : "none"} | ${item.title} | ${item.file} |`
      )),
      "",
    );

    for (const item of wave.items) {
      lines.push(
        `### ${item.title}`,
        "",
        `- File: ${item.file}`,
        `- Lane: ${item.laneTitle}`,
        `- Primary keyword: ${item.primaryKeyword}`,
        "",
      );
      for (const [family, queries] of Object.entries(item.queryFamilies)) {
        lines.push(`${family}:`, "", ...queries.map((query) => `- ${query}`), "");
      }
    }
  }

  return lines.join("\n");
}

main();
