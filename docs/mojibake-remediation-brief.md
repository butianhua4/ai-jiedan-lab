# Mojibake Remediation Brief

Generated at: 2026-06-13T01:37:41.068Z

Read-only queue for likely garbled Chinese article metadata and body excerpts. It does not edit articles, mark review, publish, or claim traffic.

## Summary

- Files scanned: 669
- Affected files: 77
- Affected draft files: 68
- Affected public files: 9
- Immediate approval affected: 0
- Executive top affected: 0
- Body excerpt hits: 72
- Publish confirm commands included: 0
- Traffic data available: false
- Unsafe items: 0

## Field Counts

- bodyExcerpt: 72
- description: 10
- targetReader: 2
- title: 1

## Manual Rules

- Repair readable Chinese title and description first, then body excerpts, using human source review.
- Preserve status, noindex, humanReviewRequired, slug, publishBatch, and qualityScore unless a human explicitly approves a separate change.
- Do not run mark:review or publish commands from this report.
- After repairs, rerun npm run content:integrity, npm run content:check, npm run automation:gate, and npm run automation:digest.
- If a title cannot be recovered confidently, leave the article in draft and add it to manual copy review.

## Top Remediation Queue

| Priority | Status | Noindex | Immediate | Executive | Lanes | Fields | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 140 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/build-first-webpage-with-codex.mdx |
| 140 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/codex-install-failed-beginner-fix.mdx |
| 140 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/first-upwork-project-pricing-checklist.mdx |
| 140 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/what-is-codex-beginner-start.mdx |
| 128 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/codex-code-review-delivery-checklist.mdx |
| 128 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/codex-github-before-commit-checklist.mdx |
| 128 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/codex-upwork-small-job-risk-checklist.mdx |
| 128 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/codex-vercel-deploy-preflight-checklist.mdx |
| 128 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/codex-vs-claude-code-beginner-checklist.mdx |
| 100 | draft | true | false | false | none | bodyExcerpt | content/blog/ai-ppt-beginner-guide.mdx |
| 86 | draft | true | false | false | none | description, bodyExcerpt | content/blog/ai-tools-recommendation-beginner.mdx |
| 86 | draft | true | false | false | none | bodyExcerpt | content/blog/dify-metadata-filtering-rag-guide.mdx |
| 86 | draft | true | false | false | none | bodyExcerpt | content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| 86 | draft | true | false | false | none | title, bodyExcerpt | content/blog/rag-prompt-injection-defense-guide.mdx |
| 86 | draft | true | false | false | none | bodyExcerpt | content/blog/ray-serve-llm-deployment-guide.mdx |
| 0 | draft | true | false | false | none | bodyExcerpt | content/blog/ai-small-project-practice-topics-checklist.mdx |
| 0 | draft | true | false | false | none | bodyExcerpt | content/blog/before-first-ai-freelance-job.mdx |
| 0 | draft | true | false | false | none | bodyExcerpt | content/blog/canva-portfolio-cover-tips-checklist.mdx |
| 0 | draft | true | false | false | none | bodyExcerpt | content/blog/claude-code-beginner-mistakes-checklist.mdx |
| 0 | draft | true | false | false | none | bodyExcerpt | content/blog/claude-code-beginner-mistakes-mistakes.mdx |
| 0 | draft | true | false | false | none | bodyExcerpt | content/blog/claude-code-beginner-use-cases-checklist.mdx |
| 0 | draft | true | false | false | none | bodyExcerpt | content/blog/claude-code-beginner-use-cases.mdx |
| 0 | draft | true | false | false | none | targetReader, bodyExcerpt | content/blog/claude-code-bug-prompt-mistakes.mdx |
| 0 | draft | true | false | false | none | description | content/blog/claude-code-bug-prompt.mdx |
| 0 | draft | true | false | false | none | targetReader | content/blog/claude-code-common-commands-mistakes.mdx |

## Top Samples

### content/blog/build-first-webpage-with-codex.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 常见错误一，是把 AI 生成的 Proposal 原文直接发送。这样很容易出现你不会做却承诺会做的内容。常见错误二，是看到客户预算低就盲目压价，结果沟通、修改和部署花掉更多时间。常见错误三，是忽略平台规则，例如诱导站外付款、批量骚扰式发送、虚假案例，这些都可能伤害账号安全。常见错误四，是没有保存交付过程，最后客户问起修改内容时说不清楚。

### content/blog/codex-install-failed-beginner-fix.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 常见错误一，是把 AI 生成的 Proposal 原文直接发送。这样很容易出现你不会做却承诺会做的内容。常见错误二，是看到客户预算低就盲目压价，结果沟通、修改和部署花掉更多时间。常见错误三，是忽略平台规则，例如诱导站外付款、批量骚扰式发送、虚假案例，这些都可能伤害账号安全。常见错误四，是没有保存交付过程，最后客户问起修改内容时说不清楚。

### content/blog/first-upwork-project-pricing-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 第一个项目报价不需要追求完美，但一定要避免两个问题：低到无法负责，或者高到没有依据。把范围拆小、把风险讲清、把修改次数写明，比盲目追求高价或低价都更稳。

### content/blog/what-is-codex-beginner-start.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 常见错误一，是把 AI 生成的 Proposal 原文直接发送。这样很容易出现你不会做却承诺会做的内容。常见错误二，是看到客户预算低就盲目压价，结果沟通、修改和部署花掉更多时间。常见错误三，是忽略平台规则，例如诱导站外付款、批量骚扰式发送、虚假案例，这些都可能伤害账号安全。常见错误四，是没有保存交付过程，最后客户问起修改内容时说不清楚。

### content/blog/codex-code-review-delivery-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 常见错误一，是把 AI 生成的 Proposal 原文直接发送。这样很容易出现你不会做却承诺会做的内容。常见错误二，是看到客户预算低就盲目压价，结果沟通、修改和部署花掉更多时间。常见错误三，是忽略平台规则，例如诱导站外付款、批量骚扰式发送、虚假案例，这些都可能伤害账号安全。常见错误四，是没有保存交付过程，最后客户问起修改内容时说不清楚。

### content/blog/codex-github-before-commit-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 常见错误一，是把 AI 生成的 Proposal 原文直接发送。这样很容易出现你不会做却承诺会做的内容。常见错误二，是看到客户预算低就盲目压价，结果沟通、修改和部署花掉更多时间。常见错误三，是忽略平台规则，例如诱导站外付款、批量骚扰式发送、虚假案例，这些都可能伤害账号安全。常见错误四，是没有保存交付过程，最后客户问起修改内容时说不清楚。

### content/blog/codex-upwork-small-job-risk-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 常见错误一，是把 AI 生成的 Proposal 原文直接发送。这样很容易出现你不会做却承诺会做的内容。常见错误二，是看到客户预算低就盲目压价，结果沟通、修改和部署花掉更多时间。常见错误三，是忽略平台规则，例如诱导站外付款、批量骚扰式发送、虚假案例，这些都可能伤害账号安全。常见错误四，是没有保存交付过程，最后客户问起修改内容时说不清楚。

### content/blog/codex-vercel-deploy-preflight-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 常见错误一，是把 AI 生成的 Proposal 原文直接发送。这样很容易出现你不会做却承诺会做的内容。常见错误二，是看到客户预算低就盲目压价，结果沟通、修改和部署花掉更多时间。常见错误三，是忽略平台规则，例如诱导站外付款、批量骚扰式发送、虚假案例，这些都可能伤害账号安全。常见错误四，是没有保存交付过程，最后客户问起修改内容时说不清楚。

### content/blog/codex-vs-claude-code-beginner-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 常见错误一，是把 AI 生成的 Proposal 原文直接发送。这样很容易出现你不会做却承诺会做的内容。常见错误二，是看到客户预算低就盲目压价，结果沟通、修改和部署花掉更多时间。常见错误三，是忽略平台规则，例如诱导站外付款、批量骚扰式发送、虚假案例，这些都可能伤害账号安全。常见错误四，是没有保存交付过程，最后客户问起修改内容时说不清楚。

### content/blog/ai-ppt-beginner-guide.mdx

- Status/noindex: draft/true
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 如果你用 Canva、PowerPoint 或其他工具，可以让 AI 先给每页布局说明，再自己拖拽实现。这样比盲目套模板更可控。

