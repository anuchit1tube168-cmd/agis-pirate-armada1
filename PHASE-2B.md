# PHASE 2B — LIVE RUNTIME + HEARTBEATS

**Status:** IN PROGRESS / STAGING ONLY  
**Started:** 2026-09-18  
**Production write:** OFF

## Goal
Turn the quality-first Core Agent organization into a truthful runtime control plane.

## Build order
1. Runtime API contract.
2. Staging D1 schema.
3. Seed the current Core Agent registry.
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
- [ ] Core Agent registry seeded into D1.
- [x] Deterministic Core Agent seed artifact generated from data/agents_core.json.
- [ ] Worker staging deployed.
- [ ] live UI connected.
- [ ] E2E heartbeat → office update passes.
- [x] Runtime contract test passes in CI: auth → heartbeat → office → job → approval → audit.
- [ ] approval test passes.
- [ ] security review passes.

Do not mark Phase 2B complete without deployment + E2E evidence.


## Agent creation boundary
Runtime must not auto-spawn permanent agents.
New agents require the Capability Gap Gate in `agents/QUALITY_POLICY.md` and independent QA/EVAL approval.
Temporary specialists must be sandboxed and retired/merged if they do not show measurable value.
