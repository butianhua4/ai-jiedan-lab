# Review Batch Plan

Generated at: 2026-06-21T10:53:27.206Z

This is a manual review plan. It does not publish articles or change article status.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Note: This plan only organizes manual review work. It does not change article status, noindex, or publishing state.
- Stop before: Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.

## Totals

- Planned batches: 3
- Planned candidates: 6
- Source review candidates: 25
- Source opportunities: 7

## Batch 1: 大模型和 AI 应用部署教程

- Why: 部署、API、限流、环境变量是新人最容易搜索也最容易踩坑的入口。
- Decision rule: A human reviewer must approve facts, risk language, source freshness, and search-intent fit before any mark:review command is run.

Search queries to verify:

- 大模型部署教程
- AI 应用部署 Vercel 教程
- OpenAI API 部署教程
- Claude API 部署教程

Review focus:

- 核对官方部署文档
- 检查 API Key、限流、环境变量和费用说法
- 补足上线后的 smoke check 和回滚步骤

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 34 | 100 | 34 | AI deployment | AI 部署 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 2 | 27 | 100 | 27 | AI deployment | AI 基建 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 3 | 26 | 100 | 26 | AI deployment | AI 基建 | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |

Dry-run commands:

```bash
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx
npm run mark:review -- --file=content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx
```

After explicit human approval only:

```bash
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx --confirm-human
```

## Batch 2: AI 工具和部署报错解决

- Why: 报错类文章通常搜索意图明确，适合作为稳定长尾入口。
- Decision rule: A human reviewer must approve facts, risk language, source freshness, and search-intent fit before any mark:review command is run.

Search queries to verify:

- OpenAI API 报错解决
- Vercel 部署失败
- npm install 报错
- AI 应用部署 404

Review focus:

- 保留错误现象、原因、修复步骤和验证命令
- 补足版本差异和官方链接
- 避免把偶然修复写成通用结论

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |

Dry-run commands:

```bash
```

After explicit human approval only:

```bash
```

## Batch 3: RAG、知识库和向量检索

- Why: 很多团队会搜索知识库 AI，但真正需要的是可审核、可引用、可质检的方案。
- Decision rule: A human reviewer must approve facts, risk language, source freshness, and search-intent fit before any mark:review command is run.

Search queries to verify:

- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库教程
- 客服知识库 AI

Review focus:

- 区分 RAG、微调和普通提示词
- 核对向量库、引用、召回和质检说法
- 说明失败案例和人工兜底

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 65 | 100 | 25 | RAG and knowledge base | AI 基建 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 2 | 64 | 100 | 24 | RAG and knowledge base | AI 基建 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 3 | 61 | 100 | 21 | RAG and knowledge base | AI 基建 | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |

Dry-run commands:

```bash
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx
npm run mark:review -- --file=content/blog/vector-database-beginner-guide.mdx
```

After explicit human approval only:

```bash
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/vector-database-beginner-guide.mdx --confirm-human
```
