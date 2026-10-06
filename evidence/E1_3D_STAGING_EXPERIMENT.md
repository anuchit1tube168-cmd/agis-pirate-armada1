# E1-3D-STAGING — Reproducibility Experiment

Status: QA_CI_PASS_RETEST_FOR_REUSE (not skill-validated)
Phase: 2B staging/sandbox only; production write OFF
Signal: SIG-004
Downstream: JOB-008 / E1-3D-STAGING
Owner: MAKER / AG-007
Architecture review: AETHER / AG-006
QA/Eval: SENTINEL / AG-008
Learning review: MENTOR / AG-012

## Claim discipline
- VERIFIED FACT: SIG-004 exists in the Scout inbox and is routed to this experiment.
- VERIFIED FACT: this experiment uses JOB-008 so its evidence chain remains separate from JOB-006 Mission Dashboard Baseline.
- VERIFIED FACT: GitHub Actions run 37319740059 on commit 19d20e7b03c9b16ef98fe79b64e86ecd7c5f8692 completed successfully and passed clean dependency install, typecheck, deterministic tests, production build, Chromium installation, and browser acceptance smoke.
- VERIFIED FACT: the traceable corrective history contains at least 2 distinct defects and at least 2 corresponding rework cycles: (1) Vitest/Playwright discovery collision corrected by commit cfc1d397cf1f1b877f566c982efd46d8524fa983; (2) browser-test semantic-selector mismatch corrected by commit 19d20e7b03c9b16ef98fe79b64e86ecd7c5f8692. This is a lower bound, not a claim that no other defects/rework occurred.
- VERIFIED FACT: GitHub compare `main...staging/job-008-e1-3d-20260922` reports the experiment implementation, test, and workflow files as newly added on the staging branch; no pre-existing repository asset/component file is shown as reused into this experiment. Quantified repository asset/component reuse for this run is therefore 0 demonstrated reused repository files/components. This does not claim that external package dependencies or conceptual patterns are original.
- SOURCE CLAIM: creator-owned public material suggests a Three.js + TypeScript/Vite interactive-web build pattern.
- HYPOTHESIS: explicit state/simulation/render/input/UI separation plus fallback behavior will improve reproducibility/reuse without lowering quality.
- UNKNOWN: elapsed human time, complete total defect count beyond the traceable lower bound, complete total rework count beyond the traceable lower bound, reuse gain across a second independent build, and whether this pattern deserves SKILL.md promotion.

## Build scope
Build a minimal interactive 3D configurator in staging/sandbox only. The artifact must be small enough to reproduce from a clean checkout and must not require secrets, privileged client writes, production data, or production deployment.

Required boundaries:
1. `state` — serializable application/configuration state; no renderer dependency.
2. `simulation` — deterministic state transitions; no DOM/Three.js side effects.
3. `render` — Three.js scene/camera/renderer and visual projection of state.
4. `input` — pointer/keyboard intent translated into commands; no business-state mutation outside the transition API.
5. `ui` — HTML/CSS controls/status; no direct scene ownership.
6. `data` — typed static configuration/catalog data separated from runtime state.

## Minimum behavior
- Load one simple 3D object/primitive without external secrets or paid assets.
- At least two deterministic configuration choices change visible state.
- Keyboard-accessible controls for the critical interaction.
- Empty/loading/error state where applicable.
- Reduced-motion or non-animated fallback path.
- If WebGL initialization fails, show a usable explanatory fallback instead of a blank screen.

## Reproducibility gates
A clean-checkout run must record exact commands and outputs for:
1. dependency install;
2. typecheck;
3. build;
4. automated test of at least one critical deterministic state transition;
5. automated or documented smoke check of fallback behavior.

PASS requires all five gates to pass with no secrets and no production writes.

## Architecture review — AETHER
Review before skill consideration:
- state is renderer-independent;
- deterministic transitions are testable without browser rendering;
- input/UI cannot bypass transition boundary;
- render layer can be replaced without rewriting business state;
- fallback path is explicit;
- dependencies are minimal and justified.

Verdict: PASS — module boundaries previously reviewed; CI validation is now complete including browser fallback/reduced-motion acceptance smoke.

## QA/Eval — SENTINEL
Recorded metrics:
- clean-checkout: PASS via GitHub Actions run 37319740059;
- typecheck: PASS;
- build: PASS;
- critical-state test: PASS;
- fallback/reduced-motion browser smoke: PASS;
- elapsed human time: UNKNOWN — no trustworthy start/stop human-time record exists; commit timestamps are not substituted for active human time;
- defects found: VERIFIED lower bound = 2 traceable defects; complete total UNKNOWN;
- rework cycles: VERIFIED lower bound = 2 traceable corrective cycles; complete total UNKNOWN;
- reused repository assets/components: VERIFIED = 0 demonstrated reused repository files/components in `main...staging/job-008-e1-3d-20260922`; external dependencies and conceptual patterns are excluded from this metric;
- reuse gain: UNKNOWN until a second independent build consumes a reusable boundary/component and measures the result;
- unresolved functional CI defects: none demonstrated by the passing run; this does not prove absence outside tested scope.

Verdict: CI PASS / REUSE NOT DEMONSTRATED — reproducibility gates are independently evidenced. Defect/rework lower bounds are traceable. Repository asset/component reuse is now quantified as 0 demonstrated reuse for this run. Elapsed human time and cross-build reuse gain remain UNKNOWN and must not be invented.

## Promotion rule — MENTOR
Do not create or promote a SKILL.md from this experiment unless SENTINEL reproduces the clean build/test and AETHER passes the boundary review. One passing experiment is evidence for a skill candidate, not proof of generality. Prefer merging the validated lesson into an existing web/full-stack/game-development skill when possible.

MENTOR decision: RETEST — do not promote or merge to SKILL.md yet. Rationale: quality/reproducibility passed, but this run demonstrates 0 reused repository assets/components and therefore does not yet establish the hypothesized reuse gain. The next evidence step is a second small independent staging build that intentionally reuses one validated boundary/component or checklist, records the reused artifact ID/path, and compares defects/rework (and human time only if trustworthy start/stop capture is available). If reuse cannot be demonstrated or quality regresses, preserve the result as a failed reuse hypothesis rather than creating a new Agent.

## Failure / learning record
- Earlier CI exposed test-runner discovery collision between Vitest and Playwright. The fix separated deterministic and browser test discovery boundaries in commit cfc1d397cf1f1b877f566c982efd46d8524fa983; later CI passed.
- Browser acceptance then exposed a semantic-selector mismatch: the test inferred a `/sphere/i` accessible name while the actual stable control was `Toggle shape`. The test contract was aligned to the real semantic UI without weakening the interaction acceptance criterion in commit 19d20e7b03c9b16ef98fe79b64e86ecd7c5f8692; run 37319740059 then passed.
- Preserve both failures as candidate reusable lessons, but do not promote them to SKILL.md until a second independent build demonstrates reuse/generalization.

## Acceptance outcome
Current outcome: QA_CI_PASS_RETEST_FOR_REUSE — implementation has reproducible CI evidence from GitHub Actions run 37319740059 with clean install/typecheck/deterministic tests/build/Chromium/browser acceptance smoke PASS. AETHER boundary verdict is PASS. Traceable evidence establishes a lower bound of 2 defects and 2 rework cycles. GitHub compare evidence quantifies demonstrated repository asset/component reuse as 0 for this run. MENTOR decision is RETEST, not skill promotion. JOB-008 remains REVIEW because the reuse hypothesis requires a second independent staging build; elapsed human time remains UNKNOWN. Production write remains OFF.