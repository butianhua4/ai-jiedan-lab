# Domestic Search Adaptation Plan

Generated at: 2026-06-20T14:24:00.464Z

## Strategic Decision

- Primary market: US/global
- Secondary market: China
- Recommendation: Keep US/global search as the primary growth lane, and treat China search as an optional mirror/distribution lane until a mainland-accessible deployment exists.
- Reason: The live site is built around Vercel/custom-domain deployment and English/technical problem queries. Mainland search access can be inconsistent for Vercel-hosted assets, so forcing China-first indexing now would add operational complexity before the Google/Bing surface matures.

## Current State

- canonicalDomain: https://ai.aporet.com
- qPages: 500
- blogPages: 500
- clusterPages: 6
- orphanPages: 0
- internalLinkHealth: 100
- bingStatus: indexnow_surface_present
- googleAnalyticsConfigured: true
- microsoftClarityConfigured: true

## China Search Risks

- [high] Mainland crawlers may not reliably reach Vercel-hosted pages. Response: Do not promise Baidu/360/Sogou indexing from the current deployment. If China becomes primary, deploy a China-accessible mirror on a compliant host and use canonical strategy carefully.
- [high] Duplicate domain mirrors can split authority if canonicals and sitemap ownership are unclear. Response: Keep one canonical domain for Google/Bing now. If a China mirror is added, decide whether it is an alternate language/regional mirror or a separate product surface before submitting sitemaps.
- [medium] Domestic platforms require more manual verification and may not value the same English problem queries. Response: Prioritize Chinese landing/category pages only after real Google/Bing crawl and impression signals exist.
- [medium] Analytics scripts can be blocked or delayed in some regions. Response: Use server-side logs and platform dashboards as the source of truth; do not infer traffic from missing GA/Clarity data.

## Platform Checklist

| Platform | Status | Purpose | Action |
| --- | --- | --- | --- |
| Bing Webmaster Tools | ready | Bing discovery, IndexNow, sitemap processing, and Microsoft Copilot/AI visibility signals. | Keep /sitemap.xml submitted, refresh IndexNow readiness daily, and submit priority q/cluster URLs in small reviewed batches. |
| Google Search Console | manual | Primary search validation for the current canonical domain. | Continue daily URL Inspection for 5-15 priority q/cluster URLs and record confirmed submissions locally. |
| Baidu Webmaster | not_now | China mainland search discovery if a mainland-accessible deployment is created. | Register only after deciding a China-accessible domain or mirror. Do not submit the current Vercel-hosted surface as a guaranteed mainland SEO asset. |
| 360 Search / Sogou | optional | Secondary domestic discovery. | Defer until Baidu/domain strategy is clear. These should not distract from Google/Bing early growth. |
| Microsoft Clarity | ready | Behavior observation after visitors arrive. | Use heatmaps/session recordings after real visits appear; do not use it as an indexing signal. |

## Domain Options

### Keep ai.aporet.com as canonical

- Fit: recommended
- Best for current Google/Bing momentum.
- Avoids splitting authority while the site is still early in indexing.
- Matches existing sitemap and Search Console setup.

### Add a China-accessible mirror later

- Fit: optional
- Useful only if China becomes a serious acquisition channel.
- Requires careful canonical, hreflang/regional copy, sitemap, and analytics separation.
- Should be tested with live crawler/access checks before submission.

### Move canonical domain immediately to a new mainland-oriented host

- Fit: avoid_now
- High migration risk while Google/Bing has just started processing the new domain.
- Can reset or delay search signals.
- Not needed for the current US/global target market.

## Next Actions

- Keep Google/Bing as the primary indexing loop for the next 2-4 weeks.
- Use Bing IndexNow for reviewed q/cluster batches, not unreviewed bulk pushes.
- Do not register Baidu/360/Sogou until a China-accessible deployment decision is made.
- Prepare a small Chinese regional landing page plan only after GSC/Bing impressions identify winning topics.
- If using a subdomain on the existing aporet.com domain, keep ai.aporet.com canonical and avoid redirect experiments during early indexing.
