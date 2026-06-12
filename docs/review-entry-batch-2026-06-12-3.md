# Review Entry Batch 2026-06-12-3

This third batch expands review entry into broad prompt demand, AI office work, model routing, and RAG infrastructure. It does not publish articles and does not change article status automatically.

## Batch Focus

This batch targets queries that non-specialists and teams are likely to search:

- How to write useful AI prompts across industries.
- Customer service AI prompt templates.
- AI-assisted PowerPoint planning and drafting.
- Multi-model router fallback and cost control.
- RAG vector database selection.

## Articles

| Article | File | Status | Noindex | Check result | Review lane |
| --- | --- | --- | --- | --- | --- |
| AI 提示词怎么写才好用：全行业都能套的 5 段式框架 | `content/blog/ai-prompt-framework-business-guide.mdx` | draft | true | 100, no warnings | Broad AI prompts |
| 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | `content/blog/customer-service-ai-prompts-guide.mdx` | draft | true | 100, no warnings | Customer support AI |
| AI 做 PPT 怎么开始：新手从大纲到成稿的流程 | `content/blog/ai-ppt-beginner-guide.mdx` | draft | true | 100, no warnings | Office AI |
| 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 | `content/blog/multi-model-router-fallback-guide.mdx` | draft | true | 100, no warnings | Model routing |
| RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | `content/blog/vector-database-selection-for-rag-guide.mdx` | draft | true | 100, no warnings | RAG infrastructure |

## What Changed

- Replaced old author branding with `AI 工具指南`.
- Updated `updatedAt` to `2026-06-12`.
- Updated frontmatter `qualityScore` to match the current script result.
- Strengthened `sourceNotes` with official documentation targets.
- Replaced narrow "接单者" wording with broader team / AI implementation language where needed.
- Kept `status: "draft"` and `noindex: true`.

## Official Source Targets

- OpenAI Prompt Engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Microsoft Copilot in PowerPoint support: https://support.microsoft.com/office/create-a-new-presentation-with-copilot-in-powerpoint
- Canva Magic Design for presentations: https://www.canva.com/features/magic-design/
- Vercel AI Gateway: https://vercel.com/docs/ai-gateway
- Vercel AI SDK providers and provider options: https://ai-sdk.dev/docs/foundations/providers-and-models
- Supabase pgvector: https://supabase.com/docs/guides/database/extensions/pgvector
- Qdrant documentation: https://qdrant.tech/documentation/
- Milvus documentation: https://milvus.io/docs

## Decision

Review these after the current Agent / deployment batches. If only three can move forward next, prioritize:

1. `ai-prompt-framework-business-guide.mdx`
2. `ai-ppt-beginner-guide.mdx`
3. `multi-model-router-fallback-guide.mdx`

These three cover broad search demand, practical office workflow, and AI deployment reliability.

## Do Not Skip

- Do not publish drafts directly.
- Do not mark review without reading the full article.
- Recheck fast-changing platform UI, model availability, pricing, and provider behavior before publication.
- Keep measurable traffic or revenue claims out of the article until Search Console or Analytics data exists.
