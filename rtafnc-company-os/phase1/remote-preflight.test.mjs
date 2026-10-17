import assert from 'node:assert/strict';
import {checkRemotePreflight} from './remote-preflight.mjs';

const empty = checkRemotePreflight({});
assert.equal(empty.ready,false);
assert.equal(empty.missingKeys.length,4);
assert.deepEqual(empty.blockers,['MISSING_STAGING_DEPENDENCIES']);

const ready = checkRemotePreflight({
  RTAFNC_STAGING_BASE_URL:'https://staging.invalid',
  GOOGLE_OAUTH_CLIENT_ID:'synthetic-client-id',
  RTAFNC_SHEETS_ID:'synthetic-sheet-id',
  RTAFNC_TEST_ID_TOKEN:'synthetic-token',
  PRODUCTION_WRITE:'false'
});
assert.equal(ready.ready,true);
assert.equal(ready.missingKeys.length,0);
assert.equal(ready.productionWrite,false);

const unsafe = checkRemotePreflight({
  RTAFNC_STAGING_BASE_URL:'https://staging.invalid',
  GOOGLE_OAUTH_CLIENT_ID:'synthetic-client-id',
  RTAFNC_SHEETS_ID:'synthetic-sheet-id',
  RTAFNC_TEST_ID_TOKEN:'synthetic-token',
  PRODUCTION_WRITE:'true'
});
assert.equal(unsafe.ready,false);
assert.ok(unsafe.blockers.includes('PRODUCTION_WRITE_MUST_BE_OFF'));

console.log('PHASE1_REMOTE_PREFLIGHT_PASS', {cases:3, required:4, failClosed:true});
