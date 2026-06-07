import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type DeploymentReviewItem = {
  category: string;
  commandBoundary: {
    markReviewAfterHumanApproval: string;
    publishConfirm: "not-included";
    publishDryRunAfterReview: string;
    stopBefore: string;
  };
  file: string;
  humanDecisionChecklist: string[];
  primaryKeyword: string;
  priorityScore: number;
  publicMatches: number;
  readyForHumanReview: boolean;
  riskChecks: string[];
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
  topic: string;
  workflowAngles: string[];
};

type DeploymentReviewPack = {
  generatedAt: string;
  items: DeploymentReviewItem[];
  sourceEvidence: {
    coverageGeneratedAt: string;
    officialSources: string[];
    trafficNote: string;
  };
  summary: {
    deploymentPublicArticles: number;
    items: number;
    unsafeItems: number;
  };
};

type MemoryLane = {
  audience: string;
  candidateFiles: string[];
  decisionChecks: string[];
  intent: string;
  laneId: string;
  priorityScore: number;
  publicMatches: number;
  searchQueries: string[];
  sourceTargets: string[];
  sprintWave: number;
  title: string;
  unsafeReasons: string[];
};

type MemoryCandidate = {
  file: string;
  matchedLanes: string[];
  priorityScore: number;
  publishConfirm: "not-included";
  readyForMemorySprint: boolean;
  reviewActions: string[];
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
  unsafeReasons: string[];
};

const ITEMS_PER_WAVE = 3;

const laneSeeds = [
  {
    audience: "第一次给企业或客服系统做知识库问答的人",
    intent: "how-to",
    laneId: "rag-knowledge-base-setup",
    priorityScore: 410,
    searchQueries: ["RAG 知识库搭建教程", "企业知识库 AI 部署", "客服知识库 AI 怎么做", "RAG 和知识库区别"],
    title: "RAG 知识库搭建教程",
  },
  {
    audience: "正在做 Agent、但分不清上下文、状态和长期记忆的人",
    intent: "concept-and-design",
    laneId: "agent-long-term-memory",
    priorityScore: 405,
    searchQueries: ["AI Agent 记忆怎么做", "AI Agent 长期记忆", "Agent memory RAG 区别", "智能体记忆设计"],
    title: "AI Agent 长期记忆设计",
  },
  {
    audience: "需要把文档、客服话术、SOP 接入问答系统的运营和开发者",
    intent: "implementation",
    laneId: "document-ingestion-chunking",
    priorityScore: 395,
    searchQueries: ["RAG 文档切分怎么做", "知识库 chunk size 怎么设置", "RAG 文档上传流程", "文档向量化教程"],
    title: "RAG 文档切分和入库流程",
  },
  {
    audience: "纠结用哪种向量数据库、索引和检索方式的人",
    intent: "comparison",
    laneId: "vector-database-selection",
    priorityScore: 385,
    searchQueries: ["向量数据库怎么选", "RAG 向量数据库教程", "Pinecone Milvus Chroma 区别", "pgvector RAG 教程"],
    title: "向量数据库和检索方案选择",
  },
  {
    audience: "已经做出知识库 demo、但回答不准的人",
    intent: "troubleshooting",
    laneId: "rag-evaluation-hallucination",
    priorityScore: 380,
    searchQueries: ["RAG 评测怎么做", "RAG 幻觉怎么解决", "知识库回答不准怎么办", "RAG 引用来源怎么做"],
    title: "RAG 评测、引用和幻觉控制",
  },
  {
    audience: "要在企业内部上线知识库、担心权限和隐私的人",
    intent: "risk-and-governance",
    laneId: "memory-privacy-permission",
    priorityScore: 370,
    searchQueries: ["企业知识库权限怎么做", "AI 记忆隐私风险", "RAG 数据权限控制", "Agent 记忆保留多久"],
    title: "企业知识库权限、隐私和记忆保留",
  },
] as const;

function main() {
  const reviewPack = readJson<DeploymentReviewPack>("content/automation/ai-deployment-review-pack.json");
  const candidates = reviewPack.items.filter(isMemoryRelated).map(toCandidate);
  const lanes = laneSeeds
    .map((lane) => toLane(lane, candidates, reviewPack.sourceEvidence.officialSources))
    .sort((a, b) => b.priorityScore - a.priorityScore || a.laneId.localeCompare(b.laneId))
    .map((lane, index) => ({ ...lane, sprintWave: Math.floor(index / ITEMS_PER_WAVE) + 1 }));
  const waves = buildWaves(lanes);
  const unsafeItems = [...lanes.flatMap((lane) => lane.unsafeReasons.map((reason) => `${lane.laneId}: ${reason}`)), ...candidates.flatMap((item) => item.unsafeReasons.map((reason) => `${item.file}: ${reason}`))];

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only memory and RAG sprint board. It turns broad RAG, knowledge base, vector search, Agent memory, privacy, and evaluation demand into manual review lanes.",
      stopBefore: "Stop before article creation, article edits, mark:review, publish dry-run, or publish confirm until a human approves exact files and changes.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      deploymentReviewGeneratedAt: reviewPack.generatedAt,
      deploymentReviewSummary: reviewPack.summary,
      officialSources: reviewPack.sourceEvidence.officialSources,
      trafficNote: "Search queries are planning seeds only; no traffic, ranking, impression, click, conversion, revenue, benchmark, latency, or cost claim is made.",
    },
    summary: {
      candidateItems: candidates.length,
      decisionChecks: lanes.reduce((sum, lane) => sum + lane.decisionChecks.length, 0),
      deploymentPublicArticles: reviewPack.summary.deploymentPublicArticles,
      howToLanes: lanes.filter((lane) => lane.intent === "how-to" || lane.intent === "implementation").length,
      itemsPerWave: ITEMS_PER_WAVE,
      lanes: lanes.length,
      lanesWithCandidateFiles: lanes.filter((lane) => lane.candidateFiles.length > 0).length,
      privacyLanes: lanes.filter((lane) => lane.laneId.includes("privacy")).length,
      publishConfirmCommandsIncluded: 0,
      readyCandidates: candidates.filter((item) => item.readyForMemorySprint).length,
      readyLanes: lanes.filter((lane) => lane.unsafeReasons.length === 0).length,
      searchQueries: new Set(lanes.flatMap((lane) => lane.searchQueries)).size,
      sourceTargets: new Set(lanes.flatMap((lane) => lane.sourceTargets)).size,
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
      vectorLanes: lanes.filter((lane) => lane.laneId.includes("vector")).length,
      waves: waves.length,
    },
    unsafeItems,
    waves,
    lanes,
    candidates,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "memory-rag-sprint-board.json");
  const mdTarget = path.join(process.cwd(), "docs", "memory-rag-sprint-board.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function isMemoryRelated(item: DeploymentReviewItem) {
  const haystack = [item.file, item.category, item.primaryKeyword, item.topic, item.title, ...item.searchQueries, ...item.workflowAngles].join(" ").toLowerCase();
  return matches(haystack, ["rag", "memory", "记忆", "知识库", "向量", "retrieval", "vector", "knowledge", "chunk", "pgvector"]);
}

function toCandidate(item: DeploymentReviewItem): MemoryCandidate {
  const matchedLanes = laneSeeds.filter((lane) => matches(candidateHaystack(item), [lane.laneId, lane.title, ...lane.searchQueries])).map((lane) => lane.laneId);
  const reviewActions = [
    "Confirm the article explains the difference between prompt context, short-term state, long-term memory, and RAG retrieval.",
    "Verify chunking, embedding, retrieval, reranking, and citation claims against official or primary docs before human approval.",
    "Add a failure section for stale documents, hallucinated answers, missing citations, and permission leakage.",
    "Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.",
    "Do not include publish confirm commands in the handoff.",
    "Do not claim measured traffic, ranking, conversion, answer accuracy, latency, or cost without evidence.",
  ];
  const unsafeReasons = unsafeReasonsForCandidate(item, reviewActions);

  return {
    file: item.file,
    matchedLanes,
    priorityScore: item.priorityScore,
    publishConfirm: "not-included",
    readyForMemorySprint: unsafeReasons.length === 0,
    reviewActions,
    searchQueries: item.searchQueries,
    sourceTargets: item.sourceTargets,
    title: item.title,
    unsafeReasons,
  };
}

function toLane(seed: (typeof laneSeeds)[number], candidates: MemoryCandidate[], officialSources: string[]): MemoryLane {
  const candidateFiles = candidates.filter((candidate) => matches(candidateHaystack(candidate), [seed.laneId, seed.title, ...seed.searchQueries])).map((candidate) => candidate.file);
  const sourceTargets = dedupe([...officialSources.filter((source) => matches(source.toLowerCase(), ["agent", "langchain", "sdk", "vercel", "openai"])), "LangChain memory docs: https://docs.langchain.com/oss/python/deepagents/long-term-memory", "OpenAI Agents SDK docs: https://openai.github.io/openai-agents-js/guides/sandbox-agents/memory/"]).slice(0, 6);
  const decisionChecks = [
    "State the user problem first: knowledge base setup, Agent memory, document ingestion, vector retrieval, evaluation, or privacy.",
    "Separate implementation steps from conceptual explanation so beginners can scan the article.",
    "Require citations or source links for retrieval output claims.",
    "Call out privacy, permission, retention, and deletion boundaries before any production recommendation.",
    "Keep article candidates draft/noindex/humanReviewRequired until explicit approval.",
    "Do not claim traffic, ranking, accuracy, latency, or cost savings without measured evidence.",
  ];
  if (seed.laneId.includes("evaluation")) decisionChecks.push("Require an evaluation loop for test questions, expected citations, false positives, and hallucination review.");
  if (seed.laneId.includes("privacy")) decisionChecks.push("Require access-control, data-retention, audit-log, and human-escalation checks.");
  if (seed.laneId.includes("vector")) decisionChecks.push("Compare vector database options by data size, hosting, filtering, metadata, and operations burden.");

  const unsafeReasons: string[] = [];
  if (seed.searchQueries.length < 4) unsafeReasons.push("lane has too few broad search queries");
  if (sourceTargets.length < 2) unsafeReasons.push("lane has too few source targets");
  if (decisionChecks.length < 6) unsafeReasons.push("lane has too few decision checks");

  return {
    audience: seed.audience,
    candidateFiles: dedupe(candidateFiles),
    decisionChecks: dedupe(decisionChecks),
    intent: seed.intent,
    laneId: seed.laneId,
    priorityScore: seed.priorityScore,
    publicMatches: 0,
    searchQueries: [...seed.searchQueries],
    sourceTargets,
    sprintWave: 0,
    title: seed.title,
    unsafeReasons,
  };
}

function unsafeReasonsForCandidate(item: DeploymentReviewItem, reviewActions: string[]) {
  const reasons: string[] = [];
  if (!item.safeDraft) reasons.push("candidate is not a safe draft");
  if (!item.readyForHumanReview) reasons.push("candidate is not ready for human review");
  if (item.commandBoundary.publishConfirm !== "not-included") reasons.push("publish confirm command is included");
  if (!item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human")) reasons.push("mark review command is missing confirm-human boundary");
  if (item.commandBoundary.publishDryRunAfterReview.includes("--confirm")) reasons.push("publish dry-run includes confirm");
  if (!item.commandBoundary.stopBefore.includes("explicit human approval")) reasons.push("command boundary does not stop before explicit human approval");
  if (item.searchQueries.length < 3) reasons.push("too few search queries");
  if (item.sourceTargets.length < 2) reasons.push("too few source targets");
  if (item.humanDecisionChecklist.length < 7) reasons.push("human decision checklist is too short");
  if (item.riskChecks.length < 6) reasons.push("risk checks are too short");
  if (reviewActions.length < 6) reasons.push("review actions are too short");
  return dedupe(reasons);
}

function buildWaves(lanes: MemoryLane[]) {
  const waves = [];
  for (let index = 0; index < lanes.length; index += ITEMS_PER_WAVE) {
    const waveItems = lanes.slice(index, index + ITEMS_PER_WAVE);
    waves.push({
      audience: dedupe(waveItems.map((item) => item.audience)),
      candidateFiles: dedupe(waveItems.flatMap((item) => item.candidateFiles)),
      decisionChecks: dedupe(waveItems.flatMap((item) => item.decisionChecks)).slice(0, 12),
      items: waveItems.length,
      readyItems: waveItems.filter((item) => item.unsafeReasons.length === 0).length,
      searchQueries: dedupe(waveItems.flatMap((item) => item.searchQueries)).slice(0, 16),
      unsafeItems: waveItems.filter((item) => item.unsafeReasons.length > 0).length,
      wave: waves.length + 1,
    });
  }
  return waves;
}

function candidateHaystack(item: DeploymentReviewItem | MemoryCandidate) {
  if ("primaryKeyword" in item) return [item.file, item.category, item.primaryKeyword, item.topic, item.title, ...item.searchQueries, ...item.workflowAngles].join(" ").toLowerCase();
  return [item.file, item.title, ...item.searchQueries, ...item.matchedLanes].join(" ").toLowerCase();
}

function matches(value: string, terms: readonly string[]) {
  const normalized = value.toLowerCase();
  return terms.some((term) => normalized.includes(term.toLowerCase()));
}

function dedupe(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  summary: Record<string, boolean | number>;
  unsafeItems: string[];
  waves: ReturnType<typeof buildWaves>;
  lanes: MemoryLane[];
  candidates: MemoryCandidate[];
}) {
  const lines = [
    "# Memory RAG Sprint Board",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns broad RAG, knowledge base, vector search, Agent memory, privacy, and evaluation demand into manual review lanes.",
    "",
    "## Guardrails",
    "",
    `- Auto create articles: ${payload.guardrails.autoCreateArticles}`,
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item}`) : ["- none"]),
    "",
    "## Waves",
    "",
    "| Wave | Ready | Candidate files | Search queries | Decision checks |",
    "| ---: | ---: | --- | --- | --- |",
    ...payload.waves.map((wave) => `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.candidateFiles.join("<br>") || "none"} | ${wave.searchQueries.slice(0, 6).join("<br>")} | ${wave.decisionChecks.slice(0, 4).join("<br>")} |`),
    "",
    "## Memory Demand Lanes",
    "",
    "| Wave | Score | Intent | Lane | Candidate files | Queries | Sources | Title |",
    "| ---: | ---: | --- | --- | --- | ---: | ---: | --- |",
    ...payload.lanes.map((lane) => `| ${lane.sprintWave} | ${lane.priorityScore} | ${lane.intent} | ${lane.laneId} | ${lane.candidateFiles.join("<br>") || "none"} | ${lane.searchQueries.length} | ${lane.sourceTargets.length} | ${lane.title} |`),
    "",
    "## Candidate Bridges",
    "",
    "| Ready | Score | Lanes | Queries | Sources | Title | File |",
    "| --- | ---: | --- | ---: | ---: | --- | --- |",
    ...payload.candidates.map((item) => `| ${item.readyForMemorySprint} | ${item.priorityScore} | ${item.matchedLanes.join(", ") || "memory-adjacent"} | ${item.searchQueries.length} | ${item.sourceTargets.length} | ${item.title} | ${item.file} |`),
    "",
    "## Lane Review Actions",
    "",
  ];

  for (const lane of payload.lanes) {
    lines.push(`### ${lane.title}`);
    lines.push("");
    lines.push(`- Lane: ${lane.laneId}`);
    lines.push(`- Wave: ${lane.sprintWave}`);
    lines.push(`- Audience: ${lane.audience}`);
    lines.push(`- Intent: ${lane.intent}`);
    lines.push(`- Candidate files: ${lane.candidateFiles.join(", ") || "none"}`);
    lines.push("");
    lines.push("Search queries:");
    lines.push(...lane.searchQueries.map((query) => `- ${query}`));
    lines.push("");
    lines.push("Decision checks:");
    lines.push(...lane.decisionChecks.map((check) => `- ${check}`));
    lines.push("");
    lines.push("Source targets:");
    lines.push(...lane.sourceTargets.map((source) => `- ${source}`));
    lines.push("");
  }

  while (lines[lines.length - 1] === "") lines.pop();
  return `${lines.join("\n")}\n`;
}

main();
