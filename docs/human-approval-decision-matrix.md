# Human Approval Decision Matrix

Generated at: 2026-06-09T16:19:18.485Z

This report is read-only. It gives reviewers one decision row per approval candidate and stops before mark:review or publish.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Run mark:review only after explicit human approval per file. Publish confirm is not included.
- Note: Read-only human approval decision matrix. It compresses review evidence into approve, repair, or defer decisions and stops before status changes.

## Publishing Boundary

- Current public published: 15
- Current publishable now: 0
- Publish confirm commands included: 0
- Traffic data available: false

## Summary

- approvalItems: 3
- approveAfterReviewItems: 0
- decisionRows: 3
- deferItems: 0
- humanDecisionBranches: 9
- repairBeforeReviewItems: 3
- rowsWithCommandBoundary: 3
- rowsWithDeferCriteria: 0
- rowsWithRepairActions: 3
- sourceReadyRows: 3
- trafficDataAvailable: false
- unsafeItems: 0

## Source Evidence

- approvalPacketItems: 3
- approvalPacketUnsafeItems: 0
- internalLinkUnsafeItems: 0
- playbookUnsafeItems: 0
- remediationUnsafeItems: 0
- searchIntentUnsafeItems: 0
- sourceVerificationUnsafeItems: 0

## Decision Rows

| Decision | Score | Source | Search | Link | Fix ready | Risk checks | Primary query | Title | File |
| --- | ---: | --- | --- | --- | --- | ---: | --- | --- | --- |
| repair-before-review | 1723 | true | 3 weakness(es) | true | true | 10 | AI Agent deployment tutorial | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| repair-before-review | 1723 | true | ready | true | true | 10 | ChatGPT prompts for business | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| repair-before-review | 1598 | true | 4 weakness(es) | true | true | 10 | RAG 知识库搭建教程 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |

## Repair Before Approval

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Current state: draft/noindex=true/humanReview=true
- Mark review after approval: npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
- Publish confirm: not-included
- Defer if: none
- Remediation reasons: approval candidate has no current link to a published article; 3 search-intent weakness(es) need human copy review; 10 source URL remediation action(s) need human confirmation; copydesk warning remediation exists

- Resolve or explicitly accept search weakness: no exact search query appears in title.
- Resolve or explicitly accept search weakness: no exact search query appears in description.
- Resolve or explicitly accept search weakness: no exact search query appears in headings or body.
- Add at least one contextual link to a currently published article before approval.
- Suggested public link: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist) - keyword overlap: ai, vercel, 部署, 上线, 检查, 新手.
- Resolve search weakness: no exact search query appears in title.
- Resolve search weakness: no exact search query appears in description.
- Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Current state: draft/noindex=true/humanReview=true
- Mark review after approval: npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
- Publish confirm: not-included
- Defer if: none
- Remediation reasons: approval candidate has no current link to a published article; 14 source URL remediation action(s) need human confirmation; copydesk warning remediation exists

- Add at least one contextual link to a currently published article before approval.
- Suggested public link: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner) - keyword overlap: proposal, 客户沟通, 怎么, 客户, 需求, 户沟.
- Make the opening answer this query naturally: ChatGPT prompts for business.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Resolve failed source URL before approval: https://ai-prompts-pro.com/blog/ai-prompt-templates-business.
- Source URL action: Open the failed URL manually from a normal browser session and confirm whether the failure is transient or permanent.

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Current state: draft/noindex=true/humanReview=true
- Mark review after approval: npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
- Publish confirm: not-included
- Defer if: none
- Remediation reasons: approval candidate has no current link to a published article; 4 search-intent weakness(es) need human copy review; 10 source URL remediation action(s) need human confirmation; copydesk warning remediation exists

- Resolve or explicitly accept search weakness: no exact search query appears in title.
- Resolve or explicitly accept search weakness: no exact search query appears in description.
- Resolve or explicitly accept search weakness: no exact search query appears in headings or body.
- Resolve or explicitly accept search weakness: few query tokens appear in searchable text.
- Add at least one contextual link to a currently published article before approval.
- Suggested public link: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex) - keyword overlap: ai, 一个, 怎么, 么做, 第一.
- Resolve search weakness: no exact search query appears in title.
- Resolve search weakness: no exact search query appears in description.
- Confirm source redirect before approval: https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction.
- Source URL action: Open the original URL and the final redirected URL, then confirm the final URL is canonical and content-equivalent.
