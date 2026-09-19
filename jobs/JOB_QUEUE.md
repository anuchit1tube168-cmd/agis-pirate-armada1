# JOB QUEUE — ACTIVE WORK

## Job template
```
JOB_ID:
STATUS: QUEUED | ACTIVE | REVIEW | BLOCKED | DONE
OWNER_AGENT:
REVIEWER:
BUSINESS_OBJECTIVE:
CONTEXT:
DELIVERABLE:
ACCEPTANCE_TEST:
TARGET_METRIC:
TIME_BUDGET:
DEPENDENCIES:
PERMISSION_LEVEL:
EVIDENCE_REQUIRED:
IF_PASS:
IF_FAIL:
```

## Initial jobs

### JOB-001 — Lock $10M Math
STATUS: ACTIVE
OWNER_AGENT: CFO / MATH AGENT
REVIEWER: AGIS COMMANDER
BUSINESS_OBJECTIVE: make the $10M gap visible and impossible to hand-wave.
DELIVERABLE: target definition, target date, scenario table, required ACV/customer/pipeline equations.
ACCEPTANCE_TEST: every number labeled verified vs assumption.
TARGET_METRIC: 100% of target math traceable to evidence/assumption.
PERMISSION_LEVEL: READ/WRITE project docs only.

### JOB-002 — Select Golden Workflow
STATUS: QUEUED
OWNER_AGENT: CUSTOMER + PRODUCT
REVIEWER: CFO / MATH
BUSINESS_OBJECTIVE: choose the fastest workflow to measurable paid ROI.
DELIVERABLE: ranked candidates with quantified pain and buyer.
ACCEPTANCE_TEST: winning workflow has measurable baseline and identifiable payer.
TARGET_METRIC: 10 customer evidence points.

### JOB-003 — Baseline Time Study
STATUS: QUEUED
OWNER_AGENT: PRODUCT
REVIEWER: QA / EVAL
BUSINESS_OBJECTIVE: know what “faster” means.
DELIVERABLE: baseline steps/minutes/errors/cost for Golden Workflow.
ACCEPTANCE_TEST: measurement reproducible.
TARGET_METRIC: baseline captured before automation.

### JOB-004 — Agent Registry
STATUS: ACTIVE
OWNER_AGENT: ARCHITECT
REVIEWER: SECURITY
BUSINESS_OBJECTIVE: split work safely and repeatably.
DELIVERABLE: roles, permissions, KPIs, reviewer pairing.
ACCEPTANCE_TEST: every agent has least-privilege scope and review rule.
TARGET_METRIC: 100% active agents registered.

### JOB-005 — Daily Training Loop
STATUS: ACTIVE
OWNER_AGENT: LEARNING COACH
REVIEWER: QA / EVAL
BUSINESS_OBJECTIVE: ensure failures create durable improvement.
DELIVERABLE: training log + measurable before/after rule.
ACCEPTANCE_TEST: no lesson promoted without retest evidence.
TARGET_METRIC: eliminate repeated identical failure patterns.

### JOB-006 — Builder E1-A Mission Dashboard Baseline
STATUS: ACTIVE
OWNER_AGENT: BUILDER
REVIEWER: QA / EVAL
BUSINESS_OBJECTIVE: turn the web/frontend capability gap into measurable evidence before adding agents or promoting a skill.
CONTEXT: Use skills/WEB_APP_FULLSTACK_GAMEDEV.md E1-A. This is a staging-only training experiment, not a production feature and not evidence of revenue.
DELIVERABLE: small mission dashboard implementation plus reproducible build/test evidence and an eval record.
ACCEPTANCE_TEST: component boundaries documented; loading/error/empty states; responsive keyboard-usable UI; lint/typecheck/build pass; >=1 critical-state test; no secrets/client privileged writes; QA records defects, elapsed time and rework.
TARGET_METRIC: establish the first reproducible Builder web-app baseline for pass/fail, defects, elapsed time, rework and reused assets.
TIME_BUDGET: measure actual elapsed/human time; do not invent a target duration before baseline exists.
DEPENDENCIES: WEB_APP_FULLSTACK_GAMEDEV skill candidate; existing staging/sandbox only.
PERMISSION_LEVEL: staging/sandbox write only; production write OFF.
EVIDENCE_REQUIRED: commit/artifact, test/build output, QA result, elapsed/human time, defects/rework, reused assets.
IF_PASS: run E1-B design-to-code comparison and evaluate skill promotion evidence.
IF_FAIL: enter OODA/root-cause loop, change the build hypothesis/checklist/tooling, retest, and record the failed approach.
