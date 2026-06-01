# 内容发布工作流

1. Codex 生成 5 篇 draft。
2. 运行 `npm run content:check`。
3. 修复质量问题。
4. 人工快速审核。
5. 运行 `npm run mark:review -- --batch=1 --limit=2`。
6. 每次发布 1-3 篇。
7. `git add .`
8. `git commit -m "Add content batch 1 drafts"`
9. `git push`
10. Vercel 自动部署。
11. 部署后检查 `sitemap.xml`。
12. 检查页面是否能打开。
13. 观察 Google Search Console 收录情况。

禁止一次性生成 500 篇并全部发布、未审核直接发布、复制别人文章、自动发布高风险内容、自动生成虚假经历。
