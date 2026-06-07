# Human Approval Repair Route

Generated at: 2026-06-07T22:26:51.873Z

This report is read-only. It converts the repair queue into a manual repair order and stops before article edits or status changes.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Use this route to assign manual repair sessions only. Run mark:review only after explicit human approval per file.
- Note: Read-only approval repair route. It chooses the next human repair order from the repair queue and stops before article edits, mark:review, or publish.

## Publishing Boundary

- Current public published: 15
- Current publishable now: 0
- Publish confirm commands included: 0
- Traffic data available: false

## Summary

- Files routed: 3
- Repair-before-review items: 3
- Minimum path tasks: 18
- Route sessions: 12
- High-risk tasks: 6
- Next repair title: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查
- Next repair file: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Publish confirm commands included: 0
- Traffic data available: false
- Unsafe items: 0

## Source Evidence

- decisionMatrixItems: 3
- decisionMatrixRepairItems: 3
- decisionMatrixUnsafeItems: 0
- repairQueueFullTasks: 57
- repairQueueMinimumPathFiles: 3
- repairQueueMinimumPathTasks: 18
- repairQueueUnsafeItems: 0

## Unsafe Items

- none

## Route Order

| Rank | High risk | Min tasks | Sessions | Lane | Primary query | Title | File |
| ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 1943 | 2 | 6 | 4 | ai-deployment | AI Agent deployment tutorial | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1939 | 2 | 6 | 4 | industry-prompt | ChatGPT prompts for business | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 1819 | 2 | 6 | 4 | public-coverage-gap | RAG 知识库搭建教程 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |

## Repair Sessions

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
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

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Rerun after repair: `npm run automation:human-approval-repair-queue`, `npm run automation:human-approval-repair-route`, `npm run automation:gate`, `npm run automation:digest`
- Publish confirm: not-included

#### source verification first

- [high] source-url: Verify source URLs and fact-check queries before mark:review.
- [high] source-review: Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.

Proof:

- Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent.
- Reviewer records source/fact-check confirmation and removes unsupported claims.

#### search intent alignment

- [medium] search-intent: Resolve or explicitly accept search-intent weaknesses before mark:review.

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

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`
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

