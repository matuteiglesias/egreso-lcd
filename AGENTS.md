# AGENTS.md — Egreso LCD

## Mission

Build a small, trustworthy, public guidance application for people completing the
Licenciatura en Ciencias de Datos at FCEN-UBA.

The product answers four questions:

1. Where am I in the journey?
2. What blocks me from moving forward?
3. What should I do next?
4. Where can I verify or perform the official action?

Optimize for reliability, discoverability, and low maintenance. Do not turn this into a
large platform.

## Product language

- User-facing language: Spanish (Argentina).
- Prefer clear "vos" phrasing where direct instructions help.
- Do not write bureaucratic prose when a short operational sentence is enough.
- Distinguish visibly between:
  - requisito oficial;
  - proceso oficial;
  - recomendación;
  - tiempo orientativo.
- Never present an expectation as a guaranteed deadline.

## Frozen contracts

For v1, these files are authoritative inputs:

- `knowledge/egreso-lcd-content-evidence-registry-v1.0.yaml`
- `knowledge/egreso-lcd-state-journey-graph-v1.0.yaml`

Do not silently change them to make implementation easier.

If implementation reveals a defect:

1. keep the v1.0 file intact;
2. document the issue;
3. propose a versioned correction (for example v1.1);
4. update code only after the contract change is explicit.

## Core behavioral invariant

The administrative state resolver is deterministic.

- Do not use an LLM to determine the user's administrative state.
- Do not infer that a prerequisite is satisfied when the answer is unknown.
- Unknown means verify / unresolved, never "yes".
- Never route a person to start the diploma when a blocking prerequisite is false or
  unknown.
- Resolver logic must be independently unit-testable.

## V1 scope

Implement:

- information architecture;
- stage triage;
- deterministic resolver;
- result/next-action screen;
- progress/checklists;
- content pages;
- official outbound links;
- source/freshness presentation;
- local-only persistence for resolver answers when useful;
- responsive navigation;
- build-time validation of knowledge files.

Do not implement in v1:

- AI/chat;
- OpenAI SDK;
- Vercel AI SDK;
- embeddings/vector stores;
- web retrieval;
- auth;
- database;
- server-side personal state;
- analytics requiring identity;
- automated form submission.

Do not add dormant AI dependencies "for later". Preserve an architectural seam only.

## Privacy

The portal must not require personal data.

Do not commit or publish screenshots containing names, document numbers, expediente
numbers, email addresses, or other personally identifying data.

Reference screenshots from the source conversation are design/process references only
until explicitly sanitized.

Local persistence should contain only journey answers/state IDs, never PII.

## Technical bias

Prefer:

- current Next.js App Router;
- TypeScript;
- Tailwind CSS if already supplied by the starter;
- local MDX/Markdown for narrative content;
- `yaml` + schema validation for structured knowledge;
- small pure TypeScript modules for resolver logic;
- dependencies already present in the chosen starter.

Avoid:

- unnecessary state-management libraries;
- a CMS before there is an editorial need;
- duplicating URLs or claim text throughout components;
- hard-coded business rules inside presentation components;
- clever generic abstractions that obscure the journey.

## Starter rule

Primary candidate:
Vercel-listed "Documents: Simple Next.js Documentation" starter
(`rubixvi/rubix-documents`) because it already targets content-driven documentation,
MDX, structured navigation, search, and responsive presentation.

Fallback:
a clean current `create-next-app` App Router project with TypeScript, Tailwind and ESLint.

Do not spend the project repairing a starter. During Task 01:

- inspect its license and preserve required notices;
- install and build it cleanly;
- inspect dependency health and project structure;
- keep useful primitives;
- remove irrelevant product-specific/demo content.

If the starter needs invasive repair before a clean baseline build, use the fallback.

## Content architecture

Narrative pages may be MDX, but facts with operational importance should reference
claim IDs from the registry.

Prefer reusable components such as:

- `OfficialRequirement`
- `Recommendation`
- `TimingNotice`
- `BlockingNotice`
- `SourceLink`
- `StageProgress`
- `Checklist`
- `ResolverResult`

Do not duplicate the same official URL in many MDX files. Centralize source resolution.

## Validation and tests

Before finishing a task:

- run formatter/linter used by the repo;
- run type check if separate;
- run unit tests;
- run `next build` (or the repository's equivalent production build);
- ensure knowledge validation passes.

Resolver tests must cover:

- every declared state is reachable or explicitly marked otherwise;
- transitions point to valid states;
- claim IDs referenced by states exist;
- blocking gates do not silently pass on unknown;
- all top-level triage branches produce a useful terminal result;
- diploma cannot be reached through a path that bypasses its required gates.

Do not claim completion while tests/build are failing.

## UI constraints

- Mobile is a first-class layout.
- Primary action must be obvious.
- The user should not need to understand university organizational structure to navigate.
- Use stage and task language first; institution names are supporting metadata.
- Keep official outbound actions visually distinct from local navigation.
- Provide an easy "Empezar de nuevo" / reset action for the resolver.
- Do not expose raw internal state IDs in normal UI.

## AI Phase 2 seam

Phase 2 is documented in `docs/AI_PHASE_2.md`.

For v1:

- do not render a fake working assistant;
- do not require an API key;
- do not add model packages;
- make it easy for a future assistant to receive:
  - current route;
  - resolver state ID;
  - relevant claim IDs;
  - curated page context.

The future assistant may explain and route. It must not become the source of truth for
administrative state.

## Change discipline

Prefer complete, coherent edits over speculative scaffolding.

When a task is done, report:

- what changed;
- files/areas affected;
- checks executed and their result;
- any contract issue discovered;
- remaining task, if any.
