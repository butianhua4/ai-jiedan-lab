# Publish Readiness Pack

Generated at: 2026-06-06T09:59:42.270Z

This pack organizes manual review work. It does not publish articles or change article status.

## Guardrails

- Auto publish: false
- Required human action: Read the article, verify factual claims and risk language, then mark review manually.
- Publish rule: Only publish status=review articles, 1-3 per batch, after a second dry-run.

## Summary

- Requested: 3
- Included: 3

## 1. 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

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

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.

Commands:

```bash
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 2. AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Category: 接单报价
- Primary keyword: AI 自动化项目报价
- Search intent: informational
- Quality score: 100
- Opportunity score: 253
- Opportunity reason: Agent and memory cluster; no public article in cluster; no public article in category
- Chinese chars: 1303
- Internal links: 4
- Description: 整理 AI 自动化项目报价思路，覆盖需求范围、工具选型、RAG、Agent、部署、维护、验收标准和风险边界。

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.

Commands:

```bash
npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx
npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 3. 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用

- File: content/blog/ai-prompt-library-team-knowledge-base-guide.mdx
- Category: AI 提示词
- Primary keyword: 团队 AI 提示词库
- Search intent: informational
- Quality score: 100
- Opportunity score: 252
- Opportunity reason: Industry AI prompts cluster; no public article in cluster; no public article in category
- Chinese chars: 1269
- Internal links: 3
- Description: 讲清团队提示词库的搭建方式，覆盖行业分类、版本管理、示例输出、适用边界、审核流程、失败案例和工具导航。

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.

Commands:

```bash
npm run mark:review -- --file=content/blog/ai-prompt-library-team-knowledge-base-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-prompt-library-team-knowledge-base-guide.mdx
npm run publish:articles -- --file=content/blog/ai-prompt-library-team-knowledge-base-guide.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```
