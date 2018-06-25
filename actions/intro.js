const logo = `
..........#A#...........
.......#D#.#D#..........
........#Q#....with.JXA.
`;

const textToType = `
Awesome Demos Done Quick

...beerjs summit 2018...

Anton Verinov / @zemlanin
`;

module.exports.name = "Introduction";
module.exports.action = function intro() {
  const subl = Application("Sublime Text");
  subl.includeStandardAdditions = true;
  subl.activate();
  delay(0.2);

  keystroke("n", { using: ["command down"] });
  keystroke("kb", { using: ["command down"] });

  for (let i = 0; i < 15; i++) {
    keyCode(keyCode.EQUALS, { using: ["command down", "shift down"] });
    delay(Math.random() * 0.2);
  }

  Application("System Events").keystroke("        ");

  for (const line of logo.split("\n")) {
    Application("System Events").keystroke(line);
    keyCode(keyCode.ENTER);
  }

  for (const line of textToType.split("\n")) {
    keystroke(line);
    keyCode(keyCode.ENTER);
  }
};
