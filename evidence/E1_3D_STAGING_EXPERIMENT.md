# E1-3D-STAGING — Reproducibility Experiment

Status: REVIEW — CI PASS; AETHER BOUNDARY RE-REVIEW PASS; SENTINEL QA PASS
Phase: 2B staging/sandbox only; production write OFF
Signal: SIG-004
Downstream: JOB-008 / E1-3D-STAGING
Owner: MAKER / AG-007
Architecture review: AETHER / AG-006
QA/Eval: SENTINEL / AG-008
Learning review: MENTOR / AG-012
Activated: 2026-10-27
Final technical review: 2026-10-28

## Claim discipline
- VERIFIED FACT: SIG-004 is routed to this experiment.
- VERIFIED FACT: corrected implementation exists under `experiments/e1-3d-staging/`.
- VERIFIED FACT: GitHub Actions run 40665206902 on head `d66c9a482d64bd768fc99b99839f4d696a21371b` completed SUCCESS.
- VERIFIED FACT: clean dependency install, typecheck, deterministic critical-state tests, production build, and static fallback/reduced-motion assertions all passed in that run.
- VERIFIED FACT: `src/state.ts` remains renderer-independent and is the deterministic transition authority.
- VERIFIED FACT: `src/render.ts` owns Three.js projection/frame behavior behind `RenderBoundary`; `src/input.ts` emits commands through dispatch; `src/ui.ts` owns fallback/reduced-motion DOM status; `src/main.ts` composes these boundaries.
- INFERENCE: the corrected implementation now satisfies the experiment's explicit separation requirement sufficiently for this staging experiment and the render layer can be replaced behind the boundary without moving business-state transitions.
- SOURCE CLAIM: creator-owned public material suggested the original Three.js + TypeScript/Vite pattern; this source claim is not itself treated as proof.
- UNKNOWN: elapsed human time, quantified reuse gain, cross-project generality, and whether this deserves skill promotion.

## Reproducibility gates — SENTINEL CI evidence
GitHub Actions run: `40665206902`
Head SHA: `d66c9a482d64bd768fc99b99839f4d696a21371b`
1. clean dependency install — PASS;
2. typecheck — PASS;
3. deterministic critical-state automated test — PASS;
4. production build — PASS;
5. fallback/reduced-motion static assertion — PASS.

CI verdict: PASS 5/5.

## Architecture re-review — AETHER
Criteria: state renderer-independence; deterministic transition testability; no UI/input bypass of transition boundary; replaceable render layer; explicit fallback; minimal justified dependencies.

Findings:
- PASS: `state.ts` remains renderer-independent.
- PASS: deterministic transitions remain CI-tested.
- PASS: `input.ts` emits `Command` objects through the supplied dispatch function; it does not mutate business state.
- PASS: `render.ts` owns Three.js and exposes `RenderBoundary` (`project`, `frame`, `dispose`).
- PASS: `ui.ts` owns fallback/reduced-motion DOM status and has no scene ownership.
- PASS: `main.ts` is now composition/dispatch orchestration rather than combined render/input/UI ownership.
- PASS: fallback and reduced-motion paths are explicit and covered by the CI assertion gate.

Verdict: PASS for the stated staging experiment boundary contract.

## QA/Eval — SENTINEL
Automated reproducibility evidence: PASS 5/5 on run 40665206902.
Independent evidence review: PASS — the workflow job `sentinel` completed SUCCESS and every named acceptance step completed SUCCESS.

Final QA verdict: PASS for reproducibility and stated technical acceptance. This does not prove business ROI, time-compression gain, cross-project generality, or production readiness.

## Learning / promotion decision pending — MENTOR
The experiment now provides one validated technical example, including a useful failure/rework chain: missing type declarations → fix/retest; architecture boundary failure → targeted refactor; stale fallback assertion → align eval with corrected boundary → retest PASS.

Do not create a new permanent Agent. MENTOR should next decide MERGE_TO_SKILL vs RETEST using the existing web/full-stack/game-development skill path. One passing experiment is not proof of generality.

## Acceptance outcome
Current outcome: TECHNICAL ACCEPTANCE PASS; JOB-008 may move from ACTIVE to REVIEW. It must not be marked DONE until MENTOR records the learning disposition and required outcome feedback, and elapsed/reuse claims remain UNKNOWN unless measured evidence is added.
