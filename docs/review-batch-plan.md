# Review Batch Plan

Generated at: 2026-06-14T06:15:55.191Z

This is a manual review plan. It does not publish articles or change article status.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Note: This plan only organizes manual review work. It does not change article status, noindex, or publishing state.
- Stop before: Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.

## Totals

- Planned batches: 3
- Planned candidates: 9
- Source review candidates: 25
- Source opportunities: 7

## Batch 1: Agent 部署、工具调用和记忆

- Why: Agent、记忆和工作流是高频 AI 应用词，但需要清楚解释边界和落地步骤。
- Decision rule: A human reviewer must approve facts, risk language, source freshness, and search-intent fit before any mark:review command is run.

Search queries to verify:

- AI Agent 部署教程
- Agent 记忆怎么做
- AI Agent 工具调用教程
- AI 工作流部署

Review focus:

- 解释工具调用和多步执行边界
- 明确记忆、状态和人工确认的安全边界
- 避免承诺全自动完成业务结果

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 260 | 100 | 40 | Agent and memory | AI Agent | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 2 | 260 | 100 | 40 | Agent and memory | AI 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 3 | 253 | 100 | 33 | Agent and memory | 项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |

Dry-run commands:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx
npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx
```

After explicit human approval only:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human
```

## Batch 2: RAG、知识库和向量检索

- Why: 很多团队会搜索知识库 AI，但真正需要的是可审核、可引用、可质检的方案。
- Decision rule: A human reviewer must approve facts, risk language, source freshness, and search-intent fit before any mark:review command is run.

Search queries to verify:

- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库教程
- 客服知识库 AI

Review focus:

- 区分 RAG、微调和普通提示词
- 核对向量库、引用、召回和质检说法
- 说明失败案例和人工兜底

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 254 | 100 | 34 | RAG and knowledge base | AI 部署 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 2 | 253 | 100 | 33 | Agent and memory | AI 部署 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 3 | 253 | 100 | 33 | RAG and knowledge base | AI 部署 | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |

Dry-run commands:

```bash
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
npm run mark:review -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx
npm run mark:review -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx
```

After explicit human approval only:

```bash
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx --confirm-human
```

## Batch 3: 全行业 AI 提示词和工作流模板

- Why: 提示词类内容搜索面宽，但需要从模板升级成行业流程，才更适合长期收录。
- Decision rule: A human reviewer must approve facts, risk language, source freshness, and search-intent fit before any mark:review command is run.

Search queries to verify:

- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词
- HR AI 提示词

Review focus:

- 按行业给可复制结构
- 避免空泛万能提示词
- 补充输入字段、质检标准和反例

| # | Opportunity | Score | Batch | Cluster | Category | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 260 | 100 | 40 | Industry AI prompts | AI 提示词 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2 | 252 | 100 | 32 | Industry AI prompts | AI 提示词 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| 3 | 251 | 100 | 31 | Industry AI prompts | AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |

Dry-run commands:

```bash
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
npm run mark:review -- --file=content/blog/ai-prompt-library-team-knowledge-base-guide.mdx
npm run mark:review -- --file=content/blog/data-analysis-ai-prompts-guide.mdx
```

After explicit human approval only:

```bash
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
npm run mark:review -- --file=content/blog/ai-prompt-library-team-knowledge-base-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/data-analysis-ai-prompts-guide.mdx --confirm-human
```
