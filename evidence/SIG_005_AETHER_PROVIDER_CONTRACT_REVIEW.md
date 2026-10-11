# SIG-005 AETHER Provider Contract Review

Date: 2026-10-12
Branch: `staging/job-008-e1-3d-20260922`
Role: AETHER (architecture)
Phase: 2B staging only; production write OFF

## Verdict

`PASS_FOR_IDEMPOTENCY_KEY_LESSON_ONLY`

## VERIFIED FACT

- SENTINEL CI run `38129404874` passed the deterministic mock crash-window experiment at commit `7605510a7ef24f0aabc741ba04fead7fe02cc837` (recorded in `data/scout_signals.json`).
- The validated experiment covers an external effect committed before local success persistence, followed by restart/reconciliation using the same stable authoritative intent key.
- In that tested mock/provider contract, retry recovers the original receipt/effect and does not create a second effect.
- The experiment remains staging/mock-only. It does not establish real-provider behavior or remote D1 behavior.

## Provider contract classification

### A. IDEMPOTENCY-KEY
Provider accepts and durably enforces a stable caller-supplied idempotency/effect key across retries.

**Evidence state:** `CI_VALIDATED_MOCK`

**Allowed lesson:** persist authoritative intent before the call; derive/reuse one stable effect key from that intent; on ambiguous failure retry with the identical key; changed-body replay must resolve to the original intent; record/audit recovered receipt and final state.

**Forbidden claim:** universal exactly-once delivery. The evidence applies only where the provider honors equivalent idempotency semantics.

### B. RECEIPT-STATUS-QUERY
Provider may return/retain a receipt or expose status lookup so an ambiguous result can be resolved before another create call.

**Evidence state:** `HYPOTHESIS_UNTESTED`

**Required experiment:** commit one mock effect, lose the create response before local success, restart, query by durable receipt/correlation key, recover success without issuing a second create, and audit ambiguity/recovery. SENTINEL must independently reproduce it.

### C. COMPENSATION-REQUIRED
Provider offers neither durable caller idempotency nor sufficient receipt/status lookup. A retry can duplicate the external effect.

**Evidence state:** `HYPOTHESIS_UNTESTED`

**Required experiment:** force an ambiguous commit with no safe lookup; prove the runtime stops automatic create retry, records `AMBIGUOUS_REQUIRES_REVIEW`, and requires an approval-gated compensation/manual-resolution path. No claim of automatic crash-safe reconciliation is allowed.

## Skill boundary

MENTOR may merge only the `IDEMPOTENCY-KEY` lesson above into an existing runtime/reliability skill. Do not create a new Agent or a broad new skill family for provider types. Receipt-query and compensation-required remain falsifiable experiments until independently validated.

## Security / approval boundary

No new permission scope is introduced by this classification. If a future experiment uses a real provider, credential, production data, or consequential external write, stop and route to AEGIS before execution.

## UNKNOWN

Real-provider semantics, remote D1 behavior, receipt-query recovery, compensation workflows, distributed transaction guarantees, human-time savings, defect reduction, ROI and revenue impact remain UNKNOWN.

## Agent Factory

`NO_AGENT_NEEDED`. This is an architecture/evidence-routing gap covered by AETHER + MAKER + SENTINEL + MENTOR.
