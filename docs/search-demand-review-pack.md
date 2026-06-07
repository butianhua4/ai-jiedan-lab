# Search Demand Review Pack

Generated at: 2026-06-07T15:06:33.107Z

This report is read-only. It converts high-search-demand lanes into manual review packets and stops before status changes or publishing.

## Guardrails

- Auto create articles: false
- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: All commands are manual-only and require explicit human approval.
- Note: Read-only review pack for high-search-demand lanes. It packages manual review work but never edits article files, marks review, or publishes.

## Summary

- factCheckQueries: 79
- items: 16
- itemsPerLaneMax: 2
- itemsWithCommandBoundary: 16
- itemsWithHumanChecklist: 16
- itemsWithInternalLinkSuggestion: 13
- itemsWithManualReviewFocus: 16
- itemsWithOfficialSources: 16
- itemsWithSearchQueries: 16
- lanes: 8
- readyItems: 16
- reviewQueueMatchedItems: 15
- safeDraftItems: 16
- unsafeItems: 0
- zeroPublicLaneItems: 12

## Source Evidence

- intakeGeneratedAt: "2026-06-07T15:06:32.576Z"
- intakeGuardrails: {"autoCreateArticles":false,"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"trafficClaim":"not-included","note":"Read-only search-demand intake. Search queries are editorial seeds, not measured keyword volume, rankings, impressions, clicks, traffic, or revenue."}
- intakeSummary: {"contentFormats":32,"lanes":8,"lanesWithPublicCoverage":2,"lanesWithoutPublicCoverage":6,"lanesWithReadyCandidates":8,"officialSourceTargets":29,"readyCandidateFiles":45,"reviewQueueMatches":33,"searchQueries":81,"unsafeLanes":0}
- sourceHealthFilesWithoutReachableSource: 0
- trafficNote: "Search queries are editorial demand seeds, not measured keyword volume, ranking, impressions, clicks, traffic, or revenue."

## Lane Summaries

| Lane | Items | Public | Ready candidates | Queue matches | Unsafe |
| --- | --- | --- | --- | --- | --- |
| agent-deployment-tools-mcp | 2 | 0 | 8 | 7 | 0 |
| cross-industry-ai-prompts | 2 | 0 | 8 | 5 | 0 |
| llm-deployment-and-serving | 2 | 0 | 8 | 5 | 0 |
| rag-knowledge-base-agent-memory | 2 | 0 | 8 | 5 | 0 |
| nocode-ai-automation-deployment | 2 | 0 | 8 | 4 | 0 |
| llm-evals-observability-security | 2 | 0 | 8 | 2 | 0 |
| ai-api-keys-limits-routing | 2 | 1 | 8 | 2 | 0 |
| ai-service-pricing-delivery | 2 | 4 | 8 | 3 | 0 |

## Unsafe Items

- none

## Review Pack Items

| Score | Ready | Lane | Public | Queue | Sources | Queries | Link | Warnings | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 689 | true | agent-deployment-tools-mcp | 0 | true | 4 | 10 | true | 1 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 689 | true | agent-deployment-tools-mcp | 0 | true | 4 | 10 | true | 1 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 685 | true | cross-industry-ai-prompts | 0 | true | 4 | 12 | true | 1 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 679 | true | cross-industry-ai-prompts | 0 | true | 4 | 12 | true | 1 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 677 | true | llm-deployment-and-serving | 0 | true | 4 | 10 | true | 1 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 671 | true | llm-deployment-and-serving | 0 | true | 4 | 10 | false | 2 | 大模型成本监控怎么做：按用户、功能、模型和项目拆账 | content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| 662 | true | rag-knowledge-base-agent-memory | 0 | true | 4 | 10 | true | 1 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 662 | true | rag-knowledge-base-agent-memory | 0 | true | 4 | 10 | true | 1 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 642 | true | nocode-ai-automation-deployment | 0 | true | 4 | 10 | true | 1 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 642 | true | nocode-ai-automation-deployment | 0 | true | 4 | 10 | true | 1 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 610 | true | llm-evals-observability-security | 0 | true | 4 | 10 | true | 1 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 609 | true | llm-evals-observability-security | 0 | true | 4 | 10 | true | 1 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| 484 | true | ai-api-keys-limits-routing | 1 | true | 4 | 10 | true | 1 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 462 | true | ai-service-pricing-delivery | 4 | true | 4 | 10 | false | 2 | 产品经理 AI 提示词模板：需求分析、PRD、竞品、用户故事和验收标准 | content/blog/product-manager-ai-prompts-guide.mdx |
| 460 | true | ai-service-pricing-delivery | 4 | true | 4 | 10 | false | 2 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 459 | true | ai-api-keys-limits-routing | 1 | false | 4 | 10 | true | 1 | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |

## Manual Review Checklists

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Lane: agent-deployment-tools-mcp
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx`
- Publish confirm: not-included

Search queries:

- AI Agent deployment tutorial
- agent tool calling tutorial
- OpenAI Agents SDK guide
- Vercel AI SDK agent
- MCP server deployment
- agent tool permission checklist
- AI Agent 部署教程
- Agent 工具调用教程

Official source targets:

- OpenAI Agents SDK docs: https://openai.github.io/openai-agents-python/
- OpenAI Agents guide: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK agents docs: https://ai-sdk.dev/docs/agents
- Model Context Protocol security best practices: https://modelcontextprotocol.io/specification/draft/basic/security_best_practices

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: agent-deployment-tools-mcp.
- Check the article directly answers the primary search phrase: AI Agent deployment tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界

- File: content/blog/ai-agent-memory-rag-design-guide.mdx
- Lane: agent-deployment-tools-mcp
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx`
- Publish confirm: not-included

Search queries:

- AI Agent deployment tutorial
- agent tool calling tutorial
- OpenAI Agents SDK guide
- Vercel AI SDK agent
- MCP server deployment
- agent tool permission checklist
- AI Agent 部署教程
- Agent 工具调用教程

Official source targets:

- OpenAI Agents SDK docs: https://openai.github.io/openai-agents-python/
- OpenAI Agents guide: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK agents docs: https://ai-sdk.dev/docs/agents
- Model Context Protocol security best practices: https://modelcontextprotocol.io/specification/draft/basic/security_best_practices

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: agent-deployment-tools-mcp.
- Check the article directly answers the primary search phrase: AI Agent deployment tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Lane: cross-industry-ai-prompts
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx`
- Publish confirm: not-included

Search queries:

- AI prompt templates for business
- ChatGPT prompts for work
- industry AI prompts
- sales AI prompts
- customer service AI prompts
- HR AI prompts
- finance AI prompts
- marketing AI prompt templates

Official source targets:

- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation guide: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering docs: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: cross-industry-ai-prompts.
- Check the article directly answers the primary search phrase: AI prompt templates for business.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Lane: cross-industry-ai-prompts
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx`
- Publish confirm: not-included

Search queries:

- AI prompt templates for business
- ChatGPT prompts for work
- industry AI prompts
- sales AI prompts
- customer service AI prompts
- HR AI prompts
- finance AI prompts
- marketing AI prompt templates

Official source targets:

- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation guide: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering docs: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: cross-industry-ai-prompts.
- Check the article directly answers the primary search phrase: AI prompt templates for business.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查

- File: content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx
- Lane: llm-deployment-and-serving
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx`
- Publish confirm: not-included

Search queries:

- large language model deployment tutorial
- vLLM deployment tutorial
- Hugging Face TGI deployment
- RunPod vLLM serverless
- Ollama local model tutorial
- local LLM deployment
- 大模型部署教程
- 本地大模型部署

Official source targets:

- vLLM docs: https://docs.vllm.ai/
- Hugging Face docs: https://huggingface.co/docs
- RunPod serverless vLLM docs: https://docs.runpod.io/serverless/vllm/get-started
- Ollama docs: https://docs.ollama.com/

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: llm-deployment-and-serving.
- Check the article directly answers the primary search phrase: large language model deployment tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### 大模型成本监控怎么做：按用户、功能、模型和项目拆账

- File: content/blog/llm-cost-monitoring-dashboard-guide.mdx
- Lane: llm-deployment-and-serving
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/llm-cost-monitoring-dashboard-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/llm-cost-monitoring-dashboard-guide.mdx`
- Publish confirm: not-included

Search queries:

- large language model deployment tutorial
- vLLM deployment tutorial
- Hugging Face TGI deployment
- RunPod vLLM serverless
- Ollama local model tutorial
- local LLM deployment
- 大模型部署教程
- 本地大模型部署

Official source targets:

- vLLM docs: https://docs.vllm.ai/
- Hugging Face docs: https://huggingface.co/docs
- RunPod serverless vLLM docs: https://docs.runpod.io/serverless/vllm/get-started
- Ollama docs: https://docs.ollama.com/

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: llm-deployment-and-serving.
- Check the article directly answers the primary search phrase: large language model deployment tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Add one relevant public internal link or document why no link is appropriate.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/llm-cost-monitoring-dashboard-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually
- warning: no public internal-link suggestion found; add or explicitly reject one during human review

### AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Lane: rag-knowledge-base-agent-memory
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx`
- Publish confirm: not-included

Search queries:

- RAG knowledge base tutorial
- AI agent memory
- agent long term memory
- pgvector agent memory
- vector database RAG
- RAG evaluation tutorial
- AI Agent 记忆怎么做
- RAG 知识库搭建教程

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain retrieval docs: https://python.langchain.com/docs/concepts/retrieval/
- LlamaIndex docs: https://docs.llamaindex.ai/
- Supabase pgvector docs: https://supabase.com/docs/guides/database/extensions/pgvector

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: rag-knowledge-base-agent-memory.
- Check the article directly answers the primary search phrase: RAG knowledge base tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: 第一个 Upwork 小项目怎么报价：新手范围和底价检查 (/blog/first-upwork-project-pricing-checklist).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储

- File: content/blog/n8n-ai-agent-rag-memory-guide.mdx
- Lane: rag-knowledge-base-agent-memory
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx`
- Publish confirm: not-included

Search queries:

- RAG knowledge base tutorial
- AI agent memory
- agent long term memory
- pgvector agent memory
- vector database RAG
- RAG evaluation tutorial
- AI Agent 记忆怎么做
- RAG 知识库搭建教程

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain retrieval docs: https://python.langchain.com/docs/concepts/retrieval/
- LlamaIndex docs: https://docs.llamaindex.ai/
- Supabase pgvector docs: https://supabase.com/docs/guides/database/extensions/pgvector

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: rag-knowledge-base-agent-memory.
- Check the article directly answers the primary search phrase: RAG knowledge base tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底

- File: content/blog/dify-workflow-error-handling-guide.mdx
- Lane: nocode-ai-automation-deployment
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/dify-workflow-error-handling-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/dify-workflow-error-handling-guide.mdx`
- Publish confirm: not-included

Search queries:

- Dify deployment tutorial
- n8n AI agent tutorial
- Flowise local deployment
- Coze bot publish tutorial
- MCP tutorial
- AI automation workflow
- Dify 部署教程
- n8n AI 自动化教程

Official source targets:

- Dify docs: https://docs.dify.ai/
- n8n docs: https://docs.n8n.io/
- Flowise docs: https://docs.flowiseai.com/
- Model Context Protocol docs: https://modelcontextprotocol.io/docs

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: nocode-ai-automation-deployment.
- Check the article directly answers the primary search phrase: Dify deployment tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/dify-workflow-error-handling-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核

- File: content/blog/dify-workflow-vs-agent-guide.mdx
- Lane: nocode-ai-automation-deployment
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/dify-workflow-vs-agent-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/dify-workflow-vs-agent-guide.mdx`
- Publish confirm: not-included

Search queries:

- Dify deployment tutorial
- n8n AI agent tutorial
- Flowise local deployment
- Coze bot publish tutorial
- MCP tutorial
- AI automation workflow
- Dify 部署教程
- n8n AI 自动化教程

Official source targets:

- Dify docs: https://docs.dify.ai/
- n8n docs: https://docs.n8n.io/
- Flowise docs: https://docs.flowiseai.com/
- Model Context Protocol docs: https://modelcontextprotocol.io/docs

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: nocode-ai-automation-deployment.
- Check the article directly answers the primary search phrase: Dify deployment tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/dify-workflow-vs-agent-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单

- File: content/blog/mcp-server-deployment-security-checklist.mdx
- Lane: llm-evals-observability-security
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/mcp-server-deployment-security-checklist.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/mcp-server-deployment-security-checklist.mdx`
- Publish confirm: not-included

Search queries:

- LLM observability tutorial
- RAG evaluation tutorial
- AI agent logs
- prompt injection defense
- promptfoo tutorial
- LangSmith tutorial
- LLM 评测教程
- RAG 评估教程

Official source targets:

- OpenAI evals guide: https://platform.openai.com/docs/guides/evals
- promptfoo docs: https://www.promptfoo.dev/docs/intro/
- Ragas docs: https://docs.ragas.io/
- LangSmith docs: https://docs.smith.langchain.com/

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: llm-evals-observability-security.
- Check the article directly answers the primary search phrase: LLM observability tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/mcp-server-deployment-security-checklist.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志

- File: content/blog/agent-tool-permission-safety-guide.mdx
- Lane: llm-evals-observability-security
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/agent-tool-permission-safety-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/agent-tool-permission-safety-guide.mdx`
- Publish confirm: not-included

Search queries:

- LLM observability tutorial
- RAG evaluation tutorial
- AI agent logs
- prompt injection defense
- promptfoo tutorial
- LangSmith tutorial
- LLM 评测教程
- RAG 评估教程

Official source targets:

- OpenAI evals guide: https://platform.openai.com/docs/guides/evals
- promptfoo docs: https://www.promptfoo.dev/docs/intro/
- Ragas docs: https://docs.ragas.io/
- LangSmith docs: https://docs.smith.langchain.com/

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: llm-evals-observability-security.
- Check the article directly answers the primary search phrase: LLM observability tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: 第一个 Upwork 小项目怎么报价：新手范围和底价检查 (/blog/first-upwork-project-pricing-checklist).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/agent-tool-permission-safety-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Lane: ai-api-keys-limits-routing
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx`
- Publish confirm: not-included

Search queries:

- OpenAI API integration tutorial
- Claude API rate limit
- Gemini API tutorial
- OpenRouter API tutorial
- AI API key security
- multi model AI routing
- OpenAI API 接入教程
- Claude API 限流

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com/
- Google Gemini API docs: https://ai.google.dev/gemini-api/docs
- Vercel AI Gateway docs: https://vercel.com/docs/ai-gateway

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: ai-api-keys-limits-routing.
- Check the article directly answers the primary search phrase: OpenAI API integration tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### 产品经理 AI 提示词模板：需求分析、PRD、竞品、用户故事和验收标准

- File: content/blog/product-manager-ai-prompts-guide.mdx
- Lane: ai-service-pricing-delivery
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/product-manager-ai-prompts-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/product-manager-ai-prompts-guide.mdx`
- Publish confirm: not-included

Search queries:

- AI automation project pricing
- AI agent project scope
- RAG project quote
- Dify n8n project pricing
- AI deployment proposal template
- AI service delivery checklist
- AI 自动化项目报价
- AI Agent 项目报价

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Dify docs: https://docs.dify.ai/
- n8n docs: https://docs.n8n.io/

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: ai-service-pricing-delivery.
- Check the article directly answers the primary search phrase: AI automation project pricing.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Add one relevant public internal link or document why no link is appropriate.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/product-manager-ai-prompts-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually
- warning: no public internal-link suggestion found; add or explicitly reject one during human review

### BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收

- File: content/blog/bentoml-llm-deployment-beginner-guide.mdx
- Lane: ai-service-pricing-delivery
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx`
- Publish confirm: not-included

Search queries:

- AI automation project pricing
- AI agent project scope
- RAG project quote
- Dify n8n project pricing
- AI deployment proposal template
- AI service delivery checklist
- AI 自动化项目报价
- AI Agent 项目报价

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Dify docs: https://docs.dify.ai/
- n8n docs: https://docs.n8n.io/

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: ai-service-pricing-delivery.
- Check the article directly answers the primary search phrase: AI automation project pricing.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Add one relevant public internal link or document why no link is appropriate.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually
- warning: no public internal-link suggestion found; add or explicitly reject one during human review

### Claude API Rate limit reached 怎么办：限流、上下文、重试和降级

- File: content/blog/claude-api-rate-limit-debug-guide.mdx
- Lane: ai-api-keys-limits-routing
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx`
- Publish confirm: not-included

Search queries:

- OpenAI API integration tutorial
- Claude API rate limit
- Gemini API tutorial
- OpenRouter API tutorial
- AI API key security
- multi model AI routing
- OpenAI API 接入教程
- Claude API 限流

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com/
- Google Gemini API docs: https://ai.google.dev/gemini-api/docs
- Vercel AI Gateway docs: https://vercel.com/docs/ai-gateway

Human review checklist:

- Confirm the article is still draft, noindex=true, and humanReviewRequired=true.
- Verify source targets for lane: ai-api-keys-limits-routing.
- Check the article directly answers the primary search phrase: OpenAI API integration tutorial.
- Remove or rewrite any unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.
- Confirm all commands, credentials, API keys, and customer data examples are safe.
- Approve or replace internal link suggestion: Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

