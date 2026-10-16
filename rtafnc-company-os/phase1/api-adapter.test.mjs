import assert from 'node:assert/strict';
import {createStore} from './mock-backend.mjs';
import {createApi} from './api-adapter.mjs';

const s=createStore(()=>new Date('2026-10-17T00:00:00Z'));
s.persons.push({person_id:'MOCK-P001',rank:'MOCK-RANK',position:'Mock Position',unit:'MOCK-UNIT',status:'active'});
const verifyIdentity=async req=>{
  if(req.token==='bad') throw new Error('BAD_TOKEN');
  if(req.token==='hr') return {sub:'mock-hr',role:'hr'};
  if(req.token==='director') return {sub:'mock-director',role:'director'};
  if(req.token==='student') return {sub:'mock-student',role:'student'};
  if(req.token==='admin') return {sub:'mock-admin',role:'admin'};
  return null;
};
const api=createApi({store:s,verifyIdentity});

let r=await api({method:'GET',path:'/api/v1/persons',token:'bad',requestId:'R1'}); assert.equal(r.status,401);
r=await api({method:'GET',path:'/api/v1/persons',token:'student',requestId:'R2'}); assert.equal(r.status,403);
r=await api({method:'GET',path:'/api/v1/persons',token:'director',requestId:'R3'}); assert.equal(r.status,200); assert.equal('rank' in r.body.data[0],false);
r=await api({method:'GET',path:'/api/v1/persons',token:'hr',requestId:'R4'}); assert.equal(r.status,200); assert.equal(r.body.data[0].rank,'MOCK-RANK'); assert.ok(s.audit_log.some(x=>x.operation==='READ'&&x.role==='hr'));
r=await api({method:'POST',path:'/api/v1/personnel-actions',token:'student',body:{person_id:'MOCK-P001',type:'ย้าย',cycle:'1 เม.ย.'},requestId:'R5'}); assert.equal(r.status,403);
r=await api({method:'POST',path:'/api/v1/personnel-actions',token:'hr',body:{person_id:'MOCK-P001',type:'ย้าย',cycle:'1 เม.ย.'},requestId:'R6'}); assert.equal(r.status,201); const id=r.body.data.action.action_id; assert.ok(s.audit_log.some(x=>x.operation==='CREATE'&&x.record_id===id));
r=await api({method:'PATCH',path:`/api/v1/personnel-actions/${id}/stage`,token:'hr',body:{stage:'อนุมัติ'},requestId:'R7'}); assert.equal(r.status,409); assert.ok(s.audit_log.some(x=>x.operation==='TRANSITION'&&x.result==='REJECT'));
r=await api({method:'POST',path:'/internal/cron/expiry',token:'hr',requestId:'R8'}); assert.equal(r.status,403);
r=await api({method:'GET',path:'/unknown',token:'admin',requestId:'R9'}); assert.equal(r.status,404);
assert.equal(r.headers['cache-control'],'no-store');
console.log('PHASE1_RUNTIME_BOUNDARY_PASS',{cases:9,auditEvents:s.audit_log.length});
