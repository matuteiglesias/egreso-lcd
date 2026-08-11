# Task 02 — Product, Content & Resolver

## Objective

Turn the foundation into the actual v1 portal: deterministic triage/resolver, checklists,
stage guidance, common-problem routes, local progress persistence, and official handoffs.

This is the main product implementation task.

## Required reading

- `AGENTS.md`
- all product/UX/content specs
- `docs/ACCEPTANCE_TESTS.md`
- both frozen knowledge files
- implementation produced by Task 01

## Work

### 1. Resolver engine

Implement the journey graph as deterministic TypeScript behavior.

Requirements:

- broad triage first;
- only branch-relevant questions;
- back navigation;
- reset;
- unknown never passes a blocking gate;
- terminal result uses the output contract;
- no raw internal IDs in normal UI.

Where frozen transition keys lack display labels, add a UI adapter without modifying the
frozen YAML.

### 2. Resolver persistence

Add local-only, versioned persistence.

Must support:

- resume;
- reset;
- safe discard if graph/schema version is incompatible;
- no PII.

### 3. Result screen

Show:

- current stage;
- completed prerequisites;
- blockers;
- next action;
- relevant checklist;
- timing notice if relevant;
- source links;
- next-stage preview.

### 4. Checklists

Implement status/preparation/verification semantics.

At minimum wire:

- tutor/PEI;
- thesis readiness/progress;
- academic closure/SIU;
- regularization/resolution;
- diploma documents;
- TAD tracking;
- SIET;
- jura.

### 5. Guidance content

Author the seven stage modules described in the product spec.

Use:

- frozen claim registry;
- official source metadata;
- curated practical guidance already captured in the contracts/specs.

Do not invent unsupported requirements.

### 6. Thesis sub-journey

Give thesis sufficient depth:

- can I start;
- topic/director;
- work plan;
- course milestones;
- manuscript;
- jury;
- corrections;
- defense;
- grade in SIU.

Include director/co-director eligibility guidance where it helps.

### 7. Common problems

Implement useful pages/entries for the minimum list in the product spec.

`SUBSANACIÓN` should be visually urgent and explain the five-day official timing claim.

### 8. Search

If the starter's local search is sound, index the new content and adapt labels/results.

Do not add hosted search infrastructure.

### 9. Source discoverability

Every high-stakes operational page should make the relevant official source easy to find.

Outbound systems should be clearly external.

## Tests

Implement the resolver fixtures and invariants in `docs/ACCEPTANCE_TESTS.md`.

Prefer table-driven tests.

Also test knowledge-to-resolver cross references.

## Acceptance

A new user can:

- start from home;
- identify broad stage;
- reach a precise current state;
- see the next action/blocker;
- open relevant guidance/source;
- reset/resume;
- navigate without using the resolver.

All automated checks and production build pass.

No AI dependency has been added.
