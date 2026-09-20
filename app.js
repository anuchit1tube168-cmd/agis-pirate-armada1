const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const fmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0);
const STORAGE_KEY='agis10m.phase1.drafts.v1';
let DATA={metrics:{},jobs:[],team:[],knowledge:[],training:[],rnd:[],schedule:[],agents:[],activity:[],scoutSources:[],scoutSignals:[],agentCandidates:[],agentCandidateDecision:null};

async function load(path,fallback){try{const r=await fetch(path+'?v='+Date.now());if(!r.ok)throw 0;return await r.json()}catch{return fallback}}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function statusClass(s){s=(s||'').toLowerCase();return s.includes('block')||s.includes('fail')?'red':s.includes('review')||s.includes('queue')||s.includes('plan')?'yellow':'green'}
function drafts(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch{return[]}}
function saveDrafts(v){localStorage.setItem(STORAGE_KEY,JSON.stringify(v));renderDrafts()}



async function applyRuntimeSnapshot(snapshot){
 if(!snapshot?.agents?.length)return;
 DATA.agents=snapshot.agents;
 if(Array.isArray(snapshot.events)) DATA.activity=snapshot.events;
 renderOffice();renderActivity();populateOwners();
 const badge=document.querySelector('#office .section-title .pill');
 if(badge) badge.textContent='LIVE RUNTIME • '+(snapshot.serverTime?new Date(snapshot.serverTime).toLocaleTimeString('th-TH'):'CONNECTED');
}
async function connectRuntime(){
 const base=String(window.AG_RUNTIME_API||'').replace(/\/$/,'');
 if(!base)return;
 try{
   const r=await fetch(base+'/api/office',{cache:'no-store'});
   if(r.ok) await applyRuntimeSnapshot(await r.json());
 }catch(e){console.warn('AGIS runtime snapshot unavailable',e)}
 try{
   const es=new EventSource(base+'/api/events');
   es.addEventListener('office',e=>{try{applyRuntimeSnapshot(JSON.parse(e.data))}catch{}});
   es.onerror=()=>console.warn('AGIS runtime event stream reconnecting');
 }catch(e){console.warn('AGIS runtime EventSource unavailable',e)}
}

function officeStateClass(s){return 'state-'+String(s||'READY').toLowerCase()}
function initials(name='AI'){return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()}
function renderOffice(){
 const agents=DATA.agents||[];
 const q=($('#officeSearch')?.value||'').toLowerCase().trim();
 const dept=$('#officeDepartment')?.value||'';
 const state=$('#officeStatus')?.value||'';
 const filtered=agents.filter(a=>(!dept||a.department===dept)&&(!state||a.status===state)&&(!q||[a.name,a.specialty,a.currentJob,a.department].join(' ').toLowerCase().includes(q)));
 const groups={}; for(const a of filtered)(groups[a.department]??=[]).push(a);
 $('#officeRooms').innerHTML=Object.entries(groups).map(([department,list])=>`
  <section class="office-room">
    <div class="room-head"><div><small>DEPARTMENT</small><h3>${esc(department)}</h3></div><span class="badge">${list.length} visible</span></div>
    <div class="desk-grid">${list.map(a=>`
      <button class="agent-desk ${officeStateClass(a.status)}" data-agent-id="${esc(a.id)}">
        <span class="person"><i class="head"></i><i class="body"></i><i class="deskline"></i></span>
        <span class="desk-copy"><b>${esc(a.name)}</b><small>${esc(a.specialty)}</small><em>${esc(a.status)}</em></span>
      </button>`).join('')}</div>
  </section>`).join('') || '<div class="empty">No agents match this filter.</div>';
 $('[data-agent-id]').forEach(b=>b.onclick=()=>openAgent(b.dataset.agentId));
 const count=s=>agents.filter(a=>a.status===s).length;
 $('#officeTotal').textContent=agents.length;$('#officeWorking').textContent=count('WORKING');$('#officeReview').textContent=count('REVIEW');$('#officeLearning').textContent=count('LEARNING');$('#officeReady').textContent=count('READY');
}
function renderActivity(){
 const items=DATA.activity||[];
 $('#activityFeed').innerHTML=items.map(x=>`<div class="activity-item"><time>${esc(x.time)}</time><div><b>${esc(x.agent)}</b><small>${esc(x.type)}</small><p>${esc(x.text)}</p></div></div>`).join('')||'<div class="empty">No activity evidence yet.</div>';
}
function openAgent(id){
 const a=(DATA.agents||[]).find(x=>x.id===id); if(!a)return;
 $('#agentProfile').innerHTML=`
   <div class="profile-state ${officeStateClass(a.status)}">${esc(a.status)}</div>
   <div class="profile-avatar">${esc(initials(a.name))}</div>
   <div class="eyebrow">${esc(a.id)} • ${esc(a.department)}</div>
   <h2>${esc(a.name)}</h2><p class="muted">${esc(a.specialty)}</p>
   <div class="profile-grid">
    <div><small>MISSION</small><strong>${esc(a.mission)}</strong></div>
    <div><small>CURRENT JOB</small><strong>${esc(a.currentJob)}</strong></div>
    <div><small>KPI</small><strong>${esc(a.kpi)}</strong></div>
    <div><small>PERMISSION</small><strong>${esc(a.permission)}</strong></div>
    <div><small>SUPERVISOR</small><strong>${esc(a.supervisor)}</strong></div>
    <div><small>SKILL LEVEL</small><strong>L${esc(a.skillLevel)}</strong></div>
   </div>
   <button class="primary" id="assignAgentDraft">Create assignment draft</button>`;
 $('#agentDrawer').classList.add('open');$('#agentDrawer').setAttribute('aria-hidden','false');
 $('#assignAgentDraft').onclick=()=>addDraft({type:'ASSIGN_AGENT',agentId:a.id,agent:a.name,currentJob:a.currentJob,at:new Date().toISOString()});
}
function closeAgent(){const d=$('#agentDrawer');d?.classList.remove('open');d?.setAttribute('aria-hidden','true')}
function populateOfficeFilters(){
 const depts=[...new Set((DATA.agents||[]).map(a=>a.department))];
 $('#officeDepartment').innerHTML='<option value="">All departments</option>'+depts.map(d=>`<option>${esc(d)}</option>`).join('');
}



function renderAgentFactory(){
 const items=DATA.agentCandidates||[], decision=DATA.agentCandidateDecision;
 if($('#candidateCount')) $('#candidateCount').textContent=String(items.length);
 if($('#candidateDecision')){
   $('#candidateDecision').innerHTML=decision
    ? '<small>LATEST CAPABILITY-GAP DECISION</small><strong>'+esc(decision.newAgentNeeded?'NEW AGENT TEST JUSTIFIED':'NO NEW AGENT NEEDED')+'</strong><p class="muted small">'+esc(decision.reason||'')+'</p><p class="muted small"><b>Route:</b> '+esc(decision.route||'')+'</p>'
    : '<small>LATEST CAPABILITY-GAP DECISION</small><strong>No decision recorded</strong>';
 }
 if($('#candidateList')) $('#candidateList').innerHTML=items.length?items.map(c=>`
   <div class="scout-item"><div class="k-top"><b>${esc(c.name||c.agentId||'Candidate')}</b><span class="status ${statusClass(c.status)}">${esc(c.status||'CANDIDATE')}</span></div><small>${esc(c.mission||'')}</small><p>${esc(c.evidence||'Awaiting evidence')}</p></div>
 `).join(''):'<div class="empty">No Agent candidate is currently justified. Core-first policy is working as intended.</div>';
}

function renderScout(){
 const sources=DATA.scoutSources||[], signals=DATA.scoutSignals||[];
 const sourceEl=$('#scoutSources'), signalEl=$('#scoutSignals');
 if(sourceEl) sourceEl.innerHTML=sources.map(s=>`
   <div class="scout-item">
     <div class="k-top"><b>${esc(s.name)}</b><span class="status ${statusClass(s.status)}">${esc(s.status)}</span></div>
     <small>${esc(s.type)} • ${esc(s.priority||'')}</small>
     <p>${esc(s.rule||s.notes||'')}</p>
     <div class="scout-metrics"><span>Useful <b>${esc(s.score?.usefulSignals??0)}</b></span><span>Validated <b>${esc(s.score?.validatedSignals??0)}</b></span><span>Noise <b>${esc(s.score?.noiseSignals??0)}</b></span></div>
   </div>`).join('')||'<div class="empty">No Scout sources registered.</div>';
 if(signalEl) signalEl.innerHTML=signals.map(s=>`
   <div class="scout-item">
     <div class="k-top"><span class="badge">${esc(s.signalId)}</span><span class="status ${statusClass(s.status)}">${esc(s.status)}</span></div>
     <h4>${esc(s.title)}</h4>
     <small>${esc(s.claimType)} • ${esc(s.confidence)} • Route: ${esc(s.route)}</small>
     <p>${esc(s.outcome||'Pending downstream outcome.')}</p>
     <div class="scout-tags">${(s.relevance||[]).slice(0,4).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
   </div>`).join('')||'<div class="empty">No Scout signals yet.</div>';
 if($('#scoutSourceCount')) $('#scoutSourceCount').textContent=String(sources.length);
 if($('#scoutSignalCount')) $('#scoutSignalCount').textContent=String(signals.length);
}

function renderJobs(jobs){
 $('#jobBoard').innerHTML=jobs.map(j=>`<article class="job"><div class="job-top"><span>${esc(j.id)}</span><span class="status ${statusClass(j.status)}">${esc(j.status)}</span></div><h3>${esc(j.title)}</h3><p>${esc(j.objective)}</p><footer><span>${esc(j.owner)}</span><span>${esc(j.metric||'')}</span></footer><div class="job-actions"><button data-job="${esc(j.id)}" data-action="ACTIVE">Start</button><button data-job="${esc(j.id)}" data-action="REVIEW">Review</button><button data-job="${esc(j.id)}" data-action="DONE">Approve</button></div></article>`).join('');
 $$('.job-actions button').forEach(b=>b.onclick=()=>addDraft({type:'JOB_STATUS',jobId:b.dataset.job,status:b.dataset.action,at:new Date().toISOString()}));
}
function renderTeam(team){$('#teamGrid').innerHTML=team.map((a,i)=>`<article class="agent"><div class="agent-head"><div class="avatar">${String(i+1).padStart(2,'0')}</div><div><h3>${esc(a.name)}</h3><div class="role">${esc(a.role)}</div></div></div><p>${esc(a.mission)}</p><div class="meta"><span>KPI: ${esc(a.kpi)}</span><span>${esc(a.status)}</span></div></article>`).join('')}
function renderKnowledge(items){$('#knowledgeQueue').innerHTML=items.map((k,i)=>`<article class="knowledge-item"><div class="k-top"><span class="badge">${esc(k.source)}</span><span class="status ${statusClass(k.state)}">${esc(k.state)}</span></div><h3>${esc(k.title)}</h3><p>${esc(k.signal)}</p><div class="meta"><small>Next: ${esc(k.next)}</small></div><div class="job-actions"><button data-k="${i}" data-action="REVIEWED">Review</button><button data-k="${i}" data-action="PROMOTE">Promote Skill Draft</button></div></article>`).join('');
 $$('[data-k]').forEach(b=>b.onclick=()=>{const k=DATA.knowledge[Number(b.dataset.k)];addDraft({type:b.dataset.action==='PROMOTE'?'SKILL_PROMOTION':'KNOWLEDGE_REVIEW',title:k.title,source:k.source,at:new Date().toISOString()})});
}
function renderRND(items){const el=$('#rndGrid');if(!el)return;el.innerHTML=items.map(r=>`<article class="knowledge-item"><div class="k-top"><span class="badge">${esc(r.id)}</span><span class="status ${statusClass(r.status)}">${esc(r.status)}</span></div><h3>${esc(r.problem)}</h3><p><strong>Hypothesis:</strong> ${esc(r.hypothesis)}</p><p><strong>Experiment:</strong> ${esc(r.experiment)}</p><div class="meta"><small>Metric: ${esc(r.metric)}</small></div><div class="job-actions"><button data-r="${esc(r.id)}">Log Result Draft</button></div></article>`).join('');
 $$('[data-r]').forEach(b=>b.onclick=()=>addDraft({type:'RND_RESULT',rndId:b.dataset.r,result:'PENDING_EVIDENCE',at:new Date().toISOString()}));
}
function renderTraining(items){$('#trainingLog').innerHTML=items.map(x=>`<div class="event"><small>${esc(x.date)} • ${esc(x.agent)}</small><h4>${esc(x.lesson)}</h4><p>${esc(x.evidence)}</p></div>`).join('')}
function renderScore(metrics){
 const rev=metrics.verifiedRevenue||0,target=metrics.target||10000000,gap=Math.max(0,target-rev);
 $('#verifiedRevenue').textContent=fmt(rev);$('#revenueGap').textContent=fmt(gap);$('#pipeline').textContent=fmt(metrics.qualifiedPipeline||0);
 $('#revenueBar').style.width=Math.min(100,rev/target*100)+'%';$('#mathStatus').textContent=metrics.mathStatus||'YELLOW';$('#mathStatus').className='status '+(metrics.mathStatus==='GREEN'?'green':metrics.mathStatus==='RED'?'red':'yellow');
 $('#compressionFactor').textContent=(metrics.compressionFactor||1).toFixed(1)+'×';$('#constraint').textContent=metrics.constraint;$('#constraintWhy').textContent=metrics.constraintWhy;$('#nextAction').textContent=metrics.nextAction;
 const score=[['Paying partners',metrics.payingPartners],['Reuse ratio',metrics.reuseRatio],['Time-to-value',metrics.timeToValue],['Eval pass rate',metrics.evalPass],['Founder hrs/customer',metrics.founderHours],['Cost / success',metrics.costPerSuccess]];
 $('#scoreGrid').innerHTML=score.map(x=>`<div class="score"><small>${x[0]}</small><strong>${x[1]??'—'}</strong></div>`).join('');
 $('#assetGrid').innerHTML=(metrics.assets||[]).map(x=>`<div class="asset"><small>${esc(x.name)}</small><strong>${esc(x.count)}</strong></div>`).join('');
 $('#lastUpdated').textContent='Last updated '+(metrics.updated||'—');
}
function renderSchedule(items){$('#scheduleGrid').innerHTML=items.map(s=>`<div class="schedule-item"><strong>${esc(s.time)}</strong><div><b>${esc(s.name)}</b><small>${esc(s.purpose)}</small></div><span class="status ${statusClass(s.status)}">${esc(s.status)}</span></div>`).join('')}
function populateOwners(){ const src=(DATA.agents&&DATA.agents.length)?DATA.agents:DATA.team; $('#jobOwner').innerHTML=src.map(a=>`<option>${esc(a.name)}</option>`).join('') }
function addDraft(item){const d=drafts();d.unshift({id:'D-'+Date.now(),...item});saveDrafts(d)}
function renderDrafts(){const d=drafts();$('#draftCount').textContent=String(d.length);$('#draftQueue').innerHTML=d.length?d.map(x=>`<div class="draft-item"><b>${esc(x.type)}</b><span>${esc(x.title||x.jobId||x.rndId||x.url||'')}</span><small>${new Date(x.at).toLocaleString('th-TH')}</small></div>`).join(''):'<div class="empty">No local control actions yet.</div>'}

async function boot(){
 const fallbackMetrics={target:10000000,verifiedRevenue:0,qualifiedPipeline:0,mathStatus:'YELLOW',compressionFactor:1,constraint:'Collect real customer evidence',constraintWhy:'No verified customer economics yet.',nextAction:'Quantify the Golden Workflow baseline.',assets:[],updated:new Date().toLocaleDateString()};
 const [m,j,t,k,l,r,s,acore,act,ss,sg,ac]=await Promise.all([load('./data/metrics.json',fallbackMetrics),load('./data/jobs.json',[]),load('./data/team.json',[]),load('./data/knowledge.json',[]),load('./data/training.json',[]),load('./data/rnd.json',[]),load('./data/schedule.json',[]),load('./data/agents_core.json',{agents:[]}),load('./data/agent_activity.json',{events:[]}),load('./data/scout_sources.json',{sources:[]}),load('./data/scout_signals.json',{items:[]}),load('./data/agent_candidates.json',{candidates:[],latestDecision:null})]);
 DATA={metrics:m,jobs:j,team:t,knowledge:k,training:l,rnd:r,schedule:s,agents:acore.agents||[],activity:act.events||[],scoutSources:ss.sources||[],scoutSignals:sg.items||[],agentCandidates:ac.candidates||[],agentCandidateDecision:ac.latestDecision||null};
 renderScore(m);renderJobs(j);renderTeam(t);renderAgentFactory();renderScout();renderKnowledge(k);renderTraining(l);renderRND(r);renderSchedule(s);populateOwners();populateOfficeFilters();renderOffice();renderActivity();renderDrafts();connectRuntime();
}
$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab,.view').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.view).classList.add('active')});
setInterval(()=>$('#clock').textContent=new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit',second:'2-digit'}),1000);

$('#jobForm').onsubmit=e=>{e.preventDefault();addDraft({type:'CREATE_JOB',title:$('#jobTitle').value,owner:$('#jobOwner').value,objective:$('#jobObjective').value,acceptance:$('#jobAcceptance').value,metric:$('#jobMetric').value,status:'QUEUED',at:new Date().toISOString()});e.target.reset();populateOwners()};
$('#addChannelBtn').onclick=()=>{const url=$('#channelInput').value.trim();if(url)addDraft({type:'ADD_SOURCE',url,scope:'RELEVANT_ONLY',at:new Date().toISOString()})};
$('#clearBtn').onclick=()=>{if(confirm('Clear local draft actions?'))saveDrafts([])};
$('#exportBtn').onclick=()=>{const payload={phase:'QUALITY_FIRST_AGENT_OFFICE',exportedAt:new Date().toISOString(),metrics:DATA.metrics,localDrafts:drafts()};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='agis-quality-agent-snapshot.json';a.click();URL.revokeObjectURL(a.href)};
['officeSearch','officeDepartment','officeStatus'].forEach(id=>$('#'+id)?.addEventListener(id==='officeSearch'?'input':'change',renderOffice));
$('[data-close-drawer]').forEach(x=>x.onclick=closeAgent);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAgent()});
boot();