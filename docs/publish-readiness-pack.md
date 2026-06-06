# Publish Readiness Pack

Generated at: 2026-06-06T09:47:23.842Z

This pack organizes manual review work. It does not publish articles or change article status.

## Guardrails

- Auto publish: false
- Required human action: Read the article, verify factual claims and risk language, then mark review manually.
- Publish rule: Only publish status=review articles, 1-3 per batch, after a second dry-run.

## Summary

- Requested: 3
- Included: 3

## 1. AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Category: AI 部署
- Primary keyword: AI API Key 安全管理
- Search intent: informational
- Quality score: 100
- Chinese chars: 1270
- Internal links: 3
- Description: 整理 AI API Key 安全管理清单，覆盖环境变量、最小权限、服务端调用、密钥轮换、日志脱敏、泄露应急和客户交付。

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.

Commands:

```bash
npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx
npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 2. 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Category: AI 部署
- Primary keyword: 客服 AI 模型选型
- Search intent: informational
- Quality score: 100
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

## 3. Claude API Rate limit reached 怎么办：限流、上下文、重试和降级

- File: content/blog/claude-api-rate-limit-debug-guide.mdx
- Category: AI 部署
- Primary keyword: Claude API rate limit reached
- Search intent: informational
- Quality score: 100
- Chinese chars: 1305
- Internal links: 3
- Description: 面向新手整理 Claude API rate limit reached 的排查方法，覆盖 token、RPM、上下文长度、重试、队列、降级和日志。

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.

Commands:

```bash
npm run mark:review -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx
npm run publish:articles -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```
