# Public Coverage Gap Preflight

Generated at: 2026-06-06T16:22:17.881Z

This report is read-only. It checks the public coverage gap plan candidates before any human review or publishing action.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Use findings during human review. Do not run mark:review --confirm-human or publish:articles --confirm without explicit human approval.
- Note: Read-only preflight for the public coverage gap plan. It does not edit metadata, links, status, noindex, review, or publishing state.

## Source Evidence

- Note: Search seeds are editorial review prompts, not measured keyword volume, rankings, clicks, impressions, or traffic.
- Gap plan guardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only plan for public-coverage gaps. It selects one safe draft per broad demand theme with no public coverage and stops before human review or publishing.","stopBefore":"Do not run mark:review --confirm-human or publish:articles --confirm without explicit human approval."}

## Summary

- blockingItems: 0
- items: 8
- planItems: 8
- planReadyItems: 8
- planUnsafeItems: 0
- planWaves: 4
- readyItems: 8
- structuredDataReadyItems: 8
- uniqueFiles: 8
- warningItems: 8
- withPublicLinkSuggestions: 8
- withSeedMatches: 7

## Wave Summary

| Wave | Ready | Blocking | Warning | Themes | Files |
| --- | --- | --- | --- | --- | --- |
| 1 | 2/2 | 0 | 2 | Agent deployment, tool calling, and production workflows<br>Cross-industry AI prompt templates | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx<br>content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2 | 2/2 | 0 | 2 | RAG, knowledge base, and agent memory<br>Local and open-source model deployment | content/blog/ai-agent-memory-rag-design-guide.mdx<br>content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 3 | 2/2 | 0 | 2 | Dify, n8n, Flowise, and no-code AI automation<br>Business AI workflows and SOP templates | content/blog/ai-automation-project-pricing-scope-guide.mdx<br>content/blog/dify-workflow-error-handling-guide.mdx |
| 4 | 2/2 | 0 | 2 | LLM serving, GPU, and managed inference<br>LLM evaluation, observability, and security | content/blog/bentoml-llm-deployment-beginner-guide.mdx<br>content/blog/ai-api-key-security-rotation-guide.mdx |

## Blocking Items

- none

## Warning Items

| Wave | Ready | Score | Quality | Snippet | Links | Seeds | Structured | Blocking | Warnings | Theme | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | true | 388 | 100 | 47/69 | 0/6 + 5 suggestions | 0/4 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: tool calling, human review, permissions, logs | Agent deployment, tool calling, and production workflows | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1 | true | 378 | 100 | 37/67 | 0/5 + 5 suggestions | 0/3 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: customer service | Cross-industry AI prompt templates | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2 | true | 352 | 100 | 41/60 | 0/6 + 5 suggestions | 0/4 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: knowledge base, vector database | RAG, knowledge base, and agent memory | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 2 | true | 342 | 100 | 52/80 | 0/3 + 5 suggestions | 0/3 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: gpu memory, quantization, local api, model download | Local and open-source model deployment | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 3 | true | 330 | 100 | 37/54 | 0/3 + 5 suggestions | 0/3 | true | none | description may be thin for search snippets<br>primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: self hosted, connector | Dify, n8n, Flowise, and no-code AI automation | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 3 | true | 328 | 100 | 29/55 | 0/4 + 5 suggestions | 0/2 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: support, product, weekly report | Business AI workflows and SOP templates | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 4 | true | 312 | 100 | 44/91 | 0/3 + 5 suggestions | 0/4 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: concurrency, autoscaling | LLM serving, GPU, and managed inference | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 4 | true | 312 | 100 | 33/59 | 1/3 + 5 suggestions | 0/1 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>few search-seed token families appear in article text<br>theme still has missing subtopics: logs, prompt injection, cost tracking | LLM evaluation, observability, and security | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |

## All Items

| Wave | Ready | Score | Quality | Snippet | Links | Seeds | Structured | Blocking | Warnings | Theme | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | true | 388 | 100 | 47/69 | 0/6 + 5 suggestions | 0/4 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: tool calling, human review, permissions, logs | Agent deployment, tool calling, and production workflows | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1 | true | 378 | 100 | 37/67 | 0/5 + 5 suggestions | 0/3 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: customer service | Cross-industry AI prompt templates | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2 | true | 352 | 100 | 41/60 | 0/6 + 5 suggestions | 0/4 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: knowledge base, vector database | RAG, knowledge base, and agent memory | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 2 | true | 342 | 100 | 52/80 | 0/3 + 5 suggestions | 0/3 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: gpu memory, quantization, local api, model download | Local and open-source model deployment | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 3 | true | 330 | 100 | 37/54 | 0/3 + 5 suggestions | 0/3 | true | none | description may be thin for search snippets<br>primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: self hosted, connector | Dify, n8n, Flowise, and no-code AI automation | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 3 | true | 328 | 100 | 29/55 | 0/4 + 5 suggestions | 0/2 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: support, product, weekly report | Business AI workflows and SOP templates | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 4 | true | 312 | 100 | 44/91 | 0/3 + 5 suggestions | 0/4 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: concurrency, autoscaling | LLM serving, GPU, and managed inference | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 4 | true | 312 | 100 | 33/59 | 1/3 + 5 suggestions | 0/1 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>few search-seed token families appear in article text<br>theme still has missing subtopics: logs, prompt injection, cost tracking | LLM evaluation, observability, and security | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
