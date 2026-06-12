# Review Entry Batch 2026-06-12

This batch moves the next public-content work from "topic inventory" into review entry. It does not publish articles and does not change article status automatically.

## Primary Growth Batch

These 3 articles are the current priority because they match broader search demand beyond website deployment:

| Article | File | Status | Noindex | Check result | Review lane |
| --- | --- | --- | --- | --- | --- |
| AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | `content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx` | draft | true | 100, no warnings | AI Agent deployment |
| 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | `content/blog/industry-ai-prompts-template-library-2026.mdx` | draft | true | 100, no warnings | Broad AI prompts |
| 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | `content/blog/ai-model-selection-customer-service-guide.mdx` | draft | true | 100, no warnings | Model deployment / customer support AI |

Current automation evidence:

- `docs/publish-readiness-pack.md`: included 3 articles.
- `docs/review-preflight.md`: checked 3, passed 3, failed 0.
- Guardrails: auto publish is false; auto mark review is false.

Official source targets checked on 2026-06-12:

- Vercel AI SDK Agents overview: https://ai-sdk.dev/docs/agents/overview
- Vercel AI SDK ToolLoopAgent reference: https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent
- Vercel AI SDK Human-in-the-Loop recipe: https://ai-sdk.dev/cookbook/next/human-in-the-loop
- OpenAI prompt engineering guide: https://developers.openai.com/api/docs/guides/prompt-engineering
- OpenAI guardrails and human review guide: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals

## Secondary Cleanup Batch

These 5 Codex tutorial articles were cleaned for the new site brand and remain ready for manual review checks:

| Article | File | Status | Noindex | Check result | Change made |
| --- | --- | --- | --- | --- | --- |
| Codex 修 CSS 间距和响应式问题怎么做 | `content/blog/codex-css-spacing-responsive.mdx` | draft | true | 100, no warnings | Replaced old author/tag wording |
| Codex 修 CSS 间距和响应式问题怎么做：新手检查清单 | `content/blog/codex-css-spacing-responsive-checklist.mdx` | draft | true | 100, no warnings | Replaced old author/tag wording |
| Codex 修 CSS 间距和响应式问题怎么做：接单前怎么判断能不能做 | `content/blog/codex-css-spacing-responsive-freelance-scope.mdx` | draft | true | 100, no warnings | Replaced old author/tag wording |
| Codex 修 CSS 间距和响应式问题怎么做：常见错误和解决步骤 | `content/blog/codex-css-spacing-responsive-mistakes.mdx` | draft | true | 100, no warnings | Replaced old author/tag wording |
| Codex 是什么，新手第一天应该怎么用 | `content/blog/codex-first-day-guide.mdx` | draft | true | 100, no warnings | Replaced old author/tag wording |

## Decision

Next action is to manually approve or revise the 3 primary growth articles first. They cover higher-value search lanes:

1. Agent deployment.
2. Broad industry prompt templates.
3. Model selection for customer support AI.

After human approval, only these 3 should be considered for review status. Publishing should still be a separate small batch after another dry run.

## Do Not Skip

- Do not claim traffic until Search Console or Analytics data exists.
- Do not publish drafts directly.
- Do not mark review without reading the article and checking fast-changing official docs.
- Do not let old "AI 接单实验室" positioning leak back into public pages.
