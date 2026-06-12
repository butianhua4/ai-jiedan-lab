# Platform Connection Status

Updated: 2026-06-12

This document records the current external platform status, article publication bottleneck, and the next operating sequence. It is meant to keep the public GitHub repository honest: traffic, indexing, and revenue should only be claimed when there is measured evidence.

## Current Connections

Connected and usable:

- GitHub: repository, commits, issue templates, pull request template, and public project documentation.
- Vercel: production deployment at https://ai-jiedan-lab.vercel.app.
- Local automation: content status checks, review queue generation, review packs, searchability checks, traffic evidence guardrails.

Ready but not fully connected:

- Google Search Console: homepage, robots.txt, sitemap.xml, and public URLs are reachable, but verification is not ready because `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is missing.

Not connected yet:

- Vercel Web Analytics or Google Analytics: do not enable until tracking purpose and privacy wording are confirmed.
- Gumroad, Lemon Squeezy, or other template sales platforms: wait until public templates or download demand are visible.
- Payoneer, Wise, PayPal, or Stripe: wait until manual service inquiries or paid-template demand appear.
- Additional publishing platforms: prepare content exports first; do not mass-publish unreviewed drafts.

## Search Console Readiness

The latest readiness check against `https://ai-jiedan-lab.vercel.app` shows:

- Homepage returns 200.
- `robots.txt` returns 200.
- `sitemap.xml` returns 200.
- `robots.txt` points to the sitemap.
- Sitemap contains public URLs.
- Missing item: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

Next step: create a Google Search Console property for the production URL, copy the HTML tag `content` value, and set it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel environment variables. After redeploying, rerun:

```bash
npm run search-console:check -- --url=https://ai-jiedan-lab.vercel.app
```

## Traffic Evidence

Current traffic-data status:

- No Search Console performance export is connected.
- No Analytics or Vercel Web Analytics data source is connected.
- No measured impressions, clicks, visits, rankings, or revenue can be claimed.

The correct public statement is: the site is live and indexable at the technical level, but there is no measured traffic evidence yet.

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

1. Connect Google Search Console by adding `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel.
2. Manually review the first 5 priority-5 candidates listed in `docs/review-pack.md` and `docs/review-opinions.md`.
3. For each approved article, add real verification notes: screenshots, command output, demo link, source note, or concrete operating example.
4. Move only approved articles into review status.
5. Publish only 1 to 3 articles per batch, then check live pages, sitemap, and internal links.
6. After Search Console has data, report impressions and clicks from measured exports only.

## Platform Strategy

Near term, focus on the Chinese market first because the content, tutorials, and search intent are currently Chinese. Keep the architecture ready for bilingual expansion, but do not split effort into English distribution until the Chinese content base has more reviewed public pages.

The strongest content lanes are:

- AI deployment tutorials: website deployment, large model deployment, agent deployment, RAG, memory, API routing, cost control.
- Broad AI prompts: sales, customer service, operations, HR, ecommerce, finance, education, development.
- Practical AI office tools: PPT planning, table cleaning, weekly reports, meeting notes, email drafts.
- AI tool comparison and selection: Codex, Claude Code, ChatGPT, Cursor, Vercel, GitHub.

The next public growth bottleneck is not topic inventory. It is turning high-volume drafts into verified, useful, published articles.
