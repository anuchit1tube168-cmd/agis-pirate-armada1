# NEW AGENT GATE — INDEPENDENT EVAL

## Candidate gate
Score 0/1 for each mandatory condition.

1. Observed capability gap exists.
2. Existing Core Agent + improved context attempted.
3. Existing Core Agent + relevant skill attempted.
4. Tool/routing/memory option considered.
5. Distinct mission exists.
6. Distinct permission or sustained context need exists.
7. Output can be independently evaluated.
8. KPI is outcome-based.
9. Sandbox is possible.
10. Reviewer is independent.
11. Merge/retire rule exists.
12. Expected benefit can exceed orchestration cost.

**12/12 required to start a permanent-agent promotion experiment.**

A temporary sandbox candidate may be tested with 10/12 only if:
- missing conditions are not permission/safety/eval conditions; and
- QA/EVAL records the exception.

## A/B promotion gate
Permanent promotion requires:
- candidate pass rate >= baseline;
- no new hard-fail class;
- no permission regression;
- at least one meaningful gain in quality, time, cost, risk, or reuse;
- benefit repeats across at least 2 representative jobs/cases;
- QA/EVAL approval;
- SECURITY approval if permissions/data scope differ.

## Automatic rejection
Reject candidate if it:
- invents evidence;
- hides uncertainty;
- requires broader permission without demonstrated need;
- mainly duplicates a Core Agent;
- improves one metric by degrading safety/evidence;
- creates extra handoff without measurable benefit.

## Decision labels
PROMOTE / MERGE_TO_SKILL / RETEST / REJECT / RETIRE
