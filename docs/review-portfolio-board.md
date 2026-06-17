# Review Portfolio Board

Generated at: 2026-06-17T06:38:27.064Z

This report is read-only. It deduplicates review candidates across Wave, public-gap, deployment, and industry-prompt packs.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Every mark:review command requires explicit human approval. publish --confirm commands are intentionally not included.

## Boundaries

- Public published: 500
- Publishable now: 0
- Traffic data available: false
- Can claim traffic: false

## Source Counts

- deployment: 6
- prompt: 0
- publicGap: 0
- wave: 3

## Summary

- duplicateMentions: 1
- items: 8
- itemsWithCommandBoundary: 8
- itemsWithMultipleSources: 1
- itemsWithSearchQueries: 6
- itemsWithSourceTargets: 8
- readyItems: 8
- safeDraftItems: 8
- sourceCandidates: 9
- unsafeItems: 0

## Unsafe Items

- none

## Multi-Source Items

| Ready | Safe | Score | Sources | Official refs | Queries | Checklists | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 1250 | deployment, wave | 7 | 4 | 19 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |

## Next Items

| Ready | Safe | Score | Sources | Official refs | Queries | Checklists | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 1250 | deployment, wave | 7 | 4 | 19 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| true | true | 1225 | wave | 7 | 0 | 5 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| true | true | 1225 | wave | 8 | 0 | 6 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | true | 265 | deployment | 4 | 4 | 13 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| true | true | 265 | deployment | 2 | 4 | 13 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| true | true | 251 | deployment | 2 | 4 | 13 | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |
| true | true | 237 | deployment | 2 | 4 | 13 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| true | true | 220 | deployment | 3 | 4 | 13 | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |

## All Items

| Ready | Safe | Score | Sources | Official refs | Queries | Checklists | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 1250 | deployment, wave | 7 | 4 | 19 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| true | true | 1225 | wave | 7 | 0 | 5 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| true | true | 1225 | wave | 8 | 0 | 6 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | true | 265 | deployment | 4 | 4 | 13 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| true | true | 265 | deployment | 2 | 4 | 13 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| true | true | 251 | deployment | 2 | 4 | 13 | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |
| true | true | 237 | deployment | 2 | 4 | 13 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| true | true | 220 | deployment | 3 | 4 | 13 | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |

## Per-Item Action Plans

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Source types: deployment, wave
- Ready for human review: true
- Status: draft

Human action plan:

- Review source lanes together: deployment, wave.
- Verify 7 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx`
- Publish confirm: not-included

### Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Source types: wave
- Ready for human review: true
- Status: draft

Human action plan:

- Review source lanes together: wave.
- Verify 7 official source target(s) before any approval.
- Confirm search intent from the source review packet.
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx`
- Publish confirm: not-included

### RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Source types: wave
- Ready for human review: true
- Status: draft

Human action plan:

- Review source lanes together: wave.
- Verify 8 official source target(s) before any approval.
- Confirm search intent from the source review packet.
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx`
- Publish confirm: not-included

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Source types: deployment
- Ready for human review: true
- Status: draft

Human action plan:

- Review source lanes together: deployment.
- Verify 4 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/together-ai-api-beginner-guide.mdx`
- Publish confirm: not-included

### Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Source types: deployment
- Ready for human review: true
- Status: draft

Human action plan:

- Review source lanes together: deployment.
- Verify 2 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vercel-404-after-deploy.mdx`
- Publish confirm: not-included

### Windows 路径和权限导致安装失败怎么办

- File: content/blog/windows-path-permission-install-fix.mdx
- Source types: deployment
- Ready for human review: true
- Status: draft

Human action plan:

- Review source lanes together: deployment.
- Verify 2 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/windows-path-permission-install-fix.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/windows-path-permission-install-fix.mdx`
- Publish confirm: not-included

### TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收

- File: content/blog/tensorrt-llm-beginner-guide.mdx
- Source types: deployment
- Ready for human review: true
- Status: draft

Human action plan:

- Review source lanes together: deployment.
- Verify 2 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/tensorrt-llm-beginner-guide.mdx`
- Publish confirm: not-included

### Vercel build failed 排查清单：从日志到重新部署

- File: content/blog/vercel-build-failed-causes-checklist.mdx
- Source types: deployment
- Ready for human review: true
- Status: draft

Human action plan:

- Review source lanes together: deployment.
- Verify 3 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/vercel-build-failed-causes-checklist.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vercel-build-failed-causes-checklist.mdx`
- Publish confirm: not-included

