# Autopilot Broad Publish Waves

Generated at: 2026-06-11T17:07:31.874Z

## Guardrails

- Read-only broad publish wave planner. It turns high-demand freshness triage items into small human approval batches and never changes article status.
- Stop before mark:review and publish. Human approval is required per file and per wave.
- Traffic claim: not-included

## Summary

- Current public published: 15
- Waves: 8
- Waves ready for human approval: 8
- Items: 24
- Ready items: 24
- Unique files: 24
- Clusters covered: 7
- Unsafe items: 0
- Unsafe waves: 0

## Waves

| Wave | Ready | Projected public after approval | Theme | Files |
| --- | --- | --- | --- | --- |
| 1 | 3/3 | 18 | 开源大模型部署：Ollama、vLLM、TGI、RunPod + Agent 部署、工具调用和生产安全 + Agent 记忆：短期记忆、长期记忆、RAG、Postgres | content/blog/bentoml-llm-deployment-beginner-guide.mdx<br>content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx<br>content/blog/agent-memory-postgres-schema-guide.mdx |
| 2 | 3/3 | 18 | RAG、知识库、向量数据库和引用溯源 + 全行业 AI 提示词和工作流模板 + Dify、n8n、Coze、Flowise、MCP 自动化部署 | content/blog/ai-model-selection-customer-service-guide.mdx<br>content/blog/ai-prompt-library-team-knowledge-base-guide.mdx<br>content/blog/mcp-server-deployment-security-checklist.mdx |
| 3 | 3/3 | 18 | AI API 接入、限流、成本和多模型路由 + 开源大模型部署：Ollama、vLLM、TGI、RunPod + Agent 部署、工具调用和生产安全 | content/blog/ai-api-key-security-rotation-guide.mdx<br>content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx<br>content/blog/ai-agent-memory-rag-design-guide.mdx |
| 4 | 3/3 | 18 | Agent 记忆：短期记忆、长期记忆、RAG、Postgres + 全行业 AI 提示词和工作流模板 + Dify、n8n、Coze、Flowise、MCP 自动化部署 | content/blog/n8n-ai-agent-rag-memory-guide.mdx<br>content/blog/industry-ai-prompts-template-library-2026.mdx<br>content/blog/n8n-ai-agent-webhook-production-guide.mdx |
| 5 | 3/3 | 18 | AI API 接入、限流、成本和多模型路由 + 开源大模型部署：Ollama、vLLM、TGI、RunPod + Agent 部署、工具调用和生产安全 | content/blog/claude-api-rate-limit-debug-guide.mdx<br>content/blog/llm-api-rate-limit-retry-guide.mdx<br>content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 6 | 3/3 | 18 | Agent 记忆：短期记忆、长期记忆、RAG、Postgres + AI API 接入、限流、成本和多模型路由 + 开源大模型部署：Ollama、vLLM、TGI、RunPod | content/blog/open-webui-functions-pipelines-deployment-guide.mdx<br>content/blog/helicone-llm-observability-guide.mdx<br>content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| 7 | 3/3 | 18 | Agent 部署、工具调用和生产安全 + Agent 记忆：短期记忆、长期记忆、RAG、Postgres + 开源大模型部署：Ollama、vLLM、TGI、RunPod | content/blog/dify-workflow-error-handling-guide.mdx<br>content/blog/rag-citation-source-trace-guide.mdx<br>content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 8 | 3/3 | 18 | Agent 部署、工具调用和生产安全 + 开源大模型部署：Ollama、vLLM、TGI、RunPod | content/blog/dify-workflow-vs-agent-guide.mdx<br>content/blog/local-llm-vram-not-enough-guide.mdx<br>content/blog/enterprise-im-ai-agent-integration-guide.mdx |

## Next Wave Detail

### Wave 1: 开源大模型部署：Ollama、vLLM、TGI、RunPod + Agent 部署、工具调用和生产安全 + Agent 记忆：短期记忆、长期记忆、RAG、Postgres

- Stop before publish with --confirm.
- Mark review commands require human approval:
  - npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/agent-memory-postgres-schema-guide.mdx --confirm-human

| Order | Risk | Checks | Sources | Queries | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | high | 15 | 5 | 5 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 2 | high | 16 | 8 | 5 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 3 | high | 13 | 3 | 5 | Agent 记忆用 Postgres 怎么设计：用户偏好、项目事实和过期规则 | content/blog/agent-memory-postgres-schema-guide.mdx |

### Wave 2: RAG、知识库、向量数据库和引用溯源 + 全行业 AI 提示词和工作流模板 + Dify、n8n、Coze、Flowise、MCP 自动化部署

- Stop before publish with --confirm.
- Mark review commands require human approval:
  - npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/ai-prompt-library-team-knowledge-base-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/mcp-server-deployment-security-checklist.mdx --confirm-human

| Order | Risk | Checks | Sources | Queries | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | high | 16 | 10 | 5 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 2 | high | 16 | 7 | 6 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| 3 | high | 13 | 3 | 5 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |

### Wave 3: AI API 接入、限流、成本和多模型路由 + 开源大模型部署：Ollama、vLLM、TGI、RunPod + Agent 部署、工具调用和生产安全

- Stop before publish with --confirm.
- Mark review commands require human approval:
  - npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human

| Order | Risk | Checks | Sources | Queries | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | high | 14 | 12 | 5 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 2 | high | 15 | 8 | 5 | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx |
| 3 | high | 16 | 10 | 5 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |

