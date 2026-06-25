# Review Priority Roadmap

Generated at: 2026-06-25T10:25:36.395Z

This roadmap is read-only. It prioritizes manual review work and does not publish or mark articles for review.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Stop before: Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.
- Note: This roadmap prioritizes manual review work only. It does not change article status, noindex, or publishing state.

## Summary

- currentPackCandidates: 4
- lanes: 9
- plannedBatchCandidates: 13
- sourceLanes: 12
- topicsWithoutPublicCoverage: 0
- uniqueNextReviewFiles: 15
- unsafeCandidates: 0

## Next Review Files

- content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- content/blog/together-ai-api-beginner-guide.mdx
- content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx
- content/blog/vercel-deploy-checklist-template.mdx
- content/blog/vector-database-selection-for-rag-guide.mdx
- content/blog/supabase-pgvector-rag-guide.mdx
- content/blog/subscription-payment-failed-message.mdx
- content/blog/vercel-404-after-deploy.mdx
- content/blog/vercel-404-after-deploy-checklist.mdx
- content/blog/vercel-404-after-deploy-freelance-scope.mdx
- content/blog/windows-path-permission-install-fix.mdx
- content/blog/windows-path-permission-install-fix-checklist.mdx
- content/blog/windows-path-permission-install-fix-freelance-scope.mdx
- content/blog/tensorrt-llm-beginner-guide.mdx
- content/blog/vllm-deployment-beginner-guide.mdx

## Priority Lanes

| Lane | Score | Public | Drafts | Candidates | Current pack | Planned | Why |
| --- | --- | --- | --- | --- | --- | --- | --- |
| deployment: 大模型和 AI 应用部署 | 230 | 50 | 13 | 5 | 1 | 3 | High search-intent lane that can expand existing public coverage. |
| content-backlog: 大模型和 AI 应用部署教程 | 226 | 0 | 5 | 5 | 1 | 2 | 部署、API、限流、环境变量是新人最容易搜索也最容易踩坑的入口。 |
| deployment: RAG、知识库和向量检索 | 206 | 28 | 4 | 4 | 1 | 4 | High search-intent lane that can expand existing public coverage. |
| content-backlog: RAG、知识库和向量检索 | 200 | 0 | 4 | 4 | 1 | 4 | 很多团队会搜索知识库 AI，但真正需要的是可审核、可引用、可质检的方案。 |
| content-backlog: AI 工具和部署报错解决 | 192 | 0 | 5 | 5 | 0 | 0 | 报错类文章通常搜索意图明确，适合作为稳定长尾入口。 |
| deployment: AI 应用部署报错和排查 | 180 | 70 | 20 | 5 | 0 | 0 | High search-intent lane that can expand existing public coverage. |
| deployment: MCP、工具权限和企业集成安全 | 158 | 9 | 4 | 4 | 0 | 0 | High search-intent lane that can expand existing public coverage. |
| deployment: LLM Serving、GPU 和托管推理 | 128 | 5 | 2 | 2 | 0 | 0 | High search-intent lane that can expand existing public coverage. |
| content-backlog: Ollama、vLLM 和开源模型本地部署 | 126 | 0 | 2 | 2 | 0 | 0 | 本地模型部署搜索需求强，但信息变化快，必须保留人工事实核对。 |

## deployment: 大模型和 AI 应用部署

- Priority score: 230
- Public matches: 50
- Missing public coverage: false
- Rationale: High search-intent lane that can expand existing public coverage.

Search queries:

- 大模型部署教程
- AI 应用部署教程
- OpenAI API 部署教程
- Vercel AI SDK 部署

Review focus:

- 核对当前官方部署文档
- 检查环境变量、API Key、限流、日志、回滚和 smoke check
- 避免承诺一次部署就稳定运行

Source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Anthropic docs: https://docs.anthropic.com

Workflow angles:

- 环境变量
- API Key
- 限流重试
- 上线检查
- 回滚

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 34 | true | true | true | 100 | AI 部署 | Vercel AI Gateway 多模型 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 27 | true | false | true | 100 | AI 基建 | Together AI API 接入 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 26 | true | false | true | 100 | AI 基建 | Vercel AI SDK 聊天机器人部署 | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |
| 22 | true | false | false | 100 | AI 基建 | vLLM 部署 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
| 19 | true | false | false | 100 | 模板和清单 | Vercel 部署检查表 | Vercel 部署检查表怎么写：给新手的上线模板 | content/blog/vercel-deploy-checklist-template.mdx |

## content-backlog: 大模型和 AI 应用部署教程

- Priority score: 226
- Public matches: 0
- Missing public coverage: false
- Rationale: 部署、API、限流、环境变量是新人最容易搜索也最容易踩坑的入口。

Search queries:

- 大模型部署教程
- AI 应用部署 Vercel 教程
- OpenAI API 部署教程
- Claude API 部署教程

Review focus:

- 核对官方部署文档
- 检查 API Key、限流、环境变量和费用说法
- 补足上线后的 smoke check 和回滚步骤

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
| 34 | true | true | true | 100 | AI 部署 | Vercel AI Gateway 多模型 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| 26 | true | false | true | 100 | AI 基建 | Vercel AI SDK 聊天机器人部署 | Vercel AI SDK 聊天机器人怎么部署：Next.js 流式输出和上线检查 | content/blog/vercel-ai-sdk-chatbot-deploy-guide.mdx |
| 19 | true | false | false | 100 | 模板和清单 | Vercel 部署检查表 | Vercel 部署检查表怎么写：给新手的上线模板 | content/blog/vercel-deploy-checklist-template.mdx |
| 19 | true | false | false | 100 | 模板和清单 | Vercel 部署检查表怎么写：新手检查清单 | Vercel 部署检查表怎么写：新手检查清单 | content/blog/vercel-deploy-checklist-template-checklist.mdx |
| 17 | true | false | false | 100 | 工具导航 | Vercel 和 Netlify 部署小网站怎么选 | Vercel 和 Netlify 部署小网站怎么选 | content/blog/vercel-vs-netlify-small-site.mdx |

## deployment: RAG、知识库和向量检索

- Priority score: 206
- Public matches: 28
- Missing public coverage: false
- Rationale: High search-intent lane that can expand existing public coverage.

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
| 27 | true | false | true | 100 | AI 基建 | Together AI API 接入 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 25 | true | true | true | 100 | AI 基建 | RAG 向量数据库怎么选 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 24 | true | false | true | 100 | AI 基建 | Supabase pgvector | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 21 | true | false | true | 100 | AI 基建 | 向量数据库 | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |

## content-backlog: RAG、知识库和向量检索

- Priority score: 200
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
| 27 | true | false | true | 100 | AI 基建 | Together AI API 接入 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| 25 | true | true | true | 100 | AI 基建 | RAG 向量数据库怎么选 | RAG 向量数据库怎么选：pgvector、Qdrant、Milvus 先看项目边界 | content/blog/vector-database-selection-for-rag-guide.mdx |
| 24 | true | false | true | 100 | AI 基建 | Supabase pgvector | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx |
| 21 | true | false | true | 100 | AI 基建 | 向量数据库 | 向量数据库怎么选：新手先理解 embedding 和检索 | content/blog/vector-database-beginner-guide.mdx |

## content-backlog: AI 工具和部署报错解决

- Priority score: 192
- Public matches: 0
- Missing public coverage: false
- Rationale: 报错类文章通常搜索意图明确，适合作为稳定长尾入口。

Search queries:

- OpenAI API 报错解决
- Vercel 部署失败
- npm install 报错
- AI 应用部署 404

Review focus:

- 保留错误现象、原因、修复步骤和验证命令
- 补足版本差异和官方链接
- 避免把偶然修复写成通用结论

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
| 16 | true | false | false | 100 | 收款工具 | 订阅支付失败怎么和客户沟通 | 订阅支付失败怎么和客户沟通 | content/blog/subscription-payment-failed-message.mdx |
| 15 | true | false | false | 100 | 报错解决 | Vercel 部署成功但 404 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| 15 | true | false | false | 100 | 报错解决 | Vercel 部署后 404 检查清单 | Vercel 部署后 404 检查清单：逐页验收更稳 | content/blog/vercel-404-after-deploy-checklist.mdx |
| 15 | true | false | false | 100 | 报错解决 | Vercel 404 部署成功但页面打不开怎么办：使用前怎么判断是否适合 | Vercel 404 部署成功但页面打不开怎么办：使用前怎么判断是否适合 | content/blog/vercel-404-after-deploy-freelance-scope.mdx |
| 15 | true | false | false | 100 | 报错解决 | Vercel 部署后 404 常见误区 | Vercel 部署后 404 常见误区：别只盯着域名 | content/blog/vercel-404-after-deploy-mistakes.mdx |

## deployment: AI 应用部署报错和排查

- Priority score: 180
- Public matches: 70
- Missing public coverage: false
- Rationale: High search-intent lane that can expand existing public coverage.

Search queries:

- Vercel build failed
- Vercel 部署后 404
- API Key 无效或缺失
- 环境变量缺失怎么办

Review focus:

- 保留错误现象、原因、修复步骤和验证命令
- 不要把偶然修复写成通用结论
- 补齐官方文档或日志来源

Source targets:

- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI API docs: https://platform.openai.com/docs

Workflow angles:

- 错误日志
- 复现
- 修复顺序
- 验证命令
- 项目边界

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 15 | true | false | false | 100 | 报错解决 | Vercel 部署成功但 404 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |
| 15 | true | false | false | 100 | 报错解决 | Vercel 部署后 404 检查清单 | Vercel 部署后 404 检查清单：逐页验收更稳 | content/blog/vercel-404-after-deploy-checklist.mdx |
| 15 | true | false | false | 100 | 报错解决 | Vercel 404 部署成功但页面打不开怎么办：使用前怎么判断是否适合 | Vercel 404 部署成功但页面打不开怎么办：使用前怎么判断是否适合 | content/blog/vercel-404-after-deploy-freelance-scope.mdx |
| 15 | true | false | false | 100 | 报错解决 | Vercel 部署后 404 常见误区 | Vercel 部署后 404 常见误区：别只盯着域名 | content/blog/vercel-404-after-deploy-mistakes.mdx |
| 15 | true | false | false | 100 | 报错解决 | Windows 路径和权限导致安装失败怎么办 | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |

## deployment: MCP、工具权限和企业集成安全

- Priority score: 158
- Public matches: 9
- Missing public coverage: false
- Rationale: High search-intent lane that can expand existing public coverage.

Search queries:

- MCP Server 部署安全
- Agent 工具权限控制
- 企业微信 AI Agent
- Slack AI Agent 接入

Review focus:

- 核对工具权限、沙箱、审批、审计日志和密钥边界
- 提醒读写执行要分级
- 避免给出绕过权限或自动执行敏感操作的建议

Source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- n8n docs: https://docs.n8n.io

Workflow angles:

- 工具权限
- 审批
- 沙箱
- 审计日志
- IM 接入

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 15 | true | false | false | 100 | 报错解决 | Windows 路径和权限导致安装失败怎么办 | Windows 路径和权限导致安装失败怎么办 | content/blog/windows-path-permission-install-fix.mdx |
| 15 | true | false | false | 100 | 报错解决 | Windows 路径和权限导致安装失败怎么办：新手检查清单 | Windows 路径和权限导致安装失败怎么办：新手检查清单 | content/blog/windows-path-permission-install-fix-checklist.mdx |
| 15 | true | false | false | 100 | 报错解决 | Windows 路径和权限导致安装失败怎么办：使用前怎么判断是否适合 | Windows 路径和权限导致安装失败怎么办：使用前怎么判断是否适合 | content/blog/windows-path-permission-install-fix-freelance-scope.mdx |
| 15 | true | false | false | 100 | 报错解决 | Windows 路径和权限导致安装失败怎么办：常见错误和解决步骤 | Windows 路径和权限导致安装失败怎么办：常见错误和解决步骤 | content/blog/windows-path-permission-install-fix-mistakes.mdx |

## deployment: LLM Serving、GPU 和托管推理

- Priority score: 128
- Public matches: 5
- Missing public coverage: false
- Rationale: High search-intent lane that can expand existing public coverage.

Search queries:

- vLLM 部署教程
- TGI 部署教程
- RunPod Serverless 大模型部署
- Modal Serverless GPU LLM

Review focus:

- 核对 serving 框架版本和部署方式
- 说明冷启动、并发、成本、GPU、扩缩容和监控
- 避免把 benchmark 写成项目保证

Source targets:

- vLLM docs: https://docs.vllm.ai
- Hugging Face docs: https://huggingface.co/docs

Workflow angles:

- 在线 serving
- 并发
- GPU
- 冷启动
- 成本延迟

Candidates:

| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 29 | true | false | false | 100 | AI 基建 | TensorRT-LLM 入门 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 22 | true | false | false | 100 | AI 基建 | vLLM 部署 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |

## content-backlog: Ollama、vLLM 和开源模型本地部署

- Priority score: 126
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
| 29 | true | false | false | 100 | AI 基建 | TensorRT-LLM 入门 | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx |
| 22 | true | false | false | 100 | AI 基建 | vLLM 部署 | vLLM 部署适合什么场景：新手先看推理服务边界 | content/blog/vllm-deployment-beginner-guide.mdx |
