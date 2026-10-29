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
OWNER_AGENT: ORACLE / AG-002
REVIEWER: ATLAS / AG-001
BUSINESS_OBJECTIVE: make the $10M gap visible and impossible to hand-wave.
DELIVERABLE: target definition, target date, scenario table, required ACV/customer/pipeline equations.
ACCEPTANCE_TEST: every number labeled verified vs assumption.
TARGET_METRIC: 100% of target math traceable to evidence/assumption.
PERMISSION_LEVEL: READ/WRITE project docs only.

### JOB-002 — Select Golden Workflow
STATUS: QUEUED
OWNER_AGENT: ECHO / AG-004 + FORGE / AG-005
REVIEWER: ORACLE / AG-002
BUSINESS_OBJECTIVE: choose the fastest workflow to measurable paid ROI.
DELIVERABLE: ranked candidates with quantified pain and buyer.
ACCEPTANCE_TEST: winning workflow has measurable baseline and identifiable payer.
TARGET_METRIC: 10 customer evidence points.

### JOB-003 — Baseline Time Study
STATUS: QUEUED
OWNER_AGENT: FORGE / AG-005
REVIEWER: SENTINEL / AG-008
BUSINESS_OBJECTIVE: know what “faster” means.
DELIVERABLE: baseline steps/minutes/errors/cost for Golden Workflow.
ACCEPTANCE_TEST: measurement reproducible.
TARGET_METRIC: baseline captured before automation.

### JOB-004 — Agent Registry
STATUS: ACTIVE
OWNER_AGENT: AETHER / AG-006
REVIEWER: AEGIS / AG-009
BUSINESS_OBJECTIVE: split work safely and repeatably.
DELIVERABLE: roles, permissions, KPIs, reviewer pairing.
ACCEPTANCE_TEST: every agent has least-privilege scope and review rule.
TARGET_METRIC: 100% active agents registered.

### JOB-005 — Daily Training Loop
STATUS: ACTIVE
OWNER_AGENT: MENTOR / AG-012
REVIEWER: SENTINEL / AG-008
BUSINESS_OBJECTIVE: ensure failures create durable improvement.
DELIVERABLE: training log + measurable before/after rule.
ACCEPTANCE_TEST: no lesson promoted without retest evidence.
TARGET_METRIC: eliminate repeated identical failure patterns.

### JOB-006 — Builder E1-A Mission Dashboard Baseline
STATUS: ACTIVE
OWNER_AGENT: MAKER / AG-007
REVIEWER: SENTINEL / AG-008
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

### JOB-007 — Initial ICP Evidence Gate
STATUS: ACTIVE
OWNER_AGENT: ECHO / AG-004
REVIEWER: FORGE / AG-005
BUSINESS_OBJECTIVE: unblock TODO-011 without inventing customer evidence and create the shortest path to measurable paid ROI.
CONTEXT: Current scoreboard has 0 paying design partners, 0 qualified pipeline and 0 verified ROI cases. Repository search found no existing customer/ICP evidence sufficient to select an ICP as VERIFIED FACT. An ICP may therefore be proposed only as HYPOTHESIS until firsthand evidence exists.
DELIVERABLE: one evidence-backed initial ICP hypothesis, explicit buyer/user/approver assumptions, one repeated workflow hypothesis, and an interview evidence plan that can quantify hours, people, delay, errors and cost.
ACCEPTANCE_TEST: (1) every claim classified VERIFIED FACT / FIRSTHAND CLAIM / SOURCE CLAIM / INFERENCE / HYPOTHESIS / FORECAST / OPINION / UNKNOWN; (2) no customer/revenue claim invented; (3) ICP has an identifiable economic buyer hypothesis and measurable recurring workflow; (4) evidence plan can produce the 10 customer evidence points required by JOB-002; (5) FORGE independently reviews measurability before TODO-011 can be marked DONE.
TARGET_METRIC: 1 reviewable ICP hypothesis + evidence plan; 0 fabricated customer facts; then 10 customer evidence points before Golden Workflow selection.
TIME_BUDGET: prioritize evidence quality over speed; record elapsed time when evidence collection starts.
DEPENDENCIES: customer evidence or approved access to collect it; no dependency on new agents.
PERMISSION_LEVEL: project docs/read-only evidence gathering; external outreach remains draft-only unless separately approved.
EVIDENCE_REQUIRED: traceable source/interview records, claim classifications, reviewer verdict and links/IDs to evidence.
IF_PASS: mark TODO-011 only after review evidence exists, then execute interview evidence collection toward TODO-012/013/014 and JOB-002.
IF_FAIL: keep TODO-011 open, identify the missing evidence/access blocker, and change the evidence route rather than inventing an ICP.

### JOB-008 — E1-3D Staging Reproducibility Experiment
STATUS: REVIEW
OWNER_AGENT: MAKER / AG-007
REVIEWER: AETHER / AG-006 then SENTINEL / AG-008; MENTOR / AG-012 learning disposition pending
BUSINESS_OBJECTIVE: test whether the SIG-004 3D/web build pattern improves reproducibility/reuse without lowering quality.
CONTEXT: SIG-004 creator-owned public material; this ID is intentionally separate from JOB-006 to preserve evidence-chain integrity. Staging/sandbox only; not revenue evidence. Technical acceptance passed on 2026-10-28 after targeted rework and retest; business/time-compression claims remain unproven.
DELIVERABLE: minimal Three.js + TypeScript/Vite interactive configurator with separated state/render/input/UI boundaries and reproducible evidence.
ACCEPTANCE_TEST: clean dependency install; typecheck pass; build pass; >=1 deterministic critical-state automated test; fallback/reduced-motion smoke pass; AETHER boundary review; SENTINEL independent QA; no secrets or production writes.
TARGET_METRIC: measured elapsed human time, defects, rework, reused assets/components, and pass/fail across all five reproducibility gates.
TIME_BUDGET: measured elapsed/human time remains UNKNOWN; do not invent it after the fact.
DEPENDENCIES: SIG-004 and evidence/E1_3D_STAGING_EXPERIMENT.md.
PERMISSION_LEVEL: staging/sandbox write only; production write OFF.
EVIDENCE_REQUIRED: implementation commit/artifact, exact commands/output, AETHER verdict, SENTINEL verdict, elapsed time, defects/rework, reuse evidence.
EVIDENCE: GitHub Actions run 40665206902 on d66c9a482d64bd768fc99b99839f4d696a21371b PASS 5/5; AETHER re-review PASS; SENTINEL final technical QA PASS; evidence/E1_3D_STAGING_EXPERIMENT.md updated in commit d52ad5828e758367845c5269ba42c163e5471064.
IF_PASS: MENTOR evaluates MERGE_TO_SKILL vs RETEST; one pass is only skill-candidate evidence and does not prove generality.
IF_FAIL: preserve failed hypothesis/root cause, change one constraint/checklist/tooling assumption, and retest; do not create a new Agent for a build/tool/access blocker.

### JOB-009 — Second Bounded 3D/Web Reuse Retest
STATUS: REVIEW
OWNER_AGENT: MAKER / AG-007
REVIEWER: AETHER / AG-006 then SENTINEL / AG-008; MENTOR / AG-012 disposition complete
BUSINESS_OBJECTIVE: determine whether the JOB-008 architecture pattern generalizes to a second bounded task with prospective measurement.
CONTEXT: Required by SIG-004 MENTOR disposition. This is a staging-only retest; production write OFF; it is not revenue evidence. Technical acceptance and independent QA passed; measurement objective remains partial because elapsed-human-time precision is insufficient.
DELIVERABLE: second configurator variant with three shapes + wireframe state while preserving deterministic state and separated render/input/UI boundaries.
ACCEPTANCE_TEST: deterministic tests cover shape/motion/wireframe; typecheck/build pass; fallback/reduced-motion retained; AETHER boundary review; SENTINEL independent QA; no secrets/production writes.
TARGET_METRIC: prospectively record elapsed human time, defects, rework, reused components and final pass/fail; compare only after measurement exists.
TIME_BUDGET: measurement started 2026-10-29 before implementation expansion, but precise start/end human-time was not captured; elapsed remains UNKNOWN and must not be backfilled from commit/CI timestamps.
DEPENDENCIES: JOB-008 technical acceptance; skills/WEB_APP_FULLSTACK_GAMEDEV.md candidate; evidence/JOB-009-3D-RETEST.md.
PERMISSION_LEVEL: staging/sandbox write only; production write OFF.
EVIDENCE_REQUIRED: implementation commits, exact test/build outputs, elapsed measurement, defect/rework log, reuse count, AETHER/SENTINEL verdicts.
EVIDENCE: state slice 80ae8304b4cd3104a5a1a91592bb9fc05dd8b0c9; evidence record 593122b4533167350b5a7126eb13d8cf6becb3bf; CI run 40824751914 SUCCESS on 768bda86295ad024dc48c8786df7ce0acedf053e; AETHER PASS; SENTINEL independent QA PASS; five reused pattern categories; one CI bootstrap/dependency-ordering defect corrected; product defects observed in configured acceptance gates after executable retest: 0; evidence/JOB-009-3D-RETEST.md records limits.
IF_PASS: MENTOR disposition is RETEST / DO NOT PROMOTE STABLE SKILL YET because elapsed-human-time and cross-project generality remain UNKNOWN. Next retest must use a materially different web/3D context, precise start/end human-time, defect/rework/reuse log, same architecture/QA gates, and browser smoke where applicable.
IF_FAIL: preserve failure evidence, change one constraint, retest; do not create a new Agent for a code/tool/dependency blocker.
