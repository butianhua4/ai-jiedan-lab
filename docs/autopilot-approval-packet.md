# Autopilot Approval Packet

Generated at: 2026-06-07T03:16:31.679Z

This packet is read-only. It packages the top autopilot review assignments for human approval and does not change article status.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Human must approve every mark:review command. publish --confirm commands are intentionally excluded.

## Boundaries

- Public published: 15
- Publishable now: 0
- Traffic data available: false
- Can claim traffic: false

## Summary

- items: 3
- queueUnsafeItems: 0
- readyForHumanApproval: 3
- unsafeItems: 0
- withHeadings: 3
- withSearchQueries: 3
- withSourceTargets: 3

## Unsafe Items

- none

## Approval Items

| Ready | Score | Lane | Status | noindex | Sources | Queries | Headings | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1688 | industry-prompt | draft | true | 9 | 8 | 8 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | 1643 | ai-deployment | draft | true | 6 | 8 | 8 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 1253 | ai-deployment | draft | true | 5 | 8 | 8 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |

## Item Review Notes

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Slug: industry-ai-prompts-template-library-2026
- Status: draft
- Description: 整理全行业 AI 提示词模板库的搭建方法，覆盖销售、运营、客服、HR、财务、教育、产品和研发场景，重点讲分类、输入、输出、审核和复用。
- Source types: prompt, public-gap, wave
- Quality score: 90

Search queries:

- ChatGPT prompts for business
- AI prompt template library
- industry AI prompts
- best AI prompts for work
- AI 提示词大全
- ChatGPT 提示词模板
- 全行业 AI 提示词
- AI prompt library

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Google Gemini Workspace prompting: https://support.google.com/docs/answer/15013615
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Headings:

- 适合谁
- 不适合谁
- 为什么要按行业拆
- 可以优先做的行业分类
- 具体步骤
- 示例模板
- 常见错误
- 风险提醒

Human review focus:

- Verify 9 official source target(s).
- Check 8 search query seed(s).
- Review 20 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: ChatGPT prompts for business.; Add one contextual link to a published article before approval..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx`
- Publish confirm: not-included

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Slug: ai-agent-deployment-vercel-ai-sdk-guide
- Status: draft
- Description: 面向新手解释 AI Agent 部署流程，覆盖 Vercel AI SDK、工具调用、多步执行、停止条件、日志、权限、人工接管和上线检查。
- Source types: deployment, public-gap, wave
- Quality score: 90

Search queries:

- AI Agent deployment tutorial
- agent tool calling tutorial
- OpenAI Agents SDK beginner guide
- Vercel AI SDK agent
- AI Agent 部署教程
- Agent 工具调用教程
- AI 工作流部署
- Agent 人工审核流程

Official source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://python.langchain.com/docs
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Headings:

- 适合谁
- 不适合谁
- Agent 和普通聊天机器人有什么区别
- 具体步骤
- 一个最小设计
- 部署时要检查什么
- 常见错误
- 风险提醒

Human review focus:

- Verify 6 official source target(s).
- Check 8 search query seed(s).
- Review 22 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: AI Agent deployment tutorial.; Add one contextual link to a published article before approval..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx`
- Publish confirm: not-included

### AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Slug: ai-api-key-security-rotation-guide
- Status: draft
- Description: 整理 AI API Key 安全管理清单，覆盖环境变量、最小权限、服务端调用、密钥轮换、日志脱敏、泄露应急和客户交付。
- Source types: deployment, public-gap
- Quality score: 86

Search queries:

- LLM observability
- RAG evaluation
- AI agent logs
- prompt injection defense
- OpenAI API Next.js
- Claude API 接入
- Gemini API Next.js
- API rate limit 怎么办

Official source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- OpenAI API docs: https://platform.openai.com/docs
- Anthropic docs: https://docs.anthropic.com

Headings:

- 适合谁
- 不适合谁
- 服务端调用
- 环境变量
- 最小权限和轮换
- 泄露应急
- 常见错误
- 交付检查

Human review focus:

- Verify 5 official source target(s).
- Check 8 search query seed(s).
- Review 17 combined checklist signal(s).
- Apply copydesk remediation: Check whether the primary keyword can appear naturally in the title without making the title stiff.; Rewrite the meta description to name the reader, outcome, and search phrase: LLM observability..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx`
- Publish confirm: not-included

