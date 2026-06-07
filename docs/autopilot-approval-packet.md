# Autopilot Approval Packet

Generated at: 2026-06-07T17:32:53.097Z

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
| true | 1723 | ai-deployment | draft | true | 14 | 11 | 8 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 1723 | industry-prompt | draft | true | 17 | 13 | 8 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | 1598 | public-coverage-gap | draft | true | 17 | 5 | 8 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |

## Item Review Notes

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
- AI Agent 生产环境
- LangGraph Agent 入门
- CrewAI 部署教程
- AI 工作流部署

Official source targets:

- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain docs: https://python.langchain.com/docs
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- https://ai-sdk.dev/docs
- https://platform.openai.com/docs/guides/agents
- https://python.langchain.com/docs
- https://platform.openai.com/docs
- https://platform.openai.com/docs/guides/retrieval
- https://platform.openai.com/docs/guides/prompt-engineering
- https://openai.github.io/openai-agents-python/
- https://langchain-ai.github.io/langgraph/

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

- Verify 14 official source target(s).
- Check 8 search query seed(s).
- Review 22 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: AI Agent deployment tutorial.; Add one contextual link to a published article before approval..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx`
- Publish confirm: not-included

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
- 销售 AI 提示词
- 客服 AI 提示词
- HR AI 提示词
- 运营 AI 提示词
- 企业 AI 提示词模板

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
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

- Verify 17 official source target(s).
- Check 8 search query seed(s).
- Review 19 combined checklist signal(s).
- Apply copydesk remediation: Add one contextual link to a published article before approval.; Decide whether missing subtopics should become a short section or a follow-up article..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx`
- Publish confirm: not-included

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Slug: ai-model-selection-customer-service-guide
- Status: draft
- Description: 整理客服 AI 模型选型方法，覆盖响应速度、成本、知识库、情绪识别、转人工、质检、上下文长度和安全边界。
- Source types: public-gap, wave
- Quality score: 86

Search queries:

- RAG 知识库搭建教程
- 向量数据库教程
- 企业知识库 AI 部署
- RAG 检索不到内容
- RAG 评测教程

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs
- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
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

Headings:

- 适合谁
- 不适合谁
- 速度优先还是质量优先
- 知识库很重要
- 转人工策略
- 质检和复盘
- 常见错误
- 交付检查

Human review focus:

- Verify 17 official source target(s).
- Check 5 search query seed(s).
- Review 10 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: RAG 知识库搭建教程.; Check whether the primary keyword can appear naturally in the title without making the title stiff..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx`
- Publish confirm: not-included

