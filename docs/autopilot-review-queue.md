# Autopilot Review Queue

Generated at: 2026-06-13T01:37:25.366Z

This report is read-only. It ranks the next manual review assignments and stops before article status changes.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Stop at human assignment. mark:review still requires --confirm-human and publishing still requires a separate explicit approval.

## Boundaries

- Public published: 15
- Publishable now: 0
- Traffic data available: false
- Can claim traffic: false

## Summary

- blockedItems: 1
- items: 26
- nextAssignments: 10
- readyItems: 25
- safeDraftItems: 26
- unsafeItems: 0
- withSearchQueries: 26
- withSourceTargets: 26

## Unsafe Items

- none

## Blocked Items

| Ready | Score | Lane | Sources | Refs | Queries | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| false | 828 | ai-deployment | deployment, public-gap | 13 | 8 | 1 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |

## Next Assignments

| Ready | Score | Lane | Sources | Refs | Queries | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1723 | ai-deployment | deployment, public-gap, wave | 14 | 11 | 0 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 1723 | industry-prompt | prompt, public-gap, wave | 17 | 13 | 0 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | 1598 | public-coverage-gap | public-gap, wave | 19 | 5 | 0 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | 1348 | ai-deployment | deployment, public-gap | 17 | 13 | 0 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| true | 1278 | ai-deployment | deployment, public-gap | 6 | 9 | 0 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| true | 1238 | ai-deployment | deployment, public-gap | 4 | 8 | 0 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | 1223 | ai-deployment | deployment, public-gap | 3 | 8 | 0 | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| true | 1208 | ai-deployment | deployment, public-gap | 2 | 8 | 0 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | 1208 | ai-deployment | deployment, public-gap | 2 | 8 | 0 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| true | 1118 | public-coverage-gap | public-gap | 3 | 5 | 0 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |

## Review Focus

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 14 official source target(s).
- Check 8 search query seed(s).
- Review 22 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: AI Agent deployment tutorial.; Add one contextual link to a published article before approval..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Lane: industry-prompt
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx`
- Publish confirm: not-included

Focus:

- Verify 17 official source target(s).
- Check 8 search query seed(s).
- Review 19 combined checklist signal(s).
- Apply copydesk remediation: Add one contextual link to a published article before approval.; Decide whether missing subtopics should become a short section or a follow-up article..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Lane: public-coverage-gap
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 19 official source target(s).
- Check 5 search query seed(s).
- Review 12 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: RAG 知识库搭建教程.; Check whether the primary keyword can appear naturally in the title without making the title stiff..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 17 official source target(s).
- Check 8 search query seed(s).
- Review 15 combined checklist signal(s).
- Apply copydesk remediation: Check whether the primary keyword can appear naturally in the title without making the title stiff.; Decide whether missing subtopics should become a short section or a follow-up article..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单

- File: content/blog/mcp-server-deployment-security-checklist.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/mcp-server-deployment-security-checklist.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/mcp-server-deployment-security-checklist.mdx`
- Publish confirm: not-included

Focus:

- Verify 6 official source target(s).
- Check 8 search query seed(s).
- Review 16 combined checklist signal(s).
- Apply copydesk remediation: Check whether the primary keyword can appear naturally in the title without making the title stiff.; Rewrite the meta description to name the reader, outcome, and search phrase: Dify 部署教程..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界

- File: content/blog/ai-agent-memory-rag-design-guide.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 4 official source target(s).
- Check 8 search query seed(s).
- Review 16 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: RAG knowledge base tutorial.; Add one contextual link to a published article before approval..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流

- File: content/blog/open-webui-functions-pipelines-deployment-guide.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/open-webui-functions-pipelines-deployment-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 3 official source target(s).
- Check 8 search query seed(s).
- Review 17 combined checklist signal(s).
- Apply copydesk remediation: Check whether the primary keyword can appear naturally in the title without making the title stiff.; Rewrite the meta description to name the reader, outcome, and search phrase: local LLM deployment..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 2 official source target(s).
- Check 8 search query seed(s).
- Review 18 combined checklist signal(s).
- Apply copydesk remediation: Rewrite the meta description to name the reader, outcome, and search phrase: Dify deployment tutorial.; Check whether the primary keyword can appear naturally in the title without making the title stiff..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收

- File: content/blog/bentoml-llm-deployment-beginner-guide.mdx
- Lane: ai-deployment
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 2 official source target(s).
- Check 8 search query seed(s).
- Review 17 combined checklist signal(s).
- Apply copydesk remediation: Check whether the primary keyword can appear naturally in the title without making the title stiff.; Rewrite the meta description to name the reader, outcome, and search phrase: vLLM deployment tutorial..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.

### Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志

- File: content/blog/agent-tool-permission-safety-guide.mdx
- Lane: public-coverage-gap
- Mark review command after human approval: `npm run mark:review -- --file=content/blog/agent-tool-permission-safety-guide.mdx --confirm-human`
- Publish dry-run after review: `npm run publish:articles -- --file=content/blog/agent-tool-permission-safety-guide.mdx`
- Publish confirm: not-included

Focus:

- Verify 3 official source target(s).
- Check 5 search query seed(s).
- Review 4 combined checklist signal(s).
- Apply copydesk remediation: Check whether the primary keyword can appear naturally in the title without making the title stiff.; Rewrite the meta description to name the reader, outcome, and search phrase: LLM observability 教程..
- Complete freshness checklist for fast-changing AI/tool guidance.
- Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.


## All Queue Items

| Ready | Score | Lane | Sources | Refs | Queries | Blockers | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | 1723 | ai-deployment | deployment, public-gap, wave | 14 | 11 | 0 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | 1723 | industry-prompt | prompt, public-gap, wave | 17 | 13 | 0 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | 1598 | public-coverage-gap | public-gap, wave | 19 | 5 | 0 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | 1348 | ai-deployment | deployment, public-gap | 17 | 13 | 0 | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| true | 1278 | ai-deployment | deployment, public-gap | 6 | 9 | 0 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| true | 1238 | ai-deployment | deployment, public-gap | 4 | 8 | 0 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | 1223 | ai-deployment | deployment, public-gap | 3 | 8 | 0 | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| true | 1208 | ai-deployment | deployment, public-gap | 2 | 8 | 0 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | 1208 | ai-deployment | deployment, public-gap | 2 | 8 | 0 | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| true | 1118 | public-coverage-gap | public-gap | 3 | 5 | 0 | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| true | 1118 | public-coverage-gap | public-gap | 3 | 5 | 0 | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| true | 1093 | public-coverage-gap | public-gap | 2 | 4 | 0 | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| false | 828 | ai-deployment | deployment, public-gap | 13 | 8 | 1 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| true | 578 | industry-prompt | prompt | 5 | 4 | 0 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| true | 573 | industry-prompt | prompt | 5 | 4 | 0 | 制造业 AI 提示词模板：SOP、质检记录、设备故障和生产复盘 | content/blog/manufacturing-ai-prompts-guide.mdx |
| true | 568 | industry-prompt | prompt | 5 | 4 | 0 | 销售 AI 提示词模板：客户画像、跟进话术、异议处理和会议纪要 | content/blog/sales-ai-prompts-guide.mdx |
| true | 568 | industry-prompt | prompt | 5 | 4 | 0 | 软件开发 AI 提示词模板：需求拆解、代码审查、Bug 排查和测试用例 | content/blog/software-development-ai-prompts-guide.mdx |
| true | 560 | industry-prompt | prompt | 5 | 4 | 0 | 人力招聘 AI 提示词模板：JD、简历初筛、面试题和培训材料 | content/blog/hr-recruiting-ai-prompts-guide.mdx |
| true | 559 | industry-prompt | prompt | 5 | 4 | 0 | 营销 AI 提示词模板：选题、广告文案、SEO 和活动复盘怎么写 | content/blog/marketing-ai-prompts-guide.mdx |
| true | 558 | industry-prompt | prompt | 5 | 4 | 0 | 财务 AI 提示词模板：报表摘要、费用分类、预算复盘和风险清单 | content/blog/finance-ai-prompts-guide.mdx |
| true | 556 | industry-prompt | prompt | 5 | 4 | 0 | 法务合同 AI 提示词模板：条款摘要、风险清单和修改问题 | content/blog/legal-contract-ai-prompts-guide.mdx |
| true | 554 | industry-prompt | prompt | 5 | 4 | 0 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| true | 553 | industry-prompt | prompt | 5 | 4 | 0 | 电商 AI 提示词模板：商品标题、详情页、评价分析和售后回复 | content/blog/ecommerce-ai-prompts-guide.mdx |
| true | 546 | industry-prompt | prompt | 5 | 4 | 0 | 产品经理 AI 提示词模板：需求分析、PRD、竞品、用户故事和验收标准 | content/blog/product-manager-ai-prompts-guide.mdx |
| true | 541 | ai-deployment | deployment | 2 | 4 | 0 | 企业微信、飞书、Slack 怎么接 AI Agent：消息入口、权限和人工接管 | content/blog/enterprise-im-ai-agent-integration-guide.mdx |
| true | 429 | ai-deployment | deployment | 2 | 4 | 0 | 用 Claude Code 排查客户报错时怎么做才稳 | content/blog/claude-code-error-debug.mdx |
