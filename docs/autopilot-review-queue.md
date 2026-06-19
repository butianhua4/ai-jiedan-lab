# Autopilot Review Queue

Generated at: 2026-06-19T02:12:56.996Z

This report is read-only. It ranks the next manual review assignments and stops before article status changes.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Stop at human assignment. mark:review still requires --confirm-human and publishing still requires a separate explicit approval.

## Boundaries

- Public published: 500
- Publishable now: 0
- Traffic data available: false
- Can claim traffic: false

## Summary

- blockedItems: 0
- items: 8
- nextAssignments: 8
- readyItems: 8
- safeDraftItems: 8
- unsafeItems: 0
- withSearchQueries: 6
- withSourceTargets: 8

## Unsafe Items

- none

## Blocked Items

- none

## Next Assignments

| Ready | Score | Lane | Sources | Refs | Queries | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1543 | ai-deployment | deployment, wave | 7 | 4 | 0 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| true | 1443 | wave-review | wave | 8 | 0 | 0 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | 1412 | wave-review | wave | 7 | 0 | 0 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| true | 447 | ai-deployment | deployment | 4 | 4 | 0 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| true | 417 | ai-deployment | deployment | 2 | 4 | 0 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| true | 403 | ai-deployment | deployment | 2 | 4 | 0 | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |
| true | 389 | ai-deployment | deployment | 2 | 4 | 0 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| true | 387 | ai-deployment | deployment | 3 | 4 | 0 | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |

## Review Focus

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 7 official source target(s).
- Check 4 search query seed(s).
- Review 19 combined checklist signal(s).
- Apply copydesk remediation: Add one FAQ or checklist line that uses a high-intent query variant such as: Vercel AI Gateway 多模型..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Lane: wave-review
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 8 official source target(s).
- Confirm search intent from the source packet.
- Review 6 combined checklist signal(s).
- Apply copydesk remediation: Add one FAQ or checklist line that uses a high-intent query variant such as: RAG 向量数据库怎么选..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Lane: wave-review
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 7 official source target(s).
- Confirm search intent from the source packet.
- Review 5 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/together-ai-api-beginner-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 4 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vercel-404-after-deploy.mdx`
- Publish confirm: not-included

Focus:

- Verify 2 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### Windows 路径和权限导致安装失败怎么办

- File: content/blog/windows-path-permission-install-fix.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/windows-path-permission-install-fix.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/windows-path-permission-install-fix.mdx`
- Publish confirm: not-included

Focus:

- Verify 2 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收

- File: content/blog/tensorrt-llm-beginner-guide.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/tensorrt-llm-beginner-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 2 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### Vercel build failed 排查清单：从日志到重新部署

- File: content/blog/vercel-build-failed-causes-checklist.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/vercel-build-failed-causes-checklist.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vercel-build-failed-causes-checklist.mdx`
- Publish confirm: not-included

Focus:

- Verify 3 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.


## All Queue Items

| Ready | Score | Lane | Sources | Refs | Queries | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1543 | ai-deployment | deployment, wave | 7 | 4 | 0 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| true | 1443 | wave-review | wave | 8 | 0 | 0 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | 1412 | wave-review | wave | 7 | 0 | 0 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| true | 447 | ai-deployment | deployment | 4 | 4 | 0 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| true | 417 | ai-deployment | deployment | 2 | 4 | 0 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| true | 403 | ai-deployment | deployment | 2 | 4 | 0 | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |
| true | 389 | ai-deployment | deployment | 2 | 4 | 0 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| true | 387 | ai-deployment | deployment | 3 | 4 | 0 | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |
