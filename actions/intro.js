const textToType = `



awesome demos done quick

beerjs summit 2018

Anton Verinov / @zemlanin
`;

module.exports.name = "Introduction";
module.exports.action = function intro() {
  const subl = Application("Sublime Text");
  subl.includeStandardAdditions = true;
  subl.activate();
  delay(0.2);

  keystroke("n", { using: ["command down"] });

  for (let i = 0; i < 15; i++) {
    keyCode(keyCode.EQUALS, { using: ["command down", "shift down"] });
    delay(Math.random() * 0.4);
  }

  keystroke("    ");
  for (const line of textToType.split("\n")) {
    for (const word of line.split(" ")) {
      if (word) {
        for (const letter of word.split("").filter(Boolean)) {
          keystroke(letter);
        }

        keystroke(" ");
      }
    }
    keyCode(keyCode.ENTER);
  }
};
