# CYBERION L3 — Cycle 008 — Web/API + Secure-Code Retest

Date: 2026-10-15 (Asia/Bangkok)
Mode: Phase 2B staging-only; production write OFF
Scope: owned synthetic policy/code-review fixtures only; no external target activity

## READ — authoritative basis
OWASP Authorization Cheat Sheet: deny by default and validate permissions on every request. OWASP Authorization Patterns: keep enforcement close to protected resources and evaluate action/object/tenant. OWASP SQL Injection Prevention / Query Parameterization: use prepared/parameterized queries for values; structural SQL choices such as column/table/sort identifiers require explicit mapping/allowlisting. OWASP Input Validation: validation is separate from authorization; a syntactically valid identifier does not grant access.

## LAB A — Web/API authorization fixture
Synthetic principals: student-a, student-b, admin. Synthetic records have server-owned owner_id. Decision inputs are authenticated principal, server-loaded resource, requested action. Client-supplied owner/role fields are never authority.

Assertions:
A1 student-a reads own record -> ALLOW
A2 student-a reads student-b record -> DENY
A3 student-a updates student-b record -> DENY
A4 student-a supplies owner_id=student-a for student-b resource -> DENY
A5 student calls admin-only operation -> DENY
A6 admin reads student-b record -> ALLOW
A7 unknown/unmatched policy -> DENY

## LAB B — secure-code/remediation fixture
Synthetic review cases:
B1 SQL value concatenation from request -> FAIL; remediate with bound parameter
B2 bound value parameter -> PASS
B3 user-controlled ORDER BY column passed as raw string -> FAIL
B4 sort key mapped through explicit allowlist -> PASS
B5 numeric ID syntactically valid but caller lacks resource permission -> DENY (validation != authorization)
B6 escaping-only proposed as primary SQLi defense -> FAIL; require parameterization where supported
B7 DB/service account has unnecessary admin/write privilege -> FAIL least-privilege review

## REPRODUCE
A: 7/7 deterministic expected decisions specified above.
B: 7/7 deterministic expected review decisions specified above.
Replay rule: a reviewer can reconstruct every expected result solely from this artifact and cited control family; no production state or secrets are required.

## SENTINEL QA
PASS at bounded case level: positive and negative cases are explicit; deny-by-default case exists; client-claimed authority is rejected; validation/authorization separation is tested; secure-code cases distinguish value parameterization from structural allowlisting. Limitation: policy-oracle/code-review evidence, not deployed runtime penetration testing.

## AEGIS SECURITY REVIEW
PASS at bounded case level: no credential theft, persistence, malware, destructive action, evasion, or unauthorized target testing. Production write remains OFF. Controls fail closed and preserve server-side authority.

## MENTOR EXTRACTION — reuse/retest
Candidate 1: AUTHZ_SERVER_SIDE_RESOURCE_ACTION_BOUNDARY — reused/retested here; retain as validated generic candidate pending full L3 gate.
Candidate 2: SQL_DATA_PARAMETERIZE_AND_IDENTIFIERS_ALLOWLIST — reused/retested here; retain as validated generic candidate pending full L3 gate.

## L3 gate impact
Web/API: reproducible source-of-truth artifact now present.
Secure-code/remediation: reproducible source-of-truth artifact now present.
Detection/IR, CI/supply-chain, AI/agent: separate source-of-truth artifacts already exist and require final cross-check at gate.
Representative A/B vs baseline: still NOT SATISFIED by this artifact.
Overall L3: NOT PASS until >=2 representative A/B cases show candidate >= baseline, >=1 repeatable meaningful gain, and no hard safety/permission failure.