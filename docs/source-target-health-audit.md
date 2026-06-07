# Source Target Health Audit

Generated at: 2026-06-07T01:40:56.095Z

This report is read-only. It verifies official source URLs used by review and public-gap candidates before any human approval step.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Timeout ms: 8000
- Note: Read-only source target health audit. It checks source URLs for human fact review and does not edit articles, status, noindex, review, or publishing state.

## Summary

- checkedUrls: 18
- currentReviewFiles: 3
- failedUrls: 0
- filesCovered: 20
- filesWithReachableSource: 20
- filesWithoutReachableSource: 0
- missingUrlTargets: 0
- nextSourcePackFiles: 19
- okUrls: 18
- publicGapDecisionFiles: 8
- redirectedUrls: 13
- sourceReferences: 147
- uniqueUrls: 18

## Files Without Reachable Source

- none

## Failed URL Checks

- none

## Redirected URLs

| OK | Status | URL | Final URL | References | Error |
| --- | --- | --- | --- | --- | --- |
| true | 200 | https://ai-sdk.dev/docs | https://ai-sdk.dev/docs/introduction | 20 |  |
| true | 200 | https://ai.google.dev/docs | https://ai.google.dev/gemini-api/docs | 2 |  |
| true | 200 | https://docs.anthropic.com | https://platform.claude.com/docs/en/home | 3 |  |
| true | 200 | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview | 3 |  |
| true | 200 | https://docs.dify.ai | https://docs.dify.ai/en/use-dify/getting-started/introduction | 5 |  |
| true | 200 | https://docs.llamaindex.ai | https://developers.llamaindex.ai/python/framework/ | 5 |  |
| true | 200 | https://docs.vllm.ai | https://docs.vllm.ai/en/latest/ | 5 |  |
| true | 200 | https://platform.openai.com/docs | https://developers.openai.com/api/docs | 20 |  |
| true | 200 | https://platform.openai.com/docs/guides/agents | https://developers.openai.com/api/docs/guides/agents | 12 |  |
| true | 200 | https://platform.openai.com/docs/guides/prompt-engineering | https://developers.openai.com/api/docs/guides/prompt-engineering | 20 |  |
| true | 200 | https://platform.openai.com/docs/guides/prompt-generation | https://developers.openai.com/api/docs/guides/prompt-generation | 2 |  |
| true | 200 | https://platform.openai.com/docs/guides/retrieval | https://developers.openai.com/api/docs/guides/retrieval | 19 |  |
| true | 200 | https://python.langchain.com/docs | https://docs.langchain.com/oss/python/langchain/overview | 10 |  |

## File Coverage

| Reachable | Sources | Scopes | Title | File | URLs |
| --- | --- | --- | --- | --- | --- |
| 10 | 10 | current-review, next-source-pack, public-gap-decision | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx | https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://python.langchain.com/docs<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://python.langchain.com/docs<br>https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 11 | 11 | next-source-pack, public-gap-decision | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx | https://platform.openai.com/docs/guides/retrieval<br>https://python.langchain.com/docs<br>https://docs.llamaindex.ai<br>https://platform.openai.com/docs/guides/retrieval<br>https://python.langchain.com/docs<br>https://docs.llamaindex.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 12 | 12 | next-source-pack, public-gap-decision | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx | https://platform.openai.com/docs/guides/agents<br>https://platform.openai.com/docs/guides/retrieval<br>https://python.langchain.com/docs<br>https://platform.openai.com/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://ai.google.dev/docs<br>https://docs.dify.ai<br>https://docs.n8n.io<br>https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 12 | 12 | next-source-pack, public-gap-decision | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx | https://docs.dify.ai<br>https://docs.n8n.io<br>https://platform.openai.com/docs/guides/retrieval<br>https://python.langchain.com/docs<br>https://docs.llamaindex.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://docs.dify.ai<br>https://docs.n8n.io<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 9 | 9 | current-review, next-source-pack | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx | https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://platform.openai.com/docs/guides/retrieval<br>https://python.langchain.com/docs<br>https://docs.llamaindex.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 4 | 4 | next-source-pack | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx | https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/retrieval |
| 2 | 2 | public-gap-decision | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx | https://docs.vllm.ai<br>https://huggingface.co/docs |
| 6 | 6 | next-source-pack | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx | https://platform.openai.com/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 8 | 8 | next-source-pack | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx | https://platform.openai.com/docs/guides/prompt-engineering<br>https://platform.openai.com/docs/guides/prompt-generation<br>https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview<br>https://support.google.com/docs/answer/15013615<br>https://adoption.microsoft.com/en-us/copilot/prompt-gallery/<br>https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 3 | 3 | next-source-pack | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx | https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs |
| 9 | 9 | next-source-pack, public-gap-decision | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx | https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://python.langchain.com/docs<br>https://platform.openai.com/docs<br>https://docs.dify.ai<br>https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 6 | 6 | next-source-pack | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx | https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://python.langchain.com/docs<br>https://platform.openai.com/docs<br>https://docs.dify.ai<br>https://platform.openai.com/docs/guides/retrieval |
| 8 | 8 | next-source-pack | 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 | content/blog/ecommerce-ai-prompts-guide.mdx | https://platform.openai.com/docs/guides/prompt-engineering<br>https://platform.openai.com/docs/guides/prompt-generation<br>https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview<br>https://support.google.com/docs/answer/15013615<br>https://adoption.microsoft.com/en-us/copilot/prompt-gallery/<br>https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/retrieval<br>https://platform.openai.com/docs/guides/prompt-engineering |
| 3 | 3 | next-source-pack | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx | https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs |
| 6 | 6 | next-source-pack | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx | https://platform.openai.com/docs<br>https://docs.anthropic.com<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://ai.google.dev/docs<br>https://platform.openai.com/docs/guides/retrieval |
| 5 | 5 | next-source-pack | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx | https://docs.ollama.com<br>https://docs.vllm.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs<br>https://ai-sdk.dev/docs |
| 8 | 8 | current-review, next-source-pack, public-gap-decision | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx | https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview<br>https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/retrieval |
| 7 | 7 | next-source-pack | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx | https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/prompt-engineering<br>https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/agents<br>https://docs.vllm.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs/guides/retrieval |
| 7 | 7 | next-source-pack | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx | https://docs.ollama.com<br>https://docs.vllm.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs<br>https://platform.openai.com/docs/guides/agents<br>https://ai-sdk.dev/docs<br>https://platform.openai.com/docs/guides/retrieval |
| 11 | 11 | next-source-pack, public-gap-decision | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx | https://docs.ollama.com<br>https://huggingface.co/docs<br>https://docs.vllm.ai<br>https://platform.openai.com/docs/guides/retrieval<br>https://python.langchain.com/docs<br>https://docs.llamaindex.ai<br>https://huggingface.co/docs<br>https://platform.openai.com/docs<br>https://ai-sdk.dev/docs<br>https://docs.n8n.io<br>https://docs.ollama.com |

## All URL Checks

| OK | Status | URL | Final URL | References | Error |
| --- | --- | --- | --- | --- | --- |
| true | 200 | https://adoption.microsoft.com/en-us/copilot/prompt-gallery/ | https://adoption.microsoft.com/en-us/copilot/prompt-gallery/ | 2 |  |
| true | 200 | https://ai-sdk.dev/docs | https://ai-sdk.dev/docs/introduction | 20 |  |
| true | 200 | https://ai.google.dev/docs | https://ai.google.dev/gemini-api/docs | 2 |  |
| true | 200 | https://docs.anthropic.com | https://platform.claude.com/docs/en/home | 3 |  |
| true | 200 | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview | 3 |  |
| true | 200 | https://docs.dify.ai | https://docs.dify.ai/en/use-dify/getting-started/introduction | 5 |  |
| true | 200 | https://docs.llamaindex.ai | https://developers.llamaindex.ai/python/framework/ | 5 |  |
| true | 200 | https://docs.n8n.io | https://docs.n8n.io/ | 4 |  |
| true | 200 | https://docs.ollama.com | https://docs.ollama.com/ | 4 |  |
| true | 200 | https://docs.vllm.ai | https://docs.vllm.ai/en/latest/ | 5 |  |
| true | 200 | https://huggingface.co/docs | https://huggingface.co/docs | 9 |  |
| true | 200 | https://platform.openai.com/docs | https://developers.openai.com/api/docs | 20 |  |
| true | 200 | https://platform.openai.com/docs/guides/agents | https://developers.openai.com/api/docs/guides/agents | 12 |  |
| true | 200 | https://platform.openai.com/docs/guides/prompt-engineering | https://developers.openai.com/api/docs/guides/prompt-engineering | 20 |  |
| true | 200 | https://platform.openai.com/docs/guides/prompt-generation | https://developers.openai.com/api/docs/guides/prompt-generation | 2 |  |
| true | 200 | https://platform.openai.com/docs/guides/retrieval | https://developers.openai.com/api/docs/guides/retrieval | 19 |  |
| true | 200 | https://python.langchain.com/docs | https://docs.langchain.com/oss/python/langchain/overview | 10 |  |
| true | 200 | https://support.google.com/docs/answer/15013615 | https://support.google.com/docs/answer/15013615 | 2 |  |
