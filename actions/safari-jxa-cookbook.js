module.exports.name = "JXA Cookbook";

// https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html
const releaseNotesScreenshot = Path("./img/jxa-release-notes.png")

// https://github.com/JXA-Cookbook/JXA-Cookbook/wiki
const cookbookScreenshot = Path("./img/jxa-cookbook.png")

module.exports.action = function JXACookbook() {
  const Terminal = Application("Terminal");
  const se = Application("System Events");
  Terminal.activate();

  se.keystroke(
    `qlmanage -p "${releaseNotesScreenshot}" "${cookbookScreenshot}" 2> /dev/null`
  );
  se.keyCode(keyCode.ENTER);
  delay(5);
  se.keyCode(keyCode.RIGHT);
  delay(5);
  se.keyCode(keyCode.ESC);
};
