// RTAFNC Company OS — Phase 1 mock backend
// STAGING ONLY · PRODUCTION WRITE OFF · synthetic fixtures only

export const STAGES = ['ร่าง','เสนอ','อนุมัติ','ออกคำสั่ง','บันทึกทะเบียน'];
const PHASE1_ROLES = new Set(['admin','director','hr','registry']);
const SENSITIVE_ROLES = new Set(['admin','hr']);

export function createStore(now = () => new Date()) {
  return {
    now,
    persons: [], personnel_actions: [], leaves: [], foreign_staff: [],
    doc_cases: [], alerts: [], audit_log: []
  };
}

function id(prefix, store) { return `${prefix}-${String(store.audit_log.length + store.personnel_actions.length + store.doc_cases.length + 1).padStart(4,'0')}`; }
function audit(store, actor, role, operation, table, recordId, result, fields=[]) {
  store.audit_log.push({audit_id:id('AUD',store),at:store.now().toISOString(),actor,role,operation,table_name:table,record_id:recordId,fields_accessed:fields.join(','),result,request_id:id('REQ',store)});
}
function requirePhase1(role) { if (!PHASE1_ROLES.has(role)) throw Object.assign(new Error('FORBIDDEN'),{status:403}); }

export function listPersons(store, {actor='mock-user',role='student'}={}) {
  requirePhase1(role);
  const sensitive = SENSITIVE_ROLES.has(role);
  const rows = store.persons.map(p => sensitive ? {...p} : ({person_id:p.person_id,position:p.position,unit:p.unit,status:p.status}));
  audit(store,actor,role,'READ','persons','*','ALLOW',sensitive?['all']:['person_id','position','unit','status']);
  return rows;
}

export function createPersonnelAction(store, input, {actor='mock-hr',role='hr'}={}) {
  if (!SENSITIVE_ROLES.has(role)) throw Object.assign(new Error('FORBIDDEN'),{status:403});
  if (input.stage && input.stage !== STAGES[0]) throw Object.assign(new Error('INITIAL_STAGE_MUST_BE_DRAFT'),{status:409});
  const action_id=id('ACT',store), doc_id=id('DOC',store);
  const action={...input,action_id,stage:STAGES[0],doc_id};
  const doc={doc_id,running_no:`MOCK/${store.doc_cases.length+1}`,urgency:'ปกติ',from:'MOCK-HR',subject:`Mock personnel action ${action_id}`,stage:'ร่าง',linked_action_id:action_id,owner:input.owner||actor};
  store.personnel_actions.push(action); store.doc_cases.push(doc);
  audit(store,actor,role,'CREATE','personnel_actions',action_id,'ALLOW',Object.keys(action));
  audit(store,actor,role,'CREATE','doc_cases',doc_id,'ALLOW',Object.keys(doc));
  return {action,doc};
}

export function transitionPersonnelAction(store, actionId, nextStage, {actor='mock-hr',role='hr'}={}) {
  if (!SENSITIVE_ROLES.has(role)) throw Object.assign(new Error('FORBIDDEN'),{status:403});
  const action=store.personnel_actions.find(x=>x.action_id===actionId);
  if (!action) throw Object.assign(new Error('NOT_FOUND'),{status:404});
  const expected=STAGES[STAGES.indexOf(action.stage)+1];
  if (nextStage!==expected) {
    audit(store,actor,role,'TRANSITION','personnel_actions',actionId,'REJECT',[action.stage,nextStage]);
    throw Object.assign(new Error('INVALID_STAGE_TRANSITION'),{status:409,expected});
  }
  action.stage=nextStage;
  const doc=store.doc_cases.find(x=>x.linked_action_id===actionId); if(doc) doc.stage=nextStage;
  audit(store,actor,role,'TRANSITION','personnel_actions',actionId,'ALLOW',['stage']);
  return {...action};
}

export function runExpiryCron(store) {
  const today=new Date(store.now()); today.setUTCHours(0,0,0,0);
  for (const f of store.foreign_staff) {
    for (const field of ['contract_end','work_permit_expiry','visa_expiry']) {
      if(!f[field]) continue;
      const due=new Date(f[field]); due.setUTCHours(0,0,0,0);
      const days=Math.ceil((due-today)/86400000);
      const threshold=[30,60,90].find(t=>days>0 && days<=t);
      if(!threshold) continue;
      const key=`${f.person_id}:${field}:${threshold}:${f[field]}`;
      if(!store.alerts.some(a=>a.key===key)) store.alerts.push({alert_id:id('ALT',store),key,type:`${field}_expiry`,record_id:f.person_id,due_date:f[field],threshold_days:threshold,status:'OPEN',owner:'hr'});
    }
  }
  return store.alerts;
}
