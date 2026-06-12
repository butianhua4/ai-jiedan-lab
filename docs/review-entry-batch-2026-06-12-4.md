# Review Entry Batch 2026-06-12-4

This fourth batch expands the review pipeline into broad industry prompt demand. It does not publish articles and does not change article status automatically.

## Batch Focus

This batch targets high-frequency work scenarios where many users search for direct AI prompt templates:

- Sales prompts.
- Operations prompts.
- Marketing prompts.
- Data analysis prompts.
- Software development prompts.

These articles should support `/prompts`, the industry prompt builder, and future downloadable template packs.

## Articles

| Article | File | Status | Noindex | Check result | Review lane |
| --- | --- | --- | --- | --- | --- |
| 销售 AI 提示词模板：客户画像、跟进话术、异议处理和会议纪要 | `content/blog/sales-ai-prompts-guide.mdx` | draft | true | 100, no warnings | Sales AI prompts |
| 运营 AI 提示词模板：周报、SOP、活动计划、复盘和数据解释 | `content/blog/operations-ai-prompts-guide.mdx` | draft | true | 100, no warnings | Operations AI prompts |
| 营销 AI 提示词模板：选题、广告文案、SEO 和活动复盘怎么写 | `content/blog/marketing-ai-prompts-guide.mdx` | draft | true | 100, no warnings | Marketing AI prompts |
| 数据分析 AI 提示词模板：指标解释、SQL 思路、异常排查和报告摘要 | `content/blog/data-analysis-ai-prompts-guide.mdx` | draft | true | 100, no warnings | Data analysis AI prompts |
| 软件开发 AI 提示词模板：需求拆解、代码审查、Bug 排查和测试用例 | `content/blog/software-development-ai-prompts-guide.mdx` | draft | true | 100, no warnings | Software development AI prompts |

## What Changed

- Replaced old author branding with `AI 工具指南`.
- Updated `updatedAt` to `2026-06-12`.
- Updated frontmatter `qualityScore` to match the current script result.
- Strengthened `sourceNotes` with official OpenAI documentation targets and practical review boundaries.
- Kept `status: "draft"` and `noindex: true`.

## Official Source Targets

- OpenAI Prompt Engineering: https://platform.openai.com/docs/guides/prompt-engineering
- OpenAI Text Generation: https://platform.openai.com/docs/guides/text-generation
- OpenAI Structured Outputs: https://platform.openai.com/docs/guides/structured-outputs
- OpenAI Safety Best Practices: https://platform.openai.com/docs/guides/safety-best-practices

## Decision

If only three can move forward next, prioritize:

1. `sales-ai-prompts-guide.mdx`
2. `operations-ai-prompts-guide.mdx`
3. `data-analysis-ai-prompts-guide.mdx`

These three cover direct business usage, repeatable templates, and common search intent.

## Do Not Skip

- Do not publish drafts directly.
- Do not mark review without reading the full article.
- Check that every prompt template requires human review for customer, financial, legal, medical, code, or private data contexts.
- Keep measurable traffic or revenue claims out of the article until Search Console or Analytics data exists.
