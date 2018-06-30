module.exports.name = "OSX Yosemite";

// https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html
const releaseNotesScreenshot = Path("./img/jxa-release-notes.png");

module.exports.action = function docs() {
  const se = Application("System Events");
  const Finder = Application("Finder");

  Finder.open(releaseNotesScreenshot);
  se.processes.whose({ name: "Preview" })[0].windows.slice(-1)[0].position = [
    140,
    50
  ];
  delay(15);
  keystroke("w", { using: "command down" });
  delay(0.5);
};
