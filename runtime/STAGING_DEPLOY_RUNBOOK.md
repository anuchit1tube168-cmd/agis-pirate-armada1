# Phase 2B — Staging Deployment Runbook

Purpose: deploy the existing runtime foundation to Cloudflare staging without enabling production writes or committing secrets.

## Preconditions
- Production write remains OFF.
- Use a dedicated staging D1 database named `agis-10m-staging`.
- `CONTROL_TOKEN` must exist only in Cloudflare secret storage.
- Browser/client must never receive `CONTROL_TOKEN`.
- CORS origin is limited to `https://anuchit1tube168-cmd.github.io`.

## 1. Create staging D1
```bash
cd runtime
npx wrangler d1 create agis-10m-staging
```
Copy the returned database id into a local `wrangler.toml` based on `wrangler.toml.example`. Do not commit account credentials or tokens.

## 2. Apply schema and seed the 12 Core Agents
```bash
npx wrangler d1 execute agis-10m-staging --remote --file=./schema.sql
npx wrangler d1 execute agis-10m-staging --remote --file=./seed-core-agents.sql
```
Acceptance evidence: query returns exactly 12 core-agent rows and their ids match `data/agents_core.json`.

## 3. Configure control secret
```bash
npx wrangler secret put CONTROL_TOKEN
```
Never echo, log, commit, or place the token in `runtime-config.js`.

## 4. Deploy staging Worker
```bash
npx wrangler deploy
```
Record the staging Worker URL as evidence. Do not treat deployment alone as Phase 2B completion.

## 5. Read-only smoke checks
```bash
curl -fsS "$STAGING_URL/api/health"
curl -fsS "$STAGING_URL/api/office"
```
Acceptance: health succeeds and office snapshot contains the seeded Core Agent registry without secrets.

## 6. Auth boundary check
An unauthenticated write to `/api/heartbeat` must be rejected. Then perform one authenticated staging heartbeat using a non-sensitive test payload and verify an audit event exists.

## 7. Approval-gate check
Create a staging job through the authenticated route, exercise approval/rejection, and verify the immutable audit trail. Do not point any route at production resources.

## 8. Live UI switch
Only after steps 1–7 pass, set the public API base in `runtime-config.js` to the staging Worker URL. No token is allowed in client code.

## 9. E2E acceptance
Pass: heartbeat → office state changes → SSE/reconnect reflects state → approval works → audit exists → unauthorized write fails → no secret is present in repository/client.

## Rollback
Clear the public runtime API base to return the UI to repository JSON fallback. If staging behavior is unsafe or inconsistent, stop the Worker deployment and preserve logs/audit evidence for QA/EVAL.

## Truth rule
Until remote D1, Worker deployment, and E2E evidence are actually observed, report them as NOT VERIFIED / NOT DEPLOYED. A local/CI contract pass is not a live staging pass.
