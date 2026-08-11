# Codex Development Runbook

## Goal

Reach a useful deployed v1 in a small number of bounded implementation runs.

Codex should receive the repository plus the root `AGENTS.md`. The task file should be
the main prompt for each run.

## Recommended sequence

### Run 1

Prompt:

> Read AGENTS.md and all required specs. Implement `tasks/01-bootstrap-foundation.md`
> completely. Do not stop at a plan. End only after the documented checks have been run,
> or clearly report a genuine blocker.

Expected outcome:
clean buildable Next.js project, starter adapted, knowledge validation working, visual
shell and basic routes present.

### Run 2

Prompt:

> Read AGENTS.md, the frozen knowledge contracts, and the product/UX specs. Implement
> `tasks/02-product-content-resolver.md` completely. Preserve the contracts. Run the
> resolver and build acceptance checks before finishing.

Expected outcome:
the actual useful portal.

### Run 3

Prompt:

> Read AGENTS.md and `tasks/03-hardening-release.md`. Treat the existing implementation as
> a release candidate. Fix defects, validate content links/freshness, run the full release
> checks, and leave a production-ready v1. Do not implement AI.

Expected outcome:
release candidate / deployable v1.

## Why only three v1 tasks

The boundaries are intentional:

1. **Foundation** creates a stable platform and catches starter/tooling problems early.
2. **Product implementation** wires content and resolver together so they cannot drift as
   independent mini-projects.
3. **Release hardening** catches defects without mixing them into feature invention.

Do not split work into dozens of tiny tickets unless a concrete blocker forces it.

## Agent handoff notes

At the end of each run Codex should leave a short repository note in its response with:

- completed scope;
- relevant files;
- tests/build executed;
- contract discrepancies;
- what the next task can assume.

The repository itself is the state handoff; do not rely on conversational memory.

## Optional human commits

A clean workflow is one reviewed commit per successful task, but commit policy is owned by
the repository maintainer rather than encoded as an agent requirement.
