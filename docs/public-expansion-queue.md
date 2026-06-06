# Public Expansion Queue

Generated at: 2026-06-06T14:50:08.690Z

This queue is read-only. It ranks drafts for manual approval waves so public coverage can expand without bypassing review.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Stop before: Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.
- Note: This queue prepares public expansion work only. It does not change article status, noindex, or publishing state.

## Publishing Boundary

- Public published: 15
- Publishable now: 0
- Status counts: {"draft":633,"published":15,"archived":21}

## Summary

- approvalWaves: 7
- duplicateFiles: 0
- items: 19
- roadmapNextReviewFiles: 19
- sourcePackReadyItems: 19
- unsafeItems: 0

## Approval Waves

### Wave 1

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 777 | true | true | 5 | 8 | 6 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 773 | true | true | 3 | 8 | 6 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 769 | true | true | 3 | 9 | 6 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
```

### Wave 2

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 753 | true | true | 8 | 8 | 8 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 746 | true | true | 7 | 8 | 7 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 746 | true | true | 7 | 8 | 6 | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx
npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx
npm run publish:articles -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx
```

### Wave 3

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 731 | true | true | 3 | 9 | 5 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| 730 | true | true | 3 | 9 | 5 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| 463 | true | false | 5 | 8 | 7 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/ai-prompt-library-team-knowledge-base-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/data-analysis-ai-prompts-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/dify-workflow-error-handling-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/ai-prompt-library-team-knowledge-base-guide.mdx
npm run publish:articles -- --file=content/blog/data-analysis-ai-prompts-guide.mdx
npm run publish:articles -- --file=content/blog/dify-workflow-error-handling-guide.mdx
```

### Wave 4

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 463 | true | false | 4 | 8 | 6 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 459 | true | false | 3 | 9 | 5 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| 435 | true | false | 3 | 8 | 5 | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/dify-workflow-vs-agent-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/education-ai-prompts-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/dify-workflow-vs-agent-guide.mdx
npm run publish:articles -- --file=content/blog/education-ai-prompts-guide.mdx
npm run publish:articles -- --file=content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx
```

### Wave 5

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 435 | true | false | 5 | 8 | 7 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| 425 | true | false | 6 | 8 | 7 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 423 | true | false | 7 | 8 | 6 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/local-llm-vram-not-enough-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/local-llm-vram-not-enough-guide.mdx
npm run publish:articles -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx
npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx
```

### Wave 6

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 423 | true | false | 3 | 8 | 5 | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |
| 423 | true | false | 4 | 8 | 5 | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx |
| 411 | true | false | 8 | 8 | 6 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/gemini-api-rate-limit-debug-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/customer-service-ai-prompts-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx
npm run publish:articles -- --file=content/blog/gemini-api-rate-limit-debug-guide.mdx
npm run publish:articles -- --file=content/blog/customer-service-ai-prompts-guide.mdx
```

### Wave 7

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 411 | true | false | 7 | 8 | 5 | 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 | content/blog/ecommerce-ai-prompts-guide.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/ecommerce-ai-prompts-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/ecommerce-ai-prompts-guide.mdx
```

## Full Queue

| Wave | Score | Safe | Source pack | Current | Planned | Batch | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 777 | true | true | true | true | 34 | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 1 | 773 | true | true | true | true | 40 | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1 | 769 | true | true | true | true | 40 | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2 | 753 | true | true | false | true | 40 | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 2 | 746 | true | true | false | true | 33 | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 2 | 746 | true | true | false | true | 33 | Open WebUI Functions Pipelines | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 3 | 731 | true | true | false | true | 32 | 团队 AI 提示词库 | 团队 AI 提示词库怎么搭：分类、版本、示例、审核和复用 | content/blog/ai-prompt-library-team-knowledge-base-guide.mdx |
| 3 | 730 | true | true | false | true | 31 | 数据分析 AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| 3 | 463 | true | true | false | false | 33 | Dify 工作流错误处理 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 4 | 463 | true | true | false | false | 33 | Dify Workflow 和 Agent 区别 | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| 4 | 459 | true | true | false | false | 31 | 教育 AI 提示词 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| 4 | 435 | true | true | false | false | 29 | Docker 使用 NVIDIA GPU | Docker 怎么用 NVIDIA GPU：大模型部署先装对 Container Toolkit | content/blog/gpu-docker-nvidia-container-toolkit-guide.mdx |
| 5 | 435 | true | true | false | false | 32 | 本地部署大模型显存不够 | 本地部署大模型显存不够怎么办：量化、上下文、并发和换模型 | content/blog/local-llm-vram-not-enough-guide.mdx |
| 5 | 425 | true | true | false | false | 40 | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 5 | 423 | true | true | false | false | 34 | AI API Key 安全管理 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 6 | 423 | true | true | false | false | 34 | Claude API rate limit reached | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |
| 6 | 423 | true | true | false | false | 34 | Gemini API 限流 | Gemini API 限流怎么排查：RPM、TPM、批量请求和降级模型 | content/blog/gemini-api-rate-limit-debug-guide.mdx |
| 6 | 411 | true | true | false | false | 30 | 客服 AI 提示词 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| 7 | 411 | true | true | false | false | 30 | 电商 AI 提示词 | 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 | content/blog/ecommerce-ai-prompts-guide.mdx |
