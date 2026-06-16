# Review Candidate Preflight

Generated at: 2026-06-16T18:17:59.020Z

Overall: PASS

## Guardrails

- Auto mark review: false
- Note: This preflight only checks whether recommended drafts are ready for human review. It does not change article status.

## Summary

- Checked: 3
- Passed: 3
- Failed: 0
- Warning items: 0
- Mojibake warning items: 0

## Items

| Status | Score | Chinese chars | Title | File | Issues | Warnings |
| --- | --- | --- | --- | --- | --- | --- |
| PASS | 100 | 1201 | AI 工具新手不应该先买哪些工具 | content/blog/tools-not-to-buy-first.mdx |  |  |
| PASS | 100 | 1209 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |  |  |
| PASS | 100 | 1246 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |  |  |

## Dry-run Commands

```bash
npm run mark:review -- --file=content/blog/tools-not-to-buy-first.mdx
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
```
