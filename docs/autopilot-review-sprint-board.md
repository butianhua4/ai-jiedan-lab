# Autopilot Review Sprint Board

Generated at: 2026-06-20T05:55:27.474Z

This report is read-only. It plans the next 10 manual review assignments and keeps all status changes human-gated.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Use this board for planning only. mark:review requires explicit human approval per file; publish --confirm is not included.
- Note: Read-only sprint board for the next autopilot review assignments. It groups top-3 playbook-ready items and follow-up queue items without changing status.

## Boundaries

- Public published: 500
- Publishable now: 0
- Traffic data available: false
- Can claim traffic: false

## Summary

- items: 8
- itemsNeedingSearchQuery: 2
- itemsWithCommandBoundary: 8
- queuedForPlaybook: 7
- readyForSprint: 8
- readyWithPlaybook: 1
- safeDraftItems: 8
- unsafeItems: 0
- withSearchQueries: 6
- withSourceTargets: 8

## Source Evidence

- autopilotQueueUnsafeItems: 0
- humanReviewPlaybookUnsafeItems: 2
- queueNextAssignments: 8

## Unsafe Items

- none

## Ready With Playbook

| Order | Ready | Stage | Lane | Score | Sources | Queries | Mark-review gated | Publish confirm | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | true | ready-with-playbook | ai-deployment | 1543 | 7 | 4 | true | not-included | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |

## Queued For Playbook

| Order | Ready | Stage | Lane | Score | Sources | Queries | Mark-review gated | Publish confirm | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | true | queued-for-playbook | wave-review | 1443 | 8 | 0 | true | not-included | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 3 | true | queued-for-playbook | wave-review | 1412 | 7 | 0 | true | not-included | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 4 | true | queued-for-playbook | ai-deployment | 447 | 4 | 4 | true | not-included | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 5 | true | queued-for-playbook | ai-deployment | 417 | 2 | 4 | true | not-included | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| 6 | true | queued-for-playbook | ai-deployment | 403 | 2 | 4 | true | not-included | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |
| 7 | true | queued-for-playbook | ai-deployment | 389 | 2 | 4 | true | not-included | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 8 | true | queued-for-playbook | ai-deployment | 387 | 3 | 4 | true | not-included | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |

## Sprint Checklist

### 1. Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Stage: ready-with-playbook
- Lane: ai-deployment
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Publish confirm: not-included

Checklist:

- Use merged playbook actions: 11 search, 44 source, 6 link.
- Review source lanes together: deployment, wave.
- Verify 7 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.
- Verify 7 official source target(s).
- Check 4 search query seed(s).
- Review 19 combined checklist signal(s).
- Apply copydesk remediation: Add one FAQ or checklist line that uses a high-intent query variant such as: Vercel AI Gateway 多模型..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.

### 2. RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Stage: queued-for-playbook
- Lane: wave-review
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
- Publish confirm: not-included

Checklist:

- Generate or review a merged playbook before mark:review.
- Review source lanes together: wave.
- Verify 8 official source target(s) before any approval.
- Confirm search intent from the source review packet.
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.
- Verify 8 official source target(s).
- Confirm search intent from the source packet.
- Review 6 combined checklist signal(s).
- Apply copydesk remediation: Add one FAQ or checklist line that uses a high-intent query variant such as: RAG 向量数据库怎么选..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.

### 3. Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Stage: queued-for-playbook
- Lane: wave-review
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx
- Publish confirm: not-included

Checklist:

- Generate or review a merged playbook before mark:review.
- Review source lanes together: wave.
- Verify 7 official source target(s) before any approval.
- Confirm search intent from the source review packet.
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.
- Verify 7 official source target(s).
- Confirm search intent from the source packet.
- Review 5 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Do not run publish:articles --confirm from this sprint board.

### 4. Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Stage: queued-for-playbook
- Lane: ai-deployment
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/together-ai-api-beginner-guide.mdx
- Publish confirm: not-included

Checklist:

- Generate or review a merged playbook before mark:review.
- Review source lanes together: deployment.
- Verify 4 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.
- Verify 4 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Do not run publish:articles --confirm from this sprint board.

### 5. Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Stage: queued-for-playbook
- Lane: ai-deployment
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/vercel-404-after-deploy.mdx
- Publish confirm: not-included

Checklist:

- Generate or review a merged playbook before mark:review.
- Review source lanes together: deployment.
- Verify 2 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.
- Verify 2 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Do not run publish:articles --confirm from this sprint board.

### 6. Windows 路径和权限导致安装失败怎么办

- File: content/blog/windows-path-permission-install-fix.mdx
- Stage: queued-for-playbook
- Lane: ai-deployment
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/windows-path-permission-install-fix.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/windows-path-permission-install-fix.mdx
- Publish confirm: not-included

Checklist:

- Generate or review a merged playbook before mark:review.
- Review source lanes together: deployment.
- Verify 2 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.
- Verify 2 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Do not run publish:articles --confirm from this sprint board.

### 7. TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收

- File: content/blog/tensorrt-llm-beginner-guide.mdx
- Stage: queued-for-playbook
- Lane: ai-deployment
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/tensorrt-llm-beginner-guide.mdx
- Publish confirm: not-included

Checklist:

- Generate or review a merged playbook before mark:review.
- Review source lanes together: deployment.
- Verify 2 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.
- Verify 2 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Do not run publish:articles --confirm from this sprint board.

### 8. Vercel build failed 排查清单：从日志到重新部署

- File: content/blog/vercel-build-failed-causes-checklist.mdx
- Stage: queued-for-playbook
- Lane: ai-deployment
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/vercel-build-failed-causes-checklist.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/vercel-build-failed-causes-checklist.mdx
- Publish confirm: not-included

Checklist:

- Generate or review a merged playbook before mark:review.
- Review source lanes together: deployment.
- Verify 3 official source target(s) before any approval.
- Check search intent against 4 query seed(s).
- Resolve or explicitly accept snippet, structured-data, freshness, and cannibalization warnings before mark:review.
- Confirm no traffic, ranking, revenue, benchmark, or stability claim is unsupported.
- Run mark:review only after explicit human approval; publishing requires a separate explicit approval.
- Verify 3 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Do not run publish:articles --confirm from this sprint board.

