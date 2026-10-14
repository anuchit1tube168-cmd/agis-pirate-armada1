# CYBERION KNOWLEDGE BASE — AGIS SECURITY WIKI

Status: STAGING / EVIDENCE-BASED / NOT A PROMOTION
Owner: CYBERION candidate
Reviewers: AEGIS + SENTINEL
Learning route: SCOUT/RESEARCH -> CYBERION/MAKER experiment -> AETHER -> SENTINEL -> AEGIS -> MENTOR -> SKILL candidate
Production write: OFF

## Purpose
Store decision-useful cybersecurity knowledge that AGIS has accepted for learning or experimentation. A source being authoritative does NOT mean a technique is automatically an AGIS validated skill. Promotion requires reproducible evidence and QA.

## Source acceptance tiers
### Tier A — canonical/reference sources
1. OWASP Web Security Testing Guide (WSTG) v4.2 — stable testing reference. OWASP states v5.0 is in development.
2. OWASP Top 10:2025 — current awareness baseline for major web application security risk categories.
3. OWASP API Security Top 10:2023 — API-specific risk baseline.
4. OWASP GenAI Security Project — current LLM/GenAI and agentic-security guidance; 2026 resources include updated LLM Top 10 and Agent Control Standard.

### Tier B — hands-on training/eval
5. PortSwigger Web Security Academy — public learning paths and interactive labs. Use only Academy labs/authorized sandbox. Mystery labs are useful as blind evaluation because the vulnerability class is hidden.

## Accepted facts as of 2026-10-14
- VERIFIED FACT: OWASP WSTG latest stable published release is v4.2; v5.0 is under development.
- VERIFIED FACT: WSTG covers information gathering, configuration/deployment, identity, authentication, authorization, session management, input validation, error handling, cryptography, business logic and client-side testing.
- VERIFIED FACT: OWASP Top 10:2025 categories are Broken Access Control; Security Misconfiguration; Software Supply Chain Failures; Cryptographic Failures; Injection; Insecure Design; Authentication Failures; Software/Data Integrity Failures; Security Logging and Alerting Failures; Mishandling of Exceptional Conditions.
- VERIFIED FACT: OWASP API Security Top 10:2023 includes object/function/property authorization, authentication, resource consumption, sensitive business flows, SSRF, misconfiguration, inventory and unsafe API consumption risks.
- VERIFIED FACT: PortSwigger Academy provides learning paths, interactive labs and progress tracking, including SQL injection, XSS, CSRF, SSRF, authentication/access control, OAuth/JWT, GraphQL/API testing, race conditions, NoSQL injection and Web LLM attacks.
- VERIFIED FACT: PortSwigger recommends beginners start with server-side topics and complete labs while learning.
- VERIFIED FACT: OWASP GenAI Security Project published 2026 LLM/GenAI security resources and an Agent Control Standard.

## AGIS decisions
### KEEP / USE
- WSTG as the testing-method reference.
- OWASP Top 10:2025 as web-risk awareness/checklist baseline, not as a complete testing methodology.
- API Security Top 10 for AGIS APIs, Workers, GAS endpoints and service boundaries.
- PortSwigger Academy as the primary hands-on Web/AppSec lab source.
- OWASP GenAI/Agentic security material for AGIS tool/agent permission, prompt/data and control-boundary research.

### DO NOT TREAT AS VALIDATED SKILL YET
- Exploit/tool proficiency merely because documentation was read.
- Real-target scanning/testing.
- Any Metasploit/Burp/Nmap procedure outside owned/authorized sandbox.
- Any claim that CYBERION is L3/L4/L5 without eval evidence.

## CYBERION curriculum map
1. HTTP/HTTPS and request/response boundaries.
2. Authentication, authorization, session and access control.
3. Input validation: SQL/NoSQL injection, XSS and command/template classes in labs.
4. CSRF/CORS/SSRF and server/client trust boundaries.
5. API security, JWT/OAuth/GraphQL and business logic.
6. Configuration/deployment, error handling, cryptography and logging.
7. Software supply chain and CI/DevSecOps controls.
8. Defensive logging/detection/incident response.
9. Cloud IAM, secrets and container boundaries.
10. LLM/GenAI/agentic security and AGIS tool permissions.

## First evaluation plan
Baseline: AEGIS + existing AGIS skills.
Candidate: CYBERION.
Case A: review a synthetic AGIS web/API staging design for auth/access-control/session/API risks.
Case B: review an AI-agent/tool staging design for prompt/data/tool-permission risks.
Measure correctness, missed findings, false positives, evidence traceability, remediation quality, permission compliance, human correction and time.
Independent reviewer: SENTINEL; security verdict: AEGIS.

## Skill promotion rule
READ -> LAB -> REPRODUCE -> SENTINEL PASS -> AEGIS PASS -> MENTOR EXTRACT -> SKILL CANDIDATE -> RETEST.
No step may be inferred from source reputation alone.

## Safety boundary
Authorized labs and owned staging only. No unauthorized real-target exploitation/scanning, credential theft, persistence, malware, destructive actions, secret exposure or production writes.

## Provenance
- OWASP WSTG project/stable v4.2: https://owasp.org/projects/web-security-testing-guide and https://wstg.owasp.org/stable/4-Web_Application_Security_Testing/
- OWASP Top 10:2025: https://top10.owasp.org/2025/
- OWASP API Security guidance: https://devguide.owasp.org/en/07-training-education/07-api-top-ten/
- OWASP GenAI Security Project: https://genai.owasp.org/initiative/owasp-top-10-for-llm-and-genai/
- PortSwigger Web Security Academy: https://portswigger.net/web-security
- PortSwigger learning paths/labs: https://portswigger.net/web-security/learning-paths/ and https://portswigger.net/web-security/all-labs

## Current claim boundary
VERIFIED FACT = source content and source/version existence listed above.
INFERENCE = these sources are suitable inputs for AGIS/CYBERION because they map to AGIS web/API/agent security needs.
HYPOTHESIS = CYBERION will outperform AEGIS + skills through sustained specialized context.
UNKNOWN = CYBERION A/B gain, time saving, defect reduction, production risk reduction and ROI until measured.