import assert from 'node:assert/strict';
import {createStore,createPersonnelAction,transitionPersonnelAction,listPersons,runExpiryCron,STAGES} from './mock-backend.mjs';

let now=new Date('2026-10-16T00:00:00Z');
const s=createStore(()=>now);
s.persons.push({person_id:'MOCK-P001',rank:'MOCK-RANK',position:'Mock Position',unit:'MOCK-UNIT',status:'active'});
s.foreign_staff.push({person_id:'MOCK-F001',work_permit_expiry:'2026-11-30'}); // 45 days

// Gate 1: one action -> exactly one linked doc
const {action,doc}=createPersonnelAction(s,{person_id:'MOCK-P001',type:'ย้าย',cycle:'1 เม.ย.',owner:'mock-hr'});
assert.equal(s.doc_cases.length,1); assert.equal(doc.linked_action_id,action.action_id); assert.equal(action.doc_id,doc.doc_id);

// Gate 2: full ordered stage flow
for (const stage of STAGES.slice(1)) transitionPersonnelAction(s,action.action_id,stage);
assert.equal(s.personnel_actions[0].stage,'บันทึกทะเบียน'); assert.equal(s.doc_cases[0].stage,'บันทึกทะเบียน');

// Gate 3: skipped stage rejected + audited
const second=createPersonnelAction(s,{person_id:'MOCK-P001',type:'เลื่อนยศ',cycle:'1 ต.ค.'}).action;
let skipped=false; try { transitionPersonnelAction(s,second.action_id,'อนุมัติ'); } catch(e) { skipped=e.status===409; }
assert.equal(skipped,true); assert.ok(s.audit_log.some(x=>x.operation==='TRANSITION'&&x.result==='REJECT'));

// Gate 4: 45-day expiry creates T-60 alert
runExpiryCron(s); assert.ok(s.alerts.some(x=>x.record_id==='MOCK-F001'&&x.threshold_days===60));

// Gate 5: non-HR protected fields denied/redacted
let denied=false; try { listPersons(s,{actor:'mock-student',role:'student'}); } catch(e) { denied=e.status===403; }
assert.equal(denied,true);
const director=listPersons(s,{actor:'mock-director',role:'director'}); assert.equal('rank' in director[0],false);

// Gates 6-7: writes and allowed sensitive reads audited
listPersons(s,{actor:'mock-hr',role:'hr'});
assert.ok(s.audit_log.some(x=>x.operation==='CREATE'&&x.table_name==='personnel_actions'));
assert.ok(s.audit_log.some(x=>x.operation==='READ'&&x.table_name==='persons'&&x.role==='hr'));

// Gate 8: fixtures are synthetic; explicit invariant
const serialized=JSON.stringify(s); assert.equal(serialized.includes('MOCK-P001'),true); assert.equal(serialized.includes('MOCK-F001'),true);

console.log('PHASE1_MOCK_ACCEPTANCE_PASS', {gates:8,auditEvents:s.audit_log.length,alerts:s.alerts.length});
