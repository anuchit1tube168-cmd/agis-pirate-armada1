import fs from 'node:fs';

const errors=[];
for(const f of [
  'agents/AGENT_BLUEPRINT.md',
  'skills/QUALITY_FIRST_AGENT_FACTORY.md',
  'evals/NEW_AGENT_GATE.md',
  'data/agent_candidates.json'
]){
  if(!fs.existsSync(f)) errors.push('missing '+f);
}

const blueprint=fs.readFileSync('agents/AGENT_BLUEPRINT.md','utf8');
for(const token of ['Mission:','Non_Goals:','Trigger:','Tools:','Permissions:','Memory:','Output_Schema:','Stop_Rules:','Eval_Set:','KPI:','Merge_Retire_Criteria:']){
  if(!blueprint.includes(token)) errors.push('blueprint missing '+token);
}

const gate=fs.readFileSync('evals/NEW_AGENT_GATE.md','utf8');
if(!gate.includes('12/12 required')) errors.push('new-agent gate does not enforce 12/12');
if(!gate.includes('PROMOTE / MERGE_TO_SKILL / RETEST / REJECT / RETIRE')) errors.push('decision labels incomplete');

const data=JSON.parse(fs.readFileSync('data/agent_candidates.json','utf8'));
if(!Array.isArray(data.candidates)) errors.push('candidate registry invalid');
if(!data.latestDecision) errors.push('latest capability-gap decision missing');
if(data.latestDecision.newAgentNeeded===false && data.candidates.length!==0) errors.push('candidate list should be empty when latest decision says no agent needed');

const html=fs.readFileSync('index.html','utf8');
for(const id of ['factory','candidateCount','candidateDecision','candidateList']){
  if(!html.includes(`id="${id}"`)) errors.push('missing Agent Factory UI anchor #'+id);
}
const js=fs.readFileSync('app.js','utf8');
for(const token of ['renderAgentFactory','agent_candidates.json']){
  if(!js.includes(token)) errors.push('missing Agent Factory app capability '+token);
}

const agents=fs.readFileSync('AGENTS.md','utf8');
if(agents.includes('The R&D AGENT must seek')) errors.push('obsolete R&D Agent wording still present');
for(const token of ['AGENT_BLUEPRINT.md','QUALITY_FIRST_AGENT_FACTORY.md','NEW_AGENT_GATE.md']){
  if(!agents.includes(token)) errors.push('AGENTS.md not wired to '+token);
}

if(errors.length){
  console.error('AGENT FACTORY TEST FAILED');
  for(const e of errors) console.error('-',e);
  process.exit(1);
}
console.log('AGENT FACTORY TEST PASSED');
console.log(JSON.stringify({candidates:data.candidates.length,newAgentNeeded:data.latestDecision.newAgentNeeded},null,2));
