# E1-3D-STAGING — Reproducibility Experiment

Status: WORKING — CI PASS; AETHER BOUNDARY REVIEW FAIL; REWORK REQUIRED
Phase: 2B staging/sandbox only; production write OFF
Signal: SIG-004
Downstream: JOB-008 / E1-3D-STAGING
Owner: MAKER / AG-007
Architecture review: AETHER / AG-006
QA/Eval: SENTINEL / AG-008
Learning review: MENTOR / AG-012
Activated: 2026-10-27
Reviewed: 2026-10-28

## Claim discipline
- VERIFIED FACT: SIG-004 is routed to this experiment and remains unvalidated.
- VERIFIED FACT: implementation exists under `experiments/e1-3d-staging/`.
- VERIFIED FACT: GitHub Actions run 40553180622 on head `506e4585dcbb62b5fad2a54482b7c69f5bd408fd` completed SUCCESS. Clean dependency install, typecheck, deterministic critical-state tests, production build, and static fallback/reduced-motion assertions all passed.
- VERIFIED FACT: `src/state.ts` is renderer-independent and exposes a deterministic transition API.
- VERIFIED FACT: `src/main.ts` currently combines Three.js rendering, DOM/UI event wiring, keyboard input, dispatch, animation, reduced-motion handling, and fallback behavior in one module.
- INFERENCE: the current implementation is reproducible, but it does not yet satisfy the experiment's explicit architecture boundary requirement for separated render/input/ui modules or a replaceable render layer without rewriting the combined main module.
- SOURCE CLAIM: creator-owned public material suggests a Three.js + TypeScript/Vite interactive-web build pattern.
- HYPOTHESIS: explicit state/render/input/UI separation plus fallback behavior will improve reproducibility/reuse without lowering quality.
- UNKNOWN: elapsed human time, reuse gain, and whether this deserves skill promotion.

## Implementation scope
Artifact: `experiments/e1-3d-staging/`
- `src/state.ts`: serializable state and deterministic transition API; no renderer dependency.
- `src/main.ts`: currently combines render, UI/input dispatch, reduced-motion and WebGL fallback.
- `tests/state.test.ts`: deterministic transition tests.
- `package.json` + `tsconfig.json`: TypeScript/Vite/Three.js package.
- `index.html`: staging shell.

## Reproducibility gates — SENTINEL CI evidence
GitHub Actions run: `40553180622`
Head SHA: `506e4585dcbb62b5fad2a54482b7c69f5bd408fd`
1. clean dependency install — PASS;
2. typecheck — PASS;
3. build — PASS;
4. deterministic critical-state automated test — PASS;
5. fallback/reduced-motion static assertion — PASS.

CI verdict: PASS 5/5. This proves reproducibility gates only; it does not override architecture review.

## Architecture review — AETHER
Criteria: state renderer-independence; deterministic transition testability; no UI/input bypass of transition boundary; replaceable render layer; explicit fallback; minimal justified dependencies.

Findings:
- PASS: `state.ts` has no renderer dependency.
- PASS: transitions are deterministic and CI-tested.
- PASS: observed UI/keyboard handlers dispatch through the transition API rather than mutating state directly.
- PASS: fallback and reduced-motion paths are explicit.
- FAIL: render/input/UI ownership is not separated as required by the experiment build scope; `main.ts` owns all three.
- FAIL: render layer is not independently replaceable without editing the combined `main.ts` composition/event module.

Verdict: FAIL — targeted architecture rework required. This is a code-structure gap, not a new-Agent capability gap.

## QA/Eval — SENTINEL
Automated reproducibility evidence: PASS 5/5 on run 40553180622.
Independent final QA verdict: PENDING until the AETHER architecture failure is corrected and the full CI suite is rerun.

## Required rework
MAKER should make the smallest sufficient change:
1. extract Three.js ownership/projection into a `render` module with an explicit interface;
2. extract keyboard/button intent wiring into an `input` module that emits commands only;
3. keep DOM status/control composition in a small `ui` or composition module without scene ownership;
4. preserve `state.ts` as the only business-state transition authority;
5. rerun the same five CI gates; then AETHER re-reviews and SENTINEL records final independent verdict.

Do not expand scope, add production writes, add secrets, or create a new Agent.

## Promotion rule — MENTOR
Do not create/promote a SKILL.md unless the corrected implementation passes AETHER boundary review and SENTINEL independently reproduces the acceptance evidence. Prefer MERGE_TO_SKILL over a new permanent Agent.

## Acceptance outcome
Current outcome: RETEST REQUIRED — CI reproducibility is VERIFIED PASS 5/5, but architecture acceptance is FAIL. JOB-008 remains ACTIVE and must not become REVIEW/DONE until targeted rework, CI retest, AETHER re-review and SENTINEL final QA all pass.
