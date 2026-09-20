# SCOUT PIPELINE — SIGNAL → EVIDENCE → R&D → SKILL

## Purpose
Turn external Scout discoveries into tested organizational learning without confusing interesting information with truth.

Scout is a **process owned by RESEARCH**, not a new permanent agent.

## Canonical flow

SOURCE
→ SIGNAL
→ RELEVANCE GATE
→ CLAIM CLASSIFICATION
→ EVIDENCE CHECK
→ RESEARCH REVIEW
→ R&D CANDIDATE
→ EXPERIMENT
→ QA/EVAL
→ JOB / SKILL / WORKFLOW / WATCH / NO ACTION
→ OUTCOME FEEDBACK
→ SOURCE SCORE UPDATE

## 1. Source registry
Every source must have:
- Source_ID
- Name
- Type
- Domain
- URL / locator when available
- Directness
- Evidence quality
- Freshness
- Historical usefulness
- Historical error rate
- Last reviewed
- Status

## 2. Signal inbox
Every Scout discovery becomes one signal, not a raw dump.

Required fields:
- Signal_ID
- Timestamp
- Source_ID
- Title
- Raw_Link
- Topic
- Summary_Bullets
- Claim_Type
- Relevance_Layers
- Confidence
- Novelty
- Evidence_Strength
- Potential_Impact
- Time_To_Test
- Recommended_Action
- Reviewer
- Status
- Downstream_ID
- Outcome

Allowed Claim_Type:
- VERIFIED FACT
- FIRSTHAND CLAIM
- SOURCE CLAIM
- INFERENCE
- HYPOTHESIS
- FORECAST
- OPINION
- UNKNOWN

## 3. Relevance gate
Deep-process only if the signal can materially affect:
Revenue, Customer ROI, Workflow Automation, Agent Capability, Data Advantage, Integration, Evaluation, Distribution, Permissions/Audit, Time Compression, Reuse, or Learning Velocity.

Otherwise:
- WATCH when plausible but not actionable yet
- NO ACTION when irrelevant, duplicative, or unsupported

## 4. Scout priority score

Use 1–5 values.

Scout Priority =
(Relevance × Evidence × Potential Impact × Reuse)
/
(Effort To Verify × Risk)

This ranks attention only. It is not proof.

## 5. Promotion gate
A signal may become an R&D item or Job only when:
- the claim is explicitly classified;
- evidence/provenance exists;
- a concrete AGIS implication exists;
- there is a falsifiable question;
- a measurable experiment or acceptance test exists;
- a responsible Core Agent and reviewer exist.

External media can create a hypothesis. It cannot mark work DONE.

## 6. Downstream routing

### Route A — R&D
Use when the key uncertainty is technical/business and can be tested.

### Route B — Job
Use when the evidence is already strong and required work is clear.

### Route C — Eval
Use when Scout reveals a failure mode, benchmark, abuse case or quality criterion.

### Route D — Skill candidate
Only after experiment or repeated evidence supports a reusable method.

### Route E — Customer/Product insight
Use for buyer pain, pricing, workflow or ROI signals.

### Route F — Watch
Keep without consuming build capacity.

### Route G — No action
Close with reason.

## 7. Outcome feedback
Every promoted signal must eventually record:
- Did it change a decision?
- Did the experiment pass/fail?
- Was a skill created?
- Was a job completed?
- Time spent verifying/testing
- Business/time/risk effect
- Was the source directionally correct?

This feedback updates Source Score.

## 8. Source score
Do not rank sources by popularity.

Track:
- percent of signals promoted to useful experiment/job
- percent of promoted signals that later pass
- repeated false/unsupported claims
- time-to-usable-insight
- duplication/noise rate

A source that produces fewer but useful signals outranks a source producing large volumes of noise.

## 9. Quality rule
Scout must optimize for **signal quality**, not number of links found.

Conceptual funnel:
10,000 raw items → 100 relevant signals → 20 experiments → 5 durable skills.

These numbers are illustrative, not targets, until real data exists.

## 10. Ownership
- RESEARCH — source intake, claim classification, evidence check.
- ARCHITECT / PRODUCT / CUSTOMER / GROWTH — domain implication and experiment design.
- QA / EVAL — independent test/review.
- LEARNING COACH — skill promotion after evidence.
- AGIS COMMANDER — priority/resource decision.
