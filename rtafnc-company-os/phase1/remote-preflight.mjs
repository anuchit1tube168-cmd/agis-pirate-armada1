// JOB-017 Phase 1 remote staging preflight
// No network calls, no secret values printed. STAGING ONLY / PRODUCTION WRITE OFF.
const REQUIRED = [
  'RTAFNC_STAGING_BASE_URL',
  'GOOGLE_OAUTH_CLIENT_ID',
  'RTAFNC_SHEETS_ID',
  'RTAFNC_TEST_ID_TOKEN'
];

export function checkRemotePreflight(env = process.env) {
  const present = REQUIRED.filter(k => typeof env[k] === 'string' && env[k].trim().length > 0);
  const missing = REQUIRED.filter(k => !present.includes(k));
  const productionWrite = String(env.PRODUCTION_WRITE || '').toLowerCase() === 'true';
  return {
    ready: missing.length === 0 && !productionWrite,
    mode: 'STAGING_ONLY',
    productionWrite: false,
    requiredCount: REQUIRED.length,
    presentKeys: present,
    missingKeys: missing,
    blockers: [
      ...(missing.length ? ['MISSING_STAGING_DEPENDENCIES'] : []),
      ...(productionWrite ? ['PRODUCTION_WRITE_MUST_BE_OFF'] : [])
    ]
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = checkRemotePreflight();
  console.log(JSON.stringify(result, null, 2));
  if (!result.ready) process.exitCode = 2;
}
