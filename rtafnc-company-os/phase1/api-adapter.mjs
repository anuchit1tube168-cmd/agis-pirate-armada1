// Phase 1 staging API adapter. Synthetic/mock store only; production writes remain OFF.
import {listPersons,createPersonnelAction,transitionPersonnelAction,runExpiryCron} from './mock-backend.mjs';

const json=(status,body)=>({status,headers:{'content-type':'application/json','cache-control':'no-store'},body});

export function createApi({store,verifyIdentity}) {
  if (!store || typeof verifyIdentity !== 'function') throw new Error('API_DEPENDENCY_MISSING');
  return async function handle(req) {
    const requestId=req.requestId||'REQ-UNKNOWN';
    let identity;
    try { identity=await verifyIdentity(req); }
    catch { return json(401,{error:'UNAUTHENTICATED',requestId}); }
    if (!identity?.sub || !identity?.role) return json(401,{error:'UNAUTHENTICATED',requestId});
    const ctx={actor:identity.sub,role:identity.role};
    try {
      if (req.method==='GET' && req.path==='/api/v1/persons') return json(200,{data:listPersons(store,ctx),requestId});
      if (req.method==='POST' && req.path==='/api/v1/personnel-actions') return json(201,{data:createPersonnelAction(store,req.body||{},ctx),requestId});
      const m=req.path?.match(/^\/api\/v1\/personnel-actions\/([^/]+)\/stage$/);
      if (req.method==='PATCH' && m) return json(200,{data:transitionPersonnelAction(store,m[1],req.body?.stage,ctx),requestId});
      if (req.method==='POST' && req.path==='/internal/cron/expiry') {
        if (identity.role!=='admin') return json(403,{error:'FORBIDDEN',requestId});
        return json(200,{data:runExpiryCron(store),requestId});
      }
      return json(404,{error:'NOT_FOUND',requestId});
    } catch(e) {
      return json(e.status||500,{error:e.message==='FORBIDDEN'?'FORBIDDEN':e.message||'INTERNAL_ERROR',requestId});
    }
  };
}
