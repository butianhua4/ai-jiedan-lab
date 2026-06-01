# Google Search Console 提交清单

这份文档用于网站有少量人工审核文章之后，开始让 Google 正式发现站点。它不是变现平台，也不会直接带来收入，只是帮助我们看见搜索曝光、收录状态和页面问题。

当前站点已经具备提交条件：有生产域名、robots.txt、sitemap.xml、canonical、公开文章和草稿隔离规则。下一步可以注册 Google Search Console，但不需要同时注册广告、支付、邮件或 AI API 平台。

## 什么时候注册

建议满足这些条件后再注册：

1. 至少 5 篇 published 文章。
2. sitemap 不包含 draft 或 review 文章。
3. robots.txt 能访问并指向 sitemap。
4. 首页、博客页、工具页和模板页可以正常打开。
5. 内容没有承诺收入结果，没有鼓励平台违规。

当前项目已经满足前 4 项，后续每次发布文章都继续按人工审核清单检查第 5 项。

## 注册前检查

先打开这些地址：

1. `https://ai-jiedan-lab.vercel.app/`
2. `https://ai-jiedan-lab.vercel.app/blog`
3. `https://ai-jiedan-lab.vercel.app/sitemap.xml`
4. `https://ai-jiedan-lab.vercel.app/robots.txt`

也可以在本地运行：

```bash
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
npm run seo:check
```

如果 `leaksDrafts` 是 `false`，并且 `seo:check` 的 `ok` 是 `true`，再提交给 Search Console。

## 添加站点属性

进入 Google Search Console 后，建议优先使用 URL prefix：

```text
https://ai-jiedan-lab.vercel.app
```

如果以后购买自定义域名，再新增 Domain property。不要急着把临时域名和正式域名都推给搜索引擎，避免后期重复迁移。

## 验证方式

Vercel 项目最简单的验证方式通常是 HTML 标签：

1. 在 Search Console 选择 HTML tag。
2. 复制 `content` 里的验证码。
3. 在项目里新增环境变量或代码配置验证标签。
4. 推送 GitHub，等待 Vercel 部署。
5. 回到 Search Console 点击 Verify。

项目已经预留 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 环境变量。把 HTML tag 的 `content` 值填进去并重新部署后，Next.js 会自动输出 Google 验证标签。不要把 Google 账号密码、API Key 或私人验证码写进公开文档。

Vercel 环境变量建议这样填：

```text
Key: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
Value: Google Search Console HTML tag 的 content 值
Environment: Production and Preview
```

## 提交 sitemap

验证成功后，在 Sitemaps 页面提交：

```text
sitemap.xml
```

完整地址是：

```text
https://ai-jiedan-lab.vercel.app/sitemap.xml
```

提交后不用反复点。Google 收录通常需要时间，重点看后续有没有抓取错误、重复 canonical、noindex 冲突或 404。

## 发布后的固定检查

每次发布 1-3 篇文章后做这些事：

1. 运行 `npm run seo:check`。
2. 确认新文章是 `status: published`。
3. 确认新文章是 `noindex: false`。
4. 确认草稿仍然是 `noindex: true`。
5. 打开 sitemap，看 URL 数量是否合理增加。
6. 在 Search Console 里观察页面是否被发现。

不要为了追求数量一次性发布大量文章。这个站点的内容策略是小批量、可审核、可持续。

## 常见问题

### Search Console 显示未收录怎么办

这不代表网站坏了。新站通常需要等待。先检查文章是否有独立价值、是否有内链、是否没有 noindex，再观察一段时间。

### sitemap 提交后没有马上变化怎么办

正常。sitemap 是发现线索，不是收录保证。继续保持文章质量和稳定发布节奏。

### 要不要现在开 Google Analytics

可以晚一点。Search Console 先解决搜索收录和关键词曝光，Analytics 用来看用户行为。没有稳定访问前，Analytics 的数据价值有限。

### 要不要现在开广告

不要急。广告平台通常需要内容量、合规页面、稳定流量和较好的用户体验。第一阶段先积累内容与工具使用数据。

## 禁止事项

1. 不提交 draft 或 review 文章。
2. 不用复制、洗稿、整篇翻译内容填充站点。
3. 不为了收录制造大量低质量页面。
4. 不在 Search Console 或代码里暴露账号、密钥、私密验证码。
5. 不频繁更换主域名。

下一步需要你本人操作的注册事项，就是 Google Search Console。等你准备好登录 Google 账号时，再把验证码给我，我来把验证标签接进代码。
