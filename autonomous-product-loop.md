# Autonomous Product Loop

This project should not stop at health checks. The autonomous loop makes Codex act as a conservative product manager and engineer for the SEO Growth Engine.

## Core Rule

Each run advances one clear, low-risk objective:

1. Observe the real state.
2. Diagnose the current bottleneck.
3. Decide the best next task.
4. Execute only if the task is low risk and allowed.
5. Verify with required checks.
6. Commit only when explicitly allowed and verification passes.
7. Report what happened and what should happen next.

## Observe

The loop reads:

- System Live status
- SEO graph
- SEO growth report
- logs
- sitemap state
- content status
- tool status
- conversion entry status
- latest commit
- latest local reports

It does not invent Search Console, Bing, Analytics, Clarity, Ahrefs, or revenue data.

## Diagnose

Known bottleneck classes:

- slow indexing
- q pages not yet exposed
- weak cluster authority
- insufficient tools
- weak CTA paths
- weak template conversion
- low title click-through potential
- incomplete Chinese/English structure
- unstable domestic access
- missing monetization entry
- missing user behavior data

## Decide

Only one task is selected per run.

Priorities:

- P0: fix problems affecting build, deployment, crawlability, or indexing
- P1: improve SEO crawling and structure
- P2: improve conversion entry points
- P3: improve or add tools
- P4: improve content production pipeline
- P5: improve visual quality and UX

## Execute

Guardrails:

- maximum 20 changed files
- maximum 8 added files
- maximum 3 deleted files
- no destructive URL migrations
- no bulk publication of unreviewed content
- no DNS, domain, payment, ad account, or Search Console permission changes
- no low-quality duplicate content
- no claim that unexecuted work was completed

If a task has no safe executor, the loop writes a planning artifact and report only.

## Verify

Required checks after source changes:

```bash
npm run lint
npm run seo:check
npm run build
```

Additional checks when relevant:

```bash
npm run live:check -- --url=https://ai.aporet.com
npm run searchability:check
npm run deploy:freshness -- --url=https://ai.aporet.com
```

## Commit

Automated commits are allowed only when explicitly enabled by environment or workflow mode.

Commit message format:

```text
auto: advance seo growth loop - YYYY-MM-DD - short-task-name
```

## Report

Every run writes a report under:

```text
reports/autonomous-loop/YYYY-MM-DDTHH-mm.md
```

The report must include:

- stage judgment
- discovered bottleneck
- selected task
- why it was selected
- changed files
- verification results
- risk notes
- next recommended tasks

