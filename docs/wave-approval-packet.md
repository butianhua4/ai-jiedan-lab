# Wave Approval Packet

Generated at: 2026-06-24T10:34:22.489Z

Approval wave: 1

This packet is read-only. It consolidates the queue and source-pack checks for the next human review wave.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Stop before: Run the listed mark:review commands only after explicit human approval for each file.
- Note: This packet prepares the next human approval wave only. It does not change article status, noindex, or publishing state.

## Summary

- alreadyPublished: 0
- completedOrReady: 3
- items: 3
- readyForHumanReview: 3
- unsafeItems: 0
- wave: 1

## Files

- content/blog/vector-database-selection-for-rag-guide.mdx
- content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- content/blog/supabase-pgvector-rag-guide.mdx

## Decision Table

| Already published | Ready | Score | Quality | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| false | true | 446 | 100 | 8 | 8 | 6 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| false | true | 439 | 100 | 7 | 8 | 6 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| false | true | 415 | 100 | 7 | 8 | 5 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |

## 1. RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Already published: false
- Lane: deployment: RAG、知识库和向量检索
- Search intent: informational
- Publish batch: 25
- Priority score: 446
- Quality score: 100
- Ready for human review: true
- Safe draft: true
- Source pack ready: true
- Chinese chars: 1209
- Internal links: 3
- Description: 面向新手整理 RAG 向量数据库选型思路，比较 pgvector、Qdrant、Milvus 等路线时应关注数据规模、权限、运维、成本和迁移。
- Source notes: 已于 2026-06-12 按 Supabase pgvector 官方文档、Qdrant 和 Milvus 向量数据库官方文档核对基础能力；结合 RAG 项目边界、metadata filter、运维复杂度和迁移成本整理。正式公开前仍需人工核对最新能力、托管价格、区域和版本差异。

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- RAG 向量数据库怎么选 official docs latest
- RAG 向量数据库怎么选 official documentation current limits
- RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 fact check official docs
- AI 基建 official docs limits pricing changelog
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库 RAG 教程
- RAG 评测怎么做

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.

Workflow angles:

- 文档清洗
- chunk
- embedding
- metadata
- 引用来源
- 测试集

Quality issues:

- none

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
```

## 2. Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Already published: false
- Lane: deployment: 大模型和 AI 应用部署
- Search intent: informational
- Publish batch: 34
- Priority score: 439
- Quality score: 100
- Ready for human review: true
- Safe draft: true
- Source pack ready: true
- Chinese chars: 1246
- Internal links: 3
- Description: 整理 Vercel AI Gateway 多模型接入思路，覆盖统一 API、provider 切换、日志、成本、降级、AI SDK 和上线检查。
- Source notes: 参考 Vercel AI Gateway 官方文档、models and providers、provider options 和 capability 文档整理；正式发布前需要人工核对最新模型列表。

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Anthropic docs: https://docs.anthropic.com
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Google AI docs: https://ai.google.dev/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- Vercel AI Gateway 多模型 official docs latest
- Vercel AI Gateway 多模型 official documentation current limits
- Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 fact check official docs
- AI 部署 official docs limits pricing changelog
- 大模型部署教程
- AI 应用部署教程
- OpenAI API 部署教程
- Vercel AI SDK 部署

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 环境变量
- API Key
- 限流重试
- 上线检查
- 回滚

Quality issues:

- none

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
```

## 3. Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Already published: false
- Lane: deployment: RAG、知识库和向量检索
- Search intent: informational
- Publish batch: 24
- Priority score: 415
- Quality score: 100
- Ready for human review: true
- Safe draft: true
- Source pack ready: true
- Chinese chars: 1255
- Internal links: 3
- Description: 面向新手整理 Supabase pgvector 做 RAG 的入门思路，覆盖 vector column、embedding、SQL 查询、权限、索引、成本和维护。
- Source notes: 参考 Supabase AI & Vectors、vector columns、LangChain with Supabase 文档整理；正式发布前需要人工核对 pgvector 版本和 SQL 示例。

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://docs.langchain.com

Fact-check queries:

- Supabase pgvector official docs latest
- Supabase pgvector official documentation current limits
- Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 fact check official docs
- AI 基建 official docs limits pricing changelog
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库 RAG 教程
- RAG 评测怎么做

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.

Workflow angles:

- 文档清洗
- chunk
- embedding
- metadata
- 引用来源
- 测试集

Quality issues:

- none

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx
```
