# AGENT QUALITY POLICY — CORE FIRST

## Principle
AGIS is not optimized for agent count.

**Quality > quantity. Evidence > appearance. Truth > confidence theater.**

The default team is the existing 12 Core Agents in `data/agents_core.json`.

## When NOT to create a new agent
Do not create a new agent because:
- a new topic appears once;
- a YouTube clip mentions a new role;
- we want the office to look larger;
- a prompt can be made longer;
- specialization sounds impressive;
- an existing agent can learn the capability safely through a skill/checklist/tool.

## Capability Gap Gate
A new agent may be proposed only when all are true:
1. The capability gap is observed in real work at least twice, or one high-risk case makes separation necessary.
2. Existing Core Agents cannot cover it well enough by adding a skill/tool/context.
3. The new role has a distinct mission and measurable KPI.
4. It needs a distinct permission/data boundary **or** sustained specialist context.
5. Independent evaluation can measure whether it is better than the existing route.
6. Expected benefit exceeds orchestration/context/maintenance cost.
7. A reviewer approves the proposal.

## New-agent experiment
Before permanent registration:
```
CAPABILITY GAP
→ TRY EXISTING AGENT + SKILL
→ MEASURE
→ TEMP SPECIALIST (sandbox)
→ A/B EVAL
→ PROMOTE / MERGE / DELETE
```

The default outcome is **do not add a permanent agent** unless evidence supports it.

## Honesty standard
Every agent must distinguish:
- VERIFIED FACT
- SOURCE CLAIM
- INFERENCE
- HYPOTHESIS
- FORECAST
- UNKNOWN

Mandatory behaviors:
- Say “I don't know” when evidence is insufficient.
- Say “not verified” when a claim has not been checked.
- Never invent test results, customer evidence, revenue, citations, tool actions or completion.
- Never hide a failed experiment behind vague positive language.
- Report important counterevidence.
- Calibrate confidence to evidence.
- Ask for or seek missing evidence when it materially affects correctness.
- Acknowledge when another agent/tool is better suited.

## Quality gate
A high-quality agent needs:
- clear mission;
- bounded scope;
- minimal permissions;
- authoritative context;
- tools only when needed;
- explicit output schema;
- independent eval;
- failure/uncertainty behavior;
- learning path;
- retirement/merge rule.

## R&D relationship
R&D is a **process**, not automatically a separate agent.
RESEARCH owns external/intelligence hypotheses.
LEARNING COACH owns evidence-to-skill evolution.
ARCHITECT owns system experiments.
QA/EVAL owns independent validation.
A temporary R&D specialist is created only if Capability Gap Gate passes.

## Skill-first learning
Preferred improvement order:
1. Fix context/data.
2. Improve evaluation.
3. Add/repair a skill or checklist.
4. Add a tool/integration.
5. Improve routing/memory.
6. Only then consider a new agent.

## Agent retirement
Merge or retire an agent when:
- its work is rare;
- its capability becomes a shared skill;
- it adds handoffs without measurable quality gain;
- another agent performs the same work with equal/better eval;
- permissions no longer justify separation.

## Success metric
We want the **smallest team that reliably produces the highest-quality verified outcomes**.
