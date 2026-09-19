import fs from 'node:fs';

const src=JSON.parse(fs.readFileSync('data/agents_core.json','utf8'));
const q=v=>String(v??'').replaceAll("'","''");
if(!Array.isArray(src.agents)||src.agents.length<1) throw new Error('No core agents found');

const ids=new Set();
for(const a of src.agents){
 if(!a.id||!a.name||!a.permission) throw new Error('Invalid core agent record');
 if(ids.has(a.id)) throw new Error('Duplicate agent id '+a.id);
 ids.add(a.id);
}

// IMPORTANT: deterministic seed contains stable agent identity/config only.
// Volatile runtime state (status/current job/learning state) is intentionally reset.
// Otherwise normal operational state changes would cause seed drift and false CI failures.
const statements=src.agents.map(a=>`INSERT OR REPLACE INTO agents
(id,name,department,specialty,mission,kpi,permission,status,current_job,supervisor,skill_level,learning_state,last_seen,updated_at)
VALUES ('${q(a.id)}','${q(a.name)}','${q(a.department)}','${q(a.specialty)}','${q(a.mission)}','${q(a.kpi)}','${q(a.permission)}','READY','Awaiting approved job','${q(a.supervisor)}',${Number(a.skillLevel)||1},'READY',NULL,'${q(src.updated)}');`).join('\n\n');

const out=`-- AUTO-GENERATED FROM data/agents_core.json
-- Core Agent count: ${src.agents.length}
-- Generated for Phase 2B STAGING ONLY.
-- Volatile runtime state is normalized to READY / Awaiting approved job.
BEGIN TRANSACTION;

${statements}

COMMIT;
`;
fs.writeFileSync('runtime/seed-core-agents.sql',out);
console.log('Generated stable runtime/seed-core-agents.sql for',src.agents.length,'agents');
