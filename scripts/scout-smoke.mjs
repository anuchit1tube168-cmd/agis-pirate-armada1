import fs from 'node:fs';

const errors=[];
for(const f of ['SCOUT_PIPELINE.md','skills/SCOUT_INTELLIGENCE_TO_RND.md','data/scout_sources.json','data/scout_signals.json']){
  if(!fs.existsSync(f)) errors.push('missing '+f);
}
const src=JSON.parse(fs.readFileSync('data/scout_sources.json','utf8'));
const sig=JSON.parse(fs.readFileSync('data/scout_signals.json','utf8'));
if(!Array.isArray(src.sources) || src.sources.length<1) errors.push('Scout source registry empty/invalid');
if(!Array.isArray(sig.items) || sig.items.length<1) errors.push('Scout signal inbox empty/invalid');

const sourceIds=new Set(src.sources.map(x=>x.sourceId));
if(sourceIds.size!==src.sources.length) errors.push('duplicate Scout source IDs');

const allowedClaims=new Set(['VERIFIED FACT','FIRSTHAND CLAIM','SOURCE CLAIM','INFERENCE','HYPOTHESIS','FORECAST','OPINION','UNKNOWN']);
const signalIds=new Set();
for(const s of sig.items){
  if(!s.signalId||!s.sourceId||!s.title||!s.claimType||!s.route||!s.status) errors.push('incomplete signal '+JSON.stringify(s));
  if(signalIds.has(s.signalId)) errors.push('duplicate signal ID '+s.signalId);
  signalIds.add(s.signalId);
  if(!sourceIds.has(s.sourceId)) errors.push('unknown source '+s.sourceId+' for '+s.signalId);
  if(!allowedClaims.has(s.claimType)) errors.push('invalid claim type '+s.claimType+' for '+s.signalId);
}

const html=fs.readFileSync('index.html','utf8');
for(const id of ['scout','scoutSources','scoutSignals','scoutSourceCount','scoutSignalCount']){
  if(!html.includes(`id="${id}"`)) errors.push('missing Scout UI anchor #'+id);
}
const js=fs.readFileSync('app.js','utf8');
for(const token of ['renderScout','scout_sources.json','scout_signals.json']){
  if(!js.includes(token)) errors.push('missing Scout app capability '+token);
}
const agents=fs.readFileSync('AGENTS.md','utf8');
if(!agents.includes('SCOUT_PIPELINE.md')||!agents.includes('SCOUT_INTELLIGENCE_TO_RND.md')) errors.push('AGENTS.md is not wired to Scout policy');

if(errors.length){
  console.error('SCOUT PIPELINE TEST FAILED');
  for(const e of errors) console.error('-',e);
  process.exit(1);
}
console.log('SCOUT PIPELINE TEST PASSED');
console.log(JSON.stringify({sources:src.sources.length,signals:sig.items.length},null,2));
