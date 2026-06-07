# Search Demand Intake

Generated at: 2026-06-07T17:32:28.040Z

This report is read-only. It turns broad user search behavior into review lanes for AI prompts, LLM deployment, Agent deployment, memory, RAG, no-code automation, API operations, observability, and AI service packaging.

## Guardrails

- Auto create articles: false
- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Note: Read-only search-demand intake. Search queries are editorial seeds, not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.

## Summary

- contentFormats: 32
- lanes: 8
- lanesWithPublicCoverage: 2
- lanesWithoutPublicCoverage: 6
- lanesWithReadyCandidates: 8
- officialSourceTargets: 29
- readyCandidateFiles: 45
- reviewQueueMatches: 33
- searchQueries: 81
- unsafeLanes: 0

## Next Human Actions

- Use the top lanes to choose manual review focus; do not publish or mark review from this report.
- For each lane, verify official docs before approving any article.
- Prioritize lanes with zero public coverage and ready candidates.
- Keep traffic language factual until Search Console or analytics evidence exists.

## Unsafe Lanes

- none

## Lane Priority Table

| Score | Public | Drafts | Ready | Queue | Queries | Sources | Lane | User problem |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 444 | 0 | 47 | 8 | 7 | 10 | 4 | agent-deployment-tools-mcp | People want agents to act, but production content must start with permissions, tools, logs, and human gates. |
| 440 | 0 | 73 | 8 | 5 | 12 | 4 | cross-industry-ai-prompts | People search for ready-to-use AI prompts by role, but useful articles need workflow context and review boundaries. |
| 432 | 0 | 43 | 8 | 5 | 10 | 4 | llm-deployment-and-serving | Searchers want a model running, then need API access, cost control, and failure handling. |
| 424 | 0 | 34 | 8 | 5 | 10 | 4 | rag-knowledge-base-agent-memory | Searchers mix RAG, vector databases, and memory, so content needs clear boundaries and safety controls. |
| 404 | 0 | 30 | 8 | 4 | 10 | 4 | nocode-ai-automation-deployment | This lane connects search traffic to services people can buy: automation setup, deployment, acceptance, and maintenance. |
| 372 | 0 | 14 | 8 | 2 | 10 | 4 | llm-evals-observability-security | As content moves past deployment, searchers need quality, logs, evals, and security operations. |
| 325 | 1 | 97 | 8 | 2 | 10 | 4 | ai-api-keys-limits-routing | API integration is a beginner search lane and a production risk lane at the same time. |
| 306 | 4 | 222 | 8 | 3 | 10 | 4 | ai-service-pricing-delivery | This lane turns search demand into services without pretending the site already has traffic or revenue proof. |

## agent-deployment-tools-mcp

- Audience: Builders moving from chatbot demos to agents that call tools, hand off work, and run in production.
- User problem: People want agents to act, but production content must start with permissions, tools, logs, and human gates.
- Intake score: 444
- Public matches: 0
- Draft matches: 47
- Review queue matches: 7

Search queries:

- AI Agent deployment tutorial
- agent tool calling tutorial
- OpenAI Agents SDK guide
- Vercel AI SDK agent
- MCP server deployment
- agent tool permission checklist
- AI Agent 部署教程
- Agent 工具调用教程
- MCP 服务器部署
- Agent 权限控制

Content formats:

- agent deployment guide
- tool permission checklist
- MCP server checklist
- human approval workflow

Manual review focus:

- Confirm tool permissions, allowlists, audit logs, and human approval steps.
- Treat MCP and tool calling as security-sensitive.
- Include fallback and incident handling before any production claim.
- Verify framework names and current docs before approval.

Official source targets:

- OpenAI Agents SDK docs: https://openai.github.io/openai-agents-python/
- OpenAI Agents guide: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK agents docs: https://ai-sdk.dev/docs/agents
- Model Context Protocol security best practices: https://modelcontextprotocol.io/specification/draft/basic/security_best_practices

Ready candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 40 | 100 | informational | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 34 | 100 | informational | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 33 | 100 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | informational | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | 100 | informational | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 33 | 100 | informational | 企业微信 飞书 Slack AI Agent | 企业微信、飞书、Slack 怎么接 AI Agent：消息入口、权限和人工接管 | content/blog/enterprise-im-ai-agent-integration-guide.mdx |
| 33 | 100 | informational | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |

## cross-industry-ai-prompts

- Audience: Business operators, sales, support, HR, finance, education, product, and founders using AI at work.
- User problem: People search for ready-to-use AI prompts by role, but useful articles need workflow context and review boundaries.
- Intake score: 440
- Public matches: 0
- Draft matches: 73
- Review queue matches: 5

Search queries:

- AI prompt templates for business
- ChatGPT prompts for work
- industry AI prompts
- sales AI prompts
- customer service AI prompts
- HR AI prompts
- finance AI prompts
- marketing AI prompt templates
- 全行业 AI 提示词
- ChatGPT 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词

Content formats:

- prompt library
- department workflow pack
- copy-and-paste template
- quality checklist

Manual review focus:

- Every prompt needs input fields, output format, and quality criteria.
- High-risk domains need a human review boundary.
- Do not claim revenue, conversion, legal, medical, or employment outcomes.
- Prefer practical workflow prompts over generic one-line prompts.

Official source targets:

- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation guide: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering docs: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Ready candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 34 | 100 | informational | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 33 | 100 | informational | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | 100 | informational | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 32 | 100 | informational | 团队 AI 提示词库 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| 31 | 100 | informational | 数据分析 AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| 31 | 100 | informational | 教育 AI 提示词 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| 31 | 100 | informational | 医疗 AI 提示词 | 医疗行政 AI 提示词模板：病历摘要、随访问卷和宣教材料怎么安全写 | content/blog/healthcare-admin-ai-prompts-guide.mdx |

## llm-deployment-and-serving

- Audience: Developers and small teams trying to deploy large models locally, on GPUs, or behind an API.
- User problem: Searchers want a model running, then need API access, cost control, and failure handling.
- Intake score: 432
- Public matches: 0
- Draft matches: 43
- Review queue matches: 5

Search queries:

- large language model deployment tutorial
- vLLM deployment tutorial
- Hugging Face TGI deployment
- RunPod vLLM serverless
- Ollama local model tutorial
- local LLM deployment
- 大模型部署教程
- 本地大模型部署
- vLLM 部署教程
- Ollama 本地部署教程

Content formats:

- deployment tutorial
- provider comparison
- cost checklist
- troubleshooting playbook

Manual review focus:

- Verify current model serving commands, endpoints, and version names.
- Separate local testing from production serving.
- Cover GPU memory, latency, concurrency, logs, rollback, and cost limits.
- Avoid claiming that self-hosting is always cheaper or more stable.

Official source targets:

- vLLM docs: https://docs.vllm.ai/
- Hugging Face docs: https://huggingface.co/docs
- RunPod serverless vLLM docs: https://docs.runpod.io/serverless/vllm/get-started
- Ollama docs: https://docs.ollama.com/

Ready candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 40 | 100 | informational | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 34 | 100 | informational | 大模型成本监控 | 大模型成本监控怎么做：按用户、功能、模型和项目拆账 | content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| 33 | 100 | informational | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 33 | 100 | informational | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 32 | 100 | informational | 大模型 API 限流重试 | 大模型 API 限流和重试怎么做：429、队列、退避和降级方案 | content/blog/llm-api-rate-limit-retry-guide.mdx |
| 32 | 100 | informational | 本地部署大模型显存不够 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| 29 | 100 | informational | BentoML LLM 部署 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |

## rag-knowledge-base-agent-memory

- Audience: Teams building support bots, internal assistants, project memory, and document Q&A systems.
- User problem: Searchers mix RAG, vector databases, and memory, so content needs clear boundaries and safety controls.
- Intake score: 424
- Public matches: 0
- Draft matches: 34
- Review queue matches: 5

Search queries:

- RAG knowledge base tutorial
- AI agent memory
- agent long term memory
- pgvector agent memory
- vector database RAG
- RAG evaluation tutorial
- AI Agent 记忆怎么做
- RAG 知识库搭建教程
- 向量数据库 教程
- 智能体 长期记忆

Content formats:

- RAG architecture guide
- memory schema checklist
- pgvector tutorial
- privacy and deletion checklist

Manual review focus:

- Separate knowledge-base RAG from user memory.
- Require citations, deletion, dedupe, retention, and privacy boundaries.
- Do not present vector search as durable memory by itself.
- Add evaluation steps for retrieval misses and hallucinated citations.

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain retrieval docs: https://python.langchain.com/docs/concepts/retrieval/
- LlamaIndex docs: https://docs.llamaindex.ai/
- Supabase pgvector docs: https://supabase.com/docs/guides/database/extensions/pgvector

Ready candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 34 | 100 | informational | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 33 | 100 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | informational | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | 100 | informational | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 32 | 100 | informational | Agent 记忆数据库设计 | Agent 记忆用 Postgres 怎么设计：用户偏好、项目事实和过期规则 | content/blog/agent-memory-postgres-schema-guide.mdx |
| 32 | 100 | informational | RAG 引用来源 | RAG 怎么显示引用来源：文档名、页码、片段和可信度 | content/blog/rag-citation-source-trace-guide.mdx |
| 32 | 100 | informational | RAG 文档清洗 | RAG 文档上传前怎么清洗：目录、页眉、表格、重复段落和版本号 | content/blog/rag-document-cleaning-before-upload-guide.mdx |

## nocode-ai-automation-deployment

- Audience: No-code builders, automation freelancers, and internal ops teams using Dify, n8n, Coze, Flowise, and webhooks.
- User problem: This lane connects search traffic to services people can buy: automation setup, deployment, acceptance, and maintenance.
- Intake score: 404
- Public matches: 0
- Draft matches: 30
- Review queue matches: 4

Search queries:

- Dify deployment tutorial
- n8n AI agent tutorial
- Flowise local deployment
- Coze bot publish tutorial
- MCP tutorial
- AI automation workflow
- Dify 部署教程
- n8n AI 自动化教程
- Flowise 本地部署
- MCP 使用教程

Content formats:

- no-code deployment guide
- self-hosting checklist
- webhook security guide
- client delivery SOP

Manual review focus:

- Verify connector, credential, webhook, and self-hosting limits.
- Avoid unsafe scraping, spam, or bypassing platform rules.
- Include client acceptance criteria and manual fallback.
- Keep credentials and customer data out of logs and prompts.

Official source targets:

- Dify docs: https://docs.dify.ai/
- n8n docs: https://docs.n8n.io/
- Flowise docs: https://docs.flowiseai.com/
- Model Context Protocol docs: https://modelcontextprotocol.io/docs

Ready candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 33 | 100 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | informational | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | 100 | informational | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 33 | 100 | informational | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 33 | 100 | informational | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | 100 | informational | n8n AI Agent Webhook | n8n AI Agent 接 Webhook 怎么上线：触发、鉴权、队列和失败重试 | content/blog/n8n-ai-agent-webhook-production-guide.mdx |
| 26 | 100 | informational | Dify 接入 Ollama | Dify 怎么接 Ollama 本地模型：从模型供应商到知识库测试 | content/blog/dify-ollama-local-model-guide.mdx |
| 26 | 100 | informational | Dify 接 OpenAI API | Dify 怎么接 OpenAI API：模型供应商、LLM 节点和费用边界 | content/blog/dify-openai-api-provider-guide.mdx |

## llm-evals-observability-security

- Audience: Teams shipping AI apps and needing to know whether outputs are reliable, safe, and affordable.
- User problem: As content moves past deployment, searchers need quality, logs, evals, and security operations.
- Intake score: 372
- Public matches: 0
- Draft matches: 14
- Review queue matches: 2

Search queries:

- LLM observability tutorial
- RAG evaluation tutorial
- AI agent logs
- prompt injection defense
- promptfoo tutorial
- LangSmith tutorial
- LLM 评测教程
- RAG 评估教程
- AI 应用日志监控
- 提示词注入防护

Content formats:

- observability guide
- evaluation checklist
- RAG test plan
- incident review template

Manual review focus:

- Separate evaluation scores from guarantees.
- Include test datasets, traces, logs, cost, latency, and privacy limits.
- Cover prompt injection and retrieval failures for RAG/agent systems.
- Add human sampling and rollback criteria.

Official source targets:

- OpenAI evals guide: https://platform.openai.com/docs/guides/evals
- promptfoo docs: https://www.promptfoo.dev/docs/intro/
- Ragas docs: https://docs.ragas.io/
- LangSmith docs: https://docs.smith.langchain.com/

Ready candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 33 | 100 | informational | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 32 | 100 | informational | Agent 工具权限控制 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| 28 | 100 | informational | Arize Phoenix LLM Tracing | Arize Phoenix 怎么做 LLM Tracing：OpenTelemetry、评测和排错入门 | content/blog/arize-phoenix-llm-observability-guide.mdx |
| 28 | 100 | informational | Helicone LLM Observability | Helicone 怎么做 LLM 观测：Gateway、日志、成本和限流先管住 | content/blog/helicone-llm-observability-guide.mdx |
| 28 | 100 | informational | LangSmith Observability | LangSmith 怎么做观测和评测：别再只靠 print 调试 Agent | content/blog/langsmith-observability-evaluation-guide.mdx |
| 28 | 100 | informational | promptfoo LLM 评测 | promptfoo 怎么做 LLM 评测：提示词、模型和 Agent 都要有测试用例 | content/blog/promptfoo-llm-evaluation-beginner-guide.mdx |
| 28 | 100 | informational | Ragas RAG 评测 | Ragas 怎么评测 RAG：Faithfulness、Context 和测试集先建好 | content/blog/ragas-rag-evaluation-beginner-guide.mdx |
| 25 | 100 | informational | RAG 检索不到内容 | RAG 检索不到内容怎么办：先判断是资料、切分还是检索链路 | content/blog/rag-retrieval-no-context-debug-guide.mdx |

## ai-api-keys-limits-routing

- Audience: Developers wiring OpenAI, Claude, Gemini, OpenRouter, or multi-model routing into apps.
- User problem: API integration is a beginner search lane and a production risk lane at the same time.
- Intake score: 325
- Public matches: 1
- Draft matches: 97
- Review queue matches: 2

Search queries:

- OpenAI API integration tutorial
- Claude API rate limit
- Gemini API tutorial
- OpenRouter API tutorial
- AI API key security
- multi model AI routing
- OpenAI API 接入教程
- Claude API 限流
- Gemini API 教程
- AI API Key 安全

Content formats:

- API integration guide
- rate-limit troubleshooting
- key security checklist
- multi-provider routing checklist

Manual review focus:

- Verify current API docs, SDK names, endpoint behavior, and rate-limit language.
- Never expose client keys; use server-side proxies and environment variables.
- Add retries, backoff, queues, cost caps, and log redaction.
- Do not invent pricing, limits, or model capabilities.

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com/
- Google Gemini API docs: https://ai.google.dev/gemini-api/docs
- Vercel AI Gateway docs: https://vercel.com/docs/ai-gateway

Ready candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 34 | 100 | informational | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 34 | 100 | informational | Claude API rate limit reached | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |
| 34 | 100 | informational | Gemini API 限流 | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx |
| 34 | 100 | informational | 多模型 Router 降级 | 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 | content/blog/multi-model-router-fallback-guide.mdx |
| 34 | 100 | informational | OpenAI Batch API | OpenAI Batch API 适合什么任务：批量摘要、分类、抽取和成本控制 | content/blog/openai-batch-api-cost-guide.mdx |
| 34 | 100 | informational | Vercel AI Gateway 多模型 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 32 | 100 | informational | 大模型 API 限流重试 | 大模型 API 限流和重试怎么做：429、队列、退避和降级方案 | content/blog/llm-api-rate-limit-retry-guide.mdx |

## ai-service-pricing-delivery

- Audience: Freelancers and service sellers packaging AI deployment, agents, RAG, and automation for clients.
- User problem: This lane turns search demand into services without pretending the site already has traffic or revenue proof.
- Intake score: 306
- Public matches: 4
- Draft matches: 222
- Review queue matches: 3

Search queries:

- AI automation project pricing
- AI agent project scope
- RAG project quote
- Dify n8n project pricing
- AI deployment proposal template
- AI service delivery checklist
- AI 自动化项目报价
- AI Agent 项目报价
- RAG 项目 报价
- AI 项目验收清单

Content formats:

- pricing checklist
- proposal template
- acceptance criteria
- maintenance scope

Manual review focus:

- Define scope, deliverables, acceptance, maintenance, and handoff.
- Do not promise traffic, revenue, ranking, or model accuracy.
- Tie packages to low-risk implementation work.
- Add client-side approvals for account access, data, and production changes.

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Dify docs: https://docs.dify.ai/
- n8n docs: https://docs.n8n.io/

Ready candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 33 | 100 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 31 | 100 | informational | 产品经理 AI 提示词 | 产品经理 AI 提示词模板：需求分析、PRD、竞品、用户故事和验收标准 | content/blog/product-manager-ai-prompts-guide.mdx |
| 29 | 100 | informational | BentoML LLM 部署 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 29 | 100 | informational | TensorRT-LLM 入门 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 20 | 100 | informational | AI 工具配置服务检查清单 | AI 工具配置服务接单检查清单 | content/blog/ai-tool-setup-service-checklist-checklist.mdx |
| 20 | 100 | informational | AI 工具配置服务接单清单 | AI 工具配置服务接单清单怎么写 | content/blog/ai-tool-setup-service-checklist.mdx |
| 20 | 100 | informational | Bug 修复交付前检查清单 | Bug 修复交付前检查清单 | content/blog/bugfix-delivery-note-template-checklist.mdx |
| 20 | 100 | informational | Bug 修复交付说明模板 | Bug 修复交付说明模板怎么写 | content/blog/bugfix-delivery-note-template.mdx |
