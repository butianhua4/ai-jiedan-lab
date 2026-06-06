# Review Automation Queue

Generated at: 2026-06-06T09:42:40.594Z

This automation does not publish articles. It only ranks safe-looking draft candidates for human review.

## Guardrails

- Auto publish: false
- Next human action: Open each candidate, verify facts and risk language, then run mark:review with --confirm-human for approved files.
- Publish limit: After review, publish only 1-3 articles per batch.

## Counts

- Candidates: 629
- Returned: 25

## Rejected

- status:archived: 21
- status:published: 15

## Recommended Today

Review these first. Keep publishing to a small manual batch after fact/risk checks.

| # | Score | Batch | Category | Title | File |
| --- | --- | --- | --- | --- | --- |
| 1 | 100 | 34 | AI 部署 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 2 | 100 | 34 | AI 部署 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 3 | 100 | 34 | AI 部署 | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |

Dry-run commands:

```bash
npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
npm run mark:review -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx
```

After manual approval:

```bash
npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx --confirm-human
```

## Recommended Review Order

| # | Score | Batch | Category | Title | File |
| --- | --- | --- | --- | --- | --- |
| 1 | 100 | 34 | AI 部署 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 2 | 100 | 34 | AI 部署 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 3 | 100 | 34 | AI 部署 | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |
| 4 | 100 | 34 | AI 部署 | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx |
| 5 | 100 | 34 | AI 部署 | 大模型成本监控怎么做：按用户、功能、模型和项目拆账 | content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| 6 | 100 | 34 | AI 部署 | 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 | content/blog/multi-model-router-fallback-guide.mdx |
| 7 | 100 | 34 | AI 部署 | OpenAI Batch API 适合什么任务：批量摘要、分类、抽取和成本控制 | content/blog/openai-batch-api-cost-guide.mdx |
| 8 | 100 | 34 | AI 部署 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 9 | 100 | 33 | 接单报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 10 | 100 | 33 | AI 部署 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 11 | 100 | 33 | AI 部署 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 12 | 100 | 33 | AI 部署 | 企业微信、飞书、Slack 怎么接 AI Agent：消息入口、权限和人工接管 | content/blog/enterprise-im-ai-agent-integration-guide.mdx |
| 13 | 100 | 33 | AI 基建 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 14 | 100 | 33 | AI 部署 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 15 | 100 | 33 | AI 部署 | n8n AI Agent 接 Webhook 怎么上线：触发、鉴权、队列和失败重试 | content/blog/n8n-ai-agent-webhook-production-guide.mdx |
| 16 | 100 | 33 | AI 部署 | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 17 | 100 | 32 | AI 基建 | Agent 人工审核流程怎么设计：什么时候自动，什么时候必须人确认 | content/blog/agent-human-review-loop-guide.mdx |
| 18 | 100 | 32 | AI 基建 | Agent 记忆用 Postgres 怎么设计：用户偏好、项目事实和过期规则 | content/blog/agent-memory-postgres-schema-guide.mdx |
| 19 | 100 | 32 | AI 基建 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| 20 | 100 | 32 | AI 提示词 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| 21 | 100 | 32 | AI 部署 | 大模型 API 限流和重试怎么做：429、队列、退避和降级方案 | content/blog/llm-api-rate-limit-retry-guide.mdx |
| 22 | 100 | 32 | AI 部署 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| 23 | 100 | 32 | AI 基建 | RAG 怎么显示引用来源：文档名、页码、片段和可信度 | content/blog/rag-citation-source-trace-guide.mdx |
| 24 | 100 | 32 | AI 基建 | RAG 文档上传前怎么清洗：目录、页眉、表格、重复段落和版本号 | content/blog/rag-document-cleaning-before-upload-guide.mdx |
| 25 | 100 | 31 | AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |

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
