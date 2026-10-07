#!/usr/bin/env node
// ponytail — TraeCode UserPromptSubmit hook to track which ponytail mode is
// active. Inspects user input for /ponytail commands and writes mode to flag
// file. Mode switches also re-inject that level's ruleset: Trae has no slash
// command that would load the skill body, and the SessionStart ruleset is
// filtered to the start level (same reason Codex/Cursor get it inline).

const { getDefaultMode, isDeactivationCommand, writeDefaultMode } = require('./ponytail-config');
const { clearMode, readMode, setMode, writeHookOutput } = require('./ponytail-runtime');
const { getPonytailInstructions } = require('./ponytail-instructions');

let input = '';
let done = false;

function finish() {
  if (done) return;
  done = true;
  try {
    // Strip UTF-8 BOM some shells prepend when piping (breaks JSON.parse)
    const data = JSON.parse(input.replace(/^\uFEFF/, ''));
    const prompt = (data.prompt || '').trim().toLowerCase();

    // Match /ponytail commands
    let modeSwitched = false;
    let deactivated = false;
    if (/^[/@$]ponytail/.test(prompt)) {
      const parts = prompt.split(/\s+/);
      const cmd = parts[0].replace(/^[@$]/, '/');
      const arg = parts[1] || '';

      let mode = null;
      let isReportOnly = false;

      // ponytail-review is a one-shot skill, not a session level (#736), so
      // any /ponytail-* sibling here (review/audit/debt/gain/help) is left
      // alone — Trae loads those as skills when the user asks for them.
      if (cmd === '/ponytail') {
        // `/ponytail default <mode>` persists the default to config (survives
        // restarts). Plain switches stay session-scoped ("sticks until session
        // end"), so this is the only path that writes config. review is not a
        // valid default (#377), so only off/lite/full/ultra are accepted.
        if (arg === 'default') {
          const dmode = parts[2];
          if (dmode === 'off' || dmode === 'lite' || dmode === 'full' || dmode === 'ultra') {
            writeDefaultMode(dmode);
            writeHookOutput('UserPromptSubmit', 'PONYTAIL DEFAULT SET — new sessions start in ' + dmode + '.');
          }
          return; // don't fall through to the session-mode switch
        }
        if (arg === 'lite') mode = 'lite';
        else if (arg === 'full') mode = 'full';
        else if (arg === 'ultra') mode = 'ultra';
        else if (arg === 'off') mode = 'off';
        else if (arg === '') {
          // Bare /ponytail switches ponytail on: off → the default level (full if
          // the default is off too); already on → keep the level, report it (#639).
          const live = readMode();
          if (live && live !== 'off') {
            isReportOnly = true;
            mode = live;
          } else {
            mode = getDefaultMode() === 'off' ? 'full' : getDefaultMode();
          }
        }
      }

      if (isReportOnly) {
        writeHookOutput('UserPromptSubmit', 'PONYTAIL MODE ACTIVE — level: ' + mode);
      } else if (mode && mode !== 'off') {
        setMode(mode);
        modeSwitched = true;
        writeHookOutput(
          'UserPromptSubmit',
          'PONYTAIL MODE CHANGED — level: ' + mode + '\n\n' + getPonytailInstructions(mode),
        );
      } else if (mode === 'off') {
        clearMode();
        deactivated = true;
        writeHookOutput('UserPromptSubmit', 'PONYTAIL MODE OFF');
      }
    }

    // Detect deactivation
    if (!modeSwitched && !deactivated && isDeactivationCommand(prompt)) {
      clearMode();
      writeHookOutput('UserPromptSubmit', 'PONYTAIL MODE OFF');
    }

    // Ordinary prompts stay silent: Trae fires SessionStart for activation, so
    // there is nothing to re-inject per turn (unlike Qoder, which has no
    // SessionStart and needs the ruleset on every prompt).
  } catch (e) {
    // Silent fail
  }
}

process.stdin.on('data', chunk => { input += chunk; });
// Exit on 'end', not just finish(): the fallback timer below must stay ref'd
// (see #790) so it can actually fire when stdin is stuck, and a ref'd timer
// would otherwise keep the process alive for its full 1000ms on this normal
// fast path.
process.stdin.on('end', () => { finish(); process.exit(0); });

// Never hang the session. If the host's stdin pipe misbehaves (Windows hosts
// have shipped shell wrappers that swallow the piped prompt JSON, #443/#790),
// process whatever arrived and exit instead of blocking until the watchdog.
process.stdin.on('error', () => { finish(); process.exit(0); });
setTimeout(() => { finish(); process.exit(0); }, 1000);
