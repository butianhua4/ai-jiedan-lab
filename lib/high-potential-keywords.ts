import { getQuestionOptimizationList } from "@/lib/q-optimization-list";

export type HighPotentialKeyword = {
  keyword: string;
  sourcePath: string;
  sourceUrl: string;
  category: string;
  cluster: string;
  intent: string;
  market: "US/global";
  priority: "P0" | "P1" | "P2";
  reason: string;
  nextAction: string;
};

export type HighPotentialKeywordList = {
  generatedAt: string;
  source: string;
  caveat: string;
  total: number;
  groups: Array<{
    group: string;
    count: number;
    priority: "P0" | "P1" | "P2";
    examples: string[];
  }>;
  keywords: HighPotentialKeyword[];
};

const intentPriority: Record<string, HighPotentialKeyword["priority"]> = {
  error: "P0",
  checklist: "P1",
  commercial: "P1",
  comparison: "P1",
  guide: "P2",
};

export function getHighPotentialKeywordList(limit = 120): HighPotentialKeywordList {
  const qItems = getQuestionOptimizationList(Math.max(limit, 50)).items;
  const keywords = qItems.flatMap((item) => {
    const sourceSlug = item.path.split("/").filter(Boolean).at(-1) || item.path;
    const intent = normalizeIntent(item.searchIntent, sourceSlug);
    const base = cleanBase(humanizePath(sourceSlug), intent);
    const phrases = buildKeywordPhrases(base, intent);

    return phrases.map((keyword): HighPotentialKeyword => ({
      keyword,
      sourcePath: item.path,
      sourceUrl: item.url,
      category: item.category,
      cluster: item.cluster,
      intent,
      market: "US/global",
      priority: intentPriority[intent] || "P2",
      reason: getReason(intent),
      nextAction: getNextAction(intent),
    }));
  });

  const deduped = dedupeKeywords(keywords).slice(0, limit);

  return {
    generatedAt: new Date().toISOString(),
    source: "Existing published q-page priority list and internal SEO graph",
    caveat: "No fake volume, CPC, ranking, or Search Console metrics are included. Add real GSC/Bing/Ahrefs data after the pages receive impressions.",
    total: deduped.length,
    groups: groupKeywords(deduped),
    keywords: deduped,
  };
}

function buildKeywordPhrases(base: string, intent: string) {
  if (intent === "error") {
    const hasErrorWord = /\b(errors?|debug|failed|fix|troubleshoot)\b/i.test(base);
    return [`how to fix ${base}`, hasErrorWord ? `${base} solution` : `${base} error fix`, `${base} troubleshooting`];
  }
  if (intent === "checklist") {
    return [`${base} checklist`, `${base} production checklist`, `how to verify ${base}`];
  }
  if (intent === "commercial") {
    return [`${base} pricing`, `${base} project scope`, `${base} delivery checklist`];
  }
  if (intent === "comparison") {
    return [`${base} comparison`, `${base} vs alternatives`, `best option for ${base}`];
  }
  return [`how to ${base}`, `${base} guide`, `${base} step by step`];
}

function normalizeIntent(searchIntent: string, path: string) {
  const text = `${searchIntent} ${path}`.toLowerCase();
  if (/error|failed|fix|debug|troubleshoot|401|403|429|command-not-found|not-found|mismatch/.test(text)) return "error";
  if (/checklist/.test(text)) return "checklist";
  if (/pricing|proposal|rate|quote|scope|client|freelance/.test(text)) return "commercial";
  if (/compare|vs|alternative|best/.test(text)) return "comparison";
  return "guide";
}

function humanizePath(pathname: string) {
  return pathname
    .replace(/-/g, " ")
    .replace(/\bai\b/g, "AI")
    .replace(/\bapi\b/g, "API")
    .replace(/\brag\b/g, "RAG")
    .replace(/\bllm\b/g, "LLM")
    .replace(/\bseo\b/g, "SEO")
    .replace(/\bnpm\b/g, "npm")
    .replace(/\bjs\b/g, "JS")
    .trim();
}

function cleanBase(value: string, intent: string) {
  let result = value.replace(/\s+/g, " ").trim();
  if (intent === "error") result = result.replace(/\s+(fix|failed)$/i, "").trim();
  if (intent === "checklist") result = result.replace(/\s+checklist$/i, "").trim();
  if (intent === "guide") result = result.replace(/\s+guide$/i, "").trim();
  return result;
}

function getReason(intent: string) {
  if (intent === "error") return "Urgent problem query; likely to have clear search intent and high engagement if the fix is direct.";
  if (intent === "checklist") return "Pre-launch checklist query; useful for builders preparing deployment or production workflows.";
  if (intent === "commercial") return "Commercial or project-scope query; useful for future service and tool conversion.";
  if (intent === "comparison") return "Decision query; useful for tool comparison traffic and internal links to guides.";
  return "Evergreen guide query; useful as support content around stronger error and checklist pages.";
}

function getNextAction(intent: string) {
  if (intent === "error") return "Create or improve a q entry with quick fix, commands, rollback note, and related error links.";
  if (intent === "checklist") return "Create or improve a checklist page and link it from the matching cluster hub.";
  if (intent === "commercial") return "Add scope, pricing boundaries, risk notes, and a soft service CTA after the answer.";
  if (intent === "comparison") return "Add a decision table, constraints, and links to the compared tools or workflows.";
  return "Keep as support content and use it to link into P0/P1 problem pages.";
}

function dedupeKeywords(items: HighPotentialKeyword[]) {
  const seen = new Set<string>();
  const priorityRank = { P0: 0, P1: 1, P2: 2 };
  return items
    .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority] || a.keyword.localeCompare(b.keyword))
    .filter((item) => {
      const key = item.keyword.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function groupKeywords(items: HighPotentialKeyword[]) {
  return (["P0", "P1", "P2"] as const).map((priority) => {
    const groupItems = items.filter((item) => item.priority === priority);
    return {
      group: priority === "P0" ? "urgent fixes" : priority === "P1" ? "checklists, comparisons, commercial intent" : "supporting guides",
      count: groupItems.length,
      priority,
      examples: groupItems.slice(0, 8).map((item) => item.keyword),
    };
  });
}
