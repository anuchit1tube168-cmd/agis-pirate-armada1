# E1-3D-STAGING — Reproducibility Experiment

Status: WORKING — IMPLEMENTATION PRODUCED; CI/REVIEWS PENDING
Phase: 2B staging/sandbox only; production write OFF
Signal: SIG-004
Downstream: JOB-008 / E1-3D-STAGING
Owner: MAKER / AG-007
Architecture review: AETHER / AG-006
QA/Eval: SENTINEL / AG-008
Learning review: MENTOR / AG-012
Activated: 2026-10-27

## Claim discipline
- VERIFIED FACT: SIG-004 is routed to this experiment and remains unvalidated.
- VERIFIED FACT: a minimal implementation now exists under `experiments/e1-3d-staging/` with renderer-independent deterministic state transitions, Three.js rendering, keyboard/button commands, reduced-motion handling and a WebGL failure fallback.
- VERIFIED FACT: `.github/workflows/job008-e1-3d-check.yml` defines clean dependency install, typecheck, deterministic state tests, production build and static fallback/reduced-motion assertions.
- UNKNOWN: CI PASS/FAIL at this evidence update; no run result has been accepted as evidence yet.
- SOURCE CLAIM: creator-owned public material suggests a Three.js + TypeScript/Vite interactive-web build pattern.
- HYPOTHESIS: explicit state/render/input/UI separation plus fallback behavior will improve reproducibility/reuse without lowering quality.
- UNKNOWN: elapsed human time, defects, rework, reuse gain and whether this deserves skill promotion.

## Implementation scope
Artifact: `experiments/e1-3d-staging/`
- `src/state.ts`: serializable state and deterministic transition API; no renderer dependency.
- `src/main.ts`: Three.js projection of state, UI/input dispatch, reduced-motion path and fail-usable WebGL fallback.
- `tests/state.test.ts`: deterministic transition and reversible motion tests.
- `package.json` + `tsconfig.json`: minimal TypeScript/Vite/Three.js package.
- `index.html`: staging shell with keyboard-compatible command path.

## Reproducibility gates
Required evidence before PASS:
1. clean dependency install — PENDING CI EVIDENCE;
2. typecheck — PENDING CI EVIDENCE;
3. build — PENDING CI EVIDENCE;
4. deterministic critical-state automated test — PENDING CI EVIDENCE;
5. fallback/reduced-motion smoke/assertion — PENDING CI EVIDENCE.

PASS requires all five gates to pass with no secrets and no production writes.

## Architecture review — AETHER
Review criteria: state renderer-independence; deterministic transition testability; no UI/input bypass of transition boundary; replaceable render layer; explicit fallback; minimal justified dependencies.

Verdict: PENDING.

## QA/Eval — SENTINEL
CI workflow is present, but no successful run is claimed here until the run result is retrieved and reviewed.

Verdict: PENDING.

## Promotion rule — MENTOR
Do not create/promote a SKILL.md unless SENTINEL reproduces the clean build/test and AETHER passes the boundary review. One passing experiment is only evidence for a skill candidate; prefer merging a validated lesson into an existing skill.

## Failure rule
On failure, preserve failed hypothesis/root cause, change one constraint/checklist/tooling assumption and retest. Do not create a new Agent to bypass build/tool/access blockers.

## Acceptance outcome
Current outcome: UNKNOWN — implementation exists, but JOB-008 remains ACTIVE and must not become REVIEW/DONE until all five gates plus AETHER/SENTINEL reviews have evidence.
