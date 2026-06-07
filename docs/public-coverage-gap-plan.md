# Public Coverage Gap Plan

Generated at: 2026-06-07T15:06:35.851Z

This report is read-only. It converts broad search-demand themes with no public coverage into a manual review wave plan.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Do not run mark:review --confirm-human or publish:articles --confirm without explicit human approval.
- Note: Read-only plan for public-coverage gaps. It selects one safe draft per broad demand theme with no public coverage and stops before human review or publishing.

## Source Evidence

- Note: This plan inherits broad-demand editorial signals only. It does not claim keyword volume, search ranking, clicks, impressions, or traffic.
- Broad demand guardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only broad-demand map. It prioritizes likely user-search themes from the local content inventory and official source targets; it does not claim keyword volume, rankings, clicks, or traffic."}

## Summary

- broadDemandThemes: 10
- duplicateFiles: 0
- gapThemes: 8
- items: 8
- itemsPerWave: 2
- plannedWaves: 4
- readyItems: 8
- unsafeItems: 0
- sourceThemesWithoutPublicCoverage: 8
- uniqueFiles: 8

## Waves

### Wave 1: Agent deployment, tool calling, and production workflows + Cross-industry AI prompt templates

- Ready items: 2/2

| Ready | Score | Public | Missing subtopics | Theme | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| true | 388 | 0 | tool calling, human review, permissions, logs | Agent deployment, tool calling, and production workflows | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 378 | 0 | customer service | Cross-industry AI prompt templates | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |

Human approval commands after explicit approval:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
```

### Wave 2: RAG, knowledge base, and agent memory + Local and open-source model deployment

- Ready items: 2/2

| Ready | Score | Public | Missing subtopics | Theme | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| true | 352 | 0 | knowledge base, vector database | RAG, knowledge base, and agent memory | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | 342 | 0 | gpu memory, quantization, local api, model download | Local and open-source model deployment | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |

Human approval commands after explicit approval:

```bash
npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx
npm run publish:articles -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx
```

### Wave 3: Dify, n8n, Flowise, and no-code AI automation + Business AI workflows and SOP templates

- Ready items: 2/2

| Ready | Score | Public | Missing subtopics | Theme | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| true | 330 | 0 | self hosted, connector | Dify, n8n, Flowise, and no-code AI automation | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | 328 | 0 | support, product, weekly report | Business AI workflows and SOP templates | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |

Human approval commands after explicit approval:

```bash
npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/dify-workflow-error-handling-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx
npm run publish:articles -- --file=content/blog/dify-workflow-error-handling-guide.mdx
```

### Wave 4: LLM serving, GPU, and managed inference + LLM evaluation, observability, and security

- Ready items: 2/2

| Ready | Score | Public | Missing subtopics | Theme | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| true | 312 | 0 | concurrency, autoscaling | LLM serving, GPU, and managed inference | BentoML LLM 部署 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| true | 312 | 0 | logs, prompt injection, cost tracking | LLM evaluation, observability, and security | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |

Human approval commands after explicit approval:

```bash
npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx
npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx
```

## Full Plan

| Wave | Ready | Safe | Noindex | Sources | Seeds | Focus | Theme | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | true | true | true | 3 | 4 | 4 | Agent deployment, tool calling, and production workflows | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1 | true | true | true | 2 | 4 | 5 | Cross-industry AI prompt templates | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2 | true | true | true | 3 | 4 | 4 | RAG, knowledge base, and agent memory | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 2 | true | true | true | 3 | 4 | 4 | Local and open-source model deployment | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 3 | true | true | true | 2 | 4 | 4 | Dify, n8n, Flowise, and no-code AI automation | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 3 | true | true | true | 2 | 4 | 4 | Business AI workflows and SOP templates | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 4 | true | true | true | 2 | 4 | 4 | LLM serving, GPU, and managed inference | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 4 | true | true | true | 3 | 4 | 4 | LLM evaluation, observability, and security | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
