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
    this.jobs=[]; this.events=[]; this.approvals=[]; this.audits=[];
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
        }
        return {success:true};
      }
    };
  }
}

const DB=new MockDB();
const env={DB,CONTROL_TOKEN:'test-control-token',CORS_ORIGIN:'https://example.test'};
async function call(path,{method='GET',token=false,json}={}){
  const headers={'content-type':'application/json'};
  if(token) headers.authorization='Bearer test-control-token';
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

r=await call('/api/jobs',{method:'POST',token:true,json:{id:'JOB-TEST',title:'Contract test job',objective:'Verify runtime contract',ownerAgentId:'AG-007',acceptanceTest:'contract passes',metric:'pass/fail'}});
ok(r.status===201,'job create must be 201');
ok(DB.jobs.length===1 && DB.jobs[0].owner_agent_id==='AG-007','job must persist');

r=await call('/api/approvals',{method:'POST',token:true,json:{targetType:'job',targetId:'JOB-TEST',decision:'APPROVE',reviewer:'Boss Agis',note:'test approval'}});
ok(r.status===201,'approval must be 201');
ok(DB.approvals.length===1,'approval must persist');
ok(DB.audits.some(x=>x.action==='APPROVAL'),'approval must create audit');

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
  audits:DB.audits.length
},null,2));
