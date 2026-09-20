# SKILL — QUALITY-FIRST AGENT FACTORY

## Trigger
Use only when a real project job exposes a capability gap.

## Rule 0
Do not create a new permanent Agent first.

Use:
CAPABILITY GAP
→ IMPROVE CONTEXT
→ IMPROVE EVAL
→ TRY CORE AGENT + SKILL
→ TRY TOOL/ROUTING/MEMORY
→ MEASURE
→ TEMP SPECIALIST
→ A/B EVAL
→ PROMOTE / MERGE / DELETE

## Stage A — Gap proof
Required:
- repeated failure at least twice, OR one high-risk separation case;
- failure evidence;
- current Core Agent used;
- skill/tool already tried;
- quality/time/cost/risk metric;
- why the gap is structurally distinct.

If this is missing: STOP. Improve the existing Agent.

## Stage B — Candidate spec
Create candidate from agents/AGENT_BLUEPRINT.md.

Candidate must have:
- distinct mission;
- non-goals;
- trigger;
- least-privilege tools;
- output schema;
- honest uncertainty contract;
- evaluator/reviewer;
- stop rules;
- KPI;
- merge/retire rule.

## Stage C — Sandbox
Candidate starts:
- no production write;
- scoped data only;
- fixed test set;
- explicit budget;
- observable logs.

## Stage D — A/B evaluation
Run the same eval cases through:
A = existing Core Agent + best available skill/tool/context
B = candidate specialist

Compare:
- pass rate;
- material errors;
- hallucination/unsupported claims;
- human corrections;
- cycle time;
- cost;
- permission violations;
- reuse potential.

No cherry-picking cases after results are seen.

## Stage E — Decision

PROMOTE when B gives material repeatable benefit and independent QA/EVAL passes.

MERGE when the useful behavior can become a shared skill for a Core Agent.

DELETE when the candidate is not materially better.

EXTEND EXPERIMENT only when evidence is insufficient but the gap remains plausible.

## Honesty rule
"Specialized" does not mean "better."
Agent count is not a leverage metric.

## Done
A New-Agent experiment is complete only with:
- gap evidence;
- candidate spec;
- A/B eval;
- reviewer decision;
- outcome logged;
- promoted skill/agent OR explicit merge/delete result.
