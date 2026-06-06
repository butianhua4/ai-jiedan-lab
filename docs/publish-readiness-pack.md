# Publish Readiness Pack

Generated at: 2026-06-06T10:58:35.725Z

This pack organizes manual review work. It does not publish articles or change article status.

## Guardrails

- Auto publish: false
- Required human action: Read the article, verify factual claims and risk language, then mark review manually.
- Publish rule: Only publish status=review articles, 1-3 per batch, after a second dry-run.

## Summary

- Requested: 3
- Included: 3

## 1. AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Category: AI Agent
- Primary keyword: AI Agent 部署
- Search intent: informational
- Quality score: 100
- Opportunity score: 260
- Opportunity reason: Agent and memory cluster; no public article in cluster; no public article in category
- Chinese chars: 1540
- Internal links: 6
- Description: 面向新手解释 AI Agent 部署流程，覆盖 Vercel AI SDK、工具调用、多步执行、停止条件、日志、权限、人工接管和上线检查。
- Source notes: 参考 Vercel 官方 AI SDK Agent 文档和实际 Web 应用部署流程整理；正式公开前需要人工核对 API 示例、版本和平台限制。

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.
- Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.

Official source targets:

- Vercel AI SDK docs: https://ai-sdk.dev/docs

Fact-check queries:

- AI Agent 部署 官方文档 最新
- AI Agent 部署 official docs latest
- AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 事实核对
- AI Agent 平台限制 官方文档

Commands:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 2. 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Category: AI 提示词
- Primary keyword: 全行业 AI 提示词模板
- Search intent: informational
- Quality score: 100
- Opportunity score: 260
- Opportunity reason: Industry AI prompts cluster; no public article in cluster; no public article in category
- Chinese chars: 1862
- Internal links: 6
- Description: 整理全行业 AI 提示词模板库的搭建方法，覆盖销售、运营、客服、HR、财务、教育、产品和研发场景，重点讲分类、输入、输出、审核和复用。
- Source notes: 参考 OpenAI prompt engineering 官方指南、团队知识库实践和行业 SOP 设计经验整理；正式公开前需要人工核对示例、行业边界和敏感内容。

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.
- Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.

Official source targets:

- OpenAI docs: https://platform.openai.com/docs

Fact-check queries:

- 全行业 AI 提示词模板 官方文档 最新
- 全行业 AI 提示词模板 official docs latest
- 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 事实核对
- AI 提示词 平台限制 官方文档

Commands:

```bash
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 3. 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Category: AI 部署
- Primary keyword: 客服 AI 模型选型
- Search intent: informational
- Quality score: 100
- Opportunity score: 254
- Opportunity reason: RAG and knowledge base cluster; no public article in cluster; no public article in category
- Chinese chars: 1232
- Internal links: 4
- Description: 整理客服 AI 模型选型方法，覆盖响应速度、成本、知识库、情绪识别、转人工、质检、上下文长度和安全边界。
- Source notes: 结合多模型路由、RAG、客服提示词和生产客服系统风险整理；正式发布前需要人工核对具体平台规则。

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.
- Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.

Official source targets:

- General official docs search: verify the primary keyword against current vendor documentation before approval.

Fact-check queries:

- 客服 AI 模型选型 官方文档 最新
- 客服 AI 模型选型 official docs latest
- 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 事实核对
- AI 部署 平台限制 官方文档

Commands:

```bash
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```
