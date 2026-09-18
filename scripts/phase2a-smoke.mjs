import fs from 'node:fs';

const errors=[];
const registry=JSON.parse(fs.readFileSync('data/agents_core.json','utf8'));
const agents=registry.agents||[];

if(agents.length!==12) errors.push(`expected 12 Core Agents, got ${agents.length}`);
const ids=new Set(agents.map(a=>a.id));
if(ids.size!==agents.length) errors.push('agent IDs are not unique');

const allowed=new Set(['WORKING','REVIEW','LEARNING','BLOCKED','READY']);
for(const a of agents){
  for(const f of ['id','name','department','specialty','mission','kpi','permission','status','currentJob','supervisor','skillLevel']){
    if(a[f]===undefined || a[f]===null || a[f]==='') errors.push(`missing ${f}: ${a.id||a.name}`);
  }
  if(!allowed.has(a.status)) errors.push(`invalid state ${a.status}: ${a.id}`);
}

const quality=fs.readFileSync('agents/QUALITY_POLICY.md','utf8');
for(const token of ['Quality > quantity','Capability Gap Gate','Say “I don\'t know”','smallest team']){
  if(!quality.includes(token)) errors.push(`quality policy missing: ${token}`);
}

const html=fs.readFileSync('index.html','utf8');
for(const id of ['office','officeRooms','activityFeed','officeSearch','officeDepartment','officeStatus','agentDrawer','agentProfile']){
  if(!html.includes(`id="${id}"`)) errors.push(`missing office UI anchor #${id}`);
}
if(html.includes('AI Office 100') || html.includes('10 DEPARTMENTS × 10 AGENTS')) errors.push('stale 100-agent UI label remains');

const js=fs.readFileSync('app.js','utf8');
for(const token of ['renderOffice','renderActivity','openAgent','agents_core.json','agent_activity.json','ASSIGN_AGENT']){
  if(!js.includes(token)) errors.push(`missing office capability ${token}`);
}
if(js.includes('agents100.json')) errors.push('stale agents100 registry reference remains');

const activity=JSON.parse(fs.readFileSync('data/agent_activity.json','utf8'));
if(!Array.isArray(activity.events)) errors.push('agent_activity.events must be an array');

if(errors.length){
  console.error('CORE AGENT OFFICE TEST FAILED');
  for(const e of errors) console.error('-',e);
  process.exit(1);
}
console.log('CORE AGENT OFFICE TEST PASSED');
console.log(`Verified ${agents.length} quality-first Core Agents and Office wiring.`);
