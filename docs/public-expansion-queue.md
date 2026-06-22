# Public Expansion Queue

Generated at: 2026-06-22T18:05:12.355Z

This queue is read-only. It ranks drafts for manual approval waves so public coverage can expand without bypassing review.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Stop before: Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.
- Note: This queue prepares public expansion work only. It does not change article status, noindex, or publishing state.

## Publishing Boundary

- Public published: 500
- Publishable now: 0
- Status counts: {"published":500,"archived":21,"draft":148}

## Summary

- approvalWaves: 5
- duplicateFiles: 0
- items: 15
- roadmapNextReviewFiles: 15
- sourcePackReadyItems: 15
- unsafeItems: 0

## Approval Waves

### Wave 1

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 446 | true | true | 8 | 8 | 6 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 439 | true | true | 7 | 8 | 6 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 415 | true | true | 7 | 8 | 5 | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/vector-database-selection-for-rag-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/supabase-pgvector-rag-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/vector-database-selection-for-rag-guide.mdx
npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
npm run publish:articles -- --file=content/blog/supabase-pgvector-rag-guide.mdx
```

### Wave 2

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 402 | true | true | 4 | 8 | 6 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 401 | true | true | 5 | 8 | 5 | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |
| 355 | true | false | 4 | 8 | 5 | Vercel 部署检查表怎么写：给新手的上线模板 | content/blog/vercel-deploy-checklist-template.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/vercel-deploy-checklist-template.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/together-ai-api-beginner-guide.mdx
npm run publish:articles -- --file=content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx
npm run publish:articles -- --file=content/blog/vercel-deploy-checklist-template.mdx
```

### Wave 3

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 355 | true | false | 7 | 8 | 7 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| 317 | true | false | 3 | 8 | 4 | 订阅支付失败怎么和客户沟通 | content/blog/subscription-payment-failed-message.mdx |
| 317 | true | false | 3 | 8 | 5 | Vercel 部署后 404 检查清单：逐页验收更稳 | content/blog/vercel-404-after-deploy-checklist.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/vllm-deployment-beginner-guide.mdx --confirm-human
npm run mark:review -- --file=content/blog/subscription-payment-failed-message.mdx --confirm-human
npm run mark:review -- --file=content/blog/vercel-404-after-deploy-checklist.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/vllm-deployment-beginner-guide.mdx
npm run publish:articles -- --file=content/blog/subscription-payment-failed-message.mdx
npm run publish:articles -- --file=content/blog/vercel-404-after-deploy-checklist.mdx
```

### Wave 4

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 317 | true | false | 4 | 8 | 5 | Vercel 404 部署成功但页面打不开怎么办：使用前怎么判断是否适合 | content/blog/vercel-404-after-deploy-freelance-scope.mdx |
| 317 | true | false | 3 | 8 | 5 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| 305 | true | false | 4 | 8 | 5 | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/vercel-404-after-deploy-freelance-scope.mdx --confirm-human
npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human
npm run mark:review -- --file=content/blog/windows-path-permission-install-fix.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/vercel-404-after-deploy-freelance-scope.mdx
npm run publish:articles -- --file=content/blog/vercel-404-after-deploy.mdx
npm run publish:articles -- --file=content/blog/windows-path-permission-install-fix.mdx
```

### Wave 5

| Score | Pack | Planned | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 283 | true | false | 6 | 8 | 5 | Windows 路径和权限导致安装失败怎么办：新手检查清单 | content/blog/windows-path-permission-install-fix-checklist.mdx |
| 283 | true | false | 6 | 8 | 5 | Windows 路径和权限导致安装失败怎么办：使用前怎么判断是否适合 | content/blog/windows-path-permission-install-fix-freelance-scope.mdx |
| 253 | true | false | 5 | 8 | 5 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |

Human approval commands:

```bash
npm run mark:review -- --file=content/blog/windows-path-permission-install-fix-checklist.mdx --confirm-human
npm run mark:review -- --file=content/blog/windows-path-permission-install-fix-freelance-scope.mdx --confirm-human
npm run mark:review -- --file=content/blog/tensorrt-llm-beginner-guide.mdx --confirm-human
```

Publish dry-run commands after review status exists:

```bash
npm run publish:articles -- --file=content/blog/windows-path-permission-install-fix-checklist.mdx
npm run publish:articles -- --file=content/blog/windows-path-permission-install-fix-freelance-scope.mdx
npm run publish:articles -- --file=content/blog/tensorrt-llm-beginner-guide.mdx
```

## Full Queue

| Wave | Score | Safe | Source pack | Current | Planned | Batch | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 446 | true | true | true | true | 25 | RAG 向量数据库怎么选 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 1 | 439 | true | true | true | true | 34 | Vercel AI Gateway 多模型 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 1 | 415 | true | true | false | true | 24 | Supabase pgvector | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 2 | 402 | true | true | false | true | 27 | Together AI API 接入 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 2 | 401 | true | true | false | true | 26 | Vercel AI SDK 聊天机器人部署 | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |
| 2 | 355 | true | true | false | false | 19 | Vercel 部署检查表 | Vercel 部署检查表怎么写：给新手的上线模板 | content/blog/vercel-deploy-checklist-template.mdx |
| 3 | 355 | true | true | false | false | 22 | vLLM 部署 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| 3 | 317 | true | true | false | false | 16 | 订阅支付失败怎么和客户沟通 | 订阅支付失败怎么和客户沟通 | content/blog/subscription-payment-failed-message.mdx |
| 3 | 317 | true | true | false | false | 15 | Vercel 部署后 404 检查清单 | Vercel 部署后 404 检查清单：逐页验收更稳 | content/blog/vercel-404-after-deploy-checklist.mdx |
| 4 | 317 | true | true | false | false | 15 | Vercel 404 部署成功但页面打不开怎么办：使用前怎么判断是否适合 | Vercel 404 部署成功但页面打不开怎么办：使用前怎么判断是否适合 | content/blog/vercel-404-after-deploy-freelance-scope.mdx |
| 4 | 317 | true | true | false | false | 15 | Vercel 部署成功但 404 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| 4 | 305 | true | true | false | false | 15 | Windows 路径和权限导致安装失败怎么办 | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |
| 5 | 283 | true | true | false | false | 15 | Windows 路径和权限导致安装失败怎么办：新手检查清单 | Windows 路径和权限导致安装失败怎么办：新手检查清单 | content/blog/windows-path-permission-install-fix-checklist.mdx |
| 5 | 283 | true | true | false | false | 15 | Windows 路径和权限导致安装失败怎么办：使用前怎么判断是否适合 | Windows 路径和权限导致安装失败怎么办：使用前怎么判断是否适合 | content/blog/windows-path-permission-install-fix-freelance-scope.mdx |
| 5 | 253 | true | true | false | false | 29 | TensorRT-LLM 入门 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
