# CYBERION L3 — Cycle 003: Defensive Detection / Incident Reasoning

Date: 2026-10-14
Scope: synthetic / staging-only. No production writes or real-target activity.

## READ — authoritative basis
- NIST SP 800-61r3 (final Apr 2025): incident response integrated across CSF 2.0 cybersecurity risk management; improves detection, response and recovery.
- CISA logging guidance: log user/admin/system activity, centralize logs, alert on high-risk events, protect logs, establish response roles.

## LAB
Synthetic auth telemetry fields: ts, actor_id, role, source, action, resource_owner, outcome, reason.
Sequence:
1. student-a login success
2. student-a reads own record -> allow
3. student-a attempts student-b record -> deny owner_mismatch
4. student-a repeats cross-user read 5 times -> deny owner_mismatch
5. student-a attempts admin endpoint -> deny role_mismatch
6. admin reads student-b record -> allow

Expected detection:
- D1: >=3 owner_mismatch denials by same actor in 10m => HIGH authorization-probing alert.
- D2: any student role_mismatch on admin endpoint => HIGH privilege-boundary alert.
- D3: one isolated owner_mismatch => retain/audit, not automatically incident.

Expected incident reasoning:
- Preserve centralized immutable/auditable evidence.
- Identify actor/resource/time/source and affected scope.
- Do not claim compromise solely from denied attempts.
- Escalate repeated boundary probing for triage; validate whether any successful unauthorized access exists before declaring breach.
- Containment must be proportionate and approval-gated in staging policy.

## REPRODUCE — deterministic assertions
R1 D1 fires for five repeated owner_mismatch events: PASS
R2 D2 fires for student/admin role_mismatch: PASS
R3 isolated mismatch does not become confirmed breach: PASS
R4 normal own-record/admin-authorized actions do not fire D1/D2: PASS
R5 triage schema includes actor/resource/time/source/outcome/reason: PASS
R6 reasoning distinguishes suspicious event from verified compromise: PASS
R7 response does not perform destructive/production action: PASS
Result: 7/7 PASS on the synthetic fixture.

## SENTINEL QA
Case-level PASS: rules are deterministic, expected positives/negatives explicit, false-positive guard included. Limitation: synthetic telemetry only; no SIEM/provider integration or production claim.

## AEGIS security review
Case-level PASS: least-privilege boundary preserved; denied events treated as evidence, not permission; no credential handling, persistence, evasion, destructive action or production write.

## MENTOR extraction candidate
`AUTHZ_DENIAL_BURST_DETECTION_AND_TRIAGE`
Pattern: centralize structured authorization-denial logs; alert on repeated ownership/role boundary violations; retain isolated anomalies; distinguish attempts from successful compromise; require evidence before breach claim; keep containment approval-gated.
Status: CANDIDATE — hold durable promotion until reuse/retest.

## L3 status after this case
Web/API: case evidence PASS
Secure code/remediation: case evidence PASS
Detection/IR: case evidence PASS
Cloud/IAM or CI/supply-chain: pending
AI/agent boundary security: pending
Representative A/B vs baseline: pending / insufficient
Overall L3: NOT PASS
