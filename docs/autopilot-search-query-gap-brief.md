# Autopilot Search Query Gap Brief

Generated at: 2026-06-07T03:16:34.816Z

This report is read-only. It turns existing search-query evidence into a manual checklist for next-10 sprint items that currently have zero autopilot queue search queries.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Use recommended queries during manual review only. Do not change article status or publish without explicit approval.
- Note: Read-only gap brief for next-10 sprint items that lack search queries in the autopilot queue.

## Summary

- items: 1
- itemsWithCommandBoundary: 1
- itemsWithCoverageEvidence: 1
- itemsWithFactCheckQueries: 1
- itemsWithOfficialSources: 1
- itemsWithRecommendedQueries: 1
- readyItems: 1
- safeDraftItems: 1
- totalRecommendedQueries: 10
- unsafeItems: 0

## Source Evidence

- nextReviewSourcePackItems: 19
- searchQueryCoverageItems: 12
- sprintBoardItemsNeedingSearchQuery: 1
- sprintBoardUnsafeItems: 0
- waveApprovalPacketItems: 3

## Unsafe Items

- none

## Gap Items

| Order | Ready | Sources | Recommended queries | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 3 | true | 7 | 10 | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |

## Manual Query Review

### 3. 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Sprint lane: wave-review
- Coverage lane: Cross-industry AI prompt templates and reusable prompt libraries
- Primary keyword: 客服 AI 模型选型
- Query families used: howTo, template, comparison
- Source evidence: search-query-coverage, next-review-source-pack, wave-approval-packet
- Mark-review after human approval: npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
- Publish dry-run only: npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
- Publish confirm: not-included

Recommended search queries:

- 客服 AI 模型选型
- 客服 AI 模型选型怎么做
- 客服 AI 模型选型教程
- 客服 AI 模型选型新手教程
- 客服 AI 模型选型落地步骤
- 客服 AI 模型选型对比
- 客服 AI 模型选型怎么选
- 客服 AI 模型选型模板
- 客服 AI 模型选型清单
- 客服 AI 模型选型SOP

Fact-check queries:

- 客服 AI 模型选型 official docs latest
- 客服 AI 模型选型 official documentation current limits
- 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 fact check official docs
- AI 部署 official docs limits pricing changelog
- RAG 知识库搭建教程
- 企业知识库 AI 部署

Checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before changing article metadata.
- Use these queries as manual review evidence only; do not auto-edit article frontmatter from this report.
- Prefer queries that match the article's actual title, description, and reader job-to-be-done.
- Discard any query that would push the article toward unsupported traffic, ranking, revenue, or benchmark claims.
- After human approval, add chosen search queries in the article review workflow before mark:review.
- Do not run mark:review or publish commands from this gap brief.

