module.exports.name = "Outro";

const textToType = `


X  thank you  X

anton.click/demos
`;

function keystrokeReplaceWithClipboard(string, target, replacement) {
  const initClipboard = app.theClipboard();
  app.setTheClipboardTo(replacement);

  for (const part of string.split("")) {
    if (part === target) {
      keystroke("v", { using: "command down" });
      delay(0.1);
    } else if (part) {
      keystroke(part);
    }
  }

  app.setTheClipboardTo(initClipboard);
}

module.exports.action = function outro() {
  Application("Sublime Text").activate();
  delay(0.2);

  keystroke("n", { using: "command down" });
  delay(0.2);

  for (let i = 0; i < 8; i++) {
    keyCode(keyCode.EQUALS, { using: ["command down", "shift down"] });
  }

  const se = Application("System Events");
  se.keystroke("        ");

  for (const line of textToType.split("\n")) {
    // `poison` is in global scope (defined in present.js)
    keystrokeReplaceWithClipboard(line, "X", poison);
    keyCode(keyCode.ENTER);
  }
};
