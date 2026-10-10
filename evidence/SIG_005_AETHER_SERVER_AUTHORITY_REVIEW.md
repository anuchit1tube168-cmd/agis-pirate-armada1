# SIG-005 AETHER Server-Authority Architecture Review

Date: 2026-10-11
Branch: `staging/job-008-e1-3d-20260922`
Reviewed head: `85ed754a551826bfeb81dae6d86cc8d3c3738a22`
Role: AETHER (architecture)
Phase: 2B staging only; production write OFF

## Verdict

`PASS_FOR_SIDE_EFFECT_SANDBOX_EXPERIMENT_WITH_LIMITS`

## VERIFIED FACT

- `runtime/worker.js` requires server-held `CONTROL_TOKEN` authorization before consequential POST routes.
- `/api/jobs` ignores client-supplied status/actor authority, resolves owner from server data, fixes initial state to `QUEUED`, and batches job + audit + idempotency record.
- `/api/approvals` validates decision and batches approval + audit + idempotency record.
- Idempotency is keyed by route + validated idempotency key and returns the previously persisted response on replay.
- `scripts/phase2b-contract.mjs` exercises forged client fields, changed-body replay, duplicate prevention, unknown owner rejection, approval replay, unknown agent rejection, and invalid-state rejection.
- The current runtime has no external side-effect adapter or reconciliation state machine. Therefore external-effect failure/retry safety is not yet demonstrated.

## INFERENCE

The current boundary is suitable for a sandbox side-effect experiment because authoritative decision/write logic is already server-side and replay protected. The safest extension is to keep external execution behind an injected adapter and record an explicit effect state rather than coupling a remote call directly to the authoritative write transaction.

## HYPOTHESIS TO TEST

For a consequential action that requires an external effect, a staged contract of:

`authoritative intent -> durable/auditable pending effect -> external adapter -> success/failure result -> reconcile -> replay-safe final state`

can prevent unaudited partial success and duplicate external execution under retry/replay.

## Required MAKER experiment

Use only an in-memory/mock side-effect adapter in tests; no real external API, credentials, production data, or production writes.

Minimum acceptance cases:
1. forced adapter failure leaves a durable/auditable non-success state;
2. retry/reconcile can reach success without creating a second authoritative intent;
3. replay after success returns the same final result and does not execute the external adapter again;
4. changed-body replay under the same idempotency key cannot alter the original intent/result;
5. every transition has an audit record sufficient to reconstruct intent, attempt, failure/success, and reconciliation;
6. authorization remains server-side and no secret is serialized to client-visible responses.

## Stop / escalation

Stop and route to AEGIS before any experiment adds real credentials, new external permissions, production data, or a real consequential external write. Do not promote a skill until SENTINEL independently reproduces the acceptance cases.

## UNKNOWN

Cross-provider behavior, distributed transaction guarantees, crash recovery across real infrastructure, human-time savings, defect reduction, ROI, and revenue impact remain UNKNOWN.

## Agent Factory

`NO_AGENT_NEEDED`. This is an architecture/evaluation gap handled by MAKER + SENTINEL + AETHER + MENTOR; it is not evidence of a missing permanent role.
