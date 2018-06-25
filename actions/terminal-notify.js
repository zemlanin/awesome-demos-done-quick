module.exports.name = "Terminal notify";

const command = [
  `osascript \\`,
  () => delay(1),
  `-l JavaScript \\`,
  () => delay(1),
  `-e '`,
  () => delay(1),
  `let app = Application.currentApplication();`,
  () => delay(1),
  `app.includeStandardAdditions = true;`,
  () => delay(1),
  `app.displayNotification("hi")`,
  () => delay(1),
  `'`,
  () => delay(0.5)
];
const ENTER = 36;
const EQUALS = 24;

module.exports.action = function terminalNotify() {
  Application("Terminal").activate();
  delay(0.2);

  const se = Application("System Events");
  se.keystroke("n", { using: "command down" });
  delay(5);
  for (let i = 0; i < 10; i++) {
    se.keyCode(EQUALS, { using: ["command down", "shift down"] });
    delay(Math.random() * 0.4);
  }
  for (const part of command) {
    if (typeof part === "function") {
      part();
      continue;
    }

    for (const symbol of part.split("")) {
      se.keystroke(symbol);
      delay(Math.random() * 0.15);
    }

    se.keyCode(ENTER);
  }
};
