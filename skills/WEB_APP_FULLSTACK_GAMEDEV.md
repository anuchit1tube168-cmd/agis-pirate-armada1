# WEB APP + JS FULL-STACK + 2D/3D GAMEDEV — BUILDER SKILL CANDIDATE

**Status:** CANDIDATE / NOT PROMOTED
**Owner:** AG-007 BUILDER
**Review:** AG-006 ARCHITECT + AG-008 QA/EVAL + AG-009 SECURITY
**Trigger:** Boss Agis identified a recurring capability gap in high-quality web apps, JavaScript frontend/backend, 2D/3D game development and build/deploy work.

## Purpose
Strengthen the existing BUILDER before creating a new agent. This skill is promoted only after independent eval evidence.

## Default build flow
UNDERSTAND → CHECK CONTEXT → REUSE → PLAN → BUILD → TEST → FIX → VERIFY → DOCUMENT → EXTRACT SKILL

## Capability tracks
1. **Frontend JS:** semantic HTML, responsive CSS, accessible UI, state/events, forms, validation, loading/error/empty states, performance.
2. **Backend JS:** API contracts, validation, auth/RBAC, persistence, idempotency, audit, structured errors, secrets server-side.
3. **Full-stack:** explicit client/server boundary, typed/validated contracts, staging config, observability, rollback.
4. **2D:** deterministic game state, update/render separation, input, collision, camera, assets/audio, save state, performance budget.
5. **3D:** scene/render/input separation, asset lifecycle, camera/controls, lighting, collision/physics boundary, LOD/performance budget, WebGL fallback.
6. **Build/Deploy:** lint/typecheck/test/build, environment separation, no secrets in client/repo, staging first, smoke/E2E, rollback evidence.

## Architecture rule
Keep domain/game state independent from rendering and UI. Prefer modules:
- data/domain
- simulation/services
- API/integration
- render
- input
- UI
- tests/evals

Framework choice follows requirements and existing project context; do not add a framework merely for novelty.

## Senior/Junior routing
- **Junior task:** bounded component, page, CRUD route, simple 2D mechanic; must use checklist and review.
- **Senior task:** architecture, auth/data model, cross-module integration, performance, 3D systems, deployment/rollback.
- BUILDER may execute both; these are task difficulty levels, not new permanent agents.

## Acceptance gate
A web/game build is not DONE until applicable checks pass:
- requirement/acceptance criteria traceable;
- lint/type/build succeeds;
- unit/integration tests for critical logic;
- responsive smoke test;
- error/loading/empty states tested;
- no client/repo secrets;
- write actions permission-gated and auditable where required;
- staging smoke/E2E evidence;
- rollback path documented;
- QA/EVAL independent review.

## Evidence-to-skill rule
After a meaningful win/failure:
1. record evidence and failure class;
2. identify reusable pattern;
3. add/update a test/checklist/template;
4. retest on a real task;
5. promote into this skill only when QA/EVAL evidence shows improvement.

Do not award capability/level from documentation alone.

## Capability Gap Gate
Do **not** create a Web Developer/Game Developer agent yet. First run this skill through AG-007 BUILDER on real jobs. Consider a temporary specialist only after the repository Capability Gap Gate is satisfied.

## Initial eval cases
- E1 responsive JS web app with form validation + API error recovery.
- E2 authenticated backend write with approval/audit boundary.
- E3 small 2D interactive scene with separated simulation/render/input.
- E4 small 3D scene with asset cleanup and measured frame/performance budget.
- E5 staging build/deploy with smoke test and rollback instructions.

## Promotion metric
Record pass/fail, defects, elapsed/human time, rework and reused assets. Promote only if quality holds or improves and repeated work becomes measurably faster/more reliable.


## Research-backed training update — 2026-09-19
**Evidence state:** CANDIDATE; source material informs experiments but does not itself prove Builder improvement.

### Verified source observations
- MilerDev publicly structures learning around understanding the problem/reason first, coding concepts/examples, and connecting lessons into projects that can be explained, tested, and extended.
- Its public catalog exposes HTML/CSS, JavaScript, Figma-to-Code, and ReactJS tracks.
- The public React track starts with project setup/structure, JSX, components, props, conditional rendering, and list rendering.

### Builder training rule derived for evaluation
For frontend missions, use:
PROBLEM/GOAL -> VISUAL/COMPONENT DECOMPOSITION -> DATA/STATE -> IMPLEMENT -> ERROR/EMPTY/LOADING -> RESPONSIVE/A11Y -> TEST -> BUILD -> REVIEW

Treat this sequence as a HYPOTHESIS until E1/E5 produce before/after evidence.

### E1-A — Project-first React web app
Build a small staging-only mission dashboard using reusable components and explicit state.
Acceptance:
1. component boundaries documented;
2. loading/error/empty states;
3. responsive keyboard-usable UI;
4. lint/typecheck/build pass;
5. at least one critical state test;
6. no secrets/client privileged writes;
7. QA records defects, elapsed time and rework.

### E1-B — Design-to-code
Given one approved design/screenshot, first create a component/layout map, then implement it responsively.
Measure: visual defects, responsive defects, accessibility defects and number of rework rounds.

### Promotion
If E1-A/E1-B show repeatable quality/time improvement under independent QA, promote the validated rules into stable skill guidance. Otherwise revise or reject them.
