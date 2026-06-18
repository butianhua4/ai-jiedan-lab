# Human Approval Execution Queue

Generated at: 2026-06-18T02:00:37.879Z

This queue is read-only. It consolidates the next manual approval actions that can increase public article count, while stopping before article edits, mark-review execution, and publish confirmation.

## Guardrails

- Read-only human approval execution queue. It consolidates the next manual review actions but never edits articles, marks review, publishes, or includes publish --confirm commands.
- Stop before: Stop before mark:review until a human approves each file. Stop before publish --confirm; this queue includes publish dry-runs only.
- Traffic claim: not-included

## Publishing Boundary

- currentPublicPublished: 500
- currentPublishableNow: 0
- projectedPublicPublishedAfterImmediateHumanApproval: 503
- publishConfirmCommandsIncluded: 0

## Summary

- backlogItems: 0
- commandBoundaries: 3
- humanGatedItems: 3
- immediateApprovalItems: 3
- immediateApprovalReadyItems: 3
- items: 3
- itemsReadyForHumanApproval: 3
- itemsWithFailedSourceDecision: 0
- itemsWithMassSearchTheme: 3
- itemsWithPopularPromptLane: 3
- itemsWithSeoWarnings: 1
- itemsWithSourceReplacementDecisions: 3
- publishConfirmCommandsIncluded: 0
- trafficDataAvailable: false
- unsafeItems: 0

## Source Evidence

- firstCoverageGeneratedAt: "2026-06-18T02:00:37.378Z"
- firstCoverageSummary: {"blockingItems":0,"commandBoundaries":0,"firstCoverageItems":0,"freshnessReadyItems":0,"integrityReadyItems":0,"itemsWithPublicLinkPath":0,"launchPackItems":0,"preflightReadyItems":0,"queryReadyItems":0,"schemaReadyItems":0,"snippetReadyItems":0,"sourceReadyItems":0,"trafficDataAvailable":false,"uniqueFiles":0,"unsafeItems":0,"warningItems":0,"zeroPublicClusters":0}
- massAiSearchMatrixGeneratedAt: "2026-06-18T02:00:10.079Z"
- massAiSearchMatrixSummary: {"commandBoundaries":5,"deploymentBridgedThemes":4,"humanGatedItems":8,"items":8,"itemsReadyForHumanReviewPrep":6,"itemsWithCandidateFiles":6,"itemsWithHumanReviewActions":8,"itemsWithSearchSeeds":8,"itemsWithSourceTargets":8,"promptBlueprintSamples":0,"promptBridgedThemes":0,"sourceBroadThemes":10,"sourceTopThemes":8,"themesWithoutPublicCoverage":0,"trafficDataAvailable":false,"uniqueCandidateFiles":27,"unsafeItems":2,"waves":3}
- popularAiPromptPlaybookGeneratedAt: "2026-06-18T02:00:13.515Z"
- popularAiPromptPlaybookSummary: {"agentDeploymentLanes":3,"broadWorkPromptLanes":3,"commandBoundaries":10,"deploymentBridgeItems":5,"humanGatedItems":10,"items":10,"itemsReadyForHumanReviewPrep":3,"itemsWithCandidateFiles":5,"itemsWithOfficialSources":10,"memoryLanes":1,"officialSources":12,"promptModuleBridgeItems":0,"promptTemplates":50,"publishConfirmCommandsIncluded":0,"searchQueries":139,"sourceTargets":22,"trafficDataAvailable":false,"uniqueCandidateFiles":21,"unsafeItems":7}
- seoWarningGeneratedAt: "2026-06-18T01:59:58.632Z"
- seoWarningSummary: {"blockingItems":0,"draftItems":5,"humanGatedItems":260,"items":260,"itemsWithHumanChecklist":260,"itemsWithManualActions":260,"publicItems":255,"recommendedItems":1,"schemaWarningItems":92,"snippetWarningItems":204,"trafficDataAvailable":false,"unsafeItems":0,"warningItems":260,"waveItems":1}
- sourceReplacementGeneratedAt: "2026-06-18T02:00:18.550Z"
- sourceReplacementSummary: {"affectedFiles":16,"failedDecisionItems":0,"humanGatedItems":71,"items":71,"itemsWithDecisionOptions":71,"itemsWithManualChecklist":71,"itemsWithRecommendedCandidate":0,"officialRecommendedCandidates":0,"redirectedDecisionItems":71,"replacementCandidateOptions":0,"sourceRemediationItems":10,"sourceRemediationUnsafeItems":0,"unsafeItems":0}
- waveApprovalGeneratedAt: "2026-06-18T02:00:05.029Z"
- waveApprovalSummary: {"alreadyPublished":0,"completedOrReady":3,"items":3,"readyForHumanReview":3,"unsafeItems":0,"wave":1}
- wavePublishSimulationGeneratedAt: "2026-06-18T02:00:20.566Z"
- wavePublishSimulationSummary: {"currentlyPublishable":0,"alreadyPublished":0,"items":3,"projectedPublicPublishedAfterWave":503,"projectedPublishableAfterHumanApproval":3,"publicPublishedBeforeWave":500,"readyForHumanApproval":3,"unsafeItems":0,"wave":1}
- trafficNote: "No measured traffic, rankings, impressions, clicks, or revenue data is available or claimed."

## Unsafe Items

- none

## Queue

| Stage | Ready | Priority | SEO | Source decisions | Mass themes | Prompt lanes | Status | Title | File |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| draft-needs-human-approval | true | 446 | 0 | 7 | 1 | 2 | draft | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| draft-needs-human-approval | true | 439 | 1 | 7 | 1 | 2 | draft | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| draft-needs-human-approval | true | 415 | 0 | 5 | 1 | 1 | draft | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |

## Command Boundaries

| File | Mark review after human approval | Publish dry-run after review | Publish confirm |
| --- | --- | --- | --- |
| content/blog/vector-database-selection-for-rag-guide.mdx | `npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human` | `npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx` | not-included |
| content/blog/vercel-ai-gateway-multi-provider-guide.mdx | `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human` | `npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx` | not-included |
| content/blog/supabase-pgvector-rag-guide.mdx | `npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human` | `npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx` | not-included |

## Human Review Packets

### RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Stage: draft-needs-human-approval
- Public impact: Immediate Wave 1; projected public count after human approval is 503.
- Projected publishable after human approval: true
- Article state: status=draft, noindex=true, humanReviewRequired=true, qualityScore=100

Mass search themes:

- Wave 1: agent-memory-rag - RAG, knowledge base, and agent memory

Popular prompt lanes:

- excel-data-analysis-prompts: Excel 和数据分析 AI 提示词 (5 templates, 18 queries)
- llm-deployment-troubleshooting-prompts: 大模型部署、本地模型和 API 排错提示词 (5 templates, 18 queries)

Source replacement decisions:

- redirected-url: https://ai-sdk.dev/docs -> review manually
- redirected-url: https://docs.llamaindex.ai -> review manually
- redirected-url: https://platform.openai.com/docs -> review manually
- redirected-url: https://platform.openai.com/docs/guides/agents -> review manually
- redirected-url: https://platform.openai.com/docs/guides/prompt-engineering -> review manually
- redirected-url: https://platform.openai.com/docs/guides/retrieval -> review manually
- redirected-url: https://python.langchain.com/docs -> review manually

SEO warnings:

- none

Human checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.
- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Fact-check query before approval: RAG 向量数据库怎么选 official docs latest.
- Fact-check query before approval: RAG 向量数据库怎么选 official documentation current limits.
- Fact-check query before approval: RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 fact check official docs.
- Fact-check query before approval: AI 基建 official docs limits pricing changelog.
- Fact-check query before approval: RAG 知识库搭建教程.
- Fact-check query before approval: 企业知识库 AI 部署.
- Verify official source before approval: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval.
- Verify official source before approval: LangChain docs: https://python.langchain.com/docs.
- Verify official source before approval: LlamaIndex docs: https://docs.llamaindex.ai.
- Verify official source before approval: Hugging Face docs: https://huggingface.co/docs.
- Verify official source before approval: OpenAI API docs: https://platform.openai.com/docs.
- Verify official source before approval: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents.

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Stage: draft-needs-human-approval
- Public impact: Immediate Wave 1; projected public count after human approval is 503.
- Projected publishable after human approval: true
- Article state: status=draft, noindex=true, humanReviewRequired=true, qualityScore=100

Mass search themes:

- Wave 1: model-deployment - AI app and model API deployment

Popular prompt lanes:

- chatgpt-prompt-daquan: ChatGPT 提示词大全和万能公式 (5 templates, 18 queries)
- llm-deployment-troubleshooting-prompts: 大模型部署、本地模型和 API 排错提示词 (5 templates, 18 queries)

Source replacement decisions:

- redirected-url: https://ai-sdk.dev/docs -> review manually
- redirected-url: https://ai.google.dev/docs -> review manually
- redirected-url: https://docs.anthropic.com -> review manually
- redirected-url: https://platform.openai.com/docs -> review manually
- redirected-url: https://platform.openai.com/docs/guides/agents -> review manually
- redirected-url: https://platform.openai.com/docs/guides/prompt-engineering -> review manually
- redirected-url: https://platform.openai.com/docs/guides/retrieval -> review manually

SEO warnings:

- Snippet: primary keyword is not an exact title substring

Human checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.
- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- Fact-check query before approval: Vercel AI Gateway 多模型 official docs latest.
- Fact-check query before approval: Vercel AI Gateway 多模型 official documentation current limits.
- Fact-check query before approval: Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 fact check official docs.
- Fact-check query before approval: AI 部署 official docs limits pricing changelog.
- Fact-check query before approval: 大模型部署教程.
- Fact-check query before approval: AI 应用部署教程.
- Verify official source before approval: OpenAI API docs: https://platform.openai.com/docs.
- Verify official source before approval: Vercel AI SDK docs: https://ai-sdk.dev/docs.
- Verify official source before approval: Anthropic docs: https://docs.anthropic.com.
- Verify official source before approval: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents.
- Verify official source before approval: Google AI docs: https://ai.google.dev/docs.
- Verify official source before approval: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval.

### Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Stage: draft-needs-human-approval
- Public impact: Immediate Wave 1; projected public count after human approval is 503.
- Projected publishable after human approval: true
- Article state: status=draft, noindex=true, humanReviewRequired=true, qualityScore=100

Mass search themes:

- Wave 1: agent-memory-rag - RAG, knowledge base, and agent memory

Popular prompt lanes:

- excel-data-analysis-prompts: Excel 和数据分析 AI 提示词 (5 templates, 18 queries)

Source replacement decisions:

- redirected-url: https://ai-sdk.dev/docs -> review manually
- redirected-url: https://docs.llamaindex.ai -> review manually
- redirected-url: https://platform.openai.com/docs -> review manually
- redirected-url: https://platform.openai.com/docs/guides/retrieval -> review manually
- redirected-url: https://python.langchain.com/docs -> review manually

SEO warnings:

- none

Human checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.
- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Fact-check query before approval: Supabase pgvector official docs latest.
- Fact-check query before approval: Supabase pgvector official documentation current limits.
- Fact-check query before approval: Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 fact check official docs.
- Fact-check query before approval: AI 基建 official docs limits pricing changelog.
- Fact-check query before approval: RAG 知识库搭建教程.
- Fact-check query before approval: 企业知识库 AI 部署.
- Verify official source before approval: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval.
- Verify official source before approval: LangChain docs: https://python.langchain.com/docs.
- Verify official source before approval: LlamaIndex docs: https://docs.llamaindex.ai.
- Verify official source before approval: Hugging Face docs: https://huggingface.co/docs.
- Verify official source before approval: OpenAI API docs: https://platform.openai.com/docs.
- Verify official source before approval: Vercel AI SDK docs: https://ai-sdk.dev/docs.
