const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const fmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0);
const STORAGE_KEY='agis10m.phase1.drafts.v1';
let DATA={metrics:{},jobs:[],team:[],knowledge:[],training:[],rnd:[],schedule:[]};

async function load(path,fallback){try{const r=await fetch(path+'?v='+Date.now());if(!r.ok)throw 0;return await r.json()}catch{return fallback}}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function statusClass(s){s=(s||'').toLowerCase();return s.includes('block')||s.includes('fail')?'red':s.includes('review')||s.includes('queue')||s.includes('plan')?'yellow':'green'}
function drafts(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch{return[]}}
function saveDrafts(v){localStorage.setItem(STORAGE_KEY,JSON.stringify(v));renderDrafts()}

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
function populateOwners(){ $('#jobOwner').innerHTML=DATA.team.map(a=>`<option>${esc(a.name)}</option>`).join('') }
function addDraft(item){const d=drafts();d.unshift({id:'D-'+Date.now(),...item});saveDrafts(d)}
function renderDrafts(){const d=drafts();$('#draftCount').textContent=String(d.length);$('#draftQueue').innerHTML=d.length?d.map(x=>`<div class="draft-item"><b>${esc(x.type)}</b><span>${esc(x.title||x.jobId||x.rndId||x.url||'')}</span><small>${new Date(x.at).toLocaleString('th-TH')}</small></div>`).join(''):'<div class="empty">No local control actions yet.</div>'}

async function boot(){
 const fallbackMetrics={target:10000000,verifiedRevenue:0,qualifiedPipeline:0,mathStatus:'YELLOW',compressionFactor:1,constraint:'Collect real customer evidence',constraintWhy:'No verified customer economics yet.',nextAction:'Quantify the Golden Workflow baseline.',assets:[],updated:new Date().toLocaleDateString()};
 const [m,j,t,k,l,r,s]=await Promise.all([load('./data/metrics.json',fallbackMetrics),load('./data/jobs.json',[]),load('./data/team.json',[]),load('./data/knowledge.json',[]),load('./data/training.json',[]),load('./data/rnd.json',[]),load('./data/schedule.json',[])]);
 DATA={metrics:m,jobs:j,team:t,knowledge:k,training:l,rnd:r,schedule:s};
 renderScore(m);renderJobs(j);renderTeam(t);renderKnowledge(k);renderTraining(l);renderRND(r);renderSchedule(s);populateOwners();renderDrafts();
}
$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab,.view').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.view).classList.add('active')});
setInterval(()=>$('#clock').textContent=new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit',second:'2-digit'}),1000);

$('#jobForm').onsubmit=e=>{e.preventDefault();addDraft({type:'CREATE_JOB',title:$('#jobTitle').value,owner:$('#jobOwner').value,objective:$('#jobObjective').value,acceptance:$('#jobAcceptance').value,metric:$('#jobMetric').value,status:'QUEUED',at:new Date().toISOString()});e.target.reset();populateOwners()};
$('#addChannelBtn').onclick=()=>{const url=$('#channelInput').value.trim();if(url)addDraft({type:'ADD_SOURCE',url,scope:'RELEVANT_ONLY',at:new Date().toISOString()})};
$('#clearBtn').onclick=()=>{if(confirm('Clear local draft actions?'))saveDrafts([])};
$('#exportBtn').onclick=()=>{const payload={phase:'PHASE_1_FOUNDATION',exportedAt:new Date().toISOString(),metrics:DATA.metrics,localDrafts:drafts()};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='agis-phase1-snapshot.json';a.click();URL.revokeObjectURL(a.href)};
boot();