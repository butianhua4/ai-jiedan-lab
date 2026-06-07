# Autopilot Source Verification Brief

Generated at: 2026-06-07T01:16:19.157Z

This report is read-only. It packages source verification work for the top autopilot approval packet items.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Open and verify sources during human review only. Do not mark review or publish without explicit approval.
- Note: Read-only source verification brief for the autopilot approval packet. It packages source evidence and human fact-check tasks without editing articles.

## Boundaries

- Public published: 15
- Publishable now: 0
- Traffic data available: false
- Can claim traffic: false

## Summary

- approvalItems: 3
- items: 3
- itemsWithApprovalChecklist: 3
- itemsWithFactCheckQueries: 3
- itemsWithOfficialSources: 3
- itemsWithReachableSources: 3
- packetUnsafeItems: 0
- totalReachableSources: 21
- unsafeItems: 0

## Source Evidence

- Source health summary: {"checkedUrls":18,"currentReviewFiles":3,"failedUrls":0,"filesCovered":20,"filesWithReachableSource":20,"filesWithoutReachableSource":0,"missingUrlTargets":0,"nextSourcePackFiles":19,"okUrls":18,"publicGapDecisionFiles":8,"redirectedUrls":13,"sourceReferences":147,"uniqueUrls":18}
- Packet unsafe items: 0

## Unsafe Items

- none

## Approval Packet Source Verification

| Ready | Safe | Reachable sources | Official sources | Fact checks | Approval checks | Risk checks | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 5 | 10 | 20 | 15 | 10 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | true | 6 | 6 | 21 | 15 | 10 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | true | 10 | 10 | 16 | 9 | 6 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |

## Per-Item Verification Tasks

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Source types: prompt, public-gap, wave
- Source health scopes: current-review, next-source-pack, public-gap-decision
- Reachable source URLs: 5

Verification focus:

- Verify 9 official source target(s).
- Check 8 search query seed(s).
- Review 20 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: ChatGPT prompts for business.; Add one contextual link to a published article before approval..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Open official source and verify current wording: OpenAI API docs: https://platform.openai.com/docs
- Open official source and verify current wording: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Open official source and verify current wording: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Open official source and verify current wording: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Open official source and verify current wording: OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Reject or rewrite unsupported claims before any mark:review command.
- Keep the article draft/noindex until explicit approval.

Reachable URLs:

- https://platform.openai.com/docs
- https://platform.openai.com/docs/guides/prompt-engineering
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- https://ai-sdk.dev/docs
- https://platform.openai.com/docs/guides/retrieval

Fact-check queries:

- 全行业 AI 提示词模板 官方文档 最新
- 全行业 AI 提示词模板 official docs latest
- 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 事实核对
- AI 提示词 平台限制 官方文档
- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词
- 全行业 AI 提示词模板 official documentation current limits
- 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 fact check official docs

Approval checklist:

- Article remains draft before approval: true
- Article remains noindex before approval: true
- Human review is required: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has at least one internal link: true
- Opening section directly answers the search query.
- Reviewer can explain why this article should be public now instead of staying draft.
- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.
- Human confirms every fast-changing AI, API, deployment, prompt, pricing, and security claim against the listed official sources.

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Source types: deployment, public-gap, wave
- Source health scopes: current-review, next-source-pack, public-gap-decision
- Reachable source URLs: 6

Verification focus:

- Verify 6 official source target(s).
- Check 8 search query seed(s).
- Review 22 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: AI Agent deployment tutorial.; Add one contextual link to a published article before approval..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Open official source and verify current wording: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Open official source and verify current wording: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Open official source and verify current wording: LangChain docs: https://python.langchain.com/docs
- Open official source and verify current wording: OpenAI API docs: https://platform.openai.com/docs
- Open official source and verify current wording: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Reject or rewrite unsupported claims before any mark:review command.
- Keep the article draft/noindex until explicit approval.

Reachable URLs:

- https://ai-sdk.dev/docs
- https://platform.openai.com/docs/guides/agents
- https://python.langchain.com/docs
- https://platform.openai.com/docs
- https://platform.openai.com/docs/guides/retrieval
- https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- AI Agent 部署 官方文档 最新
- AI Agent 部署 official docs latest
- AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 事实核对
- AI Agent 平台限制 官方文档
- AI Agent 部署教程
- Agent 记忆怎么做
- AI Agent 工具调用教程
- AI 工作流部署
- AI Agent 部署 official documentation current limits
- AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 fact check official docs

Approval checklist:

- Article remains draft before approval: true
- Article remains noindex before approval: true
- Human review is required: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has at least one internal link: true
- Opening section directly answers the search query.
- Reviewer can explain why this article should be public now instead of staying draft.
- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.
- Human confirms every fast-changing AI, API, deployment, prompt, pricing, and security claim against the listed official sources.

### AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Source types: deployment, public-gap
- Source health scopes: next-source-pack, public-gap-decision
- Reachable source URLs: 10

Verification focus:

- Verify 5 official source target(s).
- Check 8 search query seed(s).
- Review 17 combined checklist signal(s).
- Apply copydesk remediation: Check whether the primary keyword can appear naturally in the title without making the title stiff.; Rewrite the meta description to name the reader, outcome, and search phrase: LLM observability..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Open official source and verify current wording: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Open official source and verify current wording: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Open official source and verify current wording: LangChain docs: https://python.langchain.com/docs
- Open official source and verify current wording: OpenAI API docs: https://platform.openai.com/docs
- Open official source and verify current wording: Anthropic docs: https://docs.anthropic.com
- Reject or rewrite unsupported claims before any mark:review command.
- Keep the article draft/noindex until explicit approval.

Reachable URLs:

- https://platform.openai.com/docs/guides/agents
- https://platform.openai.com/docs/guides/retrieval
- https://python.langchain.com/docs
- https://platform.openai.com/docs
- https://docs.anthropic.com
- https://ai-sdk.dev/docs
- https://ai.google.dev/docs
- https://docs.dify.ai
- https://docs.n8n.io
- https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- AI API Key 安全管理 official docs latest
- AI API Key 安全管理 official documentation current limits
- AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 fact check official docs
- AI 部署 official docs limits pricing changelog
- OpenAI API Next.js
- Claude API 接入
- Gemini API Next.js
- API rate limit 怎么办
- LLM observability official docs fact check
- RAG evaluation official docs fact check

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.
- Human confirms every fast-changing AI, API, deployment, prompt, pricing, and security claim against the listed official sources.

