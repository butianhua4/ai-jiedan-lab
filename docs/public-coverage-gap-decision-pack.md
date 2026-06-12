# Public Coverage Gap Decision Pack

Generated at: 2026-06-12T16:32:13.568Z

This report is read-only. It turns public coverage gap preflight warnings into human review decisions and explicit command boundaries.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Only use these commands after explicit human approval. Never run mark:review --confirm-human or publish:articles --confirm automatically.
- Note: Read-only human decision pack for public coverage gap candidates. It does not edit article content, metadata, status, noindex, review state, or publishing state.

## Source Evidence

- Preflight generated at: 2026-06-12T16:32:13.087Z
- Traffic note: Search seeds and link suggestions are editorial signals, not measured rankings, impressions, clicks, traffic, or income.
- Preflight summary: {"blockingItems":0,"broadFirstCoverageItems":8,"broadFirstCoveragePreflightItems":8,"items":13,"planItems":8,"planReadyItems":8,"planUnsafeItems":0,"planWaves":4,"readyItems":13,"structuredDataReadyItems":13,"uniqueFiles":13,"warningItems":13,"withPublicLinkSuggestions":13,"withSeedMatches":12}

## Summary

- blockingItems: 0
- items: 13
- itemsWithCommandBoundary: 13
- itemsWithHumanChecklist: 13
- itemsWithPublicLinkSuggestion: 13
- itemsWithSourceTargets: 13
- itemsWithWarningRemediation: 13
- optimizationActions: 43
- readyItems: 13
- reviewReadyWithOptimizations: 13
- unsafeItems: 0
- waves: 4

## Wave Decisions

| Wave | Ready | Blocking | Optimization actions | Themes | Files |
| --- | --- | --- | --- | --- | --- |
| 1 | 3/3 | 0 | 7 | Agent deployment, tool calling, and production workflows<br>Cross-industry AI prompt templates<br>开源大模型部署：Ollama、vLLM、TGI、RunPod | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx<br>content/blog/industry-ai-prompts-template-library-2026.mdx<br>content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 2 | 4/4 | 0 | 14 | RAG, knowledge base, and agent memory<br>Local and open-source model deployment<br>Agent 记忆：短期记忆、长期记忆、RAG、Postgres<br>RAG、知识库、向量数据库和引用溯源 | content/blog/ai-agent-memory-rag-design-guide.mdx<br>content/blog/open-webui-functions-pipelines-deployment-guide.mdx<br>content/blog/n8n-ai-agent-rag-memory-guide.mdx<br>content/blog/ai-model-selection-customer-service-guide.mdx |
| 3 | 3/3 | 0 | 12 | Dify, n8n, Flowise, and no-code AI automation<br>Business AI workflows and SOP templates<br>Dify、n8n、Coze、Flowise、MCP 自动化部署 | content/blog/ai-automation-project-pricing-scope-guide.mdx<br>content/blog/dify-workflow-error-handling-guide.mdx<br>content/blog/mcp-server-deployment-security-checklist.mdx |
| 4 | 3/3 | 0 | 10 | LLM evaluation, observability, and security<br>LLM serving, GPU, and managed inference<br>LLM 观测、评测、日志和上线后质量 | content/blog/ai-api-key-security-rotation-guide.mdx<br>content/blog/bentoml-llm-deployment-beginner-guide.mdx<br>content/blog/agent-tool-permission-safety-guide.mdx |

## Blocking Items

- none

## All Decision Items

| Wave | Decision | Risk | Sources | Seeds | Link suggestion | Actions | Theme | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | human-review-ready-with-optimizations | medium | 11 | 0/9 | /blog/codex-vercel-deploy-preflight-checklist | 3 | Agent deployment, tool calling, and production workflows | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| 1 | human-review-ready-with-optimizations | medium | 10 | 1/9 | /blog/upwork-client-requirements-analysis-beginner | 2 | Cross-industry AI prompt templates | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| 2 | human-review-ready-with-optimizations | medium | 3 | 0/4 | /blog/codex-code-review-delivery-checklist | 3 | RAG, knowledge base, and agent memory | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 2 | human-review-ready-with-optimizations | medium | 3 | 0/3 | /blog/build-first-webpage-with-codex | 4 | Local and open-source model deployment | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 3 | human-review-ready-with-optimizations | medium | 2 | 0/3 | /blog/codex-code-review-delivery-checklist | 5 | Dify, n8n, Flowise, and no-code AI automation | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 3 | human-review-ready-with-optimizations | medium | 2 | 0/2 | /blog/vercel-env-variable-missing-beginner-guide | 4 | Business AI workflows and SOP templates | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 1 | human-review-ready-with-optimizations | medium | 10 | 0/5 | /blog/codex-code-review-delivery-checklist | 2 | 开源大模型部署：Ollama、vLLM、TGI、RunPod | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| 4 | human-review-ready-with-optimizations | low | 15 | 1/6 | /blog/codex-code-review-delivery-checklist | 2 | LLM evaluation, observability, and security | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 2 | human-review-ready-with-optimizations | medium | 3 | 0/5 | /blog/build-first-webpage-with-codex | 3 | Agent 记忆：短期记忆、长期记忆、RAG、Postgres | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| 2 | human-review-ready-with-optimizations | medium | 10 | 0/5 | /blog/build-first-webpage-with-codex | 4 | RAG、知识库、向量数据库和引用溯源 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 4 | human-review-ready-with-optimizations | medium | 2 | 0/4 | /blog/codex-code-review-delivery-checklist | 4 | LLM serving, GPU, and managed inference | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 3 | human-review-ready-with-optimizations | medium | 3 | 0/5 | /blog/vercel-env-variable-missing-beginner-guide | 3 | Dify、n8n、Coze、Flowise、MCP 自动化部署 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 4 | human-review-ready-with-optimizations | medium | 3 | 0/1 | /blog/codex-code-review-delivery-checklist | 4 | LLM 观测、评测、日志和上线后质量 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |

## Per-Item Review Packets

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Theme: Agent deployment, tool calling, and production workflows
- Wave: 1
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist)

Review focus:

- tool permissions
- multi-step state
- human approval
- observability and fallback paths
- 不要写成全自动替人完成高风险业务
- 明确工具权限、人工确认、日志和失败处理
- 核对 SDK/API 的当前名称和部署方式

Source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://python.langchain.com/docs
- https://ai-sdk.dev/docs
- https://platform.openai.com/docs/guides/agents
- https://python.langchain.com/docs
- https://platform.openai.com/docs
- https://platform.openai.com/docs/guides/retrieval
- https://platform.openai.com/docs/guides/prompt-engineering
- https://openai.github.io/openai-agents-python/
- https://langchain-ai.github.io/langgraph/

Suggested optimizations:

- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx`

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Theme: Cross-industry AI prompt templates
- Wave: 1
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner)

Review focus:

- input fields
- output formats
- quality checks
- risk disclaimers
- prompt versioning
- 避免空泛万能提示词，必须给输入字段、输出结构和质检标准
- 高风险行业必须保留专业判断和人工复核
- 不要承诺转化率、收入或法律/医疗结果

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- https://platform.openai.com/docs
- https://platform.openai.com/docs/guides/prompt-engineering
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- https://ai-sdk.dev/docs
- https://platform.openai.com/docs/guides/retrieval
- https://ai-prompts-pro.com/blog/ai-prompt-templates-business
- https://sensara.io/prompts/
- https://www.mrprompts.ai/learn/ai-prompts-for-sales

Suggested optimizations:

- Review the suggested public internal link before publishing: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx`

### AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界

- File: content/blog/ai-agent-memory-rag-design-guide.mdx
- Theme: RAG, knowledge base, and agent memory
- Wave: 2
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist)

Review focus:

- RAG versus fine-tuning
- chunking and embeddings
- citations
- evaluation and privacy

Source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai

Suggested optimizations:

- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx`

### Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流

- File: content/blog/open-webui-functions-pipelines-deployment-guide.mdx
- Theme: Local and open-source model deployment
- Wave: 2
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex)

Review focus:

- hardware sizing
- model size and quantization
- local API exposure
- privacy caveats

Source targets:

- Ollama docs: https://docs.ollama.com
- Hugging Face docs: https://huggingface.co/docs
- vLLM docs: https://docs.vllm.ai

Suggested optimizations:

- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx`

### AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Theme: Dify, n8n, Flowise, and no-code AI automation
- Wave: 3
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist)

Review focus:

- self-hosted versus cloud boundaries
- webhook auth
- connector failures
- manual fallback

Source targets:

- Dify docs: https://docs.dify.ai
- n8n docs: https://docs.n8n.io

Suggested optimizations:

- Tighten the meta description so it states the search intent, audience, and outcome clearly.
- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx`

### Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底

- File: content/blog/dify-workflow-error-handling-guide.mdx
- Theme: Business AI workflows and SOP templates
- Wave: 3
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide)

Review focus:

- workflow owner
- handoff and approval
- measurable output
- risk boundary

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs

Suggested optimizations:

- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/dify-workflow-error-handling-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/dify-workflow-error-handling-guide.mdx`

### 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查

- File: content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx
- Theme: 开源大模型部署：Ollama、vLLM、TGI、RunPod
- Wave: 1
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist)

Review focus:

- 核对部署命令、模型名称、GPU/显存要求、API 路径和版本差异
- 不要承诺本地部署一定更省钱或更稳定
- 必须包含 smoke check、回滚、日志、限流和成本边界

Source targets:

- https://platform.openai.com/docs
- https://platform.openai.com/docs/guides/prompt-engineering
- https://ai-sdk.dev/docs
- https://platform.openai.com/docs/guides/agents
- https://docs.vllm.ai
- https://huggingface.co/docs
- https://platform.openai.com/docs/guides/retrieval
- https://docs.runpod.io/serverless/vllm/get-started
- https://www.runpod.io/articles/guides/deploy-vllm-runpod-docker
- https://www.spheron.network/blog/llm-deployment-guide/

Suggested optimizations:

- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx`

### AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Theme: LLM evaluation, observability, and security
- Wave: 4
- Decision: human-review-ready-with-optimizations
- Risk level: low
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist)

Review focus:

- traces and logs
- evaluation datasets
- prompt injection
- cost and quality drift
- 核对 SDK 名称、API endpoint、限流概念和错误码
- 必须强调密钥安全、服务端代理和日志脱敏
- 不要虚构价格或模型能力

Source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- https://platform.openai.com/docs/guides/agents
- https://platform.openai.com/docs/guides/retrieval
- https://python.langchain.com/docs
- https://platform.openai.com/docs
- https://docs.anthropic.com
- https://ai-sdk.dev/docs
- https://ai.google.dev/docs
- https://docs.dify.ai
- https://docs.n8n.io
- https://platform.openai.com/docs/guides/prompt-engineering
- https://docs.anthropic.com/
- https://vercel.com/docs/ai-gateway

Suggested optimizations:

- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx`

### n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储

- File: content/blog/n8n-ai-agent-rag-memory-guide.mdx
- Theme: Agent 记忆：短期记忆、长期记忆、RAG、Postgres
- Wave: 2
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex)

Review focus:

- 区分知识库 RAG 和用户记忆
- 必须有隐私、删除、去重、引用和人工纠错边界
- 避免宣称记忆层能自动解决幻觉

Source targets:

- https://arxiv.org/abs/2604.20598
- https://www.reddit.com/r/Rag/comments/1qjvqd4/vector_dbs_arent_memory_learned_this_the_hard_way/
- https://docs.agenticgokit.com/tutorials/getting-started/memory-and-rag

Suggested optimizations:

- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx`

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Theme: RAG、知识库、向量数据库和引用溯源
- Wave: 2
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex)

Review focus:

- 把 RAG、微调、提示词模板区分清楚
- 必须写明引用、来源、权限和失败兜底
- 不要把 demo 成功写成生产质量保证

Source targets:

- https://platform.openai.com/docs/guides/retrieval
- https://platform.openai.com/docs/guides/prompt-engineering
- https://python.langchain.com/docs
- https://docs.llamaindex.ai
- https://huggingface.co/docs
- https://platform.openai.com/docs
- https://ai-sdk.dev/docs
- https://www.reddit.com/r/Rag/comments/1t9v93f/is_anyone_still_running_pure_vector_rag_in/
- https://arxiv.org/abs/2603.10700
- https://www.pinecone.io/learn/retrieval-augmented-generation/

Suggested optimizations:

- Tighten the meta description so it states the search intent, audience, and outcome clearly.
- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx`

### BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收

- File: content/blog/bentoml-llm-deployment-beginner-guide.mdx
- Theme: LLM serving, GPU, and managed inference
- Wave: 4
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist)

Review focus:

- serving framework versions
- cold starts and concurrency
- GPU cost
- autoscaling and monitoring

Source targets:

- vLLM docs: https://docs.vllm.ai
- Hugging Face docs: https://huggingface.co/docs

Suggested optimizations:

- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx`

### MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单

- File: content/blog/mcp-server-deployment-security-checklist.mdx
- Theme: Dify、n8n、Coze、Flowise、MCP 自动化部署
- Wave: 3
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide)

Review focus:

- 核对平台连接器、webhook、权限和部署限制
- 避免鼓励群发、绕过平台规则或抓取隐私数据
- 写清楚人工审批和客户验收边界

Source targets:

- https://docs.dify.ai/
- https://docs.n8n.io/
- https://modelcontextprotocol.io/docs

Suggested optimizations:

- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Review the suggested public internal link before publishing: Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide).

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/mcp-server-deployment-security-checklist.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/mcp-server-deployment-security-checklist.mdx`

### Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志

- File: content/blog/agent-tool-permission-safety-guide.mdx
- Theme: LLM 观测、评测、日志和上线后质量
- Wave: 4
- Decision: human-review-ready-with-optimizations
- Risk level: medium
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Public link suggestion: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist)

Review focus:

- 不要把评测分数写成绝对质量保证
- 明确日志隐私、数据脱敏和留存边界
- 给出人工抽检和回滚流程

Source targets:

- https://www.promptfoo.dev/docs/intro/
- https://docs.ragas.io/
- https://docs.helicone.ai/

Suggested optimizations:

- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.
- During human review, decide whether the title, description, or opening section should naturally include one search-seed variant.
- Add or approve one concrete subsection that matches the target search intent without keyword stuffing.
- Review the suggested public internal link before publishing: Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist).

Human decision checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify source targets and remove or rewrite any unsupported claims.
- Decide whether the warning issues must be fixed before mark:review.
- Choose one public internal link suggestion or document why no link should be added.
- Confirm the article does not claim measured traffic, rankings, impressions, clicks, revenue, or income.
- Only after human approval, run the mark:review command manually; publishing still requires a separate explicit approval.

Commands after explicit approval:

- Mark review: `npm run mark:review -- --file=content/blog/agent-tool-permission-safety-guide.mdx --confirm-human`
- Publish dry-run: `npm run publish:articles -- --file=content/blog/agent-tool-permission-safety-guide.mdx`

