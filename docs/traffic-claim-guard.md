# Traffic Claim Guard
Generated at: 2026-06-07T01:27:10.269Z
This guard scans operational reports and docs for unsupported claims that real traffic, clicks, impressions, or visits already exist.
## Guardrails
- Auto publish: false
- Note: This guard scans operational docs and automation reports for unsupported traffic claims. It does not scan draft article teaching examples.
## Summary
- filesScanned: 119
- measuredTrafficUnavailable: true
- unsafeClaims: 0
- watchMentions: 940
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
| docs/automation-digest.md | 436 | ## Traffic Evidence |
| docs/automation-digest.md | 438 | - Traffic data available: false |
| docs/automation-digest.md | 439 | - Can claim traffic: false |
| docs/automation-digest.md | 441 | - Measured traffic sources: none |
| docs/automation-digest.md | 442 | - Search Console verification evidence: false |
| docs/automation-digest.md | 445 | - Unsupported traffic claims: 0 |
| docs/automation-digest.md | 446 | - Traffic claim files scanned: 119 |
| docs/automation-digest.md | 447 | - Traffic claim watch mentions: 940 |
| docs/automation-digest.md | 483 | \| Dify、n8n、MCP 和无代码 AI 自动化 \| 258 \| 0 \| 5 \| 无代码 AI 自动化容易吸引搜索流量，也最需要平台规则和权限边界提醒。 \| |
| docs/automation-gate.md | 31 | \| traffic evidence audit passed and is read-only \| PASS \| failedChecks=0, measuredTrafficSources=0 \| |
| docs/automation-gate.md | 32 | \| traffic is not claimed without measured metrics \| PASS \| trafficDataAvailable=false, canClaimTraffic=false, claimableMetrics=0 \| |
| docs/automation-gate.md | 33 | \| traffic claim guard found no unsupported claims \| PASS \| filesScanned=119, unsafeClaims=0, watchMentions=940 \| |
| docs/autopilot-approval-packet.md | 18 | - Traffic data available: false |
| docs/autopilot-approval-packet.md | 19 | - Can claim traffic: false |
| docs/autopilot-approval-packet.md | 95 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-approval-packet.md | 150 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-approval-packet.md | 204 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-human-review-playbook.md | 19 | - Traffic data available: false |
| docs/autopilot-human-review-playbook.md | 20 | - Can claim traffic: false |
| docs/autopilot-human-review-playbook.md | 68 | - Do not claim traffic, ranking, revenue, or conversion lift without measured evidence. |
| docs/autopilot-human-review-playbook.md | 93 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-human-review-playbook.md | 128 | - Do not claim traffic, ranking, revenue, or conversion lift without measured evidence. |
| docs/autopilot-human-review-playbook.md | 154 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-human-review-playbook.md | 189 | - Do not claim traffic, ranking, revenue, or conversion lift without measured evidence. |
| docs/autopilot-human-review-playbook.md | 215 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-internal-link-brief.md | 19 | - Traffic data available: false |
| docs/autopilot-internal-link-brief.md | 20 | - Can claim traffic: false |
| docs/autopilot-review-queue.md | 18 | - Traffic data available: false |
| docs/autopilot-review-queue.md | 19 | - Can claim traffic: false |
| docs/autopilot-review-queue.md | 67 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-review-queue.md | 84 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-review-queue.md | 101 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-review-queue.md | 118 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-review-queue.md | 135 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-review-queue.md | 152 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-review-queue.md | 169 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-review-queue.md | 186 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-review-queue.md | 203 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-review-queue.md | 218 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-search-intent-brief.md | 19 | - Traffic data available: false |
| docs/autopilot-search-intent-brief.md | 20 | - Can claim traffic: false |
| docs/autopilot-search-intent-brief.md | 36 | - Exact query hits and token hits are local text checks. They do not claim search volume, ranking, impressions, clicks, or traffic. |
| docs/autopilot-source-verification-brief.md | 19 | - Traffic data available: false |
| docs/autopilot-source-verification-brief.md | 20 | - Can claim traffic: false |
| docs/autopilot-source-verification-brief.md | 67 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-source-verification-brief.md | 129 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/autopilot-source-verification-brief.md | 192 | - Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence. |
| docs/broad-search-demand-map.md | 5 | This report is read-only. It turns broad user-search demand areas into a review and content-gap map. It does not publish, mark review, claim keyword volume, or claim traffic. |
| docs/broad-search-demand-map.md | 12 | - Note: Read-only broad-demand map. It prioritizes likely user-search themes from the local content inventory and official source targets; it does not claim keyword volume, rankings, clicks, or traffic. |
| docs/broad-search-demand-map.md | 123 | \| 31 \| 100 \| informational \| 医疗 AI 提示词 \| 医疗行政 AI 提示词模板：病历摘要、随访问卷和宣教材料怎么安全写 \| content/blog/healthcare-admin-ai-prompts-guide.mdx \| |
| docs/content-freshness.md | 10 | - Note: This report flags freshness risk for manual review. It does not verify live facts, claim traffic, or change article status. |
| docs/content-opportunity-backlog.md | 5 | This backlog is read-only. It does not publish articles, mark review, or claim measured traffic. |
| docs/content-opportunity-backlog.md | 10 | - Note: This backlog is based on local content inventory and broad search intent themes only. It does not claim traffic, impressions, keyword volume, or ranking data. |
| docs/content-opportunity-backlog.md | 28 | \| Dify、n8n、MCP 和无代码 AI 自动化 \| 258 \| 0 \| 22 \| 5 \| informational \| 无代码 AI 自动化容易吸引搜索流量，也最需要平台规则和权限边界提醒。 \| |
| docs/content-opportunity-backlog.md | 36 | - Search demand note: Broad search-intent theme, not measured traffic or keyword volume. |
| docs/content-opportunity-backlog.md | 66 | - Search demand note: Broad search-intent theme, not measured traffic or keyword volume. |
| docs/content-opportunity-backlog.md | 96 | - Search demand note: Broad search-intent theme, not measured traffic or keyword volume. |
| docs/content-opportunity-backlog.md | 127 | - Search demand note: Broad search-intent theme, not measured traffic or keyword volume. |
| docs/content-opportunity-backlog.md | 157 | - Search demand note: Broad search-intent theme, not measured traffic or keyword volume. |
| docs/content-opportunity-backlog.md | 187 | - Search demand note: Broad search-intent theme, not measured traffic or keyword volume. |
| docs/content-opportunity-backlog.md | 217 | - Search demand note: Broad search-intent theme, not measured traffic or keyword volume. |
## Next Actions
- Keep saying that live/search surfaces are healthy, not that traffic exists.
- Only report traffic after an audited source provides clicks, impressions, visits, or pageviews.