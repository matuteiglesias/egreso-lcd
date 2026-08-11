# V1 release audit — 2026-08-11

Status: release-candidate audit performed during Task 03.

## Knowledge and content

- Frozen content/evidence registry v1.0 preserved.
- Frozen journey graph v1.0 preserved.
- Diploma planning language remains approximately 8 months and explicitly orientative,
  never a guaranteed deadline.
- Thesis remains a real sub-journey rather than a single completion checkbox.
- No dated thesis-event announcement is surfaced as evergreen guidance.
- Resolver safety adapter around diploma entry remains documented in `CONTRACT_NOTES.md`.

## Volatile outbound links

Release verification was performed against current official surfaces.

### Changed since pre-development capture

The official LCD Tutorías page now points to different tutor-request and PEI forms than
the URLs frozen in registry v1.0. Because this changes navigation but not the claims, the
release uses the explicit overlay:

`knowledge/egreso-lcd-navigation-targets-v1.1.yaml`

### Revalidated

- LCD Tutorías page and its current tutor/PEI form destinations.
- TAD-UBA public entry point.
- FCEN `Diplomas y certificados` guidance.
- Current RC14 PDF linked by FCEN.
- UBA Portal de Pagos and its diploma-payment entry.
- SIET public entry point.
- UBA Dirección General de Títulos y Planes diploma guidance.
- FCEN Juras page.

Jura dates/capacities remain intentionally dynamic: the portal links to the current
official page rather than copying a dated schedule into evergreen content.

## Privacy / repository assets

- No `public/` directory or production screenshot assets were present during the audit.
- No source screenshots containing names, DNI, expediente numbers or other PII were added
  to the application.
- Resolver/checklist persistence is browser-local and stores no required identity fields.

## Accessibility / interaction

The implementation includes:

- skip link;
- visible focus styles;
- semantic button/input controls for resolver and checklists;
- labels for checklist inputs;
- non-color labels for evidence/checklist semantics;
- mobile layout rules;
- explicit external-link affordances;
- reset/back behavior in the resolver;
- a useful application 404 page.

Task 03 adds root-level `suppressHydrationWarning` only on `<body>` because browser
extensions can mutate root body attributes/styles before React hydration. This does not
suppress hydration warnings inside application content.

## Build / CI

`.github/workflows/ci.yml` runs the repository's full `pnpm check` on pull requests and on
pushes to `main`, using Node from `.nvmrc` and the pinned pnpm version.

Release gate:

```text
pnpm install --frozen-lockfile
pnpm check
```

A Vercel deployment requires no environment variables, database, AI key, or custom build
command for v1.

## Vercel baseline

Expected import settings:

- Framework Preset: Next.js
- Root Directory: `./`
- Build/Output settings: defaults / no override
- Environment Variables: none
- Node.js: repository `engines` / `.nvmrc` specify 24.x

Deploy production from `main` only after the release PR is merged and CI is green.
