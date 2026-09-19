#!/usr/bin/env bash
set -euo pipefail
DB="${TMPDIR:-/tmp}/agis-phase2b.sqlite"
rm -f "$DB"

sqlite3 "$DB" < runtime/schema.sql
sqlite3 "$DB" < runtime/seed-core-agents.sql

AGENTS="$(sqlite3 "$DB" 'SELECT COUNT(*) FROM agents;')"
if [ "$AGENTS" != "12" ]; then
  echo "Expected 12 seeded agents, found $AGENTS"
  exit 1
fi

for table in agents jobs agent_events approvals audit_events; do
  FOUND="$(sqlite3 "$DB" "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='$table';")"
  if [ "$FOUND" != "1" ]; then
    echo "Missing table $table"
    exit 1
  fi
done

sqlite3 "$DB" "PRAGMA foreign_key_check;" | tee /tmp/agis-fk-check.txt
if [ -s /tmp/agis-fk-check.txt ]; then
  echo "Foreign key check failed"
  exit 1
fi

echo "PHASE 2B SQLITE COMPATIBILITY TEST PASSED"
echo "Core agents seeded: $AGENTS"
