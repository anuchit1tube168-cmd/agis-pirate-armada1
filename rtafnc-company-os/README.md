# RTAFNC Company OS — Claude Cloud Copy / Integration

Status: STAGING ONLY — production write OFF.

This staging package preserves the user-provided Claude-built RTAFNC Company OS as the UI/reference baseline and integrates it into the AGIS source-of-truth without claiming that mock simulation data are production data.

## Source artifacts
- `index.html` — original single-page 3D Company OS prototype supplied by Boss Agis.
- `SYSTEM_BLUEPRINT.md` — extracted architecture and five-phase implementation plan supplied with the prototype.

## Verified design intent
The prototype is a 3D command-floor UI with five work zones: correspondence, good deeds, conduct logbook, evaluation, and OBE. The prototype itself explicitly labels its operational data as mock/example data.

The supplied system blueprint targets Google Sheets as master tables, Google Drive for files/file IDs, Cloudflare Pages/Workers for frontend/API/cache/cron, staff Google authentication, student LINE LIFF authentication, RBAC, audit logging, and phased delivery.

## AGIS integration rule
Do not replace mock data with real personal data until authentication, RBAC, audit logging, sensitive-field controls, and acceptance tests pass. Consequential writes remain approval-gated and production write remains OFF.

## Recommended build order
1. Phase 1 — Personnel + Foreign Teachers + Correspondence
2. Phase 2 — Students + Student Affairs + Military Attribute Evaluation
3. Phase 3 — Dormitory + Welfare
4. Phase 4 — Curriculum + Military Courses + Graduate Projects
5. Phase 5 — PDCA Command Center; connect this 3D scene to verified `/kpi` and `/events` endpoints.

This copy is intentionally isolated under `rtafnc-company-os/` so the existing AGIS runtime is not overwritten.