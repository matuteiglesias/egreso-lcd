# Architecture / Product Decisions

## ADR-001 — Next.js rather than Docusaurus

Status: accepted for v1.

The product center of gravity is an interactive orientation application with substantial
content, not only a documentation site. Next.js keeps content pages and interactive state
in one application and leaves a clean future server route for AI.

## ADR-002 — Deterministic resolver

Status: accepted.

Administrative state is rules-driven and testable. LLMs may later explain a state but do
not decide it.

## ADR-003 — No account/database in v1

Status: accepted.

The useful v1 state is small and non-sensitive. Browser-local persistence is enough.
Adding identity would create privacy, operational, and maintenance costs without solving
the current bottleneck.

## ADR-004 — Frozen knowledge contracts

Status: accepted.

Registry v1.0 and journey graph v1.0 are explicit baselines. Implementation must not
silently repair facts or transitions.

## ADR-005 — AI is Phase 2

Status: accepted.

The v1 information architecture anticipates an assistant, but v1 ships without model
dependencies, keys, vector stores, or a fake chat UI.

## ADR-006 — Starter with escape hatch

Status: accepted.

Try the Vercel-listed Documents starter first because its primitives match the
content-driven portion of the product. Use current `create-next-app` if the starter
creates more repair work than leverage.

## ADR-007 — Repository ownership is provisional

Status: accepted.

Initial hosting under a personal GitHub account is not a product-architecture decision.
Do not hard-code repository ownership into public copy or application logic. Institutional
transfer can be considered separately later.

## ADR-008 — No raw source screenshots in public assets

Status: accepted.

Existing reference screenshots contain operational examples and potentially personal
information. They are not production assets until explicitly sanitized and reviewed.
