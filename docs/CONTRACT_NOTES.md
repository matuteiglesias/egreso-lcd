# Contract notes discovered during Task 02

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
