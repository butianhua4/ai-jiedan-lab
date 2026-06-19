# Human Approval Clearance Pack

Generated at: 2026-06-19T06:41:52.918Z

This report is read-only. It consolidates the source, SEO, copydesk, and link checks needed before a human reviewer approves any mark:review action.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Stop before source edits, metadata edits, mark:review, and publish. Every change requires human approval.
- Traffic claim: not-included
- Note: Read-only human approval clearance pack. It consolidates source, SEO, copydesk, and link issues before a human reviewer decides whether to run mark:review.

## Publishing Boundary

- Current public published: 500
- Current publishable now: 0
- Projected public after immediate human approval: 503
- Publish confirm commands included: 0

## Summary

- approvalItems: 3
- backlogItems: 0
- clearanceActions: 25
- copydeskBriefItems: 2
- failedSourceDecisionItems: 0
- immediateItems: 3
- itemsReadyForClearanceReview: 3
- massSearchThemeItems: 3
- popularPromptLaneItems: 3
- publishConfirmCommandsIncluded: 0
- seoWarningItems: 0
- sourceDecisionItems: 1
- trafficDataAvailable: false
- unsafeItems: 0

## Unsafe Items

- none

## Clearance Items

| Already published | Immediate | Ready | Priority | Source decisions | Failed source | SEO | Copydesk | Popular lanes | Mass themes | Title | File |
| --- | --- | --- | ---: | ---: | --- | --- | --- | ---: | ---: | --- | --- |
| false | true | true | 446 | 0 | false | false | true | 2 | 1 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| false | true | true | 439 | 0 | false | false | true | 2 | 1 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| false | true | true | 415 | 5 | false | false | false | 1 | 1 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |

## Item Actions

### RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Already published: false
- Immediate: true
- Ready for clearance review: true
- Source decisions: 0
- Failed source decision: false
- SEO warning: false
- Copydesk brief: true
- Popular prompt lanes: 2
- Mass search themes: 1

- Confirm the draft still answers one clear search intent.
- Verify source-backed claims before any status change.
- Keep status=draft, noindex=true, and humanReviewRequired=true until approval.
- Review public internal link suggestion: Qdrant 向量数据库怎么用：RAG 新手先看集合、向量和过滤 (/blog/qdrant-vector-database-beginner-guide).
- Review proposed meta description from copydesk brief before approval.
- Check that popular prompt lane framing stays broad enough for real search demand.
- Check that mass-search theme framing is covered without stuffing keywords.
- Run mark:review only after explicit human approval; publish confirm remains excluded.

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Already published: false
- Immediate: true
- Ready for clearance review: true
- Source decisions: 0
- Failed source decision: false
- SEO warning: false
- Copydesk brief: true
- Popular prompt lanes: 2
- Mass search themes: 1

- Confirm the draft still answers one clear search intent.
- Verify source-backed claims before any status change.
- Keep status=draft, noindex=true, and humanReviewRequired=true until approval.
- Review public internal link suggestion: 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 (/blog/multi-model-router-fallback-guide).
- Review proposed meta description from copydesk brief before approval.
- Check that popular prompt lane framing stays broad enough for real search demand.
- Check that mass-search theme framing is covered without stuffing keywords.
- Run mark:review only after explicit human approval; publish confirm remains excluded.

### Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Already published: false
- Immediate: true
- Ready for clearance review: true
- Source decisions: 5
- Failed source decision: false
- SEO warning: false
- Copydesk brief: false
- Popular prompt lanes: 1
- Mass search themes: 1

- Confirm the draft still answers one clear search intent.
- Verify source-backed claims before any status change.
- Keep status=draft, noindex=true, and humanReviewRequired=true until approval.
- Review redirect https://ai-sdk.dev/docs -> https://ai-sdk.dev/docs/introduction and approve or replace during human review.
- Review redirect https://docs.llamaindex.ai -> https://developers.llamaindex.ai/python/framework/ and approve or replace during human review.
- Review redirect https://platform.openai.com/docs -> https://developers.openai.com/api/docs and approve or replace during human review.
- Check that popular prompt lane framing stays broad enough for real search demand.
- Check that mass-search theme framing is covered without stuffing keywords.
- Run mark:review only after explicit human approval; publish confirm remains excluded.
