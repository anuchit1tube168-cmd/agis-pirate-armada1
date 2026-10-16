# JOB-017 — Phase 1 CI Evidence

Claim class: VERIFIED FACT
Status: REVIEW — not DONE
Scope: RTAFNC Company OS Phase 1 mock backend, staging only, production write OFF.

## Evidence
- Branch: `staging/rtafnc-company-os-cloud-copy`
- Head tested: `099712ff383e9425dca4aafc0887fb86399378f0`
- GitHub Actions workflow: `RTAFNC Company OS Phase 1`
- Run ID: `38909058379`
- Job ID: `116999966028`
- Conclusion: `success`
- Node: v22.23.3

### SENTINEL
`PHASE1_MOCK_ACCEPTANCE_PASS { gates: 8, auditEvents: 11, alerts: 1 }`

Validated in synthetic/mock scope:
1. Personnel action creates exactly one linked doc_case.
2. Ordered five-stage transition succeeds.
3. Skipped stage returns reject and audit evidence.
4. 45-day work-permit expiry creates T-60 alert.
5. Unauthorized role denied and director view redacted.
6. Writes audited.
7. Sensitive allowed read audited.
8. Test fixtures are explicitly MOCK identifiers.

### AEGIS static safety
`AEGIS_STATIC_SAFETY_PASS`

Validated by CI:
- Phase contract contains `STAGING ONLY`.
- Phase contract contains `PRODUCTION WRITE OFF`.
- Static scan found none of the configured private-key/OpenAI-key/GitHub-PAT patterns in `rtafnc-company-os/phase1`.

## Limits / UNKNOWN
This run does NOT prove production security, Google ID-token verification, real Worker/Sheets authorization, remote deployment, real-data privacy, or end-to-end runtime RBAC. Those remain UNKNOWN until tested in staging runtime.

## Gate decision
SENTINEL mock acceptance: PASS.
AEGIS static repository safety: PASS.
Phase 1 overall: REVIEW, not DONE.
Next gate: connect mock `/api/v1` adapter to the 3D Company OS and perform AEGIS runtime auth/RBAC/audit-boundary review before any real data or production write.
