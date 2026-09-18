# SKILL — YOUTUBE KNOWLEDGE EXTRACTOR

## Mission
Turn every queued YouTube clip/channel item into structured, reviewable knowledge that can improve AGIS without confusing opinion, prediction and evidence.

## Intake
Accepted inputs:
- YouTube video URL
- YouTube channel URL / channel ID / uploads playlist
- transcript text/file supplied by the user
- authorized transcript/caption provider output
- reliable web/video metadata when transcript is unavailable

## Channel flow
```
REGISTER CHANNEL
→ ENUMERATE UPLOADS
→ DEDUP VIDEO_ID
→ CREATE CLIP QUEUE
→ RESOLVE TRANSCRIPT SOURCE
→ EXTRACT
→ REVIEW
→ LINK TO PROJECT
→ PROMOTE TO SKILL / NO ACTION
```

Use YouTube Data API for channel/upload metadata when configured. Do not assume public access to full captions for arbitrary third-party videos.

## Clip states
- NEW
- METADATA_READY
- TRANSCRIPT_READY
- BLOCKED_TRANSCRIPT
- EXTRACTING
- EXTRACTED
- REVIEWED
- EXPERIMENT_CREATED
- PROMOTED_TO_SKILL
- NO_ACTION
- FAILED

## Extraction schema
For every clip:
1. Source identity
   - channel
   - title
   - URL / video ID
   - published date
   - guest(s)
   - topic
2. Executive thesis — 3–7 bullets.
3. Claims
   - FACT_REPORTED
   - FIRSTHAND_CLAIM
   - OPINION
   - FORECAST
   - HYPOTHESIS
4. Evidence/provenance for each important claim.
5. Counterpoints / uncertainty.
6. Business implications for Project $10M.
7. Mapping to 8 assets:
   - Data
   - Workflow
   - Integration
   - Evaluation
   - Distribution
   - Permissions
   - Audit
   - Customer Relationship
8. Testable experiments.
9. Metrics.
10. Reusable skill/checklist/template candidates.
11. Decision:
   - PROMOTE
   - EXPERIMENT FIRST
   - WATCH
   - NO ACTION

## Detailed bullet method
Do not summarize as a vague paragraph.
Use nested bullets:
- What the speaker says
  - mechanism
  - example
  - assumption
  - implication
- What is evidence vs forecast
- What AGIS should test
- What should change only after proof

## AGIS improvement rule
Knowledge does not automatically modify AGENTS.md.

A lesson may change AGENTS.md only if:
1. relevant to repeated project work;
2. supported by direct evidence, corroboration, or a project experiment;
3. has a concrete behavioral rule;
4. has a test/metric;
5. does not conflict with safety/permissions;
6. is reviewed by QA/EVAL or SECURITY when applicable.

## Knowledge → Skill ladder
L0 = clip indexed
L1 = structured extraction
L2 = reusable checklist/template
L3 = evaluation/test exists
L4 = repeated success across 2+ jobs
L5 = repeated success across 2+ customers/workflows

Only L4+ is considered operationally mature.

## Output files
Recommended:
`knowledge/clips/<video_id>.md`
`data/knowledge.json`
`data/clip_queue.json`
`training/CHANGELOG.md`

## Copyright discipline
Store analysis, short quotations only when necessary, metadata and derived structured knowledge. Do not reproduce full copyrighted transcripts unless the user owns/provides them or access/usage is authorized.

## Done
A clip is DONE when it is either:
- REVIEWED + actionable experiment/skill link, or
- REVIEWED + NO_ACTION with reason.

“Watched” is not DONE.
