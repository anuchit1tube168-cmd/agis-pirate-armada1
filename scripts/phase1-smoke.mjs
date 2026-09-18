import fs from 'node:fs';

const requiredFiles = [
  'index.html','app.js','styles.css','AGENTS.md','EVOLUTION.md',
  'DO_THE_MATH.md','TIME_COMPRESSION.md','DATA_LEARNING_OS.md',
  'RND_ENGINE.md','PHASE-1-DONE.md',
  'data/metrics.json','data/jobs.json','data/team.json',
  'data/knowledge.json','data/training.json','data/rnd.json',
  'data/schedule.json','data/youtube_channels.json','data/clip_queue.json'
];

const errors=[];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) errors.push(`missing: ${file}`);
}

for (const file of requiredFiles.filter(x=>x.endsWith('.json'))) {
  try { JSON.parse(fs.readFileSync(file,'utf8')); }
  catch (e) { errors.push(`invalid json: ${file}: ${e.message}`); }
}

const html=fs.readFileSync('index.html','utf8');
for (const id of ['mission','command','team','knowledge','learning','rnd','jobBoard','draftQueue','scheduleGrid']) {
  if (!html.includes(`id="${id}"`)) errors.push(`missing UI anchor: #${id}`);
}

const js=fs.readFileSync('app.js','utf8');
for (const token of ['localStorage','renderJobs','renderTeam','renderKnowledge','renderRND','renderSchedule','agis-phase1-snapshot.json']) {
  if (!js.includes(token)) errors.push(`missing app capability token: ${token}`);
}

const publicText = requiredFiles
  .filter(f=>fs.existsSync(f) && !f.endsWith('.json'))
  .map(f=>fs.readFileSync(f,'utf8')).join('\n');

const secretPatterns=[
  /sk-[A-Za-z0-9_-]{20,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/
];
for (const p of secretPatterns) if (p.test(publicText)) errors.push(`possible secret pattern: ${p}`);

if (errors.length) {
  console.error('PHASE 1 SMOKE TEST FAILED');
  for (const e of errors) console.error('-',e);
  process.exit(1);
}

console.log('PHASE 1 SMOKE TEST PASSED');
console.log(`Checked ${requiredFiles.length} required files, JSON validity, UI anchors, control capabilities, and basic secret patterns.`);
