import { getAllPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/types";

export type SeoClusterSlug = "codex" | "upwork" | "vercel" | "github" | "node-js-errors" | "ai-tools";

export type SeoPageType = "cluster" | "q" | "blog";

export type SeoCluster = {
  slug: SeoClusterSlug;
  title: string;
  shortTitle: string;
  description: string;
  match: RegExp;
};

export type SeoNode = {
  path: string;
  title: string;
  type: SeoPageType;
  clusterSlug: SeoClusterSlug;
  outgoing: string[];
  incoming: string[];
  contextualOutgoingCount: number;
  hasClusterLink: boolean;
  hasRelatedLinks: boolean;
  internalLinksComplete: boolean;
  reasons: string[];
};

export type SeoGraph = {
  nodes: SeoNode[];
  edges: Array<{ from: string; to: string }>;
  orphanPages: SeoNode[];
  weakPages: SeoNode[];
  highAuthorityPages: SeoNode[];
  hubPages: SeoNode[];
  clusters: Array<{
    cluster: SeoCluster;
    posts: BlogPost[];
    questions: Array<{ title: string; path: string; blogPath: string }>;
  }>;
};

export const seoClusters: SeoCluster[] = [
  {
    slug: "codex",
    title: "Codex AI 编程主题中心",
    shortTitle: "Codex",
    description: "围绕 Codex 入门、代码审查、项目交付、部署前检查和接单边界建立的主题中心。",
    match: /codex/i,
  },
  {
    slug: "upwork",
    title: "Upwork 与 AI 自由职业主题中心",
    shortTitle: "Upwork",
    description: "围绕 Upwork、Proposal、客户沟通、报价、作品集和自由职业风险建立的主题中心。",
    match: /upwork|freelance|proposal|client|pricing|payment|portfolio/i,
  },
  {
    slug: "vercel",
    title: "Vercel 与网页部署主题中心",
    shortTitle: "Vercel",
    description: "围绕 Vercel、Next.js、部署失败、环境变量、上线检查和前端交付建立的主题中心。",
    match: /vercel|deploy|deployment|next-js|netlify|cloudflare/i,
  },
  {
    slug: "github",
    title: "GitHub 与代码协作主题中心",
    shortTitle: "GitHub",
    description: "围绕 GitHub、Git、仓库、提交、文件范围、密钥泄露和协作流程建立的主题中心。",
    match: /github|git\b|repo|repository|commit|secret/i,
  },
  {
    slug: "node-js-errors",
    title: "Node.js 报错与工程问题主题中心",
    shortTitle: "Node.js errors",
    description: "围绕 npm、Node.js、TypeScript、Tailwind、构建失败、端口占用和常见报错建立的主题中心。",
    match: /node|npm|pnpm|yarn|typescript|tailwind|build|module|error|failed|hydration|env|port/i,
  },
  {
    slug: "ai-tools",
    title: "AI 工具与大模型应用主题中心",
    shortTitle: "AI tools",
    description: "围绕 AI 工具、大模型部署、Agent、RAG、提示词、办公自动化和工具选型建立的主题中心。",
    match: /\bai\b|chatgpt|claude|gemini|cursor|prompt|agent|rag|llm|ollama|vllm|openai|model|tool/i,
  },
];

const clusterPriority: SeoClusterSlug[] = ["codex", "upwork", "vercel", "github", "node-js-errors", "ai-tools"];
const publicClusterLabels: Record<SeoClusterSlug, Pick<SeoCluster, "description" | "title">> = {
  codex: {
    title: "Codex AI coding topic hub",
    description: "Troubleshooting hub for Codex setup, code review, project delivery, deployment checks, and AI-assisted coding workflows.",
  },
  upwork: {
    title: "Upwork AI freelancing topic hub",
    description: "Troubleshooting hub for Upwork proposals, client communication, pricing, portfolios, payment boundaries, and AI freelancing delivery.",
  },
  vercel: {
    title: "Vercel and web deployment topic hub",
    description: "Troubleshooting hub for Vercel, Next.js deployment failures, environment variables, production checks, and frontend delivery.",
  },
  github: {
    title: "GitHub and code collaboration topic hub",
    description: "Troubleshooting hub for GitHub Actions, Git workflows, repository handoff, commits, secret leaks, and collaboration issues.",
  },
  "node-js-errors": {
    title: "Node.js errors and engineering issues topic hub",
    description: "Troubleshooting hub for npm, Node.js, TypeScript, Tailwind, build failures, port conflicts, module errors, and common frontend bugs.",
  },
  "ai-tools": {
    title: "AI tools and LLM applications topic hub",
    description: "Troubleshooting hub for AI tools, LLM deployment, agents, RAG memory, prompt workflows, office automation, and tool selection.",
  },
};
let publishedSeoPostsCache: BlogPost[] | null = null;
const clusterCache = new Map<string, SeoCluster>();
const relatedCache = new Map<string, BlogPost[]>();
const highDemandIntentPattern =
  /how|what|why|fix|error|failed|guide|tutorial|checklist|template|pricing|proposal|deploy|agent|rag|prompt|office|ppt|excel|spreadsheet|github|vercel|codex|upwork|怎么|如何|是什么|报错|失败|教程|清单|模板|报价|提示词|部署|办公|表格/i;

export function getPublishedSeoPosts() {
  if (!publishedSeoPostsCache) publishedSeoPostsCache = getAllPosts(false);
  return publishedSeoPostsCache;
}

export function getSeoClusters() {
  return seoClusters.map(withPublicClusterLabel);
}

export function getClusterBySlug(slug: string) {
  const cluster = seoClusters.find((item) => item.slug === slug);
  return cluster ? withPublicClusterLabel(cluster) : undefined;
}

export function getClusterForPost(post: BlogPost): SeoCluster {
  const cached = clusterCache.get(post.slug);
  if (cached) return cached;

  const haystack = postSearchText(post);
  const cluster = clusterPriority
    .map((slug) => seoClusters.find((item) => item.slug === slug))
    .find((item): item is SeoCluster => Boolean(item && item.match.test(haystack)));

  const result = withPublicClusterLabel(cluster || seoClusters[seoClusters.length - 1]);
  clusterCache.set(post.slug, result);
  return result;
}

export function getPostsForCluster(slug: SeoClusterSlug) {
  return getPublishedSeoPosts().filter((post) => getClusterForPost(post).slug === slug);
}

export function getClusterPath(slug: SeoClusterSlug) {
  return `/cluster/${slug}`;
}

export function getBlogPath(post: BlogPost) {
  return `/blog/${post.slug}`;
}

export function getQuestionPath(post: BlogPost) {
  return `/q/${getClusterForPost(post).slug}/${post.slug}`;
}

export function getQuestionName(post: BlogPost) {
  return titleCaseFromSlug(post.slug);
}

export function getIntentBucket(post: BlogPost) {
  const text = postSearchText(post);
  if (/error|failed|fix|debug|troubleshoot|mistake|报错|错误|失败/.test(text)) return "error";
  if (/compare|vs|versus|对比|区别|怎么选/.test(text)) return "comparison";
  if (/checklist|清单/.test(text)) return "checklist";
  if (/pricing|price|quote|proposal|报价|收款/.test(text)) return "commercial";
  if (/tool|tools|工具/.test(text)) return "tool";
  return "guide";
}

export function getRelatedPosts(post: BlogPost, limit = 6) {
  const cacheKey = `${post.slug}:${limit}`;
  const cached = relatedCache.get(cacheKey);
  if (cached) return cached;

  const sourceCluster = getClusterForPost(post).slug;
  const sourceTerms = terms(postSearchText(post));
  const sourceIntent = getIntentBucket(post);

  const related = getPublishedSeoPosts()
    .filter((candidate) => candidate.slug !== post.slug && getClusterForPost(candidate).slug === sourceCluster)
    .map((candidate) => {
      const candidateTerms = terms(postSearchText(candidate));
      const sharedTags = post.tags.filter((tag) => candidate.tags.includes(tag)).length;
      const overlap = [...sourceTerms].filter((term) => candidateTerms.has(term)).length;
      const sameCategory = candidate.category === post.category ? 1 : 0;
      const sameIntent = getIntentBucket(candidate) === sourceIntent ? 1 : 0;
      const score = sameCategory * 30 + sameIntent * 20 + sharedTags * 12 + overlap * 3 + Math.round(candidate.qualityScore || 0) / 20;
      return { post: candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.post.slug.localeCompare(b.post.slug))
    .slice(0, limit)
    .map((item) => item.post);
  relatedCache.set(cacheKey, related);
  return related;
}

export function getRelatedQuestions(post: BlogPost, limit = 8) {
  return getRelatedPosts(post, limit).map((related) => ({
    title: getQuestionName(related),
    path: getQuestionPath(related),
    blogPath: getBlogPath(related),
  }));
}

export function getHighAuthorityPosts(slug: SeoClusterSlug, limit = 12) {
  return getPostsForCluster(slug)
    .sort((a, b) => {
      const scoreA = (a.qualityScore || 0) + a.tags.length * 2 + (a.contentType === "tutorial" ? 10 : 0);
      const scoreB = (b.qualityScore || 0) + b.tags.length * 2 + (b.contentType === "tutorial" ? 10 : 0);
      return scoreB - scoreA || a.slug.localeCompare(b.slug);
    })
    .slice(0, limit);
}

export function getHighPotentialQuestionPosts(limit = 48) {
  const perClusterQuota = Math.max(3, Math.ceil(limit / seoClusters.length));
  const selected = new Map<string, BlogPost>();

  for (const cluster of seoClusters) {
    for (const post of getPostsForCluster(cluster.slug).sort((a, b) => highPotentialScore(b) - highPotentialScore(a) || a.slug.localeCompare(b.slug)).slice(0, perClusterQuota)) {
      selected.set(post.slug, post);
    }
  }

  for (const post of getPublishedSeoPosts().sort((a, b) => highPotentialScore(b) - highPotentialScore(a) || a.slug.localeCompare(b.slug))) {
    if (selected.size >= limit) break;
    selected.set(post.slug, post);
  }

  return Array.from(selected.values())
    .sort((a, b) => highPotentialScore(b) - highPotentialScore(a) || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}

export function getSeoGraph(): SeoGraph {
  const posts = getPublishedSeoPosts();
  const nodes = new Map<string, SeoNode>();
  const edgeSet = new Set<string>();

  const addNode = (node: Omit<SeoNode, "outgoing" | "incoming" | "contextualOutgoingCount" | "hasClusterLink" | "hasRelatedLinks" | "internalLinksComplete" | "reasons">) => {
    if (!nodes.has(node.path)) {
      nodes.set(node.path, {
        ...node,
        outgoing: [],
        incoming: [],
        contextualOutgoingCount: 0,
        hasClusterLink: node.type === "cluster",
        hasRelatedLinks: node.type === "cluster",
        internalLinksComplete: true,
        reasons: [],
      });
    }
  };

  const addEdge = (from: string, to: string) => {
    if (from === to) return;
    const key = `${from}->${to}`;
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
  };

  for (const cluster of seoClusters.map(withPublicClusterLabel)) {
    addNode({ path: getClusterPath(cluster.slug), title: cluster.title, type: "cluster", clusterSlug: cluster.slug });
  }

  for (const post of posts) {
    const cluster = getClusterForPost(post);
    addNode({ path: getBlogPath(post), title: post.title, type: "blog", clusterSlug: cluster.slug });
    addNode({ path: getQuestionPath(post), title: getQuestionName(post), type: "q", clusterSlug: cluster.slug });
  }

  for (const cluster of seoClusters) {
    const clusterPath = getClusterPath(cluster.slug);
    for (const post of getPostsForCluster(cluster.slug)) {
      addEdge(clusterPath, getQuestionPath(post));
    }
    for (const post of getHighAuthorityPosts(cluster.slug, 12)) {
      addEdge(clusterPath, getBlogPath(post));
    }
  }

  for (const post of posts) {
    const cluster = getClusterForPost(post);
    const clusterPath = getClusterPath(cluster.slug);
    const blogPath = getBlogPath(post);
    const questionPath = getQuestionPath(post);
    const related = getRelatedPosts(post, 8);

    addEdge(questionPath, blogPath);
    addEdge(questionPath, clusterPath);
    for (const relatedPost of related.slice(0, 6)) addEdge(questionPath, getQuestionPath(relatedPost));

    addEdge(blogPath, clusterPath);
    addEdge(blogPath, questionPath);
    for (const relatedPost of related.slice(0, 4)) addEdge(blogPath, getBlogPath(relatedPost));
    for (const relatedPost of related.slice(0, 4)) addEdge(blogPath, getQuestionPath(relatedPost));
  }

  for (const edge of edgeSet) {
    const [from, to] = edge.split("->");
    const fromNode = nodes.get(from);
    const toNode = nodes.get(to);
    if (!fromNode || !toNode) continue;
    fromNode.outgoing.push(to);
    toNode.incoming.push(from);
  }

  const finalNodes = Array.from(nodes.values()).map((node) => {
    const contextualOutgoingCount = node.outgoing.length;
    const clusterPath = getClusterPath(node.clusterSlug);
    const hasClusterLink = node.type === "cluster" || node.outgoing.includes(clusterPath);
    const hasRelatedLinks =
      node.type === "cluster" ||
      node.outgoing.filter((targetPath) => {
        const target = nodes.get(targetPath);
        return target && target.clusterSlug === node.clusterSlug && target.path !== clusterPath;
      }).length >= 3;
    const reasons = [
      contextualOutgoingCount < 5 ? "links < 5" : "",
      !hasClusterLink ? "missing cluster link" : "",
      !hasRelatedLinks ? "missing related links" : "",
      node.incoming.length === 0 ? "orphan" : "",
    ].filter(Boolean);

    return {
      ...node,
      contextualOutgoingCount,
      hasClusterLink,
      hasRelatedLinks,
      internalLinksComplete: reasons.length === 0,
      reasons,
    };
  });

  return {
    nodes: finalNodes,
    edges: Array.from(edgeSet).map((edge) => {
      const [from, to] = edge.split("->");
      return { from, to };
    }),
    orphanPages: finalNodes.filter((node) => node.incoming.length === 0),
    weakPages: finalNodes.filter((node) => !node.internalLinksComplete),
    highAuthorityPages: finalNodes
      .filter((node) => node.type === "blog")
      .sort((a, b) => b.incoming.length - a.incoming.length || b.outgoing.length - a.outgoing.length)
      .slice(0, 20),
    hubPages: finalNodes.filter((node) => node.type === "cluster").sort((a, b) => b.outgoing.length - a.outgoing.length),
    clusters: seoClusters.map(withPublicClusterLabel).map((cluster) => {
      const clusterPosts = getPostsForCluster(cluster.slug);
      return {
        cluster,
        posts: clusterPosts,
        questions: clusterPosts.map((post) => ({
          title: getQuestionName(post),
          path: getQuestionPath(post),
          blogPath: getBlogPath(post),
        })),
      };
    }),
  };
}

export function getSeoGraphSummary() {
  const graph = getSeoGraph();
  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    orphanPages: graph.orphanPages.length,
    weakPages: graph.weakPages.length,
    internalLinksComplete: graph.orphanPages.length === 0 && graph.weakPages.length === 0,
    clusterCount: graph.hubPages.length,
    qPages: graph.nodes.filter((node) => node.type === "q").length,
    blogPages: graph.nodes.filter((node) => node.type === "blog").length,
  };
}

function postSearchText(post: BlogPost) {
  return [
    post.title,
    post.slug,
    post.description,
    post.category,
    post.primaryKeyword,
    post.searchIntent,
    post.contentType,
    ...post.tags,
    ...post.secondaryKeywords,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function withPublicClusterLabel(cluster: SeoCluster): SeoCluster {
  const label = publicClusterLabels[cluster.slug];
  return label ? { ...cluster, ...label } : cluster;
}

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map(formatTitleToken)
    .join(" ");
}

function formatTitleToken(token: string) {
  const upper = new Set(["ai", "api", "rag", "llm", "seo", "sdk", "mcp", "gsc", "faq", "ci", "cd", "ui", "ux", "ppt", "pdf", "json", "yaml", "env", "npm"]);
  if (upper.has(token)) return token.toUpperCase();
  if (token === "js") return "JS";
  return token.charAt(0).toUpperCase() + token.slice(1);
}

function highPotentialScore(post: BlogPost) {
  const text = postSearchText(post);
  const intent = getIntentBucket(post);
  const demandBoost = highDemandIntentPattern.test(text) ? 28 : 0;
  const intentBoost = intent === "error" ? 24 : intent === "comparison" ? 18 : intent === "checklist" ? 18 : intent === "commercial" ? 16 : intent === "tool" ? 14 : 10;
  const tutorialBoost = post.contentType === "tutorial" ? 14 : 0;
  const searchIntentBoost = post.searchIntent ? 8 : 0;
  const keywordBoost = post.primaryKeyword ? 8 : 0;
  const secondaryBoost = Math.min(post.secondaryKeywords.length, 6) * 2;
  const tagBoost = Math.min(post.tags.length, 8) * 2;
  const qualityBoost = Math.round((post.qualityScore || 0) / 8);
  return demandBoost + intentBoost + tutorialBoost + searchIntentBoost + keywordBoost + secondaryBoost + tagBoost + qualityBoost;
}

function terms(text: string) {
  const words = text.match(/[a-z0-9][a-z0-9-]{1,}|[\u4e00-\u9fa5]{2,}/g) || [];
  return new Set(words.filter((word) => !stopWords.has(word)));
}

const stopWords = new Set(["the", "and", "with", "for", "from", "what", "how", "guide", "checklist", "怎么", "什么", "指南", "教程", "新手", "清单"]);
