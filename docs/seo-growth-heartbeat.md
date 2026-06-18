# SEO Growth Heartbeat

Generated at: 2026-06-18T20:46:18.897Z

## Status

- Severity: yellow
- Health score: 80
- Growth stage: warming
- Can continue scaling: true

## Guardrails

- Fake traffic claims: false
- Fake revenue claims: false
- Note: GSC clicks, impressions, rankings, and indexed page counts are not invented. They remain external until manually checked or API-connected.

## Growth

- totalPages: 1006
- qPages: 500
- blogPages: 500
- clusterPages: 6
- orphanPages: 0
- weakPages: 0
- internalLinkHealth: 100
- growthReadinessScore: 100
- seoScore: 100
- graphNodes: 1006
- graphEdges: 9572

## Live Probes

- home: ok (200)
- blog: ok (200)
- q: ok (200)
- sitemapIndex: ok (200)
- sitemapBlog: ok (200), loc=500
- sitemapQ: ok (200), loc=507
- sitemapCluster: ok (200), loc=6
- robots: ok (200)
- growthApi: ok (200)
- indexNowKey: ok (200)

## Vercel

- Repository: butianhua4/ai-jiedan-lab
- SHA: 9813b24d41ebf08c46d063acd8196a6472ab1d50
- State: pending
- Description: Vercel is deploying your app
- Target: https://vercel.com/ip-studio-s-projects/ai-jiedan-lab/2txvPU5HBC5YDtmzBbaG5WnCqDiX

## Problems

- [yellow] vercel: Latest Vercel deployment is still pending.

## Next Actions

1. Check the Vercel deployment URL if it stays pending for more than 20 minutes.
2. In GSC, resubmit /sitemap.xml when a deployment changes q, cluster, or sitemap structure.
3. Manually request indexing for 15-30 priority URLs from docs/gsc-indexing-priority.md when GSC allows it; do not submit all 500 pages.
4. Prioritize exact problem-entry pages: Codex errors, Vercel failures, GitHub Actions failures, Agent deployment, RAG memory, API key and rate limits.
