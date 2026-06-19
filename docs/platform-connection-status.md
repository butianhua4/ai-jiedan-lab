# Platform Connection Status

Updated: 2026-06-15

This document records the current external platform status, article publication bottleneck, and the next operating sequence. It is meant to keep the public GitHub repository honest: traffic, indexing, and revenue should only be claimed when there is measured evidence.

## Current Connections

Connected and usable:

- GitHub: repository, commits, issue templates, pull request template, and public project documentation.
- Vercel: production deployment at https://ai.aporet.com.
- Google Search Console: user-provided screenshots on 2026-06-12 and 2026-06-15 show the `https://ai.aporet.com/` property exists, with Search Console overview, page indexing, URL inspection, sitemap, HTTPS, and link reports visible.
- Local automation: content status checks, review queue generation, review packs, searchability checks, traffic evidence guardrails.

Ready but not fully connected:

- Local Search Console verification automation: homepage, robots.txt, sitemap.xml, and public URLs are reachable, but the local readiness script still reports missing `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. This means the project cannot prove the verification token from env/live HTML, not that the Search Console property does not exist.

Not connected yet:

- Vercel Web Analytics or Google Analytics: do not enable until tracking purpose and privacy wording are confirmed.
- Gumroad, Lemon Squeezy, or other template sales platforms: wait until public templates or download demand are visible.
- Payoneer, Wise, PayPal, or Stripe: wait until manual service inquiries or paid-template demand appear.
- Additional publishing platforms: prepare content exports first; do not mass-publish unreviewed drafts.

## Search Console Status

User-provided Search Console evidence from 2026-06-12 and 2026-06-15 shows:

- The `https://ai.aporet.com/` property is present in Google Search Console.
- Search Console overview is available.
- Performance summary currently shows 0 Google Search clicks, 11 impressions, 0% CTR, and average position 10 in the visible 3-month report.
- Page indexing summary in the visible report shows 3 indexed pages and 1 unindexed page, but this report is lagging behind the latest 500-article sitemap.
- URL inspection confirms the homepage is indexed and `/deployments` is indexed.
- URL inspection still reports several newly published URLs as not known to Google yet, including `/prompts` and selected new blog posts. This means Google has not discovered or crawled those URLs yet; it is not evidence that the live pages are blocked.
- Sitemap report shows `/sitemap.xml` submitted successfully, but the visible last-read/discovered count is stale compared with the current live sitemap.

The local readiness check against `https://ai.aporet.com` still shows:

- Homepage returns 200.
- `robots.txt` returns 200.
- `sitemap.xml` returns 200.
- `robots.txt` points to the sitemap.
- Sitemap contains public URLs.
- Missing item: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

Next step: keep the existing Search Console property. Resubmit `sitemap.xml` after the latest deployment, then use URL Inspection for priority URLs. For each priority URL that says Google cannot identify the URL, click "Test live URL" first; if the live test confirms the page is available and indexable, click "Request indexing".

Priority URL inspection queue:

```text
https://ai.aporet.com/
https://ai.aporet.com/deployments
https://ai.aporet.com/prompts
https://ai.aporet.com/blog/ai-agent-deployment-vercel-ai-sdk-guide
https://ai.aporet.com/blog/industry-ai-prompts-template-library-2026
https://ai.aporet.com/blog/ai-agent-memory-rag-design-guide
https://ai.aporet.com/blog/llm-deployment-beginner-guide
```

If the HTML tag token is available, optionally set it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel so local automation can verify the same evidence. After redeploying, rerun:

```bash
npm run search-console:check -- --url=https://ai.aporet.com
```

## Traffic Evidence

Current traffic-data status:

- Search Console UI evidence exists, but no export or API-backed measured traffic file is connected to the repository.
- No Analytics or Vercel Web Analytics data source is connected.
- From the user-provided Search Console screenshot, the current visible click count is 0.
- No measured visits, rankings, or revenue can be claimed.

The correct public statement is: the site is live, Search Console is set up, some pages are indexed, but there is no proven search traffic yet.

## Article Publication Status

Current content snapshot after the explicit owner-approved bulk publication wave:

- Article files: 669.
- Published public articles: 500.
- Draft articles: 148.
- Archived articles: 21.
- Publishable now: 0.
- `npm run seo:check` reports 500 public posts and no draft/review leakage.

The public article count is no longer low on the site. Search Console is still showing a much smaller indexed/discovered count because Google has not recrawled the latest sitemap and has not discovered many new URLs yet.

Publication rule:

```text
draft -> automated checks -> human review -> review -> small-batch publish
```

Automation can prepare candidates, but it should not mark drafts as reviewed or publish them without human confirmation.

## Immediate Next Steps

1. Use the existing Search Console property to inspect the unindexed URL and reason.
2. Move the first approved review-entry batch into review status.
3. Resubmit `sitemap.xml` in Search Console after the latest deployment.
4. Request indexing for the priority URLs listed above, respecting Search Console's daily quota.
5. After Search Console has measurable impressions/clicks, report only those measured numbers.
6. Optionally add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel so local automation can detect verification evidence.

## Platform Strategy

Near term, focus on the Chinese market first because the content, tutorials, and search intent are currently Chinese. Keep the architecture ready for bilingual expansion, but do not split effort into English distribution until the Chinese content base has more reviewed public pages.

The strongest content lanes are:

- AI deployment tutorials: website deployment, large model deployment, agent deployment, RAG, memory, API routing, cost control.
- Broad AI prompts: sales, customer service, operations, HR, ecommerce, finance, education, development.
- Practical AI office tools: PPT planning, table cleaning, weekly reports, meeting notes, email drafts.
- AI tool comparison and selection: Codex, Claude Code, ChatGPT, Cursor, Vercel, GitHub.

The next public growth bottleneck is not topic inventory. It is turning high-volume drafts into verified, useful, published articles.
