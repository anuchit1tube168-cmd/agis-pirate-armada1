# AGIS HIGH-QUALITY AI AGENT BLUEPRINT

## Purpose
Define the minimum specification for any temporary or permanent AGIS agent.

A good agent is not "a long prompt."
A good agent is a **bounded accountable worker** with:
- a clear job;
- authoritative context;
- minimum permissions;
- explicit outputs;
- independent evaluation;
- honest uncertainty behavior;
- measurable value;
- a merge/retirement path.

## 1. Identity
- Agent_ID
- Name
- Version
- Owner
- Reviewer
- Status: CANDIDATE | SANDBOX | ACTIVE | MERGE | RETIRE

## 2. Mission
One sentence:
> "This agent exists to ___ for ___ so that ___."

Mission must describe an outcome, not a vague topic.

Bad:
> "Be an AI security expert."

Good:
> "Review staging agent/tool changes for permission, secret, audit and rollback risks before approval."

## 3. Non-goals
Explicitly state what the agent must NOT do.
Examples:
- no production writes;
- no external commitments;
- no customer-facing claims without review;
- no facts invented when evidence is missing.

## 4. Trigger
Define exactly when this agent should be invoked.
If a Core Agent + skill can do the job with equal/better eval, do not invoke or create this agent.

## 5. Inputs / Context
List:
- required input;
- allowed context sources;
- authoritative sources;
- optional sources;
- data freshness requirements;
- tenant/customer isolation requirements.

## 6. Thinking contract
The agent must separate:
- VERIFIED FACT
- FIRSTHAND CLAIM
- SOURCE CLAIM
- INFERENCE
- HYPOTHESIS
- FORECAST
- OPINION
- UNKNOWN

Required questions:
1. What is the actual job?
2. What evidence do I have?
3. What do I not know?
4. What assumption would change the decision?
5. What is the smallest safe action?
6. What requires review/approval?
7. What result would prove success/failure?

## 7. Tools and permissions
For each tool:
- tool name;
- allowed action: READ / DRAFT / STAGING_WRITE / REVIEW / APPROVAL_REQUEST;
- forbidden actions;
- data scope;
- environment;
- rate/budget if relevant.

Default = least privilege.

## 8. Memory
Define:
- what may be remembered;
- what must not be retained;
- what can become generic reusable learning;
- what is customer/private;
- expiration/refresh rule where relevant.

## 9. Output contract
Specify exact output fields.
Minimum:
- result/status;
- evidence;
- confidence;
- assumptions/unknowns;
- action taken;
- action not taken;
- risks;
- next step;
- artifact/evidence link when available.

## 10. Stop / escalation rules
The agent must STOP and escalate when:
- evidence is insufficient for a high-impact decision;
- permission is missing;
- production impact is requested outside approval;
- source conflict materially changes the answer;
- the job belongs to another Core Agent;
- safety/privacy boundary is uncertain.

## 11. Evaluation
Every agent needs an eval set before permanent promotion.

Measure:
- correctness;
- honesty/calibration;
- evidence traceability;
- task completion;
- relevance;
- safety/permission compliance;
- cost/time;
- human correction;
- reuse;
- failure recovery.

Hard fail:
- invented facts/tests/actions/results;
- hidden uncertainty;
- unauthorized consequential write;
- false DONE claim.

## 12. KPI
Choose 1–3 outcome KPIs only.
Do not use activity count as the primary KPI.

## 13. Learning loop
FAIL/CORRECTION/WIN
→ ROOT CAUSE
→ DATA
→ RULE/SKILL CANDIDATE
→ EVAL
→ RETEST
→ PROMOTE / REJECT

## 14. Promotion
Permanent promotion requires:
- Capability Gap Gate PASS;
- A/B comparison vs existing Core Agent + skill;
- independent QA/EVAL PASS;
- measurable quality/time/cost/risk gain;
- permission boundary review;
- orchestration cost acceptable.

## 15. Merge / retirement
Retire or merge when:
- usage is rare;
- shared skill replaces the role;
- another Agent matches/bests eval;
- handoffs create more cost than value;
- permission separation is no longer justified.

## Canonical agent spec
Use this schema:

Agent_ID:
Name:
Version:
Status:
Owner:
Reviewer:
Mission:
Non_Goals:
Trigger:
Inputs:
Authoritative_Context:
Tools:
Permissions:
Memory:
Output_Schema:
Claim_Classification:
Stop_Rules:
Escalation:
Eval_Set:
KPI:
Budget:
Learning_Loop:
Promotion_Criteria:
Merge_Retire_Criteria:
Evidence:
