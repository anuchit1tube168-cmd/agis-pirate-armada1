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
- [x] Security review 01 passes for staging preparation (not production).
- [x] SQLite compatibility test added for D1 schema + deterministic 12-agent seed.
- [x] Manual-gated Cloudflare staging deploy workflow added.
- [ ] Required Cloudflare staging secrets/environment configured.
- [ ] security review passes for production.

Do not mark Phase 2B complete without deployment + E2E evidence.


## Agent creation boundary
Runtime must not auto-spawn permanent agents.
New agents require the Capability Gap Gate in `agents/QUALITY_POLICY.md` and independent QA/EVAL approval.
Temporary specialists must be sandboxed and retired/merged if they do not show measurable value.


## Immediate blocker — 2026-09-19
No Cloudflare connector is available in the current connected-tool set, and no verified staging Cloudflare credentials/D1 database ID are exposed to this session.

Therefore this phase is now **DEPLOY-READY BUT NOT DEPLOYED**.

The repository can perform a staging-only deployment through `.github/workflows/runtime-staging-deploy.yml` once these GitHub staging secrets are configured:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `AG_RUNTIME_D1_DATABASE_ID`
- `AG_RUNTIME_CONTROL_TOKEN`

This is an explicit evidence boundary: do not claim live runtime until the remote workflow and E2E evidence exist.


## Verified CI evidence — 2026-09-19
GitHub Actions run **35435140111** is the latest verified green run and completed successfully with:
- frontend JavaScript syntax PASS;
- Worker JavaScript syntax PASS;
- deterministic Core Agent seed consistency PASS;
- Phase 2B foundation checks PASS;
- SQLite compatibility / 12-agent seed PASS;
- runtime contract auth → heartbeat → office → job → approval → audit PASS.

This is local/CI evidence only; it is not remote Cloudflare deployment evidence.


## Stable seed learning — promoted after retest
A normal Agent status change caused CI run **35435087962** to fail because the bootstrap seed contained volatile runtime fields.

Root cause:
- identity/configuration and live execution state were mixed in one deterministic artifact.

Fix:
- seed now contains durable Agent identity/configuration;
- status is initialized to `READY`;
- current job is initialized to `Awaiting approved job`;
- learning state is initialized to `READY`;
- heartbeat/runtime storage owns subsequent live state.

Retest:
- GitHub Actions **35435140111** passed all Phase 2B checks.

This rule is now considered evidence-backed and reusable.
