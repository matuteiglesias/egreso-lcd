# V1 Acceptance & Test Contract

## 1. Release definition

V1 is releasable when a person can:

1. understand the purpose from the home page;
2. enter through broad stage triage;
3. answer only relevant questions;
4. receive a deterministic current-state result;
5. identify blockers;
6. know the next action;
7. open the right official source/system;
8. navigate the main guidance without the resolver;
9. use the site comfortably on a phone;
10. do all of the above without AI, login, database, or PII.

## 2. Automated knowledge tests

Required:

- YAML parses successfully;
- schemas validate;
- 52 registry claim IDs remain unique;
- every source ID referenced by a claim exists;
- every journey claim reference exists;
- every transition target exists;
- every top-level triage entry exists;
- no accidental cyclic auto-transition;
- terminal states contain a next action.

## 3. Resolver invariants

Required tests:

### Unknown is not approval

If a blocking prerequisite is `unknown`, do not advance through the gate.

### Diploma gate

No path should produce "Listo/a para iniciar el diploma" if any of these are false/unknown:

- academic completion;
- required plan regularization/resolutions;
- secondary-title legalization;
- required document readiness for the final "ready to file" state.

### PEI sequencing

A person without approved tutor must not be told that the PEI can already be treated as
approved/ready for commission processing.

### Thesis

The thesis branch must distinguish at least:

- preparation;
- in progress;
- manuscript/jury;
- corrections;
- defense pending;
- defense complete but SIU pending.

### TAD state decoder

- SUBSANACIÓN produces an urgent corrective action.
- GUARDA TEMPORAL produces a rejection/restart action.
- TRAMITACIÓN does not imply diploma finished.

### SIET

A person not yet visible in SIET remains routed to TAD follow-up rather than being told
the title is already in UBA processing.

### Delivery

Jura readiness requires the delivery-list gate.

## 4. Representative scenario fixtures

Create table-driven fixtures at minimum for:

### Scenario A — early third cycle
Tutor not approved.
Expected: tutor action.

### Scenario B — tutor approved, PEI pending
Expected: PEI action; show 2–3 month official timing context where relevant.

### Scenario C — preparing thesis
Not enrolled; director/topic missing.
Expected: thesis preparation guidance.

### Scenario D — defended thesis, grade missing in SIU
Expected: block administrative closure.

### Scenario E — academically complete, inclusion unresolved
Expected: regularization branch, not diploma.

### Scenario F — all academic/admin prerequisites complete, secondary not legalized
Expected: legalization blocker.

### Scenario G — ready to file diploma
Expected: document checklist + official TAD action + ~8 month orientative planning note.

### Scenario H — TAD SUBSANACIÓN
Expected: urgent corrective path and five-day official timing claim.

### Scenario I — TAD TRAMITACIÓN, not yet SIET
Expected: follow TAD / later SIET.

### Scenario J — SIET active
Expected: SIET follow-up; optional certificate-in-process guidance when conditions apply.

### Scenario K — diploma finished but not listed for delivery
Expected: wait/check delivery list.

### Scenario L — listed for delivery
Expected: jura options.

## 5. UI smoke tests

At minimum manually or automatically verify:

- home renders without JS errors;
- triage works keyboard-only;
- back/reset works;
- refresh preserves state when persistence is enabled;
- reset removes persisted state;
- external links have an external affordance;
- content routes return 200;
- mobile widths do not produce unusable horizontal overflow;
- callouts are distinguishable without relying only on color.

## 6. Production checks

Before release:

- lint passes;
- type check passes;
- unit tests pass;
- knowledge validation passes;
- production build passes;
- no API key required;
- no personal data is present in repository assets;
- no unsanitized source screenshot is in `public/`;
- high-volatility links/form references are rechecked;
- page metadata/title/description are set;
- 404 behavior is reasonable.

## 7. Definition of "not done"

Do not mark a task complete if:

- build is failing;
- resolver has untested gate logic;
- content duplicates contradictory facts;
- a public screenshot contains PII;
- AI dependencies were added to v1;
- official actions are represented as local transactions;
- a known source contradiction was silently ignored.
