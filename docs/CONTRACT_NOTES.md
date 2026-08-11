# Contract notes discovered during Tasks 02–03

## Safety adapter around diploma entry

The frozen journey contract v1.0 is preserved byte-for-byte.

During Task 02, one implementation-level safety issue became visible: top-level triage
option `E` ("Estoy por iniciar o ya inicié el trámite de diploma") enters
`S50_DIPLOMA_CHECK` directly. If the user says the diploma has not yet been initiated,
the frozen branch can reach `S53_READY_TO_FILE` without explicitly re-checking academic
completion and plan regularization in that session.

That conflicts with the acceptance invariant in `docs/ACCEPTANCE_TESTS.md`: unknown
blocking prerequisites must never be treated as satisfied.

V1 therefore uses a narrow, documented resolver adapter:

- triage `E` starts at `S30_ACADEMIC_CLOSE_CHECK`;
- after a regularization receives its numbered resolution (`S45_RESOLUTION_READY`), the
  resolver returns through `S30_ACADEMIC_CLOSE_CHECK` before the diploma branch.

This does **not** change either frozen YAML file and does not change any claim. It merely
forces explicit confirmation of existing gates before the "ready to file" result.

If the state contract is revised after v1, these two adapters should be incorporated into
a versioned graph revision and removed from implementation code.

## Task 03 — volatile navigation targets

The frozen content/evidence registry v1.0 is also preserved byte-for-byte.

Release verification found that the current official LCD Tutorías page links to a newer
tutor request form and a newer PEI form than the URLs captured in the pre-development
registry. The underlying claims did not change; only the outbound destinations changed.

Rather than silently editing the frozen registry or hard-coding fresh URLs in UI code,
v1 introduces:

- `knowledge/egreso-lcd-navigation-targets-v1.1.yaml`

This is an explicit, versioned release overlay for volatile navigation targets. The
knowledge loader validates that the overlay declares the registry version it extends and
covers every navigation target expected by the registry.

Current release behavior is therefore:

- claims and source authority: registry v1.0;
- state machine: journey graph v1.0 plus the documented safety adapter above;
- actionable outbound navigation: navigation-target overlay v1.1.

A future registry revision may absorb these target changes if/when the content contract
itself is versioned for other reasons.
