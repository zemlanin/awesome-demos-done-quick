module.exports.name = "JXA Cookbook"

// https://github.com/JXA-Cookbook/JXA-Cookbook/wiki
module.exports.action = function JXACookbook() {
  const Terminal = Application("Terminal")
  const se = Application("System Events")
  Terminal.activate()
  // se.keystroke("n", {using: "command down"})
  // delay(4)
  se.keystroke(`qlmanage -p "${Path("./img/jxa-cookbook.png")}" 2> /dev/null`)
  se.keyCode(keyCode.ENTER)
  delay(4)
  se.keyCode(keyCode.ESC)
}
