# Human Approval Repair Queue

Generated at: 2026-06-08T12:15:43.965Z

This report is read-only. It breaks repair-before-review candidates into task-level work and stops before any status change.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Do not run mark:review or publish from this queue. Use it to repair drafts, rerun automation, then ask for explicit human approval per file.
- Note: Read-only repair queue for human approval candidates. It turns repair-before-review decisions into task-level work without editing drafts.

## Publishing Boundary

- Current public published: 15
- Current publishable now: 0
- Publish confirm commands included: 0
- Traffic data available: false

## Summary

- Approval items: 3
- Repair-before-review items: 3
- Files with tasks: 3
- Tasks: 57
- Minimum path files/tasks: 3/18
- Blocker files/tasks: 0/0
- Human-gated tasks: 57
- Unsafe items: 0
- Traffic data available: false
- Tasks by category: {"source-url":15,"source-review":3,"search-intent":17,"internal-link":15,"copydesk":3,"approval-boundary":4}
- Tasks by severity: {"high":18,"medium":39}

## Source Evidence

- approvalItems: 3
- decisionRows: 3
- matrixUnsafeItems: 0
- mojibakeAffectedFiles: 77
- mojibakeUnsafeItems: 0
- remediationUnsafeItems: 0

## Unsafe Tasks

- none

## Minimum Repair Paths

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Minimum tasks: 6
- Categories: source-url, source-review, search-intent, internal-link, copydesk, approval-boundary
- Next decision: repair-before-review
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish confirm: not-included

| Priority | Severity | Category | Action | Proof required |
| ---: | --- | --- | --- | --- |
| 2143 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. |
| 2083 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| 1983 | medium | search-intent | Resolve search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| 1943 | medium | internal-link | Apply or explicitly reject the internal-link suggestion before mark:review. | Draft contains at least one contextual link to a currently published relevant article. |
| 1903 | medium | copydesk | Review reason: copydesk warning remediation exists. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| 1843 | medium | approval-boundary | Publishing remains a separate explicit approval step. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Minimum tasks: 6
- Categories: source-url, source-review, search-intent, internal-link, copydesk, approval-boundary
- Next decision: repair-before-review
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish confirm: not-included

| Priority | Severity | Category | Action | Proof required |
| ---: | --- | --- | --- | --- |
| 2143 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. |
| 2083 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| 1983 | medium | search-intent | Resolve or explicitly accept search-intent weaknesses before mark:review. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| 1943 | medium | internal-link | Apply or explicitly reject the internal-link suggestion before mark:review. | Draft contains at least one contextual link to a currently published relevant article. |
| 1903 | medium | copydesk | Review reason: copydesk warning remediation exists. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| 1843 | medium | approval-boundary | Publishing remains a separate explicit approval step. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Minimum tasks: 6
- Categories: source-url, source-review, search-intent, internal-link, copydesk, approval-boundary
- Next decision: repair-before-review
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`
- Publish confirm: not-included

| Priority | Severity | Category | Action | Proof required |
| ---: | --- | --- | --- | --- |
| 2018 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. |
| 1958 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| 1858 | medium | search-intent | Resolve search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| 1818 | medium | internal-link | Apply or explicitly reject the internal-link suggestion before mark:review. | Draft contains at least one contextual link to a currently published relevant article. |
| 1778 | medium | copydesk | Review reason: copydesk warning remediation exists. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| 1718 | medium | approval-boundary | Publishing remains a separate explicit approval step. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |


## Top Repair Tasks

| Priority | Severity | Category | Action | Proof required | Title | File |
| ---: | --- | --- | --- | --- | --- | --- |
| 2143 | high | source-url | Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 2143 | high | source-url | Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 2143 | high | source-url | Review reason: 10 source URL remediation action(s) need human confirmation. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 2143 | high | source-url | Resolve or explicitly accept source URL remediation actions before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 2143 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 2083 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1983 | medium | search-intent | Resolve or explicitly accept search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1983 | medium | search-intent | Resolve or explicitly accept search weakness: no exact search query appears in description. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1983 | medium | search-intent | Resolve or explicitly accept search weakness: no exact search query appears in headings or body. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1983 | medium | search-intent | Resolve search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1983 | medium | search-intent | Resolve search weakness: no exact search query appears in description. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1983 | medium | search-intent | Review reason: 3 search-intent weakness(es) need human copy review. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1983 | medium | search-intent | Resolve or explicitly accept search-intent weaknesses before mark:review. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1943 | medium | internal-link | Add at least one contextual link to a currently published article before approval. | Draft contains at least one contextual link to a currently published relevant article. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1943 | medium | internal-link | Suggested public link: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist) - keyword overlap: ai, vercel, 部署, 上线, 检查, 新手. | Draft contains at least one contextual link to a currently published relevant article. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1943 | medium | internal-link | Review reason: approval candidate has no current link to a published article. | Draft contains at least one contextual link to a currently published relevant article. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1943 | medium | internal-link | Apply or explicitly reject the internal-link suggestion before mark:review. | Draft contains at least one contextual link to a currently published relevant article. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1943 | medium | internal-link | Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human | Draft contains at least one contextual link to a currently published relevant article. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1903 | medium | copydesk | Review reason: copydesk warning remediation exists. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1843 | medium | approval-boundary | Publishing remains a separate explicit approval step. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 2143 | high | source-url | Resolve failed source URL before approval: https://ai-prompts-pro.com/blog/ai-prompt-templates-business. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2143 | high | source-url | Source URL action: Open the failed URL manually from a normal browser session and confirm whether the failure is transient or permanent. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2143 | high | source-url | Review reason: 14 source URL remediation action(s) need human confirmation. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2143 | high | source-url | Resolve or explicitly accept source URL remediation actions before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2143 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2083 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 1983 | medium | search-intent | Make the opening answer this query naturally: ChatGPT prompts for business. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 1983 | medium | search-intent | Resolve or explicitly accept search-intent weaknesses before mark:review. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 1943 | medium | internal-link | Add at least one contextual link to a currently published article before approval. | Draft contains at least one contextual link to a currently published relevant article. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 1943 | medium | internal-link | Suggested public link: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner) - keyword overlap: proposal, 客户沟通, 怎么, 客户, 需求, 户沟. | Draft contains at least one contextual link to a currently published relevant article. | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |

## Tasks By File

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Next decision: repair-before-review
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish confirm: not-included

- [high] source-url: Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- [high] source-url: Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.
- [high] source-url: Review reason: 10 source URL remediation action(s) need human confirmation.
- [high] source-url: Resolve or explicitly accept source URL remediation actions before mark:review.
- [high] source-url: Verify source URLs and fact-check queries before mark:review.
- [high] source-review: Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in title.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in description.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in headings or body.
- [medium] search-intent: Resolve search weakness: no exact search query appears in title.
- [medium] search-intent: Resolve search weakness: no exact search query appears in description.
- [medium] search-intent: Review reason: 3 search-intent weakness(es) need human copy review.
- [medium] search-intent: Resolve or explicitly accept search-intent weaknesses before mark:review.
- [medium] internal-link: Add at least one contextual link to a currently published article before approval.
- [medium] internal-link: Suggested public link: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist) - keyword overlap: ai, vercel, 部署, 上线, 检查, 新手.
- [medium] internal-link: Review reason: approval candidate has no current link to a published article.
- [medium] internal-link: Apply or explicitly reject the internal-link suggestion before mark:review.
- [medium] internal-link: Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
- [medium] copydesk: Review reason: copydesk warning remediation exists.
- [medium] approval-boundary: Publishing remains a separate explicit approval step.

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Next decision: repair-before-review
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish confirm: not-included

- [high] source-url: Resolve failed source URL before approval: https://ai-prompts-pro.com/blog/ai-prompt-templates-business.
- [high] source-url: Source URL action: Open the failed URL manually from a normal browser session and confirm whether the failure is transient or permanent.
- [high] source-url: Review reason: 14 source URL remediation action(s) need human confirmation.
- [high] source-url: Resolve or explicitly accept source URL remediation actions before mark:review.
- [high] source-url: Verify source URLs and fact-check queries before mark:review.
- [high] source-review: Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- [medium] search-intent: Make the opening answer this query naturally: ChatGPT prompts for business.
- [medium] search-intent: Resolve or explicitly accept search-intent weaknesses before mark:review.
- [medium] internal-link: Add at least one contextual link to a currently published article before approval.
- [medium] internal-link: Suggested public link: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner) - keyword overlap: proposal, 客户沟通, 怎么, 客户, 需求, 户沟.
- [medium] internal-link: Review reason: approval candidate has no current link to a published article.
- [medium] internal-link: Apply or explicitly reject the internal-link suggestion before mark:review.
- [medium] internal-link: Only after explicit human approval, run: npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
- [medium] copydesk: Review reason: copydesk warning remediation exists.
- [medium] approval-boundary: Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- [medium] approval-boundary: Publishing remains a separate explicit approval step.

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Next decision: repair-before-review
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`
- Publish confirm: not-included

- [high] source-url: Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- [high] source-url: Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.
- [high] source-url: Review reason: 10 source URL remediation action(s) need human confirmation.
- [high] source-url: Resolve or explicitly accept source URL remediation actions before mark:review.
- [high] source-url: Verify source URLs and fact-check queries before mark:review.
- [high] source-review: Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in title.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in description.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in headings or body.
- [medium] search-intent: Resolve or explicitly accept search weakness: few query tokens appear in searchable text.
- [medium] search-intent: Resolve search weakness: no exact search query appears in title.
- [medium] search-intent: Resolve search weakness: no exact search query appears in description.
- [medium] search-intent: Review reason: 4 search-intent weakness(es) need human copy review.
- [medium] search-intent: Resolve or explicitly accept search-intent weaknesses before mark:review.
- [medium] internal-link: Add at least one contextual link to a currently published article before approval.
- [medium] internal-link: Suggested public link: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex) - keyword overlap: ai, 一个, 怎么, 么做, 第一.
- [medium] internal-link: Review reason: approval candidate has no current link to a published article.
- [medium] internal-link: Apply or explicitly reject the internal-link suggestion before mark:review.
- [medium] internal-link: Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
- [medium] copydesk: Review reason: copydesk warning remediation exists.
- [medium] approval-boundary: Publishing remains a separate explicit approval step.

