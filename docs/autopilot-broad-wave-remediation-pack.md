# Autopilot Broad Wave Remediation Pack

Generated at: 2026-06-17T16:47:45.423Z

This report is read-only. It turns broad AI publish-wave optimization items into manual remediation cards and keeps article edits, mark-review, and publishing human-gated.

## Guardrails

- Read-only remediation pack for broad AI publish waves. It consolidates SEO, source, internal-link, warning, and risk fixes without editing drafts.
- Use this pack during human review only. mark:review requires explicit human approval per file; publish --confirm is not included.
- Traffic claim: not-included

## Summary

- items: 7
- itemsWithCommandBoundary: 7
- itemsWithInternalLinkFixes: 7
- itemsWithPublicLinkPlan: 7
- itemsWithRemediationReasons: 7
- itemsWithRiskChecks: 7
- itemsWithSearchFixes: 7
- itemsWithSourceChecks: 7
- itemsWithWarningFixes: 7
- manualFixReadyItems: 7
- missingSpecificLinkSuggestionItems: 2
- unsafeItems: 0
- waveItems: 7
- waves: 3
- wavesReady: 3

## Source Evidence

- broadWaveOptimizationGeneratedAt: "2026-06-17T16:47:44.960Z"
- broadWaveOptimizationGuardrails: {"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"note":"Read-only optimization brief for broad publish waves. It proposes SEO, snippet, opening, internal-link, and risk-language checks without editing article files.","stopBefore":"Apply any copy or link changes only during human review. Do not mark review or publish automatically.","trafficClaim":"not-included"}
- broadWaveOptimizationItems: 7
- broadWaveOptimizationReadyItems: 7
- broadWaveOptimizationSafeDraftItems: 7
- broadWaveOptimizationUnsafeItems: 0
- publicArticles: 500
- trafficDataAvailable: false

## Wave Readiness

| Wave | Ready | Missing specific link suggestion | Unsafe | Items |
| --- | --- | --- | --- | --- |
| 1 | 3/3 | 1 | 0 | 3 |
| 2 | 3/3 | 1 | 0 | 3 |
| 3 | 1/1 | 0 | 0 | 1 |

## Unsafe Items

- none

## Remediation Items

| Wave | Ready | Reasons | Search fixes | Source checks | Link fixes | Link plan | Warnings | Risk checks | Mark-review gated | Publish confirm | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | true | 5 | 12 | 11 | 3 | 1 | 1 | 5 | true | not-included | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 1 | true | 5 | 12 | 9 | 3 | 1 | 2 | 6 | true | not-included | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 1 | true | 5 | 12 | 4 | 6 | 4 | 1 | 5 | true | not-included | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |
| 2 | true | 5 | 12 | 8 | 3 | 1 | 1 | 5 | true | not-included | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 2 | true | 5 | 12 | 11 | 3 | 1 | 2 | 6 | true | not-included | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| 2 | true | 5 | 12 | 4 | 6 | 4 | 2 | 6 | true | not-included | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |
| 3 | true | 5 | 12 | 12 | 3 | 1 | 3 | 7 | true | not-included | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |

## Per-Item Checklist

### Wave 1. Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索

- File: content/blog/supabase-pgvector-rag-guide.mdx
- Manual mark-review command: `npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx`
- Publish confirm: not-included

Public-link plan:

- Use suggested public link: Qdrant 向量数据库怎么用：RAG 新手先看集合、向量和过滤 (/blog/qdrant-vector-database-beginner-guide).

Search fixes:

- Make the title and first paragraph answer this search intent explicitly: RAG 知识库搭建教程.
- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Add one exact or near-exact search query naturally in the opening or first H2.
- Check search phrasing coverage: RAG 知识库搭建教程.
- Check search phrasing coverage: 向量数据库教程.
- Check search phrasing coverage: 企业知识库 AI 部署.
- Check search phrasing coverage: RAG 检索不到内容.
- Confirm article naturally answers search query: RAG 知识库搭建教程.
- Confirm article naturally answers search query: 向量数据库教程.
- Confirm article naturally answers search query: 企业知识库 AI 部署.

Source checks:

- Verify implementation-sensitive claims against source: https://platform.openai.com/docs/guides/retrieval.
- Verify implementation-sensitive claims against source: https://python.langchain.com/docs.
- Verify implementation-sensitive claims against source: https://docs.llamaindex.ai.
- Verify implementation-sensitive claims against source: https://huggingface.co/docs.
- Verify implementation-sensitive claims against source: https://platform.openai.com/docs.
- Verify implementation-sensitive claims against source: https://ai-sdk.dev/docs.
- Verify implementation-sensitive claims against source: https://docs.langchain.com.
- Verify implementation-sensitive claims against source: https://www.reddit.com/r/Rag/comments/1t9v93f/is_anyone_still_running_pure_vector_rag_in/.
- Verify implementation-sensitive claims against source: https://arxiv.org/abs/2603.10700.
- Verify implementation-sensitive claims against source: https://www.pinecone.io/learn/retrieval-augmented-generation/.

Warning fixes:

- Freshness risk is high; all implementation-sensitive claims need current source checks.

Risk checks:

- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Remove unsupported traffic, ranking, revenue, benchmark, or guaranteed-outcome language.
- Keep human review, rollback, logging, cost, privacy, and failure-handling boundaries explicit.
- Freshness risk is high; all implementation-sensitive claims need current source checks.
- Reject unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.

Human checklist:

- Review reason: broad AI wave item needs human remediation before approval.
- Review reason: specific public internal-link suggestion needs human acceptance or rejection.
- Review reason: warning remediation needs human sign-off.
- Review reason: search-intent wording needs human copy review.
- Review reason: source evidence needs human verification.
- Apply, rewrite, or explicitly reject search and snippet fixes before mark:review.
- Open source targets or run equivalent source checks before mark:review.
- Choose, apply, or explicitly reject the public internal-link plan before mark:review.
- Resolve warning and risk checks before mark:review.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Wave 1. TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收

- File: content/blog/tensorrt-llm-beginner-guide.mdx
- Manual mark-review command: `npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/tensorrt-llm-beginner-guide.mdx`
- Publish confirm: not-included

Public-link plan:

- Use suggested public link: 本地部署大模型怎么开始：新手先看硬件、模型和用途 (/blog/local-llm-deployment-beginner).

Search fixes:

- Make the title and first paragraph answer this search intent explicitly: 大模型部署教程.
- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Add one exact or near-exact search query naturally in the opening or first H2.
- Check search phrasing coverage: 大模型部署教程.
- Check search phrasing coverage: Ollama 本地部署教程.
- Check search phrasing coverage: vLLM 部署教程.
- Check search phrasing coverage: RunPod vLLM serverless.
- Confirm article naturally answers search query: 大模型部署教程.
- Confirm article naturally answers search query: Ollama 本地部署教程.
- Confirm article naturally answers search query: vLLM 部署教程.

Source checks:

- Verify implementation-sensitive claims against source: https://docs.vllm.ai.
- Verify implementation-sensitive claims against source: https://huggingface.co/docs.
- Verify implementation-sensitive claims against source: https://platform.openai.com/docs.
- Verify implementation-sensitive claims against source: https://ai-sdk.dev/docs.
- Verify implementation-sensitive claims against source: https://docs.ollama.com.
- Verify implementation-sensitive claims against source: https://docs.runpod.io/serverless/vllm/get-started.
- Verify implementation-sensitive claims against source: https://www.runpod.io/articles/guides/deploy-vllm-runpod-docker.
- Verify implementation-sensitive claims against source: https://www.spheron.network/blog/llm-deployment-guide/.
- Confirm every fast-changing model, SDK, API, deployment, pricing, and version claim against current official sources.

Warning fixes:

- Meta description is short; rewrite it before approval.
- Freshness risk is high; all implementation-sensitive claims need current source checks.

Risk checks:

- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Remove unsupported traffic, ranking, revenue, benchmark, or guaranteed-outcome language.
- Keep human review, rollback, logging, cost, privacy, and failure-handling boundaries explicit.
- Meta description is short; rewrite it before approval.
- Freshness risk is high; all implementation-sensitive claims need current source checks.
- Reject unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.

Human checklist:

- Review reason: broad AI wave item needs human remediation before approval.
- Review reason: specific public internal-link suggestion needs human acceptance or rejection.
- Review reason: warning remediation needs human sign-off.
- Review reason: search-intent wording needs human copy review.
- Review reason: source evidence needs human verification.
- Apply, rewrite, or explicitly reject search and snippet fixes before mark:review.
- Open source targets or run equivalent source checks before mark:review.
- Choose, apply, or explicitly reject the public internal-link plan before mark:review.
- Resolve warning and risk checks before mark:review.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Wave 1. Vercel build failed 排查清单：从日志到重新部署

- File: content/blog/vercel-build-failed-causes-checklist.mdx
- Manual mark-review command: `npm run mark:review -- --file=content/blog/vercel-build-failed-causes-checklist.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/vercel-build-failed-causes-checklist.mdx`
- Publish confirm: not-included

Public-link plan:

- No specific public link suggestion exists; human reviewer must choose a relevant published article or explicitly reject public linking for this draft.
- Fallback public link candidate: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 (/blog/ai-agent-deployment-vercel-ai-sdk-guide).
- Fallback public link candidate: Agent 部署怎么做：从聊天助手到可上线工作流 (/blog/agent-deployment-beginner-guide).
- Fallback public link candidate: Agent 人工审核流程怎么设计：什么时候自动，什么时候必须人确认 (/blog/agent-human-review-loop-guide).

Search fixes:

- Make the title and first paragraph answer this search intent explicitly: LLM observability 教程.
- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Add one exact or near-exact search query naturally in the opening or first H2.
- Check search phrasing coverage: LLM observability 教程.
- Check search phrasing coverage: RAG 评测教程.
- Check search phrasing coverage: promptfoo 入门.
- Check search phrasing coverage: LangSmith 教程.
- Confirm article naturally answers search query: LLM observability 教程.
- Confirm article naturally answers search query: RAG 评测教程.
- Confirm article naturally answers search query: promptfoo 入门.

Source checks:

- Verify implementation-sensitive claims against source: https://www.promptfoo.dev/docs/intro/.
- Verify implementation-sensitive claims against source: https://docs.ragas.io/.
- Verify implementation-sensitive claims against source: https://docs.helicone.ai/.
- Confirm every fast-changing model, SDK, API, deployment, pricing, and version claim against current official sources.

Warning fixes:

- Meta description is short; rewrite it before approval.

Risk checks:

- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Remove unsupported traffic, ranking, revenue, benchmark, or guaranteed-outcome language.
- Keep human review, rollback, logging, cost, privacy, and failure-handling boundaries explicit.
- Meta description is short; rewrite it before approval.
- Reject unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.

Human checklist:

- Review reason: broad AI wave item needs human remediation before approval.
- Review reason: missing specific public internal-link suggestion needs human choice.
- Review reason: warning remediation needs human sign-off.
- Review reason: search-intent wording needs human copy review.
- Review reason: source evidence needs human verification.
- Apply, rewrite, or explicitly reject search and snippet fixes before mark:review.
- Open source targets or run equivalent source checks before mark:review.
- Choose, apply, or explicitly reject the public internal-link plan before mark:review.
- Resolve warning and risk checks before mark:review.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vercel-build-failed-causes-checklist.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Wave 2. Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Manual mark-review command: `npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/together-ai-api-beginner-guide.mdx`
- Publish confirm: not-included

Public-link plan:

- Use suggested public link: OpenRouter API 怎么接入：统一模型入口不是只换 Base URL (/blog/openrouter-api-beginner-guide).

Search fixes:

- Make the title and first paragraph answer this search intent explicitly: RAG 知识库搭建教程.
- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Add one exact or near-exact search query naturally in the opening or first H2.
- Check search phrasing coverage: RAG 知识库搭建教程.
- Check search phrasing coverage: 向量数据库教程.
- Check search phrasing coverage: 企业知识库 AI 部署.
- Check search phrasing coverage: RAG 检索不到内容.
- Confirm article naturally answers search query: RAG 知识库搭建教程.
- Confirm article naturally answers search query: 向量数据库教程.
- Confirm article naturally answers search query: 企业知识库 AI 部署.

Source checks:

- Verify implementation-sensitive claims against source: https://platform.openai.com/docs.
- Verify implementation-sensitive claims against source: https://ai-sdk.dev/docs.
- Verify implementation-sensitive claims against source: https://docs.anthropic.com.
- Verify implementation-sensitive claims against source: https://platform.openai.com/docs/guides/retrieval.
- Verify implementation-sensitive claims against source: https://www.reddit.com/r/Rag/comments/1t9v93f/is_anyone_still_running_pure_vector_rag_in/.
- Verify implementation-sensitive claims against source: https://arxiv.org/abs/2603.10700.
- Verify implementation-sensitive claims against source: https://www.pinecone.io/learn/retrieval-augmented-generation/.
- Confirm every fast-changing model, SDK, API, deployment, pricing, and version claim against current official sources.

Warning fixes:

- Freshness risk is high; all implementation-sensitive claims need current source checks.

Risk checks:

- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Remove unsupported traffic, ranking, revenue, benchmark, or guaranteed-outcome language.
- Keep human review, rollback, logging, cost, privacy, and failure-handling boundaries explicit.
- Freshness risk is high; all implementation-sensitive claims need current source checks.
- Reject unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.

Human checklist:

- Review reason: broad AI wave item needs human remediation before approval.
- Review reason: specific public internal-link suggestion needs human acceptance or rejection.
- Review reason: warning remediation needs human sign-off.
- Review reason: search-intent wording needs human copy review.
- Review reason: source evidence needs human verification.
- Apply, rewrite, or explicitly reject search and snippet fixes before mark:review.
- Open source targets or run equivalent source checks before mark:review.
- Choose, apply, or explicitly reject the public internal-link plan before mark:review.
- Resolve warning and risk checks before mark:review.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Wave 2. vLLM 部署适合什么场景：新手先看推理服务边界

- File: content/blog/vllm-deployment-beginner-guide.mdx
- Manual mark-review command: `npm run mark:review -- --file=content/blog/vllm-deployment-beginner-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/vllm-deployment-beginner-guide.mdx`
- Publish confirm: not-included

Public-link plan:

- Use suggested public link: 本地部署大模型怎么开始：新手先看硬件、模型和用途 (/blog/local-llm-deployment-beginner).

Search fixes:

- Make the title and first paragraph answer this search intent explicitly: 大模型部署教程.
- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Add one exact or near-exact search query naturally in the opening or first H2.
- Check search phrasing coverage: 大模型部署教程.
- Check search phrasing coverage: Ollama 本地部署教程.
- Check search phrasing coverage: vLLM 部署教程.
- Check search phrasing coverage: RunPod vLLM serverless.
- Confirm article naturally answers search query: 大模型部署教程.
- Confirm article naturally answers search query: Ollama 本地部署教程.
- Confirm article naturally answers search query: vLLM 部署教程.

Source checks:

- Verify implementation-sensitive claims against source: https://platform.openai.com/docs.
- Verify implementation-sensitive claims against source: https://ai-sdk.dev/docs.
- Verify implementation-sensitive claims against source: https://docs.anthropic.com.
- Verify implementation-sensitive claims against source: https://platform.openai.com/docs/guides/agents.
- Verify implementation-sensitive claims against source: https://docs.ollama.com.
- Verify implementation-sensitive claims against source: https://docs.vllm.ai.
- Verify implementation-sensitive claims against source: https://platform.openai.com/docs/guides/retrieval.
- Verify implementation-sensitive claims against source: https://docs.runpod.io/serverless/vllm/get-started.
- Verify implementation-sensitive claims against source: https://www.runpod.io/articles/guides/deploy-vllm-runpod-docker.
- Verify implementation-sensitive claims against source: https://www.spheron.network/blog/llm-deployment-guide/.

Warning fixes:

- Meta description is short; rewrite it before approval.
- Freshness risk is high; all implementation-sensitive claims need current source checks.

Risk checks:

- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Remove unsupported traffic, ranking, revenue, benchmark, or guaranteed-outcome language.
- Keep human review, rollback, logging, cost, privacy, and failure-handling boundaries explicit.
- Meta description is short; rewrite it before approval.
- Freshness risk is high; all implementation-sensitive claims need current source checks.
- Reject unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.

Human checklist:

- Review reason: broad AI wave item needs human remediation before approval.
- Review reason: specific public internal-link suggestion needs human acceptance or rejection.
- Review reason: warning remediation needs human sign-off.
- Review reason: search-intent wording needs human copy review.
- Review reason: source evidence needs human verification.
- Apply, rewrite, or explicitly reject search and snippet fixes before mark:review.
- Open source targets or run equivalent source checks before mark:review.
- Choose, apply, or explicitly reject the public internal-link plan before mark:review.
- Resolve warning and risk checks before mark:review.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vllm-deployment-beginner-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Wave 2. 向量数据库怎么选：新手先理解 embedding 和检索

- File: content/blog/vector-database-beginner-guide.mdx
- Manual mark-review command: `npm run mark:review -- --file=content/blog/vector-database-beginner-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/vector-database-beginner-guide.mdx`
- Publish confirm: not-included

Public-link plan:

- No specific public link suggestion exists; human reviewer must choose a relevant published article or explicitly reject public linking for this draft.
- Fallback public link candidate: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 (/blog/ai-agent-deployment-vercel-ai-sdk-guide).
- Fallback public link candidate: Agent 部署怎么做：从聊天助手到可上线工作流 (/blog/agent-deployment-beginner-guide).
- Fallback public link candidate: Agent 人工审核流程怎么设计：什么时候自动，什么时候必须人确认 (/blog/agent-human-review-loop-guide).

Search fixes:

- Make the title and first paragraph answer this search intent explicitly: RAG 知识库搭建教程.
- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Add one exact or near-exact search query naturally in the opening or first H2.
- Check search phrasing coverage: RAG 知识库搭建教程.
- Check search phrasing coverage: 向量数据库教程.
- Check search phrasing coverage: 企业知识库 AI 部署.
- Check search phrasing coverage: RAG 检索不到内容.
- Confirm article naturally answers search query: RAG 知识库搭建教程.
- Confirm article naturally answers search query: 向量数据库教程.
- Confirm article naturally answers search query: 企业知识库 AI 部署.

Source checks:

- Verify implementation-sensitive claims against source: https://www.reddit.com/r/Rag/comments/1t9v93f/is_anyone_still_running_pure_vector_rag_in/.
- Verify implementation-sensitive claims against source: https://arxiv.org/abs/2603.10700.
- Verify implementation-sensitive claims against source: https://www.pinecone.io/learn/retrieval-augmented-generation/.
- Confirm every fast-changing model, SDK, API, deployment, pricing, and version claim against current official sources.

Warning fixes:

- Meta description is short; rewrite it before approval.
- Freshness risk is high; all implementation-sensitive claims need current source checks.

Risk checks:

- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Remove unsupported traffic, ranking, revenue, benchmark, or guaranteed-outcome language.
- Keep human review, rollback, logging, cost, privacy, and failure-handling boundaries explicit.
- Meta description is short; rewrite it before approval.
- Freshness risk is high; all implementation-sensitive claims need current source checks.
- Reject unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.

Human checklist:

- Review reason: broad AI wave item needs human remediation before approval.
- Review reason: missing specific public internal-link suggestion needs human choice.
- Review reason: warning remediation needs human sign-off.
- Review reason: search-intent wording needs human copy review.
- Review reason: source evidence needs human verification.
- Apply, rewrite, or explicitly reject search and snippet fixes before mark:review.
- Open source targets or run equivalent source checks before mark:review.
- Choose, apply, or explicitly reject the public internal-link plan before mark:review.
- Resolve warning and risk checks before mark:review.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vector-database-beginner-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Wave 3. RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界

- File: content/blog/vector-database-selection-for-rag-guide.mdx
- Manual mark-review command: `npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx`
- Publish confirm: not-included

Public-link plan:

- Use suggested public link: Qdrant 向量数据库怎么用：RAG 新手先看集合、向量和过滤 (/blog/qdrant-vector-database-beginner-guide).

Search fixes:

- Make the title and first paragraph answer this search intent explicitly: RAG 知识库搭建教程.
- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Add one exact or near-exact search query naturally in the opening or first H2.
- Check search phrasing coverage: RAG 知识库搭建教程.
- Check search phrasing coverage: 向量数据库教程.
- Check search phrasing coverage: 企业知识库 AI 部署.
- Check search phrasing coverage: RAG 检索不到内容.
- Confirm article naturally answers search query: RAG 知识库搭建教程.
- Confirm article naturally answers search query: 向量数据库教程.
- Confirm article naturally answers search query: 企业知识库 AI 部署.

Source checks:

- Verify implementation-sensitive claims against source: https://platform.openai.com/docs/guides/retrieval.
- Verify implementation-sensitive claims against source: https://platform.openai.com/docs/guides/prompt-engineering.
- Verify implementation-sensitive claims against source: https://python.langchain.com/docs.
- Verify implementation-sensitive claims against source: https://docs.llamaindex.ai.
- Verify implementation-sensitive claims against source: https://huggingface.co/docs.
- Verify implementation-sensitive claims against source: https://platform.openai.com/docs.
- Verify implementation-sensitive claims against source: https://platform.openai.com/docs/guides/agents.
- Verify implementation-sensitive claims against source: https://ai-sdk.dev/docs.
- Verify implementation-sensitive claims against source: https://www.reddit.com/r/Rag/comments/1t9v93f/is_anyone_still_running_pure_vector_rag_in/.
- Verify implementation-sensitive claims against source: https://arxiv.org/abs/2603.10700.

Warning fixes:

- Meta description is short; rewrite it before approval.
- No current link to published articles; add one approved contextual public link.
- Freshness risk is high; all implementation-sensitive claims need current source checks.

Risk checks:

- Keep the meta description focused on audience, workflow, risk boundary, and review outcome.
- Remove unsupported traffic, ranking, revenue, benchmark, or guaranteed-outcome language.
- Keep human review, rollback, logging, cost, privacy, and failure-handling boundaries explicit.
- Meta description is short; rewrite it before approval.
- No current link to published articles; add one approved contextual public link.
- Freshness risk is high; all implementation-sensitive claims need current source checks.
- Reject unsupported traffic, ranking, revenue, benchmark, cost, latency, or stability claims.

Human checklist:

- Review reason: broad AI wave item needs human remediation before approval.
- Review reason: specific public internal-link suggestion needs human acceptance or rejection.
- Review reason: warning remediation needs human sign-off.
- Review reason: search-intent wording needs human copy review.
- Review reason: source evidence needs human verification.
- Apply, rewrite, or explicitly reject search and snippet fixes before mark:review.
- Open source targets or run equivalent source checks before mark:review.
- Choose, apply, or explicitly reject the public internal-link plan before mark:review.
- Resolve warning and risk checks before mark:review.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.


