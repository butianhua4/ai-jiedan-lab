# Autopilot Approval Packet

Generated at: 2026-06-22T06:59:21.221Z

This packet is read-only. It packages the top autopilot review assignments for human approval and does not change article status.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Human must approve every mark:review command. publish --confirm commands are intentionally excluded.

## Boundaries

- Public published: 500
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
| true | 1543 | ai-deployment | draft | true | 7 | 4 | 8 | Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级 | content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| true | 447 | ai-deployment | draft | true | 4 | 4 | 8 | Together AI API 怎么接入：开源模型接口、embedding 和部署边界 | content/blog/together-ai-api-beginner-guide.mdx |
| true | 417 | ai-deployment | draft | true | 2 | 4 | 8 | Vercel 部署成功但页面 404：新手排查顺序 | content/blog/vercel-404-after-deploy.mdx |

## Item Review Notes

### Vercel AI Gateway 怎么做多模型接入：OpenAI、Claude、Gemini 和降级

- File: content/blog/vercel-ai-gateway-multi-provider-guide.mdx
- Slug: vercel-ai-gateway-multi-provider-guide
- Status: draft
- Description: 整理 Vercel AI Gateway 多模型接入思路，覆盖统一 API、provider 切换、日志、成本、降级、AI SDK 和上线检查。
- Source types: deployment, wave
- Quality score: 86

Search queries:

- 大模型部署教程
- AI 应用部署教程
- OpenAI API 部署教程
- Vercel AI SDK 部署

Official source targets:

- OpenAI API docs: https://platform.openai.com/docs
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Anthropic docs: https://docs.anthropic.com
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- Google AI docs: https://ai.google.dev/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering

Headings:

- 适合谁
- 不适合谁
- 统一入口
- 路由策略
- 降级策略
- 日志和成本
- 常见错误
- 交付检查

Human review focus:

- Verify 7 official source target(s).
- Check 4 search query seed(s).
- Review 19 combined checklist signal(s).
- Apply copydesk remediation: Add one FAQ or checklist line that uses a high-intent query variant such as: Vercel AI Gateway 多模型..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vercel-ai-gateway-multi-provider-guide.mdx`
- Publish confirm: not-included

### Together AI API 怎么接入：开源模型接口、embedding 和部署边界

- File: content/blog/together-ai-api-beginner-guide.mdx
- Slug: together-ai-api-beginner-guide
- Status: draft
- Description: 面向新手整理 Together AI API 接入路线，覆盖 OpenAI-compatible 调用、开源模型选择、embedding、费用、限速、应用接入和客户项目边界。
- Source types: deployment
- Quality score: 86

Search queries:

- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 向量数据库 RAG 教程
- RAG 评测怎么做

Official source targets:

- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- LangChain docs: https://python.langchain.com/docs
- LlamaIndex docs: https://docs.llamaindex.ai
- Hugging Face docs: https://huggingface.co/docs

Headings:

- 适合谁
- 不适合谁
- 第一步：确定调用目标
- 第二步：配置 API Key 和 Base URL
- 第三步：比较模型效果
- 第四步：用于 RAG 时单独测 embedding
- 第五步：上线前处理限速和费用
- 常见错误

Human review focus:

- Verify 4 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/together-ai-api-beginner-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/together-ai-api-beginner-guide.mdx`
- Publish confirm: not-included

### Vercel 部署成功但页面 404：新手排查顺序

- File: content/blog/vercel-404-after-deploy.mdx
- Slug: vercel-404-after-deploy
- Status: draft
- Description: 解释 Vercel 部署成功但访问页面 404 的常见原因，覆盖路由、输出目录、框架配置、根目录、动态路径、域名和上线后验收。
- Source types: deployment
- Quality score: 86

Search queries:

- Vercel build failed
- Vercel 部署后 404
- API Key 无效或缺失
- 环境变量缺失怎么办

Official source targets:

- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI API docs: https://platform.openai.com/docs

Headings:

- 适合谁
- 不适合谁
- 原因一：首页路径和实际路由不一致
- 原因二：输出目录或框架配置不匹配
- 原因三：Root Directory 选错
- 原因四：动态路由没有生成或接口不可用
- 原因五：域名和预览链接表现不同
- 风险提醒

Human review focus:

- Verify 2 official source target(s).
- Check 4 search query seed(s).
- Review 13 combined checklist signal(s).
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

Command boundary:

- Mark review after human approval: `npm run mark:review -- --file=content/blog/vercel-404-after-deploy.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/vercel-404-after-deploy.mdx`
- Publish confirm: not-included

