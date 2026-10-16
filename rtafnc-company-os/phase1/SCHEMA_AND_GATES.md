# RTAFNC Company OS — Phase 1 Schema & Gates

Status: STAGING ONLY · PRODUCTION WRITE OFF
Job: JOB-017
Owners: MAKER + AETHER
Reviewers: SENTINEL + AEGIS
Source basis: user-provided RTAFNC Company OS master prompt and 3D prototype.

## Scope
Phase 1 only: Personnel + Foreign Teachers + Correspondence. Mock data only until RBAC and audit acceptance pass.

## Sheets

### persons
`person_id,rank,track,position,unit,status,cycle_due,deleted_at,created_at,updated_at`

### personnel_actions
`action_id,person_id,type,cycle,stage,doc_id,effective_date,owner,created_at,updated_at,deleted_at`

Allowed `type`: บรรจุ | ปลด | ย้าย | โอน | เลื่อนยศ | เร่งยศ
Allowed `cycle`: 1 เม.ย. | 1 ต.ค.
Allowed stage transition only:
`ร่าง -> เสนอ -> อนุมัติ -> ออกคำสั่ง -> บันทึกทะเบียน`
Skipped stage = reject.

### leaves
`leave_id,person_id,leave_type,start_date,end_date,approver,status,created_at,updated_at,deleted_at`

### leave_types
`leave_type_id,name,max_days,requires_attachment,active,effective_from`
Editable lookup; do not hardcode policy in client.

### foreign_staff
`person_id,contract_start,contract_end,work_permit_expiry,visa_expiry,status,drive_file_ids,created_at,updated_at,deleted_at`

### doc_cases
`doc_id,running_no,urgency,from,subject,stage,linked_action_id,owner,created_at,updated_at,deleted_at`
Every created personnel_action must create exactly one linked doc_case.

### Users
`user_id,email,google_sub,role,person_id,active,created_at,updated_at`
Roles: admin | director | hr | registry | student_affairs | instructor | student

### audit_log
`audit_id,at,actor,role,operation,table_name,record_id,fields_accessed,result,request_id`
Append-only. Sensitive reads and every write must be logged.

### alerts
`alert_id,type,record_id,due_date,threshold_days,status,owner,created_at,resolved_at`
Daily scan: T-90/T-60/T-30 for foreign_staff expiry and upcoming 1 เม.ย./1 ต.ค. personnel cycles.

## RBAC minimum
- admin: Phase 1 full access, audited.
- director: summary/approval views; no unnecessary raw sensitive columns.
- hr: persons/personnel_actions/leaves/foreign_staff required fields.
- registry: doc_cases and linked non-sensitive action metadata.
- student_affairs/instructor/student: no Phase 1 sensitive personnel access by default.
- Deny by default. Client UI never grants permission.

## API contract (staging target)
- `GET /api/v1/persons`
- `GET|POST|PATCH /api/v1/personnel-actions`
- `GET|POST|PATCH /api/v1/leaves`
- `GET|POST|PATCH /api/v1/foreign-staff`
- `GET|POST|PATCH /api/v1/doc-cases`
- `GET /api/v1/alerts`
- Google ID token verified server-side before role lookup.
- Secrets only in Worker secrets.
- Batch Sheets reads/writes; no row-by-row remote loops.
- Consequential writes remain approval-gated in Phase 2B staging.

## Acceptance tests
1. Create mock personnel action -> exactly one doc_case is created and linked.
2. Move mock action through all five stages -> PASS.
3. Attempt `ร่าง -> อนุมัติ` -> 409/reject and audit event.
4. Mock work permit expires in 45 days -> T-60 alert exists after cron test.
5. Non-HR/non-admin request for protected personnel fields -> deny/redact.
6. Every write -> audit_log entry.
7. Sensitive read -> audit_log entry.
8. No real names, IDs, tokens or secrets in fixtures/repository.

Phase 1 is NOT DONE until SENTINEL validates all acceptance tests and AEGIS validates auth/RBAC/audit boundaries.
