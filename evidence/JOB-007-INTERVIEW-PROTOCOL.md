# JOB-007 — Customer Evidence Interview Protocol

Status: READY_FOR_APPROVAL — DRAFT ONLY; this artifact does not authorize outreach.
Phase: 2B staging only; production write OFF.
Owner: ECHO / AG-004
Reviewer: FORGE / AG-005
Economics consumer: ORACLE / AG-002

## Purpose
Convert an approved firsthand buyer/user/approver/IT-security conversation into one traceable customer-evidence record for TODO-012/JOB-007 without inventing demand, ROI, budget, or workflow facts.

## Permission boundary
- No message may be sent and no meeting may be scheduled solely because this file exists.
- External outreach requires separate approval.
- Do not request secrets, credentials, regulated data, or unnecessary PII.
- Use an organization/account alias where possible.
- Consequential writes remain approval-gated; production write remains OFF.

## 15-minute evidence protocol

### 0–2 min — provenance and role
1. What is your role in this workflow: user, buyer, approver, IT/security, or another role?
2. May we record structured notes from this conversation for workflow evaluation? Record the consent/provenance note; do not infer consent.

### 2–6 min — workflow and frequency
3. What recurring workflow consumes meaningful time or creates delay/rework today?
4. What triggers it, and roughly how often does it happen per week/month?
5. Which roles touch one case, and approximately how many human handoffs/touches occur?

### 6–10 min — measurable baseline
6. For a typical case, how many minutes of active human work are required?
7. How much waiting/queue time occurs, and where?
8. How often do errors, exceptions, or rework occur? How much extra time does an affected case take?
9. What tools or workaround are used now? Is there a direct cost or an approved labor-cost proxy we may use?

### 10–13 min — consequence and buyer signal
10. What happens when this workflow is slow or wrong?
11. Who owns the budget or economic outcome for improving it?
12. Is there an existing budget/procurement path? Record the answer as FIRSTHAND CLAIM unless independently verified.
13. If a bounded pilot could measure before/after cycle time, labor, errors, and cost without uncontrolled production writes, would you consider evaluating it? Do not convert interest into a purchase commitment.

### 13–15 min — deployment constraints
14. What data, security, permission, approval, integration, or audit constraints would a pilot need to respect?
15. Who else must approve or participate before a pilot can run?

## Interviewer rules
- Preserve the source's meaning; do not upgrade estimates into VERIFIED FACT.
- Interview statements default to FIRSTHAND CLAIM.
- If the source does not know a value, record UNKNOWN; do not impute an industry average.
- SOURCE CLAIM may provide context but does not count as customer evidence.
- Candidate ROI remains UNKNOWN until measured post-change evidence exists.
- Do not lead the source toward a preferred workflow or price.

## Immediate post-interview conversion
Within the same evidence session, copy the observations into `evidence/CUSTOMER_EVIDENCE_RECORD_TEMPLATE.md` as CE-### and complete:
1. provenance/consent;
2. workflow trigger/frequency;
3. labor/wait/rework baseline or explicit UNKNOWN;
4. buyer/budget/pilot signal or explicit UNKNOWN;
5. security/permission constraints;
6. claim ledger;
7. ECHO completeness verdict.

Then route to FORGE for an independent measurability verdict. ORACLE may calculate only from accepted/explicit inputs. One real interview can yield at most one independent evidence record unless multiple independently attributable sources are actually present and separately traceable.

## FORGE acceptance gate
ACCEPT only when:
- the record is real and traceable;
- source role and provenance are captured;
- a recurring workflow is identifiable;
- missing quantitative values are explicitly UNKNOWN rather than invented;
- buyer/deployment constraints are captured or explicitly UNKNOWN;
- important claims are classified;
- no fabricated revenue, ROI, customer, or purchase claim exists.

REJECT/RETEST when provenance is missing, the workflow is too vague to measure, claims are upgraded without evidence, or the record duplicates the same source without independent evidence.

## Completion rule
This protocol is an enablement artifact, not customer evidence. TODO-012 remains open until ten accepted, independent, firsthand records exist. JOB-002 Golden Workflow selection remains blocked until that gate is met.
