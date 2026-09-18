# PHASE 2B — LIVE RUNTIME + HEARTBEATS

**Status:** IN PROGRESS / STAGING ONLY  
**Started:** 2026-09-18  
**Production write:** OFF

## Goal
Turn the Phase-2A organization/visualization into a truthful runtime control plane.

## Build order
1. Runtime API contract.
2. Staging D1 schema.
3. Seed 100 agents.
4. Heartbeat endpoint.
5. Sanitized office snapshot endpoint.
6. SSE/reconnect state feed.
7. Authenticated job dispatch.
8. Approval endpoint.
9. Immutable audit events.
10. Frontend runtime fallback/switch.
11. E2E tests.
12. Only then consider production access.

## Current
- [x] Worker API skeleton.
- [x] D1 schema.
- [x] heartbeat contract.
- [x] office snapshot contract.
- [x] SSE-compatible event endpoint.
- [x] job creation contract.
- [x] approval contract.
- [x] audit write contract.
- [x] public runtime-config placeholder with no secrets.
- [ ] D1 staging instance deployed.
- [ ] 100 agents seeded into D1.
- [ ] Worker staging deployed.
- [ ] live UI connected.
- [ ] E2E heartbeat → office update passes.
- [ ] approval test passes.
- [ ] security review passes.

Do not mark Phase 2B complete without deployment + E2E evidence.
