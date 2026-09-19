# Phase 2B Runtime Foundation

This folder is the staging backend foundation for the quality-first Core Agent office.

## Endpoints
- GET /api/health — runtime health.
- GET /api/office — sanitized public office snapshot.
- GET /api/events — SSE-compatible snapshot stream; EventSource reconnects using retry.
- POST /api/heartbeat — authenticated agent state/current-job update.
- POST /api/jobs — authenticated + idempotent job creation (requires `Idempotency-Key`).
- POST /api/approvals — authenticated + idempotent human approval/rejection (requires `Idempotency-Key`).

## Security boundary
- Public browser receives no control token.
- Write routes require `Authorization: Bearer <CONTROL_TOKEN>`.
- CONTROL_TOKEN belongs in platform secret storage only.
- Production write stays OFF.
- CORS should be narrowed to the actual Pages origin in deployment configuration.

## Database
Run `schema.sql` against a **staging D1** database. Seed the current Core Agent registry using `../runtime/seed-core-agents.sql`, deterministically generated from `../data/agents_core.json`.

## Live UI
`runtime-config.js` contains only a public API base URL.
When empty, the Page uses repository JSON.
When configured, the Page can consume runtime office snapshots/events.

## Phase 2B definition
Phase 2B is complete only after:
1. staging DB exists;
2. the current Core Agent registry is seeded;
3. heartbeat updates appear on the Office;
4. job creation requires auth;
5. audit event is written for every write;
6. approval gate works;
7. no secrets appear in client/repo;
8. E2E test passes.


## Stable seed rule
`seed-core-agents.sql` intentionally seeds only durable agent identity/configuration.
Volatile runtime fields are normalized:
- status = READY
- current_job = Awaiting approved job
- learning_state = READY

Runtime state is then changed only by heartbeat/job execution. This prevents ordinary activity updates from changing the deterministic bootstrap artifact or creating false CI drift.


## Idempotency / replay safety
Consequential write endpoints `POST /api/jobs` and `POST /api/approvals` require an `Idempotency-Key` header (8–128 safe characters).

The runtime stores the first successful response by route + idempotency key. Retrying the same request with the same key returns the cached response and does not create a second job/approval/audit event.

Job/approval write + audit + idempotency record are executed with D1 `batch()`, which is transactional in D1. Heartbeats are intentionally not idempotency-gated because repeated heartbeats are expected state/event signals.
