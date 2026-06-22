# Autopilot Queued Playbook Brief

Generated at: 2026-06-22T06:59:25.935Z

This report is read-only. It prepares the queued-for-playbook sprint items for manual review and keeps all status changes human-gated.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Use this report for manual review only. mark:review requires explicit human approval per file; publish --confirm is not included.
- Note: Read-only merged playbook for next-10 queued-for-playbook sprint items. It prepares human review without changing article status.

## Summary

- items: 7
- itemsWithCommandBoundary: 7
- itemsWithFactCheckQueries: 7
- itemsWithInternalLinkSuggestions: 6
- itemsWithOptimizationActions: 1
- itemsWithRiskChecklist: 7
- itemsWithSearchActions: 7
- itemsWithSearchQueries: 7
- itemsWithSourceActions: 7
- itemsWithSourceEvidence: 7
- itemsWithSourceTargets: 7
- readyItems: 7
- safeDraftItems: 7
- unsafeItems: 0

## Source Evidence

- queuedForPlaybook: 7
- sprintBoardUnsafeItems: 0

## Unsafe Items

- none

## Queued Playbook Items

| Order | Ready | Sources | Queries | Actions | Links | Freshness | Cannibalization | Mark-review gated | Publish confirm | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | true | 8 | 12 | 20 | 3 | high | low | true | not-included | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 3 | true | 7 | 12 | 18 | 3 | unknown | unknown | true | not-included | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 4 | true | 7 | 12 | 13 | 3 | unknown | unknown | true | not-included | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 5 | true | 3 | 12 | 13 | 3 | unknown | unknown | true | not-included | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| 6 | true | 6 | 4 | 13 | 3 | unknown | unknown | true | not-included | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |
| 7 | true | 5 | 12 | 13 | 3 | unknown | unknown | true | not-included | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 8 | true | 3 | 12 | 13 | 0 | unknown | unknown | true | not-included | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |

## Manual Review Playbooks

### 2. RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Primary keyword: RAG 向量数据库怎么选
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, internal-link-opportunity-audit, autopilot-search-query-gap-brief
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: RAG 向量数据库怎么选
- Confirm article answers search query: RAG 向量数据库怎么选怎么做
- Confirm article answers search query: RAG 向量数据库怎么选教程
- Confirm article answers search query: RAG 向量数据库怎么选新手教程
- Confirm article answers search query: RAG 向量数据库怎么选落地步骤
- Confirm article answers search query: RAG 向量数据库怎么选对比
- Confirm article answers search query: RAG 向量数据库怎么选怎么选
- Confirm article answers search query: RAG 向量数据库怎么选模板

Source actions:

- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: LlamaIndex docs: https://docs.llamaindex.ai
- Verify official source: Hugging Face docs: https://huggingface.co/docs
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Optimization actions:

- 在开头 200 字内自然回答一次“RAG 向量数据库怎么选”这个搜索意图，先给结论再展开步骤。
- 在相关段落加入公开内链：RAG 知识库怎么搭：文档、切分、检索和回答复核 (/blog/rag-knowledge-base-beginner-guide)。
- Add one FAQ or checklist line that uses a high-intent query variant such as: RAG 向量数据库怎么选.
- Consider reviewed title: RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界
- Consider reviewed description: 面向准备落地 RAG 向量数据库怎么选 的团队，梳理判断标准、实施步骤、风险边界、验收清单和发布前人工审核重点。

Internal link suggestions:

- RAG 知识库怎么搭：文档、切分、检索和回答复核: /blog/rag-knowledge-base-beginner-guide
- Chroma 向量数据库怎么用：本地 RAG 原型先跑通 collection: /blog/chroma-vector-database-rag-guide
- RAG 检索不到内容怎么办：先判断是资料、切分还是检索链路: /blog/rag-retrieval-no-context-debug-guide

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Open official source targets and verify current product names, APIs, limits, pricing-sensitive wording, and workflow boundaries.

### 3. Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Primary keyword: Supabase pgvector
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, review-action-board, internal-link-opportunity-audit, autopilot-search-query-gap-brief
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: Supabase pgvector
- Confirm article answers search query: Supabase pgvector怎么做
- Confirm article answers search query: Supabase pgvector教程
- Confirm article answers search query: Supabase pgvector新手教程
- Confirm article answers search query: Supabase pgvector落地步骤
- Confirm article answers search query: Supabase pgvector对比
- Confirm article answers search query: Supabase pgvector怎么选
- Confirm article answers search query: Supabase pgvector模板

Source actions:

- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: LlamaIndex docs: https://docs.llamaindex.ai
- Verify official source: Hugging Face docs: https://huggingface.co/docs
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: LangChain docs: https://docs.langchain.com
- Run or manually check fact-check query: Supabase pgvector official docs latest

Optimization actions:

- none

Internal link suggestions:

- Pinecone 做 RAG 怎么开始：索引、metadata 和召回测试: /blog/pinecone-rag-beginner-guide
- Chroma 向量数据库怎么用：本地 RAG 原型先跑通 collection: /blog/chroma-vector-database-rag-guide
- RAG 检索不到内容怎么办：先判断是资料、切分还是检索链路: /blog/rag-retrieval-no-context-debug-guide

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- missing publish readiness pack item
- No traffic, ranking, revenue, benchmark, cost, latency, or stability claim is approved without measured evidence.
- No API key, private customer data, credential, or client account detail is exposed.

### 4. Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Primary keyword: Together AI API 接入
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, internal-link-opportunity-audit, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/together-ai-api-beginner-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: RAG 知识库搭建教程
- Confirm article answers search query: 企业知识库 AI 部署
- Confirm article answers search query: 向量数据库 RAG 教程
- Confirm article answers search query: RAG 评测怎么做
- Confirm article answers search query: Together AI API 接入怎么做
- Confirm article answers search query: Together AI API 接入教程
- Confirm article answers search query: Together AI API 接入新手教程
- Confirm article answers search query: Together AI API 接入落地步骤

Source actions:

- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: Anthropic docs: https://docs.anthropic.com
- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: LlamaIndex docs: https://docs.llamaindex.ai
- Verify official source: Hugging Face docs: https://huggingface.co/docs
- Run or manually check fact-check query: Together AI API 接入 official docs latest

Optimization actions:

- none

Internal link suggestions:

- OpenRouter API 怎么接入：统一模型入口不是只换 Base URL: /blog/openrouter-api-beginner-guide
- Groq API 怎么接入：高速推理适合什么 AI 应用: /blog/groq-api-fast-llm-guide
- Claude API 怎么接入：Messages API、费用和上下文边界: /blog/claude-api-beginner-guide

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.
- No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.

### 5. Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Primary keyword: Vercel 部署成功但 404
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, internal-link-opportunity-audit, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/vercel-404-after-deploy.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: Vercel build failed
- Confirm article answers search query: Vercel 部署后 404
- Confirm article answers search query: API Key 无效或缺失
- Confirm article answers search query: 环境变量缺失怎么办
- Confirm article answers search query: Vercel 部署成功但 404怎么做
- Confirm article answers search query: Vercel 部署成功但 404教程
- Confirm article answers search query: Vercel 部署成功但 404新手教程
- Confirm article answers search query: Vercel 部署成功但 404落地步骤

Source actions:

- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Run or manually check fact-check query: Vercel 部署成功但 404 official docs latest
- Run or manually check fact-check query: Vercel 部署成功但 404 official documentation current limits
- Run or manually check fact-check query: Vercel 部署成功但页面 404：新手排查顺序 fact check official docs
- Run or manually check fact-check query: 报错解决 official docs limits pricing changelog

Optimization actions:

- none

Internal link suggestions:

- Next.js hydration error 怎么排查：使用前怎么判断是否适合: /blog/nextjs-hydration-error-debug-freelance-scope
- Node 版本不匹配使用前怎么判断是否适合: /blog/node-version-mismatch-fix-freelance-scope
- Node 版本不匹配常见错误和解决步骤: /blog/node-version-mismatch-fix-mistakes

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.
- No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.
- No unsafe secret handling, public API key exposure, or client-side privileged token use.

### 6. Windows 路径和权限导致安装失败怎么办

- File: content/blog/windows-path-permission-install-fix.mdx
- Primary keyword: Windows 路径和权限导致安装失败怎么办
- Source evidence: next-review-source-pack, review-portfolio-board, internal-link-opportunity-audit, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/windows-path-permission-install-fix.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/windows-path-permission-install-fix.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: MCP Server 部署安全
- Confirm article answers search query: Agent 工具权限控制
- Confirm article answers search query: 企业微信 AI Agent
- Confirm article answers search query: Slack AI Agent 接入

Source actions:

- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: Anthropic docs: https://docs.anthropic.com
- Verify official source: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Verify official source: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Verify official source: n8n docs: https://docs.n8n.io
- Run or manually check fact-check query: Windows 路径和权限导致安装失败怎么办 official docs latest
- Run or manually check fact-check query: Windows 路径和权限导致安装失败怎么办 official documentation current limits

Optimization actions:

- none

Internal link suggestions:

- permission denied 报错新手怎么处理：使用前怎么判断是否适合: /blog/permission-denied-fix-freelance-scope
- Next.js hydration error 怎么排查：使用前怎么判断是否适合: /blog/nextjs-hydration-error-debug-freelance-scope
- permission denied 报错新手怎么处理：新手检查清单: /blog/permission-denied-fix-checklist

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.
- No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.
- No unsafe secret handling, public API key exposure, or client-side privileged token use.

### 7. TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收

- File: content/blog/tensorrt-llm-beginner-guide.mdx
- Primary keyword: TensorRT-LLM 入门
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, internal-link-opportunity-audit, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/tensorrt-llm-beginner-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: vLLM 部署教程
- Confirm article answers search query: TGI 部署教程
- Confirm article answers search query: RunPod Serverless 大模型部署
- Confirm article answers search query: Modal Serverless GPU LLM
- Confirm article answers search query: TensorRT-LLM 入门怎么做
- Confirm article answers search query: TensorRT-LLM 入门教程
- Confirm article answers search query: TensorRT-LLM 入门新手教程
- Confirm article answers search query: TensorRT-LLM 入门落地步骤

Source actions:

- Verify official source: vLLM docs: https://docs.vllm.ai
- Verify official source: Hugging Face docs: https://huggingface.co/docs
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: Ollama docs: https://docs.ollama.com
- Run or manually check fact-check query: TensorRT-LLM 入门 official docs latest
- Run or manually check fact-check query: TensorRT-LLM 入门 official documentation current limits
- Run or manually check fact-check query: TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 fact check official docs

Optimization actions:

- none

Internal link suggestions:

- 本地部署大模型怎么开始：新手先看硬件、模型和用途: /blog/local-llm-deployment-beginner
- 大模型部署成本和延迟怎么估算：上线前检查清单: /blog/llm-serving-cost-latency-checklist
- Ray Serve 怎么部署 LLM：多节点、多模型和 OpenAI 兼容接口入门: /blog/ray-serve-llm-deployment-guide

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.
- No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.
- No unsafe secret handling, public API key exposure, or client-side privileged token use.

### 8. Vercel build failed 排查清单：从日志到重新部署

- File: content/blog/vercel-build-failed-causes-checklist.mdx
- Primary keyword: Vercel build failed 排查清单
- Source evidence: search-query-coverage, review-portfolio-board, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/vercel-build-failed-causes-checklist.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/vercel-build-failed-causes-checklist.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: LLM observability 教程
- Confirm article answers search query: Agent 可观测性
- Confirm article answers search query: RAG 评测
- Confirm article answers search query: promptfoo LLM 评测
- Confirm article answers search query: Vercel build failed 排查清单怎么做
- Confirm article answers search query: Vercel build failed 排查清单教程
- Confirm article answers search query: Vercel build failed 排查清单新手教程
- Confirm article answers search query: Vercel build failed 排查清单落地步骤

Source actions:

- Verify official source: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: LlamaIndex docs: https://docs.llamaindex.ai
- Run or manually check fact-check query: LLM observability 教程 official docs latest
- Run or manually check fact-check query: Agent 可观测性 official docs latest
- Run or manually check fact-check query: RAG 评测 official docs latest
- Run or manually check fact-check query: promptfoo LLM 评测 official docs latest

Optimization actions:

- none

Internal link suggestions:

- none

Risk checklist:

- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.
- No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.
- No unsafe secret handling, public API key exposure, or client-side privileged token use.
- No unbounded autonomous Agent action without permissions, allowlists, human approval, and logs.
- No RAG or memory claim that removes the need for citation, privacy review, or hallucination checks.
- No outdated model, package, endpoint, pricing, or platform behavior unless marked for human fact-checking.
- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify official docs for deployment commands, SDK names, model names, API endpoints, environment variables, and version-sensitive details.

