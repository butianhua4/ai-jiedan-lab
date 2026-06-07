# Traffic Claim Guard
Generated at: 2026-06-07T03:17:56.850Z
This guard scans operational reports and docs for unsupported claims that real traffic, clicks, impressions, or visits already exist.
## Guardrails
- Auto publish: false
- Note: This guard scans operational docs and automation reports for unsupported traffic claims. It does not scan draft article teaching examples.
## Summary
- filesScanned: 137
- measuredTrafficUnavailable: true
- unsafeClaims: 0
- watchMentions: 1376
## Unsafe Claims
None.
## Watch Mentions
| File | Line | Text |
| --- | --- | --- |
| README.md | 39 | `live:check` 负责确认主要页面、文章、sitemap 和 robots 能访问。`searchability:check` 负责更细的 SEO 可搜索度检查，包括英文 URL、canonical、Open Graph、JSON-LD、meta description、sitemap 收录范围和草稿泄漏。 |
| README.md | 41 | 当前站点已通过基础可搜索度检查，但 Google 是否收录还需要提交 Google Search Console 后观察。相关记录见 `docs/seo-searchability-audit.md` 和 `docs/search-console-setup.md`。 |
| README.md | 43 | 拿到 Google Search Console HTML tag 的 `content` 验证码后，可以先检查验证准备度： |
| README.md | 250 | 4. 每次只发布 1-3 篇人工审核文章，观察收录和点击。 |
| README.md | 276 | - Google Search Console 提交清单：`docs/search-console-setup.md` |
| app/llms.txt/route.ts | 47 | "- The site does not claim real traffic, impressions, income guarantees, or automatic publishing.", |
| docs/ai-deployment-coverage.md | 11 | - Note: This coverage matrix is read-only. It organizes deployment, Agent, RAG, and model infrastructure drafts for manual review and does not claim measured traffic. |
| docs/ai-deployment-review-pack.md | 17 | - Traffic note: Search queries are broad intent seeds, not measured traffic, rankings, clicks, impressions, or income. |
| docs/ai-deployment-review-pack.md | 113 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/ai-deployment-review-pack.md | 170 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/ai-deployment-review-pack.md | 226 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/ai-deployment-review-pack.md | 282 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/ai-deployment-review-pack.md | 338 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/ai-deployment-review-pack.md | 394 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/ai-deployment-review-pack.md | 450 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/ai-deployment-review-pack.md | 506 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/ai-deployment-review-pack.md | 562 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/ai-deployment-review-pack.md | 618 | - No fabricated benchmark, latency, cost, traffic, ranking, income, or conversion claim. |
| docs/automation-digest.md | 14 | - Traffic data available: false |
| docs/automation-digest.md | 353 | \| 313 \| 0 \| 32 \| 6 \| 3 \| 5 \| RAG、知识库、向量数据库和引用溯源 \| RAG 是搜索面很宽的稳定主题，适合承接企业知识库、客服、内部文档问答和 Agent 记忆流量。 \| |
| docs/automation-digest.md | 355 | \| 307 \| 0 \| 36 \| 6 \| 3 \| 5 \| Dify、n8n、Coze、Flowise、MCP 自动化部署 \| 这类词同时覆盖搜索流量和可售服务，适合从教程、报价、验收、风控四个角度铺内容。 \| |
| docs/automation-digest.md | 473 | - Traffic data available: false |
| docs/automation-digest.md | 687 | ## Traffic Evidence |
| docs/automation-digest.md | 689 | - Traffic data available: false |
| docs/automation-digest.md | 690 | - Can claim traffic: false |
| docs/automation-digest.md | 692 | - Measured traffic sources: none |
| docs/automation-digest.md | 693 | - Search Console verification evidence: false |
| docs/automation-digest.md | 696 | - Unsupported traffic claims: 0 |
| docs/automation-digest.md | 697 | - Traffic claim files scanned: 137 |
| docs/automation-digest.md | 698 | - Traffic claim watch mentions: 1357 |
| docs/automation-digest.md | 711 | - Traffic data available: false |
| docs/automation-digest.md | 786 | \| Dify、n8n、MCP 和无代码 AI 自动化 \| 258 \| 0 \| 5 \| 无代码 AI 自动化容易吸引搜索流量，也最需要平台规则和权限边界提醒。 \| |
| docs/automation-gate.md | 31 | \| traffic evidence audit passed and is read-only \| PASS \| failedChecks=0, measuredTrafficSources=0 \| |
| docs/automation-gate.md | 32 | \| traffic is not claimed without measured metrics \| PASS \| trafficDataAvailable=false, canClaimTraffic=false, claimableMetrics=0 \| |
| docs/automation-gate.md | 33 | \| traffic claim guard found no unsupported claims \| PASS \| filesScanned=137, unsafeClaims=0, watchMentions=1357 \| |
| docs/autopilot-approval-packet.md | 18 | - Traffic data available: false |
| docs/autopilot-approval-packet.md | 19 | - Can claim traffic: false |
| docs/autopilot-approval-packet.md | 95 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-approval-packet.md | 150 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-approval-packet.md | 204 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-broad-ai-demand-brief.md | 13 | - Traffic claim: not-included |
| docs/autopilot-broad-ai-demand-brief.md | 14 | - Note: Read-only broad AI demand brief. It prioritizes likely search-demand themes from local inventory plus external source signals, but does not claim measured traffic or keyword volume. |
| docs/autopilot-broad-ai-demand-brief.md | 30 | - Do not create traffic claims from this report; connect Search Console or Analytics before reporting impressions or clicks. |
| docs/autopilot-broad-ai-demand-brief.md | 45 | \| 313 \| 0 \| 32 \| 6 \| 3 \| 5 \| RAG、知识库、向量数据库和引用溯源 \| 企业知识库、客服机器人、内部搜索、文档问答负责人 \| RAG 是搜索面很宽的稳定主题，适合承接企业知识库、客服、内部文档问答和 Agent 记忆流量。 \| |
| docs/autopilot-broad-ai-demand-brief.md | 47 | \| 307 \| 0 \| 36 \| 6 \| 3 \| 5 \| Dify、n8n、Coze、Flowise、MCP 自动化部署 \| 低代码/无代码自动化接单者、内部工具负责人、小团队运营 \| 这类词同时覆盖搜索流量和可售服务，适合从教程、报价、验收、风控四个角度铺内容。 \| |
| docs/autopilot-broad-ai-demand-brief.md | 57 | - Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue. |
| docs/autopilot-broad-ai-demand-brief.md | 103 | - Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue. |
| docs/autopilot-broad-ai-demand-brief.md | 149 | - Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue. |
| docs/autopilot-broad-ai-demand-brief.md | 195 | - Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue. |
| docs/autopilot-broad-ai-demand-brief.md | 241 | - Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue. |
| docs/autopilot-broad-ai-demand-brief.md | 280 | \| 31 \| 100 \| informational \| 医疗 AI 提示词 \| 医疗行政 AI 提示词模板：病历摘要、随访问卷和宣教材料怎么安全写 \| content/blog/healthcare-admin-ai-prompts-guide.mdx \| |
| docs/autopilot-broad-ai-demand-brief.md | 288 | - Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue. |
| docs/autopilot-broad-ai-demand-brief.md | 334 | - Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue. |
| docs/autopilot-broad-ai-demand-brief.md | 380 | - Search demand note: External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue. |
| docs/autopilot-broad-freshness-triage.md | 12 | - Traffic claim: not-included |
| docs/autopilot-broad-freshness-triage.md | 14 | - Note: Read-only broad freshness triage. It prioritizes high-demand AI draft candidates for human fact-checking and does not edit, mark review, publish, or claim traffic. |
| docs/autopilot-broad-freshness-triage.md | 121 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 177 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 229 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 279 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 336 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 395 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 461 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 531 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 603 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 661 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 717 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 767 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 815 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 872 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 941 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 993 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 1056 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 1117 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 1180 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 1232 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 1282 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 1331 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 1387 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
| docs/autopilot-broad-freshness-triage.md | 1441 | - Check that pricing, quota, latency, benchmark, ranking, traffic, and revenue language is absent unless backed by current evidence. |
## Next Actions
- Keep saying that live/search surfaces are healthy, not that traffic exists.
- Only report traffic after an audited source provides clicks, impressions, visits, or pageviews.