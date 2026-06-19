# US Search Growth Playbook

Generated at: 2026-06-19

## Current GSC Reading

- Observed from the latest Search Console screenshots: about 3 indexed pages and about 88 unindexed discovered pages.
- This is a cold-start / warming-stage signal, not a penalty signal by itself.
- The system health checks remain clean: orphan pages 0, weak pages 0, internal link health 100, growth readiness score 100.

## What the 80+ Unindexed Pages Mean

Google has found the URLs, but most of them are not currently selected for the search index.

The two practical buckets are:

1. Discovered, currently not indexed
   - Google knows the URL from sitemap or internal links.
   - It has not crawled the page yet, or has delayed crawling because the site is new and many URLs appeared quickly.
   - This is common when a new site publishes a large q / blog / cluster set before the domain has crawl history.

2. Crawled, currently not indexed
   - Google has fetched the page.
   - It has not chosen to index it yet.
   - Common causes: weak uniqueness, similar pages competing with each other, low external authority, weak search demand, or not enough evidence that the page is useful compared with existing results.

## US Market Positioning

The deployment stack is easier for Google and global users than for many China-based discovery channels, so the near-term strategy should prioritize US and global English-speaking search intent.

Do not switch the whole Chinese site to `en-US` while most content is Chinese. Instead:

- Keep Chinese pages correctly labeled as Chinese.
- Add English entry pages for high-intent US search paths.
- Use English metadata, Open Graph, and JSON-LD alternate names.
- Push English entry pages, cluster pages, and q pages through GSC first.

## New US Entry

The new page `/en` is the first English search entry page.

Its purpose:

- Explain the site to US search users.
- Link into q pages, cluster pages, blog guides, and tools.
- Give Google a clear English-language surface before it evaluates hundreds of Chinese long-tail pages.

## Current GSC Priority Order

Use this order for manual URL Inspection requests:

1. `https://ai.aporet.com/en`
2. `https://ai.aporet.com/cluster/ai-tools`
3. `https://ai.aporet.com/cluster/codex`
4. `https://ai.aporet.com/cluster/github`
5. `https://ai.aporet.com/cluster/node-js-errors`
6. `https://ai.aporet.com/cluster/upwork`
7. `https://ai.aporet.com/cluster/vercel`
8. Core q pages for Agent, RAG, Vercel failures, GitHub Actions failures, API key, and rate limit queries.

The generated source of truth is:

- `docs/gsc-url-inspection-top-100.txt`
- `docs/gsc-url-inspection-top-500.txt`
- `content/automation/gsc-submission-progress.json`

## CTR Improvement Rules

Only optimize pages when they have impressions or are in the top GSC queue.

For each priority page:

- Title: include the exact searched problem, not a broad category.
- Description: state the quick fix or decision path.
- First block: answer the problem directly in 2-4 sentences.
- Body: include steps, commands, risks, and related q links.
- Links: connect q -> blog -> cluster -> related q.

## Next Operating Rule

For the next 7 days:

- Do not expand beyond the current 500-page queue unless GSC starts crawling/indexing consistently.
- Request indexing for 10-30 high-priority URLs per day if GSC allows it.
- Watch for movement from discovered to crawled first; clicks usually come later.
- When impressions appear, optimize those pages first instead of guessing.
