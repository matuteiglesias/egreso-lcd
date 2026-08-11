# Technical Architecture — V1

## 1. Framework decision

Use **Next.js App Router + TypeScript**.

Reasons for this project:

- static/content-heavy pages and interactive React components can coexist;
- local MDX can host narrative guidance;
- the deterministic resolver can live in the same codebase;
- a future server-side assistant endpoint can be added without migrating frameworks.

Do not add AI infrastructure in v1.

## 2. Starter strategy

### Primary candidate

Vercel-listed **Documents: Simple Next.js Documentation**
repository: `rubixvi/rubix-documents`

Useful starting features reported by the template:

- Next.js + TypeScript + Tailwind;
- MDX;
- multi-level navigation;
- generated table of contents;
- local/fuzzy search;
- responsive documentation layout;
- reusable components.

Task 01 must verify the repository as it exists at implementation time, including license,
dependencies, build behavior, and actual suitability.

### Fallback

Current official `create-next-app` with:

- TypeScript;
- App Router;
- Tailwind;
- ESLint;
- `src/` directory;
- `@/*` alias.

Fallback is preferred over spending significant effort repairing template-specific code.

## 3. Proposed repository layout

```text
.
├── AGENTS.md
├── README.md
├── docs/
├── tasks/
├── knowledge/
│   ├── egreso-lcd-content-evidence-registry-v1.0.yaml
│   └── egreso-lcd-state-journey-graph-v1.0.yaml
├── content/
│   ├── etapas/
│   └── problemas/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── evidence/
│   │   ├── journey/
│   │   └── ui/
│   ├── features/
│   │   └── resolver/
│   ├── lib/
│   │   ├── knowledge/
│   │   └── sources/
│   └── types/
└── public/
```

Adapt to the chosen starter when its conventions are genuinely useful. Do not keep a
parallel duplicate architecture.

## 4. Knowledge loading

Structured truth remains in `knowledge/*.yaml`.

Implement a build/server-side loader that:

1. parses YAML;
2. validates its schema;
3. validates cross-references;
4. exports typed data to the application.

Suggested dependencies only if not already present:

- `yaml`
- `zod`

Validation failures should fail development/build clearly rather than silently omitting
content.

## 5. Knowledge validation

At minimum validate:

### Registry

- claim ID unique;
- required fields present;
- referenced source exists;
- `blocking` boolean present;
- valid stage/type/volatility values.

### Journey graph

- state ID unique;
- transition targets exist;
- claim references exist in registry;
- top-level triage entry states exist;
- special transitions reference real states;
- every terminal resolver result contains a useful headline and next action.

Add a script such as:

```text
pnpm validate:knowledge
```

or equivalent for the repo package manager.

## 6. Resolver design

Implement as a small deterministic domain module.

Suggested boundaries:

```text
src/features/resolver/
├── resolver.ts
├── resolver.types.ts
├── resolver.storage.ts
├── resolver.test.ts
└── resolver-ui-options.ts
```

Responsibilities:

- state transition logic;
- normalization of answer values;
- result construction;
- persistence/version migration;
- no rendering concerns in `resolver.ts`.

The YAML graph contains machine states and transition keys. If display labels for answer
keys are not present in the frozen graph, map them in a small UI adapter rather than
editing the v1.0 graph silently.

## 7. Local persistence

Use browser storage only for non-sensitive journey state.

Suggested payload:

```json
{
  "schemaVersion": 1,
  "graphVersion": "1.0.0",
  "stateId": "S52_DOCS_CHECK",
  "answers": {
    "S51_SECONDARY_CHECK": "yes"
  },
  "updatedAt": "ISO_DATE"
}
```

Rules:

- no names;
- no document numbers;
- no expediente IDs;
- no email;
- provide reset;
- discard incompatible versions safely.

## 8. Narrative content

Use MDX/Markdown for explanatory content.

Pages should include metadata/frontmatter such as:

```yaml
title: Pedir el diploma
stage: diploma
claim_ids:
  - DIP-01
  - DIP-02
  - DIP-05
last_editorial_review: 2026-08-11
```

Important operational callouts should be rendered from claim IDs or checked against them,
rather than copying official wording into many files.

## 9. Source resolution

Implement one source registry adapter:

```ts
getSource(sourceId)
getClaim(claimId)
getOfficialLink(targetId)
```

Do not hard-code the same UBA URL throughout components.

Outbound link components should support:

- title;
- institution;
- external marker;
- last verified date when useful.

## 10. Client/server split

Prefer server components for static content and source rendering.

Use client components only where interaction is required:

- resolver;
- checklist interaction;
- local persistence;
- search if the starter implementation needs it.

Do not convert the whole site to client rendering.

## 11. No backend in v1

V1 should deploy with no application database and no required secret environment
variables.

This gives a useful release property:

```text
git checkout + install + build
```

should be enough to reproduce the site.

## 12. Future AI boundary

Phase 2 may add:

```text
src/features/assistant/
src/app/api/assistant/
```

but v1 should contain no model SDK dependency.

The future assistant can consume:

```ts
type AssistantContext = {
  route: string
  resolverStateId?: string
  relevantClaimIds?: string[]
}
```

This interface is conceptual for now; do not add unused runtime scaffolding unless it
naturally falls out of current component design.

## 13. Deployment

Target a normal Next.js deployment, with Vercel as the simplest initial host if desired.

Repository ownership must remain decoupled from visible product identity so moving the
repo later does not require product-content changes.
