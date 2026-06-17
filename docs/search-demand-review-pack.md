# Search Demand Review Pack

Generated at: 2026-06-17T16:47:18.460Z

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

- factCheckQueries: 63
- items: 11
- itemsPerLaneMax: 2
- itemsWithCommandBoundary: 11
- itemsWithHumanChecklist: 11
- itemsWithInternalLinkSuggestion: 7
- itemsWithManualReviewFocus: 11
- itemsWithOfficialSources: 11
- itemsWithSearchQueries: 11
- lanes: 8
- readyItems: 11
- reviewQueueMatchedItems: 6
- safeDraftItems: 11
- unsafeItems: 0
- zeroPublicLaneItems: 0

## Source Evidence

- intakeGeneratedAt: "2026-06-17T16:47:17.988Z"
- intakeGuardrails: {"autoCreateArticles":false,"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"trafficClaim":"not-included","note":"Read-only search-demand intake. Search queries are editorial seeds, not measured keyword volume, rankings, impressions, clicks, traffic, or revenue."}
- intakeSummary: {"contentFormats":32,"lanes":8,"lanesWithPublicCoverage":8,"lanesWithoutPublicCoverage":0,"lanesWithReadyCandidates":7,"officialSourceTargets":29,"readyCandidateFiles":24,"reviewQueueMatches":10,"searchQueries":81,"unsafeLanes":1}
- sourceHealthFilesWithoutReachableSource: 0
- trafficNote: "Search queries are editorial demand seeds, not measured keyword volume, ranking, impressions, clicks, traffic, or revenue."

## Lane Summaries

| Lane | Items | Public | Ready candidates | Queue matches | Unsafe |
| --- | --- | --- | --- | --- | --- |
| cross-industry-ai-prompts | 2 | 58 | 8 | 0 | 0 |
| rag-knowledge-base-agent-memory | 2 | 30 | 4 | 3 | 0 |
| ai-service-pricing-delivery | 2 | 170 | 8 | 2 | 0 |
| agent-deployment-tools-mcp | 2 | 43 | 4 | 1 | 0 |
| llm-deployment-and-serving | 1 | 41 | 2 | 1 | 0 |
| ai-api-keys-limits-routing | 1 | 96 | 2 | 2 | 0 |
| llm-evals-observability-security | 1 | 13 | 1 | 1 | 0 |
| nocode-ai-automation-deployment | 0 | 30 | 0 | 0 | 0 |

## Unsafe Items

- none

## Review Pack Items

| Score | Ready | Lane | Public | Queue | Sources | Queries | Link | Warnings | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 442 | true | ai-service-pricing-delivery | 170 | true | 4 | 10 | true | 1 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 440 | true | cross-industry-ai-prompts | 58 | false | 4 | 12 | false | 2 | 模板下载页 CTA 文案怎么写：新手检查清单 | content/blog/template-download-cta-copy-checklist.mdx |
| 440 | true | cross-industry-ai-prompts | 58 | false | 4 | 12 | false | 2 | 模板下载页 CTA 文案怎么写 | content/blog/template-download-cta-copy.mdx |
| 440 | true | rag-knowledge-base-agent-memory | 30 | true | 4 | 10 | true | 1 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 438 | true | rag-knowledge-base-agent-memory | 30 | true | 4 | 10 | true | 1 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 416 | true | agent-deployment-tools-mcp | 43 | true | 4 | 10 | true | 1 | Windows 路径和权限导致安装失败怎么办：新手检查清单 | content/blog/windows-path-permission-install-fix-checklist.mdx |
| 408 | true | ai-service-pricing-delivery | 170 | false | 4 | 10 | false | 2 | Upwork 投标复盘表怎么记录：新手检查清单 | content/blog/upwork-proposal-review-sheet-checklist.mdx |
| 399 | true | ai-api-keys-limits-routing | 96 | true | 4 | 10 | true | 1 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 391 | true | agent-deployment-tools-mcp | 43 | false | 4 | 10 | true | 1 | Windows 路径和权限导致安装失败怎么办：使用前怎么判断是否适合 | content/blog/windows-path-permission-install-fix-freelance-scope.mdx |
| 382 | true | llm-deployment-and-serving | 41 | false | 4 | 10 | true | 1 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| 352 | true | llm-evals-observability-security | 13 | true | 4 | 10 | false | 2 | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |

## Manual Review Checklists

### TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收

- File: content/blog/tensorrt-llm-beginner-guide.mdx
- Lane: ai-service-pricing-delivery
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/tensorrt-llm-beginner-guide.mdx`
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
- Approve or replace internal link suggestion: 本地部署大模型怎么开始：新手先看硬件、模型和用途 (/blog/local-llm-deployment-beginner).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### 模板下载页 CTA 文案怎么写：新手检查清单

- File: content/blog/template-download-cta-copy-checklist.mdx
- Lane: cross-industry-ai-prompts
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/template-download-cta-copy-checklist.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/template-download-cta-copy-checklist.mdx`
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
- Add one relevant public internal link or document why no link is appropriate.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/template-download-cta-copy-checklist.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually
- warning: no public internal-link suggestion found; add or explicitly reject one during human review

### 模板下载页 CTA 文案怎么写

- File: content/blog/template-download-cta-copy.mdx
- Lane: cross-industry-ai-prompts
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/template-download-cta-copy.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/template-download-cta-copy.mdx`
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
- Add one relevant public internal link or document why no link is appropriate.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/template-download-cta-copy.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually
- warning: no public internal-link suggestion found; add or explicitly reject one during human review

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Lane: rag-knowledge-base-agent-memory
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/together-ai-api-beginner-guide.mdx`
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
- Approve or replace internal link suggestion: OpenRouter API 怎么接入：统一模型入口不是只换 Base URL (/blog/openrouter-api-beginner-guide).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Lane: rag-knowledge-base-agent-memory
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx`
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
- Approve or replace internal link suggestion: Qdrant 向量数据库怎么用：RAG 新手先看集合、向量和过滤 (/blog/qdrant-vector-database-beginner-guide).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### Windows 路径和权限导致安装失败怎么办：新手检查清单

- File: content/blog/windows-path-permission-install-fix-checklist.mdx
- Lane: agent-deployment-tools-mcp
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/windows-path-permission-install-fix-checklist.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/windows-path-permission-install-fix-checklist.mdx`
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
- Approve or replace internal link suggestion: permission denied 报错新手怎么处理：新手检查清单 (/blog/permission-denied-fix-checklist).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/windows-path-permission-install-fix-checklist.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### Upwork 投标复盘表怎么记录：新手检查清单

- File: content/blog/upwork-proposal-review-sheet-checklist.mdx
- Lane: ai-service-pricing-delivery
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/upwork-proposal-review-sheet-checklist.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/upwork-proposal-review-sheet-checklist.mdx`
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
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/upwork-proposal-review-sheet-checklist.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually
- warning: no public internal-link suggestion found; add or explicitly reject one during human review

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Lane: ai-api-keys-limits-routing
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx`
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
- Approve or replace internal link suggestion: 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 (/blog/multi-model-router-fallback-guide).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### Windows 路径和权限导致安装失败怎么办：使用前怎么判断是否适合

- File: content/blog/windows-path-permission-install-fix-freelance-scope.mdx
- Lane: agent-deployment-tools-mcp
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/windows-path-permission-install-fix-freelance-scope.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/windows-path-permission-install-fix-freelance-scope.mdx`
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
- Approve or replace internal link suggestion: permission denied 报错新手怎么处理：使用前怎么判断是否适合 (/blog/permission-denied-fix-freelance-scope).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/windows-path-permission-install-fix-freelance-scope.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### vLLM 部署适合什么场景：新手先看推理服务边界

- File: content/blog/vllm-deployment-beginner-guide.mdx
- Lane: llm-deployment-and-serving
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/vllm-deployment-beginner-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/vllm-deployment-beginner-guide.mdx`
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
- Approve or replace internal link suggestion: 本地部署大模型怎么开始：新手先看硬件、模型和用途 (/blog/local-llm-deployment-beginner).
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vllm-deployment-beginner-guide.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually

### Vercel build failed 排查清单：从日志到重新部署

- File: content/blog/vercel-build-failed-causes-checklist.mdx
- Lane: llm-evals-observability-security
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Manual mark-review command: `npm run mark:review -- --file=content/blog/vercel-build-failed-causes-checklist.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/vercel-build-failed-causes-checklist.mdx`
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
- Add one relevant public internal link or document why no link is appropriate.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vercel-build-failed-causes-checklist.mdx --confirm-human
- Publishing remains separate and requires explicit approval.

Warnings:

- warning: source health has no per-file reachable URL list; verify official source targets manually
- warning: no public internal-link suggestion found; add or explicitly reject one during human review

