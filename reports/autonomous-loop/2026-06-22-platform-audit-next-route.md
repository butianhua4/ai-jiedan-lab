# Platform Audit And Next Route

Generated: 2026-06-22

## Scope

Audit target:

- Production site: `https://ai.aporet.com`
- Search surfaces: Google indexed pages, sitemap, robots, q pages, cluster pages
- Platform readiness: GSC, Bing Webmaster Tools, GA4, Clarity, Ahrefs, Cloudflare, Vercel
- Project automation state after syncing local `main` with `origin/main`

## Browser Access Note

The Chrome extension control channel returned a session metadata error during this run, so logged-in private dashboard values could not be read directly from the open browser tabs.

This report uses verifiable public endpoints, local project state, generated automation reports, and public search visibility only. It does not claim private GSC/GA/Bing/Ahrefs metrics.

## Verified Public State

- Homepage: `https://ai.aporet.com/` returns HTTP 200
- `robots.txt`: returns HTTP 200 and points to `https://ai.aporet.com/sitemap.xml`
- `sitemap.xml`: returns HTTP 200 and is a sitemap index
- `sitemap-q.xml`: returns HTTP 200
- `sitemap-cluster.xml`: returns HTTP 200
- `sitemap-blog.xml`: returns HTTP 200
- Growth API: `https://ai.aporet.com/api/seo/growth-report` returns HTTP 200

Current project state after sync:

- Local `main` is aligned with `origin/main`
- Latest synced commit: `d7aac12c auto: advance seo growth loop - 2026-06-22 - execute-low-risk`
- Public content:
  - 500 blog pages
  - 500 q pages
  - 6 cluster pages
  - 0 orphan pages
  - 0 weak pages
  - internal link health: 100
  - SEO score: 100

## Search Visibility Evidence

Public search results now show `ai.aporet.com` q pages and cluster pages. Examples observed:

- `/q/ai-tools/ai-video-tools-beginner-guide`
- `/cluster/codex`
- `/q`
- `/q/ai-tools/chroma-vector-database-rag-guide`
- `/q/vercel/ray-serve-llm-deployment-guide`

Conclusion: the site is not invisible. Google has started discovering/indexing at least part of the q and cluster surface.

## Current Platform Gaps

These are real gaps, not guesses:

- GSC performance import rows: 0
- Bing performance import rows: 0
- Ahrefs audit import rows: 0
- Cloudflare Web Analytics import rows: 0
- `impressions`: null in local performance import
- `clicks`: null in local performance import
- GSC/Bing API imports are not connected
- Ahrefs verification/meta is not configured locally
- Cloudflare Web Analytics token is not configured locally
- GSC manual submission progress still records 0 confirmed URL Inspection submissions

## Main Diagnosis

The site structure is already strong enough for growth testing:

- q layer exists
- cluster layer exists
- blog depth layer exists
- sitemap is split correctly
- internal links are complete
- public search visibility has started

The bottleneck is no longer page volume. The bottleneck is measurement and prioritization:

1. Search performance data is not flowing back into the repo.
2. We cannot identify which indexed pages have impressions without GSC/Bing exports.
3. Manual GSC submission progress is not recorded.
4. High-potential q pages need CTR/title/snippet refinement based on real query evidence.

## Next Route

### Phase 1: Data Return Loop

Goal: stop guessing and let platform data drive changes.

Actions:

1. Export GSC Performance data for `https://ai.aporet.com`.
2. Save it as `content/automation/platform-data/gsc-performance.csv`.
3. Export Bing Webmaster performance data.
4. Save it as `content/automation/platform-data/bing-performance.csv`.
5. Paste Ahrefs audit summary into `content/automation/platform-data/ahrefs-site-audit.json`.
6. Paste Cloudflare analytics summary into `content/automation/platform-data/cloudflare-web-analytics.json` if Cloudflare analytics is active.

Success condition:

- `/admin/system-live` shows non-zero import rows.
- `/api/seo/growth-report` can move from structure-only warming to evidence-backed growing when impressions appear.

### Phase 2: Indexing Priority Loop

Goal: push the right URLs, not all URLs.

Actions:

1. Continue using `content/automation/gsc-submission-progress.json`.
2. Submit only 10-20 priority URLs per manual GSC session.
3. Prioritize:
   - `/cluster/ai-tools`
   - `/cluster/codex`
   - `/cluster/vercel`
   - `/q/ai-tools/agent-observability-logging-guide`
   - `/q/vercel/agent-production-deployment-checklist`
   - `/q/ai-tools/agent-tool-calling-beginner-guide`
   - `/q/ai-tools/claude-api-rate-limit-debug-guide`
   - `/q/codex/codex-npm-install-errors`
   - `/q/node-js-errors/dependency-conflict-fix`
   - `/q/github/failed-to-push-some-refs-fix`
4. After each manual batch, update progress using:

```bash
npm run search-console:mark-submitted -- --add=<submitted count>
```

Success condition:

- GSC manual progress no longer says confirmed submitted count is 0.

### Phase 3: CTR And US Search Intent

Goal: improve click probability for pages already discoverable.

Actions:

1. Focus on English/US problem queries:
   - Codex install failed
   - Claude API rate limit
   - Vercel deployment failed
   - GitHub Actions build failed
   - npm module not found
   - Next.js hydration error
   - RAG no context
   - AI agent memory
2. For the top 50 priority q pages, tighten:
   - title
   - first answer block
   - risk note
   - related q links
   - FAQ JSON-LD
3. Avoid broad "AI tools introduction" pages until performance data shows demand.

Success condition:

- q pages begin showing impressions in GSC/Bing exports.

### Phase 4: Platform Completion

Goal: make each platform useful, not just registered.

Actions:

- GSC: monitor indexing and queries.
- Bing: submit sitemap and use IndexNow; monitor search performance.
- GA4: verify page_view events after real visits.
- Clarity: check recordings/heatmaps once traffic appears.
- Ahrefs: run technical audit and watch external links.
- Cloudflare: either connect Web Analytics token or treat it as optional until traffic is measurable.
- Vercel: monitor deployment health only; no domain migration unless needed.

## 7-Day Execution Plan

Day 1:

- Import GSC/Bing exports if available.
- Update manual GSC submission progress.
- Generate fresh priority URL list.

Day 2:

- Optimize top 20 q page snippets based on priority queue.
- Re-run lint, SEO check, build.

Day 3:

- Check public search visibility for q/cluster pages.
- Submit another 10-20 URLs in GSC.

Day 4:

- Add/refresh Ahrefs audit summary.
- Fix any technical SEO warnings if real.

Day 5:

- Review GA4 and Clarity for first user behavior data.
- If no data, verify tracking scripts on live HTML.

Day 6:

- Expand English q intent pages only where existing content already supports the query.
- Do not bulk-generate low-quality pages.

Day 7:

- Compare GSC/Bing exports.
- Promote pages with impressions into CTR optimization queue.

## Route Decision

Proceed with:

1. Data import loop
2. Manual GSC priority submission tracking
3. Top q page CTR/snippet optimization

Do not proceed with:

- More bulk page generation
- Domain migration
- Monetization checkout work
- Ad/affiliate claims

Those come after impressions and first measurable clicks appear.

