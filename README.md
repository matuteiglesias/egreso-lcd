# Egreso LCD

Interactive guidance portal for the final academic and administrative journey of the
Licenciatura en Ciencias de Datos (FCEN-UBA): tutor/a, PEI, thesis, academic closure,
plan regularization, diploma, tracking, SIET, delivery/jura, and post-graduation handoff.

## Product sentence

> Una guía interactiva para saber dónde estás, qué te falta y qué hacer hasta recibir tu título.

The application is not an official transactional system and does not replace TAD, SIU,
SIET, FCEN, UBA, the Comisión de Carrera, or the thesis course. Its job is to make the
process discoverable, sequenced, understandable, and harder to execute incorrectly.

## Repository contract

The two frozen knowledge contracts live in `knowledge/`:

- `knowledge/egreso-lcd-content-evidence-registry-v1.0.yaml`
- `knowledge/egreso-lcd-state-journey-graph-v1.0.yaml`

Treat them as source contracts for v1. Do not silently edit them while implementing UI.
If a factual or state-model defect is discovered, document it and create an explicit
versioned revision rather than mutating the baseline without notice.

## Read before coding

1. `AGENTS.md`
2. `docs/PRODUCT_SPEC.md`
3. `docs/UX_INFORMATION_ARCHITECTURE.md`
4. `docs/TECHNICAL_ARCHITECTURE.md`
5. `docs/CONTENT_AUTHORING.md`
6. `docs/ACCEPTANCE_TESTS.md`
7. The relevant task under `tasks/`

## V1

V1 includes:

- public landing page;
- coarse triage by journey stage;
- deterministic state resolver;
- next-action result;
- checklists and blocking conditions;
- curated guidance pages;
- source attribution and freshness cues;
- external handoffs to official systems;
- useful search if supported cleanly by the chosen starter;
- local persistence of non-sensitive resolver progress;
- responsive/mobile-friendly UI.

V1 explicitly excludes:

- AI/chat;
- OpenAI or other model API calls;
- vector databases / embeddings / RAG;
- accounts or authentication;
- server-side user profiles;
- a database;
- a CMS;
- automatic scraping of external websites;
- submission of university procedures from this portal.

AI is a planned Phase 2 and is specified in `docs/AI_PHASE_2.md`.

## Expected repo location

Recommended local path:

```text
~/repos/egreso-lcd/
```

The repository name is intentionally not encoded in application behavior. Initial GitHub
ownership may be personal; avoid product copy, URLs, or architecture that assumes a
permanent GitHub owner.

## Development sequence

V1 is deliberately organized into three substantial Codex tasks:

1. `tasks/01-bootstrap-foundation.md`
2. `tasks/02-product-content-resolver.md`
3. `tasks/03-hardening-release.md`

Phase 2 is separate:

- `tasks/90-ai-phase-2.md`

Each task should end with a runnable, verified repository, not merely a plan.
