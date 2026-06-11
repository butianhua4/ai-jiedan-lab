# Search Demand Publication Bridge

Generated at: 2026-06-11T11:56:58.841Z

This report is read-only. It maps search-demand review candidates to SEO, source, internal-link, and manual publication readiness while stopping before review or publish commands.

## Guardrails

- Auto create articles: false
- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Traffic claim: not-included
- Stop before: Stop before mark:review and stop before publish. Both require explicit human approval.
- Note: Read-only bridge from search-demand review candidates to SEO/source/publication readiness. It does not edit front matter, mark review, or publish.

## Summary

- blockingItems: 0
- humanApprovalReadyItems: 16
- indexingSafeItems: 16
- internalLinkReadyItems: 13
- items: 16
- reviewPackItems: 16
- reviewPackReadyItems: 16
- schemaReadyItems: 16
- searchSnippetReadyItems: 16
- sourceReadyItems: 16
- warningItems: 16

## Source Evidence

- reviewPackGeneratedAt: "2026-06-11T11:56:58.359Z"
- reviewPackGuardrails: {"autoCreateArticles":false,"autoEditArticles":false,"autoMarkReview":false,"autoPublish":false,"trafficClaim":"not-included","note":"Read-only review pack for high-search-demand lanes. It packages manual review work but never edits article files, marks review, or publishes.","stopBefore":"All commands are manual-only and require explicit human approval."}
- reviewPackSummary: {"factCheckQueries":79,"items":16,"itemsPerLaneMax":2,"itemsWithCommandBoundary":16,"itemsWithHumanChecklist":16,"itemsWithInternalLinkSuggestion":13,"itemsWithManualReviewFocus":16,"itemsWithOfficialSources":16,"itemsWithSearchQueries":16,"lanes":8,"readyItems":16,"reviewQueueMatchedItems":15,"safeDraftItems":16,"unsafeItems":0,"zeroPublicLaneItems":12}
- sourceHealthFilesWithoutReachableSource: 0
- sourceHealthMissingUrlTargets: 0
- trafficNote: "This report evaluates readiness only; it does not claim keyword volume, rankings, impressions, clicks, traffic, or revenue."

## Blocking Items

- none

## Warning Items

| Ready | Snippet | Schema | Source | Link | Draft safe | Blockers | Warnings | Lane | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | true | true | true | true | 0 | 1 | agent-deployment-tools-mcp | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | agent-deployment-tools-mcp | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | cross-industry-ai-prompts | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | true | true | true | true | true | 0 | 2 | cross-industry-ai-prompts | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | llm-deployment-and-serving | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| true | true | true | true | false | true | 0 | 3 | llm-deployment-and-serving | 大模型成本监控怎么做：按用户、功能、模型和项目拆账 | content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| true | true | true | true | true | true | 0 | 2 | rag-knowledge-base-agent-memory | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | rag-knowledge-base-agent-memory | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | nocode-ai-automation-deployment | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | nocode-ai-automation-deployment | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | llm-evals-observability-security | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| true | true | true | true | true | true | 0 | 1 | llm-evals-observability-security | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | ai-api-keys-limits-routing | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| true | true | true | true | false | true | 0 | 2 | ai-service-pricing-delivery | 产品经理 AI 提示词模板：需求分析、PRD、竞品、用户故事和验收标准 | content/blog/product-manager-ai-prompts-guide.mdx |
| true | true | true | true | false | true | 0 | 2 | ai-service-pricing-delivery | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | ai-api-keys-limits-routing | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |

## All Items

| Ready | Snippet | Schema | Source | Link | Draft safe | Blockers | Warnings | Lane | Title | File |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| true | true | true | true | true | true | 0 | 1 | agent-deployment-tools-mcp | AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查 | content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | agent-deployment-tools-mcp | AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界 | content/blog/ai-agent-memory-rag-design-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | cross-industry-ai-prompts | 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用 | content/blog/industry-ai-prompts-template-library-2026.mdx |
| true | true | true | true | true | true | 0 | 2 | cross-industry-ai-prompts | 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检 | content/blog/ai-model-selection-customer-service-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | llm-deployment-and-serving | 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查 | content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx |
| true | true | true | true | false | true | 0 | 3 | llm-deployment-and-serving | 大模型成本监控怎么做：按用户、功能、模型和项目拆账 | content/blog/llm-cost-monitoring-dashboard-guide.mdx |
| true | true | true | true | true | true | 0 | 2 | rag-knowledge-base-agent-memory | AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围 | content/blog/ai-automation-project-pricing-scope-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | rag-knowledge-base-agent-memory | n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储 | content/blog/n8n-ai-agent-rag-memory-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | nocode-ai-automation-deployment | Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底 | content/blog/dify-workflow-error-handling-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | nocode-ai-automation-deployment | Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核 | content/blog/dify-workflow-vs-agent-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | llm-evals-observability-security | MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单 | content/blog/mcp-server-deployment-security-checklist.mdx |
| true | true | true | true | true | true | 0 | 1 | llm-evals-observability-security | Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志 | content/blog/agent-tool-permission-safety-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | ai-api-keys-limits-routing | AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急 | content/blog/ai-api-key-security-rotation-guide.mdx |
| true | true | true | true | false | true | 0 | 2 | ai-service-pricing-delivery | 产品经理 AI 提示词模板：需求分析、PRD、竞品、用户故事和验收标准 | content/blog/product-manager-ai-prompts-guide.mdx |
| true | true | true | true | false | true | 0 | 2 | ai-service-pricing-delivery | BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收 | content/blog/bentoml-llm-deployment-beginner-guide.mdx |
| true | true | true | true | true | true | 0 | 1 | ai-api-keys-limits-routing | Claude API Rate limit reached 怎么办：限流、上下文、重试和降级 | content/blog/claude-api-rate-limit-debug-guide.mdx |

## Manual Next Actions

### AI Agent 部署怎么做：用 Vercel AI SDK 理解工具调用、多步执行和上线检查

- File: content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx
- Lane: agent-deployment-tools-mcp
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### AI Agent 记忆和 RAG 怎么设计：短期记忆、长期记忆、引用来源和隐私边界

- File: content/blog/ai-agent-memory-rag-design-guide.mdx
- Lane: agent-deployment-tools-mcp
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-agent-memory-rag-design-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### 全行业 AI 提示词模板库怎么做：销售、运营、客服、HR、财务和教育都能用

- File: content/blog/industry-ai-prompts-template-library-2026.mdx
- Lane: cross-industry-ai-prompts
- Manual mark-review command: `npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/industry-ai-prompts-template-library-2026.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### 客服 AI 该选什么模型：速度、成本、知识库、转人工和质检

- File: content/blog/ai-model-selection-customer-service-guide.mdx
- Lane: cross-industry-ai-prompts
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-model-selection-customer-service-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Review warning before publish: description may be thin for search snippets.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-model-selection-customer-service-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### 大模型部署怎么选：Hugging Face Inference Endpoints、API、私有化和成本检查

- File: content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx
- Lane: llm-deployment-and-serving
- Manual mark-review command: `npm run mark:review -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/llm-deployment-huggingface-inference-endpoints-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### 大模型成本监控怎么做：按用户、功能、模型和项目拆账

- File: content/blog/llm-cost-monitoring-dashboard-guide.mdx
- Lane: llm-deployment-and-serving
- Manual mark-review command: `npm run mark:review -- --file=content/blog/llm-cost-monitoring-dashboard-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/llm-cost-monitoring-dashboard-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: no public internal-link suggestion is attached yet.
- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually; warning: no public internal-link suggestion found; add or explicitly reject one during human review.
- Review warning before publish: description may be thin for search snippets.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/llm-cost-monitoring-dashboard-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### AI 自动化项目怎么报价：Dify、n8n、RAG、Agent 和维护范围

- File: content/blog/ai-automation-project-pricing-scope-guide.mdx
- Lane: rag-knowledge-base-agent-memory
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Review warning before publish: description may be thin for search snippets.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-automation-project-pricing-scope-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### n8n AI Agent 怎么接知识库和记忆：RAG、上下文和状态存储

- File: content/blog/n8n-ai-agent-rag-memory-guide.mdx
- Lane: rag-knowledge-base-agent-memory
- Manual mark-review command: `npm run mark:review -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/n8n-ai-agent-rag-memory-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Dify 工作流怎么做错误处理：变量、分支、重试和人工兜底

- File: content/blog/dify-workflow-error-handling-guide.mdx
- Lane: nocode-ai-automation-deployment
- Manual mark-review command: `npm run mark:review -- --file=content/blog/dify-workflow-error-handling-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/dify-workflow-error-handling-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/dify-workflow-error-handling-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Dify Workflow 和 Agent 怎么选：固定流程、工具调用和人工审核

- File: content/blog/dify-workflow-vs-agent-guide.mdx
- Lane: nocode-ai-automation-deployment
- Manual mark-review command: `npm run mark:review -- --file=content/blog/dify-workflow-vs-agent-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/dify-workflow-vs-agent-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/dify-workflow-vs-agent-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### MCP Server 怎么部署才安全：本地、远程、权限、日志和工具白名单

- File: content/blog/mcp-server-deployment-security-checklist.mdx
- Lane: llm-evals-observability-security
- Manual mark-review command: `npm run mark:review -- --file=content/blog/mcp-server-deployment-security-checklist.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/mcp-server-deployment-security-checklist.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/mcp-server-deployment-security-checklist.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Agent 调工具怎么做权限控制：白名单、审批、沙箱和日志

- File: content/blog/agent-tool-permission-safety-guide.mdx
- Lane: llm-evals-observability-security
- Manual mark-review command: `npm run mark:review -- --file=content/blog/agent-tool-permission-safety-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/agent-tool-permission-safety-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/agent-tool-permission-safety-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### AI API Key 怎么安全管理：环境变量、权限、轮换、泄露应急

- File: content/blog/ai-api-key-security-rotation-guide.mdx
- Lane: ai-api-keys-limits-routing
- Manual mark-review command: `npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/ai-api-key-security-rotation-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/ai-api-key-security-rotation-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### 产品经理 AI 提示词模板：需求分析、PRD、竞品、用户故事和验收标准

- File: content/blog/product-manager-ai-prompts-guide.mdx
- Lane: ai-service-pricing-delivery
- Manual mark-review command: `npm run mark:review -- --file=content/blog/product-manager-ai-prompts-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/product-manager-ai-prompts-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: no public internal-link suggestion is attached yet.
- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually; warning: no public internal-link suggestion found; add or explicitly reject one during human review.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/product-manager-ai-prompts-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### BentoML 怎么部署 LLM：从本地 Service 到 BentoCloud 验收

- File: content/blog/bentoml-llm-deployment-beginner-guide.mdx
- Lane: ai-service-pricing-delivery
- Manual mark-review command: `npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: no public internal-link suggestion is attached yet.
- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually; warning: no public internal-link suggestion found; add or explicitly reject one during human review.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/bentoml-llm-deployment-beginner-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

### Claude API Rate limit reached 怎么办：限流、上下文、重试和降级

- File: content/blog/claude-api-rate-limit-debug-guide.mdx
- Lane: ai-api-keys-limits-routing
- Manual mark-review command: `npm run mark:review -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx --confirm-human`
- Publish dry-run command after review: `npm run publish:articles -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx`
- Publish confirm: not-included

- Review warning before publish: review pack warnings: warning: source health has no per-file reachable URL list; verify official source targets manually.
- Verify official sources and fact-check queries manually.
- Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.
- Only after explicit human approval, run: npm run mark:review -- --file=content/blog/claude-api-rate-limit-debug-guide.mdx --confirm-human
- Publishing remains a separate explicit approval step.

