import fs from 'node:fs';

const errors=[];
const data=JSON.parse(fs.readFileSync('data/agents_core.json','utf8'));
const agents=data.agents||[];
if(agents.length!==12) errors.push('expected 12 Core Agents, got '+agents.length);

const codenames=new Set(), glyphs=new Set();
for(const a of agents){
  const v=a.visual||{};
  for(const f of ['codename','glyph','accent','accent2','persona','thinkingStyle','signatureSkill']){
    if(!v[f]) errors.push(a.id+' missing visual.'+f);
  }
  if(v.codename){
    if(codenames.has(v.codename)) errors.push('duplicate codename '+v.codename);
    codenames.add(v.codename);
  }
  if(v.glyph){
    if(glyphs.has(v.glyph)) errors.push('duplicate glyph '+v.glyph);
    glyphs.add(v.glyph);
  }
  if(v.accent && !/^#[0-9A-Fa-f]{6}$/.test(v.accent)) errors.push(a.id+' invalid accent');
}

const app=fs.readFileSync('app.js','utf8');
for(const token of ['agent-identity-card','unit-avatar','unit-codename','signatureSkill','thinkingStyle','profile-codename']){
  if(!app.includes(token)) errors.push('app missing '+token);
}
const css=fs.readFileSync('styles.css','utf8');
for(const token of ['.agent-identity-card','.unit-avatar','.agent-portrait','.profile-avatar.designed']){
  if(!css.includes(token)) errors.push('css missing '+token);
}

if(errors.length){
  console.error('CORE AGENT VISUAL TEST FAILED');
  errors.forEach(e=>console.error('-',e));
  process.exit(1);
}
console.log('CORE AGENT VISUAL TEST PASSED');
console.log(JSON.stringify({agents:agents.length,codenames:[...codenames]},null,2));
