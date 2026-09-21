# ICP-HYP-001 — Initial ICP Evidence Hypothesis

Date: 2026-09-21
Status: ACCEPTED FOR EVIDENCE COLLECTION — ICP NOT VERIFIED
Job: JOB-007
Owner: ECHO / AG-004
Reviewer: FORGE / AG-005

## Decision boundary
This document does **not** claim a verified customer segment, customer demand, willingness to pay, revenue, or ROI. It creates one falsifiable ICP hypothesis so evidence collection can begin without fabricating customer facts.

## Initial ICP hypothesis
**HYPOTHESIS:** Thai nursing / health-professions education units with recurring student-operations workflows that are still coordinated across chat, spreadsheets, cloud files and manual approvals may be a useful initial ICP for an automation product/service.

### Buyer / user / approver assumptions
- **HYPOTHESIS — economic buyer:** unit leader / program administrator with budget authority for workflow improvement.
- **HYPOTHESIS — primary users:** instructors, administrative staff and student-affairs / operations staff.
- **HYPOTHESIS — approver/stakeholders:** IT/security/data owner and organizational leadership where required.
- **UNKNOWN:** actual budget, procurement route, willingness to pay, contract value and buying cycle.

## Repeated workflow hypothesis
**HYPOTHESIS:** a high-frequency candidate workflow is `intake/request -> identity/eligibility check -> structured record -> evidence/file attachment -> staff review/approval -> notification -> dashboard/report -> audit trail`.

This is deliberately workflow-level rather than product-level. It must be replaced or narrowed if firsthand interviews show a different repeated pain.

## Evidence required before ICP can be called VERIFIED
Collect at least 10 traceable buyer/user evidence points across the same repeated workflow. For each record capture:
1. role and relationship to workflow (buyer/user/approver),
2. workflow frequency,
3. current steps/tools,
4. human minutes/hours per occurrence,
5. number of people/handoffs,
6. waiting/delay time,
7. error/rework frequency,
8. direct or defensible labor/tool cost,
9. consequence of failure/delay,
10. current workaround and satisfaction,
11. security/privacy/integration constraints,
12. willingness to run a measured pilot (not treated as willingness to pay unless explicitly stated).

## Quantification schema
For evidence point i:
- `hours_i = measured or firsthand-estimated labor hours`
- `delay_i = measured or firsthand-estimated elapsed waiting time`
- `people_i = unique human roles touching the workflow`
- `errors_i = observed/firsthand-reported rework or error count over a stated period`
- `cost_i = documented direct cost or hours_i × explicitly sourced labor-cost assumption`

Never merge measured values and estimates without labels.

## Claim classification rules
- VERIFIED FACT: directly supported by project/system evidence that can be inspected.
- FIRSTHAND CLAIM: statement recorded from a buyer/user/approver; not automatically verified fact.
- SOURCE CLAIM: external-source statement with provenance.
- INFERENCE: conclusion derived from evidence, with reasoning shown.
- HYPOTHESIS: testable proposition awaiting evidence.
- FORECAST: forward-looking estimate based on stated model/inputs.
- OPINION: preference/judgment.
- UNKNOWN: required fact not yet supported.

## FORGE measurability review
**VERIFIED FACT:** independent review evidence exists at `evidence/ICP_HYPOTHESIS_001_FORGE_REVIEW.md`.

**Reviewer verdict:** PASS FOR EVIDENCE COLLECTION — ICP REMAINS HYPOTHESIS.

The review passed the six measurement-design gates for evidence collection, but explicitly did not verify market frequency, demand, budget, procurement, willingness to pay, ACV, ROI, or a specific organization's security constraints. Those remain UNKNOWN until traceable customer evidence exists.

This review satisfies JOB-007 acceptance criterion (5) only. It does **not** mark TODO-011 or JOB-007 DONE.

## Next measurable action
Obtain 10 traceable evidence points using the schema above; FORGE then ranks the repeated pains by urgency × budget × frequency × measurability. If evidence contradicts this ICP, reject/narrow it rather than defending it.
