# AGIS AI ORGANIZATION 100 — PHASE 2A

## Objective
Create exactly **100 specialized AI roles** that operate under Boss Agis through an explicit hierarchy, shared data contracts, independent evaluation and permission boundaries.

This is an **organization design and runtime registry**, not a claim that 100 autonomous processes are continuously executing.

## Structure
- Boss Agis — human owner / final authority (not counted as an AI agent)
- 100 AI agents
- 10 departments × 10 specialists
- AGIS Commander is the top AI orchestrator
- Department leads supervise specialists
- High-impact actions still require human approval

## Departments
1. Command & Strategy
2. Research & Intelligence
3. Customer & Market
4. Product & UX
5. Engineering & Architecture
6. Data & Knowledge
7. Eval, QA & Security
8. Integration & Automation
9. Growth, Sales & Distribution
10. Operations, Finance & Learning

## Every agent must have
- immutable ID;
- name / specialty;
- mission;
- KPI;
- permission level;
- supervisor;
- current job;
- state;
- skill maturity;
- evidence/review path.

## State semantics
- WORKING — backed by an active approved job or current build activity.
- REVIEW — independently reviewing a concrete artifact/job.
- LEARNING — processing evidence into a candidate skill.
- BLOCKED — cannot proceed due to missing data/permission/dependency.
- READY — registered and available, but not executing.

Never show READY agents as WORKING just to make the office look busy.

## Learning
Agents share the organizational data layer but do not blindly share private customer data.
Promotions to reusable skill follow EVOLUTION.md and DATA_LEARNING_OS.md.

## Phase progression
### Phase 2A — now
- 100-agent registry
- org hierarchy
- visual AI Office
- truthful state model
- activity feed
- click-through profiles
- Phase 2A tests

### Phase 2B
- authenticated runtime/API
- job dispatch
- agent heartbeats
- SSE/webhook state updates
- durable audit events
- approval gateway

### Phase 2C
- model/tool routing
- budget controls
- memory/skill retrieval
- independent eval workers
- bounded parallel execution

### Phase 2D
- real customer workflow execution
- economic telemetry
- cross-workflow skill reuse
- controlled scale-out

Production write remains OFF until approval gates and audit are in place.
