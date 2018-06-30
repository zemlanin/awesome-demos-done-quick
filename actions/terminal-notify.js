module.exports.name = "Terminal notify";

const command = [
  `osascript \\`,
  () => delay(1),
  `-l JavaScript \\`,
  () => delay(1),
  `-e '`,
  () => delay(1),
  `let app = Application.currentApplication();`,
  () => delay(5),
  `app.includeStandardAdditions = true;`,
  () => delay(5),
  `app.displayNotification("hi");`,
  () => delay(5),
  `'`,
  () => delay(0.5)
];

module.exports.action = function terminalNotify() {
  Application("Terminal").activate();
  delay(0.2);

  const se = Application("System Events");
  se.keystroke("n", { using: "command down" });
  se.processes.byName("Terminal").windows.slice(-1)[0].position = [110, 200];
  delay(5);
  for (let i = 0; i < 7; i++) {
    keyCode(keyCode.EQUALS, { using: ["command down", "shift down"] });
  }
  for (const part of command) {
    if (typeof part === "function") {
      part();
      continue;
    }

    keystroke(part);
    keyCode(keyCode.ENTER);
  }
};
