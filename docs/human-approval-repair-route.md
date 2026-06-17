# Human Approval Repair Route

Generated at: 2026-06-17T16:47:40.005Z

This report is read-only. It converts the repair queue into a manual repair order and stops before article edits or status changes.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Use this route to assign manual repair sessions only. Run mark:review only after explicit human approval per file.
- Note: Read-only approval repair route. It chooses the next human repair order from the repair queue and stops before article edits, mark:review, or publish.

## Publishing Boundary

- Current public published: 500
- Current publishable now: 0
- Publish confirm commands included: 0
- Traffic data available: false

## Summary

- Files routed: 3
- Repair-before-review items: 1
- Minimum path tasks: 16
- Route sessions: 12
- High-risk tasks: 6
- Next repair title: Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级
- Next repair file: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Publish confirm commands included: 0
- Traffic data available: false
- Unsafe items: 2

## Source Evidence

- decisionMatrixItems: 3
- decisionMatrixRepairItems: 1
- decisionMatrixUnsafeItems: 0
- repairQueueFullTasks: 55
- repairQueueMinimumPathFiles: 3
- repairQueueMinimumPathTasks: 16
- repairQueueUnsafeItems: 0

## Unsafe Items

| Rank | High risk | Min tasks | Sessions | Lane | Primary query | Title | File |
| ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 666 | 2 | 5 | 4 | ai-deployment | RAG 知识库搭建教程 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 635 | 2 | 5 | 4 | ai-deployment | Vercel build failed | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

## Route Order

| Rank | High risk | Min tasks | Sessions | Lane | Primary query | Title | File |
| ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 1761 | 2 | 6 | 4 | ai-deployment | 大模型部署教程 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 666 | 2 | 5 | 4 | ai-deployment | RAG 知识库搭建教程 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 635 | 2 | 5 | 4 | ai-deployment | Vercel build failed | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

## Repair Sessions

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human`
- Rerun after repair: `npm run automation:human-approval-repair-queue`, `npm run automation:human-approval-repair-route`, `npm run automation:gate`, `npm run automation:digest`
- Publish confirm: not-included

#### source verification first

- [high] source-url: Verify source URLs and fact-check queries before mark:review.
- [high] source-review: Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.

Proof:

- Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent.
- Reviewer records source/fact-check confirmation and removes unsupported claims.

#### search intent alignment

- [medium] search-intent: Resolve search weakness: no exact search query appears in title.

Proof:

- Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body.

#### public internal link insertion

- [medium] internal-link: Apply or explicitly reject the internal-link suggestion before mark:review.

Proof:

- Draft contains at least one contextual link to a currently published relevant article.

#### copydesk and approval boundary

- [medium] copydesk: Review reason: copydesk warning remediation exists.
- [medium] approval-boundary: Publishing remains a separate explicit approval step.

Proof:

- Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails.
- Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval.

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human`
- Rerun after repair: `npm run automation:human-approval-repair-queue`, `npm run automation:human-approval-repair-route`, `npm run automation:gate`, `npm run automation:digest`
- Publish confirm: not-included

#### source verification first

- [high] source-url: Verify source URLs and fact-check queries before mark:review.
- [high] source-review: Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.

Proof:

- Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent.
- Reviewer records source/fact-check confirmation and removes unsupported claims.

#### search intent alignment

- [medium] search-intent: Resolve search weakness: no exact search query appears in title.

Proof:

- Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body.

#### public internal link insertion

- [medium] internal-link: Apply or explicitly reject the internal-link suggestion before mark:review.

Proof:

- Draft contains at least one contextual link to a currently published relevant article.

#### copydesk and approval boundary

- [medium] approval-boundary: Publishing remains a separate explicit approval step.

Proof:

- Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval.

### Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human`
- Rerun after repair: `npm run automation:human-approval-repair-queue`, `npm run automation:human-approval-repair-route`, `npm run automation:gate`, `npm run automation:digest`
- Publish confirm: not-included

#### source verification first

- [high] source-url: Verify source URLs and fact-check queries before mark:review.
- [high] source-review: Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.

Proof:

- Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent.
- Reviewer records source/fact-check confirmation and removes unsupported claims.

#### search intent alignment

- [medium] search-intent: Resolve search weakness: no exact search query appears in title.

Proof:

- Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body.

#### public internal link insertion

- [medium] internal-link: Apply or explicitly reject the internal-link suggestion before mark:review.

Proof:

- Draft contains at least one contextual link to a currently published relevant article.

#### copydesk and approval boundary

- [medium] approval-boundary: Publishing remains a separate explicit approval step.

Proof:

- Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval.

