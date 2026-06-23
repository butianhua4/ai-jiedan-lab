# Autopilot Broad AI Demand Brief

Generated at: 2026-06-23T10:48:08.703Z

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
- clustersWithoutPublicCoverage: 0
- clustersWithReadyCandidates: 4
- externalSourceSignals: 24
- publicArticles: 500
- readyCandidateFiles: 7
- reviewReadyDrafts: 148
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
| 168 | 28 | 4 | 4 | 3 | 5 | RAG、知识库、向量数据库和引用溯源 | 企业知识库、客服机器人、内部搜索、文档问答负责人 | RAG 是搜索面很宽的稳定主题，适合承接企业知识库、客服、内部文档问答和 Agent 记忆流量。 |
| 157 | 25 | 3 | 3 | 3 | 5 | Agent 记忆：短期记忆、长期记忆、RAG、Postgres | 想让 Agent 记住用户、项目、偏好和流程的开发者与团队 | 用户明确点名“记忆板块”，这个方向能从技术教程、架构设计、隐私合规三个层面持续扩展。 |
| 150 | 29 | 2 | 2 | 3 | 5 | 开源大模型部署：Ollama、vLLM、TGI、RunPod | 想把开源大模型真正跑起来的人：开发者、独立站站长、AI 工具创业者 | 这是比网页部署更宽的入口词，搜索者通常已经有明确问题：跑不起来、太慢、太贵、API 接不上。 |
| 120 | 35 | 0 | 0 | 3 | 5 | Agent 部署、工具调用和生产安全 | 正在把聊天机器人升级成业务 Agent、工作流或内部工具的人 | Agent 是当前 AI 应用搜索里的大词，但文章必须从权限、状态和人工接管切入，才能比泛泛介绍更有用。 |
| 115 | 12 | 1 | 1 | 3 | 5 | LLM 观测、评测、日志和上线后质量 | 准备把 AI 应用交付给客户或团队使用的人 | 部署之后的质量和成本问题会持续出现，适合承接更成熟的搜索需求，也能提高文章可信度。 |
| 114 | 27 | 0 | 0 | 3 | 6 | 全行业 AI 提示词和工作流模板 | 运营、销售、客服、HR、教育、财务、法务、产品等非技术岗位 | 这是用户特别要求的“全行业使用 AI 的提示词”，搜索面宽，适合先做总入口，再拆岗位长尾。 |
| 110 | 36 | 0 | 0 | 3 | 5 | Dify、n8n、Coze、Flowise、MCP 自动化部署 | 低代码/无代码自动化项目者、内部工具负责人、小团队运营 | 这类词同时覆盖搜索流量和可售服务，适合从教程、报价、验收、风控四个角度铺内容。 |
| 106 | 15 | 0 | 0 | 3 | 5 | AI API 接入、限流、成本和多模型路由 | 需要把 AI API 接进产品、网站、SaaS 原型的人 | API 接入和报错是明确搜索意图，能和工具页、报价页、部署教程形成内链闭环。 |

## RAG、知识库、向量数据库和引用溯源

- Audience: 企业知识库、客服机器人、内部搜索、文档问答负责人
- Gap score: 168
- Public matches: 28
- Draft matches: 4
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
| 27 | 100 | informational | Together AI API 接入 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 25 | 100 | informational | RAG 向量数据库怎么选 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 24 | 100 | informational | Supabase pgvector | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 21 | 100 | informational | 向量数据库 | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |

## Agent 记忆：短期记忆、长期记忆、RAG、Postgres

- Audience: 想让 Agent 记住用户、项目、偏好和流程的开发者与团队
- Gap score: 157
- Public matches: 25
- Draft matches: 3
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
| 25 | 100 | informational | RAG 向量数据库怎么选 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 24 | 100 | informational | Supabase pgvector | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 21 | 100 | informational | 向量数据库 | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |

## 开源大模型部署：Ollama、vLLM、TGI、RunPod

- Audience: 想把开源大模型真正跑起来的人：开发者、独立站站长、AI 工具创业者
- Gap score: 150
- Public matches: 29
- Draft matches: 2
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
| 29 | 100 | informational | TensorRT-LLM 入门 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 22 | 100 | informational | vLLM 部署 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |

## Agent 部署、工具调用和生产安全

- Audience: 正在把聊天机器人升级成业务 Agent、工作流或内部工具的人
- Gap score: 120
- Public matches: 35
- Draft matches: 0
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

## LLM 观测、评测、日志和上线后质量

- Audience: 准备把 AI 应用交付给客户或团队使用的人
- Gap score: 115
- Public matches: 12
- Draft matches: 1
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
| 13 | 100 | informational | Vercel build failed 排查清单 | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |

## 全行业 AI 提示词和工作流模板

- Audience: 运营、销售、客服、HR、教育、财务、法务、产品等非技术岗位
- Gap score: 114
- Public matches: 27
- Draft matches: 0
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

## Dify、n8n、Coze、Flowise、MCP 自动化部署

- Audience: 低代码/无代码自动化项目者、内部工具负责人、小团队运营
- Gap score: 110
- Public matches: 36
- Draft matches: 0
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

## AI API 接入、限流、成本和多模型路由

- Audience: 需要把 AI API 接进产品、网站、SaaS 原型的人
- Gap score: 106
- Public matches: 15
- Draft matches: 0
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
