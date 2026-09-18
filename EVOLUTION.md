# AGIS EVOLUTION PROTOCOL

## Goal
Make AGIS measurably better every day while preventing uncontrolled prompt drift.

## Versioned learning loop
```
WORK
→ OBSERVE FAILURE / WIN
→ ROOT CAUSE
→ PROPOSE RULE
→ DEFINE TEST
→ APPLY TO CANDIDATE VERSION
→ RETEST
→ REVIEW
→ PROMOTE / REJECT
→ VERSION + CHANGELOG
```

## AGENTS.md version policy
Every promoted material change must record:
- date
- version
- trigger job / knowledge source
- old behavior
- new rule
- test or evidence
- metric before
- metric after
- reviewer
- rollback condition

## Promotion standard
Promote when one of the following is demonstrated:
- repeated failure prevented;
- pass rate improves;
- cycle time falls while pass threshold holds;
- cost/success falls while quality holds;
- reuse rises;
- conversion/ROI rises;
- security/audit risk falls.

## Rejection standard
Reject a proposed rule if:
- it is only based on one exciting quote;
- it conflicts with a stronger safety rule;
- it adds complexity without measurable benefit;
- it creates contradictory instructions;
- it cannot be evaluated;
- it optimizes one job but harms a common workflow.

## Refactoring rule
At least weekly:
1. find duplicate/overlapping instructions;
2. merge them;
3. remove obsolete rules;
4. keep the shortest rule that preserves behavior;
5. rerun core evals.

## Levels
AGIS v1 — explicit agent roles + job contracts.
AGIS v2 — evidence-backed daily training.
AGIS v3 — automatic skill selection and routing.
AGIS v4 — adaptive model/tool routing from eval telemetry.
AGIS v5 — reusable customer/workflow learning with strict data isolation.

Level advancement requires evidence; calendar time alone does not advance a level.
