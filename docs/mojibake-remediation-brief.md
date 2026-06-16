# Mojibake Remediation Brief

Generated at: 2026-06-16T05:26:29.082Z

Read-only queue for likely garbled Chinese article metadata and body excerpts. It does not edit articles, mark review, publish, or claim traffic.

## Summary

- Files scanned: 669
- Affected files: 77
- Affected draft files: 26
- Affected public files: 51
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
| 140 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/ai-ppt-beginner-guide.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/ai-small-project-practice-topics-checklist.mdx |
| 100 | published | false | false | false | none | description, bodyExcerpt | content/blog/ai-tools-recommendation-beginner.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/before-first-ai-freelance-job.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/build-first-webpage-with-codex.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/canva-portfolio-cover-tips-checklist.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/claude-code-beginner-mistakes-checklist.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/claude-code-beginner-mistakes-mistakes.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/claude-code-beginner-use-cases-checklist.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/claude-code-beginner-use-cases.mdx |
| 100 | published | false | false | false | none | targetReader, bodyExcerpt | content/blog/claude-code-bug-prompt-mistakes.mdx |
| 100 | published | false | false | false | none | description | content/blog/claude-code-bug-prompt.mdx |
| 100 | published | false | false | false | none | targetReader | content/blog/claude-code-common-commands-mistakes.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/claude-code-common-commands.mdx |
| 100 | published | false | false | false | none | description, bodyExcerpt | content/blog/claude-code-error-debug-mistakes.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/claude-code-github-file-scope-mistakes.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/claude-code-small-project-tasks.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/claude-code-vs-codex-web-editing-checklist.mdx |
| 100 | published | false | false | false | none | description, bodyExcerpt | content/blog/codex-automation-steps-not-skip-mistakes.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/codex-automation-steps-not-skip.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/codex-edit-existing-ui-mistakes.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/codex-first-day-guide-checklist.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/codex-first-landing-page-freelance-scope.mdx |
| 100 | published | false | false | false | none | bodyExcerpt | content/blog/codex-install-failed-beginner-fix.mdx |

## Top Samples

### content/blog/llm-cost-monitoring-dashboard-guide.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: AI 应用刚上线时，大家关心效果；用起来以后，成本问题会很快冒出来。哪个功能最贵，哪个用户消耗最多，哪个模型延迟最高，哪个 Agent 反复调用工具，哪些请求应该缓存，哪些批量任务应该改成异步，这些问题如果没有成本监控，就只能靠猜。大模型成本看板不是财务报表，而是产品和工程优化工具。

### content/blog/ai-ppt-beginner-guide.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 如果你用 Canva、PowerPoint 或其他工具，可以让 AI 先给每页布局说明，再自己拖拽实现。这样比盲目套模板更可控。

### content/blog/ai-small-project-practice-topics-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 命中这些信号时，换一个低风险题目。练习不需要冒险。

### content/blog/ai-tools-recommendation-beginner.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: description, bodyExcerpt
- Sample: 面向新手整理 AI 工具推荐的选择方法，按写作、图片、PPT、网站、视频、代码和记录复盘分类，避免盲目购买。

### content/blog/before-first-ai-freelance-job.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 不要为了拿下第一单就接受所有要求。第一次项目最重要的是形成可复用流程，而不是冒险碰高权限任务。凡是涉及客户账号、密钥、付款、隐私数据和生产环境的需求，都应该先暂停确认。

### content/blog/build-first-webpage-with-codex.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 常见错误一，是把 AI 生成的 Proposal 原文直接发送。这样很容易出现你不会做却承诺会做的内容。常见错误二，是看到客户预算低就盲目压价，结果沟通、修改和部署花掉更多时间。常见错误三，是忽略平台规则，例如诱导站外付款、批量骚扰式发送、虚假案例，这些都可能伤害账号安全。常见错误四，是没有保存交付过程，最后客户问起修改内容时说不清楚。

### content/blog/canva-portfolio-cover-tips-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 不要用 AI 生成图像冒充真实项目结果。如果是 AI 辅助生成的视觉稿，要标明用途和限制。作品集的核心是你的过程和判断，不是让客户误以为所有画面都来自真实项目。

### content/blog/claude-code-beginner-mistakes-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 诊断不是退缩。对新手来说，能判断“现在不能直接修”，比盲目接下高风险任务更专业。

### content/blog/claude-code-beginner-mistakes-mistakes.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 如果检查失败，也要记录失败原因。失败不是坏事，它说明你还在验证，而不是盲目交付。客户看到清楚的失败记录和下一步建议，通常比看到一句含糊的“还在处理中”更容易理解。

### content/blog/claude-code-beginner-use-cases-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 如果清单里有两三项回答不清楚，不要硬接。可以把任务降级为诊断：先阅读脱敏材料、整理可能原因、列出缺失信息和下一步建议。诊断比盲目修复更适合信息不足的情况。

