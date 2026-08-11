# Task 90 — AI Assistant (Phase 2, Not V1)

## Gate

Do not execute this task as part of v1.

Before starting, re-read and update `docs/AI_PHASE_2.md` against the current OpenAI and
Next.js ecosystem.

## Objective

Add a compact question-answering assistant that uses the portal's curated knowledge and,
when necessary, selected official sources.

The assistant is contextual to the user's deterministic state but cannot override it.

## Required design behaviors

- receives route + resolver state + relevant claim IDs;
- prioritizes curated registry/content;
- can route answers back to structured pages/checklists;
- cites sources;
- distinguishes official requirement from recommendation/expectation;
- expresses uncertainty;
- does not invent administrative deadlines;
- no client-exposed API key;
- cost/rate controls;
- evaluation suite before public release.

## Before implementation

Re-evaluate current:

- OpenAI recommended API for text/tool/retrieval workflows;
- managed retrieval/file search;
- official-domain web search controls;
- streaming UI options;
- privacy/data retention choices.

Do not assume the 2026 implementation sketch is still the best current stack.

## Deliverables

When this phase is eventually authorized:

1. updated technical decision;
2. ingestion/retrieval source manifest;
3. assistant API;
4. UI integration;
5. citation rendering;
6. evaluation fixtures;
7. abuse/cost controls;
8. release checklist.

Until then, no AI runtime dependency belongs in the project.
