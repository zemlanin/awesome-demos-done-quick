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
  const se = Application("System Events");
  if (args.length > 1) {
    se.keystroke(...args);
  } else {
    for (const symbol of args[0].split("")) {
      if (symbol) {
        se.keystroke(symbol);
        delay(0.05 + Math.random() * 0.05);
      }
    }
  }
}

function keyCode(...args) {
  Application("System Events").keyCode(...args);
  delay(0.05 + Math.random() * 0.05);
}
// https://eastmanreference.com/complete-list-of-applescript-key-codes
keyCode.ESC = 53;
keyCode.ENTER = 36;
keyCode.EQUALS = 24;
keyCode.MINUS = 27;
keyCode.LEFT = 123;
keyCode.RIGHT = 124;
keyCode.DOWN = 125;
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
  require("./actions/thingist-demo.js"),
  () => delay(2),
  require("./actions/script-editor-library.js"),
  () => delay(2),
  require("./actions/safari-jxa-cookbook.js"),

  // // because it's a mac, there is no `window`
  // // also no `fetch()`, no `require()`, no `console.dir()`, no async i/o...
  // // even keycodes are different ¯\_(ツ)_/¯
  // // console.log("Терминал") => –Ґ–µ—А–Љ–Є–љ–∞–ї
  // require("./actions/one-more-js-environment.js"),

  // require("./actions/outro.js"),

  () => delay(0.1)
];

function run(argv) {
  const opts = require("./jxargv.js")(argv);

  let skipUntil = null;
  if (opts["skip-until"] || opts[""]) {
    skipUntil = (opts["skip-until"] || opts[""]).toString();
  }

  let only = opts.only;
  if (only) {
    skipUntil = only;
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

    if (only) {
      break;
    }
  }
}
