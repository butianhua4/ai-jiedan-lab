# Next Review Source Pack

Generated at: 2026-06-06T12:51:27.759Z

This pack is read-only. It prepares official-source, fact-check, approval, and risk-review work for the roadmap's next review files.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Stop before: Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.
- Note: This pack prepares source review work for the roadmap's next review files. It does not change article status, noindex, or publishing state.

## Summary

- items: 19
- missingApprovalChecks: 0
- missingFactCheckQueries: 0
- missingOfficialSources: 0
- missingRiskChecks: 0
- roadmapNextReviewFiles: 19
- safeDraftItems: 19
- unsafeItems: 0

## Items

| Safe | Current | Planned | Score | Sources | Queries | Risk checks | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | false | true | 100 | 8 | 8 | 8 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | true | true | 100 | 5 | 8 | 6 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | false | true | 100 | 7 | 8 | 7 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | true | true | 100 | 3 | 8 | 6 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | true | true | 100 | 3 | 9 | 6 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | false | true | 100 | 3 | 9 | 5 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| true | false | true | 100 | 3 | 9 | 5 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| true | false | false | 100 | 3 | 9 | 5 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| true | false | false | 100 | 5 | 8 | 7 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| true | false | false | 100 | 4 | 8 | 6 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| true | false | true | 100 | 7 | 8 | 6 | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| true | false | false | 100 | 5 | 8 | 7 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| true | false | false | 100 | 3 | 8 | 5 | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx |
| true | false | false | 100 | 6 | 8 | 7 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| true | false | false | 100 | 7 | 8 | 6 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| true | false | false | 100 | 3 | 8 | 5 | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |
| true | false | false | 100 | 4 | 8 | 5 | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx |
| true | false | false | 100 | 8 | 8 | 6 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| true | false | false | 100 | 7 | 8 | 5 | 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 | content/blog/ecommerce-ai-prompts-guide.mdx |

## AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界

- File: content/blog/ai-agent-memory-rag-design-guide.mdx
- Lane: deployment: RAG、知识库和向量检索
- Lane priority score: 348
- Category: AI 记忆
- Primary keyword: AI Agent 记忆
- Search intent: informational
- Publish batch: 40
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1701
- Internal links: 6

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- AI Agent 记忆 official docs latest
- AI Agent 记忆 official documentation current limits
- AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 fact check official docs
- AI 记忆 official docs limits pricing changelog
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库 RAG 教程
- RAG 评测怎么做

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- 文档清洗
- chunk
- embedding
- metadata
- 引用来源
- 测试集

## 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Lane: deployment: RAG、知识库和向量检索
- Lane priority score: 348
- Category: AI 部署
- Primary keyword: 客服 AI 模型选型
- Search intent: informational
- Publish batch: 34
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1232
- Internal links: 4

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 客服 AI 模型选型 official docs latest
- 客服 AI 模型选型 official documentation current limits
- 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 fact check official docs
- AI 部署 official docs limits pricing changelog
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库 RAG 教程
- RAG 评测怎么做

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- 文档清洗
- chunk
- embedding
- metadata
- 引用来源
- 测试集

## AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Lane: deployment: RAG、知识库和向量检索
- Lane priority score: 348
- Category: 接单报价
- Primary keyword: AI 自动化项目报价
- Search intent: informational
- Publish batch: 33
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1303
- Internal links: 4

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Dify docs: https://docs.dify.ai
- n8n docs: https://docs.n8n.io

Fact-check queries:

- AI 自动化项目报价 official docs latest
- AI 自动化项目报价 official documentation current limits
- AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 fact check official docs
- 接单报价 official docs limits pricing changelog
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库 RAG 教程
- RAG 评测怎么做

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 文档清洗
- chunk
- embedding
- metadata
- 引用来源
- 测试集

## AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Lane: deployment: Agent 部署、工具调用和工作流
- Lane priority score: 338
- Category: AI Agent
- Primary keyword: AI Agent 部署
- Search intent: informational
- Publish batch: 40
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1540
- Internal links: 6

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://python.langchain.com/docs

Fact-check queries:

- AI Agent 部署 official docs latest
- AI Agent 部署 official documentation current limits
- AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 fact check official docs
- AI Agent official docs limits pricing changelog
- AI Agent 部署教程
- Agent 工具调用教程
- AI 工作流部署
- Agent 人工审核流程

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 工具白名单
- 多步执行
- 人工确认
- 失败重试
- 日志追踪

## 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Lane: content-backlog: 全行业 AI 提示词和工作流模板
- Lane priority score: 334
- Category: AI 提示词
- Primary keyword: 全行业 AI 提示词模板
- Search intent: informational
- Publish batch: 40
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1862
- Internal links: 6

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- Use the article's publish readiness pack or official vendor docs listed in coverage reports before approval.
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 全行业 AI 提示词模板 official docs latest
- 全行业 AI 提示词模板 official documentation current limits
- 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 fact check official docs
- AI 提示词 official docs limits pricing changelog
- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词
- HR AI 提示词

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- search intent
- fact review
- risk language
- internal links

## 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用

- File: content/blog/ai-prompt-library-team-knowledge-base-guide.mdx
- Lane: content-backlog: 全行业 AI 提示词和工作流模板
- Lane priority score: 334
- Category: AI 提示词
- Primary keyword: 团队 AI 提示词库
- Search intent: informational
- Publish batch: 32
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1269
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- Use the article's publish readiness pack or official vendor docs listed in coverage reports before approval.
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 团队 AI 提示词库 official docs latest
- 团队 AI 提示词库 official documentation current limits
- 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 fact check official docs
- AI 提示词 official docs limits pricing changelog
- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词
- HR AI 提示词

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- search intent
- fact review
- risk language
- internal links

## 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要

- File: content/blog/data-analysis-ai-prompts-guide.mdx
- Lane: content-backlog: 全行业 AI 提示词和工作流模板
- Lane priority score: 334
- Category: AI 提示词
- Primary keyword: 数据分析 AI 提示词
- Search intent: informational
- Publish batch: 31
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1229
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- Use the article's publish readiness pack or official vendor docs listed in coverage reports before approval.
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 数据分析 AI 提示词 official docs latest
- 数据分析 AI 提示词 official documentation current limits
- 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 fact check official docs
- AI 提示词 official docs limits pricing changelog
- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词
- HR AI 提示词

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- search intent
- fact review
- risk language
- internal links

## 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划

- File: content/blog/education-ai-prompts-guide.mdx
- Lane: content-backlog: 全行业 AI 提示词和工作流模板
- Lane priority score: 334
- Category: AI 提示词
- Primary keyword: 教育 AI 提示词
- Search intent: informational
- Publish batch: 31
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1243
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- Use the article's publish readiness pack or official vendor docs listed in coverage reports before approval.
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 教育 AI 提示词 official docs latest
- 教育 AI 提示词 official documentation current limits
- 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 fact check official docs
- AI 提示词 official docs limits pricing changelog
- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词
- HR AI 提示词

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- search intent
- fact review
- risk language
- internal links

## Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底

- File: content/blog/dify-workflow-error-handling-guide.mdx
- Lane: deployment: Agent 部署、工具调用和工作流
- Lane priority score: 338
- Category: AI 部署
- Primary keyword: Dify 工作流错误处理
- Search intent: informational
- Publish batch: 33
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1366
- Internal links: 4

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://python.langchain.com/docs
- Dify docs: https://docs.dify.ai
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval

Fact-check queries:

- Dify 工作流错误处理 official docs latest
- Dify 工作流错误处理 official documentation current limits
- Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 fact check official docs
- AI 部署 official docs limits pricing changelog
- AI Agent 部署教程
- Agent 工具调用教程
- AI 工作流部署
- Agent 人工审核流程

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 工具白名单
- 多步执行
- 人工确认
- 失败重试
- 日志追踪

## Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核

- File: content/blog/dify-workflow-vs-agent-guide.mdx
- Lane: deployment: Agent 部署、工具调用和工作流
- Lane priority score: 338
- Category: AI 部署
- Primary keyword: Dify Workflow 和 Agent 区别
- Search intent: informational
- Publish batch: 33
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1288
- Internal links: 5

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://python.langchain.com/docs
- Dify docs: https://docs.dify.ai

Fact-check queries:

- Dify Workflow 和 Agent 区别 official docs latest
- Dify Workflow 和 Agent 区别 official documentation current limits
- Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 fact check official docs
- AI 部署 official docs limits pricing changelog
- AI Agent 部署教程
- Agent 工具调用教程
- AI 工作流部署
- Agent 人工审核流程

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 工具白名单
- 多步执行
- 人工确认
- 失败重试
- 日志追踪

## Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流

- File: content/blog/open-webui-functions-pipelines-deployment-guide.mdx
- Lane: deployment: RAG、知识库和向量检索
- Lane priority score: 348
- Category: AI 部署
- Primary keyword: Open WebUI Functions Pipelines
- Search intent: informational
- Publish batch: 33
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1263
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI API docs: https://platform.openai.com/docs
- n8n docs: https://docs.n8n.io
- Ollama docs: https://docs.ollama.com

Fact-check queries:

- Open WebUI Functions Pipelines official docs latest
- Open WebUI Functions Pipelines official documentation current limits
- Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 fact check official docs
- AI 部署 official docs limits pricing changelog
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库 RAG 教程
- RAG 评测怎么做

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 文档清洗
- chunk
- embedding
- metadata
- 引用来源
- 测试集

## 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型

- File: content/blog/local-llm-vram-not-enough-guide.mdx
- Lane: deployment: 本地模型和开源模型部署
- Lane priority score: 310
- Category: AI 部署
- Primary keyword: 本地部署大模型显存不够
- Search intent: informational
- Publish batch: 32
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1312
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- Ollama docs: https://docs.ollama.com
- vLLM docs: https://docs.vllm.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval

Fact-check queries:

- 本地部署大模型显存不够 official docs latest
- 本地部署大模型显存不够 official documentation current limits
- 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 fact check official docs
- AI 部署 official docs limits pricing changelog
- 本地部署大模型教程
- Ollama 本地部署
- Open WebUI Ollama 部署
- 本地大模型显存不够

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 硬件估算
- 模型下载
- 本地 API
- 量化
- 网页聊天

## Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit

- File: content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx
- Lane: deployment: 本地模型和开源模型部署
- Lane priority score: 310
- Category: AI 基建
- Primary keyword: Docker 使用 NVIDIA GPU
- Search intent: informational
- Publish batch: 29
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1210
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- Ollama docs: https://docs.ollama.com
- vLLM docs: https://docs.vllm.ai
- Hugging Face docs: https://huggingface.co/docs

Fact-check queries:

- Docker 使用 NVIDIA GPU official docs latest
- Docker 使用 NVIDIA GPU official documentation current limits
- Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit fact check official docs
- AI 基建 official docs limits pricing changelog
- 本地部署大模型教程
- Ollama 本地部署
- Open WebUI Ollama 部署
- 本地大模型显存不够

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 硬件估算
- 模型下载
- 本地 API
- 量化
- 网页聊天

## 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查

- File: content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx
- Lane: content-backlog: Ollama、vLLM 和开源模型本地部署
- Lane priority score: 300
- Category: AI 部署
- Primary keyword: 大模型部署
- Search intent: informational
- Publish batch: 40
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1537
- Internal links: 6

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- Use the article's publish readiness pack or official vendor docs listed in coverage reports before approval.
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- vLLM docs: https://docs.vllm.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval

Fact-check queries:

- 大模型部署 official docs latest
- 大模型部署 official documentation current limits
- 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 fact check official docs
- AI 部署 official docs limits pricing changelog
- Ollama 本地部署教程
- vLLM 部署教程
- 本地大模型部署
- 开源大模型部署教程

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- search intent
- fact review
- risk language
- internal links

## AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Lane: deployment: 模型 API 接入、限流和多模型降级
- Lane priority score: 298
- Category: AI 部署
- Primary keyword: AI API Key 安全管理
- Search intent: informational
- Publish batch: 34
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1270
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Google AI docs: https://ai.google.dev/docs
- Dify docs: https://docs.dify.ai
- n8n docs: https://docs.n8n.io

Fact-check queries:

- AI API Key 安全管理 official docs latest
- AI API Key 安全管理 official documentation current limits
- AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 fact check official docs
- AI 部署 official docs limits pricing changelog
- OpenAI API Next.js
- Claude API 接入
- Gemini API Next.js
- API rate limit 怎么办

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 服务端调用
- 限流重试
- 降级模型
- 成本控制
- Key 轮换

## Claude API Rate limit reached 怎么办：限流、上下文、重试和降级

- File: content/blog/claude-api-rate-limit-debug-guide.mdx
- Lane: deployment: 模型 API 接入、限流和多模型降级
- Lane priority score: 298
- Category: AI 部署
- Primary keyword: Claude API rate limit reached
- Search intent: informational
- Publish batch: 34
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1305
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents

Fact-check queries:

- Claude API rate limit reached official docs latest
- Claude API rate limit reached official documentation current limits
- Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 fact check official docs
- AI 部署 official docs limits pricing changelog
- OpenAI API Next.js
- Claude API 接入
- Gemini API Next.js
- API rate limit 怎么办

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.

Workflow angles:

- 服务端调用
- 限流重试
- 降级模型
- 成本控制
- Key 轮换

## Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型

- File: content/blog/gemini-api-rate-limit-debug-guide.mdx
- Lane: deployment: 模型 API 接入、限流和多模型降级
- Lane priority score: 298
- Category: AI 部署
- Primary keyword: Gemini API 限流
- Search intent: informational
- Publish batch: 34
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1221
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Google AI docs: https://ai.google.dev/docs

Fact-check queries:

- Gemini API 限流 official docs latest
- Gemini API 限流 official documentation current limits
- Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 fact check official docs
- AI 部署 official docs limits pricing changelog
- OpenAI API Next.js
- Claude API 接入
- Gemini API Next.js
- API rate limit 怎么办

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.

Workflow angles:

- 服务端调用
- 限流重试
- 降级模型
- 成本控制
- Key 轮换

## 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断

- File: content/blog/customer-service-ai-prompts-guide.mdx
- Lane: industry-prompt: 客服
- Lane priority score: 286
- Category: AI 提示词
- Primary keyword: 客服 AI 提示词
- Search intent: informational
- Publish batch: 30
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1212
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Google Gemini Workspace prompting: https://support.google.com/docs/answer/15013615
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 客服 AI 提示词 official docs latest
- 客服 AI 提示词 official documentation current limits
- 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 fact check official docs
- AI 提示词 official docs limits pricing changelog
- 客服 AI 提示词
- 客服回复 AI 模板
- 工单分类 AI prompt
- 售后回复 AI 提示词

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- 回复草稿
- 工单分类
- 情绪安抚
- 升级判断

## 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复

- File: content/blog/ecommerce-ai-prompts-guide.mdx
- Lane: industry-prompt: 客服
- Lane priority score: 286
- Category: AI 提示词
- Primary keyword: 电商 AI 提示词
- Search intent: informational
- Publish batch: 30
- Status: draft
- Safe draft: true
- Source notes present: true
- Chinese chars: 1250
- Internal links: 3

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Google Gemini Workspace prompting: https://support.google.com/docs/answer/15013615
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 电商 AI 提示词 official docs latest
- 电商 AI 提示词 official documentation current limits
- 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 fact check official docs
- AI 提示词 official docs limits pricing changelog
- 客服 AI 提示词
- 客服回复 AI 模板
- 工单分类 AI prompt
- 售后回复 AI 提示词

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- 回复草稿
- 工单分类
- 情绪安抚
- 升级判断
