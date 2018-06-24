#!/usr/bin/env osascript -l JavaScript

const require = function(path) {
  if (typeof app === "undefined") {
    app = Application.currentApplication();
    app.includeStandardAdditions = true;
  }

  const handle = app.openForAccess(path);
  const contents = app.read(handle);
  app.closeAccess(path);

  const module = { exports: {} };
  const exports = module.exports;
  eval(contents);

  return module.exports;
};

function run(argv) {
  console.log(JSON.stringify(require("./jxargv.js")(argv)));
}
