# Review Cannibalization Brief

Generated at: 2026-06-19T06:41:37.342Z

This report is read-only. It checks current review candidates against published and nearby draft articles before human approval.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Use recommendations during human review only. Publishing still requires separate explicit approval.
- Note: Read-only cannibalization brief for current review candidates. It does not edit titles, slugs, keywords, status, noindex, or publishing state.

## Source Evidence

- Action board ready tasks: 2
- Unique action files: 2
- Content cannibalization generated at: 2026-06-19T06:41:36.689Z
- Global cannibalization summary: {"articleCount":669,"conflicts":199,"keywordConflicts":11,"reviewBatchConflicts":0,"slugStemConflicts":177,"titleStemConflicts":11}

## Summary

- candidateFiles: 2
- highRiskItems: 0
- highRiskPublishedItems: 0
- highRiskReviewOnlyItems: 0
- items: 2
- itemsWithPublishedComparison: 1
- itemsWithReviewComparison: 0
- mediumRiskItems: 0
- unsafeCommands: 0

## High Risk Items

- none

## Next Items

- none

## All Items

| Risk | Decision | Published score | Review score | Recommendation | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| low | monitor-only | 30 | 0 | No strong cannibalization risk detected for current public coverage; keep the candidate as a distinct article. | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| low | monitor-only | 0 | 0 | No strong cannibalization risk detected for current public coverage; keep the candidate as a distinct article. | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |

## Per-Candidate Checklist

### RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Primary keyword: RAG 向量数据库怎么选
- Risk: low
- Decision: monitor-only
- Recommendation: No strong cannibalization risk detected for current public coverage; keep the candidate as a distinct article.

Closest published articles:

- 30: Qdrant 向量数据库怎么用：RAG 新手先看集合、向量和过滤 (content/blog/qdrant-vector-database-beginner-guide.mdx) - same category, same search intent, token overlap 0.55
- 29: Embedding 模型怎么选：RAG 和向量检索别只看模型名 (content/blog/embedding-model-selection-guide.mdx) - same category, same search intent, token overlap 0.50

Closest draft/review articles:

- none

Human review checklist:

- Confirm the candidate owns a distinct search intent: RAG 向量数据库怎么选.
- Compare against published article: Qdrant 向量数据库怎么用：RAG 新手先看集合、向量和过滤 (content/blog/qdrant-vector-database-beginner-guide.mdx).
- No close draft/review candidate found.
- Document why this can remain a separate article.
- If both articles stay, add a clear internal-link relationship: pillar, comparison, implementation detail, or troubleshooting follow-up.

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Primary keyword: Vercel AI Gateway 多模型
- Risk: low
- Decision: monitor-only
- Recommendation: No strong cannibalization risk detected for current public coverage; keep the candidate as a distinct article.

Closest published articles:

- none

Closest draft/review articles:

- none

Human review checklist:

- Confirm the candidate owns a distinct search intent: Vercel AI Gateway 多模型.
- No close published article found; still confirm the title is not a duplicate promise.
- No close draft/review candidate found.
- Document why this can remain a separate article.
- If both articles stay, add a clear internal-link relationship: pillar, comparison, implementation detail, or troubleshooting follow-up.

