# Automation Gate

Generated at: 2026-06-06T12:36:23.027Z

Overall: PASS

## Summary

- Checks: 43
- Passed: 43
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
| SEO opportunity map has review-ready drafts | PASS | reviewReadyDrafts=633 |
| SEO opportunity map includes manual review batches | PASS | batches=6 |
| content opportunity backlog has reviewable topics | PASS | topics=7, topicsWithReadyCandidates=7 |
| AI deployment coverage has broad reviewable coverage | PASS | topics=10, withCandidates=10, reviewReady=208, unique=34 |
| AI deployment coverage includes source and search review tasks | PASS | officialSources=12, topics=10 |
| AI deployment candidates stay draft and non-indexable | PASS | unsafeCandidateItems=0 |
| industry prompt coverage has broad reviewable coverage | PASS | industries=16, withCandidates=16, reviewReady=25, unique=19 |
| industry prompt coverage includes source and search review tasks | PASS | officialSources=5, industries=16 |
| industry prompt candidates stay draft and non-indexable | PASS | unsafeCandidateItems=0 |
| content cannibalization check generated warning report | PASS | conflicts=200, reviewBatchConflicts=0 |
| content freshness check covers review items | PASS | highRisk=570, currentReviewItems=3, plannedReviewItems=9 |
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
| live search surface check passed | PASS | publicArticles=15, failed=0 |
| manual review workbench is ready and stops before publishing | PASS | currentItemsCovered=3, publishableNow=0 |
