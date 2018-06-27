const logo = `
.......#A#..............
....#D#.#D#.............
.....#Q#......with JXA..
`;

const textToType = `
Awesome Demos Done Quick

...beerjs summit 2018...

Anton Verinov / @zemlanin
`;

module.exports.name = "Introduction";
module.exports.action = function intro() {
  const Finder = Application("Finder");
  Finder.open(Path("./img/sgdq.png"));
  delay(10);
  keystroke("w", { using: "command down" });
  delay(1);

  const subl = Application("Sublime Text");
  subl.activate();
  delay(0.2);

  const se = Application("System Events");
  se.processes.byName("Sublime Text").windows.slice(-1)[0].position = [310, 0];
  se.processes.byName("Sublime Text").windows.slice(-1)[0].size = [970, 680];

  keystroke("n", { using: ["command down"] });
  keystroke("kb", { using: ["command down"] });

  for (let i = 0; i < 15; i++) {
    keyCode(keyCode.EQUALS, { using: ["command down", "shift down"] });
    delay(Math.random() * 0.2);
  }

  se.keystroke("        ");

  for (const line of logo.split("\n")) {
    se.keystroke(line);
    keyCode(keyCode.ENTER);
  }

  for (const line of textToType.split("\n")) {
    keystroke(line);
    keyCode(keyCode.ENTER);
  }
};
