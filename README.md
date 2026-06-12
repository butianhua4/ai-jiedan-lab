# AI 工具指南

面向中文用户的 AI 工具教程、部署指南、提示词、办公自动化和内容安全工作流项目。

这个仓库同时包含一个公开网站和一套内容生产/审核自动化系统。目标不是做一个只卖工具的页面，而是把真实用户会搜索的问题整理成可访问、可复查、可持续扩展的工具与教程库。

Live site: https://ai-jiedan-lab.vercel.app

## 项目定位

AI 工具指南覆盖这些方向：

- AI 办公自动化：PPT、Excel、周报、邮件、会议纪要
- AI 提示词库：销售、客服、运营、HR、电商、教育、财务、开发
- AI 部署教程：网页部署、大模型部署、Agent 部署、RAG 和记忆、API 路由
- AI 工具导航：Codex、Claude Code、ChatGPT、Cursor、Vercel、GitHub 等工具说明
- 内容工作流：草稿生成、质量检查、人工审核、小批量发布、搜索可见性检查

这个项目适合用来观察一个 AI 内容站如何从零搭建，包括页面结构、工具入口、SEO 基础、GitHub 工作流、Vercel 部署和发布安全边界。

## 已有公开入口

- `/` 首页：AI 工具指南总入口
- `/office-ai` AI 办公自动化工作流
- `/prompts` 全行业 AI 提示词库
- `/deployments` AI 部署教程入口
- `/tools` AI 工具导航
- `/blog` 已人工审核的公开文章
- `/templates` 模板下载入口
- `/llms.txt` 面向 AI 助手和搜索工具的站点索引
- `/sitemap.xml` 公开可索引页面列表

## 站内工具

仓库内置了一批轻量工具页面：

- Proposal 生成器
- 报错解释器
- 项目报价助手
- AI PPT 策划与排版助手
- AI 表格整理与清洗助手
- 全行业 AI 提示词生成器
- Agent 部署与权限规划器
- 大模型部署成本选择器
- Agent 记忆与 RAG 架构规划器
- AI API 限流与成本路由检查器
- 公开文章 SEO 刷新助手

这些工具以教育和判断辅助为主，不替代人工决策，也不承诺收入、排名或交付结果。

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Markdown/MDX 内容
- Vercel 部署
- GitHub Actions 自动化检查

## 本地运行

```bash
npm install
npm run dev
npm run build
```

PowerShell 环境如果拦截 npm 脚本，可以使用：

```bash
npm.cmd run dev
npm.cmd run build
```

## 常用检查

```bash
npm run lint
npm run build
npm run project:status
npm run searchability:check -- --url=https://ai-jiedan-lab.vercel.app
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

这些检查不会发布文章，也不会调用真实 AI API。

## 内容发布规则

本项目故意把内容发布做成保守流程：

- 新内容默认是 `draft`
- draft 和 review 默认 `noindex: true`
- 未审核文章不能进入 `/blog`
- 未审核文章不能进入 `sitemap.xml`
- 公开发布必须经过人工检查
- 每次只允许小批量发布

核心流程：

```text
draft -> content:check -> human review -> review -> publish --confirm
```

没有人工确认时，发布脚本只做 dry run。

## 自动化脚本

常用脚本：

```bash
npm run content:check
npm run content:review-queue
npm run content:review-pack
npm run automation:all
npm run automation:gate
npm run traffic:evidence
```

禁止把未审核内容自动公开。这个仓库里的自动化主要用于生成报告、排查风险、整理审核队列和检查搜索可见性。

## GitHub 工作流

公开仓库重点展示：

- 一个 AI 工具内容站的页面结构
- 面向搜索和 AI 助手的 `llms.txt`
- 内容审核和发布边界
- GitHub Actions 自动化报告
- Vercel 部署和上线后检查
- 工具页、模板页、教程页之间的内链组织

相关文件：

- `.github/workflows/content-check.yml`
- `.github/workflows/review-automation.yml`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/content-task.yml`
- `docs/manual-review-checklist.md`
- `docs/seo-searchability-audit.md`
- `docs/search-console-setup.md`
- `docs/platform-connection-status.md`

## 重要边界

- 不承诺搜索排名、收入、接单成功率或平台曝光
- 不鼓励平台违规、虚假案例、批量低质内容或绕过审核
- 不把 AI 输出当作最终事实
- 医疗、法律、财务、安全和生产系统相关内容必须人工复核
- 外部工具价格、API、规则和模型能力会变化，正式使用前需要查官方文档

## 后续方向

- 增加更多可公开索引的高质量教程
- 扩展 AI 工具对比和选型页
- 增加行业 AI 工作流页面
- 补充 AI 数据分析、AI 客服、AI 电商、AI 自动化入口
- 在有真实数据后接入 Search Console、Analytics、模板销售和联盟链接
