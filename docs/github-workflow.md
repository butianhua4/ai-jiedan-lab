# GitHub 工作流

这个项目先把 GitHub 当成内容仓库、代码仓库和人工审核记录。Vercel 可以晚一点再接，先把内容生产、质量检查、工具迭代和提交记录跑顺。

## 当前仓库

- 仓库：`butianhua4/ai-jiedan-lab`
- 默认分支：`main`
- 可见性：`public`
- 本地远程：`origin https://github.com/butianhua4/ai-jiedan-lab.git`

## 日常顺序

1. 本地生成少量草稿。
2. 运行质量检查。
3. 人工审核事实、平台规则、原创角度和 CTA。
4. 通过后改成 `review`。
5. 每次最多发布 1-3 篇。
6. 运行 build。
7. 提交到 GitHub。
8. 等 GitHub Actions 通过。
9. 以后接 Vercel 后，再由 Vercel 自动部署。

## 常用命令

```bash
npm run project:status
npm run generate:drafts -- --batch=2 --limit=5
npm run content:check
npm run mark:review -- --batch=2 --limit=2
npm run publish:articles -- --batch=2 --limit=1
npm run publish:articles -- --batch=2 --limit=1 --confirm
npm run build
git status
git add .
git commit -m "Add content batch 2 drafts"
git push
```

## GitHub Actions

仓库已经有 `.github/workflows/content-check.yml`。每次 `push` 或 `pull_request` 会运行：

- `npm install`
- `npm run content:check`
- `npm run build`

这条线的目的不是自动发布文章，而是防止低质量内容、构建错误和草稿误公开进入主分支。

## Issue 使用方式

用 `Content task` 记录文章选题、关键词、用户问题、提纲和质量要求。

用 `Tool bug or improvement` 记录工具页问题，例如 Proposal 生成器、报错解释器、报价助手、模板页和 SEO metadata。

不要把 API Key、密码、平台账号资料、客户隐私或收款账户信息写进 Issue。

## PR 使用方式

每个 PR 都要说明改了什么，并确认：

- 新文章默认 `status: draft`
- 新文章默认 `noindex: true`
- 发布文章必须先人工审核
- 不复制、不洗稿、不整篇翻译
- 不承诺保证赚钱
- 不鼓励绕过 Upwork、Fiverr、GitHub、Vercel 等平台规则

## 以后接 Vercel

等 GitHub 内容和工具稳定后，再在 Vercel 导入这个仓库。到那时只需要：

1. Vercel 选择 `butianhua4/ai-jiedan-lab`
2. Framework 选择 Next.js
3. Build command 使用 `npm run build`
4. 设置 `NEXT_PUBLIC_SITE_URL`
5. 关闭不需要的访问保护
6. 部署后检查 `/sitemap.xml` 和 `/robots.txt`

部署不是现在的重点。当前重点是把 GitHub 作为可信、可回滚、可审核的内容生产基地。
