-- AUTO-GENERATED FROM data/agents_core.json
-- Core Agent count: 12
-- Generated for Phase 2B STAGING ONLY.
BEGIN TRANSACTION;

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-001','AGIS COMMANDER','Command','Orchestration','Select the highest-leverage constraint, coordinate the smallest sufficient team, and preserve focus.','Accepted outcomes / leverage','Project orchestration; no uncontrolled production write','WORKING','Quality-first agent architecture','Boss Agis',5,'ACTIVE',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-002','CFO / MATH','Business','Economics','Keep the $10M path mathematically explicit and distinguish verified numbers from assumptions.','Math traceability / unit economics','Planning data only','READY','Awaiting approved job','AGIS COMMANDER',3,'READY',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-003','RESEARCH','Intelligence','Evidence / R&D intake','Turn relevant external and internal evidence into falsifiable hypotheses, not hype.','Decision-useful evidence','Read/search/project notes','WORKING','AI-agent construction research and evidence model','AGIS COMMANDER',4,'ACTIVE',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-004','CUSTOMER','Business','Customer evidence','Find expensive recurring pains, buyers, objections and measurable ROI baselines.','Qualified customer evidence','Scoped customer data','READY','Awaiting approved job','AGIS COMMANDER',3,'READY',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-005','PRODUCT','Product','Workflow design','Convert validated pain into the smallest measurable workflow outcome.','Time-to-value / scope discipline','Project specs','READY','Awaiting approved job','AGIS COMMANDER',3,'READY',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-006','ARCHITECT','Engineering','System / reuse','Design reusable boundaries, interfaces, memory and agent/tool architecture before adding complexity.','Reuse / maintainability','Design and staging review','WORKING','Core-agent runtime and capability-gap design','AGIS COMMANDER',4,'ACTIVE',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-007','BUILDER','Engineering','Implementation','Build approved changes in staging/sandbox and keep implementation evidence reproducible.','Accepted cycle time / defect rate','Staging/sandbox write','WORKING','Refactor AI Office to core-agent model','ARCHITECT',4,'ACTIVE',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-008','QA / EVAL','Quality','Independent evaluation','Challenge every DONE claim, agent behavior and new skill with explicit tests and evidence.','Eval pass / regression catches','Read/test; no production write','REVIEW','Validate quality-first agent policy and regressions','AGIS COMMANDER',4,'ACTIVE',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-009','SECURITY','Quality','Permissions / audit','Enforce least privilege, secrets hygiene, reversibility and truthful auditability.','Risk reduction / audit coverage','Security review / approval gate','REVIEW','Review runtime and agent-spawn permission boundary','AGIS COMMANDER',4,'ACTIVE',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-010','INTEGRATION','Engineering','Connectors / tools','Build reusable, observable interfaces to external systems only when an active workflow needs them.','Connector reuse / reliability','Staging connector access','READY','Awaiting approved job','ARCHITECT',3,'READY',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-011','GROWTH','Business','Distribution','Turn validated value into measurable distribution experiments and qualified pipeline.','Qualified pipeline / conversion','Draft-only external actions unless approved','READY','Awaiting validated offer','AGIS COMMANDER',3,'READY',NULL,'2026-09-18');

INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('AG-012','LEARNING COACH','Learning','R&D / Skill evolution','Convert repeated failures, corrections and wins into tests, skills and AGENTS.md improvements only after evidence.','Repeated failures removed / skill reuse','Project docs/tests; reviewed rule changes','LEARNING','Define capability-gap and honesty standards','AGIS COMMANDER',4,'ACTIVE',NULL,'2026-09-18');

COMMIT;
