PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  specialty TEXT NOT NULL,
  mission TEXT NOT NULL,
  kpi TEXT NOT NULL,
  permission TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'READY',
  current_job TEXT NOT NULL DEFAULT '',
  supervisor TEXT NOT NULL,
  skill_level INTEGER NOT NULL DEFAULT 1,
  learning_state TEXT NOT NULL DEFAULT 'READY',
  last_seen TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  objective TEXT NOT NULL DEFAULT '',
  owner_agent_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'QUEUED',
  acceptance_test TEXT NOT NULL,
  metric TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(owner_agent_id) REFERENCES agents(id)
);

CREATE TABLE IF NOT EXISTS agent_events (
  id TEXT PRIMARY KEY,
  ts TEXT NOT NULL,
  agent_id TEXT,
  agent_name TEXT NOT NULL,
  type TEXT NOT NULL,
  text TEXT NOT NULL,
  FOREIGN KEY(agent_id) REFERENCES agents(id)
);
CREATE INDEX IF NOT EXISTS idx_agent_events_ts ON agent_events(ts DESC);

CREATE TABLE IF NOT EXISTS approvals (
  id TEXT PRIMARY KEY,
  ts TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  decision TEXT NOT NULL,
  reviewer TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  ts TEXT NOT NULL,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  detail_json TEXT NOT NULL DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS idx_audit_events_ts ON audit_events(ts DESC);
