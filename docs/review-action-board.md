# Review Action Board

Generated at: 2026-06-19T02:12:50.113Z

This board is read-only. It turns review automation reports into a prioritized human task queue.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Every mark:review command requires explicit human approval. publish --confirm commands are intentionally not included.
- Note: Read-only review action board. It prioritizes human review tasks and does not edit articles, mark review, or publish.

## Summary

- publicGapReadyTasks: 0
- publicGapTasks: 0
- readyTasks: 2
- tasks: 3
- unsafeTasks: 1
- waveReadyTasks: 2
- waveTasks: 3

## Boundaries

- Public published: 500
- Publishable now: 0
- Traffic data available: false
- Can claim traffic: false
- Source files without reachable source: 0
- Missing URL targets: 0

## Unsafe Tasks

| Ready | Priority | Kind | Scope | Sources | Warnings | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| false | 987 | wave-approval | wave-3 | 7 | 0 | missing publish readiness pack item | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |

## Next Tasks

| Ready | Priority | Kind | Scope | Sources | Warnings | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1010 | wave-approval | wave-1 | 10 | 0 | none | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | 1002 | wave-approval | wave-2 | 12 | 0 | none | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |

## All Tasks

| Ready | Priority | Kind | Scope | Sources | Warnings | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1010 | wave-approval | wave-1 | 10 | 0 | none | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | 1002 | wave-approval | wave-2 | 12 | 0 | none | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| false | 987 | wave-approval | wave-3 | 7 | 0 | missing publish readiness pack item | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |

## Per-Task Actions

### RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Kind: wave-approval
- Scope: wave-1
- Ready: true
- Priority: 1010

Action items:

- Read the article end to end and confirm the opening answer matches search intent.
- Open 2 official source target(s) and verify fast-changing claims.
- Run through 8 risk review checks.
- Choose or reject public internal link suggestion: Qdrant 向量数据库怎么用：RAG 新手先看集合、向量和过滤 (/blog/qdrant-vector-database-beginner-guide).
- Confirm snippet and structured-data checks remain clean.

Warnings:

- none

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Kind: wave-approval
- Scope: wave-2
- Ready: true
- Priority: 1002

Action items:

- Read the article end to end and confirm the opening answer matches search intent.
- Open 5 official source target(s) and verify fast-changing claims.
- Run through 7 risk review checks.
- Choose or reject public internal link suggestion: 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 (/blog/multi-model-router-fallback-guide).
- Confirm snippet and structured-data checks remain clean.

Warnings:

- none

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

### Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Kind: wave-approval
- Scope: wave-3
- Ready: false
- Priority: 987

Action items:

- Read the article end to end and confirm the opening answer matches search intent.
- Open 7 official source target(s) and verify fast-changing claims.
- Run through 5 risk review checks.
- Choose or reject public internal link suggestion: Qdrant 向量数据库怎么用：RAG 新手先看集合、向量和过滤 (/blog/qdrant-vector-database-beginner-guide).
- Confirm snippet and structured-data checks remain clean.

Warnings:

- none

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx`
- Publish confirm: not-included
- Stop before: Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.

