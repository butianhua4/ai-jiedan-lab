# Search Intent Approval Packet

Generated at: 2026-06-13T01:37:03.392Z

This packet is read-only. It turns the broad search-intent lane map into a focused human approval queue. It does not mark review, publish, or change noindex.

## Guardrails

- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Run confirm-human or publish confirm commands only after explicit human approval for each file.
- Note: Read-only human approval packet derived from the search-intent lane map. It does not change article status, noindex, or publishing state.

## Summary

- currentWaveItems: 3
- currentWaveReady: 3
- nextGapItems: 6
- nextGapLanes: 4
- unsafeItems: 0
- wave: 1

## Source Evidence

- laneMapLanes: 12
- laneMapHighPriorityLanes: 12
- laneMapWithoutPublicCoverage: 10
- laneMapReadyDraftMatches: 233
- note: Lane priorities are editorial signals for broad search-intent coverage, not measured keyword volume or traffic.

## Current Wave Items

| Ready | Wave 1 | Current pack | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | true | 386 | 100 | 40 | Cross-industry AI prompt templates and reusable prompt libraries | 全行业 AI 提示词模板 | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | true | true | 386 | 100 | 34 | Cross-industry AI prompt templates and reusable prompt libraries | 客服 AI 模型选型 | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | true | true | 358 | 100 | 40 | AI Agent deployment, tool calling, and production workflow | AI Agent 部署 | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |

## Next Gap Items

| Ready | Wave 1 | Current pack | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | false | false | 386 | 100 | 31 | Cross-industry AI prompt templates and reusable prompt libraries | 数据分析 AI 提示词 | 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | content/blog/data-analysis-ai-prompts-guide.mdx |
| true | false | false | 386 | 100 | 31 | Cross-industry AI prompt templates and reusable prompt libraries | 教育 AI 提示词 | 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划 | content/blog/education-ai-prompts-guide.mdx |
| true | false | false | 366 | 100 | 30 | Business department AI workflows across sales, support, ops, HR, finance, legal, and education | 客服 AI 提示词 | 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断 | content/blog/customer-service-ai-prompts-guide.mdx |
| true | false | false | 358 | 100 | 40 | AI Agent deployment, tool calling, and production workflow | AI Agent 记忆 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | false | false | 358 | 100 | 33 | AI Agent deployment, tool calling, and production workflow | AI 自动化项目报价 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | false | false | 330 | 100 | 40 | Large model deployment, LLM serving, and GPU infrastructure | 大模型部署 | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |

## Current Wave Detail

### 1. 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Lane: Cross-industry AI prompt templates and reusable prompt libraries
- Audience: Teams trying to build reusable prompt libraries instead of one-off prompts.
- Priority reason: demandScore=10; no public coverage; readyDrafts=23; currentPack=2; wave1=2
- Description: 整理全行业 AI 提示词模板库的搭建方法，覆盖销售、运营、客服、HR、财务、教育、产品和研发场景，重点讲分类、输入、输出、审核和复用。
- Source notes: 已于 2026-06-12 按 OpenAI 官方 prompt engineering / prompt guidance 文档核对提示词结构原则；结合团队知识库实践和行业 SOP 设计经验整理。正式公开前仍需人工核对示例、行业边界和敏感内容。
- Chinese chars: 1862

Intent seeds:

- AI 提示词大全
- ChatGPT 提示词模板
- 全行业 AI 提示词
- AI prompt library

Review focus:

- input fields
- output format
- quality checks
- risk disclaimers
- versioning

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Prompt templates include input context, output criteria, human review rules, and adaptation notes.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx
```

### 2. 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Lane: Cross-industry AI prompt templates and reusable prompt libraries
- Audience: Teams trying to build reusable prompt libraries instead of one-off prompts.
- Priority reason: demandScore=10; no public coverage; readyDrafts=23; currentPack=2; wave1=2
- Description: 整理客服 AI 模型选型方法，覆盖响应速度、成本、知识库、情绪识别、转人工、质检、上下文长度和安全边界。
- Source notes: 已于 2026-06-12 按 OpenAI Agents guardrails / human review 文档和 Vercel AI SDK tool calling / agent 文档核对高风险动作、人工接管、工具调用边界；结合多模型路由、RAG、客服提示词和生产客服系统风险整理。正式发布前仍需人工核对具体平台规则。
- Chinese chars: 1232

Intent seeds:

- AI 提示词大全
- ChatGPT 提示词模板
- 全行业 AI 提示词
- AI prompt library

Review focus:

- input fields
- output format
- quality checks
- risk disclaimers
- versioning

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Prompt templates include input context, output criteria, human review rules, and adaptation notes.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx
```

### 3. AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Lane: AI Agent deployment, tool calling, and production workflow
- Audience: Developers and teams trying to move beyond chatbots into production agents.
- Priority reason: demandScore=10; no public coverage; readyDrafts=27; currentPack=1; wave1=1
- Description: 面向新手解释 AI Agent 部署流程，覆盖 Vercel AI SDK、工具调用、多步执行、停止条件、日志、权限、人工接管和上线检查。
- Source notes: 已于 2026-06-12 按 Vercel AI SDK 官方 Agents、ToolLoopAgent、tool calling、human-in-the-loop 文档核对核心概念；结合实际 Web 应用部署流程整理。正式公开前仍需人工复核 API 示例、版本和平台限制。
- Chinese chars: 1540

Intent seeds:

- AI Agent 部署
- AI Agent 工具调用
- Vercel AI SDK Agent
- OpenAI Agents SDK

Review focus:

- tool permission boundaries
- loop control and stop conditions
- human handoff
- logs and fallback paths

Source targets:

- OpenAI Agents: https://platform.openai.com/docs/guides/agents
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk
- Vercel AI SDK Agents: https://ai-sdk.dev/docs/agents
- n8n AI Agent node: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Agent permissions, tool allowlists, human approval, logs, and rollback boundaries are explicit.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
```

## Next Gap Detail

### 1. 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要

- File: content/blog/data-analysis-ai-prompts-guide.mdx
- Lane: Cross-industry AI prompt templates and reusable prompt libraries
- Audience: Teams trying to build reusable prompt libraries instead of one-off prompts.
- Priority reason: demandScore=10; no public coverage; readyDrafts=23; currentPack=2; wave1=2
- Description: 面向数据分析和业务团队整理 AI 提示词模板，覆盖指标解释、SQL 思路、异常排查、报表摘要、实验复盘和人工核对边界。
- Source notes: 已于 2026-06-12 按 OpenAI 官方 Prompt Engineering、Text Generation 和 Structured Outputs 相关文档核对输出格式、结构化结果和复核原则；结合指标解释、SQL 思路、异常排查和报告摘要流程整理。正式公开前仍需人工核对数据安全、SQL 方言、业务口径和敏感信息处理。
- Chinese chars: 1229

Intent seeds:

- AI 提示词大全
- ChatGPT 提示词模板
- 全行业 AI 提示词
- AI prompt library

Review focus:

- input fields
- output format
- quality checks
- risk disclaimers
- versioning

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Prompt templates include input context, output criteria, human review rules, and adaptation notes.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/data-analysis-ai-prompts-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/data-analysis-ai-prompts-guide.mdx
```

### 2. 教育 AI 提示词模板：备课、教案、测验、反馈和学习计划

- File: content/blog/education-ai-prompts-guide.mdx
- Lane: Cross-industry AI prompt templates and reusable prompt libraries
- Audience: Teams trying to build reusable prompt libraries instead of one-off prompts.
- Priority reason: demandScore=10; no public coverage; readyDrafts=23; currentPack=2; wave1=2
- Description: 面向教育培训和教师整理 AI 提示词模板，覆盖备课、教案、测验题、学生反馈、学习计划、课程运营和人工复核边界。
- Source notes: 已于 2026-06-12 按 OpenAI 官方 Prompt Engineering、Text Generation 和 Safety Best Practices 文档核对提示词结构、输出约束和人工复核原则；结合备课、教案、测验、反馈和学习计划流程整理。正式公开前仍需人工核对学校政策、学生隐私、年龄段适配和具体课程要求。
- Chinese chars: 1243

Intent seeds:

- AI 提示词大全
- ChatGPT 提示词模板
- 全行业 AI 提示词
- AI prompt library

Review focus:

- input fields
- output format
- quality checks
- risk disclaimers
- versioning

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation
- Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Prompt templates include input context, output criteria, human review rules, and adaptation notes.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/education-ai-prompts-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/education-ai-prompts-guide.mdx
```

### 3. 客服 AI 提示词模板：回复草稿、工单分类、情绪安抚和升级判断

- File: content/blog/customer-service-ai-prompts-guide.mdx
- Lane: Business department AI workflows across sales, support, ops, HR, finance, legal, and education
- Audience: Business teams deciding how to use AI across departments.
- Priority reason: demandScore=9; no public coverage; readyDrafts=16; currentPack=2; wave1=2
- Description: 面向客服和售后团队整理 AI 提示词模板，覆盖客户回复、工单分类、情绪安抚、问题升级、知识库问答和人工复核边界。
- Source notes: 已于 2026-06-12 按 OpenAI 官方 Prompt Engineering 文档核对提示词结构、角色、输入约束和输出格式；结合客服工单分类、升级判断、隐私最小化和人工复核流程整理。正式公开前仍需人工核对行业售后政策、敏感信息处理和隐私要求。
- Chinese chars: 1212

Intent seeds:

- 企业 AI 应用场景
- AI 工作流模板
- 销售 AI 提示词
- 客服 AI 提示词
- 运营 AI 提示词

Review focus:

- role-specific input fields
- approval owner
- risk boundaries
- measurable output format

Source targets:

- OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering
- Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Department workflows identify approval owner, sensitive decisions, and human handoff points.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/customer-service-ai-prompts-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/customer-service-ai-prompts-guide.mdx
```

### 4. AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界

- File: content/blog/ai-agent-memory-rag-design-guide.mdx
- Lane: AI Agent deployment, tool calling, and production workflow
- Audience: Developers and teams trying to move beyond chatbots into production agents.
- Priority reason: demandScore=10; no public coverage; readyDrafts=27; currentPack=1; wave1=1
- Description: 解释 AI Agent 记忆和 RAG 的区别，覆盖短期记忆、长期记忆、知识库检索、引用来源、更新机制、隐私和验收检查。
- Source notes: 已于 2026-06-12 对照 OpenAI Agents SDK Sessions / Memory、OpenAI file search、Vercel AI SDK Agents / tool calling / human-in-the-loop 文档补充边界；正式公开前仍需人工核对 SDK 版本、隐私建议和 API 名称。
- Chinese chars: 1951

Intent seeds:

- AI Agent 部署
- AI Agent 工具调用
- Vercel AI SDK Agent
- OpenAI Agents SDK

Review focus:

- tool permission boundaries
- loop control and stop conditions
- human handoff
- logs and fallback paths

Source targets:

- OpenAI Agents: https://platform.openai.com/docs/guides/agents
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk
- Vercel AI SDK Agents: https://ai-sdk.dev/docs/agents
- n8n AI Agent node: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Agent permissions, tool allowlists, human approval, logs, and rollback boundaries are explicit.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx
```

### 5. AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Lane: AI Agent deployment, tool calling, and production workflow
- Audience: Developers and teams trying to move beyond chatbots into production agents.
- Priority reason: demandScore=10; no public coverage; readyDrafts=27; currentPack=1; wave1=1
- Description: 整理 AI 自动化项目报价思路，覆盖需求范围、工具选型、RAG、Agent、部署、维护、验收标准和风险边界。
- Source notes: 结合 Dify、n8n、RAG、Agent 部署内容和项目报价经验整理；正式发布前需要人工核对市场价格和交付边界。
- Chinese chars: 1305

Intent seeds:

- AI Agent 部署
- AI Agent 工具调用
- Vercel AI SDK Agent
- OpenAI Agents SDK

Review focus:

- tool permission boundaries
- loop control and stop conditions
- human handoff
- logs and fallback paths

Source targets:

- OpenAI Agents: https://platform.openai.com/docs/guides/agents
- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk
- Vercel AI SDK Agents: https://ai-sdk.dev/docs/agents
- n8n AI Agent node: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- Agent permissions, tool allowlists, human approval, logs, and rollback boundaries are explicit.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx
```

### 6. 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查

- File: content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx
- Lane: Large model deployment, LLM serving, and GPU infrastructure
- Audience: Developers, solo builders, and companies deciding where and how to run models.
- Priority reason: demandScore=10; no public coverage; readyDrafts=29
- Description: 面向新手整理大模型部署路径，讲清 API 调用、托管推理端点、私有化部署、vLLM/TGI/SGLang、成本、延迟、安全和验收。
- Source notes: 已于 2026-06-12 按 Hugging Face Inference Endpoints 官方文档核对托管推理端点、实例选择和部署边界；结合 API、私有化和成本检查经验整理。正式公开前仍需人工核对价格、区域、引擎支持和最新限制。
- Chinese chars: 1537

Intent seeds:

- 大模型部署教程
- LLM deployment
- vLLM 部署
- Hugging Face TGI 部署

Review focus:

- GPU and memory requirements
- serving framework versions
- cold start and concurrency
- cost boundaries

Source targets:

- Hugging Face docs: https://huggingface.co/docs
- vLLM docs: https://docs.vllm.ai
- OpenAI API docs: https://platform.openai.com/docs
- Modal docs: https://modal.com/docs

Risk checks:

- No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.
- No API key, private customer data, credential, or bypass instruction is included.
- Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.
- GPU, memory, serving, concurrency, cold-start, and cost tradeoffs are framed as checks, not guarantees.

Approval checks:

- Article remains draft: true
- Article remains noindex: true
- Human review flag is present: true
- Source notes are present: true
- Quality check passed: true
- Reviewer verifies official sources before any status change.
- Reviewer confirms the article answers one broad search intent without unsupported traffic or income claims.

Commands after explicit human approval:

```bash
npm run mark:review -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx --confirm-human
npm run publish:articles -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx
```
