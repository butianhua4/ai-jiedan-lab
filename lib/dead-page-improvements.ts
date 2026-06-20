import { detectSeoSignals } from "@/lib/seo-signal-detector";
import { getSeoGraph, type SeoNode } from "@/lib/seo-graph";

export type DeadPageImprovementItem = {
  path: string;
  title: string;
  type: SeoNode["type"];
  clusterSlug: SeoNode["clusterSlug"];
  incoming: number;
  outgoing: number;
  crawlEvents: number;
  severity: "dead" | "watch" | "opportunity";
  reason: string;
  actions: string[];
};

export type DeadPageImprovementReport = {
  generatedAt: string;
  evidence: string;
  summary: {
    structuralDeadPages: number;
    orphanPages: number;
    weakPages: number;
    watchCandidates: number;
    opportunityCandidates: number;
    gscConnected: false;
  };
  deadPages: DeadPageImprovementItem[];
  watchCandidates: DeadPageImprovementItem[];
  opportunityCandidates: DeadPageImprovementItem[];
  nextActions: string[];
};

export function getDeadPageImprovementReport(limit = 60): DeadPageImprovementReport {
  const graph = getSeoGraph();
  const signals = detectSeoSignals(graph);
  const crawlByPath = new Map(signals.risingPages.map((page) => [page.path, page.crawlEvents]));
  const structuralDead = uniqueNodes([...graph.orphanPages, ...graph.weakPages]);
  const deadPages = structuralDead.map((node) => toItem(node, crawlByPath.get(node.path) || 0, "dead"));

  const nonDeadNodes = graph.nodes.filter((node) => !structuralDead.some((dead) => dead.path === node.path));
  const watchCandidates = nonDeadNodes
    .filter((node) => node.type !== "cluster")
    .sort((a, b) => riskScore(b) - riskScore(a) || a.path.localeCompare(b.path))
    .slice(0, Math.floor(limit / 2))
    .map((node) => toItem(node, crawlByPath.get(node.path) || 0, "watch"));

  const opportunityCandidates = nonDeadNodes
    .filter((node) => node.type === "q" || node.type === "cluster")
    .sort((a, b) => opportunityScore(b) - opportunityScore(a) || a.path.localeCompare(b.path))
    .slice(0, Math.ceil(limit / 2))
    .map((node) => toItem(node, crawlByPath.get(node.path) || 0, "opportunity"));

  return {
    generatedAt: new Date().toISOString(),
    evidence:
      "This report reads the real SEO graph and local crawl log evidence only. Search Console impressions/clicks are not connected here, so pages are not marked dead because of missing traffic data alone.",
    summary: {
      structuralDeadPages: deadPages.length,
      orphanPages: graph.orphanPages.length,
      weakPages: graph.weakPages.length,
      watchCandidates: watchCandidates.length,
      opportunityCandidates: opportunityCandidates.length,
      gscConnected: false,
    },
    deadPages,
    watchCandidates,
    opportunityCandidates,
    nextActions: [
      deadPages.length
        ? "Repair structural dead pages first: add cluster links, related links, and incoming links before sitemap submission."
        : "No structural dead pages found; keep monitoring GSC coverage instead of forcing unnecessary rewrites.",
      "Use watch candidates for title/intro/internal-link refresh only after they are seen in GSC with low impressions or no clicks.",
      "Use opportunity candidates as the next manual URL Inspection and Bing URL Submission queue after sitemap refresh.",
      "Do not delete or noindex pages only because they have no traffic yet; the site is still in early indexing.",
      "Record real GSC observations before changing page status or removing pages from sitemap.",
    ],
  };
}

function toItem(node: SeoNode, crawlEvents: number, severity: DeadPageImprovementItem["severity"]): DeadPageImprovementItem {
  return {
    path: node.path,
    title: node.title,
    type: node.type,
    clusterSlug: node.clusterSlug,
    incoming: node.incoming.length,
    outgoing: node.outgoing.length,
    crawlEvents,
    severity,
    reason: getReason(node, severity, crawlEvents),
    actions: getActions(node, severity),
  };
}

function getReason(node: SeoNode, severity: DeadPageImprovementItem["severity"], crawlEvents: number) {
  if (severity === "dead") return node.reasons.length ? node.reasons.join(", ") : "structural link weakness";
  if (severity === "watch") {
    return crawlEvents > 0
      ? "has crawl evidence but should be watched for Search Console impressions and clicks"
      : "structurally valid but no local crawl evidence yet; watch after GSC/Bing submission";
  }
  return node.type === "cluster" ? "hub page can pass authority to q and blog pages" : "q entry page can attract specific problem-search traffic";
}

function getActions(node: SeoNode, severity: DeadPageImprovementItem["severity"]) {
  if (severity === "dead") {
    return [
      "Add at least one parent cluster link.",
      "Add at least three related same-cluster links.",
      "Add one incoming link from the cluster hub or a related q page.",
      "Keep the page out of priority submission until internalLinksComplete is true.",
    ];
  }

  if (severity === "watch") {
    return [
      "Verify the title matches one exact problem query.",
      "Keep the first screen focused on answer, steps, and risk warning.",
      "Check that related links point to same-intent pages.",
      "Refresh only after real GSC data shows low impressions or no clicks.",
    ];
  }

  return [
    "Prioritize for manual URL Inspection after sitemap refresh.",
    "Use as an internal-link target from related blog pages.",
    "Add clearer snippet copy when real impressions appear.",
    "Keep it connected to the Q -> Blog -> Cluster -> Q loop.",
  ];
}

function riskScore(node: SeoNode) {
  const typeScore = node.type === "blog" ? 10 : node.type === "q" ? 6 : 0;
  const lowIncoming = Math.max(12 - node.incoming.length, 0) * 2;
  const lowOutgoing = Math.max(8 - node.outgoing.length, 0);
  return typeScore + lowIncoming + lowOutgoing;
}

function opportunityScore(node: SeoNode) {
  const typeScore = node.type === "cluster" ? 40 : node.type === "q" ? 30 : 5;
  return typeScore + node.incoming.length * 2 + node.outgoing.length;
}

function uniqueNodes(nodes: SeoNode[]) {
  const seen = new Set<string>();
  return nodes.filter((node) => {
    if (seen.has(node.path)) return false;
    seen.add(node.path);
    return true;
  });
}
