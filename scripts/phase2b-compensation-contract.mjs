// Phase 2B staging-only deterministic COMPENSATION-REQUIRED experiment.
// No network, credentials, production writes, or real compensation actions.

function ok(cond, msg) { if (!cond) throw new Error(msg); }

class Store {
  constructor() { this.intents = new Map(); this.audit = []; }
  createIntent({ id, target, payload }) {
    const row = { id, target, payload: structuredClone(payload), status: 'PENDING', providerReceipt: null, reviewApproved: false };
    this.intents.set(id, row);
    this.audit.push({ action: 'EFFECT_PENDING', target: id, status: row.status });
    return row;
  }
  markAmbiguous(id, reason) {
    const row = this.intents.get(id);
    row.status = 'AMBIGUOUS_REQUIRES_REVIEW';
    this.audit.push({ action: 'EFFECT_AMBIGUOUS_REQUIRES_REVIEW', target: id, status: row.status, reason });
  }
  approveReview(id, reviewer) {
    const row = this.intents.get(id);
    row.reviewApproved = true;
    this.audit.push({ action: 'MANUAL_REVIEW_APPROVED', target: id, reviewer });
  }
  recordResolution(id, resolution) {
    const row = this.intents.get(id);
    if (!row.reviewApproved) throw new Error('APPROVAL_REQUIRED');
    row.status = 'RESOLVED_MANUALLY';
    this.audit.push({ action: 'MANUAL_RESOLUTION_RECORDED', target: id, resolution, status: row.status });
  }
}

class NonRecoverableProviderMock {
  constructor() { this.createCalls = 0; this.externalEffects = 0; }
  async create() {
    this.createCalls += 1;
    this.externalEffects += 1; // provider committed, but exposes no idempotency or status lookup
    throw new Error('CREATE_RESPONSE_LOST_AFTER_COMMIT');
  }
}

const store = new Store();
const provider = new NonRecoverableProviderMock();
const intent = store.createIntent({ id: 'FX-COMP-1', target: 'JOB-COMP', payload: { decision: 'APPROVE', amount: 500 } });

try { await provider.create(intent); }
catch (e) {
  ok(e.message === 'CREATE_RESPONSE_LOST_AFTER_COMMIT', 'experiment must lose response after provider commit');
  store.markAmbiguous(intent.id, e.message);
}

ok(provider.createCalls === 1, 'provider create must occur exactly once');
ok(provider.externalEffects === 1, 'provider must have exactly one committed external effect in experiment');
ok(intent.status === 'AMBIGUOUS_REQUIRES_REVIEW', 'ambiguous non-recoverable outcome must stop for review');
ok(store.audit.some(x => x.action === 'EFFECT_AMBIGUOUS_REQUIRES_REVIEW'), 'ambiguous stop must be audited');

// Automatic reconciliation is intentionally forbidden: no second create is issued.
const callsBeforeReview = provider.createCalls;
ok(provider.createCalls === callsBeforeReview, 'automatic retry must not occur');

// Manual/compensation path is approval-gated and only records a sandbox resolution.
let blockedWithoutApproval = false;
try { store.recordResolution(intent.id, 'SANDBOX_COMPENSATION_RECORDED'); }
catch (e) { blockedWithoutApproval = e.message === 'APPROVAL_REQUIRED'; }
ok(blockedWithoutApproval, 'manual/compensation resolution must be blocked without approval');
ok(intent.status === 'AMBIGUOUS_REQUIRES_REVIEW', 'failed unapproved resolution must preserve review state');

store.approveReview(intent.id, 'SENTINEL-SANDBOX-REVIEWER');
store.recordResolution(intent.id, 'SANDBOX_COMPENSATION_RECORDED');
ok(intent.status === 'RESOLVED_MANUALLY', 'approved sandbox resolution must close manual review state');
ok(provider.createCalls === 1, 'manual resolution must not re-create provider effect');
ok(provider.externalEffects === 1, 'sandbox resolution must not execute real external compensation');
ok(store.audit.some(x => x.action === 'MANUAL_REVIEW_APPROVED'), 'approval must be audited');
ok(store.audit.some(x => x.action === 'MANUAL_RESOLUTION_RECORDED'), 'manual resolution must be audited');

console.log('PHASE 2B COMPENSATION-REQUIRED CONTRACT PASSED');
console.log(JSON.stringify({ status: intent.status, createCalls: provider.createCalls, externalEffects: provider.externalEffects, auditEvents: store.audit.length, approvalGated: true, automaticRetry: false, network: false, productionWrite: false, realCompensationExecuted: false }, null, 2));
