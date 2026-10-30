# JOB-007 — Initial ICP Evidence Gate

Status: ACTIVE — evidence collection gate; initial hypothesis/review complete, customer validation incomplete.
Phase: 2B staging only; production write OFF.
Owner: ECHO / AG-004
Reviewer: FORGE / AG-005

## Claim-classified initial ICP hypothesis

- VERIFIED FACT (project): SCOREBOARD currently records 0 paying design partners, 0 qualified pipeline, 0 verified ROI cases, and unknown ACV/win rate.
- VERIFIED FACT (project): JOB-002 requires 10 customer evidence points before Golden Workflow selection.
- HYPOTHESIS: the initial ICP should be an operations-heavy organization with recurring approval/document/data workflows where cycle time, human touches, rework, and error rate can be measured before and after automation.
- HYPOTHESIS: economic buyer is the operational/function leader accountable for throughput/cost/risk; user is the staff member executing the workflow; approver is the manager/control owner; IT/security is a deployment stakeholder.
- HYPOTHESIS: the best first workflow is not selected yet. Candidate workflow must recur, have an identifiable payer, expose a measurable baseline, and be safe to pilot with approval-gated consequential writes.
- UNKNOWN: willingness to pay, budget, urgency, procurement path, ACV, conversion rate, deployment cost, ROI, and which workflow wins.

## Evidence plan — 10 evidence points

Collect ten independent buyer/user evidence records before JOB-002 can select a Golden Workflow. Each record must contain:
1. evidence ID/date/source role (buyer/user/approver/IT-security), with consent/provenance where applicable;
2. workflow name and trigger;
3. frequency per week/month;
4. people/roles and human touches;
5. elapsed cycle time and active labor time;
6. delay/wait states;
7. error/rework/exception frequency;
8. current direct cost or defensible cost proxy;
9. consequence/urgency and current workaround;
10. buyer/budget/procurement signal and willingness-to-pilot signal;
11. security/data/permission constraints;
12. claim classification: FIRSTHAND CLAIM or VERIFIED FACT only when evidence supports it.

## Quantification schema

For each candidate workflow calculate only from collected evidence:
- monthly labor hours = frequency × active labor minutes / 60;
- monthly delay hours = frequency × waiting minutes / 60;
- rework hours = cases × rework rate × rework minutes / 60;
- baseline cost = labor hours × approved loaded labor rate + explicit tooling/exception cost;
- candidate ROI remains UNKNOWN until a measured post-change result exists.

Do not substitute industry averages for firsthand customer measurements without labeling them SOURCE CLAIM. Do not convert SOURCE CLAIM into customer evidence.

## Selection gate after 10 records

FORGE ranks workflows using evidence-backed: frequency × urgency × budget signal × measurability, then rejects any candidate lacking an identifiable economic buyer or reproducible baseline. ORACLE may model ACV/pipeline only after evidence provides explicit assumptions or observed values.

## Outreach boundary

This artifact authorizes no external outreach. Interview messages/scripts may be drafted, but sending requires separate approval. No production write, credential use, or customer-private data is required for this plan.

## Acceptance state

- Reviewable ICP hypothesis: PASS (hypothesis, not fact)
- Identifiable buyer/user/approver/IT assumptions: PASS
- Repeated workflow hypothesis: PASS, deliberately unselected
- Plan capable of producing 10 evidence points: PASS
- Fabricated customer/revenue facts: 0
- FORGE independent review: PASS_FOR_EVIDENCE_COLLECTION — evidence/JOB-007-FORGE-REVIEW.md
- TODO-011 completion: COMPLETE for the initial hypothesis/review gate only; no customer validation implied
- Customer evidence collection: ACTIVE; E01–E10 required from approved firsthand interactions
- JOB-002 Golden Workflow selection: BLOCKED on 10 accepted evidence records
