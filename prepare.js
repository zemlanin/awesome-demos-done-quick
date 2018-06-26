module.exports = function prepare() {
  const neededApplications = [
    "Terminal",
    "Script Editor",
    "Things",
    "Sublime Text"
  ];

  for (const app of neededApplications) {
    if (!Application(app).running()) {
      throw new Error(`Start "${app}"`);
    }
  }
};
