# SEO Growth Daily Ops

Generated at: 2026-06-18T05:15:09.997Z

## Guardrails

- Fake traffic claims: false
- Manual GSC only: true
- Note: This workflow does not claim indexing, ranking, impressions, clicks, or income. It uses local SEO structure and Search Console operating rules.

## Current Growth State

- Growth stage: warming
- Total pages: 1006
- Q pages: 500
- Cluster pages: 6
- Blog pages: 500
- Orphan pages: 0
- Weak pages: 0
- Internal link health: 100
- Growth readiness score: 100

## Daily GSC Actions

1. Submit sitemap index: https://ai-jiedan-lab.vercel.app/sitemap.xml
2. Manual URL Inspection limit: 10
3. Rule: Submit sitemap.xml first in GSC. Then use URL Inspection for 5-15 URLs from todayBatch. Do not request indexing for hundreds of URLs in one day.

### Today URL Inspection Batch

1. https://ai-jiedan-lab.vercel.app/q/node-js-errors/eslint-error-should-not-disable (q, node-js-errors, score 76)
2. https://ai-jiedan-lab.vercel.app/q/github/failed-to-push-some-refs-fix (q, github, score 75)
3. https://ai-jiedan-lab.vercel.app/q/github/git-authentication-failed-fix (q, github, score 74)
4. https://ai-jiedan-lab.vercel.app/q/github/github-actions-build-log-debug (q, github, score 73)
5. https://ai-jiedan-lab.vercel.app/q/vercel/llm-api-integration-deployment-checklist (q, vercel, score 72)
6. https://ai-jiedan-lab.vercel.app/q/node-js-errors/module-not-found-debug (q, node-js-errors, score 71)
7. https://ai-jiedan-lab.vercel.app/q/node-js-errors/nextjs-hydration-error-debug (q, node-js-errors, score 70)
8. https://ai-jiedan-lab.vercel.app/q/github/package-lock-conflict-fix (q, github, score 69)
9. https://ai-jiedan-lab.vercel.app/q/vercel/replicate-api-ai-demo-guide (q, vercel, score 68)
10. https://ai-jiedan-lab.vercel.app/q/upwork/ai-freelance-failure-review (q, upwork, score 67)

## Daily Content Actions

- Target format: problem-entry page
- Avoid format: generic AI tool introduction
- Rule: Prioritize concrete searched problems: exact error, quick fix, detailed steps, command/code, risks, related q pages, and one deep blog link.

### Codex errors and setup

- Reason: Codex setup and error searches are concrete, urgent, and easier to rank than broad AI tool posts.
- Publishing rule: Write exact error, cause, fix steps, rollback, and a safe verification checklist.
- Keywords: codex, npm, install, rollback, windows
- Current q examples:
  - https://ai-jiedan-lab.vercel.app/q/codex/codex-bugfix-rollback-record
  - https://ai-jiedan-lab.vercel.app/q/codex/codex-npm-install-errors
  - https://ai-jiedan-lab.vercel.app/q/codex/codex-vercel-deployment
  - https://ai-jiedan-lab.vercel.app/q/codex/codex-windows-install-failed
  - https://ai-jiedan-lab.vercel.app/q/vercel/dev-works-build-fails

### Vercel deployment failures

- Reason: Deployment errors create high-intent searches and naturally connect to tools and services.
- Publishing rule: Start from the failure message, then cover logs, env vars, routing, build command, and rollback.
- Keywords: vercel, deploy, build, env, 404
- Current q examples:
  - https://ai-jiedan-lab.vercel.app/q/vercel/agent-production-deployment-checklist
  - https://ai-jiedan-lab.vercel.app/q/codex/codex-vercel-deployment
  - https://ai-jiedan-lab.vercel.app/q/vercel/dev-works-build-fails
  - https://ai-jiedan-lab.vercel.app/q/vercel/env-variable-missing-fix
  - https://ai-jiedan-lab.vercel.app/q/github/github-actions-build-log-debug

### GitHub Actions and Git failures

- Reason: CI and Git failures are searched by exact phrase and support frequent q-page expansion.
- Publishing rule: Use a problem-first title, include commands, expected output, and when to avoid destructive fixes.
- Keywords: github, actions, push, authentication, package-lock
- Current q examples:
  - https://ai-jiedan-lab.vercel.app/q/github/failed-to-push-some-refs-fix
  - https://ai-jiedan-lab.vercel.app/q/github/git-authentication-failed-fix
  - https://ai-jiedan-lab.vercel.app/q/github/github-actions-build-log-debug
  - https://ai-jiedan-lab.vercel.app/q/github/package-lock-conflict-fix
  - https://ai-jiedan-lab.vercel.app/q/github/github-command-cheatsheet-beginner

### Agent deployment and tool permissions

- Reason: Agent deployment is growing but needs practical, safety-aware pages instead of generic agent theory.
- Publishing rule: Cover permission boundaries, logs, human approval, tool allowlists, and production checks.
- Keywords: agent, tool, permission, deployment, observability
- Current q examples:
  - https://ai-jiedan-lab.vercel.app/q/ai-tools/agent-observability-logging-guide
  - https://ai-jiedan-lab.vercel.app/q/vercel/agent-production-deployment-checklist
  - https://ai-jiedan-lab.vercel.app/q/ai-tools/agent-tool-calling-beginner-guide
  - https://ai-jiedan-lab.vercel.app/q/ai-tools/agent-tool-permission-safety-guide
  - https://ai-jiedan-lab.vercel.app/q/ai-tools/ai-prompt-library-team-knowledge-base-guide

### RAG memory and retrieval issues

- Reason: Searchers confuse RAG and memory; clear troubleshooting pages can become strong evergreen entries.
- Publishing rule: Separate RAG, user memory, vector search, citations, deletion, and evaluation.
- Keywords: rag, memory, vector, pgvector, retrieval
- Current q examples:
  - https://ai-jiedan-lab.vercel.app/q/upwork/ai-automation-project-pricing-scope-guide

### API keys, rate limits, and model routing

- Reason: API failures are high-frequency and commercial because users need working integrations.
- Publishing rule: Explain the error, server-side key handling, backoff, queues, cost caps, and log redaction.
- Keywords: api, key, rate, limit, claude, openai
- Current q examples:
  - https://ai-jiedan-lab.vercel.app/q/ai-tools/claude-api-rate-limit-debug-guide
  - https://ai-jiedan-lab.vercel.app/q/vercel/llm-api-integration-deployment-checklist
  - https://ai-jiedan-lab.vercel.app/q/vercel/replicate-api-ai-demo-guide
  - https://ai-jiedan-lab.vercel.app/q/upwork/claude-code-low-risk-freelance-jobs
