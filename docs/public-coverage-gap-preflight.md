# Public Coverage Gap Preflight

Generated at: 2026-06-11T06:17:40.994Z

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
- Broad first coverage guardrails: {"autoCreateArticles":false,"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only first coverage launch pack. It selects one unique human-review candidate for each broad AI cluster with zero public coverage and never edits articles or changes review/publish state.","stopBefore":"Stop before mark:review and publish. Human approval is required for every selected file.","trafficClaim":"not-included"}
- Broad first coverage summary: {"clustersSelected":8,"commandBoundaries":8,"firstCoverageTarget":8,"humanReviewRequiredItems":8,"itemsWithContentAngles":8,"itemsWithFactCheckChecklist":8,"itemsWithReviewFocus":8,"itemsWithSearchQueries":8,"itemsWithSourceTargets":8,"publicArticlesBeforeLaunch":15,"safeDraftItems":8,"trafficDataAvailable":false,"uniqueFiles":8,"unsafeItems":0,"zeroPublicClusters":8}

## Summary

- blockingItems: 0
- broadFirstCoverageItems: 8
- broadFirstCoveragePreflightItems: 8
- items: 13
- planItems: 8
- planReadyItems: 8
- planUnsafeItems: 0
- planWaves: 4
- readyItems: 13
- structuredDataReadyItems: 13
- uniqueFiles: 13
- warningItems: 13
- withPublicLinkSuggestions: 13
- withSeedMatches: 12

## Wave Summary

| Wave | Ready | Blocking | Warning | Themes | Files |
| --- | --- | --- | --- | --- | --- |
| 1 | 3/3 | 0 | 3 | Agent deployment, tool calling, and production workflows<br>Cross-industry AI prompt templates<br>开源大模型部署：Ollama、vLLM、TGI、RunPod | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx<br>content/blog/industry-ai-prompts-template-library-2026.mdx<br>content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 2 | 4/4 | 0 | 4 | RAG, knowledge base, and agent memory<br>Local and open-source model deployment<br>Agent 记忆：短期记忆、长期记忆、RAG、Postgres<br>RAG、知识库、向量数据库和引用溯源 | content/blog/ai-agent-memory-rag-design-guide.mdx<br>content/blog/open-webui-functions-pipelines-deployment-guide.mdx<br>content/blog/n8n-ai-agent-rag-memory-guide.mdx<br>content/blog/ai-model-selection-customer-service-guide.mdx |
| 3 | 3/3 | 0 | 3 | Dify, n8n, Flowise, and no-code AI automation<br>Business AI workflows and SOP templates<br>Dify、n8n、Coze、Flowise、MCP 自动化部署 | content/blog/ai-automation-project-pricing-scope-guide.mdx<br>content/blog/dify-workflow-error-handling-guide.mdx<br>content/blog/mcp-server-deployment-security-checklist.mdx |
| 4 | 3/3 | 0 | 3 | LLM evaluation, observability, and security<br>LLM serving, GPU, and managed inference<br>LLM 观测、评测、日志和上线后质量 | content/blog/ai-api-key-security-rotation-guide.mdx<br>content/blog/bentoml-llm-deployment-beginner-guide.mdx<br>content/blog/agent-tool-permission-safety-guide.mdx |

## Blocking Items

- none

## Warning Items

| Wave | Scope | Ready | Score | Quality | Snippet | Links | Seeds | Structured | Blocking | Warnings | Theme | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | public-gap-plan, broad-first-coverage | true | 388 | 100 | 47/69 | 0/6 + 5 suggestions | 0/9 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: tool calling, human review, permissions, logs | Agent deployment, tool calling, and production workflows | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1 | public-gap-plan, broad-first-coverage | true | 378 | 100 | 37/67 | 0/5 + 5 suggestions | 1/9 | true | none | article currently has no links to published articles<br>theme still has missing subtopics: customer service | Cross-industry AI prompt templates | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2 | public-gap-plan | true | 352 | 100 | 41/60 | 0/6 + 5 suggestions | 0/4 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: knowledge base, vector database | RAG, knowledge base, and agent memory | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 2 | public-gap-plan | true | 342 | 100 | 52/80 | 0/3 + 5 suggestions | 0/3 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: gpu memory, quantization, local api, model download | Local and open-source model deployment | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 3 | public-gap-plan | true | 330 | 100 | 37/54 | 0/3 + 5 suggestions | 0/3 | true | none | description may be thin for search snippets<br>primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: self hosted, connector | Dify, n8n, Flowise, and no-code AI automation | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 3 | public-gap-plan | true | 328 | 100 | 29/55 | 0/4 + 5 suggestions | 0/2 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: support, product, weekly report | Business AI workflows and SOP templates | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 1 | broad-first-coverage | true | 321 | 100 | 54/65 | 0/6 + 5 suggestions | 0/5 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles | 开源大模型部署：Ollama、vLLM、TGI、RunPod | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 2 | broad-first-coverage | true | 315 | 100 | 35/59 | 0/5 + 5 suggestions | 0/5 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles | Agent 记忆：短期记忆、长期记忆、RAG、Postgres | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 2 | broad-first-coverage | true | 313 | 100 | 29/52 | 0/4 + 5 suggestions | 0/5 | true | none | description may be thin for search snippets<br>primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles | RAG、知识库、向量数据库和引用溯源 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 4 | public-gap-plan, broad-first-coverage | true | 312 | 100 | 33/59 | 1/3 + 5 suggestions | 1/6 | true | none | primary keyword is not an exact title substring<br>theme still has missing subtopics: logs, prompt injection, cost tracking | LLM evaluation, observability, and security | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 4 | public-gap-plan | true | 312 | 100 | 44/91 | 0/3 + 5 suggestions | 0/4 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: concurrency, autoscaling | LLM serving, GPU, and managed inference | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 3 | broad-first-coverage | true | 307 | 100 | 36/58 | 0/3 + 5 suggestions | 0/5 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles | Dify、n8n、Coze、Flowise、MCP 自动化部署 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 4 | broad-first-coverage | true | 287 | 100 | 29/58 | 0/3 + 5 suggestions | 0/1 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>few search-seed token families appear in article text<br>article currently has no links to published articles | LLM 观测、评测、日志和上线后质量 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |

## All Items

| Wave | Scope | Ready | Score | Quality | Snippet | Links | Seeds | Structured | Blocking | Warnings | Theme | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | public-gap-plan, broad-first-coverage | true | 388 | 100 | 47/69 | 0/6 + 5 suggestions | 0/9 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: tool calling, human review, permissions, logs | Agent deployment, tool calling, and production workflows | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1 | public-gap-plan, broad-first-coverage | true | 378 | 100 | 37/67 | 0/5 + 5 suggestions | 1/9 | true | none | article currently has no links to published articles<br>theme still has missing subtopics: customer service | Cross-industry AI prompt templates | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2 | public-gap-plan | true | 352 | 100 | 41/60 | 0/6 + 5 suggestions | 0/4 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: knowledge base, vector database | RAG, knowledge base, and agent memory | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 2 | public-gap-plan | true | 342 | 100 | 52/80 | 0/3 + 5 suggestions | 0/3 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: gpu memory, quantization, local api, model download | Local and open-source model deployment | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 3 | public-gap-plan | true | 330 | 100 | 37/54 | 0/3 + 5 suggestions | 0/3 | true | none | description may be thin for search snippets<br>primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: self hosted, connector | Dify, n8n, Flowise, and no-code AI automation | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 3 | public-gap-plan | true | 328 | 100 | 29/55 | 0/4 + 5 suggestions | 0/2 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: support, product, weekly report | Business AI workflows and SOP templates | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 1 | broad-first-coverage | true | 321 | 100 | 54/65 | 0/6 + 5 suggestions | 0/5 | true | none | no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles | 开源大模型部署：Ollama、vLLM、TGI、RunPod | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 2 | broad-first-coverage | true | 315 | 100 | 35/59 | 0/5 + 5 suggestions | 0/5 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles | Agent 记忆：短期记忆、长期记忆、RAG、Postgres | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 2 | broad-first-coverage | true | 313 | 100 | 29/52 | 0/4 + 5 suggestions | 0/5 | true | none | description may be thin for search snippets<br>primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles | RAG、知识库、向量数据库和引用溯源 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 4 | public-gap-plan, broad-first-coverage | true | 312 | 100 | 33/59 | 1/3 + 5 suggestions | 1/6 | true | none | primary keyword is not an exact title substring<br>theme still has missing subtopics: logs, prompt injection, cost tracking | LLM evaluation, observability, and security | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 4 | public-gap-plan | true | 312 | 100 | 44/91 | 0/3 + 5 suggestions | 0/4 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles<br>theme still has missing subtopics: concurrency, autoscaling | LLM serving, GPU, and managed inference | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 3 | broad-first-coverage | true | 307 | 100 | 36/58 | 0/3 + 5 suggestions | 0/5 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>article currently has no links to published articles | Dify、n8n、Coze、Flowise、MCP 自动化部署 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 4 | broad-first-coverage | true | 287 | 100 | 29/58 | 0/3 + 5 suggestions | 0/1 | true | none | primary keyword is not an exact title substring<br>no exact search-seed phrase appears in title, description, or body<br>few search-seed token families appear in article text<br>article currently has no links to published articles | LLM 观测、评测、日志和上线后质量 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
