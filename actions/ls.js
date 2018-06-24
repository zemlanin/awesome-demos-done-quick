module.exports.name = "ls ./actions";
module.exports.action = function ls() {
  const action = app.chooseFromList(
    actions.filter(a => a.action).map(a => a.name),
    { withTitle: "action" }
  );
};
