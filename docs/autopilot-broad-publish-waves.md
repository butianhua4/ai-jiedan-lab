# Autopilot Broad Publish Waves

Generated at: 2026-06-25T01:31:11.775Z

## Guardrails

- Read-only broad publish wave planner. It turns high-demand freshness triage items into small human approval batches and never changes article status.
- Stop before mark:review and publish. Human approval is required per file and per wave.
- Traffic claim: not-included

## Summary

- Current public published: 500
- Waves: 3
- Waves ready for human approval: 3
- Items: 7
- Ready items: 7
- Unique files: 7
- Clusters covered: 3
- Unsafe items: 0
- Unsafe waves: 0

## Waves

| Wave | Ready | Projected public after approval | Theme | Files |
| --- | --- | --- | --- | --- |
| 1 | 3/3 | 503 | RAG、知识库、向量数据库和引用溯源 + 开源大模型部署：Ollama、vLLM、TGI、RunPod + LLM 观测、评测、日志和上线后质量 | content/blog/supabase-pgvector-rag-guide.mdx<br>content/blog/tensorrt-llm-beginner-guide.mdx<br>content/blog/vercel-build-failed-causes-checklist.mdx |
| 2 | 3/3 | 503 | RAG、知识库、向量数据库和引用溯源 + 开源大模型部署：Ollama、vLLM、TGI、RunPod | content/blog/together-ai-api-beginner-guide.mdx<br>content/blog/vllm-deployment-beginner-guide.mdx<br>content/blog/vector-database-beginner-guide.mdx |
| 3 | 1/1 | 501 | RAG、知识库、向量数据库和引用溯源 | content/blog/vector-database-selection-for-rag-guide.mdx |

## Next Wave Detail

### Wave 1: RAG、知识库、向量数据库和引用溯源 + 开源大模型部署：Ollama、vLLM、TGI、RunPod + LLM 观测、评测、日志和上线后质量

- Stop before publish with --confirm.
- Mark review commands require human approval:
  - npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/vercel-build-failed-causes-checklist.mdx --confirm-human

| Order | Risk | Checks | Sources | Queries | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | high | 16 | 10 | 5 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 2 | high | 15 | 8 | 5 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 3 | low | 11 | 3 | 5 | Vercel build failed 排查清单：从日志到重新部署 | content/blog/vercel-build-failed-causes-checklist.mdx |

### Wave 2: RAG、知识库、向量数据库和引用溯源 + 开源大模型部署：Ollama、vLLM、TGI、RunPod

- Stop before publish with --confirm.
- Mark review commands require human approval:
  - npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/vllm-deployment-beginner-guide.mdx --confirm-human
  - npm run mark:review -- --file=content/blog/vector-database-beginner-guide.mdx --confirm-human

| Order | Risk | Checks | Sources | Queries | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | high | 16 | 7 | 5 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 2 | high | 15 | 10 | 5 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| 3 | high | 16 | 3 | 5 | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |

### Wave 3: RAG、知识库、向量数据库和引用溯源

- Stop before publish with --confirm.
- Mark review commands require human approval:
  - npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human

| Order | Risk | Checks | Sources | Queries | Title | File |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | high | 16 | 11 | 5 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |

