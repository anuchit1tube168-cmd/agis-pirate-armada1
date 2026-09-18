import fs from 'node:fs';

const errors=[];
const registry=JSON.parse(fs.readFileSync('data/agents100.json','utf8'));
const agents=registry.agents||[];

if(agents.length!==100) errors.push(`expected 100 agents, got ${agents.length}`);
const ids=new Set(agents.map(a=>a.id));
if(ids.size!==100) errors.push('agent IDs are not unique');

const departments={};
const allowed=new Set(['WORKING','REVIEW','LEARNING','BLOCKED','READY']);
for(const a of agents){
  for(const f of ['id','name','department','specialty','mission','kpi','permission','status','currentJob','supervisor','skillLevel']){
    if(a[f]===undefined || a[f]===null || a[f]==='') errors.push(`missing ${f}: ${a.id||a.name}`);
  }
  if(!allowed.has(a.status)) errors.push(`invalid state ${a.status}: ${a.id}`);
  departments[a.department]=(departments[a.department]||0)+1;
}
if(Object.keys(departments).length!==10) errors.push(`expected 10 departments, got ${Object.keys(departments).length}`);
for(const [d,c] of Object.entries(departments)) if(c!==10) errors.push(`department ${d} has ${c}, expected 10`);

const html=fs.readFileSync('index.html','utf8');
for(const id of ['office','officeRooms','activityFeed','officeSearch','officeDepartment','officeStatus','agentDrawer','agentProfile']){
  if(!html.includes(`id="${id}"`)) errors.push(`missing office UI anchor #${id}`);
}

const js=fs.readFileSync('app.js','utf8');
for(const token of ['renderOffice','renderActivity','openAgent','agents100.json','agent_activity.json','ASSIGN_AGENT']){
  if(!js.includes(token)) errors.push(`missing office capability ${token}`);
}

const activity=JSON.parse(fs.readFileSync('data/agent_activity.json','utf8'));
if(!Array.isArray(activity.events)) errors.push('agent_activity.events must be an array');

if(errors.length){
  console.error('PHASE 2A SMOKE TEST FAILED');
  for(const e of errors) console.error('-',e);
  process.exit(1);
}
console.log('PHASE 2A SMOKE TEST PASSED');
console.log(`Verified ${agents.length} agents, ${Object.keys(departments).length} departments, office anchors and activity schema.`);
