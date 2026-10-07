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
const output = getPonytailInstructions(mode);

try {
  writeHookOutput('SessionStart', output);
} catch (e) {
  // Silent fail — stdout closed/EPIPE at hook exit must not surface as a hook failure
}
