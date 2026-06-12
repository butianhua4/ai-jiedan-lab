# Publish Readiness Pack

Generated at: 2026-06-12T09:10:04.443Z

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
- Cluster: Agent and memory
- Category: AI Agent
- Primary keyword: AI Agent 部署
- Search intent: informational
- Quality score: 100
- Opportunity score: 260
- Opportunity reason: Agent and memory cluster; no public article in cluster; no public article in category
- Matched content opportunity: Agent 部署、工具调用和记忆
- Opportunity why: Agent、记忆和工作流是高频 AI 应用词，但需要清楚解释边界和落地步骤。
- Chinese chars: 1540
- Internal links: 6
- Description: 面向新手解释 AI Agent 部署流程，覆盖 Vercel AI SDK、工具调用、多步执行、停止条件、日志、权限、人工接管和上线检查。
- Source notes: 已于 2026-06-12 按 Vercel AI SDK 官方 Agents、ToolLoopAgent、tool calling、human-in-the-loop 文档核对核心概念；结合实际 Web 应用部署流程整理。正式公开前仍需人工复核 API 示例、版本和平台限制。

Human decision checklist:

- Article remains draft before approval: true
- Article remains noindex before approval: true
- Human review is required: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has at least one internal link: true
- Opening section directly answers the search query.
- Reviewer can explain why this article should be public now instead of staying draft.

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform rules, payments, messaging, or review systems.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing tool limits, pricing, model names, and deployment steps are verified against official docs.
- Automation claims include human approval, permissions, logging, and rollback boundaries.
- Deployment guidance includes environment variables, rate limits, smoke checks, and failure handling.

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.
- Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.
- 解释工具调用和多步执行边界
- 明确记忆、状态和人工确认的安全边界
- 避免承诺全自动完成业务结果

Official source targets:

- Vercel AI SDK docs: https://ai-sdk.dev/docs

Fact-check queries:

- AI Agent 部署 官方文档 最新
- AI Agent 部署 official docs latest
- AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 事实核对
- AI Agent 平台限制 官方文档
- AI Agent 部署教程
- Agent 记忆怎么做
- AI Agent 工具调用教程
- AI 工作流部署

Commands:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 2. 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Cluster: Industry AI prompts
- Category: AI 提示词
- Primary keyword: 全行业 AI 提示词模板
- Search intent: informational
- Quality score: 100
- Opportunity score: 260
- Opportunity reason: Industry AI prompts cluster; no public article in cluster; no public article in category
- Matched content opportunity: 全行业 AI 提示词和工作流模板
- Opportunity why: 提示词类内容搜索面宽，但需要从模板升级成行业流程，才更适合长期收录。
- Chinese chars: 1862
- Internal links: 6
- Description: 整理全行业 AI 提示词模板库的搭建方法，覆盖销售、运营、客服、HR、财务、教育、产品和研发场景，重点讲分类、输入、输出、审核和复用。
- Source notes: 已于 2026-06-12 按 OpenAI 官方 prompt engineering / prompt guidance 文档核对提示词结构原则；结合团队知识库实践和行业 SOP 设计经验整理。正式公开前仍需人工核对示例、行业边界和敏感内容。

Human decision checklist:

- Article remains draft before approval: true
- Article remains noindex before approval: true
- Human review is required: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has at least one internal link: true
- Opening section directly answers the search query.
- Reviewer can explain why this article should be public now instead of staying draft.

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform rules, payments, messaging, or review systems.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing tool limits, pricing, model names, and deployment steps are verified against official docs.
- Knowledge base claims distinguish retrieval quality, citations, and hallucination risk.
- Prompt examples include inputs, output criteria, and review steps instead of vague universal prompts.

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.
- Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.
- 按行业给可复制结构
- 避免空泛万能提示词
- 补充输入字段、质检标准和反例

Official source targets:

- OpenAI docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 全行业 AI 提示词模板 官方文档 最新
- 全行业 AI 提示词模板 official docs latest
- 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 事实核对
- AI 提示词 平台限制 官方文档
- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词

Commands:

```bash
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 3. 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Cluster: RAG and knowledge base
- Category: AI 部署
- Primary keyword: 客服 AI 模型选型
- Search intent: informational
- Quality score: 100
- Opportunity score: 254
- Opportunity reason: RAG and knowledge base cluster; no public article in cluster; no public article in category
- Matched content opportunity: RAG、知识库和向量检索
- Opportunity why: 很多团队会搜索知识库 AI，但真正需要的是可审核、可引用、可质检的方案。
- Chinese chars: 1232
- Internal links: 4
- Description: 整理客服 AI 模型选型方法，覆盖响应速度、成本、知识库、情绪识别、转人工、质检、上下文长度和安全边界。
- Source notes: 已于 2026-06-12 按 OpenAI Agents guardrails / human review 文档和 Vercel AI SDK tool calling / agent 文档核对高风险动作、人工接管、工具调用边界；结合多模型路由、RAG、客服提示词和生产客服系统风险整理。正式发布前仍需人工核对具体平台规则。

Human decision checklist:

- Article remains draft before approval: true
- Article remains noindex before approval: true
- Human review is required: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has at least one internal link: true
- Opening section directly answers the search query.
- Reviewer can explain why this article should be public now instead of staying draft.

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform rules, payments, messaging, or review systems.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing tool limits, pricing, model names, and deployment steps are verified against official docs.
- Knowledge base claims distinguish retrieval quality, citations, and hallucination risk.
- Prompt examples include inputs, output criteria, and review steps instead of vague universal prompts.

Review focus:

- Verify the opening answer matches the title and search intent.
- Check facts, tool names, limits, and platform policy wording.
- Confirm risk reminders are cautionary and do not imply guaranteed outcomes.
- Confirm internal links and CTA point to relevant site pages.
- Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.
- 区分 RAG、微调和普通提示词
- 核对向量库、引用、召回和质检说法
- 说明失败案例和人工兜底

Official source targets:

- OpenAI docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 客服 AI 模型选型 官方文档 最新
- 客服 AI 模型选型 official docs latest
- 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 事实核对
- AI 部署 平台限制 官方文档
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库教程
- 客服知识库 AI

Commands:

```bash
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```
