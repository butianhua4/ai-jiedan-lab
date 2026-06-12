# Popular AI Prompt Playbook

Generated at: 2026-06-12T16:32:10.881Z

This report is read-only. It maps broad, commonly searched AI prompt topics to existing candidate drafts, official sources, and human-review prompt templates.

## Guardrails

- Auto create articles: false
- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Stop before mark:review and publish. Every article change still requires explicit human approval.
- Traffic claim: not-included
- Note: Read-only popular AI prompt playbook. It maps broad, commonly searched AI prompt topics to existing candidate drafts, official sources, and human-review prompt templates.

## Source Evidence

- Browsed at: 2026-06-08
- Source note: Sources are used as editorial planning evidence only. This report does not claim keyword volume, ranking, traffic, clicks, revenue, or conversion outcomes.

- https://platform.openai.com/docs/guides/prompt-engineering
- https://platform.openai.com/docs/guides/prompting
- https://platform.openai.com/docs/guides/prompt-generation
- https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5
- https://adoption.microsoft.com/en-us/copilot/prompt-gallery/
- https://cloud.google.com/resources/agentspace/prompt-guide
- https://ai.google.dev/gemini-api/docs/models/generative-models
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- https://vercel.com/docs/agents
- https://platform.openai.com/docs/guides/agents-sdk
- https://openai.github.io/openai-agents-js/guides/sandbox-agents/memory/
- https://docs.langchain.com/oss/python/deepagents/long-term-memory

## Summary

- agentDeploymentLanes: 3
- broadWorkPromptLanes: 3
- commandBoundaries: 10
- deploymentBridgeItems: 6
- humanGatedItems: 10
- items: 10
- itemsReadyForHumanReviewPrep: 10
- itemsWithCandidateFiles: 10
- itemsWithOfficialSources: 10
- memoryLanes: 1
- officialSources: 12
- promptModuleBridgeItems: 7
- promptTemplates: 50
- publishConfirmCommandsIncluded: 0
- searchQueries: 127
- sourceTargets: 22
- trafficDataAvailable: false
- uniqueCandidateFiles: 21
- unsafeItems: 0

## Top Lanes

| Ready | Candidates | Templates | Sources | Public | Lane | Audience |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| true | 10 | 5 | 12 | 0 | ChatGPT 提示词大全和万能公式 | 刚开始用 AI 的普通用户、学生、职场新人和小团队老板 |
| true | 2 | 5 | 8 | 0 | AI 办公提示词：Word、Excel、PPT、邮件和会议 | 办公室职员、行政、运营、项目经理、创业团队 |
| true | 10 | 5 | 12 | 0 | Excel 和数据分析 AI 提示词 | 运营、财务助理、电商数据、销售管理和数据分析初学者 |
| true | 2 | 5 | 7 | 0 | 小红书、短视频和直播脚本 AI 提示词 | 自媒体、短视频运营、电商主播、本地生活商家 |
| true | 10 | 5 | 11 | 0 | 电商客服、售后和直播卖货 AI 提示词 | 淘宝、拼多多、抖店、独立站商家和客服团队 |
| true | 10 | 5 | 12 | 0 | 销售话术、报价和方案书 AI 提示词 | 销售、BD、自由职业者和咨询顾问 |
| true | 9 | 5 | 9 | 0 | 简历优化、招聘和 HR AI 提示词 | 求职者、HR、招聘负责人和团队管理者 |
| true | 10 | 5 | 12 | 0 | AI Agent 部署、工具调用和上线排错提示词 | 想部署 Agent 的独立开发者、创业团队和技术运营 |
| true | 10 | 5 | 12 | 0 | 大模型部署、本地模型和 API 排错提示词 | 部署大模型 API、本地模型、推理服务和 AI 应用的开发者 |
| true | 10 | 5 | 12 | 0 | Agent 记忆、知识库和 RAG 提示词 | 做客服 Agent、个人助理、知识库问答和长期任务 Agent 的团队 |

## Lane Details

### ChatGPT 提示词大全和万能公式

- Lane: chatgpt-prompt-daquan
- Ready for human review prep: true
- Demand reason: 大多数人会先搜索提示词大全、ChatGPT 怎么提问、AI 指令模板，而不是先搜索框架名。
- Search queries: ChatGPT 提示词大全; ChatGPT 怎么提问效果最好; AI 提示词万能公式; 提示词模板 免费; Copilot prompt examples; Gemini prompt guide; prompt engineering guide; AI prompt examples for work; ChatGPT 指令怎么写; AI 提示词生成器怎么用; ChatGPT prompts for business; AI prompt template library; industry AI prompts; best AI prompts for work; 客服 AI 提示词; customer support AI prompts; 售后回复 AI prompt; support ticket classification prompt
- Candidate files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/ai-model-selection-customer-service-guide.mdx; content/blog/ai-prompt-library-team-knowledge-base-guide.mdx; content/blog/data-analysis-ai-prompts-guide.mdx; content/blog/education-ai-prompts-guide.mdx; content/blog/healthcare-admin-ai-prompts-guide.mdx; content/blog/manufacturing-ai-prompts-guide.mdx; content/blog/operations-ai-prompts-guide.mdx; content/blog/dify-workflow-error-handling-guide.mdx; content/blog/dify-workflow-vs-agent-guide.mdx
- Deployment bridge files: content/blog/ai-api-key-security-rotation-guide.mdx
- Prompt module bridge files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/customer-service-ai-prompts-guide.mdx; content/blog/ecommerce-ai-prompts-guide.mdx; content/blog/sales-ai-prompts-guide.mdx; content/blog/hr-recruiting-ai-prompts-guide.mdx; content/blog/manufacturing-ai-prompts-guide.mdx; content/blog/finance-ai-prompts-guide.mdx; content/blog/education-ai-prompts-guide.mdx; content/blog/software-development-ai-prompts-guide.mdx; content/blog/product-manager-ai-prompts-guide.mdx; content/blog/marketing-ai-prompts-guide.mdx; content/blog/legal-contract-ai-prompts-guide.mdx
- Source targets: https://platform.openai.com/docs/guides/prompt-engineering; https://platform.openai.com/docs/guides/prompting; https://platform.openai.com/docs/guides/prompt-generation; https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5; https://adoption.microsoft.com/en-us/copilot/prompt-gallery/; https://cloud.google.com/resources/agentspace/prompt-guide; https://ai.google.dev/gemini-api/docs/models/generative-models; https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering; Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; https://support.google.com/docs/answer/15013615; Vercel AI SDK docs: https://ai-sdk.dev/docs
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 从普通搜索词切入，给出可复制的提示词结构。
- 把提示词拆成目标、背景、资料、格式、限制、检查六块。
- 用同一套公式覆盖写作、表格、邮件、方案和学习场景。
- 提醒用户不要让 AI 编造事实，缺失信息必须标 UNKNOWN。

Prompt templates:

- ChatGPT 提示词大全和万能公式 - 万能提示词结构: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- ChatGPT 提示词大全和万能公式 - 角色目标约束: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- ChatGPT 提示词大全和万能公式 - 输入变量设计: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- ChatGPT 提示词大全和万能公式 - 输出格式控制: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- ChatGPT 提示词大全和万能公式 - 追问和改写: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

### AI 办公提示词：Word、Excel、PPT、邮件和会议

- Lane: office-copilot-prompts
- Ready for human review prep: true
- Demand reason: AI 办公、Copilot 提示词、PPT 自动生成、会议纪要是非技术用户更常搜的入口。
- Search queries: AI 办公提示词; Copilot 提示词大全; ChatGPT 写邮件提示词; AI 生成 PPT 提示词; Excel AI 数据分析提示词; 会议纪要 AI 提示词; Word Copilot prompt; AI 周报提示词; AI 总结文档提示词; AI 办公自动化教程; 招聘 AI prompt; 面试题 AI 提示词; HR Copilot prompts; employee review prompt
- Candidate files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/hr-recruiting-ai-prompts-guide.mdx
- Deployment bridge files: none
- Prompt module bridge files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/hr-recruiting-ai-prompts-guide.mdx
- Source targets: https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5; https://adoption.microsoft.com/en-us/copilot/prompt-gallery/; https://platform.openai.com/docs/guides/prompt-engineering; https://platform.openai.com/docs/guides/prompting; https://cloud.google.com/resources/agentspace/prompt-guide; https://platform.openai.com/docs/guides/prompt-generation; https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; https://support.google.com/docs/answer/15013615
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 按 Word、Excel、PPT、Outlook、Teams 拆成办公场景。
- 每个模板要求用户提供原文、目标读者和最终用途。
- 把输出固定成摘要、待办、风险、下一步，方便直接工作流使用。
- 保留人工复核边界，避免代签、代审批和虚构数据。

Prompt templates:

- AI 办公提示词：Word、Excel、PPT、邮件和会议 - 邮件改写: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- AI 办公提示词：Word、Excel、PPT、邮件和会议 - 会议纪要: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- AI 办公提示词：Word、Excel、PPT、邮件和会议 - PPT 大纲: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- AI 办公提示词：Word、Excel、PPT、邮件和会议 - Excel 分析: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- AI 办公提示词：Word、Excel、PPT、邮件和会议 - 周报总结: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

### Excel 和数据分析 AI 提示词

- Lane: excel-data-analysis-prompts
- Ready for human review prep: true
- Demand reason: 表格分析、数据透视、销售报表、异常值解释属于高频刚需，适合用模板承接搜索。
- Search queries: Excel AI 提示词; ChatGPT 分析表格数据; AI 数据分析提示词; 销售数据分析 prompt; 财务报表 AI 分析提示词; Excel 透视表 AI 教程; 用 AI 找异常数据; ChatGPT 做数据分析怎么提问; AI 生成图表建议; 运营数据复盘提示词; AI Agent deployment tutorial; agent tool calling tutorial; OpenAI Agents SDK beginner guide; Vercel AI SDK agent; AI Agent 部署教程; Agent 工具调用教程; AI 工作流部署; Agent 人工审核流程
- Candidate files: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx; content/blog/ai-agent-memory-rag-design-guide.mdx; content/blog/ai-automation-project-pricing-scope-guide.mdx; content/blog/dify-workflow-error-handling-guide.mdx; content/blog/dify-workflow-vs-agent-guide.mdx; content/blog/enterprise-im-ai-agent-integration-guide.mdx; content/blog/mcp-server-deployment-security-checklist.mdx; content/blog/n8n-ai-agent-rag-memory-guide.mdx; content/blog/open-webui-functions-pipelines-deployment-guide.mdx; content/blog/agent-memory-postgres-schema-guide.mdx
- Deployment bridge files: content/blog/ai-agent-memory-rag-design-guide.mdx
- Prompt module bridge files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/finance-ai-prompts-guide.mdx; content/blog/software-development-ai-prompts-guide.mdx; content/blog/product-manager-ai-prompts-guide.mdx; content/blog/ecommerce-ai-prompts-guide.mdx
- Source targets: https://platform.openai.com/docs/guides/prompt-engineering; https://platform.openai.com/docs/guides/prompting; https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5; https://adoption.microsoft.com/en-us/copilot/prompt-gallery/; https://ai.google.dev/gemini-api/docs/models/generative-models; OpenAI Agents docs: https://platform.openai.com/docs/guides/agents; Vercel AI SDK docs: https://ai-sdk.dev/docs; LangChain docs: https://python.langchain.com/docs; OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval; LlamaIndex docs: https://docs.llamaindex.ai; Hugging Face docs: https://huggingface.co/docs; Dify docs: https://docs.dify.ai
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 要求用户粘贴字段说明和样例行，不让 AI 猜口径。
- 输出先给数据质量检查，再给结论和下一步验证。
- 把财务相关结果标为分析草稿，不做投资、税务或审计结论。
- 给出 Excel、CSV、BI 看板三类后续动作。

Prompt templates:

- Excel 和数据分析 AI 提示词 - 字段解释: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- Excel 和数据分析 AI 提示词 - 异常值排查: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- Excel 和数据分析 AI 提示词 - 销售复盘: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- Excel 和数据分析 AI 提示词 - 财务摘要: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- Excel 和数据分析 AI 提示词 - 可视化建议: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

### 小红书、短视频和直播脚本 AI 提示词

- Lane: xiaohongshu-short-video-prompts
- Ready for human review prep: true
- Demand reason: 小红书文案、短视频脚本、直播话术比技术词更大众，是内容获客的重要入口。
- Search queries: 小红书 AI 提示词; ChatGPT 小红书文案; 短视频脚本 AI 提示词; 直播带货话术 AI; AI 爆款标题提示词; 抖音脚本 prompt; AI 内容运营提示词; 自媒体 AI 提示词大全; AI 改写文案提示词; 小红书选题生成器; SEO AI 提示词; 广告文案 AI prompt; marketing AI prompts; 内容运营 AI 提示词; 商品标题 AI prompt; 详情页 AI 文案; 评价分析 AI 提示词; ecommerce AI prompts
- Candidate files: content/blog/marketing-ai-prompts-guide.mdx; content/blog/ecommerce-ai-prompts-guide.mdx
- Deployment bridge files: none
- Prompt module bridge files: content/blog/marketing-ai-prompts-guide.mdx; content/blog/ecommerce-ai-prompts-guide.mdx
- Source targets: https://platform.openai.com/docs/guides/prompt-engineering; https://platform.openai.com/docs/guides/prompting; https://platform.openai.com/docs/guides/prompt-generation; https://cloud.google.com/resources/agentspace/prompt-guide; https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; https://support.google.com/docs/answer/15013615; https://adoption.microsoft.com/en-us/copilot/prompt-gallery/
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 围绕标题、开头、正文、互动和复盘五个模块展开。
- 强调必须输入真实产品信息、禁用虚假体验和夸大功效。
- 给出不同平台口吻，但不承诺爆款、涨粉或转化。
- 把内容安全和平台规范放进人工审核清单。

Prompt templates:

- 小红书、短视频和直播脚本 AI 提示词 - 选题生成: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 小红书、短视频和直播脚本 AI 提示词 - 爆款标题: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 小红书、短视频和直播脚本 AI 提示词 - 脚本分镜: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 小红书、短视频和直播脚本 AI 提示词 - 直播话术: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 小红书、短视频和直播脚本 AI 提示词 - 评论区回复: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

### 电商客服、售后和直播卖货 AI 提示词

- Lane: ecommerce-customer-service-prompts
- Ready for human review prep: true
- Demand reason: 客服回复、差评处理、售后解释、直播话术是可直接落地的 AI 使用场景。
- Search queries: 电商客服 AI 提示词; ChatGPT 客服回复模板; AI 售后话术; 差评回复 AI 提示词; 直播带货 AI 话术; 电商 FAQ 生成 prompt; AI 客服知识库提示词; 客户投诉回复提示词; 独立站客服 AI 模板; AI 生成商品卖点; ChatGPT prompts for business; AI prompt template library; industry AI prompts; best AI prompts for work; 客服 AI 提示词; customer support AI prompts; 售后回复 AI prompt; support ticket classification prompt
- Candidate files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/ai-model-selection-customer-service-guide.mdx; content/blog/ai-prompt-library-team-knowledge-base-guide.mdx; content/blog/data-analysis-ai-prompts-guide.mdx; content/blog/education-ai-prompts-guide.mdx; content/blog/healthcare-admin-ai-prompts-guide.mdx; content/blog/manufacturing-ai-prompts-guide.mdx; content/blog/operations-ai-prompts-guide.mdx; content/blog/dify-workflow-error-handling-guide.mdx; content/blog/dify-workflow-vs-agent-guide.mdx
- Deployment bridge files: none
- Prompt module bridge files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/customer-service-ai-prompts-guide.mdx; content/blog/ecommerce-ai-prompts-guide.mdx; content/blog/sales-ai-prompts-guide.mdx
- Source targets: https://platform.openai.com/docs/guides/prompt-engineering; https://platform.openai.com/docs/guides/prompting; https://platform.openai.com/docs/guides/prompt-generation; https://vercel.com/docs/agents; https://docs.langchain.com/oss/python/deepagents/long-term-memory; OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering; Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; https://support.google.com/docs/answer/15013615; https://adoption.microsoft.com/en-us/copilot/prompt-gallery/; Vercel AI SDK docs: https://ai-sdk.dev/docs
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 按售前、售中、售后拆模板，要求输入订单事实和政策条款。
- 输出包含回复草稿、内部备注、升级条件和禁止承诺。
- 对退款、赔付、保修等内容设置人工确认。
- 适合后续扩展到客服 Agent 和知识库文章。

Prompt templates:

- 电商客服、售后和直播卖货 AI 提示词 - 售前咨询: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 电商客服、售后和直播卖货 AI 提示词 - 差评安抚: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 电商客服、售后和直播卖货 AI 提示词 - 退款解释: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 电商客服、售后和直播卖货 AI 提示词 - 直播卖点: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 电商客服、售后和直播卖货 AI 提示词 - FAQ 生成: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

### 销售话术、报价和方案书 AI 提示词

- Lane: sales-proposal-prompts
- Ready for human review prep: true
- Demand reason: 写报价、写方案、写跟进邮件直接对应项目转化，是项目商业目标里的强入口。
- Search queries: AI 销售话术提示词; ChatGPT 写报价单; AI 方案书提示词; 客户跟进邮件 prompt; 自由职业项目报价提示词; AI 写商业 proposal; 销售异议处理提示词; AI 客户需求分析; ChatGPT 写项目方案; AI 写投标方案提示词; ChatGPT prompts for business; AI prompt template library; industry AI prompts; best AI prompts for work; 客服 AI 提示词; customer support AI prompts; 售后回复 AI prompt; support ticket classification prompt
- Candidate files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/ai-model-selection-customer-service-guide.mdx; content/blog/ai-prompt-library-team-knowledge-base-guide.mdx; content/blog/data-analysis-ai-prompts-guide.mdx; content/blog/education-ai-prompts-guide.mdx; content/blog/healthcare-admin-ai-prompts-guide.mdx; content/blog/manufacturing-ai-prompts-guide.mdx; content/blog/operations-ai-prompts-guide.mdx; content/blog/dify-workflow-error-handling-guide.mdx; content/blog/dify-workflow-vs-agent-guide.mdx
- Deployment bridge files: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Prompt module bridge files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/sales-ai-prompts-guide.mdx
- Source targets: https://platform.openai.com/docs/guides/prompt-engineering; https://platform.openai.com/docs/guides/prompting; https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5; https://adoption.microsoft.com/en-us/copilot/prompt-gallery/; https://cloud.google.com/resources/agentspace/prompt-guide; OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering; Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; https://platform.openai.com/docs/guides/prompt-generation; https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; https://support.google.com/docs/answer/15013615; Vercel AI SDK docs: https://ai-sdk.dev/docs; Dify docs: https://docs.dify.ai
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 把客户输入拆成目标、预算、交付物、时间、风险。
- 输出不直接替用户承诺成交，只生成可复核草稿。
- 将报价依据、范围边界、增项条件写清楚。
- 可以和现有项目报价、Proposal 工具形成内链。

Prompt templates:

- 销售话术、报价和方案书 AI 提示词 - 需求澄清: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 销售话术、报价和方案书 AI 提示词 - 报价解释: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 销售话术、报价和方案书 AI 提示词 - 方案大纲: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 销售话术、报价和方案书 AI 提示词 - 跟进邮件: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 销售话术、报价和方案书 AI 提示词 - 异议处理: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

### 简历优化、招聘和 HR AI 提示词

- Lane: hr-resume-recruiting-prompts
- Ready for human review prep: true
- Demand reason: 简历修改、面试题、岗位 JD 和绩效反馈是高搜索、强复用的提示词内容。
- Search queries: ChatGPT 修改简历提示词; AI 简历优化 prompt; 招聘 JD AI 提示词; 面试问题 AI 生成; HR Copilot prompts; 候选人筛选 AI 提示词; 绩效评语 AI 提示词; AI 写岗位说明书; AI 求职信提示词; AI 面试准备提示词; ChatGPT prompts for business; AI prompt template library; industry AI prompts; best AI prompts for work; 客服 AI 提示词; customer support AI prompts; 售后回复 AI prompt; support ticket classification prompt
- Candidate files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/ai-model-selection-customer-service-guide.mdx; content/blog/ai-prompt-library-team-knowledge-base-guide.mdx; content/blog/data-analysis-ai-prompts-guide.mdx; content/blog/education-ai-prompts-guide.mdx; content/blog/healthcare-admin-ai-prompts-guide.mdx; content/blog/manufacturing-ai-prompts-guide.mdx; content/blog/operations-ai-prompts-guide.mdx; content/blog/hr-recruiting-ai-prompts-guide.mdx
- Deployment bridge files: none
- Prompt module bridge files: content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/hr-recruiting-ai-prompts-guide.mdx
- Source targets: https://platform.openai.com/docs/guides/prompt-engineering; https://platform.openai.com/docs/guides/prompting; https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5; https://adoption.microsoft.com/en-us/copilot/prompt-gallery/; https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering; Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview; https://platform.openai.com/docs/guides/prompt-generation; https://support.google.com/docs/answer/15013615
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 候选人相关内容必须要求事实输入，不生成虚假经历。
- 招聘筛选只能作为辅助草稿，不能替代公平性和合规复核。
- 输出结构包含亮点、风险、追问和人工判断点。
- 面向求职者和 HR 分别给模板，避免混淆用途。

Prompt templates:

- 简历优化、招聘和 HR AI 提示词 - 简历改写: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 简历优化、招聘和 HR AI 提示词 - 岗位 JD: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 简历优化、招聘和 HR AI 提示词 - 面试题: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 简历优化、招聘和 HR AI 提示词 - 候选人对比: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 简历优化、招聘和 HR AI 提示词 - 绩效反馈: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

### AI Agent 部署、工具调用和上线排错提示词

- Lane: ai-agent-deploy-prompts
- Ready for human review prep: true
- Demand reason: Agent 部署、工具调用、MCP、Vercel AI SDK 是技术增长入口，比单纯网页部署更贴近当前 AI 搜索。
- Search queries: AI Agent 部署教程; Vercel AI SDK agent deploy; OpenAI Agents SDK 教程; AI Agent 工具调用提示词; MCP Agent 部署; Agent 上线排错 prompt; AI Agent human in the loop; AI Agent API route deploy; Agent 生产环境检查清单; AI Agent 怎么上线; AI Agent deployment tutorial; agent tool calling tutorial; OpenAI Agents SDK beginner guide; Vercel AI SDK agent; Agent 工具调用教程; AI 工作流部署; Agent 人工审核流程; RAG 知识库搭建教程
- Candidate files: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx; content/blog/ai-agent-memory-rag-design-guide.mdx; content/blog/ai-automation-project-pricing-scope-guide.mdx; content/blog/dify-workflow-error-handling-guide.mdx; content/blog/dify-workflow-vs-agent-guide.mdx; content/blog/enterprise-im-ai-agent-integration-guide.mdx; content/blog/mcp-server-deployment-security-checklist.mdx; content/blog/n8n-ai-agent-rag-memory-guide.mdx; content/blog/open-webui-functions-pipelines-deployment-guide.mdx; content/blog/agent-memory-postgres-schema-guide.mdx
- Deployment bridge files: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx; content/blog/ai-agent-memory-rag-design-guide.mdx; content/blog/open-webui-functions-pipelines-deployment-guide.mdx; content/blog/ai-automation-project-pricing-scope-guide.mdx; content/blog/ai-api-key-security-rotation-guide.mdx; content/blog/bentoml-llm-deployment-beginner-guide.mdx
- Prompt module bridge files: none
- Source targets: https://vercel.com/docs/agents; https://platform.openai.com/docs/guides/agents-sdk; https://platform.openai.com/docs/guides/prompt-generation; https://platform.openai.com/docs/guides/prompt-engineering; https://docs.langchain.com/oss/python/deepagents/long-term-memory; OpenAI Agents docs: https://platform.openai.com/docs/guides/agents; Vercel AI SDK docs: https://ai-sdk.dev/docs; LangChain docs: https://python.langchain.com/docs; OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval; LlamaIndex docs: https://docs.llamaindex.ai; Hugging Face docs: https://huggingface.co/docs; Dify docs: https://docs.dify.ai
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 把 Agent 需求写成目标、工具、权限、停止条件和日志检查。
- 每个提示词都要求人工审批高风险工具动作。
- 结合 Vercel、OpenAI Agents SDK 和现有部署候选稿做内链。
- 不声称性能或稳定性，只给部署前检查和排错流程。

Prompt templates:

- AI Agent 部署、工具调用和上线排错提示词 - 需求转 Agent 规格: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- AI Agent 部署、工具调用和上线排错提示词 - 工具调用设计: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- AI Agent 部署、工具调用和上线排错提示词 - 部署检查: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- AI Agent 部署、工具调用和上线排错提示词 - 日志排错: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- AI Agent 部署、工具调用和上线排错提示词 - 人工审批边界: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

### 大模型部署、本地模型和 API 排错提示词

- Lane: llm-deployment-troubleshooting-prompts
- Ready for human review prep: true
- Demand reason: 大模型部署、API 报错、推理延迟、环境变量和日志排错会带来技术流量，且能和工具服务转化相连。
- Search queries: 大模型部署教程; LLM API 报错排查; OpenAI API error prompt; AI 应用部署失败怎么办; 大模型推理服务排错; AI 环境变量配置教程; Vercel AI 应用部署错误; LLM 延迟优化检查清单; 模型 API 日志分析提示词; AI 项目上线 smoke test; AI Agent deployment tutorial; agent tool calling tutorial; OpenAI Agents SDK beginner guide; Vercel AI SDK agent; AI Agent 部署教程; Agent 工具调用教程; AI 工作流部署; Agent 人工审核流程
- Candidate files: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx; content/blog/ai-agent-memory-rag-design-guide.mdx; content/blog/ai-automation-project-pricing-scope-guide.mdx; content/blog/dify-workflow-error-handling-guide.mdx; content/blog/dify-workflow-vs-agent-guide.mdx; content/blog/enterprise-im-ai-agent-integration-guide.mdx; content/blog/mcp-server-deployment-security-checklist.mdx; content/blog/n8n-ai-agent-rag-memory-guide.mdx; content/blog/open-webui-functions-pipelines-deployment-guide.mdx; content/blog/agent-memory-postgres-schema-guide.mdx
- Deployment bridge files: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx; content/blog/ai-agent-memory-rag-design-guide.mdx; content/blog/open-webui-functions-pipelines-deployment-guide.mdx; content/blog/ai-automation-project-pricing-scope-guide.mdx; content/blog/ai-api-key-security-rotation-guide.mdx; content/blog/bentoml-llm-deployment-beginner-guide.mdx
- Prompt module bridge files: none
- Source targets: https://platform.openai.com/docs/guides/prompt-engineering; https://vercel.com/docs/agents; https://platform.openai.com/docs/guides/agents-sdk; https://openai.github.io/openai-agents-js/guides/sandbox-agents/memory/; https://docs.langchain.com/oss/python/deepagents/long-term-memory; OpenAI Agents docs: https://platform.openai.com/docs/guides/agents; Vercel AI SDK docs: https://ai-sdk.dev/docs; LangChain docs: https://python.langchain.com/docs; OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval; LlamaIndex docs: https://docs.llamaindex.ai; Hugging Face docs: https://huggingface.co/docs; Dify docs: https://docs.dify.ai
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 把错误信息、环境、复现步骤和最近变更作为必填输入。
- 输出先分级风险，再给排查顺序和可回滚动作。
- 将生产环境操作标为人工确认，不自动执行命令。
- 可以扩展到错误解释器和部署教程内容。

Prompt templates:

- 大模型部署、本地模型和 API 排错提示词 - 环境变量检查: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 大模型部署、本地模型和 API 排错提示词 - API 报错解释: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 大模型部署、本地模型和 API 排错提示词 - 推理延迟排查: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 大模型部署、本地模型和 API 排错提示词 - 日志摘要: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- 大模型部署、本地模型和 API 排错提示词 - 上线回滚: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

### Agent 记忆、知识库和 RAG 提示词

- Lane: agent-memory-knowledge-base-prompts
- Ready for human review prep: true
- Demand reason: 记忆、知识库、RAG、长期上下文是用户已经明确要求扩展的板块，且 2026 年 Agent 资料持续更新。
- Search queries: AI Agent 记忆怎么做; Agent memory prompt; RAG 知识库提示词; LangChain long term memory; OpenAI Agents SDK memory; AI 客服知识库 prompt; AI 助理长期记忆教程; 知识库问答提示词; Agent 记忆安全检查; AI memory retention policy; AI Agent deployment tutorial; agent tool calling tutorial; OpenAI Agents SDK beginner guide; Vercel AI SDK agent; AI Agent 部署教程; Agent 工具调用教程; AI 工作流部署; Agent 人工审核流程
- Candidate files: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx; content/blog/ai-agent-memory-rag-design-guide.mdx; content/blog/ai-automation-project-pricing-scope-guide.mdx; content/blog/dify-workflow-error-handling-guide.mdx; content/blog/dify-workflow-vs-agent-guide.mdx; content/blog/enterprise-im-ai-agent-integration-guide.mdx; content/blog/mcp-server-deployment-security-checklist.mdx; content/blog/n8n-ai-agent-rag-memory-guide.mdx; content/blog/industry-ai-prompts-template-library-2026.mdx; content/blog/ai-model-selection-customer-service-guide.mdx
- Deployment bridge files: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx; content/blog/ai-agent-memory-rag-design-guide.mdx; content/blog/open-webui-functions-pipelines-deployment-guide.mdx; content/blog/ai-automation-project-pricing-scope-guide.mdx
- Prompt module bridge files: none
- Source targets: https://openai.github.io/openai-agents-js/guides/sandbox-agents/memory/; https://docs.langchain.com/oss/python/deepagents/long-term-memory; https://platform.openai.com/docs/guides/agents-sdk; https://platform.openai.com/docs/guides/prompt-engineering; https://platform.openai.com/docs/guides/prompt-generation; OpenAI Agents docs: https://platform.openai.com/docs/guides/agents; Vercel AI SDK docs: https://ai-sdk.dev/docs; LangChain docs: https://python.langchain.com/docs; OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval; LlamaIndex docs: https://docs.llamaindex.ai; Hugging Face docs: https://huggingface.co/docs; Dify docs: https://docs.dify.ai
- Publish confirm: not-included
- Stop before: Stop before mark:review and before publish until explicit human approval.
- Unsafe reasons: none

Article angles:

- 区分会话历史、长期记忆、知识库检索和用户偏好。
- 要求敏感信息、过期信息和冲突事实必须人工复核。
- 提示词输出包含可写入记忆、不可写入记忆和待确认问题。
- 和 Agent 部署、客服知识库、RAG 教程形成板块联动。

Prompt templates:

- Agent 记忆、知识库和 RAG 提示词 - 记忆写入规则: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- Agent 记忆、知识库和 RAG 提示词 - 知识库检索: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- Agent 记忆、知识库和 RAG 提示词 - 事实冲突处理: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- Agent 记忆、知识库和 RAG 提示词 - 长期偏好总结: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问
- Agent 记忆、知识库和 RAG 提示词 - 隐私和保留策略: 结论草稿, 执行步骤, 风险和缺失信息, 人工复核点, 下一步追问

## Unsafe Items

None

