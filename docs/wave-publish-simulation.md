# Wave Publish Simulation

Generated at: 2026-06-06T16:01:01.504Z

This simulation is read-only. It lists the post-approval path but does not change article status, noindex, or publishing state.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Stop before human approval: true
- Note: Read-only simulation. It does not run mark:review, publish:articles, or change any article status/noindex value.

## Summary

- Wave: 1
- Items: 3
- Ready for human approval: 3
- Unsafe items: 0
- Currently publishable: 0
- Public published before wave: 15
- Projected publishable after human approval: 3
- Projected public published after wave: 18

## Publishing Boundary

- Current public published: 15
- Current publishable now: 0
- Projected public published after wave: 18
- Current status counts: {"draft":633,"published":15,"archived":21}

## Execution Plan

- beforeApproval: Read docs/wave-approval-packet.md and this simulation. Do not run confirm commands until a human approves each file.
- afterHumanApprovalStep1: Run the mark:review dry-run command for the approved file.
- afterHumanApprovalStep2: If dry-run output is clean, run the listed mark:review command with --confirm-human for that approved file only.
- afterReviewStep3: Run the publish dry-run command after the file is status=review.
- afterReviewStep4: Run publish:articles --confirm only after final human approval and a clean dry-run.

## Decision Table

| Ready | Status | Noindex | Human review flag | Score | Sources | Risk checks | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | draft | true | true | 100 | 7 | 6 | none | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | draft | true | true | 100 | 6 | 6 | none | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | draft | true | true | 100 | 4 | 6 | none | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |

## 1. 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Ready for human approval: true
- Current status: draft
- Noindex: true
- Human review required: true
- Quality score: 100
- Official source targets: 7
- Risk review checks: 6

Blockers:

- none

Commands to run only after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm
```

## 2. AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Ready for human approval: true
- Current status: draft
- Noindex: true
- Human review required: true
- Quality score: 100
- Official source targets: 6
- Risk review checks: 6

Blockers:

- none

Commands to run only after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm
```

## 3. 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Ready for human approval: true
- Current status: draft
- Noindex: true
- Human review required: true
- Quality score: 100
- Official source targets: 4
- Risk review checks: 6

Blockers:

- none

Commands to run only after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm
```
