# Human Approval Decision Matrix

Generated at: 2026-06-16T18:18:38.156Z

This report is read-only. It gives reviewers one decision row per approval candidate and stops before mark:review or publish.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Run mark:review only after explicit human approval per file. Publish confirm is not included.
- Note: Read-only human approval decision matrix. It compresses review evidence into approve, repair, or defer decisions and stops before status changes.

## Publishing Boundary

- Current public published: 500
- Current publishable now: 0
- Publish confirm commands included: 0
- Traffic data available: false

## Summary

- approvalItems: 3
- approveAfterReviewItems: 0
- decisionRows: 3
- deferItems: 2
- humanDecisionBranches: 9
- repairBeforeReviewItems: 1
- rowsWithCommandBoundary: 3
- rowsWithDeferCriteria: 2
- rowsWithRepairActions: 3
- sourceReadyRows: 3
- trafficDataAvailable: false
- unsafeItems: 0

## Source Evidence

- approvalPacketItems: 3
- approvalPacketUnsafeItems: 0
- internalLinkUnsafeItems: 0
- playbookUnsafeItems: 2
- remediationUnsafeItems: 2
- searchIntentUnsafeItems: 0
- sourceVerificationUnsafeItems: 0

## Decision Rows

| Decision | Score | Source | Search | Link | Fix ready | Risk checks | Primary query | Title | File |
| --- | ---: | --- | --- | --- | --- | ---: | --- | --- | --- |
| repair-before-review | 1543 | true | 2 weakness(es) | true | true | 11 | 大模型部署教程 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| defer | 447 | true | 4 weakness(es) | true | false | 6 | RAG 知识库搭建教程 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| defer | 417 | true | 2 weakness(es) | true | false | 5 | Vercel build failed | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

## Repair Before Approval

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Current state: draft/noindex=true/humanReview=true
- Mark review after approval: npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
- Publish confirm: not-included
- Defer if: none
- Remediation reasons: 2 search-intent weakness(es) need human copy review; 11 source URL remediation action(s) need human confirmation; copydesk warning remediation exists

- Resolve or explicitly accept search weakness: no exact search query appears in title.
- Resolve or explicitly accept search weakness: no exact search query appears in description.
- Suggested public link: 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 (/blog/multi-model-router-fallback-guide) - same category: AI 部署; shared tags: 多模型, AI 部署; keyword overlap: ai, 部署, 多模型, 降级, 怎么, 么做.
- Suggested public link: Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 (/blog/claude-api-rate-limit-debug-guide) - same category: AI 部署; keyword overlap: ai, claude, 部署, 降级, api, 怎么.
- Resolve search weakness: no exact search query appears in title.
- Resolve search weakness: no exact search query appears in description.
- Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Current state: draft/noindex=true/humanReview=true
- Mark review after approval: npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
- Publish confirm: not-included
- Defer if: manual remediation pack is not ready
- Remediation reasons: 4 search-intent weakness(es) need human copy review; 8 source URL remediation action(s) need human confirmation

- Resolve or explicitly accept search weakness: no exact search query appears in title.
- Resolve or explicitly accept search weakness: no exact search query appears in description.
- Resolve or explicitly accept search weakness: no exact search query appears in headings or body.
- Resolve or explicitly accept search weakness: few query tokens appear in searchable text.
- Suggested public link: OpenRouter API 怎么接入：统一模型入口不是只换 Base URL (/blog/openrouter-api-beginner-guide) - same category: AI 基建; shared tags: API; keyword overlap: ai, api, 怎么接入, 基建, 接入, openai.
- Suggested public link: Groq API 怎么接入：高速推理适合什么 AI 应用 (/blog/groq-api-fast-llm-guide) - same category: AI 基建; shared tags: API; keyword overlap: ai, api, 怎么接入, 基建, 接入, openai.
- Resolve search weakness: no exact search query appears in title.
- Resolve search weakness: no exact search query appears in description.
- Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.

### Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Current state: draft/noindex=true/humanReview=true
- Mark review after approval: npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human
- Publish confirm: not-included
- Defer if: manual remediation pack is not ready
- Remediation reasons: approval candidate has no current link to a published article; 2 search-intent weakness(es) need human copy review; 7 source URL remediation action(s) need human confirmation

- Resolve or explicitly accept search weakness: no exact search query appears in title.
- Resolve or explicitly accept search weakness: no exact search query appears in description.
- Add at least one contextual link to a currently published article before approval.
- Suggested public link: Next.js hydration error 怎么排查：使用前怎么判断是否适合 (/blog/nextjs-hydration-error-debug-freelance-scope) - same category: 报错解决; shared tags: AI 工具实践; keyword overlap: 报错解决, 排查, ai, 工具实践, next, js.
- Resolve search weakness: no exact search query appears in title.
- Resolve search weakness: no exact search query appears in description.
- Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.
