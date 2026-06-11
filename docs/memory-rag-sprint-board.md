# Memory RAG Sprint Board

Generated at: 2026-06-11T06:17:37.017Z

This report is read-only. It turns broad RAG, knowledge base, vector search, Agent memory, privacy, and evaluation demand into manual review lanes.

## Guardrails

- Auto create articles: false
- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Stop before article creation, article edits, mark:review, publish dry-run, or publish confirm until a human approves exact files and changes.
- Traffic claim: not-included
- Note: Read-only memory and RAG sprint board. It turns broad RAG, knowledge base, vector search, Agent memory, privacy, and evaluation demand into manual review lanes.

## Summary

- candidateItems: 4
- decisionChecks: 39
- deploymentPublicArticles: 3
- howToLanes: 2
- itemsPerWave: 3
- lanes: 6
- lanesWithCandidateFiles: 2
- privacyLanes: 1
- publishConfirmCommandsIncluded: 0
- readyCandidates: 4
- readyLanes: 6
- searchQueries: 24
- sourceTargets: 6
- trafficDataAvailable: false
- unsafeItems: 0
- vectorLanes: 1
- waves: 2

## Unsafe Items

- none

## Waves

| Wave | Ready | Candidate files | Search queries | Decision checks |
| ---: | ---: | --- | --- | --- |
| 1 | 3/3 | content/blog/ai-agent-memory-rag-design-guide.mdx | RAG 知识库搭建教程<br>企业知识库 AI 部署<br>客服知识库 AI 怎么做<br>RAG 和知识库区别<br>AI Agent 记忆怎么做<br>AI Agent 长期记忆 | State the user problem first: knowledge base setup, Agent memory, document ingestion, vector retrieval, evaluation, or privacy.<br>Separate implementation steps from conceptual explanation so beginners can scan the article.<br>Require citations or source links for retrieval output claims.<br>Call out privacy, permission, retention, and deletion boundaries before any production recommendation. |
| 2 | 3/3 | content/blog/ai-agent-memory-rag-design-guide.mdx | 向量数据库怎么选<br>RAG 向量数据库教程<br>Pinecone Milvus Chroma 区别<br>pgvector RAG 教程<br>RAG 评测怎么做<br>RAG 幻觉怎么解决 | State the user problem first: knowledge base setup, Agent memory, document ingestion, vector retrieval, evaluation, or privacy.<br>Separate implementation steps from conceptual explanation so beginners can scan the article.<br>Require citations or source links for retrieval output claims.<br>Call out privacy, permission, retention, and deletion boundaries before any production recommendation. |

## Memory Demand Lanes

| Wave | Score | Intent | Lane | Candidate files | Queries | Sources | Title |
| ---: | ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | 410 | how-to | rag-knowledge-base-setup | content/blog/ai-agent-memory-rag-design-guide.mdx | 4 | 6 | RAG 知识库搭建教程 |
| 1 | 405 | concept-and-design | agent-long-term-memory | none | 4 | 6 | AI Agent 长期记忆设计 |
| 1 | 395 | implementation | document-ingestion-chunking | none | 4 | 6 | RAG 文档切分和入库流程 |
| 2 | 385 | comparison | vector-database-selection | none | 4 | 6 | 向量数据库和检索方案选择 |
| 2 | 380 | troubleshooting | rag-evaluation-hallucination | content/blog/ai-agent-memory-rag-design-guide.mdx | 4 | 6 | RAG 评测、引用和幻觉控制 |
| 2 | 370 | risk-and-governance | memory-privacy-permission | none | 4 | 6 | 企业知识库权限、隐私和记忆保留 |

## Candidate Bridges

| Ready | Score | Lanes | Queries | Sources | Title | File |
| --- | ---: | --- | ---: | ---: | --- | --- |
| true | 378 | rag-knowledge-base-setup, rag-evaluation-hallucination | 4 | 4 | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | 374 | memory-adjacent | 4 | 3 | Open WebUI Functions 和 Pipelines 怎么用：扩展模型、RAG 和外部工作流 | content/blog/open-webui-functions-pipelines-deployment-guide.mdx |
| true | 370 | memory-adjacent | 4 | 2 | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | 366 | memory-adjacent | 4 | 3 | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |

## Lane Review Actions

### RAG 知识库搭建教程

- Lane: rag-knowledge-base-setup
- Wave: 1
- Audience: 第一次给企业或客服系统做知识库问答的人
- Intent: how-to
- Candidate files: content/blog/ai-agent-memory-rag-design-guide.mdx

Search queries:
- RAG 知识库搭建教程
- 企业知识库 AI 部署
- 客服知识库 AI 怎么做
- RAG 和知识库区别

Decision checks:
- State the user problem first: knowledge base setup, Agent memory, document ingestion, vector retrieval, evaluation, or privacy.
- Separate implementation steps from conceptual explanation so beginners can scan the article.
- Require citations or source links for retrieval output claims.
- Call out privacy, permission, retention, and deletion boundaries before any production recommendation.
- Keep article candidates draft/noindex/humanReviewRequired until explicit approval.
- Do not claim traffic, ranking, accuracy, latency, or cost savings without measured evidence.

Source targets:
- LangChain docs: https://python.langchain.com/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain memory docs: https://docs.langchain.com/oss/python/deepagents/long-term-memory

### AI Agent 长期记忆设计

- Lane: agent-long-term-memory
- Wave: 1
- Audience: 正在做 Agent、但分不清上下文、状态和长期记忆的人
- Intent: concept-and-design
- Candidate files: none

Search queries:
- AI Agent 记忆怎么做
- AI Agent 长期记忆
- Agent memory RAG 区别
- 智能体记忆设计

Decision checks:
- State the user problem first: knowledge base setup, Agent memory, document ingestion, vector retrieval, evaluation, or privacy.
- Separate implementation steps from conceptual explanation so beginners can scan the article.
- Require citations or source links for retrieval output claims.
- Call out privacy, permission, retention, and deletion boundaries before any production recommendation.
- Keep article candidates draft/noindex/humanReviewRequired until explicit approval.
- Do not claim traffic, ranking, accuracy, latency, or cost savings without measured evidence.

Source targets:
- LangChain docs: https://python.langchain.com/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain memory docs: https://docs.langchain.com/oss/python/deepagents/long-term-memory

### RAG 文档切分和入库流程

- Lane: document-ingestion-chunking
- Wave: 1
- Audience: 需要把文档、客服话术、SOP 接入问答系统的运营和开发者
- Intent: implementation
- Candidate files: none

Search queries:
- RAG 文档切分怎么做
- 知识库 chunk size 怎么设置
- RAG 文档上传流程
- 文档向量化教程

Decision checks:
- State the user problem first: knowledge base setup, Agent memory, document ingestion, vector retrieval, evaluation, or privacy.
- Separate implementation steps from conceptual explanation so beginners can scan the article.
- Require citations or source links for retrieval output claims.
- Call out privacy, permission, retention, and deletion boundaries before any production recommendation.
- Keep article candidates draft/noindex/humanReviewRequired until explicit approval.
- Do not claim traffic, ranking, accuracy, latency, or cost savings without measured evidence.

Source targets:
- LangChain docs: https://python.langchain.com/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain memory docs: https://docs.langchain.com/oss/python/deepagents/long-term-memory

### 向量数据库和检索方案选择

- Lane: vector-database-selection
- Wave: 2
- Audience: 纠结用哪种向量数据库、索引和检索方式的人
- Intent: comparison
- Candidate files: none

Search queries:
- 向量数据库怎么选
- RAG 向量数据库教程
- Pinecone Milvus Chroma 区别
- pgvector RAG 教程

Decision checks:
- State the user problem first: knowledge base setup, Agent memory, document ingestion, vector retrieval, evaluation, or privacy.
- Separate implementation steps from conceptual explanation so beginners can scan the article.
- Require citations or source links for retrieval output claims.
- Call out privacy, permission, retention, and deletion boundaries before any production recommendation.
- Keep article candidates draft/noindex/humanReviewRequired until explicit approval.
- Do not claim traffic, ranking, accuracy, latency, or cost savings without measured evidence.
- Compare vector database options by data size, hosting, filtering, metadata, and operations burden.

Source targets:
- LangChain docs: https://python.langchain.com/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain memory docs: https://docs.langchain.com/oss/python/deepagents/long-term-memory

### RAG 评测、引用和幻觉控制

- Lane: rag-evaluation-hallucination
- Wave: 2
- Audience: 已经做出知识库 demo、但回答不准的人
- Intent: troubleshooting
- Candidate files: content/blog/ai-agent-memory-rag-design-guide.mdx

Search queries:
- RAG 评测怎么做
- RAG 幻觉怎么解决
- 知识库回答不准怎么办
- RAG 引用来源怎么做

Decision checks:
- State the user problem first: knowledge base setup, Agent memory, document ingestion, vector retrieval, evaluation, or privacy.
- Separate implementation steps from conceptual explanation so beginners can scan the article.
- Require citations or source links for retrieval output claims.
- Call out privacy, permission, retention, and deletion boundaries before any production recommendation.
- Keep article candidates draft/noindex/humanReviewRequired until explicit approval.
- Do not claim traffic, ranking, accuracy, latency, or cost savings without measured evidence.
- Require an evaluation loop for test questions, expected citations, false positives, and hallucination review.

Source targets:
- LangChain docs: https://python.langchain.com/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain memory docs: https://docs.langchain.com/oss/python/deepagents/long-term-memory

### 企业知识库权限、隐私和记忆保留

- Lane: memory-privacy-permission
- Wave: 2
- Audience: 要在企业内部上线知识库、担心权限和隐私的人
- Intent: risk-and-governance
- Candidate files: none

Search queries:
- 企业知识库权限怎么做
- AI 记忆隐私风险
- RAG 数据权限控制
- Agent 记忆保留多久

Decision checks:
- State the user problem first: knowledge base setup, Agent memory, document ingestion, vector retrieval, evaluation, or privacy.
- Separate implementation steps from conceptual explanation so beginners can scan the article.
- Require citations or source links for retrieval output claims.
- Call out privacy, permission, retention, and deletion boundaries before any production recommendation.
- Keep article candidates draft/noindex/humanReviewRequired until explicit approval.
- Do not claim traffic, ranking, accuracy, latency, or cost savings without measured evidence.
- Require access-control, data-retention, audit-log, and human-escalation checks.

Source targets:
- LangChain docs: https://python.langchain.com/docs
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI API docs: https://platform.openai.com/docs
- OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Vercel AI SDK docs: https://ai-sdk.dev/docs
- LangChain memory docs: https://docs.langchain.com/oss/python/deepagents/long-term-memory
