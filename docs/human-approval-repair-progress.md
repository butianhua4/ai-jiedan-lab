# Human Approval Repair Progress

Generated at: 2026-06-09T01:27:14.125Z

This report is read-only. It tracks whether repair-route categories are still open, blocked, evidence-ready, resolved, or manual-only.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Use this report to decide the next manual repair session. It does not make or approve article changes.
- Note: Read-only repair progress tracker. It compares the manual repair route with current evidence and stops before article edits, mark:review, or publish.

## Publishing Boundary

- Current public published: 15
- Current publishable now: 0
- Publish confirm commands included: 0
- Traffic data available: false

## Summary

- Files tracked: 3
- Categories tracked: 18
- Open categories: 11
- Blocked categories: 0
- Evidence-ready categories: 3
- Resolved categories: 1
- Manual-only categories: 3
- Files ready for human approval after repair: 0
- Next repair title: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查
- Next repair file: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Route sessions: 12
- Publish confirm commands included: 0
- Traffic data available: false
- Unsafe items: 0

## Source Evidence

- decisionMatrixItems: 3
- decisionMatrixRepairItems: 3
- decisionMatrixUnsafeItems: 0
- internalLinkItems: 3
- internalLinkUnsafeItems: 0
- repairQueueMinimumPathFiles: 3
- repairQueueMinimumPathTasks: 18
- repairQueueUnsafeItems: 0
- routeFiles: 3
- routeSessions: 12
- routeUnsafeItems: 0
- searchIntentItems: 3
- searchIntentUnsafeItems: 0
- sourceVerificationItems: 3
- sourceVerificationUnsafeItems: 0
- sourceUrlFixActions: 34
- remediationUnsafeItems: 0

## Unsafe Items

- none

## Progress By File

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Lane: ai-deployment
- Primary query: AI Agent deployment tutorial
- Open categories: source-url, search-intent, internal-link, copydesk
- Ready for human approval after repair: false
- Next manual session: source verification first
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`

| Category | Status | Detail | Next action | Proof required |
| --- | --- | --- | --- | --- |
| source-url | open | 10 source URL remediation action(s) still need human confirmation. | Open each failed source URL manually, replace dead URLs with accessible canonical sources, then rerun automation. | Reviewer confirms final source URLs are canonical or replaced with accessible equivalents. |
| source-review | evidence-ready | Source review evidence is ready, but human confirmation is still required before mark:review. | Human reviewer verifies fast-changing claims against the listed sources. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| search-intent | open | 3 search-intent weakness(es) remain. | Adjust title, description, opening, heading, or body so the accepted query appears naturally. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| internal-link | open | No current link to a published article. | Add one useful contextual link to a currently published relevant article. | Draft contains at least one contextual link to a currently published relevant article. |
| copydesk | open | Copydesk warning remediation still needs human acceptance or cleanup. | Resolve or explicitly accept the copydesk warning without weakening guardrails. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| approval-boundary | manual-only | Manual approval boundary is intact and publish confirmation is not included. | Do not run mark:review until explicit human approval per file. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Lane: industry-prompt
- Primary query: ChatGPT prompts for business
- Open categories: source-url, internal-link, copydesk
- Ready for human approval after repair: false
- Next manual session: source verification first
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`

| Category | Status | Detail | Next action | Proof required |
| --- | --- | --- | --- | --- |
| source-url | open | 14 source URL remediation action(s) still need human confirmation. | Open each failed source URL manually, replace dead URLs with accessible canonical sources, then rerun automation. | Reviewer confirms final source URLs are canonical or replaced with accessible equivalents. |
| source-review | evidence-ready | Source review evidence is ready, but human confirmation is still required before mark:review. | Human reviewer verifies fast-changing claims against the listed sources. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| search-intent | resolved | Search intent weaknesses are resolved. | Keep query alignment unchanged for human review. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| internal-link | open | No current link to a published article. | Add one useful contextual link to a currently published relevant article. | Draft contains at least one contextual link to a currently published relevant article. |
| copydesk | open | Copydesk warning remediation still needs human acceptance or cleanup. | Resolve or explicitly accept the copydesk warning without weakening guardrails. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| approval-boundary | manual-only | Manual approval boundary is intact and publish confirmation is not included. | Do not run mark:review until explicit human approval per file. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Lane: public-coverage-gap
- Primary query: RAG 知识库搭建教程
- Open categories: source-url, search-intent, internal-link, copydesk
- Ready for human approval after repair: false
- Next manual session: source verification first
- Manual mark-review command after explicit approval: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`

| Category | Status | Detail | Next action | Proof required |
| --- | --- | --- | --- | --- |
| source-url | open | 10 source URL remediation action(s) still need human confirmation. | Open each failed source URL manually, replace dead URLs with accessible canonical sources, then rerun automation. | Reviewer confirms final source URLs are canonical or replaced with accessible equivalents. |
| source-review | evidence-ready | Source review evidence is ready, but human confirmation is still required before mark:review. | Human reviewer verifies fast-changing claims against the listed sources. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| search-intent | open | 4 search-intent weakness(es) remain. | Adjust title, description, opening, heading, or body so the accepted query appears naturally. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| internal-link | open | No current link to a published article. | Add one useful contextual link to a currently published relevant article. | Draft contains at least one contextual link to a currently published relevant article. |
| copydesk | open | Copydesk warning remediation still needs human acceptance or cleanup. | Resolve or explicitly accept the copydesk warning without weakening guardrails. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| approval-boundary | manual-only | Manual approval boundary is intact and publish confirmation is not included. | Do not run mark:review until explicit human approval per file. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

