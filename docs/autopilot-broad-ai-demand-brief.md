# Autopilot Broad AI Demand Brief

Generated at: 2026-06-13T15:19:02.108Z

This report is read-only. It widens content planning beyond website deployment into LLM deployment, Agent deployment, memory, RAG, no-code automation, AI API operations, observability, and industry prompt packs.

## Guardrails

- Auto create articles: false
- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Note: Read-only broad AI demand brief. It prioritizes likely search-demand themes from local inventory plus external source signals, but does not claim measured traffic or keyword volume.

## Summary

- clusters: 8
- clustersWithoutPublicCoverage: 8
- clustersWithReadyCandidates: 8
- externalSourceSignals: 24
- publicArticles: 15
- readyCandidateFiles: 33
- reviewReadyDrafts: 633
- unsafeClusters: 0

## Next Actions

- Use this brief to prioritize human review of high-intent AI deployment, Agent, memory, RAG, prompt, and automation drafts.
- Do not create traffic claims from this report; connect Search Console or Analytics before reporting impressions or clicks.
- Do not run mark:review or publish commands until a human approves specific files.
- If expanding content, create draft/noindex/humanReviewRequired articles only, then run the normal review automation.

## Unsafe Clusters

- none

## Cluster Priority Table

| Score | Public | Drafts | Ready | Sources | Queries | Cluster | Audience | Why |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 321 | 0 | 31 | 6 | 3 | 5 | 开源大模型部署：Ollama、vLLM、TGI、RunPod | 想把开源大模型真正跑起来的人：开发者、独立站站长、AI 工具创业者 | 这是比网页部署更宽的入口词，搜索者通常已经有明确问题：跑不起来、太慢、太贵、API 接不上。 |
| 317 | 0 | 35 | 6 | 3 | 5 | Agent 部署、工具调用和生产安全 | 正在把聊天机器人升级成业务 Agent、工作流或内部工具的人 | Agent 是当前 AI 应用搜索里的大词，但文章必须从权限、状态和人工接管切入，才能比泛泛介绍更有用。 |
| 315 | 0 | 28 | 6 | 3 | 5 | Agent 记忆：短期记忆、长期记忆、RAG、Postgres | 想让 Agent 记住用户、项目、偏好和流程的开发者与团队 | 用户明确点名“记忆板块”，这个方向能从技术教程、架构设计、隐私合规三个层面持续扩展。 |
| 313 | 0 | 32 | 6 | 3 | 5 | RAG、知识库、向量数据库和引用溯源 | 企业知识库、客服机器人、内部搜索、文档问答负责人 | RAG 是搜索面很宽的稳定主题，适合承接企业知识库、客服、内部文档问答和 Agent 记忆流量。 |
| 311 | 0 | 27 | 6 | 3 | 6 | 全行业 AI 提示词和工作流模板 | 运营、销售、客服、HR、教育、财务、法务、产品等非技术岗位 | 这是用户特别要求的“全行业使用 AI 的提示词”，搜索面宽，适合先做总入口，再拆岗位长尾。 |
| 307 | 0 | 36 | 6 | 3 | 5 | Dify、n8n、Coze、Flowise、MCP 自动化部署 | 低代码/无代码自动化项目者、内部工具负责人、小团队运营 | 这类词同时覆盖搜索流量和可售服务，适合从教程、报价、验收、风控四个角度铺内容。 |
| 293 | 0 | 15 | 6 | 3 | 5 | AI API 接入、限流、成本和多模型路由 | 需要把 AI API 接进产品、网站、SaaS 原型的人 | API 接入和报错是明确搜索意图，能和工具页、报价页、部署教程形成内链闭环。 |
| 287 | 0 | 13 | 6 | 3 | 5 | LLM 观测、评测、日志和上线后质量 | 准备把 AI 应用交付给客户或团队使用的人 | 部署之后的质量和成本问题会持续出现，适合承接更成熟的搜索需求，也能提高文章可信度。 |

## 开源大模型部署：Ollama、vLLM、TGI、RunPod

- Audience: 想把开源大模型真正跑起来的人：开发者、独立站站长、AI 工具创业者
- Gap score: 321
- Public matches: 0
- Draft matches: 31
- Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.

Search queries to cover:

- 大模型部署教程
- Ollama 本地部署教程
- vLLM 部署教程
- RunPod vLLM serverless
- Hugging Face TGI 部署

Content angles:

- 本地先跑通：Ollama、LM Studio、llama.cpp 的入门边界
- 生产推理服务：vLLM、TGI、RunPod Serverless 的选择
- 成本和延迟：GPU、并发、量化、上下文长度的检查表
- OpenAI-compatible API：如何接入现有前端或 Agent

Review focus:

- 核对部署命令、模型名称、GPU/显存要求、API 路径和版本差异
- 不要承诺本地部署一定更省钱或更稳定
- 必须包含 smoke check、回滚、日志、限流和成本边界

External source signals:

- official-doc: [Deploy vLLM on Runpod Serverless](https://docs.runpod.io/serverless/vllm/get-started) - RunPod 文档把 vLLM Serverless 当成独立部署路径，适合做一篇从 endpoint 到 API 调用的教程。
- vendor-guide: [Deploy vLLM with Docker on Runpod](https://www.runpod.io/articles/guides/deploy-vllm-runpod-docker) - RunPod 2026 指南覆盖 vLLM Docker、模型加载和生产调优，适合补充 GPU/容器部署角度。
- search-result: [From Prototype to Production: A Complete LLM Deployment Guide](https://www.spheron.network/blog/llm-deployment-guide/) - LLM 部署类搜索结果集中出现 Ollama、vLLM、TGI、GPU cloud、MLOps 等组合词。

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 34 | 100 | informational | 大模型成本监控 | 大模型成本监控怎么做：按用户、功能、模型和项目拆账 | content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| 32 | 100 | informational | 大模型 API 限流重试 | 大模型 API 限流和重试怎么做：429、队列、退避和降级方案 | content/blog/llm-api-rate-limit-retry-guide.mdx |
| 32 | 100 | informational | 本地部署大模型显存不够 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| 29 | 100 | informational | BentoML LLM 部署 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 29 | 100 | informational | Docker 使用 NVIDIA GPU | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx |

## Agent 部署、工具调用和生产安全

- Audience: 正在把聊天机器人升级成业务 Agent、工作流或内部工具的人
- Gap score: 317
- Public matches: 0
- Draft matches: 35
- Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.

Search queries to cover:

- AI Agent 部署教程
- Agent 工具调用教程
- AI Agent 生产环境
- LangGraph Agent 入门
- CrewAI 部署教程

Content angles:

- Agent 和普通 Chatbot 的区别
- 工具调用 allowlist、权限、审计日志和人审
- Vercel AI SDK、LangGraph、CrewAI、AutoGen 的入门对比
- Agent 上线后的观测、失败回退和人工接管

Review focus:

- 不要写成全自动替人完成高风险业务
- 明确工具权限、人工确认、日志和失败处理
- 核对 SDK/API 的当前名称和部署方式

External source signals:

- official-doc: [Vercel AI SDK documentation](https://ai-sdk.dev/docs) - Agent 和工具调用正在从 demo 走向生产，部署文章需要强调权限和人工审批。
- official-doc: [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) - OpenAI Agents SDK 是 Agent 主题的官方信号源，适合核对工具、handoff、guardrail 等概念。
- official-doc: [LangGraph documentation](https://langchain-ai.github.io/langgraph/) - LangGraph 是 Agent 工作流搜索中的高频框架，适合做工程化和状态图解释。

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 40 | 100 | informational | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 33 | 100 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | informational | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | 100 | informational | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 33 | 100 | informational | 企业微信 飞书 Slack AI Agent | 企业微信、飞书、Slack 怎么接 AI Agent：消息入口、权限和人工接管 | content/blog/enterprise-im-ai-agent-integration-guide.mdx |

## Agent 记忆：短期记忆、长期记忆、RAG、Postgres

- Audience: 想让 Agent 记住用户、项目、偏好和流程的开发者与团队
- Gap score: 315
- Public matches: 0
- Draft matches: 28
- Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.

Search queries to cover:

- AI Agent 记忆怎么做
- Agent memory RAG
- AI Agent 长期记忆
- pgvector Agent memory
- RAG 和记忆区别

Content angles:

- 记忆不是简单向量库：facts、events、procedures 的拆分
- Postgres/pgvector 记忆表结构
- RAG 知识库和用户记忆的边界
- 记忆清理、去重、过期、隐私和撤回

Review focus:

- 区分知识库 RAG 和用户记忆
- 必须有隐私、删除、去重、引用和人工纠错边界
- 避免宣称记忆层能自动解决幻觉

External source signals:

- research: [Self-Aware Vector Embeddings for Retrieval-Augmented Generation](https://arxiv.org/abs/2604.20598) - 2026 RAG/Agent 讨论明显关注 structured memory、temporal/confidence/relationship 等维度。
- community: [Vector dbs aren't memory](https://www.reddit.com/r/Rag/comments/1qjvqd4/vector_dbs_arent_memory_learned_this_the_hard_way/) - 社区讨论集中在“vector DB 不是 memory”，适合做反常识型解释文章。
- official-doc: [Memory and RAG Tutorial](https://docs.agenticgokit.com/tutorials/getting-started/memory-and-rag) - RAG 记忆教程开始把 pgvector、agent orchestration 和 retrieval strategy 放在一起讲。

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 33 | 100 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | informational | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | 100 | informational | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 32 | 100 | informational | Agent 记忆数据库设计 | Agent 记忆用 Postgres 怎么设计：用户偏好、项目事实和过期规则 | content/blog/agent-memory-postgres-schema-guide.mdx |
| 32 | 100 | informational | RAG 引用来源 | RAG 怎么显示引用来源：文档名、页码、片段和可信度 | content/blog/rag-citation-source-trace-guide.mdx |

## RAG、知识库、向量数据库和引用溯源

- Audience: 企业知识库、客服机器人、内部搜索、文档问答负责人
- Gap score: 313
- Public matches: 0
- Draft matches: 32
- Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.

Search queries to cover:

- RAG 知识库搭建教程
- 向量数据库教程
- 企业知识库 AI 部署
- RAG 检索不到内容
- RAG 评测教程

Content angles:

- RAG 知识库搭建流程：清洗、切分、嵌入、召回、引用
- Chroma、Qdrant、Pinecone、Supabase pgvector 的选择
- 检索不到内容、引用错误、上下文太贵的排查
- RAG 评测：测试集、Ragas、promptfoo、人工抽检

Review focus:

- 把 RAG、微调、提示词模板区分清楚
- 必须写明引用、来源、权限和失败兜底
- 不要把 demo 成功写成生产质量保证

External source signals:

- community: [Is anyone still running pure vector RAG in production in 2026](https://www.reddit.com/r/Rag/comments/1t9v93f/is_anyone_still_running_pure_vector_rag_in/) - RAG 生产讨论关注 deterministic ingestion、structured storage 和 retrieval 失败问题。
- research: [Structured Linked Data as a Memory Layer for Agent-Orchestrated Retrieval](https://arxiv.org/abs/2603.10700) - 结构化 linked data 作为 agent retrieval memory layer，是 RAG 内容升级的研究信号。
- official-doc: [Pinecone RAG learning center](https://www.pinecone.io/learn/retrieval-augmented-generation/) - RAG 工程主题天然能和 vector database、knowledge base、agent memory 相互内链。

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 34 | 100 | informational | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 33 | 100 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | informational | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | 100 | informational | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 32 | 100 | informational | RAG 引用来源 | RAG 怎么显示引用来源：文档名、页码、片段和可信度 | content/blog/rag-citation-source-trace-guide.mdx |

## 全行业 AI 提示词和工作流模板

- Audience: 运营、销售、客服、HR、教育、财务、法务、产品等非技术岗位
- Gap score: 311
- Public matches: 0
- Draft matches: 27
- Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.

Search queries to cover:

- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- HR AI 提示词
- 运营 AI 提示词
- 企业 AI 提示词模板

Content angles:

- 按岗位给可复制提示词：销售、客服、运营、HR、财务、教育
- 从提示词升级到工作流：输入字段、输出格式、质检、反例
- 提示词库版本管理、团队知识库和审批
- 行业提示词包如何变成可售模板或服务入口

Review focus:

- 避免空泛万能提示词，必须给输入字段、输出结构和质检标准
- 高风险行业必须保留专业判断和人工复核
- 不要承诺转化率、收入或法律/医疗结果

External source signals:

- search-result: [AI Prompt Templates for Business](https://ai-prompts-pro.com/blog/ai-prompt-templates-business) - 2026 商业提示词搜索结果集中覆盖 sales、marketing、support、HR、operations 等岗位。
- search-result: [Business Prompt Templates](https://sensara.io/prompts/) - 提示词库类页面通常按业务职能分类，说明“全行业/全岗位”入口值得做集合页。
- search-result: [AI Prompts for Sales](https://www.mrprompts.ai/learn/ai-prompts-for-sales) - 销售提示词结果强调 discovery call brief、客户痛点和 follow-up，适合做可交付工作流。

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 40 | 100 | informational | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 34 | 100 | informational | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 32 | 100 | informational | 团队 AI 提示词库 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| 31 | 100 | informational | 数据分析 AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| 31 | 100 | informational | 教育 AI 提示词 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| 31 | 100 | informational | 医疗 AI 提示词 | 医疗行政 AI 提示词模板：病历摘要、随访问卷和宣教材料怎么安全写 | content/blog/healthcare-admin-ai-prompts-guide.mdx |

## Dify、n8n、Coze、Flowise、MCP 自动化部署

- Audience: 低代码/无代码自动化项目者、内部工具负责人、小团队运营
- Gap score: 307
- Public matches: 0
- Draft matches: 36
- Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.

Search queries to cover:

- Dify 部署教程
- n8n AI 自动化教程
- MCP 使用教程
- Flowise 本地部署
- Coze Bot 发布

Content angles:

- Dify workflow 和 Agent 怎么选
- n8n AI Agent webhook、知识库和记忆
- MCP server 部署安全和工具白名单
- 无代码自动化项目怎么报价、验收和运维

Review focus:

- 核对平台连接器、webhook、权限和部署限制
- 避免鼓励群发、绕过平台规则或抓取隐私数据
- 写清楚人工审批和客户验收边界

External source signals:

- official-doc: [Dify documentation](https://docs.dify.ai/) - Dify 官方文档可用于核对 workflow、knowledge、model provider 等术语。
- official-doc: [n8n documentation](https://docs.n8n.io/) - n8n 官方文档覆盖 AI Agent、webhook、credentials，适合核对安全边界。
- official-doc: [Model Context Protocol documentation](https://modelcontextprotocol.io/docs) - MCP 官方文档是工具协议和 server/client 概念的事实来源。

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 33 | 100 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | informational | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | 100 | informational | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 33 | 100 | informational | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 33 | 100 | informational | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | 100 | informational | n8n AI Agent Webhook | n8n AI Agent 接 Webhook 怎么上线：触发、鉴权、队列和失败重试 | content/blog/n8n-ai-agent-webhook-production-guide.mdx |

## AI API 接入、限流、成本和多模型路由

- Audience: 需要把 AI API 接进产品、网站、SaaS 原型的人
- Gap score: 293
- Public matches: 0
- Draft matches: 15
- Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.

Search queries to cover:

- OpenAI API 接入教程
- Claude API rate limit
- Gemini API 限流
- OpenRouter API 教程
- AI API key 安全

Content angles:

- OpenAI/Claude/Gemini/OpenRouter API 接入
- rate limit、重试、降级、队列和缓存
- 多模型 fallback、router、AI Gateway
- API key 安全、环境变量、日志脱敏

Review focus:

- 核对 SDK 名称、API endpoint、限流概念和错误码
- 必须强调密钥安全、服务端代理和日志脱敏
- 不要虚构价格或模型能力

External source signals:

- official-doc: [OpenAI API documentation](https://platform.openai.com/docs) - OpenAI API 文档是模型、responses、tool calling 和 key 管理的事实源。
- official-doc: [Anthropic Claude API documentation](https://docs.anthropic.com/) - Anthropic 文档可核对 Claude API、rate limit 和 SDK 细节。
- official-doc: [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) - Vercel AI Gateway 和多 provider 路由适合做成本、fallback、可观测性专题。

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 34 | 100 | informational | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 34 | 100 | informational | Claude API rate limit reached | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |
| 34 | 100 | informational | Gemini API 限流 | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx |
| 34 | 100 | informational | 多模型 Router 降级 | 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 | content/blog/multi-model-router-fallback-guide.mdx |
| 32 | 100 | informational | 大模型 API 限流重试 | 大模型 API 限流和重试怎么做：429、队列、退避和降级方案 | content/blog/llm-api-rate-limit-retry-guide.mdx |
| 28 | 100 | informational | Helicone LLM Observability | Helicone 怎么做 LLM 观测：Gateway、日志、成本和限流先管住 | content/blog/helicone-llm-observability-guide.mdx |

## LLM 观测、评测、日志和上线后质量

- Audience: 准备把 AI 应用交付给客户或团队使用的人
- Gap score: 287
- Public matches: 0
- Draft matches: 13
- Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.

Search queries to cover:

- LLM observability 教程
- RAG 评测教程
- promptfoo 入门
- LangSmith 教程
- AI 应用日志监控

Content angles:

- Promptfoo、Ragas、LangSmith、Helicone、Phoenix 的用途
- 上线前测试集和人工抽检
- 日志、成本、延迟、错误率和用户反馈
- RAG/Agent 失败案例复盘模板

Review focus:

- 不要把评测分数写成绝对质量保证
- 明确日志隐私、数据脱敏和留存边界
- 给出人工抽检和回滚流程

External source signals:

- official-doc: [promptfoo documentation](https://www.promptfoo.dev/docs/intro/) - Promptfoo 是 LLM eval 搜索中的常见工具，适合做上线前测试专题。
- official-doc: [Ragas documentation](https://docs.ragas.io/) - Ragas 是 RAG 评测主题的事实源之一。
- official-doc: [Helicone documentation](https://docs.helicone.ai/) - Helicone 覆盖 LLM observability、cost、latency、logs，适合做运维类内容。

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 33 | 100 | informational | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 32 | 100 | informational | Agent 工具权限控制 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| 28 | 100 | informational | Arize Phoenix LLM Tracing | Arize Phoenix 怎么做 LLM Tracing：OpenTelemetry、评测和排错入门 | content/blog/arize-phoenix-llm-observability-guide.mdx |
| 28 | 100 | informational | Helicone LLM Observability | Helicone 怎么做 LLM 观测：Gateway、日志、成本和限流先管住 | content/blog/helicone-llm-observability-guide.mdx |
| 28 | 100 | informational | LangSmith Observability | LangSmith 怎么做观测和评测：别再只靠 print 调试 Agent | content/blog/langsmith-observability-evaluation-guide.mdx |
| 28 | 100 | informational | promptfoo LLM 评测 | promptfoo 怎么做 LLM 评测：提示词、模型和 Agent 都要有测试用例 | content/blog/promptfoo-llm-evaluation-beginner-guide.mdx |
