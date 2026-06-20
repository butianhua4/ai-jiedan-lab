# Search Intent Approval Packet

Generated at: 2026-06-20T10:19:07.177Z

This packet is read-only. It turns the broad search-intent lane map into a focused human approval queue. It does not mark review, publish, or change noindex.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Run confirm-human or publish confirm commands only after explicit human approval for each file.
- Note: Read-only human approval packet derived from the search-intent lane map. It does not change article status, noindex, or publishing state.

## Summary

- currentWaveItems: 3
- currentWaveReady: 3
- nextGapItems: 0
- nextGapLanes: 0
- unsafeItems: 0
- wave: 1

## Source Evidence

- laneMapLanes: 12
- laneMapHighPriorityLanes: 7
- laneMapWithoutPublicCoverage: 0
- laneMapReadyDraftMatches: 22
- note: Lane priorities are editorial signals for broad search-intent coverage, not measured keyword volume or traffic.

## Current Wave Items

| Ready | Wave 1 | Current pack | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | true | 224 | 100 | 25 | RAG, knowledge base, and Agent memory | RAG 向量数据库怎么选 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | true | true | 180 | 100 | 34 | Model API integration, rate limits, and multi-model fallback | Vercel AI Gateway 多模型 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| true | true | false | 224 | 100 | 24 | RAG, knowledge base, and Agent memory | Supabase pgvector | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |

## Next Gap Items

- none

## Current Wave Detail

### 1. RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Lane: RAG, knowledge base, and Agent memory
- Audience: Teams building customer support bots, internal knowledge assistants, and document Q&A.
- Priority reason: demandScore=10; public coverage=31; readyDrafts=4; currentPack=1; wave1=2
- Description: 面向新手整理 RAG 向量数据库选型思路，比较 pgvector、Qdrant、Milvus 等路线时应关注数据规模、权限、运维、成本和迁移。
- Source notes: 已于 2026-06-12 按 Supabase pgvector 官方文档、Qdrant 和 Milvus 向量数据库官方文档核对基础能力；结合 RAG 项目边界、metadata filter、运维复杂度和迁移成本整理。正式公开前仍需人工核对最新能力、托管价格、区域和版本差异。
- Chinese chars: 1209

Intent seeds:

- RAG 知识库搭建
- AI Agent 记忆
- 向量数据库教程
- 企业知识库 AI

Review focus:

- chunking and metadata
- citation and source boundaries
- privacy and retention
- evaluation set

Source targets:

- OpenAI retrieval: https://platform.openai.com/docs/guides/retrieval
- OpenAI Agents knowledge and memory: https://platform.openai.com/docs/guides/agents
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Retrieval quality, citations, memory retention, privacy, and hallucination risks are explicit.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
```

### 2. Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Lane: Model API integration, rate limits, and multi-model fallback
- Audience: Developers integrating OpenAI, Claude, Gemini, OpenRouter, and multi-model routing.
- Priority reason: demandScore=9; public coverage=28; readyDrafts=2; currentPack=1; wave1=1
- Description: 整理 Vercel AI Gateway 多模型接入思路，覆盖统一 API、provider 切换、日志、成本、降级、AI SDK 和上线检查。
- Source notes: 参考 Vercel AI Gateway 官方文档、models and providers、provider options 和 capability 文档整理；正式发布前需要人工核对最新模型列表。
- Chinese chars: 1246

Intent seeds:

- OpenAI API 接入
- Claude API 限流
- Gemini API 限流
- 多模型 Router 降级

Review focus:

- current model names
- rate limits
- retry behavior
- key rotation
- fallback quality

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com
- Vercel AI SDK providers: https://ai-sdk.dev/docs/foundations/providers-and-models

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Article-specific operational and safety boundaries are explicit.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
```

### 3. Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Lane: RAG, knowledge base, and Agent memory
- Audience: Teams building customer support bots, internal knowledge assistants, and document Q&A.
- Priority reason: demandScore=10; public coverage=31; readyDrafts=4; currentPack=1; wave1=2
- Description: 面向新手整理 Supabase pgvector 做 RAG 的入门思路，覆盖 vector column、embedding、SQL 查询、权限、索引、成本和维护。
- Source notes: 参考 Supabase AI & Vectors、vector columns、LangChain with Supabase 文档整理；正式发布前需要人工核对 pgvector 版本和 SQL 示例。
- Chinese chars: 1255

Intent seeds:

- RAG 知识库搭建
- AI Agent 记忆
- 向量数据库教程
- 企业知识库 AI

Review focus:

- chunking and metadata
- citation and source boundaries
- privacy and retention
- evaluation set

Source targets:

- OpenAI retrieval: https://platform.openai.com/docs/guides/retrieval
- OpenAI Agents knowledge and memory: https://platform.openai.com/docs/guides/agents
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Retrieval quality, citations, memory retention, privacy, and hallucination risks are explicit.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx
```

## Next Gap Detail
