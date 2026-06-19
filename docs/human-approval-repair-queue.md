# Human Approval Repair Queue

Generated at: 2026-06-19T06:41:45.185Z

This report is read-only. It breaks repair-before-review candidates into task-level work and stops before any status change.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Do not run mark:review or publish from this queue. Use it to repair drafts, rerun automation, then ask for explicit human approval per file.
- Note: Read-only repair queue for human approval candidates. It turns repair-before-review decisions into task-level work without editing drafts.

## Publishing Boundary

- Current public published: 500
- Current publishable now: 0
- Publish confirm commands included: 0
- Traffic data available: false

## Summary

- Approval items: 3
- Repair-before-review items: 1
- Files with tasks: 3
- Tasks: 55
- Minimum path files/tasks: 3/16
- Blocker files/tasks: 0/0
- Human-gated tasks: 55
- Unsafe items: 0
- Traffic data available: false
- Tasks by category: {"source-url":15,"source-review":3,"search-intent":20,"internal-link":13,"copydesk":1,"approval-boundary":3}
- Tasks by severity: {"high":18,"medium":37}

## Source Evidence

- approvalItems: 3
- decisionRows: 3
- matrixUnsafeItems: 0
- mojibakeAffectedFiles: 78
- mojibakeUnsafeItems: 0
- remediationUnsafeItems: 2

## Unsafe Tasks

- none

## Minimum Repair Paths

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Minimum tasks: 6
- Categories: source-url, source-review, search-intent, internal-link, copydesk, approval-boundary
- Next decision: repair-before-review
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human`
- Publish confirm: not-included

| Priority | Severity | Category | Action | Proof required |
| ---: | --- | --- | --- | --- |
| 1963 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. |
| 1903 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| 1803 | medium | search-intent | Resolve search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| 1763 | medium | internal-link | Apply or explicitly reject the internal-link suggestion before mark:review. | Draft contains at least one contextual link to a currently published relevant article. |
| 1723 | medium | copydesk | Review reason: copydesk warning remediation exists. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. |
| 1663 | medium | approval-boundary | Publishing remains a separate explicit approval step. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Minimum tasks: 5
- Categories: source-url, source-review, search-intent, internal-link, approval-boundary
- Next decision: defer
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human`
- Publish confirm: not-included

| Priority | Severity | Category | Action | Proof required |
| ---: | --- | --- | --- | --- |
| 867 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. |
| 807 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| 707 | medium | search-intent | Resolve search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| 667 | medium | internal-link | Apply or explicitly reject the internal-link suggestion before mark:review. | Draft contains at least one contextual link to a currently published relevant article. |
| 567 | medium | approval-boundary | Publishing remains a separate explicit approval step. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |

### Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Minimum tasks: 5
- Categories: source-url, source-review, search-intent, internal-link, approval-boundary
- Next decision: defer
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human`
- Publish confirm: not-included

| Priority | Severity | Category | Action | Proof required |
| ---: | --- | --- | --- | --- |
| 837 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. |
| 777 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. |
| 677 | medium | search-intent | Resolve search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. |
| 637 | medium | internal-link | Apply or explicitly reject the internal-link suggestion before mark:review. | Draft contains at least one contextual link to a currently published relevant article. |
| 537 | medium | approval-boundary | Publishing remains a separate explicit approval step. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. |


## Top Repair Tasks

| Priority | Severity | Category | Action | Proof required | Title | File |
| ---: | --- | --- | --- | --- | --- | --- |
| 1963 | high | source-url | Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1963 | high | source-url | Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1963 | high | source-url | Review reason: 11 source URL remediation action(s) need human confirmation. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1963 | high | source-url | Resolve or explicitly accept source URL remediation actions before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1963 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1903 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1803 | medium | search-intent | Resolve or explicitly accept search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1803 | medium | search-intent | Resolve or explicitly accept search weakness: no exact search query appears in description. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1803 | medium | search-intent | Resolve search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1803 | medium | search-intent | Resolve search weakness: no exact search query appears in description. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1803 | medium | search-intent | Review reason: 2 search-intent weakness(es) need human copy review. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1803 | medium | search-intent | Resolve or explicitly accept search-intent weaknesses before mark:review. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1763 | medium | internal-link | Suggested public link: 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 (/blog/multi-model-router-fallback-guide) - same category: AI 部署; shared tags: 多模型, AI 部署; keyword overlap: ai, 部署, 多模型, 降级, 怎么, 么做. | Draft contains at least one contextual link to a currently published relevant article. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1763 | medium | internal-link | Suggested public link: 客服 AI 模型选型怎么做：速度、成本、知识库、转人工和质检 (/blog/ai-model-selection-customer-service-guide) - same category: AI 部署; keyword overlap: ai, 部署, 知识库, agent, 怎么, 么做. | Draft contains at least one contextual link to a currently published relevant article. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1763 | medium | internal-link | Apply or explicitly reject the internal-link suggestion before mark:review. | Draft contains at least one contextual link to a currently published relevant article. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1763 | medium | internal-link | Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human | Draft contains at least one contextual link to a currently published relevant article. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1723 | medium | copydesk | Review reason: copydesk warning remediation exists. | Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1663 | medium | approval-boundary | Publishing remains a separate explicit approval step. | Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 867 | high | source-url | Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 867 | high | source-url | Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 867 | high | source-url | Review reason: 8 source URL remediation action(s) need human confirmation. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 867 | high | source-url | Resolve or explicitly accept source URL remediation actions before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 867 | high | source-url | Verify source URLs and fact-check queries before mark:review. | Reviewer confirms final source URL is canonical or replaces it with an accessible equivalent. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 807 | high | source-review | Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported. | Reviewer records source/fact-check confirmation and removes unsupported claims. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 707 | medium | search-intent | Resolve or explicitly accept search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 707 | medium | search-intent | Resolve or explicitly accept search weakness: no exact search query appears in description. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 707 | medium | search-intent | Resolve or explicitly accept search weakness: no exact search query appears in headings or body. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 707 | medium | search-intent | Resolve or explicitly accept search weakness: few query tokens appear in searchable text. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 707 | medium | search-intent | Resolve search weakness: no exact search query appears in title. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 707 | medium | search-intent | Resolve search weakness: no exact search query appears in description. | Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body. | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |

## Tasks By File

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Next decision: repair-before-review
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human`
- Publish confirm: not-included

- [high] source-url: Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- [high] source-url: Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.
- [high] source-url: Review reason: 11 source URL remediation action(s) need human confirmation.
- [high] source-url: Resolve or explicitly accept source URL remediation actions before mark:review.
- [high] source-url: Verify source URLs and fact-check queries before mark:review.
- [high] source-review: Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in title.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in description.
- [medium] search-intent: Resolve search weakness: no exact search query appears in title.
- [medium] search-intent: Resolve search weakness: no exact search query appears in description.
- [medium] search-intent: Review reason: 2 search-intent weakness(es) need human copy review.
- [medium] search-intent: Resolve or explicitly accept search-intent weaknesses before mark:review.
- [medium] internal-link: Suggested public link: 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 (/blog/multi-model-router-fallback-guide) - same category: AI 部署; shared tags: 多模型, AI 部署; keyword overlap: ai, 部署, 多模型, 降级, 怎么, 么做.
- [medium] internal-link: Suggested public link: 客服 AI 模型选型怎么做：速度、成本、知识库、转人工和质检 (/blog/ai-model-selection-customer-service-guide) - same category: AI 部署; keyword overlap: ai, 部署, 知识库, agent, 怎么, 么做.
- [medium] internal-link: Apply or explicitly reject the internal-link suggestion before mark:review.
- [medium] internal-link: Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
- [medium] copydesk: Review reason: copydesk warning remediation exists.
- [medium] approval-boundary: Publishing remains a separate explicit approval step.

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Next decision: defer
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human`
- Publish confirm: not-included

- [high] source-url: Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- [high] source-url: Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.
- [high] source-url: Review reason: 8 source URL remediation action(s) need human confirmation.
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
- [medium] internal-link: Suggested public link: OpenRouter API 怎么接入：统一模型入口不是只换 Base URL (/blog/openrouter-api-beginner-guide) - same category: AI 基建; shared tags: API; keyword overlap: ai, api, 怎么接入, 基建, 接入, openai.
- [medium] internal-link: Suggested public link: Groq API 怎么接入：高速推理适合什么 AI 应用 (/blog/groq-api-fast-llm-guide) - same category: AI 基建; shared tags: API; keyword overlap: ai, api, 怎么接入, 基建, 接入, openai.
- [medium] internal-link: Apply or explicitly reject the internal-link suggestion before mark:review.
- [medium] internal-link: Only after explicit human approval, run: npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
- [medium] approval-boundary: Publishing remains a separate explicit approval step.

### Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Next decision: defer
- Mark review command after explicit approval: `npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human`
- Publish confirm: not-included

- [high] source-url: Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- [high] source-url: Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.
- [high] source-url: Review reason: 7 source URL remediation action(s) need human confirmation.
- [high] source-url: Resolve or explicitly accept source URL remediation actions before mark:review.
- [high] source-url: Verify source URLs and fact-check queries before mark:review.
- [high] source-review: Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in title.
- [medium] search-intent: Resolve or explicitly accept search weakness: no exact search query appears in description.
- [medium] search-intent: Resolve search weakness: no exact search query appears in title.
- [medium] search-intent: Resolve search weakness: no exact search query appears in description.
- [medium] search-intent: Review reason: 2 search-intent weakness(es) need human copy review.
- [medium] search-intent: Resolve or explicitly accept search-intent weaknesses before mark:review.
- [medium] internal-link: Add at least one contextual link to a currently published article before approval.
- [medium] internal-link: Suggested public link: Next.js hydration error 怎么排查：使用前怎么判断是否适合 (/blog/nextjs-hydration-error-debug-freelance-scope) - same category: 报错解决; shared tags: AI 工具实践; keyword overlap: 报错解决, 排查, ai, 工具实践, next, js.
- [medium] internal-link: Review reason: approval candidate has no current link to a published article.
- [medium] internal-link: Apply or explicitly reject the internal-link suggestion before mark:review.
- [medium] internal-link: Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human
- [medium] approval-boundary: Publishing remains a separate explicit approval step.

