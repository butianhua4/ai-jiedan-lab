# Source Replacement Decision Pack

Generated at: 2026-06-22T18:05:32.947Z

This report is read-only. It turns source URL remediation into per-file human replacement decisions.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Stop before source replacement, mark:review, or publish until a human reviewer approves the exact file-level decision.
- Traffic claim: No measured traffic, rankings, clicks, impressions, or revenue are claimed.
- Note: Read-only source replacement decision pack. It turns URL remediation into per-file human decisions without editing article files.

## Source Evidence

- Source remediation items: 10
- Failed URL items: 0
- Redirected URL items: 10
- Source remediation unsafe items: 0

## Summary

- affectedFiles: 16
- failedDecisionItems: 0
- humanGatedItems: 71
- items: 71
- itemsWithDecisionOptions: 71
- itemsWithManualChecklist: 71
- itemsWithRecommendedCandidate: 0
- officialRecommendedCandidates: 0
- redirectedDecisionItems: 71
- replacementCandidateOptions: 0
- sourceRemediationItems: 10
- sourceRemediationUnsafeItems: 0
- unsafeItems: 0

## Unsafe Items

- none

## Top Decisions

| Kind | Candidate | Alternatives | Scopes | Title | File | URL |
| --- | --- | ---: | --- | --- | --- | --- |
| redirected-url | review redirect | 0 | next-source-pack | 订阅支付失败怎么和客户沟通 | content/blog/subscription-payment-failed-message.mdx | https://ai-sdk.dev/docs |
| redirected-url | review redirect | 0 | next-source-pack | 订阅支付失败怎么和客户沟通 | content/blog/subscription-payment-failed-message.mdx | https://platform.openai.com/docs |
| redirected-url | review redirect | 0 | next-source-pack | 订阅支付失败怎么和客户沟通 | content/blog/subscription-payment-failed-message.mdx | https://platform.openai.com/docs/guides/prompt-engineering |
| redirected-url | review redirect | 0 | next-source-pack | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx | https://ai-sdk.dev/docs |
| redirected-url | review redirect | 0 | next-source-pack | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx | https://docs.llamaindex.ai |
| redirected-url | review redirect | 0 | next-source-pack | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx | https://platform.openai.com/docs |
| redirected-url | review redirect | 0 | next-source-pack | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx | https://platform.openai.com/docs/guides/retrieval |
| redirected-url | review redirect | 0 | next-source-pack | Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索 | content/blog/supabase-pgvector-rag-guide.mdx | https://python.langchain.com/docs |
| redirected-url | review redirect | 0 | next-source-pack | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx | https://ai-sdk.dev/docs |
| redirected-url | review redirect | 0 | next-source-pack | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx | https://docs.vllm.ai |
| redirected-url | review redirect | 0 | next-source-pack | TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收 | content/blog/tensorrt-llm-beginner-guide.mdx | https://platform.openai.com/docs |
| redirected-url | review redirect | 0 | next-source-pack | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx | https://ai-sdk.dev/docs |

## Per-File Decisions

### content/blog/subscription-payment-failed-message.mdx

- Kind: redirected-url
- Title: 订阅支付失败怎么和客户沟通
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

### content/blog/subscription-payment-failed-message.mdx

- Kind: redirected-url
- Title: 订阅支付失败怎么和客户沟通
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

### content/blog/subscription-payment-failed-message.mdx

- Kind: redirected-url
- Title: 订阅支付失败怎么和客户沟通
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

### content/blog/supabase-pgvector-rag-guide.mdx

- Kind: redirected-url
- Title: Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索
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

### content/blog/supabase-pgvector-rag-guide.mdx

- Kind: redirected-url
- Title: Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索
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
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/supabase-pgvector-rag-guide.mdx

- Kind: redirected-url
- Title: Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索
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

### content/blog/supabase-pgvector-rag-guide.mdx

- Kind: redirected-url
- Title: Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索
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
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/supabase-pgvector-rag-guide.mdx

- Kind: redirected-url
- Title: Supabase pgvector 做 RAG 怎么开始：Postgres 里的向量检索
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
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/tensorrt-llm-beginner-guide.mdx

- Kind: redirected-url
- Title: TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收
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

### content/blog/tensorrt-llm-beginner-guide.mdx

- Kind: redirected-url
- Title: TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收
- Original URL: https://docs.vllm.ai
- Final URL: https://docs.vllm.ai/en/latest/
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://docs.vllm.ai
- Final URL: https://docs.vllm.ai/en/latest/
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/tensorrt-llm-beginner-guide.mdx

- Kind: redirected-url
- Title: TensorRT-LLM 怎么入门：NVIDIA GPU 推理优化先看模型和验收
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

### content/blog/together-ai-api-beginner-guide.mdx

- Kind: redirected-url
- Title: Together AI API 怎么接入：开源模型接口、embedding 和部署边界
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

### content/blog/together-ai-api-beginner-guide.mdx

- Kind: redirected-url
- Title: Together AI API 怎么接入：开源模型接口、embedding 和部署边界
- Original URL: https://docs.anthropic.com
- Final URL: https://platform.claude.com/docs/en/home
- Recommended candidate: review redirected final URL
- Stop before: Stop before human approval; this pack is a file-level decision aid only.

Decision options:

- Approve the redirected final URL as canonical if it is content-equivalent.
- Replace the original URL with the final URL during human review if the redirect is stable.
- Find a more specific official source if the redirect lands on a generic page.
- Keep the article draft/noindex/humanReviewRequired until approval.

Manual checklist:

- Original URL: https://docs.anthropic.com
- Final URL: https://platform.claude.com/docs/en/home
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/together-ai-api-beginner-guide.mdx

- Kind: redirected-url
- Title: Together AI API 怎么接入：开源模型接口、embedding 和部署边界
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

### content/blog/together-ai-api-beginner-guide.mdx

- Kind: redirected-url
- Title: Together AI API 怎么接入：开源模型接口、embedding 和部署边界
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
- Scopes: next-source-pack
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

### content/blog/tools-not-to-buy-first.mdx

- Kind: redirected-url
- Title: AI 工具新手不应该先买哪些工具
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
- Scopes: current-review
- Confirm the replacement source covers the exact claim family.
- Prefer official documentation for implementation, pricing, SDK, deployment, or model behavior claims.
- Use prompt-library sources only as market/category evidence.
- Do not run mark:review or publish commands from this decision pack.

