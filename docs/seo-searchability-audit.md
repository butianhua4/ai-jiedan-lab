# SEO 可搜索度体检报告

最后更新：2026-06-02

本报告用于判断网站是否已经具备“可以被搜索引擎发现和抓取”的基础条件。它不代表 Google 已经收录，也不保证排名或流量，只说明当前技术 SEO 基础是否过关。

## 当前结论

当前站点基础可搜索度检查结果为：

```text
score: 100 / 100
publishedPosts: 15
sitemapUrlCount: 85
draftLeak: false
robotsAllowsCrawl: true
canonical: passed
structuredData: passed
categoryAndTagSlugs: english/ascii
```

也就是说：站点已经具备提交 Google Search Console 的条件。下一步不是继续注册很多平台，而是提交 sitemap，并观察 Google 是否发现页面。

## 已通过项目

1. 首页、博客页、工具页、模板页、路线图可正常访问。
2. `/robots.txt` 返回 200，并指向 sitemap。
3. `/sitemap.xml` 返回 200，使用正式域名。
4. sitemap 只包含公开页面，不包含 draft 或 review 文章。
5. `/blog` 只展示 `status: published` 且 `noindex: false` 的文章。
6. 当前 15 篇公开文章都在 sitemap 中。
7. 文章页有 canonical。
8. 文章页有 BlogPosting JSON-LD。
9. 首页有 WebSite JSON-LD。
10. 首页有 title、description、canonical 和 Open Graph。
11. 工具详情页预留 WebApplication / SoftwareApplication JSON-LD。
12. 分类页和标签页已经改成英文 slug。

## 已修复问题

### 分类和标签 URL 中文化

原来部分页面可能出现中文 URL，例如：

```text
/category/报错解决
/tag/报价
```

现在已经改成英文 slug，例如：

```text
/category/troubleshooting
/category/upwork-beginner
/tag/npm-install
/tag/client-communication
```

旧中文路径已经添加 301 redirect，避免旧链接直接失效。

### 搜索度检查脚本缺失

已经新增：

```bash
npm run searchability:check
npm run searchability:check -- --url=https://ai.aporet.com
```

这个脚本会检查：

- 公开文章数量。
- 文章、分类、标签 slug 是否为英文。
- published 文章是否可索引。
- canonical 是否正确。
- sitemap 是否包含所有公开文章。
- robots 是否允许抓取。
- 首页是否有 description、Open Graph 和 JSON-LD。
- 抽样文章是否有 BlogPosting JSON-LD。

## 当前没有完成的事

### Google Search Console 尚未提交

技术基础已经准备好，但 Google 不会自动立刻理解新站。下一步需要站长本人登录 Google Search Console：

```text
https://search.google.com/search-console
```

添加站点：

```text
https://ai.aporet.com
```

验证成功后提交：

```text
sitemap.xml
```

### Google 是否收录仍需等待

`site:ai.aporet.com` 当前没有明显收录结果。这对新站是正常现象，不代表技术配置失败。提交 sitemap 后通常还需要等待，并持续发布少量高质量页面。

## 每次发布文章后要做

发布 1-3 篇文章后运行：

```bash
npm run content:check
npm run seo:check
npm run searchability:check
npm run build
```

部署后运行：

```bash
npm run live:check -- --url=https://ai.aporet.com
npm run searchability:check -- --url=https://ai.aporet.com
```

如果检查失败，不要继续发布更多文章，先修失败项。

## 后续提升方向

1. 接入 Google Search Console。
2. 提交 sitemap。
3. 观察 Search Console 中的“网页”“站点地图”“查询”数据。
4. 根据真实搜索词补文章和工具入口。
5. 保持每次只发布 1-3 篇人工审核文章。
6. 有稳定访问后再考虑 Google Analytics、AdSense 和联盟链接。

核心原则：先能被抓取，再谈收录；先有质量，再谈流量；先小批量验证，再扩大内容库。
