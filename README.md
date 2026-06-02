# AI 接单实验室

面向中文新手的工具型 SEO 网站，提供 AI 接单教程、Proposal 生成器、报错解释器、报价助手、工具导航、模板下载，以及“可审核、分批发布”的内容自动化系统。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Markdown/MDX 内容
- Vercel 部署

## 本地运行

```bash
npm install
npm run dev
npm run build
```

如果 PowerShell 拦截 npm 脚本，可以使用：

```bash
npm.cmd run dev
npm.cmd run build
```

## 上线后检查

部署到 Vercel 后，使用正式域名检查公开页面、sitemap、robots 和草稿泄露：

```bash
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
npm run searchability:check -- --url=https://ai-jiedan-lab.vercel.app
```

这个检查只读线上页面，不会发布文章，也不会调用真实 AI API。

`live:check` 负责确认主要页面、文章、sitemap 和 robots 能访问。`searchability:check` 负责更细的 SEO 可搜索度检查，包括英文 URL、canonical、Open Graph、JSON-LD、meta description、sitemap 收录范围和草稿泄漏。

当前站点已通过基础可搜索度检查，但 Google 是否收录还需要提交 Google Search Console 后观察。相关记录见 `docs/seo-searchability-audit.md` 和 `docs/search-console-setup.md`。

拿到 Google Search Console HTML tag 的 `content` 验证码后，可以先检查验证准备度：

```bash
npm run search-console:check -- --url=https://ai-jiedan-lab.vercel.app --token=你的验证码
```

如果已经把验证码写入 Vercel 环境变量并重新部署，也可以直接运行：

```bash
npm run search-console:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 内容自动化

500 篇选题计划在 `content/content-plan-500.ts`。选题分为 20 个 batch，每个 batch 最多 25 篇。文章生成后默认：

- `status: draft`
- `noindex: true`
- 不能进入 sitemap
- 不能出现在 `/blog`

如需重建 500 篇选题计划，运行：

```bash
npm run content:plan
```

这个命令只刷新选题计划，不会发布文章，也不会调用真实 AI API。重建后要优先使用新计划继续生成草稿；旧的 `draft` 文章如果标题不够正式，必须人工打磨后才能进入 `review`。

只有人工审核后进入 `review`，再通过发布脚本加 `--confirm`，才能变成：

- `status: published`
- `noindex: false`

## 生成下一批草稿

默认一次最多生成 5 篇，避免低质量批量内容：

```bash
npm run generate:drafts -- --batch=2 --limit=5
npm run generate:drafts -- --category="Codex 新手教程"
npm run generate:drafts -- --priority=5
```

已有文件默认不会覆盖。确实要重建时才使用：

```bash
npm run generate:drafts -- --batch=2 --limit=5 --force
```

## 检查文章质量

```bash
npm run content:check
npm run content:check -- --batch=1
npm run content:check -- --file=content/blog/example.mdx
```

质量检查会输出：

- `qualityScore`
- `failedItems`
- `warnings`
- `suggestions`

低于 80 分不能进入 review，也不能发布。

## 进入人工审核

```bash
npm run mark:review -- --batch=1 --limit=5
npm run mark:review -- --file=content/blog/example.mdx
```

规则：

- 只允许 `qualityScore >= 80` 的 draft 进入 review。
- 进入 review 后仍然保持 `noindex: true`。
- 人工需要检查事实、来源备注、平台规则、原创角度和 CTA。

## 发布文章

dry run：

```bash
npm run publish:articles -- --batch=1 --limit=1
```

真正发布：

```bash
npm run publish:articles -- --batch=1 --limit=1 --confirm
```

规则：

- 只能发布 `status=review` 的文章。
- 只能发布 `qualityScore >= 80` 的文章。
- 每次最多发布 5 篇。
- 没有 `--confirm` 时不会修改文件。
- 发布后自动更新 `status=published`、`noindex=false`、`updatedAt` 和 `content/publish-log.json`。

## 开发环境内容页面

```bash
npm run content:dashboard
```

然后打开：

- `/admin/content-dashboard`
- `/drafts`

这两个页面只在 development 环境用于查看内容状态。生产环境不会作为公开内容使用。

## SEO 规则

- `/blog` 只展示 `published && noindex=false` 的文章。
- `/sitemap.xml` 只收录 `published && noindex=false` 的文章。
- draft 和 review 默认不收录。
- 每篇文章都有 canonical 字段。
- 工具详情页输出 WebApplication/SoftwareApplication JSON-LD。
- 文章详情页输出 BlogPosting JSON-LD。
- 分类和标签 URL 使用英文 slug，不使用中文 URL。
- 每次部署后运行 `npm run searchability:check -- --url=https://ai-jiedan-lab.vercel.app`。

## GitHub / Vercel 部署

```bash
git init
git add .
git commit -m "Add AI content automation system"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

在 Vercel 导入仓库，构建命令使用：

```bash
npm run build
```

绑定域名后：

1. 在 Vercel 设置 `NEXT_PUBLIC_SITE_URL`。
2. 修改 `data/site.ts` 默认 URL。
3. 重新部署。
4. 检查 `/sitemap.xml` 和 `/robots.txt`。

## 接入真实 AI API

未来在 `lib/ai.ts` 接入真实模型，并让：

- `app/api/generate-proposal/route.ts`
- `app/api/explain-error/route.ts`

调用真实 API。

即使接入真实 AI，也必须保留：

```text
draft -> content:check -> 人工审核 -> review -> publish --confirm
```

禁止自动发布未经审核内容。

## 运营顺序：先工具，再文章

当前项目的推荐顺序是：

1. 先把 Proposal 生成器、报错解释器、报价助手、模板下载页做成可用入口。
2. 再用文章覆盖长尾 SEO 问题。
3. 每篇文章都导流到一个工具、一个模板或一个服务 CTA。
4. 每次只发布 1-3 篇人工审核文章，观察收录和点击。

详细收款与变现路线见 `docs/monetization-and-payment-plan.md`。

## 广告、联盟、邮箱和付费模板

- 广告：接入 `AdSlot` 位置。
- 联盟链接：使用工具数据里的 `affiliateUrl`。
- 邮箱订阅：可接 Resend、Formspree 或 Supabase。
- 付费模板：可接 Gumroad、Lemon Squeezy、Paddle 或 Stripe。

## 常见报错

- `npm` 在 PowerShell 被拦截：使用 `npm.cmd`。
- Turbopack workspace root 推断错误：已在 `next.config.ts` 设置 `turbopack.root`。
- 文章不进 sitemap：检查 `status` 是否为 `published` 且 `noindex` 是否为 `false`。
- 发布失败：先运行 `npm run content:check -- --file=...`。

## GitHub 工作流

当前阶段可以先不部署 Vercel，先把 GitHub 作为代码、内容和审核记录中心。

- GitHub 维护说明：`docs/github-workflow.md`
- 平台注册路线图：`docs/platform-registration-roadmap.md`
- 上线后检查清单：`docs/post-deploy-checklist.md`
- 人工审核清单：`docs/manual-review-checklist.md`
- Google Search Console 提交清单：`docs/search-console-setup.md`
- PR 模板：`.github/PULL_REQUEST_TEMPLATE.md`
- 内容任务 Issue 模板：`.github/ISSUE_TEMPLATE/content-task.yml`
- 工具改进 Issue 模板：`.github/ISSUE_TEMPLATE/tool-bug.yml`

推荐顺序是：生成少量 draft -> 质量检查 -> 人工审核 -> review -> 少量发布 -> build -> commit -> push -> 等 GitHub Actions 通过。
