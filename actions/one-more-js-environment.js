module.exports.name = "One more JS environment";

function osascript(str) {
  keystroke(`osascript -l JavaScript -e \\`);
  keyCode(keyCode.ENTER);
  keystroke('"' + str + '"');
  delay(1);
  keyCode(keyCode.ENTER);
}

function sublOpenAndGotoDefinition(filepath, definition) {
  keystroke("p", { using: "command down" });
  delay(0.5);
  keystroke(filepath);
  delay(0.5);
  keyCode(keyCode.ENTER);

  keystroke("r", { using: "command down" });
  delay(0.5);
  keystroke(definition);
  delay(0.5);
  keyCode(keyCode.ENTER);
  delay(1);
}

function retro() {
  keystroke("Кодировки");
}

module.exports.action = function oneMoreJSEnvironment() {
  Application("Terminal").activate();
  delay(0.2);
  keystroke("l", { using: "control down" });

  // because it's a mac, there is no `window`
  osascript(`typeof window`);
  delay(4);

  // also no `require()`, no `fetch()`, no `console.dir()`, no async i/o...
  osascript(`[typeof require, typeof fetch, typeof console.dir]`);
  delay(4);

  // console.log("Терминал") => –Ґ–µ—А–Љ–Є–љ–∞–ї
  Application("Sublime Text").activate();
  delay(0.2);

  keystroke("n", { using: "command down" });
  keystroke(" ", { using: "command down" });
  delay(0.2);
  retro();
  delay(3);
  keystroke(" ", { using: "command down" });
  delay(0.1);

  sublOpenAndGotoDefinition(module.filename, retro.name);

  delay(5);

  // even keycodes are different ¯\_(ツ)_/¯
  sublOpenAndGotoDefinition(
    app
      .pathTo(this)
      .toString()
      .split("/")
      .pop(),
    keyCode.name
  );

  delay(6);
};
