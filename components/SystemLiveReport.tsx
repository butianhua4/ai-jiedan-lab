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
      { title: "内容系统", data: status.content },
      { title: "SEO 系统", data: status.seo },
      { title: "Question Engine", data: status.questionEngine },
      { title: "页面系统", data: status.pages },
      { title: "内链系统", data: status.links },
      { title: "构建状态", data: status.build },
      { title: "性能指标", data: status.performance },
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
              生成时间：{formatDate(status.generatedAt)} · 模式：{status.system.mode} · NODE_ENV：{status.system.nodeEnv}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md border bg-gray-50 px-4 py-3 text-right">
              <p className="text-xs text-gray-500">健康度</p>
              <p className="text-3xl font-bold text-ink">{status.health.score}/100</p>
            </div>
            <button
              className="rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              disabled={loading}
              onClick={refresh}
              type="button"
            >
              {loading ? "刷新中" : "刷新状态"}
            </button>
          </div>
        </div>
        {refreshError ? <p className="mt-3 text-sm text-red-600">刷新失败：{refreshError}</p> : null}
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
        <Metric label="公开文章" value={status.content.published} />
        <Metric label="草稿" value={status.content.draft} />
        <Metric label="Sitemap URLs" value={status.seo.sitemap.urlCount} />
        <Metric label="孤立页面" value={status.links.orphanPages} />
      </section>

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
        <Panel title="最近 10 条日志">
          {status.logs.latest.length ? (
            <LogList entries={status.logs.latest} />
          ) : (
            <p className="text-sm text-gray-500">暂无 system.log 记录。</p>
          )}
        </Panel>
        <Panel title="错误列表">
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
            <p className="text-sm text-gray-500">当前没有从日志或构建产物中读到错误。</p>
          )}
        </Panel>
      </section>

      <Panel title="未发布草稿列表">
        {status.content.draftList.length ? (
          <div className="grid gap-2 md:grid-cols-2">
            {status.content.draftList.map((post) => (
              <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm" key={post.slug}>
                <p className="font-semibold text-ink">{post.title}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {post.slug} · updated {post.updatedAt} · score {post.qualityScore ?? "n/a"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">没有 draft 状态文章。</p>
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
            <span className={`rounded px-2 py-0.5 text-xs font-semibold ${entry.level === "error" ? "bg-red-100 text-red-700" : entry.level === "warn" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
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
