module.exports.name = "One more JS environment";

function osascript(str) {
  Application("System Events").keystroke(`osascript -l JavaScript -e \\\n`);
  keystroke('"' + str + '"');
  delay(1);
  keystroke("\n");
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
  keystroke("Люблю ретро кодировки");
}

module.exports.action = function oneMoreJSEnvironment() {
  Application("Terminal").activate()
  delay(0.2)

  keystroke("n", {using: "command down"})
  delay(4)

  // because it's a mac, there is no `window`
  osascript(`typeof window`)
  delay(1)

  // also no `fetch()`, no `require()`, no `console.dir()`, no async i/o...
  osascript(`[typeof require, typeof fetch, typeof console.dir]`)
  delay(1)

  // console.log("Терминал") => –Ґ–µ—А–Љ–Є–љ–∞–ї
  Application("Sublime Text").activate();
  delay(0.2);

  keystroke("n", { using: "command down" });
  keystroke(" ", { using: "command down" });
  delay(0.2);
  retro();
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
};
