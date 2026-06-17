# Wave Publish Simulation

Generated at: 2026-06-17T06:38:28.020Z

This simulation is read-only. It lists the post-approval path but does not change article status, noindex, or publishing state.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Stop before human approval: true
- Note: Read-only simulation. It does not run mark:review, publish:articles, or change any article status/noindex value.

## Summary

- Wave: 1
- Items: 3
- Already published: 0
- Ready for human approval: 3
- Unsafe items: 0
- Currently publishable: 0
- Public published before wave: 500
- Projected publishable after human approval: 3
- Projected public published after wave: 503

## Publishing Boundary

- Current public published: 500
- Current publishable now: 0
- Projected public published after wave: 503
- Current status counts: {"published":500,"archived":21,"draft":148}

## Execution Plan

- beforeApproval: Read docs/wave-approval-packet.md and this simulation. Do not run confirm commands until a human approves each file.
- afterHumanApprovalStep1: Run the mark:review dry-run command for the approved file.
- afterHumanApprovalStep2: If dry-run output is clean, run the listed mark:review command with --confirm-human for that approved file only.
- afterReviewStep3: Run the publish dry-run command after the file is status=review.
- afterReviewStep4: Run publish:articles --confirm only after final human approval and a clean dry-run.

## Decision Table

| Already published | Ready | Status | Noindex | Human review flag | Score | Sources | Risk checks | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| false | true | draft | true | true | 100 | 8 | 6 | none | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| false | true | draft | true | true | 100 | 7 | 6 | none | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| false | true | draft | true | true | 100 | 7 | 5 | none | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |

## 1. RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Already published: false
- Ready for human approval: true
- Current status: draft
- Noindex: true
- Human review required: true
- Quality score: 100
- Official source targets: 8
- Risk review checks: 6

Blockers:

- none

Commands to run only after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm
```

## 2. Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Already published: false
- Ready for human approval: true
- Current status: draft
- Noindex: true
- Human review required: true
- Quality score: 100
- Official source targets: 7
- Risk review checks: 6

Blockers:

- none

Commands to run only after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm
```

## 3. Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Already published: false
- Ready for human approval: true
- Current status: draft
- Noindex: true
- Human review required: true
- Quality score: 100
- Official source targets: 7
- Risk review checks: 5

Blockers:

- none

Commands to run only after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx
npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx
npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm
```
