module.exports.name = "Countdown UI";

module.exports.action = function countdownUI() {
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;

  // `poison` is in global scope (defined in present.js)
  poison =
    app.displayDialog("Choose your poison", {
      buttons: [
        // "🍻"
        "\u{1F37B}",
        // "🥃"
        "\u{1F943}",
        // "🍷"
        "\u{1F377}"
      ],
      defaultButton: poison,
      givingUpAfter: 3
    }).buttonReturned || poison;

  console.log(">", poison);

  const Safari = Application("Safari");
  Safari.doJavaScript(`window.poison = "${poison}"`, {
    in: Safari.windows[0].currentTab
  });
};
