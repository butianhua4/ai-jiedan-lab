# Review Priority Roadmap

Generated at: 2026-06-09T10:47:09.353Z

This roadmap is read-only. It prioritizes manual review work and does not publish or mark articles for review.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Stop before: Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.
- Note: This roadmap prioritizes manual review work only. It does not change article status, noindex, or publishing state.

## Summary

- currentPackCandidates: 8
- lanes: 12
- plannedBatchCandidates: 28
- sourceLanes: 33
- topicsWithoutPublicCoverage: 7
- uniqueNextReviewFiles: 19
- unsafeCandidates: 0

## Next Review Files

- content/blog/ai-agent-memory-rag-design-guide.mdx
- content/blog/ai-model-selection-customer-service-guide.mdx
- content/blog/ai-automation-project-pricing-scope-guide.mdx
- content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- content/blog/industry-ai-prompts-template-library-2026.mdx
- content/blog/ai-prompt-library-team-knowledge-base-guide.mdx
- content/blog/data-analysis-ai-prompts-guide.mdx
- content/blog/education-ai-prompts-guide.mdx
- content/blog/dify-workflow-error-handling-guide.mdx
- content/blog/dify-workflow-vs-agent-guide.mdx
- content/blog/open-webui-functions-pipelines-deployment-guide.mdx
- content/blog/local-llm-vram-not-enough-guide.mdx
- content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx
- content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx
- content/blog/ai-api-key-security-rotation-guide.mdx
- content/blog/claude-api-rate-limit-debug-guide.mdx
- content/blog/gemini-api-rate-limit-debug-guide.mdx
- content/blog/customer-service-ai-prompts-guide.mdx
- content/blog/ecommerce-ai-prompts-guide.mdx

## Priority Lanes

| Lane | Score | Public | Drafts | Candidates | Current pack | Planned | Why |
| --- | --- | --- | --- | --- | --- | --- | --- |
| deployment: RAG、知识库和向量检索 | 348 | 0 | 32 | 5 | 1 | 5 | High search-intent lane with ready drafts but no public coverage yet. |
| content-backlog: RAG、知识库和向量检索 | 342 | 0 | 5 | 5 | 1 | 5 | 很多团队会搜索知识库 AI，但真正需要的是可审核、可引用、可质检的方案。 |
| deployment: Agent 部署、工具调用和工作流 | 338 | 0 | 41 | 5 | 1 | 3 | High search-intent lane with ready drafts but no public coverage yet. |
| content-backlog: Agent 部署、工具调用和记忆 | 334 | 0 | 5 | 5 | 1 | 3 | Agent、记忆和工作流是高频 AI 应用词，但需要清楚解释边界和落地步骤。 |
| content-backlog: 全行业 AI 提示词和工作流模板 | 334 | 0 | 5 | 5 | 2 | 4 | 提示词类内容搜索面宽，但需要从模板升级成行业流程，才更适合长期收录。 |
| industry-prompt: 全行业提示词模板库 | 324 | 0 | 17 | 4 | 1 | 2 | High search-intent lane with ready drafts but no public coverage yet. |
| deployment: Dify、n8n、Flowise 和无代码 AI 自动化 | 312 | 0 | 21 | 5 | 0 | 2 | High search-intent lane with ready drafts but no public coverage yet. |
| content-backlog: Dify、n8n、MCP 和无代码 AI 自动化 | 310 | 0 | 5 | 5 | 0 | 2 | 无代码 AI 自动化容易吸引搜索流量，也最需要平台规则和权限边界提醒。 |
| deployment: 本地模型和开源模型部署 | 310 | 0 | 14 | 5 | 0 | 1 | High search-intent lane with ready drafts but no public coverage yet. |
| content-backlog: Ollama、vLLM 和开源模型本地部署 | 300 | 0 | 5 | 5 | 0 | 0 | 本地模型部署搜索需求强，但信息变化快，必须保留人工事实核对。 |
| deployment: 模型 API 接入、限流和多模型降级 | 298 | 0 | 18 | 5 | 0 | 0 | High search-intent lane with ready drafts but no public coverage yet. |
| industry-prompt: 客服 | 286 | 0 | 3 | 3 | 1 | 1 | High search-intent lane with ready drafts but no public coverage yet. |

## deployment: RAG、知识库和向量检索

- Priority score: 348
- Public matches: 0
- Missing public coverage: true
- Rationale: High search-intent lane with ready drafts but no public coverage yet.

Search queries:

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

Workflow angles:

- 文档清洗
- chunk
- embedding
- metadata
- 引用来源
- 测试集

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 40 | true | false | true | 100 | AI 记忆 | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 34 | true | true | true | 100 | AI 部署 | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 33 | true | false | true | 100 | 接单报价 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | true | false | true | 100 | AI 部署 | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | true | false | true | 100 | AI 部署 | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |

## content-backlog: RAG、知识库和向量检索

- Priority score: 342
- Public matches: 0
- Missing public coverage: false
- Rationale: 很多团队会搜索知识库 AI，但真正需要的是可审核、可引用、可质检的方案。

Search queries:

- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库教程
- 客服知识库 AI

Review focus:

- 区分 RAG、微调和普通提示词
- 核对向量库、引用、召回和质检说法
- 说明失败案例和人工兜底

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs

Workflow angles:

- search intent
- fact review
- risk language
- internal links

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 40 | true | false | true | 100 | AI 记忆 | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 34 | true | true | true | 100 | AI 部署 | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 33 | true | false | true | 100 | 接单报价 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | true | false | true | 100 | AI 部署 | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | true | false | true | 100 | AI 部署 | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |

## deployment: Agent 部署、工具调用和工作流

- Priority score: 338
- Public matches: 0
- Missing public coverage: true
- Rationale: High search-intent lane with ready drafts but no public coverage yet.

Search queries:

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

Workflow angles:

- 工具白名单
- 多步执行
- 人工确认
- 失败重试
- 日志追踪

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 40 | true | true | true | 100 | AI Agent | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 40 | true | false | true | 100 | AI 记忆 | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 33 | true | false | true | 100 | 接单报价 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | true | false | false | 100 | AI 部署 | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | true | false | false | 100 | AI 部署 | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |

## content-backlog: Agent 部署、工具调用和记忆

- Priority score: 334
- Public matches: 0
- Missing public coverage: false
- Rationale: Agent、记忆和工作流是高频 AI 应用词，但需要清楚解释边界和落地步骤。

Search queries:

- AI Agent 部署教程
- Agent 记忆怎么做
- AI Agent 工具调用教程
- AI 工作流部署

Review focus:

- 解释工具调用和多步执行边界
- 明确记忆、状态和人工确认的安全边界
- 避免承诺全自动完成业务结果

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs

Workflow angles:

- search intent
- fact review
- risk language
- internal links

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 40 | true | true | true | 100 | AI Agent | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 40 | true | false | true | 100 | AI 记忆 | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 33 | true | false | true | 100 | 接单报价 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | true | false | false | 100 | AI 部署 | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | true | false | false | 100 | AI 部署 | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |

## content-backlog: 全行业 AI 提示词和工作流模板

- Priority score: 334
- Public matches: 0
- Missing public coverage: false
- Rationale: 提示词类内容搜索面宽，但需要从模板升级成行业流程，才更适合长期收录。

Search queries:

- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词
- HR AI 提示词

Review focus:

- 按行业给可复制结构
- 避免空泛万能提示词
- 补充输入字段、质检标准和反例

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs

Workflow angles:

- search intent
- fact review
- risk language
- internal links

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 40 | true | true | true | 100 | AI 提示词 | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 34 | true | true | true | 100 | AI 部署 | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 32 | true | false | true | 100 | AI 提示词 | 团队 AI 提示词库 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| 31 | true | false | true | 100 | AI 提示词 | 数据分析 AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| 31 | true | false | false | 100 | AI 提示词 | 教育 AI 提示词 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |

## industry-prompt: 全行业提示词模板库

- Priority score: 324
- Public matches: 0
- Missing public coverage: true
- Rationale: High search-intent lane with ready drafts but no public coverage yet.

Search queries:

- AI 提示词大全
- ChatGPT 提示词模板
- 全行业 AI 提示词
- AI prompt library

Review focus:

- 必须说明提示词不是万能答案
- 补齐输入字段、输出格式、质检标准和反例
- 避免承诺直接带来成交、排名或收益

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Google Gemini Workspace prompting: https://support.google.com/docs/answer/15013615
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Workflow angles:

- 行业分类
- 提示词版本管理
- 审核标准
- 复用规则

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 40 | true | true | true | 100 | AI 提示词 | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 31 | true | false | true | 100 | AI 提示词 | 数据分析 AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| 31 | true | false | false | 100 | AI 提示词 | 教育 AI 提示词 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| 31 | true | false | false | 100 | AI 提示词 | 医疗 AI 提示词 | 医疗行政 AI 提示词模板：病历摘要、随访问卷和宣教材料怎么安全写 | content/blog/healthcare-admin-ai-prompts-guide.mdx |

## deployment: Dify、n8n、Flowise 和无代码 AI 自动化

- Priority score: 312
- Public matches: 0
- Missing public coverage: true
- Rationale: High search-intent lane with ready drafts but no public coverage yet.

Search queries:

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

Workflow angles:

- 自部署
- Webhook
- 鉴权
- 错误处理
- 人工兜底

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 33 | true | false | true | 100 | 接单报价 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | true | false | false | 100 | AI 部署 | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | true | false | false | 100 | AI 部署 | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 33 | true | false | true | 100 | AI 部署 | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 33 | true | false | false | 100 | AI 部署 | n8n AI Agent Webhook | n8n AI Agent 接 Webhook 怎么上线：触发、鉴权、队列和失败重试 | content/blog/n8n-ai-agent-webhook-production-guide.mdx |

## content-backlog: Dify、n8n、MCP 和无代码 AI 自动化

- Priority score: 310
- Public matches: 0
- Missing public coverage: false
- Rationale: 无代码 AI 自动化容易吸引搜索流量，也最需要平台规则和权限边界提醒。

Search queries:

- Dify 部署教程
- n8n AI 自动化教程
- MCP 使用教程
- AI 自动化工作流教程

Review focus:

- 明确 Dify、n8n、MCP 的适用范围
- 核对连接器、Webhook 和权限风险
- 避免鼓励群发、绕规则或站外交易

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs

Workflow angles:

- search intent
- fact review
- risk language
- internal links

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 33 | true | false | true | 100 | 接单报价 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 33 | true | false | false | 100 | AI 部署 | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 33 | true | false | false | 100 | AI 部署 | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 33 | true | false | false | 100 | AI 基建 | MCP Server 部署安全 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 33 | true | false | true | 100 | AI 部署 | n8n AI Agent 知识库记忆 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |

## deployment: 本地模型和开源模型部署

- Priority score: 310
- Public matches: 0
- Missing public coverage: true
- Rationale: High search-intent lane with ready drafts but no public coverage yet.

Search queries:

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

Workflow angles:

- 硬件估算
- 模型下载
- 本地 API
- 量化
- 网页聊天

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 33 | true | false | true | 100 | AI 部署 | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 32 | true | false | false | 100 | AI 部署 | 本地部署大模型显存不够 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| 29 | true | false | false | 100 | AI 基建 | Docker 使用 NVIDIA GPU | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx |
| 29 | true | false | false | 100 | AI 基建 | Kubernetes GPU 大模型部署 | Kubernetes 怎么部署 GPU 大模型：Device Plugin、资源限制和调度边界 | content/blog/kubernetes-gpu-llm-deployment-guide.mdx |
| 29 | true | false | false | 100 | AI 基建 | Modal Serverless GPU LLM | Modal 怎么部署 Serverless GPU LLM：代码化环境和冷启动先评估 | content/blog/modal-serverless-gpu-llm-guide.mdx |

## content-backlog: Ollama、vLLM 和开源模型本地部署

- Priority score: 300
- Public matches: 0
- Missing public coverage: false
- Rationale: 本地模型部署搜索需求强，但信息变化快，必须保留人工事实核对。

Search queries:

- Ollama 本地部署教程
- vLLM 部署教程
- 本地大模型部署
- 开源大模型部署教程

Review focus:

- 核对显卡、内存、模型尺寸和量化要求
- 区分 Ollama、vLLM、TGI 等使用场景
- 不要暗示本地部署一定更省钱

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs

Workflow angles:

- search intent
- fact review
- risk language
- internal links

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 40 | true | false | false | 100 | AI 部署 | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 32 | true | false | false | 100 | AI 部署 | 本地部署大模型显存不够 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| 29 | true | false | false | 100 | AI 基建 | Docker 使用 NVIDIA GPU | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx |
| 29 | true | false | false | 100 | AI 基建 | Hugging Face TGI 部署 | Hugging Face TGI 怎么部署：Text Generation Inference 入门检查表 | content/blog/huggingface-tgi-deployment-guide.mdx |
| 29 | true | false | false | 100 | AI 基建 | Kubernetes GPU 大模型部署 | Kubernetes 怎么部署 GPU 大模型：Device Plugin、资源限制和调度边界 | content/blog/kubernetes-gpu-llm-deployment-guide.mdx |

## deployment: 模型 API 接入、限流和多模型降级

- Priority score: 298
- Public matches: 0
- Missing public coverage: true
- Rationale: High search-intent lane with ready drafts but no public coverage yet.

Search queries:

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

Workflow angles:

- 服务端调用
- 限流重试
- 降级模型
- 成本控制
- Key 轮换

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 34 | true | false | false | 100 | AI 部署 | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 34 | true | false | false | 100 | AI 部署 | Claude API rate limit reached | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |
| 34 | true | false | false | 100 | AI 部署 | Gemini API 限流 | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx |
| 34 | true | false | false | 100 | AI 部署 | 多模型 Router 降级 | 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 | content/blog/multi-model-router-fallback-guide.mdx |
| 34 | true | false | false | 100 | AI 部署 | OpenAI Batch API | OpenAI Batch API 适合什么任务：批量摘要、分类、抽取和成本控制 | content/blog/openai-batch-api-cost-guide.mdx |

## industry-prompt: 客服

- Priority score: 286
- Public matches: 0
- Missing public coverage: true
- Rationale: High search-intent lane with ready drafts but no public coverage yet.

Search queries:

- 客服 AI 提示词
- 客服回复 AI 模板
- 工单分类 AI prompt
- 售后回复 AI 提示词

Review focus:

- 强调人工升级边界
- 敏感投诉和退款不能自动定性
- 输出必须包含情绪安抚和事实确认

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Google Gemini Workspace prompting: https://support.google.com/docs/answer/15013615
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Workflow angles:

- 回复草稿
- 工单分类
- 情绪安抚
- 升级判断

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 40 | true | true | true | 100 | AI 提示词 | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 30 | true | false | false | 100 | AI 提示词 | 客服 AI 提示词 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| 30 | true | false | false | 100 | AI 提示词 | 电商 AI 提示词 | 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 | content/blog/ecommerce-ai-prompts-guide.mdx |
