# Source Target Health Audit

Generated at: 2026-06-21T15:28:30.913Z

This report is read-only. It verifies official source URLs used by review and public-gap candidates before any human approval step.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Timeout ms: 6000
- Note: Read-only source target health audit. It checks source URLs for human fact review and does not edit articles, status, noindex, review, or publishing state.

## Summary

- checkedUrls: 14
- broadFirstCoverageFiles: 0
- currentReviewFiles: 3
- failedUrls: 1
- filesCovered: 16
- filesWithReachableSource: 16
- filesWithoutReachableSource: 0
- missingUrlTargets: 0
- nextSourcePackFiles: 15
- okUrls: 13
- publicGapDecisionFiles: 0
- redirectedUrls: 9
- sourceReferences: 86
- uniqueUrls: 14

## Files Without Reachable Source

- none

## Failed URL Checks

| OK | Status | URL | Final URL | References | Error |
| --- | --- | --- | --- | --- | --- |
| false |  | https://docs.vllm.ai |  | 2 | TimeoutError |

## Redirected URLs

| OK | Status | URL | Final URL | References | Error |
| --- | --- | --- | --- | --- | --- |
| true | 200 | https://ai-sdk.dev/docs | https://ai-sdk.dev/docs/introduction | 17 |  |
| true | 200 | https://ai.google.dev/docs | https://ai.google.dev/gemini-api/docs?hl=de | 2 |  |
| true | 200 | https://docs.anthropic.com | https://platform.claude.com/docs/en/home | 11 |  |
| true | 200 | https://docs.llamaindex.ai | https://developers.llamaindex.ai/python/framework/ | 2 |  |
| true | 200 | https://platform.openai.com/docs | https://developers.openai.com/api/docs | 17 |  |
| true | 200 | https://platform.openai.com/docs/guides/agents | https://developers.openai.com/api/docs/guides/agents | 5 |  |
| true | 200 | https://platform.openai.com/docs/guides/prompt-engineering | https://developers.openai.com/api/docs/guides/prompt-engineering | 13 |  |
| true | 200 | https://platform.openai.com/docs/guides/retrieval | https://developers.openai.com/api/docs/guides/retrieval | 7 |  |
| true | 200 | https://python.langchain.com/docs | https://docs.langchain.com/oss/python/langchain/overview | 2 |  |

## File Coverage

| Reachable | Sources | Scopes | Title | File | URLs |
| --- | --- | --- | --- | --- | --- |
| 3 | 3 | next-source-pack | 订阅支付失败怎么和客户沟通 | content/blog/subscription-payment-failed-message.mdx | https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs |
| 7 | 7 | next-source-pack | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx | https://platform.openai.com/docs/guides/retrieval<br>https://python.langchain.com/docs<br>https://docs.llamaindex.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.langchain.com |
| 4 | 5 | next-source-pack | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx | https://docs.vllm.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.ollama.com |
| 4 | 4 | next-source-pack | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx | https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/retrieval |
| 3 | 3 | current-review | AI 工具新手不应该先买哪些工具 | content/blog/tools-not-to-buy-first.mdx | https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com |
| 10 | 10 | current-review, next-source-pack | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx | https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://platform.openai.com/docs/guides/retrieval<br>https://python.langchain.com/docs<br>https://docs.llamaindex.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 3 | 3 | next-source-pack | Vercel 部署后 404 检查清单：逐页验收更稳 | content/blog/vercel-404-after-deploy-checklist.mdx | https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs |
| 4 | 4 | next-source-pack | Vercel 404 部署成功但页面打不开怎么办：使用前怎么判断是否适合 | content/blog/vercel-404-after-deploy-freelance-scope.mdx | https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com |
| 3 | 3 | next-source-pack | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx | https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs |
| 12 | 12 | current-review, next-source-pack | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx | https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com<br>https://ai.google.dev/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/agents<br>https://ai.google.dev/docs<br>https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 5 | 5 | next-source-pack | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx | https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 4 | 4 | next-source-pack | Vercel 部署检查表怎么写：给新手的上线模板 | content/blog/vercel-deploy-checklist-template.mdx | https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 6 | 7 | next-source-pack | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx | https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/agents<br>https://docs.ollama.com<br>https://docs.vllm.ai<br>https://platform.openai.com/docs/guides/retrieval |
| 6 | 6 | next-source-pack | Windows 路径和权限导致安装失败怎么办：新手检查清单 | content/blog/windows-path-permission-install-fix-checklist.mdx | https://platform.openai.com/docs/guides/agents<br>https://docs.n8n.io<br>https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 6 | 6 | next-source-pack | Windows 路径和权限导致安装失败怎么办：使用前怎么判断是否适合 | content/blog/windows-path-permission-install-fix-freelance-scope.mdx | https://platform.openai.com/docs/guides/agents<br>https://docs.n8n.io<br>https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 4 | 4 | next-source-pack | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx | https://ai-sdk.dev/docs<br>https://platform.openai.com/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/prompt-engineering |

## All URL Checks

| OK | Status | URL | Final URL | References | Error |
| --- | --- | --- | --- | --- | --- |
| true | 200 | https://ai-sdk.dev/docs | https://ai-sdk.dev/docs/introduction | 17 |  |
| true | 200 | https://ai.google.dev/docs | https://ai.google.dev/gemini-api/docs?hl=de | 2 |  |
| true | 200 | https://docs.anthropic.com | https://platform.claude.com/docs/en/home | 11 |  |
| true | 200 | https://docs.langchain.com | https://docs.langchain.com/ | 1 |  |
| true | 200 | https://docs.llamaindex.ai | https://developers.llamaindex.ai/python/framework/ | 2 |  |
| true | 200 | https://docs.n8n.io | https://docs.n8n.io/ | 2 |  |
| true | 200 | https://docs.ollama.com | https://docs.ollama.com/ | 2 |  |
| false |  | https://docs.vllm.ai |  | 2 | TimeoutError |
| true | 200 | https://huggingface.co/docs | https://huggingface.co/docs | 3 |  |
| true | 200 | https://platform.openai.com/docs | https://developers.openai.com/api/docs | 17 |  |
| true | 200 | https://platform.openai.com/docs/guides/agents | https://developers.openai.com/api/docs/guides/agents | 5 |  |
| true | 200 | https://platform.openai.com/docs/guides/prompt-engineering | https://developers.openai.com/api/docs/guides/prompt-engineering | 13 |  |
| true | 200 | https://platform.openai.com/docs/guides/retrieval | https://developers.openai.com/api/docs/guides/retrieval | 7 |  |
| true | 200 | https://python.langchain.com/docs | https://docs.langchain.com/oss/python/langchain/overview | 2 |  |
