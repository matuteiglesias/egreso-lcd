# AI Phase 2 — Planned, Not in V1

Status: **planned architecture only**

This file exists so v1 does not accidentally make choices that make a later assistant
awkward. It is not permission to implement AI during the v1 release tasks.

## 1. Product role

Future assistant:

> "Preguntá sobre tu trámite"

It is an alternate query surface over the portal knowledge and selected official sources.

It should help with questions that do not fit a simple checklist, for example:

> "Mi PEI está aprobado, terminé la tesis, pero una optativa de otro departamento todavía
> no aparece como esperaba. ¿Qué debería verificar antes de iniciar el diploma?"

The assistant should synthesize and route back to structured pages/checklists.

## 2. Non-role

The assistant must not:

- become the administrative state machine;
- claim institutional authority;
- submit procedures;
- invent deadlines;
- promote community advice to an official requirement;
- answer without showing provenance when the answer depends on process facts.

## 3. Context contract

A future UI should be able to pass:

```ts
type AssistantContext = {
  currentPath: string
  resolverStateId?: string
  relevantClaimIds?: string[]
}
```

This avoids re-asking questions the deterministic resolver already knows.

## 4. Retrieval tiers

### Tier 1 — Curated portal knowledge

Primary:

- registry claims;
- guidance pages;
- resolver/state context;
- curated source metadata.

### Tier 2 — selected official sources

Potential live or periodically refreshed sources:

- LCD official pages;
- FCEN official pages;
- UBA official pages;
- SIET-related official documentation.

Use an explicit domain/source allowlist.

### Tier 3 — no confident answer

If evidence is insufficient:

- say that the portal does not have enough reliable information;
- point to the relevant official source/contact;
- do not fill the gap from model intuition.

## 5. Evidence hierarchy

Future response generation must preserve:

1. official regulation;
2. official current procedure;
3. curated portal explanation;
4. practical/community expectation.

Freshness metadata matters separately from authority.

## 6. Citations

Answers should expose sources in user-readable form and link to the relevant guidance or
official page.

Ideal answer shape:

```text
Respuesta breve...

Qué haría ahora:
1. ...
2. ...

Por qué:
...

Fuentes:
- Guía Egreso LCD — Regularización
- FCEN — Diplomas y certificados
```

## 7. Implementation choice is intentionally deferred

At Phase 2 implementation time, re-evaluate the current OpenAI platform and current
Next.js/AI UI ecosystem rather than pinning a 2026 API choice inside the v1 architecture.

Likely capabilities to evaluate at that time:

- OpenAI Responses API;
- managed file search/retrieval;
- official-domain web search;
- streaming UI helpers.

Do not add those dependencies before Phase 2.

## 8. Security/privacy

- API keys server-side only.
- Do not send unnecessary personal identifiers.
- Resolver state is usually enough context.
- Avoid storing chat history by default until a clear product reason exists.
- Rate/cost controls are required before public launch.

## 9. Phase 2 acceptance concept

Before public release of AI:

- evaluation set of representative administrative questions;
- citation/provenance checks;
- refusal/uncertainty tests;
- tests for stale-source conflicts;
- tests that the assistant does not override deterministic state;
- cost and abuse controls;
- clear "informational guidance, verify official source" UX.

Phase 2 is complete only when it improves edge-case discoverability without weakening the
reliability of the structured portal.
