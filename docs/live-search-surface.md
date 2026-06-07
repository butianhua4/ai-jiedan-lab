# Live Search Surface Check

Generated at: 2026-06-07T04:28:35.605Z

This report checks the live production search surfaces. It does not use Search Console traffic, impressions, or ranking data.

Overall: PASS

## Scope

- Canonical base: https://ai-jiedan-lab.vercel.app
- Fetch base: https://ai-jiedan-lab.vercel.app
- Public articles: 15
- Articles checked: 15

## Search Surfaces

- Sitemap URL count: 85
- Sitemap uses canonical base: true
- Sitemap leaks drafts: false
- Robots allows crawling: true
- Robots points to sitemap: true
- llms.txt uses canonical base: true
- llms.txt includes published posts: true
- llms.txt leaks drafts: false
- Home canonical present: true
- Article canonicals present: true

## Failed Checks

- none

## Page Checks

| Path | Status | Result | Expected text |
| --- | --- | --- | --- |
| / | 200 | PASS | AI 接单实验室 |
| /blog | 200 | PASS | 新手教程 |
| /tools | 200 | PASS | AI 工具导航 |
| /tools/proposal-generator | 200 | PASS | Upwork Proposal 生成器 |
| /tools/error-explainer | 200 | PASS | Codex 报错解释器 |
| /tools/pricing-calculator | 200 | PASS | 项目报价助手 |
| /templates | 200 | PASS | 模板下载 |
| /roadmap | 200 | PASS | AI 接单 30 天路线图 |
| /sitemap.xml | 200 | PASS | <urlset |
| /robots.txt | 200 | PASS | Sitemap |
| /llms.txt | 200 | PASS | Draft and noindex articles are intentionally excluded |

## Article Failures

| Path | Status | Title |
| --- | --- | --- |

## Missing From Sitemap

- none
