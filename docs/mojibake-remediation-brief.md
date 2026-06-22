# Mojibake Remediation Brief

Generated at: 2026-06-22T06:59:32.646Z

Read-only queue for likely garbled Chinese article metadata and body excerpts. It does not edit articles, mark review, publish, or claim traffic.

## Summary

- Files scanned: 669
- Affected files: 78
- Affected draft files: 26
- Affected public files: 52
- Immediate approval affected: 0
- Executive top affected: 0
- Body excerpt hits: 72
- Publish confirm commands included: 0
- Traffic data available: false
- Unsafe items: 0

## Field Counts

- bodyExcerpt: 72
- description: 11
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
| 140 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/daily-ai-freelance-practice-log.mdx |
| 140 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/node-version-mismatch-fix-freelance-scope.mdx |
| 140 | published | false | false | false | internal-link-sprint | description, bodyExcerpt | content/blog/node-version-mismatch-fix-mistakes.mdx |
| 140 | published | false | false | false | internal-link-sprint | description | content/blog/permission-denied-fix-checklist.mdx |
| 140 | published | false | false | false | internal-link-sprint | bodyExcerpt | content/blog/ray-serve-llm-deployment-guide.mdx |
| 100 | published | false | false | false | none | description | content/blog/ai-beginner-project-fit-check.mdx |
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

## Top Samples

### content/blog/daily-ai-freelance-practice-log.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 不要只写“问了 AI”。要写清楚你给了什么上下文、AI 给了什么方案、你采纳了哪一部分、你拒绝了哪一部分。这样才能证明你不是盲目复制。

### content/blog/node-version-mismatch-fix-freelance-scope.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 如果任务只允许诊断，就不要承诺修复所有环境。交付物可以是版本差异表、建议目标版本、复测命令和客户待办。对新手来说，这种清楚的诊断单比盲目改生产平台更可靠。

### content/blog/node-version-mismatch-fix-mistakes.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: description, bodyExcerpt
- Sample: 整理新手处理 Node 版本不匹配时的常见错误：盲目升级、删除锁文件、混用包管理器、忽略 CI 和部署平台版本、把客户配置当代码问题，并给出修正步骤。

### content/blog/permission-denied-fix-checklist.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: description
- Sample: permission denied 报错处理前，新手要检查命令、路径、用户、权限类型、Git/SSH 账号、部署环境和客户授权边界，避免盲目提权。

### content/blog/ray-serve-llm-deployment-guide.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: bodyExcerpt
- Sample: 扩容前先看瓶颈在哪里。盲目加 GPU 不一定解决提示词过长、批处理不合理或模型选择不当的问题。

### content/blog/ai-beginner-project-fit-check.mdx

- Status/noindex: published/false
- Preserve status: true
- Publish confirm: not-included
- Fields: description
- Sample: AI 新手接项目前，先用需求清晰度、风险等级、验证能力和交付边界判断自己能不能接，避免盲目报价和交付失控。

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

