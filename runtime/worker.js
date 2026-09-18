const JSON_HEADERS={'content-type':'application/json; charset=utf-8'};
const ALLOWED_STATES=new Set(['WORKING','REVIEW','LEARNING','BLOCKED','READY']);

function json(data,status=200,extra={}){return new Response(JSON.stringify(data),{status,headers:{...JSON_HEADERS,...extra}})}
function cors(env){return {
  'access-control-allow-origin': env.CORS_ORIGIN || '*',
  'access-control-allow-methods':'GET,POST,OPTIONS',
  'access-control-allow-headers':'content-type,authorization',
  'cache-control':'no-store'
}}
function authorized(req,env){
  const expected=env.CONTROL_TOKEN;
  if(!expected) return false;
  return req.headers.get('authorization')===`Bearer ${expected}`;
}
async function body(req){try{return await req.json()}catch{return null}}
async function audit(env,actor,action,target,detail={}){
  const id=crypto.randomUUID();
  await env.DB.prepare('INSERT INTO audit_events(id,ts,actor,action,target,detail_json) VALUES(?,?,?,?,?,?)')
    .bind(id,new Date().toISOString(),actor,action,target,JSON.stringify(detail)).run();
}
async function office(env){
  const agents=await env.DB.prepare(`
    SELECT id,name,department,specialty,mission,kpi,permission,status,current_job AS currentJob,
           supervisor,skill_level AS skillLevel,learning_state AS learningState,last_seen AS lastSeen
    FROM agents ORDER BY id
  `).all();
  const events=await env.DB.prepare(`
    SELECT ts AS time,agent_name AS agent,type,text
    FROM agent_events ORDER BY ts DESC LIMIT 50
  `).all();
  return {mode:'RUNTIME',agents:agents.results||[],events:events.results||[],serverTime:new Date().toISOString()};
}
async function route(req,env){
  const url=new URL(req.url);
  if(req.method==='OPTIONS') return new Response(null,{status:204,headers:cors(env)});
  if(url.pathname==='/api/health') return json({ok:true,phase:'2B',time:new Date().toISOString()},200,cors(env));
  if(url.pathname==='/api/office' && req.method==='GET') return json(await office(env),200,cors(env));
  if(url.pathname==='/api/events' && req.method==='GET'){
    const snapshot=await office(env);
    const payload=`event: office\ndata: ${JSON.stringify(snapshot)}\n\nretry: 5000\n\n`;
    return new Response(payload,{headers:{...cors(env),'content-type':'text/event-stream; charset=utf-8'}});
  }
  if(!authorized(req,env)) return json({error:'unauthorized'},401,cors(env));

  if(url.pathname==='/api/heartbeat' && req.method==='POST'){
    const x=await body(req);
    if(!x?.agentId || !ALLOWED_STATES.has(x.status)) return json({error:'invalid heartbeat'},400,cors(env));
    const now=new Date().toISOString();
    const found=await env.DB.prepare('SELECT name FROM agents WHERE id=?').bind(x.agentId).first();
    if(!found) return json({error:'unknown agent'},404,cors(env));
    await env.DB.prepare('UPDATE agents SET status=?,current_job=?,learning_state=?,last_seen=?,updated_at=? WHERE id=?')
      .bind(x.status,x.currentJob||'',x.learningState||'READY',now,now,x.agentId).run();
    await env.DB.prepare('INSERT INTO agent_events(id,ts,agent_id,agent_name,type,text) VALUES(?,?,?,?,?,?)')
      .bind(crypto.randomUUID(),now,x.agentId,found.name,'HEARTBEAT',x.text||`${x.status}: ${x.currentJob||''}`).run();
    await audit(env,x.agentId,'HEARTBEAT',x.agentId,{status:x.status,currentJob:x.currentJob||''});
    return json({ok:true,at:now},200,cors(env));
  }

  if(url.pathname==='/api/jobs' && req.method==='POST'){
    const x=await body(req);
    if(!x?.title || !x?.ownerAgentId || !x?.acceptanceTest) return json({error:'missing job fields'},400,cors(env));
    const id=x.id||`JOB-${Date.now()}`; const now=new Date().toISOString();
    await env.DB.prepare(`INSERT INTO jobs(id,title,objective,owner_agent_id,status,acceptance_test,metric,created_at,updated_at)
      VALUES(?,?,?,?,?,?,?,?,?)`).bind(id,x.title,x.objective||'',x.ownerAgentId,'QUEUED',x.acceptanceTest,x.metric||'',now,now).run();
    await audit(env,'CONTROL','CREATE_JOB',id,{ownerAgentId:x.ownerAgentId,title:x.title});
    return json({ok:true,id,status:'QUEUED'},201,cors(env));
  }

  if(url.pathname==='/api/approvals' && req.method==='POST'){
    const x=await body(req);
    if(!x?.targetType || !x?.targetId || !['APPROVE','REJECT'].includes(x.decision)) return json({error:'invalid approval'},400,cors(env));
    const id=crypto.randomUUID(); const now=new Date().toISOString();
    await env.DB.prepare('INSERT INTO approvals(id,ts,target_type,target_id,decision,reviewer,note) VALUES(?,?,?,?,?,?,?)')
      .bind(id,now,x.targetType,x.targetId,x.decision,x.reviewer||'Boss Agis',x.note||'').run();
    await audit(env,x.reviewer||'Boss Agis','APPROVAL',`${x.targetType}:${x.targetId}`,{decision:x.decision});
    return json({ok:true,id,decision:x.decision},201,cors(env));
  }
  return json({error:'not found'},404,cors(env));
}
export default {fetch:route};
