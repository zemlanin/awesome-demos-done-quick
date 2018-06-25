#!/usr/bin/env osascript -l JavaScript

const app = Application.currentApplication();
app.includeStandardAdditions = true;

function require(path) {
  const handle = app.openForAccess(path);
  const contents = app.read(handle);
  app.closeAccess(path);

  const module = {
    exports: {}
  };
  const exports = module.exports;
  eval(contents);

  return module.exports;
}

function keystroke(...args) {
  const se = Application("System Events")
  if (args.length > 1) {
    se.keystroke(...args);
  } else {
    for (const symbol of args[0].split('')) {
      if (symbol) {
        se.keystroke(symbol)
        delay(0.05 + Math.random() * 0.1)
      }
    }
  }
}

function keyCode(...args) {
  Application("System Events").keyCode(...args);
  delay(0.05 + Math.random() * 0.1)
}
// https://eastmanreference.com/complete-list-of-applescript-key-codes
keyCode.ESC = 53;
keyCode.ENTER = 36;
keyCode.EQUALS = 24;
keyCode.MINUS = 27;
keyCode.UP = 126;
keyCode.TAB = 48;

const actions = [
  require("./actions/safari-timer.js"),
  () => delay(2),
  require("./actions/intro.js"),
  () => delay(5),
  require("./actions/terminal-notify.js"),
  () => delay(5),
  require("./actions/countdown-ui.js"),
  () => delay(2),
  require("./actions/thingist-demo.js")

  // require("./actions/script-editor-library.js"),

  // require("./actions/safari-jxa-cookbook.js"),

  // // because it's a mac, there is no `window`
  // // also no `fetch()`, no `require()`, no `console.dir()`, no async i/o...
  // // even keycodes are different ¯\_(ツ)_/¯
  // require("./actions/one-more-js-environment.js"),

  // require("./actions/outro.js"),
];

function openInSublime(path) {
  const subl = Application("Sublime Text");

  Application("System Events")
    .processes.byName("Sublime Text")
    .windows.byActive(true).length;

  Application("System Events").processes.byName(
    "Sublime Text"
  ).windows[0].size = [1075, 655];

  Application("System Events").processes.byName(
    "Sublime Text"
  ).windows[0].position = [200, 23];
}

function run(argv) {
  const opts = require("./jxargv.js")(argv);

  let skipUntil = null;
  if (opts["skip-until"] || opts[""]) {
    skipUntil = (opts["skip-until"] || opts[""]).toString();
  }

  for (const action of actions) {
    if (skipUntil) {
      if (
        action.name &&
        action.name.toLowerCase().indexOf(skipUntil.toLowerCase()) > -1
      ) {
        skipUntil = null;
      } else {
        continue;
      }
    }

    if (typeof action === "function") {
      action();
    } else {
      console.log(action.name);
      action.action();
    }
  }
}
