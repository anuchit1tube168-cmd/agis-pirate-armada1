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
