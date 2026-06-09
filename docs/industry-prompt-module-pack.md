# Industry Prompt Module Pack

Generated at: 2026-06-09T05:45:47.169Z

This report is read-only. It turns cross-industry AI prompt opportunities into reusable prompt blueprints for human article review.

## Guardrails

- Auto create articles: false
- Auto edit articles: false
- Auto mark review: false
- Auto publish: false
- Stop before: Stop before mark:review and stop before publish. Human approval is required for every article.
- Traffic claim: No measured traffic, impressions, rankings, clicks, revenue, or conversion outcomes are claimed.
- Note: Read-only prompt module pack. It deepens cross-industry AI prompt opportunities into reusable prompt blueprints without editing, reviewing, or publishing articles.

## Source Evidence

- Search date: 2026-06-07
- Search note: External sources were used as current category signals only; they are not traffic-volume evidence.

Official prompt sources:

- https://platform.openai.com/docs/guides/prompt-engineering
- https://platform.openai.com/docs/guides/prompt-generation
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- https://support.google.com/docs/answer/15013615
- https://adoption.microsoft.com/en-us/copilot/prompt-gallery/

Market signal sources:

- https://pmtly.com/: Prompt libraries commonly split business prompts by marketing, sales, finance, HR, customer support, operations, legal, project management, development, and data analytics.
- https://www.fwdslash.ai/prompt-template: Recent prompt-template pages emphasize reusable templates with role context, variables, output format, and model-agnostic usage.
- https://sensara.io/prompts/: Business prompt libraries are organized around client communication, marketing, operations, hiring, reports, customer service, sales, and content creation.
- https://adoption.microsoft.com/en-us/copilot/prompt-gallery/: Microsoft Copilot's prompt gallery exposes role and task filters such as communication, finance, HR, IT, operations, content creation, reporting, and summarization.
- https://www.promptfluent.com/browse: Enterprise prompt-library examples stress role-specific prompt governance for sales, HR, finance, operations, legal, customer service, and software development.

## Summary

- humanGatedItems: 12
- items: 12
- itemsWithCopyPrompts: 12
- itemsWithInputOutputStructure: 12
- itemsWithReviewPackCandidate: 11
- itemsWithRiskControls: 12
- itemsWithSourceTargets: 12
- modulesPerOpportunityMax: 5
- modulesPerOpportunityMin: 5
- promptBlueprints: 60
- sourceOpportunityModules: 60
- sourceOpportunityUnsafeItems: 0
- sourceReviewPackUnsafeItems: 0
- unsafeItems: 0
- zeroPublicCoverageItems: 12

## Unsafe Items

- none

## Top Items

| Ready | Safe bridge | Score | Public | Modules | Queries | Lane | Primary query | Candidate files |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| true | true | 226 | 0 | 5 | 4 | customer-service-ai-prompts | 客服 AI 回复模板 | content/blog/industry-ai-prompts-template-library-2026.mdx<br>content/blog/customer-service-ai-prompts-guide.mdx<br>content/blog/ecommerce-ai-prompts-guide.mdx |
| true | true | 216 | 0 | 5 | 4 | sales-ai-prompts | 销售 AI 提示词 | content/blog/industry-ai-prompts-template-library-2026.mdx<br>content/blog/sales-ai-prompts-guide.mdx |
| true | true | 212 | 0 | 5 | 4 | hr-ai-prompts | HR AI 提示词 | content/blog/industry-ai-prompts-template-library-2026.mdx<br>content/blog/hr-recruiting-ai-prompts-guide.mdx |
| true | true | 208 | 0 | 5 | 4 | operations-ai-prompts | 运营 AI 提示词 | content/blog/industry-ai-prompts-template-library-2026.mdx<br>content/blog/manufacturing-ai-prompts-guide.mdx |
| true | true | 206 | 0 | 5 | 4 | finance-ai-prompts | 财务 AI 提示词 | content/blog/industry-ai-prompts-template-library-2026.mdx<br>content/blog/finance-ai-prompts-guide.mdx |
| true | true | 204 | 0 | 5 | 4 | education-ai-prompts | 教师 AI 提示词 | content/blog/industry-ai-prompts-template-library-2026.mdx<br>content/blog/education-ai-prompts-guide.mdx |
| true | true | 202 | 0 | 5 | 4 | product-manager-ai-prompts | 产品经理 AI 提示词 | content/blog/software-development-ai-prompts-guide.mdx<br>content/blog/product-manager-ai-prompts-guide.mdx |
| true | true | 198 | 0 | 5 | 4 | marketing-ai-prompts | 营销 AI 提示词 | content/blog/marketing-ai-prompts-guide.mdx |

## Prompt Blueprint Samples

### 客服 AI 回复模板

- Lane: customer-service-ai-prompts
- Audience: support teams, after-sales teams, customer success teams
- Deliverable: Customer support prompt pack with ticket triage, empathy reply, escalation, refund boundary, and knowledge-base update.
- Review candidates: content/blog/industry-ai-prompts-template-library-2026.mdx, content/blog/customer-service-ai-prompts-guide.mdx, content/blog/ecommerce-ai-prompts-guide.mdx
- Human boundary: Create or review only as draft/noindex/humanReviewRequired. Stop before mark:review and stop before publish until explicit human approval.

Manual review actions:

- Use the prompt blueprints as article expansion material only during human review.
- If no review candidate exists, keep this as a future draft idea and do not create an article automatically.
- Confirm every example requires user-provided facts and marks unknowns instead of inventing data.
- Keep the article draft/noindex/humanReviewRequired until explicit approval.
- Stop before mark:review; publishing requires a separate explicit approval.

#### 客服 AI 回复模板 - complaint response

Input fields:

- customer message
- policy excerpt
- order context
- support channel
- severity
- allowed next actions

Output blocks:

- ticket category
- draft reply
- escalation reason
- policy check
- knowledge-base note

Copy prompt:

```text
You are assisting with complaint response for support teams, after-sales teams, customer success teams.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 客服 AI 回复模板.
Business context: {{customer message}}, {{policy excerpt}}, {{order context}}, {{support channel}}, {{severity}}, {{allowed next actions}}.
Return these sections: ticket category, draft reply, escalation reason, policy check, knowledge-base note.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Refund, privacy, abuse, and safety issues must route to a human owner.
Module order: 1 of 5.
```

#### 客服 AI 回复模板 - support ticket classifier

Input fields:

- customer message
- policy excerpt
- order context
- support channel
- severity
- allowed next actions

Output blocks:

- ticket category
- draft reply
- escalation reason
- policy check
- knowledge-base note

Copy prompt:

```text
You are assisting with support ticket classifier for support teams, after-sales teams, customer success teams.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 客服 AI 回复模板.
Business context: {{customer message}}, {{policy excerpt}}, {{order context}}, {{support channel}}, {{severity}}, {{allowed next actions}}.
Return these sections: ticket category, draft reply, escalation reason, policy check, knowledge-base note.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Refund, privacy, abuse, and safety issues must route to a human owner.
Module order: 2 of 5.
```

### 销售 AI 提示词

- Lane: sales-ai-prompts
- Audience: sales teams, founders, account managers
- Deliverable: Sales prompt pack with prospect research, discovery questions, objection handling, follow-up, and CRM summary.
- Review candidates: content/blog/industry-ai-prompts-template-library-2026.mdx, content/blog/sales-ai-prompts-guide.mdx
- Human boundary: Create or review only as draft/noindex/humanReviewRequired. Stop before mark:review and stop before publish until explicit human approval.

Manual review actions:

- Use the prompt blueprints as article expansion material only during human review.
- If no review candidate exists, keep this as a future draft idea and do not create an article automatically.
- Confirm every example requires user-provided facts and marks unknowns instead of inventing data.
- Keep the article draft/noindex/humanReviewRequired until explicit approval.
- Stop before mark:review; publishing requires a separate explicit approval.

#### 销售 AI 提示词 - prospect research brief

Input fields:

- target customer
- offer
- deal stage
- known objections
- tone
- next step

Output blocks:

- prospect brief
- discovery questions
- objection responses
- follow-up email
- CRM update

Copy prompt:

```text
You are assisting with prospect research brief for sales teams, founders, account managers.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 销售 AI 提示词.
Business context: {{target customer}}, {{offer}}, {{deal stage}}, {{known objections}}, {{tone}}, {{next step}}.
Return these sections: prospect brief, discovery questions, objection responses, follow-up email, CRM update.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Do not present persuasive scripts as guaranteed conversion tactics.
Module order: 1 of 5.
```

#### 销售 AI 提示词 - discovery call planner

Input fields:

- target customer
- offer
- deal stage
- known objections
- tone
- next step

Output blocks:

- prospect brief
- discovery questions
- objection responses
- follow-up email
- CRM update

Copy prompt:

```text
You are assisting with discovery call planner for sales teams, founders, account managers.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 销售 AI 提示词.
Business context: {{target customer}}, {{offer}}, {{deal stage}}, {{known objections}}, {{tone}}, {{next step}}.
Return these sections: prospect brief, discovery questions, objection responses, follow-up email, CRM update.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Do not present persuasive scripts as guaranteed conversion tactics.
Module order: 2 of 5.
```

### HR AI 提示词

- Lane: hr-ai-prompts
- Audience: HR teams, recruiters, people operations
- Deliverable: HR prompt pack with JD draft, interview rubric, onboarding plan, performance review, and policy summary.
- Review candidates: content/blog/industry-ai-prompts-template-library-2026.mdx, content/blog/hr-recruiting-ai-prompts-guide.mdx
- Human boundary: Create or review only as draft/noindex/humanReviewRequired. Stop before mark:review and stop before publish until explicit human approval.

Manual review actions:

- Use the prompt blueprints as article expansion material only during human review.
- If no review candidate exists, keep this as a future draft idea and do not create an article automatically.
- Confirm every example requires user-provided facts and marks unknowns instead of inventing data.
- Keep the article draft/noindex/humanReviewRequired until explicit approval.
- Stop before mark:review; publishing requires a separate explicit approval.

#### HR AI 提示词 - JD writer

Input fields:

- role
- seniority
- must-have skills
- company context
- evaluation rubric
- legal constraints

Output blocks:

- job description
- screening criteria
- interview questions
- onboarding checklist
- review notes

Copy prompt:

```text
You are assisting with JD writer for HR teams, recruiters, people operations.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: HR AI 提示词.
Business context: {{role}}, {{seniority}}, {{must-have skills}}, {{company context}}, {{evaluation rubric}}, {{legal constraints}}.
Return these sections: job description, screening criteria, interview questions, onboarding checklist, review notes.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Avoid discriminatory criteria and require HR/legal review for people decisions.
Module order: 1 of 5.
```

#### HR AI 提示词 - interview rubric builder

Input fields:

- role
- seniority
- must-have skills
- company context
- evaluation rubric
- legal constraints

Output blocks:

- job description
- screening criteria
- interview questions
- onboarding checklist
- review notes

Copy prompt:

```text
You are assisting with interview rubric builder for HR teams, recruiters, people operations.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: HR AI 提示词.
Business context: {{role}}, {{seniority}}, {{must-have skills}}, {{company context}}, {{evaluation rubric}}, {{legal constraints}}.
Return these sections: job description, screening criteria, interview questions, onboarding checklist, review notes.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Avoid discriminatory criteria and require HR/legal review for people decisions.
Module order: 2 of 5.
```

### 运营 AI 提示词

- Lane: operations-ai-prompts
- Audience: operations managers, project owners, internal workflow teams
- Deliverable: Operations prompt pack with SOP, weekly report, meeting summary, project risk list, and retrospective.
- Review candidates: content/blog/industry-ai-prompts-template-library-2026.mdx, content/blog/manufacturing-ai-prompts-guide.mdx
- Human boundary: Create or review only as draft/noindex/humanReviewRequired. Stop before mark:review and stop before publish until explicit human approval.

Manual review actions:

- Use the prompt blueprints as article expansion material only during human review.
- If no review candidate exists, keep this as a future draft idea and do not create an article automatically.
- Confirm every example requires user-provided facts and marks unknowns instead of inventing data.
- Keep the article draft/noindex/humanReviewRequired until explicit approval.
- Stop before mark:review; publishing requires a separate explicit approval.

#### 运营 AI 提示词 - SOP builder

Input fields:

- process goal
- current notes
- owners
- timeline
- constraints
- acceptance criteria

Output blocks:

- SOP steps
- weekly summary
- owners and dates
- risk list
- retrospective actions

Copy prompt:

```text
You are assisting with SOP builder for operations managers, project owners, internal workflow teams.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 运营 AI 提示词.
Business context: {{process goal}}, {{current notes}}, {{owners}}, {{timeline}}, {{constraints}}, {{acceptance criteria}}.
Return these sections: SOP steps, weekly summary, owners and dates, risk list, retrospective actions.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Operational actions must keep owners, deadlines, and acceptance criteria explicit.
Module order: 1 of 5.
```

#### 运营 AI 提示词 - weekly report drafter

Input fields:

- process goal
- current notes
- owners
- timeline
- constraints
- acceptance criteria

Output blocks:

- SOP steps
- weekly summary
- owners and dates
- risk list
- retrospective actions

Copy prompt:

```text
You are assisting with weekly report drafter for operations managers, project owners, internal workflow teams.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 运营 AI 提示词.
Business context: {{process goal}}, {{current notes}}, {{owners}}, {{timeline}}, {{constraints}}, {{acceptance criteria}}.
Return these sections: SOP steps, weekly summary, owners and dates, risk list, retrospective actions.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Operational actions must keep owners, deadlines, and acceptance criteria explicit.
Module order: 2 of 5.
```

### 财务 AI 提示词

- Lane: finance-ai-prompts
- Audience: finance teams, founders, business analysts
- Deliverable: Finance prompt pack with variance narrative, budget review, cost driver summary, forecast assumptions, and board memo.
- Review candidates: content/blog/industry-ai-prompts-template-library-2026.mdx, content/blog/finance-ai-prompts-guide.mdx
- Human boundary: Create or review only as draft/noindex/humanReviewRequired. Stop before mark:review and stop before publish until explicit human approval.

Manual review actions:

- Use the prompt blueprints as article expansion material only during human review.
- If no review candidate exists, keep this as a future draft idea and do not create an article automatically.
- Confirm every example requires user-provided facts and marks unknowns instead of inventing data.
- Keep the article draft/noindex/humanReviewRequired until explicit approval.
- Stop before mark:review; publishing requires a separate explicit approval.

#### 财务 AI 提示词 - variance analysis explainer

Input fields:

- source numbers
- period
- comparison baseline
- known anomalies
- audience
- decision needed

Output blocks:

- variance summary
- cost drivers
- assumptions
- risk flags
- board-ready narrative

Copy prompt:

```text
You are assisting with variance analysis explainer for finance teams, founders, business analysts.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 财务 AI 提示词.
Business context: {{source numbers}}, {{period}}, {{comparison baseline}}, {{known anomalies}}, {{audience}}, {{decision needed}}.
Return these sections: variance summary, cost drivers, assumptions, risk flags, board-ready narrative.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. AI output must not replace accounting, tax, audit, or investment judgment.
Module order: 1 of 5.
```

#### 财务 AI 提示词 - budget review memo

Input fields:

- source numbers
- period
- comparison baseline
- known anomalies
- audience
- decision needed

Output blocks:

- variance summary
- cost drivers
- assumptions
- risk flags
- board-ready narrative

Copy prompt:

```text
You are assisting with budget review memo for finance teams, founders, business analysts.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 财务 AI 提示词.
Business context: {{source numbers}}, {{period}}, {{comparison baseline}}, {{known anomalies}}, {{audience}}, {{decision needed}}.
Return these sections: variance summary, cost drivers, assumptions, risk flags, board-ready narrative.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. AI output must not replace accounting, tax, audit, or investment judgment.
Module order: 2 of 5.
```

### 教师 AI 提示词

- Lane: education-ai-prompts
- Audience: teachers, trainers, course creators
- Deliverable: Education prompt pack with lesson plan, quiz, student feedback, learning plan, and teaching-material rewrite.
- Review candidates: content/blog/industry-ai-prompts-template-library-2026.mdx, content/blog/education-ai-prompts-guide.mdx
- Human boundary: Create or review only as draft/noindex/humanReviewRequired. Stop before mark:review and stop before publish until explicit human approval.

Manual review actions:

- Use the prompt blueprints as article expansion material only during human review.
- If no review candidate exists, keep this as a future draft idea and do not create an article automatically.
- Confirm every example requires user-provided facts and marks unknowns instead of inventing data.
- Keep the article draft/noindex/humanReviewRequired until explicit approval.
- Stop before mark:review; publishing requires a separate explicit approval.

#### 教师 AI 提示词 - lesson planner

Input fields:

- grade level
- topic
- learning objective
- student context
- timebox
- assessment method

Output blocks:

- lesson objective
- activity plan
- quiz items
- feedback notes
- adaptation plan

Copy prompt:

```text
You are assisting with lesson planner for teachers, trainers, course creators.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 教师 AI 提示词.
Business context: {{grade level}}, {{topic}}, {{learning objective}}, {{student context}}, {{timebox}}, {{assessment method}}.
Return these sections: lesson objective, activity plan, quiz items, feedback notes, adaptation plan.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Teachers must verify difficulty, answers, accessibility, and student suitability.
Module order: 1 of 5.
```

#### 教师 AI 提示词 - quiz generator

Input fields:

- grade level
- topic
- learning objective
- student context
- timebox
- assessment method

Output blocks:

- lesson objective
- activity plan
- quiz items
- feedback notes
- adaptation plan

Copy prompt:

```text
You are assisting with quiz generator for teachers, trainers, course creators.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 教师 AI 提示词.
Business context: {{grade level}}, {{topic}}, {{learning objective}}, {{student context}}, {{timebox}}, {{assessment method}}.
Return these sections: lesson objective, activity plan, quiz items, feedback notes, adaptation plan.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Teachers must verify difficulty, answers, accessibility, and student suitability.
Module order: 2 of 5.
```

### 产品经理 AI 提示词

- Lane: product-manager-ai-prompts
- Audience: product managers, founders, business analysts
- Deliverable: Product prompt pack with PRD, user stories, competitor notes, acceptance criteria, and launch checklist.
- Review candidates: content/blog/software-development-ai-prompts-guide.mdx, content/blog/product-manager-ai-prompts-guide.mdx
- Human boundary: Create or review only as draft/noindex/humanReviewRequired. Stop before mark:review and stop before publish until explicit human approval.

Manual review actions:

- Use the prompt blueprints as article expansion material only during human review.
- If no review candidate exists, keep this as a future draft idea and do not create an article automatically.
- Confirm every example requires user-provided facts and marks unknowns instead of inventing data.
- Keep the article draft/noindex/humanReviewRequired until explicit approval.
- Stop before mark:review; publishing requires a separate explicit approval.

#### 产品经理 AI 提示词 - PRD drafter

Input fields:

- user segment
- problem
- business goal
- constraints
- evidence
- success metric

Output blocks:

- problem statement
- user stories
- acceptance criteria
- tradeoffs
- launch checklist

Copy prompt:

```text
You are assisting with PRD drafter for product managers, founders, business analysts.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 产品经理 AI 提示词.
Business context: {{user segment}}, {{problem}}, {{business goal}}, {{constraints}}, {{evidence}}, {{success metric}}.
Return these sections: problem statement, user stories, acceptance criteria, tradeoffs, launch checklist.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Product requirements must stay traceable to real user evidence and measurable acceptance criteria.
Module order: 1 of 5.
```

#### 产品经理 AI 提示词 - user story generator

Input fields:

- user segment
- problem
- business goal
- constraints
- evidence
- success metric

Output blocks:

- problem statement
- user stories
- acceptance criteria
- tradeoffs
- launch checklist

Copy prompt:

```text
You are assisting with user story generator for product managers, founders, business analysts.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 产品经理 AI 提示词.
Business context: {{user segment}}, {{problem}}, {{business goal}}, {{constraints}}, {{evidence}}, {{success metric}}.
Return these sections: problem statement, user stories, acceptance criteria, tradeoffs, launch checklist.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Product requirements must stay traceable to real user evidence and measurable acceptance criteria.
Module order: 2 of 5.
```

### 营销 AI 提示词

- Lane: marketing-ai-prompts
- Audience: marketing teams, content teams, SEO operators
- Deliverable: Marketing prompt pack with campaign brief, SEO outline, ad copy, content calendar, and post-campaign review.
- Review candidates: content/blog/marketing-ai-prompts-guide.mdx
- Human boundary: Create or review only as draft/noindex/humanReviewRequired. Stop before mark:review and stop before publish until explicit human approval.

Manual review actions:

- Use the prompt blueprints as article expansion material only during human review.
- If no review candidate exists, keep this as a future draft idea and do not create an article automatically.
- Confirm every example requires user-provided facts and marks unknowns instead of inventing data.
- Keep the article draft/noindex/humanReviewRequired until explicit approval.
- Stop before mark:review; publishing requires a separate explicit approval.

#### 营销 AI 提示词 - campaign planner

Input fields:

- audience
- offer
- brand voice
- proof points
- channels
- constraints

Output blocks:

- campaign brief
- SEO outline
- ad variants
- content calendar
- review checklist

Copy prompt:

```text
You are assisting with campaign planner for marketing teams, content teams, SEO operators.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 营销 AI 提示词.
Business context: {{audience}}, {{offer}}, {{brand voice}}, {{proof points}}, {{channels}}, {{constraints}}.
Return these sections: campaign brief, SEO outline, ad variants, content calendar, review checklist.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Claims, metrics, and customer proof must be backed by provided evidence.
Module order: 1 of 5.
```

#### 营销 AI 提示词 - SEO outline builder

Input fields:

- audience
- offer
- brand voice
- proof points
- channels
- constraints

Output blocks:

- campaign brief
- SEO outline
- ad variants
- content calendar
- review checklist

Copy prompt:

```text
You are assisting with SEO outline builder for marketing teams, content teams, SEO operators.
Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.
Primary search intent: 营销 AI 提示词.
Business context: {{audience}}, {{offer}}, {{brand voice}}, {{proof points}}, {{channels}}, {{constraints}}.
Return these sections: campaign brief, SEO outline, ad variants, content calendar, review checklist.
Quality rules: Uses only the provided input facts and labels missing information. Returns the requested output blocks in a scannable structure. Includes assumptions, risks, and human escalation points. Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.
Human boundary: Require user-provided facts and mark unknowns instead of inventing business data. Include output format, review criteria, and escalation boundary in every prompt. Keep human approval for customer, employee, financial, legal, medical, or operational decisions. Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes. Claims, metrics, and customer proof must be backed by provided evidence.
Module order: 2 of 5.
```

