# SIG-005 AETHER Receipt-Status-Query Review

Date: 2026-10-12
Branch: `staging/job-008-e1-3d-20260922`
Role: AETHER (architecture)
Phase: 2B staging only; production write OFF

## Verdict

`PASS_FOR_RECEIPT_STATUS_QUERY_LESSON_WITH_LIMITS`

## VERIFIED FACT

- SENTINEL CI run `38192523249` passed the deterministic RECEIPT-STATUS-QUERY experiment at commit `7da212f237ad127a70e4dcfbe83d25b39995c6c5`, as recorded in `data/scout_signals.json`.
- The tested contract persists authoritative intent before the provider call and derives a durable correlation key from that intent.
- The deterministic mock commits one external effect and then loses the create response, leaving local state PENDING and auditing the ambiguous outcome.
- Restart/recovery queries provider status using the durable correlation key, recovers the existing receipt, records SUCCEEDED/EFFECT_RECOVERED, and does not issue a second create.
- Assertions require one create call, one recovery query, one external effect, and no provider call after local success.
- The experiment is mock/staging-only and uses no network, credential, production data, or consequential external write.

## Allowed reusable lesson

For a provider contract that exposes sufficiently durable correlation/status lookup semantics:

1. Persist authoritative intent before create.
2. Derive/persist one stable correlation identifier from the intent and send it with the initial create.
3. If create outcome is ambiguous, keep local state unresolved/PENDING and audit the ambiguity.
4. On restart, query status by the same durable correlation before considering any new create.
5. If the provider reports committed success, persist the recovered receipt/final state and audit recovery.
6. After local success, replay must not call create or status again unless a separately defined verification policy requires it.

## Forbidden claims

- Do not claim universal exactly-once delivery.
- Do not assume every provider offers durable correlation or complete status lookup.
- Do not generalize this mock result to real-provider behavior, distributed transaction guarantees, remote D1 behavior, ROI, time savings, or revenue.
- Do not use automatic create retry when provider semantics are unknown or lack both durable idempotency and sufficient status lookup.

## Next falsifiable experiment: COMPENSATION-REQUIRED

Provider offers neither durable caller idempotency nor sufficient receipt/status lookup. The sandbox experiment must force an ambiguous commit and prove that the runtime:

- does not automatically issue another create;
- records `AMBIGUOUS_REQUIRES_REVIEW` (or an equivalent explicit unresolved state) with an audit event;
- creates an approval-gated compensation/manual-resolution decision path;
- performs no real external compensation/write in this staging experiment;
- remains replay-safe while unresolved.

MAKER owns the deterministic mock experiment; SENTINEL independently reproduces it; AETHER reviews architecture scope afterward. Route to AEGIS before any real provider, credential, production data, changed permission scope, or consequential external write.

## Agent Factory

`NO_AGENT_NEEDED`. This remains an architecture/evidence-routing problem covered by AETHER + MAKER + SENTINEL + MENTOR.

## UNKNOWN

Real-provider semantics, compensation behavior, remote D1 behavior, human-time savings, defect reduction, ROI and revenue impact remain UNKNOWN.
