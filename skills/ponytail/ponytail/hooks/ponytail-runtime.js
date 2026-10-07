#!/usr/bin/env node
// ponytail — runtime helpers for the TraeCode hook host (port of the
// multi-host ponytail-runtime.js, trimmed to what Trae supports).
//
// TraeCode hooks (docs.trae.cn /ide_hook-configuration-reference):
//   - stdin: JSON with session_id / cwd / hook_event_name (+ per-event fields)
//   - stdout: plain text (SessionStart / UserPromptSubmit only) or JSON
//   - structured JSON form: { hookSpecificOutput: { hookEventName,
//     additionalContext } } — supported by both events we hook, so it is the
//     single output shape used here.
//   - env: TRAE_PROJECT_DIR (and CLAUDE_PROJECT_DIR as a Claude-compat alias)
//     point at the workspace, same contract as Claude Code.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { createHash } = require('crypto');
const { getTraeDir } = require('./ponytail-config');

const STATE_FILE = '.ponytail-active';

const stateDir = getTraeDir();
const statePath = path.join(stateDir, STATE_FILE);

// TraeCode hands every hook the workspace dir, so the live mode is kept per
// project and concurrent sessions in different repos stop overwriting each
// other (#662, #809). Workspaces without it keep the single shared flag.
// ponytail: sessions in the SAME repo still share one mode; key by session_id
// if per-session isolation ever matters.
const projectDir = (process.env.TRAE_PROJECT_DIR || process.env.CLAUDE_PROJECT_DIR || '').trim();
// Replacing separators with '_' aliases e.g. /work/a/b and /work/a_b (#662).
// Do not read old sanitized keys: they cannot be assigned to one project safely.
const projectStatePath = projectDir
  ? path.join(stateDir, 'ponytail-modes',
    createHash('sha256').update(path.normalize(projectDir)).digest('hex'))
  : null;

// The shared flag is still written, for host-level introspection.
function setMode(mode) {
  for (const file of [projectStatePath, statePath]) {
    if (!file) continue;
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, mode);
  }
}

function clearMode() {
  for (const file of [projectStatePath, statePath]) {
    if (file) try { fs.unlinkSync(file); } catch (e) {}
  }
}

// Live mode written by activate/mode-tracker. Absent flag = ponytail off.
function readMode() {
  try {
    return fs.readFileSync(projectStatePath || statePath, 'utf8').trim() || null;
  } catch (e) {
    return null;
  }
}

function writeHookOutput(event, context = '') {
  // Empty context → empty JSON object: Trae treats it as "nothing to say",
  // same contract Cursor uses for structured output.
  process.stdout.write(JSON.stringify(
    context
      ? { hookSpecificOutput: { hookEventName: event, additionalContext: context } }
      : {}
  ));
}

module.exports = {
  clearMode,
  isTrae: true,
  readMode,
  setMode,
  writeHookOutput,
};
