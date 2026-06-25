# Publish Readiness Pack

Generated at: 2026-06-25T10:25:22.170Z

This pack organizes manual review work. It does not publish articles or change article status.

## Guardrails

- Auto publish: false
- Required human action: Read the article, verify factual claims and risk language, then mark review manually.
- Publish rule: Only publish status=review articles, 1-3 per batch, after a second dry-run.

## Summary

- Requested: 3
- Included: 3

## 1. AI 工具新手不应该先买哪些工具

- File: content/blog/tools-not-to-buy-first.mdx
- Cluster: Other
- Category: 工具选择
- Primary keyword: AI 工具新手不应该先买哪些工具
- Search intent: informational
- Quality score: 100
- Opportunity score: 80
- Opportunity reason: Other cluster; 306 public article(s) in cluster; no public article in category
- Matched content opportunity: none
- Opportunity why: 
- Chinese chars: 1201
- Internal links: 5
- Description: AI 工具新手不应该一开始购买复杂自动化、昂贵订阅、批量投放、会员系统和高级设计工具。先跑通作品集、沟通、报价、交付和复盘，再决定买什么。
- Source notes: 待人工补充真实预算表、工具试用记录和不同场景的替代方案。

Human decision checklist:

- Article remains draft before approval: true
- Article remains noindex before approval: true
- Human review is required: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has at least one internal link: true
- Opening section directly answers the search query.
- Reviewer can explain why this article should be public now instead of staying draft.

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform rules, payments, messaging, or review systems.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing tool limits, pricing, model names, and deployment steps are verified against official docs.
- Platform policy wording is cautionary and does not encourage off-platform transactions.

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.
- Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.

Official source targets:

- OpenAI docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Anthropic docs: https://docs.anthropic.com

Fact-check queries:

- AI 工具新手不应该先买哪些工具 官方文档 最新
- AI 工具新手不应该先买哪些工具 official docs latest
- AI 工具新手不应该先买哪些工具 事实核对
- 工具选择 平台限制 官方文档

Commands:

```bash
npm run mark:review -- --file=content/blog/tools-not-to-buy-first.mdx --confirm-human
npm run publish:articles -- --file=content/blog/tools-not-to-buy-first.mdx
npm run publish:articles -- --file=content/blog/tools-not-to-buy-first.mdx --confirm
npm run live:check -- --url=https://ai.aporet.com
```

## 2. RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Cluster: RAG and knowledge base
- Category: AI 基建
- Primary keyword: RAG 向量数据库怎么选
- Search intent: informational
- Quality score: 100
- Opportunity score: 65
- Opportunity reason: RAG and knowledge base cluster; 23 public article(s) in cluster; 71 public article(s) in category
- Matched content opportunity: RAG、知识库和向量检索
- Opportunity why: 很多团队会搜索知识库 AI，但真正需要的是可审核、可引用、可质检的方案。
- Chinese chars: 1209
- Internal links: 3
- Description: 面向新手整理 RAG 向量数据库选型思路，比较 pgvector、Qdrant、Milvus 等路线时应关注数据规模、权限、运维、成本和迁移。
- Source notes: 已于 2026-06-12 按 Supabase pgvector 官方文档、Qdrant 和 Milvus 向量数据库官方文档核对基础能力；结合 RAG 项目边界、metadata filter、运维复杂度和迁移成本整理。正式公开前仍需人工核对最新能力、托管价格、区域和版本差异。

Human decision checklist:

- Article remains draft before approval: true
- Article remains noindex before approval: true
- Human review is required: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has at least one internal link: true
- Opening section directly answers the search query.
- Reviewer can explain why this article should be public now instead of staying draft.

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform rules, payments, messaging, or review systems.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing tool limits, pricing, model names, and deployment steps are verified against official docs.
- Automation claims include human approval, permissions, logging, and rollback boundaries.
- Knowledge base claims distinguish retrieval quality, citations, and hallucination risk.
- Prompt examples include inputs, output criteria, and review steps instead of vague universal prompts.
- Deployment guidance includes environment variables, rate limits, smoke checks, and failure handling.

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.
- Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.
- 区分 RAG、微调和普通提示词
- 核对向量库、引用、召回和质检说法
- 说明失败案例和人工兜底

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- RAG 向量数据库怎么选 官方文档 最新
- RAG 向量数据库怎么选 official docs latest
- RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 事实核对
- AI 基建 平台限制 官方文档
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库教程
- 客服知识库 AI

Commands:

```bash
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm
npm run live:check -- --url=https://ai.aporet.com
```

## 3. Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Cluster: AI deployment
- Category: AI 部署
- Primary keyword: Vercel AI Gateway 多模型
- Search intent: informational
- Quality score: 100
- Opportunity score: 34
- Opportunity reason: AI deployment cluster; 114 public article(s) in cluster; 16 public article(s) in category
- Matched content opportunity: 大模型和 AI 应用部署教程
- Opportunity why: 部署、API、限流、环境变量是新人最容易搜索也最容易踩坑的入口。
- Chinese chars: 1246
- Internal links: 3
- Description: 整理 Vercel AI Gateway 多模型接入思路，覆盖统一 API、provider 切换、日志、成本、降级、AI SDK 和上线检查。
- Source notes: 参考 Vercel AI Gateway 官方文档、models and providers、provider options 和 capability 文档整理；正式发布前需要人工核对最新模型列表。

Human decision checklist:

- Article remains draft before approval: true
- Article remains noindex before approval: true
- Human review is required: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has at least one internal link: true
- Opening section directly answers the search query.
- Reviewer can explain why this article should be public now instead of staying draft.

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform rules, payments, messaging, or review systems.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing tool limits, pricing, model names, and deployment steps are verified against official docs.
- Automation claims include human approval, permissions, logging, and rollback boundaries.
- Prompt examples include inputs, output criteria, and review steps instead of vague universal prompts.
- Deployment guidance includes environment variables, rate limits, smoke checks, and failure handling.

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.
- Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.
- 核对官方部署文档
- 检查 API Key、限流、环境变量和费用说法
- 补足上线后的 smoke check 和回滚步骤

Official source targets:

- OpenAI docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Anthropic docs: https://docs.anthropic.com
- Google AI docs: https://ai.google.dev/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- Vercel AI Gateway 多模型 官方文档 最新
- Vercel AI Gateway 多模型 official docs latest
- Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 事实核对
- AI 部署 平台限制 官方文档
- 大模型部署教程
- AI 应用部署 Vercel 教程
- OpenAI API 部署教程
- Claude API 部署教程

Commands:

```bash
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm
npm run live:check -- --url=https://ai.aporet.com
```
