# Phase 2B Runtime Foundation

This folder is the staging backend foundation for the quality-first Core Agent office.

## Endpoints
- GET /api/health — runtime health.
- GET /api/office — sanitized public office snapshot.
- GET /api/events — SSE-compatible snapshot stream; EventSource reconnects using retry.
- POST /api/heartbeat — authenticated agent state/current-job update.
- POST /api/jobs — authenticated job creation.
- POST /api/approvals — authenticated human approval/rejection.

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
