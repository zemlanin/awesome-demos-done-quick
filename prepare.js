const neededApplications = {
  Terminal: [],
  "Script Editor": [],
  Things: [
    {
      check: () =>
        Application("System Events")
          .processes.byName("Things")
          .windows[0].title() === "Shopping",
      message: `Open "Shopping" project in Things`
    }
  ],
  "Sublime Text": [],
  Safari: []
};

module.exports = function prepare() {
  const se = Application("System Events");
  se.includeStandardAdditions = true;

  for (const app in neededApplications) {
    try {
      Application(app);
    } catch (e) {
      console.log(`\u2718`, `${app}`);
      throw new Error(`Install "${app}"`);
    }

    if (!Application(app).running()) {
      console.log(`\u2718`, `${app}`);
      throw new Error(`Start "${app}"`);
    }

    if (!se.processes.byName(app).windows.length) {
      console.log(`\u2718`, `${app}`);
      throw new Error(`Open window for "${app}"`);
    }

    const activeAppWindow = se.processes.byName(app).windows[0];

    for (const customCheck of neededApplications[app]) {
      if (!customCheck.check()) {
        console.log(`\u2718`, `${app}`);
        throw new Error(customCheck.message);
      }
    }

    console.log("\u2714", app);
  }
};
