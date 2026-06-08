# Review Automation Queue

Generated at: 2026-06-08T12:15:02.931Z

This automation does not publish articles. It only ranks safe-looking draft candidates for human review.

## Guardrails

- Auto publish: false
- Next human action: Open each candidate, verify facts and risk language, then run mark:review with --confirm-human for approved files.
- Publish limit: After review, publish only 1-3 articles per batch.

## Counts

- Candidates: 633
- Returned: 25

## Rejected

- status:archived: 21
- status:published: 15

## Recommended Today

Review these first. Keep publishing to a small manual batch after fact/risk checks.

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 260 | 100 | 40 | Agent and memory | AI Agent | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 2 | 260 | 100 | 40 | Industry AI prompts | AI 提示词 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 3 | 254 | 100 | 34 | RAG and knowledge base | AI 部署 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |

Dry-run commands:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
```

After manual approval:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
```

## Recommended Review Order

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 260 | 100 | 40 | Agent and memory | AI Agent | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 2 | 260 | 100 | 40 | Agent and memory | AI 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 3 | 260 | 100 | 40 | Industry AI prompts | AI 提示词 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 4 | 254 | 100 | 34 | RAG and knowledge base | AI 部署 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 5 | 253 | 100 | 33 | Agent and memory | 接单报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 6 | 253 | 100 | 33 | Agent and memory | AI 部署 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 7 | 253 | 100 | 33 | Agent and memory | AI 部署 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 8 | 253 | 100 | 33 | Agent and memory | AI 部署 | 企业微信、飞书、Slack 怎么接 AI Agent：消息入口、权限和人工接管 | content/blog/enterprise-im-ai-agent-integration-guide.mdx |
| 9 | 253 | 100 | 33 | Agent and memory | AI 部署 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 10 | 253 | 100 | 33 | Agent and memory | AI 部署 | n8n AI Agent 接 Webhook 怎么上线：触发、鉴权、队列和失败重试 | content/blog/n8n-ai-agent-webhook-production-guide.mdx |
| 11 | 253 | 100 | 33 | RAG and knowledge base | AI 部署 | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 12 | 252 | 100 | 32 | Agent and memory | AI 基建 | Agent 人工审核流程怎么设计：什么时候自动，什么时候必须人确认 | content/blog/agent-human-review-loop-guide.mdx |
| 13 | 252 | 100 | 32 | Agent and memory | AI 基建 | Agent 记忆用 Postgres 怎么设计：用户偏好、项目事实和过期规则 | content/blog/agent-memory-postgres-schema-guide.mdx |
| 14 | 252 | 100 | 32 | Agent and memory | AI 基建 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| 15 | 252 | 100 | 32 | Industry AI prompts | AI 提示词 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| 16 | 252 | 100 | 32 | RAG and knowledge base | AI 基建 | RAG 怎么显示引用来源：文档名、页码、片段和可信度 | content/blog/rag-citation-source-trace-guide.mdx |
| 17 | 252 | 100 | 32 | RAG and knowledge base | AI 基建 | RAG 文档上传前怎么清洗：目录、页眉、表格、重复段落和版本号 | content/blog/rag-document-cleaning-before-upload-guide.mdx |
| 18 | 251 | 100 | 31 | Industry AI prompts | AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| 19 | 251 | 100 | 31 | Industry AI prompts | AI 提示词 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| 20 | 251 | 100 | 31 | Industry AI prompts | AI 提示词 | 医疗行政 AI 提示词模板：病历摘要、随访问卷和宣教材料怎么安全写 | content/blog/healthcare-admin-ai-prompts-guide.mdx |
| 21 | 251 | 100 | 31 | Industry AI prompts | AI 提示词 | 制造业 AI 提示词模板：SOP、质检记录、设备故障和生产复盘 | content/blog/manufacturing-ai-prompts-guide.mdx |
| 22 | 251 | 100 | 31 | Industry AI prompts | AI 提示词 | 运营 AI 提示词模板：周报、SOP、活动计划、复盘和数据解释 | content/blog/operations-ai-prompts-guide.mdx |
| 23 | 251 | 100 | 31 | Industry AI prompts | AI 提示词 | 产品经理 AI 提示词模板：需求分析、PRD、竞品、用户故事和验收标准 | content/blog/product-manager-ai-prompts-guide.mdx |
| 24 | 251 | 100 | 31 | Industry AI prompts | AI 提示词 | 房产 AI 提示词模板：房源文案、客户需求分析、带看记录和风险提醒 | content/blog/real-estate-ai-prompts-guide.mdx |
| 25 | 251 | 100 | 31 | Industry AI prompts | AI 提示词 | 软件开发 AI 提示词模板：需求拆解、代码审查、Bug 排查和测试用例 | content/blog/software-development-ai-prompts-guide.mdx |

## Commands

Dry-run one candidate before marking review:

```bash
npm run mark:review -- --file=content/blog/example.mdx
```

After manual approval:

```bash
npm run mark:review -- --file=content/blog/example.mdx --confirm-human
npm run publish:articles -- --file=content/blog/example.mdx
npm run publish:articles -- --file=content/blog/example.mdx --confirm
```
