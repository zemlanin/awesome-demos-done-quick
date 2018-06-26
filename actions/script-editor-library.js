module.exports.name = "Script Editor Library";

// unicode escaped "Терминал" because encodings
const escapedRuTerminal = "\u0422\u0435\u0440\u043C\u0438\u043D\u0430\u043B";

module.exports.action = function scriptEditorLibrary() {
  const ScriptEditor = Application("Script Editor");

  ScriptEditor.activate();
  delay(0.5);
  keystroke("l", { using: ["command down", "shift down"] });
  delay(0.1);

  const libraryWindow = Application("System Events").processes.byName(
    "Script Editor"
  ).windows[0];

  const terminalRow = libraryWindow.scrollAreas[0].tables[0].rows.whose({
    _or: [
      { _match: [ObjectSpecifier().textFields[0].value, "Terminal"] },
      { _match: [ObjectSpecifier().textFields[0].value, escapedRuTerminal] }
    ]
  })[0];
  terminalRow.select();
  delay(0.1);
  keyCode(keyCode.ENTER);
  delay(0.1);
  const terminalLibraryWindow = Application("System Events")
    .processes.byName("Script Editor")
    .windows.byName("Terminal");
  terminalLibraryWindow.position = [310, 100];
  terminalLibraryWindow.size = [740, 600];
  delay(1);
  keyCode(keyCode.TAB);
  delay(0.5);
  keyCode(keyCode.DOWN);
  delay(5);
};
