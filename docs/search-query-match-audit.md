# Search Query Match Audit

Generated at: 2026-06-22T18:05:14.894Z

This report is read-only. It checks whether planned query variants are visible in article metadata, headings, and body copy before human review.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Use review suggestions during human review. Do not change status or publish without explicit human approval.
- Note: Read-only search-query match audit. It checks whether planned query variants are reflected in title, description, headings, and body. It does not edit articles.

## Summary

- averageExactMatches: 0.67
- averageMatchedFamilies: 6.83
- blockingItems: 0
- items: 12
- queryCoverageItems: 12
- queryCoverageUniqueQueries: 352
- readyItems: 12
- warningItems: 10

## Source Evidence

- Note: Blocking issues cover basic search alignment only. Warnings are review-time expansion suggestions and do not make a safe draft publishable.
- Query coverage guardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only search-query coverage planner. Query variants are editorial review prompts, not measured search volume, ranking, click, or traffic claims.","stopBefore":"Use the query list to guide human review and content expansion. Do not publish or mark review without explicit human approval."}

## Blocking Items

- none

## Warning Items

| Ready | Wave | Title hit | Description hit | Exact queries | Families | Blocking | Warnings | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | 1 | true | true | 0/30 | 7 | none | few exact query variant matches in article text | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| true | 1 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| true | 2 | true | true | 0/30 | 7 | none | few exact query variant matches in article text | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| true | 2 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |
| true | 3 | true | true | 1/30 | 7 | none | few exact query variant matches in article text | Vercel 部署后 404 检查清单：逐页验收更稳 | content/blog/vercel-404-after-deploy-checklist.mdx |
| true | 3 | true | true | 0/30 | 6 | none | few exact query variant matches in article text<br>missing query-family signals: intentSeeds | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |
| true | 3 | true | true | 0/35 | 6 | none | few exact query variant matches in article text<br>missing query-family signals: intentSeeds | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| true | 4 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |
| true | 4 | true | true | 0/30 | 7 | none | few exact query variant matches in article text | Vercel build failed 排查能不能项目：先看这 7 个边界 | content/blog/vercel-build-failed-causes-freelance-scope.mdx |

## All Items

| Ready | Wave | Title hit | Description hit | Exact queries | Families | Blocking | Warnings | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | 1 | true | true | 0/30 | 7 | none | few exact query variant matches in article text | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| true | 1 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| true | 2 | true | true | 0/30 | 7 | none | few exact query variant matches in article text | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| true | 2 | true | true | 4/35 | 7 | none | none | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| true | 2 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |
| true | 3 | true | true | 1/30 | 7 | none | few exact query variant matches in article text | Vercel 部署后 404 检查清单：逐页验收更稳 | content/blog/vercel-404-after-deploy-checklist.mdx |
| true | 3 | true | true | 0/30 | 6 | none | few exact query variant matches in article text<br>missing query-family signals: intentSeeds | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |
| true | 3 | true | true | 0/35 | 6 | none | few exact query variant matches in article text<br>missing query-family signals: intentSeeds | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| true | 4 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |
| true | 4 | true | true | 0/30 | 7 | none | few exact query variant matches in article text | Vercel build failed 排查能不能项目：先看这 7 个边界 | content/blog/vercel-build-failed-causes-freelance-scope.mdx |
| true | 4 | true | true | 2/30 | 7 | none | none | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

### RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Wave: 1
- Primary keyword: RAG 向量数据库怎么选
- Warning issues: few exact query variant matches in article text

Review suggestions:


### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Wave: 1
- Primary keyword: Vercel AI Gateway 多模型
- Warning issues: few exact query variant matches in article text

Review suggestions:


### Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Wave: 1
- Primary keyword: Supabase pgvector
- Warning issues: few exact query variant matches in article text

Review suggestions:


### TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收

- File: content/blog/tensorrt-llm-beginner-guide.mdx
- Wave: 2
- Primary keyword: TensorRT-LLM 入门
- Warning issues: few exact query variant matches in article text

Review suggestions:


### Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查

- File: content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx
- Wave: 2
- Primary keyword: Vercel AI SDK 聊天机器人部署
- Warning issues: few exact query variant matches in article text

Review suggestions:


### Vercel 部署后 404 检查清单：逐页验收更稳

- File: content/blog/vercel-404-after-deploy-checklist.mdx
- Wave: 3
- Primary keyword: Vercel 部署后 404 检查清单
- Warning issues: few exact query variant matches in article text

Review suggestions:


### Vercel build failed 排查清单：从日志到重新部署

- File: content/blog/vercel-build-failed-causes-checklist.mdx
- Wave: 3
- Primary keyword: Vercel build failed 排查清单
- Warning issues: few exact query variant matches in article text; missing query-family signals: intentSeeds

Review suggestions:

- 人工审核时检查是否自然覆盖核心搜索种子词，不要硬塞关键词。

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Wave: 3
- Primary keyword: Together AI API 接入
- Warning issues: few exact query variant matches in article text; missing query-family signals: intentSeeds

Review suggestions:

- 人工审核时检查是否自然覆盖核心搜索种子词，不要硬塞关键词。

### 向量数据库怎么选：新手先理解 embedding 和检索

- File: content/blog/vector-database-beginner-guide.mdx
- Wave: 4
- Primary keyword: 向量数据库
- Warning issues: few exact query variant matches in article text

Review suggestions:


### Vercel build failed 排查能不能项目：先看这 7 个边界

- File: content/blog/vercel-build-failed-causes-freelance-scope.mdx
- Wave: 4
- Primary keyword: Vercel build failed 项目
- Warning issues: few exact query variant matches in article text

Review suggestions:

