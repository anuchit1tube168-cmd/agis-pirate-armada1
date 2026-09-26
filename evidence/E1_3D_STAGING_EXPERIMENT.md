# E1-3D-STAGING — Reproducibility Experiment

Status: CI_VALIDATED_BROWSER_SMOKE_PENDING (not skill-validated)
Phase: 2B staging/sandbox only; production write OFF
Signal: SIG-004
Downstream: JOB-008 / E1-3D-STAGING
Owner: MAKER / AG-007
Architecture review: AETHER / AG-006
QA/Eval: SENTINEL / AG-008
Learning review: MENTOR / AG-012

## Claim discipline
- VERIFIED FACT: SIG-004 exists in the Scout inbox and is routed to this experiment.
- VERIFIED FACT: this experiment uses JOB-008 so its evidence chain remains separate from JOB-006 Mission Dashboard Baseline.
- SOURCE CLAIM: creator-owned public material suggests a Three.js + TypeScript/Vite interactive-web build pattern.
- HYPOTHESIS: explicit state/simulation/render/input/UI separation plus fallback behavior will improve reproducibility/reuse without lowering quality.
- UNKNOWN: elapsed time, defect count, rework count, bundle/build time, reuse gain, and whether this pattern deserves SKILL.md promotion.

## Build scope
Build a minimal interactive 3D configurator in staging/sandbox only. The artifact must be small enough to reproduce from a clean checkout and must not require secrets, privileged client writes, production data, or production deployment.

Required boundaries:
1. `state` — serializable application/configuration state; no renderer dependency.
2. `simulation` — deterministic state transitions; no DOM/Three.js side effects.
3. `render` — Three.js scene/camera/renderer and visual projection of state.
4. `input` — pointer/keyboard intent translated into commands; no business-state mutation outside the transition API.
5. `ui` — HTML/CSS controls/status; no direct scene ownership.
6. `data` — typed static configuration/catalog data separated from runtime state.

## Minimum behavior
- Load one simple 3D object/primitive without external secrets or paid assets.
- At least two deterministic configuration choices change visible state.
- Keyboard-accessible controls for the critical interaction.
- Empty/loading/error state where applicable.
- Reduced-motion or non-animated fallback path.
- If WebGL initialization fails, show a usable explanatory fallback instead of a blank screen.

## Reproducibility gates
A clean-checkout run must record exact commands and outputs for:
1. dependency install;
2. typecheck;
3. build;
4. automated test of at least one critical deterministic state transition;
5. automated or documented smoke check of fallback behavior.

PASS requires all five gates to pass with no secrets and no production writes.

## Architecture review — AETHER
Review before skill consideration:
- state is renderer-independent;
- deterministic transitions are testable without browser rendering;
- input/UI cannot bypass transition boundary;
- render layer can be replaced without rewriting business state;
- fallback path is explicit;
- dependencies are minimal and justified.

Verdict: PASS — module boundaries previously reviewed; CI validation complete. Browser fallback/reduced-motion smoke remains required.

## QA/Eval — SENTINEL
Record:
- clean-checkout PASS/FAIL;
- typecheck PASS/FAIL;
- build PASS/FAIL;
- critical-state test PASS/FAIL;
- fallback smoke PASS/FAIL;
- elapsed human time;
- defects found;
- rework cycles;
- reused assets/components;
- unresolved defects.

Verdict: PARTIAL PASS — GitHub Actions run 36142304833 on commit 59c7641cffd110f20f100ba8b489ba0e32ad85f5 passed clean dependency install, typecheck, deterministic tests, and production build. Fallback/reduced-motion browser smoke remains PENDING; elapsed human time remains UNKNOWN.

## Promotion rule — MENTOR
Do not create or promote a SKILL.md from this experiment unless SENTINEL reproduces the clean build/test and AETHER passes the boundary review. One passing experiment is evidence for a skill candidate, not proof of generality. Prefer merging the validated lesson into an existing web/full-stack/game-development skill when possible.

## Failure rule
On failure, preserve the failed hypothesis and root cause, change one constraint/checklist/tooling assumption, and retest. Do not create a new Agent to bypass a build/tool/access blocker.

## Acceptance outcome
Current outcome: CI_VALIDATED_BROWSER_SMOKE_PENDING — implementation has reproducible CI evidence from GitHub Actions run 36142304833 (clean install/typecheck/deterministic tests/build PASS). Browser fallback/reduced-motion smoke and final MENTOR learning review remain required before DONE or SKILL.md promotion.
