# E1-3D-STAGING — Reproducibility + Reuse Experiment

Status: QA_REUSE_PASS_LESSON_READY_FOR_SKILL_MERGE
Phase: 2B staging/sandbox only; production write OFF
Signal: SIG-004
Downstream: JOB-008 / E1-3D-STAGING
Owner: MAKER / AG-007
Architecture review: AETHER / AG-006
QA/Eval: SENTINEL / AG-008
Learning review: MENTOR / AG-012

## Claim discipline
- VERIFIED FACT: SIG-004 is routed to JOB-008.
- VERIFIED FACT: first-build GitHub Actions run 37319740059 passed clean dependency install, typecheck, deterministic tests, production build, Chromium installation, and browser acceptance smoke.
- VERIFIED FACT: first-build traceable corrective history establishes a lower bound of 2 defects and 2 rework cycles.
- VERIFIED FACT: the first build demonstrated 0 reused repository files/components.
- VERIFIED FACT: a second independent staging consumer at `experiments/e1-reuse-staging/src/scenario.ts` imports and executes the existing renderer-independent `experiments/e1-3d-staging/src/state.ts` boundary.
- VERIFIED FACT: second-consumer SENTINEL GitHub Actions run 37690959333 on commit 340946921fdf98d6a7b0b0198b27491682cfd635 completed SUCCESS after clean dependency install, typecheck, deterministic reuse test, and build gate.
- VERIFIED FACT: the reused `state.ts` boundary contains only serializable TypeScript state/types and a deterministic `transition()` function; it imports no DOM, WebGL, Three.js, renderer, UI, network, credential, or production-write dependency.
- INFERENCE: the state/transition separation is reusable across at least these two staging consumers without requiring renderer coupling.
- HYPOTHESIS: extracting reusable domain/state boundaries behind stable package/module interfaces will generalize better than cross-experiment relative source imports.
- UNKNOWN: elapsed active human time, full defect/rework totals, quantified time savings, revenue impact, and generality beyond the two tested consumers.

## Build scope
Minimal Three.js + TypeScript/Vite interactive configurator in staging/sandbox only, with explicit state/simulation/render/input/UI/data separation, no secrets, no privileged client writes, and no production deployment.

## Architecture review — AETHER
PASS for the validated lesson, with packaging caveat.

Evidence:
- `state.ts` is renderer-independent and deterministic.
- second consumer can execute the same transition boundary without browser rendering.
- the tested reusable boundary does not contain UI/input/render ownership.
- SENTINEL independently reproduced the consumer through CI.

Caveat:
- the second consumer currently imports the producer source by relative repository path (`../../e1-3d-staging/src/state`). This proves boundary reuse inside this repository but is a brittle distribution contract. Do not promote that path layout as the reusable pattern.
- future broader reuse should extract the validated state/transition contract to a stable shared module/package or explicit public interface, then retest consumers.

AETHER verdict: PASS_FOR_LESSON / RETEST_FOR_SHARED_PACKAGE_GENERALIZATION.

## QA/Eval — SENTINEL
First build:
- clean checkout/install: PASS via run 37319740059;
- typecheck: PASS;
- deterministic test: PASS;
- build: PASS;
- browser fallback/reduced-motion smoke: PASS;
- traceable defects/rework: >=2 / >=2;
- demonstrated repository reuse: 0.

Second independent consumer:
- exact reused artifact: `experiments/e1-3d-staging/src/state.ts`;
- consumer: `experiments/e1-reuse-staging/src/scenario.ts`;
- clean dependency install: PASS via run 37690959333;
- typecheck: PASS;
- deterministic reuse test: PASS;
- build: PASS;
- demonstrated reused repository boundary: >=1;
- active human time: UNKNOWN; do not infer from commit timestamps.

SENTINEL verdict: PASS for reproducible cross-build boundary reuse within tested scope.

## Learning review — MENTOR
Decision: MERGE_VALIDATED_LESSON_TO_EXISTING_SKILL; DO NOT CREATE NEW AGENT.

Validated lesson eligible for merge into `skills/WEB_APP_FULLSTACK_GAMEDEV.md`:
1. keep domain/game state and deterministic transitions independent from renderer/UI/input/environment-specific APIs;
2. require a second independent consumer plus clean install/typecheck/test/build evidence before claiming a boundary reusable;
3. record exact reused artifact path/ID;
4. treat repository-relative source imports as test evidence, not as the preferred long-term distribution contract;
5. extract to a stable shared module/package only when broader reuse is needed, then retest.

This decision does NOT claim measured speed improvement, revenue impact, universal generality, or readiness for production deployment.

## Failure / learning record
- Vitest/Playwright discovery collision was corrected by separating deterministic and browser test discovery boundaries.
- Browser semantic-selector mismatch was corrected by aligning the acceptance test to the stable semantic control without weakening the interaction criterion.
- Initial second-consumer typecheck failed because its QA type environment was incomplete. The corrective change declared the required Node type context; run 37690959333 then passed. Preserve this as evidence that reusable source boundaries and consumer toolchain/type context are separate concerns.

## Acceptance outcome
Current outcome: QA_REUSE_PASS_LESSON_READY_FOR_SKILL_MERGE. Reproducibility passed on the original staging build and cross-build reuse passed on a second independent staging consumer. AETHER passes the architecture lesson while explicitly rejecting the relative path layout as a long-term reuse contract. MENTOR approves merging the validated lesson into the existing web/full-stack/game-development skill, not creating a new Agent. Human time and time-compression remain UNKNOWN. Production write remains OFF.