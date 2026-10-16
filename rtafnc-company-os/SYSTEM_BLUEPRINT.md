# RTAFNC Company OS — System Blueprint

Source: Boss Agis supplied Claude-built prototype and five-phase build plan on 2026-10-16.

## Architecture
- Google Sheets = master tables, one tab per table.
- Google Drive = file storage; rows store fileId references.
- Cloudflare Pages = frontend.
- Cloudflare Workers = API, KV cache (30–60s), cron/alerts.
- Staff auth = Google ID token verified server-side.
- Student auth = LINE LIFF ID token verified server-side.
- Users sheet = RBAC/allowlist.
- Secrets stay in Worker secrets, never client code.
- Sensitive reads/writes must be audited.
- Dates stored ISO and displayed in Buddhist Era where needed.
- Soft delete only.

## Modules
1. Personnel: persons, personnel_actions, leaves; personnel action stages ร่าง → เสนอ → อนุมัติ → ออกคำสั่ง → บันทึกทะเบียน.
2. Foreign teachers: contract/work-permit/visa expiry with T-90/T-60/T-30 alerts.
3. Correspondence: doc_cases; personnel actions open/link a document case.
4. Students: students, military attribute evaluations, good deeds, discipline, welfare, dorm tickets.
5. Curriculum: military/identity courses, graduate projects, CLO/PLO links.
6. PDCA: plan_targets, kpi_actuals, actions; threshold breaches create Act items.

## RBAC
admin, director, hr, registry, student_affairs, instructor, student. Students read own rows only. Sensitive salary/rank/personnel fields are least-privilege.

## Phase 1 — Personnel + Foreign Teachers + Correspondence
Tables: persons, personnel_actions, leaves, leave_types, foreign_staff, doc_cases, Users, audit_log, alerts.
Acceptance: mock personnel action traverses all legal stages and links doc_case; 45-day expiry raises 60-day alert; unauthorized role cannot read protected fields; writes are audited.

## Phase 2 — Students + Student Affairs + Military Attribute Evaluation
Tables: students, student_users, good_deeds, deed_categories, discipline_cases, discipline_rules, military_attribute_criteria, military_attribute_evals, core_values_log, behavior_logs.
Acceptance: own-row student access; deed approval flow affects computed profile; below-threshold alert; sensitive discipline access audited.

## Phase 3 — Dormitory + Welfare
Tables: dorm_rooms, dorm_assignments, dorm_tickets, facilities_checklist, welfare_rate_table, student_allowances.
Acceptance: effective-dated rates preserve historical calculations; overdue ticket creates alert/Act item; student sees own tickets/allowances only.

## Phase 4 — Curriculum + Military Courses + Graduate Projects
Tables: courses, lesson_plans, clo_plo_map, graduate_projects, project_results.
Acceptance: CLO/PLO coverage recomputes; cohort rollup matches student results; missing evidence raises alert.

## Phase 5 — PDCA Command Center
Define plan_targets and annual calendar; provide `/kpi` and `/events`; connect existing 3D scene to verified data; 2D fallback and director one-page summary; weekly backup, uptime/error log and runbook.
Acceptance: verified module changes update dashboard within 60 seconds; KPI breach creates exactly one Act item; director sees summary without raw sensitive columns.

## Safety / staging rule
Use MOCK data during development. Real personal data must not enter the prototype until auth, RBAC, audit, sensitive-field controls and acceptance tests pass. Production write remains OFF until explicit approval.