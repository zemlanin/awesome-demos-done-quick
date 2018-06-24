const textToType = `
click it yourself, macbook

beerjs summit 2018
`;

module.exports.name = "Introduction";
module.exports.action = function intro() {
  const subl = Application("Sublime Text");
  subl.includeStandardAdditions = true;
  subl.activate();
  delay(0.2);

  keystroke("n", { using: ["command down"] });

  for (const line of textToType.split("\n")) {
    for (const word of line.split(" ")) {
      if (!word) {
        continue;
      }

      for (const letter of word.split("").filter(Boolean)) {
        keystroke(letter);
        delay(Math.random() * 0.15);
      }

      keystroke(" ");
    }
    keyCode(keyCode.ENTER);
  }
  delay(1);
  keyCode(keyCode.UP);
  delay(0.4);
  keyCode(keyCode.UP);
  delay(0.4);
  keyCode(keyCode.TAB);
  delay(0.4);
  keyCode(keyCode.UP);
  delay(0.4);
  keyCode(keyCode.UP);
  delay(0.4);
  keystroke("a", { using: "control down" });
  delay(0.4);

  for (let i = 0; i < 10; i++) {
    keyCode(keyCode.EQUALS, { using: ["command down", "shift down"] });
    delay(Math.random() * 0.4);
  }
  keyCode(keyCode.MINUS, { using: ["command down"] });
};

function keystroke(...args) {
  return Application("System Events").keystroke(...args);
}

function keyCode(...args) {
  return Application("System Events").keyCode(...args);
}
// https://eastmanreference.com/complete-list-of-applescript-key-codes
keyCode.ESC = 53;
keyCode.ENTER = 36;
keyCode.EQUALS = 24;
keyCode.MINUS = 27;
keyCode.UP = 126;
keyCode.TAB = 48;
