module.exports.name = "TASBot";

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

  Finder.open(Path("./img/tasbot.jpg"));
  se.processes.whose({ name: "Preview" })[0].windows.slice(-1)[0].position = [
    310,
    0
  ];
  delay(10);
  keystroke("w", { using: "command down" });
  delay(0.5);
};
