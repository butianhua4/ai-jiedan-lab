# Autopilot Human Review Playbook

Generated at: 2026-06-07T04:27:19.479Z

This report is read-only. It merges the top autopilot approval packet with search, source, internal-link, and copydesk tasks for human review.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: This playbook stops before mark:review and never includes publish --confirm. Human approval is required for every status change.
- Note: Read-only human review playbook for the autopilot approval packet. It merges search, source, internal-link, and copydesk tasks without changing article state.

## Boundaries

- Public published: 15
- Publishable now: 0
- Traffic data available: false
- Can claim traffic: false

## Summary

- approvalItems: 3
- items: 3
- itemsWithCommandBoundary: 3
- itemsWithInternalLinkActions: 3
- itemsWithSearchActions: 3
- itemsWithSourceActions: 3
- readyItems: 3
- safeDraftItems: 3
- unsafeItems: 0

## Source Evidence

- approvalPacketUnsafeItems: 0
- internalLinkUnsafeItems: 0
- optimizationUnsafeCommands: 0
- searchIntentUnsafeItems: 0
- sourceVerificationUnsafeItems: 0

## Unsafe Items

- none

## Review Items

| Ready | Safe | Search actions | Source actions | Link actions | Mark-review command gated | Publish confirm | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 19 | 45 | 6 | true | not-included | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | true | 11 | 44 | 6 | true | not-included | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | true | 22 | 45 | 6 | true | not-included | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |

## Per-Item Human Review Steps

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Mark review only after human approval: npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
- Publish dry run after review: npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Publish confirm: not-included

Stop before:

- Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.
- Do not run mark:review until explicit human approval for this file.
- Do not run publish:articles --confirm from this playbook.
- Do not claim traffic, ranking, revenue, or conversion lift without measured evidence.

Search and copydesk actions:

- Confirm the opening directly answers primary query: AI Agent deployment tutorial.
- During human review, consider whether the title can naturally include: AI Agent deployment tutorial.
- During human review, tune the meta description around: AI Agent deployment tutorial.
- During human review, add one natural H2/H3 or paragraph that answers: AI Agent deployment tutorial / agent tool calling tutorial.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Resolve search-intent weakness: no exact search query appears in title.
- Resolve search-intent weakness: no exact search query appears in description.
- Resolve search-intent weakness: no exact search query appears in headings or body.
- Review proposed title option: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查.
- Review proposed meta description option: 面向新手解释 AI Agent 部署流程，覆盖 Vercel AI SDK、工具调用、多步执行、停止条件、日志、权限、人工接管和上线检查。.
- 在开头 200 字内自然回答一次“AI Agent deployment tutorial”这个搜索意图，先给结论再展开步骤。
- 补一个小节或提示框覆盖缺口：tool calling、human review、permissions、logs。
- 在相关段落加入公开内链：Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist)。
- Rewrite the meta description to name the reader, outcome, and search phrase: AI Agent deployment tutorial.

Source verification actions:

- Verify 14 official source target(s).
- Check 8 search query seed(s).
- Review 22 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: AI Agent deployment tutorial.; Add one contextual link to a published article before approval..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Open official source and verify current wording: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Open official source and verify current wording: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Open official source and verify current wording: LangChain docs: https://python.langchain.com/docs
- Open official source and verify current wording: OpenAI API docs: https://platform.openai.com/docs
- Open official source and verify current wording: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Reject or rewrite unsupported claims before any mark:review command.
- Keep the article draft/noindex until explicit approval.
- Open reachable source URL: https://ai-sdk.dev/docs.
- Open reachable source URL: https://platform.openai.com/docs/guides/agents.
- Open reachable source URL: https://python.langchain.com/docs.
- Open reachable source URL: https://platform.openai.com/docs.
- Open reachable source URL: https://platform.openai.com/docs/guides/retrieval.

Internal link actions:

- Add one contextual public article link during human review.
- Review 5 suggested public link target(s).
- Use one link only if it helps the reader continue the task; avoid stuffing links.
- Keep the article draft/noindex until explicit approval.
- If helpful, add one contextual public link: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist).
- Copydesk suggested public link: Codex 部署 Vercel 前检查什么：上线前清单 (/blog/codex-vercel-deploy-preflight-checklist).

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Mark review only after human approval: npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
- Publish dry run after review: npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
- Publish confirm: not-included

Stop before:

- Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.
- Do not run mark:review until explicit human approval for this file.
- Do not run publish:articles --confirm from this playbook.
- Do not claim traffic, ranking, revenue, or conversion lift without measured evidence.

Search and copydesk actions:

- Confirm the opening directly answers primary query: ChatGPT prompts for business.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Review proposed title option: 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用.
- Review proposed meta description option: 整理全行业 AI 提示词模板库的搭建方法，覆盖销售、运营、客服、HR、财务、教育、产品和研发场景，重点讲分类、输入、输出、审核和复用。.
- 在开头 200 字内自然回答一次“ChatGPT prompts for business”这个搜索意图，先给结论再展开步骤。
- 补一个小节或提示框覆盖缺口：customer service。
- 在相关段落加入公开内链：Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner)。
- Add one contextual link to a published article before approval.
- Decide whether missing subtopics should become a short section or a follow-up article.
- Review the suggested public internal link before publishing: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner).
- Decide whether missing subtopics belong in this article or should become separate follow-up drafts.

Source verification actions:

- Verify 17 official source target(s).
- Check 8 search query seed(s).
- Review 19 combined checklist signal(s).
- Apply copydesk remediation: Add one contextual link to a published article before approval.; Decide whether missing subtopics should become a short section or a follow-up article..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Open official source and verify current wording: OpenAI API docs: https://platform.openai.com/docs
- Open official source and verify current wording: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Open official source and verify current wording: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Open official source and verify current wording: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Open official source and verify current wording: OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Reject or rewrite unsupported claims before any mark:review command.
- Keep the article draft/noindex until explicit approval.
- Open reachable source URL: https://platform.openai.com/docs.
- Open reachable source URL: https://platform.openai.com/docs/guides/prompt-engineering.
- Open reachable source URL: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview.
- Open reachable source URL: https://ai-sdk.dev/docs.
- Open reachable source URL: https://platform.openai.com/docs/guides/retrieval.

Internal link actions:

- Add one contextual public article link during human review.
- Review 5 suggested public link target(s).
- Use one link only if it helps the reader continue the task; avoid stuffing links.
- Keep the article draft/noindex until explicit approval.
- If helpful, add one contextual public link: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner).
- Copydesk suggested public link: Upwork 客户需求太模糊怎么办：新手分析和追问清单 (/blog/upwork-client-requirements-analysis-beginner).

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Mark review only after human approval: npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
- Publish dry run after review: npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
- Publish confirm: not-included

Stop before:

- Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.
- Do not run mark:review until explicit human approval for this file.
- Do not run publish:articles --confirm from this playbook.
- Do not claim traffic, ranking, revenue, or conversion lift without measured evidence.

Search and copydesk actions:

- Confirm the opening directly answers primary query: RAG 知识库搭建教程.
- During human review, consider whether the title can naturally include: RAG 知识库搭建教程.
- During human review, tune the meta description around: RAG 知识库搭建教程.
- During human review, add one natural H2/H3 or paragraph that answers: RAG 知识库搭建教程 / 向量数据库教程.
- During human review, add user-language phrasing without keyword stuffing.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Resolve search-intent weakness: no exact search query appears in title.
- Resolve search-intent weakness: no exact search query appears in description.
- Resolve search-intent weakness: no exact search query appears in headings or body.
- Resolve search-intent weakness: few query tokens appear in searchable text.
- Review proposed title option: 客服 AI 模型选型：速度、成本、知识库、转人工和质检.
- Review proposed meta description option: 面向准备落地 客服 AI 模型选型 的团队，梳理判断标准、实施步骤、风险边界、验收清单和发布前人工审核重点。.
- 在开头 200 字内自然回答一次“RAG 知识库搭建教程”这个搜索意图，先给结论再展开步骤。
- 在相关段落加入公开内链：Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex)。

Source verification actions:

- Verify 17 official source target(s).
- Check 5 search query seed(s).
- Review 10 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: RAG 知识库搭建教程.; Check whether the primary keyword can appear naturally in the title without making the title stiff..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Open official source and verify current wording: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Open official source and verify current wording: LangChain docs: https://python.langchain.com/docs
- Open official source and verify current wording: LlamaIndex docs: https://docs.llamaindex.ai
- Open official source and verify current wording: Hugging Face docs: https://huggingface.co/docs
- Open official source and verify current wording: OpenAI API docs: https://platform.openai.com/docs
- Reject or rewrite unsupported claims before any mark:review command.
- Keep the article draft/noindex until explicit approval.
- Open reachable source URL: https://platform.openai.com/docs/guides/retrieval.
- Open reachable source URL: https://platform.openai.com/docs/guides/prompt-engineering.
- Open reachable source URL: https://python.langchain.com/docs.
- Open reachable source URL: https://docs.llamaindex.ai.
- Open reachable source URL: https://huggingface.co/docs.

Internal link actions:

- Add one contextual public article link during human review.
- Review 5 suggested public link target(s).
- Use one link only if it helps the reader continue the task; avoid stuffing links.
- Keep the article draft/noindex until explicit approval.
- If helpful, add one contextual public link: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).
- Copydesk suggested public link: Codex 怎么做第一个网页 (/blog/build-first-webpage-with-codex).

