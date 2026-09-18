# TIME COMPRESSION — COMPOUNDING SPEED WITHOUT QUALITY LOSS

## Objective
Reduce cycle time repeatedly through reuse, automation, parallel execution, better context and skill extraction.

Do not describe the result as exponential unless measurements support it.

## Core formula

```
Compression Factor = Baseline Cycle Time / Current Cycle Time
```

For successive verified improvements:

```
T_n = T_0 × (1-r1) × (1-r2) × ... × (1-rn)
```

Each reduction must be measured and must preserve the evaluation threshold.

## Seven levers
1. DELETE — remove non-value steps.
2. REUSE — templates, skills, modules, connectors.
3. PARALLELIZE — independent agent jobs run concurrently.
4. AUTOMATE — deterministic/repeated work.
5. ROUTE — use the cheapest/fastest model/tool that passes eval.
6. CACHE CONTEXT — avoid repeated discovery/research.
7. TEACH — convert failures/success into tests/checklists/skills.

## Required logging for every repeatable workflow
- baseline minutes;
- current minutes;
- human minutes;
- machine minutes;
- cost;
- quality/eval score;
- number of reused assets;
- number of manual handoffs;
- failures/rework;
- compression factor.

## Speed gates
- A faster run that fails eval does not count.
- A faster run that increases hidden human rework does not count.
- A faster run that breaks permissions/audit does not count.
- A faster run that cannot be repeated does not count.

## 90-day time targets
These are targets to test, not promises.

- Day 0: baseline = 1.0×
- Day 30: aim for 2× on the Golden Workflow
- Day 60: aim for 4× through reuse + partial automation
- Day 90: aim for 8× on mature repeatable portions if eval/quality remains above threshold

If a workflow cannot safely compress this far, record the actual constraint rather than gaming the metric.

## Daily compression question
“What took the most founder/human time yesterday that has now happened at least twice?”

That becomes the next candidate for:
```
template → skill → tool → agent job → automated test
```
