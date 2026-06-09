# Review Collision Decision Pack

Generated at: 2026-06-09T16:19:11.508Z

This report is read-only. It turns high cannibalization risk into a manual decision pack and stops before mark:review or publish.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Stop before mark:review. If a reviewer keeps both articles, the angle and internal-link relationship must be explicit first.
- Note: Read-only collision decision pack. It turns high cannibalization risk into human review decisions without editing drafts, marking review, or publishing.

## Summary

- blockedQueueMatchedItems: 1
- blockingItems: 0
- decisionItems: 1
- highRiskItems: 1
- humanDecisionReadyItems: 1
- itemsWithCommandBoundary: 1
- publishedCollisionItems: 0
- reviewOnlyCollisionItems: 1
- unsafeItems: 0
- warningItems: 1

## Source Evidence

- cannibalizationGeneratedAt: "2026-06-09T16:19:11.037Z"
- cannibalizationGuardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only cannibalization brief for current review candidates. It does not edit titles, slugs, keywords, status, noindex, or publishing state.","stopBefore":"Use recommendations during human review only. Publishing still requires separate explicit approval."}
- cannibalizationSummary: {"candidateFiles":13,"highRiskItems":1,"highRiskPublishedItems":0,"highRiskReviewOnlyItems":1,"items":13,"itemsWithPublishedComparison":0,"itemsWithReviewComparison":1,"mediumRiskItems":0,"unsafeCommands":0}
- queueBlockedItems: 1

## Blocking Items

- none

## Decision Items

| Ready | Type | Blockers | Warnings | Candidate | Closest | Command gated |
| --- | --- | --- | --- | --- | --- | --- |
| true | review-only-collision | 0 | 10 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 (content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx) | 大模型部署是什么意思：API、本地和私有化怎么选 (content/blog/llm-deployment-beginner-guide.mdx) | true |

## Manual Decisions

### 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查

- File: content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx
- Collision type: review-only-collision
- Required decision: Choose keep-both, merge, or delay before mark:review.
- Candidate role: provider-specific deployment option: own Hugging Face endpoints, hosted inference, engine choice, cost checks, and production acceptance.

Closest articles:

- 大模型部署是什么意思：API、本地和私有化怎么选 (content/blog/llm-deployment-beginner-guide.mdx) - pillar explainer: own beginner route selection across API, local deployment, and private deployment.

Decision options:

- Keep both: content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx should own provider-specific deployment option: own Hugging Face endpoints, hosted inference, engine choice, cost checks, and production acceptance.
- Keep both: content/blog/llm-deployment-beginner-guide.mdx should own pillar explainer: own beginner route selection across API, local deployment, and private deployment.
- Merge: fold the provider-specific material into the broader article and leave this draft unpublished.
- Delay: keep this draft in noindex draft until the broader article is reviewed and an internal-link path is clear.
- Differentiate: update title/opening during human review so the two drafts do not promise the same answer.

Manual next actions:

- Pick one decision option before changing status.
- Candidate role to preserve: provider-specific deployment option: own Hugging Face endpoints, hosted inference, engine choice, cost checks, and production acceptance.
- Closest article role to preserve: pillar explainer: own beginner route selection across API, local deployment, and private deployment.
- Consider copydesk addition during human review: 在开头 200 字内自然回答一次“大模型部署教程”这个搜索意图，先给结论再展开步骤。
- Consider copydesk addition during human review: 在相关段落加入公开内链：Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist)。
- If keeping both drafts, add a clear cross-link relationship during human review.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

