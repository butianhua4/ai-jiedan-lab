# Autopilot Human Review Playbook

Generated at: 2026-06-19T02:12:59.325Z

This report is read-only. It merges the top autopilot approval packet with search, source, internal-link, and copydesk tasks for human review.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: This playbook stops before mark:review and never includes publish --confirm. Human approval is required for every status change.
- Note: Read-only human review playbook for the autopilot approval packet. It merges search, source, internal-link, and copydesk tasks without changing article state.

## Boundaries

- Public published: 500
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
- readyItems: 1
- safeDraftItems: 3
- unsafeItems: 2

## Source Evidence

- approvalPacketUnsafeItems: 0
- internalLinkUnsafeItems: 0
- optimizationUnsafeCommands: 0
- searchIntentUnsafeItems: 0
- sourceVerificationUnsafeItems: 0

## Unsafe Items

| Ready | Safe | Search actions | Source actions | Link actions | Mark-review command gated | Publish confirm | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| false | true | 10 | 37 | 5 | true | not-included | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| false | true | 6 | 33 | 5 | true | not-included | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

## Review Items

| Ready | Safe | Search actions | Source actions | Link actions | Mark-review command gated | Publish confirm | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | 11 | 44 | 6 | true | not-included | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| false | true | 10 | 37 | 5 | true | not-included | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| false | true | 6 | 33 | 5 | true | not-included | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

## Per-Item Human Review Steps

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Mark review only after human approval: npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human
- Publish dry run after review: npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Publish confirm: not-included

Stop before:

- Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.
- Do not run mark:review until explicit human approval for this file.
- Do not run publish:articles --confirm from this playbook.
- Do not claim traffic, ranking, revenue, or conversion lift without measured evidence.

Search and copydesk actions:

- Confirm the opening directly answers primary query: 大模型部署教程.
- During human review, consider whether the title can naturally include: 大模型部署教程.
- During human review, tune the meta description around: 大模型部署教程.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Resolve search-intent weakness: no exact search query appears in title.
- Resolve search-intent weakness: no exact search query appears in description.
- Review proposed title option: Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级.
- Review proposed meta description option: 整理 Vercel AI Gateway 多模型接入思路，覆盖统一 API、provider 切换、日志、成本、降级、AI SDK 和上线检查。.
- 在开头 200 字内自然回答一次“Vercel AI Gateway 多模型”这个搜索意图，先给结论再展开步骤。
- 在相关段落加入公开内链：多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 (/blog/multi-model-router-fallback-guide)。
- Add one FAQ or checklist line that uses a high-intent query variant such as: Vercel AI Gateway 多模型.

Source verification actions:

- Verify 7 official source target(s).
- Check 4 search query seed(s).
- Review 19 combined checklist signal(s).
- Apply copydesk remediation: Add one FAQ or checklist line that uses a high-intent query variant such as: Vercel AI Gateway 多模型..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Open official source and verify current wording: OpenAI API docs: https://platform.openai.com/docs
- Open official source and verify current wording: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Open official source and verify current wording: Anthropic docs: https://docs.anthropic.com
- Open official source and verify current wording: OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Open official source and verify current wording: Google AI docs: https://ai.google.dev/docs
- Reject or rewrite unsupported claims before any mark:review command.
- Keep the article draft/noindex until explicit approval.
- Open reachable source URL: https://platform.openai.com/docs.
- Open reachable source URL: https://ai-sdk.dev/docs.
- Open reachable source URL: https://docs.anthropic.com.
- Open reachable source URL: https://ai.google.dev/docs.
- Open reachable source URL: https://platform.openai.com/docs/guides/prompt-engineering.

Internal link actions:

- Already links to at least one public article.
- Review 5 suggested public link target(s).
- Use one link only if it helps the reader continue the task; avoid stuffing links.
- Keep the article draft/noindex until explicit approval.
- If helpful, add one contextual public link: 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 (/blog/multi-model-router-fallback-guide).
- Copydesk suggested public link: 多模型 Router 怎么做降级：主模型、备用模型、成本和质量评估 (/blog/multi-model-router-fallback-guide).

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Mark review only after human approval: npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human
- Publish dry run after review: npm run publish:articles -- --file=content/blog/together-ai-api-beginner-guide.mdx
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
- During human review, add one natural H2/H3 or paragraph that answers: RAG 知识库搭建教程 / 企业知识库 AI 部署.
- During human review, add user-language phrasing without keyword stuffing.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Resolve search-intent weakness: no exact search query appears in title.
- Resolve search-intent weakness: no exact search query appears in description.
- Resolve search-intent weakness: no exact search query appears in headings or body.
- Resolve search-intent weakness: few query tokens appear in searchable text.

Source verification actions:

- Verify 4 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Open official source and verify current wording: OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Open official source and verify current wording: LangChain docs: https://python.langchain.com/docs
- Open official source and verify current wording: LlamaIndex docs: https://docs.llamaindex.ai
- Open official source and verify current wording: Hugging Face docs: https://huggingface.co/docs
- Open official source and verify current wording: OpenAI API docs: https://platform.openai.com/docs
- Reject or rewrite unsupported claims before any mark:review command.
- Keep the article draft/noindex until explicit approval.
- Open reachable source URL: https://platform.openai.com/docs.
- Open reachable source URL: https://ai-sdk.dev/docs.
- Open reachable source URL: https://docs.anthropic.com.
- Open reachable source URL: https://platform.openai.com/docs/guides/retrieval.
- Fact-check query: Together AI API 接入 official docs latest.
- Fact-check query: Together AI API 接入 official documentation current limits.
- Fact-check query: Together AI API 怎么接入：开源模型接口、embedding 和部署边界 fact check official docs.

Internal link actions:

- Already links to at least one public article.
- Review 5 suggested public link target(s).
- Use one link only if it helps the reader continue the task; avoid stuffing links.
- Keep the article draft/noindex until explicit approval.
- If helpful, add one contextual public link: OpenRouter API 怎么接入：统一模型入口不是只换 Base URL (/blog/openrouter-api-beginner-guide).

### Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Mark review only after human approval: npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human
- Publish dry run after review: npm run publish:articles -- --file=content/blog/vercel-404-after-deploy.mdx
- Publish confirm: not-included

Stop before:

- Do not run mark:review until explicit human approval; do not publish without a separate explicit approval.
- Do not run mark:review until explicit human approval for this file.
- Do not run publish:articles --confirm from this playbook.
- Do not claim traffic, ranking, revenue, or conversion lift without measured evidence.

Search and copydesk actions:

- Confirm the opening directly answers primary query: Vercel build failed.
- During human review, consider whether the title can naturally include: Vercel build failed.
- During human review, tune the meta description around: Vercel build failed.
- Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.
- Resolve search-intent weakness: no exact search query appears in title.
- Resolve search-intent weakness: no exact search query appears in description.

Source verification actions:

- Verify 2 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.
- Open official source and verify current wording: Vercel AI SDK docs: https://ai-sdk.dev/docs
- Open official source and verify current wording: OpenAI API docs: https://platform.openai.com/docs
- Open official source and verify current wording: OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Reject or rewrite unsupported claims before any mark:review command.
- Keep the article draft/noindex until explicit approval.
- Open reachable source URL: https://platform.openai.com/docs.
- Open reachable source URL: https://platform.openai.com/docs/guides/prompt-engineering.
- Open reachable source URL: https://ai-sdk.dev/docs.
- Fact-check query: Vercel 部署成功但 404 official docs latest.
- Fact-check query: Vercel 部署成功但 404 official documentation current limits.
- Fact-check query: Vercel 部署成功但页面 404：新手排查顺序 fact check official docs.
- Fact-check query: 报错解决 official docs limits pricing changelog.
- Fact-check query: OpenAI API 报错解决.
- Fact-check query: Vercel 部署失败.

Internal link actions:

- Add one contextual public article link during human review.
- Review 5 suggested public link target(s).
- Use one link only if it helps the reader continue the task; avoid stuffing links.
- Keep the article draft/noindex until explicit approval.
- If helpful, add one contextual public link: Next.js hydration error 怎么排查：使用前怎么判断是否适合 (/blog/nextjs-hydration-error-debug-freelance-scope).

