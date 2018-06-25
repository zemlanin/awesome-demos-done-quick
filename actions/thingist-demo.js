module.exports.name = "Thingist Demo";

command = [
  Path("./thingist.js").toString(),
  () => delay(1),
  "--project=Shopping",
  () => delay(2)
];

module.exports.action = function thingistDemo() {
  const Things = Application("Things");
  if (Things.running() && Things.windows.length) {
    Things.activate();
    Things.windows[0].bounds = {
      x: 500,
      y: 0,
      width: 500,
      height: 400
    };
    delay(10);
  }

  Application("Terminal").activate();
  delay(0.2);

  for (const part of command) {
    if (typeof part === "function") {
      part();
      continue;
    }

    keystroke(part);
    keystroke(" ");
  }

  keyCode(keyCode.ENTER);

  delay(10);

  const Sublime = Application("Sublime Text");
  Sublime.activate();
  delay(0.5);
  keystroke("p", { using: "command down" });
  keystroke("thingist.js");
  delay(1);
  keyCode(keyCode.ENTER);
  keystroke("p", { using: "command down" });
  keystroke(":188");
  delay(1);
  keyCode(keyCode.ENTER);
  for (let i = 0; i < 9; i++) {
    keyCode(keyCode.MINUS, { using: "command down" });
  }
};
