import fs from 'node:fs';

const errors=[];
for(const f of ['runtime/worker.js','runtime/schema.sql','runtime-config.js','PHASE-2B.md']){
  if(!fs.existsSync(f)) errors.push('missing '+f);
}
const worker=fs.readFileSync('runtime/worker.js','utf8');
for(const token of ['/api/health','/api/office','/api/events','/api/heartbeat','/api/jobs','/api/approvals','audit_events','CONTROL_TOKEN']){
  if(!worker.includes(token)) errors.push('runtime missing '+token);
}
const schema=fs.readFileSync('runtime/schema.sql','utf8');
for(const table of ['agents','jobs','agent_events','approvals','audit_events']){
  if(!new RegExp('CREATE TABLE IF NOT EXISTS '+table+'\\b').test(schema)) errors.push('schema missing '+table);
}
const config=fs.readFileSync('runtime-config.js','utf8');
if(/CONTROL_TOKEN|Bearer\s+[A-Za-z0-9_-]{12,}/.test(config)) errors.push('client runtime config contains secret-like material');
const app=fs.readFileSync('app.js','utf8');
for(const token of ['connectRuntime','applyRuntimeSnapshot','EventSource','AG_RUNTIME_API']) if(!app.includes(token)) errors.push('frontend runtime hook missing '+token);
const html=fs.readFileSync('index.html','utf8');
if(!html.includes('runtime-config.js')) errors.push('runtime-config.js not loaded');

if(errors.length){
 console.error('PHASE 2B FOUNDATION TEST FAILED');
 for(const e of errors) console.error('-',e);
 process.exit(1);
}
console.log('PHASE 2B FOUNDATION TEST PASSED');
