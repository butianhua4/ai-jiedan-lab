# Search Intent Lane Map

Generated at: 2026-06-06T17:29:55.662Z

This report is read-only. It maps broad AI search-intent lanes to existing public articles and safe draft candidates. It does not claim keyword volume, impressions, clicks, or traffic.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Note: Read-only search-intent lane map. Demand scores are editorial prioritization signals from broad query patterns and source review needs, not keyword-volume or traffic data.

## Source Evidence

- Note: Source targets are official documentation pages for human fact review. This report does not claim measured search volume.
- Checked: OpenAI Agents and Agents SDK documentation
- Checked: Vercel AI SDK Agents documentation
- Checked: Dify Agent documentation
- Checked: n8n AI Agent documentation

## Summary

- highPriorityLanes: 12
- lanes: 12
- lanesWithReadyDrafts: 12
- lanesWithoutPublicCoverage: 10
- maxPriorityScore: 386
- notReadyMatchedDrafts: 355
- totalReadyDraftMatches: 233

## Top Lanes

| Score | Demand | Public | Ready drafts | Current pack | Wave 1 | Expansion | Not ready matched drafts | Lane | Reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 386 | 10 | 0 | 23 | 2 | 2 | 7 | 4 | Cross-industry AI prompt templates and reusable prompt libraries | demandScore=10; no public coverage; readyDrafts=23; currentPack=2; wave1=2 |
| 366 | 9 | 0 | 16 | 2 | 2 | 7 | 6 | Business department AI workflows across sales, support, ops, HR, finance, legal, and education | demandScore=9; no public coverage; readyDrafts=16; currentPack=2; wave1=2 |
| 358 | 10 | 0 | 27 | 1 | 1 | 5 | 8 | AI Agent deployment, tool calling, and production workflow | demandScore=10; no public coverage; readyDrafts=27; currentPack=1; wave1=1 |
| 358 | 10 | 0 | 35 | 1 | 1 | 5 | 0 | RAG, knowledge base, and Agent memory | demandScore=10; no public coverage; readyDrafts=35; currentPack=1; wave1=1 |
| 330 | 10 | 0 | 29 | 0 | 0 | 3 | 0 | Large model deployment, LLM serving, and GPU infrastructure | demandScore=10; no public coverage; readyDrafts=29 |
| 314 | 9 | 0 | 17 | 0 | 0 | 4 | 22 | Dify, n8n, no-code AI automation, and workflow deployment | demandScore=9; no public coverage; readyDrafts=17 |
| 314 | 9 | 0 | 24 | 0 | 0 | 4 | 6 | Model API integration, rate limits, and multi-model fallback | demandScore=9; no public coverage; readyDrafts=24 |
| 306 | 9 | 0 | 16 | 0 | 0 | 2 | 0 | Local and open-source model deployment | demandScore=9; no public coverage; readyDrafts=16 |

## Cross-industry AI prompt templates and reusable prompt libraries

- ID: industry-prompt-library
- Audience: Teams trying to build reusable prompt libraries instead of one-off prompts.
- Priority score: 386
- Priority reason: demandScore=10; no public coverage; readyDrafts=23; currentPack=2; wave1=2
- Intent seeds: AI 提示词大全, ChatGPT 提示词模板, 全行业 AI 提示词, AI prompt library
- Workflow angles: industry taxonomy, input schema, output format, review checklist, reuse rules

Review focus:

- input fields
- output format
- quality checks
- risk disclaimers
- versioning

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Matched safe draft candidates:

| Current | Wave 1 | Expansion | Score | Batch | Category | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | true | 90 | 40 | AI 提示词 | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | true | true | 86 | 34 | AI 部署 | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| false | false | true | 86 | 32 | AI 提示词 | 团队 AI 提示词库 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| false | false | true | 86 | 31 | AI 提示词 | 数据分析 AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| false | false | true | 86 | 31 | AI 提示词 | 教育 AI 提示词 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| false | false | true | 86 | 30 | AI 提示词 | 客服 AI 提示词 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| false | false | true | 86 | 30 | AI 提示词 | 电商 AI 提示词 | 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 | content/blog/ecommerce-ai-prompts-guide.mdx |
| false | false | false | 86 | 31 | AI 提示词 | 医疗 AI 提示词 | 医疗行政 AI 提示词模板：病历摘要、随访问卷和宣教材料怎么安全写 | content/blog/healthcare-admin-ai-prompts-guide.mdx |

## Business department AI workflows across sales, support, ops, HR, finance, legal, and education

- ID: business-ai-workflows
- Audience: Business teams deciding how to use AI across departments.
- Priority score: 366
- Priority reason: demandScore=9; no public coverage; readyDrafts=16; currentPack=2; wave1=2
- Intent seeds: 企业 AI 应用场景, AI 工作流模板, 销售 AI 提示词, 客服 AI 提示词, 运营 AI 提示词
- Workflow angles: department workflows, SOP, review owner, handoff, template library

Review focus:

- role-specific input fields
- approval owner
- risk boundaries
- measurable output format

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Matched safe draft candidates:

| Current | Wave 1 | Expansion | Score | Batch | Category | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | true | 90 | 40 | AI 提示词 | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | true | true | 86 | 34 | AI 部署 | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| false | false | true | 86 | 33 | AI 部署 | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| false | false | true | 86 | 33 | AI 部署 | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| false | false | true | 86 | 31 | AI 提示词 | 教育 AI 提示词 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| false | false | true | 86 | 30 | AI 提示词 | 客服 AI 提示词 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| false | false | true | 86 | 30 | AI 提示词 | 电商 AI 提示词 | 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 | content/blog/ecommerce-ai-prompts-guide.mdx |
| false | false | false | 86 | 31 | AI 提示词 | 制造业 AI 提示词 | 制造业 AI 提示词模板：SOP、质检记录、设备故障和生产复盘 | content/blog/manufacturing-ai-prompts-guide.mdx |

## AI Agent deployment, tool calling, and production workflow

- ID: agent-deployment-tools
- Audience: Developers and teams trying to move beyond chatbots into production agents.
- Priority score: 358
- Priority reason: demandScore=10; no public coverage; readyDrafts=27; currentPack=1; wave1=1
- Intent seeds: AI Agent 部署, AI Agent 工具调用, Vercel AI SDK Agent, OpenAI Agents SDK
- Workflow angles: tool calling, multi-step execution, human approval, observability, permissions

Review focus:

- tool permission boundaries
- loop control and stop conditions
- human handoff
- logs and fallback paths

Source targets:

- OpenAI Agents: https://platform.openai.com/docs/guides/agents
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk
- Vercel AI SDK Agents: https://ai-sdk.dev/docs/agents
- n8n AI Agent node: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/

Matched safe draft candidates:

| Current | Wave 1 | Expansion | Score | Batch | Category | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | true | 90 | 40 | AI Agent | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| false | false | true | 90 | 40 | AI 记忆 | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| false | false | true | 86 | 33 | 接单报价 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| false | false | true | 86 | 33 | AI 部署 | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| false | false | true | 86 | 33 | AI 部署 | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| false | false | false | 86 | 33 | AI 部署 | 企业微信 飞书 Slack AI Agent | 企业微信、飞书、Slack 怎么接 AI Agent：消息入口、权限和人工接管 | content/blog/enterprise-im-ai-agent-integration-guide.mdx |
| false | false | false | 86 | 33 | AI 部署 | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| false | false | false | 86 | 33 | AI 部署 | n8n AI Agent Webhook | n8n AI Agent 接 Webhook 怎么上线：触发、鉴权、队列和失败重试 | content/blog/n8n-ai-agent-webhook-production-guide.mdx |

## RAG, knowledge base, and Agent memory

- ID: rag-knowledge-memory
- Audience: Teams building customer support bots, internal knowledge assistants, and document Q&A.
- Priority score: 358
- Priority reason: demandScore=10; no public coverage; readyDrafts=35; currentPack=1; wave1=1
- Intent seeds: RAG 知识库搭建, AI Agent 记忆, 向量数据库教程, 企业知识库 AI
- Workflow angles: document cleanup, chunking, embedding, source citation, memory policy

Review focus:

- chunking and metadata
- citation and source boundaries
- privacy and retention
- evaluation set

Source targets:

- OpenAI retrieval: https://platform.openai.com/docs/guides/retrieval
- OpenAI Agents knowledge and memory: https://platform.openai.com/docs/guides/agents
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai

Matched safe draft candidates:

| Current | Wave 1 | Expansion | Score | Batch | Category | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | true | 86 | 34 | AI 部署 | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| false | false | true | 90 | 40 | AI 记忆 | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| false | false | true | 86 | 33 | 接单报价 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| false | false | true | 86 | 33 | AI 部署 | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| false | false | true | 86 | 30 | AI 提示词 | 客服 AI 提示词 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| false | false | false | 86 | 33 | AI 部署 | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| false | false | false | 86 | 32 | AI 基建 | Agent 记忆数据库设计 | Agent 记忆用 Postgres 怎么设计：用户偏好、项目事实和过期规则 | content/blog/agent-memory-postgres-schema-guide.mdx |
| false | false | false | 86 | 32 | AI 基建 | RAG 引用来源 | RAG 怎么显示引用来源：文档名、页码、片段和可信度 | content/blog/rag-citation-source-trace-guide.mdx |

## Large model deployment, LLM serving, and GPU infrastructure

- ID: llm-deployment-serving
- Audience: Developers, solo builders, and companies deciding where and how to run models.
- Priority score: 330
- Priority reason: demandScore=10; no public coverage; readyDrafts=29
- Intent seeds: 大模型部署教程, LLM deployment, vLLM 部署, Hugging Face TGI 部署
- Workflow angles: GPU sizing, serving API, quantization, autoscaling, cost control

Review focus:

- GPU and memory requirements
- serving framework versions
- cold start and concurrency
- cost boundaries

Source targets:

- Hugging Face docs: https://huggingface.co/docs
- vLLM docs: https://docs.vllm.ai
- OpenAI API docs: https://platform.openai.com/docs
- Modal docs: https://modal.com/docs

Matched safe draft candidates:

| Current | Wave 1 | Expansion | Score | Batch | Category | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| false | false | true | 90 | 40 | AI 部署 | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| false | false | true | 86 | 32 | AI 部署 | 本地部署大模型显存不够 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| false | false | true | 86 | 29 | AI 基建 | Docker 使用 NVIDIA GPU | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx |
| false | false | false | 86 | 34 | AI 部署 | 大模型成本监控 | 大模型成本监控怎么做：按用户、功能、模型和项目拆账 | content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| false | false | false | 86 | 32 | AI 部署 | 大模型 API 限流重试 | 大模型 API 限流和重试怎么做：429、队列、退避和降级方案 | content/blog/llm-api-rate-limit-retry-guide.mdx |
| false | false | false | 86 | 29 | AI 基建 | BentoML LLM 部署 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| false | false | false | 86 | 29 | AI 基建 | Hugging Face TGI 部署 | Hugging Face TGI 怎么部署：Text Generation Inference 入门检查表 | content/blog/huggingface-tgi-deployment-guide.mdx |
| false | false | false | 86 | 29 | AI 基建 | Kubernetes GPU 大模型部署 | Kubernetes 怎么部署 GPU 大模型：Device Plugin、资源限制和调度边界 | content/blog/kubernetes-gpu-llm-deployment-guide.mdx |

## Dify, n8n, no-code AI automation, and workflow deployment

- ID: nocode-ai-automation
- Audience: No-code and low-code automation builders using Dify, n8n, Flowise, Coze, and webhooks.
- Priority score: 314
- Priority reason: demandScore=9; no public coverage; readyDrafts=17
- Intent seeds: Dify 部署教程, n8n AI Agent, AI 自动化工作流, Webhook AI Agent
- Workflow angles: self-hosting, webhook, auth, retry, human fallback

Review focus:

- self-hosting vs cloud boundaries
- webhook auth
- error handling
- manual fallback

Source targets:

- Dify Agent docs: https://docs.dify.ai/en/use-dify/build/agent
- Dify Agent node: https://docs.dify.ai/en/guides/workflow/node/agent
- n8n docs: https://docs.n8n.io

Matched safe draft candidates:

| Current | Wave 1 | Expansion | Score | Batch | Category | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| false | false | true | 86 | 33 | 接单报价 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| false | false | true | 86 | 33 | AI 部署 | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| false | false | true | 86 | 33 | AI 部署 | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| false | false | true | 86 | 33 | AI 部署 | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| false | false | false | 86 | 33 | AI 部署 | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| false | false | false | 86 | 33 | AI 部署 | n8n AI Agent Webhook | n8n AI Agent 接 Webhook 怎么上线：触发、鉴权、队列和失败重试 | content/blog/n8n-ai-agent-webhook-production-guide.mdx |
| false | false | false | 86 | 26 | AI 基建 | Dify 接入 Ollama | Dify 怎么接 Ollama 本地模型：从模型供应商到知识库测试 | content/blog/dify-ollama-local-model-guide.mdx |
| false | false | false | 86 | 26 | AI 基建 | Dify 接 OpenAI API | Dify 怎么接 OpenAI API：模型供应商、LLM 节点和费用边界 | content/blog/dify-openai-api-provider-guide.mdx |

## Model API integration, rate limits, and multi-model fallback

- ID: model-api-integration
- Audience: Developers integrating OpenAI, Claude, Gemini, OpenRouter, and multi-model routing.
- Priority score: 314
- Priority reason: demandScore=9; no public coverage; readyDrafts=24
- Intent seeds: OpenAI API 接入, Claude API 限流, Gemini API 限流, 多模型 Router 降级
- Workflow angles: server-side calls, rate limit retry, fallback routing, key rotation, cost control

Review focus:

- current model names
- rate limits
- retry behavior
- key rotation
- fallback quality

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com
- Vercel AI SDK providers: https://ai-sdk.dev/docs/foundations/providers-and-models

Matched safe draft candidates:

| Current | Wave 1 | Expansion | Score | Batch | Category | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| false | false | true | 90 | 40 | AI 部署 | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| false | false | true | 86 | 34 | AI 部署 | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| false | false | true | 86 | 34 | AI 部署 | Claude API rate limit reached | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |
| false | false | true | 86 | 34 | AI 部署 | Gemini API 限流 | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx |
| false | false | false | 86 | 34 | AI 部署 | 多模型 Router 降级 | 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 | content/blog/multi-model-router-fallback-guide.mdx |
| false | false | false | 86 | 34 | AI 部署 | OpenAI Batch API | OpenAI Batch API 适合什么任务：批量摘要、分类、抽取和成本控制 | content/blog/openai-batch-api-cost-guide.mdx |
| false | false | false | 86 | 34 | AI 部署 | Vercel AI Gateway 多模型 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| false | false | false | 86 | 32 | AI 部署 | 大模型 API 限流重试 | 大模型 API 限流和重试怎么做：429、队列、退避和降级方案 | content/blog/llm-api-rate-limit-retry-guide.mdx |

## Local and open-source model deployment

- ID: local-open-models
- Audience: Builders deploying open-source models locally or behind a private interface.
- Priority score: 306
- Priority reason: demandScore=9; no public coverage; readyDrafts=16
- Intent seeds: 本地部署大模型, Ollama 本地部署, Open WebUI 部署, 显存不够怎么办
- Workflow angles: hardware check, model download, quantization, local web UI, private API

Review focus:

- hardware estimation
- model size and quantization
- local API exposure
- security and privacy caveats

Source targets:

- Ollama docs: https://docs.ollama.com
- Open WebUI docs: https://docs.openwebui.com
- Hugging Face docs: https://huggingface.co/docs

Matched safe draft candidates:

| Current | Wave 1 | Expansion | Score | Batch | Category | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| false | false | true | 86 | 33 | AI 部署 | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| false | false | true | 86 | 32 | AI 部署 | 本地部署大模型显存不够 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| false | false | false | 86 | 33 | AI 基建 | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| false | false | false | 86 | 29 | AI 基建 | BentoML LLM 部署 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| false | false | false | 86 | 27 | AI 基建 | Chroma 向量数据库 | Chroma 向量数据库怎么用：本地 RAG 原型先跑通 collection | content/blog/chroma-vector-database-rag-guide.mdx |
| false | false | false | 86 | 26 | AI 基建 | Dify 接入 Ollama | Dify 怎么接 Ollama 本地模型：从模型供应商到知识库测试 | content/blog/dify-ollama-local-model-guide.mdx |
| false | false | false | 86 | 26 | AI 基建 | llama.cpp server | llama.cpp server 怎么用：本地 GGUF 模型 API 入门 | content/blog/llama-cpp-server-beginner-guide.mdx |
| false | false | false | 86 | 26 | AI 基建 | LM Studio 本地 API | LM Studio 本地 API 怎么用：把本地模型变成 OpenAI 兼容接口 | content/blog/lm-studio-local-api-guide.mdx |

## All Lanes

| Score | Demand | Public | Ready drafts | Current pack | Wave 1 | Expansion | Not ready matched drafts | Lane | Reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 386 | 10 | 0 | 23 | 2 | 2 | 7 | 4 | Cross-industry AI prompt templates and reusable prompt libraries | demandScore=10; no public coverage; readyDrafts=23; currentPack=2; wave1=2 |
| 366 | 9 | 0 | 16 | 2 | 2 | 7 | 6 | Business department AI workflows across sales, support, ops, HR, finance, legal, and education | demandScore=9; no public coverage; readyDrafts=16; currentPack=2; wave1=2 |
| 358 | 10 | 0 | 27 | 1 | 1 | 5 | 8 | AI Agent deployment, tool calling, and production workflow | demandScore=10; no public coverage; readyDrafts=27; currentPack=1; wave1=1 |
| 358 | 10 | 0 | 35 | 1 | 1 | 5 | 0 | RAG, knowledge base, and Agent memory | demandScore=10; no public coverage; readyDrafts=35; currentPack=1; wave1=1 |
| 330 | 10 | 0 | 29 | 0 | 0 | 3 | 0 | Large model deployment, LLM serving, and GPU infrastructure | demandScore=10; no public coverage; readyDrafts=29 |
| 314 | 9 | 0 | 17 | 0 | 0 | 4 | 22 | Dify, n8n, no-code AI automation, and workflow deployment | demandScore=9; no public coverage; readyDrafts=17 |
| 314 | 9 | 0 | 24 | 0 | 0 | 4 | 6 | Model API integration, rate limits, and multi-model fallback | demandScore=9; no public coverage; readyDrafts=24 |
| 306 | 9 | 0 | 16 | 0 | 0 | 2 | 0 | Local and open-source model deployment | demandScore=9; no public coverage; readyDrafts=16 |
| 282 | 8 | 0 | 9 | 0 | 0 | 1 | 9 | MCP, tool permissions, and enterprise integration safety | demandScore=8; no public coverage; readyDrafts=9 |
| 278 | 8 | 0 | 13 | 0 | 0 | 0 | 2 | LLM observability, evaluation, and production quality | demandScore=8; no public coverage; readyDrafts=13 |
| 200 | 8 | 3 | 13 | 0 | 0 | 4 | 92 | AI app deployment errors and beginner troubleshooting | demandScore=8; public coverage=3; readyDrafts=13 |
| 188 | 8 | 3 | 11 | 0 | 0 | 1 | 206 | AI automation service pricing, scope, and delivery checklist | demandScore=8; public coverage=3; readyDrafts=11 |
