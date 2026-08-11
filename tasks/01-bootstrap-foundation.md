# Task 01 — Bootstrap & Foundation

## Objective

Create a clean, maintainable Next.js baseline that preserves useful starter primitives,
loads the frozen knowledge contracts safely, and provides the visual/navigation shell for
the product.

Do not implement the full resolver/content journey yet.

## Required reading

- `AGENTS.md`
- `docs/PRODUCT_SPEC.md`
- `docs/UX_INFORMATION_ARCHITECTURE.md`
- `docs/TECHNICAL_ARCHITECTURE.md`
- `docs/CONTENT_AUTHORING.md`
- both files in `knowledge/`

## Work

### 1. Starter intake

Evaluate the primary Documents starter.

Before adopting it:

- inspect current license;
- inspect package manager and dependency versions;
- install dependencies;
- run its production build;
- understand its MDX/navigation/search pipeline.

If it builds cleanly and is structurally useful:
port it into this repository without bringing over its `.git`, demo identity, or unrelated
content. Preserve required license notices.

If it requires invasive repair:
bootstrap the fallback current `create-next-app` configuration.

Do not spend the task fighting a starter.

### 2. Project identity

Replace demo branding with neutral project identity:

- Egreso LCD
- Spanish metadata
- no personal GitHub-owner branding
- no claim of official UBA status unless explicitly provided later

### 3. Knowledge loader

Implement:

- YAML parser;
- schemas;
- cross-reference validation;
- typed accessors;
- `validate:knowledge` script.

Fail loudly on invalid contracts.

### 4. App shell

Implement the basic route/layout skeleton:

- `/`
- `/orientador`
- `/etapas/...` placeholders or initial pages
- `/problemas/...` structure
- `/fuentes`

Navigation must work on desktop and mobile.

### 5. Evidence primitives

Implement reusable presentational primitives sufficient for Task 02:

- official requirement;
- recommendation;
- timing notice;
- warning/blocker;
- source link/card;
- external-link styling.

They may use placeholder content but must accept structured props/claim IDs cleanly.

### 6. Home shell

Build enough of the landing page to establish the product:

- hero;
- primary `Saber dónde estoy` CTA;
- journey stage strip;
- stage shortcuts;
- common-problem section;
- source/trust explanation.

The resolver CTA may route to a placeholder in this task.

## Acceptance

- clean install;
- `validate:knowledge` passes;
- lint/type checks pass;
- production build passes;
- no AI dependency;
- no database/auth;
- no PII assets;
- responsive shell works;
- demo starter branding/content removed;
- knowledge files remain byte-for-byte unchanged.

## Do not do

- full resolver;
- full copy migration;
- AI;
- external scraping;
- deployment-specific secrets.
