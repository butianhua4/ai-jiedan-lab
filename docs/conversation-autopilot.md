# Conversation Autopilot Protocol

Generated at: 2026-06-19

## Purpose

This protocol defines how this Codex conversation should continue work without waiting for repeated manual prompts.

## Active Thread Goal

Continue advancing the AI Tools Guide / AI SEO Growth Engine:

- Check latest deployment and automation status.
- Repair blocking issues.
- Refresh GSC, sitemap, SEO, and traffic-evidence queues.
- Improve exposure and indexing readiness.
- Commit and push verified improvements.
- Report only evidence-backed status.

## What Can Be Automated Inside This Project

- GitHub Actions can run scheduled SEO autopilot checks.
- The repository can refresh reports and next-action queues.
- The site can expose updated sitemap, q, cluster, blog, and English entry pages.
- The project can record verified build, SEO, link, and live-probe health.

## What Cannot Be Honestly Automated From This Chat Alone

- The assistant cannot wake itself and send a new chat message unless the host app exposes a conversation automation / reminder tool.
- At the time this protocol was created, no `automation_update` tool was available in the active tool list.
- Google Search Console URL Inspection requests still require a logged-in GSC UI action or an authenticated API integration.

## Resume Rule

When this conversation resumes, continue in this order:

1. Run `git status --short` and inspect the latest commit.
2. Check latest GitHub/Vercel status.
3. Run `npm run seo:autopilot-loop -- --url=https://ai.aporet.com`.
4. If the loop reports red or critical failures, fix those first.
5. If green or yellow-only, continue the next action from `docs/seo-autopilot-loop.md`.
6. Keep GSC manual targets focused on `/en`, cluster pages, and high-intent q pages.
7. Do not claim traffic, clicks, rankings, revenue, or indexed count unless there is real evidence.
8. Commit and push verified changes.

## Current Manual GSC Target

`https://ai.aporet.com/en`

After that:

- `/cluster/ai-tools`
- `/cluster/codex`
- `/cluster/github`
- `/cluster/node-js-errors`
- `/cluster/upwork`
- `/cluster/vercel`

Then use the first remaining q pages from:

- `docs/gsc-url-inspection-top-100.txt`
- `docs/gsc-url-inspection-top-500.txt`
