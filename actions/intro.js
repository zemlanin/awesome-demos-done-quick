const logo = `
|       #A#
|    #D# #D#
|     #Q#       with JXA
`;

const textToType = `
Awesome Demos Done Quick

Anton Verinov  @zemlanin

BeerJS Summit Minsk 2018
`;

module.exports.name = "Introduction";
module.exports.action = function intro() {
  const se = Application("System Events");
  const Finder = Application("Finder");
  Finder.open(Path("./img/sgdq.png"));
  se.processes.whose({ name: "Preview" })[0].windows.slice(-1)[0].position = [
    310,
    0
  ];
  delay(10);
  keystroke("w", { using: "command down" });
  delay(0.5);

  const subl = Application("Sublime Text");
  subl.activate();
  delay(0.2);

  se.processes.byName("Sublime Text").windows.slice(-1)[0].position = [310, 0];
  se.processes.byName("Sublime Text").windows.slice(-1)[0].size = [970, 680];

  keystroke("n", { using: ["command down"] });
  keystroke("kb", { using: ["command down"] });

  for (let i = 0; i < 15; i++) {
    keyCode(keyCode.EQUALS, { using: ["command down", "shift down"] });
  }

  se.keystroke("        ");

  for (const line of logo.split("\n")) {
    keystroke(line);
    se.keyCode(keyCode.ENTER);
  }

  for (const line of textToType.split("\n")) {
    keystroke(line);
    keyCode(keyCode.ENTER);
  }
};
