# WEB APP + JS FULL-STACK + 2D/3D GAMEDEV — BUILDER SKILL CANDIDATE

**Status:** CANDIDATE / VALIDATED LESSONS MERGED; WHOLE SKILL NOT PROMOTED
**Owner:** AG-007 BUILDER
**Review:** AG-006 ARCHITECT + AG-008 QA/EVAL + AG-009 SECURITY

## Purpose
Strengthen the existing BUILDER before creating a new agent. The whole skill is promoted only after independent eval evidence across applicable tracks.

## Default build flow
UNDERSTAND → CHECK CONTEXT → REUSE → PLAN → BUILD → TEST → FIX → VERIFY → DOCUMENT → EXTRACT SKILL

## Capability tracks
Frontend JS; Backend JS; Full-stack; 2D; 3D; Build/Deploy. Keep domain/game state independent from rendering/UI/environment APIs. Framework choice follows requirements and existing project context.

## Validated reusable-boundary rule — JOB-008
Evidence: original E1-3D CI `37319740059` and independent reuse-consumer CI `37690959333`.

For reusable domain/game state: keep serializable state and deterministic transitions independent from renderer/UI/input/DOM/WebGL/environment APIs; do not claim reuse from the first build; require an independent consumer; require clean install, typecheck, deterministic test and build under independent QA/EVAL; distinguish reusable logic from consumer toolchain configuration. Repository-relative source import can prove an experiment but is not a preferred distribution contract.

## Validated shared-module generalization lesson — JOB-008
Evidence: `packages/agis-state-contract/src/index.ts`, third-consumer CI `37818400783`, AETHER review `evidence/JOB_008_THIRD_CONSUMER_ARCH_REVIEW.md`.

Extract the smallest environment-neutral contract into an explicit shared module boundary, keep environment/secret/write dependencies out unless contractually required, prove it with another independent consumer, and keep architecture review separate from CI success. Three staging contexts support this deterministic state/transition pattern only; they do not prove universal portability, time savings, ROI, revenue impact, or production readiness.

## Validated package-boundary reproducibility lesson — JOB-008
Additional evidence: package-boundary CI run `37889820503` and AETHER review `evidence/JOB_008_PACKAGE_BOUNDARY_ARCH_REVIEW.md` with verdict `PASS_FOR_PACKAGE_BOUNDARY_LESSON_WITH_LIMITS`.

When shared deterministic logic is intended for broader distribution:
1. expose it through a named, explicit package dependency surface rather than coupling consumers to another experiment's source path;
2. keep the package contract environment-neutral and least-privilege;
3. validate the package consumer from a clean dependency state with typecheck, deterministic tests and build under independent QA/EVAL;
4. treat green CI as evidence only for the tested package boundary, not as proof of cross-repository or registry portability;
5. before claiming portability, test a materially isolated consumer (preferably a separate staging repository or equivalent isolated install) that cannot fall back to repository-relative source imports;
6. capture actual human elapsed time, defects and rework from start through accepted QA before making time-compression or reliability claims;
7. require AETHER review of package/dependency coupling after the isolated test, and merge only evidence-supported lessons.

Validated scope: explicit local package-boundary reuse in Phase 2B staging. UNKNOWN: cross-repository portability, registry publication/install behavior, semver compatibility, framework universality, human-time saving, defect reduction, customer ROI and revenue impact. Whole-skill promotion remains prohibited by association.

## Validated idempotency-key crash-recovery lesson — SIG-005
Evidence: SENTINEL CI run `38129404874` at commit `7605510a7ef24f0aabc741ba04fead7fe02cc837`; AETHER review `evidence/SIG_005_AETHER_PROVIDER_CONTRACT_REVIEW.md` with verdict `PASS_FOR_IDEMPOTENCY_KEY_LESSON_ONLY`.

For a consequential external effect when the provider durably honors a caller-supplied idempotency/effect key:
1. persist the authoritative intent before making the external call;
2. derive one stable provider effect key from that authoritative intent and reuse it unchanged across retries/restarts;
3. keep client replay from mutating the original authoritative intent;
4. if the provider may have committed but local success was not persisted, retry/reconcile with the identical effect key and recover the original provider receipt/effect rather than create a second effect;
5. audit the ambiguity, recovered receipt and final state;
6. independently test the crash window `provider committed → local success not persisted → restart/reconcile` before claiming the pattern for a provider contract.

Validated scope: deterministic staging/mock provider contract with durable caller idempotency semantics. This is not evidence of universal exactly-once delivery. Providers that rely on receipt/status lookup, or provide neither safe idempotency nor sufficient lookup, remain separate unvalidated hypotheses and must not inherit this claim. Real-provider semantics, remote D1 behavior, distributed guarantees, time savings, defect reduction, customer ROI and revenue impact remain UNKNOWN.

## Acceptance gate
Applicable work is not DONE until requirements are traceable; lint/type/build and critical tests pass; error/loading/empty states and responsive behavior are checked where relevant; no secrets are exposed; writes are permission-gated/auditable where required; staging evidence and rollback path exist; and QA/EVAL is independent.

## Evidence-to-skill rule
Record evidence/failure class → identify reusable pattern → add/update test/checklist/template → retest on a real task → merge only the validated lesson. Do not award capability from documentation alone.

## Capability Gap Gate
Do not create a Web Developer/Game Developer agent merely for this topic. Improve the existing Core Agent context/skill/eval/tooling first; new permanent agents require the repository Capability Gap and NEW_AGENT gates.

## Promotion metric
Record pass/fail, defects, elapsed/human time, rework and reused assets. Promote only if quality holds or improves and repeated work becomes measurably faster/more reliable.

## Research-backed training update — 2026-09-19
Source research may inform experiments but does not itself prove Builder improvement. For frontend missions evaluate: PROBLEM/GOAL → VISUAL/COMPONENT DECOMPOSITION → DATA/STATE → IMPLEMENT → ERROR/EMPTY/LOADING → RESPONSIVE/A11Y → TEST → BUILD → REVIEW. Treat this as a hypothesis until independent before/after evidence exists.
