# Search Intent Wave Planner

Generated at: 2026-06-21T10:53:30.182Z

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
- uniqueLanes: 7
- unsafeItems: 0
- sourceLaneMapItems: 22
- sourceApprovalNextGapItems: 0

## Source Evidence

- Note: The planner uses editorial lane priorities and safe draft evidence only. It does not claim measured keyword volume, impressions, clicks, or traffic.
- Lane map guardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only search-intent lane map. Demand scores are editorial prioritization signals from broad query patterns and source review needs, not keyword-volume or traffic data."}
- Approval guardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only human approval packet derived from the search-intent lane map. It does not change article status, noindex, or publishing state.","stopBefore":"Run confirm-human or publish confirm commands only after explicit human approval for each file."}

## Wave 1: Current human approval packet

- Items: 3
- Ready items: 3
- Lanes: 2
- Unique source targets: 7

| Ready | Safe draft | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 224 | 100 | 25 | RAG, knowledge base, and Agent memory | RAG 向量数据库怎么选 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| true | true | 180 | 100 | 34 | Model API integration, rate limits, and multi-model fallback | Vercel AI Gateway 多模型 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| true | true | 224 | 100 | 24 | RAG, knowledge base, and Agent memory | Supabase pgvector | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |

Review focus:

- chunking and metadata
- citation and source boundaries
- privacy and retention
- evaluation set
- current model names
- rate limits
- retry behavior
- key rotation
- fallback quality

Source targets:

- OpenAI retrieval: https://platform.openai.com/docs/guides/retrieval
- OpenAI Agents knowledge and memory: https://platform.openai.com/docs/guides/agents
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com
- Vercel AI SDK providers: https://ai-sdk.dev/docs/foundations/providers-and-models

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Retrieval quality, citations, memory retention, privacy, and hallucination risks are explicit.
- Article-specific operational and safety boundaries are explicit.

## Wave 2: AI automation service pricing, scope, and delivery checklist + Large model deployment, LLM serving, and GPU infrastructure + AI Agent deployment, tool calling, and production workflow

- Items: 3
- Ready items: 3
- Lanes: 3
- Unique source targets: 10

| Ready | Safe draft | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 186 | 86 | 29 | AI automation service pricing, scope, and delivery checklist | TensorRT-LLM 入门 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| true | true | 180 | 86 | 22 | Large model deployment, LLM serving, and GPU infrastructure | vLLM 部署 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| true | true | 170 | 86 | 26 | AI Agent deployment, tool calling, and production workflow | Vercel AI SDK 聊天机器人部署 | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |

Review focus:

- scope boundaries
- acceptance criteria
- maintenance fee
- risk disclaimers
- no income guarantees
- GPU and memory requirements
- serving framework versions
- cold start and concurrency
- cost boundaries
- tool permission boundaries
- loop control and stop conditions
- human handoff
- logs and fallback paths

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Dify docs: https://docs.dify.ai
- Hugging Face docs: https://huggingface.co/docs
- vLLM docs: https://docs.vllm.ai
- Modal docs: https://modal.com/docs
- OpenAI Agents: https://platform.openai.com/docs/guides/agents
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk
- Vercel AI SDK Agents: https://ai-sdk.dev/docs/agents
- n8n AI Agent node: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Article-specific operational and safety boundaries are explicit.
- GPU, memory, serving, concurrency, cold-start, and cost tradeoffs are framed as checks, not guarantees.
- Agent permissions, tool allowlists, human approval, logs, and rollback boundaries are explicit.

## Wave 3: AI app deployment errors and beginner troubleshooting + LLM observability, evaluation, and production quality + RAG, knowledge base, and Agent memory

- Items: 3
- Ready items: 3
- Lanes: 3
- Unique source targets: 9

| Ready | Safe draft | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 170 | 86 | 15 | AI app deployment errors and beginner troubleshooting | Vercel 部署后 404 检查清单 | Vercel 部署后 404 检查清单：逐页验收更稳 | content/blog/vercel-404-after-deploy-checklist.mdx |
| true | true | 126 | 86 | 13 | LLM observability, evaluation, and production quality | Vercel build failed 排查清单 | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |
| true | true | 224 | 86 | 27 | RAG, knowledge base, and Agent memory | Together AI API 接入 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |

Review focus:

- reproduction
- logs
- fix order
- verification command
- avoid overgeneralized fixes
- trace fields
- evaluation datasets
- cost logs
- failure review
- quality drift
- chunking and metadata
- citation and source boundaries
- privacy and retention
- evaluation set

Source targets:

- Vercel docs: https://vercel.com/docs
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI Evals: https://platform.openai.com/docs/guides/evals
- LangSmith docs: https://docs.smith.langchain.com
- promptfoo docs: https://www.promptfoo.dev/docs/intro/
- OpenAI retrieval: https://platform.openai.com/docs/guides/retrieval
- OpenAI Agents knowledge and memory: https://platform.openai.com/docs/guides/agents
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Article-specific operational and safety boundaries are explicit.
- Retrieval quality, citations, memory retention, privacy, and hallucination risks are explicit.

## Wave 4: RAG, knowledge base, and Agent memory + AI automation service pricing, scope, and delivery checklist + AI app deployment errors and beginner troubleshooting

- Items: 3
- Ready items: 3
- Lanes: 3
- Unique source targets: 8

| Ready | Safe draft | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 224 | 86 | 21 | RAG, knowledge base, and Agent memory | 向量数据库 | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |
| true | true | 186 | 86 | 13 | AI automation service pricing, scope, and delivery checklist | Vercel build failed 项目 | Vercel build failed 排查能不能项目：先看这 7 个边界 | content/blog/vercel-build-failed-causes-freelance-scope.mdx |
| true | true | 170 | 86 | 15 | AI app deployment errors and beginner troubleshooting | Vercel 部署成功但 404 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

Review focus:

- chunking and metadata
- citation and source boundaries
- privacy and retention
- evaluation set
- scope boundaries
- acceptance criteria
- maintenance fee
- risk disclaimers
- no income guarantees
- reproduction
- logs
- fix order
- verification command
- avoid overgeneralized fixes

Source targets:

- OpenAI retrieval: https://platform.openai.com/docs/guides/retrieval
- OpenAI Agents knowledge and memory: https://platform.openai.com/docs/guides/agents
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Dify docs: https://docs.dify.ai
- Vercel docs: https://vercel.com/docs

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Retrieval quality, citations, memory retention, privacy, and hallucination risks are explicit.
- Article-specific operational and safety boundaries are explicit.
