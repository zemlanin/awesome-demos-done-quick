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

const actions = [
  require("./actions/safari-timer.js"),
  () => delay(2),
  require("./actions/intro.js"),
  () => delay(5),
  require("./actions/ls.js")
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
