# Search Query Match Audit

Generated at: 2026-06-09T05:45:41.244Z

This report is read-only. It checks whether planned query variants are visible in article metadata, headings, and body copy before human review.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Use review suggestions during human review. Do not change status or publish without explicit human approval.
- Note: Read-only search-query match audit. It checks whether planned query variants are reflected in title, description, headings, and body. It does not edit articles.

## Summary

- averageExactMatches: 1.42
- averageMatchedFamilies: 7
- blockingItems: 0
- items: 12
- queryCoverageItems: 12
- queryCoverageUniqueQueries: 360
- readyItems: 12
- warningItems: 8

## Source Evidence

- Note: Blocking issues cover basic search alignment only. Warnings are review-time expansion suggestions and do not make a safe draft publishable.
- Query coverage guardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only search-query coverage planner. Query variants are editorial review prompts, not measured search volume, ranking, click, or traffic claims.","stopBefore":"Use the query list to guide human review and content expansion. Do not publish or mark review without explicit human approval."}

## Blocking Items

- none

## Warning Items

| Ready | Wave | Title hit | Description hit | Exact queries | Families | Blocking | Warnings | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | 2 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| true | 2 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| true | 2 | true | true | 0/36 | 7 | none | few exact query variant matches in article text | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| true | 3 | true | true | 0/36 | 7 | none | few exact query variant matches in article text | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| true | 3 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | 4 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| true | 4 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |

## All Items

| Ready | Wave | Title hit | Description hit | Exact queries | Families | Blocking | Warnings | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1 | true | true | 4/35 | 7 | none | none | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | 1 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | 1 | true | true | 4/35 | 7 | none | none | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 2 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| true | 2 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| true | 2 | true | true | 0/36 | 7 | none | few exact query variant matches in article text | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| true | 3 | true | true | 0/36 | 7 | none | few exact query variant matches in article text | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| true | 3 | true | true | 3/35 | 7 | none | none | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | 3 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | 4 | true | true | 1/35 | 7 | none | few exact query variant matches in article text | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| true | 4 | true | true | 2/35 | 7 | none | none | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| true | 4 | true | true | 0/35 | 7 | none | few exact query variant matches in article text | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Wave: 1
- Primary keyword: 客服 AI 模型选型
- Warning issues: few exact query variant matches in article text

Review suggestions:


### 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用

- File: content/blog/ai-prompt-library-team-knowledge-base-guide.mdx
- Wave: 2
- Primary keyword: 团队 AI 提示词库
- Warning issues: few exact query variant matches in article text

Review suggestions:


### 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要

- File: content/blog/data-analysis-ai-prompts-guide.mdx
- Wave: 2
- Primary keyword: 数据分析 AI 提示词
- Warning issues: few exact query variant matches in article text

Review suggestions:


### Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底

- File: content/blog/dify-workflow-error-handling-guide.mdx
- Wave: 2
- Primary keyword: Dify 工作流错误处理
- Warning issues: few exact query variant matches in article text

Review suggestions:


### Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流

- File: content/blog/open-webui-functions-pipelines-deployment-guide.mdx
- Wave: 3
- Primary keyword: Open WebUI Functions Pipelines
- Warning issues: few exact query variant matches in article text

Review suggestions:


### AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Wave: 3
- Primary keyword: AI 自动化项目报价
- Warning issues: few exact query variant matches in article text

Review suggestions:


### 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断

- File: content/blog/customer-service-ai-prompts-guide.mdx
- Wave: 4
- Primary keyword: 客服 AI 提示词
- Warning issues: few exact query variant matches in article text

Review suggestions:


### Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核

- File: content/blog/dify-workflow-vs-agent-guide.mdx
- Wave: 4
- Primary keyword: Dify Workflow 和 Agent 区别
- Warning issues: few exact query variant matches in article text

Review suggestions:

