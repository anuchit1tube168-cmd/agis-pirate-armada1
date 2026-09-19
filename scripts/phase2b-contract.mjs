import worker from '../runtime/worker.js';
import fs from 'node:fs';

class MockDB {
  constructor(){
    const reg=JSON.parse(fs.readFileSync('data/agents_core.json','utf8'));
    this.agents=new Map(reg.agents.map(a=>[a.id,{
      id:a.id,name:a.name,department:a.department,specialty:a.specialty,mission:a.mission,kpi:a.kpi,
      permission:a.permission,status:a.status,current_job:a.currentJob,supervisor:a.supervisor,
      skill_level:a.skillLevel,learning_state:a.learningState,last_seen:null,updated_at:reg.updated
    }]));
    this.jobs=[]; this.events=[]; this.approvals=[]; this.audits=[]; this.idempotency=new Map();
  }
  prepare(sql){
    const db=this;
    return {
      _args:[],
      bind(...args){this._args=args;return this;},
      async first(){
        if(sql.includes('SELECT name FROM agents WHERE id=?')){
          const a=db.agents.get(this._args[0]); return a?{name:a.name}:null;
        }
        if(sql.includes('SELECT response_json,status_code FROM idempotency_keys')){
          return db.idempotency.get(this._args[0]+'|'+this._args[1])||null;
        }
        return null;
      },
      async all(){
        if(sql.includes('FROM agents ORDER BY id')){
          return {results:[...db.agents.values()].sort((a,b)=>a.id.localeCompare(b.id)).map(a=>({
            id:a.id,name:a.name,department:a.department,specialty:a.specialty,mission:a.mission,kpi:a.kpi,
            permission:a.permission,status:a.status,currentJob:a.current_job,supervisor:a.supervisor,
            skillLevel:a.skill_level,learningState:a.learning_state,lastSeen:a.last_seen
          }))};
        }
        if(sql.includes('FROM agent_events ORDER BY ts DESC LIMIT 50')){
          return {results:[...db.events].sort((a,b)=>b.ts.localeCompare(a.ts)).slice(0,50).map(e=>({
            time:e.ts,agent:e.agent_name,type:e.type,text:e.text
          }))};
        }
        return {results:[]};
      },
      async run(){
        const a=this._args;
        if(sql.startsWith('UPDATE agents SET status=')){
          const row=db.agents.get(a[5]); if(!row) throw new Error('agent missing');
          row.status=a[0];row.current_job=a[1];row.learning_state=a[2];row.last_seen=a[3];row.updated_at=a[4];
        } else if(sql.includes('INSERT INTO agent_events')){
          db.events.push({id:a[0],ts:a[1],agent_id:a[2],agent_name:a[3],type:a[4],text:a[5]});
        } else if(sql.includes('INSERT INTO audit_events')){
          db.audits.push({id:a[0],ts:a[1],actor:a[2],action:a[3],target:a[4],detail_json:a[5]});
        } else if(sql.includes('INSERT INTO jobs')){
          db.jobs.push({id:a[0],title:a[1],objective:a[2],owner_agent_id:a[3],status:a[4],acceptance_test:a[5],metric:a[6],created_at:a[7],updated_at:a[8]});
        } else if(sql.includes('INSERT INTO approvals')){
          db.approvals.push({id:a[0],ts:a[1],target_type:a[2],target_id:a[3],decision:a[4],reviewer:a[5],note:a[6]});
        } else if(sql.includes('INSERT INTO idempotency_keys')){
          db.idempotency.set(a[0]+'|'+a[1],{response_json:a[2],status_code:a[3],created_at:a[4]});
        }
        return {success:true};
      }
    };
  }
  async batch(statements){
    const snapshots={
      jobs:structuredClone(this.jobs),events:structuredClone(this.events),approvals:structuredClone(this.approvals),
      audits:structuredClone(this.audits),idempotency:new Map(this.idempotency)
    };
    try{
      const out=[];
      for(const s of statements) out.push(await s.run());
      return out;
    }catch(e){
      this.jobs=snapshots.jobs;this.events=snapshots.events;this.approvals=snapshots.approvals;
      this.audits=snapshots.audits;this.idempotency=snapshots.idempotency;
      throw e;
    }
  }
}

const DB=new MockDB();
const env={DB,CONTROL_TOKEN:'test-control-token',CORS_ORIGIN:'https://example.test'};
async function call(path,{method='GET',token=false,idem,json}={}){
  const headers={'content-type':'application/json'};
  if(token) headers.authorization='Bearer test-control-token';
  if(idem) headers['idempotency-key']=idem;
  const req=new Request('https://runtime.test'+path,{method,headers,body:json?JSON.stringify(json):undefined});
  return worker.fetch(req,env);
}
function ok(cond,msg){if(!cond) throw new Error(msg)}

let r=await call('/api/health');
ok(r.status===200,'health must be 200');
let j=await r.json(); ok(j.ok===true && j.phase==='2B','health body invalid');

r=await call('/api/office');
ok(r.status===200,'office must be public 200');
j=await r.json(); ok(j.agents.length===12,'office must expose 12 core agents');

r=await call('/api/heartbeat',{method:'POST',json:{agentId:'AG-007',status:'WORKING',currentJob:'Runtime contract test'}});
ok(r.status===401,'heartbeat without token must be 401');

r=await call('/api/heartbeat',{method:'POST',token:true,json:{agentId:'AG-007',status:'WORKING',currentJob:'Runtime contract test',text:'Contract test heartbeat'}});
ok(r.status===200,'authorized heartbeat must be 200');
ok(DB.events.length===1,'heartbeat must create agent event');
ok(DB.audits.some(x=>x.action==='HEARTBEAT'),'heartbeat must create audit');

r=await call('/api/office');
j=await r.json();
ok(j.agents.find(x=>x.id==='AG-007')?.currentJob==='Runtime contract test','office must reflect heartbeat');

const jobBody={id:'JOB-TEST',title:'Contract test job',objective:'Verify runtime contract',ownerAgentId:'AG-007',acceptanceTest:'contract passes',metric:'pass/fail'};
r=await call('/api/jobs',{method:'POST',token:true,json:jobBody});
ok(r.status===400,'job create without idempotency key must be 400');

r=await call('/api/jobs',{method:'POST',token:true,idem:'job-contract-001',json:jobBody});
ok(r.status===201,'job create must be 201');
const jobResponse=await r.json();
ok(DB.jobs.length===1 && DB.jobs[0].owner_agent_id==='AG-007','job must persist');
const auditsAfterJob=DB.audits.length;

r=await call('/api/jobs',{method:'POST',token:true,idem:'job-contract-001',json:jobBody});
ok(r.status===201,'job retry with same idempotency key must return cached 201');
j=await r.json();
ok(j.id===jobResponse.id,'job retry must return same response');
ok(DB.jobs.length===1,'job retry must not duplicate job');
ok(DB.audits.length===auditsAfterJob,'job retry must not duplicate audit');

r=await call('/api/jobs',{method:'POST',token:true,idem:'job-contract-002',json:{...jobBody,ownerAgentId:'UNKNOWN',id:'JOB-BAD'}});
ok(r.status===404,'unknown owner must be rejected');

const approvalBody={targetType:'job',targetId:'JOB-TEST',decision:'APPROVE',reviewer:'Boss Agis',note:'test approval'};
r=await call('/api/approvals',{method:'POST',token:true,json:approvalBody});
ok(r.status===400,'approval without idempotency key must be 400');

r=await call('/api/approvals',{method:'POST',token:true,idem:'approval-contract-001',json:approvalBody});
ok(r.status===201,'approval must be 201');
const approvalResponse=await r.json();
ok(DB.approvals.length===1,'approval must persist');
ok(DB.audits.some(x=>x.action==='APPROVAL'),'approval must create audit');
const auditsAfterApproval=DB.audits.length;

r=await call('/api/approvals',{method:'POST',token:true,idem:'approval-contract-001',json:approvalBody});
ok(r.status===201,'approval retry must return cached 201');
j=await r.json();
ok(j.id===approvalResponse.id,'approval retry must return same response');
ok(DB.approvals.length===1,'approval retry must not duplicate approval');
ok(DB.audits.length===auditsAfterApproval,'approval retry must not duplicate audit');

r=await call('/api/heartbeat',{method:'POST',token:true,json:{agentId:'UNKNOWN',status:'WORKING'}});
ok(r.status===404,'unknown agent heartbeat must be 404');

r=await call('/api/heartbeat',{method:'POST',token:true,json:{agentId:'AG-007',status:'FAKE'}});
ok(r.status===400,'invalid state must be 400');

console.log('PHASE 2B RUNTIME CONTRACT TEST PASSED');
console.log(JSON.stringify({
  agents:DB.agents.size,
  events:DB.events.length,
  jobs:DB.jobs.length,
  approvals:DB.approvals.length,
  audits:DB.audits.length,
  idempotency:DB.idempotency.size
},null,2));
