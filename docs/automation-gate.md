# Automation Gate

Generated at: 2026-06-12T03:28:55.269Z

Overall: PASS

## Summary

- Checks: 197
- Passed: 197
- Failed: 0

## Checks

| Check | Status | Detail |
| --- | --- | --- |
| review automation never auto-publishes | PASS |  |
| publish pack matches recommended review files | PASS | review=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx, content/blog/industry-ai-prompts-template-library-2026.mdx, content/blog/ai-model-selection-customer-service-guide.mdx pack=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx, content/blog/industry-ai-prompts-template-library-2026.mdx, content/blog/ai-model-selection-customer-service-guide.mdx |
| review batch plan stays manual and has candidates | PASS | batches=3, candidates=9 |
| publish pack includes source verification tasks | PASS | 3 item(s) covered |
| publish pack includes human decision and risk context | PASS | 3 item(s) covered |
| recommended review candidates pass preflight | PASS | failed=0 |
| review preflight surfaces content integrity warnings | PASS | preflightWarnings=0, preflightMojibake=0, recommendedWarningFiles=none |
| recommended review clusters are diverse | PASS | Agent and memory, Industry AI prompts, RAG and knowledge base |
| SEO safety check passed | PASS | {"leakedDraftOrReview":[],"nonPublishedWithNoindexFalse":[],"publishedButNoindexed":[]} |
| searchability check passed | PASS | score=100, failed=0 |
| searchability check covers llms.txt | PASS | checks=13 |
| draft guardrail sanitizer is clean | PASS | changedFiles=0, totalReplacements=0 |
| project automation workflow is scheduled and report-visible | PASS | scheduleCount=4, artifact=true, reportCommitGated=true |
| project automation workflow excludes review and publish commands | PASS | forbiddenWorkflowCommands=0, checks=10/10 |
| autopilot executive brief summarizes immediate execution priorities | PASS | public=15, immediate=3/3, boards=5 |
| autopilot executive brief stays human-gated and publish-safe | PASS | unsafe=0, publishConfirm=0, publishableNow=0, routeWarnings=2 |
| publication bottleneck report explains manual gate | PASS | public=15, publishableNow=0, immediateReady=3 |
| publication bottleneck report stays publish-safe | PASS | unsafe=0, publishConfirm=0, preflightFailed=0, traffic=false |
| mojibake remediation brief is read-only and article-safe | PASS | filesScanned=669, affected=77, metadataFields=9 |
| mojibake remediation brief stays human-gated and publish-safe | PASS | unsafe=0, publishConfirm=0, traffic=false |
| no non-published article is indexable | PASS |  |
| all published articles are indexable | PASS |  |
| project status still stops before publishing | PASS | publicPublished=15, publishableNow=0 |
| traffic evidence audit passed and is read-only | PASS | failedChecks=0, measuredTrafficSources=0 |
| traffic is not claimed without measured metrics | PASS | trafficDataAvailable=false, canClaimTraffic=false, claimableMetrics=0 |
| traffic claim guard found no unsupported claims | PASS | filesScanned=211, unsafeClaims=0, watchMentions=3792 |
| content integrity audit is read-only and clean | PASS | filesScanned=669, blockingItems=0 |
| content integrity audit mirrors mojibake warnings without blocking | PASS | warnings=77, mojibake=77, publicMojibake=9, remediationAffected=77/9 |
| content integrity audit covers public, recommended, and Wave 1 items | PASS | public=15, recommended=3, wave=3 |
| internal link opportunity audit is read-only and covers expansion candidates | PASS | public=15, expansion=19, broadFirst=8, candidates=22 |
| internal link opportunity audit has public suggestions for Wave 1 | PASS | wave=3, broadFirstMissing=0, waveMissing=0, candidateMissing=0 |
| internal link sprint board covers all linkable candidates | PASS | items=22, waves=6, public=15, suggestions=66 |
| internal link sprint board keeps link edits manual and publish-safe | PASS | ready=22, actions=176, unsafe=0, publishConfirm=0 |
| source target health audit is read-only and covers review source scopes | PASS | broadFirst=8, current=3, publicGap=13, next=19, files=23 |
| source target health audit has reachable URLs for every covered review file | PASS | checked=40, ok=39, failed=1, missingTargets=0, filesWithoutReachable=0 |
| source target remediation pack is read-only and mirrors source health counts | PASS | items=19, failed=1/1, redirected=18/18 |
| source target remediation pack keeps every source fix human-gated | PASS | ready=19, unsafe=0, gated=19, replacementCandidates=8 |
| source replacement decision pack is read-only and mirrors remediation counts | PASS | decisions=113, remediation=19, failed=1/1, redirected=112/18 |
| source replacement decision pack keeps file-level decisions human-gated | PASS | unsafe=0, gated=113, recommended=1, official=1 |
| review action board is read-only and covers active review queues | PASS | tasks=16, wave=3, publicGap=13 |
| review action board tasks are ready and preserve command boundaries | PASS | ready=16, unsafe=0 |
| review portfolio board deduplicates all review packs | PASS | sourceCandidates=38, uniqueItems=26, duplicates=12, multiSource=10 |
| review portfolio board keeps unique candidates safe and human-gated | PASS | ready=26, safe=26, sources=26, commands=26 |
| autopilot review queue is read-only and covers portfolio candidates | PASS | items=26, next=10, sources=26 |
| autopilot review queue keeps assignments safe and human-gated | PASS | ready=25, blocked=1, safe=26, unsafe=0 |
| autopilot approval packet packages the top safe assignments | PASS | items=3, ready=3, sources=3, queries=3 |
| autopilot approval packet keeps publish and review commands human-gated | PASS | unsafe=0, headings=3 |
| autopilot search intent brief covers approval packet | PASS | items=3, weak=2, unsafe=0 |
| autopilot search intent brief produces human review suggestions | PASS | title=1, description=1, heading=0, body=1 |
| autopilot internal link brief covers approval packet | PASS | items=3, public=15, unsafe=0 |
| autopilot internal link brief provides public link suggestions | PASS | suggestions=3, missingCurrentPublicLink=3, alreadyLinked=0 |
| autopilot source verification brief covers approval packet | PASS | items=3, reachable=25, unsafe=0 |
| autopilot source verification brief provides source-backed review tasks | PASS | reachableItems=3, official=3, factChecks=3, approvalChecks=3 |
| autopilot human review playbook covers approval packet | PASS | items=3, ready=3, unsafe=0 |
| autopilot human review playbook keeps actions human-gated | PASS | commands=3, search=3, source=3, links=3 |
| autopilot approval remediation pack covers approval packet | PASS | items=3, ready=3, unsafe=0 |
| autopilot approval remediation pack has actionable human fixes | PASS | commands=3, links=3, search=3, source=3, sourceUrlFixes=3/34 |
| human approval decision matrix covers approval packet | PASS | rows=3, approvals=3, unsafe=0 |
| human approval decision matrix stays human-gated and decision-ready | PASS | commands=3, repairs=3, branches=9, publishConfirm=0 |
| human approval repair queue covers decision matrix | PASS | files=3, tasks=57, minimum=3/18, blockers=0/0, unsafe=0 |
| human approval repair queue stays manual and non-publishing | PASS | humanGated=57/57, minimum=3/18, publishConfirm=0 |
| human approval repair route covers repair queue | PASS | files=3, minimumTasks=18, sessions=12, next=content/blog/ai-agent-deployment-vercel-ai-sdk-guide.mdx |
| human approval repair route stays manual and non-publishing | PASS | sessions=12, publishConfirm=0, highRisk=6 |
| human approval repair progress covers repair route | PASS | files=3, categories=18, open=11, blocked=0 |
| human approval repair progress stays manual and non-publishing | PASS | readyAfterRepair=0, open=11, evidenceReady=3, publishConfirm=0 |
| human approval repair session pack covers current repair progress | PASS | files=3, actions=192, sourceUrl=62, sourceTargets=18 |
| human approval repair session pack stays manual and non-publishing | PASS | unsafe=0, publishConfirm=0, readyAfterRepair=0 |
| autopilot review sprint board covers next assignments | PASS | items=10, readyWithPlaybook=3, queued=7, needsQuery=0, unsafe=0 |
| autopilot review sprint board keeps sprint actions human-gated | PASS | ready=10, commands=10, queries=10, sources=10 |
| autopilot search query gap brief covers sprint query gaps | PASS | items=0, sprintNeedsQuery=0, unsafe=0 |
| autopilot search query gap brief has source-backed manual query suggestions | PASS | ready=0, coverage=0, recommended=0, sources=0 |
| autopilot queued playbook brief covers queued sprint items | PASS | items=7, queued=7, unsafe=0 |
| autopilot queued playbook brief has complete human-gated actions | PASS | ready=7, search=7, source=7, links=7 |
| autopilot queued remediation pack covers queued playbook items | PASS | items=7, queued=7, unsafe=0 |
| autopilot queued remediation pack has actionable human fixes | PASS | ready=7, search=7, source=7, links=7 |
| autopilot broad AI demand brief is read-only and source-backed | PASS | clusters=8, sources=24, readyFiles=33, unsafe=0 |
| autopilot broad AI demand brief covers broad search lanes | PASS | clusters=8, withoutPublic=8, withReady=8 |
| autopilot broad freshness triage is read-only and prioritizes high-risk demand candidates | PASS | items=24, highRisk=24, clusters=7, unsafe=0 |
| autopilot broad freshness triage has complete human fact-check packets | PASS | ready=24, factChecks=24, sources=24 |
| autopilot broad publish waves are read-only and small-batch | PASS | waves=8, items=24, maxPerWave=3, unsafe=0 |
| autopilot broad publish waves preserve human approval command boundaries | PASS | ready=24, safe=24, approvalWaves=8 |
| autopilot broad wave optimization is read-only and covers publish waves | PASS | items=24, waves=8, readyWaves=8, unsafe=0 |
| autopilot broad wave optimization has actionable SEO and approval guidance | PASS | ready=24, checklists=24, links=16 |
| autopilot broad wave remediation pack covers optimization items | PASS | items=24, waves=8, readyWaves=8, unsafe=0 |
| autopilot broad wave remediation pack has human-gated fixes | PASS | ready=24, search=24, source=24, linkPlan=24, missingSpecificLinks=8 |
| broad first coverage launch pack is read-only and covers zero-public clusters | PASS | selected=8, zeroPublic=8, unique=8, unsafe=0 |
| broad first coverage launch pack preserves human review boundaries | PASS | safe=8, commands=8, sources=8, checks=8 |
| broad first coverage readiness matrix is read-only and covers launch pack | PASS | items=8, unique=8, blocking=0, unsafe=0 |
| broad first coverage readiness matrix has review evidence and command boundaries | PASS | commands=8, preflight=8, source=8, links=8 |
| human approval execution queue is read-only and covers approval wave | PASS | items=8, immediate=3, backlog=5, promptLanes=5, projected=18 |
| human approval execution queue stays human-gated and excludes publish confirm | PASS | ready=8, sourceDecisions=7, seoWarnings=2, promptLanes=5, publishConfirm=0 |
| human approval clearance pack is read-only and covers the full approval queue | PASS | items=8, immediate=3, backlog=5, failedSources=1, seo=2 |
| human approval clearance pack keeps all work human-gated and action-ready | PASS | ready=8, actions=63, sourceDecisions=3, copydesk=4, publishConfirm=0 |
| review optimization brief is read-only and covers ready action-board tasks | PASS | briefs=16, ready=16, unsafeCommands=0 |
| review optimization brief has actionable copydesk guidance | PASS | withAction=16, missingPublicLinkItems=15, exactQueryWeak=4 |
| search snippet readiness audit is read-only and covers public plus expansion items | PASS | public=15, expansion=19, scoped=34 |
| search snippet readiness audit has no blocking Wave 1 issues | PASS | blocking=0, wave=3, waveBlocking=0, warnings=13 |
| structured data readiness audit is read-only and covers public plus expansion items | PASS | public=15, expansion=19, scoped=34 |
| structured data readiness audit has JSON-LD previews and no blocking Wave 1 issues | PASS | blocking=0, previews=34, wave=3, waveBlocking=0, warnings=7 |
| SEO warning remediation pack is read-only and mirrors snippet/schema warnings | PASS | items=16, snippet=13/13, schema=7/7 |
| SEO warning remediation pack keeps every SEO fix human-gated | PASS | ready=16, public=8, draft=8, gated=16 |
| SEO opportunity map has review-ready drafts | PASS | reviewReadyDrafts=633 |
| SEO opportunity map includes manual review batches | PASS | batches=6 |
| content opportunity backlog has reviewable topics | PASS | topics=7, topicsWithReadyCandidates=7 |
| AI deployment coverage has broad reviewable coverage | PASS | topics=10, withCandidates=10, reviewReady=208, unique=34 |
| AI deployment coverage includes source and search review tasks | PASS | officialSources=12, topics=10 |
| AI deployment candidates stay draft and non-indexable | PASS | unsafeCandidateItems=0 |
| AI deployment review pack is read-only and covers deployment topics | PASS | items=10, topics=10/10, unique=10, duplicates=0 |
| AI deployment review pack has source-backed human review boundaries | PASS | safe=10, sources=10, commands=10 |
| AI deployment sprint board covers deployment tutorials across lanes | PASS | items=10, lanes=7, modes=7, queries=40, sources=12 |
| AI deployment sprint board keeps deployment work human-gated and publish-safe | PASS | ready=10, actions=147, unsafe=0, publishConfirm=0 |
| memory RAG sprint board covers broad searchable memory demand | PASS | lanes=6, queries=24, sources=6, waves=2 |
| memory RAG sprint board keeps memory work human-gated and publish-safe | PASS | candidates=4, ready=4, checks=39, unsafe=0 |
| industry prompt coverage has broad reviewable coverage | PASS | industries=16, withCandidates=16, reviewReady=25, unique=19 |
| industry prompt coverage includes source and search review tasks | PASS | officialSources=5, industries=16 |
| industry prompt candidates stay draft and non-indexable | PASS | unsafeCandidateItems=0 |
| industry prompt review pack is read-only and deduplicated | PASS | items=12, unique=12, duplicates=0 |
| industry prompt review pack has source-backed human review boundaries | PASS | safe=12, sources=12, commands=12, publicPrompt=0 |
| industry prompt opportunity board is broad and read-only | PASS | opportunities=12, lanes=12, queries=60 |
| industry prompt opportunity board has sources, structure, and human boundaries | PASS | safe=true, sources=12, structure=12, modules=60 |
| industry prompt opportunity board connects to reviewable content | PASS | withReviewCandidate=11, zeroPublic=12 |
| industry prompt module pack is read-only and mirrors opportunity modules | PASS | items=12/12, blueprints=60/60 |
| industry prompt module pack has reusable prompt blueprints and human gates | PASS | safe=true, gated=12, copyPrompts=12, reviewBridge=11 |
| search intent lane map is read-only and broad | PASS | lanes=12, highPriority=12, withReadyDrafts=12 |
| search intent lane map includes sources, review focus, and safe candidates | PASS | readyDraftMatches=233, noPublicCoverage=10, notReadyMatched=355 |
| search intent approval packet is read-only and covers current wave plus next gaps | PASS | currentWave=3, nextGap=6, nextGapLanes=3 |
| search intent approval packet has no unsafe items and includes review context | PASS | unsafe=0, currentReady=3, nextGap=6 |
| search intent wave planner is read-only and continuous | PASS | waves=4, items=12, files=12, lanes=6 |
| search intent wave planner keeps all items safe for manual review | PASS | unsafe=0, ready=12, planned=12 |
| search query coverage is read-only and matches planned waves | PASS | items=12, waves=4, files=12, lanes=6 |
| search query coverage has broad user-search variants | PASS | uniqueQueries=360, ready=12, unsafe=0 |
| search query match audit is read-only and covers query plan | PASS | items=12, ready=12, warnings=8 |
| search query match audit has no blocking search-alignment issues | PASS | blocking=0, averageFamilies=7 |
| search demand intake is read-only and covers broad user-search lanes | PASS | lanes=8, readyLanes=8, readyFiles=45, unsafe=0 |
| search demand intake packages sources, formats, and manual review boundaries | PASS | queries=81, sources=29, formats=32, queueMatches=33 |
| search demand review pack is read-only and covers intake lanes | PASS | lanes=8, items=16, maxPerLane=2, unsafe=0 |
| search demand review pack keeps review actions human-gated | PASS | ready=16, commands=16, sources=16, queries=16, factChecks=79 |
| search demand publication bridge is read-only and matches review pack | PASS | items=16, reviewPackItems=16, blocking=0, warnings=16 |
| search demand publication bridge confirms manual approval readiness | PASS | approvalReady=16, snippet=16, schema=16, source=16, links=13 |
| broad search demand map is read-only and covers major demand themes | PASS | themes=10, readyThemes=10, uniqueCandidates=56 |
| broad search demand map links demand, sources, and planned review waves | PASS | officialSources=13, reviewPackMatches=4, waveMatches=24, readyMatches=417 |
| mass AI search action matrix is read-only and covers broad themes | PASS | items=8/8, broad=10, unique=45, traffic=false |
| mass AI search action matrix keeps prompt and deployment work human-gated | PASS | ready=8, deploy=6, prompt=2, unsafe=0 |
| popular AI prompt playbook is read-only and covers broad prompt demand | PASS | items=10, work=3, agent=3, memory=1, sources=12 |
| popular AI prompt playbook keeps templates human-gated and publish-safe | PASS | ready=10, templates=50, queries=127, uniqueFiles=21, publishConfirm=0 |
| popular prompt approval bridge is read-only and covers every popular prompt lane | PASS | lanes=10, next=10, readyNext=10, alreadyQueued=9 |
| popular prompt approval bridge keeps next candidates human-gated and publish-safe | PASS | items=27, ready=27, templates=135, uniqueFiles=10, publishConfirm=0 |
| popular prompt sprint board covers every broad prompt lane | PASS | items=10, queries=115, buckets=4, waves=5 |
| popular prompt sprint board keeps prompt expansion manual and publish-safe | PASS | ready=10, actions=90, nextFiles=10, publishConfirm=0 |
| public coverage gap plan is read-only and covers every no-public broad theme | PASS | gapThemes=8, items=8, uniqueFiles=8, duplicateFiles=0 |
| public coverage gap plan keeps candidates safe for manual review | PASS | ready=8, unsafe=0, waves=4 |
| public coverage gap preflight is read-only and covers gap plan items | PASS | items=13, planItems=8, broadFirst=8, uniqueFiles=13 |
| public coverage gap preflight has no blocking publish-readiness issues | PASS | blocking=0, ready=13, structured=13, seedMatches=12, warnings=13 |
| public coverage gap decision pack is read-only and covers preflight items | PASS | items=13, ready=13, waves=4 |
| public coverage gap decision pack has human review actions and command boundaries | PASS | blocking=0, unsafe=0, commandBoundary=13, optimizations=13 |
| content cannibalization check generated warning report | PASS | conflicts=200, reviewBatchConflicts=0 |
| review cannibalization brief is read-only and covers unique action-board files | PASS | items=13, uniqueActionFiles=13, unsafeCommands=0 |
| review cannibalization brief keeps publish candidates differentiated | PASS | highRisk=1, highPublished=0, highReviewOnly=1, mediumRisk=0, publishedComparisons=0, reviewComparisons=1 |
| review collision decision pack is read-only and covers high-risk overlaps | PASS | decisionItems=1, highRisk=1, blocking=0, unsafe=0 |
| review collision decision pack keeps collision approvals human-gated | PASS | ready=1, commandBoundary=1, reviewOnly=1, published=0, blockedMatched=1 |
| content freshness check covers review items | PASS | highRisk=570, currentReviewItems=3, plannedReviewItems=9 |
| review freshness brief is read-only and covers unique action-board files | PASS | items=13, uniqueActionFiles=13, unsafeCommands=0 |
| review freshness brief has source-backed human fact-check tasks | PASS | ready=13, blocked=0, highRisk=13, withSources=13 |
| review coverage report covers planned candidates | PASS | planned=9, items=9, missingCoverage=0 |
| review coverage includes source, fact-check, approval, and risk tasks | PASS | {"approval":0,"factCheck":0,"risk":0,"sources":0} |
| review coverage keeps planned candidates unpublished and non-indexable | PASS | {"nonDraftItems":0,"reviewBatchConflictItems":0,"unsafeIndexingItems":0} |
| review priority roadmap has enough actionable lanes | PASS | lanes=12, uniqueNextReviewFiles=19 |
| review priority roadmap includes review context | PASS | lanes=12, nextReviewFiles=19 |
| review priority roadmap candidates stay safe | PASS | unsafeCandidates=0 |
| next review source pack covers roadmap files | PASS | items=19, roadmap=19 |
| next review source pack includes source, fact-check, approval, and risk tasks | PASS | {"approval":0,"factCheck":0,"risk":0,"sources":0} |
| next review source pack keeps candidates draft and non-indexable | PASS | unsafeItems=0, safeDraftItems=19 |
| public expansion queue is manual and covers roadmap files | PASS | items=19, waves=7, roadmap=19 |
| public expansion queue only contains source-pack-ready safe drafts | PASS | unsafeItems=0, duplicateFiles=0, sourcePackReadyItems=19 |
| public expansion queue stops before publishing | PASS | publishableNow=0 |
| wave approval packet is manual and ready | PASS | wave=1, items=3, ready=3 |
| wave approval packet has no unsafe items | PASS | unsafeItems=0 |
| wave publish simulation is read-only and human-gated | PASS | {"autoMarkReview":false,"autoPublish":false,"note":"Read-only simulation. It does not run mark:review, publish:articles, or change any article status/noindex value.","stopBeforeHumanApproval":true} |
| wave publish simulation projects only approved Wave 1 items | PASS | wave=1, items=3, ready=3, projected=3 |
| wave publish simulation public total matches project status | PASS | current=15, projectedAfterApproval=3, projectedPublic=18 |
| live search surface check passed | PASS | publicArticles=15, failed=0 |
| public surface inventory is read-only and matches public counts | PASS | public=15, live=15, unsafe=0 |
| public surface inventory identifies broad AI public gaps with candidates | PASS | clusters=8, zeroPublic=8 |
| public search refresh pack is read-only and covers all public pages | PASS | items=15, public=15, seo=8, measuredTraffic=0 |
| public search refresh pack keeps public edits human-gated and action-ready | PASS | ready=15, actions=114, highPriority=12, shortDescriptions=9, publishConfirm=0 |
| public refresh sprint board covers public refresh pack | PASS | items=15, public=15, waves=5, mojibakePublic=9, seo=8, shortDescriptions=9 |
| public refresh sprint board keeps public edits manual and publish-confirm-free | PASS | ready=15, actions=181, unsafe=0, publishConfirm=0 |
| public search refresh session pack covers public sprint waves | PASS | sessions=5, files=15, actions=181, ready=15 |
| public search refresh session pack stays manual and non-publishing | PASS | unsafe=0, publishConfirm=0, traffic=false |
| tool market opportunity map covers broad tool demand safely | PASS | opportunities=8, tools=11, queries=80, public=15 |
| tool market opportunity map includes PPT, spreadsheet and registration actions without publishing | PASS | registrations=5, unsafe=0, publishConfirm=0, traffic=false |
| manual review workbench is ready and stops before publishing | PASS | currentItemsCovered=3, publishableNow=0 |
| manual review workbench includes SEO warning remediation | PASS | workbenchSeo=16, remediation=16, unsafe=0 |
| next batch approval route matches manual review workbench | PASS | batch=1, items=3, workbenchItems=3, public=15, publishable=0 |
| next batch approval route is human-gated and action-ready | PASS | ready=3, actions=38, sourcePack=3, queryCoverage=3, warnings=4, publishConfirm=0 |
| next batch route remediation pack covers route warnings | PASS | batch=1, items=3, warningItems=3, routeWarnings=4, actions=34 |
| next batch route remediation pack stays safe and publish-confirm-free | PASS | ready=3, unsafe=0, publishConfirm=0, clearanceGaps=2, copydeskGaps=1, queryWarnings=1, seoWarnings=1 |
