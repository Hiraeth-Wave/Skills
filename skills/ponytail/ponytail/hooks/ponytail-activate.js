#!/usr/bin/env node
// ponytail — TraeCode SessionStart activation hook
//
// Runs on every session start (Trae fires it after session creation, before
// the first message):
//   1. Writes flag file at ~/.trae-cn/.ponytail-active (plus a per-workspace
//      copy under ponytail-modes/) recording the active level
//   2. Emits the ponytail ruleset as hidden session context, filtered to the
//      active intensity level
//
// Claude-specific extras from the upstream hook (statusline detection nudge,
// Cursor always-on-rule handshake) are dropped: TraeCode has no statusLine
// setting and no rule file the hooks would need to yield to.
// The v5 codebase map (ponytail-map.js) is kept: it is host-agnostic.

const { getDefaultMode } = require('./ponytail-config');
const { getPonytailInstructions } = require('./ponytail-instructions');
const { clearMode, setMode, writeHookOutput } = require('./ponytail-runtime');

const mode = getDefaultMode();

// "off" mode — skip activation entirely, don't write flag or emit rules
if (mode === 'off') {
  clearMode();
  process.exit(0);
}

// 1. Write flag file
try {
  setMode(mode);
} catch (e) {
  // Silent fail -- flag is best-effort, don't block the hook
}

// 2. Emit the ponytail ruleset, filtered to the active intensity level.
let output = getPonytailInstructions(mode);

// 2b. Codebase map: what already exists, so "reuse first" costs no search. Fail open: a map
// that cannot be built must never block or slow the session start. Root preference mirrors
// ponytail-runtime.js: Trae hands the workspace over as TRAE_PROJECT_DIR.
if (process.env.PONYTAIL_MAP !== '0') try {
  const root = (process.env.TRAE_PROJECT_DIR || process.env.CLAUDE_PROJECT_DIR || '').trim() || process.cwd();
  const map = require('./ponytail-map').buildMap(root);
  if (map) output += '\n\n' + map;
} catch (e) { /* no map */ }

try {
  writeHookOutput('SessionStart', output);
} catch (e) {
  // Silent fail — stdout closed/EPIPE at hook exit must not surface as a hook failure
}
