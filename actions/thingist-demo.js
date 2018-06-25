module.exports.name = "Thingist Demo";

const ENTER = 36;
const MINUS = 27;

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
  const se = Application("System Events");

  for (const part of command) {
    if (typeof part === "function") {
      part();
      continue;
    }

    for (const symbol of part.split("")) {
      se.keystroke(symbol);
      delay(Math.random() * 0.15);
    }

    se.keystroke(" ");
  }

  se.keyCode(ENTER);

  delay(10);

  const Sublime = Application("Sublime Text");
  Sublime.activate();
  delay(0.5);
  se.keystroke("p", { using: "command down" });
  delay(0.5);
  se.keystroke("thingist.js");
  delay(1);
  se.keyCode(ENTER);
  se.keystroke("p", { using: "command down" });
  delay(0.5);
  se.keystroke(":188");
  delay(1);
  se.keyCode(ENTER);
  for (let i = 0; i < 9; i++) {
    se.keyCode(MINUS, { using: "command down" });
    delay(Math.random() * 0.4);
  }
};
