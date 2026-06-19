# Search Platform Setup

Generated for the live site: `https://ai.aporet.com`

This checklist tracks what should be completed in each search and analytics platform. It does not claim impressions, clicks, rankings, or revenue.

## Current Code Support

- Google Analytics 4: enabled by default with `G-BG3NQRLR64`
- Microsoft Clarity: enabled by default with `x9c2phrvfy`
- Google Search Console meta verification: supported by `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- Bing Webmaster meta verification: supported by `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- Ahrefs Webmaster Tools meta verification: supported by `NEXT_PUBLIC_AHREFS_SITE_VERIFICATION`
- Cloudflare Web Analytics: supported by `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`

## Canonical URLs

- Production site: `https://ai.aporet.com`
- Main sitemap index: `https://ai.aporet.com/sitemap.xml`
- Priority sitemap: `https://ai.aporet.com/sitemap-priority.xml`
- Q sitemap: `https://ai.aporet.com/sitemap-q.xml`
- Cluster sitemap: `https://ai.aporet.com/sitemap-cluster.xml`
- Blog sitemap: `https://ai.aporet.com/sitemap-blog.xml`
- Static sitemap: `https://ai.aporet.com/sitemap-static.xml`

## Bing Webmaster Tools

Use the existing site property for `https://ai.aporet.com`.

Submit these sitemaps:

1. `https://ai.aporet.com/sitemap.xml`
2. `https://ai.aporet.com/sitemap-priority.xml`
3. `https://ai.aporet.com/sitemap-q.xml`
4. `https://ai.aporet.com/sitemap-cluster.xml`
5. `https://ai.aporet.com/sitemap-blog.xml`

Submit this first URL batch manually:

1. `https://ai.aporet.com/en`
2. `https://ai.aporet.com/cluster/ai-tools`
3. `https://ai.aporet.com/cluster/codex`
4. `https://ai.aporet.com/cluster/github`
5. `https://ai.aporet.com/cluster/node-js-errors`
6. `https://ai.aporet.com/cluster/upwork`
7. `https://ai.aporet.com/cluster/vercel`
8. `https://ai.aporet.com/q/ai-tools/agent-observability-logging-guide`
9. `https://ai.aporet.com/q/vercel/agent-production-deployment-checklist`
10. `https://ai.aporet.com/q/ai-tools/agent-tool-calling-beginner-guide`
11. `https://ai.aporet.com/q/ai-tools/agent-tool-permission-safety-guide`
12. `https://ai.aporet.com/q/ai-tools/ai-prompt-library-team-knowledge-base-guide`
13. `https://ai.aporet.com/q/ai-tools/claude-api-rate-limit-debug-guide`
14. `https://ai.aporet.com/q/codex/codex-bugfix-rollback-record`
15. `https://ai.aporet.com/q/codex/codex-npm-install-errors`

After manual GSC submission of the same batch, run:

```bash
npm run search-console:mark-submitted -- --add=15
```

## Google Search Console

Use the property: `https://ai.aporet.com/`

Submit:

- `https://ai.aporet.com/sitemap.xml`

Daily manual request target:

- 5 to 15 URLs per day
- Start from `/en`, cluster pages, and high-intent q pages
- Do not submit all 500 URLs at once

## Google Analytics

Recommended setup values:

- Account name: `AI Tools Guide`
- Property name: `AI Tools Guide - ai.aporet.com`
- Reporting time zone: `United States`
- Currency: `USD`
- Business category: `Internet & Telecom` or `Technology`
- Business size: `Small`
- Business objective: `Examine user behavior` and `Generate leads`
- Web stream URL: `https://ai.aporet.com`
- Web stream name: `AI Tools Guide`

Current measurement ID in code:

- `G-BG3NQRLR64`

## Microsoft Clarity

Recommended setup values:

- Project name: `AI Tools Guide`
- Website URL: `https://ai.aporet.com`
- Industry/category: `Technology` or `Software`

Current project ID in code:

- `x9c2phrvfy`

## Ahrefs Webmaster Tools

Recommended setup:

- Project URL: `https://ai.aporet.com`
- Scope: exact subdomain
- Verification: import from Google Search Console first; if unavailable, use HTML meta tag and put the token into `NEXT_PUBLIC_AHREFS_SITE_VERIFICATION`
- Crawl sitemap: `https://ai.aporet.com/sitemap.xml`
- Crawl depth: all discoverable pages

## Cloudflare Web Analytics

Do not change DNS or nameservers just to enable analytics.

Recommended setup:

- Use Cloudflare Web Analytics, not full Cloudflare proxy migration, unless DNS migration is planned separately.
- Hostname: `ai.aporet.com`
- If Cloudflare gives a JS token, add it to Vercel as `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`.
- Redeploy after setting the environment variable.

## Do Not Do

- Do not claim traffic until GA/GSC data is imported or manually verified.
- Do not change `aporet.com` nameservers without a DNS migration checklist.
- Do not submit 500 URLs to Google manually in one day.
- Do not add duplicate GA, Clarity, or Cloudflare snippets through multiple tools at the same time.
