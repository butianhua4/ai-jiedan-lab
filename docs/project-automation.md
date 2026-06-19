# 项目自动化说明

这个项目现在有两层自动化：本地一键运行和 GitHub Actions 定时运行。

## 自动运行频率

`.github/workflows/review-automation.yml` 会在每天 UTC 时间 01:30、07:30、13:30、23:30 自动运行一次。换算到中国时间，通常是 09:30、15:30、21:30、次日 07:30。

也可以在 GitHub Actions 页面手动点 `Project Automation` 的 `Run workflow`。

## 自动化会做什么

每次运行都会执行：

- 清理草稿里的高风险话术，只做 dry run 检查。
- 生成待人工审核文章队列。
- 生成发布准备包。
- 对优先候选文章做发布前预检。
- 生成项目状态、SEO 安全检查、搜索可见性检查。
- 生成 SEO 机会地图。
- 运行自动化安全闸门。
- 生成自动化摘要。
- 把自动化报告文件提交回仓库。
- 在 GitHub Actions job summary 里展示摘要。

## 自动化不会做什么

自动化不会直接发布文章，不会把 `draft` 改成 `published`，不会替代人工审核，也不会自动联系客户、投标或绕开任何平台规则。

新文章和自动生成内容仍然必须保持：

- `status: "draft"`
- `noindex: true`
- `humanReviewRequired: true`

发布动作仍然必须由人工确认后执行。

## 结果在哪里看

仓库里直接看这些文件：

- `docs/automation-digest.md`
- `docs/review-automation.md`
- `docs/review-preflight.md`
- `docs/publish-readiness-pack.md`
- `docs/seo-opportunity-map.md`
- `docs/automation-gate.md`
- `content/automation/automation-run-summary.json`

GitHub Actions 里也会上传 `project-automation` artifact，里面包含同一批报告。

## 本地一键运行

```bash
npm run automation:all
```

运行后建议再跑：

```bash
npm run lint
npm run build
npm run live:check -- --url=https://ai.aporet.com
```
