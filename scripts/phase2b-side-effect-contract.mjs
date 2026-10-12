// Phase 2B staging-only deterministic side-effect/reconciliation experiment.
// No network, credentials, or production writes. Models failure, replay, ambiguous crash recovery,
// and receipt/status-query recovery when create-response delivery is lost.

function ok(cond,msg){ if(!cond) throw new Error(msg); }

class EffectStore {
  constructor(){ this.intents=new Map(); this.idempotency=new Map(); this.audit=[]; }
  createIntent({idem,target,payload}){
    const prior=this.idempotency.get(idem);
    if(prior) return this.intents.get(prior);
    const id=`FX-${this.intents.size+1}`;
    const row={id,idem,target,payload:structuredClone(payload),status:'PENDING',attempts:0,providerReceipt:null,lastError:null};
    this.intents.set(id,row); this.idempotency.set(idem,id);
    this.audit.push({action:'EFFECT_PENDING',target:id,status:'PENDING'});
    return row;
  }
  recordFailure(id,error){ const row=this.intents.get(id); row.status='FAILED'; row.lastError=error; row.attempts+=1; this.audit.push({action:'EFFECT_FAILED',target:id,status:'FAILED',error}); }
  recordSuccess(id,receipt){ const row=this.intents.get(id); row.status='SUCCEEDED'; row.providerReceipt=receipt; row.lastError=null; row.attempts+=1; this.audit.push({action:'EFFECT_SUCCEEDED',target:id,status:'SUCCEEDED',receipt}); }
  recordAmbiguous(id,error){ const row=this.intents.get(id); row.status='PENDING'; row.lastError=error; row.attempts+=1; this.audit.push({action:'EFFECT_AMBIGUOUS',target:id,status:'PENDING',error}); }
  recordRecovered(id,receipt){ const row=this.intents.get(id); row.status='SUCCEEDED'; row.providerReceipt=receipt; row.lastError=null; row.attempts+=1; this.audit.push({action:'EFFECT_RECOVERED',target:id,status:'SUCCEEDED',receipt}); }
}

class MockAdapter {
  constructor(){ this.calls=[]; this.failNext=true; this.effects=new Map(); }
  async execute(intent){
    this.calls.push({intentId:intent.id,target:intent.target,payload:structuredClone(intent.payload)});
    if(this.failNext){ this.failNext=false; throw new Error('MOCK_FORCED_FAILURE'); }
    if(!this.effects.has(intent.id)) this.effects.set(intent.id,{receipt:`mock:${intent.id}`,payload:structuredClone(intent.payload)});
    return this.effects.get(intent.id).receipt;
  }
}

async function reconcile(store,adapter,intent){
  if(intent.status==='SUCCEEDED') return intent;
  try{ const receipt=await adapter.execute(intent); store.recordSuccess(intent.id,receipt); }
  catch(e){ store.recordFailure(intent.id,e.message); }
  return intent;
}

const store=new EffectStore();
const adapter=new MockAdapter();
const original=store.createIntent({idem:'effect-contract-001',target:'JOB-TEST',payload:{decision:'APPROVE',amount:100}});
ok(original.status==='PENDING','intent must be durable/auditable before adapter execution');
ok(store.audit.at(-1)?.action==='EFFECT_PENDING','pending intent must be audited');
await reconcile(store,adapter,original);
ok(original.status==='FAILED','forced adapter failure must produce FAILED state');
ok(original.attempts===1,'failed attempt must be counted');
ok(store.audit.some(x=>x.action==='EFFECT_FAILED' && x.target===original.id),'failure must be audited');
ok(adapter.effects.size===0,'failed adapter call must not create external effect');
const tamperedReplay=store.createIntent({idem:'effect-contract-001',target:'JOB-TAMPERED',payload:{decision:'REJECT',amount:999999}});
ok(tamperedReplay.id===original.id,'changed-body replay must resolve to original intent');
ok(tamperedReplay.target==='JOB-TEST' && tamperedReplay.payload.decision==='APPROVE' && tamperedReplay.payload.amount===100,'replay must not mutate authoritative intent');
ok(store.intents.size===1,'replay must not duplicate durable intent');
await reconcile(store,adapter,original);
ok(original.status==='SUCCEEDED','reconciliation retry must reach SUCCEEDED');
ok(original.attempts===2,'success retry must increment attempt count');
ok(adapter.effects.size===1,'successful reconciliation must create exactly one external effect');
ok(store.audit.some(x=>x.action==='EFFECT_SUCCEEDED' && x.target===original.id),'success must be audited');
const callsAfterSuccess=adapter.calls.length;
await reconcile(store,adapter,original);
ok(adapter.calls.length===callsAfterSuccess,'replay after success must not call adapter again');
ok(adapter.effects.size===1,'replay after success must not duplicate external effect');

// Ambiguous crash window for providers honoring a stable idempotency key.
const crashStore=new EffectStore();
const crashAdapter=new MockAdapter(); crashAdapter.failNext=false;
const crashIntent=crashStore.createIntent({idem:'effect-crash-001',target:'JOB-CRASH',payload:{decision:'APPROVE',amount:250}});
const receiptBeforeCrash=await crashAdapter.execute(crashIntent);
ok(crashAdapter.effects.size===1,'provider must have committed exactly one effect before simulated crash');
ok(crashIntent.status==='PENDING','local state must remain PENDING when crash occurs before recordSuccess');
ok(crashIntent.providerReceipt===null,'receipt must not be locally persisted before simulated crash');
await reconcile(crashStore,crashAdapter,crashIntent);
ok(crashIntent.status==='SUCCEEDED','restart reconciliation must converge ambiguous PENDING intent to SUCCEEDED');
ok(crashIntent.providerReceipt===receiptBeforeCrash,'provider retry must recover the original receipt');
ok(crashAdapter.effects.size===1,'provider-idempotent retry must not create a second external effect');
ok(crashAdapter.calls.length===2,'ambiguous window requires one provider call before crash and one retry after restart');
ok(crashStore.audit.some(x=>x.action==='EFFECT_SUCCEEDED' && x.target===crashIntent.id),'recovered success must be audited');
const crashCallsAfterSuccess=crashAdapter.calls.length;
await reconcile(crashStore,crashAdapter,crashIntent);
ok(crashAdapter.calls.length===crashCallsAfterSuccess,'post-recovery replay must not call provider again');
ok(crashAdapter.effects.size===1,'post-recovery replay must keep exactly one external effect');

// RECEIPT-STATUS-QUERY hypothesis: provider does NOT rely on retrying create.
// A durable correlation key is sent on the first create. The provider commits one effect but the
// response is lost. Restart performs status lookup by correlation and recovers the existing receipt.
class MockReceiptQueryAdapter {
  constructor(){ this.createCalls=[]; this.queryCalls=[]; this.effectsByCorrelation=new Map(); }
  async create(intent,correlation){
    this.createCalls.push({intentId:intent.id,correlation});
    if(this.effectsByCorrelation.has(correlation)) throw new Error('SECOND_CREATE_FORBIDDEN');
    const effect={receipt:`receipt:${correlation}`,status:'SUCCEEDED',payload:structuredClone(intent.payload)};
    this.effectsByCorrelation.set(correlation,effect);
    throw new Error('CREATE_RESPONSE_LOST_AFTER_COMMIT');
  }
  async queryStatus(correlation){
    this.queryCalls.push({correlation});
    return this.effectsByCorrelation.get(correlation) ?? null;
  }
}

const receiptStore=new EffectStore();
const receiptAdapter=new MockReceiptQueryAdapter();
const receiptIntent=receiptStore.createIntent({idem:'effect-receipt-001',target:'JOB-RECEIPT',payload:{decision:'APPROVE',amount:400}});
const durableCorrelation=`corr:${receiptIntent.id}`;
try { await receiptAdapter.create(receiptIntent,durableCorrelation); }
catch(e){ ok(e.message==='CREATE_RESPONSE_LOST_AFTER_COMMIT','experiment must lose create response only after provider commit'); receiptStore.recordAmbiguous(receiptIntent.id,e.message); }
ok(receiptAdapter.effectsByCorrelation.size===1,'lost response must still leave exactly one provider effect');
ok(receiptIntent.status==='PENDING','ambiguous local state must remain PENDING until status recovery');
ok(receiptStore.audit.some(x=>x.action==='EFFECT_AMBIGUOUS' && x.target===receiptIntent.id),'ambiguous create outcome must be audited');
// restart: do not call create again; query provider using durable correlation.
const recovered=await receiptAdapter.queryStatus(durableCorrelation);
ok(recovered?.status==='SUCCEEDED','status query must find committed provider effect');
receiptStore.recordRecovered(receiptIntent.id,recovered.receipt);
ok(receiptIntent.status==='SUCCEEDED','receipt-query recovery must converge to SUCCEEDED');
ok(receiptIntent.providerReceipt===recovered.receipt,'recovery must persist provider receipt');
ok(receiptAdapter.createCalls.length===1,'recovery must never issue a second create');
ok(receiptAdapter.queryCalls.length===1,'recovery must use exactly one status query in deterministic experiment');
ok(receiptAdapter.effectsByCorrelation.size===1,'receipt-query recovery must preserve exactly one external effect');
ok(receiptStore.audit.some(x=>x.action==='EFFECT_RECOVERED' && x.target===receiptIntent.id),'receipt-query recovery must be audited');
const receiptCreateCallsAfterSuccess=receiptAdapter.createCalls.length;
const receiptQueryCallsAfterSuccess=receiptAdapter.queryCalls.length;
if(receiptIntent.status!=='SUCCEEDED') throw new Error('receipt recovery did not finish');
ok(receiptAdapter.createCalls.length===receiptCreateCallsAfterSuccess && receiptAdapter.queryCalls.length===receiptQueryCallsAfterSuccess,'post-recovery local replay must require no provider call');

console.log('PHASE 2B SIDE-EFFECT RECONCILIATION CONTRACT PASSED');
console.log(JSON.stringify({base:{intents:store.intents.size,auditEvents:store.audit.length,adapterCalls:adapter.calls.length,externalEffects:adapter.effects.size,finalStatus:original.status},crashWindow:{intents:crashStore.intents.size,auditEvents:crashStore.audit.length,adapterCalls:crashAdapter.calls.length,externalEffects:crashAdapter.effects.size,finalStatus:crashIntent.status,providerReceipt:crashIntent.providerReceipt},receiptStatusQuery:{intents:receiptStore.intents.size,auditEvents:receiptStore.audit.length,createCalls:receiptAdapter.createCalls.length,queryCalls:receiptAdapter.queryCalls.length,externalEffects:receiptAdapter.effectsByCorrelation.size,finalStatus:receiptIntent.status,providerReceipt:receiptIntent.providerReceipt},network:false,productionWrite:false},null,2));
