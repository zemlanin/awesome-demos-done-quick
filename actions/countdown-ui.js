module.exports.name = "Countdown UI";

module.exports.action = function countdownUI() {
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;

  const poison = app.displayDialog("Choose your poison", {
    buttons: [
      // "🍻"
      "\u{1F37B}",
      // "🥃"
      "\u{1F943}",
      // "🍷"
      "\u{1F377}"
    ]
  });

  console.log(">", poison.buttonReturned);

  const Safari = Application("Safari");
  Safari.doJavaScript(`window.s0 = "${poison.buttonReturned}"`, {
    in: Safari.windows[0].currentTab
  });
};
