# Review Automation Queue

Generated at: 2026-06-17T06:37:56.678Z

This automation does not publish articles. It only ranks safe-looking draft candidates for human review.

## Guardrails

- Auto publish: false
- Next human action: Open each candidate, verify facts and risk language, then run mark:review with --confirm-human for approved files.
- Publish limit: After review, publish only 1-3 articles per batch.

## Counts

- Candidates: 148
- Returned: 25

## Rejected

- status:archived: 21
- status:published: 500

## Recommended Today

Review these first. Keep publishing to a small manual batch after fact/risk checks.

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 80 | 100 | 20 | Other | 工具选择 | AI 工具新手不应该先买哪些工具 | content/blog/tools-not-to-buy-first.mdx |
| 2 | 65 | 100 | 25 | RAG and knowledge base | AI 基建 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 3 | 34 | 100 | 34 | AI deployment | AI 部署 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |

Dry-run commands:

```bash
npm run mark:review -- --file=content/blog/tools-not-to-buy-first.mdx
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
```

After manual approval:

```bash
npm run mark:review -- --file=content/blog/tools-not-to-buy-first.mdx --confirm-human
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
```

## Recommended Review Order

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 80 | 100 | 20 | Other | 工具选择 | AI 工具新手不应该先买哪些工具 | content/blog/tools-not-to-buy-first.mdx |
| 2 | 80 | 100 | 20 | Other | 工具选择 | AI 工具新手不应该先买哪些工具：新手检查清单 | content/blog/tools-not-to-buy-first-checklist.mdx |
| 3 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork 账号准备新手先做什么 | content/blog/upwork-account-prep.mdx |
| 4 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork 账号准备新手先做什么：新手检查清单 | content/blog/upwork-account-prep-checklist.mdx |
| 5 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork 账号准备新手先做什么：常见错误和解决步骤 | content/blog/upwork-account-prep-mistakes.mdx |
| 6 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork AI 工具设置服务怎么界定范围 | content/blog/upwork-ai-tool-setup-scope.mdx |
| 7 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork AI 工具设置服务怎么界定范围：新手检查清单 | content/blog/upwork-ai-tool-setup-scope-checklist.mdx |
| 8 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork AI 工具设置服务怎么界定范围：常见错误和解决步骤 | content/blog/upwork-ai-tool-setup-scope-mistakes.mdx |
| 9 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork 新手怎么避免假作品集 | content/blog/upwork-avoid-fake-portfolio.mdx |
| 10 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork 新手怎么避免假作品集：新手检查清单 | content/blog/upwork-avoid-fake-portfolio-checklist.mdx |
| 11 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork 开工前要记录哪些内容 | content/blog/upwork-before-start-records.mdx |
| 12 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork 开工前要记录哪些内容：新手检查清单 | content/blog/upwork-before-start-records-checklist.mdx |
| 13 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork 开工前要记录哪些内容：常见错误和解决步骤 | content/blog/upwork-before-start-records-mistakes.mdx |
| 14 | 71 | 100 | 11 | Other | 自由职业平台 | Upwork 客户不确认需求怎么办：新手检查清单 | content/blog/upwork-client-no-confirmation-checklist.mdx |
| 15 | 65 | 100 | 25 | RAG and knowledge base | AI 基建 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 16 | 64 | 100 | 24 | RAG and knowledge base | AI 基建 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 17 | 61 | 100 | 21 | RAG and knowledge base | AI 基建 | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |
| 18 | 34 | 100 | 34 | AI deployment | AI 部署 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 19 | 29 | 100 | 29 | Other | AI 基建 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 20 | 27 | 100 | 27 | AI deployment | AI 基建 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 21 | 26 | 100 | 26 | AI deployment | AI 基建 | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |
| 22 | 22 | 100 | 22 | AI deployment | AI 基建 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| 23 | 20 | 100 | 20 | Other | 模板和清单 | 模板下载页 CTA 文案怎么写 | content/blog/template-download-cta-copy.mdx |
| 24 | 20 | 100 | 20 | Other | 模板和清单 | 模板下载页 CTA 文案怎么写：新手检查清单 | content/blog/template-download-cta-copy-checklist.mdx |
| 25 | 20 | 100 | 20 | Other | 模板和清单 | 模板下载站新手需要哪些工具 | content/blog/template-download-site-tools.mdx |

## Commands

Dry-run one candidate before marking review:

```bash
npm run mark:review -- --file=content/blog/example.mdx
```

After manual approval:

```bash
npm run mark:review -- --file=content/blog/example.mdx --confirm-human
npm run publish:articles -- --file=content/blog/example.mdx
npm run publish:articles -- --file=content/blog/example.mdx --confirm
```
