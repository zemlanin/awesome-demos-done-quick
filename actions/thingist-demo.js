module.exports.name = "Thingist Demo";

const ENTER = 36;

module.exports.action = function thingistDemo() {
  const Things = Application("Things");
  if (Things.running()) {
    Things.activate();
    Things.windows[0].bounds = {
      x: 500,
      y: 0,
      width: 500,
      height: 400
    };
    delay(1);
  }

  Application("Terminal").activate();

  Application("Terminal").doScript(
    `${Path("./thingist.js").toString()} --project=Shopping | subl -s`
  );

  delay(1);

  const Sublime = Application("Sublime Text");
  Sublime.activate();
  delay(0.5);
  const se = Application("System Events");
  se.keystroke("p", { using: "command down" });
  se.keystroke("thingist.js");
  se.keyCode(ENTER);
  se.keystroke("p", { using: "command down" });
  se.keystroke(":188");
  se.keyCode(ENTER);
};
