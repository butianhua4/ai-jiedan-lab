# Human Approval Repair Progress

Generated at: 2026-06-18T02:00:31.156Z

This report is read-only. It tracks whether repair-route categories are still open, blocked, evidence-ready, resolved, or manual-only.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Use this report to decide the next manual repair session. It does not make or approve article changes.
- Note: Read-only repair progress tracker. It compares the manual repair route with current evidence and stops before article edits, mark:review, or publish.

## Publishing Boundary

- Current public published: 500
- Current publishable now: 0
- Publish confirm commands included: 0
- Traffic data available: false

## Summary

- Files tracked: 3
- Categories tracked: 18
- Open categories: 8
- Blocked categories: 2
- Evidence-ready categories: 3
- Resolved categories: 4
- Manual-only categories: 1
- Files ready for human approval after repair: 0
- Next repair title: Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级
- Next repair file: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Route sessions: 12
- Publish confirm commands included: 0
- Traffic data available: false
- Unsafe items: 2

## Source Evidence

- decisionMatrixItems: 3
- decisionMatrixRepairItems: 1
- decisionMatrixUnsafeItems: 0
- internalLinkItems: 3
- internalLinkUnsafeItems: 0
- repairQueueMinimumPathFiles: 3
- repairQueueMinimumPathTasks: 16
- repairQueueUnsafeItems: 0
- routeFiles: 3
- routeSessions: 12
- routeUnsafeItems: 2
- searchIntentItems: 3
- searchIntentUnsafeItems: 0
- sourceVerificationItems: 3
- sourceVerificationUnsafeItems: 0
- sourceUrlFixActions: 26
- remediationUnsafeItems: 2

## Unsafe Items

| Rank | Open categories | Ready after repair | Title | File |
| ---: | --- | --- | --- | --- |
| 666 | source-url, search-intent, approval-boundary | false | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 635 | source-url, search-intent, internal-link, approval-boundary | false | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

## Progress By File

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Lane: ai-deployment
- Primary query: 大模型部署教程
- Open categories: source-url, search-intent, copydesk
- Ready for human approval after repair: false
- Next manual session: source verification first
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human`

| Category | Status | Detail | Next action | Proof required |
| --- | --- | --- | --- | --- |
| source-url | open | 11 source URL remediation action(s) still need human confirmation. | Open each failed source URL manually, replace dead URLs with accessible canonical sources, then rerun automation. | Reviewer confirms final source URLs are canonical or replaced with accessible equivalents. |
| source-review | evidence-ready | Source review evidence is ready, but human confirmation is still required before mark:review. | Human reviewer verifies fast-changing claims against the listed sources. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| search-intent | open | 2 search-intent weakness(es) remain. | Adjust title, description, opening, heading, or body so the accepted query appears naturally. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| internal-link | resolved | At least one contextual public article link is present. | Keep the contextual public link if it helps the reader. | Draft contains at least one contextual link to a currently published relevant article. |
| copydesk | open | Copydesk warning remediation still needs human acceptance or cleanup. | Resolve or explicitly accept the copydesk warning without weakening guardrails. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| approval-boundary | manual-only | Manual approval boundary is intact and publish confirmation is not included. | Do not run mark:review until explicit human approval per file. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Lane: ai-deployment
- Primary query: RAG 知识库搭建教程
- Open categories: source-url, search-intent, approval-boundary
- Ready for human approval after repair: false
- Next manual session: source verification first
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human`

| Category | Status | Detail | Next action | Proof required |
| --- | --- | --- | --- | --- |
| source-url | open | 8 source URL remediation action(s) still need human confirmation. | Open each failed source URL manually, replace dead URLs with accessible canonical sources, then rerun automation. | Reviewer confirms final source URLs are canonical or replaced with accessible equivalents. |
| source-review | evidence-ready | Source review evidence is ready, but human confirmation is still required before mark:review. | Human reviewer verifies fast-changing claims against the listed sources. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| search-intent | open | 4 search-intent weakness(es) remain. | Adjust title, description, opening, heading, or body so the accepted query appears naturally. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| internal-link | resolved | At least one contextual public article link is present. | Keep the contextual public link if it helps the reader. | Draft contains at least one contextual link to a currently published relevant article. |
| copydesk | resolved | No copydesk warning is listed in the remediation pack. | No copydesk action required. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| approval-boundary | blocked | Manual approval boundary has a blocking mismatch. | Fix command/status boundary before any review action. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

### Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Lane: ai-deployment
- Primary query: Vercel build failed
- Open categories: source-url, search-intent, internal-link, approval-boundary
- Ready for human approval after repair: false
- Next manual session: source verification first
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human`

| Category | Status | Detail | Next action | Proof required |
| --- | --- | --- | --- | --- |
| source-url | open | 7 source URL remediation action(s) still need human confirmation. | Open each failed source URL manually, replace dead URLs with accessible canonical sources, then rerun automation. | Reviewer confirms final source URLs are canonical or replaced with accessible equivalents. |
| source-review | evidence-ready | Source review evidence is ready, but human confirmation is still required before mark:review. | Human reviewer verifies fast-changing claims against the listed sources. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| search-intent | open | 2 search-intent weakness(es) remain. | Adjust title, description, opening, heading, or body so the accepted query appears naturally. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| internal-link | open | No current link to a published article. | Add one useful contextual link to a currently published relevant article. | Draft contains at least one contextual link to a currently published relevant article. |
| copydesk | resolved | No copydesk warning is listed in the remediation pack. | No copydesk action required. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| approval-boundary | blocked | Manual approval boundary has a blocking mismatch. | Fix command/status boundary before any review action. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

