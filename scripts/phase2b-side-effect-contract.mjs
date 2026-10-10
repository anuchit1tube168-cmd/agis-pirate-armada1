// Phase 2B staging-only deterministic side-effect/reconciliation experiment.
// No network, credentials, or production writes. Models the contract before any provider integration.

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
  recordFailure(id,error){
    const row=this.intents.get(id); row.status='FAILED'; row.lastError=error; row.attempts+=1;
    this.audit.push({action:'EFFECT_FAILED',target:id,status:'FAILED',error});
  }
  recordSuccess(id,receipt){
    const row=this.intents.get(id); row.status='SUCCEEDED'; row.providerReceipt=receipt; row.lastError=null; row.attempts+=1;
    this.audit.push({action:'EFFECT_SUCCEEDED',target:id,status:'SUCCEEDED',receipt});
  }
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
ok(store.intents.size===1,'final replay must keep one authoritative intent');

console.log('PHASE 2B SIDE-EFFECT RECONCILIATION CONTRACT PASSED');
console.log(JSON.stringify({intents:store.intents.size,auditEvents:store.audit.length,adapterCalls:adapter.calls.length,externalEffects:adapter.effects.size,finalStatus:original.status,attempts:original.attempts,network:false,productionWrite:false},null,2));
