# Phase 2B Security Review — 2026-09-19

Status: **FAIL / BLOCK PRODUCTION**
Scope: `runtime/worker.js`, `runtime/schema.sql`, Phase 2B approval/audit boundary.

## Verified findings

### P2B-SEC-001 — Approval records do not gate runtime writes
Severity: HIGH

`POST /api/heartbeat` and `POST /api/jobs` require `CONTROL_TOKEN`, but neither checks for an approved authorization record before mutating D1. `POST /api/approvals` writes an approval record, but that record is not consumed by the write paths.

This means the current runtime implements authentication + approval logging, not approval-gated writes.

Acceptance test:
1. Authenticated write without a matching unconsumed approval returns 403.
2. Matching approved action permits exactly the scoped write.
3. Approval cannot be replayed for another target/action.
4. Rejected/expired/consumed approval returns 403.
5. Every decision and attempted write is auditable.

### P2B-SEC-002 — Public office snapshot is not yet demonstrably sanitized
Severity: MEDIUM

`GET /api/office` is public and returns agent `permission`, `mission`, `currentJob`, supervisor and operational state. There is no explicit allowlist/redaction policy separating public fields from control-plane fields.

Acceptance test:
1. Define a public snapshot allowlist.
2. Confirm no secrets, tokens, sensitive job details, internal permission details or private customer data can be returned.
3. Add a regression test for forbidden keys/patterns.

### P2B-SEC-003 — CORS defaults to wildcard
Severity: MEDIUM

`cors(env)` falls back to `*` when `CORS_ORIGIN` is absent. Staging should fail closed for browser-facing deployment rather than silently widening origin access.

Acceptance test:
1. Worker refuses browser write/read configuration when `CORS_ORIGIN` is unset in staging deployment validation.
2. Allowed origin is explicit.
3. Wrong origin does not receive permissive CORS headers.

## Decision

Phase 2B remains **STAGING ONLY** and production write remains **OFF**.
Do not mark `security review passes` or Phase 2B complete until all HIGH findings pass independent QA/EVAL and MEDIUM findings are fixed or explicitly risk-accepted by Boss Agis.

## Smallest sufficient team
SECURITY owns findings; BUILDER fixes; QA/EVAL independently validates. No new agent is justified.
