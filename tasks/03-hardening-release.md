# Task 03 — Hardening & Release Candidate

## Objective

Treat the existing site as a release candidate. Find and fix correctness, content,
navigation, accessibility, freshness, and responsive defects. Do not add new product scope
unless required to make an existing requirement work.

## Required reading

- `AGENTS.md`
- `docs/ACCEPTANCE_TESTS.md`
- `docs/CONTENT_AUTHORING.md`
- frozen knowledge contracts
- current implementation

## Work

### 1. Full acceptance pass

Run every automated check and walk every representative scenario.

Fix root causes rather than weakening tests.

### 2. Content consistency

Audit:

- claims rendered with correct category;
- time language is non-guaranteeing;
- no official/community authority confusion;
- diploma shows ~8 months as orientative;
- stale event dates are not surfaced;
- no contradiction between resolver result and narrative page.

### 3. External links

Check current high-value links:

- tutor form / tutor email
- PEI form
- TAD
- RC14
- Portal de Pagos
- SIET
- FCEN diploma guidance
- jura guidance
- relevant thesis sources

If a volatile link changed, document the update and determine whether a new registry
version is required.

### 4. Privacy asset audit

Search repository/public assets for:

- names from source screenshots;
- document numbers;
- expediente numbers;
- personal emails;
- unsanitized screenshots.

None should ship.

### 5. Responsive/accessibility pass

Verify:

- keyboard navigation;
- visible focus;
- labels on answer controls;
- no color-only meaning;
- mobile layout;
- external links understandable;
- warnings readable;
- reasonable heading hierarchy.

### 6. Production quality

- metadata/title/description;
- favicon/project identity as available;
- 404;
- no demo pages;
- no dead navigation;
- no console errors;
- no required environment secrets;
- production build.

### 7. Deployment readiness

Leave the repository ready to connect to a normal Next.js host.

If deploying is within the current environment/request, deploy; otherwise provide the
exact validated build command and any host configuration required.

## Acceptance

All checks in `docs/ACCEPTANCE_TESTS.md` pass or any unavoidable exception is explicitly
documented.

The result is a credible v1 without AI.

## Explicit non-goal

Do not "finish the project" by implementing `tasks/90-ai-phase-2.md`.
