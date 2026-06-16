# Automation Gate

Generated at: 2026-06-16T18:19:24.461Z

Overall: FAIL

## Summary

- Checks: 197
- Passed: 152
- Failed: 45

## Checks

| Check | Status | Detail |
| --- | --- | --- |
| review automation never auto-publishes | PASS |  |
| publish pack matches recommended review files | PASS | review=content/blog/tools-not-to-buy-first.mdx, content/blog/vector-database-selection-for-rag-guide.mdx, content/blog/vercel-ai-gateway-multi-provider-guide.mdx pack=content/blog/tools-not-to-buy-first.mdx, content/blog/vector-database-selection-for-rag-guide.mdx, content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| review batch plan stays manual and has candidates | FAIL | batches=3, candidates=6 |
| publish pack includes source verification tasks | PASS | 3 item(s) covered |
| publish pack includes human decision and risk context | FAIL | content/blog/tools-not-to-buy-first.mdx |
| recommended review candidates pass preflight | PASS | failed=0 |
| review preflight surfaces content integrity warnings | PASS | preflightWarnings=0, preflightMojibake=0, recommendedWarningFiles=none |
| recommended review clusters are diverse | PASS | Other, RAG and knowledge base, AI deployment |
| SEO safety check passed | PASS | {"leakedDraftOrReview":[],"nonPublishedWithNoindexFalse":[],"publishedButNoindexed":[]} |
| searchability check passed | PASS | score=100, failed=0 |
| searchability check covers llms.txt | PASS | checks=13 |
| draft guardrail sanitizer is clean | PASS | changedFiles=0, totalReplacements=0 |
| project automation workflow is scheduled and report-visible | PASS | scheduleCount=4, artifact=true, reportCommitGated=true |
| project automation workflow excludes review and publish commands | PASS | forbiddenWorkflowCommands=0, checks=10/10 |
| autopilot executive brief summarizes immediate execution priorities | PASS | public=500, immediate=3/3, boards=5 |
| autopilot executive brief stays human-gated and publish-safe | PASS | unsafe=0, publishConfirm=0, publishableNow=0, routeWarnings=3 |
| publication bottleneck report explains manual gate | PASS | public=500, publishableNow=0, immediateReady=3 |
| publication bottleneck report stays publish-safe | PASS | unsafe=0, publishConfirm=0, preflightFailed=0, traffic=false |
| mojibake remediation brief is read-only and article-safe | PASS | filesScanned=669, affected=77, metadataFields=9 |
| mojibake remediation brief stays human-gated and publish-safe | PASS | unsafe=0, publishConfirm=0, traffic=false |
| no non-published article is indexable | PASS |  |
| all published articles are indexable | PASS |  |
| project status still stops before publishing | PASS | publicPublished=500, publishableNow=0 |
| traffic evidence audit passed and is read-only | PASS | failedChecks=0, measuredTrafficSources=0 |
| traffic is not claimed without measured metrics | PASS | trafficDataAvailable=false, canClaimTraffic=false, claimableMetrics=0 |
| traffic claim guard found no unsupported claims | PASS | filesScanned=220, unsafeClaims=0, watchMentions=9550 |
| content integrity audit is read-only and clean | PASS | filesScanned=669, blockingItems=0 |
| content integrity audit mirrors mojibake warnings without blocking | PASS | warnings=77, mojibake=77, publicMojibake=51, remediationAffected=77/51 |
| content integrity audit covers public, recommended, and Wave 1 items | PASS | public=500, recommended=3, wave=3 |
| internal link opportunity audit is read-only and covers expansion candidates | PASS | public=500, expansion=15, broadFirst=0, candidates=19 |
| internal link opportunity audit has public suggestions for Wave 1 | PASS | wave=3, broadFirstMissing=0, waveMissing=0, candidateMissing=0 |
| internal link sprint board covers all linkable candidates | PASS | items=19, waves=5, public=500, suggestions=57 |
| internal link sprint board keeps link edits manual and publish-safe | PASS | ready=19, actions=152, unsafe=0, publishConfirm=0 |
| source target health audit is read-only and covers review source scopes | PASS | broadFirst=0, current=3, publicGap=0, next=15, files=16 |
| source target health audit has reachable URLs for every covered review file | PASS | checked=14, ok=14, failed=0, missingTargets=0, filesWithoutReachable=0 |
| source target remediation pack is read-only and mirrors source health counts | PASS | items=10, failed=0/0, redirected=10/10 |
| source target remediation pack keeps every source fix human-gated | PASS | ready=10, unsafe=0, gated=10, replacementCandidates=0 |
| source replacement decision pack is read-only and mirrors remediation counts | PASS | decisions=71, remediation=10, failed=0/0, redirected=71/10 |
| source replacement decision pack keeps file-level decisions human-gated | PASS | unsafe=0, gated=71, recommended=0, official=0 |
| review action board is read-only and covers active review queues | PASS | tasks=3, wave=3, publicGap=0 |
| review action board tasks are ready and preserve command boundaries | FAIL | ready=2, unsafe=1 |
| review portfolio board deduplicates all review packs | PASS | sourceCandidates=9, uniqueItems=8, duplicates=1, multiSource=1 |
| review portfolio board keeps unique candidates safe and human-gated | PASS | ready=8, safe=8, sources=8, commands=8 |
| autopilot review queue is read-only and covers portfolio candidates | PASS | items=8, next=8, sources=8 |
| autopilot review queue keeps assignments safe and human-gated | PASS | ready=8, blocked=0, safe=8, unsafe=0 |
| autopilot approval packet packages the top safe assignments | PASS | items=3, ready=3, sources=3, queries=3 |
| autopilot approval packet keeps publish and review commands human-gated | PASS | unsafe=0, headings=3 |
| autopilot search intent brief covers approval packet | PASS | items=3, weak=3, unsafe=0 |
| autopilot search intent brief produces human review suggestions | PASS | title=0, description=0, heading=0, body=2 |
| autopilot internal link brief covers approval packet | PASS | items=3, public=500, unsafe=0 |
| autopilot internal link brief provides public link suggestions | PASS | suggestions=3, missingCurrentPublicLink=1, alreadyLinked=2 |
| autopilot source verification brief covers approval packet | PASS | items=3, reachable=14, unsafe=0 |
| autopilot source verification brief provides source-backed review tasks | PASS | reachableItems=3, official=3, factChecks=3, approvalChecks=3 |
| autopilot human review playbook covers approval packet | FAIL | items=3, ready=1, unsafe=2 |
| autopilot human review playbook keeps actions human-gated | FAIL | commands=3, search=3, source=3, links=3 |
| autopilot approval remediation pack covers approval packet | FAIL | items=3, ready=1, unsafe=2 |
| autopilot approval remediation pack has actionable human fixes | FAIL | commands=3, links=3, search=3, source=3, sourceUrlFixes=3/26 |
| human approval decision matrix covers approval packet | FAIL | rows=3, approvals=3, unsafe=0 |
| human approval decision matrix stays human-gated and decision-ready | PASS | commands=3, repairs=3, branches=9, publishConfirm=0 |
| human approval repair queue covers decision matrix | FAIL | files=3, tasks=55, minimum=3/16, blockers=0/0, unsafe=0 |
| human approval repair queue stays manual and non-publishing | PASS | humanGated=55/55, minimum=3/16, publishConfirm=0 |
| human approval repair route covers repair queue | FAIL | files=3, minimumTasks=16, sessions=12, next=content/blog/vercel-ai-gateway-multi-provider-guide.mdx |
| human approval repair route stays manual and non-publishing | FAIL | sessions=12, publishConfirm=0, highRisk=6 |
| human approval repair progress covers repair route | FAIL | files=3, categories=18, open=8, blocked=2 |
| human approval repair progress stays manual and non-publishing | FAIL | readyAfterRepair=0, open=8, evidenceReady=3, publishConfirm=0 |
| human approval repair session pack covers current repair progress | FAIL | files=3, actions=161, sourceUrl=47, sourceTargets=14 |
| human approval repair session pack stays manual and non-publishing | FAIL | unsafe=2, publishConfirm=0, readyAfterRepair=0 |
| autopilot review sprint board covers next assignments | FAIL | items=8, readyWithPlaybook=1, queued=7, needsQuery=2, unsafe=0 |
| autopilot review sprint board keeps sprint actions human-gated | PASS | ready=8, commands=8, queries=6, sources=8 |
| autopilot search query gap brief covers sprint query gaps | PASS | items=2, sprintNeedsQuery=2, unsafe=0 |
| autopilot search query gap brief has source-backed manual query suggestions | PASS | ready=2, coverage=2, recommended=20, sources=2 |
| autopilot queued playbook brief covers queued sprint items | PASS | items=7, queued=7, unsafe=0 |
| autopilot queued playbook brief has complete human-gated actions | FAIL | ready=7, search=7, source=7, links=6 |
| autopilot queued remediation pack covers queued playbook items | PASS | items=7, queued=7, unsafe=0 |
| autopilot queued remediation pack has actionable human fixes | PASS | ready=7, search=7, source=7, links=7 |
| autopilot broad AI demand brief is read-only and source-backed | FAIL | clusters=8, sources=24, readyFiles=7, unsafe=0 |
| autopilot broad AI demand brief covers broad search lanes | FAIL | clusters=8, withoutPublic=0, withReady=4 |
| autopilot broad freshness triage is read-only and prioritizes high-risk demand candidates | FAIL | items=7, highRisk=6, clusters=3, unsafe=0 |
| autopilot broad freshness triage has complete human fact-check packets | PASS | ready=7, factChecks=7, sources=7 |
| autopilot broad publish waves are read-only and small-batch | FAIL | waves=3, items=7, maxPerWave=3, unsafe=0 |
| autopilot broad publish waves preserve human approval command boundaries | PASS | ready=7, safe=7, approvalWaves=3 |
| autopilot broad wave optimization is read-only and covers publish waves | PASS | items=7, waves=3, readyWaves=3, unsafe=0 |
| autopilot broad wave optimization has actionable SEO and approval guidance | PASS | ready=7, checklists=7, links=5 |
| autopilot broad wave remediation pack covers optimization items | PASS | items=7, waves=3, readyWaves=3, unsafe=0 |
| autopilot broad wave remediation pack has human-gated fixes | PASS | ready=7, search=7, source=7, linkPlan=7, missingSpecificLinks=2 |
| broad first coverage launch pack is read-only and covers zero-public clusters | PASS | selected=0, zeroPublic=0, unique=0, unsafe=0 |
| broad first coverage launch pack preserves human review boundaries | PASS | safe=0, commands=0, sources=0, checks=0 |
| broad first coverage readiness matrix is read-only and covers launch pack | PASS | items=0, unique=0, blocking=0, unsafe=0 |
| broad first coverage readiness matrix has review evidence and command boundaries | PASS | commands=0, preflight=0, source=0, links=0 |
| human approval execution queue is read-only and covers approval wave | FAIL | items=3, immediate=3, backlog=0, promptLanes=3, projected=503 |
| human approval execution queue stays human-gated and excludes publish confirm | PASS | ready=3, sourceDecisions=3, seoWarnings=1, promptLanes=3, publishConfirm=0 |
| human approval clearance pack is read-only and covers the full approval queue | PASS | items=3, immediate=3, backlog=0, failedSources=0, seo=1 |
| human approval clearance pack keeps all work human-gated and action-ready | PASS | ready=3, actions=28, sourceDecisions=1, copydesk=2, publishConfirm=0 |
| review optimization brief is read-only and covers ready action-board tasks | PASS | briefs=2, ready=2, unsafeCommands=0 |
| review optimization brief has actionable copydesk guidance | PASS | withAction=2, missingPublicLinkItems=1, exactQueryWeak=2 |
| search snippet readiness audit is read-only and covers public plus expansion items | PASS | public=500, expansion=15, scoped=516 |
| search snippet readiness audit has no blocking Wave 1 issues | PASS | blocking=0, wave=3, waveBlocking=0, warnings=204 |
| structured data readiness audit is read-only and covers public plus expansion items | PASS | public=500, expansion=15, scoped=516 |
| structured data readiness audit has JSON-LD previews and no blocking Wave 1 issues | PASS | blocking=0, previews=516, wave=3, waveBlocking=0, warnings=92 |
| SEO warning remediation pack is read-only and mirrors snippet/schema warnings | PASS | items=260, snippet=204/204, schema=92/92 |
| SEO warning remediation pack keeps every SEO fix human-gated | PASS | ready=260, public=255, draft=5, gated=260 |
| SEO opportunity map has review-ready drafts | PASS | reviewReadyDrafts=148 |
| SEO opportunity map includes manual review batches | PASS | batches=5 |
| content opportunity backlog has reviewable topics | PASS | topics=7, topicsWithReadyCandidates=4 |
| AI deployment coverage has broad reviewable coverage | FAIL | topics=10, withCandidates=8, reviewReady=32, unique=18 |
| AI deployment coverage includes source and search review tasks | PASS | officialSources=12, topics=10 |
| AI deployment candidates stay draft and non-indexable | PASS | unsafeCandidateItems=0 |
| AI deployment review pack is read-only and covers deployment topics | FAIL | items=6, topics=6/10, unique=6, duplicates=0 |
| AI deployment review pack has source-backed human review boundaries | PASS | safe=6, sources=6, commands=6 |
| AI deployment sprint board covers deployment tutorials across lanes | FAIL | items=6, lanes=4, modes=4, queries=24, sources=10 |
| AI deployment sprint board keeps deployment work human-gated and publish-safe | FAIL | ready=6, actions=88, unsafe=0, publishConfirm=0 |
| memory RAG sprint board covers broad searchable memory demand | PASS | lanes=6, queries=24, sources=6, waves=2 |
| memory RAG sprint board keeps memory work human-gated and publish-safe | PASS | candidates=2, ready=2, checks=39, unsafe=0 |
| industry prompt coverage has broad reviewable coverage | FAIL | industries=16, withCandidates=0, reviewReady=0, unique=0 |
| industry prompt coverage includes source and search review tasks | PASS | officialSources=5, industries=16 |
| industry prompt candidates stay draft and non-indexable | PASS | unsafeCandidateItems=0 |
| industry prompt review pack is read-only and deduplicated | FAIL | items=0, unique=0, duplicates=0 |
| industry prompt review pack has source-backed human review boundaries | PASS | safe=0, sources=0, commands=0, publicPrompt=25 |
| industry prompt opportunity board is broad and read-only | PASS | opportunities=12, lanes=12, queries=60 |
| industry prompt opportunity board has sources, structure, and human boundaries | PASS | safe=true, sources=12, structure=12, modules=60 |
| industry prompt opportunity board connects to reviewable content | FAIL | withReviewCandidate=0, zeroPublic=0 |
| industry prompt module pack is read-only and mirrors opportunity modules | PASS | items=12/12, blueprints=60/60 |
| industry prompt module pack has reusable prompt blueprints and human gates | FAIL | safe=true, gated=12, copyPrompts=12, reviewBridge=0 |
| search intent lane map is read-only and broad | FAIL | lanes=12, highPriority=7, withReadyDrafts=7 |
| search intent lane map includes sources, review focus, and safe candidates | FAIL | readyDraftMatches=22, noPublicCoverage=0, notReadyMatched=57 |
| search intent approval packet is read-only and covers current wave plus next gaps | FAIL | currentWave=3, nextGap=0, nextGapLanes=0 |
| search intent approval packet has no unsafe items and includes review context | PASS | unsafe=0, currentReady=3, nextGap=0 |
| search intent wave planner is read-only and continuous | PASS | waves=4, items=12, files=12, lanes=7 |
| search intent wave planner keeps all items safe for manual review | PASS | unsafe=0, ready=12, planned=12 |
| search query coverage is read-only and matches planned waves | PASS | items=12, waves=4, files=12, lanes=7 |
| search query coverage has broad user-search variants | PASS | uniqueQueries=352, ready=12, unsafe=0 |
| search query match audit is read-only and covers query plan | PASS | items=12, ready=12, warnings=10 |
| search query match audit has no blocking search-alignment issues | PASS | blocking=0, averageFamilies=6.75 |
| search demand intake is read-only and covers broad user-search lanes | FAIL | lanes=8, readyLanes=7, readyFiles=24, unsafe=1 |
| search demand intake packages sources, formats, and manual review boundaries | FAIL | queries=81, sources=29, formats=32, queueMatches=10 |
| search demand review pack is read-only and covers intake lanes | FAIL | lanes=8, items=11, maxPerLane=2, unsafe=0 |
| search demand review pack keeps review actions human-gated | PASS | ready=11, commands=11, sources=11, queries=11, factChecks=63 |
| search demand publication bridge is read-only and matches review pack | PASS | items=11, reviewPackItems=11, blocking=0, warnings=11 |
| search demand publication bridge confirms manual approval readiness | PASS | approvalReady=11, snippet=11, schema=11, source=11, links=7 |
| broad search demand map is read-only and covers major demand themes | FAIL | themes=10, readyThemes=6, uniqueCandidates=27 |
| broad search demand map links demand, sources, and planned review waves | FAIL | officialSources=13, reviewPackMatches=2, waveMatches=15, readyMatches=82 |
| mass AI search action matrix is read-only and covers broad themes | FAIL | items=8/8, broad=10, unique=27, traffic=false |
| mass AI search action matrix keeps prompt and deployment work human-gated | FAIL | ready=6, deploy=4, prompt=0, unsafe=2 |
| popular AI prompt playbook is read-only and covers broad prompt demand | PASS | items=10, work=3, agent=3, memory=1, sources=12 |
| popular AI prompt playbook keeps templates human-gated and publish-safe | FAIL | ready=3, templates=50, queries=139, uniqueFiles=21, publishConfirm=0 |
| popular prompt approval bridge is read-only and covers every popular prompt lane | FAIL | lanes=10, next=5, readyNext=3, alreadyQueued=0 |
| popular prompt approval bridge keeps next candidates human-gated and publish-safe | FAIL | items=15, ready=9, templates=75, uniqueFiles=9, publishConfirm=0 |
| popular prompt sprint board covers every broad prompt lane | PASS | items=10, queries=123, buckets=5, waves=5 |
| popular prompt sprint board keeps prompt expansion manual and publish-safe | FAIL | ready=3, actions=90, nextFiles=9, publishConfirm=0 |
| public coverage gap plan is read-only and covers every no-public broad theme | PASS | gapThemes=0, items=0, uniqueFiles=0, duplicateFiles=0 |
| public coverage gap plan keeps candidates safe for manual review | FAIL | ready=0, unsafe=0, waves=0 |
| public coverage gap preflight is read-only and covers gap plan items | PASS | items=0, planItems=0, broadFirst=0, uniqueFiles=0 |
| public coverage gap preflight has no blocking publish-readiness issues | PASS | blocking=0, ready=0, structured=0, seedMatches=0, warnings=0 |
| public coverage gap decision pack is read-only and covers preflight items | PASS | items=0, ready=0, waves=0 |
| public coverage gap decision pack has human review actions and command boundaries | PASS | blocking=0, unsafe=0, commandBoundary=0, optimizations=0 |
| content cannibalization check generated warning report | PASS | conflicts=200, reviewBatchConflicts=0 |
| review cannibalization brief is read-only and covers unique action-board files | PASS | items=2, uniqueActionFiles=2, unsafeCommands=0 |
| review cannibalization brief keeps publish candidates differentiated | PASS | highRisk=0, highPublished=0, highReviewOnly=0, mediumRisk=0, publishedComparisons=1, reviewComparisons=0 |
| review collision decision pack is read-only and covers high-risk overlaps | PASS | decisionItems=0, highRisk=0, blocking=0, unsafe=0 |
| review collision decision pack keeps collision approvals human-gated | PASS | ready=0, commandBoundary=0, reviewOnly=0, published=0, blockedMatched=0 |
| content freshness check covers review items | PASS | highRisk=573, currentReviewItems=3, plannedReviewItems=6 |
| review freshness brief is read-only and covers unique action-board files | PASS | items=2, uniqueActionFiles=2, unsafeCommands=0 |
| review freshness brief has source-backed human fact-check tasks | PASS | ready=2, blocked=0, highRisk=2, withSources=2 |
| review coverage report covers planned candidates | PASS | planned=6, items=6, missingCoverage=0 |
| review coverage includes source, fact-check, approval, and risk tasks | PASS | {"approval":0,"factCheck":0,"risk":0,"sources":0} |
| review coverage keeps planned candidates unpublished and non-indexable | PASS | {"nonDraftItems":0,"reviewBatchConflictItems":0,"unsafeIndexingItems":0} |
| review priority roadmap has enough actionable lanes | PASS | lanes=9, uniqueNextReviewFiles=15 |
| review priority roadmap includes review context | PASS | lanes=9, nextReviewFiles=15 |
| review priority roadmap candidates stay safe | PASS | unsafeCandidates=0 |
| next review source pack covers roadmap files | PASS | items=15, roadmap=15 |
| next review source pack includes source, fact-check, approval, and risk tasks | PASS | {"approval":0,"factCheck":0,"risk":0,"sources":0} |
| next review source pack keeps candidates draft and non-indexable | PASS | unsafeItems=0, safeDraftItems=15 |
| public expansion queue is manual and covers roadmap files | PASS | items=15, waves=5, roadmap=15 |
| public expansion queue only contains source-pack-ready safe drafts | PASS | unsafeItems=0, duplicateFiles=0, sourcePackReadyItems=15 |
| public expansion queue stops before publishing | PASS | publishableNow=0 |
| wave approval packet is manual and ready | PASS | wave=1, items=3, ready=3, alreadyPublished=0 |
| wave approval packet has no unsafe items | PASS | unsafeItems=0 |
| wave publish simulation is read-only and human-gated | PASS | {"autoMarkReview":false,"autoPublish":false,"note":"Read-only simulation. It does not run mark:review, publish:articles, or change any article status/noindex value.","stopBeforeHumanApproval":true} |
| wave publish simulation projects only approved Wave 1 items | PASS | wave=1, items=3, ready=3, alreadyPublished=0, projected=3 |
| wave publish simulation public total matches project status | PASS | current=500, projectedAfterApproval=3, projectedPublic=503 |
| live search surface check passed | PASS | publicArticles=500, failed=0 |
| public surface inventory is read-only and matches public counts | PASS | public=500, live=500, unsafe=0 |
| public surface inventory identifies broad AI public gaps with candidates | PASS | clusters=8, zeroPublic=0 |
| public search refresh pack is read-only and covers all public pages | PASS | items=500, public=500, seo=255, measuredTraffic=0 |
| public search refresh pack keeps public edits human-gated and action-ready | PASS | ready=500, actions=3489, highPriority=247, shortDescriptions=457, publishConfirm=0 |
| public refresh sprint board covers public refresh pack | PASS | items=500, public=500, waves=167, mojibakePublic=51, seo=255, shortDescriptions=457 |
| public refresh sprint board keeps public edits manual and publish-confirm-free | PASS | ready=500, actions=5154, unsafe=0, publishConfirm=0 |
| public search refresh session pack covers public sprint waves | PASS | sessions=167, files=500, actions=5154, ready=500 |
| public search refresh session pack stays manual and non-publishing | PASS | unsafe=0, publishConfirm=0, traffic=false |
| tool market opportunity map covers broad tool demand safely | PASS | opportunities=8, tools=11, queries=80, public=500 |
| tool market opportunity map includes PPT, spreadsheet and registration actions without publishing | PASS | registrations=5, unsafe=0, publishConfirm=0, traffic=false |
| manual review workbench is ready and stops before publishing | PASS | currentItemsCovered=3, publishableNow=0 |
| manual review workbench includes SEO warning remediation | PASS | workbenchSeo=260, remediation=260, unsafe=0 |
| next batch approval route matches manual review workbench | PASS | batch=1, items=3, workbenchItems=3, public=500, publishable=0 |
| next batch approval route is human-gated and action-ready | PASS | ready=3, actions=39, sourcePack=3, queryCoverage=3, warnings=9, publishConfirm=0 |
| next batch route remediation pack covers route warnings | PASS | batch=1, items=3, warningItems=3, routeWarnings=9, actions=42 |
| next batch route remediation pack stays safe and publish-confirm-free | PASS | ready=3, unsafe=0, publishConfirm=0, clearanceGaps=2, copydeskGaps=2, queryWarnings=3, seoWarnings=3 |
