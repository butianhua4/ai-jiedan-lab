# Review Action Board

Generated at: 2026-06-06T17:30:13.527Z

This board is read-only. It turns review automation reports into a prioritized human task queue.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Every mark:review command requires explicit human approval. publish --confirm commands are intentionally not included.
- Note: Read-only review action board. It prioritizes human review tasks and does not edit articles, mark review, or publish.

## Summary

- publicGapReadyTasks: 8
- publicGapTasks: 8
- readyTasks: 11
- tasks: 11
- unsafeTasks: 0
- waveReadyTasks: 3
- waveTasks: 3

## Boundaries

- Public published: 15
- Publishable now: 0
- Traffic data available: false
- Can claim traffic: false
- Source files without reachable source: 0
- Missing URL targets: 0

## Unsafe Tasks

- none

## Next Tasks

| Ready | Priority | Kind | Scope | Sources | Warnings | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1009 | wave-approval | wave-1 | 9 | 2 | none | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | 1000 | wave-approval | wave-2 | 10 | 0 | none | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 988 | wave-approval | wave-3 | 8 | 0 | none | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | 790 | public-gap-review | public-gap-wave-1 | 10 | 3 | none | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 787 | public-gap-review | public-gap-wave-1 | 8 | 3 | none | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | 769 | public-gap-review | public-gap-wave-2 | 11 | 3 | none | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |

## All Tasks

| Ready | Priority | Kind | Scope | Sources | Warnings | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1009 | wave-approval | wave-1 | 9 | 2 | none | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | 1000 | wave-approval | wave-2 | 10 | 0 | none | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 988 | wave-approval | wave-3 | 8 | 0 | none | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | 790 | public-gap-review | public-gap-wave-1 | 10 | 3 | none | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 787 | public-gap-review | public-gap-wave-1 | 8 | 3 | none | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | 769 | public-gap-review | public-gap-wave-2 | 11 | 3 | none | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | 768 | public-gap-review | public-gap-wave-2 | 11 | 5 | none | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| true | 748 | public-gap-review | public-gap-wave-3 | 12 | 7 | none | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | 744 | public-gap-review | public-gap-wave-3 | 9 | 5 | none | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| true | 725 | public-gap-review | public-gap-wave-4 | 12 | 5 | none | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| true | 716 | public-gap-review | public-gap-wave-4 | 2 | 4 | none | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |

## Per-Task Actions

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Kind: wave-approval
- Scope: wave-1
- Ready: true
- Priority: 1009

Action items:

- Read the article end to end and confirm the opening answer matches search intent.
- Open 2 official source target(s) and verify fast-changing claims.
- Run through 6 risk review checks.
- Choose or reject public internal link suggestion: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).
- Resolve or explicitly accept snippet/structured-data warnings before mark:review.

Warnings:

- description may be thin for search snippets
- primary keyword is not an exact title substring

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Kind: wave-approval
- Scope: wave-2
- Ready: true
- Priority: 1000

Action items:

- Read the article end to end and confirm the opening answer matches search intent.
- Open 1 official source target(s) and verify fast-changing claims.
- Run through 6 risk review checks.
- Choose or reject public internal link suggestion: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist).
- Confirm snippet and structured-data checks remain clean.

Warnings:

- none

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Kind: wave-approval
- Scope: wave-3
- Ready: true
- Priority: 988

Action items:

- Read the article end to end and confirm the opening answer matches search intent.
- Open 2 official source target(s) and verify fast-changing claims.
- Run through 6 risk review checks.
- Choose or reject public internal link suggestion: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner).
- Confirm snippet and structured-data checks remain clean.

Warnings:

- none

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Kind: public-gap-review
- Scope: public-gap-wave-1
- Ready: true
- Priority: 790

Action items:

- Review theme gap: Agent deployment, tool calling, and production workflows.
- Verify 3 source target(s) and source freshness.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.
- Choose or reject public internal link suggestion: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist).

Warnings:

- no exact search-seed phrase appears in title, description, or body
- article currently has no links to published articles
- theme still has missing subtopics: tool calling, human review, permissions, logs

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Kind: public-gap-review
- Scope: public-gap-wave-1
- Ready: true
- Priority: 787

Action items:

- Review theme gap: Cross-industry AI prompt templates.
- Verify 2 source target(s) and source freshness.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.
- Choose or reject public internal link suggestion: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner).

Warnings:

- no exact search-seed phrase appears in title, description, or body
- article currently has no links to published articles
- theme still has missing subtopics: customer service

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界

- File: content/blog/ai-agent-memory-rag-design-guide.mdx
- Kind: public-gap-review
- Scope: public-gap-wave-2
- Ready: true
- Priority: 769

Action items:

- Review theme gap: RAG, knowledge base, and agent memory.
- Verify 3 source target(s) and source freshness.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.
- Choose or reject public internal link suggestion: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).

Warnings:

- no exact search-seed phrase appears in title, description, or body
- article currently has no links to published articles
- theme still has missing subtopics: knowledge base, vector database

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流

- File: content/blog/open-webui-functions-pipelines-deployment-guide.mdx
- Kind: public-gap-review
- Scope: public-gap-wave-2
- Ready: true
- Priority: 768

Action items:

- Review theme gap: Local and open-source model deployment.
- Verify 3 source target(s) and source freshness.
- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.
- Choose or reject public internal link suggestion: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).

Warnings:

- primary keyword is not an exact title substring
- no exact search-seed phrase appears in title, description, or body
- article currently has no links to published articles
- theme still has missing subtopics: gpu memory, quantization, local api, model download
- primary keyword is not an exact title substring

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Kind: public-gap-review
- Scope: public-gap-wave-3
- Ready: true
- Priority: 748

Action items:

- Review theme gap: Dify, n8n, Flowise, and no-code AI automation.
- Verify 2 source target(s) and source freshness.
- Tighten the meta description so it states the search intent, audience, and outcome clearly.
- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: 第一个 Upwork 小项目怎么报价：新手范围和底价检查 (/blog/first-upwork-project-pricing-checklist).
- Choose or reject public internal link suggestion: 第一个 Upwork 小项目怎么报价：新手范围和底价检查 (/blog/first-upwork-project-pricing-checklist).

Warnings:

- description may be thin for search snippets
- primary keyword is not an exact title substring
- no exact search-seed phrase appears in title, description, or body
- article currently has no links to published articles
- theme still has missing subtopics: self hosted, connector
- description may be thin for search snippets
- primary keyword is not an exact title substring

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底

- File: content/blog/dify-workflow-error-handling-guide.mdx
- Kind: public-gap-review
- Scope: public-gap-wave-3
- Ready: true
- Priority: 744

Action items:

- Review theme gap: Business AI workflows and SOP templates.
- Verify 2 source target(s) and source freshness.
- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.
- Choose or reject public internal link suggestion: Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide).

Warnings:

- primary keyword is not an exact title substring
- no exact search-seed phrase appears in title, description, or body
- article currently has no links to published articles
- theme still has missing subtopics: support, product, weekly report
- primary keyword is not an exact title substring

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/dify-workflow-error-handling-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/dify-workflow-error-handling-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Kind: public-gap-review
- Scope: public-gap-wave-4
- Ready: true
- Priority: 725

Action items:

- Review theme gap: LLM evaluation, observability, and security.
- Verify 3 source target(s) and source freshness.
- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Add or approve one concrete subsection that matches the target search intent without keyword stuffing.
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.
- Choose or reject public internal link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).

Warnings:

- primary keyword is not an exact title substring
- no exact search-seed phrase appears in title, description, or body
- few search-seed token families appear in article text
- theme still has missing subtopics: logs, prompt injection, cost tracking
- primary keyword is not an exact title substring

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收

- File: content/blog/bentoml-llm-deployment-beginner-guide.mdx
- Kind: public-gap-review
- Scope: public-gap-wave-4
- Ready: true
- Priority: 716

Action items:

- Review theme gap: LLM serving, GPU, and managed inference.
- Verify 2 source target(s) and source freshness.
- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.
- Choose or reject public internal link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).

Warnings:

- primary keyword is not an exact title substring
- no exact search-seed phrase appears in title, description, or body
- article currently has no links to published articles
- theme still has missing subtopics: concurrency, autoscaling

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

