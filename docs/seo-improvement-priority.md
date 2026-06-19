# SEO Improvement Priority

Generated at: 2026-06-19T02:08:05.785Z

## Guardrails

- No fake traffic claims: true
- Read-only analysis: true
- Note: This report consolidates existing audits and queues. It does not generate new content or claim indexing, impressions, clicks, or income.

## Summary

- growthStage: warming
- growthReadinessScore: 100
- confirmedGscSubmitted: 0
- gscRemaining: 500
- topQueueUrls: 500
- indexNowSubmitted: true
- indexNowUrls: 500
- blockingItems: 0
- contentMojibakeWarningItems: 0
- draftMojibakeWarningItems: 0
- publicMojibakeWarningItems: 0
- snippetWarningItems: 0
- schemaWarningItems: 0
- internalLinkCandidateItems: 16
- internalLinkRecommendedItems: 3
- orphanPages: 0
- weakPages: 0

## Priority Lanes

### 1. GSC manual indexing queue

- Impact: critical
- Status: ready
- Owner: manual-gsc
- Evidence: 500 URLs prepared, 0 confirmed submitted, 500 remaining.
- Action: Continue manual URL Inspection requests from the priority queue, then update the local confirmed count so progress stays auditable.

| File/URL | Title | Warnings |
| --- | --- | --- |
| https://ai-jiedan-lab.vercel.app/en |  |  |
| https://ai-jiedan-lab.vercel.app/cluster/ai-tools |  |  |
| https://ai-jiedan-lab.vercel.app/cluster/codex |  |  |
| https://ai-jiedan-lab.vercel.app/cluster/github |  |  |
| https://ai-jiedan-lab.vercel.app/cluster/node-js-errors |  |  |
| https://ai-jiedan-lab.vercel.app/cluster/upwork |  |  |
| https://ai-jiedan-lab.vercel.app/cluster/vercel |  |  |
| https://ai-jiedan-lab.vercel.app/q/ai-tools/agent-observability-logging-guide |  |  |
| https://ai-jiedan-lab.vercel.app/q/vercel/agent-production-deployment-checklist |  |  |
| https://ai-jiedan-lab.vercel.app/q/ai-tools/agent-tool-calling-beginner-guide |  |  |

### 2. Mojibake and encoding repair

- Impact: critical
- Status: watch
- Owner: content-fix
- Evidence: 0 public pages and 0 non-public drafts/review candidates have possible mojibake warnings.
- Action: Repair public encoding damage first; block draft/review candidates with mojibake from publishing until metadata and excerpts are readable.

| File/URL | Title | Warnings |
| --- | --- | --- |
| none | none | none |

### 3. Search snippet CTR repair

- Impact: high
- Status: watch
- Owner: content-fix
- Evidence: 0 pages have snippet warnings, mostly title/keyword alignment.
- Action: Prioritize title and description rewrites for pages in the GSC top queue and pages with future impressions.

| File/URL | Title | Warnings |
| --- | --- | --- |
| none | none | none |

### 4. Structured data normalization

- Impact: medium
- Status: watch
- Owner: automation
- Evidence: 0 pages have schema warnings; current count is non-blocking.
- Action: Normalize uncommon contentType values and keep JSON-LD consistent across q, cluster, and blog pages.

| File/URL | Title | Warnings |
| --- | --- | --- |
| none | none | none |

### 5. Internal-link opportunity queue

- Impact: high
- Status: ready
- Owner: automation
- Evidence: 16 candidate items and 3 recommended items have link suggestions.
- Action: Apply suggested public links to candidates before publishing and keep every new page above the internal-link floor.

| File/URL | Title | Warnings |
| --- | --- | --- |
| content/blog/tools-not-to-buy-first.mdx | AI 工具新手不应该先买哪些工具 |  |
| content/blog/vector-database-selection-for-rag-guide.mdx | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 |  |
| content/blog/vercel-ai-gateway-multi-provider-guide.mdx | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 |  |
| content/blog/subscription-payment-failed-message.mdx | 订阅支付失败怎么和客户沟通 |  |
| content/blog/supabase-pgvector-rag-guide.mdx | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 |  |
| content/blog/tensorrt-llm-beginner-guide.mdx | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 |  |
| content/blog/together-ai-api-beginner-guide.mdx | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 |  |
| content/blog/vercel-404-after-deploy-checklist.mdx | Vercel 部署后 404 检查清单：逐页验收更稳 |  |
| content/blog/vercel-404-after-deploy-freelance-scope.mdx | Vercel 404 部署成功但页面打不开怎么办：使用前怎么判断是否适合 |  |
| content/blog/vercel-404-after-deploy.mdx | Vercel 部署成功但页面 404：新手排查顺序 |  |

## Next Seven Actions

- Do not expand beyond the current top 500 queue until crawl/indexing movement is visible in GSC.
- Keep the top queue focused on q and cluster pages; use blog pages as depth targets, not the first manual request priority.
- Repair public mojibake warnings first, and keep draft mojibake out of the publishing queue until titles/descriptions are repaired.
- Rewrite snippet warnings for pages already in the GSC top 500 queue before touching lower-priority pages.
- Normalize structured-data contentType values so schema warnings stay non-blocking and consistent.
- Apply the internal-link opportunity suggestions to draft/recommended pages before publishing them.
- Record real manual GSC progress in content/automation/gsc-manual-progress.json after URL Inspection submissions.
