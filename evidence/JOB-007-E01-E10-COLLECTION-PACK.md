# JOB-007 — E01–E10 Customer Evidence Collection Pack

Status: READY_FOR_APPROVED_COLLECTION — contains no customer evidence.
Phase: 2B staging only; production write OFF.
Owner: ECHO / AG-004
Reviewer: FORGE / AG-005
Economics consumer after evidence: ORACLE / AG-002

## Purpose
Turn the reviewed ICP hypothesis into ten traceable evidence records without fabricating demand, ROI, ACV, pipeline, or customer facts. This pack does not authorize external outreach.

## Hard gate
A record counts toward E01–E10 only when it comes from an approved buyer/user interaction and includes provenance, source role, workflow baseline, and claim classification. Missing required evidence => REJECT/UNKNOWN, not estimated completion.

## Record template
Duplicate this section for E01 through E10.

- Evidence ID: E__
- Date/time:
- Provenance/reference:
- Consent/approved collection basis where applicable:
- Source role: buyer / user / approver / IT-security
- Organization/segment: [use minimum necessary identifying detail]
- Workflow name:
- Trigger:
- Frequency per week/month:
- People/roles involved:
- Human touches per case:
- Elapsed cycle time per case:
- Active labor time per case:
- Wait/delay time per case:
- Error/rework/exception frequency:
- Rework minutes per affected case:
- Direct cost or approved cost proxy:
- Consequence/urgency:
- Current workaround:
- Buyer/budget/procurement signal:
- Willingness-to-pilot signal:
- Security/data/permission constraints:
- Claim classification: FIRSTHAND CLAIM / VERIFIED FACT / SOURCE CLAIM / INFERENCE / HYPOTHESIS / FORECAST / OPINION / UNKNOWN
- Contradictory evidence / uncertainty:
- Reviewer decision: PENDING / ACCEPT / REJECT
- Rejection reason if any:

## Derived metrics — calculate only from accepted evidence
- monthly labor hours = frequency × active labor minutes / 60
- monthly delay hours = frequency × waiting minutes / 60
- rework hours = cases × rework rate × rework minutes / 60
- baseline cost = labor hours × approved loaded labor rate + explicit tooling/exception cost

Do not calculate customer ROI until a measured post-change result exists. Do not infer ACV, win rate, qualified pipeline, willingness to pay, or revenue from missing fields.

## Aggregation gate after E10
FORGE ranks only evidence-backed candidate workflows by frequency × urgency × budget signal × measurability and rejects candidates without an identifiable economic buyer or reproducible baseline. ORACLE may consume only accepted fields and explicit assumptions. SENTINEL should independently verify record count, required-field completeness, provenance, claim classification, arithmetic reproducibility, and that rejected records were not counted.

## Safety/data boundary
Collect the minimum necessary information. Do not place secrets, credentials, sensitive customer data, or unnecessary personal data in this repository. External outreach, production writes, credential use, or consequential actions require separate approval. Consequential writes remain approval-gated, auditable, and replay-safe.

## Current evidence count
Accepted records: 0/10.
E01–E10 status: EMPTY.
Golden Workflow: BLOCKED.
TODO-012/013/014: OPEN.

## Acceptance criteria for this pack
- Deterministic required-field schema: PASS
- Claim classification present: PASS
- Rejection/fail-closed path present: PASS
- Economics formulas constrained to accepted evidence: PASS
- No fabricated customer/revenue facts: PASS
- Production write required: NO
