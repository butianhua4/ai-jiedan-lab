# Next Public Content Expansion Plan

Generated at: 2026-06-12

This plan is for human review and publishing coordination. It does not mark drafts for review, publish articles, or claim traffic.

## Current Evidence

- Public articles: 15
- Live missing from sitemap: 0
- Searchability score: 100
- Search Console / analytics traffic evidence: not available in repo reports
- Broad AI demand clusters without public coverage: 8
- Review-ready drafts available: 633
- AI deployment review pack: 10 safe candidates
- Industry prompt review pack: 12 safe candidates
- Popular prompt bridge: 27 candidates, 0 publish-confirm commands

## Expansion Goal

Move the site from a small Codex/Vercel-heavy public surface to a broader AI tools guide:

- AI deployment: large model deployment, API routing, keys, rate limits, smoke checks
- Agent deployment: tool calling, MCP, permissions, logs, human approval
- Memory and RAG: knowledge bases, vector search, citations, privacy boundaries
- Office AI: PPT, Excel/table cleanup, weekly reports, meeting notes
- Industry prompts: sales, customer service, operations, ecommerce, HR, education, finance

## First Review Batch

These should be checked first because they cover broad search intent and currently have no matching public article.

| Priority | Area | Candidate | File |
| ---: | --- | --- | --- |
| 1 | Prompt library | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | `content/blog/industry-ai-prompts-template-library-2026.mdx` |
| 2 | Agent deployment | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | `content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx` |
| 3 | Memory / RAG | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | `content/blog/ai-agent-memory-rag-design-guide.mdx` |
| 4 | Customer service | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | `content/blog/customer-service-ai-prompts-guide.mdx` |
| 5 | Sales | 销售 AI 提示词模板：客户画像、跟进话术、异议处理和会议纪要 | `content/blog/sales-ai-prompts-guide.mdx` |
| 6 | Ecommerce | 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 | `content/blog/ecommerce-ai-prompts-guide.mdx` |
| 7 | Data / Excel | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | `content/blog/data-analysis-ai-prompts-guide.mdx` |
| 8 | LLM deployment | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | `content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx` |
| 9 | API security | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | `content/blog/ai-api-key-security-rotation-guide.mdx` |
| 10 | No-code AI | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | `content/blog/dify-workflow-vs-agent-guide.mdx` |
| 11 | MCP / security | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | `content/blog/mcp-server-deployment-security-checklist.mdx` |
| 12 | Office AI | AI 做 PPT 怎么开始：新手从大纲到成稿的流程 | `content/blog/ai-ppt-beginner-guide.mdx` |

## Second Review Batch

Use these after the first batch has been checked for factual freshness and internal-link conflicts.

| Area | Candidate | File |
| --- | --- | --- |
| Operations prompts | 运营 AI 提示词模板：周报、SOP、活动计划、复盘和数据解释 | `content/blog/operations-ai-prompts-guide.mdx` |
| HR prompts | 人力招聘 AI 提示词模板：JD、简历初筛、面试题和培训材料 | `content/blog/hr-recruiting-ai-prompts-guide.mdx` |
| Education prompts | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | `content/blog/education-ai-prompts-guide.mdx` |
| Finance prompts | 财务 AI 提示词模板：报表摘要、费用分类、预算复盘和风险清单 | `content/blog/finance-ai-prompts-guide.mdx` |
| Product prompts | 产品经理 AI 提示词模板：需求分析、PRD、竞品、用户故事和验收标准 | `content/blog/product-manager-ai-prompts-guide.mdx` |
| Marketing prompts | 营销 AI 提示词模板：选题、广告文案、SEO 和活动复盘怎么写 | `content/blog/marketing-ai-prompts-guide.mdx` |
| n8n RAG memory | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | `content/blog/n8n-ai-agent-rag-memory-guide.mdx` |
| Dify errors | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | `content/blog/dify-workflow-error-handling-guide.mdx` |
| Model serving | 大模型部署成本和延迟怎么估算：上线前检查清单 | `content/blog/llm-serving-cost-latency-checklist.mdx` |
| Table cleanup | AI 表格整理、清洗、分类和复盘相关内容应和 `/tools/spreadsheet-cleaner` 互链 | existing draft pool |

## Review Rules

- Keep every candidate as draft/noindex until a human approves it.
- Do not run `mark:review` without explicit approval.
- Do not run publish confirm without separate explicit approval.
- Verify current official docs for APIs, SDK names, model names, pricing, rate limits, deployment commands, and platform policies.
- Remove or rewrite any claim about traffic, income, rankings, conversion, or guaranteed results.
- For Agent/MCP/RAG articles, require permissions, human approval, logs, privacy, citations, and rollback boundaries.
- For prompt articles, require input fields, output format, quality checks, negative examples, and human escalation rules.

## Practical Next Step

If the first batch passes human review, it can raise the public article count from 15 toward 25-27 without changing the site strategy into a pure service site. The positioning remains: useful AI tools, tutorials, templates, and reviewable workflows first; monetization tools later.
