const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const fmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0);
async function load(path,fallback){try{const r=await fetch(path+'?v='+Date.now());if(!r.ok)throw 0;return await r.json()}catch{return fallback}}
function statusClass(s){s=(s||'').toLowerCase();return s.includes('block')?'red':s.includes('review')?'yellow':'green'}
function renderJobs(jobs){$('#jobBoard').innerHTML=jobs.map(j=>`<article class="job"><div class="job-top"><span>${j.id}</span><span class="status ${statusClass(j.status)}">${j.status}</span></div><h3>${j.title}</h3><p>${j.objective}</p><footer><span>${j.owner}</span><span>${j.metric||''}</span></footer></article>`).join('')}
function renderTeam(team){$('#teamGrid').innerHTML=team.map((a,i)=>`<article class="agent"><div class="agent-head"><div class="avatar">${String(i+1).padStart(2,'0')}</div><div><h3>${a.name}</h3><div class="role">${a.role}</div></div></div><p>${a.mission}</p><div class="meta"><span>KPI: ${a.kpi}</span><span>${a.status}</span></div></article>`).join('')}
function renderKnowledge(items){$('#knowledgeQueue').innerHTML=items.map(k=>`<article class="knowledge-item"><div class="k-top"><span class="badge">${k.source}</span><span class="status ${statusClass(k.state)}">${k.state}</span></div><h3>${k.title}</h3><p>${k.signal}</p><div class="meta"><small>Next: ${k.next}</small></div></article>`).join('')}
function renderTraining(items){$('#trainingLog').innerHTML=items.map(x=>`<div class="event"><small>${x.date} • ${x.agent}</small><h4>${x.lesson}</h4><p>${x.evidence}</p></div>`).join('')}
function renderScore(metrics){
 const rev=metrics.verifiedRevenue||0,target=metrics.target||10000000,gap=Math.max(0,target-rev);
 $('#verifiedRevenue').textContent=fmt(rev);$('#revenueGap').textContent=fmt(gap);$('#pipeline').textContent=fmt(metrics.qualifiedPipeline||0);
 $('#revenueBar').style.width=Math.min(100,rev/target*100)+'%';$('#mathStatus').textContent=metrics.mathStatus||'YELLOW';$('#mathStatus').className='status '+(metrics.mathStatus==='GREEN'?'green':metrics.mathStatus==='RED'?'red':'yellow');
 $('#compressionFactor').textContent=(metrics.compressionFactor||1).toFixed(1)+'×';$('#constraint').textContent=metrics.constraint;$('#constraintWhy').textContent=metrics.constraintWhy;$('#nextAction').textContent=metrics.nextAction;
 const score=[['Paying partners',metrics.payingPartners],['Reuse ratio',metrics.reuseRatio],['Time-to-value',metrics.timeToValue],['Eval pass rate',metrics.evalPass],['Founder hrs/customer',metrics.founderHours],['Cost / success',metrics.costPerSuccess]];
 $('#scoreGrid').innerHTML=score.map(x=>`<div class="score"><small>${x[0]}</small><strong>${x[1]??'—'}</strong></div>`).join('');
 $('#assetGrid').innerHTML=(metrics.assets||[]).map(x=>`<div class="asset"><small>${x.name}</small><strong>${x.count}</strong></div>`).join('');
 $('#lastUpdated').textContent='Last updated '+(metrics.updated||'—')
}
async function boot(){
 const fallbackMetrics={target:10000000,verifiedRevenue:0,qualifiedPipeline:0,mathStatus:'YELLOW',compressionFactor:1,constraint:'Collect real customer evidence',constraintWhy:'No verified customer economics yet.',nextAction:'Quantify the Golden Workflow baseline.',assets:[],updated:new Date().toLocaleDateString()};
 const [m,j,t,k,l]=await Promise.all([load('./data/metrics.json',fallbackMetrics),load('./data/jobs.json',[]),load('./data/team.json',[]),load('./data/knowledge.json',[]),load('./data/training.json',[])]);
 renderScore(m);renderJobs(j);renderTeam(t);renderKnowledge(k);renderTraining(l);
}
$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab,.view').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.view).classList.add('active')});
setInterval(()=>$('#clock').textContent=new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'}),1000);
$('#addChannelBtn').onclick=()=>alert('Registry UI ready. Persisting a new channel requires the Worker/API or the daily AGIS automation to update data/youtube_channels.json.');
boot();