# Traffic Evidence Audit

Generated at: 2026-06-19T16:20:27.959Z

This report separates live-site health from measured traffic. It does not claim visits, clicks, impressions, rankings, or revenue.

## Guardrails

- Auto publish: false
- Note: This audit checks evidence for traffic measurement. It does not claim visits, clicks, impressions, rankings, or Search Console performance data.

## Summary

- Base: https://ai.aporet.com
- canClaimTraffic: false
- claimableMetrics: 0
- failedChecks: 0
- measuredTrafficSources: 1
- searchConsoleVerificationEvidence: false
- trafficDataAvailable: false
- Measured traffic sources: google-analytics

## Evidence

Environment:

- googleAnalyticsId: false
- googleSiteVerification: false
- vercelAnalyticsId: false

Code:

- googleAnalyticsDependency: false
- googleAnalyticsSnippet: true
- googleSiteVerificationMeta: true
- vercelAnalyticsDependency: false
- vercelAnalyticsSnippet: false

Live HTML:

- attempts: 1
- fetched: true
- googleAnalyticsSnippet: true
- googleSiteVerificationMeta: false
- status: 200
- vercelAnalyticsSnippet: false

## Checks

| Check | Status | Detail |
| --- | --- | --- |
| live homepage fetched | PASS | 200 after 1 attempt(s) |
| traffic data is not claimed without measured source | PASS | measuredTrafficSources=1, claimableMetrics=0 |
| search console status is evidence-based | PASS | no verification evidence detected in env or live HTML |
| privacy page mentions analytics possibility | PASS | privacy notice should be reviewed before adding tracking scripts |

## Next Actions

- Connect an authenticated export/API before reporting visits, clicks, impressions, or conversion metrics.
- Keep public reports separate from measured traffic until metrics are imported into content/automation.
