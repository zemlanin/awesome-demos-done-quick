module.exports.name = "Terminal notify";

const command = [
  `osascript`,
  () => delay(1),
  `-l JavaScript`,
  () => delay(1),
  `-e 'let app = Application.currentApplication();`,
  () => delay(1),
  () => delay(1),
  `app.includeStandardAdditions = true;`,
  () => delay(1),
  `app.displayNotification("hi")'`,
  () => delay(1)
];
const ENTER = 36;

module.exports.action = function terminalNotify() {
  Application("Terminal").activate();
  delay(0.2);

  const se = Application("System Events");
  se.keystroke("n", { using: "command down" });
  delay(5);
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
};
