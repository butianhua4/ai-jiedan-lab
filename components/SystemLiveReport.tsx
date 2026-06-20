"use client";

import { useMemo, useState } from "react";
import type { SystemStatus } from "@/lib/system-status";

const lightClass = {
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  red: "bg-red-500",
};

export function SystemLiveReport({ initialStatus }: { initialStatus: SystemStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [refreshError, setRefreshError] = useState("");

  const modules = useMemo(
    () => [
      { title: "Content System", data: status.content },
      { title: "SEO System", data: status.seo },
      { title: "Search / Analytics Platforms", data: status.searchPlatforms },
      { title: "Autonomous Development Loop", data: status.autonomousLoop },
      { title: "Question Engine", data: status.questionEngine },
      { title: "Page System", data: status.pages },
      { title: "Internal Link System", data: status.links },
      { title: "SEO Growth Status", data: status.seoGrowth },
      { title: "Build Status", data: status.build },
      { title: "Performance", data: status.performance },
    ],
    [status],
  );

  async function refresh() {
    setLoading(true);
    setRefreshError("");
    try {
      const response = await fetch("/api/system/status", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus((await response.json()) as SystemStatus);
    } catch (error) {
      setRefreshError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className={`h-4 w-4 rounded-full ${lightClass[status.health.light]}`} />
              <h1 className="text-3xl font-bold text-ink">System Live Report</h1>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Generated at: {formatDate(status.generatedAt)} / Mode: {status.system.mode} / NODE_ENV: {status.system.nodeEnv}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md border bg-gray-50 px-4 py-3 text-right">
              <p className="text-xs text-gray-500">Health score</p>
              <p className="text-3xl font-bold text-ink">{status.health.score}/100</p>
            </div>
            <button
              className="rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              disabled={loading}
              onClick={refresh}
              type="button"
            >
              {loading ? "Refreshing" : "Refresh status"}
            </button>
          </div>
        </div>
        {refreshError ? <p className="mt-3 text-sm text-red-600">Refresh failed: {refreshError}</p> : null}
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {Object.entries(status.health.checks).map(([key, value]) => (
            <div className="rounded-md border border-gray-200 bg-gray-50 p-3" key={key}>
              <p className="text-xs text-gray-500">{key}</p>
              <p className={`mt-1 text-lg font-semibold ${value ? "text-emerald-700" : "text-red-700"}`}>{value ? "pass" : "fail"}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Metric label="Published posts" value={status.content.published} />
        <Metric label="Drafts" value={status.content.draft} />
        <Metric label="Sitemap URLs" value={status.seo.sitemap.urlCount} />
        <Metric label="Orphan pages" value={status.links.orphanPages} />
      </section>

      <Panel title="Search / Analytics Platforms">
        <div className="grid gap-3 md:grid-cols-4">
          <Metric label="GA4" value={status.searchPlatforms.analytics.googleAnalytics.configured ? "configured" : "missing"} />
          <Metric label="Clarity" value={status.searchPlatforms.analytics.microsoftClarity.configured ? "configured" : "missing"} />
          <Metric label="GSC surface" value={status.searchPlatforms.search.googleSearchConsole.status === "not_configured" ? "missing" : "present"} />
          <Metric label="Bing / IndexNow" value={status.searchPlatforms.search.bingWebmasterTools.status === "not_configured" ? "missing" : "present"} />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Search Console and Bing API metrics stay null until real API exports or tokens are connected. This panel only reports surfaces that can be verified from local code and public files.
        </p>
      </Panel>

      <Panel title="Autonomous Development Loop">
        <div className="grid gap-3 md:grid-cols-4">
          <Metric label="Mode" value={status.autonomousLoop.mode} />
          <Metric label="Stage" value={status.autonomousLoop.currentStage} />
          <Metric label="Auto execute" value={status.autonomousLoop.autoExecuteAllowed ? "allowed" : "blocked"} />
          <Metric label="Last status" value={status.autonomousLoop.lastStatus || "none"} />
        </div>
        <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
          <p className="font-semibold text-ink">Next recommended task</p>
          <p className="mt-1 text-gray-700">{status.autonomousLoop.nextRecommendedTask}</p>
          <p className="mt-3 font-semibold text-ink">Last task</p>
          <p className="mt-1 text-gray-700">{status.autonomousLoop.lastTask || "No autonomous run yet."}</p>
          <p className="mt-3 font-semibold text-ink">Last report</p>
          <p className="mt-1 text-gray-700">{status.autonomousLoop.lastReport || "No report yet."}</p>
          {status.autonomousLoop.blockedReasons.length ? (
            <>
              <p className="mt-3 font-semibold text-ink">Blocked reasons</p>
              <ul className="mt-1 list-disc pl-5 text-gray-700">
                {status.autonomousLoop.blockedReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </Panel>

      <section className="grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <details className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm" key={module.title}>
            <summary className="cursor-pointer text-lg font-semibold text-ink">{module.title}</summary>
            <pre className="mt-4 max-h-96 overflow-auto rounded-md bg-gray-950 p-4 text-xs leading-5 text-gray-100">
              {JSON.stringify(module.data, null, 2)}
            </pre>
          </details>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Panel title="Latest 10 Logs">
          {status.logs.latest.length ? <LogList entries={status.logs.latest} /> : <p className="text-sm text-gray-500">No system.log entries yet.</p>}
        </Panel>
        <Panel title="Errors">
          {status.logs.errors.length || status.build.errors.length ? (
            <>
              <LogList entries={status.logs.errors} />
              {status.build.errors.map((item) => (
                <p className="mt-2 rounded bg-red-50 px-3 py-2 text-sm text-red-700" key={item}>
                  {item}
                </p>
              ))}
            </>
          ) : (
            <p className="text-sm text-gray-500">No errors were read from logs or build artifacts.</p>
          )}
        </Panel>
      </section>

      <Panel title="Unpublished Drafts">
        {status.content.draftList.length ? (
          <div className="grid gap-2 md:grid-cols-2">
            {status.content.draftList.map((post) => (
              <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm" key={post.slug}>
                <p className="font-semibold text-ink">{post.title}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {post.slug} / updated {post.updatedAt} / score {post.qualityScore ?? "n/a"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No draft posts.</p>
        )}
      </Panel>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function LogList({ entries }: { entries: SystemStatus["logs"]["latest"] }) {
  return (
    <div className="space-y-2">
      {entries.map((entry, index) => (
        <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm" key={`${entry.timestamp}-${entry.event}-${index}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold ${
                entry.level === "error" ? "bg-red-100 text-red-700" : entry.level === "warn" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {entry.level}
            </span>
            <span className="font-medium text-ink">{entry.event}</span>
            <span className="text-xs text-gray-500">{formatDate(entry.timestamp)}</span>
          </div>
          <p className="mt-2 text-gray-700">{entry.message}</p>
          {entry.source ? <p className="mt-1 text-xs text-gray-500">{entry.source}</p> : null}
        </div>
      ))}
    </div>
  );
}

function formatDate(value: string) {
  if (!value) return "unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", { hour12: false });
}
