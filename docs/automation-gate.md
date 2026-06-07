# Automation Gate

Generated at: 2026-06-07T02:06:28.712Z

Overall: PASS

## Summary

- Checks: 107
- Passed: 107
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
| recommended review clusters are diverse | PASS | Agent and memory, Industry AI prompts, RAG and knowledge base |
| SEO safety check passed | PASS | {"leakedDraftOrReview":[],"nonPublishedWithNoindexFalse":[],"publishedButNoindexed":[]} |
| searchability check passed | PASS | score=100, failed=0 |
| searchability check covers llms.txt | PASS | checks=13 |
| draft guardrail sanitizer is clean | PASS | changedFiles=0, totalReplacements=0 |
| no non-published article is indexable | PASS |  |
| all published articles are indexable | PASS |  |
| project status still stops before publishing | PASS | publicPublished=15, publishableNow=0 |
| traffic evidence audit passed and is read-only | PASS | failedChecks=0, measuredTrafficSources=0 |
| traffic is not claimed without measured metrics | PASS | trafficDataAvailable=false, canClaimTraffic=false, claimableMetrics=0 |
| traffic claim guard found no unsupported claims | PASS | filesScanned=125, unsafeClaims=0, watchMentions=1059 |
| content integrity audit is read-only and clean | PASS | filesScanned=669, blockingItems=0 |
| content integrity audit covers public, recommended, and Wave 1 items | PASS | public=15, recommended=3, wave=3 |
| internal link opportunity audit is read-only and covers expansion candidates | PASS | public=15, expansion=19, candidates=19 |
| internal link opportunity audit has public suggestions for Wave 1 | PASS | wave=3, waveMissing=0, candidateMissing=0 |
| source target health audit is read-only and covers review source scopes | PASS | current=3, publicGap=8, next=19, files=20 |
| source target health audit has reachable URLs for every covered review file | PASS | checked=18, ok=18, failed=0, missingTargets=0, filesWithoutReachable=0 |
| review action board is read-only and covers active review queues | PASS | tasks=11, wave=3, publicGap=8 |
| review action board tasks are ready and preserve command boundaries | PASS | ready=11, unsafe=0 |
| review portfolio board deduplicates all review packs | PASS | sourceCandidates=33, uniqueItems=24, duplicates=9, multiSource=7 |
| review portfolio board keeps unique candidates safe and human-gated | PASS | ready=24, safe=24, sources=24, commands=24 |
| autopilot review queue is read-only and covers portfolio candidates | PASS | items=24, next=10, sources=24 |
| autopilot review queue keeps assignments safe and human-gated | PASS | ready=24, safe=24, unsafe=0 |
| autopilot approval packet packages the top safe assignments | PASS | items=3, ready=3, sources=3, queries=3 |
| autopilot approval packet keeps publish and review commands human-gated | PASS | unsafe=0, headings=3 |
| autopilot search intent brief covers approval packet | PASS | items=3, weak=2, unsafe=0 |
| autopilot search intent brief produces human review suggestions | PASS | title=1, description=1, heading=0, body=1 |
| autopilot internal link brief covers approval packet | PASS | items=3, public=15, unsafe=0 |
| autopilot internal link brief provides public link suggestions | PASS | suggestions=3, missingCurrentPublicLink=2, alreadyLinked=1 |
| autopilot source verification brief covers approval packet | PASS | items=3, reachable=21, unsafe=0 |
| autopilot source verification brief provides source-backed review tasks | PASS | reachableItems=3, official=3, factChecks=3, approvalChecks=3 |
| autopilot human review playbook covers approval packet | PASS | items=3, ready=3, unsafe=0 |
| autopilot human review playbook keeps actions human-gated | PASS | commands=3, search=3, source=3, links=3 |
| autopilot review sprint board covers next assignments | PASS | items=10, readyWithPlaybook=3, queued=7, needsQuery=1, unsafe=0 |
| autopilot review sprint board keeps sprint actions human-gated | PASS | ready=10, commands=10, queries=9, sources=10 |
| autopilot search query gap brief covers sprint query gaps | PASS | items=1, sprintNeedsQuery=1, unsafe=0 |
| autopilot search query gap brief has source-backed manual query suggestions | PASS | ready=1, coverage=1, recommended=10, sources=1 |
| autopilot queued playbook brief covers queued sprint items | PASS | items=7, queued=7, unsafe=0 |
| autopilot queued playbook brief has complete human-gated actions | PASS | ready=7, search=7, source=7, links=7 |
| review optimization brief is read-only and covers ready action-board tasks | PASS | briefs=11, ready=11, unsafeCommands=0 |
| review optimization brief has actionable copydesk guidance | PASS | withAction=11, missingPublicLinkItems=10, exactQueryWeak=3 |
| search snippet readiness audit is read-only and covers public plus expansion items | PASS | public=15, expansion=19, scoped=34 |
| search snippet readiness audit has no blocking Wave 1 issues | PASS | blocking=0, wave=3, waveBlocking=0, warnings=13 |
| structured data readiness audit is read-only and covers public plus expansion items | PASS | public=15, expansion=19, scoped=34 |
| structured data readiness audit has JSON-LD previews and no blocking Wave 1 issues | PASS | blocking=0, previews=34, wave=3, waveBlocking=0, warnings=7 |
| SEO opportunity map has review-ready drafts | PASS | reviewReadyDrafts=633 |
| SEO opportunity map includes manual review batches | PASS | batches=6 |
| content opportunity backlog has reviewable topics | PASS | topics=7, topicsWithReadyCandidates=7 |
| AI deployment coverage has broad reviewable coverage | PASS | topics=10, withCandidates=10, reviewReady=208, unique=34 |
| AI deployment coverage includes source and search review tasks | PASS | officialSources=12, topics=10 |
| AI deployment candidates stay draft and non-indexable | PASS | unsafeCandidateItems=0 |
| AI deployment review pack is read-only and covers deployment topics | PASS | items=10, topics=10/10, unique=10, duplicates=0 |
| AI deployment review pack has source-backed human review boundaries | PASS | safe=10, sources=10, commands=10 |
| industry prompt coverage has broad reviewable coverage | PASS | industries=16, withCandidates=16, reviewReady=25, unique=19 |
| industry prompt coverage includes source and search review tasks | PASS | officialSources=5, industries=16 |
| industry prompt candidates stay draft and non-indexable | PASS | unsafeCandidateItems=0 |
| industry prompt review pack is read-only and deduplicated | PASS | items=12, unique=12, duplicates=0 |
| industry prompt review pack has source-backed human review boundaries | PASS | safe=12, sources=12, commands=12, publicPrompt=0 |
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
| broad search demand map is read-only and covers major demand themes | PASS | themes=10, readyThemes=10, uniqueCandidates=56 |
| broad search demand map links demand, sources, and planned review waves | PASS | officialSources=13, reviewPackMatches=4, waveMatches=24, readyMatches=417 |
| public coverage gap plan is read-only and covers every no-public broad theme | PASS | gapThemes=8, items=8, uniqueFiles=8, duplicateFiles=0 |
| public coverage gap plan keeps candidates safe for manual review | PASS | ready=8, unsafe=0, waves=4 |
| public coverage gap preflight is read-only and covers gap plan items | PASS | items=8, planItems=8, uniqueFiles=8 |
| public coverage gap preflight has no blocking publish-readiness issues | PASS | blocking=0, ready=8, structured=8, seedMatches=7, warnings=8 |
| public coverage gap decision pack is read-only and covers preflight items | PASS | items=8, ready=8, waves=4 |
| public coverage gap decision pack has human review actions and command boundaries | PASS | blocking=0, unsafe=0, commandBoundary=8, optimizations=8 |
| content cannibalization check generated warning report | PASS | conflicts=200, reviewBatchConflicts=0 |
| review cannibalization brief is read-only and covers unique action-board files | PASS | items=9, uniqueActionFiles=9, unsafeCommands=0 |
| review cannibalization brief keeps publish candidates differentiated | PASS | highRisk=0, mediumRisk=0, publishedComparisons=0, reviewComparisons=0 |
| content freshness check covers review items | PASS | highRisk=570, currentReviewItems=3, plannedReviewItems=9 |
| review freshness brief is read-only and covers unique action-board files | PASS | items=9, uniqueActionFiles=9, unsafeCommands=0 |
| review freshness brief has source-backed human fact-check tasks | PASS | ready=9, blocked=0, highRisk=9, withSources=9 |
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
| manual review workbench is ready and stops before publishing | PASS | currentItemsCovered=3, publishableNow=0 |
