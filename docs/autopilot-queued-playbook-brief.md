# Autopilot Queued Playbook Brief

Generated at: 2026-06-07T02:04:33.172Z

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
- itemsWithOptimizationActions: 6
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
| 3 | true | 7 | 12 | 20 | 3 | high | low | true | not-included | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| 5 | true | 8 | 12 | 21 | 3 | high | low | true | not-included | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| 6 | true | 9 | 12 | 22 | 3 | high | low | true | not-included | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| 7 | true | 10 | 12 | 22 | 3 | high | low | true | not-included | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| 8 | true | 2 | 8 | 22 | 1 | high | low | true | not-included | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| 9 | true | 8 | 12 | 22 | 3 | high | low | true | not-included | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| 10 | true | 8 | 12 | 13 | 3 | unknown | unknown | true | not-included | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |

## Manual Review Playbooks

### 3. 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Primary keyword: 客服 AI 模型选型
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, internal-link-opportunity-audit, autopilot-search-query-gap-brief
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: 客服 AI 模型选型
- Confirm article answers search query: 客服 AI 模型选型怎么做
- Confirm article answers search query: 客服 AI 模型选型教程
- Confirm article answers search query: 客服 AI 模型选型新手教程
- Confirm article answers search query: 客服 AI 模型选型落地步骤
- Confirm article answers search query: 客服 AI 模型选型对比
- Confirm article answers search query: 客服 AI 模型选型怎么选
- Confirm article answers search query: 客服 AI 模型选型模板

Source actions:

- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: LlamaIndex docs: https://docs.llamaindex.ai
- Verify official source: Hugging Face docs: https://huggingface.co/docs
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Run or manually check fact-check query: 客服 AI 模型选型 official docs latest

Optimization actions:

- 在开头 200 字内自然回答一次“客服 AI 模型选型”这个搜索意图，先给结论再展开步骤。
- 在相关段落加入公开内链：Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex)。
- Rewrite the meta description to name the reader, outcome, and search phrase: 客服 AI 模型选型.
- Check whether the primary keyword can appear naturally in the title without making the title stiff.
- Add one FAQ or checklist line that uses a high-intent query variant such as: 客服 AI 模型选型.
- Consider reviewed title: 客服 AI 模型选型：速度、成本、知识库、转人工和质检

Internal link suggestions:

- Codex 怎么做第一个网页: /blog/build-first-webpage-with-codex
- Codex 生成代码后怎么审核：交付前检查清单: /blog/codex-code-review-delivery-checklist
- Codex 部署 Vercel 前检查什么：上线前清单: /blog/codex-vercel-deploy-preflight-checklist

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.
- No traffic, ranking, revenue, benchmark, cost, latency, or stability claim is approved without measured evidence.
- No API key, private customer data, credential, or client account detail is exposed.

### 5. AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界

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

### 6. Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流

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

### 7. AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

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

### 8. BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收

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

### 9. Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底

- File: content/blog/dify-workflow-error-handling-guide.mdx
- Primary keyword: Dify 工作流错误处理
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, review-action-board, review-optimization-brief, review-freshness-brief, review-cannibalization-brief, internal-link-opportunity-audit
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/dify-workflow-error-handling-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/dify-workflow-error-handling-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: AI workflow examples
- Confirm article answers search query: AI use cases for business
- Confirm article answers search query: AI automation workflow
- Confirm article answers search query: department AI SOP
- Confirm article answers search query: Dify 工作流错误处理怎么做
- Confirm article answers search query: Dify 工作流错误处理教程
- Confirm article answers search query: Dify 工作流错误处理新手教程
- Confirm article answers search query: Dify 工作流错误处理落地步骤

Source actions:

- Verify official source: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Verify official source: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Verify official source: LangChain docs: https://python.langchain.com/docs
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: Dify docs: https://docs.dify.ai
- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Verify official source: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Verify official source: OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering

Optimization actions:

- 在开头 200 字内自然回答一次“AI workflow examples”这个搜索意图，先给结论再展开步骤。
- 补一个小节或提示框覆盖缺口：support、product、weekly report。
- 在相关段落加入公开内链：Vercel 提示环境变量缺失怎么办：新手部署检查流程 (/blog/vercel-env-variable-missing-beginner-guide)。
- Check whether the primary keyword can appear naturally in the title without making the title stiff.
- Rewrite the meta description to name the reader, outcome, and search phrase: AI workflow examples.
- Add one contextual link to a published article before approval.

Internal link suggestions:

- Vercel 提示环境变量缺失怎么办：新手部署检查流程: /blog/vercel-env-variable-missing-beginner-guide
- 第一个 Upwork 小项目怎么报价：新手范围和底价检查: /blog/first-upwork-project-pricing-checklist
- Codex 生成代码后怎么审核：交付前检查清单: /blog/codex-code-review-delivery-checklist

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.
- No traffic, ranking, revenue, benchmark, cost, latency, or stability claim is approved without measured evidence.

### 10. 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断

- File: content/blog/customer-service-ai-prompts-guide.mdx
- Primary keyword: 客服 AI 提示词
- Source evidence: next-review-source-pack, search-query-coverage, review-portfolio-board, internal-link-opportunity-audit, industry-prompt-review-pack
- Manual mark-review command after approval: npm run mark:review -- --file=content/blog/customer-service-ai-prompts-guide.mdx --confirm-human
- Publish dry-run only after review: npm run publish:articles -- --file=content/blog/customer-service-ai-prompts-guide.mdx
- Publish confirm: not-included

Search actions:

- Confirm article answers search query: 客服 AI 提示词
- Confirm article answers search query: 客服回复 AI 模板
- Confirm article answers search query: 工单分类 AI prompt
- Confirm article answers search query: 售后回复 AI 提示词
- Confirm article answers search query: 客服 AI 提示词怎么做
- Confirm article answers search query: 客服 AI 提示词教程
- Confirm article answers search query: 客服 AI 提示词新手教程
- Confirm article answers search query: 客服 AI 提示词落地步骤

Source actions:

- Verify official source: OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Verify official source: OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Verify official source: Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Verify official source: Google Gemini Workspace prompting: https://support.google.com/docs/answer/15013615
- Verify official source: Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/
- Verify official source: OpenAI API docs: https://platform.openai.com/docs
- Verify official source: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Verify official source: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Optimization actions:

- none

Internal link suggestions:

- Codex 生成代码后怎么审核：交付前检查清单: /blog/codex-code-review-delivery-checklist
- Codex 接 Upwork 小单怎么判断：风险检查清单: /blog/codex-upwork-small-job-risk-checklist
- Codex 生成代码后怎么审核: /blog/codex-generated-code-review-guide

Risk checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.
- No fabricated metrics, rankings, traffic, income, or client results.
- No claim that prompts replace professional judgment in regulated or high-stakes workflows.

