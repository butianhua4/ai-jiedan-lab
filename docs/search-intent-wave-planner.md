# Search Intent Wave Planner

Generated at: 2026-06-08T12:15:18.982Z

This report is read-only. It expands the current approval packet into a continuous human-review wave queue across broad AI search-intent lanes.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Each wave still requires explicit human approval before mark:review --confirm-human or publish:articles --confirm.
- Note: Read-only continuous wave planner for human review. It does not modify article status, noindex, review, or publishing state.

## Summary

- plannedWaves: 4
- itemsPerWave: 3
- plannedItems: 12
- readyItems: 12
- uniqueFiles: 12
- uniqueLanes: 6
- unsafeItems: 0
- sourceLaneMapItems: 233
- sourceApprovalNextGapItems: 6

## Source Evidence

- Note: The planner uses editorial lane priorities and safe draft evidence only. It does not claim measured keyword volume, impressions, clicks, or traffic.
- Lane map guardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only search-intent lane map. Demand scores are editorial prioritization signals from broad query patterns and source review needs, not keyword-volume or traffic data."}
- Approval guardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only human approval packet derived from the search-intent lane map. It does not change article status, noindex, or publishing state.","stopBefore":"Run confirm-human or publish confirm commands only after explicit human approval for each file."}

## Wave 1: Current human approval packet

- Items: 3
- Ready items: 3
- Lanes: 2
- Unique source targets: 8

| Ready | Safe draft | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 386 | 100 | 40 | Cross-industry AI prompt templates and reusable prompt libraries | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | true | 386 | 100 | 34 | Cross-industry AI prompt templates and reusable prompt libraries | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | true | 358 | 100 | 40 | AI Agent deployment, tool calling, and production workflow | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |

Review focus:

- input fields
- output format
- quality checks
- risk disclaimers
- versioning
- tool permission boundaries
- loop control and stop conditions
- human handoff
- logs and fallback paths

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/
- OpenAI Agents: https://platform.openai.com/docs/guides/agents
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk
- Vercel AI SDK Agents: https://ai-sdk.dev/docs/agents
- n8n AI Agent node: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Prompt templates include input context, output criteria, human review rules, and adaptation notes.
- Agent permissions, tool allowlists, human approval, logs, and rollback boundaries are explicit.

## Wave 2: Cross-industry AI prompt templates and reusable prompt libraries + Business department AI workflows across sales, support, ops, HR, finance, legal, and education

- Items: 3
- Ready items: 3
- Lanes: 2
- Unique source targets: 4

| Ready | Safe draft | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 386 | 100 | 32 | Cross-industry AI prompt templates and reusable prompt libraries | 团队 AI 提示词库 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| true | true | 386 | 100 | 31 | Cross-industry AI prompt templates and reusable prompt libraries | 数据分析 AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| true | true | 366 | 100 | 33 | Business department AI workflows across sales, support, ops, HR, finance, legal, and education | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |

Review focus:

- input fields
- output format
- quality checks
- risk disclaimers
- versioning
- role-specific input fields
- approval owner
- risk boundaries
- measurable output format

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Prompt templates include input context, output criteria, human review rules, and adaptation notes.
- Department workflows identify approval owner, sensitive decisions, and human handoff points.

## Wave 3: Business department AI workflows across sales, support, ops, HR, finance, legal, and education + AI Agent deployment, tool calling, and production workflow

- Items: 3
- Ready items: 3
- Lanes: 2
- Unique source targets: 6

| Ready | Safe draft | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 366 | 100 | 33 | Business department AI workflows across sales, support, ops, HR, finance, legal, and education | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| true | true | 358 | 100 | 40 | AI Agent deployment, tool calling, and production workflow | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | true | 358 | 100 | 33 | AI Agent deployment, tool calling, and production workflow | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |

Review focus:

- role-specific input fields
- approval owner
- risk boundaries
- measurable output format
- tool permission boundaries
- loop control and stop conditions
- human handoff
- logs and fallback paths

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/
- OpenAI Agents: https://platform.openai.com/docs/guides/agents
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk
- Vercel AI SDK Agents: https://ai-sdk.dev/docs/agents
- n8n AI Agent node: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Department workflows identify approval owner, sensitive decisions, and human handoff points.
- Agent permissions, tool allowlists, human approval, logs, and rollback boundaries are explicit.

## Wave 4: RAG, knowledge base, and Agent memory + Large model deployment, LLM serving, and GPU infrastructure + Dify, n8n, no-code AI automation, and workflow deployment

- Items: 3
- Ready items: 3
- Lanes: 3
- Unique source targets: 11

| Ready | Safe draft | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 358 | 86 | 30 | RAG, knowledge base, and Agent memory | 客服 AI 提示词 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| true | true | 330 | 90 | 40 | Large model deployment, LLM serving, and GPU infrastructure | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| true | true | 314 | 86 | 33 | Dify, n8n, no-code AI automation, and workflow deployment | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |

Review focus:

- chunking and metadata
- citation and source boundaries
- privacy and retention
- evaluation set
- GPU and memory requirements
- serving framework versions
- cold start and concurrency
- cost boundaries
- self-hosting vs cloud boundaries
- webhook auth
- error handling
- manual fallback

Source targets:

- OpenAI retrieval: https://platform.openai.com/docs/guides/retrieval
- OpenAI Agents knowledge and memory: https://platform.openai.com/docs/guides/agents
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs
- vLLM docs: https://docs.vllm.ai
- OpenAI API docs: https://platform.openai.com/docs
- Modal docs: https://modal.com/docs
- Dify Agent docs: https://docs.dify.ai/en/use-dify/build/agent
- Dify Agent node: https://docs.dify.ai/en/guides/workflow/node/agent
- n8n docs: https://docs.n8n.io

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Retrieval quality, citations, memory retention, privacy, and hallucination risks are explicit.
- GPU, memory, serving, concurrency, cold-start, and cost tradeoffs are framed as checks, not guarantees.
- Webhook auth, connector permissions, retries, manual fallback, and platform policy boundaries are explicit.
