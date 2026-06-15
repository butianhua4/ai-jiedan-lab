import fs from "fs";
import path from "path";
import { getAllPosts, getCategorySlugs, getTagSlugs, slugify } from "@/lib/blog";
import { site } from "@/data/site";
import { tools } from "@/data/tools";

const root = projectPath();
const logFile = projectPath("logs", "system.log");

type StatusLight = "green" | "yellow" | "red";

export type SystemLogEntry = {
  timestamp: string;
  event: string;
  level: "info" | "warn" | "error";
  message: string;
  source?: string;
};

export type SystemStatus = {
  generatedAt: string;
  system: {
    nodeEnv: string;
    mode: "dev" | "build" | "production";
    cwd: string;
  };
  health: {
    score: number;
    light: StatusLight;
    checks: {
      buildSuccess: boolean;
      sitemapNormal: boolean;
      publishedOver100: boolean;
      internalLinksComplete: boolean;
      noErrors: boolean;
    };
  };
  content: {
    blogArticles: number;
    draft: number;
    review: number;
    published: number;
    archived: number;
    noindex: number;
    draftList: Array<{ title: string; slug: string; updatedAt: string; qualityScore?: number }>;
  };
  seo: {
    sitemap: { ok: boolean; urlCount: number; includesPublishedPosts: boolean; error?: string };
    robots: { ok: boolean; sitemapUrl: string | null; allowsAll: boolean; error?: string };
    searchConsole: {
      connected: boolean;
      status: "reserved" | "not_connected" | "connected";
      evidence: string;
    };
  };
  questionEngine: {
    exists: boolean;
    questionTotal: number;
    generatedPages: number;
    missingPages: number;
    duplicateRate: number | null;
  };
  pages: {
    blogPages: number;
    toolPages: number;
    qPages: number;
    sitemapPages: number;
    appRoutes: number;
  };
  links: {
    averageLinksPerPage: number;
    orphanPages: number;
    orphanPageSamples: string[];
    totalInternalLinks: number;
  };
  build: {
    lastBuildTime: string | null;
    success: boolean;
    buildId: string | null;
    typeScriptErrorCount: number;
    warnings: string[];
    errors: string[];
  };
  performance: {
    pageCount: number;
    averagePageSizeBytes: number;
    averagePageSizeKb: number;
    staticPages: number;
    dynamicRoutes: number;
    staticToDynamicRatio: string;
  };
  logs: {
    file: string;
    latest: SystemLogEntry[];
    errors: SystemLogEntry[];
  };
};

export function getSystemStatus(): SystemStatus {
  const allPosts = getAllPosts(true);
  const publishedPosts = allPosts.filter((post) => post.status === "published" && post.noindex === false);
  const draftPosts = allPosts.filter((post) => post.status === "draft");
  const sitemapStatus = getSitemapStatus(publishedPosts.map((post) => `/blog/${post.slug}`));
  const robotsStatus = getRobotsStatus();
  const questionEngine = getQuestionEngineStatus();
  const pageStatus = getPageStatus(sitemapStatus.urlCount, publishedPosts.length, questionEngine.generatedPages);
  const linkStatus = getLinkStatus(sitemapStatus.paths, publishedPosts);
  const buildStatus = getBuildStatus();
  const performance = getPerformanceStatus(sitemapStatus.urlCount);
  const latestLogs = readSystemLog().slice(-10).reverse();
  const errorLogs = readSystemLog().filter((entry) => entry.level === "error").slice(-20).reverse();

  const checks = {
    buildSuccess: buildStatus.success,
    sitemapNormal: sitemapStatus.ok,
    publishedOver100: publishedPosts.length > 100,
    internalLinksComplete: linkStatus.orphanPages === 0,
    noErrors: buildStatus.errors.length === 0 && errorLogs.length === 0,
  };
  const score = Object.values(checks).filter(Boolean).length * 20;

  return {
    generatedAt: new Date().toISOString(),
    system: {
      nodeEnv: process.env.NODE_ENV || "unknown",
      mode: getSystemMode(),
      cwd: root,
    },
    health: {
      score,
      light: score >= 80 ? "green" : score >= 60 ? "yellow" : "red",
      checks,
    },
    content: {
      blogArticles: allPosts.length,
      draft: draftPosts.length,
      review: allPosts.filter((post) => post.status === "review").length,
      published: publishedPosts.length,
      archived: allPosts.filter((post) => post.status === "archived").length,
      noindex: allPosts.filter((post) => post.noindex === true).length,
      draftList: draftPosts.slice(0, 50).map((post) => ({
        title: post.title,
        slug: post.slug,
        updatedAt: post.updatedAt,
        qualityScore: post.qualityScore,
      })),
    },
    seo: {
      sitemap: {
        ok: sitemapStatus.ok,
        urlCount: sitemapStatus.urlCount,
        includesPublishedPosts: sitemapStatus.includesPublishedPosts,
        error: sitemapStatus.error,
      },
      robots: robotsStatus,
      searchConsole: {
        connected: false,
        status: "reserved",
        evidence: "Search Console API/export is not connected yet. Manual screenshots exist, but this module does not invent indexing data.",
      },
    },
    questionEngine,
    pages: pageStatus,
    links: linkStatus,
    build: buildStatus,
    performance,
    logs: {
      file: "logs/system.log",
      latest: latestLogs,
      errors: errorLogs,
    },
  };
}

export function appendSystemLog(entry: Omit<SystemLogEntry, "timestamp">) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
  const row: SystemLogEntry = { timestamp: new Date().toISOString(), ...entry };
  fs.appendFileSync(logFile, `${JSON.stringify(row)}\n`, "utf8");
}

function getSystemMode(): "dev" | "build" | "production" {
  if (process.env.NODE_ENV === "production") return "production";
  if (fs.existsSync(path.join(root, ".next", "BUILD_ID"))) return "build";
  return "dev";
}

function getSitemapStatus(requiredPaths: string[]) {
  try {
    const paths = getGeneratedSitemapPaths();
    const pathSet = new Set(paths);
    return {
      ok: paths.length > 0 && requiredPaths.every((item) => pathSet.has(item)),
      urlCount: paths.length,
      paths,
      includesPublishedPosts: requiredPaths.every((item) => pathSet.has(item)),
      error: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      urlCount: 0,
      paths: [] as string[],
      includesPublishedPosts: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function getRobotsStatus() {
  try {
    const allow = ["/"];
    const sitemapUrl = `${site.url}/sitemap.xml`;
    return {
      ok: allow.includes("/") && sitemapUrl === `${site.url}/sitemap.xml`,
      sitemapUrl,
      allowsAll: allow.includes("/"),
      error: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      sitemapUrl: null,
      allowsAll: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function getGeneratedSitemapPaths() {
  const staticRoutes = [
    "",
    "/blog",
    "/deployments",
    "/office-ai",
    "/prompts",
    "/tools",
    "/tools/proposal-generator",
    "/tools/ppt-planner",
    "/tools/spreadsheet-cleaner",
    "/tools/industry-prompt-builder",
    "/tools/agent-deployment-planner",
    "/tools/llm-deployment-cost-planner",
    "/tools/memory-rag-architecture-planner",
    "/tools/api-routing-cost-checker",
    "/tools/public-seo-refresh-assistant",
    "/tools/error-explainer",
    "/tools/pricing-calculator",
    "/templates",
    "/roadmap",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/monetization",
  ];
  const postRoutes = getAllPosts(false).map((post) => `/blog/${post.slug}`);
  const toolRoutes = tools.map((tool) => `/tools/${tool.slug}`);
  const categoryRoutes = getCategorySlugs().map((slug) => `/category/${slug}`);
  const tagRoutes = getTagSlugs().map((slug) => `/tag/${slug}`);
  return [...staticRoutes, ...postRoutes, ...toolRoutes, ...categoryRoutes, ...tagRoutes].map(normalizePathOnly);
}

function getQuestionEngineStatus() {
  const questionFiles = [
    ...listFiles("content/questions", (file) => /\.(json|mdx?)$/i.test(file)),
    ...listFiles("data/questions", (file) => /\.(json|ts)$/i.test(file)),
    ...listFiles(path.join("app", "q"), (file) => file.endsWith(`${path.sep}page.tsx`)),
  ];
  const qPageFiles = listFiles(path.join("app", "q"), (file) => file.endsWith(`${path.sep}page.tsx`));
  const slugs = questionFiles.map((file) => path.basename(file).replace(/\.(json|mdx?|ts|tsx)$/i, ""));
  const uniqueSlugs = new Set(slugs);
  const duplicates = slugs.length - uniqueSlugs.size;
  const questionTotal = questionFiles.length;
  const generatedPages = qPageFiles.length;
  return {
    exists: questionTotal > 0 || generatedPages > 0,
    questionTotal,
    generatedPages,
    missingPages: Math.max(0, questionTotal - generatedPages),
    duplicateRate: questionTotal > 0 ? round(duplicates / questionTotal, 4) : null,
  };
}

function getPageStatus(sitemapPages: number, blogPages: number, qPages: number) {
  const appPageFiles = listFiles("app", (file) => file.endsWith(`${path.sep}page.tsx`));
  const standaloneToolPages = appPageFiles.filter((file) => file.includes(`${path.sep}app${path.sep}tools${path.sep}`)).length;
  return {
    blogPages,
    toolPages: tools.length + standaloneToolPages,
    qPages,
    sitemapPages,
    appRoutes: appPageFiles.length,
  };
}

function getLinkStatus(paths: string[], posts: ReturnType<typeof getAllPosts>) {
  const publicPaths = new Set(paths);
  const outgoing = new Map<string, Set<string>>();
  const incoming = new Map<string, number>();
  for (const item of paths) {
    outgoing.set(item, new Set());
    incoming.set(item, 0);
  }

  const addEdge = (from: string, to: string) => {
    const normalizedFrom = normalizePathOnly(from);
    const normalizedTo = normalizePathOnly(to);
    if (!publicPaths.has(normalizedFrom) || !publicPaths.has(normalizedTo) || normalizedFrom === normalizedTo) return;
    const fromSet = outgoing.get(normalizedFrom) || new Set<string>();
    const before = fromSet.size;
    fromSet.add(normalizedTo);
    outgoing.set(normalizedFrom, fromSet);
    if (fromSet.size > before) incoming.set(normalizedTo, (incoming.get(normalizedTo) || 0) + 1);
  };

  const globalLinks = extractSourceLinks(["components/Header.tsx", "components/Footer.tsx"]);
  for (const from of paths) {
    for (const link of globalLinks) addEdge(from, link);
  }

  for (const post of posts) {
    const postPath = `/blog/${post.slug}`;
    addEdge("/blog", postPath);
    addEdge("/blog", `/category/${slugify(post.category)}`);
    addEdge(postPath, `/category/${slugify(post.category)}`);
    for (const tag of post.tags) addEdge(postPath, `/tag/${slugify(tag)}`);
    for (const link of extractLinks(post.content)) addEdge(postPath, link);
  }

  for (const categorySlug of getCategorySlugs()) addEdge("/blog", `/category/${categorySlug}`);
  for (const tagSlug of getTagSlugs()) addEdge("/blog", `/tag/${tagSlug}`);
  for (const tool of tools) addEdge("/tools", `/tools/${tool.slug}`);
  const sourceFiles = [
    ...listFiles("app", (file) => file.endsWith(".tsx")),
    ...listFiles("components", (file) => file.endsWith(".tsx")),
  ];
  for (const link of extractSourceLinks(sourceFiles)) {
    addEdge("/", link);
  }

  const totalInternalLinks = Array.from(outgoing.values()).reduce((sum, set) => sum + set.size, 0);
  const averageLinksPerPage = paths.length ? round(totalInternalLinks / paths.length, 2) : 0;
  const orphanPageSamples = paths.filter((item) => item !== "/" && (incoming.get(item) || 0) === 0).slice(0, 30);

  return {
    averageLinksPerPage,
    orphanPages: paths.filter((item) => item !== "/" && (incoming.get(item) || 0) === 0).length,
    orphanPageSamples,
    totalInternalLinks,
  };
}

function getBuildStatus() {
  const buildIdFile = projectPath(".next", "BUILD_ID");
  const prerenderFile = projectPath(".next", "prerender-manifest.json");
  const buildId = fs.existsSync(buildIdFile) ? fs.readFileSync(buildIdFile, "utf8").trim() : null;
  const buildTime = fs.existsSync(buildIdFile) ? fs.statSync(buildIdFile).mtime.toISOString() : null;
  const logText = [".next/dev-server.err.log", ".next/dev-server.out.log", "logs/system.log"]
    .map((file) => safeRead(projectPath(file)))
    .join("\n");
  const errors = extractDiagnosticLines(logText, ["error", "failed", "exception"]);
  const warnings = extractDiagnosticLines(logText, ["warn", "warning"]);
  return {
    lastBuildTime: buildTime,
    success: Boolean(buildId && fs.existsSync(prerenderFile)),
    buildId,
    typeScriptErrorCount: (logText.match(/\bTS\d{4}\b|TypeScript error|Type error/gi) || []).length,
    warnings,
    errors,
  };
}

function getPerformanceStatus(sitemapPages: number) {
  const pageFiles = listFiles(path.join(".next", "server", "app"), (file) => /\.(html|body)$/i.test(file));
  const totalBytes = pageFiles.reduce((sum, file) => sum + fs.statSync(file).size, 0);
  const prerender = readJson(projectPath(".next", "prerender-manifest.json")) as { routes?: Record<string, unknown> } | null;
  const routesManifest = readJson(projectPath(".next", "routes-manifest.json")) as { dynamicRoutes?: unknown[] } | null;
  const staticPages = prerender?.routes ? Object.keys(prerender.routes).length : 0;
  const dynamicRoutes = routesManifest?.dynamicRoutes?.length || 0;
  const averagePageSizeBytes = pageFiles.length ? Math.round(totalBytes / pageFiles.length) : 0;
  return {
    pageCount: sitemapPages,
    averagePageSizeBytes,
    averagePageSizeKb: round(averagePageSizeBytes / 1024, 2),
    staticPages,
    dynamicRoutes,
    staticToDynamicRatio: `${staticPages}:${dynamicRoutes}`,
  };
}

function readSystemLog(): SystemLogEntry[] {
  if (!fs.existsSync(logFile)) return [];
  return fs
    .readFileSync(logFile, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line) as SystemLogEntry;
      } catch {
        return {
          timestamp: "",
          event: "legacy-log-line",
          level: line.toLowerCase().includes("error") ? "error" : "info",
          message: line,
        } satisfies SystemLogEntry;
      }
    });
}

function extractSourceLinks(files: string[]) {
  return files.flatMap((file) => extractLinks(safeRead(path.isAbsolute(file) ? file : projectPath(file))));
}

function extractLinks(text: string) {
  const links = new Set<string>();
  const patterns = [
    /\[[^\]]+\]\((\/[^)\s#]+)[^)]*\)/g,
    /href=["'](\/[^"'#?]+)[^"']*["']/g,
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) links.add(match[1]);
  }
  return Array.from(links);
}

function extractDiagnosticLines(text: string, needles: string[]) {
  return Array.from(
    new Set(
      text
        .split(/\r?\n/)
        .filter((line) => needles.some((needle) => line.toLowerCase().includes(needle)))
        .map((line) => line.trim())
        .filter(Boolean),
    ),
  ).slice(0, 20);
}

function normalizePathOnly(value: string) {
  const pathOnly = value.split("?")[0].split("#")[0] || "/";
  return pathOnly !== "/" ? pathOnly.replace(/\/$/, "") : "/";
}

function listFiles(relativeDir: string, predicate: (file: string) => boolean) {
  const base = projectPath(relativeDir);
  const files: string[] = [];
  if (!fs.existsSync(base)) return files;

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && predicate(fullPath)) {
        files.push(fullPath);
      }
    }
  };

  walk(base);
  return files;
}

function projectPath(...parts: string[]) {
  return path.join(/*turbopackIgnore: true*/ process.cwd(), ...parts);
}

function safeRead(file: string) {
  try {
    return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  } catch {
    return "";
  }
}

function readJson(file: string) {
  try {
    return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
  } catch {
    return null;
  }
}

function round(value: number, digits: number) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
