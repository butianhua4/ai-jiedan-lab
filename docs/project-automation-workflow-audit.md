# Project Automation Workflow Audit

Generated at: 2026-06-07T20:38:24.117Z

This report is read-only. It verifies that scheduled project automation runs reports and gates, but does not review or publish articles.

## Guardrails

- autoMarkReview: false
- autoPublish: false
- note: Read-only workflow audit. It verifies that scheduled project automation runs reports and gates, but does not review or publish articles.
- stopBefore: Stop before mark:review, publish dry-run, or publish confirm. Human approval is required for every status or publishing change.
- trafficClaim: not-included

## Summary

- automationWorkflowPresent: true
- checks: 10
- contentCheckWorkflowPresent: true
- failed: 0
- forbiddenWorkflowCommands: 0
- manualDispatchEnabled: true
- passed: 10
- pushMainEnabled: true
- reportArtifactEnabled: true
- scheduledReportCommitGated: true
- scheduleCount: 4
- trafficDataAvailable: false

## Failed Checks

- none

## Checks

| Check | Result | Detail |
| --- | --- | --- |
| project automation workflow exists | PASS | .github/workflows/review-automation.yml |
| project automation runs on main push | PASS | push branches include main |
| project automation supports manual dispatch | PASS | workflow_dispatch is present |
| project automation has frequent scheduled runs | PASS | scheduleCount=4 |
| project automation runs the full read-only automation chain | PASS | npm run automation:all is present |
| project automation refreshes live search and digest surfaces | PASS | live:check, automation:gate, and automation:digest are present |
| project automation exposes reports as job summary and artifact | PASS | job summary and upload-artifact are present |
| scheduled report commits are limited to schedule or manual dispatch | PASS | report commit step is event-gated |
| workflow does not run review or publish commands | PASS | no mark:review or publish:articles commands found in workflows |
| content check still builds the public site | PASS | content:check and build are present |
