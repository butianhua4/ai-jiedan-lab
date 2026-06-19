# Deployment Freshness

Generated at: 2026-06-19T02:13:37.288Z

This report checks whether production HTML matches the current SEO code expectations.

## Guardrails

- No traffic claims: true
- No indexing claims: true
- Note: This report checks whether production HTML matches the current SEO code expectations. It does not claim Google indexing, ranking, impressions, clicks, or revenue.

## Summary

- Base: https://ai-jiedan-lab.vercel.app
- ok: true
- checks: 7
- passed: 7
- staleItems: 0
- productionFresh: true
- needsVercelAttention: false

## Checks

| Check | Status | Expected | Actual | URL |
| --- | --- | --- | --- | --- |
| q detail page uses current US-facing title | PASS | Agent Tool Permission Safety Guide | Agent Tool Permission Safety Guide: quick fix, steps, and deep guide \| AI Tools Guide | https://ai-jiedan-lab.vercel.app/q/ai-tools/agent-tool-permission-safety-guide |
| q detail page uses current US-facing H1 | PASS | Agent Tool Permission Safety Guide | Agent Tool Permission Safety Guide | https://ai-jiedan-lab.vercel.app/q/ai-tools/agent-tool-permission-safety-guide |
| q detail page keeps JSON-LD graph | PASS | FAQPage + BreadcrumbList + at least 4 JSON-LD blocks | 4 JSON-LD block(s) | https://ai-jiedan-lab.vercel.app/q/ai-tools/agent-tool-permission-safety-guide |
| cluster hub uses current English title | PASS | AI tools and LLM applications topic hub | AI tools and LLM applications topic hub \| AI Tools Guide | https://ai-jiedan-lab.vercel.app/cluster/ai-tools |
| cluster hub uses current English H1 | PASS | AI tools and LLM applications topic hub | AI tools and LLM applications topic hub | https://ai-jiedan-lab.vercel.app/cluster/ai-tools |
| q index is reachable with JSON-LD | PASS | 200 and at least 4 JSON-LD blocks | 200, 4 JSON-LD block(s) | https://ai-jiedan-lab.vercel.app/q |
| main sitemap index includes q, cluster, blog, and priority sitemaps | PASS | sitemap-q.xml, sitemap-cluster.xml, sitemap-blog.xml, sitemap-priority.xml | 200, length=735 | https://ai-jiedan-lab.vercel.app/sitemap.xml |

## Next Actions

- Production HTML matches the current SEO entry metadata.
- Proceed with the next GSC URL Inspection batch from docs/gsc-submission-progress.md.
