# Wave Approval Packet

Generated at: 2026-06-08T06:18:43.881Z

Approval wave: 1

This packet is read-only. It consolidates the queue and source-pack checks for the next human review wave.

## Guardrails

- Auto mark review: false
- Auto publish: false
- Stop before: Run the listed mark:review commands only after explicit human approval for each file.
- Note: This packet prepares the next human approval wave only. It does not change article status, noindex, or publishing state.

## Summary

- items: 3
- readyForHumanReview: 3
- unsafeItems: 0
- wave: 1

## Files

- content/blog/ai-model-selection-customer-service-guide.mdx
- content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- content/blog/industry-ai-prompts-template-library-2026.mdx

## Decision Table

| Ready | Score | Quality | Sources | Queries | Risk | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| true | 777 | 100 | 7 | 8 | 6 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | 773 | 100 | 6 | 8 | 6 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 769 | 100 | 4 | 9 | 6 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |

## 1. 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Lane: deployment: RAG、知识库和向量检索
- Search intent: informational
- Publish batch: 34
- Priority score: 777
- Quality score: 100
- Ready for human review: true
- Safe draft: true
- Source pack ready: true
- Chinese chars: 1232
- Internal links: 4
- Description: 整理客服 AI 模型选型方法，覆盖响应速度、成本、知识库、情绪识别、转人工、质检、上下文长度和安全边界。
- Source notes: 结合多模型路由、RAG、客服提示词和生产客服系统风险整理；正式发布前需要人工核对具体平台规则。

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- 客服 AI 模型选型 official docs latest
- 客服 AI 模型选型 official documentation current limits
- 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 fact check official docs
- AI 部署 official docs limits pricing changelog
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库 RAG 教程
- RAG 评测怎么做

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- 文档清洗
- chunk
- embedding
- metadata
- 引用来源
- 测试集

Quality issues:

- none

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
```

## 2. AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Lane: deployment: Agent 部署、工具调用和工作流
- Search intent: informational
- Publish batch: 40
- Priority score: 773
- Quality score: 100
- Ready for human review: true
- Safe draft: true
- Source pack ready: true
- Chinese chars: 1540
- Internal links: 6
- Description: 面向新手解释 AI Agent 部署流程，覆盖 Vercel AI SDK、工具调用、多步执行、停止条件、日志、权限、人工接管和上线检查。
- Source notes: 参考 Vercel 官方 AI SDK Agent 文档和实际 Web 应用部署流程整理；正式公开前需要人工核对 API 示例、版本和平台限制。

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://python.langchain.com/docs
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Fact-check queries:

- AI Agent 部署 official docs latest
- AI Agent 部署 official documentation current limits
- AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 fact check official docs
- AI Agent official docs limits pricing changelog
- AI Agent 部署教程
- Agent 工具调用教程
- AI 工作流部署
- Agent 人工审核流程

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.
- Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.

Workflow angles:

- 工具白名单
- 多步执行
- 人工确认
- 失败重试
- 日志追踪

Quality issues:

- none

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
```

## 3. 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Lane: content-backlog: 全行业 AI 提示词和工作流模板
- Search intent: informational
- Publish batch: 40
- Priority score: 769
- Quality score: 100
- Ready for human review: true
- Safe draft: true
- Source pack ready: true
- Chinese chars: 1862
- Internal links: 6
- Description: 整理全行业 AI 提示词模板库的搭建方法，覆盖销售、运营、客服、HR、财务、教育、产品和研发场景，重点讲分类、输入、输出、审核和复用。
- Source notes: 参考 OpenAI prompt engineering 官方指南、团队知识库实践和行业 SOP 设计经验整理；正式公开前需要人工核对示例、行业边界和敏感内容。

Approval checklist:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Quality score is at least 100: true
- Source notes are present: true
- Article has internal links: true
- Reviewer confirms the article answers one clear search intent.
- Reviewer confirms factual claims against official docs before any status change.

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval

Fact-check queries:

- 全行业 AI 提示词模板 official docs latest
- 全行业 AI 提示词模板 official documentation current limits
- 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 fact check official docs
- AI 提示词 official docs limits pricing changelog
- AI 提示词大全
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词
- HR AI 提示词

Risk review checklist:

- No income, ranking, approval, or client acquisition guarantee.
- No instruction to bypass platform, payment, messaging, account, or review rules.
- No API key, credential, private customer data, or account detail is included.
- Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.
- RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.
- Prompt examples include input context, output criteria, review rules, and adaptation notes.

Workflow angles:

- search intent
- fact review
- risk language
- internal links

Quality issues:

- none

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
```
