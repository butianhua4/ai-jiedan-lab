import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type RefreshSprintItem = {
  actionCount: number;
  category: string;
  descriptionLength: number;
  file: string;
  priorityScore: number;
  publishConfirm: "not-included";
  readyForPublicRefreshSprint: boolean;
  refreshActions: string[];
  refreshReasons: string[];
  slug: string;
  sprintWave: number;
  title: string;
  unsafeReasons: string[];
};

type RefreshWave = {
  actionItems: number;
  files: string[];
  highPriorityItems: number;
  items: number;
  readyItems: number;
  refreshReasons: string[];
  unsafeItems: number;
  wave: number;
};

type PublicRefreshSprintBoard = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  items: RefreshSprintItem[];
  summary: {
    actionItems: number;
    cannibalizationItems: number;
    highPriorityItems: number;
    items: number;
    itemsReadyForPublicRefreshSprint: number;
    liveMissingFromSitemap: number | null;
    mojibakePublicItems: number;
    publicArticles: number;
    publishConfirmCommandsIncluded: number;
    publishedButNoindexed: number;
    seoWarningItems: number;
    shortDescriptionItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    waves: number;
  };
  unsafeItems: unknown[];
  waves: RefreshWave[];
};

type PublicSearchRefreshPack = {
  summary: {
    actionItems: number;
    items: number;
    itemsReadyForHumanRefreshReview: number;
    publicArticles: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type PublicSurfaceInventory = {
  summary: {
    liveMissingFromSitemap: number | null;
    livePublicCount: number | null;
    publicArticles: number;
    publishedButNoindexed: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type TrafficEvidence = {
  summary: { measuredTrafficSources: number; trafficDataAvailable: boolean };
};

type SessionItem = {
  actionCount: number;
  commandBoundary: {
    editAfterHumanApproval: "manual-only";
    markReview: "not-applicable-public-page";
    publishConfirm: "not-included";
    stopBefore: string;
  };
  files: string[];
  highPriorityItems: number;
  items: Array<{
    actionCount: number;
    descriptionLength: number;
    file: string;
    priorityScore: number;
    refreshActions: string[];
    refreshReasons: string[];
    slug: string;
    title: string;
  }>;
  readyItems: number;
  refreshReasons: string[];
  sessionName: string;
  unsafeItems: number;
  wave: number;
};

function main() {
  const sprint = readJson<PublicRefreshSprintBoard>("content/automation/public-refresh-sprint-board.json");
  const refreshPack = readJson<PublicSearchRefreshPack>("content/automation/public-search-refresh-pack.json");
  const publicSurface = readJson<PublicSurfaceInventory>("content/automation/public-surface-inventory.json");
  const traffic = readJson<TrafficEvidence>("content/automation/traffic-evidence-audit.json");

  const itemsByWave = groupByWave(sprint.items || []);
  const sessions = sprint.waves.map((wave) => toSession(wave, itemsByWave.get(wave.wave) || []));
  const unsafeSessions = sessions.filter((session) => session.unsafeItems > 0 || session.commandBoundary.publishConfirm !== "not-included");

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only public search refresh session pack. It turns public refresh waves into manual SEO refresh sessions without editing public pages.",
      stopBefore: "Use this pack to plan exact public-page refresh edits. Metadata, body, canonical, source, or link changes require human approval before editing.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      publicRefreshSprintActions: sprint.summary.actionItems,
      publicRefreshSprintItems: sprint.summary.items,
      publicRefreshSprintUnsafeItems: sprint.summary.unsafeItems,
      publicSearchRefreshActions: refreshPack.summary.actionItems,
      publicSearchRefreshItems: refreshPack.summary.items,
      publicSearchRefreshUnsafeItems: refreshPack.summary.unsafeItems,
      publicSurfaceArticles: publicSurface.summary.publicArticles,
      publicSurfaceLivePublicCount: publicSurface.summary.livePublicCount,
      publicSurfaceMissingFromSitemap: publicSurface.summary.liveMissingFromSitemap,
      publicSurfaceUnsafeItems: publicSurface.summary.unsafeItems,
      trafficDataAvailable: traffic.summary.trafficDataAvailable,
      measuredTrafficSources: traffic.summary.measuredTrafficSources,
    },
    summary: {
      actionItems: sessions.reduce((sum, session) => sum + session.actionCount, 0),
      cannibalizationSessions: sessions.filter((session) => session.refreshReasons.includes("cannibalization")).length,
      filesCovered: new Set(sessions.flatMap((session) => session.files)).size,
      highPriorityItems: sessions.reduce((sum, session) => sum + session.highPriorityItems, 0),
      liveMissingFromSitemap: publicSurface.summary.liveMissingFromSitemap,
      mojibakeSessions: sessions.filter((session) => session.refreshReasons.includes("mojibake-public")).length,
      publicArticles: publicSurface.summary.publicArticles,
      publishConfirmCommandsIncluded: 0,
      readyItems: sessions.reduce((sum, session) => sum + session.readyItems, 0),
      seoWarningSessions: sessions.filter((session) => session.refreshReasons.includes("seo-warning")).length,
      sessions: sessions.length,
      shortDescriptionSessions: sessions.filter((session) => session.refreshReasons.includes("short-description")).length,
      trafficDataAvailable: false,
      unsafeItems: unsafeSessions.length,
    },
    unsafeSessions,
    sessions,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "public-search-refresh-session-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "public-search-refresh-session-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeSessions.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeSessions.length) process.exitCode = 1;
}

function toSession(wave: RefreshWave, items: RefreshSprintItem[]): SessionItem {
  return {
    actionCount: items.reduce((sum, item) => sum + item.actionCount, 0),
    commandBoundary: {
      editAfterHumanApproval: "manual-only",
      markReview: "not-applicable-public-page",
      publishConfirm: "not-included",
      stopBefore: "Stop before editing public metadata, body copy, canonical URL, sources, or internal links until a human approves the exact change.",
    },
    files: wave.files,
    highPriorityItems: wave.highPriorityItems,
    items: items.map((item) => ({
      actionCount: item.actionCount,
      descriptionLength: item.descriptionLength,
      file: item.file,
      priorityScore: item.priorityScore,
      refreshActions: item.refreshActions,
      refreshReasons: item.refreshReasons,
      slug: item.slug,
      title: item.title,
    })),
    readyItems: wave.readyItems,
    refreshReasons: wave.refreshReasons,
    sessionName: `public search refresh wave ${wave.wave}`,
    unsafeItems: wave.unsafeItems,
    wave: wave.wave,
  };
}

function groupByWave(items: RefreshSprintItem[]) {
  const grouped = new Map<number, RefreshSprintItem[]>();
  for (const item of items) grouped.set(item.sprintWave, [...(grouped.get(item.sprintWave) || []), item]);
  return grouped;
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  sessions: SessionItem[];
  sourceEvidence: Record<string, boolean | number | null>;
  summary: Record<string, boolean | number | null>;
  unsafeSessions: SessionItem[];
}) {
  return [
    "# Public Search Refresh Session Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns public refresh waves into manual SEO refresh sessions without editing public pages or claiming traffic.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Sessions",
    "",
    ...sessionTable(payload.unsafeSessions),
    "",
    "## Sessions",
    "",
    ...sessionTable(payload.sessions),
    "",
    "## Session Details",
    "",
    ...payload.sessions.flatMap(sessionSection),
    "",
  ].join("\n");
}

function sessionTable(sessions: SessionItem[]) {
  if (!sessions.length) return ["- none"];
  return [
    "| Wave | Session | Ready | Actions | High priority | Reasons | Files |",
    "| ---: | --- | ---: | ---: | ---: | --- | --- |",
    ...sessions.map(
      (session) =>
        `| ${session.wave} | ${session.sessionName} | ${session.readyItems}/${session.items.length} | ${session.actionCount} | ${session.highPriorityItems} | ${session.refreshReasons.join(", ") || "none"} | ${session.files.join("<br>")} |`,
    ),
  ];
}

function sessionSection(session: SessionItem) {
  return [
    `### ${session.sessionName}`,
    "",
    `- Ready items: ${session.readyItems}/${session.items.length}`,
    `- Action items: ${session.actionCount}`,
    `- Refresh reasons: ${session.refreshReasons.join(", ") || "none"}`,
    `- Publish confirm: ${session.commandBoundary.publishConfirm}`,
    `- Stop before: ${session.commandBoundary.stopBefore}`,
    "",
    "| Score | Actions | Desc | Reasons | Title | File |",
    "| ---: | ---: | ---: | --- | --- | --- |",
    ...session.items.map(
      (item) =>
        `| ${item.priorityScore} | ${item.actionCount} | ${item.descriptionLength} | ${item.refreshReasons.join(", ") || "none"} | ${escapeMd(item.title)} | ${item.file} |`,
    ),
    "",
    "Top actions:",
    "",
    ...session.items.flatMap((item) => [
      `#### ${escapeMd(item.title)}`,
      "",
      ...item.refreshActions.slice(0, 8).map((action) => `- ${action}`),
      "",
    ]),
  ];
}

function escapeMd(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

main();
