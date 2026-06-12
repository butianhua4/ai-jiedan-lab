# Platform Connection Status

Updated: 2026-06-12

This document records the current external platform status, article publication bottleneck, and the next operating sequence. It is meant to keep the public GitHub repository honest: traffic, indexing, and revenue should only be claimed when there is measured evidence.

## Current Connections

Connected and usable:

- GitHub: repository, commits, issue templates, pull request template, and public project documentation.
- Vercel: production deployment at https://ai-jiedan-lab.vercel.app.
- Google Search Console: user-provided screenshot on 2026-06-12 shows the `https://ai-jiedan-lab.vercel.app/` property exists, with Search Console overview, page indexing, and messages visible.
- Local automation: content status checks, review queue generation, review packs, searchability checks, traffic evidence guardrails.

Ready but not fully connected:

- Local Search Console verification automation: homepage, robots.txt, sitemap.xml, and public URLs are reachable, but the local readiness script still reports missing `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. This means the project cannot prove the verification token from env/live HTML, not that the Search Console property does not exist.

Not connected yet:

- Vercel Web Analytics or Google Analytics: do not enable until tracking purpose and privacy wording are confirmed.
- Gumroad, Lemon Squeezy, or other template sales platforms: wait until public templates or download demand are visible.
- Payoneer, Wise, PayPal, or Stripe: wait until manual service inquiries or paid-template demand appear.
- Additional publishing platforms: prepare content exports first; do not mass-publish unreviewed drafts.

## Search Console Status

User-provided Search Console evidence from 2026-06-12 shows:

- The `https://ai-jiedan-lab.vercel.app/` property is present in Google Search Console.
- Search Console overview is available.
- Performance summary currently shows 0 Google Search clicks.
- Indexing summary shows 3 indexed pages and 1 unindexed page.
- Search Console messages include property setup, monitoring results, and a notice about pages not being indexed.

The local readiness check against `https://ai-jiedan-lab.vercel.app` still shows:

- Homepage returns 200.
- `robots.txt` returns 200.
- `sitemap.xml` returns 200.
- `robots.txt` points to the sitemap.
- Sitemap contains public URLs.
- Missing item: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

Next step: keep the existing Search Console property. If the HTML tag token is available, optionally set it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel so local automation can verify the same evidence. After redeploying, rerun:

```bash
npm run search-console:check -- --url=https://ai-jiedan-lab.vercel.app
```

## Traffic Evidence

Current traffic-data status:

- Search Console UI evidence exists, but no export or API-backed measured traffic file is connected to the repository.
- No Analytics or Vercel Web Analytics data source is connected.
- From the user-provided Search Console screenshot, the current visible click count is 0.
- No measured visits, rankings, or revenue can be claimed.

The correct public statement is: the site is live, Search Console is set up, some pages are indexed, but there is no proven search traffic yet.

## Article Publication Status

Current content snapshot:

- Article files: 669.
- Published public articles: 15.
- Draft articles: 633.
- Archived articles: 21.
- Publishable now: 0.
- Priority-5 review candidates found by automation: 25.

The public article count is low because most articles are still `draft`, not because they have failed platform review. The project intentionally blocks unreviewed content from `/blog` and `sitemap.xml`.

Publication rule:

```text
draft -> automated checks -> human review -> review -> small-batch publish
```

Automation can prepare candidates, but it should not mark drafts as reviewed or publish them without human confirmation.

## Immediate Next Steps

1. Use the existing Search Console property to inspect the unindexed URL and reason.
2. Move the first approved review-entry batch into review status.
3. Publish only 1 to 3 approved articles per batch, then check live pages, sitemap, and internal links.
4. Submit the sitemap or request inspection for newly published URLs in Search Console.
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
