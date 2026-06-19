# 内容发布工作流

当前 500 篇正式选题已经补齐文件。后续重点不是继续批量生成，而是人工抽查、分批审核、少量发布。

## 推荐流程

1. 生成审核队列：`npm run content:review-queue -- --priority=5 --limit=30 --format=md --write=docs/review-queue.md`
2. 打开 `docs/review-queue.md`，人工选择 1-3 篇最适合先看的 draft。
3. 运行 `npm run content:check -- --file=content/blog/xxx.mdx`。
4. 根据 `docs/manual-review-checklist.md` 做人工审核，补充真实经验、来源备注和风险提醒。
5. 审核通过后运行 `npm run mark:review -- --file=content/blog/xxx.mdx --confirm-human`。
6. 发布前先 dry run：`npm run publish:articles -- --file=content/blog/xxx.mdx`。
7. 真正发布时加 `--confirm`，每次最多 1-3 篇。
8. 运行 `npm run build` 和 `npm run seo:check`。
9. `git add .`
10. `git commit -m "Publish reviewed article"`
11. `git push`
12. Vercel 自动部署后运行 `npm run live:check -- --url=https://ai.aporet.com`。
13. 部署后检查 `/sitemap.xml`，确认只出现 published 且 noindex=false 的文章。
14. 观察 Google Search Console 的抓取、收录和点击数据。

## 禁止流程

- 禁止一次性生成 500 篇并全部发布。
- 禁止未审核直接发布。
- 禁止用爬虫复制别人文章。
- 禁止自动发布高风险内容。
- 禁止自动生成虚假经历。
- 禁止为了收录把 draft 或 archived 改成可索引。

## 当前发布节奏建议

前期只发布少量最有用的文章，优先围绕已经能承接流量的工具页：

- Proposal 生成器
- 报错解释器
- 报价助手
- 模板下载页

每次发布后至少观察几天，再决定是否继续发布下一组。
