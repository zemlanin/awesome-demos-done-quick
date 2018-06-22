const osa = require("osa2");

// https://eastmanreference.com/complete-list-of-applescript-key-codes
const ESC = 53;
const ENTER = 36;

async function launch(name) {
  return osa(name => {
    ObjC.import("AppKit");
    $.NSWorkspace.sharedWorkspace.launchApplication(name);
  })(name);
}

async function playing() {
  return osa(() => {
    const iTunes = Application("iTunes");
    const app = iTunes;
    iTunes.includeStandardAdditions = true;

    const name = iTunes.currentTrack.name();
    const artist = iTunes.currentTrack.artist();

    console.log(name + " by " + artist);
  })();
}

async function launchTimer() {
  return osa(() => {
    const Safari = Application("Safari");
    const tabs = Safari.windows[0].tabs;
    Safari.activate();

    const newTab = new Safari.Tab();

    tabs.push(newTab);
    newTab.url =
      "data:text/html;base64,PGJvZHkgb25sb2FkPSIoKHQsaSxtLGUscj0oKT0+ewplPShuZXcgRGF0ZS1tKS8xZTMKZT1lPGk/ZTppCnQuZFsnc3R5bGUnXS53aWR0aD1gJHsxMDAqKGktZSkvaX0lYAplPWktZXwwCnQudC5pbm5lclRleHQ9YCR7ZS82MHwwfTpgKyhlJTYwPjk/YGA6MCkrZSU2MAplJiZzZXRUaW1lb3V0KHIsMzApCn0pPT5yKCkpKHRoaXMsMzAwLG5ldyBEYXRlKSI+CjxkaXYgc3R5bGU9aGVpZ2h0OjEwJTtiYWNrZ3JvdW5kOiMwMDAgaWQ9ZD4KPHAgc3R5bGU9ImZvbnQ6NzB2aCBmdXR1cmEiIGlkPXQ+";
    Safari.windows[0].currentTab = newTab;
    delay(0.1);
  })();
}

async function terminal(cmd) {
  return osa(cmd => {
    const Terminal = Application("Terminal");
    Terminal.includeStandardAdditions = true;
    Terminal.doScript(cmd);
  })(cmd);
}

async function keystroke(...args) {
  return osa((...args) => {
    Application("System Events").keystroke(...args);
  })(...args);
}

async function keyCode(...args) {
  // https://eastmanreference.com/complete-list-of-applescript-key-codes
  return osa((...args) => {
    Application("System Events").keyCode(...args);
  })(...args);
}

async function activate(name) {
  return osa(name => {
    Application(name).activate();
    delay(0.1);
  })(name);
}

async function delay(seconds) {
  return osa(seconds => delay(seconds))(seconds);
}

async function present() {
  await launchTimer();

  await activate("Sublime Text");

  await keystroke("n", { using: ["command down"] });

  await keystroke("hello");
  await keyCode(ENTER);
  await delay(1);

  await keystroke("how are you today?");
  await keyCode(ENTER);
  await delay(1);

  await keystroke(1, { using: ["command down"] });

  await terminal(
    `find ~/Dropbox/Public/gifmess -name *because* -exec qlmanage -p {} 2> /dev/null \\;`
  );

  await delay(10);

  await keyCode(ESC);

  await delay(1);

  await activate("Terminal");
  await keystroke("w", { using: ["command down"] });
  await activate("Safari");
}

present()
  .then(() => {
    process.exit(0);
  })
  .catch(console.error);
