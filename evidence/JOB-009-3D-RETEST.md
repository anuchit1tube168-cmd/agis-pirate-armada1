# JOB-009 — Second bounded 3D/web reuse retest

## Claim state
- VERIFIED FACT: JOB-008 technical acceptance passed; MENTOR required a second bounded retest before stable skill promotion.
- HYPOTHESIS: reusing the separated state/render/input/UI pattern will preserve quality and reduce rework on a second task.
- UNKNOWN: total elapsed human time, final defect count, rework count, reuse ratio, time-compression factor, cross-project generality.

## Prospective measurement start
Measurement started before implementation expansion on 2026-10-29 Asia/Bangkok. Do not backfill elapsed time from JOB-008.

## Bounded task
Extend the configurator domain to three shapes plus a wireframe state while preserving renderer-independent deterministic transitions and the existing boundary contract. Staging/sandbox only; production write OFF.

## Reuse plan
Reuse conceptually from JOB-008: deterministic `state.ts` transition authority; RenderBoundary contract; input-to-Command dispatch; UI/fallback separation; CI acceptance pattern. Reuse must be counted only after the retest implementation is complete.

## Acceptance
1. deterministic state tests cover shape cycle, motion and wireframe;
2. typecheck/build pass;
3. render/input/UI boundaries remain separated;
4. fallback/reduced-motion behavior remains available;
5. AETHER review + SENTINEL independent QA;
6. record elapsed time, defects, rework and reused components prospectively.

## Current evidence
First implementation slice created `experiments/e1-3d-retest-2/src/state.ts` with three-shape cycle and wireframe state. This is not acceptance evidence and does not make the job DONE.

## Learning disposition
Pending. PROMOTE / MERGE_TO_SKILL / RETEST / REJECT only after acceptance and measurement evidence.
