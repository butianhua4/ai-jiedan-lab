# Autopilot Queued Playbook Brief

Generated at: 2026-06-07T04:18:03.230Z

This report is read-only. It prepares the queued-for-playbook sprint items for manual review and keeps all status changes human-gated.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Use this report for manual review only. mark:review requires explicit human approval per file; publish --confirm is not included.
- Note: Read-only merged playbook for next-10 queued-for-playbook sprint items. It prepares human review without changing article status.

## Summary

- items: 7
- itemsWithCommandBoundary: 7
- itemsWithFactCheckQueries: 7
- itemsWithInternalLinkSuggestions: 7
- itemsWithOptimizationActions: 7
- itemsWithRiskChecklist: 7
- itemsWithSearchActions: 7
- itemsWithSearchQueries: 7
- itemsWithSourceActions: 7
- itemsWithSourceEvidence: 7
- itemsWithSourceTargets: 7
- readyItems: 7
- safeDraftItems: 7
- unsafeItems: 0

## Source Evidence

- queuedForPlaybook: 7
- sprintBoardUnsafeItems: 0

## Unsafe Items

- none

## Queued Playbook Items

| Order | Ready | Sources | Queries | Actions | Links | Freshness | Cannibalization | Mark-review gated | Publish confirm | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 4 | true | 22 | 12 | 20 | 3 | high | low | true | not-included | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| 5 | true | 6 | 9 | 21 | 3 | high | low | true | not-included | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| 6 | true | 8 | 12 | 21 | 3 | high | low | true | not-included | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 7 | true | 9 | 12 | 22 | 3 | high | low | true | not-included | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 8 | true | 10 | 12 | 22 | 3 | high | low | true | not-included | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 9 | true | 2 | 8 | 22 | 1 | high | low | true | not-included | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 10 | true | 3 | 5 | 22 | 3 | high | low | true | not-included | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |

## Manual Review Playbooks

### 4. AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Primary keyword: AI API Key 安全管理
- Source evidence: next-review-source-pack, review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, internal-link-opportunity-audit, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: LLM observability
- Confirm article answers search query: RAG evaluation
- Confirm article answers search query: AI agent logs
- Confirm article answers search query: prompt injection defense
- Confirm article answers search query: OpenAI API 接入教程
- Confirm article answers search query: Claude API rate limit
- Confirm article answers search query: Gemini API 限流
- Confirm article answers search query: OpenRouter API 教程

Source actions:

- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: Anthropic docs: https://docs.anthropic.com
- Verify official source: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: Google AI docs: https://ai.google.dev/docs
- Verify official source: Dify docs: https://docs.dify.ai
- Verify official source: n8n docs: https://docs.n8n.io
- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval

Optimization actions:

- 在开头 200 字内自然回答一次“LLM observability”这个搜索意图，先给结论再展开步骤。
- 补一个小节或提示框覆盖缺口：logs、prompt injection、cost tracking。
- 在相关段落加入公开内链：Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist)。
- Check whether the primary keyword can appear naturally in the title without making the title stiff.
- Decide whether missing subtopics should become a short section or a follow-up article.
- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.

Internal link suggestions:

- Codex 生成代码后怎么审核：交付前检查清单: /blog/codex-code-review-delivery-checklist
- Codex 和 GitHub 怎么配合：提交代码前检查: /blog/codex-github-before-commit-checklist
- 第一个 Upwork 小项目怎么报价：新手范围和底价检查: /blog/first-upwork-project-pricing-checklist

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.
- No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.

### 5. MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单

- File: content/blog/mcp-server-deployment-security-checklist.mdx
- Primary keyword: MCP Server 部署安全
- Source evidence: review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, internal-link-opportunity-audit, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/mcp-server-deployment-security-checklist.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/mcp-server-deployment-security-checklist.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: Dify 部署教程
- Confirm article answers search query: n8n AI 自动化教程
- Confirm article answers search query: MCP 使用教程
- Confirm article answers search query: Flowise 本地部署
- Confirm article answers search query: Coze Bot 发布
- Confirm article answers search query: LLM observability 教程
- Confirm article answers search query: Agent 可观测性
- Confirm article answers search query: RAG 评测

Source actions:

- Verify official source: https://docs.dify.ai/
- Verify official source: https://docs.n8n.io/
- Verify official source: https://modelcontextprotocol.io/docs
- Verify official source: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: LlamaIndex docs: https://docs.llamaindex.ai
- Run or manually check fact-check query: Dify 部署教程 official docs latest
- Run or manually check fact-check query: n8n AI 自动化教程 official docs latest

Optimization actions:

- 在开头 200 字内自然回答一次“Dify 部署教程”这个搜索意图，先给结论再展开步骤。
- 在相关段落加入公开内链：Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide)。
- Check whether the primary keyword can appear naturally in the title without making the title stiff.
- Rewrite the meta description to name the reader, outcome, and search phrase: Dify 部署教程.
- Add one contextual link to a published article before approval.
- Check whether the title should include the primary keyword naturally, or whether the current wording better matches intent.

Internal link suggestions:

- Vercel 提示环境变量缺失怎么办：新手部署检查流程: /blog/vercel-env-variable-missing-beginner-guide
- 第一个 Upwork 小项目怎么报价：新手范围和底价检查: /blog/first-upwork-project-pricing-checklist
- Codex 怎么做第一个网页: /blog/build-first-webpage-with-codex

Risk checklist:

- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.
- No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.
- No unsafe secret handling, public API key exposure, or client-side privileged token use.
- No unbounded autonomous Agent action without permissions, allowlists, human approval, and logs.
- No RAG or memory claim that removes the need for citation, privacy review, or hallucination checks.
- No outdated model, package, endpoint, pricing, or platform behavior unless marked for human fact-checking.
- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify official docs for deployment commands, SDK names, model names, API endpoints, environment variables, and version-sensitive details.

### 6. AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界

- File: content/blog/ai-agent-memory-rag-design-guide.mdx
- Primary keyword: AI Agent 记忆
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, internal-link-opportunity-audit, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: RAG knowledge base tutorial
- Confirm article answers search query: AI agent memory
- Confirm article answers search query: vector database RAG
- Confirm article answers search query: enterprise knowledge base AI
- Confirm article answers search query: RAG 知识库搭建教程
- Confirm article answers search query: 企业知识库 AI 部署
- Confirm article answers search query: 向量数据库 RAG 教程
- Confirm article answers search query: RAG 评测怎么做

Source actions:

- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: LlamaIndex docs: https://docs.llamaindex.ai
- Verify official source: Hugging Face docs: https://huggingface.co/docs
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Optimization actions:

- 在开头 200 字内自然回答一次“RAG knowledge base tutorial”这个搜索意图，先给结论再展开步骤。
- 补一个小节或提示框覆盖缺口：knowledge base、vector database。
- 在相关段落加入公开内链：Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex)。
- Rewrite the meta description to name the reader, outcome, and search phrase: RAG knowledge base tutorial.
- Add one contextual link to a published article before approval.
- Decide whether missing subtopics should become a short section or a follow-up article.

Internal link suggestions:

- Codex 怎么做第一个网页: /blog/build-first-webpage-with-codex
- Codex 生成代码后怎么审核：交付前检查清单: /blog/codex-code-review-delivery-checklist
- Codex 和 GitHub 怎么配合：提交代码前检查: /blog/codex-github-before-commit-checklist

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

### 7. Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流

- File: content/blog/open-webui-functions-pipelines-deployment-guide.mdx
- Primary keyword: Open WebUI Functions Pipelines
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, internal-link-opportunity-audit, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: local LLM deployment
- Confirm article answers search query: Ollama local model tutorial
- Confirm article answers search query: Open WebUI deployment
- Confirm article answers search query: local AI model GPU memory
- Confirm article answers search query: 本地部署大模型教程
- Confirm article answers search query: Ollama 本地部署
- Confirm article answers search query: Open WebUI Ollama 部署
- Confirm article answers search query: 本地大模型显存不够

Source actions:

- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: LlamaIndex docs: https://docs.llamaindex.ai
- Verify official source: Hugging Face docs: https://huggingface.co/docs
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: n8n docs: https://docs.n8n.io
- Verify official source: Ollama docs: https://docs.ollama.com

Optimization actions:

- 在开头 200 字内自然回答一次“local LLM deployment”这个搜索意图，先给结论再展开步骤。
- 补一个小节或提示框覆盖缺口：gpu memory、quantization、local api、model download。
- 在相关段落加入公开内链：Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex)。
- Check whether the primary keyword can appear naturally in the title without making the title stiff.
- Rewrite the meta description to name the reader, outcome, and search phrase: local LLM deployment.
- Add one contextual link to a published article before approval.

Internal link suggestions:

- Codex 怎么做第一个网页: /blog/build-first-webpage-with-codex
- Codex 生成代码后怎么审核：交付前检查清单: /blog/codex-code-review-delivery-checklist
- Codex 生成代码后怎么审核: /blog/codex-generated-code-review-guide

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.
- No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.

### 8. AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Primary keyword: AI 自动化项目报价
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, internal-link-opportunity-audit, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: Dify deployment tutorial
- Confirm article answers search query: n8n AI agent self hosted
- Confirm article answers search query: Flowise local deployment
- Confirm article answers search query: Dify workflow error handling
- Confirm article answers search query: Dify 部署教程
- Confirm article answers search query: n8n AI Agent 自托管
- Confirm article answers search query: Flowise 本地部署
- Confirm article answers search query: Dify 工作流错误处理

Source actions:

- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: LlamaIndex docs: https://docs.llamaindex.ai
- Verify official source: Hugging Face docs: https://huggingface.co/docs
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: Dify docs: https://docs.dify.ai

Optimization actions:

- 在开头 200 字内自然回答一次“Dify deployment tutorial”这个搜索意图，先给结论再展开步骤。
- 补一个小节或提示框覆盖缺口：self hosted、connector。
- 在相关段落加入公开内链：第一个 Upwork 小项目怎么报价：新手范围和底价检查 (/blog/first-upwork-project-pricing-checklist)。
- Rewrite the meta description to name the reader, outcome, and search phrase: Dify deployment tutorial.
- Check whether the primary keyword can appear naturally in the title without making the title stiff.
- Add one contextual link to a published article before approval.

Internal link suggestions:

- 第一个 Upwork 小项目怎么报价：新手范围和底价检查: /blog/first-upwork-project-pricing-checklist
- Codex 生成代码后怎么审核：交付前检查清单: /blog/codex-code-review-delivery-checklist
- Codex 部署 Vercel 前检查什么：上线前清单: /blog/codex-vercel-deploy-preflight-checklist

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.

### 9. BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收

- File: content/blog/bentoml-llm-deployment-beginner-guide.mdx
- Primary keyword: BentoML LLM 部署
- Source evidence: review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, ai-deployment-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: vLLM deployment tutorial
- Confirm article answers search query: Hugging Face TGI deployment
- Confirm article answers search query: RunPod serverless LLM
- Confirm article answers search query: serverless GPU LLM deployment
- Confirm article answers search query: vLLM 部署教程
- Confirm article answers search query: TGI 部署教程
- Confirm article answers search query: RunPod Serverless 大模型部署
- Confirm article answers search query: Modal Serverless GPU LLM

Source actions:

- Verify official source: vLLM docs: https://docs.vllm.ai
- Verify official source: Hugging Face docs: https://huggingface.co/docs
- Run or manually check fact-check query: vLLM deployment tutorial official docs latest
- Run or manually check fact-check query: Hugging Face TGI deployment official docs latest
- Run or manually check fact-check query: RunPod serverless LLM official docs latest
- Run or manually check fact-check query: serverless GPU LLM deployment official docs latest

Optimization actions:

- 在开头 200 字内自然回答一次“vLLM deployment tutorial”这个搜索意图，先给结论再展开步骤。
- 补一个小节或提示框覆盖缺口：concurrency、autoscaling。
- 在相关段落加入公开内链：Codex 生成代码后怎么审核：交付前检查清单 (/blog/codex-code-review-delivery-checklist)。
- Check whether the primary keyword can appear naturally in the title without making the title stiff.
- Rewrite the meta description to name the reader, outcome, and search phrase: vLLM deployment tutorial.
- Add one contextual link to a published article before approval.

Internal link suggestions:

- Codex 生成代码后怎么审核：交付前检查清单: /blog/codex-code-review-delivery-checklist

Risk checklist:

- No one-click stability promise for deployment, serving, Agent execution, or RAG quality.
- No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim.
- No unsafe secret handling, public API key exposure, or client-side privileged token use.
- No unbounded autonomous Agent action without permissions, allowlists, human approval, and logs.
- No RAG or memory claim that removes the need for citation, privacy review, or hallucination checks.
- No outdated model, package, endpoint, pricing, or platform behavior unless marked for human fact-checking.
- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Verify official docs for deployment commands, SDK names, model names, API endpoints, environment variables, and version-sensitive details.

### 10. Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志

- File: content/blog/agent-tool-permission-safety-guide.mdx
- Primary keyword: missing
- Source evidence: review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, internal-link-opportunity-audit
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/agent-tool-permission-safety-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/agent-tool-permission-safety-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: LLM observability 教程
- Confirm article answers search query: RAG 评测教程
- Confirm article answers search query: promptfoo 入门
- Confirm article answers search query: LangSmith 教程
- Confirm article answers search query: AI 应用日志监控

Source actions:

- Verify official source: https://www.promptfoo.dev/docs/intro/
- Verify official source: https://docs.ragas.io/
- Verify official source: https://docs.helicone.ai/
- Run or manually check fact-check query: LLM observability 教程 official docs latest
- Run or manually check fact-check query: RAG 评测教程 official docs latest
- Run or manually check fact-check query: promptfoo 入门 official docs latest
- Run or manually check fact-check query: LangSmith 教程 official docs latest

Optimization actions:

- 在开头 200 字内自然回答一次“LLM observability 教程”这个搜索意图，先给结论再展开步骤。
- 在相关段落加入公开内链：第一个 Upwork 小项目怎么报价：新手范围和底价检查 (/blog/first-upwork-project-pricing-checklist)。
- Check whether the primary keyword can appear naturally in the title without making the title stiff.
- Rewrite the meta description to name the reader, outcome, and search phrase: LLM observability 教程.
- Resolve or explicitly accept during human review: few search-seed token families appear in article text.
- Add one contextual link to a published article before approval.

Internal link suggestions:

- 第一个 Upwork 小项目怎么报价：新手范围和底价检查: /blog/first-upwork-project-pricing-checklist
- Vercel 提示环境变量缺失怎么办：新手部署检查流程: /blog/vercel-env-variable-missing-beginner-guide
- Codex 生成代码后怎么审核：交付前检查清单: /blog/codex-code-review-delivery-checklist

Risk checklist:

- Confirm the article is still draft, noindex, and humanReviewRequired before any approval action.
- Open official source targets and verify current product names, APIs, limits, pricing-sensitive wording, and workflow boundaries.
- Rewrite or remove any unsupported claim before mark:review.
- Confirm no traffic, ranking, revenue, client acquisition, or guaranteed result claim was introduced.
- Only after human approval, run mark:review manually; publishing still requires separate explicit approval.
- Confirm the candidate owns a distinct search intent: Agent 工具权限控制.
- No close published article found; still confirm the title is not a duplicate promise.
- No close draft/review candidate found.

