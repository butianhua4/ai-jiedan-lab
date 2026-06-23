# Autopilot Executive Brief

Generated at: 2026-06-23T10:48:14.807Z

This report is read-only. It compresses the current automation reports into the next human-gated execution priorities.

## Guardrails

- autoEditArticles: false
- autoMarkReview: false
- autoPublish: false
- note: Read-only executive autopilot brief. It compresses the current automation reports into the next human-gated execution priorities.
- stopBefore: Stop before article edits, mark:review, publish dry-run, or publish confirm until a human approves exact files and changes.
- trafficClaim: not-included

## Summary

- approvalBacklogItems: 0
- automationRunsPerDay: 4
- boardActionItems: 5
- broadClustersWithoutPublicCoverage: 0
- currentPublishableNow: 0
- forbiddenWorkflowCommands: 0
- immediateApprovalItems: 3
- immediateApprovalReadyItems: 3
- publicArticles: 500
- publishConfirmCommandsIncluded: 0
- routeWarningItems: 3
- trafficDataAvailable: false
- unsafeItems: 1

## Unsafe Reasons

- traffic source summary is inconsistent

## Top Human Approval Actions

| Priority | Human gate | Title | File | Action | Reason |
| ---: | --- | --- | --- | --- | --- |
| 446 | explicit human approval required | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx | Human reviewer verifies sources, SEO warnings, internal link path, and risk language; stop before mark:review until approval. | Immediate Wave 1; projected public count after human approval is 503. |
| 439 | explicit human approval required | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx | Human reviewer verifies sources, SEO warnings, internal link path, and risk language; stop before mark:review until approval. | Immediate Wave 1; projected public count after human approval is 503. |
| 415 | explicit human approval required | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx | Human reviewer verifies sources, SEO warnings, internal link path, and risk language; stop before mark:review until approval. | Immediate Wave 1; projected public count after human approval is 503. |

## Route Warnings To Clear

| Priority | Title | File | Warnings |
| ---: | --- | --- | --- |
| 431 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx | search query match warning exists |
| 360 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx | not yet matched in human approval clearance pack<br>no copydesk optimization brief matched<br>no freshness brief matched<br>search query match warning exists |
| 359 | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx | not yet matched in human approval clearance pack<br>no copydesk optimization brief matched<br>no freshness brief matched<br>search query match warning exists |

## Board Actions

| Board | Publish confirm | Action | Key summary |
| --- | --- | --- | --- |
| Internal links | not-included | Use docs/internal-link-sprint-board.md to add one contextual public link per candidate during manual review. | actionItems=128; broadFirstCoverageItems=0; candidateItems=16; candidateItemsMissingPublicLinkSuggestion=0; candidateItemsWithPublicSuggestions=16; candidatesWithoutCurrentPublicLinks=9; expansionItems=15; items=16 |
| Public refresh | not-included | Use docs/public-refresh-sprint-board.md to refresh existing public articles without claiming traffic. | actionItems=5032; cannibalizationItems=241; highPriorityItems=60; items=500; itemsPerWave=3; itemsReadyForPublicRefreshSprint=500; liveMissingFromSitemap=0; mojibakePublicItems=52 |
| AI deployment | not-included | Use docs/ai-deployment-sprint-board.md to prioritize deployment, Agent, model-serving, and API tutorial candidates. | actionItems=88; agentItems=0; apiIntegrationItems=2; automationPlatformItems=0; deploymentPublicArticles=179; highPriorityItems=0; implementationModes=4; items=6 |
| Memory/RAG | not-included | Use docs/memory-rag-sprint-board.md to prioritize RAG, knowledge base, vector search, memory, evaluation, and privacy lanes. | candidateItems=2; decisionChecks=39; deploymentPublicArticles=179; howToLanes=2; itemsPerWave=3; lanes=6; lanesWithCandidateFiles=2; privacyLanes=1 |
| Popular prompts | not-included | Use docs/popular-prompt-sprint-board.md to prioritize high-demand prompt playbook lanes. | actionItems=90; bridgeItems=14; candidateFiles=21; highPriorityItems=5; industryBuckets=5; items=10; itemsPerWave=2; lanesReadyForPromptSprint=3 |
