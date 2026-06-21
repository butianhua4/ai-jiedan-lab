# Broad Search Demand Map

Generated at: 2026-06-21T15:28:11.730Z

This report is read-only. It turns broad user-search demand areas into a review and content-gap map. It does not publish, mark review, claim keyword volume, or claim traffic.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Note: Read-only broad-demand map. It prioritizes likely user-search themes from the local content inventory and official source targets; it does not claim keyword volume, rankings, clicks, or traffic.

## Summary

- themes: 10
- themesWithReadyDrafts: 6
- themesWithoutPublicCoverage: 0
- totalReadyDraftMatches: 82
- uniqueCandidateFiles: 27
- reviewPackThemeMatches: 2
- plannedWaveThemeMatches: 15
- missingSubtopics: 25
- maxGapScore: 308

## Top Themes

| Score | Priority | Public | Drafts | Ready | Review pack | Planned wave | Missing subtopics | Theme |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 308 | 100 | 38 | 15 | 15 | 1 | 7 | smoke check, rollback | AI app and model API deployment |
| 258 | 96 | 28 | 4 | 4 | 1 | 4 | knowledge base, vector database | RAG, knowledge base, and agent memory |
| 248 | 100 | 51 | 15 | 15 | 0 | 0 | customer service | Cross-industry AI prompt templates |
| 228 | 98 | 35 | 0 | 0 | 0 | 0 | tool calling, human review, permissions, logs | Agent deployment, tool calling, and production workflows |
| 226 | 92 | 14 | 1 | 1 | 0 | 1 | gpu memory, quantization, local api, model download | Local and open-source model deployment |
| 222 | 80 | 117 | 45 | 45 | 0 | 1 | maintenance, handoff | AI service pricing, scope, and delivery |
| 216 | 90 | 7 | 2 | 2 | 0 | 2 | concurrency, autoscaling | LLM serving, GPU, and managed inference |
| 196 | 86 | 15 | 0 | 0 | 0 | 0 | support, product, weekly report | Business AI workflows and SOP templates |

## AI app and model API deployment

- ID: ai-app-and-api-deployment
- Audience: Beginners and teams searching how to put AI apps, model APIs, and agent tools online.
- Gap score: 308
- Public matches: 38
- Ready drafts: 15
- Review pack matches: 1
- Planned wave matches: 7
- Missing subtopics: smoke check, rollback

Search seeds:

- AI app deployment tutorial
- OpenAI API deployment
- Vercel AI SDK deployment
- Claude API Next.js deployment

Review focus:

- current official docs
- environment variables and API keys
- rate limits, logs, rollback, and smoke checks

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 34 | 100 | informational | Vercel AI Gateway 多模型 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 26 | 100 | informational | Vercel AI SDK 聊天机器人部署 | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |
| 22 | 100 | informational | vLLM 部署 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| 19 | 100 | informational | Vercel 部署检查表 | Vercel 部署检查表怎么写：给新手的上线模板 | content/blog/vercel-deploy-checklist-template.mdx |
| 19 | 100 | informational | Vercel 部署检查表怎么写：新手检查清单 | Vercel 部署检查表怎么写：新手检查清单 | content/blog/vercel-deploy-checklist-template-checklist.mdx |
| 17 | 100 | informational | Vercel 和 Netlify 部署小网站怎么选 | Vercel 和 Netlify 部署小网站怎么选 | content/blog/vercel-vs-netlify-small-site.mdx |
| 17 | 100 | informational | Vercel 和 Netlify 部署小网站怎么选：新手检查清单 | Vercel 和 Netlify 部署小网站怎么选：新手检查清单 | content/blog/vercel-vs-netlify-small-site-checklist.mdx |
| 15 | 100 | informational | Vercel 部署成功但 404 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

## RAG, knowledge base, and agent memory

- ID: rag-knowledge-memory
- Audience: Support, operations, and internal knowledge teams building document Q&A and memory features.
- Gap score: 258
- Public matches: 28
- Ready drafts: 4
- Review pack matches: 1
- Planned wave matches: 4
- Missing subtopics: knowledge base, vector database

Search seeds:

- RAG knowledge base tutorial
- AI agent memory
- vector database RAG
- enterprise knowledge base AI

Review focus:

- RAG versus fine-tuning
- chunking and embeddings
- citations
- evaluation and privacy

Source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 27 | 100 | informational | Together AI API 接入 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 25 | 100 | informational | RAG 向量数据库怎么选 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 24 | 100 | informational | Supabase pgvector | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 21 | 100 | informational | 向量数据库 | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |

## Cross-industry AI prompt templates

- ID: cross-industry-prompts
- Audience: Business teams searching reusable prompts for departments instead of one-off ChatGPT tricks.
- Gap score: 248
- Public matches: 51
- Ready drafts: 15
- Review pack matches: 0
- Planned wave matches: 0
- Missing subtopics: customer service

Search seeds:

- ChatGPT prompts for business
- AI prompt template library
- industry AI prompts
- best AI prompts for work

Review focus:

- input fields
- output formats
- quality checks
- risk disclaimers
- prompt versioning

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 20 | 100 | informational | 模板下载页 CTA 文案怎么写 | 模板下载页 CTA 文案怎么写 | content/blog/template-download-cta-copy.mdx |
| 20 | 100 | informational | 模板下载页 CTA 文案怎么写：新手检查清单 | 模板下载页 CTA 文案怎么写：新手检查清单 | content/blog/template-download-cta-copy-checklist.mdx |
| 20 | 100 | informational | 模板下载站新手需要哪些工具 | 模板下载站新手需要哪些工具 | content/blog/template-download-site-tools.mdx |
| 20 | 100 | informational | 模板下载站新手需要哪些工具：新手检查清单 | 模板下载站新手需要哪些工具：新手检查清单 | content/blog/template-download-site-tools-checklist.mdx |
| 20 | 100 | informational | 模板站什么时候接入支付平台 | 模板站什么时候接入支付平台 | content/blog/template-site-payment-platform-timing.mdx |
| 20 | 100 | informational | 模板站什么时候接入支付平台：新手检查清单 | 模板站什么时候接入支付平台：新手检查清单 | content/blog/template-site-payment-platform-timing-checklist.mdx |
| 20 | 100 | informational | 网站修改需求确认模板怎么用 | 网站修改需求确认模板怎么用 | content/blog/website-edit-scope-template.mdx |
| 20 | 100 | informational | 网站修改需求确认模板怎么用：新手检查清单 | 网站修改需求确认模板怎么用：新手检查清单 | content/blog/website-edit-scope-template-checklist.mdx |

## Agent deployment, tool calling, and production workflows

- ID: agent-deployment-and-tools
- Audience: Developers moving from chatbot demos to production agents and workflow automation.
- Gap score: 228
- Public matches: 35
- Ready drafts: 0
- Review pack matches: 0
- Planned wave matches: 0
- Missing subtopics: tool calling, human review, permissions, logs

Search seeds:

- AI Agent deployment tutorial
- agent tool calling tutorial
- OpenAI Agents SDK beginner guide
- Vercel AI SDK agent

Review focus:

- tool permissions
- multi-step state
- human approval
- observability and fallback paths

Source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://python.langchain.com/docs

Ready draft candidates:

- none

## Local and open-source model deployment

- ID: local-and-open-models
- Audience: Builders evaluating local or open-source models for privacy, cost, and experimentation.
- Gap score: 226
- Public matches: 14
- Ready drafts: 1
- Review pack matches: 0
- Planned wave matches: 1
- Missing subtopics: gpu memory, quantization, local api, model download

Search seeds:

- local LLM deployment
- Ollama local model tutorial
- Open WebUI deployment
- local AI model GPU memory

Review focus:

- hardware sizing
- model size and quantization
- local API exposure
- privacy caveats

Source targets:

- Ollama docs: https://docs.ollama.com
- Hugging Face docs: https://huggingface.co/docs
- vLLM docs: https://docs.vllm.ai

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 29 | 100 | informational | TensorRT-LLM 入门 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |

## AI service pricing, scope, and delivery

- ID: ai-service-pricing-scope
- Audience: Freelancers and service sellers packaging AI deployment and automation work for clients.
- Gap score: 222
- Public matches: 117
- Ready drafts: 45
- Review pack matches: 0
- Planned wave matches: 1
- Missing subtopics: maintenance, handoff

Search seeds:

- AI automation project pricing
- AI agent project scope
- RAG project quote
- Dify n8n project pricing

Review focus:

- scope boundaries
- acceptance criteria
- maintenance fee
- no income guarantees

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Dify docs: https://docs.dify.ai

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 20 | 100 | informational | Upwork 投标复盘表怎么记录 | Upwork 投标复盘表怎么记录 | content/blog/upwork-proposal-review-sheet.mdx |
| 20 | 100 | informational | Upwork 投标复盘表怎么记录：新手检查清单 | Upwork 投标复盘表怎么记录：新手检查清单 | content/blog/upwork-proposal-review-sheet-checklist.mdx |
| 20 | 100 | informational | 网站修改需求确认模板怎么用 | 网站修改需求确认模板怎么用 | content/blog/website-edit-scope-template.mdx |
| 20 | 100 | informational | 网站修改需求确认模板怎么用：新手检查清单 | 网站修改需求确认模板怎么用：新手检查清单 | content/blog/website-edit-scope-template-checklist.mdx |
| 19 | 100 | informational | Upwork Proposal 新手模板怎么改 | Upwork Proposal 新手模板怎么改 | content/blog/upwork-proposal-template-edit.mdx |
| 19 | 100 | informational | Upwork Proposal 新手模板怎么改：新手检查清单 | Upwork Proposal 新手模板怎么改：新手检查清单 | content/blog/upwork-proposal-template-edit-checklist.mdx |
| 17 | 100 | informational | Wise 和 Payoneer 收款怎么选 | Wise 和 Payoneer 收款怎么选 | content/blog/wise-vs-payoneer-freelancer.mdx |
| 17 | 100 | informational | Wise 和 Payoneer 收款怎么选：新手检查清单 | Wise 和 Payoneer 收款怎么选：新手检查清单 | content/blog/wise-vs-payoneer-freelancer-checklist.mdx |

## LLM serving, GPU, and managed inference

- ID: llm-serving-gpu
- Audience: Engineering teams serving open models on GPUs or managed serverless inference platforms.
- Gap score: 216
- Public matches: 7
- Ready drafts: 2
- Review pack matches: 0
- Planned wave matches: 2
- Missing subtopics: concurrency, autoscaling

Search seeds:

- vLLM deployment tutorial
- Hugging Face TGI deployment
- RunPod serverless LLM
- serverless GPU LLM deployment

Review focus:

- serving framework versions
- cold starts and concurrency
- GPU cost
- autoscaling and monitoring

Source targets:

- vLLM docs: https://docs.vllm.ai
- Hugging Face docs: https://huggingface.co/docs

Ready draft candidates:

| Batch | Score | Intent | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- |
| 29 | 100 | informational | TensorRT-LLM 入门 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 22 | 100 | informational | vLLM 部署 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |

## Business AI workflows and SOP templates

- ID: business-ai-workflows
- Audience: Teams deciding where AI actually fits across sales, support, operations, HR, finance, and product.
- Gap score: 196
- Public matches: 15
- Ready drafts: 0
- Review pack matches: 0
- Planned wave matches: 0
- Missing subtopics: support, product, weekly report

Search seeds:

- AI workflow examples
- AI use cases for business
- AI automation workflow
- department AI SOP

Review focus:

- workflow owner
- handoff and approval
- measurable output
- risk boundary

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs

Ready draft candidates:

- none

## All Themes

| Score | Priority | Public | Drafts | Ready | Review pack | Planned wave | Missing subtopics | Theme |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 308 | 100 | 38 | 15 | 15 | 1 | 7 | smoke check, rollback | AI app and model API deployment |
| 258 | 96 | 28 | 4 | 4 | 1 | 4 | knowledge base, vector database | RAG, knowledge base, and agent memory |
| 248 | 100 | 51 | 15 | 15 | 0 | 0 | customer service | Cross-industry AI prompt templates |
| 228 | 98 | 35 | 0 | 0 | 0 | 0 | tool calling, human review, permissions, logs | Agent deployment, tool calling, and production workflows |
| 226 | 92 | 14 | 1 | 1 | 0 | 1 | gpu memory, quantization, local api, model download | Local and open-source model deployment |
| 222 | 80 | 117 | 45 | 45 | 0 | 1 | maintenance, handoff | AI service pricing, scope, and delivery |
| 216 | 90 | 7 | 2 | 2 | 0 | 2 | concurrency, autoscaling | LLM serving, GPU, and managed inference |
| 196 | 86 | 15 | 0 | 0 | 0 | 0 | support, product, weekly report | Business AI workflows and SOP templates |
| 192 | 88 | 23 | 0 | 0 | 0 | 0 | self hosted, connector | Dify, n8n, Flowise, and no-code AI automation |
| 192 | 84 | 11 | 0 | 0 | 0 | 0 | logs, prompt injection, cost tracking | LLM evaluation, observability, and security |
