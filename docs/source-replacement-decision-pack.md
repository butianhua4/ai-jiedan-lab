# Source Replacement Decision Pack

Generated at: 2026-06-07T17:54:36.438Z

This report is read-only. It turns source URL remediation into per-file human replacement decisions.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Stop before source replacement, mark:review, or publish until a human reviewer approves the exact file-level decision.
- Traffic claim: No measured traffic, rankings, clicks, impressions, or revenue are claimed.
- Note: Read-only source replacement decision pack. It turns URL remediation into per-file human decisions without editing article files.

## Source Evidence

- Source remediation items: 19
- Failed URL items: 1
- Redirected URL items: 18
- Source remediation unsafe items: 0

## Summary

- affectedFiles: 22
- failedDecisionItems: 1
- humanGatedItems: 113
- items: 113
- itemsWithDecisionOptions: 113
- itemsWithManualChecklist: 113
- itemsWithRecommendedCandidate: 1
- officialRecommendedCandidates: 1
- redirectedDecisionItems: 112
- replacementCandidateOptions: 8
- sourceRemediationItems: 19
- sourceRemediationUnsafeItems: 0
- unsafeItems: 0

## Unsafe Items

- none

## Top Decisions

| Kind | Candidate | Alternatives | Scopes | Title | File | URL |
| --- | --- | ---: | --- | --- | --- | --- |
| failed-url | Microsoft Copilot Prompt Gallery (official-doc) | 7 | public-gap-decision, broad-first-coverage | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx | https://ai-prompts-pro.com/blog/ai-prompt-templates-business |
| redirected-url | review redirect | 0 | public-gap-decision, broad-first-coverage | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx | https://docs.helicone.ai/ |
| redirected-url | review redirect | 0 | public-gap-decision, broad-first-coverage | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx | https://docs.ragas.io/ |
| redirected-url | review redirect | 0 | current-review, public-gap-decision, next-source-pack, broad-first-coverage | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx | https://ai-sdk.dev/docs |
| redirected-url | review redirect | 0 | public-gap-decision, next-source-pack, broad-first-coverage | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx | https://platform.openai.com/docs |
| redirected-url | review redirect | 0 | public-gap-decision, next-source-pack, broad-first-coverage | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx | https://platform.openai.com/docs/guides/agents |
| redirected-url | review redirect | 0 | public-gap-decision, next-source-pack, broad-first-coverage | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx | https://platform.openai.com/docs/guides/prompt-engineering |
| redirected-url | review redirect | 0 | public-gap-decision, next-source-pack, broad-first-coverage | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx | https://platform.openai.com/docs/guides/retrieval |
| redirected-url | review redirect | 0 | public-gap-decision, next-source-pack, broad-first-coverage | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx | https://python.langchain.com/docs |
| redirected-url | review redirect | 0 | next-source-pack | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx | https://ai-sdk.dev/docs |
| redirected-url | review redirect | 0 | public-gap-decision, next-source-pack | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx | https://docs.llamaindex.ai |
| redirected-url | review redirect | 0 | next-source-pack | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx | https://platform.openai.com/docs |

## Per-File Decisions

### content/blog/industry-ai-prompts-template-library-2026.mdx

- Kind: failed-url
- Title: 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用
- Original URL: https://ai-prompts-pro.com/blog/ai-prompt-templates-business
- Recommended candidate: Microsoft Copilot Prompt Gallery - https://adoption.microsoft.com/en-us/copilot/prompt-gallery/
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Replace the failed URL with the recommended official source if it covers the same claim.
- Use one market-signal alternative only for category-demand evidence, not for technical or policy authority.
- Remove or rewrite the dependent claim if no source candidate covers it.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://ai-prompts-pro.com/blog/ai-prompt-templates-business
- Scopes: public-gap-decision, broad-first-coverage
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/agent-tool-permission-safety-guide.mdx

- Kind: redirected-url
- Title: Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志
- Original URL: https://docs.helicone.ai/
- Final URL: https://docs.helicone.ai/getting-started/quick-start
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://docs.helicone.ai/
- Final URL: https://docs.helicone.ai/getting-started/quick-start
- Scopes: public-gap-decision, broad-first-coverage
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/agent-tool-permission-safety-guide.mdx

- Kind: redirected-url
- Title: Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志
- Original URL: https://docs.ragas.io/
- Final URL: https://docs.ragas.io/en/stable/
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://docs.ragas.io/
- Final URL: https://docs.ragas.io/en/stable/
- Scopes: public-gap-decision, broad-first-coverage
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx

- Kind: redirected-url
- Title: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查
- Original URL: https://ai-sdk.dev/docs
- Final URL: https://ai-sdk.dev/docs/introduction
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://ai-sdk.dev/docs
- Final URL: https://ai-sdk.dev/docs/introduction
- Scopes: current-review, public-gap-decision, next-source-pack, broad-first-coverage
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx

- Kind: redirected-url
- Title: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查
- Original URL: https://platform.openai.com/docs
- Final URL: https://developers.openai.com/api/docs
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://platform.openai.com/docs
- Final URL: https://developers.openai.com/api/docs
- Scopes: public-gap-decision, next-source-pack, broad-first-coverage
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx

- Kind: redirected-url
- Title: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查
- Original URL: https://platform.openai.com/docs/guides/agents
- Final URL: https://developers.openai.com/api/docs/guides/agents
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://platform.openai.com/docs/guides/agents
- Final URL: https://developers.openai.com/api/docs/guides/agents
- Scopes: public-gap-decision, next-source-pack, broad-first-coverage
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx

- Kind: redirected-url
- Title: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查
- Original URL: https://platform.openai.com/docs/guides/prompt-engineering
- Final URL: https://developers.openai.com/api/docs/guides/prompt-engineering
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://platform.openai.com/docs/guides/prompt-engineering
- Final URL: https://developers.openai.com/api/docs/guides/prompt-engineering
- Scopes: public-gap-decision, next-source-pack, broad-first-coverage
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx

- Kind: redirected-url
- Title: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查
- Original URL: https://platform.openai.com/docs/guides/retrieval
- Final URL: https://developers.openai.com/api/docs/guides/retrieval
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://platform.openai.com/docs/guides/retrieval
- Final URL: https://developers.openai.com/api/docs/guides/retrieval
- Scopes: public-gap-decision, next-source-pack, broad-first-coverage
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx

- Kind: redirected-url
- Title: AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查
- Original URL: https://python.langchain.com/docs
- Final URL: https://docs.langchain.com/oss/python/langchain/overview
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://python.langchain.com/docs
- Final URL: https://docs.langchain.com/oss/python/langchain/overview
- Scopes: public-gap-decision, next-source-pack, broad-first-coverage
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-memory-rag-design-guide.mdx

- Kind: redirected-url
- Title: AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界
- Original URL: https://ai-sdk.dev/docs
- Final URL: https://ai-sdk.dev/docs/introduction
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://ai-sdk.dev/docs
- Final URL: https://ai-sdk.dev/docs/introduction
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-memory-rag-design-guide.mdx

- Kind: redirected-url
- Title: AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界
- Original URL: https://docs.llamaindex.ai
- Final URL: https://developers.llamaindex.ai/python/framework/
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://docs.llamaindex.ai
- Final URL: https://developers.llamaindex.ai/python/framework/
- Scopes: public-gap-decision, next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-memory-rag-design-guide.mdx

- Kind: redirected-url
- Title: AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界
- Original URL: https://platform.openai.com/docs
- Final URL: https://developers.openai.com/api/docs
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://platform.openai.com/docs
- Final URL: https://developers.openai.com/api/docs
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-memory-rag-design-guide.mdx

- Kind: redirected-url
- Title: AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界
- Original URL: https://platform.openai.com/docs/guides/agents
- Final URL: https://developers.openai.com/api/docs/guides/agents
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://platform.openai.com/docs/guides/agents
- Final URL: https://developers.openai.com/api/docs/guides/agents
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-memory-rag-design-guide.mdx

- Kind: redirected-url
- Title: AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界
- Original URL: https://platform.openai.com/docs/guides/prompt-engineering
- Final URL: https://developers.openai.com/api/docs/guides/prompt-engineering
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://platform.openai.com/docs/guides/prompt-engineering
- Final URL: https://developers.openai.com/api/docs/guides/prompt-engineering
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-memory-rag-design-guide.mdx

- Kind: redirected-url
- Title: AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界
- Original URL: https://platform.openai.com/docs/guides/retrieval
- Final URL: https://developers.openai.com/api/docs/guides/retrieval
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://platform.openai.com/docs/guides/retrieval
- Final URL: https://developers.openai.com/api/docs/guides/retrieval
- Scopes: public-gap-decision, next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/ai-agent-memory-rag-design-guide.mdx

- Kind: redirected-url
- Title: AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界
- Original URL: https://python.langchain.com/docs
- Final URL: https://docs.langchain.com/oss/python/langchain/overview
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://python.langchain.com/docs
- Final URL: https://docs.langchain.com/oss/python/langchain/overview
- Scopes: public-gap-decision, next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

