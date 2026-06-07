# AI Deployment Coverage

Generated at: 2026-06-07T03:16:07.667Z

This report is read-only. It organizes deployment, Agent, RAG, and model infrastructure drafts for manual review and does not publish anything.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Note: This coverage matrix is read-only. It organizes deployment, Agent, RAG, and model infrastructure drafts for manual review and does not claim measured traffic.

## Source Evidence

- Note: Official docs are source targets for human fact review. Search queries are broad intent seeds, not keyword-volume data.

- Anthropic docs: https://docs.anthropic.com
- Dify docs: https://docs.dify.ai
- Hugging Face docs: https://huggingface.co/docs
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- n8n docs: https://docs.n8n.io
- Ollama docs: https://docs.ollama.com
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- vLLM docs: https://docs.vllm.ai

## Summary

- currentPackDeploymentItems: 2
- deploymentDrafts: 208
- deploymentPublicArticles: 3
- plannedDeploymentItems: 6
- reviewReadyDeploymentDrafts: 208
- topics: 10
- topicsWithoutPublicCoverage: 8
- topicsWithReadyCandidates: 10
- totalCandidateMentions: 50
- uniqueCandidateFiles: 34
- unsafeCandidateItems: 0

## Coverage Matrix

| Topic | Score | Public | Drafts | Ready candidates | Search queries | Top candidate |
| --- | --- | --- | --- | --- | --- | --- |
| Agent 部署、工具调用和工作流 | 230 | 0 | 41 | 5 | AI Agent 部署教程<br>Agent 工具调用教程 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 |
| RAG、知识库和向量检索 | 228 | 0 | 32 | 5 | RAG 知识库搭建教程<br>企业知识库 AI 部署 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 |
| 本地模型和开源模型部署 | 224 | 0 | 14 | 5 | 本地部署大模型教程<br>Ollama 本地部署 | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 |
| Dify、n8n、Flowise 和无代码 AI 自动化 | 220 | 0 | 21 | 5 | Dify 部署教程<br>n8n AI Agent 自托管 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 |
| 模型 API 接入、限流和多模型降级 | 218 | 0 | 18 | 5 | OpenAI API Next.js<br>Claude API 接入 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 |
| LLM Serving、GPU 和托管推理 | 217 | 0 | 7 | 5 | vLLM 部署教程<br>TGI 部署教程 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 |
| LLM 观测、评测和上线质量 | 216 | 0 | 14 | 5 | LLM observability 教程<br>Agent 可观测性 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 |
| MCP、工具权限和企业集成安全 | 214 | 0 | 13 | 5 | MCP Server 部署安全<br>Agent 工具权限控制 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 |
| 大模型和 AI 应用部署 | 174 | 2 | 61 | 5 | 大模型部署教程<br>AI 应用部署教程 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 |
| AI 应用部署报错和排查 | 152 | 2 | 88 | 5 | Vercel build failed<br>Vercel 部署后 404 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 |

## Agent 部署、工具调用和工作流

- Audience: 正在把聊天助手升级成工作流或内部工具的人
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 工具白名单
- 多步执行
- 人工确认
- 失败重试
- 日志追踪

Search queries to cover:

- AI Agent 部署教程
- Agent 工具调用教程
- AI 工作流部署
- Agent 人工审核流程

Review focus:

- 区分 Agent、Workflow、普通聊天机器人
- 核对工具调用、状态、人工接管和日志边界
- 避免承诺全自动完成业务结果

Source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://python.langchain.com/docs

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 40 | 100 | AI Agent | informational | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 40 | 100 | AI 记忆 | informational | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 33 | 100 | 接单报价 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | AI 部署 | informational | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | 100 | AI 部署 | informational | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |

## RAG、知识库和向量检索

- Audience: 客服知识库、企业内部问答、文档检索项目负责人
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 文档清洗
- chunk
- embedding
- metadata
- 引用来源
- 测试集

Search queries to cover:

- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库 RAG 教程
- RAG 评测怎么做

Review focus:

- 区分 RAG、微调和普通提示词
- 核对切分、embedding、召回、引用和评测说法
- 说明隐私、幻觉和人工复核边界

Source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 40 | 100 | AI 记忆 | informational | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 34 | 100 | AI 部署 | informational | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 33 | 100 | 接单报价 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | AI 部署 | informational | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | 100 | AI 部署 | informational | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |

## 本地模型和开源模型部署

- Audience: 想低成本或本地运行模型的开发者、团队和爱好者
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 硬件估算
- 模型下载
- 本地 API
- 量化
- 网页聊天

Search queries to cover:

- 本地部署大模型教程
- Ollama 本地部署
- Open WebUI Ollama 部署
- 本地大模型显存不够

Review focus:

- 核对显存、量化、模型大小和上下文要求
- 区分 Ollama、LM Studio、Open WebUI、vLLM 和 TGI
- 不要暗示本地部署一定更省钱或更安全

Source targets:

- Ollama docs: https://docs.ollama.com
- vLLM docs: https://docs.vllm.ai
- Hugging Face docs: https://huggingface.co/docs

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 33 | 100 | AI 部署 | informational | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 32 | 100 | AI 部署 | informational | 本地部署大模型显存不够 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| 29 | 100 | AI 基建 | informational | Docker 使用 NVIDIA GPU | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx |
| 29 | 100 | AI 基建 | informational | Kubernetes GPU 大模型部署 | Kubernetes 怎么部署 GPU 大模型：Device Plugin、资源限制和调度边界 | content/blog/kubernetes-gpu-llm-deployment-guide.mdx |
| 29 | 100 | AI 基建 | informational | Modal Serverless GPU LLM | Modal 怎么部署 Serverless GPU LLM：代码化环境和冷启动先评估 | content/blog/modal-serverless-gpu-llm-guide.mdx |

## Dify、n8n、Flowise 和无代码 AI 自动化

- Audience: 用 Dify、n8n、Flowise、Coze 做自动化和知识库的人
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 自部署
- Webhook
- 鉴权
- 错误处理
- 人工兜底

Search queries to cover:

- Dify 部署教程
- n8n AI Agent 自托管
- Flowise 本地部署
- Dify 工作流错误处理

Review focus:

- 核对自部署和云端功能边界
- 检查 Webhook、权限、连接器、错误处理和人工兜底
- 避免引导群发、绕规则或站外交易

Source targets:

- Dify docs: https://docs.dify.ai
- n8n docs: https://docs.n8n.io

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 33 | 100 | 接单报价 | informational | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | 100 | AI 部署 | informational | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | 100 | AI 部署 | informational | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 33 | 100 | AI 部署 | informational | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | 100 | AI 部署 | informational | n8n AI Agent Webhook | n8n AI Agent 接 Webhook 怎么上线：触发、鉴权、队列和失败重试 | content/blog/n8n-ai-agent-webhook-production-guide.mdx |

## 模型 API 接入、限流和多模型降级

- Audience: 正在接入 OpenAI、Claude、Gemini、OpenRouter 等 API 的开发者
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 服务端调用
- 限流重试
- 降级模型
- 成本控制
- Key 轮换

Search queries to cover:

- OpenAI API Next.js
- Claude API 接入
- Gemini API Next.js
- API rate limit 怎么办

Review focus:

- 核对 API 端点、模型名、限流、费用和降级方式
- 检查 key 安全和重试逻辑
- 避免把过期模型名或价格写死为结论

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 34 | 100 | AI 部署 | informational | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 34 | 100 | AI 部署 | informational | Claude API rate limit reached | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |
| 34 | 100 | AI 部署 | informational | Gemini API 限流 | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx |
| 34 | 100 | AI 部署 | informational | 多模型 Router 降级 | 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 | content/blog/multi-model-router-fallback-guide.mdx |
| 34 | 100 | AI 部署 | informational | OpenAI Batch API | OpenAI Batch API 适合什么任务：批量摘要、分类、抽取和成本控制 | content/blog/openai-batch-api-cost-guide.mdx |

## LLM Serving、GPU 和托管推理

- Audience: 需要自部署或托管 LLM 服务的工程团队
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 在线 serving
- 并发
- GPU
- 冷启动
- 成本延迟

Search queries to cover:

- vLLM 部署教程
- TGI 部署教程
- RunPod Serverless 大模型部署
- Modal Serverless GPU LLM

Review focus:

- 核对 serving 框架版本和部署方式
- 说明冷启动、并发、成本、GPU、扩缩容和监控
- 避免把 benchmark 写成项目保证

Source targets:

- vLLM docs: https://docs.vllm.ai
- Hugging Face docs: https://huggingface.co/docs

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 29 | 100 | AI 基建 | informational | BentoML LLM 部署 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 29 | 100 | AI 基建 | informational | Hugging Face TGI 部署 | Hugging Face TGI 怎么部署：Text Generation Inference 入门检查表 | content/blog/huggingface-tgi-deployment-guide.mdx |
| 29 | 100 | AI 基建 | informational | Modal Serverless GPU LLM | Modal 怎么部署 Serverless GPU LLM：代码化环境和冷启动先评估 | content/blog/modal-serverless-gpu-llm-guide.mdx |
| 29 | 100 | AI 基建 | informational | Ray Serve LLM 部署 | Ray Serve 怎么部署 LLM：多节点、多模型和 OpenAI 兼容接口入门 | content/blog/ray-serve-llm-deployment-guide.mdx |
| 29 | 100 | AI 基建 | informational | RunPod Serverless 大模型部署 | RunPod Serverless 怎么部署大模型：Endpoint、Worker 和冷启动边界 | content/blog/runpod-serverless-llm-deployment-guide.mdx |

## LLM 观测、评测和上线质量

- Audience: 把 Agent 或 RAG 做进生产环境的团队
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 日志
- tracing
- 评测集
- 成本
- 失败复盘

Search queries to cover:

- LLM observability 教程
- Agent 可观测性
- RAG 评测
- promptfoo LLM 评测

Review focus:

- 核对日志、tracing、评测和成本字段
- 区分观测、评测、监控和人工复盘
- 不要把单次评测结果当成长期质量保证

Source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 33 | 100 | AI 基建 | informational | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 32 | 100 | AI 基建 | informational | Agent 工具权限控制 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| 28 | 100 | AI 基建 | informational | Arize Phoenix LLM Tracing | Arize Phoenix 怎么做 LLM Tracing：OpenTelemetry、评测和排错入门 | content/blog/arize-phoenix-llm-observability-guide.mdx |
| 28 | 100 | AI 基建 | informational | Helicone LLM Observability | Helicone 怎么做 LLM 观测：Gateway、日志、成本和限流先管住 | content/blog/helicone-llm-observability-guide.mdx |
| 28 | 100 | AI 基建 | informational | LangSmith Observability | LangSmith 怎么做观测和评测：别再只靠 print 调试 Agent | content/blog/langsmith-observability-evaluation-guide.mdx |

## MCP、工具权限和企业集成安全

- Audience: 部署 MCP Server、Agent 工具、企业 IM 接入的人
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 工具权限
- 审批
- 沙箱
- 审计日志
- IM 接入

Search queries to cover:

- MCP Server 部署安全
- Agent 工具权限控制
- 企业微信 AI Agent
- Slack AI Agent 接入

Review focus:

- 核对工具权限、沙箱、审批、审计日志和密钥边界
- 提醒读写执行要分级
- 避免给出绕过权限或自动执行敏感操作的建议

Source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- n8n docs: https://docs.n8n.io

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 34 | 100 | AI 部署 | informational | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 33 | 100 | AI 部署 | informational | 企业微信 飞书 Slack AI Agent | 企业微信、飞书、Slack 怎么接 AI Agent：消息入口、权限和人工接管 | content/blog/enterprise-im-ai-agent-integration-guide.mdx |
| 33 | 100 | AI 基建 | informational | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 32 | 100 | AI 基建 | informational | Agent 工具权限控制 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| 23 | 100 | AI 基建 | informational | Agent 生产上线 | Agent 生产上线检查表：权限、日志、成本和人工确认 | content/blog/agent-production-deployment-checklist.mdx |

## 大模型和 AI 应用部署

- Audience: 想把 AI 应用上线的新手开发者、独立站站长、接单服务者
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 环境变量
- API Key
- 限流重试
- 上线检查
- 回滚

Search queries to cover:

- 大模型部署教程
- AI 应用部署教程
- OpenAI API 部署教程
- Vercel AI SDK 部署

Review focus:

- 核对当前官方部署文档
- 检查环境变量、API Key、限流、日志、回滚和 smoke check
- 避免承诺一次部署就稳定运行

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Anthropic docs: https://docs.anthropic.com

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 40 | 100 | AI Agent | informational | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 40 | 100 | AI 部署 | informational | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 34 | 100 | AI 部署 | informational | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 34 | 100 | AI 部署 | informational | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 34 | 100 | AI 部署 | informational | Claude API rate limit reached | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |

## AI 应用部署报错和排查

- Audience: 部署失败、API 报错、环境变量缺失的新手
- Next action: Use these draft candidates in manual review; keep status=draft/noindex until explicit approval.

Workflow angles:

- 错误日志
- 复现
- 修复顺序
- 验证命令
- 接单边界

Search queries to cover:

- Vercel build failed
- Vercel 部署后 404
- API Key 无效或缺失
- 环境变量缺失怎么办

Review focus:

- 保留错误现象、原因、修复步骤和验证命令
- 不要把偶然修复写成通用结论
- 补齐官方文档或日志来源

Source targets:

- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI API docs: https://platform.openai.com/docs

Ready candidates:

| Batch | Score | Category | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 34 | 100 | AI 部署 | informational | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 20 | 100 | 工具流程 | informational | Claude Code 错误排查 | 用 Claude Code 排查客户报错时怎么做才稳 | content/blog/claude-code-error-debug.mdx |
| 20 | 100 | 工具流程 | informational | Claude Code 排查报错常见错误 | Claude Code 排查客户报错时的常见错误 | content/blog/claude-code-error-debug-mistakes.mdx |
| 18 | 100 | 报错解决 | informational | npm command not found 怎么解决 | npm command not found 怎么解决 | content/blog/npm-command-not-found-fix.mdx |
| 18 | 100 | 报错解决 | informational | npm command not found 排查检查清单 | npm command not found 排查检查清单 | content/blog/npm-command-not-found-fix-checklist.mdx |
